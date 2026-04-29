"use client";
import { useEffect, useRef, useContext } from "react";
import { LoaderContext } from "@/context/LoaderContext";

export default function HeroSection({ t }) {
  const ready = useContext(LoaderContext);
  const tagRef  = useRef(null);
  const headRef = useRef(null);
  const subRef  = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const els = [tagRef.current, headRef.current, subRef.current, btnsRef.current];
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/heroImage.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col items-start justify-center max-w-2xl">
          <p
            ref={tagRef}
            style={hidden}
            className="text-xs tracking-[0.25em] uppercase text-[--color-accent] mb-5 font-medium"
          >
            3D Studio
          </p>

          <h1
            ref={headRef}
            style={hidden}
            className="font-bold leading-[1.05] tracking-tight text-white mb-6"
          >
            <span className="block text-5xl md:text-6xl xl:text-7xl">Visualization</span>
            <span className="block text-5xl md:text-6xl xl:text-7xl text-white/90">services</span>
            <span className="block text-xl md:text-2xl font-normal text-white/55 tracking-normal leading-snug mt-3">
              for architects, developers<br />& real estate
            </span>
          </h1>

          <p
            ref={subRef}
            style={hidden}
            className="text-sm text-white/50 max-w-sm mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </p>

          <div ref={btnsRef} style={hidden} className="flex flex-wrap gap-4">
            <a
              href="/services"
              className="steel-shimmer group inline-flex items-center gap-2 text-white font-semibold text-sm px-7 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]"
            >
              {t.hero.cta}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2 border border-white/30 bg-white/5 text-white font-medium text-sm px-7 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/12 hover:border-white/60 hover:scale-[1.03]"
            >
              {t.hero.contact}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
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
          padding: 1.5px;
          background: linear-gradient(
            90deg,
            rgba(80,120,160,0.2)   0%,
            rgba(140,190,230,0.9)  20%,
            rgba(200,225,255,1)    40%,
            rgba(100,160,210,0.8)  60%,
            rgba(160,200,240,0.95) 80%,
            rgba(80,120,160,0.2)  100%
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