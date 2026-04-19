export const CULTURE_PROMPTS = {
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
  'AT.Carinthia':  `Schreibe im Kärntner Stil — lebhaft, naturverbunden, mit slowenischen Einflüssen. Verwende kärntnerische Ausdrücke und Grammatik. Fröhlich und direkt.`,
  'AT.LowerAustria': `Schreibe im Niederösterreichischen Stil — traditionell, weinbaugeprägt, höflich. Verwende niederösterreichische Ausdrücke und Grammatik. Kultiviert und zuvorkommend.`,
  'AT.UpperAustria': `Schreibe im Oberösterreichischen Stil — industriell, fleißig, mit bayerischen Einflüssen. Verwende oberösterreichische Ausdrücke und Grammatik. Praktisch und verlässlich.`,

  'CH.national':    `Schrib uf Schwiizerdütsch. Präzis, sachlich, zueverlässig. Kei Übertreibige. Verwende Schweizerdeutsche Ausdrück und Grammatik. Konkrete Vorschlag zur Wiedergutmachung am End.`,
  'CH.Zurich':      `Schrib im Zürcher Stil — gschäftsmässig, urban, e bitz kühl aber korrekt. Effizienz isch alles. Verwende Zürcherdeutsche Ausdrück und Grammatik. Kurz, klar, professionell.`,
  'CH.Bern':        `Schrib im Berner Stil — gemächlich, besonnen, freundlich. Der Berner isch verlässlich, aber in sim eigne Tempo. Verwende Berndeutsche Ausdrück und Grammatik.`,
  'CH.Basel':       `Schrib im Basler Stil — weltoff, kultiviert, mit ere Prise rheinische Gelassenheit. Verwende Baslerdeutsche Ausdrück und Grammatik. Gebildet und sachlich, aber nid ohni Wärme.`,
  'CH.Geneva':      `Écris dans un style genevois — en français suisse. Formel, diplomatique, courtois. Le ton est professionnel et mesuré. Propose une solution concrète à la fin.`,
  'CH.Valais':      `Schrib im Walliser Stil — herzlich, bodenständig, stolz uf d'Bergwelt. Verwende Walliserdeutsche Ausdrück und Grammatik. Direkter und wärmer als Zürich.`,
  'CH.Ticino':      `Scrivi in italiano svizzero. Stile cordiale, preciso, affidabile. Nessuna esagerazione. Suggerisci una soluzione concreta alla fine.`,
  'CH.Graubuenden': `Scriver in rumantsch grischun. Stil cordial, precis, fidabel. Nagina exaggeraziun. Suggescha ina soluziun concreta a la fin.`,
  'CH.Lucerne':     `Schrib im Luzerner Stil — herzlich, traditionsbewusst, am Vierwaldstättersee gelegen. Verwende luzernerdeutsche Ausdrück und Grammatik. Freundlich und zuverlässig.`,
  'CH.StGallen':    `Schrib im St. Galler Stil — textilgeprägt, innovativ, mit ostschweizerischem Flair. Verwende st.gallerische Ausdrück und Grammatik. Kreativ und bodenständig.`,
  'CH.Thurgau':     `Schrib im Thurgauer Stil — ländlich, am Bodensee, mit alemannischem Einschlag. Verwende thurgauische Ausdrück und Grammatik. Gemütlich und direkt.`,
  'CH.Zug':         `Schrib im Zuger Stil — wohlhabend, am Zugersee, diskret. Verwende zugische Ausdrück und Grammatik. Höflich und professionell.`,
  'CH.Aargau':      `Schrib im Aargauer Stil — industriell, vielfältig, mit badischem Einfluss. Verwende aargauische Ausdrück und Grammatik. Praktisch und offen.`,
};

export const TONE_PROMPTS = {
  Apologetic:   'The tone should be sincere, remorseful, and apologetic — sound genuinely sorry.',
  Funny:        'The tone should be humorous and self-deprecating — funny but still plausible.',
  Professional: 'The tone should be polished, formal, and corporate-appropriate.',
  Dramatic:     'The tone should be outrageously theatrical and over-the-top.',
  Creative:     'The tone should be wildly inventive — unexpected but oddly believable.',
};

export const LENGTH_PROMPTS = {
  Short:  '1-2 sentences. Punchy and direct.',
  Medium: '3-4 sentences. Enough detail to be convincing.',
  Long:   '5-7 sentences. A full layered narrative with specific details.',
};

export const VALID_REGIONS = new Set(Object.keys(CULTURE_PROMPTS));
export const VALID_TONES   = new Set(Object.keys(TONE_PROMPTS));
export const VALID_LENGTHS = new Set(Object.keys(LENGTH_PROMPTS));
