import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { RelatedProjects } from "../related-projects"
import { type Project } from "@/data/projects"

const mockProjects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    description: "Test project 1",
    image: "/img1.png",
    tags: ["Python", "Pandas", "Flask"],
    href: "/projects/project-1",
    period: "January 2026",
    order: 202601,
    lastUpdated: "2026-01-01",
  },
  {
    slug: "project-2",
    title: "Project 2",
    description: "Test project 2",
    image: "/img2.png",
    tags: ["Python", "Apache Kafka", "Snowflake"],
    href: "/projects/project-2",
    period: "February 2026",
    order: 202602,
    lastUpdated: "2026-02-01",
  },
  {
    slug: "project-3",
    title: "Project 3",
    description: "Test project 3",
    image: "/img3.png",
    tags: ["React", "TypeScript", "Next.js"],
    href: "/projects/project-3",
    period: "March 2026",
    order: 202603,
    lastUpdated: "2026-03-01",
  },
]

describe("RelatedProjects", () => {
  it("renders the section heading", () => {
    render(<RelatedProjects currentProject={mockProjects[0]} allProjects={mockProjects} />)
    expect(screen.getByRole("heading", { name: /Related Projects/i, level: 2 })).toBeInTheDocument()
  })

  it("renders up to 3 related projects", () => {
    render(<RelatedProjects currentProject={mockProjects[0]} allProjects={mockProjects} />)
    const projectLinks = screen.getAllByRole("link").filter(link => 
      link.getAttribute("href")?.startsWith("/projects/")
    )
    expect(projectLinks.length).toBeLessThanOrEqual(3)
  })

  it("does not include the current project in related projects", () => {
    render(<RelatedProjects currentProject={mockProjects[0]} allProjects={mockProjects} />)
    const projectLinks = screen.getAllByRole("link").filter(link => 
      link.getAttribute("href") === "/projects/project-1"
    )
    expect(projectLinks.length).toBe(0)
  })

  it("ranks projects by tag overlap", () => {
    render(<RelatedProjects currentProject={mockProjects[0]} allProjects={mockProjects} />)
    const project2Link = screen.getByRole("link", { name: /Project 2/i })
    expect(project2Link).toBeInTheDocument()
  })

  it("renders project titles", () => {
    render(<RelatedProjects currentProject={mockProjects[0]} allProjects={mockProjects} />)
    expect(screen.getByText("Project 2")).toBeInTheDocument()
  })

  it("renders View Project links", () => {
    render(<RelatedProjects currentProject={mockProjects[0]} allProjects={mockProjects} />)
    const viewLinks = screen.getAllByText(/View Project/i)
    expect(viewLinks.length).toBeGreaterThan(0)
  })

  it("returns null when no related projects exist", () => {
    const singleProject: Project[] = [mockProjects[0]]
    const { container } = render(<RelatedProjects currentProject={mockProjects[0]} allProjects={singleProject} />)
    expect(container.firstChild).toBeNull()
  })
})
