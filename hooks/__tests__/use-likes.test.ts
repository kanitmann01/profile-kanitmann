import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor, act } from "@testing-library/react"

vi.mock("@/hooks/use-likes", async () => {
  return await vi.importActual("@/hooks/use-likes")
})

import { useLikes } from "../use-likes"

const mockFetch = vi.fn()
global.fetch = mockFetch

describe("useLikes", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns isLoading true initially", () => {
    mockFetch.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useLikes())

    expect(result.current.isLoading).toBe(true)
  })

  it("fetches likes on mount", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ "project-1": 5, "project-2": 3 }),
    })

    const { result } = renderHook(() => useLikes())

    expect(mockFetch).toHaveBeenCalledWith("/api/likes")

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.likes).toEqual({ "project-1": 5, "project-2": 3 })
  })

  it("sets isLoading to false after fetch completes", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })

    const { result } = renderHook(() => useLikes())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it("handles fetch errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    mockFetch.mockRejectedValue(new Error("Network error"))

    const { result } = renderHook(() => useLikes())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.likes).toEqual({})
    consoleSpy.mockRestore()
  })

  it("handles non-ok response gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const { result } = renderHook(() => useLikes())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.likes).toEqual({})
    consoleSpy.mockRestore()
  })

  it("updateLikeCount updates local state", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ "project-1": 5 }),
    })

    const { result } = renderHook(() => useLikes())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.updateLikeCount("project-1", 6)
    })

    expect(result.current.likes["project-1"]).toBe(6)
  })

  it("updateLikeCount adds new item to state", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })

    const { result } = renderHook(() => useLikes())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.updateLikeCount("new-item", 1)
    })

    expect(result.current.likes["new-item"]).toBe(1)
  })
})
