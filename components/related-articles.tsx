import { type ArticleMeta } from "@/data/articles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  currentArticle: ArticleMeta;
  allArticles: ArticleMeta[];
}

/**
 * Related-articles module (Wave C). Clones the RelatedProjects pattern:
 * hand-curated `relatedArticleSlugs` first, then a tag-overlap ranking that
 * fills up to 3 same-topic articles.
 */
export function RelatedArticles({
  currentArticle,
  allArticles,
}: RelatedArticlesProps) {
  const explicit = (currentArticle.relatedArticleSlugs ?? [])
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter((a): a is ArticleMeta => Boolean(a))
    .filter((a) => a.slug !== currentArticle.slug);

  const byTopic = allArticles
    .filter((a) => a.slug !== currentArticle.slug)
    .filter((a) => !explicit.some((e) => e.slug === a.slug))
    .map((article) => {
      const sharedTags = article.tags.filter((tag) =>
        currentArticle.tags.includes(tag)
      );
      return { article, sharedTags: sharedTags.length };
    })
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) {
        return b.sharedTags - a.sharedTags;
      }
      return b.article.publishedAt.localeCompare(a.article.publishedAt);
    })
    .map(({ article }) => article);

  const related = [...explicit, ...byTopic].slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-foreground mb-8">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={article.canonicalPath}
            className="group"
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative h-32 overflow-hidden rounded-t-lg bg-muted">
                {article.heroImage ? (
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : null}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-primary font-medium">
                  Read Article <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
