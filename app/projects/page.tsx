"use client";

import { Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { LinkChip } from "@/components/link-chip";
import { ListFilterBar } from "@/components/list-filter-bar";
import { Button } from "@/components/ui/button";
import { TechChip } from "@/components/tech-chip";
import { projects } from "@/data/projects";
import { useListFilter } from "@/hooks/use-list-filter";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { filterProjects, uniqueChips } from "@/lib/list-filter";

const stackChips = uniqueChips(projects.flatMap((project) => project.tags));
const stackValues = stackChips.map((chip) => chip.value);

function ProjectsContent() {
  const { selected, query, toggle, setQuery, clear } = useListFilter({
    paramKey: "stack",
    validValues: stackValues,
  });

  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const filterBarRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filterProjects(projects, selected, query).sort(
    (a, b) => b.order - a.order
  );

  // Wave E.5: `lenis/snap` proximity snapping on the editorial deck — each
  // project heading becomes a snap point. Desktop + pointer:fine only, with a
  // full reduced-motion bypass (matching the Lenis provider).
  useEffect(() => {
    if (!lenis || prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const snap = new Snap(lenis, { type: "proximity", debounce: 500 });
    const unsubscribe: Array<() => void> = [];
    document
      .querySelectorAll<HTMLElement>("[data-project-title]")
      .forEach((el) => unsubscribe.push(snap.addElement(el)));

    return () => {
      unsubscribe.forEach((fn) => fn());
      snap.destroy();
    };
  }, [lenis, prefersReducedMotion, selected, query]);

  // Wave E.5: while the filter bar holds focus (chips / search input), pause
  // Lenis entirely so typing and chip selection never fight the snap layer.
  useEffect(() => {
    if (!lenis || prefersReducedMotion) return;
    const bar = filterBarRef.current;
    if (!bar) return;

    const onFocusIn = () => lenis.stop();
    const onFocusOut = (e: FocusEvent) => {
      if (!bar.contains(e.relatedTarget as Node | null)) lenis.start();
    };
    bar.addEventListener("focusin", onFocusIn);
    bar.addEventListener("focusout", onFocusOut);
    return () => {
      bar.removeEventListener("focusin", onFocusIn);
      bar.removeEventListener("focusout", onFocusOut);
    };
  }, [lenis, prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-6xl font-serif text-foreground mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-mono text-sm uppercase tracking-wider">
              Data engineering, analytics, and ML — built end-to-end
            </p>
          </div>
        </FadeIn>

        <div ref={filterBarRef}>
          <ListFilterBar
            chips={stackChips}
            selected={selected}
            onToggle={toggle}
            searchQuery={query}
            onSearch={setQuery}
            searchPlaceholder="Search projects…"
            searchLabel="Search projects"
            label="Filter by stack"
            onClear={clear}
            showClear={filteredProjects.length > 0}
          />
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div data-list-empty className="py-20 text-center">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
              No projects match — clear filters
            </p>
            <Button type="button" variant="outline" size="sm" onClick={clear}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="space-y-28">
            {filteredProjects.map((project, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <ScrollReveal
                  key={project.slug}
                  as="article"
                  cssClass="rv-rise"
                  domProps={{ "data-editorial-project": true }}
                  motionProps={{
                    initial: { opacity: 0, y: 60 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-80px" },
                    transition: {
                      duration: 0.7,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  }}
                >
                  <Link
                    href={project.href}
                    className="block group no-underline"
                  >
                    <div
                      className={`flex flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-start`}
                    >
                      <div className="w-full md:w-1/2 flex-shrink-0">
                        {/* Exp 09: named view-transition element — morphs into
                            the project detail hero image (same slug name). */}
                        <div
                          className="relative overflow-hidden rounded-sm aspect-[4/3] bg-muted"
                          style={{
                            viewTransitionName: `project-image-${project.slug}`,
                          }}
                        >
                          <m.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              duration: 0.6,
                              ease: [0.21, 0.47, 0.32, 0.98],
                            }}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </m.div>
                          <m.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 flex flex-col justify-center py-2">
                        <div className="mb-3">
                          {project.status && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-1 rounded-sm">
                              {project.status}
                            </span>
                          )}
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-2">
                            {project.period}
                          </span>
                        </div>

                        <h2
                          data-project-title
                          className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-4 group-hover:text-primary transition-colors duration-300"
                        >
                          {project.title}
                          <LinkChip path={project.href} />
                        </h2>

                        <p className="text-muted-foreground text-base leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <div
                          data-project-tags
                          className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider"
                        >
                          {project.tags.map((tag) => (
                            <TechChip key={tag} label={tag} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-20">
              <h1 className="text-6xl font-serif text-foreground mb-4">
                Projects
              </h1>
            </div>
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
