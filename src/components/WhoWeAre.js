"use client";
import { useState, useEffect, useRef } from "react";
import ServicesCarousel from "@/components/ServicesCarousel";

export default function WhoWeAre({ locale, t }) {
  const [servicesInView, setServicesInView] = useState(false);
  const servicesSectionRef = useRef(null);

  const [whoInView, setWhoInView] = useState(false);
  const whoSectionRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "EXTERIOR VISUALIZATION",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 2,
      title: "INTERIOR VISUALIZATION",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 3,
      title: "360° VIRTUAL TOUR | VR",
      video: "/assets/home/360 services.mp4",
    },
    {
      id: 4,
      title: "ANIMATION | MOOD FILM",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 5,
      title: "BIRD-EYE VISUALIZATION",
      image: "/assets/home/3d tour.jpg",
    },
    {
      id: 6,
      title: "CINEMAGRAPH | LIVE SHOT",
      video: "/assets/home/cinemagraph services.mp4",
    },
    { id: 7, title: "3D FLOORPLAN", image: "/assets/home/3dplan_interior.jpg" },
    { id: 8, title: "360° FLY-AROUND", image: "/assets/home/3d tour.jpg" },
    { id: 9, title: "WEBSITE DEVELOPMENT", image: "/assets/home/3d tour.jpg" },
  ];

  const features = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
        </svg>
      ),
    },
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.21.9-4.21 2.34-5.66L4.93 4.93C3.12 6.74 2 9.24 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
      ),
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
      ),
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
        </svg>
      ),
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 5H5l3.5-4.5z" />
        </svg>
      ),
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const el = servicesSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesInView(true);
          observer.unobserve(el);
        }
      },
      {
        rootMargin: "-64px 0px -92% 0px",
      },
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const el = whoSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhoInView(true);
          observer.unobserve(el);
        }
      },
      {
        rootMargin: "-64px 0px -92% 0px",
      },
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <>
      <section
        ref={servicesSectionRef}
        className="w-full min-h-screen bg-[#0d0d0f] text-white py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40 border-t border-white/10 snap-start flex flex-col justify-center"
      >
        <div className="w-full flex flex-col gap-12 md:gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <h2
              className={`title-3d ${servicesInView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase`}
            >
              OUR SERVICES
            </h2>

            <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              <p>
                We offer a comprehensive suite of 3D rendering, motion design,
                and virtual visualization packages tailored specifically for
                modern real estate developments, architectural showcases, and
                product marketing.
              </p>
            </div>
          </div>

          <ServicesCarousel
            items={slides}
            defaultHref={`/${locale}/services`}
            viewAllHref={`/${locale}/services`}
            viewAllLabel={t?.whoWeAre?.viewAll ?? "ALL SERVICES"}
          />
        </div>
      </section>

      <section
        ref={whoSectionRef}
        className="w-full min-h-screen bg-[#0d0d0f] text-white py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40 border-t border-white/10 snap-start flex flex-col justify-center"
      >
        <div className="w-full flex flex-col gap-12 md:gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <h2
              className={`title-3d ${whoInView ? "animate-pop-3d" : ""} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase`}
            >
              WHO WE ARE
            </h2>

            <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              <p>
                We create stunning visualizations rooted in our deep
                understanding of architecture and interior design. Our
                professional background gives us a unique perspective, allowing
                us to merge creative vision with technical precision. We believe
                in a hands-on approach and dedicate ourselves to every project
                from start to finish. The result is high-quality renderings and
                animations that showcase a project&apos;s beauty and purpose.
              </p>
              <p className="text-white/60">
                We help architects, designers, and developers bring their
                visions to life. From a single image to a complete animation,
                our goal is to produce work that is not only effective but also
                inspiring and unforgettable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-5 items-start">
                <div className="flex-shrink-0 text-white/60 pt-1.5">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-white">
                    {feature.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
