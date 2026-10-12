/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  // Hardening headers the audits look for. HSTS comes from Vercel itself.
  // No frame-ancestors restriction: the 360° tours embed from
  // media.sklo.studio, and that is the other direction anyway.
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
