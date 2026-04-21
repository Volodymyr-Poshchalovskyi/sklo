import { NextResponse } from "next/server";

const locales = ["en", "de"];
const defaultLocale = "en";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Пропустити статику та API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) return;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};