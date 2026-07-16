"use client";
import { useEffect, useRef, useContext } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import Link from "next/link";

export default function HeroSection({ t, locale }) {
  const ready = useContext(LoaderContext);
  const headRef = useRef(null);
  const btnsRef = useRef(null);

  // SKLO letter refs
  const sRef = useRef(null);
  const kRef = useRef(null);
  const lRef = useRef(null);
  const oRef = useRef(null);
  const studioRefs = useRef([]);

  // Heading + buttons fade-in
  useEffect(() => {
    if (!ready) return;
    const els = [headRef.current, btnsRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, [ready]);

  // SKLO spring animation
  useEffect(() => {
    if (!ready) return;

    const DUR = 750;  // each letter duration ms
    const GAP = 390;  // ms between letter starts (overlap = DUR - GAP)

    const skloConfig = [
      { ref: sRef, anim: "skloTop" },
      { ref: kRef, anim: "skloRight" },
      { ref: lRef, anim: "skloLeft" },
      { ref: oRef, anim: "skloBottom" },
    ];

    const timeouts = [];

    skloConfig.forEach(({ ref, anim }, i) => {
      const t = setTimeout(() => {
        if (ref.current) {
          ref.current.style.animation = `${anim} ${DUR}ms ease-out both`;
        }
      }, i * GAP);
      timeouts.push(t);
    });

    // studio starts after all SKLO finishes
    const skloEnd = (skloConfig.length - 1) * GAP + DUR;
    const STUDIO_DUR = 480;
    const STUDIO_GAP = 170; // ms between each studio letter

    studioRefs.current.forEach((el, i) => {
      const t = setTimeout(() => {
        if (el) {
          el.style.animation = `skloBottom ${STUDIO_DUR}ms ease-out both`;
        }
      }, skloEnd + 100 + i * STUDIO_GAP);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [ready]);

  const hidden = { opacity: 0, transform: "translateY(28px)" };

  return (
    <section className="relative min-h-screen flex items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: "none" }}
      >
        <source src="/assets/home/hero_video.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl px-10 pt-24 pb-16">
        <div className="flex flex-col items-start justify-center max-w-4xl">
          <h1
            ref={headRef}
            style={hidden}
            className="font-bold leading-[1.05] tracking-tight text-white mb-10"
          >
            <span className="block text-4xl sm:text-6xl md:text-7xl xl:text-8xl sm:whitespace-nowrap">
              Visualization <span className="text-white/90 font-bold">services</span>
            </span>
            <span className="block text-2xl md:text-3xl font-normal text-white/55 tracking-normal leading-snug mt-4">
              for architects, developers<br />& real estate
            </span>
          </h1>

          <div ref={btnsRef} style={hidden} className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/services`}
              className="steel-shimmer group inline-flex items-center gap-2 font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "#ffffff", color: "#000000" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.92)")}
              onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
            >
              {t.hero.cta}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 border border-white/50 bg-black/30 text-white font-medium text-base px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 hover:bg-black/50 hover:border-white/80 hover:scale-[1.03]"
            >
              {t.hero.contact}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* SKLO studio — right side decorative text */}
      <div
        style={{
          position: "absolute",
          right: "22%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* SK row */}
        <div style={{ display: "flex", lineHeight: 0.95 }}>
          <span
            ref={sRef}
            style={{
              fontFamily: "var(--font-script)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(7rem, 13vw, 13rem)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
              display: "inline-block",
              opacity: 0,
            }}
          >S</span>
          <span
            ref={kRef}
            style={{
              fontFamily: "var(--font-script)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(7rem, 13vw, 13rem)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
              display: "inline-block",
              opacity: 0,
            }}
          >K</span>
        </div>

        {/* LO row */}
        <div style={{ display: "flex", lineHeight: 0.95 }}>
          <span
            ref={lRef}
            style={{
              fontFamily: "var(--font-script)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(7rem, 13vw, 13rem)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
              display: "inline-block",
              opacity: 0,
            }}
          >L</span>
          <span
            ref={oRef}
            style={{
              fontFamily: "var(--font-script)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(7rem, 13vw, 13rem)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
              display: "inline-block",
              opacity: 0,
            }}
          >O</span>
        </div>

        {/* studio row — each letter animated individually */}
        <div style={{ display: "flex", marginTop: "0.3em" }}>
          {"studio".split("").map((char, i) => (
            <span
              key={i}
              ref={el => (studioRefs.current[i] = el)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.55em",
                textTransform: "uppercase",
                display: "inline-block",
                opacity: 0,
              }}
            >{char}</span>
          ))}
        </div>
      </div>

      <style>{`
        .steel-shimmer {
          position: relative;
          background: rgba(255,255,255,0.04);
        }
        .steel-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 3px;
          background: linear-gradient(
            90deg,
            rgba(200,255,0,0.1)   0%,
            rgba(200,255,0,0.85)  20%,
            rgba(220,255,80,1)    40%,
            rgba(200,255,0,0.75)  60%,
            rgba(200,255,0,0.9)   80%,
            rgba(200,255,0,0.1)  100%
          );
          background-size: 250% 100%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: steelShimmer 2.8s ease-in-out infinite;
        }
        @keyframes steelShimmer {
          0%   { background-position: 250% 0; }
          100% { background-position: -250% 0; }
        }
        @keyframes skloTop {
          0%   { transform: translateY(-130%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes skloRight {
          0%   { transform: translateX(130%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes skloLeft {
          0%   { transform: translateX(-130%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes skloBottom {
          0%   { transform: translateY(130%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}