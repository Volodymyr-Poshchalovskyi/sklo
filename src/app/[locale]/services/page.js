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
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <img
      src={service.src}
      alt={service.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
    />
  );
}

// Perspective lives on the transform itself (not the grid container) so each
// tile gets its own vanishing point centered on itself, independent of where
// it sits in the grid.
const TILT_DEG = 14;

function ServiceTile({ service, index, locale }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || frameRef.current) return;
    const { clientX, clientY } = e;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = card.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * TILT_DEG;
      const rotateX = (0.5 - py) * TILT_DEG;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      card.style.setProperty("--glare-x", `${px * 100}%`);
      card.style.setProperty("--glare-y", `${py * 100}%`);
      card.style.setProperty("--glare-opacity", "1");
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.setProperty("--glare-opacity", "0");
  };

  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className="group flex flex-col animate-fade-in-tile opacity-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/25 bg-white/[0.02]"
        style={{
          transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
          transitionProperty: "transform, border-color",
          transitionDuration: "500ms, 300ms",
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="absolute inset-0">
          <ServiceMedia service={service} />
        </div>

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: "var(--glare-opacity, 0)",
            background:
              "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.25), transparent 55%)",
          }}
        />

        <span className="absolute top-3 left-3 md:top-4 md:left-4 font-mono text-[10px] text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Caption lives outside the image on a solid background so it never
          fights the photo for contrast; it lifts toward the viewer on hover,
          echoing the tilt happening above it. */}
      <div
        className="mt-4 md:mt-5 px-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5"
      >
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white leading-snug">
          {service.title}
        </h3>
        <p className="mt-1.5 text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2">
          Short description placeholder.
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
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            {locale === "de"
              ? "Ein vollständiger Überblick über alle unsere Leistungen."
              : "A full overview of everything we offer."}
          </p>
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
