import { galleryItems, SERVICE_TOUR } from "@/data/galleryData";

// Case studies: a named project, where it is, what it needed and what was
// delivered, illustrated with renders from the archive (by gallery id) so no
// new files are needed.
//
// THESE SEVEN PROJECTS ARE SAMPLES. Names, places, client types, figures and
// stories were written to show the client how a case study reads on the
// site; the images are real studio work, grouped by what looks like one
// building. Replace with the studio's actual projects (and their permission
// to be named) before launch.
//
// Fields: slug, name, city, region (canton/state), country (ISO), year,
// type/typeDe, client/clientDe, services (slugs), summary/summaryDe (card +
// meta description), challenge/approach/result (+De) as paragraphs,
// facts [{ label, labelDe, value, valueDe? }], metrics [{ value, label, labelDe }],
// hero (gallery id), images (gallery ids), tour (SERVICE_TOUR id, optional).

import { mergeOverlay } from "@/lib/i18n";
import esOverlay from "@/data/es/projects.json";

export const projects = [
  {
    slug: "waldpark-winterthur",
    name: "Waldpark",
    city: "Winterthur",
    region: "ZH",
    country: "CH",
    year: 2026,
    type: "Residential development, 48 apartments",
    typeDe: "Wohnüberbauung, 48 Wohnungen",
    client: "Property developer",
    clientDe: "Bauträger",
    services: ["exterior-visualization", "interior-visualization", "bird-eye-visualization", "animation-mood-film", "web-development"],
    summary: "Four timber-clad buildings around a courtyard with a playground, sold off-plan with a full visual set: exterior and interior renderings, an aerial, a sixty-second film and the project website.",
    summaryDe: "Vier holzverkleidete Gebäude um einen Hof mit Spielplatz, ab Plan verkauft mit dem kompletten Bildpaket: Aussen- und Innenvisualisierungen, Luftbild, ein sechzigsekündiger Film und die Projektwebsite.",
    challenge: ["The developer wanted to start selling eighteen months before completion, with a brochure, a website and a sales event in the same month. The architecture — larch facades that would silver over time, a car-free courtyard — was the main argument, and it did not come across in the plans.", "The timing was tight: all imagery had to be final six weeks after the briefing, and the site was still a field."],
    challengeDe: ["Der Bauträger wollte achtzehn Monate vor Fertigstellung mit dem Verkauf beginnen, mit Broschüre, Website und Verkaufsanlass im selben Monat. Die Architektur — Lärchenfassaden, die mit der Zeit silbern werden, ein autofreier Hof — war das Hauptargument, und in den Plänen kam sie nicht rüber.", "Der Zeitplan war eng: Alle Bilder mussten sechs Wochen nach dem Briefing final sein, und das Grundstück war noch eine Wiese."],
    approach: ["We built one context model from the cantonal elevation data and site photos and used it for everything: the evening courtyard view that became the key visual, the street elevations, the aerial, and the camera path of the film. Interiors were furnished for the two buyer groups the developer named — young families and downsizing couples — with the actual finish schedule.", "The project website went live the day the imagery was approved, with the unit table, the floor plans and the film on the start page."],
    approachDe: ["Wir bauten ein Umgebungsmodell aus den kantonalen Höhendaten und Fotos vom Grundstück und nutzten es für alles: die abendliche Hofansicht, die zum Schlüsselbild wurde, die Strassenansichten, das Luftbild und den Kamerapfad des Films. Die Innenräume wurden für die beiden vom Bauträger genannten Käufergruppen — junge Familien und Paare, die sich verkleinern — mit der echten Ausbauliste eingerichtet.", "Die Projektwebsite ging an dem Tag online, an dem die Bilder freigegeben wurden, mit Wohnungsspiegel, Grundrissen und dem Film auf der Startseite."],
    result: ["Twenty-six of the forty-eight apartments were reserved within the first eight weeks of sales, before the excavation began. The developer used the film at the sales event and as the website hero; the aerial became the construction-site banner."],
    resultDe: ["Sechsundzwanzig der achtundvierzig Wohnungen waren in den ersten acht Verkaufswochen reserviert, vor Beginn des Aushubs. Der Bauträger zeigte den Film am Verkaufsanlass und als Website-Hero; das Luftbild wurde zum Bauzaunbanner."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "6 exterior views, 8 interior views, 1 aerial, 60 s film, project website", valueDe: "6 Aussenansichten, 8 Innenansichten, 1 Luftbild, 60-s-Film, Projektwebsite" },
      { label: "Timeline", labelDe: "Dauer", value: "6 weeks from briefing to launch", valueDe: "6 Wochen vom Briefing bis zum Launch" },
      { label: "Input", labelDe: "Grundlagen", value: "DWG plans, finish schedule, site photos", valueDe: "DWG-Pläne, Ausbauliste, Fotos vom Grundstück" },
    ],
    metrics: [
      { value: "26 / 48", label: "units reserved in 8 weeks", labelDe: "Wohnungen in 8 Wochen reserviert" },
      { value: "6", label: "weeks to launch", labelDe: "Wochen bis zum Launch" },
      { value: "1", label: "model for every image", labelDe: "Modell für alle Bilder" },
    ],
    hero: 1,
    images: [1, 93, 176, 101, 122, 228],
  },
  {
    slug: "lindenhof-duebendorf",
    name: "Lindenhof",
    city: "Dübendorf",
    region: "ZH",
    country: "CH",
    year: 2025,
    type: "Apartment building, 32 units",
    typeDe: "Mehrfamilienhaus, 32 Wohnungen",
    client: "General contractor",
    clientDe: "Generalunternehmer",
    services: ["exterior-visualization", "interior-visualization", "360-virtual-tour", "3d-floorplans"],
    summary: "A six-storey building with planted glass balconies, presented through street views, a furnished show apartment as a 360° tour and 3D floor plans for every unit type.",
    summaryDe: "Ein sechsgeschossiges Gebäude mit begrünten Glasbalkonen, präsentiert mit Strassenansichten, einer möblierten Musterwohnung als 360°-Rundgang und 3D-Grundrissen für jeden Wohnungstyp.",
    challenge: ["The building's identity was its balconies: deep, glazed, planted, a green layer in front of the facade. In the elevations they read as a grid. The contractor also needed a way to show the standard apartment without building a show flat on site."],
    challengeDe: ["Die Identität des Gebäudes waren seine Balkone: tief, verglast, bepflanzt, eine grüne Schicht vor der Fassade. In den Ansichten lasen sie sich als Raster. Der Generalunternehmer brauchte zudem einen Weg, die Standardwohnung zu zeigen, ohne vor Ort eine Musterwohnung zu bauen."],
    approach: ["Three street-level views at different times of day show the balconies in use — a table set for dinner, a child's bicycle, the planting in summer. The 3.5-room show apartment was built as one interior scene and delivered twice: as four stills for the brochure and as a six-room 360° tour, rendered from the same model at no extra modelling cost.", "Every one of the eleven unit types got a 3D floor plan in the same style, so the unit pages of the brochure read as a series."],
    approachDe: ["Drei Ansichten von der Strasse zu verschiedenen Tageszeiten zeigen die Balkone in Gebrauch — ein gedeckter Tisch, ein Kinderfahrrad, die Bepflanzung im Sommer. Die 3,5-Zimmer-Musterwohnung wurde als eine Innenraumszene gebaut und zweimal geliefert: als vier Standbilder für die Broschüre und als 360°-Rundgang mit sechs Räumen, aus demselben Modell ohne zusätzliche Modellierung gerendert.", "Jeder der elf Wohnungstypen bekam einen 3D-Grundriss im selben Stil, damit die Wohnungsseiten der Broschüre als Serie lesen."],
    result: ["The tour was viewed over 4,000 times in the first three months, mostly on phones, and the sales team reports that most viewings now start with a buyer who has already walked the apartment online."],
    resultDe: ["Der Rundgang wurde in den ersten drei Monaten über 4'000 Mal angeschaut, meist auf dem Smartphone, und das Verkaufsteam berichtet, dass die meisten Besichtigungen heute mit einem Käufer beginnen, der die Wohnung online schon durchlaufen hat."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "3 exterior views, 4 interior views, 360° tour (6 rooms), 11 floor plans", valueDe: "3 Aussenansichten, 4 Innenansichten, 360°-Rundgang (6 Räume), 11 Grundrisse" },
      { label: "Timeline", labelDe: "Dauer", value: "5 weeks", valueDe: "5 Wochen" },
      { label: "Input", labelDe: "Grundlagen", value: "ArchiCAD model, finish schedule, planting plan", valueDe: "ArchiCAD-Modell, Ausbauliste, Bepflanzungsplan" },
    ],
    metrics: [
      { value: "4'000+", label: "tour views in 3 months", labelDe: "Rundgang-Aufrufe in 3 Monaten" },
      { value: "11", label: "unit types as 3D plans", labelDe: "Wohnungstypen als 3D-Grundriss" },
      { value: "0", label: "show apartments built", labelDe: "gebaute Musterwohnungen" },
    ],
    hero: 2,
    images: [2, 12, 19, 108, 150, 126],
    tour: "wermatswil-interior",
  },
  {
    slug: "rietacker-thurgau",
    name: "Rietacker",
    city: "Weinfelden",
    region: "TG",
    country: "CH",
    year: 2025,
    type: "Farmhouse conversion and new barn, 9 apartments",
    typeDe: "Umbau Bauernhaus und Neubau Scheune, 9 Wohnungen",
    client: "Private owner with architect",
    clientDe: "Private Bauherrschaft mit Architekt",
    services: ["exterior-visualization", "bird-eye-visualization", "interior-visualization", "graphic-design"],
    summary: "A listed farmhouse and a new timber barn in a Thurgau village: visualisations for the building permit and the neighbours first, then for the sale of nine apartments.",
    summaryDe: "Ein geschütztes Bauernhaus und eine neue Holzscheune in einem Thurgauer Dorf: Visualisierungen zuerst für das Baugesuch und die Nachbarn, dann für den Verkauf von neun Wohnungen.",
    challenge: ["Two audiences with opposite needs. The municipality and the neighbours had to see that the new barn respected the village: height, roof pitch, materials. Buyers had to see that an apartment under a 200-year-old roof could be bright and modern.", "The owner had a small budget and asked for every image to work for both."],
    challengeDe: ["Zwei Zielgruppen mit gegensätzlichen Bedürfnissen. Gemeinde und Nachbarn mussten sehen, dass die neue Scheune das Dorf respektiert: Höhe, Dachneigung, Materialien. Käufer mussten sehen, dass eine Wohnung unter einem 200 Jahre alten Dach hell und modern sein kann.", "Die Bauherrschaft hatte ein kleines Budget und wollte, dass jedes Bild für beide funktioniert."],
    approach: ["A neutral aerial from the elevation model and a photomontage into a photograph of the village street went into the permit documentation — surroundings provably real, no marketing light. The same model then produced the sales views: the barn in late-summer light, the farmhouse courtyard, and two attic apartments with the old beams left visible.", "We designed the eight-page sales brochure around those images, so the owner had one supplier for the pictures and the print."],
    approachDe: ["Ein neutrales Luftbild aus dem Höhenmodell und eine Fotomontage in ein Foto der Dorfstrasse kamen in die Baugesuchsunterlagen — Umgebung nachweislich echt, kein Marketing-Licht. Dasselbe Modell lieferte danach die Verkaufsansichten: die Scheune im Spätsommerlicht, der Hof des Bauernhauses und zwei Dachwohnungen mit sichtbar belassenen alten Balken.", "Die achtseitige Verkaufsbroschüre gestalteten wir um diese Bilder, damit die Bauherrschaft einen Lieferanten für Bilder und Druck hatte."],
    result: ["The permit passed without objections. Seven of nine apartments were sold before the roof went on, five of them to buyers from outside the village who found the project through the listing images."],
    resultDe: ["Das Baugesuch wurde ohne Einsprachen bewilligt. Sieben von neun Wohnungen waren verkauft, bevor das Dach drauf war, fünf davon an Käufer von ausserhalb des Dorfs, die das Projekt über die Inseratsbilder fanden."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "4 exterior views, 1 aerial, 1 photomontage, 4 interior views, sales brochure", valueDe: "4 Aussenansichten, 1 Luftbild, 1 Fotomontage, 4 Innenansichten, Verkaufsbroschüre" },
      { label: "Timeline", labelDe: "Dauer", value: "4 weeks, in two stages", valueDe: "4 Wochen, in zwei Etappen" },
      { label: "Input", labelDe: "Grundlagen", value: "PDF plans, survey, photos of the existing building", valueDe: "PDF-Pläne, Vermessung, Fotos des Bestands" },
    ],
    metrics: [
      { value: "0", label: "objections to the permit", labelDe: "Einsprachen gegen das Baugesuch" },
      { value: "7 / 9", label: "sold before the roof", labelDe: "verkauft vor dem Dach" },
      { value: "2", label: "audiences, one model", labelDe: "Zielgruppen, ein Modell" },
    ],
    hero: 5,
    images: [5, 92, 178, 86, 104, 129],
  },
  {
    slug: "sonnenhalde-baar",
    name: "Sonnenhalde",
    city: "Baar",
    region: "ZG",
    country: "CH",
    year: 2026,
    type: "Hillside terraced housing, 21 apartments",
    typeDe: "Terrassenüberbauung am Hang, 21 Wohnungen",
    client: "Property developer",
    clientDe: "Immobilienentwickler",
    services: ["exterior-visualization", "interior-visualization", "fly-around-navigator", "cinemagraph-live-shot"],
    summary: "Stepped buildings on a south-facing slope above Baar, where every apartment sells on its own view: an orbit navigator with the real panorama behind each terrace, and cinemagraphs for the launch campaign.",
    summaryDe: "Gestaffelte Gebäude an einem Südhang über Baar, wo jede Wohnung über ihre eigene Aussicht verkauft wird: ein Navigator mit dem echten Panorama hinter jeder Terrasse und Cinemagraphs für die Startkampagne.",
    challenge: ["On a hillside, no two apartments have the same view, and the view is the price. The developer's unit list could not show it, and a single hero rendering favoured one terrace over twenty others."],
    challengeDe: ["Am Hang haben keine zwei Wohnungen dieselbe Aussicht, und die Aussicht ist der Preis. Der Wohnungsspiegel des Entwicklers konnte sie nicht zeigen, und ein einzelnes Hero-Rendering bevorzugte eine Terrasse gegenüber zwanzig anderen."],
    approach: ["A drone flight captured panoramas at each floor height. We built the terrain and the three buildings as one model, rendered the exterior set from it, and then the 360° orbit for the navigator: turn the ensemble, tap a unit, see its floor plan and the actual panorama from its terrace.", "For the launch on social media, three cinemagraphs — the lake light moving, a curtain in the evening breeze, the pool at dusk — ran as the campaign's lead images."],
    approachDe: ["Ein Drohnenflug nahm Panoramen in jeder Geschosshöhe auf. Wir bauten Gelände und die drei Gebäude als ein Modell, renderten daraus das Aussenset und dann die 360°-Umrundung für den Navigator: das Ensemble drehen, eine Wohnung antippen, ihren Grundriss und das echte Panorama von ihrer Terrasse sehen.", "Für den Start auf Social Media liefen drei Cinemagraphs — das wandernde Licht auf dem See, ein Vorhang in der Abendbrise, der Pool in der Dämmerung — als Leitbilder der Kampagne."],
    result: ["The navigator carried the sales conversation: the team reports that buyers arrive asking for a specific unit by number. The three top-floor apartments, the most expensive, were the first to sell."],
    resultDe: ["Der Navigator trug das Verkaufsgespräch: Das Team berichtet, dass Käufer mit der Nummer einer bestimmten Wohnung kommen. Die drei Attikawohnungen, die teuersten, waren die ersten, die verkauft wurden."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "5 exterior views, 6 interior views, 360° navigator, 3 cinemagraphs", valueDe: "5 Aussenansichten, 6 Innenansichten, 360°-Navigator, 3 Cinemagraphs" },
      { label: "Timeline", labelDe: "Dauer", value: "8 weeks including the drone flight", valueDe: "8 Wochen inklusive Drohnenflug" },
      { label: "Input", labelDe: "Grundlagen", value: "Revit model, drone panoramas, unit list", valueDe: "Revit-Modell, Drohnenpanoramen, Wohnungsspiegel" },
    ],
    metrics: [
      { value: "21", label: "views, one per terrace", labelDe: "Aussichten, eine pro Terrasse" },
      { value: "3 / 3", label: "attic units sold first", labelDe: "Attikawohnungen zuerst verkauft" },
      { value: "8", label: "weeks to launch", labelDe: "Wochen bis zum Start" },
    ],
    hero: 76,
    images: [76, 94, 4, 143, 99, 234],
  },
  {
    slug: "seehalle-rapperswil",
    name: "Seehalle",
    city: "Rapperswil-Jona",
    region: "SG",
    country: "CH",
    year: 2025,
    type: "Public cultural building, competition entry",
    typeDe: "Öffentlicher Kulturbau, Wettbewerbsbeitrag",
    client: "Architecture office",
    clientDe: "Architekturbüro",
    services: ["exterior-visualization", "animation-mood-film"],
    summary: "Competition images for a lakeside event hall on a pier: two exterior views and a forty-second film that put the jury on the waterfront at dusk.",
    summaryDe: "Wettbewerbsbilder für eine Veranstaltungshalle am See auf einem Steg: zwei Aussenansichten und ein vierzigsekündiger Film, der die Jury in der Dämmerung ans Ufer stellt.",
    challenge: ["A competition gives the jury minutes per entry. The office's concept — a glazed hall cantilevered over the water, lit from inside like a lantern — needed to be understood at a glance, and the mood of a summer evening on the lake was the argument, not the floor area."],
    challengeDe: ["Ein Wettbewerb gibt der Jury Minuten pro Beitrag. Das Konzept des Büros — eine verglaste Halle, die über das Wasser auskragt, von innen beleuchtet wie eine Laterne — musste auf einen Blick verständlich sein, und die Stimmung eines Sommerabends am See war das Argument, nicht die Geschossfläche."],
    approach: ["Two views, both at blue hour: from the promenade, with the hall glowing over the water and people on the pier, and from the lake, where the cantilever reads. The film follows a boat approaching the pier, forty seconds, no voice-over, the building revealed as the camera turns.", "Three weeks from the office's SketchUp model to the submission, with daily previews so the architects could steer the atmosphere."],
    approachDe: ["Zwei Ansichten, beide zur blauen Stunde: von der Promenade, mit der leuchtenden Halle über dem Wasser und Menschen auf dem Steg, und vom See aus, wo die Auskragung lesbar wird. Der Film folgt einem Boot, das sich dem Steg nähert, vierzig Sekunden, ohne Sprecher, das Gebäude enthüllt sich mit der Kamerabewegung.", "Drei Wochen vom SketchUp-Modell des Büros bis zur Abgabe, mit täglichen Vorschauen, damit die Architekten die Atmosphäre steuern konnten."],
    result: ["The entry was placed second of twenty-three and the office was invited to the follow-up study. The jury report singled out the clarity of the lakeside image."],
    resultDe: ["Der Beitrag wurde Zweiter von dreiundzwanzig, und das Büro wurde zur Folgestudie eingeladen. Der Jurybericht hob die Klarheit des Bildes vom See aus hervor."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "2 exterior views, 40 s film", valueDe: "2 Aussenansichten, 40-s-Film" },
      { label: "Timeline", labelDe: "Dauer", value: "3 weeks to the submission", valueDe: "3 Wochen bis zur Abgabe" },
      { label: "Input", labelDe: "Grundlagen", value: "SketchUp model, site plan, mood references", valueDe: "SketchUp-Modell, Situationsplan, Stimmungsreferenzen" },
    ],
    metrics: [
      { value: "2nd", label: "of 23 entries", labelDe: "von 23 Beiträgen" },
      { value: "3", label: "weeks to submission", labelDe: "Wochen bis zur Abgabe" },
      { value: "40 s", label: "film, no voice-over", labelDe: "Film, ohne Sprecher" },
    ],
    hero: 60,
    images: [60, 35, 82, 232],
  },
  {
    slug: "hafenquartier-muenchen",
    name: "Hafenquartier",
    city: "Munich",
    cityDe: "München",
    region: "Bavaria",
    regionDe: "Bayern",
    country: "DE",
    year: 2026,
    type: "Urban block, 86 apartments and ground-floor retail",
    typeDe: "Stadtquartier, 86 Wohnungen und Gewerbe im Erdgeschoss",
    client: "Project developer",
    clientDe: "Projektentwickler",
    services: ["exterior-visualization", "bird-eye-visualization", "interior-visualization", "virtual-staging", "web-development"],
    summary: "A brick-faced block on a former rail yard in Munich: street views for the launch, an aerial that places it in the quarter, staged interiors and a bilingual project website with a unit table.",
    summaryDe: "Ein Klinkerblock auf einem ehemaligen Bahnareal in München: Strassenansichten für den Start, ein Luftbild, das ihn ins Quartier setzt, eingerichtete Innenräume und eine zweisprachige Projektwebsite mit Wohnungsspiegel.",
    challenge: ["Eighty-six apartments in a quarter that did not exist yet. Buyers knew the address as a rail yard; the developer had to sell the street before the building. The materials — dark brick, bronze window frames — needed to look exactly as specified, because the first buyers would compare the finished facade with the images."],
    challengeDe: ["Sechsundachtzig Wohnungen in einem Quartier, das es noch nicht gab. Käufer kannten die Adresse als Bahnareal; der Entwickler musste die Strasse vor dem Gebäude verkaufen. Die Materialien — dunkler Klinker, bronzefarbene Fensterrahmen — mussten exakt wie ausgeschrieben aussehen, weil die ersten Käufer die fertige Fassade mit den Bildern vergleichen würden."],
    approach: ["The aerial shows the whole masterplan with the neighbouring blocks under construction, so the buyer sees the quarter, not a gap. Street views were built from the supplier's actual brick samples and frame colour codes. Interiors for the three main unit types were delivered as renderings and reused for virtual staging of the show unit once it was built.", "The website — German and English, unit table from the developer's spreadsheet, floor plans per unit — was built by us around the imagery and went live with the first press release."],
    approachDe: ["Das Luftbild zeigt den ganzen Masterplan mit den Nachbarblöcken im Bau, damit der Käufer das Quartier sieht und keine Lücke. Die Strassenansichten entstanden aus den echten Klinkermustern des Lieferanten und den Farbcodes der Rahmen. Innenräume der drei Hauptwohnungstypen wurden als Renderings geliefert und später für das Virtual Staging der gebauten Musterwohnung wiederverwendet.", "Die Website — Deutsch und Englisch, Wohnungsspiegel aus der Tabelle des Entwicklers, Grundrisse pro Wohnung — bauten wir um die Bilder und schalteten sie mit der ersten Pressemitteilung frei."],
    result: ["Within the first quarter, 1,900 enquiries came through the website's unit-specific form; the developer's sales team said the brick was the most-asked-about detail, and that it matched."],
    resultDe: ["Im ersten Quartal kamen 1'900 Anfragen über das wohnungsbezogene Formular der Website; das Verkaufsteam des Entwicklers sagte, der Klinker sei das meistgefragte Detail gewesen — und er stimmte."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "5 exterior views, 1 aerial, 9 interior views, 12 staged photos, project website", valueDe: "5 Aussenansichten, 1 Luftbild, 9 Innenansichten, 12 eingerichtete Fotos, Projektwebsite" },
      { label: "Timeline", labelDe: "Dauer", value: "9 weeks in three stages", valueDe: "9 Wochen in drei Etappen" },
      { label: "Input", labelDe: "Grundlagen", value: "IFC model, masterplan, material samples", valueDe: "IFC-Modell, Masterplan, Materialmuster" },
    ],
    metrics: [
      { value: "1'900", label: "enquiries in the first quarter", labelDe: "Anfragen im ersten Quartal" },
      { value: "86", label: "units, each with its own page", labelDe: "Wohnungen, jede mit eigener Seite" },
      { value: "2", label: "languages from day one", labelDe: "Sprachen ab dem ersten Tag" },
    ],
    hero: 71,
    images: [71, 81, 25, 196, 119, 161],
  },
  {
    slug: "hofgarten-wien",
    name: "Hofgarten",
    city: "Vienna",
    cityDe: "Wien",
    region: "Vienna",
    regionDe: "Wien",
    country: "AT",
    year: 2025,
    type: "Attic conversion in a Gründerzeit building, 6 apartments",
    typeDe: "Dachgeschossausbau in einem Gründerzeithaus, 6 Wohnungen",
    client: "Estate agent",
    clientDe: "Makler",
    services: ["interior-visualization", "exterior-visualization", "virtual-staging", "3d-floorplans"],
    summary: "Six attic apartments in a Viennese courtyard building, sold from the plans: interiors under the new roof, the courtyard facade with its added storey, and 3D floor plans for the listings.",
    summaryDe: "Sechs Dachgeschosswohnungen in einem Wiener Hofhaus, ab Plan verkauft: Innenräume unter dem neuen Dach, die Hoffassade mit dem aufgesetzten Geschoss und 3D-Grundrisse für die Inserate.",
    challenge: ["Attic conversions are sold on light and height, and both are impossible to read from a section drawing. The agent's listings had plans and a photo of the existing roof. Buyers in Vienna's attic market expect to see the finished space."],
    challengeDe: ["Dachgeschossausbauten werden über Licht und Höhe verkauft, und beides lässt sich aus einem Schnitt nicht lesen. Die Inserate des Maklers hatten Pläne und ein Foto des bestehenden Dachs. Käufer im Wiener Dachgeschossmarkt erwarten den fertigen Raum zu sehen."],
    approach: ["One interior scene per apartment, camera at eye level under the ridge, roof windows open to the sky, the standard oak floor and white walls from the specification. Two of the six were also delivered as virtually staged versions of the raw-state photos once the structure was up, so the listing could show before and after.", "A courtyard view shows the new storey against the historic facade, which the district's heritage office had required to see; it doubled as the listing's cover image."],
    approachDe: ["Eine Innenraumszene pro Wohnung, Kamera auf Augenhöhe unter dem First, Dachfenster offen zum Himmel, der Standard-Eichenboden und die weissen Wände aus der Ausschreibung. Zwei der sechs wurden zusätzlich als virtuell eingerichtete Versionen der Rohbaufotos geliefert, sobald die Konstruktion stand, damit das Inserat Vorher und Nachher zeigen konnte.", "Eine Hofansicht zeigt das neue Geschoss vor der historischen Fassade, was das Bezirksdenkmalamt sehen wollte; sie wurde zugleich das Titelbild des Inserats."],
    result: ["All six apartments were under contract eleven weeks after the listing went live. The agent now briefs us at the planning stage of each attic project."],
    resultDe: ["Alle sechs Wohnungen waren elf Wochen nach Freischaltung des Inserats unter Vertrag. Der Makler brieft uns inzwischen in der Planungsphase jedes Dachgeschossprojekts."],
    facts: [
      { label: "Deliverables", labelDe: "Lieferumfang", value: "6 interior views, 1 courtyard view, 2 staged photos, 6 floor plans", valueDe: "6 Innenansichten, 1 Hofansicht, 2 eingerichtete Fotos, 6 Grundrisse" },
      { label: "Timeline", labelDe: "Dauer", value: "3 weeks", valueDe: "3 Wochen" },
      { label: "Input", labelDe: "Grundlagen", value: "PDF plans and sections, finish list, site photos", valueDe: "PDF-Pläne und Schnitte, Ausbauliste, Fotos vor Ort" },
    ],
    metrics: [
      { value: "6 / 6", label: "under contract in 11 weeks", labelDe: "in 11 Wochen unter Vertrag" },
      { value: "3", label: "weeks of production", labelDe: "Wochen Produktion" },
      { value: "1", label: "image for heritage and sales", labelDe: "Bild für Denkmalamt und Verkauf" },
    ],
    hero: 104,
    images: [104, 129, 114, 72, 164, 136],
  },
];

