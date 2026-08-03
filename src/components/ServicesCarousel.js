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
      },
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

// Reusable horizontal drag/snap services carousel, shared between the
// homepage "Our Services" section and the "Other Services" block on a
// service detail page. `items` are plain { id, title, image|video, href? }
// objects; cards without their own `href` fall back to `defaultHref`.
export default function ServicesCarousel({
  items,
  defaultHref = "#",
  viewAllHref,
  viewAllLabel,
}) {
  const carouselRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const baseItems = viewAllHref
    ? [...items, { id: "view-all", title: viewAllLabel, isLink: true }]
    : items;

  // Replicate 3 times to support infinite scroll looping
  const loopedItems = [
    ...baseItems.map((item) => ({ ...item, uniqueId: `sec1-${item.id}` })),
    ...baseItems.map((item) => ({ ...item, uniqueId: `sec2-${item.id}` })),
    ...baseItems.map((item) => ({ ...item, uniqueId: `sec3-${item.id}` })),
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

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStartRef.current = carouselRef.current.scrollLeft;
    dragDistanceRef.current = 0;

    carouselRef.current.style.scrollSnapType = "none";
    carouselRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    dragDistanceRef.current = Math.abs(x - startXRef.current);
    carouselRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    carouselRef.current.style.scrollSnapType = "x mandatory";
    carouselRef.current.style.scrollBehavior = "smooth";
  };

  const handleLinkClick = (e) => {
    if (dragDistanceRef.current > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
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

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const { scrollLeft: currentScrollLeft } = el;
    const cardWidth = getCardWidthWithGap();
    const singleSectionWidth = baseItems.length * cardWidth;

    if (currentScrollLeft < 0.5 * singleSectionWidth) {
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      el.scrollLeft += singleSectionWidth;

      if (isDraggingRef.current) {
        scrollLeftStartRef.current += singleSectionWidth;
      }

      requestAnimationFrame(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollSnapType = isDraggingRef.current
            ? "none"
            : "x mandatory";
          carouselRef.current.style.scrollBehavior = isDraggingRef.current
            ? "auto"
            : "smooth";
        }
      });
    } else if (currentScrollLeft > 1.5 * singleSectionWidth) {
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= singleSectionWidth;

      if (isDraggingRef.current) {
        scrollLeftStartRef.current -= singleSectionWidth;
      }

      requestAnimationFrame(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollSnapType = isDraggingRef.current
            ? "none"
            : "x mandatory";
          carouselRef.current.style.scrollBehavior = isDraggingRef.current
            ? "auto"
            : "smooth";
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

  return (
    <div className="relative w-full">
      {/* Carousel Navigation Arrows */}
      <div className="flex justify-end items-center gap-4 mb-6">
        <button
          onClick={scrollLeft}
          className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 sm:w-6 h-5 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollRight}
          className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <svg
            className="w-5 sm:w-6 h-5 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex gap-5 overflow-x-auto py-2 no-scrollbar select-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {loopedItems.map((item) => {
          if (item.isLink) {
            return (
              <Link
                key={item.uniqueId}
                href={viewAllHref}
                onClick={handleLinkClick}
                className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[calc((100%-60px)/4)] flex flex-col gap-4 group cursor-pointer snap-start"
                draggable="false"
              >
                <div className="w-full aspect-[4/5] border border-dashed border-white/20 group-hover:border-white/50 bg-white/[0.02] group-hover:bg-white/[0.05] relative overflow-hidden flex flex-col items-center justify-center rounded-lg p-6 transition-all duration-300 pointer-events-none">
                  <span className="text-sm font-semibold tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-300 text-center">
                    {item.title}
                  </span>
                  <div className="mt-4 w-10 h-10 rounded-full border border-white/20 group-hover:border-white/50 flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
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
              href={item.href || defaultHref}
              onClick={handleLinkClick}
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
                    loading="lazy"
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

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
