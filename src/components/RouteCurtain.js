"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The panel that wipes away when a new page arrives.
 *
 * It is driven by `usePathname` rather than by intercepting link clicks: no
 * `preventDefault` on anchors, so middle-click, modifier-click, the mega menu
 * and the gallery's query-string filters all keep working untouched.
 *
 * The class is set in a layout effect, which runs after the new route has
 * committed but before the browser paints it — so the panel is already opaque
 * on the first frame of the new page and the reader never sees it appear.
 * A plain DOM write rather than state: this runs on every navigation and has
 * nothing to do with React's render output.
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

    // Restart the animation even when two navigations land back to back:
    // removing the class and reading a layout property forces the browser to
    // drop the finished animation before the class goes back on.
    el.classList.remove("is-lifting");
    void el.offsetWidth;
    el.classList.add("is-lifting");
  }, [pathname]);

  return <div ref={ref} className="route-curtain" aria-hidden="true" />;
}
