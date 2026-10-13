import Link from "next/link";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { servicesData, localizeService, serviceTitleFor } from "@/data/servicesData";
import { localizeServiceContent } from "@/data/serviceContent";
import { regions, localizeRegion } from "@/data/regions";
import { audiences, localizeAudience } from "@/data/audiences";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, humanizeTitle, JsonLd } from "@/lib/seo";
import Title3D from "@/components/Title3D";

const translations = { en, de };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({ locale, path: "/faq", title: t.faqHub.title, description: t.faqHub.intro, image: "/assets/og/home.jpg" });
}

// Every question on the site in one place, grouped by what it is about, each
// group linking to its page. One URL that answers the long-tail searches,
// with the full FAQPage data in the HTML.
export default async function FaqHubPage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const h = t.faqHub;
  const groups = [
    ...servicesData.map((s) => {
      const c = localizeServiceContent(s.slug, locale);
      return { id: s.slug, title: humanizeTitle(localizeService(s, locale).title.split("|")[0].trim()), href: `/${locale}/services/${s.slug}`, faq: c.faq ?? [] };
    }),
    ...audiences.map((a) => {
      const l = localizeAudience(a, locale);
      return { id: `for-${a.slug}`, title: l.name, href: `/${locale}/for/${a.slug}`, faq: l.faq };
    }),
    ...regions.map((r) => {
      const l = localizeRegion(r, locale);
      return { id: `region-${r.slug}`, title: l.name, href: `/${locale}/regions/${r.slug}`, faq: l.faq };
    }),
  ].filter((g) => g.faq.length);
  const all = groups.flatMap((g) => g.faq);

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd data={faqJsonLd({ faq: all })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: h.title, path: `/${locale}/faq` }])} />
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-14">
          <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">{h.title}</Title3D>
          <div className="flex flex-col gap-5 lg:pt-3">
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">{h.intro.replace("{count}", String(all.length))}</p>
            <nav aria-label={h.jumpTo} className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-widest text-white/50">
              {groups.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="hover:text-white">{g.title}</a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          {groups.map((g) => (
            <section key={g.id} id={g.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start scroll-mt-28">
              <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">{g.title}</h2>
                <Link href={g.href} className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white w-fit">{h.toPage} →</Link>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
                {g.faq.map((f) => (
                  <details key={f.q} className="group py-4 border-t border-white/10">
                    <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-base md:text-lg font-semibold text-white">
                      <span>{f.q}</span>
                      <span aria-hidden="true" className="mt-1 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="pt-3 pr-10 text-sm md:text-base text-white/70 leading-relaxed max-w-[62ch]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
