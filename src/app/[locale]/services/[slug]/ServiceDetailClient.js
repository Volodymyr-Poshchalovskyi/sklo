"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ServicesCarousel from "@/components/ServicesCarousel";
import Title3D from "@/components/Title3D";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { miniGalleryFor, SERVICE_GALLERY, virtualStagingPairs, servicePosterFor } from "@/data/galleryData";
import { useLenis } from "@/context/LenisContext";

// Helper component to render step media dynamically
function StepMedia({ src, type, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;
    const el = videoRef.current;

    if (isActive) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [type, isActive]);

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
      loading="eager"
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
    />
  );
}

const pipelineStepVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
  center: { opacity: 1, y: 0 },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -20 : 20 }),
};

// Function to return distinct high quality media for each of the 4 pipeline steps
const getStepMedia = (service, index) => {
  if (index === 0) {
    // Step 1: 3D Floorplan / Blueprint
    return { src: "/assets/home/3dplan_interior.jpg", type: "image" };
  }
  if (index === 1) {
    // Step 2: Camera Angles & Interior Setup
    return { src: "/assets/home/3d tour.jpg", type: "image" };
  }
  if (index === 2) {
    // Step 3: Shading & Motion Cinemagraph Loop
    return { src: "/assets/home/cinemagraph services.mp4", type: "video" };
  }
  // Step 4: Final High-End Visualization
  return { src: service.src || "/assets/heroImage.jpg", type: service.type || "image" };
};

// Only these two services have a detailed enough workflow to justify the
// pinned pipeline section — every other service page skips straight from
// the hero to the mini gallery.
const PIPELINE_SERVICE_SLUGS = ["exterior-visualization", "interior-visualization"];

