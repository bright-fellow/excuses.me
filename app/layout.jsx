import './globals.css';

export const metadata = {
  title: 'excuses.me — A perfect excuse, every time',
  description:
    'AI-powered excuse generator. Type the situation, pick your tone, style and length — get a convincing excuse in seconds.',
};

export default function RootLayout({ children }) {
  const GA_ID        = process.env.NEXT_PUBLIC_GA4_ID;
  const ADSENSE_ID   = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const META_PIXEL   = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const TIKTOK_PIXEL = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const SNAP_PIXEL   = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  return (
    <html lang="en">
      <head>
        {/* ── Google Analytics 4 ───────────────────────────── */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){ dataLayer.push(arguments); }
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { anonymize_ip: true });
                  function ga(n,p){ if(typeof gtag!=='undefined') gtag('event',n,p||{}); }
                `,
              }}
            />
          </>
        )}

        {/* ── Google AdSense ───────────────────────────────── */}
        {ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}

        {/* ── Meta (Facebook) Pixel ────────────────────────── */}
        {META_PIXEL && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
                  n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
                  s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
                  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init','${META_PIXEL}');fbq('track','PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* ── TikTok Pixel ─────────────────────────────────── */}
        {TIKTOK_PIXEL && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once",
                "ready","alias","group","enableCookie","disableCookie"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(
                Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)
                ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},
                ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                var o=document.createElement("script");o.type="text/javascript";o.async=!0;
                o.src=i+"?sdkid="+e+"&lib="+t;
                var a=document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o,a)};
                ttq.load('${TIKTOK_PIXEL}');ttq.page();}(window,document,'ttq');
              `,
            }}
          />
        )}

        {/* ── Snapchat Pixel ───────────────────────────────── */}
        {SNAP_PIXEL && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                a.queue=[];var s='script',r=t.createElement(s);r.async=!0;
                r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);
                })(window,document,'https://sc-static.net/scevent.min.js');
                snaptr('init','${SNAP_PIXEL}',{});snaptr('track','PAGE_VIEW');
              `,
            }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
