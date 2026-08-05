import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Footer } from "../footer";

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the name KANIT MANN", () => {
    render(<Footer />);
    expect(screen.getByText("KANIT MANN")).toBeInTheDocument();
  });

  it("renders the subtitle Data, ML & AI Engineer", () => {
    render(<Footer />);
    expect(screen.getByText("Data, ML & AI Engineer")).toBeInTheDocument();
  });

  it("renders all social links as text", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Resume/i })).toBeInTheDocument();
  });

  it("social links point to correct hrefs", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Email/i })).toHaveAttribute(
      "href",
      "mailto:mannkanit@gmail.com"
    );
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/kanitmann01"
    );
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/kanitmann"
    );
    expect(screen.getByRole("link", { name: /Resume/i })).toHaveAttribute(
      "href",
      "/Kanit Mann - Resume.pdf"
    );
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it("renders the KANIT watermark", () => {
    render(<Footer />);
    expect(screen.getByText("KANIT")).toBeInTheDocument();
  });

  it("renders a back-to-top button with an icon and label", () => {
    render(<Footer />);
    const button = screen.getByRole("button", { name: /back to top/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain("Top");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("scrolls to the top when the back-to-top button is clicked", () => {
    // No Lenis provider in tests → useScrollTo falls back to native window
    // scroll (jsdom does not implement it, so spy).
    const scrollToSpy = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    render(<Footer />);
    fireEvent.click(screen.getByRole("button", { name: /back to top/i }));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("renders magnific.com logo attribution as an external link", () => {
    render(<Footer />);
    const attributionLink = screen.getByRole("link", {
      name: /magnific\.com/i,
    });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute("href", "https://magnific.com");
    expect(attributionLink).toHaveAttribute("target", "_blank");
    expect(attributionLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
