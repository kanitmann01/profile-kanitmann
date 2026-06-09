import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { TableOfContents } from "../table-of-contents"

describe("TableOfContents", () => {
  beforeEach(() => {
    // Mock IntersectionObserver as a class
    class MockIntersectionObserver {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      constructor() {}
    }
    global.IntersectionObserver = MockIntersectionObserver as any
  })

  it("renders nothing when no headings exist", () => {
    const { container } = render(<TableOfContents />)
    expect(container.firstChild).toBeNull()
  })

  it("renders table of contents when headings exist", () => {
    const container = document.createElement("div")
    container.id = "article-content"
    container.innerHTML = `
      <h2 id="section-1">Section 1</h2>
      <h3 id="subsection-1-1">Subsection 1.1</h3>
      <h2 id="section-2">Section 2</h2>
    `
    document.body.appendChild(container)

    render(<TableOfContents containerId="article-content" />)
    
    expect(screen.getAllByText("Table of Contents").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Section 1").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Subsection 1.1").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Section 2").length).toBeGreaterThan(0)

    document.body.removeChild(container)
  })

  it("renders toggle button on mobile", () => {
    const container = document.createElement("div")
    container.id = "article-content"
    container.innerHTML = `
      <h2 id="section-1">Section 1</h2>
    `
    document.body.appendChild(container)

    render(<TableOfContents containerId="article-content" />)
    
    const toggleButton = screen.getByRole("button", { name: /table of contents/i })
    expect(toggleButton).toBeInTheDocument()

    document.body.removeChild(container)
  })

  it("indents h3 headings", () => {
    const container = document.createElement("div")
    container.id = "article-content"
    container.innerHTML = `
      <h2 id="section-1">Section 1</h2>
      <h3 id="subsection-1-1">Subsection 1.1</h3>
    `
    document.body.appendChild(container)

    const { container: renderedContainer } = render(<TableOfContents containerId="article-content" />)
    
    const h3Item = renderedContainer.querySelector("li.ml-4")
    expect(h3Item).toBeInTheDocument()

    document.body.removeChild(container)
  })

  it("handles empty headings gracefully", () => {
    const { container } = render(<TableOfContents />)
    expect(container.firstChild).toBeNull()
  })

  it("assigns ids to headings that lack them", () => {
    const container = document.createElement("div")
    container.id = "article-content"
    container.innerHTML = `
      <h2>Section 1</h2>
      <h3>Subsection 1.1</h3>
      <h2>Section 2</h2>
    `
    document.body.appendChild(container)

    render(<TableOfContents containerId="article-content" />)

    const h2s = container.querySelectorAll("h2")
    expect(h2s[0].id).toBe("section-1")
    expect(h2s[1].id).toBe("section-2")
    const h3 = container.querySelector("h3")
    expect(h3!.id).toBe("subsection-1.1")

    document.body.removeChild(container)
  })
})
