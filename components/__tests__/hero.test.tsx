import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/hero";

/** Full headline text as rendered in the hero. */
const HEADLINE = "Kanit Mann";

/** Stubs the jsdom matchMedia mock the setup installs (matches: false). */
function stubPrefersReducedMotion(matches: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as any
  );
}

afterEach(() => {
  stubPrefersReducedMotion(false);
});

describe("Hero", () => {
  it("renders the heading with name Kanit", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { name: /Kanit Mann/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the role tagline", () => {
    render(<Hero />);
    expect(screen.getByText("Data, ML & AI")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
  });

  it("styles the Engineer word in italic serif", () => {
    render(<Hero />);
    const engineer = screen.getByText("Engineer");
    expect(engineer.tagName).toBe("EM");
    expect(engineer).toHaveClass("font-serif-italic");
  });

  it("renders the university affiliation", () => {
    render(<Hero />);
    expect(screen.getByText(/MS, University of Arizona/)).toBeInTheDocument();
  });

  it("renders the seeking status badge", () => {
    render(<Hero />);
    expect(screen.getByText(/Seeking full-time roles/)).toBeInTheDocument();
  });

  it("renders the profile image", () => {
    render(<Hero />);
    expect(screen.getByAltText("Kanit Mann")).toBeInTheDocument();
  });

  it("renders the Book a call CTA button", () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: /Book a call/i })
    ).toBeInTheDocument();
  });

  it("renders the supporting link to projects", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /browse the work/i })
    ).toHaveAttribute("href", "/projects");
  });

  it("does not render old hero content", () => {
    render(<Hero />);
    expect(screen.queryByText(/KEN/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ex-Ericsson/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /View Projects/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Get In Touch/i })
    ).not.toBeInTheDocument();
  });

  it("renders the headline as static text (no char-split kinetic animation)", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { name: /Kanit/i });
    // Wave B LCP: the H1 is a plain static element — full text in the DOM,
    // no aria juggling, no opacity:0/blur start that delays first paint.
    expect(heading.textContent).toBe(HEADLINE);
    expect(heading).not.toHaveAttribute("aria-label");
    expect(heading.querySelectorAll("span[aria-hidden='true']")).toHaveLength(
      0
    );
  });

  it("renders the headline as a single static element under reduced motion", async () => {
    stubPrefersReducedMotion(true);
    render(<Hero />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: /Kanit/i });
      // No split, no aria juggling — the plain text h1 renders as-is.
      expect(heading.querySelectorAll("span")).toHaveLength(0);
      expect(heading.textContent).toBe(HEADLINE);
      expect(heading).not.toHaveAttribute("aria-label");
    });
  });
});
