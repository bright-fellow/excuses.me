'use client';

import { useState, useCallback } from 'react';
import styles from './page.module.css';

// ── DATA ──────────────────────────────────────────────────────────────────────

const REGIONS = {
  US: [
    { id: 'US.national',   label: 'General US'   },
    { id: 'US.NYC',        label: 'New York'      },
    { id: 'US.LA',         label: 'Los Angeles'   },
    { id: 'US.South',      label: 'Deep South'    },
    { id: 'US.Midwest',    label: 'Midwest'       },
    { id: 'US.Texas',      label: 'Texas'         },
    { id: 'US.NewEngland', label: 'New England'   },
  ],
  UK: [
    { id: 'UK.national',   label: 'General UK'    },
    { id: 'UK.London',     label: 'London (RP)'   },
    { id: 'UK.Cockney',    label: 'Cockney'       },
    { id: 'UK.Manchester', label: 'Manchester'    },
    { id: 'UK.Leeds',      label: 'Leeds'         },
    { id: 'UK.Liverpool',  label: 'Liverpool'     },
    { id: 'UK.Scotland',   label: 'Scotland'      },
    { id: 'UK.Wales',      label: 'Wales'         },
    { id: 'UK.Posh',       label: 'Very Posh'     },
  ],
  AT: [
    { id: 'AT.national',   label: 'Allgemein'     },
    { id: 'AT.Vienna',     label: 'Wien'          },
    { id: 'AT.Tirol',      label: 'Tirol'         },
    { id: 'AT.Styria',     label: 'Steiermark'    },
    { id: 'AT.Salzburg',   label: 'Salzburg'      },
    { id: 'AT.Vorarlberg', label: 'Vorarlberg'    },
    { id: 'AT.Burgenland', label: 'Burgenland'    },
    { id: 'AT.Carinthia',  label: 'Kärnten'       },
    { id: 'AT.LowerAustria', label: 'Niederösterreich' },
    { id: 'AT.UpperAustria', label: 'Oberösterreich' },
  ],
  CH: [
    { id: 'CH.national',   label: 'Allgemein'     },
    { id: 'CH.Zurich',     label: 'Zürich'        },
    { id: 'CH.Bern',       label: 'Bern'          },
    { id: 'CH.Basel',      label: 'Basel'         },
    { id: 'CH.Geneva',     label: 'Genf (frz.)'   },
    { id: 'CH.Valais',     label: 'Wallis'        },
    { id: 'CH.Ticino',     label: 'Tessin (ital.)' },
    { id: 'CH.Graubuenden', label: 'Graubünden (roman.)' },
    { id: 'CH.Lucerne',    label: 'Luzern'        },
    { id: 'CH.StGallen',   label: 'St. Gallen'    },
    { id: 'CH.Thurgau',    label: 'Thurgau'       },
    { id: 'CH.Zug',        label: 'Zug'           },
    { id: 'CH.Aargau',     label: 'Aargau'        },
  ],
};

