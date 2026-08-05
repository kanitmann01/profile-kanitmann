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
      // worker-level redirect is a belt-and-suspenders fallback. NOTE:
      // opennextjs-cloudflare does not substitute Next's `:path*` template in
      // the destination, so we match each common path explicitly and let the
      // CF edge rule handle the rest. The `has: host=www.*` condition scopes
      // every rule to www hits only — apex requests are never affected.
      ...[
        "",
        "/",
        "/about",
        "/projects",
        "/projects/",
        "/articles",
        "/articles/",
        "/contact",
        "/now",
        "/fable-5",
        "/llms.txt",
        "/llms-full.txt",
        "/sitemap.xml",
        "/rss.xml",
        "/atom.xml",
      ].flatMap((path) => [
        {
          source: path || "/",
          destination: `https://kanitmann.com${path || "/"}`,
          permanent: true,
          has: [{ type: "header", key: "host", value: "www.kanitmann.com" }],
        },
      ]),
      // Project + article slugs — explicit pattern covers every data-driven
      // leaf route. Keep in sync with data/projects.ts and data/articles.ts
      // or rely on the CF edge rule for new slugs.
      ...["/projects/:slug", "/articles/:slug"].map((source) => ({
        source,
        destination: `https://kanitmann.com${source}`,
        permanent: true,
        has: [{ type: "header", key: "host", value: "www.kanitmann.com" }],
      })),
    ];
  },
};

// Cloudflare adapter dev bindings (next dev only; not awaited per adapter docs)
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
