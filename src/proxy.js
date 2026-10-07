import { NextResponse } from "next/server";

// Next 16 renamed the middleware convention to proxy; same job, same file
// shape, no more deprecation notice on every dev start.

const locales = ["en", "de"];
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
    return withIndexingPolicy(
      NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url)),
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
