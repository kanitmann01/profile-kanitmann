"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks, type SectionType } from "@/hooks/use-bookmarks";

interface SectionBookmarkProps {
  noteSlug: string;
  sectionId: string;
  sectionType: SectionType;
  label: string;
  className?: string;
}

export function SectionBookmark({
  noteSlug,
  sectionId,
  sectionType,
  label,
  className,
}: SectionBookmarkProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(noteSlug, sectionId);

  const handleClick = () => {
    if (bookmarked) {
      removeBookmark(noteSlug, sectionId);
    } else {
      addBookmark({ noteSlug, sectionId, sectionType, label });
    }
  };

  const Icon = bookmarked ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-md transition-colors",
        "opacity-60 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 focus:opacity-100",
        "hover:bg-muted",
        bookmarked && "opacity-100 text-amber-600 dark:text-amber-400",
        className
      )}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      data-testid="bookmark-toggle"
    >
      <Icon
        className="h-4 w-4"
        data-testid="bookmark-icon"
        data-filled={bookmarked ? "true" : "false"}
      />
    </button>
  );
}
