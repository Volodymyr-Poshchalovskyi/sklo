import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientWrapper from "@/components/ClientWrapper";
import CookieConsent from "@/components/CookieConsent";
import { translations } from "@/locales";
import { pageMetadata, organizationJsonLd, websiteJsonLd, JsonLd, LOCALES } from "@/lib/seo";


// Space Grotesk is the only typeface the site uses: globals.css points
// --font-sans at --font-display. Self-hosted from the repo (variable font,
// latin subset, SIL OFL — see fonts/SpaceGrotesk-OFL.txt) rather than
// next/font/google: the build no longer depends on reaching Google Fonts,
// which failed often enough to break deploys, and no visitor request goes
// to Google either.
const spaceGrotesk = localFont({
  src: "../fonts/SpaceGrotesk-latin-wght.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }, { locale: "es" }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const isDe = locale === "de";
  return {
    // Bing Webmaster Tools site verification (the GSC import did not find
    // the property); Google is verified through DNS.
    verification: { other: { "msvalidate.01": "A6E70172D88657F9D53FA752C91F8CC3" } },
    ...pageMetadata({
      locale,
      path: "",
      title: isDe
        ? "3D-Visualisierung für Architektur & Immobilien"
        : locale === "es"
          ? "Visualización 3D para arquitectura e inmobiliaria"
          : "3D Visualisation for Architecture & Real Estate",
      description: t.seo.home,
    }),
    icons: {
      icon: [
        { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/assets/apple-touch-icon.png",
      other: [{ rel: "manifest", url: "/assets/site.webmanifest" }],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  // Anything with a dot in it skips the locale redirect in proxy.js, so a
  // request like /favicon.png used to render the home page as locale
  // "favicon.png" with a 200. It is a 404.
  if (!LOCALES.includes(locale)) notFound();
  let t;
  
  try {
    t = (await import(`@/locales/${locale}.json`)).default;
  } catch (e) {
    t = (await import(`@/locales/en.json`)).default;
  }

  return (
    <html
      lang={locale}
      className={spaceGrotesk.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('sklo-theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="grain min-h-screen flex flex-col bg-bg text-text">
        <JsonLd data={organizationJsonLd(locale)} />
        <JsonLd data={websiteJsonLd(locale)} />
        <ClientWrapper locale={locale} t={t}>
          <div className="flex-1">
            {children}
          </div>
        </ClientWrapper>
        <Footer locale={locale} t={t} />
        {/* Cookie-free page views and Core Web Vitals; both are switched on per
            project in the Vercel dashboard and are no-ops until then. */}
        <CookieConsent locale={locale} t={t} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}