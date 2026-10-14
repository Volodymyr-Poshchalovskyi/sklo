// The project requirements as a page: what a client sends to start a
// visualisation, in the six groups the PDF uses, plus what happens after
// sending. The PDF stays downloadable from the page; this is the same
// list, searchable and linkable.

import { mergeOverlay } from "@/lib/i18n";
import esOverlay from "@/data/es/requirements.json";

export const REQUIREMENTS_PDF = {
  en: { href: "/project-requirements.pdf", name: "SKLO-project-requirements.pdf" },
  de: { href: "/projektanforderungen.pdf", name: "SKLO-Projektanforderungen.pdf" },
};

export const requirements = [
  {
    id: "model",
    title: "3D model",
    titleDe: "3D-Modell",
    lead: "The model of the project in any of these formats:",
    leadDe: "Das vorhandene 3D-Modell in einem dieser Formate:",
    items: [".pla (ArchiCAD)", ".ifc", ".rvt (Revit)", ".skp (SketchUp)", ".3ds / .max", ".fbx", ".obj"],
    itemsDe: [".pla (ArchiCAD)", ".ifc", ".rvt (Revit)", ".skp (SketchUp)", ".3ds / .max", ".fbx", ".obj"],
    note: "No 3D model? We build it from the drawings — it takes a little longer and is quoted once.",
    noteDe: "Kein 3D-Modell? Wir bauen es aus den Plänen — das dauert etwas länger und wird einmalig offeriert.",
  },
  {
    id: "drawings",
    title: "Architectural drawings",
    titleDe: "Architekturpläne",
    lead: "The latest available set, as PDF or DWG:",
    leadDe: "Der aktuellste verfügbare Satz, als PDF oder DWG:",
    items: ["Floor plans", "Elevations", "Sections", "Site / master plan", "Roof plan", "Kitchen drawings", "Electrical plans (for lighting positions)"],
    itemsDe: ["Grundrisse", "Ansichten", "Schnitte", "Situations- / Umgebungsplan", "Dachplan", "Küchenpläne", "Elektropläne (für die Leuchtenpositionen)"],
    note: "Dimensions on the plans matter more than the file format — a dimensioned PDF beats an unscaled DWG.",
    noteDe: "Masse auf den Plänen zählen mehr als das Dateiformat — ein bemasstes PDF ist besser als ein DWG ohne Massstab.",
  },
  {
    id: "materials",
    title: "Materials and finishes",
    titleDe: "Farb- und Materialkonzept",
    lead: "Whatever exists about the surfaces, inside and out:",
    leadDe: "Alles, was zu den Oberflächen aussen und innen vorliegt:",
    items: ["Exterior materials (facade, roof, balconies)", "Interior finishes", "Flooring", "Walls and ceilings", "Windows and doors", "Furniture and fixtures", "Colours and RAL codes", "Product references and links"],
    itemsDe: ["Aussenmaterialisierung (Fassade, Dach, Balkone)", "Innenmaterialisierung", "Bodenbeläge", "Wände und Decken", "Fenster und Türen", "Möbel und Einbauten", "Farben und RAL-Codes", "Produktreferenzen und Links"],
    note: "Material samples, supplier links or photos of similar finishes all work. A finish schedule (Baubeschrieb) covers most of this in one document.",
    noteDe: "Materialmuster, Lieferantenlinks oder Fotos ähnlicher Oberflächen funktionieren alle. Ein Baubeschrieb deckt das meiste in einem Dokument ab.",
  },
  {
    id: "brief",
    title: "Brief and references",
    titleDe: "Briefing und Referenzen",
    lead: "What the images should feel like:",
    leadDe: "Wie die Bilder wirken sollen:",
    items: ["Reference images you like", "Mood and atmosphere", "Time of day and season", "Preferred interior style", "Desired camera angles"],
    itemsDe: ["Referenzbilder, die Ihnen gefallen", "Stimmung und Atmosphäre", "Tageszeit und Jahreszeit", "Bevorzugter Einrichtungsstil", "Gewünschte Kameraperspektiven"],
    note: "The more visual references, the closer the first preview lands. Three or four images say more than a page of text.",
    noteDe: "Je mehr visuelle Referenzen, desto näher sitzt die erste Vorschau. Drei, vier Bilder sagen mehr als eine Seite Text.",
  },
  {
    id: "marketing",
    title: "Marketing material",
    titleDe: "Marketingmaterialien",
    lead: "If the images go into branded material:",
    leadDe: "Falls die Bilder in gestaltete Unterlagen kommen:",
    items: ["Logo", "Fonts", "Brand colours", "Existing brochures or layouts"],
    itemsDe: ["Logo", "Schriftarten", "Markenfarben", "Bestehende Broschüren oder Layouts"],
    note: "Optional. Needed when we design the brochure, the site banners or the project website for you.",
    noteDe: "Optional. Nötig, wenn wir Broschüre, Bautafeln oder die Projektwebsite für Sie gestalten.",
  },
  {
    id: "output",
    title: "Final output",
    titleDe: "Finale Visualisierungen",
    lead: "What you need at the end:",
    leadDe: "Was Sie am Ende brauchen:",
    items: ["Number of images", "Resolution", "Aspect ratio, landscape or portrait", "File format", "Use: print, web, social media"],
    itemsDe: ["Anzahl der Bilder", "Auflösung", "Seitenverhältnis, Quer- oder Hochformat", "Dateiformat", "Verwendung: Print, Website, Social Media"],
    note: "Not sure yet? We deliver print and web sizes by default, and social cuts on request.",
    noteDe: "Noch unklar? Wir liefern standardmässig Print- und Webgrössen, Social-Media-Schnitte auf Wunsch.",
  },
];

