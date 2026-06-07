import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

import {
  TactileCard,
  TactileCardHeader,
  TactileCardTitle,
  TactileCardDescription,
  TactileCardContent,
  TactileCardFooter,
} from "../tactile-card"

describe("TactileCard", () => {
  it("renders children correctly", () => {
    render(
      <TactileCard>
        <TactileCardHeader>
          <TactileCardTitle>Card Title</TactileCardTitle>
          <TactileCardDescription>Card Description</TactileCardDescription>
        </TactileCardHeader>
        <TactileCardContent>Card Content</TactileCardContent>
        <TactileCardFooter>Card Footer</TactileCardFooter>
      </TactileCard>
    )

    expect(screen.getByText("Card Title")).toBeInTheDocument()
    expect(screen.getByText("Card Description")).toBeInTheDocument()
    expect(screen.getByText("Card Content")).toBeInTheDocument()
    expect(screen.getByText("Card Footer")).toBeInTheDocument()
  })

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn()
    render(
      <TactileCard onClick={handleClick}>
        <TactileCardContent>Clickable</TactileCardContent>
      </TactileCard>
    )

    fireEvent.click(screen.getByText("Clickable"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders as a link when href is provided", () => {
    render(
      <TactileCard href="/projects/test">
        <TactileCardContent>Link Card</TactileCardContent>
      </TactileCard>
    )

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/projects/test")
  })

  it("renders with proper card structure", () => {
    const { container } = render(
      <TactileCard>
        <TactileCardHeader>
          <TactileCardTitle>Title</TactileCardTitle>
        </TactileCardHeader>
      </TactileCard>
    )

    const cardRoot = container.firstElementChild
    expect(cardRoot).toBeInTheDocument()
    expect(screen.getByText("Title")).toBeInTheDocument()
  })

  it("applies custom className to TactileCard", () => {
    const { container } = render(
      <TactileCard className="custom-class">
        <TactileCardContent>Content</TactileCardContent>
      </TactileCard>
    )

    expect(container.firstElementChild).toHaveClass("custom-class")
  })

  it("does not render as link when no href is provided", () => {
    render(
      <TactileCard>
        <TactileCardContent>No Link</TactileCardContent>
      </TactileCard>
    )

    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
