import type React from "react";
import type { Metadata } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Geist,
  Space_Grotesk,
} from "next/font/google";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TactileFeedbackProvider } from "@/components/tactile-feedback-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { ViewTransitionsProvider } from "@/components/view-transitions-provider";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { CommandPaletteProvider } from "@/components/command-palette-provider";
import { AskPanelProvider } from "@/components/ask-panel-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { getSiteUrl } from "@/lib/site";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Exp: /void immersive page — geometric sans substitute for the design doc's
// nbarchitekt (nav, button labels, micro-labels).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Kanit Mann - Data, ML & AI Engineer",
  description:
    "Data, ML & AI Engineer specializing in cloud infrastructure, ML pipelines, and analytics. MS Data Science, University of Arizona.",
  keywords: [
    "data engineer",
    "machine learning",
    "data science",
    "data pipelines",
    "cloud infrastructure",
    "python",
    "apache spark",
    "snowflake",
    "portfolio",
  ],
  authors: [{ name: "Kanit Mann" }],
  creator: "Kanit Mann",
  publisher: "Kanit Mann",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      { url: "/logo.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kanit Mann - Data, ML & AI Engineer",
    description:
      "Data, ML & AI Engineer specializing in cloud infrastructure, ML pipelines, and analytics. MS Data Science, University of Arizona.",
    url: getSiteUrl(),
    siteName: "Kanit Mann Portfolio",
    type: "website",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanit Mann - Data, ML & AI Engineer",
    description:
      "Data, ML & AI Engineer specializing in cloud infrastructure, ML pipelines, and analytics. MS Data Science, University of Arizona.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = getSiteUrl();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
         * next-themes injects its pre-hydration bootstrap via `fn.toString()`.
         * Under React Compiler + SWC, the minifier inserts `__name(fn, "fn")`
         * calls inside the serialized function body to preserve display names,
         * but the `__name` helper itself is never inlined into the string the
         * browser actually runs — so the bootstrap throws
         * `ReferenceError: __name is not defined` on first paint, breaking the
         * theme class on <html> until React hydrates (visible theme flash /
         * wrong-theme flash). Define a no-op `__name` before any inline script
         * runs so the bootstrap evaluates cleanly. The helper's only job is to
         * tag `Function.prototype.name`; a no-op preserves behavior. See
         * https://github.com/pacocoursey/next-themes — `M.toString()` injection.
         */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.__name||(window.__name=function(f){return f;});`,
          }}
        />
        {/* Google Analytics */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
                gtag('config', '${GA_ID}');
          `}
            </Script>
          </>
        ) : null}
        {/* Structured Data: WebSite */}
        <script
          id="ld-website"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kanit Mann",
              url: siteUrl,
              publisher: {
                "@type": "Person",
                name: "Kanit Mann",
              },
              inLanguage: "en-US",
            }),
          }}
        />
        {/* Structured Data: Person. One canonical identity — a single GitHub
            handle, no LinkedIn mirror, so crawlers see one Person node. */}
        <script
          id="ld-person"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kanit Mann",
              jobTitle: "Data, ML & AI Engineer",
              url: siteUrl,
              sameAs: ["https://github.com/kanitmann01"],
            }),
          }}
        />
        {/* Structured Data: Site Navigation */}
        <script
          id="ld-sitenav"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Home",
                  url: `${siteUrl}/`,
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 2,
                  name: "Projects",
                  url: `${siteUrl}/projects`,
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 3,
                  name: "Articles",
                  url: `${siteUrl}/articles`,
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 4,
                  name: "About",
                  url: `${siteUrl}/about`,
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 5,
                  name: "Contact",
                  url: `${siteUrl}/contact`,
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 6,
                  name: "Resume",
                  url: `${siteUrl}/Kanit%20Mann%20-%20Resume.pdf`,
                },
              ],
            }),
          }}
        />
        {/* Feed discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Kanit Mann - RSS"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Kanit Mann - Atom"
          href="/atom.xml"
        />
        {/* Calendly */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${geistSans.variable} ${spaceGrotesk.variable} font-sans`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-md focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Exp 11: site-wide cursor spotlight. Fixed-position, renders
              nothing unless dark + pointer:fine + no reduced motion. */}
          <CursorSpotlight />
          {/* Exp 16: LazyMotion + domAnimation. `m.*` components load only the
              feature set they need; `strict` surfaces any stray `motion.*` in
              dev. `reducedMotion` is NOT a LazyMotion prop in framer-motion
              v12, so MotionConfig stays below it to preserve the OS-level
              reduced-motion gate (entrance, hover, view-triggered
              animations). The CSS @media rule in globals.css only covers
              keyframe animations. */}
          <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
              {/* Exp 07: Lenis smooth scroll. Reduced-motion users get no
                  smoothing (provider renders children without Lenis); touch
                  scrolling is never hijacked. */}
              <LenisProvider>
                <TactileFeedbackProvider>
                  {/* Exp 17 (Wave C): CommandPalette mounts lazily — cmdk +
                      lucide leave the initial bundle until the first ⌘K. */}
                  <CommandPaletteProvider>
                    {/* Wave E.1: AskPanel mounts lazily — framer-motion +
                        lucide leave the initial bundle until the first ⌘J. */}
                    <AskPanelProvider>
                      <Navigation />
                      {/* Exp 09: cross-route View Transitions around the route
                          outlet. Reduced-motion users get instant navigation;
                          browsers without the API degrade to instant too. */}
                      <main id="main" className="min-h-screen pt-16">
                        <ViewTransitionsProvider>
                          {children}
                        </ViewTransitionsProvider>
                      </main>
                      <Footer />
                      <Toaster />
                    </AskPanelProvider>
                  </CommandPaletteProvider>
                </TactileFeedbackProvider>
              </LenisProvider>
            </MotionConfig>
          </LazyMotion>
        </ThemeProvider>
      </body>
    </html>
  );
}
