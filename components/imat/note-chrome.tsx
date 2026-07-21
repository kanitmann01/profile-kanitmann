"use client";

import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import { getNotesByTopic } from "@/data/imat/registry";
import type { Subject, AtomicNote } from "@/data/imat/types";
import { TableOfContents } from "@/components/imat/table-of-contents";
import { ReadingProgress } from "@/components/imat/reading-progress";
import { useIMATShortcuts } from "@/hooks/use-imat-shortcuts";
import { MobileBottomBar } from "@/components/imat/mobile-bottom-bar";
import { FocusModeProvider, useFocusMode } from "@/hooks/use-focus-mode";
import { ShortcutsCheatsheet } from "@/components/imat/shortcuts-cheatsheet";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { BookmarksPanel } from "@/components/imat/bookmarks-panel";
import { formatSlug } from "@/lib/imat-slugs";

type NoteChromeProps = {
  note: AtomicNote;
  subjectSlug: string;
  topicSlug: string;
  noteSlug: string;
  children: ReactNode;
};

function NoteChromeInner({
  note,
  subjectSlug,
  topicSlug,
  noteSlug,
  children,
}: NoteChromeProps) {
  const router = useRouter();
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [mobileToCOpen, setMobileToCOpen] = useState(false);
  const [mobileBookmarksOpen, setMobileBookmarksOpen] = useState(false);

  const topicTitle = formatSlug(topicSlug);

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
        <div className="lg:grid lg:grid-cols-[16rem_1fr_16rem] lg:gap-8">
          {!isFocusMode && (
            <aside className="hidden lg:block">
              <div className="sticky top-8 pt-4">
                <nav>
                  <ol className="flex flex-col gap-2 text-sm">
                    <li>
                      <Link
                        href={`/imat/${subjectSlug}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {formatSlug(subjectSlug)}
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 text-muted-foreground pl-3">
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                      <Link
                        href={`/imat/${subjectSlug}/${topicSlug}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {topicTitle}
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 text-foreground font-medium pl-6">
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                      {note.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </aside>
          )}
          <div className="max-w-4xl">{children}</div>
          {!isFocusMode && (
            <aside className="hidden lg:block">
              <div className="sticky top-8 pt-4">
                <TableOfContents headings={tocHeadings} />
              </div>
            </aside>
          )}
        </div>
      </div>
      {!isFocusMode && (
        <MobileBottomBar
          onToggleToC={() => setMobileToCOpen((prev) => !prev)}
          onToggleBookmarks={() => setMobileBookmarksOpen((prev) => !prev)}
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
      {mobileBookmarksOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur overflow-y-auto">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-serif text-xl">Bookmarks</h2>
            <button
              onClick={() => setMobileBookmarksOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 pb-20">
            <BookmarksPanel />
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

export function NoteChrome(props: NoteChromeProps) {
  return (
    <FocusModeProvider>
      <NoteChromeInner {...props} />
    </FocusModeProvider>
  );
}
