"use client";
import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { LoaderContext } from "@/context/LoaderContext";
import useRevealOnSettle from "@/hooks/useRevealOnSettle";

export default function FAQ({ locale = "en" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const ready = useContext(LoaderContext);
  const inView = useRevealOnSettle(sectionRef, ready);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true);
          requestAnimationFrame(() => {
            if (videoEl) videoEl.play().catch(() => {});
          });
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

  const faqs = [
    {
      question: "What do we need to start a project?",
      answer: (
        <div>
          <p>
            We begin with your 3D-model or drawings and a brief describing the mood, materials, and goals of your project. Using our structured onboarding system, our team refines your model and translates all inputs into high-end visuals.
          </p>
          <p className="mt-4">
            <Link 
              href={`/${locale}/contact`} 
              className="underline font-bold text-white hover:text-white/80 transition-colors duration-300"
            >
              Click here
            </Link>{" "}
            to get the full list of needed materials.
          </p>
        </div>
      ),
    },
    {
      question: "What’s the project workflow?",
      answer: (
        <div className="flex flex-col gap-4">
          <p>Each project goes through the following key stages:</p>
          <ol className="list-decimal pl-5 flex flex-col gap-4 mt-2">
            <li>
              <strong className="text-white">1. Discovery Stage</strong>
              <p className="mt-1 text-white/70">
                The client provides all necessary input materials. At this stage, we also prepare a cost estimate and a project timeline.
              </p>
            </li>
            <li>
              <strong className="text-white">2. Modeling & Optimization</strong>
              <p className="mt-1 text-white/70">
                We create or refine the 3D model based on all provided drawings and references, ensuring accuracy and efficiency for the visualization process.
              </p>
            </li>
            <li>
              <strong className="text-white">3. Cameras & Atmosphere Setup</strong>
              <p className="mt-1 text-white/70">
                We produce greyscale renderings to define and approve the best camera angles and overall atmosphere for your project.
              </p>
            </li>
            <li>
              <strong className="text-white">4. Color Previews</strong>
              <p className="mt-1 text-white/70">
                The client receives fully textured and colored renders with the selected views and atmosphere. We collect all feedback at this stage and prepare the images for final rendering.
              </p>
            </li>
            <li>
              <strong className="text-white">5. Final High-End Images</strong>
              <p className="mt-1 text-white/70">
                The client receives high-resolution final visualizations ready for presentations, marketing, and publications.
              </p>
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "How long does a project take?",
      answer: (
        <div className="flex flex-col gap-4">
          <p>
            The project timeline is always individual and depends on its complexity, goals, scale, input quality, response speed, and many other factors.
          </p>
          <p>
            Smaller projects usually take around 7 working days, although the first drafts are typically delivered within the first few days after kickoff.
          </p>
          <p>
            We understand that deadlines are often tight, so we organize our team efficiently to deliver as quickly as possible while keeping the entire process transparent and well-communicated with daily updates.
          </p>
          <p>
            Before starting, every client receives a preliminary schedule outlining all key stages and we strictly follow it throughout the collaboration.
          </p>
        </div>
      ),
    },
    {
      question: "How is pricing calculated?",
      answer: (
        <div className="flex flex-col gap-4">
          <p>
            Our pricing depends on the project type (exterior or interior visualizations, animations, 360° tours, etc.), its goals, scale, and deadlines. We offer flexible pricing and prepare a custom offer for each project before we begin.
          </p>
          <p>
            In addition, we have a clear partnership discount program for both new and returning clients designed to create long-term, mutually beneficial collaboration.
          </p>
        </div>
      ),
    },
    {
      question: "Any partnership programs?",
      answer: (
        <div className="flex flex-col gap-4">
          <p>
            Yes, we have an ongoing system of discounts, offers, and bonuses for both new and returning clients.
          </p>
          <p>
            Every new client receives a <strong className="text-white">30% discount</strong> — this allows you to explore our services and workflow without spending too much on your first project.
          </p>
          <p>
            For future collaborations, we offer a simple and transparent referral program: if you recommend our services to colleagues, friends or partners and it leads to a new project, both of you receive a <strong className="text-white">15% discount</strong> on your next one. There are no limits and you can benefit from our partner program as often as you like.
          </p>
          <p>
            Additionally, every client receives exclusive free bonuses after project completion — materials that help you present your project even more effectively.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="faq-section section-shell hairline-top relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 overflow-hidden text-white flex flex-col justify-center"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        src={videoLoaded ? "/assets/home/faqsection.mp4" : undefined}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      />

      {/* Readability veil + edge fade. Both are theme tokens rather than a
          hardcoded #0d0d0f, so light mode is handled by the same markup
          instead of by attribute-selector overrides that hide these nodes. */}
      <div className="faq-veil absolute inset-0 z-0" />
      <div className="faq-fade absolute inset-0 z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full">
        {/* The heading column used to hold nothing but the word "FAQS", leaving
            half the section empty. It now carries the supporting copy and a
            direct route out for anyone whose question isn't listed. */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-32">
          <span className="eyebrow">Good to know</span>
          <h2
            className={`title-3d ${inView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase`}
          >
            FAQS
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-md">
            The questions we get asked most — about materials, timelines,
            pricing and how a project actually runs from kickoff to final
            renders.
          </p>

          <div className="tile no-lift flex flex-col gap-4 p-6 mt-2 max-w-md">
            <p className="text-sm text-white/70 leading-relaxed">
              Still not sure about something? Tell us about the project and
              we&apos;ll come back with specifics.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 w-fit text-xs font-semibold tracking-widest uppercase border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full transition-all duration-300"
            >
              Ask us directly
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
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
                  className="w-full flex justify-between items-center gap-4 py-7 text-left focus:outline-none group cursor-pointer"
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