"use client";
import ServicesCarousel from "@/components/ServicesCarousel";
import { servicePosterFor } from "@/data/galleryData";
import { serviceTitleFor } from "@/data/servicesData";
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
      title: serviceTitleFor(slide.slug, locale, slide.title),
      href: `/${locale}/services/${slide.slug}`,
      image: poster?.type === "image" ? poster.src : undefined,
      video: poster?.type === "video" ? poster.src : undefined,
    };
  });

  // Copy lives in the locale files; only the icons are component-local.
  const values = t?.home?.values ?? {};
  const valueItems = values.items ?? {};
  const value = (key, icon) => ({
    key,
    title: valueItems[key]?.title ?? "",
    desc: valueItems[key]?.desc ?? "",
    icon,
  });

  const leftFeatures = [
    value(
      "communication",
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 8h18a3 3 0 013 3v7a3 3 0 01-3 3H14l-6 5v-5H5a3 3 0 01-3-3v-7a3 3 0 013-3z" />
          <circle cx="9.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="19.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    ),
    value(
      "discounts",
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="10" cy="10" r="3.2" />
          <circle cx="22" cy="22" r="3.2" />
          <path d="M23 9L9 23" />
        </svg>
    ),
    value(
      "workflow",
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 9l2 2 4-4" />
          <path d="M15 9h12" />
          <path d="M5 16l2 2 4-4" />
          <path d="M15 16h12" />
          <path d="M5 23l2 2 4-4" />
          <path d="M15 23h12" />
        </svg>
    ),
  ];

  const rightFeatures = [
    value(
      "precision",
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="16" cy="16" r="10.5" />
          <circle cx="16" cy="16" r="6" />
          <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
        </svg>
    ),
    value(
      "quality",
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="4" y="6" width="24" height="20" rx="2.5" />
          <circle cx="11" cy="13" r="2.3" />
          <path d="M4 22l7-7 4.5 4.5L21 14l7 8" />
        </svg>
    ),
    value(
      "speed",
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="16" cy="18" r="10" />
          <path d="M16 18l4-5" />
          <path d="M12 3h8" />
          <path d="M16 3v3" />
        </svg>
    ),
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
            <span className="eyebrow">{t?.home?.services?.eyebrow}</span>
            <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
              {t?.home?.services?.title}
            </Title3D>
          </div>

          <ServicesCarousel
            items={slides}
            prevLabel={t?.gallery?.prevSlide}
            nextLabel={t?.gallery?.nextSlide}
            defaultHref={`/${locale}/services`}
            viewAllHref={`/${locale}/services`}
            viewAllLabel={t?.home?.services?.viewAll ?? "ALL SERVICES"}
          />
        </div>
      </section>

      <section
        className="section-shell section-band hairline-top w-full text-white py-16 md:py-32 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col"
      >
        <div className="w-full flex flex-col gap-8 md:gap-16">
          {/* Top Row: Heading on Left, Paragraph on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{values.eyebrow}</span>
              <Title3D className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">
                {values.title}
              </Title3D>
            </div>

            <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed lg:pt-3">
              <p>{values.intro}</p>
            </div>
          </div>

          {/* Bottom Rows: 3 pairs of values side-by-side with aligned dividers */}
          <div className="flex flex-col gap-5 md:gap-8">
            {featurePairs.map((pair, idx) => (
              <ValueRow
                key={pair.left.key}
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
  // Two columns at every width — a phone column is about 160px wide, so type,
  // icons and gaps all step down below `sm` and return to full size above it.
  // The icon also leaves the title's line there: side by side it would take a
  // third of the column and push every second title onto three lines.
  const divider = isLast ? "" : "border-b border-white/10 pb-5 md:pb-8";

  return (
    // No `items-start`: letting the two cells stretch to the row's height puts
    // their bottom borders on one line. Left and right descriptions are rarely
    // the same length, so aligned to their own content the dividers stepped.
    <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:gap-8 lg:gap-16">
      {[pair.left, pair.right].map((item) => (
        <div key={item.key} className={`flex flex-col ${divider}`}>
          <article className="flex flex-col gap-1.5 sm:gap-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <span className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 shrink-0">
                {item.icon}
              </span>
              {/* Two lines' worth of room on a phone: half the titles wrap and
                  half do not, and without it the descriptions in a row started
                  at two different heights. */}
              <h3 className="min-h-[1.9rem] sm:min-h-0 text-[11px] sm:text-lg font-bold tracking-[0.06em] sm:tracking-[0.12em] uppercase text-white leading-[1.3] sm:leading-snug">
                {item.title}
              </h3>
            </div>
            <p className="text-[11.5px] sm:text-[15px] text-white/60 leading-[1.5] sm:leading-relaxed">
              {item.desc}
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}
