"use client";
import { useEffect, useRef, useContext, useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import Link from "next/link";

// Hoisted so its identity is stable across renders — the rotation effect below
// depends on it, and an inline array literal would restart the cycle on every
// parent render.
const ROTATING_WORDS = ["architects", "developers", "real estate"];

const LETTER_STAGGER = 28; // ms between neighbouring letters
const FLIP_OUT_MS = 380;
const FLIP_IN_MS = 460;

// Time until the LAST letter of an n-letter word has finished flipping.
const flipDuration = (length, base) => (length - 1) * LETTER_STAGGER + base;

function RotatingWord({ words = ROTATING_WORDS, hold = 1800 }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in");
  const holdTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  const letters = words[index].split("");
  const isOut = phase === "out";
  const lastLetter = letters.length - 1;

  const advance = () => {
    setIndex((i) => (i + 1) % words.length);
    setPhase("in");
  };

  // The swap is driven by the LAST letter's animationend rather than a timer.
  // A timer starts counting when the effect commits, but the CSS animation only
  // starts on the next style recalc — measured ~30ms later — so a duration-based
  // timer always fired while the final letters were still mid-flip, and the new
  // word visibly replaced them instead of following them.
  const handleLetterEnd = (i) => {
    if (i !== lastLetter) return;
    if (isOut) {
      advance();
    } else {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = setTimeout(() => setPhase("out"), hold);
    }
  };

  // Safety net: if animationend never arrives (backgrounded tab, animations
  // disabled) the rotation still progresses rather than stalling forever.
  useEffect(() => {
    const base = isOut ? FLIP_OUT_MS : FLIP_IN_MS;
    const settled = flipDuration(letters.length, base);
    const wait = settled + (isOut ? 0 : hold) + 400;

    fallbackTimerRef.current = setTimeout(() => {
      if (isOut) {
        setIndex((i) => (i + 1) % words.length);
        setPhase("in");
      } else {
        setPhase("out");
      }
    }, wait);

    return () => clearTimeout(fallbackTimerRef.current);
  }, [index, phase, letters.length, isOut, hold, words.length]);

  useEffect(() => () => {
    clearTimeout(holdTimerRef.current);
    clearTimeout(fallbackTimerRef.current);
  }, []);

  return (
    // `text-white` is explicit: this sits inside the `text-white/40` "for" line
    // and would otherwise inherit that 40% opacity.
    <span className="inline-block text-white" style={{ perspective: "600px" }}>
      {letters.map((char, i) => (
        <span
          key={`${index}-${i}`}
          className="inline-block"
          onAnimationEnd={() => handleLetterEnd(i)}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            backfaceVisibility: "hidden",
            animationName: isOut ? "letterFlipOut" : "letterFlipIn",
            animationDuration: `${(isOut ? FLIP_OUT_MS : FLIP_IN_MS) / 1000}s`,
            animationTimingFunction: isOut
              ? "cubic-bezier(0.55,0,1,0.45)"
              : "cubic-bezier(0.16,1,0.3,1)",
            animationFillMode: "forwards",
            animationDelay: `${i * LETTER_STAGGER}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection({ t, locale }) {
  const ready = useContext(LoaderContext);
  const headRef = useRef(null);
  const btnsRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch((err) => {
            // Ignore play interruption/autoplay restrictions
          });
        } else {
          videoEl.pause();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.01,
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, []);



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



  const hidden = { opacity: 0, transform: "translateY(28px)" };

  return (
    <section className="hero-section relative min-h-[100svh] flex items-end">
      <video
        ref={videoRef}
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

      <div className="relative z-10 w-full max-w-7xl px-10 pt-24 pb-24">
        <div className="flex flex-col items-start justify-center max-w-4xl">
          <h1
            ref={headRef}
            style={hidden}
            className="font-bold leading-[1.05] tracking-tight text-white mb-10"
          >
            <span className="block text-4xl sm:text-6xl md:text-7xl xl:text-8xl sm:whitespace-nowrap">
              Visualization <span className="text-white/90 font-bold">services</span>
            </span>
            <span className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-medium text-white/40 tracking-[0.2em] uppercase mt-5">
              for
              <RotatingWord />
            </span>
          </h1>

          <div ref={btnsRef} style={hidden} className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/services`}
              className="black-shimmer group inline-flex items-center gap-2 font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "rgba(255, 255, 255, 0.12)", color: "#ffffff", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
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

      <style>{`
        .black-shimmer {
          position: relative;
        }
        .black-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2.5px;
          background: linear-gradient(
            90deg,
            #000000 0%,
            #000000 30%,
            #888888 50%,
            #000000 70%,
            #000000 100%
          );
          background-size: 200% 100%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: blackShimmer 3.2s ease-in-out infinite;
        }
        @keyframes blackShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes letterFlipOut {
          0%   { transform: rotateX(0deg);  opacity: 1; }
          100% { transform: rotateX(90deg); opacity: 0; }
        }
        @keyframes letterFlipIn {
          0%   { transform: rotateX(-90deg); opacity: 0; }
          100% { transform: rotateX(0deg);   opacity: 1; }
        }
      `}</style>
    </section>
  );
}