'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import styles from './ConsentAndTracking.module.css';
import { useLocale } from '../lib/i18n';

const STORAGE_KEY = 'excuses_cookie_consent';

export default function ConsentAndTracking({ nonce }) {
  const { T } = useLocale();
  const [consent, setConsent] = useState(null); // null = not yet read from storage

  useEffect(() => {
    setConsent(localStorage.getItem(STORAGE_KEY) ?? 'pending');
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setConsent('declined');
  };

  const GA_ID        = process.env.NEXT_PUBLIC_GA4_ID;
  const ADSENSE_ID   = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const META_PIXEL   = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const TIKTOK_PIXEL = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const SNAP_PIXEL   = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  return (
    <>
      {/* Tracking scripts — only injected after explicit consent */}
      {consent === 'accepted' && (
        <>
          {GA_ID && (
            <>
              <Script nonce={nonce} src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
              <Script nonce={nonce} id="ga-init" strategy="afterInteractive">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
                function ga(n,p){ if(typeof gtag!=='undefined') gtag('event',n,p||{}); }
              `}</Script>
            </>
          )}
          {ADSENSE_ID && (
            <Script
              nonce={nonce}
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
          )}
          {META_PIXEL && (
            <Script nonce={nonce} id="meta-pixel" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
              n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${META_PIXEL}');fbq('track','PageView');
            `}</Script>
          )}
          {TIKTOK_PIXEL && (
            <Script nonce={nonce} id="tiktok-pixel" strategy="afterInteractive">{`
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
            `}</Script>
          )}
          {SNAP_PIXEL && (
            <Script nonce={nonce} id="snap-pixel" strategy="afterInteractive">{`
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script',r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);
              })(window,document,'https://sc-static.net/scevent.min.js');
              snaptr('init','${SNAP_PIXEL}',{});snaptr('track','PAGE_VIEW');
            `}</Script>
          )}
        </>
      )}

      {/* Consent banner — shown until the user decides */}
      {consent === 'pending' && (
        <div className={styles.banner} role="region" aria-label="Cookie consent">
          <div className={styles.inner}>
            <div className={styles.text}>
              <strong className={styles.title}>{T.consent.title}</strong>
              <p className={styles.body}>
                {T.consent.body}{' '}
                <a href="/privacy" className={styles.link}>{T.consent.privacyPolicy}</a>
              </p>
            </div>
            <div className={styles.actions}>
              <button className={styles.btnDecline} onClick={decline}>{T.consent.decline}</button>
              <button className={styles.btnAccept} onClick={accept}>{T.consent.accept}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
