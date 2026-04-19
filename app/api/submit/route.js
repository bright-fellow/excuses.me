import { getServerSupabase, missingDb } from '@/app/lib/supabase';

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Upstash Redis when env vars are set; in-memory Map as fallback for local dev.
let ratelimit = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const { Redis }     = await import('@upstash/redis');
  const { Ratelimit } = await import('@upstash/ratelimit');
  const redis = new Redis({
    url:   process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 m') });
}

const localMap  = new Map();
const WINDOW_MS   = 60 * 1000;
const MAX_PER_MIN = 3;

async function checkRateLimit(userId) {
  if (ratelimit) {
    const { success } = await ratelimit.limit(`submit:${userId}`);
    return success;
  }
  const now    = Date.now();
  const recent = (localMap.get(userId) ?? []).filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= MAX_PER_MIN) return false;
  recent.push(now);
  if (recent.length > 0) localMap.set(userId, recent);
  else localMap.delete(userId);
  return true;
}

// ── Content moderation ────────────────────────────────────────────────────────
async function moderateText(text, apiKey) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'llama-guard-3-8b',
        messages: [{ role: 'user', content: text }],
        max_tokens: 20,
      }),
    });
    if (!res.ok) return true;
    const data    = await res.json();
    const verdict = data.choices?.[0]?.message?.content?.trim().toLowerCase() ?? 'safe';
    return !verdict.startsWith('unsafe');
  } catch {
    return true;
  }
}

export async function POST(request) {
  const supabase = getServerSupabase();
  if (!supabase) return missingDb();

  const groqKey = process.env.GROQ_API_KEY;

  // ── Auth ──────────────────────────────────────────────────────────────────
  const token = request.headers.get('Authorization')?.slice(7) ?? null;
  if (!token) {
    return Response.json({ error: 'Sign in to submit an excuse.' }, { status: 401 });
  }

  // ── Input validation ──────────────────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { text, region, tone, length } = body;
  if (!text || text.length < 10 || text.length > 500) {
    return Response.json({ error: 'Excuse must be 10–500 characters.' }, { status: 400 });
  }
  if (!region || !tone || !length) {
    return Response.json({ error: 'Missing metadata.' }, { status: 400 });
  }

  // ── Auth check + moderation in parallel ──────────────────────────────────
  const [authResult, isSafe] = await Promise.all([
    supabase.auth.getUser(token),
    groqKey ? moderateText(text, groqKey) : Promise.resolve(true),
  ]);

  const { data: { user }, error: authError } = authResult;
  if (authError || !user) {
    return Response.json({ error: 'Invalid or expired session. Please sign in again.' }, { status: 401 });
  }

  if (!isSafe) {
    return Response.json(
      { error: 'Your submission was flagged as inappropriate. Keep it clean!' },
      { status: 400 }
    );
  }

  // ── Rate limiting ─────────────────────────────────────────────────────────
  const allowed = await checkRateLimit(user.id);
  if (!allowed) {
    return Response.json({ error: 'Too many submissions. Please wait a minute.' }, { status: 429 });
  }

  // ── Persist ───────────────────────────────────────────────────────────────
  try {
    const { data, error } = await supabase
      .from('excuses')
      .insert([{ text, region, tone, length, likes: 0, status: 'approved', user_id: user.id }])
      .select('id');

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: 'Failed to save excuse.' }, { status: 500 });
    }

    return Response.json({ success: true, id: data[0].id });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
