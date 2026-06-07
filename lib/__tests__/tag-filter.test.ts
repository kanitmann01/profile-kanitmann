import { describe, it, expect } from "vitest"
import {
  filterProjectsByTags,
  tagsToQueryString,
  queryStringToTags,
  getTopTagsByFrequency,
} from "../tag-filter"
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

describe("filterProjectsByTags", () => {
  it("returns all projects when no tags are selected", () => {
    const result = filterProjectsByTags(mockProjects, [])
    expect(result).toEqual(mockProjects)
  })

  it("filters projects to only those matching ALL selected tags (AND logic)", () => {
    const result = filterProjectsByTags(mockProjects, ["Python", "Flask"])
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe("project-1")
  })

  it("returns empty array when no projects match the selected tags", () => {
    const result = filterProjectsByTags(mockProjects, ["Python", "React"])
    expect(result).toHaveLength(0)
  })

  it("returns projects matching a single tag", () => {
    const result = filterProjectsByTags(mockProjects, ["Python"])
    expect(result).toHaveLength(2)
    expect(result.map((p) => p.slug)).toContain("project-1")
    expect(result.map((p) => p.slug)).toContain("project-2")
  })

  it("is case-sensitive for tag matching", () => {
    const result = filterProjectsByTags(mockProjects, ["python"])
    expect(result).toHaveLength(0)
  })
})

describe("tagsToQueryString", () => {
  it("serializes tags to URL query string", () => {
    const result = tagsToQueryString(["python", "apache-kafka"])
    expect(result).toBe("?tags=python,apache-kafka")
  })

  it("returns empty string when no tags are provided", () => {
    const result = tagsToQueryString([])
    expect(result).toBe("")
  })

  it("converts tag names to lowercase and replaces spaces with hyphens", () => {
    const result = tagsToQueryString(["Apache Kafka", "Looker Studio"])
    expect(result).toBe("?tags=apache-kafka,looker-studio")
  })
})

describe("queryStringToTags", () => {
  it("deserializes URL query string to tags array", () => {
    const result = queryStringToTags("?tags=python,apache-kafka")
    expect(result).toEqual(["python", "apache-kafka"])
  })

  it("returns empty array when query string is empty", () => {
    const result = queryStringToTags("")
    expect(result).toEqual([])
  })

  it("returns empty array when no tags parameter exists", () => {
    const result = queryStringToTags("?sort=recent")
    expect(result).toEqual([])
  })

  it("handles tags with hyphens correctly", () => {
    const result = queryStringToTags("?tags=apache-kafka,looker-studio")
    expect(result).toEqual(["apache-kafka", "looker-studio"])
  })
})

describe("getTopTagsByFrequency", () => {
  it("returns tags sorted by frequency (descending)", () => {
    const result = getTopTagsByFrequency(mockProjects, 10)
    expect(result[0]).toBe("Python")
    expect(result).toContain("Pandas")
    expect(result).toContain("Flask")
  })

  it("limits the number of tags returned", () => {
    const result = getTopTagsByFrequency(mockProjects, 3)
    expect(result).toHaveLength(3)
  })

  it("sorts alphabetically when frequencies are equal", () => {
    const projectsWithEqualFreq: Project[] = [
      {
        slug: "p1",
        title: "P1",
        description: "Test",
        image: "/img.png",
        tags: ["Zebra", "Apple"],
        href: "/projects/p1",
        period: "January 2026",
        order: 202601,
        lastUpdated: "2026-01-01",
      },
      {
        slug: "p2",
        title: "P2",
        description: "Test",
        image: "/img.png",
        tags: ["Mango", "Banana"],
        href: "/projects/p2",
        period: "February 2026",
        order: 202602,
        lastUpdated: "2026-02-01",
      },
    ]
    const result = getTopTagsByFrequency(projectsWithEqualFreq, 4)
    expect(result).toEqual(["Apple", "Banana", "Mango", "Zebra"])
  })

  it("returns all tags when limit is greater than unique tags", () => {
    const result = getTopTagsByFrequency(mockProjects, 100)
    const uniqueTags = new Set(mockProjects.flatMap((p) => p.tags))
    expect(result).toHaveLength(uniqueTags.size)
  })

  it("returns empty array when no projects exist", () => {
    const result = getTopTagsByFrequency([], 10)
    expect(result).toEqual([])
  })
})
