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

  return (
    <LoaderContext.Provider value={ready}>
      {showLoader && !ready && <Loader onComplete={() => setReady(true)} />}
      <Header t={t} locale={locale} visible={ready} />
      {children}
    </LoaderContext.Provider>
  );
}