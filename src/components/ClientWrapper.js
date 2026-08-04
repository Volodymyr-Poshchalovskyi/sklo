"use client";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PromoBanner from "@/components/PromoBanner";
import { LoaderContext } from "@/context/LoaderContext";
import { LenisContext } from "@/context/LenisContext";

export default function ClientWrapper({ children, locale, t, initialShowLoader }) {
  const [ready, setReady] = useState(!initialShowLoader);
  const [showLoader, setShowLoader] = useState(initialShowLoader);
  const lenisRef = useRef(null);

  // Lenis drives scroll via the real `window.scrollTo`, so it still fires
  // native `scroll` events — the sklo-scroll broadcaster below needs no
  // changes to pick up its motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.45,
      easing: (t) => 1 - Math.pow(1 - t, 1.5),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

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

  return (
    <LenisContext.Provider value={lenisRef}>
      <LoaderContext.Provider value={ready}>
        {showLoader && !ready && <Loader onComplete={() => setReady(true)} />}
        <Header t={t} locale={locale} visible={ready} />
        {children}
        <PromoBanner locale={locale} />
      </LoaderContext.Provider>
    </LenisContext.Provider>
  );
}