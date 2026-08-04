"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { LoaderContext } from "@/context/LoaderContext";

export default function ClientWrapper({ children, locale, t, initialShowLoader }) {
  const [ready, setReady] = useState(!initialShowLoader);
  const [showLoader, setShowLoader] = useState(initialShowLoader);

  useEffect(() => {
    if (initialShowLoader) {
      const today = new Date().toDateString();
      document.cookie = `sklo_last_load=${today}; path=/; max-age=86400`;
    }
  }, [initialShowLoader]);

  // Centralized scroll listener — broadcasts a lightweight custom event
  // so child components (Header, AnnouncementBar) share one scroll read
  // instead of each attaching their own listener.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Broadcast a single, cached scrollY value to all listeners
        window.dispatchEvent(
          new CustomEvent("sklo-scroll", { detail: { scrollY } })
        );
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once on mount so children get initial state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Snap guard — a `.snap-section` is only allowed to be a scroll-snap target
  // while it fits inside the viewport. A taller section under `y proximity`
  // snapping gets yanked back the moment you scroll into it, so those opt out
  // via data-snap="off" (see globals.css). Re-measured on resize and whenever a
  // section's own height changes (FAQ accordions, carousel, font loading).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".snap-section"));
    if (!sections.length) return;

    // A little slack so a section that lands a few px over still snaps.
    const SLACK = 24;

    const measure = () => {
      const limit = window.innerHeight + SLACK;
      sections.forEach((el) => {
        el.dataset.snap = el.offsetHeight > limit ? "off" : "on";
      });
    };

    let frame = null;
    const scheduleMeasure = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        measure();
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    sections.forEach((el) => resizeObserver.observe(el));
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [children]);

  return (
    <LoaderContext.Provider value={ready}>
      {showLoader && !ready && <Loader onComplete={() => setReady(true)} />}
      <Header t={t} locale={locale} visible={ready} />
      {children}
    </LoaderContext.Provider>
  );
}