const CULTURE_PROMPTS = {
  'US.national':   `Write in a confident, direct American style. Warm, slightly over-expressive, positive spin at the end. Phrases like "I totally appreciate your patience" or "I really apologise for the inconvenience" are typical.`,
  'US.NYC':        `Write like a fast-talking New Yorker. Direct, no-nonsense, slightly brusque but not unkind. Get to the point fast. A hint of "I got a lotta things going on" energy. Zero fluff.`,
  'US.LA':         `Write in a laid-back Los Angeles style. Breezy, wellness-aware, maybe reference traffic on the 405. Phrases like "totally my bad", "it's been such a crazy week", "I really want to make this right" fit perfectly.`,
  'US.South':      `Write in a warm Southern US style. Extra polite and gracious, use "bless your heart"-adjacent warmth, reference family or church if plausible, and close with something like "I do hope you'll forgive me".`,
  'US.Midwest':    `Write in a Midwestern style. Self-deprecating, modest, apologetic to a fault. Very sincere. Might over-explain a mundane inconvenience. "Shoot, I'm real sorry about this" energy. Humble and earnest.`,
  'US.Texas':      `Write in a Texan style. Big, generous apology with a bit of swagger. Might reference the sheer scale of the inconvenience. Warm but confident. "I give you my word this won't happen again" feels right.`,
  'US.NewEngland': `Write in a dry New England style. Reserved, understated, matter-of-fact. Not cold, just efficient. A Bostonian would never over-apologise — brief, honest, and slightly blunt.`,

  'UK.national':   `Write in a standard British style. Indirect, understated, excessively polite. Apologise for things that aren't your fault. Elevate a mild inconvenience to near-catastrophe. "I do hope this hasn't caused too much bother."`,
  'UK.London':     `Write in educated London (Received Pronunciation) style. Articulate, measured, politely regretful. Not too stiff — modern London professional. References to "the commute" or "the Central line" are fair game.`,
  'UK.Cockney':    `Write in Cockney rhyming slang style. Use rhyming slang naturally: "dog and bone" (phone), "plates of meat" (feet), "trouble and strife" (wife), "apple and pears" (stairs), "brown bread" (dead), "cream crackered" (knackered). Keep it authentic and colourful.`,
  'UK.Manchester': `Write in a Manchester style. Straight-talking, warm, a bit dry. Working class pride, no pretension. Might mention "it were proper hectic" or "I've been absolutely mithered". Genuine and unpretentious.`,
  'UK.Leeds':      `Write in a Leeds / Yorkshire style. Blunt, honest, proud. Yorkshire folk don't faff about — the excuse is brief, sincere, and to the point. Might use "nowt" or "summat".`,
  'UK.Liverpool':  `Write in a Scouse (Liverpool) style. Warm, chatty, a little self-dramatising, very community-minded. Might reference "the family" or "our kid". Friendly and slightly rapid-fire. "Honest to God, la, I'm made up to explain..."`,
  'UK.Scotland':   `Write in a Scottish style. Dry humour, no-nonsense, quietly self-deprecating. Use Scottish vocabulary naturally: "pure", "wee", "Baltic", "outwith".`,
  'UK.Wales':      `Write in a Welsh style. Warm, musical cadence, community-focused, slightly poetic. Welsh people are famously polite and community-minded. Genuine and heartfelt.`,
  'UK.Posh':       `Write in an extremely upper-class British style. Think Eton, the Home Counties. Vocabulary: "frightfully", "terribly sorry", "one simply couldn't", "ghastly business", "do forgive one". Absurdly over-polished.`,

  'AT.national':   `Schreibe auf Österreichischem Deutsch. Formell, etwas fatalistisch, bürokratischer Flair. Verwende österreichische Ausdrücke und Grammatik. Verweise auf familiäre Verpflichtungen oder Gesundheitsbeschwerden. Etwas resigniert — ein Hauch Weltschmerz ist angebracht.`,
  'AT.Vienna':     `Schreibe auf Wienerisch — dem charmant-schnodderigen Dialekt der Wiener. Verwende wienerische Ausdrücke und Grammatik. Typische Ausdrücke wie "Schau'n Sie", "I hob's net bösartig gemeint", "wia's halt so is". Leicht melancholisch, charmant und mit Wiener Schmäh.`,
  'AT.Tirol':      `Schreibe im Tiroler Stil — bodenständig, naturverbunden, leicht kernig. Verwende tirolerische Ausdrücke und Grammatik. Tiroler sind direkt und ehrlich. Dialektfärbung ist willkommen: "des hot mi echt gstört", "i woar nimmer anders".`,
  'AT.Styria':     `Schreibe im steirischen Stil — herzlich, bodenständig, mit einer Prise Sturheit. Verwende steirische Ausdrücke und Grammatik. Könnte Wein, Familie oder das Wetter erwähnen. Wärmer und direkter als Wien.`,
  'AT.Salzburg':   `Schreibe im Salzburger Stil — kulturbewusst, leicht gehoben, aber freundlich. Verwende salzburgerische Ausdrücke und Grammatik. Formeller als Tirol, weniger ironisch als Wien.`,
  'AT.Vorarlberg': `Schreibe im Vorarlberger Stil — dem alemannischen Dialekt Österreichs, der dem Schweizerdeutschen ähnelt. Verwende Vorarlberger Ausdrücke und Grammatik. Direkt, bodenständig, ordnungsliebend.`,
  'AT.Burgenland': `Schreibe im Burgenländischen Stil — warm, ländlich, mit ungarischen Einflüssen. Verwende burgenländische Ausdrücke und Grammatik. Herzlich und bodenständig.`,
  'AT.Carinthia': `Schreibe im Kärntner Stil — lebhaft, naturverbunden, mit slowenischen Einflüssen. Verwende kärntnerische Ausdrücke und Grammatik. Fröhlich und direkt.`,
  'AT.LowerAustria': `Schreibe im Niederösterreichischen Stil — traditionell, weinbaugeprägt, höflich. Verwende niederösterreichische Ausdrücke und Grammatik. Kultiviert und zuvorkommend.`,
  'AT.UpperAustria': `Schreibe im Oberösterreichischen Stil — industriell, fleißig, mit bayerischen Einflüssen. Verwende oberösterreichische Ausdrücke und Grammatik. Praktisch und verlässlich.`,

  'CH.national':   `Schrib uf Schwiizerdütsch. Präzis, sachlich, zueverlässig. Kei Übertreibige. Verwende Schweizerdeutsche Ausdrück und Grammatik. Konkrete Vorschlag zur Wiedergutmachung am End.`,
  'CH.Zurich':     `Schrib im Zürcher Stil — gschäftsmässig, urban, e bitz kühl aber korrekt. Effizienz isch alles. Verwende Zürcherdeutsche Ausdrück und Grammatik. Kurz, klar, professionell.`,
  'CH.Bern':       `Schrib im Berner Stil — gemächlich, besonnen, freundlich. Der Berner isch verlässlich, aber in sim eigne Tempo. Verwende Berndeutsche Ausdrück und Grammatik.`,
  'CH.Basel':      `Schrib im Basler Stil — weltoff, kultiviert, mit ere Prise rheinische Gelassenheit. Verwende Baslerdeutsche Ausdrück und Grammatik. Gebildet und sachlich, aber nid ohni Wärme.`,
  'CH.Geneva':     `Écris dans un style genevois — en français suisse. Formel, diplomatique, courtois. Le ton est professionnel et mesuré. Propose une solution concrète à la fin.`,
  'CH.Valais':     `Schrib im Walliser Stil — herzlich, bodenständig, stolz uf d'Bergwelt. Verwende Walliserdeutsche Ausdrück und Grammatik. Direkter und wärmer als Zürich. Könnt d'Arbeit ufem Hof oder s'Wetter id Bärge erwähne.`,
  'CH.Ticino':     `Scrivi in italiano svizzero. Stile cordiale, preciso, affidabile. Nessuna esagerazione. Suggerisci una soluzione concreta alla fine.`,
  'CH.Graubuenden': `Scriver in rumantsch grischun. Stil cordial, precis, fidabel. Nagina exaggeraziun. Suggescha ina soluziun concreta a la fin.`,
  'CH.Lucerne':    `Schrib im Luzerner Stil — herzlich, traditionsbewusst, am Vierwaldstättersee gelegen. Verwende luzernerdeutsche Ausdrück und Grammatik. Freundlich und zuverlässig.`,
  'CH.StGallen':   `Schrib im St. Galler Stil — textilgeprägt, innovativ, mit ostschweizerischem Flair. Verwende st.gallerische Ausdrück und Grammatik. Kreativ und bodenständig.`,
  'CH.Thurgau':   `Schrib im Thurgauer Stil — ländlich, am Bodensee, mit alemannischem Einschlag. Verwende thurgauische Ausdrück und Grammatik. Gemütlich und direkt.`,
  'CH.Zug':       `Schrib im Zuger Stil — wohlhabend, am Zugersee, diskret. Verwende zugische Ausdrück und Grammatik. Höflich und professionell.`,
  'CH.Aargau':    `Schrib im Aargauer Stil — industriell, vielfältig, mit badischem Einfluss. Verwende aargauische Ausdrück und Grammatik. Praktisch und offen.`,
};

