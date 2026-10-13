import Link from "next/link";
import Title3D from "@/components/Title3D";

// Two rows of links on the home page — who we work for, where we work —
// that hand the home page's weight to the audience and market pages. Plain
// rows on hairlines, like every list on the site.
function Row({ title, items, base, locale }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-4">
        <Title3D className="text-2xl md:text-3xl font-bold uppercase tracking-wider">{title}</Title3D>
      </div>
      <ul className="lg:col-span-7 lg:col-start-6 flex flex-col border-b border-white/10">
        {items.map((item) => (
          <li key={item.slug} className="border-t border-white/10">
            <Link href={`/${locale}/${base}/${item.slug}`} className="group flex items-baseline justify-between gap-6 py-4">
              <span className="text-base md:text-lg font-semibold text-white group-hover:underline underline-offset-4">{item.name}</span>
              <span className="text-sm text-white/55 text-right max-w-[40ch] hidden sm:block">{item.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeLinks({ locale, t, audiences, regions }) {
  const h = t?.home?.links ?? {};
  return (
    <section className="section-shell hairline-top w-full text-white py-20 md:py-28 px-6 md:px-16 lg:px-28 xl:px-40 flex flex-col gap-16 md:gap-20">
      <Row title={h.forTitle} items={audiences} base="for" locale={locale} />
      <Row title={h.whereTitle} items={regions} base="regions" locale={locale} />
    </section>
  );
}
