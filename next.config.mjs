/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  // Page changes crossfade through the browser's View Transitions API
  // (React's <ViewTransition>, wired into navigation by this flag). Browsers
  // without it simply swap pages, as before.
  experimental: {
    viewTransition: true,
  },
  // Hardening headers the audits look for. HSTS comes from Vercel itself.
  // No frame-ancestors restriction: the 360° tours embed from
  // media.sklo.studio, and that is the other direction anyway.
  // The three country pages became one Europe page when the regions were
  // reworked (2026-10-14); keep their inbound links and indexed URLs alive.
  async redirects() {
    return ["switzerland", "germany", "austria"].map((old) => ({
      source: `/:locale(en|de)/regions/${old}`,
      destination: "/:locale/regions/europe",
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
