"use client";
import Link from "next/link";
import { serviceWideFor } from "@/data/galleryData";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function NavLink({ href, label, isActive, onMouseEnter, onMouseLeave, onClick }) {
  const lettersRef = useRef([]);
  const timeoutsRef = useRef([]);

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();

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
      onMouseLeave={onMouseLeave}
      onClick={onClick}
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

function LangDropdown({ locale, theme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isLight = theme === "light";

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
          borderColor: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
          color: isLight ? "#121214" : "rgba(255,255,255,0.6)",
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
          background: isLight ? "#ffffff" : "rgba(20,20,24,0.98)",
          border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translate(-50%, 0) scale(1)" : "translate(-50%, -6px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {langs.map((lang) => {
          const isActive = lang.code === locale;
          return (
            <Link
              key={lang.code}
              href={`/${lang.code}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-5 py-3 text-sm transition-colors duration-150"
              style={{
                color: isActive ? (isLight ? "#121214" : "#ffffff") : (isLight ? "rgba(18,18,20,0.55)" : "rgba(255,255,255,0.5)"),
                background: isActive ? (isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.12)") : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              {isActive && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
              {!isActive && <span style={{ width: 12, display: "inline-block" }} />}
              {lang.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MenuPreviewItem({ service, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!service.video) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isActive) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isActive, service.video]);

  return (
    <div
      className="absolute inset-0 overflow-hidden transition-all duration-700 ease-in-out"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: "none",
        transform: isActive ? "scale(1)" : "scale(1.08)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {service.video ? (
        <video
          ref={videoRef}
          src={service.video}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        // next/image, not a raw <img>: the gallery stills behind these are up
        // to 2 MB each and all twelve previews mount together, so the menu
        // would otherwise pull ~10 MB for one 460px-wide box.
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 1024px) 50vw, 660px"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
      <div className="absolute bottom-6 left-6 z-10">
        <p className="text-[10px] uppercase tracking-widest mb-1.5 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
          SKLO Service Preview
        </p>
        <div className="overflow-hidden">
          <h4 className="text-lg font-bold uppercase tracking-wider" style={{ color: "#ffffff" }}>
            <span
              className="service-preview-title inline-block transition-transform duration-500 ease-out"
              style={{
                color: "#ffffff",
                transform: isActive ? "translateY(0)" : "translateY(100%)",
                transitionDelay: isActive ? "120ms" : "0ms",
              }}
            >
              {service.title}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default function Header({ t, locale, visible }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(initialTheme);

    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("sklo-theme", nextTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  // Media comes from the shared poster map so the menu, the homepage carousel
  // and the service pages all advertise a service with the same real image.
  const servicesList = [
    { id: "01", slug: "exterior-visualization", title: "EXTERIOR VISUALIZATION" },
    { id: "02", slug: "interior-visualization", title: "INTERIOR VISUALIZATION" },
    { id: "03", slug: "animation-mood-film", title: "ANIMATION | MOOD FILM" },
    { id: "04", slug: "bird-eye-visualization", title: "BIRD-EYE VISUALISATION" },
    { id: "05", slug: "360-virtual-tour", title: "360° VIRTUAL TOUR | VR" },
    { id: "06", slug: "cinemagraph-live-shot", title: "CINEMAGRAPH | LIVE SHOT" },
    { id: "07", slug: "product-visualization", title: "PRODUCT VISUALISATION" },
    { id: "08", slug: "virtual-staging", title: "VIRTUAL STAGING" },
    { id: "09", slug: "graphic-design", title: "GRAPHIC DESIGN" },
    { id: "10", slug: "3d-floorplans", title: "3D FLOORPLANS" },
    { id: "11", slug: "fly-around-navigator", title: "360° FLY-AROUND | NAVIGATOR" },
    { id: "12", slug: "web-development", title: "WEB DEVELOPMENT" },
  ].map((entry) => {
    const poster = serviceWideFor(entry.slug);
    return {
      ...entry,
      href: `/${locale}/services/${entry.slug}`,
      image: poster?.type === "image" ? poster.src : undefined,
      video: poster?.type === "video" ? poster.src : undefined,
    };
  });

  const navItems = [
    { key: "home",     label: t?.nav?.home     ?? "Home",     href: `/${locale}` },
    { key: "services", label: t?.nav?.services ?? "Services", href: `/${locale}/services` },
    { key: "gallery",  label: t?.nav?.gallery  ?? "Gallery",  href: `/${locale}/gallery`  },
    { key: "contact",  label: t?.nav?.contact  ?? "Contact",  href: `/${locale}/contact`  },
    { key: "about",    label: t?.nav?.about    ?? "About",    href: `/${locale}/about`    },
  ];

  // Two thresholds rather than one: the bar compacts at 40px and only expands
  // again below 12px. A single 20px line is crossed back and forth constantly
  // on a phone — inertial scrolling and the rubber-band at the top of the page
  // both oscillate around it — and each crossing re-ran the padding
  // transition, so the header pulsed between its two heights while the page
  // was barely moving.
  useEffect(() => {
    const onSkloScroll = (e) => {
      const y = e.detail.scrollY;
      setScrolled((prev) => (prev ? y > 12 : y > 40));
    };
    window.addEventListener("sklo-scroll", onSkloScroll);
    // Initial check
    setScrolled(window.scrollY > 40);
    return () => {
      window.removeEventListener("sklo-scroll", onSkloScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setServicesMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 150);
  };

  const checkIsActive = (href) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // The bar is a floating capsule rather than a full-bleed strip: over a hero
  // photograph a full-width bar has to fake its own legibility (the old
  // version washed a gradient over the top of every hero, which read as a
  // smear on dark footage), while a capsule has real edges, so the photograph
  // simply continues around it. `skin` is resolved in JS rather than through
  // another round of `:root[data-theme="light"]` overrides — see CLAUDE.md.
  const skin = (theme === "light"
    ? {
        rest:   { bg: "rgba(255,255,255,0.66)", border: "rgba(18,18,20,0.10)", shadow: "0 10px 30px rgba(22,24,32,0.10)" },
        active: { bg: "rgba(255,255,255,0.88)", border: "rgba(18,18,20,0.12)", shadow: "0 16px 40px rgba(22,24,32,0.14)" },
        panel:  "rgba(255,255,255,0.94)",
      }
    : {
        rest:   { bg: "rgba(12,13,17,0.42)", border: "rgba(255,255,255,0.10)", shadow: "0 10px 30px rgba(0,0,0,0.30)" },
        active: { bg: "rgba(12,13,17,0.74)", border: "rgba(255,255,255,0.14)", shadow: "0 16px 40px rgba(0,0,0,0.45)" },
        panel:  "rgba(10,10,12,0.94)",
      });
  const solid = scrolled || servicesMenuOpen;
  const surface = solid ? skin.active : skin.rest;
  const blur = `blur(${solid ? 24 : 18}px) saturate(160%)`;
  const barColor = theme === "light" ? "#15161a" : "#eceae6";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        // One height, always. The capsule answers scroll by getting denser —
        // more opaque, more blur, a stronger shadow — not by resizing, so
        // nothing under it ever has to reflow.
        padding: "14px 20px",
        // Only the capsule itself takes pointer events; the air around it
        // belongs to the page, so a hero button under the gap stays clickable.
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div
        className="relative mx-auto w-full max-w-[1280px]"
        style={{ pointerEvents: "auto" }}
      >
      <div
        className="flex items-center justify-between rounded-[20px]"
        style={{
          padding: "10px 12px 10px 18px",
          backgroundColor: surface.bg,
          border: `1px solid ${surface.border}`,
          boxShadow: surface.shadow,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          transition:
            "background-color 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease",
        }}
      >
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          <div className="relative w-9 h-9 shrink-0 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/LogoHeader.svg"
              alt="SKLO Logo"
              fill
              className="object-contain logo-image"
              priority
            />
          </div>
          <span
            className="text-[15px] font-bold uppercase tracking-[0.22em] leading-none"
            style={{ color: theme === "light" ? "#15161a" : "#eceae6" }}
          >
            SKLO
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2.5">
          {navItems.map(({ key, label, href }) => {
            const isServices = key === "services";
            const isActive = checkIsActive(href) || (isServices && servicesMenuOpen);
            return (
              <NavLink
                key={key}
                href={href}
                label={label}
                isActive={isActive}
                onMouseEnter={isServices ? handleMouseEnter : () => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setServicesMenuOpen(false);
                }}
                onMouseLeave={isServices ? handleMouseLeave : undefined}
                onClick={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setServicesMenuOpen(false);
                }}
              />
            );
          })}

          {/* A vertical rule used to sit here. Inside a capsule the edge already
              separates the navigation from the controls, so it was one mark
              doing nothing. */}
          <div className="w-3" />

          <LangDropdown locale={locale} theme={theme} />

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ml-2 cursor-pointer"
            style={{
              border: `1px solid ${surface.border}`,
              color: theme === "light" ? "#15161a" : "#eceae6",
              backgroundColor: theme === "light" ? "rgba(18,18,20,0.03)" : "rgba(255,255,255,0.05)",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          
          {/* Always here. It used to fade and slide in past 20px of scroll,
              which meant the control cluster changed width mid-scroll and
              pushed the navigation sideways — and the collapsed state had to
              zero out its own width and padding to avoid leaving a hole, so
              the button arrived in two stages. A primary action that is only
              offered after you scroll is also the wrong trade. */}
          <Link
            href={`/${locale}/contact`}
            className="header-cta ml-2.5 text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity duration-300 hover:opacity-85"
            style={{
              backgroundColor: theme === "light" ? "#15161a" : "#eceae6",
              color: theme === "light" ? "#f6f5f2" : "#0b0c10",
              whiteSpace: "nowrap",
            }}
          >
            Contact us
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
            style={{
              border: `1px solid ${surface.border}`,
              color: theme === "light" ? "#15161a" : "#eceae6",
              backgroundColor: theme === "light" ? "rgba(18,18,20,0.03)" : "rgba(255,255,255,0.05)",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-2 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ backgroundColor: barColor }} />
            <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ backgroundColor: barColor }} />
            <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ backgroundColor: barColor }} />
          </button>
        </div>
      </div>

      {/* Services Mega Menu Dropdown */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hidden md:block absolute left-0 right-0 overflow-hidden rounded-[20px]"
        style={{
          // Hangs 10px under the capsule instead of growing out of a bar that
          // spans the window, so the menu reads as the same object opening.
          top: "calc(100% + 10px)",
          background: skin.panel,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          border: `1px solid ${servicesMenuOpen ? surface.border : "transparent"}`,
          boxShadow: servicesMenuOpen ? surface.shadow : "none",
          // The panel keeps its height and is revealed by clip-path instead of
          // being animated open. Animating `height` relayouts the whole menu on
          // every frame, and at the closed end it left a 1px box that painted
          // its own background as a hairline under the header. The panel is
          // absolutely positioned, so a constant height costs no layout.
          height: "420px",
          clipPath: servicesMenuOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          opacity: servicesMenuOpen ? 1 : 0,
          transition: "clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          pointerEvents: servicesMenuOpen ? "auto" : "none",
        }}
      >
        <div className="w-full px-8 lg:px-10 h-full flex items-center justify-between gap-10 py-8">
          {/* Left Column: Image/Video Preview */}
          <div className="w-[46%] aspect-[21/9] relative rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-2xl shrink-0">
            {servicesList.map((service, idx) => (
              <MenuPreviewItem
                key={service.id}
                service={service}
                isActive={idx === activeServiceIndex}
              />
            ))}
          </div>

          {/* Vertical Divider */}
          <div
            className="w-[1px] h-[280px] shrink-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, ${surface.border}, transparent)`,
            }}
          />

          {/* Right Column: Numbered list of services */}
          <div className="w-[56%] grid grid-cols-2 gap-x-6 gap-y-2.5">
            {servicesList.map((service, idx) => {
              const isActive = idx === activeServiceIndex;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  onMouseEnter={() => setActiveServiceIndex(idx)}
                  onClick={() => setServicesMenuOpen(false)}
                  className="group flex items-center py-2 px-3 rounded-lg border border-transparent transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: isActive
                      ? (theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)")
                      : "transparent",
                    animationName: servicesMenuOpen ? "megaMenuSlideIn" : "none",
                    animationDuration: "0.5s",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    animationFillMode: "forwards",
                    animationDelay: `${idx * 25}ms`,
                    opacity: 0,
                  }}
                >
                  {/* Left accent line indicator */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-white transition-all duration-300"
                    style={{
                      transform: isActive ? "scaleY(1)" : "scaleY(0)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <span
                    className="font-mono text-xs tracking-wider mr-2 transition-all duration-300 flex items-center shrink-0"
                    style={{
                      color: isActive
                        ? (theme === "light" ? "#121214" : "#ffffff")
                        : (theme === "light" ? "rgba(18,18,20,0.35)" : "rgba(255,255,255,0.2)"),
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    {service.id}
                    <span
                      className="inline-block h-[1px] bg-white/30 transition-all duration-500 ease-out"
                      style={{
                        width: isActive ? "20px" : "0px",
                        marginLeft: isActive ? "8px" : "0px",
                        marginRight: isActive ? "8px" : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </span>
                  
                  <span
                    className="text-xs lg:text-sm font-semibold uppercase tracking-wider lg:tracking-widest transition-all duration-300 truncate"
                    style={{
                      color: isActive
                        ? (theme === "light" ? "#121214" : "#ffffff")
                        : (theme === "light" ? "rgba(18,18,20,0.55)" : "rgba(255,255,255,0.45)"),
                      transform: isActive ? "translateX(6px)" : "translateX(0)",
                    }}
                  >
                    {service.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <style>{`
          @keyframes megaMenuSlideIn {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>

      <div
        className={`md:hidden absolute left-0 right-0 overflow-hidden rounded-[20px] transition-all duration-300 ${
          menuOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
        style={{
          top: "calc(100% + 10px)",
          background: skin.panel,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          border: `1px solid ${menuOpen ? surface.border : "transparent"}`,
          boxShadow: menuOpen ? surface.shadow : "none",
        }}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {navItems.map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base py-1.5 transition-colors"
              style={{
                color: checkIsActive(href)
                  ? barColor
                  : (theme === "light" ? "rgba(18,18,20,0.62)" : "rgba(236,234,230,0.7)"),
                fontWeight: checkIsActive(href) ? "600" : "400",
              }}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-5" style={{ borderTop: `1px solid ${surface.border}` }}>
            <LangDropdown locale={locale} theme={theme} />
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMenuOpen(false)}
              className="header-cta text-center text-base font-semibold px-5 py-3 rounded-full"
              style={{
                backgroundColor: theme === "light" ? "#15161a" : "#eceae6",
                color: theme === "light" ? "#f6f5f2" : "#0b0c10",
              }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}