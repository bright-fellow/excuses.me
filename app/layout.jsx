import { headers } from 'next/headers';
import ConsentAndTracking from './components/ConsentAndTracking';
import './globals.css';

export const metadata = {
  verification: {
    other: {
      'google-adsense-account': 'ca-pub-7849668568457352',
    },
  },
  title: 'excuses.me — A perfect excuse, every time',
  description:
    'AI-powered excuse generator. Type the situation, pick your tone, style and length — get a convincing excuse in seconds.',
  metadataBase: new URL('https://excuses.me'),
  openGraph: {
    title: 'excuses.me — A perfect excuse, every time',
    description: 'AI-powered excuse generator. Get a convincing excuse in seconds.',
    url: 'https://excuses.me',
    siteName: 'excuses.me',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'excuses.me' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'excuses.me — A perfect excuse, every time',
    description: 'AI-powered excuse generator. Get a convincing excuse in seconds.',
    images: ['/og-image.png'],
  },
};

export default async function RootLayout({ children }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="en">
      <body>
        {children}
        <ConsentAndTracking nonce={nonce} />
      </body>
    </html>
  );
}
