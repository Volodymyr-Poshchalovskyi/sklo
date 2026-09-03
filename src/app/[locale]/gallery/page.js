"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "@/context/LenisContext";
import { galleryItems } from "@/data/galleryData";

function GalleryCard({ item, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  // The tile takes the media's own aspect ratio, so the `object-cover` below
  // has nothing left to crop — a 16:9 render stays 16:9, a 3:4 one stays 3:4,
  // and no format is silently trimmed to fit a fixed box.
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
      className="relative w-full bg-white/5 overflow-hidden rounded-lg group cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-300"
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          preload="metadata"
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1 font-semibold">
          {item.category}
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
          {item.title}
        </h3>
        
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          {item.type === "video" ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

// CSS multi-column (`columns-3`) fills the first column top-to-bottom before
// it starts the second one — with 98 exterior renders that puts items 1–33 in
// the left column alone. The file order is a curated order (strongest work
// first), so it has to read left-to-right across the top row instead. We lay
// the columns out ourselves and deal the items into them round-robin, which
// needs the current column count in JS rather than in a breakpoint class.
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setColumnCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return columnCount;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const lenisRef = useLenis();
  const isFirstFilterRender = useRef(true);

  const categories = ["Exterior", "Interior", "Bird's-Eye View", "Product", "Virtual Staging", "Animation", "Cinemagraph"];

  const categoryDescriptions = {
    "All": "A curated collection of our high-end 3D visualizations, floorplans, and motion renderings.",
    "Exterior": "Photorealistic architectural renderings showing buildings, structures, and landscaping in their real-world environments.",
    "Interior": "Highly detailed internal designs capturing lighting, materials, and atmosphere to showcase living and commercial spaces.",
    "Bird's-Eye View": "Aerial and drone-perspective renderings showing a development within its surrounding district and landscape.",
    "Product": "Studio-quality 3D renderings of furniture and product pieces, lit and staged for catalogs and marketing.",
    "Virtual Staging": "Real interior photographs digitally furnished and dressed to show a space's full potential.",
    "Animation": "Cinematic architectural films and motion showcases bringing a project to life through camera movement and mood.",
    "Cinemagraph": "Static architectural visualizations enhanced with subtle loop animations, drawing instant attention to key design details."
  };

  // The full content list (with each file's real intrinsic dimensions)
  // lives in src/data/galleryData.js — see the header there for how it is
  // generated and why the file order must be preserved.
  const items = galleryItems;

  const filteredItems = items.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  const columnCount = useColumnCount();

  // Each entry keeps its index into `filteredItems` — the lightbox and its
  // prev/next handlers walk that flat array, so a per-column index would send
  // them to the wrong item.
  const columnBuckets = Array.from({ length: columnCount }, () => []);
  filteredItems.forEach((item, index) => {
    columnBuckets[index % columnCount].push({ item, index });
  });

  // Switching filters swaps in a whole new (shorter) grid — if the reader was
  // scrolled deep into the previous set, they'd land partway down an
  // unrelated one, so bring them back to the top of the results.
  useEffect(() => {
    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeFilter, lenisRef]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") setSelectedItemIndex((prev) => prev === 0 ? filteredItems.length - 1 : prev - 1);
      if (e.key === "ArrowRight") setSelectedItemIndex((prev) => prev === filteredItems.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, filteredItems.length]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse text-white">
      {/* Right Sidebar (18% width on desktop) */}
      <aside className="w-full md:w-[18%] h-auto md:h-screen sticky top-0 bg-surface border-b md:border-b-0 md:border-l border-white/10 p-6 md:p-8 pt-24 md:pt-32 flex flex-col justify-between z-20 shrink-0">
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4 text-white">
              Gallery
            </h1>
            <div className="h-[1px] bg-gradient-to-r from-text/20 to-transparent w-full mb-6" />
          </div>

          <div className="flex flex-col gap-4">
            {/* All Button */}
            <button
              onClick={() => setActiveFilter("All")}
              className={`w-full text-left py-2.5 px-4 rounded-lg tracking-widest uppercase text-[10px] font-bold border transition-all duration-300 cursor-pointer ${
                activeFilter === "All"
                  ? "bg-white/15 text-white border-white/30"
                  : "bg-white/5 text-white/40 border-transparent hover:bg-white/10 hover:text-white"
              }`}
            >
              All Projects
            </button>

            {/* Category Filter list */}
            <div className="flex flex-col gap-1.5 pl-1">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="group flex items-center text-left py-2 px-1 text-xs tracking-wider uppercase font-semibold transition-all duration-300 relative cursor-pointer"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full bg-accent mr-3 transition-all duration-300"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scale(1)" : "scale(0)",
                      }}
                    />
                    <span
                      className="transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                        transform: isActive ? "translateX(4px)" : "translateX(0)",
                      }}
                    >
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Category Description */}
        <div className="border-t border-white/10 pt-6 mt-8 md:mt-0">
          <p className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-2">Category Info</p>
          <p className="text-[11px] md:text-xs text-white/50 leading-relaxed min-h-[48px] transition-all duration-300">
            {categoryDescriptions[activeFilter] || categoryDescriptions["All"]}
          </p>
        </div>
      </aside>

      {/* Left Gallery Masonry Grid (78% width on desktop) */}
      <main className="w-full md:w-[82%] min-h-screen pt-24 md:pt-32 pb-24 px-6 md:px-12 lg:px-16 overflow-y-auto">
        <div key={activeFilter} className="flex items-start gap-6">
          {columnBuckets.map((bucket, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6 flex-1 min-w-0">
              {bucket.map(({ item, index }) => (
                <div
                  key={item.id}
                  style={{
                    animationDelay: `${Math.min(index, 14) * 35}ms`
                  }}
                  className="animate-fade-in-card opacity-0"
                >
                  <GalleryCard
                    item={item}
                    onClick={() => setSelectedItemIndex(index)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeInCard {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in-card {
            animation: fadeInCard 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </main>

      {/* Lightbox Modal */}
      {selectedItemIndex !== null && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center px-4 py-6 md:px-24 md:py-10 transition-opacity duration-300"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer z-50"
            aria-label="Close lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer z-50"
            aria-label="Previous item"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer z-50"
            aria-label="Next item"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {/* Lightbox Content */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[min(1800px,92vw)] max-h-[92vh] flex flex-col items-center justify-center"
          >
            {filteredItems[selectedItemIndex]?.type === "video" ? (
              <video
                key={filteredItems[selectedItemIndex].id}
                src={filteredItems[selectedItemIndex].src}
                controls
                autoPlay
                loop
                className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl"
              />
            ) : (
              <img
                key={filteredItems[selectedItemIndex].id}
                src={filteredItems[selectedItemIndex].src}
                alt={filteredItems[selectedItemIndex].title}
                className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl"
              />
            )}
            
            <div className="mt-6 text-center">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                {filteredItems[selectedItemIndex]?.category}
              </span>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mt-1">
                {filteredItems[selectedItemIndex]?.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}