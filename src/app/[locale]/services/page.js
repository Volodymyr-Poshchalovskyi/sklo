"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { useLenis } from "@/context/LenisContext";

function ServiceMedia({ service }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
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
  }, []);

  if (service.type === "video") {
    return (
      <video
        ref={videoRef}
        src={service.src}
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
      src={service.src}
      alt={service.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
    />
  );
}

export default function ServicesPage({ params }) {
  const { locale } = React.use(params);
  const lenisRef = useLenis();
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Plain contiguous sticky hand-off reads as "the next section replaced the
  // last one," not "cards piling up" — the depth cue that actually sells a
  // stack is the outgoing card visibly shrinking/dimming as the next one
  // arrives on top of it. Driven straight off scroll position (no easing of
  // its own) so it stays perfectly in sync with the sticky hand-off itself.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let frame = null;

    const update = () => {
      frame = null;
      if (!mq.matches) {
        cardRefs.current.forEach((card) => {
          if (card) {
            card.style.transform = "";
            card.style.filter = "";
          }
        });
        return;
      }
      const topOffset =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
          10
        ) || 84;
      const vh = window.innerHeight;
      const start = vh;
      const end = topOffset + 24;
      // A same-size card sliding fully over the one before it hides that
      // card completely the instant it arrives — there's nothing left to
      // read as "stacked". So the incoming card also grows in from a touch
      // smaller than full size, which leaves the (shrinking, dimming)
      // outgoing card visible in a thin ring around it while the two overlap.
      for (let i = 0; i < cardRefs.current.length - 1; i++) {
        const outgoing = cardRefs.current[i];
        const incoming = cardRefs.current[i + 1];
        const nextSection = sectionRefs.current[i + 1];
        if (!nextSection) continue;
        const nextTop = nextSection.getBoundingClientRect().top;
        let progress = (start - nextTop) / (start - end);
        progress = Math.min(1, Math.max(0, progress));
        if (outgoing) {
          outgoing.style.transform = `scale(${1 - progress * 0.08}) translateY(${-progress * 20}px)`;
          outgoing.style.filter = `brightness(${1 - progress * 0.4})`;
        }
        if (incoming) {
          incoming.style.transform = `scale(${0.94 + progress * 0.06})`;
        }
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const jumpToService = (index) => {
    const el = document.getElementById(`service-${index}`);
    if (!el) return;
    // Land exactly where the sticky card already comes to rest (`top: header
    // + 1.5rem`), computed as a plain number rather than handing Lenis the
    // element itself — passed an element, Lenis also auto-subtracts the
    // section's own `scroll-mt` *and* html's `scroll-padding-top`, so an
    // extra manual offset on top of those under-scrolled and left the card
    // needing a bit more scroll by hand to actually settle into place.
    const headerH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
        10
      ) || 84;
    const stickyTop = headerH + 24;
    const targetY = el.getBoundingClientRect().top + window.scrollY - stickyTop;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Back-to-top button — appears once the 2nd card has reached the top of
  // the viewport, i.e. once the "All Services" overview has scrolled out of
  // reach and jumping back up by hand would take a while.
  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const target = sectionRefs.current[1];
      if (!target) return;
      setShowScrollTop(target.getBoundingClientRect().top <= 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28">
      {/* Overview — every service listed and clickable up front, so nobody
          has to scroll the whole stack to find the one they want. */}
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col gap-4 mb-10 max-w-2xl">
          <span className="eyebrow">
            {locale === "de" ? "Unser Angebot" : "What we offer"}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
            {locale === "de" ? "Alle Dienstleistungen" : "All Services"}
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            {locale === "de"
              ? "Direkt zur gewünschten Leistung springen."
              : "Jump straight to the service you're after."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {servicesData.map((service, index) => (
            <button
              key={service.slug}
              onClick={() => jumpToService(index)}
              className="group flex items-center justify-between gap-4 border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl px-5 py-4 text-left transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[11px] text-white/30 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase truncate">
                  {service.title}
                </span>
              </span>
              <svg
                className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      {/* Stacked cards — each one is `position: sticky` at the same offset
          below the header, with a rising z-index, so as you scroll the next
          card gradually slides up over the one before it. Native scroll does
          all the animation work here; below `lg` there isn't enough width
          for the effect to read, so cards fall back to a plain stacked list. */}
      <div className="relative w-full bg-bg">
        {servicesData.map((service, index) => (
          <section
            key={service.slug}
            id={`service-${index}`}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className="relative w-full lg:h-[100svh] scroll-mt-[84px] px-6 md:px-16 lg:px-28 xl:px-40 py-4 lg:py-0"
          >
            <div
              ref={(el) => { cardRefs.current[index] = el; }}
              className="lg:sticky border border-white/15 bg-surface-2 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl lg:shadow-[0_30px_60px_rgba(0,0,0,0.5)] lg:h-[78vh]"
              style={{
                top: "calc(var(--header-h) + 1.5rem)",
                zIndex: index + 1,
              }}
            >
              {/* Text block */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center lg:justify-start lg:pt-16 shrink-0">
                <span className="eyebrow mb-5">
                  {locale === "de" ? "Leistung" : "Service"} {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-6 text-white leading-tight">
                  {service.title}
                </h2>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
                  {service.desc}
                </p>

                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group inline-flex items-center gap-2.5 text-xs md:text-sm font-semibold tracking-widest uppercase border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-full transition-all duration-300 w-fit cursor-pointer"
                >
                  {locale === "de" ? "Mehr erfahren" : "Learn more"}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Media block */}
              <div className="w-full md:w-1/2 h-[45vh] md:h-auto relative overflow-hidden bg-white/5 border-t md:border-t-0 md:border-l border-white/5 shrink-0 group">
                <ServiceMedia service={service} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <button
        onClick={scrollToTop}
        aria-label={locale === "de" ? "Nach oben scrollen" : "Scroll to top"}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 bg-surface-2/90 backdrop-blur-xl hover:border-white/30 hover:bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center justify-center text-white transition-all duration-300 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </main>
  );
}
