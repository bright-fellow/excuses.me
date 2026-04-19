'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './page.module.css';
import ErrorBoundary from './components/ErrorBoundary';

// ── SUPABASE CLIENT (browser-side auth) ───────────────────────────────────────
const _sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const _sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = _sbUrl && _sbKey
  ? createClient(_sbUrl, _sbKey, { auth: { flowType: 'implicit', detectSessionInUrl: true, persistSession: true } })
  : null;

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

const SCENARIOS = {
  General: {
    label: 'General',
    examples: ['Late to work', 'Missing a deadline', 'Skipping the gym'],
  },
  Social: {
    label: 'Social & Parties',
    examples: ['Late to a party', "Can't make happy hour", 'Bailing on a group hangout'],
  },
  Work: {
    label: 'Work & School',
    examples: ['Late to a meeting', 'Missed a deadline', 'Calling in sick'],
  },
  Relationships: {
    label: 'Relationships',
    examples: ['Forgetting an anniversary', 'Late for a date', 'Not replying for days'],
  },
  Home: {
    label: 'Work-from-Home',
    examples: ['Internet down', 'Power outage', 'Pet emergency'],
  },
};

const PLACEHOLDERS = {
  US: 'e.g. late because the 405 was a total mess…',
  UK: 'e.g. stuck on the Tube, need a polite excuse…',
  AT: 'e.g. wegen dem Zugstreik komme ich später…',
  CH: 'e.g. wegen Stau in Zürich werde ich später…',
};

const REGION_HINTS = {
  'US.national': 'A straight-talking American style with clear apology and upbeat energy.',
  'US.NYC': 'Fast, direct New York speak — blunt, confident, and no-nonsense.',
  'US.LA': 'Laid-back LA style with breezy vibes and a touch of wellness tone.',
  'US.South': 'Warm Southern charm with gracious politeness and heartfelt apology.',
  'US.Midwest': 'Humble Midwestern honesty, perfect for a sincere, down-to-earth excuse.',
  'US.Texas': 'Big-hearted Texan swagger with warm confidence and a solid promise to make it right.',
  'US.NewEngland': 'Dry New England matter-of-fact style — efficient and honest without the fluff.',
  'UK.national': 'Polite British understatement, honest and politely apologetic.',
  'UK.London': 'Articulate London phrasing with polished, professional tone.',
  'UK.Cockney': 'Playful Cockney slang with colourful local phrases and rhythm.',
  'UK.Manchester': 'Straight-talking northern English with warm, no-nonsense honesty.',
  'UK.Leeds': 'Blunt Yorkshire style — short, sincere, and to the point.',
  'UK.Liverpool': 'Chatty Scouse warmth with friendly, slightly dramatic phrasing.',
  'UK.Scotland': 'Dry Scottish humour with honest, practical wording.',
  'UK.Wales': 'Warm Welsh cadence with community-minded sincerity.',
  'UK.Posh': 'Over-polished upper-class British style, very formal and theatrical.',
  'AT.national': 'Austrian German with polite formality and a touch of resigned charm.',
  'AT.Vienna': 'Wiener Schmäh — charming, a little cheeky, and unmistakably Viennese.',
  'AT.Tirol': 'Tyrolean directness with rustic honesty and grounded warmth.',
  'AT.Styria': 'Steirisch earnestness with hospitality and a hint of stubborn pride.',
  'AT.Salzburg': 'Cultured Salzburg tone with polite friendliness.',
  'AT.Vorarlberg': 'Alemannic Austrian style: practical, direct, and reliable.',
  'AT.Burgenland': 'Warm Burgenland phrasing with rural sincerity.',
  'AT.Carinthia': 'Kärntner flair with cheerful honesty and natural charm.',
  'AT.LowerAustria': 'Niederösterreich politeness with gentle countryside warmth.',
  'AT.UpperAustria': 'Oberösterreich practicality with steady, reliable wording.',
  'CH.national': 'Swiss German precision with concise, dependable phrasing.',
  'CH.Zurich': 'Zurich business tone: sharp, efficient, and to the point.',
  'CH.Bern': 'Bernese calm and measured speech, thoughtful and reliable.',
  'CH.Basel': 'Basel style with cultured warmth and understated confidence.',
  'CH.Geneva': 'Swiss French precision with courteous and diplomatic phrasing.',
  'CH.Valais': 'Walliser warmth with mountain pride and direct kindness.',
  'CH.Ticino': 'Ticinese Italian charm with friendly, direct wording.',
  'CH.Graubuenden': 'Rumantsch clarity with calm, precise phrasing.',
  'CH.Lucerne': 'Luzern warmth with traditional Swiss friendliness.',
  'CH.StGallen': 'St. Gallen reliability with creative, grounded wording.',
  'CH.Thurgau': 'Thurgau directness with countryside friendliness.',
  'CH.Zug': 'Zug discretion and understated professionalism.',
  'CH.Aargau': 'Aargau practicality with open and clear phrasing.',
};

