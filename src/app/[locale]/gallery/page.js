"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import { useLenis } from "@/context/LenisContext";
import { galleryItems, allProjectsItems, virtualStagingPairs, serviceTourFor, ALL_PROJECTS_EXCLUDED } from "@/data/galleryData";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import LightboxVideo from "@/components/LightboxVideo";
import TourEmbed from "@/components/TourEmbed";
import Title3D from "@/components/Title3D";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = { en, de };

function GalleryCard({ item, onClick, label }) {
  const videoRef = useRef(null);

  // A film that fades up from black showed a black tile at rest and started
  // its hover preview on nothing. `item.start` moves the resting frame — and
  // the start of every hover — past the fade.
  const seekToStart = () => {
    const el = videoRef.current;
    if (!el || !item.start) return;
    if (el.currentTime < item.start) el.currentTime = item.start;
  };

  // On a phone there is no hover, so a video tile sat on its first frame with
  // nothing to say it was a film — in a category the page itself calls
  // "cinematic architectural films". Where the pointer is coarse, playback
  // follows the viewport instead, the way the services listing already does.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || item.type !== "video") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "0px", threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type]);

  // Seeking needs the metadata, and the `onLoadedMetadata` prop alone misses
  // it: the element comes from the server markup, so the browser has often
  // read the metadata before React ever attaches a handler. This catches both
  // orders — already loaded, or still to come.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !item.start) return;
    if (el.readyState >= 1) {
      seekToStart();
      return;
    }
    el.addEventListener("loadedmetadata", seekToStart, { once: true });
    return () => el.removeEventListener("loadedmetadata", seekToStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.start, item.src]);

  const handleMouseEnter = () => {
    if (item.type === "video" && videoRef.current) {
      seekToStart();
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      seekToStart();
    }
  };

  // The tile takes the media's own aspect ratio, so the `object-cover` below
  // has nothing left to crop — a 16:9 render stays 16:9, a 3:4 one stays 3:4,
  // and no format is silently trimmed to fit a fixed box.
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
      className="gallery-tile relative w-full bg-white/5 overflow-hidden rounded-lg group cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-300"
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          preload="metadata"
          onLoadedMetadata={seekToStart}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Image
          src={item.src}
          alt={label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      
      {/* No resting tint over the work — the portfolio images carry the whole
          pitch, so they stay at full contrast. Only the hover caption below
          brings its own gradient, and just far enough to keep text legible. */}

      <div className="media-caption absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <span className="media-caption-accent text-[10px] font-mono uppercase tracking-widest mb-1 font-semibold">
          {label}
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider">
          {label}
        </h3>
        {/* No corner badge on a pointer device: it only ever appeared on
            hover, and by then the video had already started playing. */}
      </div>
    </div>
  );
}

// The active filter lives in the URL as `?filter=<slug>`, so it survives a
// reload and a filtered view can be linked to or bookmarked. Slugs rather than
// the display labels keep the query string readable — "Bird's-Eye View" would
// otherwise encode as `Bird%27s-Eye%20View`. They match the asset folder names.
// How many tiles arrive at once, and again on every "load more".
const PAGE_SIZE = 36;

const ALL_FILTER = "All";
const FILTER_PARAM = "filter";
const CATEGORIES = [
  { key: "Exterior", slug: "exterior" },
  { key: "Interior", slug: "interior" },
  { key: "Bird's-Eye View", slug: "bird-eye" },
  { key: "Product", slug: "product" },
  { key: "Virtual Staging", slug: "virtual-staging" },
  // Sits next to Virtual Staging because the two are the same kind of tab: a
  // filter that swaps the tile grid for its own viewer rather than narrowing it.
  { key: "360° Tours", slug: "360-tours" },
  { key: "Animation", slug: "animation" },
  { key: "Cinemagraph", slug: "cinemagraph" },
  { key: "Web", slug: "web" },
];

