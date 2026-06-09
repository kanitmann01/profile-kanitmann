import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { Hero } from "@/components/hero"

describe("Hero", () => {
  it("renders the heading with name Kanit", () => {
    render(<Hero />)
    const heading = screen.getByRole("heading", { name: /Kanit!/i })
    expect(heading).toBeInTheDocument()
  })

  it("renders the role tagline", () => {
    render(<Hero />)
    expect(screen.getByText(/Data & ML Engineer/)).toBeInTheDocument()
  })

  it("renders the university affiliation", () => {
    render(<Hero />)
    expect(screen.getByText(/MS, University of Arizona/)).toBeInTheDocument()
  })

  it("renders the seeking status badge", () => {
    render(<Hero />)
    expect(screen.getByText(/Seeking full-time roles/)).toBeInTheDocument()
  })

  it("renders the profile image", () => {
    render(<Hero />)
    expect(screen.getByAltText("Kanit Mann")).toBeInTheDocument()
  })

  it("renders the Book a call CTA button", () => {
    render(<Hero />)
    expect(screen.getByRole("button", { name: /Book a call/i })).toBeInTheDocument()
  })

  it("renders the supporting text", () => {
    render(<Hero />)
    expect(screen.getByText(/Check out my projects and reach out/)).toBeInTheDocument()
  })

  it("does not render old hero content", () => {
    render(<Hero />)
    expect(screen.queryByText(/KEN/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Ex-Ericsson/)).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /View Projects/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /Get In Touch/i })).not.toBeInTheDocument()
  })
})
