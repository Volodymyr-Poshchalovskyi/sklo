"use client";

import { useEffect, useRef } from "react";

// A trailing disc, after graffio.co: a 24px white circle under
// `mix-blend-mode: difference` (so it inverts whatever it crosses — dark,
// light or a render) that follows the system pointer with weight. Moving, it
// stretches along its direction of travel like a drop; over a button it
// snaps to the button's centre, doubles, and leans towards the pointer,
// while the button itself drifts towards the pointer on a spring (the
// "magnetic" part). The system cursor stays: the disc is company, not a
// replacement.
//
// Desktop widths with a fine pointer only. Reduced motion: no trail, no
// stretch, no magnet — the disc just sits on the pointer.

// What counts as a button for the snap and the magnet.
const MAGNETIC = [
  "[data-magnetic]",
  ".header-cta",
  ".hero-cta-primary",
  ".hero-cta-secondary",
  ".carousel-arrow",
  "header nav a",
  "header .hidden.md\\:flex > a",
  "header button",
].join(", ");

const lerp = (a, b, t) => a + (b - a) * t;

export default function Cursor() {
  const discRef = useRef(null);

  useEffect(() => {
    const disc = discRef.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!disc || !fine || window.innerWidth < 768) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-cursor-disc");

    const pos = { x: -100, y: -100 };
    const prev = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let scale = 1, scaleTarget = 1, sx = 1, sy = 1, rot = 0;
    let hoverEl = null, hoverSx = 2, hoverSy = 2, seen = false, raf = 0;

    // Magnetic buttons: each drifts towards the pointer by 12% of the offset,
    // on a spring (stiffness 160, damping 9, mass 1), via the `translate`
    // property so it composes with any transform the button already has.
    const springs = new Map();
    const springFor = (el) => {
      let s = springs.get(el);
      if (!s) { s = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 }; springs.set(el, s); }
      return s;
    };

    const tick = () => {
      // Disc position and size.
      pos.x = lerp(pos.x, target.x, still ? 1 : 0.1);
      pos.y = lerp(pos.y, target.y, still ? 1 : 0.1);
      scale = lerp(scale, scaleTarget, 0.1);
      const dx = pos.x - prev.x, dy = pos.y - prev.y;
      prev.x = pos.x; prev.y = pos.y;
      if (hoverEl) {
        sx = lerp(sx, hoverSx, 0.18);
        sy = lerp(sy, hoverSy, 0.18);
      } else if (!still) {
        const speed = Math.sqrt(dx * dx + dy * dy) * 0.04;
        rot = Math.atan2(dy, dx) * (180 / Math.PI);
        sx = scale + Math.min(speed, 1);
        sy = scale - Math.min(speed, 0.3);
      } else {
        sx = sy = scale;
      }
      disc.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) rotate(${rot}deg) scale(${sx}, ${sy})`;

      // Magnet springs (semi-implicit Euler at 60fps).
      const dt = 1 / 60;
      springs.forEach((s, el) => {
        const ax = (160 * (s.tx - s.x) - 9 * s.vx);
        const ay = (160 * (s.ty - s.y) - 9 * s.vy);
        s.vx += ax * dt; s.vy += ay * dt;
        s.x += s.vx * dt; s.y += s.vy * dt;
        el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
        if (Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.vx) + Math.abs(s.vy) < 0.01 && s.tx === 0 && s.ty === 0) {
          el.style.translate = "";
          springs.delete(el);
        }
      });
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!seen) {
        pos.x = prev.x = e.clientX; pos.y = prev.y = e.clientY; seen = true;
      }
      disc.classList.add("is-visible");
      const t = e.target instanceof Element ? e.target : null;
      const el = still ? null : t?.closest(MAGNETIC) ?? null;
      if (hoverEl && hoverEl !== el) springFor(hoverEl).tx = springFor(hoverEl).ty = 0;
      hoverEl = el;
      if (el) {
        const r = el.getBoundingClientRect();
        // The element's resting centre, without the magnet's own offset.
        const s = springFor(el);
        const cx = r.left + r.width / 2 - s.x, cy = r.top + r.height / 2 - s.y;
        const ox = e.clientX - cx, oy = e.clientY - cy;
        target.x = cx + ox * 0.15;
        target.y = cy + oy * 0.15;
        scaleTarget = 2;
        rot = Math.atan2(oy, ox) * (180 / Math.PI);
        const d = Math.sqrt(ox * ox + oy * oy) * 0.01;
        hoverSx = 2 + Math.min(d, 0.6) ** 3 * 3;
        hoverSy = 2 - Math.min(d, 0.3) ** 3 * 3;
        s.tx = ox * 0.12;
        s.ty = oy * 0.12;
      } else {
        target.x = e.clientX;
        target.y = e.clientY;
        scaleTarget = 1;
      }
    };
    // Leaving the window, or entering an iframe (a 360° tour), stops the
    // events; the disc fades rather than freezing at the edge.
    const onOut = (e) => { if (!e.relatedTarget) disc.classList.remove("is-visible"); };
    const onBlur = () => disc.classList.remove("is-visible");

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", onBlur);
    return () => {
      cancelAnimationFrame(raf);
      springs.forEach((_, el) => { el.style.translate = ""; });
      document.documentElement.classList.remove("has-cursor-disc");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return <div ref={discRef} className="cursor-disc" aria-hidden="true" />;
}
