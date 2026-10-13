import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { localizeGlossary } from "@/data/glossary";
import { pageMetadata, breadcrumbJsonLd, absoluteUrl, JsonLd } from "@/lib/seo";
import Title3D from "@/components/Title3D";

const translations = { en, de };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({ locale, path: "/glossary", title: t.glossary.title, description: t.glossary.intro, image: "/assets/og/home.jpg" });
}

export default async function GlossaryPage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const g = t.glossary;
  const terms = localizeGlossary(locale);
  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: g.title,
          url: absoluteUrl(`/${locale}/glossary`),
          inLanguage: locale,
          hasDefinedTerm: terms.map((x) => ({
            "@type": "DefinedTerm",
            "@id": absoluteUrl(`/${locale}/glossary#${x.slug}`),
            name: x.term,
            description: x.def,
          })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: g.title, path: `/${locale}/glossary` }])} />
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-14">
          <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">{g.title}</Title3D>
          <p className="text-base md:text-lg text-white/70 leading-relaxed lg:pt-3 max-w-xl">{g.intro}</p>
        </div>
        <dl className="flex flex-col border-b border-white/10">
          {terms.map((x) => (
            <div key={x.slug} id={x.slug} className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-x-10 gap-y-2 py-6 border-t border-white/10 scroll-mt-28">
              <dt className="text-base md:text-lg font-semibold text-white leading-snug">{x.term}</dt>
              <dd className="text-[15px] md:text-base text-white/70 leading-relaxed max-w-[62ch]">{x.def}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
