"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function FAQ({ locale = "en" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        rootMargin: "-64px 0px -92% 0px",
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch((err) => {
            // Ignore autoplay restrictions
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
      className="relative w-full min-h-screen py-20 px-6 md:px-16 lg:px-28 xl:px-40 overflow-hidden bg-[#0d0d0f] text-white border-t border-white/10 snap-start flex flex-col justify-center"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      >
        <source src="/assets/home/faqsection.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to ensure readability */}
      <div className="absolute inset-0 bg-[#0d0d0f]/85 z-0" />
      
      {/* Top and Bottom soft fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f] via-transparent to-[#0d0d0f] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start w-full">
        <h2 
          className={`title-3d ${inView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase shrink-0 lg:w-1/3`}
        >
          FAQS
        </h2>
        
        <div className="flex flex-col w-full lg:w-2/3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-white/15 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex justify-between items-center py-10 text-left focus:outline-none group cursor-pointer"
                >
                  <span className="text-xl sm:text-2xl font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className="text-3xl sm:text-4xl font-light ml-4 text-white/60 group-hover:text-white transition-colors duration-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[1200px] opacity-100 pb-10 pt-2" : "max-h-0 opacity-0 pb-0 pt-0"
                  }`}
                >
                  <div className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .title-3d {
          color: #ffffff;
          display: inline-block;
          cursor: default;
          will-change: transform, text-shadow;
        }
        .title-3d.animate-pop-3d {
          animation: pop3D 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pop3D {
          0% {
            transform: translate(0, 0);
            text-shadow: 0 0 0 transparent;
          }
          100% {
            transform: translate(-5px, -5px);
            text-shadow: 
              1px 1px 0px #d4d4d8,
              2px 2px 0px #d4d4d8,
              3px 3px 0px #d4d4d8,
              4px 4px 0px #d4d4d8,
              5px 5px 0px #d4d4d8,
              6px 6px 0px #d4d4d8,
              7px 7px 15px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </section>
  );
}