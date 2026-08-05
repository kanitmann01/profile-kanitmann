import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollTo } from "../use-scroll-to";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const { useLenisMock } = vi.hoisted(() => ({ useLenisMock: vi.fn() }));

vi.mock("lenis/react", () => ({
  useLenis: useLenisMock,
}));

vi.mock("@/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("useScrollTo", () => {
  const mockLenis = { scrollTo: vi.fn() };
  const scrollIntoViewSpy = vi.fn();
  const scrollToSpy = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useLenisMock.mockReturnValue(undefined);
    mockedUseReducedMotion.mockReturnValue(false);
    Element.prototype.scrollIntoView = scrollIntoViewSpy;
    Object.defineProperty(window, "scrollTo", {
      writable: true,
      value: scrollToSpy,
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("glides through Lenis when smooth scroll is active", () => {
    useLenisMock.mockReturnValue(mockLenis);
    const target = document.createElement("div");
    target.id = "experience";
    document.body.appendChild(target);

    const { result } = renderHook(() => useScrollTo());
    result.current("experience");

    expect(mockLenis.scrollTo).toHaveBeenCalledWith(target, { offset: -80 });
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it("applies a custom offset when provided", () => {
    useLenisMock.mockReturnValue(mockLenis);
    const target = document.createElement("div");
    target.id = "experience";
    document.body.appendChild(target);

    const { result } = renderHook(() => useScrollTo());
    result.current(target, 0);

    expect(mockLenis.scrollTo).toHaveBeenCalledWith(target, { offset: 0 });
  });

  it("falls back to native scrollIntoView when no Lenis is mounted", () => {
    const target = document.createElement("div");
    target.id = "experience";
    document.body.appendChild(target);

    const { result } = renderHook(() => useScrollTo());
    result.current("experience");

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
    });
    expect(mockLenis.scrollTo).not.toHaveBeenCalled();
  });

  it("falls back to native scrolling under reduced motion even with Lenis", () => {
    useLenisMock.mockReturnValue(mockLenis);
    mockedUseReducedMotion.mockReturnValue(true);
    const target = document.createElement("div");
    target.id = "experience";
    document.body.appendChild(target);

    const { result } = renderHook(() => useScrollTo());
    result.current("experience");

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
    });
    expect(mockLenis.scrollTo).not.toHaveBeenCalled();
  });

  it("scrolls to an absolute position via Lenis for numeric targets", () => {
    useLenisMock.mockReturnValue(mockLenis);

    const { result } = renderHook(() => useScrollTo());
    result.current(0);

    expect(mockLenis.scrollTo).toHaveBeenCalledWith(0, { offset: 0 });
  });

  it("scrolls to an absolute position natively when Lenis is absent", () => {
    const { result } = renderHook(() => useScrollTo());
    result.current(0);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    expect(mockLenis.scrollTo).not.toHaveBeenCalled();
  });
});
