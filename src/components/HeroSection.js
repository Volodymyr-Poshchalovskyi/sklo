"use client";
import {videoSrc, videoPoster} from "@/lib/media";
import { useVideoTier } from "@/lib/videoTier";
import { useEffect, useRef, useContext, useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import { HERO_READY_EVENT } from "@/components/ClientWrapper";
import Link from "next/link";

// Fallback for the rotating line. The live list comes from `t.hero.words`,
// which is a module-level JSON import and therefore just as stable across
// renders — an inline array literal would restart the cycle on every parent
// render.
const ROTATING_WORDS = ["architects", "developers", "real estate"];

const LETTER_STAGGER = 28; // ms between neighbouring letters
const FLIP_OUT_MS = 380;
const FLIP_IN_MS = 460;

// Time until the LAST letter of an n-letter word has finished flipping.
const flipDuration = (length, base) => (length - 1) * LETTER_STAGGER + base;

function RotatingWord({ words = ROTATING_WORDS, hold = 1800 }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in");
  // The global CSS rule only shortens each letter flip; the rotation itself is
  // a JS loop, so it kept swapping the headline word forever for a reader who
  // asked for less motion.
  const [still, setStill] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  const holdTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  const letters = words[index].split("");
  const isOut = phase === "out";
  const lastLetter = letters.length - 1;

  const advance = () => {
    setIndex((i) => (i + 1) % words.length);
    setPhase("in");
  };

  // The swap is driven by the LAST letter's animationend rather than a timer.
  // A timer starts counting when the effect commits, but the CSS animation only
  // starts on the next style recalc — measured ~30ms later — so a duration-based
  // timer always fired while the final letters were still mid-flip, and the new
  // word visibly replaced them instead of following them.
  const handleLetterEnd = (i) => {
    if (still) return;
    if (i !== lastLetter) return;
    if (isOut) {
      advance();
    } else {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = setTimeout(() => setPhase("out"), hold);
    }
  };

  // Safety net: if animationend never arrives (backgrounded tab, animations
  // disabled) the rotation still progresses rather than stalling forever.
  useEffect(() => {
    const base = isOut ? FLIP_OUT_MS : FLIP_IN_MS;
    const settled = flipDuration(letters.length, base);
    const wait = settled + (isOut ? 0 : hold) + 400;

    fallbackTimerRef.current = setTimeout(() => {
      if (isOut) {
        setIndex((i) => (i + 1) % words.length);
        setPhase("in");
      } else {
        setPhase("out");
      }
    }, wait);

    return () => clearTimeout(fallbackTimerRef.current);
  }, [index, phase, letters.length, isOut, hold, words.length]);

  useEffect(() => () => {
    clearTimeout(holdTimerRef.current);
    clearTimeout(fallbackTimerRef.current);
  }, []);

  return (
    // `text-white` is explicit: this sits inside the `text-white/40` "for" line
    // and would otherwise inherit that 40% opacity.
    <span className="inline-block text-white" style={{ perspective: "600px" }}>
      {letters.map((char, i) => (
        <span
          key={`${index}-${i}`}
          className="inline-block"
          onAnimationEnd={() => handleLetterEnd(i)}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            backfaceVisibility: "hidden",
            animationName: isOut ? "letterFlipOut" : "letterFlipIn",
            animationDuration: `${(isOut ? FLIP_OUT_MS : FLIP_IN_MS) / 1000}s`,
            animationTimingFunction: isOut
              ? "cubic-bezier(0.55,0,1,0.45)"
              : "cubic-bezier(0.16,1,0.3,1)",
            // "both", not "forwards": a letter waiting out its stagger delay
            // must already sit in the first keyframe (hidden). With
            // "forwards" every letter of the new word showed at full opacity
            // for its delay and only then flipped — the visible jolt between
            // words.
            animationFillMode: "both",
            animationDelay: `${i * LETTER_STAGGER}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection({ t, locale }) {
  const tier = useVideoTier();
  const ready = useContext(LoaderContext);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const videoRef = useRef(null);
  const forRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // 7.8 MB of film is a poor greeting for someone on a metered connection,
    // and motion nobody asked for is a poor one for anybody.
    const stillness =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      navigator.connection?.saveData === true;

    // Tell ClientWrapper the film can play (or won't): that is what the
    // loader waits for. `playing` covers the autoplay path, `loadeddata` the
    // stillness path where only the first frame is fetched, `error` both.
    const announce = () => {
      if (window.__skloHeroReady) return;
      window.__skloHeroReady = true;
      window.dispatchEvent(new Event(HERO_READY_EVENT));
    };
    if (videoEl.readyState >= 2) announce();
    videoEl.addEventListener("playing", announce);
    videoEl.addEventListener("loadeddata", announce);
    videoEl.addEventListener("error", announce);
    const cleanupAnnounce = () => {
      videoEl.removeEventListener("playing", announce);
      videoEl.removeEventListener("loadeddata", announce);
      videoEl.removeEventListener("error", announce);
    };
    if (stillness) {
      videoEl.load();
      return cleanupAnnounce;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch((err) => {
            // Ignore play interruption/autoplay restrictions
          });
        } else {
          videoEl.pause();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.01,
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
      cleanupAnnounce();
    };
  }, []);



  // Heading + buttons fade-in
  // Entrance, in one sequence (ease-out-expo, the motion-design skill's
  // marketing-hero curve): the headline's words rise out of their own masks
  // (in the markup below), then the FOR line, the description and the
  // buttons follow.
  useEffect(() => {
    if (!ready) return;
    const els = [forRef.current, subRef.current, btnsRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      const delay = 1250 + i * 150;
      el.style.transition = `opacity 1.1s cubic-bezier(.165,.84,.44,1) ${delay}ms, transform 1.1s cubic-bezier(.165,.84,.44,1) ${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, [ready]);

  // Scroll: the film drifts down at a third of the scroll speed while the
  // text lifts away and fades, so leaving the hero has depth. Listens to the
  // app's one scroll broadcast (see ClientWrapper), writes transforms only.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!media || !content) return;
    const onScroll = (e) => {
      const y = e.detail?.scrollY ?? window.scrollY;
      const h = window.innerHeight;
      if (y > h * 1.2) return;
      media.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
      content.style.transform = `translate3d(0, ${-y * 0.06}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - y / (h * 0.9)));
    };
    window.addEventListener("sklo-scroll", onScroll);
    return () => window.removeEventListener("sklo-scroll", onScroll);
  }, []);



  const hidden = { opacity: 0, transform: "translateY(16px)" };

  return (
    <section className="hero-section relative min-h-[100svh] flex items-end">
      {/* Autoplay is decided in an effect, not by the attribute: a reader who
          asked for reduced motion, or whose browser reports a metered
          connection, gets the first frame and nothing else. */}
      {/* The film and its veils move together for the scroll parallax; the
          film itself settles from a slight zoom once, on arrival. */}
      <div ref={mediaRef} className={`hero-media absolute inset-0 will-change-transform ${ready ? "is-in" : ""}`}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        // The first frame as a still: it paints long before the film can
        // play, so the page has its largest element on screen within the
        // first second instead of after the loader lets the heading in.
        poster={videoPoster("/assets/home/hero_video.webm")}
        className={`hero-film absolute inset-0 w-full h-full object-cover ${ready ? "is-in" : ""}`}
        style={{ pointerEvents: "none" }}
      >
        {/* One tier per connection; see src/lib/media.js. The VP9 webm is
            the HD file, the SD one is a 1280px H.264 at a fifth of the size. */}
        <source src={videoSrc("/assets/home/hero_video.webm", tier)} type={tier === "hd" ? "video/webm" : "video/mp4"} />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-6 md:px-16 lg:px-28 xl:px-40 pt-24 pb-24">
        {/* The film is the point of the hero, so the text keeps to the
            edges: headline and buttons bottom-left, the descriptive sentence
            small in the bottom-right corner on desktop (under the headline
            on phones). Grid areas rather than DOM order, so the <h1> stays
            where it is for readers and crawlers. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-end gap-x-16">
          {/* The big animated line is the visual headline, not the document
              heading: its last word rotates. The <h1> is the static sentence
              below it — the service, the market, the deliverables. */}
          <p
            ref={headRef}
            className="font-bold leading-[1.05] tracking-tight text-white mb-6 lg:col-span-2"
          >
            {/* `whitespace-nowrap` waits for `lg`: at the md size the headline
                is 72px, which is 804px of unbreakable text in a 768px window —
                the whole page scrolled sideways on a tablet. */}
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:whitespace-nowrap">
              {/* Each word rises out of its own mask. The second, lighter
                  word is optional: German says the whole thing in one noun. */}
              {[
                ...(t?.hero?.headlineLead ?? "Visualization").split(" ").map((w) => ({ w, accent: false })),
                ...(t?.hero?.headlineAccent ? t.hero.headlineAccent.split(" ").map((w) => ({ w, accent: true })) : []),
              ].map(({ w, accent }, i, all) => (
                <span key={i}>
                  <span
                    className={`inline-block ${accent ? "text-white/90" : ""}`}
                    style={{
                      opacity: 0,
                      animationName: ready ? "heroWordIn" : "none",
                      animationDuration: "1.3s",
                      animationTimingFunction: "cubic-bezier(.165,.84,.44,1)",
                      animationFillMode: "both",
                      animationDelay: `${650 + i * 120}ms`,
                    }}
                  >
                    {w}
                  </span>
                  {i < all.length - 1 ? " " : null}
                </span>
              ))}
            </span>
            <span ref={forRef} style={hidden} className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium text-white/40 tracking-[0.2em] uppercase mt-4">
              {t?.hero?.for ?? "for"}
              <RotatingWord words={t?.hero?.words?.length ? t.hero.words : ROTATING_WORDS} />
            </span>
          </p>

          <h1
            ref={subRef}
            style={hidden}
            className="text-sm md:text-[15px] font-normal text-white/80 leading-relaxed max-w-[44ch] [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] mb-8 lg:mb-0 lg:col-start-2 lg:row-start-2 lg:pl-6 lg:border-l lg:border-white/25"
          >
            {t?.hero?.subtitle}
          </h1>

          <div ref={btnsRef} style={hidden} className="flex flex-wrap gap-3 lg:col-start-1 lg:row-start-2">
            <Link
              href={`/${locale}/services`}
              className="black-shimmer hero-cta-primary group inline-flex items-center gap-2 font-semibold text-[15px] px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "rgba(255, 255, 255, 0.12)", color: "#ffffff", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
            >
              {t.hero.cta}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="hero-cta-secondary group inline-flex items-center gap-2 border border-white/50 bg-black/30 text-white font-medium text-[15px] px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:bg-black/50 hover:border-white/80 hover:scale-[1.03]"
            >
              {t.hero.contact}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .black-shimmer {
          position: relative;
        }
        .black-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2.5px;
          background: linear-gradient(
            90deg,
            #000000 0%,
            #000000 30%,
            #888888 50%,
            #000000 70%,
            #000000 100%
          );
          background-size: 200% 100%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: blackShimmer 3.2s ease-in-out infinite;
        }
        @keyframes blackShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        /* Arrival, in one calm sequence (motion-design skill: ease-in-out
           for the frame that is already on screen and changes shape,
           ease-out-quart for what enters):
           1. the film opens like a window — a rounded frame widening to the
              full bleed while the picture settles from a slight zoom;
           2. the headline's words surface out of a soft blur, one by one;
           3. the FOR line, the description and the buttons follow. */
        .hero-media {
          clip-path: inset(13% 9% 13% 9% round 28px);
        }
        .hero-media.is-in {
          animation: heroFrameOpen 1.7s cubic-bezier(.77,0,.175,1) 0.1s both;
        }
        @keyframes heroFrameOpen {
          from { clip-path: inset(13% 9% 13% 9% round 28px); }
          to   { clip-path: inset(0% 0% 0% 0% round 0px); }
        }
        .hero-film { transform: scale(1.14); }
        .hero-film.is-in {
          animation: heroFilmSettle 2.6s cubic-bezier(.165,.84,.44,1) 0.1s both;
        }
        @keyframes heroFilmSettle {
          from { transform: scale(1.14); }
          to   { transform: scale(1); }
        }
        @keyframes heroWordIn {
          from { opacity: 0; transform: translateY(0.3em); filter: blur(10px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-media, .hero-media.is-in { clip-path: none; animation: none; }
          .hero-film, .hero-film.is-in { transform: none; animation: none; }
        }
        @keyframes letterFlipOut {
          0%   { transform: translateY(0) rotateX(0deg);           opacity: 1; filter: blur(0); }
          100% { transform: translateY(-0.25em) rotateX(75deg);    opacity: 0; filter: blur(3px); }
        }
        @keyframes letterFlipIn {
          0%   { transform: translateY(0.25em) rotateX(-75deg);    opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0) rotateX(0deg);           opacity: 1; filter: blur(0); }
        }
      `}</style>
    </section>
  );
}