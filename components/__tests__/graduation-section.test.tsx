import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

import { GraduationSection } from "@/components/graduation-section"

const defaultProps = {
  heading: "My Graduation",
  degree: "Master of Science",
  degreeSubtitle: "in Data Science",
  university: "University of Arizona",
  location: "Tucson, AZ",
  graduationDate: "May 2026",
  gpa: "3.75",
  narrative: "Completing my Master of Science in Data Science with a 3.75 GPA in May 2026 marked a pivotal moment in my journey from building firmware and cloud infrastructure to creating intelligent solutions from data. I'm incredibly proud of this achievement and grateful to my family, friends, and mentors at the University of Arizona who supported me through every late-night study session and complex project. This milestone has deepened my expertise in machine learning and data visualization, and I'm excited to bring these skills to build solutions that make a real impact.",
  images: [
    "/images/graduation/grad-1.jpg",
    "/images/graduation/grad-2.jpg",
    "/images/graduation/grad-3.jpg",
  ],
}

describe("GraduationSection", () => {
  it("renders the section heading", () => {
    render(<GraduationSection {...defaultProps} />)
    expect(screen.getByText("My Graduation")).toBeInTheDocument()
  })

  it("renders the degree name with visual hierarchy", () => {
    render(<GraduationSection {...defaultProps} />)
    expect(screen.getAllByText("Master of Science").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("in Data Science").length).toBeGreaterThanOrEqual(1)
  })
})
