import { NextResponse } from 'next/server';

export const runtime = 'edge'; // fast cold starts on Vercel

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY is not configured' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { system, user } = body;
  if (!system || !user) {
    return NextResponse.json(
      { error: 'Missing required fields: system, user' },
      { status: 400 }
    );
  }

  try {
    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
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
            { role: 'user',   content: user   },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq error:', groqRes.status, errText);
      return NextResponse.json(
        { error: `Groq API returned ${groqRes.status}` },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const text = data.choices?.[0]?.message?.content ?? '';

    return NextResponse.json({ text });
  } catch (err) {
    console.error('Generate handler error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
