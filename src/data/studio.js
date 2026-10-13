// Facts about the studio that appear in more than one place: structured
// data, the footer, the trust strip, llms.txt. One source so a changed
// phone number or a new social profile is a one-line edit.
//
// Legal entity details (address, legal form, company id) live in
// src/content/legal.js and are still placeholders — on purpose, until the
// client supplies them.

export const CONTACT_EMAIL = "sklo.rendering@gmail.com";
export const PHONE = "+370 616 95 055";
export const PHONE_HREF = "tel:+37061695055";
export const WHATSAPP_HREF = "https://wa.me/37061695055";

export const SOCIALS = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/sklo.viz/" },
  { key: "behance", label: "Behance", href: "https://www.behance.net/sklostudio" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/skl%C3%B8-studio" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@SKLO_STUDIO" },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/weareSKLO" },
];

export const FOUNDED = "2025";
export const TEAM_SIZE = 8;
// Markets the studio sells into. The company itself is registered in
// Lithuania; the work is for German-speaking Europe.
export const AREA_SERVED = ["CH", "DE", "AT"];

// The figures the trust strip shows. Labels come from the locale files
// (`t.stats`); the values are facts, so they live here.
export const STATS = [
  { key: "projects", value: "70+" },
  { key: "team", value: String(TEAM_SIZE) },
  { key: "perYear", value: "35+" },
  { key: "reply", value: "12 h" },
];