export default function ServiceDetailClient({ service, otherServices, locale }) {
  const hasPipeline = PIPELINE_SERVICE_SLUGS.includes(service.slug);

  // The mini gallery is fed from the real gallery archive rather than from the
  // handful of placeholders in servicesData, so a service page shows its own
  // strongest work and stays in sync with the big gallery.
  const galleryLink = SERVICE_GALLERY[service.slug];
  const miniItems = miniGalleryFor(service.slug);
  // Virtual Staging only makes sense as before/after comparisons, matching how
  // the big gallery presents it.
  const isStagingService = service.slug === "virtual-staging";
  const hasMiniGallery = isStagingService || miniItems.length > 0;

  // Same poster map as the header menu and the homepage carousel, so a service
  // is advertised with one consistent image everywhere.
  const otherServiceItems = otherServices.map((other) => {
    const poster = servicePosterFor(other.slug) || { src: other.src, type: other.type };
    return {
      id: other.slug,
      title: other.title,
      image: poster.type === "video" ? undefined : poster.src,
      video: poster.type === "video" ? poster.src : undefined,
      href: `/${locale}/services/${other.slug}`,
    };
  });

  const [activeMediaIndex, setActiveMediaIndex] = useState(null);
  const [isPipelineInView, setIsPipelineInView] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [stepDirection, setStepDirection] = useState(1);
  const pipelineRef = useRef(null);
  const progressFillRef = useRef(null);
  const prevStepRef = useRef(0);
  const prevInViewRef = useRef(false);
  const lenisRef = useLenis();

  // Lightbox keyboard navigation
  useEffect(() => {
    if (activeMediaIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveMediaIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveMediaIndex((prev) => (prev === 0 ? miniItems.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveMediaIndex((prev) => (prev === miniItems.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaIndex, miniItems.length]);

  // Helper to scroll smoothly to a specific step in the pinned section
  const scrollToStep = (idx) => {
    setStepDirection(idx > prevStepRef.current ? 1 : -1);
    setActiveStepIndex(idx);
    prevStepRef.current = idx;
    const pipelineEl = pipelineRef.current;
    if (!pipelineEl) return;

    const rect = pipelineEl.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const maxScroll = rect.height - window.innerHeight;
    const totalSteps = service.pipeline.length;
    
    if (maxScroll <= 0) return;

    // Target center of step's slice
    const targetOffset = containerTop + ((idx + 0.45) / totalSteps) * maxScroll;
    
    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${(idx + 1) / totalSteps})`;
    }
    
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(targetOffset, { duration: 0.6 });
    } else {
      window.scrollTo({ top: targetOffset, behavior: "smooth" });
    }
  };

  // Scroll Progress Tracking for Pinned Pipeline Section — piggybacks on the
  // app-wide `sklo-scroll` broadcast (see ClientWrapper) instead of adding
  // another raw scroll listener.
  useEffect(() => {
    const pipelineEl = pipelineRef.current;
    if (!pipelineEl) return;

    const totalSteps = service.pipeline.length;

    const handleScroll = () => {
      const rect = pipelineEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if pipeline is in view (only update React state on boolean change)
      const inView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      if (inView !== prevInViewRef.current) {
        prevInViewRef.current = inView;
        setIsPipelineInView(inView);
      }

      const maxScroll = rect.height - windowHeight;
      if (maxScroll <= 0) return;

      // Calculate pinned progress from 0.0 to 1.0
      const currentScroll = Math.max(0, Math.min(maxScroll, -rect.top));
      const progress = currentScroll / maxScroll;

      // Direct GPU transform update on DOM (0 React re-renders for butter smooth 120fps)
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      // Map progress to step index and ONLY trigger React re-render when index changes
      const stepIndex = Math.min(totalSteps - 1, Math.max(0, Math.floor(progress * totalSteps)));
      if (stepIndex !== prevStepRef.current) {
        setStepDirection(stepIndex > prevStepRef.current ? 1 : -1);
        prevStepRef.current = stepIndex;
        setActiveStepIndex(stepIndex);
      }
    };

    window.addEventListener("sklo-scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("sklo-scroll", handleScroll);
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
        @keyframes serviceHeroScrollCue {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(5px); opacity: 1; }
        }
        .service-hero-scroll-cue {
          animation: serviceHeroScrollCue 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-hero-scroll-cue { animation: none; }
        }
      `}} />

      {/* 1. HERO HEADER SECTION */}
      {/* `main` carries pt-16, so subtract it — otherwise a full 100vh hero
          overflows the first screen by 64px. `svh` rather than `vh` so mobile
          browser chrome doesn't make it overshoot either. */}
      <section className="hero-section relative w-full h-[calc(100svh-4rem)] flex items-center justify-center overflow-hidden">
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

        {/* Scroll cue — the hero now fills the screen, so this is the only
            thing telling the reader there is more below it. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/60">
            {locale === "de" ? "Scrollen" : "Scroll"}
          </span>
          <svg
            className="w-4 h-4 text-white/60 service-hero-scroll-cue"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 13l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* 2. PINNED SCROLL PIPELINE SECTION — exterior/interior visualization only */}
      {hasPipeline && (
      <section
        ref={pipelineRef}
        className="section-shell hairline-top w-full relative"
        style={{ height: `${service.pipeline.length * 95}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-28 xl:px-40 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative z-10 w-full flex flex-col gap-6 md:gap-10">
            {/* Section Header */}
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
                {locale === "de" ? "Prozess" : "Workflow"}
              </span>
              <div className="flex justify-between items-end">
                <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                  {locale === "de" ? "Wie wir arbeiten" : "Our Pipeline"}
                </Title3D>
                <div className="hidden sm:flex items-center gap-2 font-mono text-sm text-white/50">
                  <span className="text-accent font-bold text-lg">{String(activeStepIndex + 1).padStart(2, "0")}</span>
                  <span>/</span>
                  <span>{String(service.pipeline.length).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="h-[1px] bg-gradient-to-r from-white/15 via-white/5 to-transparent w-full mt-4" />
            </div>

            {/* Single Pinned Stage Card: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
              {/* Left Column: Step Description — clean unmount/mount swap, no overlap */}
              <div className="flex flex-col justify-center min-h-[240px] relative" style={{ perspective: 800 }}>
                <AnimatePresence mode="wait" custom={stepDirection}>
                  <motion.div
                    key={activeStepIndex}
                    custom={stepDirection}
                    variants={pipelineStepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="text-6xl sm:text-7xl md:text-8xl font-black font-serif text-transparent select-none tracking-tighter"
                        style={{ WebkitTextStroke: "1.5px var(--color-border-stroke)" }}
                      >
                        {service.pipeline[activeStepIndex].step}
                      </span>
                      <div className="h-[1px] bg-gradient-to-r from-accent to-transparent w-16" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mb-4 text-white leading-snug">
                      {service.pipeline[activeStepIndex].title}
                    </h3>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light max-w-xl">
                      {service.pipeline[activeStepIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Media container with smooth crossfades */}
              <div className="w-full">
                <div className="group relative aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_40px_color-mix(in srgb,var(--color-accent)_12%,transparent)]">
                  {service.pipeline.map((step, idx) => {
                    const media = getStepMedia(service, idx);
                    const isActive = idx === activeStepIndex;

                    return (
                      <div
                        key={idx}
                        className="absolute inset-0"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "scale(1)" : "scale(1.05)",
                          transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
                          pointerEvents: isActive ? "auto" : "none",
                          zIndex: isActive ? 10 : 0,
                        }}
                      >
                        <StepMedia src={media.src} type={media.type} isActive={isActive} />
                        
                        {/* Subtle gradient vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                        
                        {/* Step badge overlay */}
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold text-accent pointer-events-none">
                          {step.step} / {String(service.pipeline.length).padStart(2, "0")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 3. MINI-GALLERY SECTION — real archive work, aspect ratios intact */}
      {hasMiniGallery && (
      <section className="section-shell section-band hairline-top w-full py-24 px-6 md:px-16 lg:px-28 xl:px-40 overflow-hidden">
        <div className="w-full">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
              {locale === "de" ? "Portfolio" : "Visual Showcase"}
            </span>
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              {locale === "de" ? "Projektgalerie" : "Selected Work"}
            </Title3D>
            <div className="h-[1px] bg-gradient-to-r from-text/10 to-transparent w-full mt-6" />
          </div>

          {isStagingService ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {virtualStagingPairs.map((pair) => (
                <div key={pair.id} className="flex flex-col gap-3">
                  <BeforeAfterSlider
                    before={pair.before}
                    after={pair.after}
                    width={pair.width}
                    height={pair.height}
                  />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      {pair.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      {locale === "de" ? "Ziehen zum Vergleichen" : "Drag to compare"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Same rule as the big gallery: the tile takes the media's own
               aspect ratio, so nothing is cropped. Columns are CSS multi-column
               here because this list is short enough that filling one column
               before the next does not bury anything. */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {miniItems.map((media, idx) => (
                <div
                  key={media.id}
                  onClick={() => setActiveMediaIndex(idx)}
                  style={{ aspectRatio: `${media.width} / ${media.height}` }}
                  className="relative group mb-6 break-inside-avoid rounded-2xl border border-white/10 hover:border-white/30 bg-white/5 overflow-hidden cursor-pointer transition-colors duration-300"
                >
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={media.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="media-caption absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/75 via-black/10 to-transparent">
                    <span className="text-[10px] font-mono uppercase tracking-widest">
                      {String(idx + 1).padStart(2, "0")} / {String(miniItems.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Route into the big gallery with this category already selected. */}
          {galleryLink && (
            <div className="mt-14 flex justify-center">
              <Link
                href={`/${locale}/gallery?filter=${galleryLink.slug}`}
                className="group inline-flex items-center gap-3 border border-white/20 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white/90 hover:text-white transition-all duration-300"
              >
                {locale === "de"
                  ? "Alle Arbeiten ansehen"
                  : `Check all ${galleryLink.cta}`}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
      )}

      {/* 4. OTHER SERVICES SECTION */}
      <section className="section-shell hairline-top w-full py-24 px-6 md:px-16 lg:px-28 xl:px-40 overflow-hidden">
        <div className="w-full">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
              {locale === "de" ? "Entdecken" : "Explore More"}
            </span>
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              {locale === "de" ? "Andere Dienstleistungen" : "Other Services"}
            </Title3D>
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
            {/* Top info bar. Full width, not `max-w-6xl`: capping it dragged
                the close button inward from the corner — on a wide screen it
                ended up nearer the middle of the overlay than the edge, which
                is not where anyone reaches for a close button. */}
            <div className="w-full flex justify-between items-center gap-4 px-2 md:px-4 z-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
                  {service.title}
                </span>
                <span className="text-xs font-bold text-accent uppercase tracking-wider font-mono">
                  {locale === "de" ? "Asset" : "Asset"} {activeMediaIndex + 1} / {miniItems.length}
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
            <div className="relative w-full max-w-[min(1800px,92vw)] flex items-center justify-center h-[78vh] my-4" onClick={(e) => e.stopPropagation()}>
              {/* Prev button */}
              <button 
                onClick={() => setActiveMediaIndex((prev) => (prev === 0 ? miniItems.length - 1 : prev - 1))}
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
                    {miniItems[activeMediaIndex].type === "video" ? (
                      <video 
                        src={miniItems[activeMediaIndex].src}
                        autoPlay
                        controls
                        loop
                        playsInline
                        className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/5"
                      />
                    ) : (
                      <img 
                        src={miniItems[activeMediaIndex].src} 
                        alt="Fullscreen gallery item"
                        className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/5"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next button */}
              <button 
                onClick={() => setActiveMediaIndex((prev) => (prev === miniItems.length - 1 ? 0 : prev + 1))}
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
                {miniItems.map((media, idx) => {
                  const isActive = idx === activeMediaIndex;
                  return (
                    <button
                      key={media.id}
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
        {hasPipeline && isPipelineInView && (
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

            {/* Filled Progress indicator (GPU scaleX for 120fps with 0 re-renders) */}
            <div className="pipeline-track relative h-1.5 w-full bg-text/15 rounded-full overflow-hidden">
              <div 
                ref={progressFillRef}
                className="pipeline-fill absolute left-0 top-0 h-full w-full bg-text origin-left will-change-transform"
                style={{ transform: `scaleX(${activeStepIndex / (service.pipeline.length - 1)})` }}
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
                    onClick={() => scrollToStep(idx)}
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
