// The three market pages: /regions/switzerland, /germany, /austria. Each
// says what is specific about selling and permitting property there, who
// the studio works with, how remote collaboration runs, which projects were
// done in the country, and answers four questions. Same slug in both
// languages so hreflang pairs line up.
//
// MARKET FIGURES: sourced from the national statistics offices as of the
// studio's last check; each carries its source. VERIFY THEM BEFORE LAUNCH
// and keep the source line — a figure without a source is what makes a
// region page read as filler.

export const regions = [
  {
    slug: "switzerland",
    phrases: { en: { in: "in Switzerland", for: "for Switzerland", from: "from Switzerland" }, de: { in: "in der Schweiz", for: "für die Schweiz", from: "aus der Schweiz" } },
    country: "CH",
    name: "Switzerland",
    nameDe: "Schweiz",
    currency: "CHF",
    cities: ["Zürich", "Winterthur", "Bern", "Basel", "Luzern", "Zug", "St. Gallen", "Rapperswil"],
    lead: "Visualisation for new developments, conversions and building permits across Switzerland — for Bauträger, general contractors, cooperatives, estate agents and architecture offices from Zürich to the Lake of Constance.",
    leadDe: "Visualisierung für Neubauten, Umbauten und Baugesuche in der ganzen Schweiz — für Bauträger, Generalunternehmer, Genossenschaften, Makler und Architekturbüros von Zürich bis zum Bodensee.",
    market: [
      { value: "36 %", label: "home-ownership rate — the lowest in Europe, so new builds are sold to investors and to the few buyers who can; both decide on images", labelDe: "Wohneigentumsquote — die tiefste in Europa; Neubauten werden an Investoren und an die wenigen Käufer verkauft, die können — beide entscheiden am Bild", source: "BFS, Strukturerhebung" },
      { value: "1.1 %", label: "vacancy rate nationwide — in Zürich and Zug below 0.5 %, which is why off-plan sales start the day the permit is granted", labelDe: "Leerwohnungsziffer landesweit — in Zürich und Zug unter 0,5 %, weshalb der Verkauf ab Plan am Tag der Bewilligung beginnt", source: "BFS, Leerwohnungszählung 2024" },
      { value: "~45'000", label: "new apartments a year, most of them in multi-family buildings sold or let off-plan", labelDe: "neue Wohnungen pro Jahr, die meisten in Mehrfamilienhäusern, ab Plan verkauft oder vermietet", source: "BFS, Bau- und Wohnbaustatistik" },
    ],
    specifics: [
      { title: "Images for the Baugesuch", titleDe: "Bilder fürs Baugesuch", desc: "Many municipalities ask for a visualisation of the new volume in its surroundings with the permit documents, and neighbours read it before the plans. We deliver a neutral version — correct heights, correct sun position, no marketing light — and the atmospheric version from the same model.", descDe: "Viele Gemeinden verlangen zum Baugesuch eine Visualisierung des neuen Volumens in seiner Umgebung, und Nachbarn lesen sie vor den Plänen. Wir liefern eine neutrale Version — korrekte Höhen, korrekter Sonnenstand, kein Marketing-Licht — und die stimmungsvolle Version aus demselben Modell." },
      { title: "Cooperatives and competitions", titleDe: "Genossenschaften und Wettbewerbe", desc: "Swiss housing cooperatives and public clients award through competitions. Competition images have a deadline and a jury that spends minutes per entry; we work from the office's SketchUp or Rhino model with daily previews.", descDe: "Schweizer Wohnbaugenossenschaften und öffentliche Bauherren vergeben über Wettbewerbe. Wettbewerbsbilder haben eine Abgabe und eine Jury, die Minuten pro Beitrag hat; wir arbeiten ab dem SketchUp- oder Rhino-Modell des Büros mit täglichen Vorschauen." },
      { title: "German and English, CHF", titleDe: "Deutsch und Englisch, CHF", desc: "Quotes in CHF, communication in German or English, invoicing from the EU with no Swiss VAT — the reverse-charge note is on every invoice. Plans in DWG, PDF, ArchiCAD, Revit or IFC.", descDe: "Offerten in CHF, Kommunikation auf Deutsch oder Englisch, Rechnung aus der EU ohne Schweizer MwSt. — der Reverse-Charge-Hinweis steht auf jeder Rechnung. Pläne als DWG, PDF, ArchiCAD, Revit oder IFC." },
    ],
    faq: [
      { q: "Do you work on site in Switzerland?", qDe: "Arbeiten Sie vor Ort in der Schweiz?", a: "Remotely, with a direct contact for every project. Plans arrive by upload, previews by link, approvals by email. Where the surroundings matter — a lake view, a village street — we organise a drone flight or a site photographer with a Swiss partner.", aDe: "Remote, mit einem direkten Ansprechpartner pro Projekt. Pläne kommen per Upload, Vorschauen per Link, Freigaben per E-Mail. Wo die Umgebung zählt — Seesicht, Dorfstrasse — organisieren wir einen Drohnenflug oder einen Fotografen vor Ort mit einem Schweizer Partner." },
      { q: "Which Swiss regions do you cover?", qDe: "Welche Regionen der Schweiz decken Sie ab?", a: "All of German-speaking Switzerland, with most projects so far in the cantons of Zürich, Zug, Thurgau and St. Gallen. French- and Italian-speaking regions on request; the deliverables are the same.", aDe: "Die ganze Deutschschweiz, bisher mit den meisten Projekten in den Kantonen Zürich, Zug, Thurgau und St. Gallen. Romandie und Tessin auf Anfrage; die Lieferung ist dieselbe." },
      { q: "How are prices quoted for Swiss clients?", qDe: "Wie werden Preise für Schweizer Kunden offeriert?", a: "In CHF, as a fixed price after the briefing. Invoices come from our Lithuanian entity without Swiss VAT; the amount on the quote is the amount on the invoice.", aDe: "In CHF, als Fixpreis nach dem Briefing. Rechnungen kommen von unserer litauischen Gesellschaft ohne Schweizer MwSt.; der Betrag der Offerte ist der Betrag der Rechnung." },
      { q: "Can you deliver for a Baugesuch deadline?", qDe: "Können Sie auf einen Baugesuchstermin liefern?", a: "Yes. A permit visualisation — one or two neutral views in the real surroundings — takes five to seven working days from complete plans. Tell us the submission date and we plan backwards from it.", aDe: "Ja. Eine Baugesuchsvisualisierung — ein bis zwei neutrale Ansichten in der echten Umgebung — dauert fünf bis sieben Arbeitstage ab vollständigen Plänen. Nennen Sie uns den Eingabetermin, und wir planen rückwärts." },
    ],
  },
  {
    slug: "germany",
    phrases: { en: { in: "in Germany", for: "for Germany", from: "from Germany" }, de: { in: "in Deutschland", for: "für Deutschland", from: "aus Deutschland" } },
    country: "DE",
    name: "Germany",
    nameDe: "Deutschland",
    currency: "EUR",
    cities: ["München", "Stuttgart", "Frankfurt", "Hamburg", "Berlin", "Köln", "Düsseldorf", "Freiburg"],
    lead: "Visualisation for Bauträger, Projektentwickler, estate agents and architecture offices in Germany — exposé imagery, project websites and permit views, quoted in EUR, delivered remotely.",
    leadDe: "Visualisierung für Bauträger, Projektentwickler, Makler und Architekturbüros in Deutschland — Exposé-Bilder, Projektwebsites und Ansichten für die Baugenehmigung, offeriert in EUR, remote geliefert.",
    market: [
      { value: "294'400", label: "apartments completed in 2023 — against a political target of 400'000; what gets built is sold off-plan to finance it", labelDe: "fertiggestellte Wohnungen 2023 — bei einem politischen Ziel von 400'000; was gebaut wird, wird ab Plan verkauft, um es zu finanzieren", source: "Destatis, Bautätigkeit 2023" },
      { value: "−17 %", label: "building permits 2024 versus 2023 — fewer projects, each of which has to sell faster", labelDe: "Baugenehmigungen 2024 gegenüber 2023 — weniger Projekte, von denen jedes schneller verkaufen muss", source: "Destatis, Baugenehmigungen 2024" },
      { value: "~47 %", label: "home-ownership rate; buyers compare exposés on the portals before a single viewing", labelDe: "Wohneigentumsquote; Käufer vergleichen Exposés auf den Portalen vor der ersten Besichtigung", source: "Destatis, Mikrozensus" },
    ],
    specifics: [
      { title: "The exposé is the sales document", titleDe: "Das Exposé ist das Verkaufsdokument", desc: "On ImmoScout24 and Immowelt the first image decides the click. We deliver the hero view, the interiors and the 3D floor plans in portal-ready formats, with the 'visualisation' note the portals expect.", descDe: "Auf ImmoScout24 und Immowelt entscheidet das erste Bild über den Klick. Wir liefern Hero-Ansicht, Innenräume und 3D-Grundrisse in portalfertigen Formaten, mit dem Hinweis «Visualisierung», den die Portale erwarten." },
      { title: "Baugenehmigung and Bebauungsplan", titleDe: "Baugenehmigung und Bebauungsplan", desc: "For permit applications and council presentations we render neutral views with true heights and shadows at the dates the authority asks for, and label them as such.", descDe: "Für Bauanträge und Gemeinderatspräsentationen rendern wir neutrale Ansichten mit echten Höhen und Schatten zu den Terminen, die die Behörde verlangt, und kennzeichnen sie entsprechend." },
      { title: "EUR, reverse charge, German contact", titleDe: "EUR, Reverse Charge, deutscher Ansprechpartner", desc: "Quotes and invoices in EUR within the EU — VAT reverse-charged to your company. Communication in German. Plans in DWG, PDF, Allplan, ArchiCAD, Revit or IFC.", descDe: "Offerten und Rechnungen in EUR innerhalb der EU — Umsatzsteuer im Reverse-Charge-Verfahren auf Ihr Unternehmen. Kommunikation auf Deutsch. Pläne als DWG, PDF, Allplan, ArchiCAD, Revit oder IFC." },
    ],
    faq: [
      { q: "Do you work with German Bauträger remotely?", qDe: "Arbeiten Sie mit deutschen Bauträgern remote?", a: "Yes, all of our German projects run remotely: upload, preview links, approvals by email, a video call when the briefing needs one. Munich to Vilnius is the same working day.", aDe: "Ja, alle unsere deutschen Projekte laufen remote: Upload, Vorschaulinks, Freigaben per E-Mail, ein Videocall, wenn das Briefing einen braucht. München und Vilnius liegen im selben Arbeitstag." },
      { q: "Are prices in EUR, and how is VAT handled?", qDe: "Sind die Preise in EUR, und wie läuft die Umsatzsteuer?", a: "Quotes in EUR, fixed after the briefing. As an EU supplier we invoice your company net with the reverse-charge note; you account for German VAT yourself, as with any EU service.", aDe: "Offerten in EUR, fix nach dem Briefing. Als EU-Lieferant stellen wir Ihrem Unternehmen netto mit Reverse-Charge-Hinweis in Rechnung; die deutsche Umsatzsteuer führen Sie selbst ab, wie bei jeder EU-Dienstleistung." },
      { q: "Can you deliver portal-ready images for ImmoScout24?", qDe: "Liefern Sie portalfertige Bilder für ImmoScout24?", a: "Yes. We deliver in the portals' aspect ratios and sizes, with the 'Visualisierung' label where the portal requires it, and the same images in print resolution for the exposé.", aDe: "Ja. Wir liefern in den Seitenverhältnissen und Grössen der Portale, mit der Kennzeichnung «Visualisierung», wo das Portal sie verlangt, und dieselben Bilder in Druckauflösung fürs Exposé." },
      { q: "Which German cities have you worked in?", qDe: "In welchen deutschen Städten haben Sie gearbeitet?", a: "Projects so far in Bavaria and Baden-Württemberg, mainly around Munich and Stuttgart. The process is the same anywhere in Germany; the local part is the surroundings data, which we source from state geoportals.", aDe: "Bisher Projekte in Bayern und Baden-Württemberg, vor allem um München und Stuttgart. Der Ablauf ist überall in Deutschland gleich; der lokale Teil sind die Umgebungsdaten, die wir aus den Geoportalen der Länder beziehen." },
    ],
  },
  {
    slug: "austria",
    phrases: { en: { in: "in Austria", for: "for Austria", from: "from Austria" }, de: { in: "in Österreich", for: "für Österreich", from: "aus Österreich" } },
    country: "AT",
    name: "Austria",
    nameDe: "Österreich",
    currency: "EUR",
    cities: ["Wien", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt"],
    lead: "Visualisation for Bauträger, Genossenschaften, estate agents and architecture offices in Austria — from Viennese attic conversions to developer competitions, quoted in EUR, delivered remotely.",
    leadDe: "Visualisierung für Bauträger, Genossenschaften, Makler und Architekturbüros in Österreich — vom Wiener Dachgeschossausbau bis zum Bauträgerwettbewerb, offeriert in EUR, remote geliefert.",
    market: [
      { value: "~48 %", label: "home-ownership rate, with Vienna at under 20 % — rental and cooperative housing dominates, and it is let from plans", labelDe: "Wohneigentumsquote, Wien unter 20 % — Miet- und Genossenschaftswohnungen dominieren, und sie werden ab Plan vermietet", source: "Statistik Austria, Mikrozensus" },
      { value: "Bauträgerwettbewerb", label: "Vienna's subsidised housing is awarded in developer competitions judged on architecture, economy, ecology and social quality — on the submitted images", labelDe: "Wiens geförderter Wohnbau wird in Bauträgerwettbewerben vergeben, beurteilt nach Architektur, Ökonomie, Ökologie und sozialer Qualität — an den eingereichten Bildern", source: "wohnfonds_wien" },
      { value: "Dachgeschoss", label: "attic conversions in Gründerzeit buildings are Vienna's own market: sold on light and height, which only an interior rendering shows", labelDe: "Dachgeschossausbauten in Gründerzeithäusern sind Wiens eigener Markt: verkauft über Licht und Höhe, was nur ein Innenrendering zeigt", source: "" },
    ],
    specifics: [
      { title: "Viennese attic conversions", titleDe: "Wiener Dachgeschossausbau", desc: "Six apartments under a new roof, sold from the section drawing — our interior renderings put the buyer under the ridge with the roof windows open, and the courtyard view shows the new storey against the historic facade for the Magistrat.", descDe: "Sechs Wohnungen unter einem neuen Dach, verkauft ab Schnitt — unsere Innenrenderings stellen den Käufer unter den First mit offenen Dachfenstern, und die Hofansicht zeigt das neue Geschoss vor der historischen Fassade für den Magistrat." },
      { title: "Developer competitions", titleDe: "Bauträgerwettbewerbe", desc: "For wohnfonds_wien and the Länder's subsidised housing programmes, competition boards need consistent, neutral and believable images on a fixed date. We work from the office's model with a storyboard of the views agreed on day one.", descDe: "Für wohnfonds_wien und die Wohnbauförderung der Länder brauchen Wettbewerbspläne konsistente, neutrale und glaubwürdige Bilder zu einem fixen Termin. Wir arbeiten ab dem Modell des Büros mit einem am ersten Tag vereinbarten Storyboard der Ansichten." },
      { title: "EUR within the EU", titleDe: "EUR innerhalb der EU", desc: "Quotes and invoices in EUR, VAT reverse-charged to your Austrian company, communication in German. Plans in DWG, PDF, ArchiCAD, Revit or IFC; surroundings from the federal and state geoportals.", descDe: "Offerten und Rechnungen in EUR, Umsatzsteuer im Reverse-Charge-Verfahren auf Ihr österreichisches Unternehmen, Kommunikation auf Deutsch. Pläne als DWG, PDF, ArchiCAD, Revit oder IFC; Umgebung aus den Geoportalen des Bundes und der Länder." },
    ],
    faq: [
      { q: "Do you know the Viennese market?", qDe: "Kennen Sie den Wiener Markt?", a: "Attic conversions, Gründerzeit courtyards and subsidised developer competitions are the three kinds of Viennese project we have worked on. Each has its own image needs, and we say which views sell before we quote.", aDe: "Dachgeschossausbauten, Gründerzeithöfe und geförderte Bauträgerwettbewerbe sind die drei Arten von Wiener Projekten, an denen wir gearbeitet haben. Jede hat ihren eigenen Bildbedarf, und wir sagen vor der Offerte, welche Ansichten verkaufen." },
      { q: "How are Austrian clients invoiced?", qDe: "Wie werden österreichische Kunden fakturiert?", a: "In EUR, net, with the reverse-charge note, from our Lithuanian EU entity. Fixed price after the briefing; no surprises on the invoice.", aDe: "In EUR, netto, mit Reverse-Charge-Hinweis, von unserer litauischen EU-Gesellschaft. Fixpreis nach dem Briefing; keine Überraschungen auf der Rechnung." },
      { q: "Can you work from an Austrian architect's plans directly?", qDe: "Können Sie direkt ab den Plänen eines österreichischen Architekten arbeiten?", a: "Yes. DWG, PDF, ArchiCAD, Revit or IFC. Questions about details go straight to the office; the client approves the previews.", aDe: "Ja. DWG, PDF, ArchiCAD, Revit oder IFC. Detailfragen gehen direkt ans Büro; der Kunde gibt die Vorschauen frei." },
      { q: "Do you cover the Länder outside Vienna?", qDe: "Decken Sie die Bundesländer ausserhalb Wiens ab?", a: "Yes — Graz, Linz, Salzburg, Innsbruck and the regions between. The work is remote; what changes by region is the surroundings data and the competition rules, both of which we handle.", aDe: "Ja — Graz, Linz, Salzburg, Innsbruck und die Regionen dazwischen. Die Arbeit ist remote; was sich je nach Region ändert, sind Umgebungsdaten und Wettbewerbsregeln, und beides übernehmen wir." },
    ],
  },
];

export function regionBySlug(slug) {
  return regions.find((r) => r.slug === slug);
}

export function localizeRegion(region, locale) {
  const de = locale === "de";
  const pick = (en, deVal) => (de && deVal ? deVal : en);
  return {
    ...region,
    name: pick(region.name, region.nameDe),
    phrases: region.phrases[de ? "de" : "en"],
    lead: pick(region.lead, region.leadDe),
    market: region.market.map((m) => ({ value: m.value, label: pick(m.label, m.labelDe), source: m.source })),
    specifics: region.specifics.map((s) => ({ title: pick(s.title, s.titleDe), desc: pick(s.desc, s.descDe) })),
    faq: region.faq.map((f) => ({ q: pick(f.q, f.qDe), a: pick(f.a, f.aDe) })),
  };
}
