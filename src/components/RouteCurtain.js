"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page change: the new page surfaces from a soft blur while one band of light
 * crosses the screen, like light moving over glass. Everything happens on a
 * single fixed overlay — the page's own elements are never touched.
 *
 * The overlay starts with a backdrop blur and a light veil of the page colour
 * and clears (ease-out-quart, 0.9s); its ::after carries the sheen, a soft
 * diagonal band travelling left to right once (ease-in-out-cubic, 1.1s).
 *
 * Driven by `usePathname`, not by intercepting clicks, so middle-click, the
 * mega menus and the gallery's query filters keep working untouched. Set in a
 * layout effect: after the new route commits, before the first paint, so the
 * blur is already there on the new page's first frame. The home page is
 * skipped — its hero has its own arrival.
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

    // Restart even when two navigations land back to back: drop the class,
    // force a style flush, put it back.
    el.classList.remove("is-clearing");
    void el.offsetWidth;
    el.classList.add("is-clearing");
    // Park it again once the sheen has crossed, so no idle backdrop-filter
    // layer stays over the page.
    const done = (e) => {
      if (e.animationName !== "routeSheen") return;
      el.classList.remove("is-clearing");
      el.removeEventListener("animationend", done);
    };
    el.addEventListener("animationend", done);
    return () => el.removeEventListener("animationend", done);
  }, [pathname]);

  return <div ref={ref} className="route-sheen" aria-hidden="true" />;
}
