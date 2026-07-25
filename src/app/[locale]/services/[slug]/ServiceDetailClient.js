"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ServiceDetailClient({ service, otherServices, locale }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (activeMediaIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveMediaIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveMediaIndex((prev) => (prev === 0 ? service.gallery.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveMediaIndex((prev) => (prev === service.gallery.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaIndex, service.gallery.length]);

  return (
    <main className="w-full min-h-screen bg-[#0d0d0f] text-white flex flex-col pt-16">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          {service.type === "video" ? (
            <video
              src={service.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover brightness-[0.4]"
            />
          ) : (
            <img
              src={service.src}
              alt={service.title}
              className="w-full h-full object-cover brightness-[0.4]"
            />
          )}
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/40 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col items-center text-center max-w-4xl pt-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-6 text-white leading-tight">
            {service.title}
          </h1>
          <p className="text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            {service.desc}
          </p>
          
          <Link
            href={`/${locale}/contact?service=${service.slug}`}
            className="group inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-widest uppercase bg-white text-black hover:bg-white/90 px-8 py-4.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
          >
            {locale === "de" ? "Preisanfrage senden" : "Request pricing"}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 2. PIPELINE SECTION */}
      <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-[#0d0d0f] border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[--color-accent] mb-2 block">
              {locale === "de" ? "Prozess" : "Workflow"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              {locale === "de" ? "Wie wir arbeiten" : "Our Pipeline"}
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-white/10 to-transparent w-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.pipeline.map((step, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-[--color-accent] hover:translate-y-[-4px]"
              >
                <span className="text-4xl md:text-5xl font-script italic text-[--color-accent] opacity-80 mb-6 block font-serif">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MINI-GALLERY SECTION */}
      <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-[#101012] border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[--color-accent] mb-2 block">
              {locale === "de" ? "Portfolio" : "Visual Showcase"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              {locale === "de" ? "Projektgalerie" : "Mini Gallery"}
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-white/10 to-transparent w-full mt-6" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {service.gallery.map((media, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={`break-inside-avoid relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl cursor-pointer group ${media.aspect}`}
              >
                {media.type === "video" ? (
                  <video 
                    src={media.src}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                ) : (
                  <img 
                    src={media.src} 
                    alt="Gallery item"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-bold tracking-widest uppercase border border-white px-4 py-2 rounded-full text-white bg-black/45">
                    {locale === "de" ? "Vergrößern" : "Zoom in"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OTHER SERVICES SECTION */}
      <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-[#0d0d0f] border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[--color-accent] mb-2 block">
              {locale === "de" ? "Entdecken" : "Explore More"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              {locale === "de" ? "Andere Dienstleistungen" : "Other Services"}
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-white/10 to-transparent w-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((other, idx) => (
              <Link 
                key={idx}
                href={`/${locale}/services/${other.slug}`}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[--color-accent] hover:translate-y-[-4px] cursor-pointer"
              >
                <div className="w-full aspect-[16/10] overflow-hidden bg-white/5 relative">
                  {other.type === "video" ? (
                    <video
                      src={other.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  ) : (
                    <img 
                      src={other.src} 
                      alt={other.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold uppercase tracking-widest mb-2 text-white group-hover:text-[--color-accent] transition-colors duration-300">
                    {other.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                    {other.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIGHTBOX MODAL */}
      {activeMediaIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setActiveMediaIndex(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setActiveMediaIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/5 border border-white/10 hover:border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer z-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((prev) => (prev === 0 ? service.gallery.length - 1 : prev - 1));
            }}
            className="absolute left-6 w-12 h-12 bg-white/5 border border-white/10 hover:border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer z-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((prev) => (prev === service.gallery.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-6 w-12 h-12 bg-white/5 border border-white/10 hover:border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer z-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Media Content */}
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {service.gallery[activeMediaIndex].type === "video" ? (
              <video 
                src={service.gallery[activeMediaIndex].src}
                autoPlay
                controls
                loop
                playsInline
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <img 
                src={service.gallery[activeMediaIndex].src} 
                alt="Fullscreen item"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
