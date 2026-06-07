import { render, screen, fireEvent, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { TapRipple } from "../tap-ripple"

describe("TapRipple", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders children", () => {
    render(
      <TapRipple>
        <button data-testid="child">Click</button>
      </TapRipple>
    )
    expect(screen.getByTestId("child")).toBeInTheDocument()
  })

  it("renders with overflow-hidden wrapper for ripple containment", () => {
    const { container } = render(
      <TapRipple>
        <span>content</span>
      </TapRipple>
    )
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain("overflow-hidden")
  })

  it("creates ripple on pointer down", () => {
    const { container } = render(
      <TapRipple>
        <button>Tap me</button>
      </TapRipple>
    )
    const wrapper = container.firstElementChild as HTMLElement
    fireEvent.pointerDown(wrapper, { clientX: 50, clientY: 30 })
    const ripples = container.querySelectorAll("[data-ripple]")
    expect(ripples.length).toBe(1)
  })

  it("removes ripple after animation completes", () => {
    const { container } = render(
      <TapRipple>
        <button>Tap me</button>
      </TapRipple>
    )
    const wrapper = container.firstElementChild as HTMLElement
    fireEvent.pointerDown(wrapper, { clientX: 50, clientY: 30 })
    expect(container.querySelectorAll("[data-ripple]").length).toBe(1)
    act(() => { vi.advanceTimersByTime(600) })
    expect(container.querySelectorAll("[data-ripple]").length).toBe(0)
  })

  it("does not create ripple when disabled", () => {
    const { container } = render(
      <TapRipple disabled>
        <button>Tap me</button>
      </TapRipple>
    )
    const wrapper = container.firstElementChild as HTMLElement
    fireEvent.pointerDown(wrapper, { clientX: 50, clientY: 30 })
    expect(container.querySelectorAll("[data-ripple]").length).toBe(0)
  })

  it("forwards className to wrapper", () => {
    const { container } = render(
      <TapRipple className="custom-class">
        <span>content</span>
      </TapRipple>
    )
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain("custom-class")
  })
})
