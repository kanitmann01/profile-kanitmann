"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Cog, Keyboard, MousePointer2, Wrench } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import Head from "next/head"
import Link from "next/link"
import Script from "next/script"

export default function TechnicalBlog3() {
  const publishedDate = "September 21, 2025"
  const readTime = "4 min read"

  const tags = [
    "Technical Blog",
    "Windows",
    "Registry",
    "Automation",
    "Productivity",
  ]

  return (
    <>
      <Head>
        <title>Technical Blog 3: The Wonderful World of Windows Registry</title>
        <meta
          name="description"
          content="A firsthand story about wrestling with corporate device restrictions, discovering the Windows Registry, and automating the fixes."
        />
        <meta
          name="keywords"
          content="windows registry, automation, corporate laptop, productivity, scripting"
        />
        <meta name="author" content="Kanit Mann" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Technical Blog 3: The Wonderful World of Windows Registry" />
        <meta
          property="og:description"
          content="A firsthand story about wrestling with corporate device restrictions, discovering the Windows Registry, and automating the fixes."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kanit.codes/articles/technical-blog-3" />
        <meta property="og:image" content="https://kanit.codes/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technical Blog 3: The Wonderful World of Windows Registry" />
        <meta
          name="twitter:description"
          content="A firsthand story about wrestling with corporate device restrictions, discovering the Windows Registry, and automating the fixes."
        />
        <meta name="twitter:image" content="https://kanit.codes/placeholder.jpg" />
        <link rel="canonical" href="https://kanit.codes/articles/technical-blog-3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Technical Blog 3: The Wonderful World of Windows Registry",
              description:
                "A firsthand story about wrestling with corporate device restrictions, discovering the Windows Registry, and automating the fixes.",
              image: "https://kanit.codes/placeholder.jpg",
              author: { "@type": "Person", name: "Kanit Mann" },
              publisher: {
                "@type": "Organization",
                name: "Kanit Mann Portfolio",
                logo: { "@type": "ImageObject", url: "https://kanit.codes/images/profile/kanit-mann.png" },
              },
              datePublished: "2025-09-21",
              dateModified: "2025-09-21",
              mainEntityOfPage: { "@type": "WebPage", "@id": "https://kanit.codes/articles/technical-blog-3" },
              keywords: "windows registry, automation, corporate laptop, productivity, scripting",
            }),
          }}
        />
      </Head>

      <Script id="ld-breadcrumb-article-tech-blog-3" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Articles", item: "https://kanit.codes/articles" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Technical Blog 3: The Wonderful World of Windows Registry",
              item: "https://kanit.codes/articles/technical-blog-3",
            },
          ],
        })}
      </Script>

      <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/articles">
                <ArrowLeftIcon />
                Back to Articles
              </Link>
            </Button>
          </div>

          <FadeIn className="mb-16">
            <header>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <time dateTime="2025-09-21">{publishedDate}</time>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Technical Blog 3: The Wonderful World of Windows Registry
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Corporate laptops love guardrails. When a locked-down system slowed my mouse to a crawl, the Windows
                Registry became the unlikely hero that restored productivity.
              </p>
            </header>
          </FadeIn>

          <section className="mb-16">
            <SlideIn direction="left">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Back in 2023 I was issued a corporate laptop with "setting locked" controls. The trackpad and mouse
                  were painfully slow, and every Windows update reset whatever the IT team fixed. After enough tickets,
                  I gave up on the pointing devices and leaned on keyboard shortcuts—an interesting experiment, but not
                  efficient inside a GUI-first OS.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A tip from Reddit pointed me toward the Windows Registry. If the UI is blocked but Registry access is
                  available, you can edit the same settings at the source. The key for mouse speed lives at
                  <code>HKEY_CURRENT_USER\Control Panel\Mouse</code>. One tweak and a reboot later, my pointer moved at human speed again.
                </p>
              </div>
            </SlideIn>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Registry Hack in Practice</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: MousePointer2,
                  title: "Find the Bottleneck",
                  text: "Identify which OS feature feels broken. In my case, the pointer speed slider was disabled by policy.",
                },
                {
                  icon: Keyboard,
                  title: "Locate the Key",
                  text: "Search Microsoft docs or community posts for the registry path. Mouse speed maps to the `MouseSensitivity` value.",
                },
                {
                  icon: Wrench,
                  title: "Automate It",
                  text: "Create a `.reg` script or PowerShell snippet to reapply the change after every update. Automation beats annoyance.",
                },
              ].map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <item.icon className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">What the Registry Taught Me</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Cog className="h-5 w-5 text-primary" /> Systems empathy matters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Locked-down environments aren’t malicious-they protect credentials and compliance. Understanding the
                    rationale helps when searching for sanctioned workarounds.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wrench className="h-5 w-5 text-primary" /> Document the fix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    I eventually scripted the registry change so it ran at startup. That small automation removed weekly friction and gave teammates a repeatable solution.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Keyboard className="h-5 w-5 text-primary" /> Keyboard skills still help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Going keyboard-only wasn’t sustainable, but the detour reinforced how powerful shortcuts and scripting are-even in Windows’ GUI-centric ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <footer className="border-t pt-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}


