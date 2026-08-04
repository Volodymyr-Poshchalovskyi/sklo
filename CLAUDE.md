# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Next.js + Turbopack, default port 3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (`eslint-config-next/core-web-vitals`)

There is no test runner configured in this repo (no Jest/Vitest/Playwright) — verification is manual, via the dev server and a browser.

## Architecture

**Routing & i18n.** All pages live under `src/app/[locale]/...` (App Router). `src/middleware.js` redirects any path without a `/en` or `/de` prefix to `/en/...`. Locale strings are `src/locales/{en,de}.json`, loaded once in `src/app/[locale]/layout.js` (dynamic `import`, falls back to `en` on error) and passed down as a `t` prop. **`t` is only partially wired up** — several components (`HeroSection.js`, most of `WhoWeAre.js`) hardcode English copy directly in JSX instead of reading from `t`, so don't assume translated text covers everything visible on a page.

**Root layout (`src/app/[locale]/layout.js`).** Sets up fonts, runs an inline pre-hydration script that reads `sklo-theme` from `localStorage` (default `"light"`) and sets `data-theme` on `<html>` before paint (avoids a flash), wraps `children` in `ClientWrapper`, and renders `Footer` outside of it.

**`ClientWrapper.js`** mounts `Header` and gates page content behind `Loader` via `LoaderContext` (shown once per day, tracked with a `sklo_last_load` cookie). It also owns the **single app-wide scroll listener**: it rebroadcasts `window` scroll as a `sklo-scroll` CustomEvent (`{ detail: { scrollY } }`). Components that need scroll position (e.g. `Header.js`) subscribe to that event instead of attaching their own listener — follow this pattern rather than adding a new raw scroll listener.

**Color tokens & Tailwind v4 syntax.** Colors live in a plain `@theme { --color-* }` block in `globals.css` — **not** `@theme inline`. `inline` substitutes the literal value into each utility, which makes the utility immune to the `:root[data-theme="light"]` overrides; only the fonts (which forward another variable) stay in the `@theme inline` block. Consume tokens through the generated utilities (`text-accent`, `bg-surface`, `bg-bg`, `text-text-muted`). **Never write the v3 bracket form `text-[--color-accent]`** — Tailwind v4 removed that shorthand and compiles it to the invalid declaration `color: --color-accent`, which the browser silently drops. That bug had killed every accent color on the site.

**Section shells.** `.section-shell` (+ optional `.section-band` for the alternating tone, `.hairline-top` for a hairline that fades at both edges) gives a section its background, a soft top bloom, and its divider. Use it instead of hardcoding `bg-[#0d0d0f]` + `border-t border-white/10`. `.tile` is the shared card surface (`.no-lift` disables its hover lift for container tiles). Note the light-theme override block deliberately excludes `.section-shell`, or its `!important` rule would flatten every section back to one tone.

**Scroll snapping.** `html` has `scroll-snap-type: y proximity` and no `scroll-behavior: smooth` (on a snap container that makes every snap adjustment an animation that wheel events fight). Sections opt in with `.snap-section`, and `ClientWrapper` runs a ResizeObserver that sets `data-snap="off"` on any section taller than the viewport — snapping to a section you can't see the end of drags the reader back on every scroll. `scroll-padding-top` is `84px`, the measured height of the *collapsed* header (102px at rest, 83px scrolled); keep them in sync if the header padding changes.

**Theming (light/dark).** Not Tailwind's `dark:` variant. It's a runtime `data-theme="light"|"dark"` attribute on `<html>`, toggled from `Header.js` (`toggleTheme`) and persisted to `localStorage`. Dark is the original/baseline design (plain Tailwind classes like `bg-white/10`, `text-white`); light-theme support is retrofitted as a large block of `:root[data-theme="light"] ...` overrides with `!important` in `src/app/globals.css`. This override list is fragile — broad selectors (e.g. an old `header div[style*="background"]` attribute selector) can match unrelated elements unpredictably. Prefer passing `theme` down as a prop and branching colors directly in JS/inline styles for new theme-aware UI rather than adding more blanket CSS overrides.

**Services content.** `src/data/servicesData.js` is the single source of truth for all services (slug, title, description, pipeline steps, gallery) used by `src/app/[locale]/services/page.js` (listing) and `services/[slug]/page.js` — a server component that resolves the slug, calls `generateStaticParams` for SSG, and hands rendering off to the client component `ServiceDetailClient.js`. The homepage's own services carousel (inside `WhoWeAre.js`) keeps its own separate, shorter hardcoded slide list — it is **not** derived from `servicesData.js`; update both if a service changes.

**`WhoWeAre.js` is misleadingly named.** It renders the homepage's non-hero sections as sibling `<section>`s in one component: "Our Services" (with the horizontal drag/snap carousel) and a merged "Who We Are" + "Our Values" section (title/copy plus the 6-item feature grid). There is no separate `OurServices`/`OurValues` component.

**Homepage section layout convention.** Main content sections (Our Services, the merged Who We Are section, FAQ) use a heading + body split via `grid grid-cols-1 lg:grid-cols-2` so the body column starts exactly at the horizontal midpoint. Keep new sections consistent with this rather than the older `flex ... shrink-0 lg:w-1/3` / `lg:w-2/3` pattern.

**Per-component `<style>` blocks.** One-off `@keyframes` are declared in an inline `<style>{`...`}</style>` tag scoped inside the component that uses them (see `Header.js`, `HeroSection.js`, `WhoWeAre.js`), rather than in a shared animations file.

## Gotchas

- **React 19 inline styles:** never mix the `animation` shorthand with a separate `animationDelay`/`animationName` in the same style object across re-renders — React warns and the animation breaks ("Updating/Removing a style property ... don't mix shorthand and non-shorthand"). Use the fully longhand set instead: `animationName`, `animationDuration`, `animationTimingFunction`, `animationFillMode`, `animationDelay` (see the mega-menu items in `Header.js` or `RotatingWord` in `HeroSection.js`).
- **Next.js 16 deprecation:** the dev server logs `"middleware" file convention is deprecated. Please use "proxy" instead` on every start — `src/middleware.js` has not been migrated to the new `proxy.ts` convention yet.
