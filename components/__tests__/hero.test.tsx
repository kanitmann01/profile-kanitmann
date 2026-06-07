import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { Hero } from "@/components/hero"

describe("Hero", () => {
  it("renders the name KEN and (KANIT) MANN", () => {
    render(<Hero />)
    const heading = screen.getByRole("heading", { name: /KEN/i })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toContain("(KANIT) MANN")
  })

  it("renders the credibility line", () => {
    render(<Hero />)
    expect(screen.getByText(/Ex-Ericsson/)).toBeInTheDocument()
  })

  it("renders the tagline", () => {
    render(<Hero />)
    expect(screen.getByText(/Data & ML Engineer/)).toBeInTheDocument()
  })

  it("renders the View Projects CTA button", () => {
    render(<Hero />)
    expect(screen.getByRole("link", { name: /View Projects/i })).toBeInTheDocument()
  })

  it("renders the Get In Touch CTA button", () => {
    render(<Hero />)
    expect(screen.getByRole("link", { name: /Get In Touch/i })).toBeInTheDocument()
  })
})
