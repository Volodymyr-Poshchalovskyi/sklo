import React from "react";
import { notFound } from "next/navigation";
import { servicesData, localizeService } from "@/data/servicesData";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };
import ServiceDetailClient from "./ServiceDetailClient";

// Every page shared one title until now, so twelve service pages were
// indistinguishable in a tab strip, a bookmark list or a search result.
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};
  const localized = localizeService(service, locale);
  return {
    title: `${localized.title} — SKLO Studio`,
    description: localized.desc,
    alternates: { canonical: `/${locale}/services/${slug}` },
    openGraph: {
      title: `${localized.title} — SKLO Studio`,
      description: localized.desc,
      url: `/${locale}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  // Localised here, in the server component, so the client only ever receives
  // flat strings in one language.
  const otherServices = servicesData
    .filter((s) => s.slug !== slug)
    .map((s) => localizeService(s, locale));

  return (
    <ServiceDetailClient
      service={localizeService(service, locale)}
      otherServices={otherServices}
      locale={locale}
      t={translations[locale] ?? translations.en}
    />
  );
}

// Derived from servicesData rather than a hand-kept copy of the slugs: the
// duplicate list had already fallen out of sync, so a newly added service was
// rendered on demand but never prerendered.
export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}
