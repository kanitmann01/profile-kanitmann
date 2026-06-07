import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useKeyboardNavigation } from "../use-keyboard-navigation"

describe("useKeyboardNavigation", () => {
  const mockItems = [
    { slug: "item-1", href: "/item-1" },
    { slug: "item-2", href: "/item-2" },
    { slug: "item-3", href: "/item-3" },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns currentIndex as 0 initially", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    expect(result.current.currentIndex).toBe(0)
  })

  it("increments currentIndex on ArrowDown", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    
    expect(result.current.currentIndex).toBe(1)
  })

  it("decrements currentIndex on ArrowUp", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })
    
    expect(result.current.currentIndex).toBe(1)
  })

  it("does not go below 0 on ArrowUp", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })
    
    expect(result.current.currentIndex).toBe(0)
  })

  it("does not exceed items length on ArrowDown", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    
    expect(result.current.currentIndex).toBe(2)
  })

  it("calls onNavigate with href on Enter", () => {
    const onNavigate = vi.fn()
    const { result } = renderHook(() => useKeyboardNavigation(mockItems, onNavigate))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
    })
    
    expect(onNavigate).toHaveBeenCalledWith("/item-2")
  })

  it("does not call onNavigate on Enter when no callback provided", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
    })
    
    // Should not throw
    expect(result.current.currentIndex).toBe(0)
  })

  it("ignores other keys", () => {
    const { result } = renderHook(() => useKeyboardNavigation(mockItems))
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    })
    
    expect(result.current.currentIndex).toBe(0)
  })
})
