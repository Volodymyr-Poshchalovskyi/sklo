"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page change: a pane of frosted glass slides off the screen on the
 * diagonal, and the new page is sharp behind it — SKLO is "скло", glass.
 * Everything happens on a single fixed overlay; the page's own elements are
 * never touched.
 *
 * The pane starts covering the whole screen (backdrop blur, a faint tint of
 * the page colour, a lit leading edge) and travels off to the right on
 * ease-in-out-quart — a large surface already on screen moving away.
 *
 * Driven by `usePathname`, not by intercepting clicks, so middle-click, the
 * mega menus and the gallery's query filters keep working untouched. Set in a
 * layout effect: after the new route commits, before the first paint, so the
 * glass is already there on the new page's first frame. The home page is
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
    el.classList.remove("is-sliding");
    void el.offsetWidth;
    el.classList.add("is-sliding");
    // Park it again once the pane has left, so no idle backdrop-filter
    // layer stays over the page.
    const done = (e) => {
      if (e.animationName !== "routeGlassSlide") return;
      el.classList.remove("is-sliding");
      el.removeEventListener("animationend", done);
    };
    el.addEventListener("animationend", done);
    return () => el.removeEventListener("animationend", done);
  }, [pathname]);

  return (
    <div ref={ref} className="route-glass" aria-hidden="true">
      <div className="route-glass-pane" />
    </div>
  );
}
