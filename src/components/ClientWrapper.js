"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    let lastScrollTime = Date.now();
    let snapTimeout = null;

    const handleScrollSnapVelocity = () => {
      const now = Date.now();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const dT = now - lastScrollTime;
      const dY = Math.abs(scrollTop - lastScrollTop);
      
      if (dT > 0) {
        const velocity = dY / dT; // pixels per millisecond
        
        // Threshold for fast scrolling (3.5 px/ms corresponds to 3500px/second)
        if (velocity > 3.5) {
          if (document.documentElement.style.scrollSnapType !== "none") {
            document.documentElement.style.scrollSnapType = "none";
          }
        }
      }
      
      lastScrollTop = scrollTop;
      lastScrollTime = now;
      
      // Restore scroll snapping after scrolling slows down or stops
      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        if (document.documentElement.style.scrollSnapType !== "y proximity") {
          document.documentElement.style.scrollSnapType = "y proximity";
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScrollSnapVelocity, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollSnapVelocity);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, []);

  return (
    <LoaderContext.Provider value={ready}>
      {showLoader && !ready && <Loader onComplete={() => setReady(true)} />}
      <Header t={t} locale={locale} visible={ready} />
      {children}
    </LoaderContext.Provider>
  );
}