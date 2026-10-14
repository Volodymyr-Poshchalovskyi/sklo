// Market pages: /regions/europe, /north-america, /middle-east, /oceania,
// /latin-america. Each says what is specific about selling and permitting
// property there, how remote work runs across the time difference, which
// projects were done there (the case studies carry a country code; a region
// lists those whose country is in `countries`), and answers four questions.
// Same slug in every language so hreflang pairs line up.
//
// FIGURES carry their source and are verified against it as of 2026-10-14
// (Eurostat, BFS, US Census Bureau, ABS, RBA, Cavendish Maxwell/Property
// Monitor, Camacol). Re-check before launch and keep the source line — a
// number without one is what makes a region page read as filler. Where no
// number could be confirmed the card carries a qualitative marker instead.
//
// Prices on these pages are the CHF sample figures from serviceContent.js;
// the region says which currency a quote comes in, nothing is converted.

import { mergeOverlay } from "@/lib/i18n";
import esOverlay from "@/data/es/regions.json";

export const regions = [
  {
    slug: "europe",
    countries: ["CH", "DE", "AT", "LT"],
    name: "Europe",
    nameDe: "Europa",
    phrases: {
      en: { in: "in Europe", for: "for Europe", from: "from Europe" },
      de: { in: "in Europa", for: "für Europa", from: "aus Europa" },
    },
    currency: "EUR",
    cities: ["Zürich", "München", "Wien", "Berlin", "Paris", "Amsterdam", "Stockholm", "Vilnius"],
    lead: "Visualisation for developers, general contractors, cooperatives, estate agents and architecture offices across Europe — permit views, competition images, portal exposés and project websites, delivered from Vilnius within one or two hours of most European clocks.",
    leadDe: "Visualisierung für Bauträger, Generalunternehmer, Genossenschaften, Makler und Architekturbüros in ganz Europa — Baugesuchsansichten, Wettbewerbsbilder, Portal-Exposés und Projektwebsites, geliefert aus Vilnius, höchstens ein bis zwei Stunden von den meisten europäischen Uhren entfernt.",
    market: [
      { value: "68 %", label: "of people in the EU live in a home they own; in Germany 53 % rent, and in Switzerland about two in three do — so new apartments are sold and let off-plan to investors and tenants as much as to owners", labelDe: "der Menschen in der EU wohnen im Eigentum; in Deutschland mieten 53 %, in der Schweiz rund zwei von drei — neue Wohnungen werden also ab Plan an Investoren und Mieter ebenso verkauft wie an Eigentümer", source: "Eurostat, EU-SILC 2024; BFS" },
      { value: "36 % – 94 %", label: "home-ownership across Europe, from Switzerland to Romania: the markets differ so much that the same image set is cut differently for each", labelDe: "Wohneigentum in Europa, von der Schweiz bis Rumänien: Die Märkte unterscheiden sich so stark, dass dasselbe Bildpaket für jeden anders zugeschnitten wird", source: "BFS; Eurostat 2024" },
      { value: "Baugesuch · Exposé · Wettbewerb", label: "the German-speaking markets work through three formats — permit visualisations, portal exposés and developer competitions — which are also the three we deliver most", labelDe: "die deutschsprachigen Märkte arbeiten mit drei Formaten — Baugesuchsvisualisierungen, Portal-Exposés und Bauträgerwettbewerben —, die wir auch am häufigsten liefern", source: "" },
    ],
    specifics: [
      { title: "German-speaking Europe: permits, exposés, competitions", titleDe: "Deutschsprachiges Europa: Baugesuch, Exposé, Wettbewerb", desc: "Many Swiss municipalities ask for a visualisation of the new volume in its surroundings with the Baugesuch, and neighbours read it before the plans — we deliver a neutral version with true heights and sun position and the atmospheric one from the same model. On ImmoScout24, Homegate and willhaben the first image decides the click, so the hero view, interiors and 3D floor plans come in portal-ready formats. For Vienna's developer competitions and the Länder's housing programmes, boards need consistent, believable images on a fixed date.", descDe: "Viele Schweizer Gemeinden verlangen zum Baugesuch eine Visualisierung des neuen Volumens in seiner Umgebung, und Nachbarn lesen sie vor den Plänen — wir liefern eine neutrale Version mit echten Höhen und Sonnenstand und die stimmungsvolle aus demselben Modell. Auf ImmoScout24, Homegate und willhaben entscheidet das erste Bild über den Klick, also kommen Hero-Ansicht, Innenräume und 3D-Grundrisse in portalfertigen Formaten. Für Wiener Bauträgerwettbewerbe und die Wohnbauprogramme der Länder brauchen Pläne konsistente, glaubwürdige Bilder zu einem fixen Termin." },
      { title: "Permits and competitions anywhere in Europe", titleDe: "Baugesuche und Wettbewerbe in ganz Europa", desc: "A photomontage into a photograph from the public viewpoint, true heights from the plans, the sun for the date the authority names, camera data documented with the image. For competitions: camera and mood agreed on day one, grey previews on day two, daily previews until the submission. What changes from country to country is the surroundings data and the rules of the call, and we read both.", descDe: "Eine Fotomontage in ein Foto vom öffentlichen Standort, echte Höhen aus den Plänen, die Sonne zum von der Behörde genannten Datum, Kameradaten mit dem Bild dokumentiert. Für Wettbewerbe: Kamera und Stimmung am ersten Tag vereinbart, Grau-Vorschauen am zweiten, tägliche Vorschauen bis zur Abgabe. Von Land zu Land ändern sich die Umgebungsdaten und die Regeln der Ausschreibung, und wir lesen beides." },
      { title: "Same working day, EUR or CHF, EU invoicing", titleDe: "Derselbe Arbeitstag, EUR oder CHF, EU-Rechnung", desc: "Vilnius is one to two hours from Zürich, Paris and Madrid and the same clock as Helsinki, so a question at ten gets its answer before lunch. Quotes in EUR or CHF as a fixed price after the briefing; invoices come from our Lithuanian company, with VAT handled under the reverse-charge rules where they apply. Plans as DWG, PDF, ArchiCAD, Revit, Allplan or IFC.", descDe: "Vilnius liegt eine bis zwei Stunden von Zürich, Paris und Madrid entfernt und hat dieselbe Uhrzeit wie Helsinki, eine Frage um zehn ist also vor dem Mittag beantwortet. Offerten in EUR oder CHF als Fixpreis nach dem Briefing; Rechnungen kommen von unserer litauischen Gesellschaft, die Umsatzsteuer läuft dort, wo es gilt, im Reverse-Charge-Verfahren. Pläne als DWG, PDF, ArchiCAD, Revit, Allplan oder IFC." },
    ],
    faq: [
      { q: "Do you work on site in Europe?", qDe: "Arbeiten Sie vor Ort in Europa?", a: "Remotely, with one direct contact per project: plans arrive by upload, previews by link, approvals by email, a video call when the briefing needs one. Where the surroundings matter — a lake view, a village street — we organise a drone flight or a site photographer through a local partner.", aDe: "Remote, mit einem direkten Ansprechpartner pro Projekt: Pläne kommen per Upload, Vorschauen per Link, Freigaben per E-Mail, ein Videocall, wenn das Briefing einen braucht. Wo die Umgebung zählt — Seesicht, Dorfstrasse — organisieren wir einen Drohnenflug oder einen Fotografen vor Ort über einen lokalen Partner." },
      { q: "How are prices quoted for European clients?", qDe: "Wie werden Preise für europäische Kunden offeriert?", a: "In EUR or CHF, as a fixed price after the briefing. Invoices come from our Lithuanian company; for companies in the EU the reverse-charge mechanism applies, so the amount on the quote is the amount on the invoice.", aDe: "In EUR oder CHF, als Fixpreis nach dem Briefing. Rechnungen kommen von unserer litauischen Gesellschaft; für Unternehmen in der EU gilt das Reverse-Charge-Verfahren, der Betrag der Offerte ist also der Betrag der Rechnung." },
      { q: "Can you deliver for a permit or competition deadline?", qDe: "Können Sie auf einen Bewilligungs- oder Wettbewerbstermin liefern?", a: "Yes. A permit visualisation — one or two neutral views in the real surroundings — takes five to seven working days from complete plans; a competition set of two views and a short film takes three weeks. Tell us the date and we plan backwards from it.", aDe: "Ja. Eine Baugesuchsvisualisierung — ein bis zwei neutrale Ansichten in der echten Umgebung — dauert fünf bis sieben Arbeitstage ab vollständigen Plänen; ein Wettbewerbspaket aus zwei Ansichten und einem kurzen Film drei Wochen. Nennen Sie uns den Termin, und wir planen rückwärts." },
      { q: "Can the images be used on property portals?", qDe: "Können die Bilder auf Immobilienportalen verwendet werden?", a: "Yes. We deliver in the portals' aspect ratios and sizes, with the 'visualisation' label where the portal requires it, and the same images in print resolution for the exposé or brochure.", aDe: "Ja. Wir liefern in den Seitenverhältnissen und Grössen der Portale, mit der Kennzeichnung «Visualisierung», wo das Portal sie verlangt, und dieselben Bilder in Druckauflösung für Exposé oder Broschüre." },
    ],
  },
  {
    slug: "north-america",
    countries: ["US", "CA"],
    name: "North America",
    nameDe: "Nordamerika",
    phrases: {
      en: { in: "in North America", for: "for North America", from: "from North America" },
      de: { in: "in Nordamerika", for: "für Nordamerika", from: "aus Nordamerika" },
    },
    currency: "USD",
    cities: ["New York", "Los Angeles", "Miami", "Austin", "Toronto", "Vancouver"],
    lead: "Visualisation for developers, architects and agents in the United States and Canada — presale and lease-up marketing sets, amenity interiors, floor plans and project websites, produced while your night is our working day.",
    leadDe: "Visualisierung für Bauträger, Architekten und Makler in den USA und Kanada — Presale- und Lease-up-Pakete, Amenity-Innenräume, Grundrisse und Projektwebsites, produziert, während bei Ihnen Nacht ist und bei uns Arbeitstag.",
    market: [
      { value: "65.3 %", label: "of US households own their home (Q1 2026); about one in three rents, and the buildings that serve them are marketed, pre-leased or pre-sold while they are still being built", labelDe: "der US-Haushalte besitzen ihr Zuhause (Q1 2026); rund jeder dritte mietet, und die Gebäude für sie werden vermarktet, vorvermietet oder vorverkauft, solange sie noch im Bau sind", source: "US Census Bureau, Housing Vacancy Survey" },
      { value: "Presale", label: "in Toronto and Vancouver condo buildings are sold years before completion on staged deposits — the buyer commits to a rendering, a floor plan and a sales centre", labelDe: "in Toronto und Vancouver werden Eigentumswohnungen Jahre vor Fertigstellung gegen gestaffelte Anzahlungen verkauft — der Käufer entscheidet sich für ein Rendering, einen Grundriss und ein Verkaufsbüro", source: "" },
      { value: "7 – 10 h", label: "behind Vilnius from New York to Los Angeles: previews are posted at the end of our day and wait for you in the morning", labelDe: "hinter Vilnius, von New York bis Los Angeles: Vorschauen erscheinen am Ende unseres Tages und warten morgens auf Sie", source: "" },
    ],
    specifics: [
      { title: "Plans in feet and inches, American conventions", titleDe: "Pläne in Fuss und Zoll, amerikanische Konventionen", desc: "We model from imperial plans as readily as from metric ones, keep your sheet and unit numbering, and name finishes in the trade terms your team uses. Exteriors are built with the street, planting and signage conventions of the market, interiors with the furniture scale buyers there expect. Revit, ArchiCAD, SketchUp, Rhino and AutoCAD files all work.", descDe: "Wir modellieren aus Plänen in Fuss und Zoll so selbstverständlich wie aus metrischen, behalten Ihre Blatt- und Wohnungsnummerierung und benennen Oberflächen in den Fachbegriffen Ihres Teams. Aussenansichten entstehen mit den Strassen-, Bepflanzungs- und Beschriftungskonventionen des Marktes, Innenräume mit dem Möbelmassstab, den Käufer dort erwarten. Revit-, ArchiCAD-, SketchUp-, Rhino- und AutoCAD-Dateien funktionieren alle." },
      { title: "Presale, pre-lease and amenity marketing", titleDe: "Presale, Vorvermietung und Amenity-Marketing", desc: "For a condo presale the set is the hero exterior, one interior per unit type, the amenity floor and 3D floor plans for the sales centre and the website. For a rental building in lease-up it is the lobby, the amenity spaces and the typical unit, in a consistent evening light. A project website with the unit table and an enquiry form that names the unit follows from the same model.", descDe: "Für einen Condo-Presale besteht das Paket aus der Hero-Aussenansicht, einem Innenraum pro Wohnungstyp, dem Amenity-Geschoss und 3D-Grundrissen für das Verkaufsbüro und die Website. Für ein Mietgebäude im Lease-up sind es Lobby, Amenity-Räume und die typische Wohnung in durchgehendem Abendlicht. Eine Projektwebsite mit Wohnungsspiegel und einem Anfrageformular, das die Wohnung nennt, folgt aus demselben Modell." },
      { title: "Seven to ten hours behind: overnight turnaround", titleDe: "Sieben bis zehn Stunden Differenz: Lieferung über Nacht", desc: "We post the day's previews before we finish, you review them with your morning coffee, and your comments are in the model when we start the next day — a revision round that costs a day on paper costs one night here. Calls fit the overlap in your morning. Quotes in USD or EUR, invoiced from our Lithuanian company.", descDe: "Wir stellen die Vorschauen des Tages ein, bevor wir Feierabend machen, Sie prüfen sie mit Ihrem Morgenkaffee, und Ihre Kommentare sind im Modell, wenn wir am nächsten Tag anfangen — eine Korrekturrunde, die auf dem Papier einen Tag kostet, kostet hier eine Nacht. Calls passen in die Überschneidung an Ihrem Morgen. Offerten in USD oder EUR, Rechnung von unserer litauischen Gesellschaft." },
    ],
    faq: [
      { q: "How does the time difference work for US and Canadian clients?", qDe: "Wie funktioniert die Zeitverschiebung für US-amerikanische und kanadische Kunden?", a: "It barely matters: the team is spread across opposite time zones, so a message is answered within the hour whatever your clock says. It also works in your favour: previews are posted at the end of our working day, which is your morning; your feedback during your day is in the model when we start the next day. Live calls fit the overlap between your morning and our afternoon.", aDe: "Sie spielt kaum eine Rolle: Das Team sitzt in gegenüberliegenden Zeitzonen, eine Nachricht wird also zu jeder Uhrzeit innerhalb einer Stunde beantwortet. Zudem arbeitet sie für Sie: Vorschauen erscheinen am Ende unseres Arbeitstags, also an Ihrem Morgen; Ihr Feedback im Laufe Ihres Tages ist im Modell, wenn wir am nächsten Tag beginnen. Live-Calls passen in die Überschneidung zwischen Ihrem Morgen und unserem Nachmittag." },
      { q: "Do you work from imperial drawings and US file formats?", qDe: "Arbeiten Sie mit Plänen in Fuss und Zoll und US-Dateiformaten?", a: "Yes. Imperial or metric, DWG, PDF, Revit, ArchiCAD, SketchUp or Rhino. We keep your units and your sheet numbers so the images match the drawing set.", aDe: "Ja. In Fuss und Zoll oder metrisch, DWG, PDF, Revit, ArchiCAD, SketchUp oder Rhino. Wir behalten Ihre Einheiten und Blattnummern, damit die Bilder zum Planset passen." },
      { q: "What does a presale marketing set include?", qDe: "Was gehört zu einem Presale-Marketingpaket?", a: "Typically the hero exterior, one interior per unit type, the amenity spaces, 3D floor plans, and a 360° tour of the model suite or a navigator for a larger building. A project website and a launch film are added on request. Fixed price after the briefing.", aDe: "Typischerweise die Hero-Aussenansicht, ein Innenraum pro Wohnungstyp, die Amenity-Räume, 3D-Grundrisse und ein 360°-Rundgang der Musterwohnung oder ein Navigator für ein grösseres Gebäude. Projektwebsite und Launch-Film auf Wunsch. Fixpreis nach dem Briefing." },
      { q: "In which currency are quotes given?", qDe: "In welcher Währung werden Offerten erstellt?", a: "In USD or EUR, as a fixed price after the briefing. Invoices come from our Lithuanian company; any tax on your side is treated as for any foreign service.", aDe: "In USD oder EUR, als Fixpreis nach dem Briefing. Rechnungen kommen von unserer litauischen Gesellschaft; eine Steuer auf Ihrer Seite wird wie bei jeder ausländischen Dienstleistung behandelt." },
    ],
  },
  {
    slug: "middle-east",
    countries: ["AE", "SA", "QA"],
    name: "Middle East",
    nameDe: "Naher Osten",
    phrases: {
      en: { in: "in the Middle East", for: "for the Middle East", from: "from the Middle East" },
      de: { in: "im Nahen Osten", for: "für den Nahen Osten", from: "aus dem Nahen Osten" },
    },
    currency: "USD",
    cities: ["Dubai", "Abu Dhabi", "Riyadh", "Doha"],
    lead: "Visualisation for developers and marketing agencies in the Gulf — launch sets for off-plan sales, animations for sales galleries and events, and navigators for large towers, delivered one to two hours from your clock.",
    leadDe: "Visualisierung für Entwickler und Marketingagenturen am Golf — Launch-Pakete für den Verkauf ab Plan, Animationen für Verkaufsgalerien und Events und Navigatoren für grosse Türme, geliefert eine bis zwei Stunden von Ihrer Uhr entfernt.",
    market: [
      { value: "70 %", label: "of Dubai's residential sales in the first half of 2025 were off-plan — the buyer decides on images, a brochure and a sales gallery", labelDe: "der Wohnungsverkäufe in Dubai im ersten Halbjahr 2025 liefen ab Plan — der Käufer entscheidet sich anhand von Bildern, einer Broschüre und einer Verkaufsgalerie", source: "Cavendish Maxwell, Property Monitor data (consultancy figure)" },
      { value: "Launch events", label: "off-plan projects open with a launch: renderings, a film and an interactive tower model are the product on show before a single floor exists", labelDe: "Off-Plan-Projekte starten mit einem Launch: Renderings, ein Film und ein interaktives Turmmodell sind das Produkt, das gezeigt wird, bevor ein einziges Geschoss steht", source: "" },
      { value: "1 – 2 h", label: "ahead of Vilnius — the Gulf and our studio share almost the same working day", labelDe: "vor Vilnius — der Golf und unser Studio haben fast denselben Arbeitstag", source: "" },
    ],
    specifics: [
      { title: "Off-plan launches", titleDe: "Off-Plan-Launches", desc: "An off-plan launch needs everything at once: the hero exterior, the lobby and amenity levels, one interior per unit type with a believable view, 3D floor plans, a film and the website. We produce the set in parallel from one model so every image agrees, with the delivery date fixed at the briefing.", descDe: "Ein Off-Plan-Launch braucht alles auf einmal: die Hero-Aussenansicht, Lobby und Amenity-Geschosse, einen Innenraum pro Wohnungstyp mit glaubwürdiger Aussicht, 3D-Grundrisse, einen Film und die Website. Wir produzieren das Paket parallel aus einem Modell, damit alle Bilder übereinstimmen, mit einem beim Briefing fixierten Liefertermin." },
      { title: "Towers: the navigator and the real view", titleDe: "Türme: der Navigator und die echte Aussicht", desc: "In a tower every floor has its own view and its own price. The 360° navigator lets a buyer orbit the building, pick a unit and see its plan; drone panoramas at the planned floor heights put the real skyline behind the rendered windows.", descDe: "In einem Turm hat jedes Geschoss seine eigene Aussicht und seinen eigenen Preis. Der 360°-Navigator lässt einen Käufer das Gebäude umkreisen, eine Wohnung wählen und ihren Grundriss sehen; Drohnenpanoramen in den geplanten Geschosshöhen setzen die echte Skyline hinter die gerenderten Fenster." },
      { title: "Screens, galleries and large formats", titleDe: "Bildschirme, Galerien und Grossformate", desc: "Sales galleries run on LED walls and large displays: films come as 4K masters (ProRes on request), stills at print resolution for site hoardings and billboards, and files are prepared to your printer's specification. Quotes in USD or EUR, invoiced from our Lithuanian company.", descDe: "Verkaufsgalerien laufen auf LED-Wänden und grossen Displays: Filme kommen als 4K-Master (ProRes auf Wunsch), Standbilder in Druckauflösung für Bauzäune und Plakate, und die Dateien werden nach den Vorgaben Ihrer Druckerei aufbereitet. Offerten in USD oder EUR, Rechnung von unserer litauischen Gesellschaft." },
    ],
    faq: [
      { q: "How fast can an off-plan launch set be ready?", qDe: "Wie schnell kann ein Off-Plan-Launch-Paket fertig sein?", a: "Typically six weeks from the briefing for the full set — exterior, interiors, floor plans, film and website — produced in parallel. A shorter hero set of an exterior and a film can be done in three weeks.", aDe: "Typischerweise sechs Wochen ab Briefing für das ganze Paket — Aussenansicht, Innenräume, Grundrisse, Film und Website —, parallel produziert. Ein kürzeres Hero-Paket aus Aussenansicht und Film ist in drei Wochen machbar." },
      { q: "What do you need from us to start?", qDe: "Was brauchen Sie von uns für den Start?", a: "The latest plans and sections (DWG or PDF), the 3D model if one exists, the finish schedule, the brand guidelines and a few reference images of the mood and the interior style. The full list is on our requirements page.", aDe: "Die aktuellsten Pläne und Schnitte (DWG oder PDF), das 3D-Modell, falls vorhanden, die Ausbauliste, die Markenrichtlinien und ein paar Referenzbilder zu Stimmung und Einrichtungsstil. Die vollständige Liste steht auf unserer Seite Projektanforderungen." },
      { q: "Can the films and images run on large sales-gallery screens?", qDe: "Können Filme und Bilder auf grossen Verkaufsgalerie-Bildschirmen laufen?", a: "Yes. Films are delivered as 4K masters, with ProRes on request for LED walls and events, and stills at the size you need for hoardings and printed material.", aDe: "Ja. Filme werden als 4K-Master geliefert, auf Wunsch als ProRes für LED-Wände und Events, Standbilder in der Grösse, die Sie für Bauzäune und Drucksachen brauchen." },
      { q: "How does the time difference work?", qDe: "Wie funktioniert die Zeitverschiebung?", a: "Messages are answered within the hour at any time, as the team is spread across opposite time zones. The Gulf is one to two hours ahead of Vilnius, so we share almost the whole working day: questions are answered the same morning and calls fit anywhere in the day.", aDe: "Nachrichten werden zu jeder Zeit innerhalb einer Stunde beantwortet, da das Team in gegenüberliegenden Zeitzonen sitzt. Der Golf liegt ein bis zwei Stunden vor Vilnius, wir teilen also fast den ganzen Arbeitstag: Fragen werden am selben Morgen beantwortet, und Calls passen an jede Stelle des Tages." },
    ],
  },
  {
    slug: "oceania",
    countries: ["AU", "NZ"],
    name: "Oceania",
    nameDe: "Ozeanien",
    phrases: {
      en: { in: "in Oceania", for: "for Oceania", from: "from Oceania" },
      de: { in: "in Ozeanien", for: "für Ozeanien", from: "aus Ozeanien" },
    },
    currency: "USD",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Auckland"],
    lead: "Visualisation for developers, architects and project marketing agencies in Australia and New Zealand — off-the-plan sets, planning-application views and project websites, worked while your office is asleep and waiting in your inbox at breakfast.",
    leadDe: "Visualisierung für Entwickler, Architekten und Projektvermarkter in Australien und Neuseeland — Off-the-plan-Pakete, Ansichten für das Bauantragsverfahren und Projektwebsites, bearbeitet, während Ihr Büro schläft, und beim Frühstück in Ihrem Postfach.",
    market: [
      { value: "66 %", label: "of Australian households own their home, 31 % outright and 35 % with a mortgage — and the new apartments around them are mostly sold off the plan", labelDe: "der australischen Haushalte besitzen ihr Zuhause, 31 % ohne und 35 % mit Hypothek — und die neuen Wohnungen um sie herum werden meist ab Plan verkauft", source: "ABS, Census 2021" },
      { value: "Off the plan", label: "most high-density apartments are sold off the plan, because banks require presales before they fund construction — the images have to exist before the first sale", labelDe: "die meisten Wohnungen in verdichteten Überbauungen werden ab Plan verkauft, weil Banken Vorverkäufe verlangen, bevor sie den Bau finanzieren — die Bilder müssen vor dem ersten Verkauf existieren", source: "RBA, Financial Stability Review, April 2019" },
      { value: "7 – 11 h", label: "ahead of Vilnius, from Perth to Auckland — our working day ends as yours begins, so the previews are in your inbox each morning", labelDe: "vor Vilnius, von Perth bis Auckland — unser Arbeitstag endet, wenn Ihrer beginnt, die Vorschauen liegen also jeden Morgen in Ihrem Postfach", source: "" },
    ],
    specifics: [
      { title: "Off-the-plan: images before the first sale", titleDe: "Off the plan: Bilder vor dem ersten Verkauf", desc: "When lenders want a share of the building sold before construction is funded, the visual set is on the critical path. We deliver the launch set — exterior, interiors per apartment type, amenity spaces, floor plans — on a fixed date agreed at the briefing, and a project website with the unit table to take the enquiries.", descDe: "Wenn Kreditgeber verlangen, dass ein Teil des Gebäudes verkauft ist, bevor der Bau finanziert wird, liegt das Bildpaket auf dem kritischen Pfad. Wir liefern das Launch-Paket — Aussenansicht, Innenräume pro Wohnungstyp, Amenity-Räume, Grundrisse — zu einem beim Briefing vereinbarten Datum, dazu eine Projektwebsite mit Wohnungsspiegel für die Anfragen." },
      { title: "Planning-application and council views", titleDe: "Ansichten für das Bauantragsverfahren und den Gemeinderat", desc: "A development application or planning permit often needs neutral views with true heights and shadows at the dates the authority names, and a photomontage from the public viewpoint. We deliver those from the same model that later becomes the marketing imagery.", descDe: "Ein Bauantrag oder eine Baubewilligung braucht oft neutrale Ansichten mit echten Höhen und Schatten zu den von der Behörde genannten Daten und eine Fotomontage vom öffentlichen Standort. Wir liefern sie aus demselben Modell, das später zur Marketing-Bildwelt wird." },
      { title: "Metric plans, an overnight rhythm", titleDe: "Metrische Pläne, ein Rhythmus über Nacht", desc: "Plans come metric, as in Europe, from Revit, ArchiCAD, SketchUp or DWG. Because we are seven to eleven hours behind you, a revision round costs one night: send comments at the end of your day and the next version is waiting at breakfast. Quotes in USD or EUR, invoiced from our Lithuanian company.", descDe: "Pläne kommen metrisch, wie in Europa, aus Revit, ArchiCAD, SketchUp oder DWG. Weil wir sieben bis elf Stunden hinter Ihnen liegen, kostet eine Korrekturrunde eine Nacht: Senden Sie die Kommentare am Ende Ihres Tages, und die nächste Version wartet beim Frühstück. Offerten in USD oder EUR, Rechnung von unserer litauischen Gesellschaft." },
    ],
    faq: [
      { q: "How does the time difference work for Australian and New Zealand clients?", qDe: "Wie funktioniert die Zeitverschiebung für australische und neuseeländische Kunden?", a: "The team is spread across opposite time zones, so someone answers within the hour at any time of your day. Beyond that it becomes a rhythm: you send comments at the end of your day, we work while you sleep, and the next version is in your inbox when you arrive. Live calls fit the overlap in your evening and our morning.", aDe: "Das Team sitzt in gegenüberliegenden Zeitzonen, es antwortet also zu jeder Tageszeit innerhalb einer Stunde. Darüber hinaus wird es zum Rhythmus: Sie senden Kommentare am Ende Ihres Tages, wir arbeiten, während Sie schlafen, und die nächste Version liegt in Ihrem Postfach, wenn Sie ankommen. Live-Calls passen in die Überschneidung Ihres Abends und unseres Morgens." },
      { q: "Can you produce views for a development application?", qDe: "Können Sie Ansichten für einen Bauantrag erstellen?", a: "Yes: neutral views with true heights and shadow studies at the dates the authority names, or a photomontage into a photograph from the public viewpoint, with the camera data documented. The same model serves the marketing images afterwards.", aDe: "Ja: neutrale Ansichten mit echten Höhen und Schattenstudien zu den von der Behörde genannten Daten oder eine Fotomontage in ein Foto vom öffentlichen Standort, mit dokumentierten Kameradaten. Dasselbe Modell dient danach den Marketingbildern." },
      { q: "What does an off-the-plan launch set cost?", qDe: "Was kostet ein Off-the-plan-Launch-Paket?", a: "A full set for a mid-size building — four exteriors, six interiors, an aerial and 3D floor plans per unit type — typically costs the equivalent of CHF 9,000 to 14,000; adding a film, a 360° tour and a website takes it to CHF 25,000 to 40,000. Quoted in USD or EUR as a fixed price after the briefing.", aDe: "Ein volles Paket für ein mittelgrosses Gebäude — vier Aussenansichten, sechs Innenräume, ein Luftbild und 3D-Grundrisse pro Wohnungstyp — kostet typischerweise den Gegenwert von CHF 9'000 bis 14'000; mit Film, 360°-Rundgang und Website sind es CHF 25'000 bis 40'000. Offeriert in USD oder EUR als Fixpreis nach dem Briefing." },
      { q: "Do you work with local project marketing agencies?", qDe: "Arbeiten Sie mit lokalen Projektvermarktern zusammen?", a: "Yes. We work directly with developers and with the agencies that market their projects; the deliverables, the formats and the delivery date are the same either way.", aDe: "Ja. Wir arbeiten direkt mit Entwicklern und mit den Agenturen, die ihre Projekte vermarkten; Lieferumfang, Formate und Liefertermin sind in beiden Fällen dieselben." },
    ],
  },
  {
    slug: "latin-america",
    countries: ["MX", "CO", "CL", "PE", "AR"],
    name: "Latin America",
    nameDe: "Lateinamerika",
    phrases: {
      en: { in: "in Latin America", for: "for Latin America", from: "from Latin America" },
      de: { in: "in Lateinamerika", for: "für Lateinamerika", from: "aus Lateinamerika" },
    },
    currency: "USD",
    cities: ["Ciudad de México", "Bogotá", "Medellín", "Santiago", "Lima", "Buenos Aires"],
    lead: "Visualisation for developers and architects in Mexico, Colombia, Chile, Peru and Argentina — preventa launch sets, sales-room material, floor plans and project websites, with the site available in Spanish.",
    leadDe: "Visualisierung für Entwickler und Architekten in Mexiko, Kolumbien, Chile, Peru und Argentinien — Preventa-Launch-Pakete, Material für den Verkaufsraum, Grundrisse und Projektwebsites, mit der Website auch auf Spanisch.",
    market: [
      { value: "70 %", label: "of new housing in Colombia is sold sobre planos — in preventa, from plans — and the sales threshold that releases the developer's funds is reached on the strength of the images", labelDe: "des neuen Wohnraums in Kolumbien wird sobre planos verkauft — in der Preventa, ab Plan —, und die Verkaufsschwelle, die die Mittel des Entwicklers freigibt, wird anhand der Bilder erreicht", source: "Camacol, via Portafolio (undated; verify)" },
      { value: "Preventa", label: "buying from plans is how much new apartment stock in the region is launched: the sales room, the brochure and the renderings are the product until the building exists", labelDe: "Kaufen ab Plan ist der Weg, auf dem ein grosser Teil des neuen Wohnungsbestands in der Region lanciert wird: Verkaufsraum, Broschüre und Renderings sind das Produkt, bis das Gebäude steht", source: "" },
      { value: "5 – 9 h", label: "behind Vilnius — the Latin American morning is our afternoon, so calls fit comfortably and previews wait for you overnight", labelDe: "hinter Vilnius — der lateinamerikanische Morgen ist unser Nachmittag, Calls passen also bequem, und Vorschauen warten über Nacht auf Sie", source: "" },
    ],
    specifics: [
      { title: "Preventa: the launch set", titleDe: "Preventa: das Launch-Paket", desc: "A preventa launch needs the hero exterior, the lobby and common areas, one interior per unit type, floor plans and a film for the sales room, all consistent with each other and finished before the first reservation. We produce them from one model with a fixed delivery date.", descDe: "Ein Preventa-Launch braucht die Hero-Aussenansicht, Lobby und Gemeinschaftsflächen, einen Innenraum pro Wohnungstyp, Grundrisse und einen Film für den Verkaufsraum, alles untereinander stimmig und vor der ersten Reservierung fertig. Wir produzieren sie aus einem Modell mit fixem Liefertermin." },
      { title: "The sales room and the show apartment", titleDe: "Der Verkaufsraum und die Musterwohnung", desc: "Where a physical show apartment is not built until late, a 360° tour on a screen in the sala de ventas stands in for it: buyers walk the apartment type they are considering, and the sales team sees which rooms hold attention. For larger projects a navigator lets them pick the unit on the building.", descDe: "Wo eine physische Musterwohnung erst spät gebaut wird, ersetzt ein 360°-Rundgang auf einem Bildschirm in der sala de ventas sie: Käufer gehen durch den Wohnungstyp, den sie erwägen, und das Verkaufsteam sieht, welche Räume die Aufmerksamkeit halten. Für grössere Projekte lässt ein Navigator sie die Wohnung am Gebäude wählen." },
      { title: "The website in Spanish, drawings in any language", titleDe: "Website auf Spanisch, Pläne in jeder Sprache", desc: "The studio's website and the project website we build for you can run in Spanish; the drawings and the 3D model need no translation, and dimensions and symbols are universal. Project communication is in English. Quotes in USD or EUR, invoiced from our Lithuanian company.", descDe: "Die Website des Studios und die Projektwebsite, die wir für Sie bauen, können auf Spanisch laufen; Pläne und 3D-Modell brauchen keine Übersetzung, Masse und Symbole sind universell. Die Projektkommunikation läuft auf Englisch. Offerten in USD oder EUR, Rechnung von unserer litauischen Gesellschaft." },
    ],
    faq: [
      { q: "Is the website and the quote available in Spanish?", qDe: "Sind die Website und die Offerte auf Spanisch verfügbar?", a: "The website is being made available in Spanish. Project communication and the quote are in English; drawings and the 3D model can come in any language, and a brief in Spanish is fine alongside them.", aDe: "Die Website wird auf Spanisch verfügbar gemacht. Projektkommunikation und Offerte sind auf Englisch; Pläne und 3D-Modell können in jeder Sprache kommen, ein Briefing auf Spanisch ist dazu in Ordnung." },
      { q: "What images does a preventa need?", qDe: "Welche Bilder braucht eine Preventa?", a: "At minimum the hero exterior, one interior per unit type and the floor plans; for the sales room, a film and a 360° tour of the show apartment type. For the website, the same images plus a unit table.", aDe: "Mindestens die Hero-Aussenansicht, einen Innenraum pro Wohnungstyp und die Grundrisse; für den Verkaufsraum einen Film und einen 360°-Rundgang des Musterwohnungstyps. Für die Website dieselben Bilder plus Wohnungsspiegel." },
      { q: "How does the time difference work?", qDe: "Wie funktioniert die Zeitverschiebung?", a: "The team is spread across opposite time zones, so messages are answered within the hour at any time of your day. Latin America is five to nine hours behind Vilnius: calls fit your morning and our afternoon, and previews posted at the end of our day are waiting for you when you start.", aDe: "Das Team sitzt in gegenüberliegenden Zeitzonen, Nachrichten werden also zu jeder Tageszeit innerhalb einer Stunde beantwortet. Lateinamerika liegt fünf bis neun Stunden hinter Vilnius: Calls passen in Ihren Morgen und unseren Nachmittag, und Vorschauen vom Ende unseres Tages warten auf Sie, wenn Sie anfangen." },
      { q: "In which currency are quotes given?", qDe: "In welcher Währung werden Offerten erstellt?", a: "In USD or EUR, as a fixed price after the briefing. Invoices come from our Lithuanian company.", aDe: "In USD oder EUR, als Fixpreis nach dem Briefing. Rechnungen kommen von unserer litauischen Gesellschaft." },
    ],
  },
];

export function regionBySlug(slug) {
  return regions.find((r) => r.slug === slug);
}

function localizeRegionBase(region, locale) {
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

export function localizeRegion(region, locale) {
  return locale === "es" ? mergeOverlay(localizeRegionBase(region, "en"), esOverlay[region.slug]) : localizeRegionBase(region, locale);
}
