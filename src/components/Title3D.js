"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import useRevealOnSettle from "@/hooks/useRevealOnSettle";

// How far the extrusion is allowed to swing from its resting offset. 1 is the
// shadow exactly as the reveal leaves it, so 0.85 lets it travel down to a
// near-flat 0.15 on one side and out to 1.85 on the other.
const SWING = 0.85;

// Shared 3D section heading. `.title-3d` on its own only sets the color — the
// stacked text-shadow that makes the depth lives in the `pop3D` keyframes and
// in the `.is-settled` rule that takes over afterwards, so a heading needs
// BOTH classes to actually look 3D. Wrapping that pairing (and the
// scroll-reveal that triggers it) here keeps every section heading on the
// site identical instead of re-deriving the combination at each call site.
export default function Title3D({ as: Tag = "h2", className = "", children, ...rest }) {
  const ref = useRef(null);
  // Footer renders outside ClientWrapper, so there is no loader to wait on
  // there and the context reports `null`. Without this fallback the reveal
  // never fires and the heading stays permanently flat — `.title-3d` alone
  // carries no shadow.
  const loaderReady = useContext(LoaderContext);
  const inView = useRevealOnSettle(ref, loaderReady ?? true);
  const [settled, setSettled] = useState(false);

  // The pointer drives the shadow through two CSS variables written straight
  // to the node. Going through state would re-render the heading on every
  // mouse move for a value React never needs to know about.
  useEffect(() => {
    if (!settled) return;
    const el = ref.current;
    if (!el) return;
    // A finger has no hover position to read, and the effect is decoration, so
    // neither touch nor reduced motion gets a listener at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = null;
    const apply = (event) => {
      frame = null;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // -1 at the left/top edge, +1 at the right/bottom one.
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      el.style.setProperty("--tx", (1 + x * SWING).toFixed(3));
      el.style.setProperty("--ty", (1 + y * SWING).toFixed(3));
    };

    const onMove = (event) => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => apply(event));
    };
    const onLeave = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      el.style.removeProperty("--tx");
      el.style.removeProperty("--ty");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [settled]);

  return (
    <Tag
      ref={ref}
      // `.is-settled` only goes on once the reveal has finished, so the pop
      // plays in full before the pointer can take the shadow over.
      className={`title-3d ${inView ? "animate-pop-3d" : ""} ${
        settled ? "is-settled" : ""
      } ${className}`}
      onAnimationEnd={(event) => {
        if (event.animationName === "pop3D") setSettled(true);
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
