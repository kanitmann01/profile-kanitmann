import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { BentoGitHubCard } from "@/components/bento-github-card"

describe("BentoGitHubCard", () => {
  it("renders the card title", () => {
    render(<BentoGitHubCard />)
    expect(screen.getByText("GitHub")).toBeInTheDocument()
  })

  it("renders the link chip with cleaned path", () => {
    render(<BentoGitHubCard />)
    expect(screen.getByText("github.com/kanitmann01")).toBeInTheDocument()
  })

  it("renders the GitHub username", () => {
    render(<BentoGitHubCard />)
    expect(screen.getByText("kanitmann01")).toBeInTheDocument()
  })

  it("renders a link to the GitHub profile", () => {
    render(<BentoGitHubCard />)
    const link = screen.getByRole("link", { name: /view profile/i })
    expect(link).toHaveAttribute("href", "https://github.com/kanitmann01")
  })
})
