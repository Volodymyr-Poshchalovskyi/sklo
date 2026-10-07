import { notFound } from "next/navigation";

// A segment's not-found.js only catches notFound() thrown inside that
// segment; a URL that matches no route at all goes to the app-wide default.
// This catch-all turns every unmatched path under a locale into a notFound()
// inside [locale], so the branded page in ../not-found.js renders with the
// header and footer instead of Next's bare 404.
export const metadata = {
  title: "Page not found — SKLO Studio",
  robots: { index: false, follow: false },
};

export default function CatchAll() {
  notFound();
}
