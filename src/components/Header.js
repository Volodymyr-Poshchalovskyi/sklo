"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function NavLink({ href, label, isActive }) {
  const lettersRef = useRef([]);
  const timeoutsRef = useRef([]);

  const handleMouseEnter = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      el.style.animation = "none";
      el.style.transform = "rotateY(0deg)";

      const t = setTimeout(() => {
        el.style.animation = "spinLetter 0.5s cubic-bezier(0.4,0,0.2,1) forwards";
        const cleanup = setTimeout(() => {
          el.style.animation = "none";
          el.style.transform = "rotateY(0deg)";
        }, i * 35 + 520);
        timeoutsRef.current.push(cleanup);
      }, i * 35);

      timeoutsRef.current.push(t);
    });
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      className="relative px-5 py-2.5 text-lg font-medium transition-all duration-300 flex items-center rounded-full"
      style={{
        perspective: "600px",
        background: "transparent",
        color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
      }}
    >
      {label.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
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
          0%   { transform: rotateY(0deg);   opacity: 1; }
          50%  { transform: rotateY(180deg); opacity: 0.4; }
          100% { transform: rotateY(360deg); opacity: 1; }
        }
      `}</style>
    </Link>
  );
}

function LangDropdown({ locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const langs = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
  ];

  const current = langs.find((l) => l.code === locale) ?? langs[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300"
        style={{
          borderColor: "rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <svg
          width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current.label}
        <svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "50%",
          minWidth: "150px",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "10px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translate(-50%, 0) scale(1)" : "translate(-50%, -6px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {langs.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-5 py-3 text-sm transition-colors duration-150 hover:bg-white/10"
            style={{
              color: lang.code === locale ? "#ffffff" : "rgba(255,255,255,0.5)",
              background: lang.code === locale ? "rgba(255,255,255,0.12)" : "transparent",
            }}
          >
            {lang.code === locale && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
            {lang.code !== locale && <span style={{ width: 12, display: "inline-block" }} />}
            {lang.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header({ t, locale, visible }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { key: "home",     label: t?.nav?.home     ?? "Home",     href: `/${locale}` },
    { key: "services", label: t?.nav?.services ?? "Services", href: `/${locale}/services` },
    { key: "gallery",  label: t?.nav?.gallery  ?? "Gallery",  href: `/${locale}/gallery`  },
    { key: "contact",  label: t?.nav?.contact  ?? "Contact",  href: `/${locale}/contact`  },
    { key: "about",    label: t?.nav?.about    ?? "About",    href: `/${locale}/about`    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkIsActive = (href) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: scrolled ? "1.05rem 0" : "1.65rem 0",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        background: scrolled ? "rgba(0,0,0,0.65)" : "transparent",
        backdropFilter: "blur(16px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition:
          "opacity 0.7s ease, transform 0.7s ease, padding 0.5s ease, background 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <div className="relative w-12 h-12 overflow-hidden rounded-md transition-all duration-300 group-hover:scale-110 group-hover:rounded-lg">
            <Image src="/LogoHeader.svg" alt="SKLO Logo" fill className="object-cover" priority />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2.5">
          {navItems.map(({ key, label, href }) => (
            <NavLink
              key={key}
              href={href}
              label={label}
              isActive={checkIsActive(href)}
            />
          ))}

          <div className="w-px h-5 bg-white/20 mx-4" />

          <LangDropdown locale={locale} />
          
          <Link
            href={`/${locale}/contact`}
            className={`ml-4 text-base font-semibold px-7 py-3 rounded-full bg-white text-black transition-all duration-500 hover:bg-white/80 ${
              scrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            Contact us
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-2 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[28rem] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-4 bg-black/80 backdrop-blur-xl">
          {navItems.map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base py-1.5 transition-colors"
              style={{
                color: checkIsActive(href) ? "#ffffff" : "rgba(255,255,255,0.7)",
                fontWeight: checkIsActive(href) ? "600" : "400",
              }}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-5">
            <LangDropdown locale={locale} />
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMenuOpen(false)}
              className="text-center text-base font-semibold px-5 py-3 rounded-full bg-white text-black"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}