const byId = new Map(galleryItems.map((item) => [item.id, item]));
const tourById = new Map(Object.values(SERVICE_TOUR).flat().map((tour) => [tour.id, tour]));

function localizeProjectBase(project, locale) {
  const de = locale === "de";
  const pick = (en, deVal) => (de && deVal ? deVal : en);
  return {
    ...project,
    city: pick(project.city, project.cityDe),
    region: pick(project.region, project.regionDe),
    type: pick(project.type, project.typeDe),
    client: pick(project.client, project.clientDe),
    summary: pick(project.summary, project.summaryDe),
    challenge: pick(project.challenge, project.challengeDe),
    approach: pick(project.approach, project.approachDe),
    result: pick(project.result, project.resultDe),
    facts: project.facts.map((f) => ({ label: pick(f.label, f.labelDe), value: pick(f.value, f.valueDe) })),
    metrics: project.metrics.map((m) => ({ value: m.value, label: pick(m.label, m.labelDe) })),
    heroItem: byId.get(project.hero),
    items: project.images.map((id) => byId.get(id)).filter(Boolean),
    tourItem: project.tour ? tourById.get(project.tour) : null,
  };
}

export function projectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export const COUNTRY_NAMES = {
  CH: { en: "Switzerland", de: "Schweiz" },
  DE: { en: "Germany", de: "Deutschland" },
  AT: { en: "Austria", de: "Österreich" },
};

export function localizeProject(project, locale) {
  return locale === "es" ? mergeOverlay(localizeProjectBase(project, "en"), esOverlay[project.slug]) : localizeProjectBase(project, locale);
}
