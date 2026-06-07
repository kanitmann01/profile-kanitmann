import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import Home from "@/app/page"

describe("Home page", () => {
  it("renders the hero section with KANIT and MANN", () => {
    render(<Home />)
    const heading = screen.getByRole("heading", { name: /KANIT/i })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toContain("MANN")
  })
})
