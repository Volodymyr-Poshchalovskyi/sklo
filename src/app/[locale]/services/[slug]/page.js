import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((s) => s.slug !== slug);

  return (
    <ServiceDetailClient
      service={service}
      otherServices={otherServices}
      locale={locale}
    />
  );
}

// Derived from servicesData rather than a hand-kept copy of the slugs: the
// duplicate list had already fallen out of sync, so a newly added service was
// rendered on demand but never prerendered.
export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}
