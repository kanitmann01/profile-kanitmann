import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeAll } from "vitest"

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  class MockIntersectionObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    constructor() {}
  }
  global.IntersectionObserver = MockIntersectionObserver as any
})

import About from "@/app/about/page"

describe("About page - Editorial Bio Redesign", () => {
  it("renders the editorial headline", () => {
    render(<About />)
    const headings = screen.getAllByText("The Story")
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it("renders the bio narrative text", () => {
    render(<About />)
    expect(
      screen.getByText(/My journey into data science began/)
    ).toBeInTheDocument()
  })

  it("renders the profile image", () => {
    render(<About />)
    const profileImg = screen.getByAltText("Kanit Mann")
    expect(profileImg).toBeInTheDocument()
  })

  it("renders skills as image cards grouped by category", () => {
    render(<About />)
    expect(screen.getByText(/Languages/i)).toBeInTheDocument()
    expect(screen.getByText(/Frameworks/i)).toBeInTheDocument()
    expect(screen.getByText(/Tools/i)).toBeInTheDocument()
    expect(screen.getByAltText("Python")).toBeInTheDocument()
    expect(screen.getByAltText("C++")).toBeInTheDocument()
    expect(screen.getByAltText("Docker")).toBeInTheDocument()
    expect(screen.getByAltText("GitHub")).toBeInTheDocument()
  })

  it("renders certifications as a minimal list", () => {
    render(<About />)
    expect(
      screen.getByText(/Licenses & Certifications/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/AWS Educate Introduction to Generative AI/)
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(/Amazon Web Services \(AWS\)/).length
    ).toBeGreaterThan(0)
  })

  it("renders the graduation section", () => {
    render(<About />)
    const gradHeadings = screen.getAllByText(/My Graduation/i)
    expect(gradHeadings.length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Master of Science/).length).toBeGreaterThan(0)
  })

  it("renders the experience timeline", () => {
    render(<About />)
    expect(
      screen.getByText(/Professional Experience/i)
    ).toBeInTheDocument()
    expect(screen.getAllByText("Ericsson").length).toBeGreaterThan(0)
  })

  it("renders the leadership section", () => {
    render(<About />)
    expect(
      screen.getByText(/Leadership & Collaboration/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/University of Arizona Campus Store/)
    ).toBeInTheDocument()
  })

  it("renders skills with monospace styling", () => {
    const { container } = render(<About />)
    const monoElements = container.querySelectorAll(".font-mono")
    expect(monoElements.length).toBeGreaterThan(0)
  })
})
