import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

const mockSetTheme = vi.fn()

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: currentTheme, setTheme: mockSetTheme }),
}))

let currentTheme = "light"

import { ThemeToggle } from "../theme-toggle"

describe("ThemeToggle", () => {
  it("renders a button with accessible label", () => {
    currentTheme = "light"
    render(<ThemeToggle />)
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument()
  })

  it("calls setTheme with 'dark' when current theme is 'light'", () => {
    currentTheme = "light"
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole("button"))
    expect(mockSetTheme).toHaveBeenCalledWith("dark")
  })

  it("calls setTheme with 'light' when current theme is 'dark'", () => {
    currentTheme = "dark"
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole("button"))
    expect(mockSetTheme).toHaveBeenCalledWith("light")
  })

  it("renders nothing before mounting (hydration guard)", () => {
    currentTheme = "light"
    const { container } = render(<ThemeToggle />)
    expect(container.querySelector("button")).toBeInTheDocument()
  })
})
