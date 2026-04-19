import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' lets GA/AdSense/etc. load their sub-scripts without listing every domain
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    // CSS modules compile to linked files; unsafe-inline needed for React inline style attributes
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://www.google.com https://www.gstatic.com https://pagead2.googlesyndication.com",
    "connect-src 'self' https://*.supabase.co https://api.groq.com https://www.google-analytics.com https://analytics.google.com https://*.ingest.sentry.io",
    "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
