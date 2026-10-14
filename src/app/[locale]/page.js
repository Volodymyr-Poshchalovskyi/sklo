"use client";
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import FAQ from "@/components/FAQ";
import { use } from "react";
import { translations } from "@/locales";
import { faqJsonLd, JsonLd, absoluteUrl, SITE_URL } from "@/lib/seo";
import { videoSrc, videoPoster } from "@/lib/media";
import HomeLinks from "@/components/HomeLinks";
import { audiences, localizeAudience } from "@/data/audiences";
import { regions, localizeRegion } from "@/data/regions";
import { pickL } from "@/lib/i18n";


export default function Home({ params }) {
  const { locale } = use(params);
  const t = translations[locale] ?? translations.en;

  return (
    <main>
      <JsonLd data={faqJsonLd(t)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: pickL(locale, "SKLO Studio — architectural visualisation showreel", "SKLO Studio — Showreel Architekturvisualisierung", "SKLO Studio — showreel de visualización arquitectónica"),
          description: t.hero.subtitle,
          contentUrl: videoSrc("/assets/home/hero_video.webm", "hd"),
          thumbnailUrl: videoPoster("/assets/home/hero_video.webm"),
          uploadDate: "2026-10-12",
          creator: { "@id": `${SITE_URL}/#organization` },
          url: absoluteUrl(`/${locale}`),
        }}
      />
      <HeroSection t={t} locale={locale} />
      <WhoWeAre locale={locale} t={t} />
      <HomeLinks
        locale={locale}
        t={t}
        audiences={audiences.map((a) => ({ slug: a.slug, name: localizeAudience(a, locale).name, hint: t.home.links.audiences[a.slug] }))}
        regions={regions.map((r) => ({ slug: r.slug, name: localizeRegion(r, locale).name, hint: t.home.links.regions[r.slug] }))}
      />
      <FAQ locale={locale} t={t} />
    </main>
  );
}