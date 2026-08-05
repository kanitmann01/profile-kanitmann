import { type ArticleMeta } from "@/data/articles";
import { type Project } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedWorkProps {
  article: ArticleMeta;
  allProjects: Project[];
}

/**
 * Project cross-links block (Wave C). Renders the projects an article's
 * `relatedProjectSlugs` point to, so article readers can jump straight into
 * the case study behind the topic.
 */
export function RelatedWork({ article, allProjects }: RelatedWorkProps) {
  const relatedProjects = (article.relatedProjectSlugs ?? [])
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-foreground mb-8">Related Work</h2>
      <ul className="space-y-3">
        {relatedProjects.map((project) => (
          <li key={project.slug}>
            <Link
              href={project.href}
              className="group inline-flex items-center gap-2 text-lg text-foreground hover:text-primary transition-colors"
            >
              <span>{project.title}</span>
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
