"use client";
import ServicesCarousel from "@/components/ServicesCarousel";
import { servicePosterFor } from "@/data/galleryData";
import Title3D from "@/components/Title3D";

export default function WhoWeAre({ locale, t }) {

  // Media is resolved from the shared poster map (see galleryData.js) rather
  // than hardcoded, so these cards show the same real work as the header menu
  // and the service pages. Six of the nine used to repeat one placeholder.
  const slides = [
    { id: 1, slug: "exterior-visualization", title: "EXTERIOR VISUALIZATION" },
    { id: 2, slug: "interior-visualization", title: "INTERIOR VISUALIZATION" },
    { id: 3, slug: "360-virtual-tour", title: "360° VIRTUAL TOUR | VR" },
    { id: 4, slug: "web-development", title: "WEB DEVELOPMENT" },
    { id: 5, slug: "animation-mood-film", title: "ANIMATION | MOOD FILM" },
    { id: 6, slug: "bird-eye-visualization", title: "BIRD-EYE VISUALIZATION" },
    { id: 7, slug: "cinemagraph-live-shot", title: "CINEMAGRAPH | LIVE SHOT" },
    { id: 8, slug: "3d-floorplans", title: "3D FLOORPLAN" },
    { id: 9, slug: "product-visualization", title: "PRODUCT VISUALISATION" },
    { id: 10, slug: "virtual-staging", title: "VIRTUAL STAGING" },
  ].map((slide) => {
    const poster = servicePosterFor(slide.slug);
    return {
      ...slide,
      href: `/${locale}/services/${slide.slug}`,
      image: poster?.type === "image" ? poster.src : undefined,
      video: poster?.type === "video" ? poster.src : undefined,
    };
  });

  const leftFeatures = [
    {
      title: "CLEAR COMMUNICATION",
      desc: "Smooth communication and iterative feedback ensure you're never left guessing. We keep the process transparent from start to finish.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 8h18a3 3 0 013 3v7a3 3 0 01-3 3H14l-6 5v-5H5a3 3 0 01-3-3v-7a3 3 0 013-3z" />
          <circle cx="9.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="19.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: "DISCOUNTS AND BONUSES",
      desc: "We provide exclusive offers for both new and returning clients.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="10" cy="10" r="3.2" />
          <circle cx="22" cy="22" r="3.2" />
          <path d="M23 9L9 23" />
        </svg>
      ),
    },
    {
      title: "SEAMLESS WORKFLOW",
      desc: "Our process is smooth and transparent, guiding you from concept to final render with clear stages and timely updates.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 9l2 2 4-4" />
          <path d="M15 9h12" />
          <path d="M5 16l2 2 4-4" />
          <path d="M15 16h12" />
          <path d="M5 23l2 2 4-4" />
          <path d="M15 23h12" />
        </svg>
      ),
    },
  ];

  const rightFeatures = [
    {
      title: "DESIGN PRECISION",
      desc: "With a deep background in design and architecture, we translate drawings into visuals that remain true to your vision while enhancing presentation impact.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="16" cy="16" r="10.5" />
          <circle cx="16" cy="16" r="6" />
          <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: "EXCEPTIONAL IMAGE QUALITY",
      desc: "We craft visuals with stunning realism, precise detail, and perfect lighting designed to showcase your project at its very best and leave a lasting impression.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="4" y="6" width="24" height="20" rx="2.5" />
          <circle cx="11" cy="13" r="2.3" />
          <path d="M4 22l7-7 4.5 4.5L21 14l7 8" />
        </svg>
      ),
    },
    {
      title: "SPEED & RELIABILITY",
      desc: "We know deadlines are always tight. Our workflow is optimized for fast delivery without compromising quality.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="16" cy="18" r="10" />
          <path d="M16 18l4-5" />
          <path d="M12 3h8" />
          <path d="M16 3v3" />
        </svg>
      ),
    },
  ];

  const featurePairs = [
    { left: leftFeatures[0], right: rightFeatures[0] },
    { left: leftFeatures[1], right: rightFeatures[1] },
    { left: leftFeatures[2], right: rightFeatures[2] },
  ];

  return (
    <>
      <section
        className="section-shell hairline-top w-full text-white py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col"
      >
        <div className="w-full flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-4 pt-4 md:pt-6">
            <span className="eyebrow">What we do</span>
            <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
              OUR SERVICES
            </Title3D>
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
        className="section-shell section-band hairline-top w-full text-white py-24 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col"
      >
        <div className="w-full flex flex-col gap-12 md:gap-16">
          {/* Top Row: Heading on Left, Paragraph on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">The studio</span>
              <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
                OUR VALUES
              </Title3D>
            </div>

            <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed lg:pt-3">
              <p>
                We help architects, designers, and developers bring their
                visions to life. From a single image to a complete animation,
                our goal is to produce work that is not only effective but also
                inspiring and unforgettable.
              </p>
            </div>
          </div>

          {/* Bottom Rows: 3 pairs of values side-by-side with aligned dividers */}
          <div className="flex flex-col gap-8">
            {featurePairs.map((pair, idx) => (
              <ValueRow
                key={pair.left.title}
                pair={pair}
                isLast={idx === featurePairs.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// One row of two values. The values carry no entrance animation: they are the
// plain-spoken part of the page, and a staggered fade on six short paragraphs
// only delayed reading them.
function ValueRow({ pair, isLast }) {
  const divider = isLast ? "" : "border-b border-white/10 pb-8";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      {[pair.left, pair.right].map((item) => (
        <div key={item.title} className={`flex flex-col ${divider}`}>
          <article className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-white/70 shrink-0">{item.icon}</span>
              <h3 className="text-base sm:text-lg font-bold tracking-[0.12em] uppercase text-white leading-snug">
                {item.title}
              </h3>
            </div>
            <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">
              {item.desc}
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}
