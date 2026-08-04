"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ServicesCarousel from "@/components/ServicesCarousel";

// Helper component to render step media dynamically
function StepMedia({ src, type }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;
    const el = videoRef.current;

    // Observe and auto-play video steps when they enter the screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [type, src]);

  if (type === "video") {
    return (
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <img
      src={src}
      alt="Workflow step visual"
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
    />
  );
}

// Function to dynamically select high quality media for each step
const getStepMedia = (service, index) => {
  const gallery = service.gallery || [];
  if (index === 0) {
    // Stage 1: Design / layout. Pick 3D plan representation or default fallback
    const item = gallery.find(g => g.src.includes("3dplan")) || gallery[2] || { src: "/assets/home/3dplan_interior.jpg" };
    return { src: item.src, type: item.type || "image" };
  }
  if (index === 1) {
    // Stage 2: Camera angles / lighting. Pick interior visual representation
    const item = gallery.find(g => g.src.includes("tour")) || gallery[1] || { src: "/assets/home/3d tour.jpg" };
    return { src: item.src, type: item.type || "image" };
  }
  if (index === 2) {
    // Stage 3: Materials / Atmosphere. Pick high-quality exterior details
    const item = gallery[3] || { src: "/assets/heroImage.jpg" };
    return { src: item.src, type: item.type || "image" };
  }
  // Stage 4: Final rendering. Show main service visual (image or video loop)
  return { src: service.src, type: service.type || "image" };
};

export default function ServiceDetailClient({ service, otherServices, locale }) {
  const otherServiceItems = otherServices.map((other) => ({
    id: other.slug,
    title: other.title,
    image: other.type === "video" ? undefined : other.src,
    video: other.type === "video" ? other.src : undefined,
    href: `/${locale}/services/${other.slug}`,
  }));

  const [activeMediaIndex, setActiveMediaIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPipelineInView, setIsPipelineInView] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const pipelineRef = useRef(null);

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

  // Scroll Progress Tracking for Pipeline Section
  // Uses rAF throttling + ref-based comparison to avoid unnecessary re-renders.
  const rafIdRef = useRef(null);
  const prevInViewRef = useRef(false);
  const prevProgressRef = useRef(0);
  const prevActiveRef = useRef(0);

  useEffect(() => {
    const pipelineEl = pipelineRef.current;
    if (!pipelineEl) return;

    const pipelineStepCount = service.pipeline.length;

    const handleScroll = () => {
      if (rafIdRef.current) return; // Already scheduled

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        const rect = pipelineEl.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 1. Determine if pipeline is in view
        const inView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;

        if (inView !== prevInViewRef.current) {
          prevInViewRef.current = inView;
          setIsPipelineInView(inView);
        }

        if (!inView) return;

        // 2. Calculate scroll progress
        const firstStep = pipelineEl.querySelector("#pipeline-step-0");
        const lastStep = pipelineEl.querySelector(`#pipeline-step-${pipelineStepCount - 1}`);
        let progressPercent = 0;

        if (firstStep && lastStep) {
          const firstRect = firstStep.getBoundingClientRect();
          const lastRect = lastStep.getBoundingClientRect();
          const startY = firstRect.top + firstRect.height / 2;
          const endY = lastRect.top + lastRect.height / 2;
          const viewportCenter = windowHeight / 2;

          if (startY > viewportCenter) {
            progressPercent = 0;
          } else if (endY < viewportCenter) {
            progressPercent = 100;
          } else {
            const totalDistance = endY - startY;
            const currentDistance = viewportCenter - startY;
            progressPercent = (currentDistance / totalDistance) * 100;
          }
        } else {
          const startOffset = windowHeight * 0.8;
          const totalHeight = rect.height + startOffset - 100;
          const currentProgress = startOffset - rect.top;
          progressPercent = Math.max(0, Math.min(100, (currentProgress / totalHeight) * 100));
        }

        // Only update if changed by > 0.5% to avoid micro-renders
        if (Math.abs(progressPercent - prevProgressRef.current) > 0.5) {
          prevProgressRef.current = progressPercent;
          setScrollProgress(progressPercent);
        }

        // 3. Find active step index (closest to viewport center)
        const stepCards = pipelineEl.querySelectorAll(".pipeline-step-card");
        let activeIdx = 0;
        let minDiff = Infinity;
        const vpCenter = windowHeight / 2;

        for (let idx = 0; idx < stepCards.length; idx++) {
          const cardRect = stepCards[idx].getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const diff = Math.abs(cardCenter - vpCenter);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = idx;
          }
        }

        if (activeIdx !== prevActiveRef.current) {
          prevActiveRef.current = activeIdx;
          setActiveStepIndex(activeIdx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [service.pipeline.length]);

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-16">
      <style dangerouslySetInnerHTML={{ __html: `
        .service-hero-btn {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ffffff !important;
        }
        .service-hero-btn:hover {
          background-color: rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(255, 255, 255, 0.9) !important;
        }
      `}} />

      {/* 1. HERO HEADER SECTION */}
      <section className="hero-section relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col items-center text-center max-w-4xl pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-6 text-white leading-tight"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl font-light"
          >
            {service.desc}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href={`/${locale}/contact?service=${service.slug}`}
              className="service-hero-btn group inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
            >
              {locale === "de" ? "Preisanfrage senden" : "Request pricing"}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. PIPELINE SECTION */}
      <section ref={pipelineRef} className="section-shell hairline-top w-full py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
              {locale === "de" ? "Prozess" : "Workflow"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              {locale === "de" ? "Wie wir arbeiten" : "Our Pipeline"}
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-text/10 to-transparent w-full mt-6" />
          </div>

          {/* Alternating detailed timeline elements */}
          <div className="flex flex-col gap-24 md:gap-32 mt-12">
            {service.pipeline.map((step, idx) => {
              const media = getStepMedia(service, idx);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  id={`pipeline-step-${idx}`}
                  className="pipeline-step-card flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-between scroll-mt-28"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Step Description Content */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:order-1" : "md:order-2"}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <span 
                        className="text-7xl md:text-8xl font-black font-serif text-text/5 dark:text-transparent select-none transition-all duration-500 hover:text-accent tracking-tighter"
                        style={{ WebkitTextStroke: "1.5px var(--color-border-stroke)" }}
                      >
                        {step.step}
                      </span>
                      <div className="h-[1px] bg-gradient-to-r from-accent to-transparent w-16" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 text-white hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-base text-white/70 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Media Frame */}
                  <div className={`w-full md:w-[50%] ${isEven ? "md:order-2" : "md:order-1"}`}>
                    <div className="group relative aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_40px_color-mix(in srgb, var(--color-accent) 12%, transparent)] cursor-pointer">
                      <StepMedia src={media.src} type={media.type} />
                      
                      {/* Interactive overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MINI-GALLERY SECTION */}
      <section className="section-shell section-band hairline-top w-full py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
              {locale === "de" ? "Portfolio" : "Visual Showcase"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              {locale === "de" ? "Projektgalerie" : "Mini Gallery"}
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-text/10 to-transparent w-full mt-6" />
          </div>

          {/* Bento Grid layout with custom dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px] md:auto-rows-[300px]">
            {service.gallery.map((media, idx) => {
              let bentoClass = "";
              if (idx === 0) {
                bentoClass = "md:col-span-2 md:row-span-2 h-full";
              } else if (idx === 1) {
                bentoClass = "md:col-span-1 md:row-span-1 h-full";
              } else if (idx === 2) {
                bentoClass = "md:col-span-1 md:row-span-1 h-full";
              } else {
                bentoClass = "md:col-span-3 md:row-span-1 h-full";
              }

              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative group rounded-3xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer shadow-lg hover:border-accent hover:shadow-[0_15px_30px_color-mix(in srgb, var(--color-accent) 12%, transparent)] transition-all duration-500 ${bentoClass}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-full h-full relative overflow-hidden">
                    {media.type === "video" ? (
                      <video 
                        src={media.src}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                    ) : (
                      <img 
                        src={media.src} 
                        alt="Portfolio visual"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                    )}
                    
                    {/* Hover Visuals */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Media format pill */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <span className="text-[9px] font-bold tracking-widest text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full uppercase">
                        {media.type === "video" ? "Video" : "Render"}
                      </span>
                    </div>

                    {/* Metadata details on hover */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">
                          {locale === "de" ? "Projekt Asset" : "Project Asset"}
                        </span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {String(idx + 1).padStart(2, "0")} / 04
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OTHER SERVICES SECTION */}
      <section className="section-shell hairline-top w-full py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
              {locale === "de" ? "Entdecken" : "Explore More"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              {locale === "de" ? "Andere Dienstleistungen" : "Other Services"}
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-text/10 to-transparent w-full mt-6" />
          </div>

          <ServicesCarousel
            items={otherServiceItems}
            defaultHref={`/${locale}/services`}
            viewAllHref={`/${locale}/services`}
            viewAllLabel={locale === "de" ? "ALLE DIENSTLEISTUNGEN" : "ALL SERVICES"}
          />
        </div>
      </section>

      {/* 5. LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeMediaIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-between py-6 px-4 select-none"
            onClick={() => setActiveMediaIndex(null)}
          >
            {/* Top Info bar */}
            <div className="w-full max-w-6xl flex justify-between items-center z-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
                  {service.title}
                </span>
                <span className="text-xs font-bold text-accent uppercase tracking-wider font-mono">
                  {locale === "de" ? "Asset" : "Asset"} {activeMediaIndex + 1} / {service.gallery.length}
                </span>
              </div>

              {/* Close button */}
              <button 
                onClick={() => setActiveMediaIndex(null)}
                className="w-12 h-12 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent hover:text-black rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Visual Media Viewer */}
            <div className="relative w-full max-w-5xl flex items-center justify-center h-[65vh] my-4" onClick={(e) => e.stopPropagation()}>
              {/* Prev button */}
              <button 
                onClick={() => setActiveMediaIndex((prev) => (prev === 0 ? service.gallery.length - 1 : prev - 1))}
                className="absolute left-0 md:-left-16 w-12 h-12 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent hover:text-black rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer z-50 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Animate slides switching */}
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMediaIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-full flex items-center justify-center"
                  >
                    {service.gallery[activeMediaIndex].type === "video" ? (
                      <video 
                        src={service.gallery[activeMediaIndex].src}
                        autoPlay
                        controls
                        loop
                        playsInline
                        className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/5"
                      />
                    ) : (
                      <img 
                        src={service.gallery[activeMediaIndex].src} 
                        alt="Fullscreen gallery item"
                        className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/5"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next button */}
              <button 
                onClick={() => setActiveMediaIndex((prev) => (prev === service.gallery.length - 1 ? 0 : prev + 1))}
                className="absolute right-0 md:-right-16 w-12 h-12 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent hover:text-black rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer z-50 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slider Navigation Bar */}
            <div className="w-full max-w-xl flex flex-col items-center gap-3 z-50" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-3 justify-center items-center">
                {service.gallery.map((media, idx) => {
                  const isActive = idx === activeMediaIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`relative w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        isActive 
                          ? "border-accent shadow-[0_0_10px_color-mix(in srgb, var(--color-accent) 55%, transparent)] scale-105" 
                          : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {media.type === "video" ? (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center relative">
                          <video src={media.src} muted className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <img src={media.src} alt="" className="w-full h-full object-cover" />
                      )}
                    </button>
                  );
                })}
              </div>
              <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest hidden md:block">
                {locale === "de" ? "Pfeiltasten zur Navigation | ESC zum Schließen" : "Arrow keys to navigate | ESC to close"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. FIXED BOTTOM PROGRESS BAR */}
      <AnimatePresence>
        {isPipelineInView && (
          <motion.div
            initial={{ opacity: 0, y: 80, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 80, x: "-50%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="pipeline-progress-bar fixed bottom-6 left-1/2 z-40 w-[92%] max-w-2xl bg-surface/95 border border-[var(--color-progress-border)] backdrop-blur-xl rounded-2xl py-4 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-2.5 select-none text-text"
          >
            {/* Header info */}
            <div className="pipeline-header flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">
              <span>{locale === "de" ? "PROZESS" : "PIPELINE"}</span>
              <span className="pipeline-counter text-text font-mono font-bold tracking-wider">
                {String(activeStepIndex + 1).padStart(2, "0")} / {String(service.pipeline.length).padStart(2, "0")}
              </span>
            </div>

            {/* Filled Progress indicator (Theme-adaptive) */}
            <div className="pipeline-track relative h-1.5 w-full bg-text/15 rounded-full overflow-hidden">
              <div 
                className="pipeline-fill absolute left-0 top-0 h-full bg-text transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Step navigation dots */}
            <div className="flex justify-between items-center relative mt-1.5">
              {service.pipeline.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isCompleted = idx < activeStepIndex;
                const dotStateClass = isActive 
                  ? "pipeline-dot-active" 
                  : isCompleted 
                    ? "pipeline-dot-completed" 
                    : "pipeline-dot-future";
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const el = document.getElementById(`pipeline-step-${idx}`);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none transition-all duration-300 px-1"
                    style={{ width: `${100 / service.pipeline.length}%` }}
                  >
                    <div 
                      className={`${dotStateClass} w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                        isActive 
                          ? "bg-text border-text text-bg scale-115 shadow-[0_4px_12px_rgba(18,18,20,0.12)] dark:shadow-[0_0_12px_rgba(255,255,255,0.15)]" 
                          : isCompleted
                            ? "bg-text/20 border-text/40 text-text"
                            : "bg-bg border-[var(--color-progress-border-muted)] text-text-muted group-hover:border-text/30"
                      }`}
                    >
                      {step.step}
                    </div>
                    <span className={`pipeline-label text-[8px] mt-1.5 font-bold uppercase tracking-widest hidden sm:block text-center transition-colors duration-300 max-w-[120px] line-clamp-2 leading-tight ${
                      isActive ? "text-text font-extrabold" : "text-text-muted group-hover:text-text/60"
                    }`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
