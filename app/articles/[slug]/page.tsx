import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { ArticleHeader } from "@/components/article-header";
import { ReadingProgressRing } from "@/components/reading-progress-ring";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { RelatedArticles } from "@/components/related-articles";
import { RelatedWork } from "@/components/related-work";
import { PrevNextNav } from "@/components/prev-next-nav";
import { articles, getArticleBySlug } from "@/data/articles";
import { projects } from "@/data/projects";
import { articleContent } from "@/data/article-content";
import {
  buildArticleMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/article-metadata";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const ContentComponent = articleContent[slug];
  if (!ContentComponent) notFound();

  const articleSchema = buildArticleSchema(article);
  const breadcrumbSchema = buildBreadcrumbSchema(article);

  return (
    <>
      <script
        id={`ld-article-${slug}`}
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        id={`ld-breadcrumb-${slug}`}
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ReadingProgressRing>
        <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
          <div className="container mx-auto max-w-4xl w-full lg:mr-80 xl:mr-72">
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <Link href="/articles">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>
            </div>

            <FadeIn className="mb-16">
              <ArticleHeader
                title={article.title}
                description={article.summary}
                publishedAt={article.publishedAt}
                readTime={article.readTime}
              />
            </FadeIn>

            <TableOfContents containerId="article-content" />

            <article id="article-content" className="max-w-prose mx-auto">
              <ContentComponent />
            </article>

          <RelatedWork article={article} allProjects={projects} />
          <RelatedArticles currentArticle={article} allArticles={articles} />
          <PrevNextNav
            currentSlug={article.slug}
            ariaLabel="Previous and next article"
            entries={articles.map((a) => ({
              slug: a.slug,
              title: a.title,
              href: a.canonicalPath,
              sortValue: a.publishedAt,
            }))}
          />
          </div>
        </div>
      </ReadingProgressRing>
    </>
  );
}
