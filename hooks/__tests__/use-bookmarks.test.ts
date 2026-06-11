import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBookmarks } from "../use-bookmarks";

describe("useBookmarks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty bookmarks initially", () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });

  it("adds a bookmark", () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield equation",
      });
    });

    expect(result.current.bookmarks).toHaveLength(1);
    expect(result.current.bookmarks[0]).toMatchObject({
      noteSlug: "glycolysis",
      sectionId: "eq-1",
      sectionType: "equation",
      label: "ATP yield equation",
    });
    expect(result.current.bookmarks[0].timestamp).toBeDefined();
  });

  it("removes a bookmark", () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield equation",
      });
    });

    expect(result.current.bookmarks).toHaveLength(1);

    act(() => {
      result.current.removeBookmark("glycolysis", "eq-1");
    });

    expect(result.current.bookmarks).toHaveLength(0);
  });

  it("isBookmarked returns correct state", () => {
    const { result } = renderHook(() => useBookmarks());

    expect(result.current.isBookmarked("glycolysis", "eq-1")).toBe(false);

    act(() => {
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield equation",
      });
    });

    expect(result.current.isBookmarked("glycolysis", "eq-1")).toBe(true);
  });

  it("getBookmarksForNote returns only matching bookmarks", () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield",
      });
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "we-1",
        sectionType: "worked-example",
        label: "Example 1",
      });
      result.current.addBookmark({
        noteSlug: "krebs-cycle",
        sectionId: "eq-2",
        sectionType: "equation",
        label: "NADH equation",
      });
    });

    const glycolysisBookmarks =
      result.current.getBookmarksForNote("glycolysis");
    expect(glycolysisBookmarks).toHaveLength(2);
    expect(glycolysisBookmarks.every((b) => b.noteSlug === "glycolysis")).toBe(
      true
    );
  });

  it("persists bookmarks to localStorage", () => {
    const { result, unmount } = renderHook(() => useBookmarks());

    act(() => {
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield",
      });
    });

    unmount();

    const { result: result2 } = renderHook(() => useBookmarks());
    expect(result2.current.bookmarks).toHaveLength(1);
    expect(result2.current.bookmarks[0].noteSlug).toBe("glycolysis");
  });

  it("does not add duplicate bookmarks", () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield",
      });
      result.current.addBookmark({
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation",
        label: "ATP yield",
      });
    });

    expect(result.current.bookmarks).toHaveLength(1);
  });
});
