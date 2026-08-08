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
  // three.js is browser-only (WebGL) and is dynamic-imported inside the
  // client-only VoidScene component. Without excluding it from the server
  // bundle it gets pulled into the OpenNext handler and blows the Cloudflare
  // Worker 3 MiB budget. The VoidScene component renders null on the server
  // (mode starts at "idle"), so the three import is only ever evaluated in the
  // browser. Turbopack's resolveAlias supports ONLY a `browser` condition, so
  // we point the default (server) resolution at an empty stub and let the
  // browser condition resolve to the real package. (serverExternalPackages
  // was the cleaner option but OpenNext on Windows symlinks the package,
  // which needs admin privileges.)
  turbopack: {
    resolveAlias: {
      // Default (server) → empty stub; browser → real three. Must also stub
      // the deep post-processing submodule imports ("three/examples/jsm/*")
      // because those modules themselves import "three" — without stubbing
      // them the full three core gets pulled into the server bundle.
      three: { browser: "three", default: "./scripts/empty-module.js" },
      "three/examples/jsm/postprocessing/EffectComposer.js": {
        browser: "three/examples/jsm/postprocessing/EffectComposer.js",
        default: "./scripts/empty-module.js",
      },
      "three/examples/jsm/postprocessing/RenderPass.js": {
        browser: "three/examples/jsm/postprocessing/RenderPass.js",
        default: "./scripts/empty-module.js",
      },
      "three/examples/jsm/postprocessing/UnrealBloomPass.js": {
        browser: "three/examples/jsm/postprocessing/UnrealBloomPass.js",
        default: "./scripts/empty-module.js",
      },
      "three/examples/jsm/postprocessing/OutputPass.js": {
        browser: "three/examples/jsm/postprocessing/OutputPass.js",
        default: "./scripts/empty-module.js",
      },
    },
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
