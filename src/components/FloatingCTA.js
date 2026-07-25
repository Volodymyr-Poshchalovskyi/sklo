"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SESSION_KEY = "sklo_pill_dismissed";
const DELAY_MS = 5000;

export default function FloatingCTA({ locale }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;

    const handleSkloScroll = () => {
      if (hasScrolledRef.current) return;

      const hero = document.querySelector("section");
      if (!hero) return;

      const heroBottom = hero.getBoundingClientRect().bottom;

      if (heroBottom < 0) {
        hasScrolledRef.current = true;
        window.removeEventListener("sklo-scroll", handleSkloScroll);
        timerRef.current = setTimeout(() => setVisible(true), DELAY_MS);
      }
    };

    window.addEventListener("sklo-scroll", handleSkloScroll);
    return () => {
      window.removeEventListener("sklo-scroll", handleSkloScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  return (
    <div
      role="complementary"
      aria-label="Special offer"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          background: "#0f0f12",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "14px",
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          minWidth: "220px",
          maxWidth: "260px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,255,0,0.06)",
          position: "relative",
        }}
      >
        {/* close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "0.55rem",
            right: "0.65rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.35)",
            padding: "2px",
            lineHeight: 1,
            transition: "color 0.2s ease",
            fontSize: "0.75rem",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          ✕
        </button>

        {/* accent label */}
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8ff00",
            fontWeight: 600,
          }}
        >
          New clients
        </span>

        {/* headline */}
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.35,
            margin: 0,
            paddingRight: "1rem",
          }}
        >
          Get <span style={{ color: "#c8ff00" }}>30% off</span> your first project
        </p>

        {/* CTA link */}
        <Link
          href={`/${locale}/contact`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "color 0.2s ease",
            marginTop: "0.1rem",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
        >
          Contact us
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
