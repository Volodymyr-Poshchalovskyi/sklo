import LegalPage from "@/components/LegalPage";
import { legalContent } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const pick = (locale) => legalContent.imprint[locale === "de" ? "de" : "en"];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const doc = pick(locale);
  // The text itself is English for Spanish readers (no Spanish legal copy);
  // the title is translated so the page is not a duplicate of /en/imprint.
  const title = locale === "es" ? "Aviso legal" : doc.title;
  return pageMetadata({ locale, path: "/imprint", title, description: locale === "es" ? `Aviso legal — SKLO Studio. ${doc.intro}` : doc.intro });
}

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage doc={pick(locale)} />;
}
