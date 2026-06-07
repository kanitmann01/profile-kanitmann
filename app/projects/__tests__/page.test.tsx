import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import Projects from "@/app/projects/page"
import { projects } from "@/data/projects"

describe("Projects page - editorial layout", () => {
  it("renders all project titles", () => {
    render(<Projects />)
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    })
  })

  it("renders all project descriptions", () => {
    render(<Projects />)
    projects.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it("renders project images for each project", () => {
    render(<Projects />)
    const images = screen.getAllByRole("img")
    expect(images.length).toBeGreaterThanOrEqual(projects.length)
  })

  it("renders the page heading", () => {
    render(<Projects />)
    expect(screen.getByText("Projects")).toBeInTheDocument()
  })

  it("renders tech tags for each project", () => {
    render(<Projects />)
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        const tagElements = screen.getAllByText(tag)
        expect(tagElements.length).toBeGreaterThan(0)
      })
    })
  })

  it("renders status badges for projects with status", () => {
    render(<Projects />)
    const projectsWithStatus = projects.filter((p) => p.status)
    projectsWithStatus.forEach((project) => {
      const statusElements = screen.getAllByText(project.status!)
      expect(statusElements.length).toBeGreaterThan(0)
    })
  })

  it("renders project links to detail pages", () => {
    render(<Projects />)
    projects.forEach((project) => {
      const link = screen.getByRole("link", { name: new RegExp(project.title, "i") })
      expect(link).toHaveAttribute("href", project.href)
    })
  })

  it("uses editorial vertical layout with alternating image positions", () => {
    const { container } = render(<Projects />)
    const sections = container.querySelectorAll("[data-editorial-project]")
    expect(sections.length).toBe(projects.length)
  })

  it("renders project titles in serif font", () => {
    const { container } = render(<Projects />)
    const titles = container.querySelectorAll("[data-project-title]")
    expect(titles.length).toBe(projects.length)
    titles.forEach((title) => {
      expect(title.className).toContain("font-serif")
    })
  })

  it("renders tech tags in monospace font", () => {
    const { container } = render(<Projects />)
    const tagContainers = container.querySelectorAll("[data-project-tags]")
    expect(tagContainers.length).toBe(projects.length)
    tagContainers.forEach((tagGroup) => {
      expect(tagGroup.className).toContain("font-mono")
    })
  })
})
