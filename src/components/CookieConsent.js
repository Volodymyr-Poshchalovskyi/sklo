"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Microsoft Clarity sets cookies and records sessions, so it waits for an
// explicit yes (revDSG / GDPR, and what the privacy page promises). The
// choice lives in localStorage; the footer's "Cookie settings" reopens the
// banner through OPEN_EVENT. Clarity itself loads only on the production
// host, so dev never pollutes the recordings; dev still shows the banner so
// it can be styled, previews show nothing.
const CLARITY_ID = "ywnbrtb0gq";
const STORAGE_KEY = "sklo-consent";
const PRODUCTION_HOST = "sklo.studio";
export const OPEN_EVENT = "sklo-consent-open";

function readChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // storage blocked — the choice holds for this page view only
  }
}

const isProduction = () => window.location.hostname === PRODUCTION_HOST;

function loadClarity() {
  if (!isProduction()) return;
  if (window.clarity?.loaded) {
    window.clarity("consent");
    return;
  }
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  window.clarity("consent");
  window.clarity.loaded = true;
}

export default function CookieConsent({ locale, t }) {
  const c = t?.consent ?? {};
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isProduction() && process.env.NODE_ENV !== "development") return;
    const choice = readChoice();
    if (choice === "granted") loadClarity();
    // Deferred a frame so the banner never competes with the first paint.
    else if (choice !== "denied") requestAnimationFrame(() => setOpen(true));

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const accept = () => {
    writeChoice("granted");
    loadClarity();
    setOpen(false);
  };
  const decline = () => {
    writeChoice("denied");
    // Withdrawing after an earlier yes: Clarity erases its cookies itself.
    if (window.clarity?.loaded) window.clarity("consent", false);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.title}
      className="fixed z-[90] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[400px] rounded-2xl border border-text/10 bg-surface text-text shadow-2xl p-5"
    >
      <p className="text-sm font-semibold mb-1.5">{c.title}</p>
      <p className="text-[13px] leading-relaxed text-text/70 mb-4">
        {c.text}{" "}
        <Link href={`/${locale}/privacy`} className="underline underline-offset-2 hover:text-text">
          {c.more}
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="flex-1 rounded-full bg-text text-bg text-[13px] font-semibold py-2.5 hover:opacity-90 transition-opacity"
        >
          {c.accept}
        </button>
        <button
          type="button"
          onClick={decline}
          className="flex-1 rounded-full border border-text/20 text-text text-[13px] font-semibold py-2.5 hover:bg-text/5 transition-colors"
        >
          {c.decline}
        </button>
      </div>
    </div>
  );
}
