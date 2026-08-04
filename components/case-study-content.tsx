import type { Project, ProjectMetric } from "@/data/projects";
import { projectDiagrams } from "@/data/diagram-content";
import { Github, ExternalLink } from "lucide-react";

/**
 * Metric-led case-study layout (Exp 14). Renders the `caseStudy` schema in a
 * fixed editorial order: problem → approach → outcome metrics strip →
 * pipeline diagram → evaluation → retrospective → tech chips → links.
 *
 * Server component: the pipeline diagram is a static, build-time-rendered
 * SVG inlined from data/diagram-content.ts — no client JS for diagrams.
 */
export function CaseStudyContent({ project }: { project: Project }) {
  const study = project.caseStudy;
  if (!study) return null;

  const diagram = projectDiagrams[project.slug];

  return (
    <>
      <SectionHeading id="problem" title="Problem" />
      <p className="font-sans text-muted-foreground leading-relaxed mb-20">
        {study.problem}
      </p>

      <SectionHeading id="approach" title="Approach" />
      <ol className="space-y-6 mb-20">
        {study.approach.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex-shrink-0 font-mono text-sm text-primary border border-primary/40 rounded-sm px-2 py-1 h-fit"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="font-sans text-muted-foreground leading-relaxed">
              {step}
            </p>
          </li>
        ))}
      </ol>

      <SectionHeading id="outcome" title="Outcome" />
      <div className="grid gap-6 sm:grid-cols-3 mb-20">
        {study.outcome.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      {diagram && (
        <>
          <SectionHeading id="pipeline" title="Pipeline" />
          <figure className="mb-20">
            <div className="bg-muted/30 border border-border rounded-lg p-6 overflow-x-auto">
              {/* Static SVG inlined at build time (Exp 14). The diagram is
                  aria-hidden; the figcaption carries the accessible name. */}
              <div
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: diagram }}
                className="min-w-fit [&_svg]:block [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-w-none"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {project.title} — pipeline overview (Mermaid, rendered at build
              time)
            </figcaption>
          </figure>
        </>
      )}

      {study.evaluation && (
        <>
          <SectionHeading id="evaluation" title="Evaluation" />
          <p className="font-sans text-muted-foreground leading-relaxed mb-20">
            {study.evaluation}
          </p>
        </>
      )}

      <SectionHeading id="retrospective" title="What I'd Do Differently" />
      <p className="font-sans text-muted-foreground leading-relaxed mb-20">
        {study.retrospective}
      </p>

      <SectionHeading id="tech-stack" title="Tech Stack" />
      <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider mb-20">
        {project.tags.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 border border-primary/30 text-primary rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.demo || project.github) && (
        <>
          <SectionHeading id="links" title="Links" />
          <div className="flex flex-wrap gap-4 mb-20">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-sans hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-md text-sm font-sans text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub Repo
              </a>
            )}
          </div>
        </>
      )}
    </>
  );
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <>
      <h2
        id={id}
        className="font-serif text-3xl text-foreground mb-2 scroll-mt-24"
      >
        {title}
      </h2>
      <div className="w-12 h-0.5 bg-primary mb-8" />
    </>
  );
}

function MetricCard({ metric }: { metric: ProjectMetric }) {
  return (
    <div className="border border-border rounded-lg p-6 bg-muted/30">
      <p className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-3">
        {metric.value}
      </p>
      <p className="font-mono text-xs uppercase tracking-wider text-foreground mb-2">
        {metric.label}
      </p>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
        {metric.context}
      </p>
    </div>
  );
}
