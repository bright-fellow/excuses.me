export const CULTURE_PROMPTS = {
  // ── United States ──────────────────────────────────────────────────────────
  'US.national': `
    Voice: confident, direct American. Warm but never grovelling.
    Do use: a brief positive spin at the end ("I really appreciate your patience", "I'll make it up to you").
    Do use: first-person assertiveness — own the mistake without over-explaining.
    Avoid: British understatement, excessive hedging, or Germanic formality.
  `,
  'US.NYC': `
    Voice: fast-talking New Yorker. Zero fluff, maximum density.
    Do use: blunt shorthand ("I'm running behind", "subway held us up", "be there in 15").
    Do use: the implicit assumption that the other person is also busy and gets it.
    Avoid: lengthy apologies, warmth for its own sake, or anything that sounds Southern.
  `,
  'US.LA': `
    Voice: breezy Los Angeles. Casual, wellness-adjacent, traffic-aware.
    Do use: "totally my bad", "it's been such a crazy week", "the 405 was a nightmare".
    Do use: a vague sense that the universe conspired against you, not your fault.
    Avoid: bluntness, formality, or anything that sounds like work is the priority.
  `,
  'US.South': `
    Voice: warm Southern US hospitality — gracious, unhurried, genuinely sorry.
    Do use: "bless your heart"-adjacent warmth, references to family or community.
    Do use: "I do hope you'll forgive me", "I'm just beside myself about this".
    Avoid: bluntness, brevity for its own sake, or any hint of NYC energy.
  `,
  'US.Midwest': `
    Voice: Midwestern sincerity — self-deprecating, modest, almost over-apologetic.
    Do use: "Shoot, I'm real sorry", "I should've planned better", earnest over-explanation of something mundane.
    Do use: the sense that this has caused genuine personal embarrassment.
    Avoid: swagger, wit, or anything that sounds coastal.
  `,
  'US.Texas': `
    Voice: Texan — big-hearted, confident, generous apology with backbone.
    Do use: "I give you my word", references to scale ("this is a big deal to me too").
    Do use: warmth that feels earned, not automatic — and a concrete promise.
    Avoid: self-deprecation, hedging, or anything that sounds apologetic to a fault.
  `,
  'US.NewEngland': `
    Voice: dry New England restraint — brief, honest, slightly blunt, not unkind.
    Do use: efficient language, factual framing, minimal emotional colour.
    Do use: the sense that over-apologising would be embarrassing for both parties.
    Avoid: warmth for its own sake, Southern grace, or anything over two sentences (for short).
  `,

  // ── United Kingdom ─────────────────────────────────────────────────────────
  'UK.national': `
    Voice: standard British — understated, indirect, excessively polite.
    Do use: elevating a mild inconvenience to near-catastrophe with calm language ("I'm afraid things have gone rather pear-shaped").
    Do use: apologising for things that aren't your fault, hedging everything.
    Avoid: directness, American assertiveness, or resolving with a positive spin.
  `,
  'UK.London': `
    Voice: educated London professional — measured, politely regretful, modern.
    Do use: commuter references ("the Central line", "signal failure at Paddington").
    Do use: considered language that sounds like it was drafted on the Tube.
    Avoid: Cockney slang, excessive formality, or anything that sounds like it's from outside the M25.
  `,
  'UK.Cockney': `
    Voice: authentic East End Cockney. Rhyming slang is non-negotiable.
    Do use: "dog and bone" (phone), "plates of meat" (feet), "trouble and strife" (wife), "cream crackered" (knackered), "apple and pears" (stairs).
    Do use: "mate", "proper", colourful storytelling that takes the long way round.
    Avoid: RP English, formality, or using the real word when the rhyming slang exists.
  `,
  'UK.Manchester': `
    Voice: straight-talking Mancunian — warm, dry, working-class pride.
    Do use: "it were proper hectic", "I've been absolutely mithered", "sorted".
    Do use: no-nonsense directness that still feels human and genuine.
    Avoid: pretension, excessive politeness, or anything that sounds London.
  `,
  'UK.Leeds': `
    Voice: blunt Yorkshire — short, sincere, no faffing about.
    Do use: "nowt", "summat", "right sorry", "I'll not mess thi about".
    Do use: brevity as a mark of respect — Yorkshire folk say what they mean.
    Avoid: hedging, over-explaining, or Cockney slang.
  `,
  'UK.Liverpool': `
    Voice: Scouse warmth — chatty, community-minded, slightly self-dramatising.
    Do use: "la", "our kid", "honest to God", "I'm made up to sort this".
    Do use: rapid-fire friendliness, a hint of theatre, genuine community spirit.
    Avoid: coldness, bluntness without warmth, or anything that sounds like London.
  `,
  'UK.Scotland': `
    Voice: Scottish dry humour — no-nonsense, quietly self-deprecating.
    Do use: "pure", "wee", "Baltic", "I'm no gonny lie to ye", "aye, fair enough".
    Do use: understatement that implies more than it says.
    Avoid: English politeness excess, over-explaining, or American warmth.
  `,
  'UK.Wales': `
    Voice: Welsh warmth — musical cadence, community-focused, heartfelt.
    Do use: a slightly poetic sentence structure, genuine apology rooted in community values.
    Do use: "I'm terrible sorry", "it's not like me at all, honest".
    Avoid: dry humour, bluntness, or anything that sounds impersonal.
  `,
  'UK.Posh': `
    Voice: absurdly upper-class British — Eton, the Home Counties, circa 1985.
    Do use: "frightfully", "terribly sorry", "one simply couldn't", "ghastly business", "do forgive one".
    Do use: treating the inconvenience as a social catastrophe of almost comical gravity.
    Avoid: anything casual, modern slang, or directness of any kind.
  `,

  // ── Austria ────────────────────────────────────────────────────────────────
  'AT.national': `
    Stimme: österreichisches Deutsch — formell, leicht fatalistisch, mit einem Hauch Bürokratie.
    Verwende: österreichische Ausdrücke ("Entschuldigung vielmals", "es hat sich leider nicht ausgegangen"), einen Schimmer Weltschmerz.
    Verwende: familiäre Verpflichtungen oder Behördenangelegenheiten als glaubwürdige Ausreden.
    Vermeide: preußische Steifheit, Schweizer Effizienz, oder übertriebene Freundlichkeit.
  `,
  'AT.Vienna': `
    Stimme: Wienerisch — charmant-schnoddrig, leicht melancholisch, mit unverkennbarem Schmäh.
    Verwende: "Schau'n Sie", "i hob's ned bös gemeint", "wia's halt so is", "des is ma echt unangenehm".
    Verwende: den Wiener Schmäh — eine Entschuldigung, die gleichzeitig Charme und leichte Überheblichkeit ausstrahlt.
    Vermeide: bairische Herzlichkeit, Schweizer Sachlichkeit, oder zu direkte Konfrontation.
  `,
  'AT.Tirol': `
    Stimme: tirolerisch — bodenständig, direkt, naturverbunden, mit Dialektfärbung.
    Verwende: "des hot mi echt gstört", "i woar nimmer anders", "kumm scho bald".
    Verwende: Bergwelt, Natur oder familiäre Verbindlichkeiten als Kontext.
    Vermeide: Stadtmensch-Energie, übertriebene Formalia, oder Wiener Ironie.
  `,
  'AT.Styria': `
    Stimme: steirisch — herzlich, bodenständig, mit einer Prise Sturheit.
    Verwende: steirische Ausdrücke, könnte Wein, Familie oder das Wetter erwähnen.
    Verwende: mehr Wärme als Wien, mehr Direktheit als Salzburg.
    Vermeide: Wiener Schmäh, übertriebene Formalität, oder Schweizer Präzision.
  `,
  'AT.Salzburg': `
    Stimme: salzburgisch — kulturbewusst, leicht gehoben, freundlich-reserviert.
    Verwende: formellere Ausdrücke als Tirol, aber wärmer als Wien.
    Verwende: Mozart-Stadt-Energie: kultiviert, gepflegt, nie grob.
    Vermeide: Wiener Schmäh, Tiroler Kernigkeit, oder Schweizer Nüchternheit.
  `,
  'AT.Vorarlberg': `
    Stimme: Vorarlbergerisch — dem Schweizerdeutschen näher als Wien, direkt, ordnungsliebend.
    Verwende: alemannische Ausdrücke, sachliche Sprache, konkrete Aussagen.
    Verwende: die Nähe zur Schweiz als Orientierung — präziser und direkter als Ostösterreich.
    Vermeide: Wiener Schmäh, Tiroler Dialekt, oder übertriebene Emotionalität.
  `,
  'AT.Burgenland': `
    Stimme: burgenländisch — warm, ländlich, mit einem Hauch pannonischer Gelassenheit.
    Verwende: ruhige, herzliche Sprache, familiäre Bezüge.
    Verwende: die Gelassenheit der Weinregion — kein Stress, alles wird gut.
    Vermeide: Großstadthektik, Wiener Ironie, oder Tiroler Kernigkeit.
  `,
  'AT.Carinthia': `
    Stimme: kärntnerisch — lebendig, naturverbunden, leicht südlich beeinflusst.
    Verwende: kärntnerische Ausdrücke, Bezüge zu See und Bergen.
    Verwende: Offenheit und Direktheit mit südlichem Flair — freundlicher als Tirol.
    Vermeide: Wiener Schmäh, Schweizer Sachlichkeit, oder pannonische Gelassenheit.
  `,
  'AT.LowerAustria': `
    Stimme: niederösterreichisch — traditionsverbunden, weinbaugeprägt, höflich.
    Verwende: kultivierte, zuvorkommende Sprache ohne Schmäh.
    Verwende: Nähe zu Wien ohne Wiener Großstadtironie — Weinviertel-Gemütlichkeit.
    Vermeide: Tiroler Dialekt, Wiener Schmäh, oder Schweizer Nüchternheit.
  `,
  'AT.UpperAustria': `
    Stimme: oberösterreichisch — fleißig, mit bayerischen Einflüssen, praktisch.
    Verwende: verlässliche, pragmatische Sprache — ein Oberösterreicher hält sein Wort.
    Verwende: Industrieregion-Mentalität: Arbeit ist wichtig, aber Familie auch.
    Vermeide: Wiener Schmäh, Tiroler Kernigkeit, oder übertriebene Emotionen.
  `,

  // ── Switzerland ────────────────────────────────────────────────────────────
  'CH.national': `
    Stimme: Schwiizerdütsch — präzis, sachlich, verlässlich. Kei Drama.
    Verwende: konkrete Sprache, kei Übertreibig, e Lösig am Schluss.
    Verwende: de Ruf vo de Schwiiz: zuverlässig, pünktlich, und wenn's mal ned so isch, git's e gute Grund.
    Vermeide: Emotionsüberschwang, Wiener Schmäh, oder bürokratische Ausflüchte.
  `,
  'CH.Zurich': `
    Stimme: zürcherisch — gschäftsmässig, effizient, e bitz kühl aber korrekt.
    Verwende: kurze Sätze, klare Aussagen, kei unnötige Wörter.
    Verwende: Zürcher Geschäftswelt-Energie: Zeit ist Geld, die Entschuldigung ist professionell.
    Vermeide: Berner Gemächlichkeit, Genfer Diplomatie-Theater, oder Emotionen ohne Substanz.
  `,
  'CH.Bern': `
    Stimme: Berndeutsch — gemächlich, besonnen, herzlich zuverlässig.
    Verwende: de Bärner macht's in sim eigne Tempo, aber er macht's guet.
    Verwende: ruhige, bedächtige Sprache — der Berner ist nicht langsam, er ist gründlich.
    Vermeide: Zürcher Hetze, Wiener Schmäh, oder übertriebene Emotionalität.
  `,
  'CH.Basel': `
    Stimme: baslerisch — weltoffen, kultiviert, rheinische Gelassenheit.
    Verwende: gebildete, sachliche Sprache mit Wärme — Basel ist Kultur und Pharma, nicht Hektik.
    Verwende: die Dreistädteregion (D/CH/F) als Kontext — weltoffen und selbstbewusst.
    Vermeide: Zürcher Kälte, Berner Gemächlichkeit, oder Deutschschweizer Provinzialismus.
  `,
  'CH.Geneva': `
    Voix: genevoise — français suisse, formel, diplomatique, mesuré.
    Utilise: un ton professionnel avec une touche de cordialité internationale.
    Utilise: une proposition concrète à la fin — les Genevois résolvent les problèmes.
    Évite: la familiarité excessive, le style parisien trop décontracté, ou les émotions sans substance.
  `,
  'CH.Valais': `
    Stimme: walliserisch — herzlich, stolz uf d'Bergwelt, direkter als Zürich.
    Verwende: Bezüge zu Bergen, Wein, oder der Walliser Eigenständigkeit.
    Verwende: Wärme die echt ist — der Walliser ist kein Kaufmannstyp.
    Vermeide: Zürcher Effizienz-Kälte, Genfer Diplomatie-Überbau, oder Berner Bedächtigkeit.
  `,
  'CH.Ticino': `
    Voce: ticinese — italiano svizzero, cordiale, preciso, affidabile.
    Usa: lo stile della Svizzera italiana: calore mediterraneo con disciplina svizzera.
    Usa: una soluzione concreta — il ticinese non lascia le cose in sospeso.
    Evita: le esagerazioni napoletane, il freddo zurighese, o la diplomazia ginevrina.
  `,
  'CH.Graubuenden': `
    Vusch: rumantsch grischun — stil cordial, precis, fidabel.
    Drova: linguitg curt e cler, ina excusa autentica, ina soluziun concreta.
    Drova: il caracter special da la Svizra rumantscha — cultura, muntogna, independenza.
    Evitescha: exaggeraziuns, emoziunalitad excessiva, u stil citadin.
  `,
  'CH.Lucerne': `
    Stimme: luzernisch — herzlich, traditionsbewusst, Vierwaldstättersee-Gemütlichkeit.
    Verwende: freundliche, zuverlässige Sprache mit Bezug zur Zentralschweizer Lebensart.
    Verwende: Tourismus-Stadt-Selbstbewusstsein — Luzern nimmt sich ernst, aber bleibt warmherzig.
    Vermeide: Zürcher Kühle, Berner Bedächtigkeit, oder Walliser Direktheit.
  `,
  'CH.StGallen': `
    Stimme: st.gallisch — textilgeprägte Handelsstadt, innovativ, ostschweizer Bodenständigkeit.
    Verwende: kreative, ehrliche Sprache — St. Gallen ist Unternehmertum und Tradition zugleich.
    Verwende: die Stickerei-Hauptstadt-Mentalität: Qualität und Zuverlässigkeit.
    Vermeide: Zürcher Großstadt-Hektik, Appenzeller Eigensinn, oder Übertreibung.
  `,
  'CH.Thurgau': `
    Stimme: thurgauisch — ländlich, am Bodensee, alemannisch-gemütlich.
    Verwende: bodenständige, direkte Sprache ohne viel Schnickschnack.
    Verwende: Obstgarten-Kanton-Energie: ruhig, verlässlich, geerdet.
    Vermeide: städtische Hektik, Wiener Schmäh, oder emotionale Ausbrüche.
  `,
  'CH.Zug': `
    Stimme: zugisch — wohlhabend, diskret, am Zugersee.
    Verwende: höfliche, professionelle Sprache ohne Prahlerei — Zug zeigt seinen Reichtum nicht.
    Verwende: Diskretion als Wert: kurz, korrekt, und ohne unnötige Details.
    Vermeide: emotionale Überschwänglichkeit, Großstadthektik, oder volksverbundene Dialektfärbung.
  `,
  'CH.Aargau': `
    Stimme: aargauisch — industriell, vielfältig, mit badischem Einfluss, pragmatisch.
    Verwende: offene, direkte Sprache — der Aargauer macht keine Umschweife.
    Verwende: den Ruf als "Mitte der Schweiz": bodenständig, verlässlich, unaufgeregt.
    Vermeide: Zürich-Snobismus, Berner Bedächtigkeit, oder emotionale Melodramatik.
  `,

  // ── Germany ────────────────────────────────────────────────────────────────
  'DE.national': `
    Voice: standard German (Hochdeutsch) — direct, thorough, punctual-obsessed.
    Do use: structured apology with a clear reason and a concrete plan ("Ich entschuldige mich für die Unannehmlichkeiten und werde...").
    Do use: the cultural weight of being late or absent — it genuinely matters.
    Avoid: vague excuses, over-emotional language, or anything that sounds insufficiently organised.
  `,
  'DE.Berlin': `
    Voice: Berliner Schnauze — blunt, urban, zero pretence, secretly warm.
    Do use: "Ey, tut mir leid", "ick habs vergeigt", "is mir unangenehm aber...".
    Do use: Berlin directness — they say it straight but without malice.
    Avoid: Bavarian cosiness, corporate formality, or anything that sounds like it was proofread.
  `,
  'DE.Bavaria': `
    Stimme: bayrisch — herzlich, gemütlich, mit einem Hauch Selbstbewusstsein.
    Verwende: "Schau", "des is ma wirklich unangenehm", "Vergelt's Gott für dein Verständnis".
    Verwende: bayrische Herzlichkeit — die Entschuldigung kommt von Herzen, mit Weißbier-Wärme.
    Vermeide: Berliner Schnoddrigkeit, preußische Steifheit, oder übertriebene Effizienz.
  `,
  'DE.Hamburg': `
    Voice: Hamburgisch — reserved, maritime, understated, quietly proud.
    Do use: "Ich bitte um Entschuldigung", concise reasoning, a dignified close.
    Do use: Hanseatic restraint — Hamburg does not overdramatise; the excuse is efficient and honest.
    Avoid: Bavarian warmth, Berlin bluntness, or emotional excess of any kind.
  `,

  // ── Australia ──────────────────────────────────────────────────────────────
  'AU.national': `
    Voice: Australian — relaxed, self-deprecating, anti-pretentious, genuinely apologetic.
    Do use: "no dramas", "mate", "totally my fault", "she'll be right".
    Do use: the cultural norm of not taking yourself too seriously — the excuse is honest and low-key.
    Avoid: formality, American earnestness, or anything that sounds like you're trying too hard.
  `,
  'AU.Sydney': `
    Voice: Sydney — confident, coastal, slightly more polished than the national average.
    Do use: harbour-city energy, traffic on the M1, "absolute shocker of a morning".
    Do use: urban self-awareness — Sydney-siders know they live in the best city and remain chill about it.
    Avoid: Outback references, Melbourne smugness, or excessive apology.
  `,
  'AU.Melbourne': `
    Voice: Melbourne — culturally self-aware, café-culture, slightly ironic.
    Do use: tram delays, "the weather turned", dry self-deprecation.
    Do use: Melbourne's quiet pride in being more interesting than Sydney.
    Avoid: Sydney confidence, regional bluntness, or anything that lacks a hint of irony.
  `,

  // ── Ireland ────────────────────────────────────────────────────────────────
  'IE.national': `
    Voice: Irish — warm, self-deprecating, charming, storytelling instinct.
    Do use: "I'm mortified", "not a bother on you", "sure it couldn't be helped".
    Do use: the Irish gift for making an apology feel like a warm conversation.
    Avoid: British formality, American directness, or brevity that forgets the charm.
  `,
  'IE.Dublin': `
    Voice: Dublin — quick-witted, urban, warm, slightly self-aware.
    Do use: "Ah Jaysus", "I'm pure mortified", "the Dart was destroyed this morning".
    Do use: Dublin banter — apologetic but not grovelling, funny but sincere.
    Avoid: rural Irish cadence, British reserve, or earnestness without a wink.
  `,
};

