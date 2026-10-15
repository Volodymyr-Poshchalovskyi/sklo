"use client";

import { useEffect, useRef } from "react";

// The studio's cursor: a small wireframe cube turning slowly in 3D — what the
// studio does, at 18px. White edges under `mix-blend-mode: difference`, so it
// inverts whatever is beneath it and reads on black, white and on a render.
//
// Motion (per the motion-design skill):
// - position follows the pointer with a short lerp — responsiveness first, a
//   trace of weight second; reduced motion follows exactly;
// - the idle spin is continuous, so it is linear;
// - hover over anything clickable grows the cube (ease-out-quart, 240ms);
// - pressing shrinks it (ease-out-quad, 120ms).
// Only on devices with a fine pointer that can hover; touch keeps nothing.
// Text fields hand back the native I-beam, and the cube steps aside.

const INTERACTIVE = "a, button, [role='button'], summary, label, select, .gallery-tile, [data-cursor='hover']";
const TEXT = "input:not([type='checkbox']):not([type='radio']):not([type='button']):not([type='submit']), textarea, [contenteditable='true']";

export default function CubeCursor() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!root || !fine.matches) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    html.classList.add("has-cube-cursor");

    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, seen = false;
    const ease = still ? 1 : 0.32;

    const frame = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        // First sighting: appear where the pointer is, not fly in from 0,0.
        x = tx; y = ty; seen = true;
      }
      root.classList.add("is-visible");
      const t = e.target instanceof Element ? e.target : null;
      root.classList.toggle("is-text", !!t?.closest(TEXT));
      root.classList.toggle("is-hover", !!t?.closest(INTERACTIVE));
      kick();
    };
    const onDown = () => root.classList.add("is-down");
    const onUp = () => root.classList.remove("is-down");
    // Leaving the window, or entering an iframe (a 360° tour), stops the
    // events; the cube fades rather than freezing at the edge.
    const onOut = (e) => { if (!e.relatedTarget) root.classList.remove("is-visible"); };
    const onBlur = () => root.classList.remove("is-visible");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", onBlur);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cube-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div ref={rootRef} className="cube-cursor" aria-hidden="true">
      <div className="cube-cursor-scale">
        <div className="cube-cursor-cube">
          <span className="f1" /><span className="f2" /><span className="f3" />
          <span className="f4" /><span className="f5" /><span className="f6" />
        </div>
      </div>
      <span className="cube-cursor-dot" />
    </div>
  );
}
