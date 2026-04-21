"use client";
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Loader from "@/components/Loader";
import { use } from "react";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

export default function Home({ params }) {
  const { locale } = use(params);
  const t = translations[locale] ?? translations.en;
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Loader onComplete={() => setReady(true)} />}
      <Header t={t} locale={locale} visible={ready} />
      <main>
        <HeroSection t={t} ready={ready} />
      </main>
    </>
  );
}