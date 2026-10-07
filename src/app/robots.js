import { SITE_URL } from "@/lib/seo";

// Before this file existed, /robots.txt fell through to the [locale] route
// and came back as the home page with <html lang="robots.txt">. Previews on
// *.vercel.app are kept out of the index by the X-Robots-Tag header set in
// src/proxy.js, which a crawler obeys per page regardless of this file.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
