"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, localizeProject } from "@/data/projects";
import { serviceTitleFor } from "@/data/servicesData";
import { imageVariant, videoPoster } from "@/lib/media";
import { humanizeTitle } from "@/lib/seo";

// The projects mega menu, a case file rather than a contact sheet: the index
// of projects on the left (name, place, year), and on the right the hovered
// project's hero image with what it was and which services it used, beside a
// strip of three more images from the same project.

const still = (item, width) => (item?.type === "video" ? videoPoster(item.src) : imageVariant(item?.src ?? "", width));

export function useProjectsMenuData(locale, t) {
  const m = t?.header?.projectsMenu ?? {};
  return {
    allHref: `/${locale}/projects`,
    allLabel: m.all ?? "All projects",
    servicesLabel: m.services ?? "Services",
    openLabel: m.open ?? "Open the case",
    items: projects.map((p) => {
      const l = localizeProject(p, locale);
      const rest = (l.items ?? []).filter((i) => i.src !== l.heroItem?.src && i.type === "image").slice(0, 3);
      return {
        slug: l.slug,
        name: l.name,
        place: `${l.city}, ${l.country}`,
        year: l.year,
        type: l.type,
        href: `/${locale}/projects/${l.slug}`,
        hero: still(l.heroItem, 1280),
        heroAlt: l.heroItem?.alt ?? l.name,
        thumbs: rest.map((i) => ({ src: still(i, 640), alt: i.alt ?? l.name })),
        services: (l.services ?? []).map((s) => humanizeTitle(serviceTitleFor(s, locale)).replace(/­/g, "")),
      };
    }),
  };
}

export default function ProjectsMenu({ open, mounted, data, theme, skin, surface, blur, onMouseEnter, onMouseLeave, onNavigate }) {
  const [activeSlug, setActiveSlug] = useState(data.items[0]?.slug);
  const active = data.items.find((p) => p.slug === activeSlug) ?? data.items[0];
  const light = theme === "light";
  const ink = light ? "#121214" : "#ffffff";
  const muted = light ? "rgba(18,18,20,0.5)" : "rgba(255,255,255,0.45)";
  const faint = light ? "rgba(18,18,20,0.35)" : "rgba(255,255,255,0.3)";
  const enter = (i) => ({
    animationName: "projectTileIn",
    animationDuration: "0.55s",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "both",
    animationDelay: `${i * 70}ms`,
  });

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
      <div className="h-full grid grid-cols-[minmax(0,4fr)_minmax(0,10fr)] gap-8 px-8 lg:px-10 py-8">
        {/* Index. <p> rather than <span> throughout: the light theme forces
            every span in the header to ink. */}
        <div className="flex flex-col min-h-0">
          <div className="flex flex-col flex-1 min-h-0">
            {data.items.map((p) => {
              const isActive = p.slug === active.slug;
              return (
                <Link
                  key={p.slug}
                  href={p.href}
                  onMouseEnter={() => setActiveSlug(p.slug)}
                  onFocus={() => setActiveSlug(p.slug)}
                  onClick={onNavigate}
                  className="flex items-baseline justify-between gap-4 py-[11px] pl-3 border-l transition-colors duration-300"
                  style={{ borderColor: isActive ? ink : "transparent" }}
                >
                  <p className="text-sm font-semibold uppercase tracking-wider truncate transition-colors duration-300" style={{ color: isActive ? ink : muted }}>
                    {p.name}
                  </p>
                  <p className="text-[11px] tabular-nums shrink-0 truncate" style={{ color: faint }}>
                    {p.place} · {p.year}
                  </p>
                </Link>
              );
            })}
          </div>
          <Link
            href={data.allHref}
            onClick={onNavigate}
            className="mt-4 pt-4 flex items-baseline justify-between text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: ink, borderTop: `1px solid ${surface.border}` }}
          >
            <p>{data.allLabel}</p>
            <p className="text-[11px] tabular-nums font-normal" style={{ color: faint }}>{data.items.length} →</p>
          </Link>
        </div>

        {/* Case file of the hovered project: hero with the brief written on
            it, and three more frames beside it. Keyed so it re-enters. */}
        {mounted && (
          <div key={active.slug} className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-2.5 min-h-0">
            <Link href={active.href} onClick={onNavigate} className="group relative overflow-hidden rounded-xl bg-white/5" style={enter(0)}>
              {/* eslint-disable-next-line @next/next/no-img-element -- R2 variants, sized already */}
              <img src={active.hero} alt={active.heroAlt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.15) 55%, transparent)" }} />
              <div className="absolute left-6 right-6 bottom-5 flex items-end justify-between gap-6 pointer-events-none">
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.65)" }}>{active.place} · {active.year}</p>
                  <p className="text-2xl font-bold uppercase tracking-wider" style={{ color: "#ffffff" }}>{active.name}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{active.type}</p>
                </div>
                <p className="shrink-0 text-xs font-semibold uppercase tracking-widest" style={{ color: "#ffffff" }}>{data.openLabel} →</p>
              </div>
              <div className="absolute left-6 right-6 top-5 flex flex-wrap gap-1.5 pointer-events-none">
                {active.services.slice(0, 4).map((s) => (
                  <p key={s} className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#ffffff", background: "rgba(0,0,0,0.38)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
                    {s}
                  </p>
                ))}
              </div>
            </Link>
            <div className="grid grid-rows-3 gap-2.5 min-h-0">
              {active.thumbs.map((th, i) => (
                <Link key={th.src} href={active.href} onClick={onNavigate} tabIndex={-1} className="relative overflow-hidden rounded-xl bg-white/5" style={enter(i + 1)}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- R2 variants, sized already */}
                  <img src={th.src} alt={th.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes projectTileIn {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
