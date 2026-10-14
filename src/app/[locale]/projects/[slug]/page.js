import Link from "next/link";
import { notFound } from "next/navigation";
import { translations } from "@/locales";
import { projects, projectBySlug, localizeProject, COUNTRY_NAMES } from "@/data/projects";
import { serviceTitleFor } from "@/data/servicesData";
import { pageMetadata, breadcrumbJsonLd, humanizeTitle, absoluteUrl, JsonLd, SITE_URL } from "@/lib/seo";
import { imageVariant, imageSrcSet, videoSrc, videoPoster } from "@/lib/media";
import { blurStyle } from "@/lib/blur";
import Title3D from "@/components/Title3D";
import TourEmbed from "@/components/TourEmbed";
import ProjectCard from "@/components/ProjectCard";
import { pickL } from "@/lib/i18n";


export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  const localized = localizeProject(project, locale);
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${localized.name}, ${localized.city}`,
    description: localized.summary.length > 158 ? `${localized.summary.slice(0, 158).replace(/\s+\S*$/, "")}…` : localized.summary,
    // The hero render itself, from R2 — share cards accept a full URL.
    image: localized.heroItem ? imageVariant(localized.heroItem.src, 1280) : undefined,
    type: "article",
  });
}

function Paragraphs({ text, className }) {
  return (text ?? []).map((para, i) => (
    <p key={i} className={className}>{para}</p>
  ));
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const t = translations[locale] ?? translations.en;
  const p = t.projects;
  const d = localizeProject(project, locale);
  const serviceLabel = (s) => humanizeTitle(serviceTitleFor(s, locale));
  const country = COUNTRY_NAMES[d.country]?.[locale] ?? d.country;
  const others = projects.filter((x) => x.slug !== slug).slice(0, 3).map((x) => localizeProject(x, locale));

  return (
    <main className="w-full min-h-screen text-white flex flex-col pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${d.name}, ${d.city}`,
          description: d.summary,
          url: absoluteUrl(`/${locale}/projects/${slug}`),
          image: d.items.filter((i) => i.type === "image").map((i) => imageVariant(i.src, 1920)),
          creator: { "@id": `${SITE_URL}/#organization` },
          dateCreated: String(d.year),
          locationCreated: { "@type": "Place", name: `${d.city}, ${country}`, address: { "@type": "PostalAddress", addressLocality: d.city, addressCountry: d.country } },
          inLanguage: locale,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "SKLO Studio", path: `/${locale}` },
          { name: p.title, path: `/${locale}/projects` },
          { name: d.name, path: `/${locale}/projects/${slug}` },
        ])}
      />

      {/* Hero: the key render full-bleed, the name over it. */}
      <section className="relative w-full h-[70svh] min-h-[420px] flex items-end overflow-hidden" style={d.heroItem ? blurStyle(d.heroItem.src) : undefined}>
        {d.heroItem && (
          <img
            src={imageVariant(d.heroItem.src, 1920)}
            srcSet={imageSrcSet(d.heroItem.src)}
            sizes="100vw"
            alt={`${d.name}, ${d.city}`}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-28 xl:px-40 pb-12 md:pb-16 flex flex-col gap-4">
          <Link href={`/${locale}/projects`} className="text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white w-fit">
            ← {p.title}
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-white" style={{ textShadow: "0 2px 24px rgba(0,0,0,.5)" }}>
            {d.name}
          </h1>
          <p className="text-base md:text-lg text-white/85" style={{ textShadow: "0 1px 12px rgba(0,0,0,.5)" }}>
            {d.city}, {country} · {d.type} · {d.year}
          </p>
        </div>
      </section>

      {/* Facts + summary */}
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-xl">{d.summary}</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <div className="flex flex-col gap-1">
              <dt className="text-[10px] font-bold uppercase tracking-widest text-accent">{p.clientLabel}</dt>
              <dd className="text-white/80">{d.client}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[10px] font-bold uppercase tracking-widest text-accent">{p.servicesLabel}</dt>
              <dd className="text-white/80 flex flex-wrap gap-x-2 gap-y-1">
                {d.services.map((s, i) => (
                  <span key={s}>
                    <Link href={`/${locale}/services/${s}`} className="underline underline-offset-2 hover:text-white">{serviceLabel(s)}</Link>
                    {i < d.services.length - 1 ? "," : ""}
                  </span>
                ))}
              </dd>
            </div>
            {d.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <dt className="text-[10px] font-bold uppercase tracking-widest text-accent">{f.label}</dt>
                <dd className="text-white/80">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story: challenge → approach → result, with the metrics beside the result */}
      <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col gap-14 md:gap-20">
          {[["challenge", d.challenge], ["approach", d.approach], ["result", d.result]].map(([key, text]) => (
            <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
              <div className="flex flex-col gap-3">
                <span className="eyebrow">{p[`${key}Eyebrow`]}</span>
                <Title3D className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider uppercase">{p[`${key}Title`]}</Title3D>
              </div>
              <div className="flex flex-col gap-5 text-base md:text-lg text-white/75 leading-relaxed lg:pt-2">
                <Paragraphs text={text} />
                {key === "result" && (
                  <dl className="grid grid-cols-3 gap-4 pt-4">
                    {d.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-1 border-l border-white/15 pl-4">
                        <dd className="text-2xl md:text-3xl font-bold tracking-tight text-white">{m.value}</dd>
                        <dt className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-white/60">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Renders */}
      <section className="section-shell hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">{p.galleryEyebrow}</span>
          <Title3D className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider uppercase">{p.galleryTitle}</Title3D>
        </div>
        <div className="columns-1 md:columns-2 gap-6">
          {d.items.map((item) => (
            <div
              key={item.id}
              className="relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              style={{ aspectRatio: `${item.width} / ${item.height}`, ...blurStyle(item.src) }}
            >
              {item.type === "video" ? (
                <video
                  src={videoSrc(item.src, "sd")}
                  poster={videoPoster(item.src)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={imageVariant(item.src, 1920)}
                  srcSet={imageSrcSet(item.src)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={pickL(locale, item.alt, item.altDe, item.alt) ?? `${d.name}, ${d.city}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
        {d.tourItem && (
          <div className="mt-12 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">{p.tourEyebrow}</span>
              <Title3D className="text-2xl md:text-3xl font-bold tracking-wider uppercase">{p.tourTitle}</Title3D>
            </div>
            {/* The tour keeps its own file; the window is titled after the project. */}
            <TourEmbed tours={[{ ...d.tourItem, title: d.name }]} locale={locale} />
          </div>
        )}
      </section>

      {/* CTA + more projects */}
      <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{p.moreEyebrow}</span>
            <Title3D className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider uppercase">{p.moreTitle}</Title3D>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] w-fit"
          >
            {p.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          {others.map((project, index) => (
            <ProjectCard key={project.slug} project={project} locale={locale} serviceLabel={serviceLabel} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
