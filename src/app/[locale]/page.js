"use client";
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import FAQ from "@/components/FAQ";
import { use } from "react";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

export default function Home({ params }) {
  const { locale } = use(params);
  const t = translations[locale] ?? translations.en;

  return (
    <main>
      <HeroSection t={t} />
      <WhoWeAre />
      <FAQ />
    </main>
  );
}