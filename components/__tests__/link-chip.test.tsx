import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { LinkChip } from "@/components/link-chip"

describe("LinkChip", () => {
  it("renders the given path string", () => {
    render(<LinkChip path="/about/experience" />)
    expect(screen.getByText("/about/experience")).toBeInTheDocument()
  })

  it("renders external domain paths", () => {
    render(<LinkChip path="github.com/kanitmann01" />)
    expect(screen.getByText("github.com/kanitmann01")).toBeInTheDocument()
  })

  it("renders with pointer-events-none to be decorative", () => {
    const { container } = render(<LinkChip path="/about/experience" />)
    const chip = container.firstChild as HTMLElement
    expect(chip.className).toContain("pointer-events-none")
  })
})
