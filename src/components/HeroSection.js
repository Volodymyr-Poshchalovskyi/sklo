"use client";
import { useEffect, useRef, useContext, useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import Link from "next/link";

function RotatingWord({ words, interval = 2200 }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in");
  const outTimeoutRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase("out");
      outTimeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("in");
      }, 420);
    }, interval);

    return () => {
      clearInterval(id);
      clearTimeout(outTimeoutRef.current);
    };
  }, [words.length, interval]);

  const letters = words[index].split("");

  return (
    <span className="inline-block" style={{ perspective: "500px" }}>
      {letters.map((char, i) => (
        <span
          key={`${index}-${i}`}
          className="inline-block"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            animationName: phase === "out" ? "letterFlipOut" : "letterFlipIn",
            animationDuration: phase === "out" ? "0.42s" : "0.5s",
            animationTimingFunction:
              phase === "out" ? "cubic-bezier(0.4,0,0.2,1)" : "cubic-bezier(0.16,1,0.3,1)",
            animationFillMode: "forwards",
            animationDelay: `${i * 30}ms`,
          }}
        >
          {char === " " ? " " : char}
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
    <section className="hero-section relative min-h-screen flex items-end snap-start">
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
              <RotatingWord words={["architects", "developers", "real estate"]} />
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