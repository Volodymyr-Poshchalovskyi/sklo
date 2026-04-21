"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Компонент однієї nav-кнопки з 3D-обертанням букв
function NavLink({ href, label }) {
  const lettersRef = useRef([]);
  const timeoutsRef = useRef([]);

  const handleMouseEnter = () => {
    // Очистити попередні таймери
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    lettersRef.current.forEach((el, i) => {
      if (!el) return;

      // Спочатку скинути
      el.style.animation = "none";
      el.style.transform = "rotateY(0deg)";

      const t = setTimeout(() => {
        el.style.animation = "spinLetter 0.5s cubic-bezier(0.4,0,0.2,1) forwards";

        // Після завершення — прибрати animation щоб наступний hover спрацював
        const cleanup = setTimeout(() => {
          el.style.animation = "none";
          el.style.transform = "rotateY(0deg)";
        }, i * 35 + 520); // 500ms анімація + трохи запасу

        timeoutsRef.current.push(cleanup);
      }, i * 35);

      timeoutsRef.current.push(t);
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center"
      style={{ perspective: "600px" }}
    >
      {label.split("").map((char, i) => (
        <span
          key={i}
          ref={el => lettersRef.current[i] = el}
          style={{
            display: "inline-block",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}

      <style>{`
        @keyframes spinLetter {
          0%   { transform: rotateY(0deg); opacity: 1; }
          50%  { transform: rotateY(180deg); opacity: 0.4; }
          100% { transform: rotateY(360deg); opacity: 1; }
        }
      `}</style>
    </a>
  );
}

export default function Header({ t, locale, visible }) {
  const otherLocale = locale === "en" ? "de" : "en";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langSwitching, setLangSwitching] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLangSwitch = (e) => {
    if (langSwitching) { e.preventDefault(); return; }
    setLangSwitching(true);
    // Розблокувати через 1.5s (після навігації)
    setTimeout(() => setLangSwitching(false), 1500);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        background: scrolled ? "rgba(0,0,0,0.65)" : "transparent",
        backdropFilter: "blur(16px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.7s ease, transform 0.7s ease, padding 0.5s ease, background 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Лого зліва */}
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <div className="relative w-9 h-9 overflow-hidden rounded-md transition-all duration-300 group-hover:scale-110 group-hover:rounded-lg">
            <Image src="/assets/Logo.jpg" alt="SKLO Logo" fill className="object-cover" priority />
          </div>
          <span className="text-base font-semibold tracking-widest uppercase text-white/90 group-hover:text-white transition-colors duration-300">
            SKLO
          </span>
        </Link>

        {/* Навігація + мова справа */}
        <div className="hidden md:flex items-center gap-1">
          {Object.entries(t.nav).map(([key, label]) => (
            <NavLink key={key} href={`#${key}`} label={label} />
          ))}

          <div className="w-px h-4 bg-white/20 mx-3" />

          {/* Перемикач мови */}
          <Link
            href={`/${otherLocale}`}
            onClick={handleLangSwitch}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300"
            style={{
              borderColor: langSwitching ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
              color: langSwitching ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)",
              pointerEvents: langSwitching ? "none" : "auto",
              cursor: langSwitching ? "not-allowed" : "pointer",
            }}
            aria-disabled={langSwitching}
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{
                animation: langSwitching ? "spinGlobe 1s linear infinite" : "none",
              }}
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {langSwitching ? "..." : otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Бургер */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Мобільне меню */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-64 border-t border-white/10" : "max-h-0"}`}>
        <div className="px-6 py-4 flex flex-col gap-3 bg-black/80 backdrop-blur-xl">
          {Object.entries(t.nav).map(([key, label]) => (
            <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}
              className="text-sm text-white/70 hover:text-white py-1 transition-colors">
              {label}
            </a>
          ))}
          <Link href={`/${otherLocale}`} onClick={handleLangSwitch}
            className="text-sm text-white/50 pt-1 hover:text-white transition-colors">
            Switch to {otherLocale.toUpperCase()}
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spinGlobe {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
}