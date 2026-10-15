"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page change, in the hero's language: the new page arrives inside a rounded
 * window framed by the page colour, and the window opens out to full bleed
 * (ease-in-out-quart — a frame already on screen changing shape), while the
 * content underneath rises a few pixels into place (ease-out-quart).
 *
 * The window is one fixed element with a huge spread shadow in the page
 * colour: the shadow is the frame, the element's inside is the hole. Scaling
 * it from 0.86 past 1 opens the hole beyond the viewport edges — transform
 * only, no layout.
 *
 * Driven by `usePathname`, not by intercepting clicks, so middle-click, the
 * mega menus and the gallery's query filters keep working untouched. Set in a
 * layout effect: after the new route commits, before the first paint, so the
 * frame is already there on the new page's first frame. The home page is
 * skipped — its hero opens its own window.
 */
export default function RouteCurtain() {
  const pathname = usePathname();
  const ref = useRef(null);
  const isFirstRoute = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (/^\/[a-z]{2}\/?$/.test(pathname)) return;

    const main = document.getElementById("main");
    // Restart even when two navigations land back to back: drop the class,
    // force a style flush, put it back.
    el.classList.remove("is-opening");
    main?.classList.remove("route-rise");
    void el.offsetWidth;
    el.classList.add("is-opening");
    main?.classList.add("route-rise");
    // animationend bubbles from every animated child; only #main's own ends it.
    const done = (e) => {
      if (e.target !== main) return;
      main.classList.remove("route-rise");
      main.removeEventListener("animationend", done);
    };
    main?.addEventListener("animationend", done);
  }, [pathname]);

  return <div ref={ref} className="route-window" aria-hidden="true" />;
}
