import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

const { mockReplace, mockUseSearchParams, mockUsePathname } = vi.hoisted(
  () => ({
    mockReplace: vi.fn(),
    mockUseSearchParams: vi.fn(() => new URLSearchParams("")),
    mockUsePathname: vi.fn(() => "/fable-5"),
  })
);

vi.mock("next/navigation", () => ({
  useSearchParams: mockUseSearchParams,
  useRouter: () => ({ replace: mockReplace }),
  usePathname: mockUsePathname,
}));

import { useFable5Filter } from "../use-fable5-filter";

describe("useFable5Filter", () => {
  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    mockUsePathname.mockReturnValue("/fable-5");
    mockReplace.mockReset();
  });

  it("initial state reads from ?tags=3d,game URL param", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("tags=3d,game"));
    const { result } = renderHook(() => useFable5Filter());
    expect(result.current.selectedTags).toEqual(["3d", "game"]);
  });

  it("returns empty selectedTags when no URL param", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    const { result } = renderHook(() => useFable5Filter());
    expect(result.current.selectedTags).toEqual([]);
  });

  it("ignores invalid tags from URL", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("tags=3d,notatag,game")
    );
    const { result } = renderHook(() => useFable5Filter());
    expect(result.current.selectedTags).toEqual(["3d", "game"]);
  });

  it("toggleTag of an unselected tag adds it", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    const { result } = renderHook(() => useFable5Filter());
    act(() => result.current.toggleTag("3d"));
    expect(result.current.selectedTags).toEqual(["3d"]);
    expect(mockReplace).toHaveBeenCalledWith("/fable-5?tags=3d", {
      scroll: false,
    });
  });

  it("toggleTag of a selected tag removes it", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("tags=3d"));
    const { result } = renderHook(() => useFable5Filter());
    act(() => result.current.toggleTag("3d"));
    expect(result.current.selectedTags).toEqual([]);
    expect(mockReplace).toHaveBeenCalledWith("/fable-5", { scroll: false });
  });

  it("clear empties selected and calls router.replace with no tags param", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("tags=3d,game"));
    const { result } = renderHook(() => useFable5Filter());
    act(() => result.current.clear());
    expect(result.current.selectedTags).toEqual([]);
    expect(mockReplace).toHaveBeenCalledWith("/fable-5", { scroll: false });
  });

  it("shuffle increments shuffleSeed by 1", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    const { result } = renderHook(() => useFable5Filter());
    const initial = result.current.shuffleSeed;
    act(() => result.current.shuffle());
    expect(result.current.shuffleSeed).toBe(initial + 1);
  });

  it("isActive is true when selectedTags is non-empty", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("tags=3d"));
    const { result } = renderHook(() => useFable5Filter());
    expect(result.current.isActive).toBe(true);
  });

  it("isActive is false when selectedTags is empty", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    const { result } = renderHook(() => useFable5Filter());
    expect(result.current.isActive).toBe(false);
  });

  it("preserves other URL params when updating tags", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("utm_source=x&tags=3d")
    );
    const { result } = renderHook(() => useFable5Filter());
    act(() => result.current.clear());
    expect(mockReplace).toHaveBeenCalledWith("/fable-5?utm_source=x", {
      scroll: false,
    });
  });
});
