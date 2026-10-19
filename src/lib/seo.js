import { stripSoftHyphens } from "@/data/servicesData";
import { CONTACT_EMAIL, PHONE, SOCIALS, FOUNDED, TEAM_SIZE, AREA_SERVED } from "@/data/studio";

// One place for everything a search engine reads off a page. Every route
// builds its metadata through `pageMetadata()` so canonical, hreflang, Open
// Graph and Twitter stay complete on every page — Next merges `alternates`
// and `openGraph` by replacement, not by key, so a child that set only
// `alternates.canonical` used to drop the hreflang links the root had declared.

// The production origin. The site is moving from the *.vercel.app preview to
// sklo.studio, and canonicals must already point at the final home: a
// canonical on vercel.app would tell Google the preview is the original.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://sklo.studio").replace(/\/$/, "");
export const SITE_NAME = "SKLO Studio";
export const LOCALES = ["en", "de", "es"];
// 1200×630 cards rendered from the studio's own work (scratch template kept
// out of the repo; regenerate with any 1200×630 screenshot pipeline).
export const DEFAULT_OG_IMAGE = { url: "/assets/og/home.jpg", width: 1200, height: 630, alt: "SKLO Studio" };

export const STATIC_PATHS = ["", "/services", "/projects", "/gallery", "/about", "/contact", "/imprint", "/privacy"];

export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Titles in the data are set in capitals for the headings ("WEB DEVELOPMENT",
// "AUSSEN­VISUALI­SIERUNG" with soft hyphens). A <title> wants neither: the
// soft hyphens show up as stray characters in a results page and capitals
// read as shouting. Known acronyms and anything with a digit keep their
// case; everything else becomes a capitalised word. (A plain length rule
// turned "WEB" into an acronym — hence the explicit list.)
const KEEP_LOWER = { US: "Us", AND: "and", OF: "of", FOR: "for", THE: "the" };
const ACRONYMS = new Set(["VR", "AR", "CAD", "BIM", "CGI", "VFX", "GIS", "UAV", "UI", "UX", "SEO", "PDF", "3D"]);
export function humanizeTitle(raw = "") {
  const clean = stripSoftHyphens(raw).trim();
  if (clean !== clean.toUpperCase()) return clean; // already mixed case
  return clean
    .split(/\s+/)
    .map((token) => {
      if (KEEP_LOWER[token]) return KEEP_LOWER[token];
      if (token === "|") return token;
      // Hyphenated parts are judged one by one, so "3D-GRUNDRISSE" keeps
      // its "3D" and still gets a readable "Grundrisse".
      return token
        .split("-")
        .map((part) => (/\d/.test(part) || ACRONYMS.has(part) ? part : part.charAt(0) + part.slice(1).toLowerCase()))
        .join("-");
    })
    .join(" ");
}

export function languageAlternates(path = "") {
  return {
    en: `/en${path}`,
    // One German version for Switzerland, Germany and Austria — the copy is
    // the same for all three, so a single `de` rather than three regional
    // tags that would point at identical pages.
    de: `/de${path}`,
    es: `/es${path}`,
    "x-default": `/en${path}`,
  };
}

// `title` is the page's own name; the site name is appended here. `path` is
// the route without the locale ("/services", "" for the home page).
// Search results show about 60 characters of a title and 155–160 of a
// description; audits flag titles under 30 too. So: a short page name gets
// the longer, descriptive brand ("Gallery — SKLO 3D Visualisation Studio"),
// a long one the short brand ("… — SKLO") or none, and a description is cut
// back to its last full sentence (or word) inside 160 characters.
const BRAND_LONG = {
  en: "SKLO 3D Visualisation Studio",
  de: "SKLO Studio für 3D-Visualisierung",
  es: "SKLO, estudio de visualización 3D",
};

export function seoTitle(name, locale) {
  if (!name) return SITE_NAME;
  const variants = [`${name} — ${SITE_NAME}`, `${name} — SKLO`, name];
  const long = `${name} — ${BRAND_LONG[locale] ?? BRAND_LONG.en}`;
  if (variants[0].length < 30 && long.length <= 60) return long;
  return variants.find((v) => v.length <= 60) ?? name;
}

export function seoDescription(text = "", max = 160) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence >= 90) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, max - 1).replace(/[\s,;:—–-]+\S*$/, "")}…`;
}

export function pageMetadata({ locale, path = "", title, description: rawDescription, image, type = "website" }) {
  const fullTitle = seoTitle(title ? humanizeTitle(title) : "", locale);
  const description = rawDescription ? seoDescription(rawDescription) : rawDescription;
  const url = absoluteUrl(`/${locale}${path}`);
  const og = image ? { url: image, alt: humanizeTitle(title || SITE_NAME) } : DEFAULT_OG_IMAGE;
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    // Explicit, so audits stop flagging a missing tag. Off-production hosts
    // still get the X-Robots-Tag noindex header from proxy.js, which wins.
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}${path}`,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "de" ? "de_CH" : locale === "es" ? "es_ES" : "en_GB",
      type,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [og.url],
    },
  };
}

