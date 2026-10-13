import Link from "next/link";
import { notFound } from "next/navigation";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { audiences, audienceBySlug, localizeAudience } from "@/data/audiences";
import { projects, localizeProject } from "@/data/projects";
import { servicesData, localizeService, serviceTitleFor } from "@/data/servicesData";
import { localizeServiceContent, formatPrice } from "@/data/serviceContent";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, humanizeTitle, absoluteUrl, JsonLd, SITE_URL } from "@/lib/seo";
import Title3D from "@/components/Title3D";
import ProjectCard from "@/components/ProjectCard";

const translations = { en, de };

export async function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const audience = audienceBySlug(slug);
  if (!audience) return {};
  const a = localizeAudience(audience, locale);
  const t = translations[locale] ?? translations.en;
  const title = t.audiences.titleTemplate.replace("{audience}", a.name);
  return pageMetadata({
    locale,
    path: `/for/${slug}`,
    title,
    description: a.lead.length > 158 ? `${a.lead.slice(0, 158).replace(/\s+\S*$/, "")}…` : a.lead,
    image: "/assets/og/services/exterior-visualization.jpg",
  });
}

export default async function AudiencePage({ params }) {
  const { locale, slug } = await params;
  const audience = audienceBySlug(slug);
  if (!audience) notFound();
  const t = translations[locale] ?? translations.en;
  const g = t.audiences;
  const a = localizeAudience(audience, locale);
  const title = g.titleTemplate.replace("{audience}", a.name);
  const services = a.services
    .map((s) => servicesData.find((x) => x.slug === s))
    .filter(Boolean)
    .map((s) => ({ ...localizeService(s, locale), ...localizeServiceContent(s.slug, locale) }));
  const cases = a.projects.map((p) => projects.find((x) => x.slug === p)).filter(Boolean).map((p) => localizeProject(p, locale));
  const others = audiences.filter((x) => x.slug !== slug).map((x) => localizeAudience(x, locale));

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          description: a.lead,
          url: absoluteUrl(`/${locale}/for/${slug}`),
          provider: { "@id": `${SITE_URL}/#organization` },
          audience: { "@type": "BusinessAudience", audienceType: a.name },
          areaServed: ["CH", "DE", "AT"].map((c) => ({ "@type": "Country", name: c })),
          serviceType: "Architectural visualization",
          inLanguage: locale,
        }}
      />
      <JsonLd data={faqJsonLd({ faq: a.faq })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: title, path: `/${locale}/for/${slug}` }])} />

      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <Title3D as="h1" className="lg:col-span-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase text-balance">{title}</Title3D>
          <p className="lg:col-span-6 lg:col-start-7 text-xl md:text-2xl text-white/90 leading-snug tracking-[-0.01em] max-w-[34ch] text-balance lg:pt-2">{a.lead}</p>
        </div>
      </section>

      <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{g.needsTitle}</Title3D>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
            {a.needs.map((n) => (
              <li key={n.answer} className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-x-10 gap-y-3 py-8 border-t border-white/10">
                <p className="text-base md:text-[17px] text-white/50 leading-snug max-w-[26ch]">{n.situation}</p>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg md:text-xl font-semibold text-white leading-snug tracking-[-0.01em] text-balance">{n.answer}</h3>
                  <p className="text-[15px] md:text-base text-white/70 leading-relaxed max-w-[58ch]">{n.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="mb-10">
          <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{g.servicesTitle.replace("{audience}", a.short)}</Title3D>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-white/10 md:[&:nth-child(2n)]:border-l md:[&:nth-child(2n)]:pl-6">
              <Link href={`/${locale}/services/${s.slug}`} className="group flex items-baseline justify-between gap-6 py-5 hover:bg-white/5 transition-colors">
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-white group-hover:underline underline-offset-4">{humanizeTitle(s.title.split("|")[0].trim())}</span>
                  <span className="text-sm text-white/60">{s.cardDesc}</span>
                </span>
                {s.investment && <span className="shrink-0 text-xs font-mono uppercase tracking-widest text-white/60">{g.from} {formatPrice(s.investment.from)}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {cases.length > 0 && (
        <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{g.projectsTitle.replace("{audience}", a.short)}</Title3D>
            <Link href={`/${locale}/projects`} className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white">{g.allProjects} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
            {cases.map((p, i) => <ProjectCard key={p.slug} project={p} locale={locale} index={i} />)}
          </div>
        </section>
      )}

      <section className="section-shell hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{g.faqTitle.replace("{audience}", a.short)}</Title3D>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
            {a.faq.map((f) => (
              <details key={f.q} className="group py-5 border-t border-white/10">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-base md:text-lg font-semibold text-white">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="mt-1 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 pr-10 text-sm md:text-base text-white/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-band hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-sm text-white/60">
            {g.alsoFor}{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/${locale}/for/${o.slug}`} className="text-white underline underline-offset-4 hover:no-underline">{o.short}</Link>
                {i < others.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] w-fit">
            {g.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
