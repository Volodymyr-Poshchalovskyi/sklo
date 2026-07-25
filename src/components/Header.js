"use client";
import Link from "next/link";
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
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
      <div className="absolute bottom-6 left-6 z-10">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-mono">
          SKLO Service Preview
        </p>
        <div className="overflow-hidden">
          <h4 className="text-lg font-bold uppercase tracking-wider text-white">
            <span
              className="inline-block transition-transform duration-500 ease-out"
              style={{
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
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(initialTheme);

    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
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

  const servicesList = [
    { id: "01", title: "EXTERIOR VISUALIZATION", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-0` },
    { id: "02", title: "INTERIOR VISUALIZATION", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-1` },
    { id: "03", title: "ANIMATION | MOOD FILM", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-2` },
    { id: "04", title: "BIRD-EYE VISUALISATION", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-3` },
    { id: "05", title: "360° VIRTUAL TOUR | VR", video: "/assets/home/360 services.mp4", href: `/${locale}/services#service-4` },
    { id: "06", title: "CINEMAGRAPH | LIVE SHOT", video: "/assets/home/cinemagraph services.mp4", href: `/${locale}/services#service-5` },
    { id: "07", title: "PRODUCT VISUALISATION", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-6` },
    { id: "08", title: "VIRTUAL STAGING", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-7` },
    { id: "09", title: "GRAPHIC DESIGN", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-8` },
    { id: "10", title: "3D FLOORPLANS", image: "/assets/home/3dplan_interior.jpg", href: `/${locale}/services#service-9` },
    { id: "11", title: "MEDIA & WEBSITE PACKAGES", image: "/assets/home/3d tour.jpg", href: `/${locale}/services#service-10` },
  ];

  const navItems = [
    { key: "home",     label: t?.nav?.home     ?? "Home",     href: `/${locale}` },
    { key: "services", label: t?.nav?.services ?? "Services", href: `/${locale}/services` },
    { key: "gallery",  label: t?.nav?.gallery  ?? "Gallery",  href: `/${locale}/gallery`  },
    { key: "contact",  label: t?.nav?.contact  ?? "Contact",  href: `/${locale}/contact`  },
    { key: "about",    label: t?.nav?.about    ?? "About",    href: `/${locale}/about`    },
  ];

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: scrolled ? "1.05rem 0" : "1.65rem 0",
        borderBottom: (scrolled && !servicesMenuOpen) ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        background: (scrolled || servicesMenuOpen) ? "rgba(10,10,12,0.85)" : "transparent",
        backdropFilter: "blur(24px) saturate(180%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition:
          "opacity 0.7s ease, transform 0.7s ease, padding 0.5s ease, background 0.5s ease",
      }}
    >
      <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <div className="relative w-12 h-12 overflow-hidden rounded-md transition-all duration-300 group-hover:scale-110 group-hover:rounded-lg">
            <Image 
              src="/LogoHeader.svg" 
              alt="SKLO Logo" 
              fill 
              className="object-cover logo-image" 
              priority 
            />
          </div>
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

          <div className="w-px h-5 bg-white/20 mx-4" />

          <LangDropdown locale={locale} />
          
          {/* Theme Switcher Button */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 ml-4 cursor-pointer"
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
          
          <Link
            href={`/${locale}/contact`}
            className={`ml-4 text-base font-semibold px-7 py-3 rounded-full bg-white text-black transition-all duration-500 hover:bg-white/80 ${
              scrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            Contact us
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
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
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Services Mega Menu Dropdown */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hidden md:block absolute left-0 right-0 overflow-hidden"
        style={{
          top: "100%",
          background: "rgba(10,10,12,0.85)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: servicesMenuOpen ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          height: servicesMenuOpen ? "420px" : "0px",
          opacity: servicesMenuOpen ? 1 : 0,
          transition: "height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, border-color 0.3s ease",
          pointerEvents: servicesMenuOpen ? "auto" : "none",
        }}
      >
        <div className="w-full px-6 md:px-16 lg:px-24 h-full flex items-center justify-between gap-12 py-8">
          {/* Left Column: Image/Video Preview */}
          <div className="w-[36%] h-[320px] relative rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-2xl shrink-0">
            {servicesList.map((service, idx) => (
              <MenuPreviewItem
                key={service.id}
                service={service}
                isActive={idx === activeServiceIndex}
              />
            ))}
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-[280px] bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0" />

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
                    background: isActive ? "rgba(255,255,255,0.03)" : "transparent",
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
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.2)",
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
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
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