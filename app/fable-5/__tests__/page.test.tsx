import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Fable5MuseumPage from "@/app/fable-5/page";
import {
  fable5Sites,
  fable5Mentions,
  featuredFable5Sites,
} from "@/data/fable5";

describe("Fable 5 Museum page", () => {
  it("renders the page", () => {
    const { container } = render(<Fable5MuseumPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the hero H1 with Fable 5 in the text", () => {
    render(<Fable5MuseumPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Fable 5");
  });

  it("renders the total site count from the data", () => {
    render(<Fable5MuseumPage />);
    const total = fable5Sites.length;
    expect(
      screen.getByText(
        new RegExp(`${total}\\s+${total === 1 ? "site" : "sites"}`, "i")
      )
    ).toBeInTheDocument();
  });

  it("renders the featured count from the data", () => {
    render(<Fable5MuseumPage />);
    const featured = featuredFable5Sites.length;
    expect(
      screen.getByText(new RegExp(`${featured}\\s+featured`, "i"))
    ).toBeInTheDocument();
  });

  it("renders the mention count from the data", () => {
    render(<Fable5MuseumPage />);
    const mentions = fable5Mentions.length;
    expect(
      screen.getByText(new RegExp(`${mentions}\\s+mentions`, "i"))
    ).toBeInTheDocument();
  });

  it("renders the submit site button", () => {
    render(<Fable5MuseumPage />);
    expect(
      screen.getByRole("link", { name: /submit a site/i })
    ).toBeInTheDocument();
  });

  it("renders the grid slot for later slices", () => {
    const { container } = render(<Fable5MuseumPage />);
    const slot = container.querySelector("[data-museum-grid-slot]");
    expect(slot).toBeInTheDocument();
  });
});
