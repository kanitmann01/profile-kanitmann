import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { UnifiedBharatContent } from "@/content/projects/unified-bharat"

describe("UnifiedBharatContent", () => {
  it("renders architecture section", () => {
    render(<UnifiedBharatContent />)
    expect(screen.getByRole("heading", { name: /Architecture/i, level: 2 })).toBeInTheDocument()
  })

  it("renders data sources section", () => {
    render(<UnifiedBharatContent />)
    expect(screen.getByRole("heading", { name: /^Data Sources$/i, level: 2 })).toBeInTheDocument()
  })

  it("renders key results section", () => {
    render(<UnifiedBharatContent />)
    expect(screen.getByText(/Key Results/i)).toBeInTheDocument()
  })

  it("renders research question section", () => {
    render(<UnifiedBharatContent />)
    expect(screen.getByRole("heading", { name: /Research Question/i, level: 2 })).toBeInTheDocument()
  })

  it("renders technical implementation section", () => {
    render(<UnifiedBharatContent />)
    expect(screen.getByRole("heading", { name: /Technical Implementation/i, level: 2 })).toBeInTheDocument()
  })

  it("renders future enhancements section", () => {
    render(<UnifiedBharatContent />)
    expect(screen.getByRole("heading", { name: /Future Enhancements/i, level: 2 })).toBeInTheDocument()
  })
})
