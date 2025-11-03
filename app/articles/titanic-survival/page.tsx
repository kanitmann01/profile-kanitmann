import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, TreePine } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import Script from "next/script"
import Link from "next/link"
import type { Metadata } from "next"

import { getArticleBySlug } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"
const article = getArticleBySlug("titanic-survival")
const canonicalUrl = new URL(article.canonicalPath, siteUrl).toString()
const heroImageUrl = article.heroImage ? new URL(article.heroImage, siteUrl).toString() : undefined

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: article.keywords,
  alternates: {
    canonical: article.canonicalPath,
  },
  authors: [{ name: "Kanit Mann" }],
  openGraph: {
    title: article.title,
    description: article.description,
    url: canonicalUrl,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    images: heroImageUrl ? [{ url: heroImageUrl }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.description,
    images: heroImageUrl ? [heroImageUrl] : undefined,
  },
}

export default function TitanicArticle() {
  const genderData = [
    { category: "Male", survived: 109, died: 468, survivalRate: 18.9 },
    { category: "Female", survived: 233, died: 81, survivalRate: 74.2 },
  ]

  const classData = [
    { category: "1st Class", survived: 136, died: 80, survivalRate: 63.0 },
    { category: "2nd Class", survived: 87, died: 97, survivalRate: 47.3 },
    { category: "3rd Class", survived: 119, died: 372, survivalRate: 24.2 },
  ]

  const ageData = [
    { category: "Children (0-16)", survived: 38, died: 52, survivalRate: 42.2 },
    { category: "Adults (17-64)", survived: 220, died: 334, survivalRate: 39.7 },
    { category: "Elderly (65+)", survived: 1, died: 6, survivalRate: 14.3 },
  ]

  const techStack = ["Python", "pandas", "scikit-learn", "matplotlib", "seaborn", "jupyter"]
  const hashtags = ["#DataScience", "#MachineLearning", "#Titanic", "#SocialInequality", "#DecisionTrees", "#Python"]
  const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })
  const publishedDateLabel = dateFormatter.format(new Date(article.publishedAt))
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: heroImageUrl,
    author: { "@type": "Person", name: "Kanit Mann" },
    publisher: {
      "@type": "Organization",
      name: "Kanit Mann Portfolio",
      logo: { "@type": "ImageObject", url: new URL("/images/profile/kanit-mann.png", siteUrl).toString() },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: article.keywords?.join(", "),
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${siteUrl}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <Script id="ld-article-titanic" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id="ld-breadcrumb-article-titanic" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </div>

          {/* Header */}
          <FadeIn className="mb-16">
            <header>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime="2025-03-15">March 15, 2025</time>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">Would You Have Survived the Titanic?</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              What this historic disaster reveals about inequality, decision-making, and leadership under pressure.
            </p>
            </header>
          </FadeIn>

        {/* Introduction */}
        <section className="mb-16">
          <article>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                On April 14, 1912, the RMS Titanic struck an iceberg and sank in the North Atlantic Ocean. Of the
                estimated 2,224 passengers and crew aboard, more than 1,500 died, making it one of the deadliest peacetime
                maritime disasters in history.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                But here's what makes the Titanic more than just a tragic story: the passenger manifest and survival
                records provide a stark data-driven view of how social class, gender, and age determined who lived and who
                died. This wasn't just about being in the right place at the right time, it was about who you were, not
                what you did.
              </p>
            </div>
          </article>
        </section>

        {/* Data Visualization Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Demographics Trumped Decisions</h2>
          <p className="text-muted-foreground mb-8">
            The data reveals clear patterns in survival rates based on passenger demographics. Using machine learning analysis, 
            we can see how gender, class, and age significantly influenced who survived the Titanic disaster.
          </p>

          {/* Gender Chart */}
          <SlideIn direction="left" className="mb-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Titanic Survival by Gender</h3>
            <div className="w-full max-w-full overflow-x-auto">
              <ScaleOnHover>
                <Card className="w-full max-w-full">
                  <CardContent className="pt-6 w-full max-w-full">
                    <ChartContainer
                      config={{
                        survived: {
                          label: "Survived",
                          color: "hsl(142, 76%, 36%)",
                        },
                        died: {
                          label: "Died",
                          color: "hsl(0, 84%, 60%)",
                        },
                      }}
                      className="h-[300px] sm:h-[350px] min-w-[320px] w-full max-w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="category" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend wrapperStyle={{ paddingTop: 20 }} />
                          <Bar dataKey="survived" fill="var(--color-survived)" name="Survived" />
                          <Bar dataKey="died" fill="var(--color-died)" name="Died" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <p className="text-sm text-muted-foreground mt-2">
                      Women had a 74.2% survival rate compared to just 18.9% for men
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </SlideIn>

          {/* Class Chart */}
          <div className="mb-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Titanic Survival by Passenger Class</h3>
            <div className="w-full max-w-full overflow-x-auto">
              <Card className="w-full max-w-full">
                <CardContent className="pt-6 w-full max-w-full">
                  <ChartContainer
                    config={{
                      survived: {
                        label: "Survived",
                        color: "hsl(142, 76%, 36%)",
                      },
                      died: {
                        label: "Died",
                        color: "hsl(0, 84%, 60%)",
                      },
                    }}
                    className="h-[300px] sm:h-[350px] min-w-[320px] w-full max-w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend wrapperStyle={{ paddingTop: 20 }} />
                        <Bar dataKey="survived" fill="var(--color-survived)" name="Survived" />
                        <Bar dataKey="died" fill="var(--color-died)" name="Died" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <p className="text-sm text-muted-foreground mt-2">
                    First-class passengers had a 63% survival rate, while third-class had only 24.2%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Age Chart */}
          <div className="mb-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Titanic Survival by Age Group</h3>
            <div className="w-full max-w-full overflow-x-auto">
              <Card className="w-full max-w-full">
                <CardContent className="pt-6 w-full max-w-full">
                  <ChartContainer
                    config={{
                      survived: {
                        label: "Survived",
                        color: "hsl(142, 76%, 36%)",
                      },
                      died: {
                        label: "Died",
                        color: "hsl(0, 84%, 60%)",
                      },
                    }}
                    className="h-[300px] sm:h-[350px] min-w-[320px] w-full max-w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend wrapperStyle={{ paddingTop: 20 }} />
                        <Bar dataKey="survived" fill="var(--color-survived)" name="Survived" />
                        <Bar dataKey="died" fill="var(--color-died)" name="Died" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <p className="text-sm text-muted-foreground mt-2">
                    Children had the highest survival rate at 42.2%, while elderly passengers had only 14.3%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Technical Approach</h3>
            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
              I trained a Decision Tree Classifier to predict survival based on passenger characteristics including age,
              gender, passenger class, number of siblings/spouses, number of parents/children, ticket fare, and port of
              embarkation. After tuning hyperparameters with GridSearchCV, the model reached strong predictive accuracy
              and provided clear insights into which factors most influenced survival chances.
            </p>
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-16">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              <TreePine className="inline h-8 w-8 mr-2 text-primary" />
              Key Insights From the Decision Tree
            </h2>
          </FadeIn>
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🌳</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Gender was the strongest predictor</h3>
                  <p className="text-foreground">
                    The "women and children first" protocol was largely followed, with women having nearly 4x higher
                    survival rates than men.
                  </p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🌳</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Class determined access to lifeboats</h3>
                  <p className="text-foreground">
                    First-class passengers had better access to lifeboats and information, with survival rates
                    decreasing dramatically by class.
                  </p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🌳</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Family size mattered</h3>
                  <p className="text-foreground">
                    Passengers with 1-3 family members had higher survival rates than those traveling alone or in very
                    large groups.
                  </p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🌳</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Age created a hierarchy within gender</h3>
                  <p className="text-foreground">
                    Among women, younger passengers had slightly better survival rates, while among men, age had less
                    impact.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* The Why Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">So Why Does This Matter Today?</h2>
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                Because in every crisis, from natural disasters to economic downturns to global pandemics, we see the same
                patterns emerge. Those with more resources, better access to information, and higher social status
                consistently have better outcomes. The Titanic wasn't unique in this regard; it was just unusually
                well-documented.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                When we build predictive models today, whether for loan approvals, hiring decisions, or resource
                allocation, we're essentially creating modern versions of the Titanic's passenger manifest. The question
                isn't whether these systems will reflect existing inequalities; it's whether we'll acknowledge that they
                do and work to address it.
              </p>
              <p className="text-foreground leading-relaxed">
                The data science lesson here isn't just about feature importance or model accuracy. It's about
                understanding that our algorithms don't just predict the future, they can perpetuate the past. Every time
                we deploy a model, we should ask ourselves: are we building lifeboats for everyone, or just determining
                which "class" our systems are really designed for?
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag) => (
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
