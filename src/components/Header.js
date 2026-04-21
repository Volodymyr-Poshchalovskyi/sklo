"use client";
import Link from "next/link";

export default function Header({ t, locale }) {
  const otherLocale = locale === "en" ? "de" : "en";
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[--color-border] bg-[--color-bg]/80 backdrop-blur-md">
      <Link href={`/${locale}`} className="text-lg font-semibold tracking-tight text-[--color-text]">
        SKLO
      </Link>
      <nav className="hidden md:flex gap-8 text-sm text-[--color-text-muted]">
        {Object.entries(t.nav).map(([key, label]) => (
          <a key={key} href={`#${key}`} className="hover:text-[--color-text] transition-colors">
            {label}
          </a>
        ))}
      </nav>
      <Link
        href={`/${otherLocale}`}
        className="text-xs font-medium px-3 py-1.5 rounded-full border border-[--color-border] text-[--color-text-muted] hover:text-[--color-text] hover:border-[--color-accent] transition-all"
      >
        {otherLocale.toUpperCase()}
      </Link>
    </header>
  );
}