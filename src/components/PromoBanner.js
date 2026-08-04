"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DISMISS_COOKIE = "sklo_promo_dismissed_until";
const DISMISS_DAYS = 3;

function isDismissed() {
  const match = document.cookie.match(/(?:^|; )sklo_promo_dismissed_until=([^;]*)/);
  if (!match) return false;
  const until = parseInt(decodeURIComponent(match[1]), 10);
  return Number.isFinite(until) && Date.now() < until;
}

export default function PromoBanner({ locale }) {
  const pathname = usePathname();
  const isHome = /^\/(en|de)\/?$/.test(pathname || "");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let observer;
    let timer;

    // Deferred a tick so the state updates below run from a callback rather
    // than synchronously in the effect body.
    const setupId = setTimeout(() => {
      if (cancelled || isDismissed()) return;
      setDismissed(false);

      if (!isHome) {
        // Other pages have no hero to clear — a short beat so it doesn't
        // flash in on first paint is enough.
        timer = setTimeout(() => setVisible(true), 1500);
        return;
      }

      // Homepage: hold off until the hero has scrolled out of view, so it
      // doesn't compete with the hero for attention.
      const hero = document.querySelector(".hero-section");
      if (!hero) {
        setVisible(true);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0 }
      );
      observer.observe(hero);
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(setupId);
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isHome, pathname]);

  const dismiss = () => {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    document.cookie = `${DISMISS_COOKIE}=${until}; path=/; max-age=${DISMISS_DAYS * 24 * 60 * 60}`;
    setVisible(false);
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40 max-w-[calc(100%-2rem)] sm:max-w-sm transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3 border border-white/15 bg-surface-2/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] px-4 py-3.5">
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
          <span className="text-accent font-semibold">
            {locale === "de" ? "30% Rabatt" : "30% off"}
          </span>{" "}
          {locale === "de"
            ? "für Neukunden auf das erste Projekt —"
            : "for new clients on their first project —"}{" "}
          <Link
            href={`/${locale}/contact`}
            className="underline underline-offset-2 hover:text-white transition-colors duration-300"
          >
            {locale === "de" ? "kontaktieren" : "get in touch"}
          </Link>
        </p>
        <button
          onClick={dismiss}
          aria-label={locale === "de" ? "Schließen" : "Dismiss"}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors duration-300 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
