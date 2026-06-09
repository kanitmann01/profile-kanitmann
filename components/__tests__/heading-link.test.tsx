import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { HeadingLink } from "@/components/heading-link"

describe("HeadingLink", () => {
  it("renders the heading text", () => {
    render(<HeadingLink href="/about#experience" chip="/about/experience">My Experience</HeadingLink>)
    expect(screen.getByText("My Experience")).toBeInTheDocument()
  })

  it("renders a link to the given href", () => {
    render(<HeadingLink href="/about#experience" chip="/about/experience">My Experience</HeadingLink>)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/about#experience")
  })

  it("renders the chip with the cleaned path", () => {
    render(<HeadingLink href="/about#experience" chip="/about/experience">My Experience</HeadingLink>)
    expect(screen.getByText("/about/experience")).toBeInTheDocument()
  })

  it("opens external links in a new tab", () => {
    render(<HeadingLink href="https://github.com/kanitmann01" chip="github.com/kanitmann01" external>GitHub</HeadingLink>)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })
})
