import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeAll } from "vitest"

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ className: "font-serif", variable: "--font-serif" }),
  JetBrains_Mono: () => ({ className: "font-mono", variable: "--font-mono" }),
  Geist: () => ({ className: "font-sans", variable: "--font-sans" }),
}))

import RootLayout from "@/app/layout"

describe("Root Layout - Warm Noir Design System", () => {
  it("renders children within the layout", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )
    expect(screen.getByTestId("test-child")).toBeInTheDocument()
  })

  it("renders without errors with new font configuration", () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    )
    expect(container).toBeDefined()
  })

  it("includes navigation and footer", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    )
    expect(screen.getByText(/Kanit Mann\. All rights reserved\./)).toBeInTheDocument()
  })
})
