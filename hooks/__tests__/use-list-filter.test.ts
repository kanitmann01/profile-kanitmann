import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

const { mockReplace, mockUseSearchParams, mockUsePathname } = vi.hoisted(
  () => ({
    mockReplace: vi.fn(),
    mockUseSearchParams: vi.fn(() => new URLSearchParams("")),
    mockUsePathname: vi.fn(() => "/projects"),
  })
);

vi.mock("next/navigation", () => ({
  useSearchParams: mockUseSearchParams,
  useRouter: () => ({ replace: mockReplace }),
  usePathname: mockUsePathname,
}));

import { useListFilter } from "../use-list-filter";

const VALID_VALUES = ["Python", "Apache Spark", "Flask"];

describe("useListFilter", () => {
  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    mockUsePathname.mockReturnValue("/projects");
    mockReplace.mockReset();
  });

  it("pre-populates selected chips from the URL param on load", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("stack=Apache%20Spark,Python")
    );
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.selected).toEqual(["Apache Spark", "Python"]);
  });

  it("accepts lowercase URL values, mapping to canonical casing", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("stack=python,flask")
    );
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.selected).toEqual(["Python", "Flask"]);
  });

  it("drops invalid values from the URL param", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("stack=Python,notatag")
    );
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.selected).toEqual(["Python"]);
  });

  it("pre-populates the query from ?q= on load", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=rag"));
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.query).toBe("rag");
  });

  it("returns empty state when no URL params are present", () => {
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.selected).toEqual([]);
    expect(result.current.query).toBe("");
    expect(result.current.isActive).toBe(false);
  });

  it("toggle adds a chip and replaces the URL", () => {
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    act(() => result.current.toggle("Python"));
    expect(result.current.selected).toEqual(["Python"]);
    expect(mockReplace).toHaveBeenCalledWith("/projects?stack=Python", {
      scroll: false,
    });
  });

  it("toggle of a selected chip removes it", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("stack=Python"));
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    act(() => result.current.toggle("Python"));
    expect(result.current.selected).toEqual([]);
    expect(mockReplace).toHaveBeenCalledWith("/projects", { scroll: false });
  });

  it("setQuery updates state and the URL", () => {
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    act(() => result.current.setQuery("rag"));
    expect(result.current.query).toBe("rag");
    expect(mockReplace).toHaveBeenCalledWith("/projects?q=rag", {
      scroll: false,
    });
  });

  it("setQuery with an empty string removes the q param", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=rag"));
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    act(() => result.current.setQuery(""));
    expect(result.current.query).toBe("");
    expect(mockReplace).toHaveBeenCalledWith("/projects", { scroll: false });
  });

  it("clear resets chips, query, and the URL", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("stack=Python,Flask&q=rag")
    );
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    act(() => result.current.clear());
    expect(result.current.selected).toEqual([]);
    expect(result.current.query).toBe("");
    expect(result.current.isActive).toBe(false);
    expect(mockReplace).toHaveBeenCalledWith("/projects", { scroll: false });
  });

  it("preserves unrelated URL params when updating", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("utm_source=x&stack=Python")
    );
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    act(() => result.current.clear());
    expect(mockReplace).toHaveBeenCalledWith("/projects?utm_source=x", {
      scroll: false,
    });
  });

  it("re-syncs chips and query when the URL changes (back/forward)", () => {
    const { result, rerender } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.selected).toEqual([]);
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("stack=Flask&q=rag")
    );
    rerender();
    expect(result.current.selected).toEqual(["Flask"]);
    expect(result.current.query).toBe("rag");
  });

  it("isActive is true when a chip is selected or a query is set", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("stack=Python"));
    const { result } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(result.current.isActive).toBe(true);

    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=rag"));
    const { result: queryResult } = renderHook(() =>
      useListFilter({ paramKey: "stack", validValues: VALID_VALUES })
    );
    expect(queryResult.current.isActive).toBe(true);
  });
});
