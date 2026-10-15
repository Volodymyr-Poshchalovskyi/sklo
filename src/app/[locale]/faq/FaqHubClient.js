"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// Accents and case do not matter when searching: "preventa" finds
// "Preventa", "zurich" finds "Zürich".
const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Highlight({ text, query }) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRe(query)})`, "ig"));
  return parts.map((part, i) =>
    i % 2 ? (
      <mark key={i} className="bg-accent/25 text-white rounded-sm px-0.5 -mx-0.5">{part}</mark>
    ) : (
      part
    )
  );
}

function Answer({ text, query }) {
  return (
    <div className="flex flex-col gap-3 pt-3 pr-10 text-sm md:text-base text-white/70 leading-relaxed max-w-[65ch]">
      {text.split("\n\n").map((p, i) => (
        <p key={i}><Highlight text={p} query={query} /></p>
      ))}
    </div>
  );
}

export default function FaqHubClient({ categories, labels, contactHref }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(categories[0]?.groups[0]?.id);
  const q = fold(query.trim());
  const searching = q.length >= 2;

  // The filtered view: same tree, only the questions that match, empty
  // groups and categories dropped. Without a query it is the full tree.
  const view = useMemo(() => {
    if (!searching) return categories;
    return categories
      .map((c) => ({
        ...c,
        groups: c.groups
          .map((g) => ({ ...g, faq: g.faq.filter((f) => fold(`${f.q} ${f.a} ${g.title}`).includes(q)) }))
          .filter((g) => g.faq.length),
      }))
      .filter((c) => c.groups.length);
  }, [categories, q, searching]);

  const matchCount = view.reduce((n, c) => n + c.groups.reduce((m, g) => m + g.faq.length, 0), 0);

  // Scroll-spy: whichever group crosses the band just under the header is
  // the current one. An observer, not a scroll listener — the app has one
  // scroll listener and it lives in ClientWrapper.
  const contentRef = useRef(null);
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const sections = root.querySelectorAll("[data-faq-group]");
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [view]);

  const activeCategory = view.find((c) => c.groups.some((g) => g.id === active))?.id;

  // Only the category in view is expanded in the sidebar; when the marked
  // group would sit outside the sidebar's own scroll area, bring it in.
  const navRef = useRef(null);
  useEffect(() => {
    const link = navRef.current?.querySelector('[aria-current="location"]');
    if (!link) return;
    const nav = navRef.current;
    const top = link.offsetTop - nav.offsetTop;
    if (top < nav.scrollTop || top + link.offsetHeight > nav.scrollTop + nav.clientHeight) {
      nav.scrollTo({ top: top - nav.clientHeight / 3 });
    }
  }, [active]);

  // The phone chip row scrolls sideways; keep the current category's chip in it.
  const chipsRef = useRef(null);
  useEffect(() => {
    const chip = chipsRef.current?.querySelector('[aria-current="true"]');
    chip?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeCategory]);

  const searchField = (id) => (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{labels.searchLabel}</label>
      <svg aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
      </svg>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={labels.searchPlaceholder}
        autoComplete="off"
        className={`w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg pl-10 ${query ? "pr-16" : "pr-4"} py-3 text-sm text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors duration-300 [&::-webkit-search-cancel-button]:hidden`}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1.5 text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white"
        >
          {labels.clear}
        </button>
      )}
    </div>
  );

  return (
    <section className="w-full px-6 md:px-16 lg:px-28 xl:px-40 pb-8">
      {/* Phones and tablets: search and the four categories stay pinned under
          the header; the category row scrolls sideways if it has to. */}
      <div className="lg:hidden sticky top-[84px] z-20 -mx-6 md:-mx-16 px-6 md:px-16 pt-3 pb-3 bg-bg border-b border-white/10">
        {searchField("faq-search-mobile")}
        <nav ref={chipsRef} aria-label={labels.onThisPage} className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
          {view.map((c) => (
            <a
              key={c.id}
              href={`#cat-${c.id}`}
              aria-current={activeCategory === c.id ? "true" : undefined}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === c.id ? "border-white/50 text-white bg-white/[0.06]" : "border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {c.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pt-8 lg:pt-12">
        {/* Desktop: search on top, then the categories with their groups and
            question counts; the group in view is marked. */}
        <aside className="hidden lg:flex lg:col-span-4 xl:col-span-3 sticky top-28 max-h-[calc(100svh-8rem)] flex-col gap-6">
          {searchField("faq-search")}
          <nav ref={navRef} aria-label={labels.onThisPage} className="overflow-y-auto overscroll-contain pb-4 flex flex-col gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {view.map((c) => (
              <div key={c.id} className="flex flex-col gap-1">
                <a href={`#cat-${c.id}`} className={`text-sm font-semibold uppercase tracking-wider mb-1 transition-colors ${activeCategory === c.id ? "text-white" : "text-white/60 hover:text-white"}`}>
                  {c.title}
                </a>
                {(searching || activeCategory === c.id) &&
                  c.groups.filter((g) => g.href).map((g) => (
                    <a
                      key={g.id}
                      href={`#${g.id}`}
                      aria-current={active === g.id ? "location" : undefined}
                      className={`group flex items-baseline justify-between gap-3 border-l py-1 pl-3 text-sm transition-colors ${
                        active === g.id ? "border-white text-white" : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
                      }`}
                    >
                      <span className="truncate">{g.title}</span>
                      <span className="shrink-0 text-xs tabular-nums text-white/35">{g.faq.length}</span>
                    </a>
                  ))}
              </div>
            ))}
          </nav>
        </aside>

        <div ref={contentRef} className="lg:col-span-8 xl:col-span-8 xl:col-start-5 flex flex-col">
          {searching && (
            <p aria-live="polite" className="mb-8 text-sm text-white/60">
              {matchCount > 0 ? labels.results.replace("{count}", String(matchCount)) : null}
            </p>
          )}

          {searching && matchCount === 0 && (
            <div className="py-16 flex flex-col items-start gap-5">
              <p className="text-lg md:text-xl text-white">{labels.noResults.replace("{query}", query.trim())}</p>
              <Link href={contactHref} className="text-sm font-semibold uppercase tracking-widest text-accent hover:text-white transition-colors">
                {labels.noResultsCta} →
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-20 md:gap-24">
            {view.map((c) => (
              <section key={c.id} id={`cat-${c.id}`} aria-labelledby={`cat-${c.id}-title`} className="scroll-mt-48 lg:scroll-mt-28 flex flex-col gap-12">
                <h2 id={`cat-${c.id}-title`} className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">{c.title}</h2>
                {c.groups.map((g) => (
                  <div key={g.id} id={g.id} data-faq-group className="scroll-mt-48 lg:scroll-mt-28 flex flex-col">
                    {g.href && (
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-3">
                        <h3 className="text-lg md:text-xl font-semibold text-white">{g.title}</h3>
                        {g.href && (
                          <Link href={g.href} className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white">
                            {labels.toPage} →
                          </Link>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col border-b border-white/10">
                      {g.faq.map((f) => (
                        // Re-keyed when a search starts so every match opens;
                        // closing one by hand afterwards still works.
                        <details key={`${f.q}-${searching}`} open={searching || undefined} className="group py-4 border-t border-white/10">
                          <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-base md:text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
                            <span><Highlight text={f.q} query={searching ? query.trim() : ""} /></span>
                            <svg aria-hidden="true" className="mt-1.5 w-4 h-4 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" d="M8 2.5v11M2.5 8h11" />
                            </svg>
                          </summary>
                          <Answer text={f.a} query={searching ? query.trim() : ""} />
                          {f.href && (
                            <Link href={f.href} className="mt-3 inline-block text-sm text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">
                              {labels.toPage} →
                            </Link>
                          )}
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
