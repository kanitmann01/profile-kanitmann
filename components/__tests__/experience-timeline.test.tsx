import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { ExperienceTimeline } from "@/components/experience-timeline"
import { experiences } from "@/data/experiences"

describe("ExperienceTimeline", () => {
  it("renders all visible experiences", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const visibleExps = experiences.filter((e) => !e.collapsible)
    visibleExps.forEach((exp) => {
      const matches = screen.getAllByText(exp.company)
      expect(matches.length).toBeGreaterThan(0)
    })
  })

  it("renders company names in large serif typography", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const companyElements = screen.getAllByText("Ericsson")
    expect(companyElements.length).toBeGreaterThan(0)
  })

  it("renders job titles for visible experiences", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const visibleExps = experiences.filter((e) => !e.collapsible)
    visibleExps.forEach((exp) => {
      if (exp.position) {
        expect(screen.getByText(exp.position)).toBeInTheDocument()
      }
      if (exp.roles) {
        exp.roles.forEach((role) => {
          expect(screen.getByText(role.position)).toBeInTheDocument()
        })
      }
    })
  })

  it("renders period for visible experiences", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const visibleExps = experiences.filter((e) => !e.collapsible)
    visibleExps.forEach((exp) => {
      if (exp.startDate && exp.endDate) {
        const periodRegex = new RegExp(`${exp.startDate}.*${exp.endDate}`)
        expect(screen.getByText(periodRegex)).toBeInTheDocument()
      }
      if (exp.roles) {
        exp.roles.forEach((role) => {
          const periodRegex = new RegExp(`${role.startDate}.*${role.endDate}`)
          expect(screen.getByText(periodRegex)).toBeInTheDocument()
        })
      }
    })
  })

  it("renders achievements for visible experiences", () => {
    render(<ExperienceTimeline experiences={experiences} />)
    const visibleExps = experiences.filter((e) => !e.collapsible)
    visibleExps.forEach((exp) => {
      if (exp.achievements) {
        exp.achievements.forEach((achievement) => {
          expect(screen.getByText(achievement)).toBeInTheDocument()
        })
      }
      if (exp.roles) {
        exp.roles.forEach((role) => {
          role.achievements?.forEach((achievement) => {
            expect(screen.getByText(achievement)).toBeInTheDocument()
          })
        })
      }
    })
  })

  it("renders the vertical connector line", () => {
    const { container } = render(<ExperienceTimeline experiences={experiences} />)
    const connectorLine = container.querySelector('[data-testid="timeline-connector"]')
    expect(connectorLine).toBeInTheDocument()
  })

  it("renders in compact mode without achievements", () => {
    render(<ExperienceTimeline experiences={experiences} compact />)
    const homeExps = experiences.filter((e) => e.featuredOnHome)
    homeExps.forEach((exp) => {
      if (exp.achievements) {
        exp.achievements.forEach((achievement) => {
          expect(screen.queryByText(achievement)).not.toBeInTheDocument()
        })
      }
      if (exp.roles) {
        exp.roles.forEach((role) => {
          role.achievements?.forEach((achievement) => {
            expect(screen.queryByText(achievement)).not.toBeInTheDocument()
          })
        })
      }
    })
  })
})
