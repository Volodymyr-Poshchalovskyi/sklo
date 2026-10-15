"use client";
import ServicesCarousel from "@/components/ServicesCarousel";
import { servicePosterFor } from "@/data/galleryData";
import { serviceTitleFor } from "@/data/servicesData";
import Title3D from "@/components/Title3D";

export default function WhoWeAre({ locale, t }) {

  // Media is resolved from the shared poster map (see galleryData.js) rather
  // than hardcoded, so these cards show the same real work as the header menu
  // and the service pages. Six of the nine used to repeat one placeholder.
  const slides = [
    { id: 1, slug: "exterior-visualization", title: "EXTERIOR VISUALIZATION" },
    { id: 2, slug: "interior-visualization", title: "INTERIOR VISUALIZATION" },
    { id: 3, slug: "360-virtual-tour", title: "360° VIRTUAL TOUR | VR" },
    { id: 4, slug: "web-development", title: "WEB DEVELOPMENT" },
    { id: 5, slug: "animation-mood-film", title: "ANIMATION | MOOD FILM" },
    { id: 6, slug: "bird-eye-visualization", title: "BIRD-EYE VISUALIZATION" },
    { id: 7, slug: "cinemagraph-live-shot", title: "CINEMAGRAPH | LIVE SHOT" },
    { id: 8, slug: "3d-floorplans", title: "3D FLOORPLAN" },
    { id: 9, slug: "product-visualization", title: "PRODUCT VISUALISATION" },
    { id: 10, slug: "virtual-staging", title: "VIRTUAL STAGING" },
  ].map((slide) => {
    const poster = servicePosterFor(slide.slug);
    return {
      ...slide,
      title: serviceTitleFor(slide.slug, locale, slide.title),
      href: `/${locale}/services/${slide.slug}`,
      image: poster?.type === "image" ? poster.src : undefined,
      video: poster?.type === "video" ? poster.src : undefined,
    };
  });

  return (
    <>
      <section
        className="section-shell hairline-top w-full text-white py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col"
      >
        <div className="w-full flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-4 pt-4 md:pt-6">
            <span className="eyebrow">{t?.home?.services?.eyebrow}</span>
            <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
              {t?.home?.services?.title}
            </Title3D>
          </div>

          <ServicesCarousel
            items={slides}
            prevLabel={t?.gallery?.prevSlide}
            nextLabel={t?.gallery?.nextSlide}
            defaultHref={`/${locale}/services`}
            viewAllHref={`/${locale}/services`}
            viewAllLabel={t?.home?.services?.viewAll ?? "ALL SERVICES"}
          />
        </div>
      </section>

    </>
  );
}
