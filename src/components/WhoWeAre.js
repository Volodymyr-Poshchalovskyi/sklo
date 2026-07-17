"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function LazyVideo({ src, className }) {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      {
        root: null, // viewport
        rootMargin: "100px", // start loading/playing slightly before it is in view
        threshold: 0.01,
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !hasIntersected) return;

    if (isIntersecting) {
      videoEl.play().catch((err) => {
        // Ignore autoplay errors
      });
    } else {
      videoEl.pause();
    }
  }, [isIntersecting, hasIntersected]);

  return (
    <video
      ref={videoRef}
      src={hasIntersected ? src : undefined}
      loop
      muted
      playsInline
      className={className}
      preload={hasIntersected ? "auto" : "none"}
    />
  );
}

export default function WhoWeAre({ locale, t }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  // Initialization states
  const [isInitialized, setIsInitialized] = useState(false);

  const slides = [
    { id: 1, title: "EXTERIOR VISUALIZATION", image: "/assets/home/3d tour.jpg" },
    { id: 2, title: "INTERIOR VISUALIZATION", image: "/assets/home/3d tour.jpg" },
    { id: 3, title: "360° VIRTUAL TOUR | VR", video: "/assets/home/360 services.mp4" },
    { id: 4, title: "ANIMATION | MOOD FILM", image: "/assets/home/3d tour.jpg" },
    { id: 5, title: "BIRD-EYE VISUALIZATION", image: "/assets/home/3d tour.jpg" },
    { id: 6, title: "CINEMAGRAPH | LIVE SHOT", video: "/assets/home/cinemagraph services.mp4" },
    { id: 7, title: "3D FLOORPLAN", image: "/assets/home/3dplan_interior.jpg" },
    { id: 8, title: "360° FLY-AROUND", image: "/assets/home/3d tour.jpg" },
    { id: 9, title: "WEBSITE DEVELOPMENT", image: "/assets/home/3d tour.jpg" },
  ];

  // Base list of items including the View All Services card
  const baseItems = [
    ...slides,
    { id: "view-all", title: t?.whoWeAre?.viewAll ?? "ALL SERVICES", isLink: true }
  ];

  // Replicate 3 times to support infinite scroll looping
  const items = [
    ...baseItems.map(item => ({ ...item, uniqueId: `sec1-${item.id}` })),
    ...baseItems.map(item => ({ ...item, uniqueId: `sec2-${item.id}` })),
    ...baseItems.map(item => ({ ...item, uniqueId: `sec3-${item.id}` }))
  ];

  const features = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
        </svg>
      ),
    },
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.21.9-4.21 2.34-5.66L4.93 4.93C3.12 6.74 2 9.24 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
      ),
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
        </svg>
      ),
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
        </svg>
      ),
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 5H5l3.5-4.5z"/>
        </svg>
      ),
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
      ),
    },
  ];

  const getCardWidthWithGap = () => {
    if (!carouselRef.current) return 280;
    if (window.innerWidth >= 1024) {
      return (carouselRef.current.clientWidth + 20) / 4;
    }
    if (window.innerWidth >= 640) {
      return 280; // 260px card + 20px gap
    }
    return 240; // 220px card + 20px gap
  };



  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = getCardWidthWithGap();
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = getCardWidthWithGap();
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Handle infinite scroll loop transitions
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft: currentScrollLeft } = carouselRef.current;
    const cardWidth = getCardWidthWithGap();
    const singleSectionWidth = baseItems.length * cardWidth;

    // If scrolled left past 0.5 * singleSectionWidth, jump forward by 1 section
    if (currentScrollLeft < 0.5 * singleSectionWidth) {
      carouselRef.current.style.scrollBehavior = "auto";
      carouselRef.current.scrollLeft += singleSectionWidth;
      requestAnimationFrame(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollBehavior = "smooth";
        }
      });
    }
    // If scrolled right past 1.5 * singleSectionWidth, jump backward by 1 section
    else if (currentScrollLeft > 1.5 * singleSectionWidth) {
      carouselRef.current.style.scrollBehavior = "auto";
      carouselRef.current.scrollLeft -= singleSectionWidth;
      requestAnimationFrame(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollBehavior = "smooth";
        }
      });
    }
  };

  // Initialize scroll position to the middle section (Section 2) instantly
  useEffect(() => {
    if (carouselRef.current && !isInitialized) {
      const cardWidth = getCardWidthWithGap();
      carouselRef.current.scrollLeft = baseItems.length * cardWidth;
      setIsInitialized(true);
    }
  }, [isInitialized, baseItems.length]);

  // Handle resize events to recalculate correct scroll position in middle section
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current && isInitialized) {
        const cardWidth = getCardWidthWithGap();
        carouselRef.current.scrollLeft = baseItems.length * cardWidth;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInitialized, baseItems.length]);

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

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-[#0d0d0f] text-white pt-10 pb-4 px-6 md:px-16 lg:px-28 xl:px-40 border-t border-white/10 snap-start"
      >
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <h2
              className={`title-3d ${inView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase shrink-0 lg:w-1/3`}
            >
              WHO WE ARE
            </h2>
            
            <div className="flex flex-col gap-4 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed lg:w-2/3">
              <p>
                We create stunning visualizations rooted in our deep understanding of architecture and interior design. Our professional background gives us a unique perspective, allowing us to merge creative vision with technical precision. We believe in a hands-on approach and dedicate ourselves to every project from start to finish. The result is high-quality renderings and animations that showcase a project&apos;s beauty and purpose.
              </p>
              <p>
                We help architects, designers, and developers bring their visions to life. From a single image to a complete animation, our goal is to produce work that is not only effective but also inspiring and unforgettable.
              </p>
            </div>
          </div>

          {/* Carousel Section Container */}
          <div className="relative w-full">
            {/* Carousel Navigation Arrows */}
            <div className="flex justify-end items-center gap-4 mb-6">
              <button
                onClick={scrollLeft}
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Previous slide"
              >
                <svg className="w-5 sm:w-6 h-5 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Next slide"
              >
                <svg className="w-5 sm:w-6 h-5 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Horizontal Carousel */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto py-2 no-scrollbar select-none snap-x snap-mandatory"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {items.map((item) => {
                if (item.isLink) {
                  return (
                    <Link
                      key={item.uniqueId}
                      href={`/${locale}/services`}
                      className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[calc((100%-60px)/4)] flex flex-col gap-4 group cursor-pointer snap-start"
                      draggable="false"
                    >
                      <div className="w-full aspect-[4/5] border border-dashed border-white/20 group-hover:border-white/50 bg-white/[0.02] group-hover:bg-white/[0.05] relative overflow-hidden flex flex-col items-center justify-center rounded-lg p-6 transition-all duration-300 pointer-events-none">
                        <span className="text-sm font-semibold tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-300 text-center">
                          {item.title}
                        </span>
                        <div className="mt-4 w-10 h-10 rounded-full border border-white/20 group-hover:border-white/50 flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      {/* Invisible element to align heights */}
                      <div className="w-full py-2.5 px-4 text-xs font-semibold uppercase opacity-0 select-none pointer-events-none">
                        Placeholder
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.uniqueId}
                    href={`/${locale}/services`}
                    className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[calc((100%-60px)/4)] flex flex-col gap-4 group cursor-pointer snap-start"
                    draggable="false"
                  >
                    <div className="w-full aspect-[4/5] bg-white/5 relative overflow-hidden flex items-center justify-center rounded-lg pointer-events-none">
                      {item.video ? (
                        <LazyVideo
                          src={item.video}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    {/* Title styled like an outlined button */}
                    <div className="w-full text-center py-2.5 px-4 text-xs font-semibold tracking-widest uppercase border border-white/10 group-hover:border-white/40 bg-white/[0.02] group-hover:bg-white/[0.07] rounded-md transition-all duration-300 text-white/90">
                      {item.title}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0d0d0f] text-white pt-8 pb-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-5 items-start">
                <div className="flex-shrink-0 text-white/60 pt-1.5">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-white">
                    {feature.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
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