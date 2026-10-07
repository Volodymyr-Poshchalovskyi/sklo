"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Title3D from "@/components/Title3D";

export default function FAQ({ locale = "en", t }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true);
        } else {
          videoEl.pause();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    observer.observe(videoEl);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Playback has to start from its own effect, after React has committed the
  // `src`. The observer used to call play() inside a requestAnimationFrame
  // right after flipping `videoLoaded`, which ran before that commit: the
  // element still had no source, the play() promise rejected into the empty
  // catch, and since the observer never fires "entering" a second time the
  // background stayed on a black frame forever (readyState 0, networkState
  // NETWORK_NO_SOURCE). `preload="none"` means nothing loads until this runs.
  useEffect(() => {
    if (!videoLoaded) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (navigator.connection?.saveData === true) return;
    videoEl.play().catch(() => {});
  }, [videoLoaded]);

  // Every word of the questions and answers lives in the locale files; only
  // the shape of each answer (the ordered list, the inline link, the
  // highlighted discounts) is expressed here.
  const faq = t?.faq ?? {};
  const items = faq.items ?? {};
  const paragraphs = (list) => (
    <div className="flex flex-col gap-4">
      {(list ?? []).map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );

  const faqs = [
    {
      question: items.start?.q,
      answer: (
        <div>
          <p>{items.start?.p1}</p>
          <p className="mt-4">
            <Link
              href={`/${locale}/contact`}
              className="underline font-bold text-white hover:text-white/80 transition-colors duration-300"
            >
              {items.start?.linkText}
            </Link>{" "}
            {items.start?.linkTail}
          </p>
        </div>
      ),
    },
    {
      question: items.workflow?.q,
      answer: (
        <div className="flex flex-col gap-4">
          <p>{items.workflow?.intro}</p>
          <ol className="list-decimal pl-5 flex flex-col gap-4 mt-2">
            {(items.workflow?.steps ?? []).map((step) => (
              <li key={step.title}>
                <strong className="text-white">{step.title}</strong>
                <p className="mt-1 text-white/70">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      question: items.duration?.q,
      answer: paragraphs(items.duration?.paragraphs),
    },
    {
      question: items.pricing?.q,
      answer: paragraphs(items.pricing?.paragraphs),
    },
    {
      question: items.partnership?.q,
      answer: (
        <div className="flex flex-col gap-4">
          <p>{items.partnership?.p1}</p>
          <p>
            {items.partnership?.p2?.before}
            <strong className="text-white">{items.partnership?.p2?.strong}</strong>
            {items.partnership?.p2?.after}
          </p>
          <p>
            {items.partnership?.p3?.before}
            <strong className="text-white">{items.partnership?.p3?.strong}</strong>
            {items.partnership?.p3?.after}
          </p>
          <p>{items.partnership?.p4}</p>
        </div>
      ),
    },
  ];

  return (
    <section 
      className="faq-section section-shell hairline-top relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 overflow-hidden text-white flex flex-col justify-center"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        src={videoLoaded ? "/assets/services/animation-mood-film-wide.mp4" : undefined}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      />

      {/* Readability veil + edge fade. Both are theme tokens rather than a
          hardcoded #0d0d0f, so light mode is handled by the same markup
          instead of by attribute-selector overrides that hide these nodes. */}
      <div className="faq-veil absolute inset-0 z-0" />
      <div className="faq-fade absolute inset-0 z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full">
        {/* The heading column carries the supporting copy. The "ask us"
            call to action moved out to its own band after this section
            (CtaBand): inside the column it read as an afterthought. */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-32">
          <span className="eyebrow">{faq.eyebrow}</span>
          <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
            {faq.title}
          </Title3D>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-md">
            {faq.intro}
          </p>
        </div>

        <div className="flex flex-col w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-white/15 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full flex justify-between items-center gap-4 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent group cursor-pointer"
                >
                  <span className="text-lg sm:text-xl font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                    {faq.question}
                  </span>
                  {/* One glyph rotated 90° rather than swapping − / +, so the
                      marker morphs instead of popping between characters. */}
                  <span
                    className="relative shrink-0 w-9 h-9 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {/* Painted with currentColor off a `text-white/*` class:
                        the light-theme overrides remap text colours but not
                        `bg-white/70`, so a background utility here would stay
                        white-on-white in light mode. */}
                    <span
                      className="absolute w-3.5 h-px text-white/70 group-hover:text-white transition-colors duration-300"
                      style={{ backgroundColor: "currentColor" }}
                    />
                    <span
                      className="absolute w-3.5 h-px text-white/70 group-hover:text-white transition-all duration-300"
                      style={{
                        backgroundColor: "currentColor",
                        transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
                      }}
                    />
                  </span>
                </button>
                {/* 0fr → 1fr animates the row to the content's *real* height,
                    so the easing curve maps onto the distance actually
                    travelled (a fixed max-height spends most of its duration
                    animating empty space). */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="faq-answer grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl"
                      style={{ paddingTop: "0.5rem", paddingBottom: "2.5rem" }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
}