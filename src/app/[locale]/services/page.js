"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";

function ServiceMedia({ service }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (service.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (service.type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (service.type === "video") {
    return (
      <video
        ref={videoRef}
        src={service.src}
        loop
        muted
        playsInline
        preload="metadata"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <img
      src={service.src}
      alt={service.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
  );
}

// Same hover language as the homepage carousel: the image grows a little
// inside its own frame (which clips it, so the tile never changes size), and
// the caption block below it lights up. The grid keeps its layout — only the
// motion changed.
function ServiceTile({ service, index, locale }) {
  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className="group flex flex-col animate-fade-in-tile opacity-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/40 bg-white/[0.02] transition-colors duration-300">
        <div className="absolute inset-0">
          <ServiceMedia service={service} />
        </div>

        <span className="absolute top-3 left-3 md:top-4 md:left-4 font-mono text-[10px] text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Caption lives outside the image on a solid background so it never
          fights the photo for contrast. */}
      <div className="service-caption mt-4 md:mt-5 rounded-xl px-4 py-3.5 transition-all duration-300">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white/90 group-hover:text-white leading-snug transition-colors duration-300">
          {service.title}
        </h3>
        <p className="mt-1.5 text-xs md:text-sm text-white/50 group-hover:text-white/75 leading-relaxed line-clamp-2 transition-colors duration-300">
          {service.desc}
        </p>
      </div>
    </Link>
  );
}

export default function ServicesPage({ params }) {
  const { locale } = React.use(params);

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <span className="eyebrow">
            {locale === "de" ? "Unser Angebot" : "What we offer"}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
            {locale === "de" ? "Alle Dienstleistungen" : "All Services"}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
          {servicesData.map((service, index) => (
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
