"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";

function ServiceMedia({ service }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  if (service.type === "video") {
    return (
      <video
        ref={videoRef}
        src={service.src}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <img
      src={service.src}
      alt={service.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
    />
  );
}

export default function ServicesPage({ params }) {
  const { locale } = React.use(params);

  return (
    <main className="w-full min-h-screen bg-[#0d0d0f] text-white flex flex-col pt-16">
      {servicesData.map((service, index) => (
        <section
          key={index}
          id={`service-${index}`}
          className={`w-full min-h-[90vh] md:h-screen flex flex-col md:flex-row items-center border-b border-white/5 snap-start relative overflow-hidden scroll-mt-16 group ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text block (50% width on desktop) */}
          <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center h-full z-10 shrink-0">
            <span className="text-4xl md:text-6xl font-script italic text-white/20 mb-4 block font-serif">
              0{index + 1}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider mb-6 text-white leading-tight">
              {service.title}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              {service.desc}
            </p>
            
            <Link 
              href={`/${locale}/services/${service.slug}`}
              className="group inline-flex items-center gap-2.5 text-xs md:text-sm font-semibold tracking-widest uppercase border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-full transition-all duration-300 w-fit cursor-pointer"
            >
              {locale === "de" ? "Mehr erfahren" : "Learn more"}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Media block (50% width on desktop) */}
          <div className="w-full md:w-1/2 h-[45vh] md:h-full relative overflow-hidden bg-white/5 border-t md:border-t-0 border-white/5 z-0 shrink-0 self-stretch">
            <ServiceMedia service={service} />
          </div>
        </section>
      ))}
    </main>
  );
}