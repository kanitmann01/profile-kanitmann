import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import Home from "@/app/page"

describe("Home page", () => {
  it("renders the hero section with Kanit", () => {
    render(<Home />)
    const heading = screen.getByRole("heading", { name: /Kanit!/i })
    expect(heading).toBeInTheDocument()
  })

  it("renders the bento experience card", () => {
    render(<Home />)
    expect(screen.getByText("My Experience")).toBeInTheDocument()
  })

  it("renders the bento tech stack card", () => {
    render(<Home />)
    expect(screen.getByText("Tech Stack")).toBeInTheDocument()
  })

  it("renders the bento GitHub card", () => {
    render(<Home />)
    expect(screen.getByText("GitHub")).toBeInTheDocument()
  })

  it("renders featured projects section", () => {
    render(<Home />)
    expect(screen.getByText("Featured Projects")).toBeInTheDocument()
  })

  it("renders featured articles section", () => {
    render(<Home />)
    expect(screen.getByText("Featured Articles")).toBeInTheDocument()
  })

  it("does not render the old Currently Seeking section", () => {
    render(<Home />)
    expect(screen.queryByText("Currently Seeking")).not.toBeInTheDocument()
  })

  it("does not render the old Professional Experience heading", () => {
    render(<Home />)
    expect(screen.queryByText("Professional Experience")).not.toBeInTheDocument()
  })
})
