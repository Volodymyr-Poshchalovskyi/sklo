"use client";
import { useState, useEffect, useRef } from "react";
import ServicesCarousel from "@/components/ServicesCarousel";

export default function WhoWeAre({ locale, t }) {
  const [servicesInView, setServicesInView] = useState(false);
  const servicesSectionRef = useRef(null);

  const [whoInView, setWhoInView] = useState(false);
  const whoSectionRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "EXTERIOR VISUALIZATION",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 2,
      title: "INTERIOR VISUALIZATION",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 3,
      title: "360° VIRTUAL TOUR | VR",
      video: "/assets/home/360 services.mp4",
    },
    {
      id: 4,
      title: "ANIMATION | MOOD FILM",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 5,
      title: "BIRD-EYE VISUALIZATION",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 6,
      title: "CINEMAGRAPH | LIVE SHOT",
      video: "/assets/home/cinemagraph services.mp4",
    },
    { id: 7, title: "3D FLOORPLAN", image: "/assets/home/3dplan_interior.jpg" },
    { id: 8, title: "360° FLY-AROUND", image: "/assets/home/3d tour.jpg" },
    { id: 9, title: "WEBSITE DEVELOPMENT", image: "/assets/home/3d tour.jpg" },
  ];

  const features = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
        </svg>
      ),
    },
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.21.9-4.21 2.34-5.66L4.93 4.93C3.12 6.74 2 9.24 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
      ),
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
      ),
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
        </svg>
      ),
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 5H5l3.5-4.5z" />
        </svg>
      ),
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const el = servicesSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesInView(true);
          observer.unobserve(el);
        }
      },
      {
        // A generous threshold instead of a thin trigger band: a snap jump can
        // skip a narrow rootMargin strip entirely and the reveal never fires.
        threshold: 0.15,
      },
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const el = whoSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhoInView(true);
          observer.unobserve(el);
        }
      },
      {
        // A generous threshold instead of a thin trigger band: a snap jump can
        // skip a narrow rootMargin strip entirely and the reveal never fires.
        threshold: 0.15,
      },
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <>
      <section
        ref={servicesSectionRef}
        className="snap-section section-shell hairline-top w-full min-h-[100svh] text-white py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col justify-center"
      >
        <div className="w-full flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-4 pt-10 md:pt-16">
            <span className="eyebrow">What we do</span>
            <h2
              className={`title-3d ${servicesInView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase`}
            >
              OUR SERVICES
            </h2>
          </div>

          <ServicesCarousel
            items={slides}
            defaultHref={`/${locale}/services`}
            viewAllHref={`/${locale}/services`}
            viewAllLabel={t?.whoWeAre?.viewAll ?? "ALL SERVICES"}
          />
        </div>
      </section>

      <section
        ref={whoSectionRef}
        className="snap-section section-shell section-band hairline-top w-full min-h-[100svh] text-white py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col justify-center"
      >
        <div className="w-full flex flex-col gap-10 md:gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">The studio</span>
              <h2
                className={`title-3d ${whoInView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase`}
              >
                OUR VALUES
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
              <p>
                We help architects, designers, and developers bring their
                visions to life. From a single image to a complete animation,
                our goal is to produce work that is not only effective but also
                inspiring and unforgettable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {features.map((feature, idx) => (
              // The reveal lives on this wrapper and the hover lift on the tile
              // inside it. Both animate `transform`, and a filled-forwards
              // animation outranks a plain hover rule — on one element the
              // hover would silently stop working once the reveal finished.
              <div
                key={idx}
                className="flex"
                style={{
                  animationName: whoInView ? "featureTileIn" : "none",
                  animationDuration: "0.7s",
                  animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  animationFillMode: "forwards",
                  animationDelay: `${idx * 70}ms`,
                  opacity: whoInView ? 0 : 1,
                }}
              >
              <article className="tile feature-tile group flex flex-col gap-3 p-5 md:p-6 w-full">
                <div className="flex items-center justify-between">
                  <span className="feature-icon flex items-center justify-center w-11 h-11 rounded-xl text-white/70 transition-colors duration-300 group-hover:text-white">
                    {feature.icon}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/20 transition-colors duration-300 group-hover:text-white/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-[0.12em] uppercase text-white leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">
                  {feature.desc}
                </p>
              </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes featureTileIn {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .feature-icon {
          background-color: var(--card-bg-hover);
          border: 1px solid var(--card-border);
        }
        .feature-tile:hover .feature-icon {
          border-color: var(--card-border-hover);
        }
        /* The tile's own hover lift and the entry animation both drive
           transform, so the lift is scoped to a child-free rule that only
           applies once the entry animation has finished filling forwards. */
        .feature-tile { will-change: transform; }
      `}</style>
    </>
  );
}
