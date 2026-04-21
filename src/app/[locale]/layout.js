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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;  // ← await
  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-[--color-bg] text-[--color-text]">
        {children}
      </body>
    </html>
  );
}