export const afterSending = [
  { title: "We review what you sent", titleDe: "Wir prüfen Ihre Unterlagen", desc: "Within one working day we tell you what is enough and what is missing — usually nothing that stops a start.", descDe: "Innerhalb eines Arbeitstags sagen wir Ihnen, was reicht und was fehlt — meist nichts, was einen Start verhindert." },
  { title: "Fixed quote and schedule", titleDe: "Fixe Offerte und Terminplan", desc: "Scope, price and delivery date in writing, with the preview checkpoints marked.", descDe: "Umfang, Preis und Liefertermin schriftlich, mit den Vorschau-Terminen markiert." },
  { title: "Grey previews", titleDe: "Grau-Vorschauen", desc: "Camera angles and composition for approval before any material or light is set.", descDe: "Kamerawinkel und Komposition zur Freigabe, bevor Material oder Licht gesetzt werden." },
  { title: "Colour previews, then finals", titleDe: "Farbvorschauen, dann Finals", desc: "Two rounds of revisions on the coloured preview, then the final images at full resolution.", descDe: "Zwei Korrekturrunden an der Farbvorschau, dann die finalen Bilder in voller Auflösung." },
];

export const requirementsFaq = [
  { q: "What if we only have a sketch?", qDe: "Was, wenn wir nur eine Skizze haben?", a: "Send it. For an early-stage project we work from a sketch and a site plan, build a massing model, and refine as the plans firm up — the first camera study often helps the design decisions.", aDe: "Schicken Sie sie. Bei einem frühen Projektstand arbeiten wir ab Skizze und Situationsplan, bauen ein Volumenmodell und verfeinern, sobald die Pläne fester werden — die erste Kamerastudie hilft oft bei den Entwurfsentscheidungen." },
  { q: "How do we send large files?", qDe: "Wie schicken wir grosse Dateien?", a: "Through the contact form, which takes up to 10 files of 200 MB each, or any transfer link — WeTransfer, Dropbox, a shared drive. Models and drawings stay in our project storage and are deleted on request after delivery.", aDe: "Über das Kontaktformular, das bis zu 10 Dateien à 200 MB nimmt, oder jeden Transferlink — WeTransfer, Dropbox, ein geteiltes Laufwerk. Modelle und Pläne bleiben in unserem Projektspeicher und werden nach der Lieferung auf Wunsch gelöscht." },
  { q: "Do you sign an NDA?", qDe: "Unterschreiben Sie eine Geheimhaltungsvereinbarung?", a: "Yes, yours or ours, before any file is sent. Projects under NDA are never shown in our portfolio and never named.", aDe: "Ja, Ihre oder unsere, bevor eine Datei verschickt wird. Projekte unter NDA zeigen wir nie im Portfolio und nennen sie nie." },
];

function localizeRequirementsBase(locale) {
  const de = locale === "de";
  const pick = (en, deVal) => (de && deVal ? deVal : en);
  return {
    groups: requirements.map((r) => ({ id: r.id, title: pick(r.title, r.titleDe), lead: pick(r.lead, r.leadDe), items: pick(r.items, r.itemsDe), note: pick(r.note, r.noteDe) })),
    after: afterSending.map((s) => ({ title: pick(s.title, s.titleDe), desc: pick(s.desc, s.descDe) })),
    faq: requirementsFaq.map((f) => ({ q: pick(f.q, f.qDe), a: pick(f.a, f.aDe) })),
    pdf: REQUIREMENTS_PDF[de ? "de" : "en"],
  };
}

export function localizeRequirements(locale) {
  return locale === "es" ? mergeOverlay(localizeRequirementsBase("en"), esOverlay) : localizeRequirementsBase(locale);
}
