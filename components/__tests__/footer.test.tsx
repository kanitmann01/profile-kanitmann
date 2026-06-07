import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { Footer } from "../footer"

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the name KANIT MANN", () => {
    render(<Footer />)
    expect(screen.getByText("KANIT MANN")).toBeInTheDocument()
  })

  it("renders the subtitle Data & ML Engineer", () => {
    render(<Footer />)
    expect(screen.getByText("Data & ML Engineer")).toBeInTheDocument()
  })

  it("renders all social links as text", () => {
    render(<Footer />)
    expect(screen.getByRole("link", { name: /Email/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Resume/i })).toBeInTheDocument()
  })

  it("social links point to correct hrefs", () => {
    render(<Footer />)
    expect(screen.getByRole("link", { name: /Email/i })).toHaveAttribute("href", "mailto:kanitmann01@gmail.com")
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute("href", "https://github.com/kanitmann01")
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute("href", "https://www.linkedin.com/in/kanitmann")
    expect(screen.getByRole("link", { name: /Resume/i })).toHaveAttribute("href", "/Kanit Mann - Resume.pdf")
  })

  it("renders copyright with current year", () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
  })

  it("renders the KANIT watermark", () => {
    render(<Footer />)
    expect(screen.getByText("KANIT")).toBeInTheDocument()
  })

  it("does not render any SVG icons", () => {
    const { container } = render(<Footer />)
    expect(container.querySelectorAll("svg").length).toBe(0)
  })
})
