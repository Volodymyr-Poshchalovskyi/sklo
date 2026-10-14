import { translations } from "@/locales";
import { pageMetadata } from "@/lib/seo";


// The route's own <title> and description. The page itself is a client
// component, so the metadata lives in the segment's layout — one page per
// route instead of one title for the whole site.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({
    locale,
    path: "/contact",
    image: "/assets/og/contact.jpg",
    title: t.contact.title,
    description: t.seo.contact,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
