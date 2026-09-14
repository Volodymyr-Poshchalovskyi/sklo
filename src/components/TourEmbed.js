"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/**
 * Click-to-start embed for the Panotour 360° exports.
 *
 * `tours` is a list because one property can ship several tours (interior and
 * exterior here). More than one gets a switcher above the viewer rather than a
 * second stacked frame, and switching remounts the iframe — the exports are
 * separate krpano instances with their own XML, so they cannot share one.
 *
 * The iframe is only mounted after the visitor asks for it. Each export pulls
 * jQuery, jQuery UI, the krpano engine and a first ring of panorama tiles, so
 * mounting it eagerly would cost every visitor of the page a few megabytes for
 * something most of them never interact with.
 *
 * No `sandbox` attribute: the tour needs scripts plus same-origin access to
 * read its own XML, and sandboxing it breaks the engine outright. `allow`
 * delegates the sensors the VR/gyro mode in `graphics/webvr.js` asks for, and
 * `allowFullScreen` is what makes the tour's own fullscreen button work.
 */
export default function TourEmbed({ tours, locale = "en", className = "" }) {
  const list = Array.isArray(tours) ? tours : tours ? [tours] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const frameRef = useRef(null);

  if (list.length === 0) return null;

  const de = locale === "de";
  const tour = list[Math.min(activeIndex, list.length - 1)];

  const openFullscreen = () => {
    const el = frameRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  const selectTour = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    // Back to the poster: a switch should not silently pull down another few
    // megabytes of engine and tiles the visitor did not ask for.
    setStarted(false);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {list.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {list.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectTour(idx)}
                aria-pressed={isActive}
                className={`carousel-arrow rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive ? "tour-tab-active" : ""
                }`}
              >
                {de ? item.label.de : item.label.en}
              </button>
            );
          })}
        </div>
      )}

      {/* Sized by aspect ratio with an svh ceiling rather than a fixed pixel
          height: a 16:9 box is unusable on a phone in portrait, and a tall
          viewport should not push the rest of the page off-screen. */}
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
        style={{
          aspectRatio: "16 / 9",
          maxHeight: "78svh",
          // 16:9 of a phone's width is ~185px tall, which is too shallow to
          // look around in, so narrow screens fall back to a portrait-friendly
          // floor instead.
          minHeight: "min(60svh, 460px)",
        }}
      >
        {started ? (
          <iframe
            key={tour.id}
            ref={frameRef}
            src={tour.entry}
            title={`${tour.title} — ${de ? tour.label.de : tour.label.en}`}
            className="absolute inset-0 h-full w-full border-0"
            allow="gyroscope; accelerometer; magnetometer; xr-spatial-tracking; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={de ? "360°-Tour starten" : "Start the 360° tour"}
          >
            <Image
              key={tour.id}
              src={tour.poster}
              alt={tour.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

            <span className="media-caption absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-7 w-7 translate-x-[2px]"
                >
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-lg md:text-xl font-bold uppercase tracking-[0.14em]">
                  {tour.title}
                  {list.length > 1 && (
                    <> · {de ? tour.label.de : tour.label.en}</>
                  )}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70">
                  {de
                    ? `${tour.scenes} Szenen · Klicken zum Starten`
                    : `${tour.scenes} scenes · Click to start`}
                </span>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
          {de
            ? "Ziehen zum Umsehen · Grundriss zum Standortwechsel"
            : "Drag to look around · Floorplan to move"}
        </span>
        <div className="flex items-center gap-4">
          {started && (
            <button
              type="button"
              onClick={openFullscreen}
              className="text-[11px] font-mono uppercase tracking-widest text-accent hover:underline"
            >
              {de ? "Vollbild" : "Fullscreen"}
            </button>
          )}
          <a
            href={tour.entry}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono uppercase tracking-widest text-accent hover:underline"
          >
            {de ? "In neuem Tab öffnen" : "Open in a new tab"}
          </a>
        </div>
      </div>
    </div>
  );
}
