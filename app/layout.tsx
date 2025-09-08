import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

// Favicon imports
import "@/public/favicon.ico"
import "@/public/favicon-16x16.png"
import "@/public/favicon-32x32.png"
import "@/public/apple-touch-icon.png"
import "@/public/android-chrome-192x192.png"
import "@/public/android-chrome-512x512.png"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kanit Mann - Data Scientist & Product Builder",
  description:
    "Building intelligent applications from data and cloud. Data Science MS student with expertise in statistical analysis, machine learning, and data visualization.",
  keywords: [
    "data scientist",
    "machine learning",
    "data science",
    "statistical analysis",
    "cloud infrastructure",
    "python",
    "tensorflow",
    "scikit-learn",
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
    title: "Kanit Mann - Data Scientist & Product Builder",
    description: "Building intelligent applications from data and cloud. Data Science MS student with expertise in statistical analysis, machine learning, and data visualization.",
    url: "https://kanit.codes",
    siteName: "Kanit Mann Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanit Mann - Data Scientist & Product Builder",
    description: "Building intelligent applications from data and cloud. Data Science MS student with expertise in statistical analysis, machine learning, and data visualization.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0FJ18KCCQ3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0FJ18KCCQ3');
          `}
        </Script>
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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
