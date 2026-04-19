import { getServerSupabase, missingDb } from '@/app/lib/supabase';

// Upstash Redis when configured; in-memory Map as fallback.
let ratelimit = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const { Redis }     = await import('@upstash/redis');
  const { Ratelimit } = await import('@upstash/ratelimit');
  const redis = new Redis({
    url:   process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 h') });
}

const localMap     = new Map();
const WINDOW_MS    = 60 * 60 * 1000;
const MAX_PER_HOUR = 10;

async function checkLikeLimit(ip) {
  if (ratelimit) {
    const { success } = await ratelimit.limit(`like:${ip}`);
    return success;
  }
  const now    = Date.now();
  const recent = (localMap.get(ip) ?? []).filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= MAX_PER_HOUR) return false;
  recent.push(now);
  if (recent.length > 0) localMap.set(ip, recent);
  else localMap.delete(ip);
  return true;
}

export async function POST(request) {
  const supabase = getServerSupabase();
  if (!supabase) return missingDb();

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const allowed = await checkLikeLimit(ip);
  if (!allowed) {
    return Response.json({ error: 'Too many likes. Come back later.' }, { status: 429 });
  }

  let id;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!id || typeof id !== 'number') {
    return Response.json({ error: 'Missing excuse ID' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.rpc('increment_likes', { excuse_id: id });
    if (error) {
      console.error('Supabase RPC error:', error);
      return Response.json({ error: 'Failed to like excuse' }, { status: 500 });
    }
    return Response.json({ success: true, likes: data });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
