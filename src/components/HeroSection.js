"use client";
import { useEffect, useRef, useContext } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import Link from "next/link";

export default function HeroSection({ t, locale }) {
  const ready = useContext(LoaderContext);
  const headRef = useRef(null);
  const btnsRef = useRef(null);

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
      `}</style>
    </section>
  );
}