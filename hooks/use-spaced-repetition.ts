"use client";

import { useState, useEffect, useCallback } from "react";

export type NoteProgress = {
  noteSlug: string;
  lastReviewed: string;
  confidence: "weak" | "ok" | "strong";
  nextReviewDate: string;
  reviewCount: number;
  interval: number;
};

export type Rating = "forgot" | "fuzzy" | "nailed";

const PROGRESS_KEY = "imat-progress";
const HISTORY_KEY = "imat-review-history";

function loadProgress(): Record<string, NoteProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProgress(progress: Record<string, NoteProgress>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function saveHistory(history: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}

export function useSpacedRepetition() {
  const [progress, setProgress] = useState<Record<string, NoteProgress>>({});
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setProgress(loadProgress());
    setHistory(loadHistory());
  }, []);

  const persist = useCallback(
    (nextProgress: Record<string, NoteProgress>, nextHistory: string[]) => {
      setProgress(nextProgress);
      setHistory(nextHistory);
      saveProgress(nextProgress);
      saveHistory(nextHistory);
    },
    []
  );

  const getProgress = useCallback((slug: string) => progress[slug], [progress]);

  const recordReview = useCallback(
    (slug: string, rating: Rating) => {
      const now = new Date();
      const existing = progress[slug];
      const prevInterval = existing ? existing.interval : 1;

      let newInterval: number;
      let confidence: "weak" | "ok" | "strong";

      if (!existing) {
        newInterval = 1;
      } else if (rating === "forgot") {
        newInterval = 1;
      } else if (rating === "fuzzy") {
        newInterval = prevInterval * 2.5;
      } else {
        newInterval = prevInterval * 4;
      }

      if (rating === "forgot") confidence = "weak";
      else if (rating === "fuzzy") confidence = "ok";
      else confidence = "strong";

      const nextReview = new Date(now);
      nextReview.setDate(nextReview.getDate() + newInterval);

      const entry: NoteProgress = {
        noteSlug: slug,
        lastReviewed: now.toISOString(),
        confidence,
        nextReviewDate: nextReview.toISOString(),
        reviewCount: (existing?.reviewCount ?? 0) + 1,
        interval: newInterval,
      };

      const nextProgress = { ...progress, [slug]: entry };
      const nextHistory = [...history, now.toISOString()];

      persist(nextProgress, nextHistory);
    },
    [progress, history, persist]
  );

  const getDueNotes = useCallback(() => {
    const now = new Date();
    return Object.values(progress)
      .filter((p) => new Date(p.nextReviewDate) <= now)
      .map((p) => p.noteSlug);
  }, [progress]);

  const getWeakNotes = useCallback(() => {
    return Object.values(progress)
      .filter((p) => p.confidence === "weak")
      .map((p) => p.noteSlug);
  }, [progress]);

  const getStreak = useCallback(() => {
    if (history.length === 0) return 0;

    const dateKeys = [...new Set(history.map(toDateKey))].sort().reverse();
    const today = toDateKey(new Date().toISOString());

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = toDateKey(yesterday.toISOString());

    if (dateKeys[0] !== today && dateKeys[0] !== yesterdayKey) return 0;

    let streak = 1;
    for (let i = 1; i < dateKeys.length; i++) {
      const prev = new Date(dateKeys[i - 1]);
      const curr = new Date(dateKeys[i]);
      const diffDays =
        (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diffDays) === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [history]);

  const getStats = useCallback(() => {
    const entries = Object.values(progress);
    return {
      reviewed: entries.length,
      weak: entries.filter((p) => p.confidence === "weak").length,
      ok: entries.filter((p) => p.confidence === "ok").length,
      strong: entries.filter((p) => p.confidence === "strong").length,
      total: entries.length,
    };
  }, [progress]);

  const getRecentReviews = useCallback(
    (days: number) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      const filtered = history.filter((h) => new Date(h) >= cutoff);
      const byDate: Record<string, number> = {};

      for (const h of filtered) {
        const key = toDateKey(h);
        byDate[key] = (byDate[key] || 0) + 1;
      }

      return Object.entries(byDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => (a.date > b.date ? -1 : 1));
    },
    [history]
  );

  const resetProgress = useCallback(() => {
    persist({}, []);
  }, [persist]);

  return {
    progress,
    getProgress,
    recordReview,
    getDueNotes,
    getWeakNotes,
    getStreak,
    getStats,
    getRecentReviews,
    resetProgress,
  };
}
