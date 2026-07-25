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

  const otherServices = servicesData
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <ServiceDetailClient
      service={service}
      otherServices={otherServices}
      locale={locale}
    />
  );
}

// Generate static parameters at build time for static site generation
export async function generateStaticParams() {
  const slugs = [
    "exterior-visualization",
    "interior-visualization",
    "animation-mood-film",
    "bird-eye-visualization",
    "360-virtual-tour",
    "cinemagraph-live-shot",
    "product-visualization",
    "virtual-staging",
    "graphic-design",
    "3d-floorplans",
    "media-website-packages"
  ];
  return slugs.map((slug) => ({ slug }));
}
