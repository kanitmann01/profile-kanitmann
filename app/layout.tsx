import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

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
