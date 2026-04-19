'use client';

import { useLocale } from '../lib/i18n';

export default function Privacy() {
  const { T } = useLocale();
  const P = T.privacy;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>{P.title}</h1>
      <p><strong>{P.lastUpdated}</strong></p>

      {P.sections.map((s, i) => (
        <section key={i}>
          <h2>{s.heading}</h2>
          {s.intro && <p>{s.intro}</p>}
          {s.list && (
            <ul>
              {s.list.map((item, j) => (
                <li key={j}>
                  {item.bold && <strong>{item.bold}</strong>}
                  {item.text}
                </li>
              ))}
            </ul>
          )}
          {s.text && <p>{s.text}</p>}
        </section>
      ))}

      <p>{P.contact}</p>
    </div>
  );
}
