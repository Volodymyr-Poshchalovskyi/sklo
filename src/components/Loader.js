"use client";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState("visible"); // visible → fadeout

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeout"), 2200);
    const t2 = setTimeout(() => onComplete(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700"
      style={{ opacity: phase === "fadeout" ? 0 : 1, pointerEvents: phase === "fadeout" ? "none" : "auto" }}
    >
      {/* Букви SKLO з'являються одна за одною */}
      <div className="flex items-center gap-1">
        {"SKLO".split("").map((letter, i) => (
          <span
            key={i}
            className="text-white font-bold tracking-widest"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: `letterIn 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100 + 200}ms forwards`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Лінія прогресу */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-px bg-white/20 overflow-hidden">
        <div
          className="h-full bg-white"
          style={{ animation: "progressLine 2s cubic-bezier(0.4,0,0.2,1) forwards" }}
        />
      </div>

      <style>{`
        @keyframes letterIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressLine {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}