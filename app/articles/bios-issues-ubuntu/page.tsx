"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ShieldAlert, Cpu, Wrench } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import Head from "next/head"
import Script from "next/script"

export default function BiosIssuesUbuntuArticle() {
  const publishedDate = "September 8, 2025"
  const readTime = "5 min read"

  const tags = [
    "Linux",
    "Ubuntu",
    "UEFI",
    "Secure Boot",
    "BIOS",
    "Firmware",
    "LVFS",
  ]

  return (
    <>
      <Head>
        <title>Technical Blog 1: BIOS Issues and Ubuntu</title>
        <meta
          name="description"
          content="Troubleshooting BIOS, UEFI, and Secure Boot issues on Ubuntu: lessons from a community thread and a practical checklist for approaching firmware and OS interactions."
        />
        <meta
          name="keywords"
          content="Ubuntu, BIOS, UEFI, Secure Boot, LVFS, firmware, Linux troubleshooting, motherboard, ASRock"
        />
        <meta name="author" content="Kanit Mann" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Technical Blog 1: BIOS Issues and Ubuntu" />
        <meta
          property="og:description"
          content="Troubleshooting BIOS, UEFI, and Secure Boot issues on Ubuntu: lessons from a community thread and a practical checklist for approaching firmware and OS interactions."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kanit.codes/articles/bios-issues-ubuntu" />
        <meta property="og:image" content="https://kanit.codes/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technical Blog 1: BIOS Issues and Ubuntu" />
        <meta
          name="twitter:description"
          content="Troubleshooting BIOS, UEFI, and Secure Boot issues on Ubuntu: lessons from a community thread and a practical checklist for approaching firmware and OS interactions."
        />
        <meta name="twitter:image" content="https://kanit.codes/placeholder.jpg" />
        <link rel="canonical" href="https://kanit.codes/articles/bios-issues-ubuntu" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Technical Blog 1: BIOS Issues and Ubuntu",
              description:
                "Troubleshooting BIOS, UEFI, and Secure Boot issues on Ubuntu: lessons from a community thread and a practical checklist for approaching firmware and OS interactions.",
              image: "https://kanit.codes/placeholder.jpg",
              author: { "@type": "Person", name: "Kanit Mann" },
              publisher: {
                "@type": "Organization",
                name: "Kanit Mann Portfolio",
                logo: { "@type": "ImageObject", url: "https://kanit.codes/images/profile/kanit-mann.png" },
              },
              datePublished: "2025-09-08",
              dateModified: "2025-09-08",
              mainEntityOfPage: { "@type": "WebPage", "@id": "https://kanit.codes/articles/bios-issues-ubuntu" },
              keywords:
                "Ubuntu, BIOS, UEFI, Secure Boot, LVFS, firmware, Linux troubleshooting, motherboard, ASRock",
            }),
          }}
        />
      </Head>

      {/* Breadcrumb JSON-LD */}
      <Script id="ld-breadcrumb-article-bios" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Articles", item: "https://kanit.codes/articles" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Technical Blog 1: BIOS Issues and Ubuntu",
              item: "https://kanit.codes/articles/bios-issues-ubuntu",
            },
          ],
        })}
      </Script>

      <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          {/* Header */}
          <FadeIn className="mb-16">
            <header>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <time dateTime="2025-09-08">{publishedDate}</time>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Technical Blog 1: BIOS Issues and Ubuntu
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                A short dive into firmware–OS interactions, community-led troubleshooting, and a practical
                checklist for navigating BIOS/UEFI hiccups on Ubuntu.
              </p>
            </header>
          </FadeIn>

          {/* Intro */}
          <section className="mb-16">
            <article>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  Every week, I try to learn something new in the tech space and share my perspective. This week I
                  explored the Ubuntu Community Discourse and was drawn to a post titled
                  <a
                    href="https://discourse.ubuntu.com/t/issues-with-motherboard-bios-issues-appearing-on-ubuntu/66303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    "Issues with motherboard BIOS issues appearing on Ubuntu"
                  </a>
                  . The original poster described a frustrating experience on a new ASRock motherboard: stuck in
                  manufacturing mode, hardware security checks failing, and kernel update attempts introducing
                  “bad shim signature” errors, even after OS reinstalls and firmware updates.
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  What made the discussion fascinating (and a bit daunting) is how quickly troubleshooting becomes
                  layered when hardware, firmware, and the OS intersect. Suggestions spanned UEFI and Secure Boot
                  toggles, vendor firmware tools, and the Linux Vendor Firmware Service (LVFS). It was a reminder that
                  progress often requires patience, methodical testing, and sometimes imperfect workarounds, like
                  disabling Secure Boot temporarily or reverting kernels.
                </p>
              </div>
            </article>
          </section>

          {/* Why it’s complex */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Why BIOS + Ubuntu Gets Tricky</h2>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldAlert,
                  title: "Secure Boot & Shim",
                  text:
                    "Signature verification can break boot flows when firmware, shim, or kernels get out of sync.",
                },
                {
                  icon: Cpu,
                  title: "Vendor Firmware",
                  text:
                    "Motherboard tools and LVFS coexist; ordering and versions matter more than we think.",
                },
                {
                  icon: Wrench,
                  title: "UEFI Settings",
                  text:
                    "Manufacturing mode, TPM, and PK/KEK/DB entries can create failure modes that look like OS bugs.",
                },
              ].map((item, idx) => (
                <StaggerItem key={idx}>
                  <ScaleOnHover>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <item.icon className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-muted-foreground">{item.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* Practical checklist */}
          <section className="mb-16">
            <SlideIn direction="left" className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">A Practical Troubleshooting Checklist</h2>
              <p className="text-muted-foreground">
                Not exhaustive, but a helpful path before deep kernel surgery:
              </p>
            </SlideIn>
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="prose max-w-none">
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>
                    Confirm <strong>UEFI boot</strong> (not legacy/CSM), and note Secure Boot state. If errors mention
                    signatures, test with Secure Boot <em>temporarily</em> disabled.
                  </li>
                  <li>
                    Update motherboard firmware via vendor utility or <strong>LVFS</strong> where supported; reboot after
                    each update.
                  </li>
                  <li>
                    If stuck in <strong>manufacturing mode</strong>, review vendor docs for clearing it (PK/KEK/DB
                    enrollment) or resetting keys to factory defaults.
                  </li>
                  <li>
                    Reinstall Ubuntu using the latest ISO; verify the installer’s <strong>shim</strong> matches firmware
                    expectations.
                  </li>
                  <li>
                    Avoid hopping kernels too quickly; test the <strong>current GA kernel</strong> before trying mainline.
                  </li>
                  <li>
                    Document each change. If you fix it, leave notes for your future self, and the community.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Reflection */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Community, Curiosity, and Caution</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Reading through the replies energized me, I enjoy learning the hardware side of Linux. It also reinforced
              a healthy respect for the layers beneath modern, user-friendly distros. Forums like Ubuntu Discourse
              demystify a lot with lived experience, yet it’s easy to see how firmware issues intimidate newcomers.
            </p>
            <p className="text-foreground leading-relaxed">
              The most encouraging part? Communities of helpful people exist, and they make experimentation less scary.
              Paraphrasing an old idea: Welcome to <span className="line-through">Life</span> Linux, it’s a big boat with
              a lot of holes, but we’re all in it together.
            </p>
          </section>

          {/* Footer: tags */}
          <footer className="border-t pt-8">
            <div>
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


