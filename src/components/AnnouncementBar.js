"use client";
import { useState, useEffect } from "react";

// Must exactly match Header.js scroll transition values
const TOP_DEFAULT = 76; // padding 1.25rem*2 + logo 36px
const TOP_SCROLLED = 60; // padding 0.75rem*2 + logo 36px

const ACCENT = "#c8ff00";

// Enough repetitions per set so 1 set fills any viewport width
// Each segment ~220px → 9 items ≈ 2000px, well over any screen at 2x
const BASE_ITEMS = [
  [{ text: "Get " }, { text: "30% off", accent: true }, { text: " for new clients" }],
  [{ text: "First project " }, { text: "discount", accent: true }],
  [{ text: "Limited " }, { text: "time offer", accent: true }],
];

// Repeat 3 unique items 4× so one set is ~2400px → no gaps at any viewport
const ITEMS = Array.from({ length: 4 }, () => BASE_ITEMS).flat();

const Divider = () => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: "1px",
      height: "11px",
      background: "rgba(255,255,255,0.22)",
      margin: "0 2.25rem",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  />
);

const Item = ({ segments }) => (
  <span style={{ display: "inline-flex", alignItems: "center" }}>
    {segments.map((seg, i) => (
      <span
        key={i}
        style={{
          color: seg.accent ? ACCENT : "rgba(255,255,255,0.65)",
          fontWeight: seg.accent ? 600 : 400,
        }}
      >
        {seg.text}
      </span>
    ))}
  </span>
);

export default function AnnouncementBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const top = scrolled ? TOP_SCROLLED : TOP_DEFAULT;

  return (
    <div
      style={{
        position: "fixed",
        top: `${top}px`,
        left: 0,
        right: 0,
        zIndex: 49,
        height: "36px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        // Mirror header exactly: transparent → dark on scroll
        background: scrolled ? "rgba(0,0,0,0.65)" : "transparent",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "top 0.5s ease, background 0.5s ease, border-color 0.5s ease",
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {/*
        Two identical sets rendered back-to-back.
        Animation translates -50% of total width → seamless loop.
        Each set has enough items to exceed any viewport width.
      */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          animation: "marqueeScroll 40s linear infinite",
          willChange: "transform",
          flexShrink: 0,
        }}
      >
        {[0, 1].map((set) => (
          <span
            key={set}
            style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
          >
            {ITEMS.map((segments, i) => (
              <span
                key={i}
                style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
              >
                <Item segments={segments} />
                <Divider />
              </span>
            ))}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
