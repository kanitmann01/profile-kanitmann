import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { Navigation } from "../navigation"

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}))

describe("Navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the logo image", () => {
    render(<Navigation />)
    const logo = screen.getByAltText("Kanit Mann")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src")
  })

  it("renders all navigation links with correct text", () => {
    render(<Navigation />)
    expect(screen.getByRole("link", { name: /WORK/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /ABOUT/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /ARTICLES/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /CONTACT/i })).toBeInTheDocument()
  })

  it("links point to correct hrefs", () => {
    render(<Navigation />)
    expect(screen.getByRole("link", { name: /WORK/i })).toHaveAttribute("href", "/projects")
    expect(screen.getByRole("link", { name: /ABOUT/i })).toHaveAttribute("href", "/about")
    expect(screen.getByRole("link", { name: /ARTICLES/i })).toHaveAttribute("href", "/articles")
    expect(screen.getByRole("link", { name: /CONTACT/i })).toHaveAttribute("href", "/contact")
  })

  it("does not render a Resume button", () => {
    render(<Navigation />)
    expect(screen.queryByText(/Resume/i)).not.toBeInTheDocument()
  })

  it("renders the ThemeToggle", () => {
    render(<Navigation />)
    const themeButtons = screen.getAllByRole("button", { name: /toggle theme/i })
    expect(themeButtons.length).toBeGreaterThanOrEqual(1)
  })

  it("toggles mobile menu when hamburger button is clicked", () => {
    render(<Navigation />)
    const toggleButton = screen.getByRole("button", { name: /toggle mobile menu/i })

    const desktopLinks = screen.queryAllByRole("link", { name: /WORK|ABOUT|ARTICLES|CONTACT/i })
    expect(desktopLinks.length).toBe(4)

    fireEvent.click(toggleButton)

    const allLinks = screen.getAllByRole("link", { name: /WORK|ABOUT|ARTICLES|CONTACT/i })
    expect(allLinks.length).toBe(8)
  })

  it("closes mobile menu when toggle button is clicked again", () => {
    render(<Navigation />)
    const toggleButton = screen.getByRole("button", { name: /toggle mobile menu/i })

    fireEvent.click(toggleButton)
    const mobileLinks = screen.getAllByRole("link", { name: /WORK|ABOUT|ARTICLES|CONTACT/i })
    expect(mobileLinks.length).toBe(8)

    fireEvent.click(toggleButton)
    const desktopLinks = screen.queryAllByRole("link", { name: /WORK|ABOUT|ARTICLES|CONTACT/i })
    expect(desktopLinks.length).toBe(4)
  })

  it("mobile menu links close the menu on click", () => {
    render(<Navigation />)
    const toggleButton = screen.getByRole("button", { name: /toggle mobile menu/i })
    fireEvent.click(toggleButton)

    const allWorkLinks = screen.getAllByRole("link", { name: /WORK/i })
    const mobileWorkLink = allWorkLinks[allWorkLinks.length - 1]
    fireEvent.click(mobileWorkLink)

    const mobileNavLinks = screen.queryAllByRole("link", { name: /WORK|ABOUT|ARTICLES|CONTACT/i })
    expect(mobileNavLinks.length).toBe(4)
  })
})
