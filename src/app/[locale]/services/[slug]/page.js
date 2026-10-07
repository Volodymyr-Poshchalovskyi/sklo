import React from "react";
import { notFound } from "next/navigation";
import { servicesData, localizeService } from "@/data/servicesData";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };
import ServiceDetailClient from "./ServiceDetailClient";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd, humanizeTitle, JsonLd } from "@/lib/seo";

// A description longer than a search snippet gets cut mid-sentence; the
// service copy is written for the page, so it is trimmed at a word boundary.
function snippet(text = "", max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};
  const localized = localizeService(service, locale);
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: localized.title,
    description: snippet(localized.desc),
    // The service's own hero stands in for the generic share image. Video
    // heroes keep the default: a share card cannot play a clip.
    image: localized.type === "image" ? localized.src : undefined,
  });
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

  const t = translations[locale] ?? translations.en;
  const localized = localizeService(service, locale);

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, service: localized })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "SKLO Studio", path: `/${locale}` },
          { name: t.seo.servicesCrumb, path: `/${locale}/services` },
          { name: humanizeTitle(localized.title), path: `/${locale}/services/${slug}` },
        ])}
      />
      <ServiceDetailClient
        service={localized}
        otherServices={otherServices}
        locale={locale}
        t={t}
      />
    </>
  );
}

// Derived from servicesData rather than a hand-kept copy of the slugs: the
// duplicate list had already fallen out of sync, so a newly added service was
// rendered on demand but never prerendered.
export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}
