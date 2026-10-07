import Link from "next/link";

// Rendered inside the locale layout, so the header and footer stay around a
// missing page instead of Next's bare white "404: This page could not be
// found". It has no access to the route's locale (not-found gets no params),
// so both languages are offered rather than guessing one.
export default function NotFound() {
  return (
    <main className="w-full min-h-[70svh] flex items-center justify-center px-6 pt-32 pb-24 text-white">
      <div className="max-w-xl w-full flex flex-col items-start gap-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">404</span>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-wide leading-tight">
          Page not found
          <span className="block text-white/50 text-2xl sm:text-3xl mt-2">Seite nicht gefunden</span>
        </h1>
        <p className="text-base text-white/60 leading-relaxed max-w-md">
          The page may have moved or never existed. The links below lead back to the work.
          <span className="block mt-2">Die Seite wurde verschoben oder existiert nicht. Die Links führen zurück zu den Arbeiten.</span>
        </p>
        <nav className="flex flex-wrap gap-3 pt-2" aria-label="Site sections">
          <Link href="/en" className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-white/80 transition-colors">
            Home · English
          </Link>
          <Link href="/de" className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-white/80 transition-colors">
            Startseite · Deutsch
          </Link>
          <Link href="/en/gallery" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-colors">
            Gallery
          </Link>
          <Link href="/en/services" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-colors">
            Services
          </Link>
        </nav>
      </div>
    </main>
  );
}
