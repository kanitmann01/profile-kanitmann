"use client";

import { use, useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  X,
} from "lucide-react";
import { getNoteBySlug, getNotesByTopic } from "@/data/imat/registry";
import type { Subject } from "@/data/imat/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewSession } from "@/components/imat/review-session";
import { ReviewButtons } from "@/components/imat/review-buttons";
import { IMATPatternBadge } from "@/components/imat/imat-pattern-badge";
import { ExternalResourcesList } from "@/components/imat/external-resources-list";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { TableOfContents } from "@/components/imat/table-of-contents";
import { ReadingProgress } from "@/components/imat/reading-progress";
import { useIMATShortcuts } from "@/hooks/use-imat-shortcuts";
import { NoteNavigation } from "@/components/imat/note-navigation";
import { MobileBottomBar } from "@/components/imat/mobile-bottom-bar";
import { FocusModeProvider, useFocusMode } from "@/hooks/use-focus-mode";
import { ReadingTimeBadge } from "@/components/imat/reading-time-badge";
import { CollapsibleCallout } from "@/components/imat/collapsible-callout";
import { ShortcutsCheatsheet } from "@/components/imat/shortcuts-cheatsheet";
import { resolveCrosslinks } from "@/lib/imat-crosslinks";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { calculateReadingTime } from "@/lib/reading-time";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function NotePage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; note: string }>;
}) {
  return (
    <FocusModeProvider>
      <NotePageContent params={params} />
    </FocusModeProvider>
  );
}

function NotePageContent({
  params,
}: {
  params: Promise<{ subject: string; topic: string; note: string }>;
}) {
  const {
    subject: subjectSlug,
    topic: topicSlug,
    note: noteSlug,
  } = use(params);

  const router = useRouter();
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [mobileToCOpen, setMobileToCOpen] = useState(false);

  let note;
  try {
    note = getNoteBySlug(noteSlug);
  } catch {
    return (
      <div className="min-h-screen bg-background py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-5xl text-foreground mb-4">
            Not Found
          </h1>
          <p className="text-muted-foreground">
            The note &quot;{noteSlug}&quot; was not found.
          </p>
        </div>
      </div>
    );
  }

  const topicTitle = formatSlug(topicSlug);
  let sectionIndex = 0;

  const tocHeadings = useMemo(() => {
    const headings: { id: string; text: string; level: 2 | 3 }[] = [
      { id: "memory-hook", text: "Memory Hook", level: 2 },
      { id: "explanation", text: "Explanation", level: 2 },
    ];
    if (note.highYieldPoints && note.highYieldPoints.length > 0) {
      headings.push({ id: "high-yield", text: "High-Yield Points", level: 2 });
    }
    if (note.equations && note.equations.length > 0) {
      headings.push({ id: "equations", text: "Equations", level: 2 });
    }
    if (note.workedExamples && note.workedExamples.length > 0) {
      headings.push({
        id: "worked-examples",
        text: "Worked Examples",
        level: 2,
      });
    }
    headings.push({ id: "imat-trap", text: "IMAT Trap", level: 2 });
    headings.push({ id: "why-it-matters", text: "Why It Matters", level: 2 });
    if (note.externalResources && note.externalResources.length > 0) {
      headings.push({ id: "resources", text: "Resources", level: 2 });
    }
    if (note.questions.length > 0) {
      headings.push({ id: "active-recall", text: "Active Recall", level: 2 });
    }
    if (note.crosslinks.length > 0) {
      headings.push({ id: "related-notes", text: "Related Notes", level: 2 });
    }
    return headings;
  }, [note]);

  const sectionIds = useMemo(() => tocHeadings.map((h) => h.id), [tocHeadings]);

  const { prevNote, nextNote } = useMemo(() => {
    const notes = getNotesByTopic(subjectSlug as Subject, topicSlug);
    const idx = notes.findIndex((n) => n.slug === noteSlug);
    return {
      prevNote: idx > 0 ? notes[idx - 1] : null,
      nextNote: idx >= 0 && idx < notes.length - 1 ? notes[idx + 1] : null,
    };
  }, [noteSlug, topicSlug, subjectSlug]);

  const resolvedCrosslinks = useMemo(
    () => resolveCrosslinks(note.crosslinks),
    [note.crosslinks]
  );

  const readingMinutes = useMemo(
    () => calculateReadingTime(note.summary),
    [note.summary]
  );

  const handlePrev = useCallback(() => {
    if (prevNote)
      router.push(`/imat/${subjectSlug}/${topicSlug}/${prevNote.slug}`);
  }, [prevNote, router, subjectSlug, topicSlug]);

  const handleNext = useCallback(() => {
    if (nextNote)
      router.push(`/imat/${subjectSlug}/${topicSlug}/${nextNote.slug}`);
  }, [nextNote, router, subjectSlug, topicSlug]);

  useIMATShortcuts({ sectionIds });

  useSwipeNavigation({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === "f") {
        e.preventDefault();
        toggleFocusMode();
      }
      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleFocusMode]);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6">
      {!isFocusMode && <ReadingProgress />}
      <div className="container mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
          {!isFocusMode && (
            <aside className="hidden lg:block">
              <div className="sticky top-8 pt-4">
                <TableOfContents headings={tocHeadings} />
              </div>
            </aside>
          )}
          <div className="max-w-4xl">
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

            <motion.div
              id="title"
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <h1 className="font-serif text-4xl text-foreground mb-2">
                {note.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-lg text-muted-foreground">{note.summary}</p>
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
                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardContent className="pt-6">
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
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              id="explanation"
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <article className="prose dark:prose-invert max-w-none">
                {note.explanation}
              </article>
            </motion.div>

            {note.equations && note.equations.length > 0 && (
              <motion.div
                id="equations"
                custom={sectionIndex++}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sigma className="h-6 w-6 text-violet-600" />
                  <h2 className="font-serif text-2xl text-foreground">
                    Equations
                  </h2>
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
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-6 w-6 text-violet-600" />
                  <h2 className="font-serif text-2xl text-foreground">
                    Worked Examples
                  </h2>
                </div>
                <div className="grid gap-4">
                  {note.workedExamples.map((example, i) => (
                    <WorkedExampleCard key={i} example={example} />
                  ))}
                </div>
              </motion.div>
            )}

            {note.diagram && (
              <motion.div
                id="diagram"
                custom={sectionIndex++}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <Card>
                  <CardContent className="pt-6">
                    {note.diagram.type === "svg" ? (
                      <div
                        className="flex justify-center"
                        dangerouslySetInnerHTML={{ __html: note.diagram.data }}
                      />
                    ) : (
                      <pre className="text-sm overflow-x-auto">
                        {note.diagram.data}
                      </pre>
                    )}
                    {note.diagram.caption && (
                      <p className="text-sm text-muted-foreground text-center mt-3">
                        {note.diagram.caption}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              id="imat-trap"
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <CollapsibleCallout
                title="IMAT Trap"
                icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
                className="border-red-500/30 bg-red-500/5"
              >
                <p className="text-red-900/80 dark:text-red-200">
                  {note.imatTrap}
                </p>
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
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Related Notes
                </h2>
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
              currentSlug={noteSlug}
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
          </div>
        </div>
      </div>
      {!isFocusMode && (
        <MobileBottomBar
          onToggleToC={() => setMobileToCOpen((prev) => !prev)}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          hasPrev={!!prevNote}
          hasNext={!!nextNote}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
      {mobileToCOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileToCOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 pb-20">
            <TableOfContents headings={tocHeadings} />
          </div>
        </div>
      )}
      <ShortcutsCheatsheet
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
