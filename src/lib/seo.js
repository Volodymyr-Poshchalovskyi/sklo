import { stripSoftHyphens } from "@/data/servicesData";

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
export const LOCALES = ["en", "de"];
export const DEFAULT_OG_IMAGE = { url: "/assets/ogImage.jpg", width: 1200, height: 630, alt: "SKLO Studio" };

export const STATIC_PATHS = ["", "/services", "/gallery", "/about", "/contact"];

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
      if (/\d/.test(token) || ACRONYMS.has(token) || token === "|") return token;
      return token
        .split("-")
        .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
        .join("-");
    })
    .join(" ");
}

export function languageAlternates(path = "") {
  return {
    en: `/en${path}`,
    "de-CH": `/de${path}`,
    "x-default": `/en${path}`,
  };
}

// `title` is the page's own name; the site name is appended here. `path` is
// the route without the locale ("/services", "" for the home page).
export function pageMetadata({ locale, path = "", title, description, image, type = "website" }) {
  const fullTitle = title ? `${humanizeTitle(title)} — ${SITE_NAME}` : SITE_NAME;
  const url = absoluteUrl(`/${locale}${path}`);
  const og = image ? { url: image, alt: humanizeTitle(title || SITE_NAME) } : DEFAULT_OG_IMAGE;
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "de" ? "de_CH" : "en_GB",
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
    email: "info@sklo.studio",
    areaServed: "CH",
    description:
      locale === "de"
        ? "3D-Visualisierungsstudio für Architektur, Immobilien und Produkte: Renderings, Animationen, 360°-Rundgänge und Projektwebsites."
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
    inLanguage: locale === "de" ? "de-CH" : "en",
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
    areaServed: "CH",
    inLanguage: locale === "de" ? "de-CH" : "en",
  };
}

// Rendered as a <script type="application/ld+json">. The data is ours, but
// `<` is escaped anyway so a future string containing "</script>" cannot
// break out of the tag.
export function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
