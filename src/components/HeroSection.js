"use client";

export default function HeroSection({ t }) {
  // ← прибрав useLang, просто t з props
  return (
    <section className="min-h-screen flex flex-col items-start justify-end px-8 pb-24 pt-32 max-w-6xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-[--color-accent] mb-6">3D Studio</p>
      <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[--color-text] max-w-3xl mb-6">
        {t.hero.title}
      </h1>
      <p className="text-base text-[--color-text-muted] max-w-md mb-10">
        {t.hero.subtitle}
      </p>
      <a href="#work" className="inline-flex items-center gap-2 bg-[--color-accent] text-black font-semibold text-sm px-6 py-3 rounded-full hover:bg-[--color-accent-hover] transition-colors">
        {t.hero.cta} →
      </a>
    </section>
  );
}