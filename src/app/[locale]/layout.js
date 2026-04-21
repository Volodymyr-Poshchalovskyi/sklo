import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
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
  const isDe = locale === "de";

  return {
    title: isDe
      ? "SKLO Studio — 3D Visualisierung für Architekten & Entwickler"
      : "SKLO Studio — 3D Visualization for Architects & Developers",
    description: isDe
      ? "SKLO ist ein 3D-Visualisierungsstudio für Architekten, Entwickler und Immobilien. Hochwertige Renderings, Motion Design und Produktvisualisierung."
      : "SKLO is a 3D visualization studio for architects, developers and real estate. High-quality renderings, motion design and product visualization.",
    metadataBase: new URL("https://sklo-iota.vercel.app"), // ← замінити на свій домен
    openGraph: {
      title: isDe
        ? "SKLO Studio — 3D Visualisierung"
        : "SKLO Studio — 3D Visualization",
      description: isDe
        ? "3D-Visualisierungsstudio für Architekten, Entwickler & Immobilien."
        : "3D visualization studio for architects, developers & real estate.",
      url: `https://sklo-iota.vercel.app/${locale}`,
      siteName: "SKLO Studio",
      images: [
        {
          url: "/assets/ogImage.jpg",
          width: 1200,
          height: 630,
          alt: "SKLO Studio",
        },
      ],
      locale: isDe ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "SKLO Studio — 3D Visualization",
      description:
        "3D visualization studio for architects, developers & real estate.",
      images: ["/assets/ogImage.jpg"],
    },
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
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[--color-bg] text-[--color-text]">
        {children}
      </body>
    </html>
  );
}
