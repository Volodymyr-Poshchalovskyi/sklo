import LegalPage from "@/components/LegalPage";
import { legalContent } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const pick = (locale) => legalContent.privacy[locale === "de" ? "de" : "en"];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const doc = pick(locale);
  // The text itself is English for Spanish readers (no Spanish legal copy);
  // the title is translated so the page is not a duplicate of /en/privacy.
  const title = locale === "es" ? "Política de privacidad" : doc.title;
  return pageMetadata({ locale, path: "/privacy", title, description: locale === "es" ? `Política de privacidad — SKLO Studio. ${doc.intro}` : doc.intro });
}

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage doc={pick(locale)} />;
}