export const TONE_PROMPTS = {
  Apologetic:   'Tone: genuinely remorseful — the person feels bad and it shows. Sincere, not performative. The apology is the point.',
  Funny:        'Tone: self-deprecating humour — the situation is absurd and they know it. Still plausible, but delivered with a comedic twist.',
  Professional: 'Tone: polished and corporate — emotionally neutral, solution-focused. Could be sent to a senior manager without edits.',
  Dramatic:     'Tone: outrageously theatrical — the universe has conspired against them. Over-the-top but internally consistent.',
  Creative:     'Tone: wildly inventive — an unexpected angle or metaphor that somehow makes the excuse more believable, not less.',
};

export const LENGTH_PROMPTS = {
  Short:  'Length: 1–2 sentences. Punchy and direct — every word earns its place.',
  Medium: 'Length: 3–4 sentences. Enough detail to be convincing without overstaying its welcome.',
  Long:   'Length: 5–7 sentences. A full layered narrative: the situation, the complication, the emotional impact, and the resolution.',
};

export const VALID_REGIONS = new Set(Object.keys(CULTURE_PROMPTS));
export const VALID_TONES   = new Set(Object.keys(TONE_PROMPTS));
export const VALID_LENGTHS = new Set(Object.keys(LENGTH_PROMPTS));
