import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

import { LikeButton } from "../like-button"

describe("LikeButton", () => {
  it("renders with provided count", () => {
    render(<LikeButton count={10} isLiked={false} onToggle={() => {}} />)
    expect(screen.getByText("10")).toBeInTheDocument()
  })

  it("renders with count of 0", () => {
    render(<LikeButton count={0} isLiked={false} onToggle={() => {}} />)
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("renders the heart icon", () => {
    render(<LikeButton count={0} isLiked={false} onToggle={() => {}} />)
    const button = screen.getByRole("button")
    const heart = button.querySelector("svg")
    expect(heart).toBeInTheDocument()
  })

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn()
    render(<LikeButton count={5} isLiked={false} onToggle={onToggle} />)
    const button = screen.getByRole("button")

    fireEvent.click(button)

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it("renders liked state with filled heart", () => {
    render(<LikeButton count={5} isLiked={true} onToggle={() => {}} />)
    const button = screen.getByRole("button")
    const heart = button.querySelector("[data-heart]")
    expect(heart).toBeInTheDocument()
  })

  it("renders compact variant", () => {
    render(<LikeButton count={3} isLiked={false} onToggle={() => {}} variant="compact" />)
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("renders particle burst elements on click when not liked", () => {
    render(<LikeButton count={0} isLiked={false} onToggle={() => {}} />)
    const button = screen.getByRole("button")

    fireEvent.click(button)

    const particles = document.querySelectorAll("[data-particle]")
    expect(particles.length).toBeGreaterThanOrEqual(6)
  })

  it("does not render particles when unliking", () => {
    render(<LikeButton count={5} isLiked={true} onToggle={() => {}} />)
    const button = screen.getByRole("button")

    fireEvent.click(button)

    const particles = document.querySelectorAll("[data-particle]")
    expect(particles.length).toBe(0)
  })

  it("displays correct title when liked", () => {
    render(<LikeButton count={5} isLiked={true} onToggle={() => {}} />)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("title", "Unlike this")
  })

  it("displays correct title when not liked", () => {
    render(<LikeButton count={5} isLiked={false} onToggle={() => {}} />)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("title", "Like this")
  })
})
