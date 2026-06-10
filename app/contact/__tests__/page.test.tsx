import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: vi.fn() } };
  }),
}));

import ContactPage from "@/app/contact/page";

describe("Contact page", () => {
  it("renders the headline", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders contact form inputs", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders social links as text links", () => {
    render(<ContactPage />);
    const emailLinks = screen.getAllByRole("link", { name: /email/i });
    const socialEmailLink = emailLinks.find((l) => l.textContent === "Email");
    expect(socialEmailLink).toBeTruthy();
    expect(socialEmailLink).toHaveAttribute(
      "href",
      "mailto:kanitmann01@gmail.com"
    );

    const linkedInLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/kanitmann"
    );

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/kanitmann01"
    );
  });

  it("renders hidden honeypot field", () => {
    const { container } = render(<ContactPage />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot?.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the prefer a quick chat CTA", () => {
    render(<ContactPage />);
    expect(screen.getByText(/prefer a quick chat/i)).toBeInTheDocument();
  });

  it("renders contact info with email and location", () => {
    render(<ContactPage />);
    expect(screen.getByText("kanitmann01@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Tucson, AZ")).toBeInTheDocument();
  });
});
