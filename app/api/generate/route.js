import { CULTURE_PROMPTS, TONE_PROMPTS, LENGTH_PROMPTS, VALID_REGIONS, VALID_TONES, VALID_LENGTHS } from '@/app/lib/prompts';

export const runtime = 'edge';

// Edge-compatible sliding-window rate limiter (per IP, in-memory within the edge instance)
// For multi-region distributed limiting, set UPSTASH_REDIS_REST_URL/TOKEN.
const ipMap = new Map();
const WINDOW_MS    = 60 * 1000;
const MAX_PER_MIN  = 10;

function checkGenerateLimit(ip) {
  const now    = Date.now();
  const recent = (ipMap.get(ip) ?? []).filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= MAX_PER_MIN) return false;
  recent.push(now);
  if (recent.length > 0) ipMap.set(ip, recent);
  else ipMap.delete(ip);
  return true;
}

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'GROQ_API_KEY is not configured' }, { status: 500 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkGenerateLimit(ip)) {
    return Response.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { occasion, region, tone, length } = body;

  if (!occasion || typeof occasion !== 'string' || occasion.trim().length < 2 || occasion.length > 500) {
    return Response.json({ error: 'Invalid occasion' }, { status: 400 });
  }
  if (!VALID_REGIONS.has(region)) {
    return Response.json({ error: 'Invalid region' }, { status: 400 });
  }
  if (!VALID_TONES.has(tone)) {
    return Response.json({ error: 'Invalid tone' }, { status: 400 });
  }
  if (!VALID_LENGTHS.has(length)) {
    return Response.json({ error: 'Invalid length' }, { status: 400 });
  }

  const openingStyles = [
    'Start with a scene-setter that drops the reader into the moment.',
    'Start mid-thought, as if continuing a conversation already in progress.',
    'Open with a concrete fact or observation before explaining.',
    'Lead with the consequence or impact, then explain why.',
    'Begin with a time reference (when something happened) before anything else.',
    'Open with an unexpected admission that reframes the whole situation.',
  ];
  const openingHint = openingStyles[Math.floor(Math.random() * openingStyles.length)];

  const system = `You are an expert excuse writer. Output only the excuse itself — no preamble, no label, no quotation marks.

REGIONAL VOICE:
${CULTURE_PROMPTS[region].trim()}

${TONE_PROMPTS[tone]}

${LENGTH_PROMPTS[length]}

OPENING STYLE: ${openingHint}

The excuse must sound like a real person wrote it in that voice. Include at least one concrete local or cultural detail that makes it feel specific and authentic.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 400,
        temperature: 0.9,
        messages: [
          { role: 'system', content: system },
          { role: 'user',   content: `Generate an excuse for: ${occasion.trim()}` },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq error:', groqRes.status, errText);
      return Response.json({ error: `Groq API returned ${groqRes.status}` }, { status: 502 });
    }

    const data = await groqRes.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    return Response.json({ text });
  } catch (err) {
    console.error('Generate handler error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
