import { NextResponse } from "next/server";
import { CONTACT_EMAIL, PHONE, PHONE_HREF } from "@/data/studio";

// Next 16 renamed the middleware convention to proxy; same job, same file
// shape, no more deprecation notice on every dev start.

const locales = ["en", "de", "es"];
const defaultLocale = "en";

// Only the production domain may be indexed. The site is served from a
// *.vercel.app address until the DNS for sklo.studio moves, and every preview
// deployment keeps its own address forever — without this header each of
// them is a full duplicate of the site in Google's eyes.
const PRODUCTION_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sklo.studio").hostname;
  } catch {
    return "sklo.studio";
  }
})();

function withIndexingPolicy(response, request) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const isProduction = host === PRODUCTION_HOST || host === `www.${PRODUCTION_HOST}`;
  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

// Maintenance mode: MAINTENANCE=1 in the environment closes the site for a
// few days without costing its place in Google. Every page answers 503 with
// Retry-After, which Google reads as "come back later": it keeps the indexed
// pages and their rankings and simply retries. A password (401) or a page
// that answers 200 with "closed" would be read as the real content and drop
// out of the index — so no noindex here either. Fine for days; past about two
// weeks of 503s Google starts dropping URLs.
//
// MAINTENANCE_KEY lets the team still see the site: opening any page with
// ?preview=<key> sets a cookie for 30 days and the site works as usual.
// robots.txt, sitemap.xml, static files and the API never reach the proxy
// (see the matcher), so they keep answering normally.
const PREVIEW_COOKIE = "sklo_preview";

function maintenanceGate(request) {
  if (process.env.MAINTENANCE !== "1") return null;
  const key = process.env.MAINTENANCE_KEY;
  const url = request.nextUrl;

  if (key && url.searchParams.get("preview") === key) {
    const clean = url.clone();
    clean.searchParams.delete("preview");
    const response = NextResponse.redirect(clean, 307);
    response.cookies.set(PREVIEW_COOKIE, key, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
  if (key && request.cookies.get(PREVIEW_COOKIE)?.value === key) return null;

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "86400",
      "Cache-Control": "no-store",
    },
  });
}

const MAINTENANCE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SKLO — back soon</title>
<style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100svh;display:grid;place-items:center;background:#0d0d0f;color:#f2f2f2;
    font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px;box-sizing:border-box}
  main{max-width:34rem}
  h1{font-size:clamp(2rem,8vw,3.5rem);letter-spacing:.2em;margin:0 0 1.5rem;font-weight:700}
  p{margin:0 0 .75rem;color:rgba(255,255,255,.7)}
  a{color:#fff}
  .c{margin-top:2rem;font-size:.9rem;display:flex;flex-wrap:wrap;gap:.5rem 1.5rem}
</style></head>
<body><main>
  <h1>SKLO</h1>
  <p>We are updating the site and will be back in a few days.</p>
  <p lang="de">Wir aktualisieren die Website und sind in wenigen Tagen zurück.</p>
  <p lang="es">Estamos actualizando el sitio y volveremos en unos días.</p>
  <div class="c"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a><a href="${PHONE_HREF}">${PHONE}</a></div>
</main></body></html>`;

export function proxy(request) {
  const closed = maintenanceGate(request);
  if (closed) return withIndexingPolicy(closed, request);

  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    // Which language for a bare path: the browser's own preference first,
    // then the country Vercel sees the request from (Switzerland, Germany,
    // Austria, Liechtenstein → German), English otherwise. Only the choice
    // of language is geo-based; every page is the same for everyone.
    const accept = request.headers.get("accept-language") ?? "";
    const country = request.headers.get("x-vercel-ip-country") ?? "";
    // Spanish only on an explicit browser preference: no country maps to it
    // as cleanly as Switzerland/Germany/Austria map to German.
    const prefersEs = /^es\b|,\s*es\b/i.test(accept.split(";")[0] ?? "");
    const prefersDe = /^de\b|,\s*de\b/i.test(accept.split(";")[0] ?? "") || (!/^en\b/i.test(accept) && ["CH", "DE", "AT", "LI"].includes(country));
    const locale = prefersEs ? "es" : prefersDe ? "de" : defaultLocale;
    // "/" would become "/en/", which Next then 308s to "/en" — one hop, not
    // two. A 307: the answer depends on the visitor, so neither the browser
    // nor Google may cache it as permanent.
    const target = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
    return withIndexingPolicy(
      NextResponse.redirect(new URL(target, request.url), 307),
      request
    );
  }

  return withIndexingPolicy(NextResponse.next(), request);
}

export const config = {
  // Static files, Next internals and the API are left alone. /robots.txt and
  // /sitemap.xml have their own route files now and never reach [locale].
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
