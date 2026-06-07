import { render, screen, fireEvent, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { useTapFeedback } from "../use-tap-feedback"

function TestComponent({
  onTap,
  disabled,
}: {
  onTap?: () => void
  disabled?: boolean
}) {
  const { ref, handlePointerDown, ripples } = useTapFeedback({ disabled })

  return (
    <div
      ref={ref}
      data-testid="target"
      onPointerDown={handlePointerDown}
      role="button"
    >
      {ripples.map((r) => (
        <span key={r.id} data-testid="ripple" />
      ))}
      <button onClick={onTap}>inner</button>
    </div>
  )
}

describe("useTapFeedback", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns ref, handlePointerDown, and ripples array", () => {
    function Probe() {
      const result = useTapFeedback()
      return (
        <div data-testid="probe" ref={result.ref} onPointerDown={result.handlePointerDown}>
          {result.ripples.length}
        </div>
      )
    }
    render(<Probe />)
    expect(screen.getByTestId("probe")).toHaveTextContent("0")
  })

  it("adds a ripple on pointer down", () => {
    render(<TestComponent />)
    const target = screen.getByTestId("target")
    fireEvent.pointerDown(target, { clientX: 10, clientY: 20 })
    expect(screen.getAllByTestId("ripple")).toHaveLength(1)
  })

  it("removes ripple after animation duration", () => {
    render(<TestComponent />)
    const target = screen.getByTestId("target")
    fireEvent.pointerDown(target, { clientX: 10, clientY: 20 })
    expect(screen.getAllByTestId("ripple")).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(600) })
    expect(screen.queryAllByTestId("ripple")).toHaveLength(0)
  })

  it("does not add ripple when disabled", () => {
    render(<TestComponent disabled />)
    const target = screen.getByTestId("target")
    fireEvent.pointerDown(target, { clientX: 10, clientY: 20 })
    expect(screen.queryAllByTestId("ripple")).toHaveLength(0)
  })

  it("cleans up timeout on unmount", () => {
    const { unmount } = render(<TestComponent />)
    const target = screen.getByTestId("target")
    fireEvent.pointerDown(target, { clientX: 10, clientY: 20 })
    unmount()
    expect(() => act(() => { vi.advanceTimersByTime(600) })).not.toThrow()
  })
})
