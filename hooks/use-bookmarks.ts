"use client";

import { useState, useEffect, useCallback } from "react";

export type SectionType = "equation" | "worked-example" | "explanation";

export interface Bookmark {
  noteSlug: string;
  sectionId: string;
  sectionType: SectionType;
  label: string;
  timestamp: string;
}

const STORAGE_KEY = "imat-bookmarks";

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // ignore
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(loadBookmarks());
  }, []);

  const persist = useCallback((next: Bookmark[]) => {
    setBookmarks(next);
    saveBookmarks(next);
  }, []);

  const addBookmark = useCallback((input: Omit<Bookmark, "timestamp">) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (b) => b.noteSlug === input.noteSlug && b.sectionId === input.sectionId
      );
      if (exists) return prev;
      const next = [...prev, { ...input, timestamp: new Date().toISOString() }];
      saveBookmarks(next);
      return next;
    });
  }, []);

  const removeBookmark = useCallback((noteSlug: string, sectionId: string) => {
    setBookmarks((prev) => {
      const next = prev.filter(
        (b) => !(b.noteSlug === noteSlug && b.sectionId === sectionId)
      );
      saveBookmarks(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (noteSlug: string, sectionId: string) => {
      return bookmarks.some(
        (b) => b.noteSlug === noteSlug && b.sectionId === sectionId
      );
    },
    [bookmarks]
  );

  const getBookmarksForNote = useCallback(
    (noteSlug: string) => {
      return bookmarks.filter((b) => b.noteSlug === noteSlug);
    },
    [bookmarks]
  );

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarksForNote,
  };
}
