import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { pageMetadata } from "@/lib/seo";

const translations = { en, de };

// The route's own <title> and description. The page itself is a client
// component, so the metadata lives in the segment's layout — one page per
// route instead of one title for the whole site.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({
    locale,
    path: "/services",
    title: t.services.title,
    description: t.seo.services,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
