"use client";

import Link from "next/link";
import { useState } from "react";
import { galleryItems, SERVICE_TOUR } from "@/data/galleryData";
import { imageVariant, videoPoster, mediaUrl } from "@/lib/media";

// The gallery's mega menu. The services menu is a list beside one preview;
// this one is an index beside a contact sheet: the categories in two groups
// (stills, motion & interactive) with their counts, and on the right a bento
// of the category's first four works — the archive is curated strongest
// first, so these are the pictures that sell it. Hovering a category swaps
// the sheet.

const GROUPS = [
  { id: "stills", items: [["Exterior", "exterior"], ["Interior", "interior"], ["Bird's-Eye View", "bird-eye"], ["Product", "product"], ["Virtual Staging", "virtual-staging"]] },
  { id: "motion", items: [["Animation", "animation"], ["Cinemagraph", "cinemagraph"], ["360° Tours", "360-tours"], ["Navigator", "navigator"], ["Web", "web"]] },
];

const thumb = (src, type, width) => (type === "video" ? videoPoster(src) : imageVariant(src, width));

function sheetFor(key) {
  if (key === "360° Tours" || key === "Navigator") {
    const tours = SERVICE_TOUR[key === "Navigator" ? "fly-around-navigator" : "360-virtual-tour"] ?? [];
    return { count: tours.length, tiles: tours.slice(0, 4).map((t) => ({ small: mediaUrl(t.poster), big: mediaUrl(t.poster), alt: t.label?.en ?? key })) };
  }
  const items = galleryItems.filter((i) => i.category === key);
  return {
    count: items.length,
    tiles: items.slice(0, 4).map((i) => ({ small: thumb(i.src, i.type, 640), big: thumb(i.src, i.type, 1280), alt: i.alt ?? i.title })),
  };
}

// Plain data, built once per locale: labels from the locale file, counts and
// tiles from galleryData.
export function useGalleryMenuData(locale, t) {
  const labels = t?.gallery?.categories ?? {};
  const m = t?.header?.galleryMenu ?? {};
  const total = galleryItems.length;
  return {
    allHref: `/${locale}/gallery`,
    allLabel: m.all ?? "All works",
    total,
    worksLabel: m.works ?? "works",
    groups: GROUPS.map((g) => ({
      id: g.id,
      title: m[g.id] ?? g.id,
      items: g.items.map(([key, slug]) => ({
        key,
        label: labels[key]?.label ?? key,
        href: `/${locale}/gallery?filter=${slug}`,
        ...sheetFor(key),
      })),
    })),
  };
}

// Tile placement for 1–4 works: one wide, then the rest around it.
const LAYOUTS = {
  1: ["col-span-4 row-span-2"],
  2: ["col-span-2 row-span-2", "col-span-2 row-span-2"],
  3: ["col-span-2 row-span-2", "col-span-2", "col-span-2"],
  4: ["col-span-2 row-span-2", "col-span-2", "col-span-1", "col-span-1"],
};

export default function GalleryMenu({ open, mounted, data, theme, skin, surface, blur, onMouseEnter, onMouseLeave, onNavigate }) {
  const all = data.groups.flatMap((g) => g.items);
  const [activeKey, setActiveKey] = useState(all[0]?.key);
  const active = all.find((c) => c.key === activeKey) ?? all[0];
  const light = theme === "light";
  const ink = light ? "#121214" : "#ffffff";
  const muted = light ? "rgba(18,18,20,0.5)" : "rgba(255,255,255,0.45)";
  const faint = light ? "rgba(18,18,20,0.35)" : "rgba(255,255,255,0.3)";
  const layout = LAYOUTS[Math.min(active.tiles.length, 4)] ?? LAYOUTS[1];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="hidden lg:block absolute left-0 right-0 overflow-hidden rounded-[20px]"
      style={{
        // Same object, same opening as the services panel (see Header.js).
        top: "calc(100% + 10px)",
        background: skin.panel,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        border: `1px solid ${open ? surface.border : "transparent"}`,
        boxShadow: open ? surface.shadow : "none",
        height: "420px",
        clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transition: `clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, visibility 0s linear ${open ? "0s" : "0.35s"}`,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div className="h-full grid grid-cols-[minmax(0,5fr)_minmax(0,9fr)] gap-8 px-8 lg:px-10 py-8">
        {/* Index: two groups, a count beside every category. */}
        <div className="flex flex-col min-h-0">
          <div className="grid grid-cols-2 gap-x-6 flex-1 min-h-0">
            {data.groups.map((g) => (
              <div key={g.id} className="flex flex-col gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: faint }}>{g.title}</p>
                {g.items.map((c) => {
                  const isActive = c.key === active.key;
                  return (
                    <Link
                      key={c.key}
                      href={c.href}
                      onMouseEnter={() => setActiveKey(c.key)}
                      onFocus={() => setActiveKey(c.key)}
                      onClick={onNavigate}
                      className="group flex items-baseline justify-between gap-3 py-1.5 pl-3 border-l transition-colors duration-300"
                      style={{ borderColor: isActive ? ink : "transparent" }}
                    >
                      {/* <p>, not <span>: the light theme forces header spans
                          to ink, which erased the active/inactive contrast. */}
                      <p className="text-sm font-semibold uppercase tracking-wider truncate transition-colors duration-300" style={{ color: isActive ? ink : muted }}>
                        {c.label}
                      </p>
                      <p className="text-[11px] tabular-nums shrink-0" style={{ color: faint }}>{c.count}</p>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
          <Link
            href={data.allHref}
            onClick={onNavigate}
            className="mt-4 pt-4 flex items-baseline justify-between text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: ink, borderTop: `1px solid ${surface.border}` }}
          >
            <p>{data.allLabel}</p>
            <p className="text-[11px] tabular-nums font-normal" style={{ color: faint }}>{data.total} →</p>
          </Link>
        </div>

        {/* Contact sheet of the hovered category. Keyed by category so the
            tiles re-enter in sequence when it changes. */}
        <Link href={active.href} onClick={onNavigate} className="relative block min-h-0" aria-label={active.label}>
          {mounted && (
            <div key={active.key} className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2.5">
              {active.tiles.map((tile, i) => (
                <div
                  key={tile.small + i}
                  className={`relative overflow-hidden rounded-xl bg-white/5 ${layout[i] ?? "hidden"}`}
                  style={{
                    animationName: "galleryTileIn",
                    animationDuration: "0.55s",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    animationFillMode: "both",
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- R2 variants, sized already */}
                  <img src={i === 0 ? tile.big : tile.small} alt={tile.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105" />
                  {i === 0 && (
                    <>
                      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1) 45%, transparent)" }} />
                      <div className="absolute left-5 bottom-4 right-5 flex items-end justify-between gap-4 pointer-events-none">
                        {/* <p>, not <span>: the light theme forces every span
                            in the header to ink, and this sits on a photo. */}
                        <p className="text-lg font-bold uppercase tracking-wider" style={{ color: "#ffffff" }}>{active.label}</p>
                        <p className="text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.75)" }}>{active.count} {data.worksLabel} →</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </Link>
      </div>

      <style>{`
        @keyframes galleryTileIn {
          0%   { opacity: 0; transform: scale(0.97); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1);    filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
