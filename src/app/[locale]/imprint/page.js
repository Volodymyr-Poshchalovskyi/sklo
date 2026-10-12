import LegalPage from "@/components/LegalPage";
import { legalContent } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const pick = (locale) => legalContent.imprint[locale === "de" ? "de" : "en"];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const doc = pick(locale);
  return pageMetadata({ locale, path: "/imprint", title: doc.title, description: doc.intro.slice(0, 158) });
}

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage doc={pick(locale)} />;
}
