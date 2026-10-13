import Link from "next/link";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { localizeRequirements } from "@/data/requirements";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, absoluteUrl, JsonLd, SITE_URL } from "@/lib/seo";
import Title3D from "@/components/Title3D";

const translations = { en, de };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({ locale, path: "/requirements", title: t.requirements.title, description: t.requirements.intro, image: "/assets/og/contact.jpg" });
}

export default async function RequirementsPage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const r = t.requirements;
  const data = localizeRequirements(locale);

  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: r.title,
          description: r.intro,
          url: absoluteUrl(`/${locale}/requirements`),
          supply: data.groups.flatMap((g) => g.items.map((i) => ({ "@type": "HowToSupply", name: `${g.title}: ${i}` }))),
          step: data.after.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
          inLanguage: locale,
        }}
      />
      <JsonLd data={faqJsonLd({ faq: data.faq })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: r.title, path: `/${locale}/requirements` }])} />

      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        {/* The German title is one 20-letter word: it gets the full width,
            and the download button and the lead share the row below. */}
        <Title3D as="h1" className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-balance hyphens-auto [overflow-wrap:anywhere]">{r.title}</Title3D>
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <a
            href={data.pdf.href}
            download={data.pdf.name}
            className="lg:col-span-4 inline-flex items-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] w-fit"
          >
            {r.download}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4v12M6 10l6 6 6-6M5 20h14" /></svg>
          </a>
          <p className="lg:col-span-7 lg:col-start-6 text-xl md:text-2xl text-white/90 leading-snug tracking-[-0.01em] max-w-[36ch] text-balance">{r.intro}</p>
        </div>

        {/* The six groups as a numbered checklist on hairlines. The number
            carries meaning here: the PDF uses the same order. */}
        <ol className="mt-16 md:mt-20 flex flex-col border-b border-white/10">
          {data.groups.map((g, i) => (
            <li key={g.id} id={g.id} className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4 py-9 border-t border-white/10 scroll-mt-28">
              <div className="lg:col-span-4 flex items-baseline gap-4">
                <span className="text-xs font-mono text-white/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug tracking-[-0.01em]">{g.title}</h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-4">
                <p className="text-[15px] md:text-base text-white/60">{g.lead}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] md:text-base text-white/85 leading-relaxed">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-[7px] w-3.5 h-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8.5l3.5 3.5 7.5-8" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-white/50 leading-relaxed max-w-[60ch]">{g.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-shell section-band hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-4">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{r.afterTitle}</Title3D>
            <p className="text-base text-white/60 leading-relaxed max-w-md">{r.afterIntro}</p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
            {data.after.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 py-6 border-t border-white/10">
                <span className="text-xs font-mono text-white/40 tabular-nums pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-semibold text-white leading-snug">{s.title}</h3>
                  <p className="text-[15px] text-white/70 leading-relaxed max-w-[58ch]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell hairline-top w-full py-16 md:py-24 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Title3D className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{r.faqTitle}</Title3D>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
            {data.faq.map((f) => (
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
          <p className="text-base md:text-lg text-white/80 max-w-xl">{r.ctaCopy}</p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] w-fit shrink-0">
            {r.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
