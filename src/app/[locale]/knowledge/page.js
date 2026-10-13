import Link from "next/link";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { knowledge, localizeKnowledge } from "@/data/knowledge";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import Title3D from "@/components/Title3D";

const translations = { en, de };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  return pageMetadata({ locale, path: "/knowledge", title: t.knowledge.title, description: t.knowledge.intro, image: "/assets/og/home.jpg" });
}

export default async function KnowledgePage({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const k = t.knowledge;
  const list = knowledge.map((a) => localizeKnowledge(a, locale));
  return (
    <main className="w-full min-h-screen text-white flex flex-col pt-24 md:pt-28 pb-24">
      <JsonLd data={breadcrumbJsonLd([{ name: "SKLO Studio", path: `/${locale}` }, { name: k.title, path: `/${locale}/knowledge` }])} />
      <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-14">
          <Title3D as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest uppercase">{k.title}</Title3D>
          <p className="text-base md:text-lg text-white/70 leading-relaxed lg:pt-3 max-w-xl">{k.intro}</p>
        </div>
        <ol className="flex flex-col border-b border-white/10">
          {list.map((a) => (
            <li key={a.slug} className="border-t border-white/10">
              <Link href={`/${locale}/knowledge/${a.slug}`} className="group grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-10 gap-y-3 py-7 hover:bg-white/5 transition-colors md:px-4 md:-mx-4">
                <h2 className="text-lg md:text-xl font-semibold text-white leading-snug tracking-[-0.01em] text-balance group-hover:underline underline-offset-4">{a.title}</h2>
                <p className="text-[15px] md:text-base text-white/70 leading-relaxed max-w-[60ch]">{a.definition}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
