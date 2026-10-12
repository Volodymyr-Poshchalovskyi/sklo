"use client";
import { useEffect, useState } from "react";

// Shown only while the hero film is still loading (ClientWrapper decides
// that). Just the logo turning over on black — no card, no progress line.
// A click, a key or a scroll means "I am here, get on with it".
export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      setPhase("fadeout");
      setTimeout(onComplete, 500);
    };
    window.addEventListener("pointerdown", release);
    window.addEventListener("keydown", release);
    window.addEventListener("wheel", release, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", release);
      window.removeEventListener("keydown", release);
      window.removeEventListener("wheel", release);
    };
  }, [onComplete]);

  const face = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        pointerEvents: phase === "fadeout" ? "none" : "auto",
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          perspective: "900px",
          width: "clamp(72px, 12vw, 112px)",
          height: "clamp(72px, 12vw, 112px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            animationName: "logoTurn",
            animationDuration: "1.6s",
            animationTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
            animationIterationCount: "infinite",
          }}
        >
          {/* Two faces with the same mark so the logo never reads mirrored
              while the back is towards the viewer. */}
          <img src="/LogoHeader.svg" alt="" style={face} draggable={false} />
          <img
            src="/LogoHeader.svg"
            alt="SKLO"
            style={{ ...face, transform: "rotateY(180deg)" }}
            draggable={false}
          />
        </div>
      </div>

      <style>{`
        @keyframes logoTurn {
          0%   { transform: rotateY(0deg); }
          45%  { transform: rotateY(180deg); }
          55%  { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
