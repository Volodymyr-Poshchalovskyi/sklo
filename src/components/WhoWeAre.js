"use client";
import { useState, useEffect, useRef } from "react";

export default function WhoWeAre() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        rootMargin: "-64px 0px -92% 0px",
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);
  const slides = [
    { id: 1, title: "EXTERIOR VISUALIZATION" },
    { id: 2, title: "INTERIOR VISUALIZATION" },
    { id: 3, title: "360° VIRTUAL TOUR | VR" },
    { id: 4, title: "ANIMATION | MOOD FILM" },
  ];

  const features = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
    },
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-[#0d0d0f] text-white pt-24 pb-12 px-6 md:px-12 lg:px-16 xl:px-24 border-t border-white/10 snap-start"
      >
        <div className="w-full flex flex-col gap-18">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
            <h2
              className={`title-3d ${inView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase shrink-0 lg:w-1/3`}
            >
              WHO WE ARE
            </h2>
            <div className="flex flex-col gap-6 text-sm sm:text-base md:text-[1.05rem] lg:text-[1.125rem] text-white/80 leading-relaxed lg:w-2/3">
              <p>
                We create stunning visualizations rooted in our deep understanding of architecture and interior design. Our professional background gives us a unique perspective, allowing us to merge creative vision with technical precision. We believe in a hands-on approach and dedicate ourselves to every project from start to finish. The result is high-quality renderings and animations that showcase a project&apos;s beauty and purpose.
              </p>
              <p>
                We help architects, designers, and developers bring their visions to life. From a single image to a complete animation, our goal is to produce work that is not only effective but also inspiring and unforgettable.
              </p>
            </div>
          </div>

          <div className="relative w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {slides.map((slide) => (
                <div key={slide.id} className="flex flex-col gap-4">
                  <div className="w-full aspect-[3/4] bg-white/5 relative overflow-hidden flex items-center justify-center">
                    <span className="text-white/20 text-xs tracking-widest uppercase">Placeholder</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-widest uppercase border-b border-white/30 pb-2">
                    {slide.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0d0d0f] text-white pt-12 pb-24 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h3 className="text-base sm:text-lg font-bold tracking-widest uppercase">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
        .title-3d {
          color: #ffffff;
          display: inline-block;
          cursor: default;
          will-change: transform, text-shadow;
        }
        .title-3d.animate-pop-3d {
          animation: pop3D 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pop3D {
          0% {
            transform: translate(0, 0);
            text-shadow: 0 0 0 transparent;
          }
          100% {
            transform: translate(-5px, -5px);
            text-shadow: 
              1px 1px 0px #d4d4d8,
              2px 2px 0px #d4d4d8,
              3px 3px 0px #d4d4d8,
              4px 4px 0px #d4d4d8,
              5px 5px 0px #d4d4d8,
              6px 6px 0px #d4d4d8,
              7px 7px 15px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </section>
    </>
  );
}