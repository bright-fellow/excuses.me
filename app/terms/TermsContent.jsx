'use client';

import { useLocale } from '../lib/i18n';

export default function TermsContent() {
  const { T } = useLocale();
  const Tr = T.terms;

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '6rem 2rem 4rem', fontFamily: 'var(--f)', color: 'var(--black)', lineHeight: 1.7 }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-.03em' }}>{Tr.title}</h1>
      <p style={{ color: 'var(--gray)', fontSize: '.85rem', marginBottom: '2.5rem' }}>{Tr.lastUpdated}</p>

      {Tr.sections.map((s, i) => (
        <section key={i}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>{s.heading}</h2>
          <p>
            {s.text}
            {s.contactEmail && (
              <> <a href={`mailto:${s.contactEmail}`} style={{ color: 'var(--acc)' }}>{s.contactEmail}</a></>
            )}
          </p>
        </section>
      ))}
    </main>
  );
}
