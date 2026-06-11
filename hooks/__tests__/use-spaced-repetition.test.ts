import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSpacedRepetition } from "../use-spaced-repetition";

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

describe("useSpacedRepetition", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty progress initially", () => {
    const { result } = renderHook(() => useSpacedRepetition());
    expect(result.current.progress).toEqual({});
  });

  it("getProgress returns undefined for unknown slug", () => {
    const { result } = renderHook(() => useSpacedRepetition());
    expect(result.current.getProgress("unknown")).toBeUndefined();
  });

  it("recordReview creates progress entry with forgot rating", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "forgot");
    });

    const p = result.current.getProgress("note-1");
    expect(p).toBeDefined();
    expect(p!.noteSlug).toBe("note-1");
    expect(p!.confidence).toBe("weak");
    expect(p!.interval).toBe(1);
    expect(p!.reviewCount).toBe(1);
  });

  it("recordReview creates progress entry with fuzzy rating", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "fuzzy");
    });

    const p = result.current.getProgress("note-1");
    expect(p).toBeDefined();
    expect(p!.confidence).toBe("ok");
    expect(p!.interval).toBe(1);
    expect(p!.reviewCount).toBe(1);
  });

  it("recordReview creates progress entry with nailed rating", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    const p = result.current.getProgress("note-1");
    expect(p).toBeDefined();
    expect(p!.confidence).toBe("strong");
    expect(p!.interval).toBe(1);
    expect(p!.reviewCount).toBe(1);
  });

  it("forgot resets interval to 1 day on subsequent review", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    act(() => {
      result.current.recordReview("note-1", "forgot");
    });

    const p = result.current.getProgress("note-1");
    expect(p!.interval).toBe(1);
    expect(p!.confidence).toBe("weak");
    expect(p!.reviewCount).toBe(2);
  });

  it("fuzzy multiplies interval by 2.5 on subsequent review", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    act(() => {
      result.current.recordReview("note-1", "fuzzy");
    });

    const p = result.current.getProgress("note-1");
    expect(p!.interval).toBe(2.5);
    expect(p!.confidence).toBe("ok");
  });

  it("nailed multiplies interval by 4 on subsequent review", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    const p = result.current.getProgress("note-1");
    expect(p!.interval).toBe(4);
    expect(p!.confidence).toBe("strong");
  });

  it("nextReviewDate is lastReviewed + interval days", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "fuzzy");
    });

    const p = result.current.getProgress("note-1");
    const lastReviewed = new Date(p!.lastReviewed);
    const nextReview = new Date(p!.nextReviewDate);
    const diffMs = nextReview.getTime() - lastReviewed.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    expect(Math.round(diffDays)).toBe(1);
  });

  it("getDueNotes returns notes past nextReviewDate", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("past-note", "forgot");
    });

    const progress = { ...result.current.progress };
    const pastNote = { ...progress["past-note"] };
    pastNote.nextReviewDate = daysAgo(2);
    progress["past-note"] = pastNote;

    const futureProgress = { ...progress };
    futureProgress["future-note"] = {
      noteSlug: "future-note",
      lastReviewed: new Date().toISOString(),
      confidence: "strong",
      nextReviewDate: daysFromNow(5),
      reviewCount: 1,
      interval: 4,
    };

    localStorage.setItem("imat-progress", JSON.stringify(futureProgress));

    const { result: result2 } = renderHook(() => useSpacedRepetition());
    const due = result2.current.getDueNotes();
    expect(due).toContain("past-note");
    expect(due).not.toContain("future-note");
  });

  it("getWeakNotes returns notes with weak confidence", () => {
    localStorage.setItem(
      "imat-progress",
      JSON.stringify({
        "weak-note": {
          noteSlug: "weak-note",
          lastReviewed: new Date().toISOString(),
          confidence: "weak",
          nextReviewDate: daysFromNow(1),
          reviewCount: 1,
          interval: 1,
        },
        "strong-note": {
          noteSlug: "strong-note",
          lastReviewed: new Date().toISOString(),
          confidence: "strong",
          nextReviewDate: daysFromNow(5),
          reviewCount: 1,
          interval: 4,
        },
      })
    );

    const { result } = renderHook(() => useSpacedRepetition());
    const weak = result.current.getWeakNotes();
    expect(weak).toContain("weak-note");
    expect(weak).not.toContain("strong-note");
  });

  it("getStreak counts consecutive days ending today", () => {
    const today = new Date().toISOString();
    const yesterday = daysAgo(1);
    const twoDaysAgo = daysAgo(2);

    localStorage.setItem(
      "imat-review-history",
      JSON.stringify([today, yesterday, twoDaysAgo])
    );

    const { result } = renderHook(() => useSpacedRepetition());
    expect(result.current.getStreak()).toBe(3);
  });

  it("getStreak counts consecutive days ending yesterday", () => {
    const yesterday = daysAgo(1);
    const twoDaysAgo = daysAgo(2);

    localStorage.setItem(
      "imat-review-history",
      JSON.stringify([yesterday, twoDaysAgo])
    );

    const { result } = renderHook(() => useSpacedRepetition());
    expect(result.current.getStreak()).toBe(2);
  });

  it("getStreak returns 0 when no recent reviews", () => {
    localStorage.setItem(
      "imat-review-history",
      JSON.stringify([daysAgo(5), daysAgo(6)])
    );

    const { result } = renderHook(() => useSpacedRepetition());
    expect(result.current.getStreak()).toBe(0);
  });

  it("getStats returns correct counts", () => {
    localStorage.setItem(
      "imat-progress",
      JSON.stringify({
        "note-1": {
          noteSlug: "note-1",
          lastReviewed: new Date().toISOString(),
          confidence: "weak",
          nextReviewDate: daysFromNow(1),
          reviewCount: 1,
          interval: 1,
        },
        "note-2": {
          noteSlug: "note-2",
          lastReviewed: new Date().toISOString(),
          confidence: "ok",
          nextReviewDate: daysFromNow(3),
          reviewCount: 2,
          interval: 2.5,
        },
        "note-3": {
          noteSlug: "note-3",
          lastReviewed: new Date().toISOString(),
          confidence: "strong",
          nextReviewDate: daysFromNow(10),
          reviewCount: 3,
          interval: 4,
        },
      })
    );

    const { result } = renderHook(() => useSpacedRepetition());
    const stats = result.current.getStats();
    expect(stats.total).toBe(3);
    expect(stats.weak).toBe(1);
    expect(stats.ok).toBe(1);
    expect(stats.strong).toBe(1);
    expect(stats.reviewed).toBe(3);
  });

  it("getRecentReviews returns daily counts", () => {
    const today = new Date().toISOString();
    const yesterday = daysAgo(1);

    localStorage.setItem(
      "imat-review-history",
      JSON.stringify([today, today, yesterday])
    );

    const { result } = renderHook(() => useSpacedRepetition());
    const recent = result.current.getRecentReviews(7);
    expect(recent.length).toBeGreaterThanOrEqual(2);

    const todayEntry = recent.find((r) => r.date === today.slice(0, 10));
    expect(todayEntry?.count).toBe(2);

    const yesterdayEntry = recent.find(
      (r) => r.date === yesterday.slice(0, 10)
    );
    expect(yesterdayEntry?.count).toBe(1);
  });

  it("persists data to localStorage", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    const stored = JSON.parse(localStorage.getItem("imat-progress") || "{}");
    expect(stored["note-1"]).toBeDefined();
    expect(stored["note-1"].confidence).toBe("strong");
  });

  it("persists review history to localStorage", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    const stored = JSON.parse(
      localStorage.getItem("imat-review-history") || "[]"
    );
    expect(stored.length).toBe(1);
  });

  it("data survives hook remount", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    const { result: result2 } = renderHook(() => useSpacedRepetition());
    expect(result2.current.getProgress("note-1")).toBeDefined();
    expect(result2.current.getProgress("note-1")!.confidence).toBe("strong");
  });

  it("resetProgress clears all data", () => {
    const { result } = renderHook(() => useSpacedRepetition());

    act(() => {
      result.current.recordReview("note-1", "nailed");
    });

    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.progress).toEqual({});
    expect(localStorage.getItem("imat-progress")).toBe("{}");
    expect(localStorage.getItem("imat-review-history")).toBe("[]");
  });
});
