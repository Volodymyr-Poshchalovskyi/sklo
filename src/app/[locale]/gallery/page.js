"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "@/context/LenisContext";

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

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full bg-white/5 overflow-hidden rounded-lg group cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-300 ${item.aspect}`}
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

  // Sourced from `images for gallery/<category>/webp` (see public/assets/gallery),
  // copied in as webp and renamed to a plain sequential NNN — the numbering in
  // that folder is the intended display order, so it's preserved as-is here.
  // Animation/cinemagraph mp4s were re-encoded from the originals, downscaled
  // to max 1920px wide with audio stripped (playback is always muted). Most
  // went through the system ffmpeg (libopenh264, since that build has no
  // libx264); two portrait animation sources (3000x4500 / 2000x3000) that
  // build's decoder couldn't read went through VLC's bundled flatpak ffmpeg
  // instead (`flatpak run --command=ffmpeg org.videolan.VLC`), which does
  // have libx264/a real H.264 decoder.
  const items = [

    // Exterior
    { id: 1, category: "Exterior", src: "/assets/gallery/exterior/001.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 2, category: "Exterior", src: "/assets/gallery/exterior/002.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 3, category: "Exterior", src: "/assets/gallery/exterior/003.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 4, category: "Exterior", src: "/assets/gallery/exterior/004.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 5, category: "Exterior", src: "/assets/gallery/exterior/005.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 6, category: "Exterior", src: "/assets/gallery/exterior/006.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 7, category: "Exterior", src: "/assets/gallery/exterior/007.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 8, category: "Exterior", src: "/assets/gallery/exterior/008.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 9, category: "Exterior", src: "/assets/gallery/exterior/009.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 10, category: "Exterior", src: "/assets/gallery/exterior/010.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 11, category: "Exterior", src: "/assets/gallery/exterior/011.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 12, category: "Exterior", src: "/assets/gallery/exterior/012.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 13, category: "Exterior", src: "/assets/gallery/exterior/013.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 14, category: "Exterior", src: "/assets/gallery/exterior/014.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 15, category: "Exterior", src: "/assets/gallery/exterior/015.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 16, category: "Exterior", src: "/assets/gallery/exterior/016.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 17, category: "Exterior", src: "/assets/gallery/exterior/017.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 18, category: "Exterior", src: "/assets/gallery/exterior/018.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 19, category: "Exterior", src: "/assets/gallery/exterior/019.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 20, category: "Exterior", src: "/assets/gallery/exterior/020.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 21, category: "Exterior", src: "/assets/gallery/exterior/021.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 22, category: "Exterior", src: "/assets/gallery/exterior/022.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 23, category: "Exterior", src: "/assets/gallery/exterior/023.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 24, category: "Exterior", src: "/assets/gallery/exterior/024.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 25, category: "Exterior", src: "/assets/gallery/exterior/025.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 26, category: "Exterior", src: "/assets/gallery/exterior/026.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 27, category: "Exterior", src: "/assets/gallery/exterior/027.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 28, category: "Exterior", src: "/assets/gallery/exterior/028.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 29, category: "Exterior", src: "/assets/gallery/exterior/029.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 30, category: "Exterior", src: "/assets/gallery/exterior/030.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 31, category: "Exterior", src: "/assets/gallery/exterior/031.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 32, category: "Exterior", src: "/assets/gallery/exterior/032.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 33, category: "Exterior", src: "/assets/gallery/exterior/033.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 34, category: "Exterior", src: "/assets/gallery/exterior/034.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 35, category: "Exterior", src: "/assets/gallery/exterior/035.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 36, category: "Exterior", src: "/assets/gallery/exterior/036.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 37, category: "Exterior", src: "/assets/gallery/exterior/037.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 38, category: "Exterior", src: "/assets/gallery/exterior/038.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 39, category: "Exterior", src: "/assets/gallery/exterior/039.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 40, category: "Exterior", src: "/assets/gallery/exterior/040.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 41, category: "Exterior", src: "/assets/gallery/exterior/041.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 42, category: "Exterior", src: "/assets/gallery/exterior/042.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 43, category: "Exterior", src: "/assets/gallery/exterior/043.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 44, category: "Exterior", src: "/assets/gallery/exterior/044.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 45, category: "Exterior", src: "/assets/gallery/exterior/045.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 46, category: "Exterior", src: "/assets/gallery/exterior/046.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 47, category: "Exterior", src: "/assets/gallery/exterior/047.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 48, category: "Exterior", src: "/assets/gallery/exterior/048.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 49, category: "Exterior", src: "/assets/gallery/exterior/049.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 50, category: "Exterior", src: "/assets/gallery/exterior/050.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 51, category: "Exterior", src: "/assets/gallery/exterior/051.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 52, category: "Exterior", src: "/assets/gallery/exterior/052.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 53, category: "Exterior", src: "/assets/gallery/exterior/053.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 54, category: "Exterior", src: "/assets/gallery/exterior/054.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 55, category: "Exterior", src: "/assets/gallery/exterior/055.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 56, category: "Exterior", src: "/assets/gallery/exterior/056.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 57, category: "Exterior", src: "/assets/gallery/exterior/057.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 58, category: "Exterior", src: "/assets/gallery/exterior/058.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 59, category: "Exterior", src: "/assets/gallery/exterior/059.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 60, category: "Exterior", src: "/assets/gallery/exterior/060.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 61, category: "Exterior", src: "/assets/gallery/exterior/061.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 62, category: "Exterior", src: "/assets/gallery/exterior/062.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 63, category: "Exterior", src: "/assets/gallery/exterior/063.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 64, category: "Exterior", src: "/assets/gallery/exterior/064.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 65, category: "Exterior", src: "/assets/gallery/exterior/065.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 66, category: "Exterior", src: "/assets/gallery/exterior/066.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 67, category: "Exterior", src: "/assets/gallery/exterior/067.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 68, category: "Exterior", src: "/assets/gallery/exterior/068.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 69, category: "Exterior", src: "/assets/gallery/exterior/069.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 70, category: "Exterior", src: "/assets/gallery/exterior/070.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 71, category: "Exterior", src: "/assets/gallery/exterior/071.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 72, category: "Exterior", src: "/assets/gallery/exterior/072.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 73, category: "Exterior", src: "/assets/gallery/exterior/073.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 74, category: "Exterior", src: "/assets/gallery/exterior/074.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 75, category: "Exterior", src: "/assets/gallery/exterior/075.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 76, category: "Exterior", src: "/assets/gallery/exterior/076.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 77, category: "Exterior", src: "/assets/gallery/exterior/077.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 78, category: "Exterior", src: "/assets/gallery/exterior/078.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 79, category: "Exterior", src: "/assets/gallery/exterior/079.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 80, category: "Exterior", src: "/assets/gallery/exterior/080.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 81, category: "Exterior", src: "/assets/gallery/exterior/081.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 82, category: "Exterior", src: "/assets/gallery/exterior/082.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 83, category: "Exterior", src: "/assets/gallery/exterior/083.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 84, category: "Exterior", src: "/assets/gallery/exterior/084.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 85, category: "Exterior", src: "/assets/gallery/exterior/085.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 86, category: "Exterior", src: "/assets/gallery/exterior/086.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 87, category: "Exterior", src: "/assets/gallery/exterior/087.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 88, category: "Exterior", src: "/assets/gallery/exterior/088.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 89, category: "Exterior", src: "/assets/gallery/exterior/089.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 90, category: "Exterior", src: "/assets/gallery/exterior/090.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 91, category: "Exterior", src: "/assets/gallery/exterior/091.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 92, category: "Exterior", src: "/assets/gallery/exterior/092.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },
    { id: 93, category: "Exterior", src: "/assets/gallery/exterior/093.webp", type: "image", title: "Exterior", aspect: "aspect-[3/2]" },
    { id: 94, category: "Exterior", src: "/assets/gallery/exterior/094.webp", type: "image", title: "Exterior", aspect: "aspect-[3/4]" },
    { id: 95, category: "Exterior", src: "/assets/gallery/exterior/095.webp", type: "image", title: "Exterior", aspect: "aspect-[4/3]" },
    { id: 96, category: "Exterior", src: "/assets/gallery/exterior/096.webp", type: "image", title: "Exterior", aspect: "aspect-[4/5]" },
    { id: 97, category: "Exterior", src: "/assets/gallery/exterior/097.webp", type: "image", title: "Exterior", aspect: "aspect-[16/9]" },
    { id: 98, category: "Exterior", src: "/assets/gallery/exterior/098.webp", type: "image", title: "Exterior", aspect: "aspect-[1/1]" },

    // Interior
    { id: 99, category: "Interior", src: "/assets/gallery/interior/001.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 100, category: "Interior", src: "/assets/gallery/interior/002.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 101, category: "Interior", src: "/assets/gallery/interior/003.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 102, category: "Interior", src: "/assets/gallery/interior/004.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 103, category: "Interior", src: "/assets/gallery/interior/005.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 104, category: "Interior", src: "/assets/gallery/interior/006.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 105, category: "Interior", src: "/assets/gallery/interior/007.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 106, category: "Interior", src: "/assets/gallery/interior/008.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 107, category: "Interior", src: "/assets/gallery/interior/009.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 108, category: "Interior", src: "/assets/gallery/interior/010.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 109, category: "Interior", src: "/assets/gallery/interior/011.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 110, category: "Interior", src: "/assets/gallery/interior/012.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 111, category: "Interior", src: "/assets/gallery/interior/013.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 112, category: "Interior", src: "/assets/gallery/interior/014.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 113, category: "Interior", src: "/assets/gallery/interior/015.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 114, category: "Interior", src: "/assets/gallery/interior/016.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 115, category: "Interior", src: "/assets/gallery/interior/017.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 116, category: "Interior", src: "/assets/gallery/interior/018.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 117, category: "Interior", src: "/assets/gallery/interior/019.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 118, category: "Interior", src: "/assets/gallery/interior/020.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 119, category: "Interior", src: "/assets/gallery/interior/021.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 120, category: "Interior", src: "/assets/gallery/interior/022.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 121, category: "Interior", src: "/assets/gallery/interior/023.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 122, category: "Interior", src: "/assets/gallery/interior/024.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 123, category: "Interior", src: "/assets/gallery/interior/025.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 124, category: "Interior", src: "/assets/gallery/interior/026.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 125, category: "Interior", src: "/assets/gallery/interior/027.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 126, category: "Interior", src: "/assets/gallery/interior/028.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 127, category: "Interior", src: "/assets/gallery/interior/029.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 128, category: "Interior", src: "/assets/gallery/interior/030.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 129, category: "Interior", src: "/assets/gallery/interior/031.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 130, category: "Interior", src: "/assets/gallery/interior/032.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 131, category: "Interior", src: "/assets/gallery/interior/033.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 132, category: "Interior", src: "/assets/gallery/interior/034.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 133, category: "Interior", src: "/assets/gallery/interior/035.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 134, category: "Interior", src: "/assets/gallery/interior/036.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 135, category: "Interior", src: "/assets/gallery/interior/037.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 136, category: "Interior", src: "/assets/gallery/interior/038.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 137, category: "Interior", src: "/assets/gallery/interior/039.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 138, category: "Interior", src: "/assets/gallery/interior/040.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 139, category: "Interior", src: "/assets/gallery/interior/041.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 140, category: "Interior", src: "/assets/gallery/interior/042.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 141, category: "Interior", src: "/assets/gallery/interior/043.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 142, category: "Interior", src: "/assets/gallery/interior/044.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 143, category: "Interior", src: "/assets/gallery/interior/045.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 144, category: "Interior", src: "/assets/gallery/interior/046.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 145, category: "Interior", src: "/assets/gallery/interior/047.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 146, category: "Interior", src: "/assets/gallery/interior/048.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 147, category: "Interior", src: "/assets/gallery/interior/049.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 148, category: "Interior", src: "/assets/gallery/interior/050.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 149, category: "Interior", src: "/assets/gallery/interior/051.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 150, category: "Interior", src: "/assets/gallery/interior/052.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 151, category: "Interior", src: "/assets/gallery/interior/053.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 152, category: "Interior", src: "/assets/gallery/interior/054.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 153, category: "Interior", src: "/assets/gallery/interior/055.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 154, category: "Interior", src: "/assets/gallery/interior/056.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 155, category: "Interior", src: "/assets/gallery/interior/057.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 156, category: "Interior", src: "/assets/gallery/interior/058.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 157, category: "Interior", src: "/assets/gallery/interior/059.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 158, category: "Interior", src: "/assets/gallery/interior/060.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 159, category: "Interior", src: "/assets/gallery/interior/061.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 160, category: "Interior", src: "/assets/gallery/interior/062.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 161, category: "Interior", src: "/assets/gallery/interior/063.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 162, category: "Interior", src: "/assets/gallery/interior/064.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 163, category: "Interior", src: "/assets/gallery/interior/065.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 164, category: "Interior", src: "/assets/gallery/interior/066.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 165, category: "Interior", src: "/assets/gallery/interior/067.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 166, category: "Interior", src: "/assets/gallery/interior/068.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 167, category: "Interior", src: "/assets/gallery/interior/069.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 168, category: "Interior", src: "/assets/gallery/interior/070.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 169, category: "Interior", src: "/assets/gallery/interior/071.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },
    { id: 170, category: "Interior", src: "/assets/gallery/interior/072.webp", type: "image", title: "Interior", aspect: "aspect-[1/1]" },
    { id: 171, category: "Interior", src: "/assets/gallery/interior/073.webp", type: "image", title: "Interior", aspect: "aspect-[3/2]" },
    { id: 172, category: "Interior", src: "/assets/gallery/interior/074.webp", type: "image", title: "Interior", aspect: "aspect-[3/4]" },
    { id: 173, category: "Interior", src: "/assets/gallery/interior/075.webp", type: "image", title: "Interior", aspect: "aspect-[4/3]" },
    { id: 174, category: "Interior", src: "/assets/gallery/interior/076.webp", type: "image", title: "Interior", aspect: "aspect-[4/5]" },
    { id: 175, category: "Interior", src: "/assets/gallery/interior/077.webp", type: "image", title: "Interior", aspect: "aspect-[16/9]" },

    // Bird's-Eye View
    { id: 176, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/001.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[1/1]" },
    { id: 177, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/002.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/2]" },
    { id: 178, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/003.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/4]" },
    { id: 179, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/004.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[4/3]" },
    { id: 180, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/005.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[4/5]" },
    { id: 181, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/006.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[16/9]" },
    { id: 182, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/007.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[1/1]" },
    { id: 183, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/008.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/2]" },
    { id: 184, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/009.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/4]" },
    { id: 185, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/010.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[4/3]" },
    { id: 186, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/011.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[4/5]" },
    { id: 187, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/012.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[16/9]" },
    { id: 188, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/013.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[1/1]" },
    { id: 189, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/014.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/2]" },
    { id: 190, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/015.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/4]" },
    { id: 191, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/016.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[4/3]" },
    { id: 192, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/017.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[4/5]" },
    { id: 193, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/018.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[16/9]" },
    { id: 194, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/019.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[1/1]" },
    { id: 195, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/020.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/2]" },
    { id: 196, category: "Bird's-Eye View", src: "/assets/gallery/bird-eye/021.webp", type: "image", title: "Bird's-Eye View", aspect: "aspect-[3/4]" },

    // Product
    { id: 197, category: "Product", src: "/assets/gallery/product/001.webp", type: "image", title: "Product", aspect: "aspect-[4/3]" },
    { id: 198, category: "Product", src: "/assets/gallery/product/002.webp", type: "image", title: "Product", aspect: "aspect-[4/5]" },
    { id: 199, category: "Product", src: "/assets/gallery/product/003.webp", type: "image", title: "Product", aspect: "aspect-[16/9]" },
    { id: 200, category: "Product", src: "/assets/gallery/product/004.webp", type: "image", title: "Product", aspect: "aspect-[1/1]" },
    { id: 201, category: "Product", src: "/assets/gallery/product/005.webp", type: "image", title: "Product", aspect: "aspect-[3/2]" },
    { id: 202, category: "Product", src: "/assets/gallery/product/006.webp", type: "image", title: "Product", aspect: "aspect-[3/4]" },
    { id: 203, category: "Product", src: "/assets/gallery/product/007.webp", type: "image", title: "Product", aspect: "aspect-[4/3]" },
    { id: 204, category: "Product", src: "/assets/gallery/product/008.webp", type: "image", title: "Product", aspect: "aspect-[4/5]" },
    { id: 205, category: "Product", src: "/assets/gallery/product/009.webp", type: "image", title: "Product", aspect: "aspect-[16/9]" },
    { id: 206, category: "Product", src: "/assets/gallery/product/010.webp", type: "image", title: "Product", aspect: "aspect-[1/1]" },
    { id: 207, category: "Product", src: "/assets/gallery/product/011.webp", type: "image", title: "Product", aspect: "aspect-[3/2]" },
    { id: 208, category: "Product", src: "/assets/gallery/product/012.webp", type: "image", title: "Product", aspect: "aspect-[3/4]" },
    { id: 209, category: "Product", src: "/assets/gallery/product/013.webp", type: "image", title: "Product", aspect: "aspect-[4/3]" },
    { id: 210, category: "Product", src: "/assets/gallery/product/014.webp", type: "image", title: "Product", aspect: "aspect-[4/5]" },
    { id: 211, category: "Product", src: "/assets/gallery/product/015.webp", type: "image", title: "Product", aspect: "aspect-[16/9]" },
    { id: 212, category: "Product", src: "/assets/gallery/product/016.webp", type: "image", title: "Product", aspect: "aspect-[1/1]" },
    { id: 213, category: "Product", src: "/assets/gallery/product/017.webp", type: "image", title: "Product", aspect: "aspect-[3/2]" },
    { id: 214, category: "Product", src: "/assets/gallery/product/018.webp", type: "image", title: "Product", aspect: "aspect-[3/4]" },
    { id: 215, category: "Product", src: "/assets/gallery/product/019.webp", type: "image", title: "Product", aspect: "aspect-[4/3]" },
    { id: 216, category: "Product", src: "/assets/gallery/product/020.webp", type: "image", title: "Product", aspect: "aspect-[4/5]" },
    { id: 217, category: "Product", src: "/assets/gallery/product/021.webp", type: "image", title: "Product", aspect: "aspect-[16/9]" },
    { id: 218, category: "Product", src: "/assets/gallery/product/022.webp", type: "image", title: "Product", aspect: "aspect-[1/1]" },
    { id: 219, category: "Product", src: "/assets/gallery/product/023.webp", type: "image", title: "Product", aspect: "aspect-[3/2]" },

    // Virtual Staging
    { id: 220, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/001.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[3/4]" },
    { id: 221, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/002.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[4/3]" },
    { id: 222, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/003.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[4/5]" },
    { id: 223, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/004.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[16/9]" },
    { id: 224, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/005.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[1/1]" },
    { id: 225, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/006.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[3/2]" },
    { id: 226, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/007.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[3/4]" },
    { id: 227, category: "Virtual Staging", src: "/assets/gallery/virtual-staging/008.webp", type: "image", title: "Virtual Staging", aspect: "aspect-[4/3]" },

    // Animation
    { id: 228, category: "Animation", src: "/assets/gallery/animation/001.mp4", type: "video", title: "Animation", aspect: "aspect-[16/9]" },
    { id: 229, category: "Animation", src: "/assets/gallery/animation/002.mp4", type: "video", title: "Animation", aspect: "aspect-[16/9]" },
    { id: 230, category: "Animation", src: "/assets/gallery/animation/003.mp4", type: "video", title: "Animation", aspect: "aspect-[4/3]" },
    { id: 231, category: "Animation", src: "/assets/gallery/animation/004.mp4", type: "video", title: "Animation", aspect: "aspect-[16/9]" },
    { id: 244, category: "Animation", src: "/assets/gallery/animation/005.mp4", type: "video", title: "Animation", aspect: "aspect-[2/3]" },
    { id: 245, category: "Animation", src: "/assets/gallery/animation/006.mp4", type: "video", title: "Animation", aspect: "aspect-[2/3]" },

    // Cinemagraph
    { id: 232, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/001.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[3/4]" },
    { id: 233, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/002.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[4/3]" },
    { id: 234, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/003.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" },
    { id: 235, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/004.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" },
    { id: 236, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/005.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[3/4]" },
    { id: 237, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/006.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" },
    { id: 238, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/007.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[3/4]" },
    { id: 239, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/008.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" },
    { id: 240, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/009.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[3/4]" },
    { id: 241, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/010.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" },
    { id: 242, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/011.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" },
    { id: 243, category: "Cinemagraph", src: "/assets/gallery/cinemagraph/012.mp4", type: "video", title: "Cinemagraph", aspect: "aspect-[16/9]" }
  ];

  const filteredItems = items.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

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
        <div 
          key={activeFilter}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              style={{
                animationDelay: `${Math.min(idx, 14) * 35}ms`
              }}
              className="animate-fade-in-card opacity-0 break-inside-avoid mb-6"
            >
              <GalleryCard
                item={item}
                onClick={() => setSelectedItemIndex(idx)}
              />
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
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 transition-opacity duration-300"
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
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            {filteredItems[selectedItemIndex]?.type === "video" ? (
              <video
                key={filteredItems[selectedItemIndex].id}
                src={filteredItems[selectedItemIndex].src}
                controls
                autoPlay
                loop
                className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl"
              />
            ) : (
              <img
                key={filteredItems[selectedItemIndex].id}
                src={filteredItems[selectedItemIndex].src}
                alt={filteredItems[selectedItemIndex].title}
                className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl"
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