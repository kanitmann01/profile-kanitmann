import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { ScrollProgress } from "@/components/scroll-progress"

describe("ScrollProgress", () => {
  it("renders the scroll progress bar", () => {
    render(<ScrollProgress />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toBeInTheDocument()
  })

  it("has fixed positioning at the top", () => {
    render(<ScrollProgress />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("fixed")
    expect(bar.className).toContain("top-0")
  })

  it("has amber/primary color styling", () => {
    render(<ScrollProgress />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("bg-primary")
  })

  it("is 2px tall", () => {
    render(<ScrollProgress />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("h-[2px]")
  })
})
