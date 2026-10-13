// "Visualisation for developers / architects / estate agents / cooperatives":
// the same services read from the client's chair. Each page says what that
// client is trying to do, which images do it, which services and cases
// apply, and answers three questions they ask. Same slug in both languages.

export const audiences = [
  {
    slug: "developers",
    name: "Property developers",
    nameDe: "Bauträger und Projektentwickler",
    short: "Developers",
    shortDe: "Bauträger",
    lead: "You sell apartments eighteen months before they exist. The brochure, the project website, the sales event and the portal listing all need the same thing: images a buyer believes. We deliver the complete set from one model — and the website that turns it into enquiries.",
    leadDe: "Sie verkaufen Wohnungen achtzehn Monate, bevor es sie gibt. Broschüre, Projektwebsite, Verkaufsanlass und Portalinserat brauchen dasselbe: Bilder, denen ein Käufer glaubt. Wir liefern das komplette Set aus einem Modell — und die Website, die daraus Anfragen macht.",
    needs: [
      { situation: "Sales start the day the permit is granted", situationDe: "Der Verkauf beginnt am Tag der Bewilligung", answer: "A complete launch set in six weeks", answerDe: "Ein komplettes Startpaket in sechs Wochen", desc: "Exterior views, interiors for each unit type, an aerial, 3D floor plans and a 360° tour of the show apartment, produced in parallel from one model with a fixed delivery date agreed at the briefing.", descDe: "Aussenansichten, Innenräume pro Wohnungstyp, ein Luftbild, 3D-Grundrisse und ein 360°-Rundgang der Musterwohnung, parallel aus einem Modell produziert, mit einem beim Briefing vereinbarten Liefertermin." },
      { situation: "Forty units, one hero image", situationDe: "Vierzig Wohnungen, ein Hero-Bild", answer: "Every unit sells on its own view", answerDe: "Jede Wohnung verkauft sich über ihre eigene Aussicht", desc: "The 360° navigator lets a buyer turn the building, tap a unit and see its plan and its actual panorama; the project website names the unit in every enquiry. The sales team gets leads that already know what they want.", descDe: "Der 360°-Navigator lässt einen Käufer das Gebäude drehen, eine Wohnung antippen und ihren Grundriss und ihr echtes Panorama sehen; die Projektwebsite nennt die Wohnung in jeder Anfrage. Das Verkaufsteam bekommt Leads, die schon wissen, was sie wollen." },
      { situation: "The finished building will be compared with the images", situationDe: "Das fertige Gebäude wird mit den Bildern verglichen", answer: "Materials exactly as specified", answerDe: "Materialien exakt wie ausgeschrieben", desc: "We build facades and interiors from the actual finish schedule and supplier samples, and we say where a detail is still open rather than inventing it. Buyers who compare find what they were shown.", descDe: "Wir bauen Fassaden und Innenräume aus der echten Ausbauliste und den Lieferantenmustern, und wir sagen, wo ein Detail noch offen ist, statt es zu erfinden. Käufer, die vergleichen, finden, was ihnen gezeigt wurde." },
    ],
    services: ["exterior-visualization", "interior-visualization", "bird-eye-visualization", "360-virtual-tour", "fly-around-navigator", "web-development"],
    projects: ["waldpark-winterthur", "sonnenhalde-baar", "hafenquartier-muenchen"],
    faq: [
      { q: "What does a full launch set cost for a 30-unit development?", qDe: "Was kostet ein komplettes Startpaket für 30 Wohnungen?", a: "Four exterior views, six interiors, an aerial and 3D floor plans for each unit type typically come to CHF 9,000 to 14,000; a film, a 360° tour and a project website take a development to CHF 25,000 to 40,000. Fixed price after the briefing.", aDe: "Vier Aussenansichten, sechs Innenräume, ein Luftbild und 3D-Grundrisse pro Wohnungstyp kosten typischerweise CHF 9'000 bis 14'000; mit Film, 360°-Rundgang und Projektwebsite liegt eine Überbauung bei CHF 25'000 bis 40'000. Fixpreis nach dem Briefing." },
      { q: "How early can we start?", qDe: "Wie früh können wir beginnen?", a: "From the building-permit plans. The model we build for the permit visualisation becomes the sales model, so starting early costs nothing twice.", aDe: "Ab den Baugesuchsplänen. Das Modell, das wir für die Baugesuchsvisualisierung bauen, wird zum Verkaufsmodell — früh zu beginnen kostet nichts doppelt." },
      { q: "Do you also build the project website?", qDe: "Bauen Sie auch die Projektwebsite?", a: "Yes, around the imagery: unit table, floor plans, tour embed and an enquiry form that names the unit, in German and English, from CHF 7,900.", aDe: "Ja, um das Bildmaterial herum: Wohnungsspiegel, Grundrisse, eingebetteter Rundgang und ein Anfrageformular, das die Wohnung nennt, auf Deutsch und Englisch, ab CHF 7'900." },
    ],
  },
  {
    slug: "architects",
    name: "Architecture offices",
    nameDe: "Architekturbüros",
    short: "Architects",
    shortDe: "Architekten",
    lead: "Competition boards, client presentations, permit documentation: you need images that are architecturally exact, on a date that does not move, from a studio that reads your model without a glossary. We work from your Rhino, ArchiCAD, Revit or SketchUp file and send previews daily.",
    leadDe: "Wettbewerbspläne, Bauherrenpräsentationen, Baugesuchsunterlagen: Sie brauchen Bilder, die architektonisch exakt sind, zu einem Termin, der sich nicht verschiebt, von einem Studio, das Ihr Modell ohne Glossar liest. Wir arbeiten ab Ihrer Rhino-, ArchiCAD-, Revit- oder SketchUp-Datei und senden täglich Vorschauen.",
    needs: [
      { situation: "A competition deadline in three weeks", situationDe: "Eine Wettbewerbsabgabe in drei Wochen", answer: "Two views and a short film, previews every day", answerDe: "Zwei Ansichten und ein kurzer Film, Vorschauen jeden Tag", desc: "Camera and mood are agreed on day one, grey previews follow on day two, and the architects steer the atmosphere until the submission. The image says what the concept says; nothing is added that the plans do not show.", descDe: "Kamera und Stimmung werden am ersten Tag vereinbart, Grau-Vorschauen folgen am zweiten, und die Architekten steuern die Atmosphäre bis zur Abgabe. Das Bild sagt, was das Konzept sagt; nichts wird ergänzt, was die Pläne nicht zeigen." },
      { situation: "The council has to see the volume in the street", situationDe: "Der Gemeinderat muss das Volumen in der Strasse sehen", answer: "Neutral views for the permit", answerDe: "Neutrale Ansichten fürs Baugesuch", desc: "Photomontage into a photograph from the public viewpoint, true heights, sun position for the date the authority names, camera data documented. The same model later serves the client's marketing.", descDe: "Fotomontage in ein Foto vom öffentlichen Standort, echte Höhen, Sonnenstand zum von der Behörde genannten Datum, Kameradaten dokumentiert. Dasselbe Modell dient später der Vermarktung des Bauherrn." },
      { situation: "The office portfolio does not look like the work", situationDe: "Das Büroportfolio sieht nicht aus wie die Arbeit", answer: "Images and a site built around the projects", answerDe: "Bilder und eine Website, die aus den Projekten entstehen", desc: "Consistent renderings across the portfolio, and a website where each project sits at its own proportion with the filters a client actually uses — housing, public, conversion.", descDe: "Konsistente Renderings über das ganze Portfolio und eine Website, auf der jedes Projekt in seiner eigenen Proportion steht, mit den Filtern, die ein Bauherr wirklich nutzt — Wohnen, Öffentlich, Umbau." },
    ],
    services: ["exterior-visualization", "animation-mood-film", "interior-visualization", "bird-eye-visualization", "web-development"],
    projects: ["seehalle-rapperswil", "rietacker-thurgau"],
    faq: [
      { q: "Which file formats do you take?", qDe: "Welche Dateiformate nehmen Sie an?", a: "Rhino, SketchUp, ArchiCAD, Revit, IFC, 3ds Max, plus DWG and PDF plans. We work in your model's units and keep your layer structure.", aDe: "Rhino, SketchUp, ArchiCAD, Revit, IFC, 3ds Max, dazu DWG- und PDF-Pläne. Wir arbeiten in den Einheiten Ihres Modells und behalten Ihre Ebenenstruktur." },
      { q: "Will the images be credited to our office?", qDe: "Werden die Bilder unserem Büro zugeschrieben?", a: "The images are yours to publish as the office's. We only show work in our own portfolio with your permission, and we never list a client's name without it.", aDe: "Die Bilder gehören Ihnen und werden als Arbeit des Büros veröffentlicht. Wir zeigen Arbeiten nur mit Ihrer Erlaubnis in unserem Portfolio und nennen nie den Namen eines Kunden ohne sie." },
      { q: "Can you keep to a competition deadline?", qDe: "Halten Sie eine Wettbewerbsabgabe ein?", a: "Yes. We tell you at the briefing whether the date is realistic for the scope, and once we accept it, the date is fixed on our side.", aDe: "Ja. Wir sagen Ihnen beim Briefing, ob der Termin für den Umfang realistisch ist, und sobald wir ihn annehmen, steht er auf unserer Seite fest." },
    ],
  },
  {
    slug: "estate-agents",
    name: "Estate agents",
    nameDe: "Makler",
    short: "Estate agents",
    shortDe: "Makler",
    lead: "The listing is decided in the first image and the first scroll. We make empty apartments look lived in, show a renovation before it happens, and give a new build the hero image and the 3D floor plan that stop the thumb on ImmoScout, Homegate and willhaben.",
    leadDe: "Das Inserat entscheidet sich im ersten Bild und beim ersten Scrollen. Wir lassen leere Wohnungen bewohnt aussehen, zeigen eine Sanierung, bevor sie passiert, und geben einem Neubau das Hero-Bild und den 3D-Grundriss, die den Daumen auf ImmoScout, Homegate und willhaben stoppen.",
    needs: [
      { situation: "An empty apartment photographs small and cold", situationDe: "Eine leere Wohnung fotografiert sich klein und kalt", answer: "Virtually staged in two days", answerDe: "In zwei Tagen virtuell eingerichtet", desc: "Furniture at real scale in your photos, light and shadows matched, a style for the buyer you expect, the original delivered alongside with the 'virtually staged' note the portals want.", descDe: "Möbel in echter Grösse in Ihren Fotos, Licht und Schatten angepasst, ein Stil für den Käufer, den Sie erwarten, das Original mitgeliefert mit dem Hinweis «virtuell eingerichtet», den die Portale wollen." },
      { situation: "Buyers cannot read the floor plan", situationDe: "Käufer können den Grundriss nicht lesen", answer: "3D floor plans for every listing", answerDe: "3D-Grundrisse für jedes Inserat", desc: "Furnished, coloured, to scale, delivered as the image buyers spend the most time on after the hero. A series for a whole building is done in a week.", descDe: "Möbliert, farbig, massstabsgetreu, geliefert als das Bild, auf dem Käufer nach dem Hero am längsten bleiben. Eine Serie für ein ganzes Gebäude ist in einer Woche fertig." },
      { situation: "A renovation object has to be sold on its potential", situationDe: "Ein Sanierungsobjekt muss über sein Potenzial verkauft werden", answer: "Before and after in the real room", answerDe: "Vorher und Nachher im echten Raum", desc: "New floors, kitchen and walls inserted into the existing photo, delivered as a pair with a slider for your website and two images for the portal.", descDe: "Neue Böden, Küche und Wände ins bestehende Foto gesetzt, geliefert als Paar mit Schieberegler für Ihre Website und als zwei Bilder fürs Portal." },
    ],
    services: ["virtual-staging", "3d-floorplans", "interior-visualization", "cinemagraph-live-shot"],
    projects: ["hofgarten-wien", "lindenhof-duebendorf"],
    faq: [
      { q: "How much does virtual staging cost per listing?", qDe: "Was kostet Virtual Staging pro Inserat?", a: "From CHF 190 per photo; an apartment of six to eight photos is typically under CHF 1,500, delivered in two to three working days.", aDe: "Ab CHF 190 pro Foto; eine Wohnung mit sechs bis acht Fotos liegt typischerweise unter CHF 1'500, geliefert in zwei bis drei Arbeitstagen." },
      { q: "Is virtual staging allowed on the portals?", qDe: "Ist Virtual Staging auf den Portalen erlaubt?", a: "Yes, declared as such. We deliver the note and the original photo; ImmoScout24, Homegate and willhaben accept it that way.", aDe: "Ja, entsprechend deklariert. Wir liefern den Hinweis und das Originalfoto; ImmoScout24, Homegate und willhaben akzeptieren es so." },
      { q: "Can you work from our photographer's images?", qDe: "Können Sie mit den Bildern unseres Fotografen arbeiten?", a: "Yes, at full resolution. If the shoot has not happened yet, we brief the photographer on the angles that stage best.", aDe: "Ja, in voller Auflösung. Ist das Shooting noch nicht passiert, briefen wir den Fotografen zu den Winkeln, die sich am besten einrichten lassen." },
    ],
  },
  {
    slug: "cooperatives",
    name: "Cooperatives and public clients",
    nameDe: "Genossenschaften und öffentliche Bauherren",
    short: "Cooperatives",
    shortDe: "Genossenschaften",
    lead: "Members vote, neighbours object, the municipality decides — on images. For housing cooperatives, municipalities and foundations we make visualisations that are honest about height, light and materials, so the vote is about the project and not about the picture.",
    leadDe: "Mitglieder stimmen ab, Nachbarn erheben Einsprache, die Gemeinde entscheidet — an Bildern. Für Wohnbaugenossenschaften, Gemeinden und Stiftungen machen wir Visualisierungen, die bei Höhe, Licht und Materialien ehrlich sind, damit die Abstimmung über das Projekt geht und nicht über das Bild.",
    needs: [
      { situation: "A general assembly has to approve the credit", situationDe: "Eine Generalversammlung muss den Kredit bewilligen", answer: "Images that explain, not sell", answerDe: "Bilder, die erklären, nicht verkaufen", desc: "The courtyard as it will be used, the new building next to the existing one at true scale, the common rooms — and a short film for the assembly that walks the members through their future estate.", descDe: "Der Hof, wie er genutzt wird, der Neubau neben dem Bestand im echten Massstab, die Gemeinschaftsräume — und ein kurzer Film für die Versammlung, der die Mitglieder durch ihre künftige Siedlung führt." },
      { situation: "Neighbours will read the permit documents", situationDe: "Nachbarn lesen die Baugesuchsunterlagen", answer: "Neutral, verifiable views", answerDe: "Neutrale, überprüfbare Ansichten", desc: "Photomontage from the public viewpoints, true heights from the plans, sun position for the dates the authority names, camera data documented with the image.", descDe: "Fotomontage von den öffentlichen Standorten, echte Höhen aus den Plänen, Sonnenstand zu den von der Behörde genannten Daten, Kameradaten mit dem Bild dokumentiert." },
      { situation: "Letting starts before completion", situationDe: "Die Vermietung beginnt vor der Fertigstellung", answer: "A tour and plans for the application portal", answerDe: "Rundgang und Grundrisse fürs Bewerbungsportal", desc: "360° tours of the standard unit types and 3D floor plans for every apartment, so applicants choose from plans with confidence and the letting office answers fewer questions.", descDe: "360°-Rundgänge der Standardwohnungstypen und 3D-Grundrisse für jede Wohnung, damit Bewerbende sicher ab Plan wählen und die Vermietungsstelle weniger Fragen beantwortet." },
    ],
    services: ["exterior-visualization", "bird-eye-visualization", "animation-mood-film", "360-virtual-tour", "3d-floorplans"],
    projects: ["rietacker-thurgau", "waldpark-winterthur"],
    faq: [
      { q: "Can the images be used in the public consultation?", qDe: "Können die Bilder in der Mitwirkung verwendet werden?", a: "Yes. The neutral versions are made for exactly that — no atmosphere, documented camera data, true heights — and we deliver them labelled as visualisations.", aDe: "Ja. Die neutralen Versionen sind genau dafür gemacht — keine Stimmung, dokumentierte Kameradaten, echte Höhen — und wir liefern sie als Visualisierungen gekennzeichnet." },
      { q: "Do you work within public procurement budgets?", qDe: "Arbeiten Sie im Rahmen öffentlicher Beschaffungsbudgets?", a: "We quote a fixed price per deliverable before the project, which fits most procurement rules; the quote lists each image, film and tour separately.", aDe: "Wir offerieren vor dem Projekt einen Fixpreis pro Lieferobjekt, was den meisten Beschaffungsregeln entspricht; die Offerte führt jedes Bild, jeden Film und jeden Rundgang einzeln auf." },
      { q: "Can a film be shown at the general assembly?", qDe: "Kann ein Film an der Generalversammlung gezeigt werden?", a: "Yes. A forty-to-sixty-second walk through the estate, cut for a projector and without licensed music if you prefer, delivered as MP4.", aDe: "Ja. Ein vierzig- bis sechzigsekündiger Gang durch die Siedlung, geschnitten für den Beamer und auf Wunsch ohne lizenzierte Musik, geliefert als MP4." },
    ],
  },
];

export function audienceBySlug(slug) {
  return audiences.find((a) => a.slug === slug);
}

export function localizeAudience(a, locale) {
  const de = locale === "de";
  const pick = (en, deVal) => (de && deVal ? deVal : en);
  return {
    ...a,
    name: pick(a.name, a.nameDe),
    short: pick(a.short, a.shortDe),
    lead: pick(a.lead, a.leadDe),
    needs: a.needs.map((n) => ({ situation: pick(n.situation, n.situationDe), answer: pick(n.answer, n.answerDe), desc: pick(n.desc, n.descDe) })),
    faq: a.faq.map((f) => ({ q: pick(f.q, f.qDe), a: pick(f.a, f.aDe) })),
  };
}