const REGION_EXAMPLES = {
  'US.national': "Sorry, I got tied up with a last-minute issue and I'll be there as soon as possible.",
  'US.NYC': "I'm running late because the subway got stuck downtown — be there in 15.",
  'US.LA': "Totally sorry, traffic on the 405 was insane; I'll be there as soon as it clears.",
  'US.South': "I'm sorry, family came to town unexpectedly and I'm running a bit behind.",
  'US.Midwest': "I had a little car trouble on the way and I'm trying to get back there right now.",
  'US.Texas': "My truck wouldn't start and I'm working on getting there as fast as I can.",
  'US.NewEngland': "I'm delayed by a broken down bus; I should be there shortly.",
  'UK.national': "I'm terribly sorry, I've been delayed on the commute and will arrive soon.",
  'UK.London': "Apologies, the Central line is held and I'm doing my best to get there fast.",
  'UK.Cockney': "Sorry mate, my dog and bone died on me and I'm running a bit late.",
  'UK.Manchester': "I'm sorry, it's been proper hectic on the way, but I'll be there shortly.",
  'UK.Leeds': "Can't make it on time, nowt but bad luck on the way in.",
  'UK.Liverpool': "Honest to God, la, I'm stuck in traffic and I'll be there in a bit.",
  'UK.Scotland': "Sorry, I've been caught up with a wee problem, but I'm on my way.",
  'UK.Wales': "I'm really sorry, a family thing held me up, and I'm coming as soon as I can.",
  'UK.Posh': 'I do apologise profusely; an unavoidable delay has arisen, and I shall be there shortly.',
  'AT.national': 'Entschuldigung, ich bin wegen einer Zugverspätung später dran.',
  'AT.Vienna': 'I hob mi beim Heurigen verzettelt, kumm sofoch wie möglich.',
  'AT.Tirol': "I bin beim Weg runter ins Tal a bissl aufgehalten wor'n, kumm bald.",
  'AT.Styria': "Tut mir leid, wegen der Weinernte gibt's a Verzögerung, ich bin bald da.",
  'AT.Salzburg': 'Entschuldigung, durch den Stau bin ich etwas spät, komme gleich.',
  'AT.Vorarlberg': 'I bi wegen em Verkehr uf dä Autobahn no nüt ganz parat, chum bald.',
  'AT.Burgenland': 'Entschuldigung, do war a Familienbesuch, komm gleich heim.',
  'AT.Carinthia': 'Sorry, ich hob a klean Problem ghabt, bin bald wieder da.',
  'AT.LowerAustria': 'Tut mir leid, der Verkehr hat mich aufgehalten, ich bin fast dort.',
  'AT.UpperAustria': 'I bin bei da Arbeit no hängen geblieben, kumm bald.',
  'CH.national': 'Sorry, ich bi no im Stau \u2013 ich t\u00fce bald aacho.',
  'CH.Zurich': 'Entschuldigung, i bi im Stau uf d\u00e4 Sihlhochstrasse, chum so schnell wie m\u00f6glich.',
  'CH.Bern': 'Sorry, es isch chli chaotisch gsi, aber ich bi unterwegs.',
  'CH.Basel': 'Tut mir leid, ich bi no im Feierabend-Verkehr, ich chume bald.',
  'CH.Geneva': "Je suis retard\u00e9 par un probl\u00e8me de train, j'arrive bient\u00f4t.",
  'CH.Valais': "D'sch \u00e4n bitz Strooss isch gstoppt worde, ich bi bald da.",
  'CH.Ticino': 'Scusa, il traffico era pazzo, arrivo il prima possibile.',
  'CH.Graubuenden': 'Jau, es isch \u00f6ppis cho, aber ich bi bald do.',
  'CH.Lucerne': 'Sorry, ds Tor isch zue gha, ich bi grad ufem W\u00e4g.',
  'CH.StGallen': 'I bi grad dr\u00fcmpfer ghalte worde, chum bald.',
  'CH.Thurgau': 'Mir isch de Bus usegfalle, i bi grad unterw\u00e4gs.',
  'CH.Zug': 'Entschuldigung, ich werde mich versp\u00e4ten, bin gleich da.',
  'CH.Aargau': 'Sorry, ich han no e mini Verz\u00f6gerig, bin fast da.',
};

