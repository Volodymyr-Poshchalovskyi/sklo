import Link from "next/link";
import { notFound } from "next/navigation";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { regions, regionBySlug, localizeRegion } from "@/data/regions";
import { projects, localizeProject } from "@/data/projects";
import { servicesData, localizeService, serviceTitleFor } from "@/data/servicesData";
import { localizeServiceContent, formatPrice } from "@/data/serviceContent";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, humanizeTitle, absoluteUrl, JsonLd, SITE_URL } from "@/lib/seo";
import Title3D from "@/components/Title3D";
import ProjectCard from "@/components/ProjectCard";

const translations = { en, de };

// "{in}" → "in der Schweiz" / "in Deutschland": the German preposition and
// article depend on the country, so they live in the region data.
const fill = (template = "", r) =>
  template.replace("{in}", r.phrases.in).replace("{for}", r.phrases.for).replace("{from}", r.phrases.from).replace("{region}", r.name);

export async function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const region = regionBySlug(slug);
  if (!region) return {};
  const r = localizeRegion(region, locale);
  const t = translations[locale] ?? translations.en;
  return pageMetadata({
    locale,
    path: `/regions/${slug}`,
    title: fill(t.regions.titleTemplate, r),
    description: r.lead.length > 158 ? `${r.lead.slice(0, 158).replace(/\s+\S*$/, "")}…` : r.lead,
    image: "/assets/og/home.jpg",
  });
}

export default async function RegionPage({ params }) {
  const { locale, slug } = await params;
  const region = regionBySlug(slug);
  if (!region) notFound();
  const t = translations[locale] ?? translations.en;
  const g = t.regions;
  const r = localizeRegion(region, locale);
  const title = fill(g.titleTemplate, r);
  const serviceLabel = (s) => humanizeTitle(serviceTitleFor(s, locale));
  const localProjects = projects.filter((p) => r.countries.includes(p.country)).map((p) => localizeProject(p, locale));
  const services = servicesData.map((s) => ({ ...localizeService(s, locale), ...localizeServiceContent(s.slug, locale) }));
  const otherRegions = regions.filter((x) => x.slug !== slug).map((x) => localizeRegion(x, locale));

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          description: r.lead,
          url: absoluteUrl(`/${locale}/regions/${slug}`),
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Place", name: r.name },
          serviceType: "Architectural visualization",
          inLanguage: locale,
        }}
      />
      <JsonLd data={faqJsonLd({ faq: r.faq })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "SKLO Studio", path: `/${locale}` },
          { name: title, path: `/${locale}/regions/${slug}` },
        ])}
      />

      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase text-balance">
              {title}
            </Title3D>
            <p className="text-xs font-mono uppercase tracking-widest text-white/50">{r.cities.join(" · ")}</p>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-xl md:text-2xl text-white/90 leading-snug tracking-[-0.01em] max-w-[32ch] text-balance lg:pt-2">
            {r.lead}
          </p>
        </div>

        {/* Market: three facts with sources, as a ruled row, not stat tiles. */}
        <dl className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {r.market.map((m) => (
            <div key={m.label} className="flex flex-col gap-3 py-8 md:pr-10 border-b border-white/10 md:border-b-0 md:border-r last:border-r-0 md:last:pr-0 md:[&:not(:first-child)]:pl-10">
              <dd className="text-3xl md:text-4xl font-bold tracking-tight text-white">{m.value}</dd>
              <dt className="text-sm md:text-[15px] text-white/70 leading-relaxed">{m.label}</dt>
              {m.source && <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">{m.source}</span>}
            </div>
          ))}
        </dl>
      </section>

      {/* What is specific here */}
      <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{fill(g.specificsTitle, r)}</Title3D>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
            {r.specifics.map((s) => (
              <div key={s.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-x-10 gap-y-3 py-8 border-t border-white/10">
                <h3 className="text-lg md:text-xl font-semibold text-white leading-snug tracking-[-0.01em] text-balance">{s.title}</h3>
                <p className="text-[15px] md:text-base text-white/70 leading-relaxed max-w-[58ch]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services with the "from" price in the local currency context */}
      <section className="section-shell hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="mb-10">
          <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{fill(g.servicesTitle, r)}</Title3D>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-t border-white/10">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-white/10 md:[&:nth-child(2n)]:border-l xl:[&:nth-child(2n)]:border-l-0 xl:[&:not(:nth-child(3n+1))]:border-l border-white/10">
              <Link href={`/${locale}/services/${s.slug}`} className="group flex items-baseline justify-between gap-6 px-0 md:px-6 py-5 hover:bg-white/5 transition-colors">
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-white group-hover:underline underline-offset-4">{humanizeTitle(s.title.split("|")[0].trim())}</span>
                  <span className="text-sm text-white/60">{s.cardDesc}</span>
                </span>
                {s.investment && (
                  <span className="shrink-0 text-xs font-mono uppercase tracking-widest text-white/60">
                    {g.from} {formatPrice(s.investment.from)}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects in this country */}
      {localProjects.length > 0 && (
        <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{fill(g.projectsTitle, r)}</Title3D>
            <Link href={`/${locale}/projects`} className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white">{g.allProjects} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
            {localProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} locale={locale} serviceLabel={serviceLabel} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-shell hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{fill(g.faqTitle, r)}</Title3D>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
            {r.faq.map((item) => (
              <details key={item.q} className="group py-5 border-t border-white/10">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-base md:text-lg font-semibold text-white">
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="mt-1 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 pr-10 text-sm md:text-base text-white/70 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other markets + CTA */}
      <section className="section-shell section-band hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-sm text-white/60">
            {g.alsoIn}{" "}
            {otherRegions.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/${locale}/regions/${o.slug}`} className="text-white underline underline-offset-4 hover:no-underline">{o.name}</Link>
                {i < otherRegions.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] w-fit"
          >
            {g.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