const TONE_PROMPTS = {
  Apologetic:   'The tone should be sincere, remorseful, and apologetic — sound genuinely sorry.',
  Funny:        'The tone should be humorous and self-deprecating — funny but still plausible.',
  Professional: 'The tone should be polished, formal, and corporate-appropriate.',
  Dramatic:     'The tone should be outrageously theatrical and over-the-top.',
  Creative:     'The tone should be wildly inventive — unexpected but oddly believable.',
};

const LENGTH_PROMPTS = {
  Short:  '1-2 sentences. Punchy and direct.',
  Medium: '3-4 sentences. Enough detail to be convincing.',
  Long:   '5-7 sentences. A full layered narrative with specific details.',
};

const TONES   = ['Apologetic', 'Funny', 'Professional', 'Dramatic', 'Creative'];
const LENGTHS = ['Short', 'Medium', 'Long'];
const COUNTRIES = ['US', 'UK', 'AT', 'CH'];

const COUNTRY_FLAGS = {
  US: (
    <svg viewBox="0 0 20 14" width="16" height="11" style={{ marginRight: 3, borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="14" fill="#B22234"/>
      <rect y="2.15"  width="20" height="1.08" fill="#fff"/>
      <rect y="4.31"  width="20" height="1.08" fill="#B22234"/>
      <rect y="6.46"  width="20" height="1.08" fill="#fff"/>
      <rect y="8.62"  width="20" height="1.08" fill="#B22234"/>
      <rect y="10.77" width="20" height="1.08" fill="#fff"/>
      <rect y="12.92" width="20" height="1.08" fill="#B22234"/>
      <rect width="8" height="7.54" fill="#3C3B6E"/>
    </svg>
  ),
  UK: (
    <svg viewBox="0 0 20 14" width="16" height="11" style={{ marginRight: 3, borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="14" fill="#012169"/>
      <line x1="0"  y1="0"  x2="20" y2="14" stroke="#fff" strokeWidth="2.5"/>
      <line x1="20" y1="0"  x2="0"  y2="14" stroke="#fff" strokeWidth="2.5"/>
      <line x1="0"  y1="0"  x2="20" y2="14" stroke="#C8102E" strokeWidth="1.4"/>
      <line x1="20" y1="0"  x2="0"  y2="14" stroke="#C8102E" strokeWidth="1.4"/>
      <line x1="10" y1="0"  x2="10" y2="14" stroke="#fff" strokeWidth="3.5"/>
      <line x1="0"  y1="7"  x2="20" y2="7"  stroke="#fff" strokeWidth="3.5"/>
      <line x1="10" y1="0"  x2="10" y2="14" stroke="#C8102E" strokeWidth="2"/>
      <line x1="0"  y1="7"  x2="20" y2="7"  stroke="#C8102E" strokeWidth="2"/>
    </svg>
  ),
  AT: (
    <svg viewBox="0 0 20 14" width="16" height="11" style={{ marginRight: 3, borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="14" fill="#ED2939"/>
      <rect y="4.67" width="20" height="4.67" fill="#fff"/>
    </svg>
  ),
  CH: (
    <svg viewBox="0 0 14 14" width="11" height="11" style={{ marginRight: 3, borderRadius: 2, flexShrink: 0 }}>
      <rect width="14" height="14" fill="#FF0000"/>
      <rect x="5.25" y="2"    width="3.5" height="10" fill="#fff"/>
      <rect x="2"    y="5.25" width="10"  height="3.5" fill="#fff"/>
    </svg>
  ),
};

const QUICK_FILLS = [
  'Late to work',
  'Skipping the gym',
  'Missing a deadline',
  'Forgetting an anniversary',
  'Not replying for 3 days',
];

const REGION_LABEL = {};
Object.values(REGIONS).flat().forEach(r => { REGION_LABEL[r.id] = r.label; });

// ── LOCATION-BASED DEFAULTS ────────────────────────────────────────────────

const getDefaultSettings = () => {
  if (typeof window === 'undefined') return { country: 'US', region: 'US.national' };

  const lang = navigator.language.toLowerCase();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();

  // Language-based detection
  if (lang === 'de-at' || lang === 'de-at') return { country: 'AT', region: 'AT.national' };
  if (lang === 'de-ch' || lang === 'fr-ch' || lang === 'it-ch') return { country: 'CH', region: 'CH.national' };
  if (lang.startsWith('en-gb') || lang === 'en-uk') return { country: 'UK', region: 'UK.national' };
  if (lang.startsWith('en-us') || lang === 'en') return { country: 'US', region: 'US.national' };

  // Timezone-based fallback for Europe
  if (timezone.includes('europe') || timezone.includes('berlin') || timezone.includes('vienna') || timezone.includes('zurich') || timezone.includes('london')) {
    if (timezone.includes('vienna') || timezone.includes('europe/vienna')) return { country: 'AT', region: 'AT.national' };
    if (timezone.includes('zurich') || timezone.includes('europe/zurich')) return { country: 'CH', region: 'CH.national' };
    if (timezone.includes('london') || timezone.includes('europe/london')) return { country: 'UK', region: 'UK.national' };
    return { country: 'UK', region: 'UK.national' }; // Default European
  }

  return { country: 'US', region: 'US.national' }; // Default
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Home() {
  const defaultSettings = getDefaultSettings();
  const [occasion, setOccasion]     = useState('');
  const [tone,     setTone]         = useState('Apologetic');
  const [length,   setLength]       = useState('Short');
  const [country,  setCountry]      = useState(defaultSettings.country);
  const [region,   setRegion]       = useState(defaultSettings.region);
  const [showOptions, setShowOptions] = useState(false);
  const [excuse,   setExcuse]       = useState('');
  const [excuseMeta, setExcuseMeta] = useState('');
  const [loading,  setLoading]      = useState(false);
  const [copied,   setCopied]       = useState(false);

  const handleCountry = useCallback((c) => {
    setCountry(c);
    setRegion(REGIONS[c][0].id);
  }, []);

  const generate = useCallback(async () => {
    const occ = occasion.trim();
    if (!occ) return;

    setLoading(true);
    setExcuse('');

    const system = [
      'You are an expert excuse writer who deeply understands cultural communication styles.',
      'Write a single convincing excuse. No preamble — just the excuse itself.',
      CULTURE_PROMPTS[region] ?? CULTURE_PROMPTS['US.national'],
      TONE_PROMPTS[tone],
      LENGTH_PROMPTS[length],
    ].join(' ');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, user: `Generate an excuse for: ${occ}` }),
      });

      const data = await res.json();

      if (!res.ok) {
        setExcuse(data.error ?? 'Something went wrong — please try again.');
      } else {
        setExcuse(data.text);
        setExcuseMeta(`${REGION_LABEL[region] ?? region} · ${tone} · ${length}`);

        // GA4 event
        if (typeof window !== 'undefined' && typeof window.ga === 'function') {
          window.ga('generate_excuse', { region, tone, length });
        }
      }
    } catch {
      setExcuse('Connection error — please try again.');
    } finally {
      setLoading(false);
    }
  }, [occasion, region, tone, length]);

  const copyExcuse = useCallback(async () => {
    if (!excuse) return;
    await navigator.clipboard.writeText(excuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);

    if (typeof window !== 'undefined' && typeof window.ga === 'function') {
      window.ga('copy_excuse', { region, tone });
    }
  }, [excuse, region, tone]);

  return (
    <>
      {/* ── NAV ── */}
      <div className={styles.navBg} />
      <nav className={styles.nav}>
        <div className={styles.logo}>
          excuses<span className={styles.logoAcc}>.</span>me
        </div>
        <ul className={styles.navLinks}>
          <li>Features</li>
          <li>How it works</li>
          <li>Reviews</li>
        </ul>
        <button className={styles.btnNav}>Try free</button>
      </nav>

      {/* ── AD: Leaderboard ── */}
      <AdSlot type="leaderboard" />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <span className={styles.tagDot} />
          AI-powered · Free to use · No account needed
        </div>
        <h1 className={styles.h1}>
          The excuse you need,{' '}
          <span className={styles.h1Acc}>now.</span>
        </h1>
        <p className={styles.heroSub}>
          Type what you need to get out of. Pick your style and tone. Get a
          convincing, ready-to-use excuse in seconds.
        </p>

        {/* ── GENERATOR ── */}
        <div className={styles.genWrap}>

          {/* Input row */}
          <div className={styles.inputRow}>
            <input
              className={styles.mainInput}
              type="text"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
              placeholder="e.g. missing my cousin's birthday dinner…"
              autoComplete="off"
            />
            <button
              className={styles.btnSubmit}
              onClick={generate}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
              <span>{loading ? '' : 'Generate'}</span>
            </button>
          </div>

          <div className={styles.optionsTriggerRow}>
            <button
              className={styles.toggleOptionsBtn}
              onClick={() => setShowOptions(prev => !prev)}
              type="button"
            >
              <span className={styles.toggleIcon}>{showOptions ? '−' : '+'}</span>
              {showOptions ? 'Hide options' : 'Show options'}
            </button>
            <div className={styles.optionTags}>
              <span className={styles.optionTag}>{tone}</span>
              <span className={styles.optionTag}>{length}</span>
              <span className={styles.optionTag}>
                {region === 'AT.national' ? 'Allgemein AUT' : region === 'CH.national' ? 'Allgemein CH' : (REGION_LABEL[region] || region)}
              </span>
            </div>
          </div>

          {showOptions && (
            <div className={styles.optionsPopover}>
              <div className={styles.controls}>

              {/* Tone */}
              <div className={styles.ctrlGroup}>
                <span className={styles.ctrlLabel}>Tone</span>
                <div className={styles.ctrlPills}>
                  {TONES.map(t => (
                    <button
                      key={t}
                      className={`${styles.cpill} ${tone === t ? styles.cpillActive : ''}`}
                      onClick={() => setTone(t)}
                    >
                      {t === 'Apologetic' ? 'Sorry'
                      : t === 'Professional' ? 'Pro'
                      : t === 'Dramatic' ? 'Drama'
                      : t === 'Creative' ? 'Wild'
                      : t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div className={styles.ctrlGroup}>
                <span className={styles.ctrlLabel}>Length</span>
                <div className={styles.ctrlPills}>
                  {LENGTHS.map(l => (
                    <button
                      key={l}
                      className={`${styles.cpill} ${length === l ? styles.cpillActive : ''}`}
                      onClick={() => setLength(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country + Region */}
              <div className={styles.ctrlGroupFull}>
                <div className={styles.ctrlGroupRow}>
                  <span className={styles.ctrlLabel}>Style</span>
                  <div className={styles.ctrlPills}>
                    {COUNTRIES.map(c => (
                      <button
                        key={c}
                        className={`${styles.cpill} ${styles.cpillFlag} ${country === c ? styles.cpillActive : ''}`}
                        onClick={() => handleCountry(c)}
                      >
                        {COUNTRY_FLAGS[c]}
                        {c === 'AT' ? 'Austria' : c === 'CH' ? 'Swiss' : c}
                      </button>
                    ))}
                  </div>
                </div>
                {REGIONS[country]?.length > 1 && (
                  <div className={styles.ctrlGroupRow} style={{ paddingLeft: 46 }}>
                    <span className={styles.ctrlLabelDim}>Region</span>
                    <div className={styles.ctrlPills} style={{ flexWrap: 'wrap' }}>
                      {REGIONS[country].map(r => (
                        <button
                          key={r.id}
                          className={`${styles.cpill} ${region === r.id ? styles.cpillActive : ''}`}
                          onClick={() => setRegion(r.id)}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          )}

          {/* Result */}
          {excuse && (
            <div className={styles.resultBox}>
              <p className={styles.resultText}>{excuse}</p>
              <div className={styles.resultActions}>
                <span className={styles.resultMeta}>{excuseMeta}</span>
                <div className={styles.resultBtns}>
                  <button className={styles.rbtn} onClick={copyExcuse}>
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button className={styles.rbtn} onClick={generate}>
                    New version
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick-fill */}
          <div className={styles.qf}>
            {QUICK_FILLS.map((q, i) => (
              <span key={q}>
                {i > 0 && <span className={styles.qfSep}>/</span>}
                <span
                  className={styles.qfItem}
                  onClick={() => setOccasion(q)}
                >
                  {q}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.stats}>
        <div className={styles.statsInner}>
          {[
            ['2.4M+', 'Excuses written'],
            ['98%',   'Believed rate'],
            ['47',    'Categories'],
            ['4.9',   'Average rating'],
          ].map(([n, l]) => (
            <div key={l} className={styles.stat}>
              <span className={styles.statN}>{n}</span>
              <span className={styles.statL}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── AD: Rectangle ── */}
      <AdSlot type="rectangle" />

      {/* ── FEATURES ── */}
      <section className={styles.features}>
        <div className={styles.secLabel}>Features</div>
        <h2 className={styles.h2}>Everything you need.<br />Nothing you don't.</h2>
        <p className={styles.secSub}>Built for the moment of panic. Designed to feel effortless.</p>
        <div className={styles.featGrid}>
          {[
            {
              icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
              title: 'Context-aware',
              desc:  'Reads your specific situation. Writes an excuse that fits the relationship, stakes, and moment.',
            },
            {
              icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
              title: 'Five tones',
              desc:  'Apologetic, funny, professional, dramatic, or creative. Same situation — five different excuses.',
            },
            {
              icon: <svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>,
              title: 'Three lengths',
              desc:  'A quick line for a text, or a full paragraph for the email that really needs to land.',
            },
            {
              icon: <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3"/></svg>,
              title: 'Instant regeneration',
              desc:  'Not quite right? One click gets you a completely fresh take on the same situation.',
            },
            {
              icon: <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              title: 'Nothing stored',
              desc:  'Your situation disappears the moment you close the tab. No logs. No history.',
            },
            {
              icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
              title: 'Under 3 seconds',
              desc:  'Results arrive before the panic sets in. Fast enough for the message you needed 5 minutes ago.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={styles.featCard}>
              <div className={styles.featIcon}>{icon}</div>
              <h3 className={styles.featTitle}>{title}</h3>
              <p className={styles.featDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <div className={styles.how}>
        <div className={styles.howInner}>
          <div className={styles.howLeft}>
            <div className={styles.secLabel}>How it works</div>
            <h2 className={styles.h2}>Three steps.<br />Zero effort.</h2>
            <p className={styles.secSub}>No setup. No account. Just the excuse you need.</p>
            <div className={styles.steps}>
              {[
                { n: '01', title: 'Describe the situation', desc: 'Type what you need to get out of — a phrase is enough. The AI fills in the rest.' },
                { n: '02', title: 'Choose tone, length & style', desc: 'Match the register to your audience. Different people need very different approaches.' },
                { n: '03', title: 'Copy and deliver', desc: 'Your excuse is ready in seconds. Copy it, send it, say it. Done.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className={styles.step}>
                  <div className={styles.stepNum}>{n}</div>
                  <div>
                    <h4 className={styles.stepTitle}>{title}</h4>
                    <p className={styles.stepDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.howRight}>
            <div className={styles.mockLine} style={{ width: '45%' }} />
            <div className={styles.mockLine} style={{ width: '70%' }} />
            <div className={styles.mockInput}>
              <div className={styles.mockInputText} />
              <div className={styles.mockBtn} />
            </div>
            <div className={styles.mockResult}>
              <div className={styles.mockLine} style={{ width: '100%' }} />
              <div className={styles.mockLine} style={{ width: '70%' }} />
              <div className={styles.mockLine} style={{ width: '60%', background: 'var(--acc2)' }} />
              <div className={styles.mockLine} style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonials}>
        <div className={styles.secLabel}>Reviews</div>
        <h2 className={styles.h2}>It actually works.</h2>
        <div className={styles.testiGrid}>
          {[
            { init: 'JL', name: 'Jamie L.', role: 'Account Manager',      quote: '"Used the Professional tone for a missed client call. My boss actually complimented how I handled it."' },
            { init: 'SK', name: 'Sam K.',   role: 'Professional Avoider', quote: '"Dramatic mode saved my relationship. My partner forgot they were even mad. I\'ve used it four times since."' },
            { init: 'MR', name: 'Morgan R.', role: 'Enthusiastic Non-Exerciser', quote: '"Skipped the gym 47 times. My trainer believes every single excuse. I sleep soundly and have no regrets."' },
          ].map(({ init, name, role, quote }) => (
            <div key={name} className={styles.testi}>
              <div className={styles.testiStars}>
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" width="11" height="11">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--acc)" />
                  </svg>
                ))}
              </div>
              <p className={styles.testiQuote}>{quote}</p>
              <div className={styles.testiAuthor}>
                <div className={styles.av}>{init}</div>
                <div>
                  <div className={styles.testiName}>{name}</div>
                  <div className={styles.testiRole}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AD: Banner ── */}
      <AdSlot type="banner" />

      {/* ── FINAL CTA ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.h2}>Start with your<br />first excuse.</h2>
        <p className={styles.ctaBody}>Free, instant, no account needed. Just type and go.</p>
        <div className={styles.ctaBtns}>
          <button
            className={`${styles.btnLg} ${styles.btnLgDark}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => document.querySelector(`.${styles.mainInput}`)?.focus(), 400);
            }}
          >
            Try it now
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          excuses<span className={styles.logoAcc}>.</span>me
        </div>
        <div className={styles.footLinks}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
        <span className={styles.footCopy}>© 2026 — use responsibly</span>
      </footer>
    </>
  );
}

// ── AD SLOT COMPONENT ─────────────────────────────────────────────────────────
function AdSlot({ type }) {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const slotIds = {
    leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD,
    rectangle:   process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE,
    banner:      process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER,
  };

  const dims = {
    leaderboard: { width: '100%', maxWidth: 728, height: 90 },
    rectangle:   { width: 300, height: 250 },
    banner:      { width: '100%', maxWidth: 728, height: 60 },
  }[type];

  if (!ADSENSE_ID) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0.6rem 2rem' }}>
      <div
        style={{
          ...dims,
          background: 'var(--bg2)',
          border: '1px dashed #ddd',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', top: 3, right: 6, fontSize: '0.58rem', color: '#ccc', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          advertisement
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={slotIds[type]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle=window.adsbygoogle||[]).push({});' }} />
      </div>
    </div>
  );
}
