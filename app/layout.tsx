import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, JetBrains_Mono, Geist } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { TactileFeedbackProvider } from "@/components/tactile-feedback-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Kanit Mann - Data & ML Engineer",
  description:
    "Data & ML Engineer specializing in cloud infrastructure, ML pipelines, and analytics. MS Data Science, University of Arizona.",
  keywords: [
    "data engineer",
    "machine learning",
    "data science",
    "data pipelines",
    "cloud infrastructure",
    "python",
    "apache spark",
    "snowflake",
    "portfolio"
  ],
  authors: [{ name: "Kanit Mann" }],
  creator: "Kanit Mann",
  publisher: "Kanit Mann",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kanit.codes"),
  alternates: {
    canonical: "/",
  },
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
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kanit Mann - Data & ML Engineer",
    description: "Data & ML Engineer specializing in cloud infrastructure, ML pipelines, and analytics. MS Data Science, University of Arizona.",
    url: "https://kanit.codes",
    siteName: "Kanit Mann Portfolio",
    type: "website",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanit Mann - Data & ML Engineer",
    description: "Data & ML Engineer specializing in cloud infrastructure, ML pipelines, and analytics. MS Data Science, University of Arizona.",
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
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kanit Mann",
            "url": "https://kanit.codes",
            "publisher": {
              "@type": "Person",
              "name": "Kanit Mann"
            },
            "inLanguage": "en-US"
          })}
        </Script>
        {/* Structured Data: Person */}
        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kanit Mann",
            "jobTitle": "Data & ML Engineer",
            "url": "https://kanit.codes",
            "sameAs": [
              "https://github.com/kanitmann01",
              "https://linkedin.com/in/kanitmann"
            ]
          })}
        </Script>
        {/* Structured Data: Site Navigation */}
        <Script id="ld-sitenav" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "SiteNavigationElement", "position": 1, "name": "Home", "url": "https://kanit.codes/" },
              { "@type": "SiteNavigationElement", "position": 2, "name": "Projects", "url": "https://kanit.codes/projects" },
              { "@type": "SiteNavigationElement", "position": 3, "name": "Articles", "url": "https://kanit.codes/articles" },
              { "@type": "SiteNavigationElement", "position": 4, "name": "About", "url": "https://kanit.codes/about" },
              { "@type": "SiteNavigationElement", "position": 5, "name": "Contact", "url": "https://kanit.codes/contact" },
              { "@type": "SiteNavigationElement", "position": 6, "name": "Resume", "url": "https://kanit.codes/Kanit%20Mann%20-%20Resume.pdf" }
            ]
          })}
        </Script>
        {/* Feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Kanit Mann - RSS" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Kanit Mann - Atom" href="/atom.xml" />
        {/* Calendly */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async />
      </head>
      <body className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${geistSans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TactileFeedbackProvider>
            <Navigation />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <Toaster />
          </TactileFeedbackProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
