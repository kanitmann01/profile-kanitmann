import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import Articles from "@/app/articles/page"
import { articles } from "@/data/articles"

describe("Articles page", () => {
  it("renders all article titles", () => {
    render(<Articles />)
    articles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument()
    })
  })

  it("renders article metadata (date and read time)", () => {
    render(<Articles />)
    articles.forEach((article) => {
      const matches = screen.getAllByText(article.readTime)
      expect(matches.length).toBeGreaterThanOrEqual(1)
    })
  })

  it("renders a featured article prominently", () => {
    render(<Articles />)
    const featured = articles.find((a) => a.featuredOnHome) || articles[0]
    const featuredHeading = screen.getByText(featured.title)
    expect(featuredHeading).toBeInTheDocument()
    expect(featuredHeading.closest("a")).toBeInTheDocument()
  })

  it("renders sort controls", () => {
    render(<Articles />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByText("Most Recent")).toBeInTheDocument()
  })
})
