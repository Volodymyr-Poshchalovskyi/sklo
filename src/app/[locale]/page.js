import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

export default async function Home({ params }) {
  const { locale } = await params;  // ← await
  const t = translations[locale] ?? translations.en;
  return (
    <>
      <Header t={t} locale={locale} />
      <main>
        <HeroSection t={t} />
      </main>
    </>
  );
}