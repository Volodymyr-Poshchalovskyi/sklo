"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { localizedServices } from "@/data/servicesData";
import { servicePosterFor, serviceWideFor } from "@/data/galleryData";
import Title3D from "@/components/Title3D";
import { translations } from "@/locales";


function ServiceMedia({ service, wide = false }) {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Each tile takes the crop that fits its box: the 4:5 poster for the
  // square-ish and tall tiles, the 21:9 frame for the wide ones — the other
  // way round either crop shows a sliver of itself.
  const card = (wide ? serviceWideFor(service.slug) : servicePosterFor(service.slug)) ?? servicePosterFor(service.slug);
  const cardSrc = card?.src ?? service.src;
  const cardIsVideo = card ? card.type === "video" : service.type === "video";

  // A card whose service is a film shows the film, not a frame of it — the
  // same behaviour the homepage carousel already has. Playback follows the
  // viewport rather than the pointer, so the tiles are alive on a phone too,
  // and only the visible ones hold a decoder.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0.01 }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [cardIsVideo]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    // Reduced motion and a metered connection both mean: leave it on its
    // first frame until the reader asks for it by hovering.
    const stillness =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      navigator.connection?.saveData === true;
    if (inView && !stillness) videoEl.play().catch(() => {});
    else videoEl.pause();
  }, [inView]);

  const handleMouseEnter = () => {
    if (cardIsVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (cardIsVideo && videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (cardIsVideo) {
    // `preload="metadata"` fetches no frame, so a video tile stayed an empty
    // rectangle until the pointer reached it — one card read as broken. The
    // poster gives every tile something to show at rest.
    const frame = card?.frame;
    return (
      <div className="relative w-full h-full">
      <div
        className="w-full h-full"
        style={frame ? { transform: `scale(${frame.scale}) translateX(${frame.x}%)` } : undefined}
      >
      <video
        ref={videoRef}
        src={cardSrc}
        poster={card?.type === "image" ? card.src : undefined}
        loop
        muted
        playsInline
        preload="metadata"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        style={card?.position ? { objectPosition: card.position } : undefined}
      />
      </div>
      </div>
    );
  }

  return (
    <img
      src={cardSrc}
      alt={service.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
  );
}

// The bento: all twelve services on one screen, each a tile of photo and
// name, sized by weight — the two renders that every project starts with
// are the big ones. At rest a tile shows its number and its name; hovering
// deepens the veil and slides in the one-line description and an arrow.
// Below `lg` the tiles are all one size, two to a row, with the description
// always on (there is no hover to reveal it).
//
// 6 columns × 4 rows = 24 cells: 2 large (2×2), 4 wide (2×1), 2 tall (1×2),
// 4 small (1×1). `area` is the lg placement, `shape` picks the crop and how
// much caption fits.
const BENTO = {
  "exterior-visualization":  { area: "1 / 1 / 3 / 3", shape: "large" },
  "interior-visualization":  { area: "1 / 3 / 3 / 5", shape: "large" },
  "animation-mood-film":     { area: "1 / 5 / 2 / 7", shape: "wide" },
  "virtual-staging":         { area: "2 / 5 / 3 / 6", shape: "small" },
  "graphic-design":          { area: "2 / 6 / 3 / 7", shape: "small" },
  "bird-eye-visualization":  { area: "3 / 1 / 4 / 3", shape: "wide" },
  "3d-floorplans":           { area: "4 / 1 / 5 / 2", shape: "small" },
  "web-development":         { area: "4 / 2 / 5 / 3", shape: "small" },
  "cinemagraph-live-shot":   { area: "3 / 3 / 5 / 4", shape: "tall" },
  "product-visualization":   { area: "3 / 4 / 5 / 5", shape: "tall" },
  "360-virtual-tour":        { area: "3 / 5 / 4 / 7", shape: "wide" },
  "fly-around-navigator":    { area: "4 / 5 / 5 / 7", shape: "wide" },
};

function ServiceTile({ service, index, locale }) {
  const cell = BENTO[service.slug] ?? { area: "auto", shape: "small" };
  const small = cell.shape === "small";
  const titleSize = { large: "text-base lg:text-xl", wide: "text-base lg:text-xl", tall: "text-sm lg:text-base", small: "text-sm lg:text-[15px]" }[cell.shape];
  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className="service-bento-tile group relative block overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-auto lg:h-full animate-fade-in-tile opacity-0"
      style={{ animationDelay: `${index * 50}ms`, "--area": cell.area }}
    >
      <div className="absolute inset-0">
        <ServiceMedia service={service} wide={cell.shape === "wide"} />
      </div>

      <span className="media-chip absolute top-3 left-3 font-mono text-[10px] backdrop-blur-sm rounded-full px-2 py-0.5">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* The caption: a veil that deepens on hover, the name always, the
          description and the arrow sliding in under it. `media-caption`
          keeps the text white in both themes. */}
      <div className="media-caption absolute inset-0 flex flex-col justify-end p-4 lg:p-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-500 lg:opacity-80 lg:group-hover:opacity-100" />
        <div className="relative lg:pr-10">
          <h3 className={`font-bold uppercase tracking-wide leading-snug ${titleSize}`}>
            {service.title}
          </h3>
          <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 ${small ? "lg:hidden" : ""}`}>
            <div className="overflow-hidden">
              <p className="pt-1.5 text-xs lg:text-sm text-white/80 leading-relaxed line-clamp-2">{service.cardDesc ?? service.desc}</p>
            </div>
          </div>
          <span className="absolute right-0 bottom-0 hidden lg:inline-flex w-8 h-8 items-center justify-center rounded-full border border-white/40 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage({ params }) {
  const { locale } = React.use(params);
  const t = translations[locale] ?? translations.en;
  const services = localizedServices(locale);

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <section className="section-shell hairline-top w-full py-16 md:py-20 lg:py-12 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col gap-3 mb-8 lg:mb-7 max-w-2xl">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-widest uppercase">
            {t.services.title}
          </Title3D>
        </div>

        {/* One screen at lg: the grid's height is the viewport less the
            header and the title, capped so a tall monitor does not stretch
            the tiles into billboards. */}
        <div className="service-bento grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-6 lg:grid-rows-4 lg:h-[clamp(34rem,calc(100svh-17.25rem),46rem)]">
          {services.map((service, index) => (
            <ServiceTile
              key={service.slug}
              service={service}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInTile {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-tile {
          animation: fadeInTile 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}
