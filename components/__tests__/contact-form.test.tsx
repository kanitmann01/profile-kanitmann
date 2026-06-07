import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

import { ContactForm } from "../contact-form"

describe("ContactForm", () => {
  const originalLocation = window.location

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...originalLocation, href: "" },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: originalLocation,
    })
  })

  it("renders all form fields", () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it("renders submit button with correct text", () => {
    render(<ContactForm />)

    const button = screen.getByRole("button", { name: /send via email/i })
    expect(button).toBeInTheDocument()
  })

  it("shows loading state on submit", () => {
    vi.useFakeTimers()
    render(<ContactForm />)

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    expect(screen.getByRole("button")).toHaveTextContent("Opening email...")

    vi.advanceTimersByTime(1000)
    vi.useRealTimers()
  })

  it("constructs mailto URL with form data", () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } })
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme" } })
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Collaboration" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's work together" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    const href = (window.location as any).href as string
    expect(href).toContain("mailto:kanitmann01@gmail.com")
    expect(href).toContain("subject=Collaboration")
    expect(href).toContain("Name%3A+John+Doe")
    expect(href).toContain("Email%3A+john%40example.com")
    expect(href).toContain("Company%3A+Acme")
    expect(href).toContain("Let%27s+work+together")
  })

  it("uses default subject when subject field is empty", () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Jane" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Smith" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Hi there" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    const href = (window.location as any).href as string
    expect(href).toContain("subject=Hello+from+Jane+Smith")
  })

  it("omits email and company from body when empty", () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "A" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "B" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Msg" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    const href = (window.location as any).href as string
    expect(href).not.toContain("Email%3A")
    expect(href).not.toContain("Company%3A")
  })

  it("resets form after submission", () => {
    vi.useFakeTimers()
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    vi.advanceTimersByTime(1000)

    expect((screen.getByLabelText(/first name/i) as HTMLInputElement).value).toBe("")

    vi.useRealTimers()
  })
})
