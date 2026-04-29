"use client";
import { useState } from "react";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All images");

  const filters = ["All images", "Exterior", "Interior"];

  const items = [
    { id: 1, category: "Exterior", ratio: "aspect-[4/5]" },
    { id: 2, category: "Interior", ratio: "aspect-[16/9]" },
    { id: 3, category: "Exterior", ratio: "aspect-[4/3]" },
    { id: 4, category: "Exterior", ratio: "aspect-[16/9]" },
    { id: 5, category: "Interior", ratio: "aspect-[4/5]" },
    { id: 6, category: "Interior", ratio: "aspect-[3/4]" },
    { id: 7, category: "Exterior", ratio: "aspect-[1/1]" },
    { id: 8, category: "Exterior", ratio: "aspect-[3/2]" },
    { id: 9, category: "Interior", ratio: "aspect-[4/3]" },
  ];

  const filteredItems = items.filter(
    (item) => activeFilter === "All images" || item.category === activeFilter
  );

  return (
    <main className="min-h-screen bg-[#0d0d0f] text-white pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex justify-center mb-12">
          <div className="flex w-full max-w-3xl justify-between border-b border-white/10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`pb-4 px-4 text-xs md:text-sm tracking-widest uppercase transition-colors relative ${
                  activeFilter === filter ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <span className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`w-full bg-white/5 relative overflow-hidden break-inside-avoid group ${item.ratio}`}
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
                Placeholder {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}