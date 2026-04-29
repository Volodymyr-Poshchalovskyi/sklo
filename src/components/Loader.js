"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeout"), 2800);
    const t2 = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        pointerEvents: phase === "fadeout" ? "none" : "auto",
        transition: "opacity 0.7s ease",
      }}
    >
      {/* 3D flip сцена */}
      <div
        style={{
          perspective: "800px",
          width:  "clamp(100px, 20vw, 160px)",
          height: "clamp(100px, 20vw, 160px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            animation: "cardFlip 1s cubic-bezier(0.4,0,0.2,1) infinite",
            borderRadius: "18px",
          }}
        >
          {/* Лицьова сторона — логотип */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <Image
              src="/assets/Logo.jpg"
              alt="SKLO"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Зворотня сторона — темна з акцентом */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "18px",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #0d0d0f 0%, #1a1a2e 50%, #0d0d0f 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Логотип менший по центру */}
            <div
              style={{
                position: "relative",
                width: "55%",
                height: "55%",
                borderRadius: "10px",
                overflow: "hidden",
                opacity: 0.85,
              }}
            >
              <Image
                src="/assets/Logo.jpg"
                alt="SKLO"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Subtle glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "18px",
                background: "radial-gradient(circle at 50% 50%, rgba(140,190,255,0.06) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Тінь під карточкою */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(50% - clamp(80px, 14vw, 110px))",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(80px, 15vw, 120px)",
          height: "20px",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
          animation: "shadowPulse 1.8s cubic-bezier(0.4,0,0.2,1) infinite",
          filter: "blur(6px)",
        }}
      />

      {/* Прогрес-лінія */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: "clamp(60px, 10vw, 96px)",
          height: "1px",
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "rgba(255,255,255,0.8)",
            animation: "progressLine 2.8s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes cardFlip {
          0%    { transform: rotateY(0deg)   scale(1);    }
          40%   { transform: rotateY(180deg) scale(1.04); }
          50%   { transform: rotateY(180deg) scale(1);    }
          90%   { transform: rotateY(360deg) scale(1.04); }
          100%  { transform: rotateY(360deg) scale(1);    }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: translateX(-50%) scaleX(1);    opacity: 0.5; }
          40%, 50% { transform: translateX(-50%) scaleX(0.7);  opacity: 0.2; }
        }
        @keyframes progressLine {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}