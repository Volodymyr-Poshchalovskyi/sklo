"use client";
import { useRef, useContext } from "react";
import ServicesCarousel from "@/components/ServicesCarousel";
import { LoaderContext } from "@/context/LoaderContext";
import useRevealOnSettle from "@/hooks/useRevealOnSettle";

export default function WhoWeAre({ locale, t }) {
  const servicesSectionRef = useRef(null);
  const whoSectionRef = useRef(null);

  const ready = useContext(LoaderContext);
  const servicesInView = useRevealOnSettle(servicesSectionRef, ready);
  const whoInView = useRevealOnSettle(whoSectionRef, ready);

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

  const leftFeatures = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 8h18a3 3 0 013 3v7a3 3 0 01-3 3H14l-6 5v-5H5a3 3 0 01-3-3v-7a3 3 0 013-3z" />
          <circle cx="9.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="19.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="10" cy="10" r="3.2" />
          <circle cx="22" cy="22" r="3.2" />
          <path d="M23 9L9 23" />
        </svg>
      ),
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 9l2 2 4-4" />
          <path d="M15 9h12" />
          <path d="M5 16l2 2 4-4" />
          <path d="M15 16h12" />
          <path d="M5 23l2 2 4-4" />
          <path d="M15 23h12" />
        </svg>
      ),
    },
  ];

  const rightFeatures = [
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="16" cy="16" r="10.5" />
          <circle cx="16" cy="16" r="6" />
          <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="4" y="6" width="24" height="20" rx="2.5" />
          <circle cx="11" cy="13" r="2.3" />
          <path d="M4 22l7-7 4.5 4.5L21 14l7 8" />
        </svg>
      ),
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="16" cy="18" r="10" />
          <path d="M16 18l4-5" />
          <path d="M12 3h8" />
          <path d="M16 3v3" />
        </svg>
      ),
    },
  ];

  const featurePairs = [
    { left: leftFeatures[0], right: rightFeatures[0] },
    { left: leftFeatures[1], right: rightFeatures[1] },
    { left: leftFeatures[2], right: rightFeatures[2] },
  ];

  return (
    <>
      <section
        ref={servicesSectionRef}
        className="section-shell hairline-top w-full text-white py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col"
      >
        <div className="w-full flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-4 pt-4 md:pt-6">
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
        className="section-shell section-band hairline-top w-full text-white py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col"
      >
        <div className="w-full flex flex-col gap-12 md:gap-16">
          {/* Top Row: Heading on Left, Paragraph on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">The studio</span>
              <h2
                className={`title-3d ${whoInView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase`}
              >
                OUR VALUES
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed lg:pt-3">
              <p>
                We help architects, designers, and developers bring their
                visions to life. From a single image to a complete animation,
                our goal is to produce work that is not only effective but also
                inspiring and unforgettable.
              </p>
            </div>
          </div>

          {/* Bottom Rows: 3 pairs of values side-by-side with aligned dividers */}
          <div className="flex flex-col gap-8">
            {featurePairs.map((pair, idx) => {
              const isLast = idx === featurePairs.length - 1;
              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
                >
                  {/* Left Value Item */}
                  <div
                    className={`flex flex-col ${!isLast ? "border-b border-white/10 pb-8" : ""}`}
                    style={{
                      animationName: whoInView ? "featureTileIn" : "none",
                      animationDuration: "0.7s",
                      animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      animationFillMode: "forwards",
                      animationDelay: `${idx * 120}ms`,
                      opacity: whoInView ? 0 : 1,
                    }}
                  >
                    <article className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 text-white/70 shrink-0">
                          {pair.left.icon}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold tracking-[0.12em] uppercase text-white leading-snug">
                          {pair.left.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">
                        {pair.left.desc}
                      </p>
                    </article>
                  </div>

                  {/* Right Value Item */}
                  <div
                    className={`flex flex-col ${!isLast ? "border-b border-white/10 pb-8" : ""}`}
                    style={{
                      animationName: whoInView ? "featureTileIn" : "none",
                      animationDuration: "0.7s",
                      animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      animationFillMode: "forwards",
                      animationDelay: `${idx * 120 + 60}ms`,
                      opacity: whoInView ? 0 : 1,
                    }}
                  >
                    <article className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 text-white/70 shrink-0">
                          {pair.right.icon}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold tracking-[0.12em] uppercase text-white leading-snug">
                          {pair.right.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">
                        {pair.right.desc}
                      </p>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes featureTileIn {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
