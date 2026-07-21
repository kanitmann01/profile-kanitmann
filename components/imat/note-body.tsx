"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  AlertTriangle,
  Stethoscope,
  Target,
  Zap,
  Sigma,
  BookOpen,
} from "lucide-react";
import type { AtomicNote } from "@/data/imat/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReviewSession } from "@/components/imat/review-session";
import { ReviewButtons } from "@/components/imat/review-buttons";
import { InlineReview } from "@/components/imat/inline-review";
import { ConceptMap } from "@/components/imat/concept-map";
import { SectionBookmark } from "@/components/imat/section-bookmark";
import { ConfidenceCalibration } from "@/components/imat/confidence-calibration";
import { IMATBreadcrumb } from "@/components/imat/imat-breadcrumb";
import { IMATPatternBadge } from "@/components/imat/imat-pattern-badge";
import { ExternalResourcesList } from "@/components/imat/external-resources-list";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { ReadingTimeBadge } from "@/components/imat/reading-time-badge";
import { CollapsibleCallout } from "@/components/imat/collapsible-callout";
import { NoteNavigation } from "@/components/imat/note-navigation";
import { resolveCrosslinks } from "@/lib/imat-crosslinks";
import { calculateReadingTime } from "@/lib/reading-time";
import { formatSlug } from "@/lib/imat-slugs";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

type NoteBodyProps = {
  note: AtomicNote;
  subjectSlug: string;
  topicSlug: string;
};

