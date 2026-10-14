import { NextResponse } from "next/server";

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

export function proxy(request) {
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
