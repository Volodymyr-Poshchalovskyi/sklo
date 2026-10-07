import { Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import "../globals.css";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import { pageMetadata, organizationJsonLd, websiteJsonLd, JsonLd, LOCALES } from "@/lib/seo";

const translations = { en, de };

// Space Grotesk is the only typeface the site uses: globals.css points
// --font-sans at --font-display, so the Inter that used to load here was never
// painted, and the Cormorant italic had no consumer at all. Two font requests
// fewer on every first visit.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;
  const isDe = locale === "de";
  return {
    ...pageMetadata({
      locale,
      path: "",
      title: isDe
        ? "3D-Visualisierung für Architektur & Immobilien in der Schweiz"
        : "3D Visualisation for Architecture & Real Estate in Switzerland",
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

  const cookieStore = await cookies();
  const lastLoad = cookieStore.get("sklo_last_load")?.value;
  const today = new Date().toDateString();
  const initialShowLoader = lastLoad !== today;

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
        <ClientWrapper locale={locale} t={t} initialShowLoader={initialShowLoader}>
          <div className="flex-1">
            {children}
          </div>
        </ClientWrapper>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}