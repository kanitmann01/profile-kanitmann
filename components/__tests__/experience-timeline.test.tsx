import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { ExperienceTimeline } from "@/components/experience-timeline"
import { experiences } from "@/data/experiences"

describe("ExperienceTimeline", () => {
  it("renders all experiences", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    experiences.forEach((exp) => {
      const matches = screen.getAllByText(exp.company)
      expect(matches.length).toBeGreaterThan(0)
    })
  })

  it("renders company names in large serif typography", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const companyElements = screen.getAllByText("Ericsson")
    expect(companyElements.length).toBeGreaterThan(0)
  })

  it("renders job titles for each experience", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    experiences.forEach((exp) => {
      expect(screen.getByText(exp.position)).toBeInTheDocument()
    })
  })

  it("renders period (start and end dates) for each experience", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    experiences.forEach((exp) => {
      const periodRegex = new RegExp(`${exp.startDate}.*${exp.endDate}`)
      expect(screen.getByText(periodRegex)).toBeInTheDocument()
    })
  })

  it("renders achievements when present", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const ericssonExp = experiences.find((e) => e.id === "ericsson-engineer")!
    ericssonExp.achievements!.forEach((achievement) => {
      expect(screen.getByText(achievement)).toBeInTheDocument()
    })
  })

  it("renders the vertical connector line", () => {
    const { container } = render(<ExperienceTimeline experiences={experiences} />)
    const connectorLine = container.querySelector('[data-testid="timeline-connector"]')
    expect(connectorLine).toBeInTheDocument()
  })

  it("renders in compact mode without achievements", () => {
    render(<ExperienceTimeline experiences={experiences} compact />)
    const ericssonExp = experiences.find((e) => e.id === "ericsson-engineer")!
    ericssonExp.achievements!.forEach((achievement) => {
      expect(screen.queryByText(achievement)).not.toBeInTheDocument()
    })
  })
})
