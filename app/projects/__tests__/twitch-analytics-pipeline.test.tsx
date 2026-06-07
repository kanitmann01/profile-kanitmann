import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { TwitchAnalyticsPipelineContent } from "@/content/projects/twitch-analytics-pipeline"

describe("TwitchAnalyticsPipelineContent", () => {
  it("renders the Architecture section heading", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByRole("heading", { name: /Architecture/i, level: 2 })).toBeInTheDocument()
  })

  it("renders the Pipeline Stages section heading", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByRole("heading", { name: /Pipeline Stages/i, level: 2 })).toBeInTheDocument()
  })

  it("renders the Key Features section heading", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByRole("heading", { name: /Key Features/i, level: 2 })).toBeInTheDocument()
  })

  it("renders the Technology Stack section", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByRole("heading", { name: /Technology Stack/i, level: 2 })).toBeInTheDocument()
  })

  it("renders the pipeline architecture diagram", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByText(/Twitch API → Python Producer → Apache Kafka/)).toBeInTheDocument()
  })

  it("renders the Dashboard Metrics section", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByRole("heading", { name: /Dashboard Metrics/i, level: 2 })).toBeInTheDocument()
  })

  it("renders the Future Enhancements section", () => {
    render(<TwitchAnalyticsPipelineContent />)
    expect(screen.getByRole("heading", { name: /Future Enhancements/i, level: 2 })).toBeInTheDocument()
  })
})
