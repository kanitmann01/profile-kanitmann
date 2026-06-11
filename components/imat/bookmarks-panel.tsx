"use client";

import Link from "next/link";
import { X, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { getNoteBySlug } from "@/data/imat/registry";

export function BookmarksPanel() {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-8 text-muted-foreground"
        data-testid="bookmarks-panel"
      >
        <Bookmark className="h-8 w-8 mb-2 opacity-50" />
        <p>No bookmarks yet</p>
      </div>
    );
  }

  const grouped = bookmarks.reduce(
    (acc, bookmark) => {
      if (!acc[bookmark.noteSlug]) {
        acc[bookmark.noteSlug] = [];
      }
      acc[bookmark.noteSlug].push(bookmark);
      return acc;
    },
    {} as Record<string, typeof bookmarks>
  );

  return (
    <div className="space-y-4" data-testid="bookmarks-panel">
      {Object.entries(grouped).map(([noteSlug, items]) => {
        const note = getNoteBySlug(noteSlug);
        const noteTitle = note?.title ?? noteSlug;
        const subject = note?.subject ?? "biology";
        const topic = note?.topic ?? "";

        return (
          <Card key={noteSlug}>
            <CardContent className="pt-4">
              <h3 className="font-medium mb-2 text-sm text-muted-foreground">
                {noteTitle}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li
                    key={`${item.noteSlug}-${item.sectionId}`}
                    className="flex items-center justify-between gap-2"
                  >
                    <Link
                      href={`/imat/${subject}/${topic}/${noteSlug}#${item.sectionId}`}
                      className="text-sm hover:underline flex-1 truncate"
                    >
                      {item.label}
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        removeBookmark(item.noteSlug, item.sectionId)
                      }
                      className="min-h-[44px] min-w-[44px] p-0"
                      aria-label="Remove bookmark"
                      data-testid="remove-bookmark"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
