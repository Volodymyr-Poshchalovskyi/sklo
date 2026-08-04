"use client";
import { useEffect, useRef, useState } from "react";

function isInViewport(el, thresholdRatio) {
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return false;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, vh);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return visibleHeight / rect.height >= thresholdRatio;
}

// Fires the reveal once the target is in view *and* scrolling has actually
// stopped — playing it mid-scroll buries the animation under the user's own
// scroll motion, so it barely registers. Waiting for scroll to settle makes
// it the only thing moving on screen, which is what makes it noticeable.
//
// Deliberately not IntersectionObserver-driven: IO's callback is async and
// browser-batched, so a fast scroll straight through the target can leave a
// stale "was intersecting" report sitting around after the target is long
// gone. A plain getBoundingClientRect() read at the moment scroll settles
// has no such lag — it's always the true position right then.
export default function useRevealOnSettle(ref, ready, { threshold = 0.15, idleMs = 200 } = {}) {
  const [inView, setInView] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;

    let idleTimer;
    const tryReveal = () => {
      if (playedRef.current) return;
      if (isInViewport(el, threshold)) {
        playedRef.current = true;
        setInView(true);
      }
    };

    // Covers the case where the target is already in view and the page is
    // already at rest — no scroll event will ever fire to trigger a check.
    idleTimer = setTimeout(tryReveal, idleMs);

    const onScroll = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(tryReveal, idleMs);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, [ready, ref, threshold, idleMs]);

  return inView;
}