// An unknown or missing slug falls back to "All" rather than showing an empty
// grid, so a hand-edited or stale URL still renders something.
const keyForSlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug)?.key ?? ALL_FILTER;
const slugForKey = (key) =>
  CATEGORIES.find((c) => c.key === key)?.slug ?? null;

// CSS multi-column (`columns-3`) fills the first column top-to-bottom before
// it starts the second one — with 98 exterior renders that puts items 1–33 in
// the left column alone. The file order is a curated order (strongest work
// first), so it has to read left-to-right across the top row instead. We lay
// the columns out ourselves and deal the items into them round-robin, which
// needs the current column count in JS rather than in a breakpoint class.
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setColumnCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return columnCount;
}

function GalleryPageContent() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const lenisRef = useLenis();
  // Set when the reader picks a filter, read by the effect that returns them
  // to the top of the results. Deriving that from `activeFilter` changing was
  // not the same thing: the filter is read from the URL, and a language switch
  // re-runs that read, so changing language scrolled a reader back to the top
  // of a gallery they had not touched.
  const filterWasClicked = useRef(false);
  const chipRailRef = useRef(null);

  // Derived from the URL rather than held in local state, so there is only one
  // source of truth and a reload cannot disagree with what the sidebar shows.
  const searchParams = useSearchParams();
  const activeFilter = keyForSlug(searchParams.get(FILTER_PARAM));
  // The tour switcher labels its own buttons per language; this page takes no
  // `t`, so the locale comes off the route segment.
  const locale = useParams()?.locale === "de" ? "de" : "en";
  const t = translations[locale];
  const g = t.gallery;
  // Every visible category string is looked up from the English key the
  // archive rows and the filter already agree on.
  const labelFor = (key) => g.categories[key]?.label ?? key;

  // The chip rail scrolls sideways, so an active filter near its end starts
  // out of sight — on a reload of `?filter=cinemagraph` nothing on screen said
  // which filter was on. Scroll the rail itself rather than calling
  // `scrollIntoView`, which would also drag the page.
  useEffect(() => {
    const rail = chipRailRef.current;
    if (!rail) return;
    const chip = rail.querySelector('[aria-pressed="true"]');
    if (!chip) return;
    const offset =
      chip.offsetLeft - rail.clientWidth / 2 + chip.offsetWidth / 2;
    rail.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [activeFilter]);

  // `history.replaceState` instead of `router.replace`: it updates the URL
  // without a router navigation (no RSC round-trip, so the grid swaps
  // instantly), and Next keeps `useSearchParams` in sync with it. `replace`
  // rather than `push` keeps the Back button pointing at the previous page
  // instead of stepping back through every filter the reader tried.
  const setActiveFilter = (key) => {
    filterWasClicked.current = true;
    const slug = slugForKey(key);
    const next = new URLSearchParams(searchParams.toString());
    if (slug) next.set(FILTER_PARAM, slug);
    else next.delete(FILTER_PARAM);
    const query = next.toString();
    window.history.replaceState(
      null,
      "",
      query ? `?${query}` : window.location.pathname
    );
  };

  // The full content list (with each file's real intrinsic dimensions)
  // lives in src/data/galleryData.js — see the header there for how it is
  // generated and why the file order must be preserved.
  const items = galleryItems;

  // Virtual Staging replaces the tile grid with before/after sliders, so it
  // feeds off its own paired data and never populates `filteredItems`.
  const isVirtualStaging = activeFilter === "Virtual Staging";

  // 360° Tours does the same with the Panotour embeds. They are interactive
  // pages, not files with intrinsic dimensions, so they cannot be tiles in the
  // masonry grid or frames in the lightbox — hence their own branch. The list
  // is the same one the 360° service page shows, so there is one source of
  // truth for which tours exist.
  const isTours = activeFilter === "360° Tours";
  const tours = serviceTourFor("360-virtual-tour") ?? [];

  // "All" gets the interleaved run (see galleryData.js) so the categories do
  // not read as consecutive blocks; a single category keeps its own order.
  const filteredItems = isVirtualStaging || isTours
    ? []
    : activeFilter === ALL_FILTER
      ? allProjectsItems
      : items.filter((item) => item.category === activeFilter);

  const columnCount = useColumnCount();

  // "All Projects" is 214 tiles — 66,000px on a phone, about 78 screens, with
  // no way to reach the footer and no sense of how much is left. The grid now
  // arrives in batches; the lightbox still walks the full filtered set, so
  // paging past the last loaded tile keeps working.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Reset during render rather than from an effect: the batch size belongs to
  // the filter, so a new filter means a new count before anything paints.
  const [countedFilter, setCountedFilter] = useState(activeFilter);
  if (countedFilter !== activeFilter) {
    setCountedFilter(activeFilter);
    setVisibleCount(PAGE_SIZE);
  }

  const shownItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > shownItems.length;

  // Even one page of results runs several screens, and the footer is further
  // still. ClientWrapper already broadcasts scroll, so this costs no listener
  // of its own.
  const [showTopButton, setShowTopButton] = useState(false);
  useEffect(() => {
    const onScroll = (e) => setShowTopButton(e.detail.scrollY > 1200);
    window.addEventListener("sklo-scroll", onScroll);
    return () => window.removeEventListener("sklo-scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenisRef?.current) lenisRef.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Each entry keeps its index into `filteredItems` — the lightbox and its
  // prev/next handlers walk that flat array, so a per-column index would send
  // them to the wrong item.
  //
  // Items go to whichever column is currently shortest, measured by the sum
  // of their aspect ratios (height at a common width). Plain round-robin
  // counted tiles, not height: a run of portrait renders in one column left
  // it a full screen taller than its neighbours, and the Exterior filter
  // ended in one lonely column with empty space beside it. The curated order
  // is still read in sequence — only the column each item lands in changes.
  const columnBuckets = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array.from({ length: columnCount }, () => 0);
  shownItems.forEach((item, index) => {
    let target = 0;
    for (let c = 1; c < columnCount; c++) {
      if (columnHeights[c] < columnHeights[target] - 0.001) target = c;
    }
    columnBuckets[target].push({ item, index });
    columnHeights[target] += (item.height || 1) / (item.width || 1);
  });

  // Switching filters swaps in a whole new (shorter) grid — if the reader was
  // scrolled deep into the previous set, they'd land partway down an
  // unrelated one, so bring them back to the top of the results.
  useEffect(() => {
    if (!filterWasClicked.current) return;
    filterWasClicked.current = false;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // `lenisRef` is deliberately not a dependency: it is a ref container, so
    // its contents never make this effect stale, but its identity changes
    // whenever ClientWrapper remounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const lightboxRef = useRef(null);
  const openerRef = useRef(null);
  const touchStartRef = useRef(null);

  // Paging by swipe, because that is what a phone reader tries first — the
  // arrow buttons sit on top of the artwork at 390px and are a poor second.
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (e) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Horizontal, and clearly so: a diagonal drag on a photo is not a page.
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    setSelectedItemIndex((prev) =>
      dx < 0
        ? prev === filteredItems.length - 1 ? 0 : prev + 1
        : prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };

  // While the lightbox is open it is the page: the document behind it must not
  // scroll (a swipe over the image used to move the gallery underneath, so
  // closing it left you somewhere else entirely), the focus has to be inside
  // it, and it has to come back where it started on close.
  const lightboxOpen = selectedItemIndex !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const opener = document.activeElement;
    openerRef.current = opener instanceof HTMLElement ? opener : null;

    const { overflow, paddingRight } = document.body.style;
    const rootOverflow = document.documentElement.style.overflow;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    // `overflow: hidden` alone does not stop Lenis — it drives the real
    // scroll position from its own loop, so it has to be told to hold. Held in
    // a local so the cleanup releases the same instance it paused.
    const lenis = lenisRef?.current;
    lenis?.stop?.();

    const focusFirst = requestAnimationFrame(() => {
      lightboxRef.current?.querySelector("button")?.focus();
    });

    return () => {
      cancelAnimationFrame(focusFirst);
      document.body.style.overflow = overflow;
      document.documentElement.style.overflow = rootOverflow;
      document.body.style.paddingRight = paddingRight;
      lenis?.start?.();
      openerRef.current?.focus?.();
    };
    // Keyed on open/closed, not on the index: paging between items must not
    // re-run the scroll lock or bounce the focus back to the close button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "Tab") {
        const focusables = lightboxRef.current?.querySelectorAll(
          'button, [href], video, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "ArrowLeft") setSelectedItemIndex((prev) => prev === 0 ? filteredItems.length - 1 : prev - 1);
      if (e.key === "ArrowRight") setSelectedItemIndex((prev) => prev === filteredItems.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, filteredItems.length]);

  // The sidebar groups the filters the way the archive is organised: the
  // categories that take part in the "All projects" mix, then the ones that
  // only exist as their own showcase (Product, Virtual Staging, 360° Tours,
  // Web). Numbering runs across both groups so a filter can be referred to
  // by its number ("filter 07") in a conversation.
  const mixCategories = CATEGORIES.filter(
    ({ key }) => !ALL_PROJECTS_EXCLUDED.includes(key) && key !== "360° Tours"
  );
  const showcaseCategories = CATEGORIES.filter(
    ({ key }) => ALL_PROJECTS_EXCLUDED.includes(key) || key === "360° Tours"
  );
  const numberOf = (key) =>
    String([...mixCategories, ...showcaseCategories].findIndex((c) => c.key === key) + 1).padStart(2, "0");

  const FilterRow = ({ cat }) => {
    const isActive = activeFilter === cat.key;
    return (
      <button
        onClick={() => setActiveFilter(cat.key)}
        aria-pressed={isActive}
        className={`filter-row group w-full flex items-center gap-3 text-left rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
          isActive ? "is-active text-white" : "text-white/70 hover:text-white"
        }`}
      >
        <span className="font-mono text-[10px] tracking-widest text-white/40 w-5 shrink-0">{numberOf(cat.key)}</span>
        <span className="flex-1">{labelFor(cat.key)}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-3.5 h-3.5 shrink-0 transition-all duration-300 ${
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0"
          }`}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-white">
      {/* The filter rail. A plain <div>, not <aside>: it holds the page's own
          <h1> and its primary controls, and marking those as complementary put
          the title outside the main landmark.

          A side column at `lg` only. At `md` the column came to 72px of
          content, which cut the heading to "GALLE" — tablets keep the phone
          layout: a horizontal rail above the grid. */}
      <div className="chip-rail w-full lg:w-[23%] lg:min-w-[270px] lg:max-w-[330px] h-auto lg:h-screen lg:sticky lg:top-0 bg-surface border-b lg:border-b-0 lg:border-r border-white/10 px-6 lg:px-6 pt-28 lg:pt-28 pb-5 lg:pb-6 flex flex-col z-20 shrink-0 lg:overflow-y-auto">
        <div className="flex flex-col gap-4 lg:gap-5 flex-1">
          <div className="flex flex-col gap-3">
            <Title3D as="h1" className="text-3xl lg:text-4xl font-bold tracking-widest uppercase">
              {g.title}
            </Title3D>
            {/* The sentence under the title follows the active filter, so the
                column explains what is on screen instead of keeping a
                separate "category info" box at the bottom. */}
            <p className="text-[13px] text-white/60 leading-relaxed transition-all duration-300">
              {g.categories[activeFilter]?.desc ?? g.categories.All.desc}
            </p>
          </div>

          {/* Phone: one sideways-scrolling rail of chips. The vertical list
              below is nine rows tall, which pushed the first photograph past
              the fold on every phone. */}
          <nav aria-label={g.title} ref={chipRailRef} className="lg:hidden chip-rail -mx-6 px-6 overflow-x-auto">
            <div className="flex w-max gap-2">
              {[{ key: ALL_FILTER }, ...mixCategories, ...showcaseCategories].map(({ key }) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    aria-pressed={isActive}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-text text-bg border-transparent"
                        : "bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {key === ALL_FILTER ? g.all : labelFor(key)}
                    {key === ALL_FILTER && (
                      <span className="ml-2 font-mono text-[10px] opacity-60">{allProjectsItems.length}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <nav aria-label={g.title} className="hidden lg:flex flex-col gap-4">
            <button
              onClick={() => setActiveFilter(ALL_FILTER)}
              aria-pressed={activeFilter === ALL_FILTER}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeFilter === ALL_FILTER
                  ? "bg-text text-bg border-transparent"
                  : "bg-white/5 text-white border-white/10 hover:border-white/30"
              }`}
            >
              <span>{g.all}</span>
              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                  activeFilter === ALL_FILTER ? "bg-bg/15" : "bg-white/10"
                }`}
              >
                {allProjectsItems.length}
              </span>
            </button>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 px-3 pb-1">
                {g.groups.mix}
              </span>
              {mixCategories.map((cat) => (
                <FilterRow key={cat.slug} cat={cat} />
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 px-3 pb-1">
                {g.groups.showcases}
              </span>
              {showcaseCategories.map((cat) => (
                <FilterRow key={cat.slug} cat={cat} />
              ))}
            </div>
          </nav>
        </div>

        {/* The route out. A gallery is where someone decides they want the
            same for their project; the next step sits where the eye lands
            after the list. */}
        <Link
          href={`/${locale}/contact`}
          className="ink-card group hidden lg:flex flex-col gap-2.5 rounded-2xl p-5 mt-6 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
            {t.footer.eyebrow}
          </span>
          <span className="text-lg font-semibold leading-snug">
            {g.ctaHeading}
          </span>
          <span className="ink-card-btn inline-flex items-center gap-2 w-fit text-xs font-semibold tracking-wide px-4 py-2.5 rounded-full mt-1 transition-colors duration-300">
            {t.hero.contact}
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>

      {/* The masonry grid takes whatever width the rail leaves. */}
      <main className="w-full lg:flex-1 lg:min-w-0 min-h-screen pt-8 lg:pt-32 pb-24 px-6 md:px-12 lg:px-16 overflow-y-auto">
        {isTours ? (
          // One window per tour, laid out like the rest of the gallery, rather
          // than a single viewer with a switcher above it — this is the room
          // where a visitor browses everything the studio has, so the tours
          // should be side by side the way the stills are. Each window still
          // waits for a click before it mounts its iframe, so five of them cost
          // five posters until somebody picks one. The switcher version lives
          // on the 360° service page, where the subject is one property.
          <div key={activeFilter} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {tours.map((tour, idx) => (
              <div
                key={tour.id}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="animate-fade-in-card opacity-0"
              >
                <TourEmbed
                  tours={[tour]}
                  locale={locale}
                  // Two of these are the same property, inside and out, and a
                  // window holding one tour cannot work that out for itself.
                  showPart={tours.filter((t) => t.title === tour.title).length > 1}
                />
              </div>
            ))}
          </div>
        ) : isVirtualStaging ? (
          // Virtual Staging is comparisons, not tiles: two per row at most, so
          // each pair is wide enough to actually judge the difference.
          <div key={activeFilter} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {virtualStagingPairs.map((pair, idx) => (
              <div
                key={pair.id}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="animate-fade-in-card opacity-0 flex flex-col gap-3"
              >
                <BeforeAfterSlider
                  before={pair.before}
                  after={pair.after}
                  width={pair.width}
                  height={pair.height}
                  beforeLabel={g.before}
                  afterLabel={g.after}
                  comparisonLabel={g.comparison}
                />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    {locale === "de" && pair.titleDe ? pair.titleDe : pair.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {g.dragToCompare}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div key={activeFilter} className="flex items-start gap-6">
          {columnBuckets.map((bucket, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6 flex-1 min-w-0">
              {bucket.map(({ item, index }) => (
                <div
                  key={item.id}
                  style={{
                    animationDelay: `${Math.min(index, 14) * 35}ms`
                  }}
                  className="animate-fade-in-card opacity-0"
                >
                  <GalleryCard
                    item={item}
                    label={labelFor(item.category)}
                    onClick={() => setSelectedItemIndex(index)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        )}

        {!isTours && !isVirtualStaging && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-[11px] font-mono uppercase tracking-widest text-white/40">
              {g.shownOf
                .replace("{shown}", shownItems.length)
                .replace("{total}", filteredItems.length)}
            </p>
            {hasMore && (
              <button
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="carousel-arrow rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300"
              >
                {g.loadMore}
              </button>
            )}
          </div>
        )}

        {showTopButton && (
          <button
            onClick={scrollToTop}
            aria-label={g.backToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full carousel-arrow flex items-center justify-center transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        )}

        <style>{`
          @keyframes fadeInCard {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in-card {
            animation: fadeInCard 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </main>

      {/* Lightbox Modal */}
      {selectedItemIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={labelFor(filteredItems[selectedItemIndex]?.category)}
          onClick={handleClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          /* No backdrop blur: the sheet is already 95% black, so the blur was
             invisible — but the compositor still had to blur the whole
             gallery behind it on every frame, which is what made paging
             through images stutter. */
          className="overlay-chrome fixed inset-0 z-[100] bg-black/95 flex items-center justify-center px-4 py-6 md:px-24 md:py-10 transition-opacity duration-300"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer z-50"
            aria-label={g.closeLightbox}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 bottom-4 md:bottom-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer z-50"
            aria-label={g.prevItem}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 bottom-4 md:bottom-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer z-50"
            aria-label={g.nextItem}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {/* Lightbox Content */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[min(1800px,92vw)] max-h-[92vh] flex flex-col items-center justify-center"
          >
            {filteredItems[selectedItemIndex]?.type === "video" ? (
              <LightboxVideo
                key={filteredItems[selectedItemIndex].id}
                src={filteredItems[selectedItemIndex].src}
                start={filteredItems[selectedItemIndex].start}
                className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl"
              />
            ) : (
              /* Through `next/image`: the archive masters are 3840px, and a
                 raw <img> made every arrow press download a megabyte or two
                 and decode ~39 MB of bitmap before the next frame could be
                 painted — which is what made the viewer stutter. At `92vw`
                 Next hands back a variant sized to the screen instead. */
              <Image
                key={filteredItems[selectedItemIndex].id}
                src={filteredItems[selectedItemIndex].src}
                alt={labelFor(filteredItems[selectedItemIndex].category)}
                width={filteredItems[selectedItemIndex].width}
                height={filteredItems[selectedItemIndex].height}
                sizes="92vw"
                priority
                className="max-w-full max-h-[80vh] w-auto h-auto rounded-lg object-contain shadow-2xl"
              />
            )}
            
            {/* The category was printed twice, once as an eyebrow and once as
                a heading. The second line now says where you are in the set,
                which in a 214-item filter is the thing you cannot otherwise
                know. */}
            <div className="mt-6 text-center">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                {labelFor(filteredItems[selectedItemIndex]?.category)}
              </span>
              <p className="text-sm font-mono tracking-widest text-white/60 mt-1">
                {selectedItemIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// `useSearchParams` forces the client tree up to the nearest Suspense boundary
// to render on the client if the route is ever prerendered. This route is
// server-rendered per request today, so the boundary is insurance rather than
// a requirement — but without it, making the route static would break the build.
export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryPageContent />
    </Suspense>
  );
}
