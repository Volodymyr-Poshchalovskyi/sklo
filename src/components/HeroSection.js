"use client";
import { useEffect, useRef } from "react";
import GlassBlock from "./GlassBlock";

export default function HeroSection({ t, ready }) {
  const tagRef   = useRef(null);
  const headRef  = useRef(null);
  const subRef   = useRef(null);
  const btnsRef  = useRef(null);

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
    <section className="relative min-h-screen">
      {/* Фон */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/heroImage.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Контент */}
      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24">

        {/* Ліва колонка */}
        <div className="flex flex-col items-start justify-center py-16">

          <p ref={tagRef} style={hidden}
            className="text-xs tracking-[0.25em] uppercase text-[--color-accent] mb-5 font-medium">
            3D Studio
          </p>

          <h1 ref={headRef} style={hidden}
            className="font-bold leading-[1.05] tracking-tight text-white mb-6">
            <span className="block text-5xl md:text-6xl xl:text-7xl">Visualization</span>
            <span className="block text-5xl md:text-6xl xl:text-7xl text-white/90">services</span>
            <span className="block text-xl md:text-2xl font-normal text-white/55 tracking-normal leading-snug mt-3">
              for architects, developers<br />& real estate
            </span>
          </h1>

          <p ref={subRef} style={hidden}
            className="text-sm text-white/50 max-w-sm mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div ref={btnsRef} style={hidden} className="flex flex-wrap gap-4">
            <a href="#work"
              className="group relative inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/90 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(255,255,255,0.25)]">
              <span className="relative z-10">{t.hero.cta}</span>
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span className="absolute inset-0 bg-black/5 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-500" />
            </a>

            <a href="#contact"
              className="group inline-flex items-center gap-2 border border-white/30 bg-white/5 text-white font-medium text-sm px-7 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/12 hover:border-white/60 hover:scale-[1.03]">
              {t.hero.contact}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M7 7h10v10"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Права колонка — 3D */}
        <div className="w-full h-[50vh] lg:h-[85vh] relative cursor-grab active:cursor-grabbing"
          style={{ overflow: "visible" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-15%",
            right: "-15%", bottom: "-10%", pointerEvents: "auto",
          }}>
            <GlassBlock />
          </div>
        </div>

      </div>
    </section>
  );
}