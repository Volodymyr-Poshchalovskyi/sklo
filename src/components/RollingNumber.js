"use client";

import { useEffect, useRef, useState } from "react";

// A figure that rolls into place like an odometer the first time it scrolls
// into view: every digit is a column of 0–9 that spins down through two
// extra turns and settles on its own value, the columns a little apart.
// Non-digits ("+", " h") stay put. The real value is in the markup for
// readers, crawlers and no-JS; the columns are decoration.
//
// Motion: ease-out-quart (fast start, long settle), 1.8s, 90ms between
// digits — an illustrative, one-off entrance. Reduced motion shows the value.

const TURNS = 2;

export default function RollingNumber({ value, className = "" }) {
  const ref = useRef(null);
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.still = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRolled(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let digitIndex = 0;
  return (
    <span ref={ref} className={`rolling-number ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {value.split("").map((ch, i) => {
          if (!/\d/.test(ch)) {
            return <span key={i} className="whitespace-pre">{ch}</span>;
          }
          const d = Number(ch);
          const delay = digitIndex++ * 90;
          const steps = TURNS * 10 + d;
          return (
            <span key={i} className="rolling-digit">
              <span
                className="rolling-strip"
                style={{
                  transform: rolled ? `translateY(-${steps}em)` : "translateY(0)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {Array.from({ length: steps + 1 }, (_, n) => (
                  <span key={n}>{n % 10}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
