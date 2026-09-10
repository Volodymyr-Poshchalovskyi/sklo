"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Before/after comparison with a draggable divider.
//
// Both images are stacked at full size and the top one is revealed by a
// `clip-path` inset rather than by changing its width — clipping leaves the
// image geometry untouched, so the two halves stay in perfect register at any
// divider position. Sizing a layer instead would rescale it and the seam would
// visibly slide against the other side.
//
// Pointer Events cover mouse, pen and touch with one code path, and pointer
// capture keeps the drag alive when the cursor leaves the frame mid-gesture.
export default function BeforeAfterSlider({
  before,
  after,
  width,
  height,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}) {
  const frameRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const positionFromEvent = useCallback((clientX) => {
    const frame = frameRef.current;
    if (!frame) return null;
    const rect = frame.getBoundingClientRect();
    if (!rect.width) return null;
    const ratio = (clientX - rect.left) / rect.width;
    return Math.min(100, Math.max(0, ratio * 100));
  }, []);

  const handlePointerDown = (e) => {
    // Left button / touch / pen only.
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const next = positionFromEvent(e.clientX);
    if (next === null) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    setPosition(next);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    // Stops the browser from claiming the gesture as a page scroll on touch.
    e.preventDefault();
    const next = positionFromEvent(e.clientX);
    if (next !== null) setPosition(next);
  };

  const endDrag = (e) => {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setDragging(false);
  };

  // Keyboard support: the handle is a real slider, so arrows move it.
  const handleKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  // A drag that ends outside the window never fires pointerup on the frame.
  useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging]);

  return (
    <div
      ref={frameRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ aspectRatio: `${width} / ${height}`, touchAction: "none" }}
      className={`relative w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 select-none cursor-ew-resize ${className}`}
    >
      {/* After (revealed on the right, sits underneath) */}
      <img
        src={after}
        alt={afterLabel}
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before (clipped from the right edge inward, sits on top) */}
      <img
        src={before}
        alt={beforeLabel}
        draggable="false"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Corner labels — each fades out as the divider passes over it, so the
          label never sits on top of the side it is not describing. */}
      <span
        style={{ opacity: position > 12 ? 1 : 0 }}
        className="media-chip absolute top-3 left-3 md:top-4 md:left-4 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm rounded-full px-2.5 py-1 pointer-events-none transition-opacity duration-200"
      >
        {beforeLabel}
      </span>
      <span
        style={{ opacity: position < 88 ? 1 : 0 }}
        className="media-chip absolute top-3 right-3 md:top-4 md:right-4 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm rounded-full px-2.5 py-1 pointer-events-none transition-opacity duration-200"
      >
        {afterLabel}
      </span>

      {/* Divider */}
      <div
        style={{ left: `${position}%` }}
        className="media-divider absolute top-0 bottom-0 w-[2px] -translate-x-1/2 shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
      />

      {/* Handle. `role=slider` so it is operable and announced without sight of
          the images; it carries the keyboard focus for the whole comparison. */}
      <button
        type="button"
        role="slider"
        aria-label={`${beforeLabel} / ${afterLabel} comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% ${beforeLabel}`}
        onKeyDown={handleKeyDown}
        style={{ left: `${position}%` }}
        className="media-handle absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.45)] cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </button>
    </div>
  );
}
