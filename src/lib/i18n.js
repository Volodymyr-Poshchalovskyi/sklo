// Spanish is layered over the English record instead of adding an `Es`
// sibling to every field: the data files keep their English/German fields,
// each localize function builds the English view and then lays the matching
// overlay from src/data/es/*.json on top. An overlay has the shape of that
// view and holds only translated strings; anything it leaves out stays
// English, so a half-finished overlay never breaks a page.

export function mergeOverlay(base, overlay) {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(base)) {
    return base.map((v, i) => mergeOverlay(v, Array.isArray(overlay) ? overlay[i] : undefined));
  }
  if (base && typeof base === "object") {
    const out = { ...base };
    for (const k of Object.keys(overlay)) {
      if (k in base) out[k] = mergeOverlay(base[k], overlay[k]);
    }
    return out;
  }
  return typeof overlay === typeof base ? overlay : base;
}

// "de" and "es" have their own copy; everything else reads English.
export const isEs = (locale) => locale === "es";

// Inline three-way choice for strings that live in a component rather than in
// a data file or src/locales: pickL(locale, "English", "Deutsch", "Español").
// A missing Spanish string reads English.
export function pickL(locale, en, de, es) {
  if (locale === "de") return de ?? en;
  if (locale === "es") return es ?? en;
  return en;
}
