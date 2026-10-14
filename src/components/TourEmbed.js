"use client";

import { useRef, useState, useSyncExternalStore } from "react";

// Shared across every embed on the page: one media-query listener, not one per
// window.
const pointerQuery = () => window.matchMedia("(hover: none)");
function subscribeToPointer(onChange) {
  const query = pointerQuery();
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
import Image from "next/image";
import { mediaUrl } from "@/lib/media";
import { pickL } from "@/lib/i18n";

// Tour labels carry en/de only; Spanish is looked up from the English label.
const ES_LABELS = { Interior: "Interior", Exterior: "Exterior" };
const labelFor = (label, locale) => pickL(locale, label.en, label.de, label.es ?? ES_LABELS[label.en]);

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
export default function TourEmbed({ tours, locale = "en", className = "", showPart = false, size = "default" }) {
  const list = Array.isArray(tours) ? tours : tours ? [tours] : [];
  // "Click to start" on a phone is an instruction nobody can follow. Read
  // through `useSyncExternalStore` rather than an effect, so the first client
  // render already has the right word and the server render stays "Click".
  const coarsePointer = useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia("(hover: none)").matches,
    () => false
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const frameRef = useRef(null);

  if (list.length === 0) return null;

  const tour = list[Math.min(activeIndex, list.length - 1)];
  // The list used to be one property shown twice, so the buttons could just
  // say Interior and Exterior. It now spans several properties, and a button
  // that only says "Interior" no longer identifies anything — so each one
  // leads with the property and keeps the part only where that property has
  // more than one tour.
  const titleCounts = list.reduce((acc, item) => {
    acc[item.title] = (acc[item.title] ?? 0) + 1;
    return acc;
  }, {});
  // `showPart` is for the gallery, where each tour gets its own window: the
  // list this embed sees is one item long, so it cannot tell on its own that
  // two of the windows are the same property seen inside and out.
  const switcherLabel = (item) => {
    const part = labelFor(item.label, locale);
    return titleCounts[item.title] > 1 ? `${item.title} · ${part}` : item.title;
  };

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
                {switcherLabel(item)}
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
          // "large" is the navigator's own tab: as tall as the viewport allows,
          // so its sidebar and unit panel get the room a desktop would give.
          maxHeight: size === "large" ? "88svh" : "78svh",
          // 16:9 of a phone's width is ~185px tall, which is too shallow to
          // look around in, so narrow screens fall back to a portrait-friendly
          // floor instead.
          minHeight: size === "large" ? "min(80svh, 720px)" : "min(60svh, 460px)",
        }}
      >
        {started ? (
          <iframe
            key={tour.id}
            ref={frameRef}
            src={mediaUrl(tour.entry)}
            title={`${tour.title} — ${labelFor(tour.label, locale)}`}
            className="absolute inset-0 h-full w-full border-0"
            allow="gyroscope; accelerometer; magnetometer; xr-spatial-tracking; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={pickL(locale, "Start the 360° tour", "360°-Tour starten", "Iniciar el recorrido virtual 360°")}
          >
            <Image
              key={tour.id}
              src={tour.poster}
              alt={tour.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

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
                <span
                  className="text-lg md:text-xl font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#fff", textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
                >
                  {tour.title}
                  {(showPart || titleCounts[tour.title] > 1) && (
                    <> · {labelFor(tour.label, locale)}</>
                  )}
                </span>
                {/* Inline colour, not `text-white/70`: the light theme remaps
                    that utility to dark grey, which vanished against the
                    bright part of the photo. This text always sits on the
                    poster, so it is always light. */}
                <span
                  className="text-[11px] font-mono uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.8)", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
                >
                  {tour.kind === "navigator"
                    ? pickL(
                        locale,
                        `${tour.scenes} views · ${coarsePointer ? "Tap" : "Click"} to start`,
                        `${tour.scenes} Ansichten · Klicken zum Starten`,
                        `${tour.scenes} vistas · ${coarsePointer ? "Toque" : "Haga clic"} para iniciar`
                      )
                    : pickL(
                        locale,
                        `${tour.scenes} scenes · ${coarsePointer ? "Tap" : "Click"} to start`,
                        `${tour.scenes} Szenen · Klicken zum Starten`,
                        `${tour.scenes} escenas · ${coarsePointer ? "Toque" : "Haga clic"} para iniciar`
                      )}
                </span>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
          {tour.kind === "navigator"
            ? pickL(
                locale,
                "Drag to orbit · Tap a unit for details",
                "Ziehen zum Drehen · Wohnung antippen für Details",
                "Arrastre para girar · Toque una vivienda para ver los detalles"
              )
            : pickL(
                locale,
                "Drag to look around · Floorplan to move",
                "Ziehen zum Umsehen · Grundriss zum Standortwechsel",
                "Arrastre para mirar alrededor · Use el plano para desplazarse"
              )}
        </span>
        <div className="flex items-center gap-4">
          {started && (
            <button
              type="button"
              onClick={openFullscreen}
              className="text-[11px] font-mono uppercase tracking-widest text-accent hover:underline"
            >
              {pickL(locale, "Fullscreen", "Vollbild", "Pantalla completa")}
            </button>
          )}
          <a
            href={mediaUrl(tour.entry)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono uppercase tracking-widest text-accent hover:underline"
          >
            {pickL(locale, "Open in a new tab", "In neuem Tab öffnen", "Abrir en una pestaña nueva")}
          </a>
        </div>
      </div>
    </div>
  );
}
