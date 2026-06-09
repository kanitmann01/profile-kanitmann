import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ThreeLineSkillContent } from "@/content/articles/three-line-skill"
import { articles } from "@/data/articles"

describe("ThreeLineSkillContent", () => {
  it("renders opening sentence", () => {
    render(<ThreeLineSkillContent />)
    expect(
      screen.getByText(/The AI skill that changed everything for me is three lines long/)
    ).toBeInTheDocument()
  })

  it("renders /grill-me reference", () => {
    render(<ThreeLineSkillContent />)
    const matches = screen.getAllByText("/grill-me")
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })
})

describe("ThreeLineSkill metadata", () => {
  it("is registered in articles array", () => {
    const article = articles.find((a) => a.slug === "three-line-skill")
    expect(article).toBeDefined()
    expect(article!.title).toBe("The Three-Line Skill That Changed Everything")
    expect(article!.featuredOnHome).toBe(true)
  })
})
