import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import TwitchAnalyticsPipelinePage from "../twitch-analytics-pipeline/page"

describe("TwitchAnalyticsPipelinePage", () => {
  it("renders the project title", () => {
    render(<TwitchAnalyticsPipelinePage />)
    expect(screen.getByText("Real-Time Twitch Analytics Pipeline")).toBeInTheDocument()
  })

  it("renders the project description", () => {
    render(<TwitchAnalyticsPipelinePage />)
    expect(screen.getByText(/ELT streaming pipeline/i)).toBeInTheDocument()
  })

  it("renders tech stack badges", () => {
    render(<TwitchAnalyticsPipelinePage />)
    expect(screen.getAllByText("Python").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Apache Kafka").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Snowflake").length).toBeGreaterThan(0)
    expect(screen.getAllByText("dbt").length).toBeGreaterThan(0)
  })

  it("renders GitHub link", () => {
    render(<TwitchAnalyticsPipelinePage />)
    const githubLink = screen.getByRole("link", { name: /github/i })
    expect(githubLink).toHaveAttribute("href", "https://github.com/kanitmann01/twitch_stat_board")
  })

  it("renders Looker Studio demo link", () => {
    render(<TwitchAnalyticsPipelinePage />)
    const demoLink = screen.getByRole("link", { name: /looker studio/i })
    expect(demoLink).toHaveAttribute("href", "https://lookerstudio.google.com/s/jyb_uKEUcmo")
  })

  it("renders architecture section", () => {
    render(<TwitchAnalyticsPipelinePage />)
    expect(screen.getByRole("heading", { name: /Architecture/i, level: 2 })).toBeInTheDocument()
  })

  it("renders pipeline stages section", () => {
    render(<TwitchAnalyticsPipelinePage />)
    expect(screen.getByRole("heading", { name: /Pipeline Stages/i, level: 2 })).toBeInTheDocument()
  })

  it("renders key features section", () => {
    render(<TwitchAnalyticsPipelinePage />)
    expect(screen.getByRole("heading", { name: /Key Features/i, level: 2 })).toBeInTheDocument()
  })
})
