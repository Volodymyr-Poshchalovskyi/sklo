import Link from "next/link";
import { notFound } from "next/navigation";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { knowledge, knowledgeBySlug, localizeKnowledge } from "@/data/knowledge";
import { serviceTitleFor } from "@/data/servicesData";
import { localizeServiceContent, formatPrice } from "@/data/serviceContent";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, humanizeTitle, absoluteUrl, JsonLd, SITE_URL } from "@/lib/seo";
import Title3D from "@/components/Title3D";

const translations = { en, de };

export async function generateStaticParams() {
  return knowledge.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = knowledgeBySlug(slug);
  if (!article) return {};
  const a = localizeKnowledge(article, locale);
  const d = a.definition;
  return pageMetadata({
    locale,
    path: `/knowledge/${slug}`,
    title: a.title,
    description: d.length > 158 ? `${d.slice(0, 158).replace(/\s+\S*$/, "")}…` : d,
    image: "/assets/og/home.jpg",
    type: "article",
  });
}

export default async function KnowledgeArticle({ params }) {
  const { locale, slug } = await params;
  const article = knowledgeBySlug(slug);
  if (!article) notFound();
  const t = translations[locale] ?? translations.en;
  const k = t.knowledge;
  const a = localizeKnowledge(article, locale);
  const services = a.services.map((s) => ({ slug: s, name: humanizeTitle(serviceTitleFor(s, locale).split("|")[0].trim()), investment: localizeServiceContent(s, locale).investment }));
  const related = a.related.map((r) => knowledgeBySlug(r)).filter(Boolean).map((r) => localizeKnowledge(r, locale));

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.definition,
          url: absoluteUrl(`/${locale}/knowledge/${slug}`),
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: locale,
          // The definition paragraph is what a voice assistant should read.
          speakable: { "@type": "SpeakableSpecification", cssSelector: [".speakable-definition"] },
          about: services.map((s) => ({ "@type": "Service", name: s.name, url: absoluteUrl(`/${locale}/services/${s.slug}`) })),
        }}
      />
      <JsonLd data={faqJsonLd({ faq: a.faq })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: k.title, path: `/${locale}/knowledge` }, { name: a.title, path: `/${locale}/knowledge/${slug}` }])} />

      <article className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-6">
            <Link href={`/${locale}/knowledge`} className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white w-fit">← {k.title}</Link>
            <Title3D as="h1" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-balance">{a.title}</Title3D>
            {services.length > 0 && (
              <div className="flex flex-col border-t border-white/10 mt-2">
                {services.map((s) => (
                  <Link key={s.slug} href={`/${locale}/services/${s.slug}`} className="flex items-baseline justify-between gap-4 py-3 border-b border-white/10 text-sm hover:text-white text-white/70">
                    <span className="font-semibold text-white">{s.name}</span>
                    {s.investment && <span className="font-mono text-xs uppercase tracking-widest text-white/50">{k.from} {formatPrice(s.investment.from)}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-10">
            {/* The definition is the answer: first, large, quotable. */}
            <p className="speakable-definition text-xl md:text-2xl text-white/90 leading-snug tracking-[-0.01em] max-w-[36ch] text-balance">{a.definition}</p>
            {a.sections.map((s) => (
              <section key={s.h} className="flex flex-col gap-3 pt-8 border-t border-white/10">
                <h2 className="text-lg md:text-xl font-semibold text-white leading-snug tracking-[-0.01em]">{s.h}</h2>
                {s.body.map((para, i) => (
                  <p key={i} className="text-[15px] md:text-base text-white/75 leading-relaxed max-w-[62ch]">{para}</p>
                ))}
              </section>
            ))}
            <section className="flex flex-col pt-8 border-t border-white/10">
              <h2 className="text-lg md:text-xl font-semibold text-white leading-snug mb-2">{k.faqTitle}</h2>
              <div className="flex flex-col border-b border-white/10">
                {a.faq.map((f) => (
                  <details key={f.q} className="group py-4 border-t border-white/10">
                    <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-base font-semibold text-white">
                      <span>{f.q}</span>
                      <span aria-hidden="true" className="mt-1 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="pt-3 pr-10 text-sm md:text-[15px] text-white/70 leading-relaxed max-w-[62ch]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
            {related.length > 0 && (
              <section className="flex flex-col gap-3 pt-8 border-t border-white/10">
                <h2 className="text-sm font-mono uppercase tracking-widest text-white/50">{k.related}</h2>
                {related.map((r) => (
                  <Link key={r.slug} href={`/${locale}/knowledge/${r.slug}`} className="text-base md:text-lg font-semibold text-white underline underline-offset-4 hover:no-underline w-fit">{r.title}</Link>
                ))}
              </section>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
