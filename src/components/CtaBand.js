import Link from "next/link";

// A full-width call to action in its own section. It used to be a small tile
// tucked under the FAQ heading, where it competed with the questions and
// lost; here it is the last thing on the page before the footer, with the
// room to be read.
export default function CtaBand({ locale, t }) {
  const f = t?.faq ?? {};
  return (
    <section className="section-shell hairline-top w-full py-16 md:py-20 px-6 md:px-16 lg:px-28 xl:px-40">
      <div className="ink-card w-full rounded-3xl px-7 py-8 md:px-12 md:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            {f.bandTitle}
          </h2>
          <p className="text-sm md:text-base opacity-70 leading-relaxed max-w-xl">
            {f.bandCopy}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={`/${locale}/contact`}
            className="ink-card-btn group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-7 py-4 rounded-full transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t?.hero?.contact}
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="mailto:info@sklo.studio"
            className="ink-card-ghost inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-7 py-4 rounded-full border transition-colors duration-300"
          >
            {f.bandEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
