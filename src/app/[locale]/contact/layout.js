import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

// The route's own <title> and description. The page itself is a client
// component, so the metadata lives in the segment's layout — one page per
// route instead of one title for the whole site.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const title = t.contact.title;
  return {
    title: `${title} — SKLO Studio`,
    alternates: { canonical: `/${locale}/contact` },
    openGraph: { title: `${title} — SKLO Studio`, url: `/${locale}/contact` },
  };
}

export default function RouteLayout({ children }) {
  return children;
}
