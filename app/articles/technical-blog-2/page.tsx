"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Command, Monitor, Users } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import Head from "next/head"
import Link from "next/link"
import Script from "next/script"

const CLI_MERITS = [
  "Gives detailed control to the user",
  "Faster for repetitive or automated tasks",
  "Low memory consumption",
  "Looks cooler (according to the power-user bias!)",
]

const CLI_DEMERITS = [
  "Steeper initial learning curve",
  "Low fault tolerance when commands are mistyped",
  "Syntax knowledge required to be productive",
]

const GUI_MERITS = [
  "Graphically intuitive with a gentle learning curve",
  "Guided, discoverable workflows",
  "Visually polished and easy to navigate",
]

const GUI_DEMERITS = [
  "Higher memory consumption",
  "Can feel slower for experienced users",
  "Limited automation without third-party tools",
]

export default function TechnicalBlog2() {
  const publishedDate = "September 14, 2025"
  const readTime = "5 min read"

  const tags = [
    "Technical Blog",
    "CLI",
    "GUI",
    "Productivity",
    "Workflow",
  ]

  return (
    <>
      <Head>
        <title>Technical Blog 2: Command Line Interface vs Graphical User Interface</title>
        <meta
          name="description"
          content="A practitioner’s perspective on the CLI vs GUI debate: when to embrace the terminal, when to grab the mouse, and why a hybrid mindset wins."
        />
        <meta
          name="keywords"
          content="command line interface, graphical user interface, productivity, automation, tech blog"
        />
        <meta name="author" content="Kanit Mann" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Technical Blog 2: Command Line Interface vs Graphical User Interface" />
        <meta
          property="og:description"
          content="A practitioner’s perspective on the CLI vs GUI debate: when to embrace the terminal, when to grab the mouse, and why a hybrid mindset wins."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kanit.codes/articles/technical-blog-2" />
        <meta property="og:image" content="https://kanit.codes/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technical Blog 2: Command Line Interface vs Graphical User Interface" />
        <meta
          name="twitter:description"
          content="A practitioner’s perspective on the CLI vs GUI debate: when to embrace the terminal, when to grab the mouse, and why a hybrid mindset wins."
        />
        <meta name="twitter:image" content="https://kanit.codes/placeholder.jpg" />
        <link rel="canonical" href="https://kanit.codes/articles/technical-blog-2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Technical Blog 2: Command Line Interface vs Graphical User Interface",
              description:
                "A practitioner’s perspective on the CLI vs GUI debate: when to embrace the terminal, when to grab the mouse, and why a hybrid mindset wins.",
              image: "https://kanit.codes/placeholder.jpg",
              author: { "@type": "Person", name: "Kanit Mann" },
              publisher: {
                "@type": "Organization",
                name: "Kanit Mann Portfolio",
                logo: { "@type": "ImageObject", url: "https://kanit.codes/images/profile/kanit-mann.png" },
              },
              datePublished: "2025-09-14",
              dateModified: "2025-09-14",
              mainEntityOfPage: { "@type": "WebPage", "@id": "https://kanit.codes/articles/technical-blog-2" },
              keywords: "command line interface, graphical user interface, productivity, automation, tech blog",
            }),
          }}
        />
      </Head>

      <Script id="ld-breadcrumb-article-tech-blog-2" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Articles", item: "https://kanit.codes/articles" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Technical Blog 2: Command Line Interface vs Graphical User Interface",
              item: "https://kanit.codes/articles/technical-blog-2",
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
                <time dateTime="2025-09-14">{publishedDate}</time>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Technical Blog 2: Command Line Interface vs Graphical User Interface
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                The CLI vs GUI debate is a rite of passage for computer enthusiasts. After years in cloud engineering
                and plenty of scripting, I’ve learned that the most productive path is neither extreme—it’s
                understanding when each interface shines.
              </p>
            </header>
          </FadeIn>

          <section className="mb-16">
            <SlideIn direction="left">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  My own journey began with a CS engineering background and professional time spent deep in the
                  terminal. The initial CLI learning curve felt manageable because file navigation, scripts, and
                  automation were part of the job. For people new to computing, terminals can appear unforgiving, but
                  that first exposure often ignites curiosity—either you fall in love with the power or run back to graphical menus.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  After bouncing between both worlds, I now favor a hybrid mode: terminals for reproducibility and
                  automation; graphical interfaces for discovery, visualization, and creative flow. The key is knowing why you are reaching for one or the other.
                </p>
              </div>
            </SlideIn>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Merits and Demerits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Command className="h-5 w-5 text-primary" /> Command Line Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MeritList title="Merits" items={CLI_MERITS} />
                  <MeritList title="Demerits" items={CLI_DEMERITS} variant="demerit" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Monitor className="h-5 w-5 text-primary" /> Graphical User Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MeritList title="Merits" items={GUI_MERITS} />
                  <MeritList title="Demerits" items={GUI_DEMERITS} variant="demerit" />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Rules of Thumb</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Start with GUI",
                  icon: Users,
                  text: "It’s discoverable and forgiving. Ideal for exploring new tools, learning a workflow, or presenting ideas to stakeholders.",
                },
                {
                  title: "Automate with CLI",
                  icon: Command,
                  text: "When the process repeats, scripts, aliases, and pipelines save hours. The terminal becomes a multiplayer tool through version control.",
                },
                {
                  title: "Blend Both",
                  icon: Monitor,
                  text: "Use GUI dashboards to monitor output while CLI scripts generate the data behind them. The combo is where craft meets speed.",
                },
              ].map((item, index) => (
                <Card key={index}>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Why the Hybrid Approach Wins</h2>
            <p className="text-muted-foreground leading-relaxed">
              My default workflow is CLI-first for anything that needs to be repeatable—deployments, server
              configuration, data pipelines. But when exploring data, storyboard-ing a presentation, or collaborating
              with teammates, a GUI keeps the conversation inclusive. Switching mental models is a skill worth
              practicing; it ensures tools serve the problem rather than the other way around.
            </p>
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

function MeritList({ title, items, variant = "merit" }: { title: string; items: string[]; variant?: "merit" | "demerit" }) {
  return (
    <div>
      <h3 className="font-semibold text-base text-foreground mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className={variant === "demerit" ? "text-red-600 dark:text-red-400" : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
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