// ---- JSON-LD -------------------------------------------------------------

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/assets/android-chrome-512x512.png"),
    email: CONTACT_EMAIL,
    telephone: PHONE.replace(/\s+/g, ""),
    foundingDate: FOUNDED,
    numberOfEmployees: { "@type": "QuantitativeValue", value: TEAM_SIZE },
    sameAs: SOCIALS.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: PHONE.replace(/\s+/g, ""),
      availableLanguage: ["en", "de", "es"],
    },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Architectural visualization",
      "3D rendering",
      "Exterior visualization",
      "Interior visualization",
      "Architectural animation",
      "360° virtual tours",
      "Virtual staging",
      "3D floor plans",
      "Real estate marketing",
      "Project websites",
    ],
    description:
      locale === "de"
        ? "3D-Visualisierungsstudio für Architektur, Immobilien und Produkte: Renderings, Animationen, 360°-Rundgänge und Projektwebsites."
        : locale === "es"
        ? "Estudio de visualización 3D para arquitectura, inmobiliaria y producto: renders, animaciones, recorridos virtuales 360° y sitios web de proyecto."
        : "3D visualisation studio for architecture, real estate and products: renderings, animations, 360° tours and project websites.",
  };
}

export function websiteJsonLd(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: absoluteUrl(`/${locale}`),
    name: SITE_NAME,
    inLanguage: locale === "de" ? "de" : locale === "es" ? "es" : "en",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({ locale, service }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: humanizeTitle(service.title),
    description: service.desc,
    serviceType: humanizeTitle(service.title),
    url: absoluteUrl(`/${locale}/services/${service.slug}`),
    image: service.type === "image" ? absoluteUrl(service.src) : undefined,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    inLanguage: locale === "de" ? "de" : "en",
    // "From" price as a minimum, the way the page states it.
    offers: service.investment
      ? {
          "@type": "Offer",
          priceCurrency: service.investment.currency,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: service.investment.currency,
            minPrice: service.investment.from,
          },
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/${locale}/services/${service.slug}`),
        }
      : undefined,
  };
}

// Rendered as a <script type="application/ld+json">. The data is ours, but
// `<` is escaped anyway so a future string containing "</script>" cannot
// break out of the tag.
export function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

// The home page FAQ as FAQPage structured data. The answers are assembled
// from the same locale strings FAQ.js renders, flattened to plain text, so
// the markup can never say something the page does not.
export function faqJsonLd(t) {
  // Service pages hand in a ready list of { q, a }; the home page hands in
  // the locale object whose FAQ strings are assembled below.
  if (Array.isArray(t?.faq)) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
  }
  const items = t?.faq?.items ?? {};
  const text = (v) => {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v.map(text).filter(Boolean).join(" ");
    if (typeof v === "object") return ["before", "strong", "after"].map((k) => v[k]).filter(Boolean).join("");
    return "";
  };
  const entries = [
    [items.start?.q, [items.start?.p1].map(text).join(" ")],
    [items.workflow?.q, [items.workflow?.intro, ...(items.workflow?.steps ?? []).map((st) => `${st.title}: ${st.desc}`)].filter(Boolean).join(" ")],
    [items.duration?.q, text(items.duration?.paragraphs)],
    [items.pricing?.q, text(items.pricing?.paragraphs)],
    [items.partnership?.q, [text(items.partnership?.p1), text(items.partnership?.p2)].filter(Boolean).join(" ")],
  ].filter(([q, a]) => q && a);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a.replace(/\s+/g, " ").trim() },
    })),
  };
}
