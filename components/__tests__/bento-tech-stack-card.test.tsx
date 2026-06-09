import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { BentoTechStackCard } from "@/components/bento-tech-stack-card"

describe("BentoTechStackCard", () => {
  it("renders the card title", () => {
    render(<BentoTechStackCard />)
    expect(screen.getByText("Tech Stack")).toBeInTheDocument()
  })

  it("renders the link chip with cleaned path", () => {
    render(<BentoTechStackCard />)
    expect(screen.getByText("/about/skills")).toBeInTheDocument()
  })

  it("renders all skill names", () => {
    render(<BentoTechStackCard />)
    expect(screen.getByText("Python")).toBeInTheDocument()
    expect(screen.getByText("SQL")).toBeInTheDocument()
    expect(screen.getByText("Machine Learning")).toBeInTheDocument()
    expect(screen.getByText("Apache Spark")).toBeInTheDocument()
    expect(screen.getByText("GCP")).toBeInTheDocument()
    expect(screen.getByText("Docker")).toBeInTheDocument()
    expect(screen.getByText("Data Pipelines")).toBeInTheDocument()
    expect(screen.getByText("Snowflake")).toBeInTheDocument()
  })
})
