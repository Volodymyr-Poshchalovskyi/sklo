"use client";
import { useRef, useState } from "react";
import Image from "next/image";

// The card is a window, not a sticker. On hover the portrait sits a little
// deeper than the frame: it is scaled up slightly and drifts against the
// cursor, so moving right shows more of the right of the photo, the way a
// view through an opening would. Only the image moves — the frame, its border
// and the caption stay put, so there is nothing rotated and no border to
// rasterise at odd angles. Sibling cards dim through a `:has()` rule in the
// grid (see about/page.js), which needs no state here. Touch devices and
// reduced-motion users get the still photo.

const DRIFT = 14; // px of travel at the frame's edge
const DEPTH_SCALE = 1.08; // just enough headroom for the drift

export default function TeamCard({ member, index }) {
  const frameRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setShift({ x: -px * DRIFT * 2, y: -py * DRIFT * 2 });
  };
  const onLeave = () => {
    setHover(false);
    setShift({ x: 0, y: 0 });
  };

  return (
    <div
      className="team-card group flex flex-col animate-fade-in-tile opacity-0"
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <div
        ref={frameRef}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/40 bg-white/[0.02] transition-colors duration-300"
      >
        <div
          className="team-depth absolute inset-0"
          style={{
            transform: hover
              ? `translate3d(${shift.x.toFixed(1)}px, ${shift.y.toFixed(1)}px, 0) scale(${DEPTH_SCALE})`
              : "translate3d(0, 0, 0) scale(1)",
          }}
        >
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
        {/* A faint inner shadow along the frame reads as the thickness of
            the opening; it is what makes the drift feel like depth rather
            than a sliding picture. */}
        <span className="team-reveal pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />
        <span className="media-chip absolute top-3 left-3 md:top-4 md:left-4 font-mono text-[10px] backdrop-blur-sm rounded-full px-2 py-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="service-caption mt-4 md:mt-5 rounded-xl px-4 py-3.5 transition-all duration-300">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white/90 group-hover:text-white leading-snug transition-colors duration-300">
          {member.name}
        </h2>
        <p className="mt-1.5 text-xs md:text-sm text-white/50 group-hover:text-white/75 leading-relaxed transition-colors duration-300">
          {member.role}
        </p>
      </div>

      <style>{`
        .team-depth {
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .team-card:hover .team-depth { transition-duration: 0.35s; }
        .team-reveal {
          box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
          transition: box-shadow 0.5s ease;
        }
        .team-card:hover .team-reveal {
          box-shadow: inset 0 0 28px 2px rgba(0, 0, 0, 0.28);
        }
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .team-depth { transform: none !important; }
          .team-card:hover .team-reveal { box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
