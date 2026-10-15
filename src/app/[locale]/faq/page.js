import Link from "next/link";
import { translations } from "@/locales";
import { servicesData, localizeService } from "@/data/servicesData";
import { localizeServiceContent } from "@/data/serviceContent";
import { regions, localizeRegion } from "@/data/regions";
import { audiences, localizeAudience } from "@/data/audiences";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, humanizeTitle, JsonLd } from "@/lib/seo";
import Title3D from "@/components/Title3D";
import FaqHubClient from "./FaqHubClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({ locale, path: "/faq", title: t.faqHub.title, description: t.faqHub.intro.replace("{count} ", ""), image: "/assets/og/home.jpg" });
}

// The homepage FAQ keeps its answers in structured pieces (steps, paragraphs,
// a link line) for its own layout; here each becomes plain paragraphs joined
// by a blank line, which the client splits again and the search can read.
function generalFaq(items = {}) {
  const join = (parts) => parts.filter(Boolean).join("\n\n");
  return [
    items.start && { q: items.start.q, a: join([items.start.p1, items.start.linkText && `${items.start.linkText} ${items.start.linkTail ?? ""}`.trim()]), href: "/requirements" },
    items.workflow && { q: items.workflow.q, a: join([items.workflow.intro, ...(items.workflow.steps ?? []).map((s) => `${s.title}: ${s.desc}`)]) },
    items.duration && { q: items.duration.q, a: join(items.duration.paragraphs ?? []) },
    items.pricing && { q: items.pricing.q, a: join(items.pricing.paragraphs ?? []) },
    items.partnership && { q: items.partnership.q, a: join([items.partnership.p1, items.partnership.p2, items.partnership.p3, items.partnership.p4]) },
  ].filter((f) => f && f.q && f.a);
}

// Every question on the site in one place: four categories (working with us,
// services, audiences, markets), each split into the groups that have a page
// of their own. The server renders every answer into the HTML — the client
// only adds the search filter and the scroll-tracking navigation.
export default async function FaqHubPage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const h = t.faqHub;
  const page = (path) => `/${locale}${path}`;

  const categories = [
    {
      id: "general",
      title: h.categories.general,
      groups: [{ id: "general", title: h.categories.general, href: null, faq: generalFaq(t.faq?.items).map((f) => ({ ...f, href: f.href ? page(f.href) : undefined })) }],
    },
    {
      id: "services",
      title: h.categories.services,
      groups: servicesData.map((s) => ({
        id: s.slug,
        title: humanizeTitle(localizeService(s, locale).title.split("|")[0].trim()),
        href: page(`/services/${s.slug}`),
        faq: localizeServiceContent(s.slug, locale).faq ?? [],
      })),
    },
    {
      id: "audiences",
      title: h.categories.audiences,
      groups: audiences.map((a) => {
        const l = localizeAudience(a, locale);
        return { id: `for-${a.slug}`, title: l.name, href: page(`/for/${a.slug}`), faq: l.faq };
      }),
    },
    {
      id: "regions",
      title: h.categories.regions,
      groups: regions.map((r) => {
        const l = localizeRegion(r, locale);
        return { id: `region-${r.slug}`, title: l.name, href: page(`/regions/${r.slug}`), faq: l.faq };
      }),
    },
  ]
    .map((c) => ({ ...c, groups: c.groups.filter((g) => g.faq.length) }))
    .filter((c) => c.groups.length);

  const all = categories.flatMap((c) => c.groups.flatMap((g) => g.faq));

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd data={faqJsonLd({ faq: all })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: h.title, path: `/${locale}/faq` }])} />
      <section className="section-shell hairline-top w-full pt-16 md:pt-20 pb-8 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">{h.title}</Title3D>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">{h.intro.replace("{count}", String(all.length))}</p>
        </div>
      </section>
      <FaqHubClient
        categories={categories}
        labels={{
          searchLabel: h.searchLabel,
          searchPlaceholder: h.searchPlaceholder,
          clear: h.clear,
          results: h.results,
          noResults: h.noResults,
          noResultsCta: h.noResultsCta,
          onThisPage: h.onThisPage,
          toPage: h.toPage,
        }}
        contactHref={page("/contact")}
      />
      {/* The explainers and the glossary left the footer (2026-10-15); this
          line keeps them one click from a page every visitor can reach. */}
      <nav aria-label={h.furtherReading} className="w-full px-6 md:px-16 lg:px-28 xl:px-40 pt-12">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-sm text-white/60">
          <span>{h.furtherReading}</span>
          <Link href={page("/knowledge")} className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">{t.knowledge?.title}</Link>
          <Link href={page("/glossary")} className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">{t.glossary?.title}</Link>
        </div>
      </nav>
    </main>
  );
}