const REGION_LABEL = {};
Object.values(REGIONS).flat().forEach(r => { REGION_LABEL[r.id] = r.label; });

// ── LOCATION-BASED DEFAULTS ────────────────────────────────────────────────

const getDefaultSettings = () => {
  if (typeof window === 'undefined') return { country: 'US', region: 'US.national' };
  const lang = navigator.language.toLowerCase();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
  if (lang === 'de-at') return { country: 'AT', region: 'AT.national' };
  if (lang === 'de-ch' || lang === 'fr-ch' || lang === 'it-ch') return { country: 'CH', region: 'CH.national' };
  if (lang.startsWith('en-gb') || lang === 'en-uk') return { country: 'UK', region: 'UK.national' };
  if (lang.startsWith('en-us') || lang === 'en') return { country: 'US', region: 'US.national' };
  if (timezone.includes('vienna')) return { country: 'AT', region: 'AT.national' };
  if (timezone.includes('zurich')) return { country: 'CH', region: 'CH.national' };
  if (timezone.includes('london')) return { country: 'UK', region: 'UK.national' };
  if (timezone.includes('europe')) return { country: 'UK', region: 'UK.national' };
  return { country: 'US', region: 'US.national' };
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function trackEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.ga === 'function') {
    window.ga(name, params ?? {});
  }
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [occasion, setOccasion]         = useState('');
  const [scenario, setScenario]         = useState('General');
  const [tone,     setTone]             = useState('Apologetic');
  const [length,   setLength]           = useState('Short');
  // Start with the server-safe default; locale detection runs after mount
  const [country,  setCountry]          = useState('US');
  const [region,   setRegion]           = useState('US.national');
  const [showOptions, setShowOptions]   = useState(false);
  const [excuse,   setExcuse]           = useState('');
  const [excuseMeta, setExcuseMeta]     = useState('');
  const [loading,  setLoading]          = useState(false);
  const [copied,   setCopied]           = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const recognitionRef = useRef(null);
  const [userExcuse, setUserExcuse]     = useState('');
  const [topExcuses, setTopExcuses]     = useState([]);
  const [topLoading, setTopLoading]     = useState(true);
  const [toast,      setToast]          = useState(null); // { msg, type: 'error'|'info' }
  const toastTimer = useRef(null);

  // ── Auth state ─────────────────────────────────────────────────────────────
  const [user,           setUser]           = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [authLoading,    setAuthLoading]    = useState(false);

  const showToast = useCallback((msg, type = 'error') => {
    setToast({ msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  // Apply locale-based defaults after mount — avoids SSR/client mismatch
  useEffect(() => {
    const { country: c, region: r } = getDefaultSettings();
    setCountry(c);
    setRegion(r);
  }, []);

  // ── Init auth listener ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // Auto-open submit modal if returning from OAuth with pending submit
      if (session?.user && typeof window !== 'undefined') {
        const pending = window.localStorage.getItem('excuses_pending_submit');
        if (pending) {
          window.localStorage.removeItem('excuses_pending_submit');
          setShowSubmitModal(true);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTopExcuses = useCallback(async () => {
    try {
      const res = await fetch('/api/top-excuses');
      const data = await res.json();
      if (data.excuses) setTopExcuses(data.excuses);
    } catch (err) {
      console.error('Failed to fetch top excuses:', err);
    } finally {
      setTopLoading(false);
    }
  }, []);

  useEffect(() => { fetchTopExcuses(); }, [fetchTopExcuses]);

  // ── Auth actions ───────────────────────────────────────────────────────────
  const signIn = useCallback(async (provider) => {
    if (!supabase) return;
    setAuthLoading(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('excuses_pending_submit', '1');
    }
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : '/' },
    });
    setAuthLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  // ── Like ───────────────────────────────────────────────────────────────────
  const likeExcuse = useCallback(async (id) => {
    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        setTopExcuses(prev => prev.map(exc => exc.id === id ? { ...exc, likes: data.likes } : exc));
      }
    } catch (err) {
      console.error('Failed to like excuse:', err);
    }
  }, []);

  const handleCountry = useCallback((c) => {
    setCountry(c);
    setRegion(REGIONS[c][0].id);
  }, []);

  // ── Generate ───────────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    const occ = occasion.trim();
    if (!occ) return;
    setLoading(true);
    setExcuse('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion: occ, region, tone, length }),
      });
      const data = await res.json();
      if (!res.ok) {
        setExcuse(data.error ?? 'Something went wrong — please try again.');
      } else {
        setExcuse(data.text);
        setExcuseMeta(`${REGION_LABEL[region] ?? region} · ${tone} · ${length}`);
        trackEvent('generate_excuse', { region, tone, length });
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
    trackEvent('copy_excuse', { region, tone });
  }, [excuse, region, tone]);

  const startVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast("Voice input isn't supported in this browser. Try Chrome or Safari.", 'info');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart  = () => setVoiceListening(true);
    recognition.onend    = () => { setVoiceListening(false); recognitionRef.current = null; };
    recognition.onresult = (event) => setOccasion(event.results[0][0].transcript);
    recognition.onerror  = () => { setVoiceListening(false); recognitionRef.current = null; };
    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  useEffect(() => () => { recognitionRef.current?.abort(); }, []);

  // ── Submit modal trigger — requires auth ──────────────────────────────────
  const handleSubmitClick = useCallback(() => {
    if (!supabase || !user) {
      setShowLoginModal(true);
    } else {
      setShowSubmitModal(true);
    }
  }, [user]);

  // ── Submit excuse ──────────────────────────────────────────────────────────
  const submitUserExcuse = useCallback(async () => {
    if (!userExcuse.trim()) return;
    try {
      const session = supabase ? (await supabase.auth.getSession()).data.session : null;
      const token   = session?.access_token;

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ text: userExcuse.trim(), region, tone, length }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserExcuse('');
        setShowSubmitModal(false);
        fetchTopExcuses();
      } else {
        showToast(data.error || 'Failed to submit excuse. Please try again.');
      }
    } catch (err) {
      showToast('Connection error — please try again.');
      console.error(err);
    }
  }, [userExcuse, region, tone, length, fetchTopExcuses]);

  // ── Scroll-to helpers for nav ─────────────────────────────────────────────
  const goToGenerator = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => document.querySelector(`.${styles.mainInput}`)?.focus(), 400);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <div className={styles.navBg} />
      <nav className={styles.nav}>
        <div className={styles.logo}>
          excuses<span className={styles.logoAcc}>.</span>me
        </div>
        <ul className={styles.navLinks}>
          <li onClick={() => scrollTo('features')}>Features</li>
          <li onClick={() => scrollTo('how')}>How it works</li>
          <li onClick={() => scrollTo('top-excuses')}>Top Excuses</li>
        </ul>
        {supabase && (
          user ? (
            <button className={styles.btnNavUser} onClick={signOut} title="Sign out">
              <span className={styles.userAvatar}>{(user.email?.[0] ?? '?').toUpperCase()}</span>
              <span className={styles.userLabel}>Sign out</span>
            </button>
          ) : (
            <button className={styles.btnNav} onClick={() => setShowLoginModal(true)}>
              Sign in
            </button>
          )
        )}
      </nav>

      {/* ── AD: Leaderboard ── */}
      <AdSlot type="leaderboard" />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <span className={styles.tagDot} />
          AI-powered · Free forever · No credit card
        </div>
        <h1 className={styles.h1}>
          The excuse you need,{' '}
          <span className={styles.h1Acc}>now.</span>
        </h1>
        <p className={styles.heroSub}>
          Type your situation. Pick a voice — from NYC bluntness to Swiss German charm. Get a real excuse that actually works.
        </p>

        {/* ── GENERATOR ── */}
        <ErrorBoundary>
        <div className={styles.genWrap}>

          {/* Scenario selector */}
          <div className={styles.scenarioRow}>
            <span className={styles.scenarioLabel}>Category</span>
            <div className={styles.scenarioPills}>
              {Object.keys(SCENARIOS).map(s => (
                <button
                  key={s}
                  className={`${styles.scenarioPill} ${scenario === s ? styles.scenarioPillActive : ''}`}
                  onClick={() => setScenario(s)}
                >
                  {SCENARIOS[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick-fill examples — shown right under the category */}
          <div className={styles.qf}>
            {SCENARIOS[scenario].examples.map((q, i) => (
              <span key={q}>
                {i > 0 && <span className={styles.qfSep}>/</span>}
                <span className={styles.qfItem} onClick={() => setOccasion(q)}>{q}</span>
              </span>
            ))}
          </div>

          {/* Input row */}
          <div className={styles.inputRow}>
            <input
              className={styles.mainInput}
              type="text"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
              placeholder={PLACEHOLDERS[country] || "e.g. missing my cousin's birthday dinner…"}
              autoComplete="off"
            />
            <button
              className={styles.voiceBtn}
              onClick={startVoiceInput}
              disabled={voiceListening}
              title="Voice input"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
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
              <span>{loading ? '' : 'Get excuse'}</span>
            </button>
          </div>

          <div className={styles.optionsTriggerRow}>
            <button
              className={styles.toggleOptionsBtn}
              onClick={() => setShowOptions(prev => !prev)}
              type="button"
            >
              <span className={styles.toggleIcon}>{showOptions ? '−' : '+'}</span>
              {showOptions ? 'Hide style controls' : 'Show style controls'}
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
                <div className={styles.styleHint}>
                  <div>{REGION_HINTS[region] || 'Pick a style to give your excuse a local, believable voice.'}</div>
                  {REGION_EXAMPLES[region] && (
                    <div className={styles.styleExample}>
                      "{REGION_EXAMPLES[region]}"
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
                    Shake it up
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
        </ErrorBoundary>

        {/* ── TOP EXCUSES ── */}
        <div id="top-excuses" className={styles.topExcuses}>
          <div className={styles.topExcusesHeader}>
            <h3 className={styles.topExcusesTitle}>Top Excuses</h3>
            <p className={styles.topExcusesSub}>Popular ones that actually work</p>
            <button className={styles.submitBtn} onClick={handleSubmitClick}>
              {user ? 'Share Your Excuse' : 'Sign in to Share'}
            </button>
          </div>
          {topLoading ? (
            <div className={styles.topExcusesGrid}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`${styles.topExcuseCard} ${styles.skeletonCard}`}>
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineLong}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineMed}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                </div>
              ))}
            </div>
          ) : topExcuses.length > 0 ? (
            <div className={styles.topExcusesGrid}>
              {topExcuses.map((exc) => (
                <div key={exc.id} className={styles.topExcuseCard}>
                  <p className={styles.topExcuseText}>{exc.text}</p>
                  <div className={styles.topExcuseMeta}>
                    <span>{exc.region} · {exc.tone} · {exc.length}</span>
                    <div className={styles.topExcuseActions}>
                      <button className={styles.topExcuseLike} onClick={() => likeExcuse(exc.id)}>
                        +1 {exc.likes}
                      </button>
                      <button className={styles.topExcuseCopy} onClick={() => navigator.clipboard.writeText(exc.text)}>Copy</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.topExcusesEmpty}>
              No excuses yet — be the first to share one!
            </div>
          )}
        </div>

      </section>

      {/* ── AD: Rectangle ── */}
      <AdSlot type="rectangle" />

      {/* ── FEATURES ── */}
      <section id="features" className={styles.features}>
        <div className={styles.secLabel}>Features</div>
        <h2 className={styles.h2}>Everything you need.<br />Nothing you don&apos;t.</h2>
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
      <div id="how" className={styles.how}>
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

      {/* ── AD: Banner ── */}
      <AdSlot type="banner" />

      {/* ── FINAL CTA ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.h2}>Start with your<br />first excuse.</h2>
        <p className={styles.ctaBody}>Free, instant, no account needed. Just type and go.</p>
        <div className={styles.ctaBtns}>
          <button
            className={`${styles.btnLg} ${styles.btnLgDark}`}
            onClick={goToGenerator}
          >
            Generate now
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          excuses<span className={styles.logoAcc}>.</span>me
        </div>
        <div className={styles.footLinks}>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:hello@excuses.me">Contact</a>
        </div>
        <span className={styles.footCopy}>© 2026 — use responsibly. Ads help keep this service free.</span>
      </footer>

      {/* ── SUBMIT MODAL ── */}
      {showSubmitModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSubmitModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h4 className={styles.modalTitle}>Share Your Excuse</h4>
            <textarea
              className={styles.modalTextarea}
              value={userExcuse}
              onChange={e => setUserExcuse(e.target.value)}
              placeholder="Share a funny or useful excuse you've used…"
              rows={4}
            />
            <p className={styles.modalNote}>
              Keep it clean — submissions are moderated. By sharing you agree to our{' '}
              <a href="/privacy" target="_blank">Privacy Policy</a>.
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.modalCancel} onClick={() => setShowSubmitModal(false)}>Cancel</button>
              <button className={styles.modalSubmit} onClick={submitUserExcuse}>Share</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'info' ? styles.toastInfo : styles.toastError}`}>
          {toast.msg}
          <button className={styles.toastClose} onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* ── LOGIN MODAL ── */}
      {showLoginModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLoginModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowLoginModal(false)} aria-label="Close">✕</button>
            <h4 className={styles.modalTitle}>Sign in to share</h4>
            <p className={styles.loginSub}>
              Generating excuses is always free. Sign in to share yours with the community.
            </p>
            <div className={styles.loginBtns}>
              <button
                className={styles.loginBtn}
                onClick={() => signIn('google')}
                disabled={authLoading}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" style={{ flexShrink: 0 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button
                className={`${styles.loginBtn} ${styles.loginBtnApple}`}
                onClick={() => signIn('apple')}
                disabled={authLoading}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
            </div>
            <p className={styles.loginNote}>No spam. No nonsense. Just excuses.</p>
          </div>
        </div>
      )}
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

  useEffect(() => {
    if (!ADSENSE_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet — the auto-ads script will handle it
    }
  }, [ADSENSE_ID]);

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
      </div>
    </div>
  );
}
