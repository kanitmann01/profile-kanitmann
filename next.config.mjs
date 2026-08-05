import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler (stable since React 19.2 / Next 16) — auto-memoizes components
  reactCompiler: true,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Enable compression
  compress: true,
  async redirects() {
    return [
      {
        source: "/articles/fable-5",
        destination: "/fable-5",
        permanent: true,
      },
      // Tier 0: collapse the www host onto the apex origin. The exact
      // Cloudflare edge rule lives in docs/seo/domain-migration.md; this
      // belt-and-suspenders worker-level redirect covers any request that
      // reaches the origin with the wrong host (e.g. direct origin hits).
      {
        source: "/:path*",
        destination: "https://kanitmann.com/:path*",
        permanent: true, // emits 308
        has: [{ type: "header", key: "host", value: "www.kanitmann.com" }],
      },
    ];
  },
};

// Cloudflare adapter dev bindings (next dev only; not awaited per adapter docs)
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
