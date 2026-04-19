import { NextResponse } from 'next/server';

// Supabase OAuth callback — exchanges the auth code for a session cookie
// and redirects back to the app. Works with both PKCE and implicit flows.
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  // For implicit flow the session is in the URL fragment (handled client-side).
  // For PKCE flow the code arrives here as a query param.
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // Dynamically import to avoid loading supabase-js in the edge runtime.
    // This route runs in Node.js (default runtime).
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect back to the homepage; the client Supabase listener picks up the session.
  const redirectTo = requestUrl.searchParams.get('next') ?? '/';
  return NextResponse.redirect(origin + redirectTo);
}
