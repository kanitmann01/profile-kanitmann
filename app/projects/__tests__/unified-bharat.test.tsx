import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import UnifiedBharatPage from "../unified-bharat/page"

describe("UnifiedBharatPage", () => {
  it("renders the project title", () => {
    render(<UnifiedBharatPage />)
    expect(screen.getByText("Unified Bharat: Cross-Sector Policy Analytics Lakehouse")).toBeInTheDocument()
  })

  it("renders the project description", () => {
    render(<UnifiedBharatPage />)
    expect(screen.getByText(/Medallion Architecture for State-Level CSR/)).toBeInTheDocument()
  })

  it("renders tech stack badges", () => {
    render(<UnifiedBharatPage />)
    expect(screen.getAllByText("Python").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Apache Spark").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Apache Iceberg").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Docker").length).toBeGreaterThan(0)
  })

  it("renders GitHub link", () => {
    render(<UnifiedBharatPage />)
    const githubLink = screen.getByRole("link", { name: /github/i })
    expect(githubLink).toHaveAttribute("href", "https://github.com/kanitmann01/unified-bharat")
  })

  it("renders architecture section", () => {
    render(<UnifiedBharatPage />)
    expect(screen.getByRole("heading", { name: /Architecture/i, level: 2 })).toBeInTheDocument()
  })

  it("renders data sources section", () => {
    render(<UnifiedBharatPage />)
    expect(screen.getByRole("heading", { name: /^Data Sources$/i, level: 2 })).toBeInTheDocument()
  })

  it("renders key results section", () => {
    render(<UnifiedBharatPage />)
    expect(screen.getByText(/Key Results/i)).toBeInTheDocument()
  })
})
