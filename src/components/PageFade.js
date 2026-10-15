"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page change: the new page's content fades up from transparent, nothing
 * else moves. Only #main is touched — the header, the footer and the cursor
 * stay exactly as they are, so nothing outside the content ever blinks.
 *
 * Opacity only (no transform), so fixed children of the page — the lightbox,
 * the wizard overlay — keep positioning against the viewport.
 *
 * Driven by `usePathname`, set in a layout effect: after the new route
 * commits, before the first paint, so the content's first frame is already
 * the transparent one.
 */
export default function PageFade({ targetId = "main" }) {
  const pathname = usePathname();
  const isFirstRoute = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.getElementById(targetId);
    if (!main) return;
    main.classList.remove("page-fade");
    void main.offsetWidth;
    main.classList.add("page-fade");
    // animationend bubbles from every animated child; only #main's own ends it.
    const done = (e) => {
      if (e.target !== main) return;
      main.classList.remove("page-fade");
      main.removeEventListener("animationend", done);
    };
    main.addEventListener("animationend", done);
    return () => main.removeEventListener("animationend", done);
  }, [pathname, targetId]);

  return null;
}
