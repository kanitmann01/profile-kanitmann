import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { SocialShare } from "../social-share"

describe("SocialShare", () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it("renders social share buttons", () => {
    render(
      <SocialShare 
        title="Test Article" 
        description="Test description" 
        url="https://example.com/test" 
      />
    )
    
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument()
  })

  it("generates correct LinkedIn share URL", () => {
    render(
      <SocialShare 
        title="Test Article" 
        description="Test description" 
        url="https://example.com/test" 
      />
    )
    
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("linkedin.com"))
    expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("example.com"))
  })

  it("generates correct Twitter share URL", () => {
    render(
      <SocialShare 
        title="Test Article" 
        description="Test description" 
        url="https://example.com/test" 
      />
    )
    
    const twitterLink = screen.getByRole("link", { name: /twitter/i })
    expect(twitterLink).toHaveAttribute("href", expect.stringContaining("twitter.com"))
    expect(twitterLink).toHaveAttribute("href", expect.stringContaining("Test"))
  })

  it("copies URL to clipboard when copy button is clicked", async () => {
    render(
      <SocialShare 
        title="Test Article" 
        description="Test description" 
        url="https://example.com/test" 
      />
    )
    
    const copyButton = screen.getByRole("button", { name: /copy link/i })
    fireEvent.click(copyButton)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://example.com/test")
  })

  it("shows toast notification after copying", async () => {
    render(
      <SocialShare 
        title="Test Article" 
        description="Test description" 
        url="https://example.com/test" 
      />
    )
    
    const copyButton = screen.getByRole("button", { name: /copy link/i })
    fireEvent.click(copyButton)
    
    // Wait for toast to appear
    const toast = await screen.findByText(/link copied/i)
    expect(toast).toBeInTheDocument()
  })

  it("opens links in new tab", () => {
    render(
      <SocialShare 
        title="Test Article" 
        description="Test description" 
        url="https://example.com/test" 
      />
    )
    
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i })
    const twitterLink = screen.getByRole("link", { name: /twitter/i })
    
    expect(linkedinLink).toHaveAttribute("target", "_blank")
    expect(twitterLink).toHaveAttribute("target", "_blank")
  })
})
