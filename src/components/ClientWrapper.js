"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import RouteCurtain from "@/components/RouteCurtain";
import CubeCursor from "@/components/CubeCursor";
import { LoaderContext } from "@/context/LoaderContext";
import { LenisContext } from "@/context/LenisContext";

// `useLayoutEffect` warns when React renders on the server, and this one has
// nothing to do there.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// The home page is the only one with a loader, and only while its hero film
// is actually loading. HeroSection reports readiness through this event (and
// the flag, in case it fires before the listener below is attached).
export const HERO_READY_EVENT = "sklo-hero-ready";
const isHomePath = (p) => /^\/(en|de|es)\/?$/.test(p);

export default function ClientWrapper({ children, locale, t }) {
  const pathname = usePathname();
  const isHome = isHomePath(pathname);
  const [ready, setReady] = useState(!isHome);
  const [showLoader, setShowLoader] = useState(false);
  const lenisRef = useRef(null);

  // The theme lives in an attribute on <html> that the pre-hydration script in
  // layout.js writes. Switching language changes the `[locale]` segment, which
  // makes React re-render <html> with a new `lang` — and that wipes the
  // attribute, because React never knew about it. The page then fell back to
  // the dark baseline while localStorage still said light, which read as the
  // header inverting its colours. Re-assert it after every navigation, before
  // the browser paints.
  useIsomorphicLayoutEffect(() => {
    let stored = "light";
    try {
      stored = localStorage.getItem("sklo-theme") || "light";
    } catch {
      // private mode or blocked storage: the default is as good as it gets
    }
    const root = document.documentElement;
    if (root.getAttribute("data-theme") !== stored) {
      root.setAttribute("data-theme", stored);
      // Header keeps its own copy of the theme and listens for this.
      window.dispatchEvent(new Event("theme-change"));
    }
  }, [pathname]);

  // Restore the reading position a language switch left behind (see the note
  // in Header's LangDropdown). The new page is not laid out yet when this
  // runs, so it waits for the document to be tall enough rather than
  // scrolling into a page that is still empty.
  useEffect(() => {
    let saved = null;
    try {
      saved = sessionStorage.getItem("sklo-locale-scroll");
      if (saved) sessionStorage.removeItem("sklo-locale-scroll");
    } catch {
      // storage blocked — nothing to restore
    }
    if (!saved) return;

    const target = parseInt(saved, 10);
    if (!Number.isFinite(target) || target <= 0) return;

    let frame;
    let attempts = 0;
    const restore = () => {
      const reachable =
        document.documentElement.scrollHeight - window.innerHeight >= target - 2;
      if (reachable) {
        // Lenis animates by default, which would replay the scroll in front of
        // the reader instead of simply resuming where they were.
        if (lenisRef.current) lenisRef.current.scrollTo(target, { immediate: true });
        else window.scrollTo(0, target);
        return;
      }
      if (attempts++ < 90) frame = requestAnimationFrame(restore);
    };
    frame = requestAnimationFrame(restore);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

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

  // A cached film is ready within a frame or two: then nothing is shown at
  // all. Past a short grace period the logo appears and stays until the film
  // can play — for at least one full turn, so it never blinks — or until a
  // hard ceiling of two seconds: a slow film plays in behind the page.
  useEffect(() => {
    if (!isHome) return;
    const GRACE = 200, MIN_SHOW = 1600, CEILING = 2000;
    let shownAt = 0;
    let done = false;
    const timers = [];
    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      if (!shownAt) { setReady(true); return; }
      const wait = Math.max(0, MIN_SHOW - (performance.now() - shownAt));
      timers.push(setTimeout(() => setReady(true), wait));
    };
    const onReady = () => finish();
    if (window.__skloHeroReady) { finish(); return; }
    window.addEventListener(HERO_READY_EVENT, onReady);
    timers.push(setTimeout(() => { if (!done) { shownAt = performance.now(); setShowLoader(true); } }, GRACE));
    timers.push(setTimeout(finish, CEILING));
    return () => {
      window.removeEventListener(HERO_READY_EVENT, onReady);
      timers.forEach(clearTimeout);
    };
  }, [isHome]);

  // Centralized scroll listener — broadcasts a lightweight custom event
  // so child components (Header, the gallery's back-to-top) share one read
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
        {/* The first stop in the tab order: a keyboard reader lands on the
            capsule's links on every page otherwise. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-text focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bg"
        >
          {t?.header?.skipToContent ?? "Skip to content"}
        </a>
        {showLoader && !ready && <Loader onComplete={() => setReady(true)} />}
        <Header t={t} locale={locale} visible={ready} />
        <RouteCurtain />
        <CubeCursor />
        <div id="main">{children}</div>
      </LoaderContext.Provider>
    </LenisContext.Provider>
  );
}