export function NoteBody({ note, subjectSlug, topicSlug }: NoteBodyProps) {
  let sectionIndex = 0;
  const topicTitle = formatSlug(topicSlug);

  const resolvedCrosslinks = useMemo(
    () => resolveCrosslinks(note.crosslinks),
    [note.crosslinks]
  );

  const readingMinutes = useMemo(
    () => calculateReadingTime(note.summary),
    [note.summary]
  );

  return (
    <>
      <IMATBreadcrumb
        items={[
          {
            label: formatSlug(subjectSlug),
            href: `/imat/${subjectSlug}`,
          },
          {
            label: topicTitle,
            href: `/imat/${subjectSlug}/${topicSlug}`,
          },
          { label: note.title },
        ]}
      />
      <motion.div
        id="back-nav"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href={`/imat/${subjectSlug}/${topicSlug}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to {topicTitle}
          </Link>
        </Button>
      </motion.div>

      {((note.prerequisites?.length ?? 0) > 0 ||
        note.crosslinks.length > 0) && (
        <motion.div
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <ConceptMap
            currentSlug={note.slug}
            currentTitle={note.title}
            prerequisites={note.prerequisites ?? []}
            crosslinks={note.crosslinks}
          />
        </motion.div>
      )}

      <motion.div
        id="title"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2">
          {note.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
          <p className="text-base sm:text-lg text-muted-foreground">
            {note.summary}
          </p>
          <ReadingTimeBadge minutes={readingMinutes} />
        </div>
        {note.imatPatterns && note.imatPatterns.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.imatPatterns.map((pattern, i) => (
              <IMATPatternBadge key={i} pattern={pattern} />
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        id="memory-hook"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <CollapsibleCallout
          title="Memory Hook"
          icon={<Brain className="h-6 w-6 text-indigo-600" />}
          className="border-indigo-500/30 bg-indigo-500/5"
        >
          <p className="text-indigo-900/80 dark:text-indigo-200">
            {note.memoryHook}
          </p>
        </CollapsibleCallout>
      </motion.div>

      {note.highYieldPoints && note.highYieldPoints.length > 0 && (
        <motion.div
          id="high-yield"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="bg-amber-500/5 border-l-2 border-amber-500/30 pl-4 py-3 pr-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-amber-700 mb-2">
                  High-Yield Points
                </h2>
                <ul className="grid gap-1.5">
                  {note.highYieldPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-amber-900/80 dark:text-amber-200"
                    >
                      <Target className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <ConfidenceCalibration noteSlug={note.slug} />

      <motion.div
        id="explanation"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 group"
      >
        <div className="relative">
          <div className="absolute right-0 top-0">
            <SectionBookmark
              noteSlug={note.slug}
              sectionId="explanation"
              sectionType="explanation"
              label="Explanation"
            />
          </div>
          <article className="imat-prose max-w-none">
            {note.explanation}
          </article>
        </div>
      </motion.div>

      {note.questions.length > 0 && (
        <motion.div
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <InlineReview questions={note.questions} noteSlug={note.slug} />
        </motion.div>
      )}

      <hr className="my-10 border-border/50" />

      {note.equations && note.equations.length > 0 && (
        <motion.div
          id="equations"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 group/eq">
            <Sigma className="h-5 w-5 text-violet-600" />
            <h2 className="font-serif text-xl text-foreground">Equations</h2>
            <SectionBookmark
              noteSlug={note.slug}
              sectionId="equations"
              sectionType="equation"
              label="Equations"
            />
          </div>
          <div className="grid gap-3">
            {note.equations.map((eq) => (
              <EquationBlock key={eq.id} equation={eq} />
            ))}
          </div>
        </motion.div>
      )}

      {note.workedExamples && note.workedExamples.length > 0 && (
        <motion.div
          id="worked-examples"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 group/we">
            <BookOpen className="h-5 w-5 text-violet-600" />
            <h2 className="font-serif text-xl text-foreground">
              Worked Examples
            </h2>
            <SectionBookmark
              noteSlug={note.slug}
              sectionId="worked-examples"
              sectionType="worked-example"
              label="Worked Examples"
            />
          </div>
          <div className="grid gap-4">
            {note.workedExamples.map((example, i) => (
              <WorkedExampleCard key={i} example={example} />
            ))}
          </div>
        </motion.div>
      )}

      <hr className="my-10 border-border/50" />

      {note.diagram && (
        <motion.div
          id="diagram"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="py-4">
            {note.diagram.type === "svg" ? (
              <div
                className="flex justify-center"
                dangerouslySetInnerHTML={{ __html: note.diagram.data }}
              />
            ) : (
              <pre className="text-sm overflow-x-auto">{note.diagram.data}</pre>
            )}
            {note.diagram.caption && (
              <p className="text-sm text-muted-foreground text-center mt-3">
                {note.diagram.caption}
              </p>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        id="imat-trap"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <CollapsibleCallout
          title="IMAT Trap"
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          className="border-red-500/30 bg-red-500/5"
        >
          <p className="text-red-900/80 dark:text-red-200">{note.imatTrap}</p>
        </CollapsibleCallout>
      </motion.div>

      <motion.div
        id="why-it-matters"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <CollapsibleCallout
          title="Why It Matters"
          icon={<Stethoscope className="h-6 w-6 text-green-600" />}
          className="border-green-500/30 bg-green-500/5"
        >
          <p className="text-green-900/80 dark:text-green-200">
            {note.whyItMatters}
          </p>
        </CollapsibleCallout>
      </motion.div>

      {note.externalResources && note.externalResources.length > 0 && (
        <motion.div
          id="resources"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <ExternalResourcesList resources={note.externalResources} />
        </motion.div>
      )}

      {note.questions.length > 0 && (
        <motion.div
          id="active-recall"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Active Recall
          </h2>
          <ReviewSession questions={note.questions} slug={note.slug} />
        </motion.div>
      )}

      {note.crosslinks.length > 0 && (
        <motion.div
          id="related-notes"
          custom={sectionIndex++}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Related
          </p>
          <div className="flex flex-wrap gap-2">
            {resolvedCrosslinks.map((link) => (
              <Link key={link.slug} href={link.href}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors min-h-[32px] px-3 py-1"
                >
                  {link.title}
                </Badge>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <NoteNavigation
        currentSlug={note.slug}
        topic={topicSlug}
        subject={subjectSlug}
      />

      <motion.div
        id="confidence"
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h2 className="font-serif text-2xl text-foreground mb-4">
          How confident are you?
        </h2>
        <ReviewButtons slug={note.slug} />
      </motion.div>
    </>
  );
}
