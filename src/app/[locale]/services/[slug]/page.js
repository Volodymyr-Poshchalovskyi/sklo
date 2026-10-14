import React from "react";
import { notFound } from "next/navigation";
import { servicesData, localizeService } from "@/data/servicesData";
import { localizeServiceContent, formatPrice } from "@/data/serviceContent";
import { projects, localizeProject } from "@/data/projects";
import { knowledge, localizeKnowledge } from "@/data/knowledge";
import { translations } from "@/locales";

import ServiceDetailClient from "./ServiceDetailClient";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd, humanizeTitle, JsonLd } from "@/lib/seo";
import { pickL } from "@/lib/i18n";

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
  const localized = { ...localizeService(service, locale), ...localizeServiceContent(slug, locale) };
  const name = humanizeTitle(localized.title.split("|")[0].trim());
  // Title and description carry what a search for this service wants to
  // see first: the service, the market, the "from" price and the turnaround.
  const inv = localized.investment;
  const description = inv
    ? pickL(
        locale,
        `${name} for architects, developers and estate agents in Europe, North America, the Middle East and Oceania: from ${formatPrice(inv.from)} ${inv.unit}, ${inv.turnaround}. ${localized.cardDesc ?? ""}`,
        `${name} für Architekten, Bauträger und Makler in Europa, Nordamerika, im Nahen Osten und in Ozeanien: ab ${formatPrice(inv.from)} ${inv.unit}, ${inv.turnaround}. ${localized.cardDesc ?? ""}`,
        `${name} para arquitectos, promotores inmobiliarios y agentes inmobiliarios en Europa, Norteamérica, Oriente Medio y Oceanía: desde ${formatPrice(inv.from)} ${inv.unit}, ${inv.turnaround}. ${localized.cardDesc ?? ""}`
      )
    : localized.desc;
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: pickL(locale, `${name} worldwide — Europe, North America, Middle East`, `${name} weltweit — Europa, Nordamerika, Naher Osten`, `${name} en todo el mundo — Europa, Norteamérica, Oriente Medio`),
    description: snippet(description.trim()),
    // A 1200×630 JPEG cut from the service's own hero (a poster frame for the
    // two video services): WhatsApp and LinkedIn ignore webp share images.
    image: `/assets/og/services/${slug}.jpg`,
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
  // Cross-links computed here so the client gets flat, localised lists: the
  // case studies that used this service and the explainers that mention it.
  const relatedProjects = projects.filter((p) => p.services.includes(slug)).slice(0, 3).map((p) => localizeProject(p, locale));
  const relatedReading = knowledge.filter((a) => a.services.includes(slug)).slice(0, 3).map((a) => {
    const l = localizeKnowledge(a, locale);
    return { slug: l.slug, title: l.title, definition: l.definition };
  });
  // The offer — problem, deliverables, price, FAQ — comes from
  // serviceContent.js and is laid over the service record, so the client
  // reads one flat object. Web development keeps its own problems/deliverables
  // in servicesData and only takes investment and FAQ from here.
  const localized = { ...localizeService(service, locale), ...localizeServiceContent(slug, locale) };

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, service: localized })} />
      {localized.faq?.length > 0 && <JsonLd data={faqJsonLd({ faq: localized.faq })} />}
      {localized.pipeline?.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `${humanizeTitle(localized.title.split("|")[0].trim())}: ${t.services.detail.workflowTitle}`,
            description: localized.desc,
            totalTime: localized.investment?.turnaround,
            step: localized.pipeline.map((st, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: st.title,
              text: st.desc,
            })),
          }}
        />
      )}
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
        relatedProjects={relatedProjects}
        relatedReading={relatedReading}
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
