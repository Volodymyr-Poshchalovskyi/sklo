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

  return (
    <LoaderContext.Provider value={ready}>
      {showLoader && !ready && <Loader onComplete={() => setReady(true)} />}
      <Header t={t} locale={locale} visible={ready} />
      {children}
    </LoaderContext.Provider>
  );
}