import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Home from "@/app/page";

describe("Home page", () => {
  it("renders the hero section with Kanit", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: /Kanit!/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the bento experience card", () => {
    render(<Home />);
    expect(screen.getByText("My Experience")).toBeInTheDocument();
  });

  it("renders the bento tech stack card", () => {
    render(<Home />);
    expect(screen.getByText("Tech Stack")).toBeInTheDocument();
  });

  it("renders the bento GitHub card", () => {
    render(<Home />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("lays out the bento grid asymmetrically: experience spans 2 columns on desktop", () => {
    render(<Home />);
    const experienceWrapper = screen
      .getByText("My Experience")
      .closest(".md\\:col-span-2");
    expect(experienceWrapper).not.toBeNull();
    expect(experienceWrapper?.className).toContain("md:row-span-2");
    expect(experienceWrapper?.className).toContain("hover:shadow-lg");
  });

  it("keeps the tech-stack and GitHub cards at 1 column on desktop", () => {
    render(<Home />);
    expect(
      screen.getByText("Tech Stack").closest(".md\\:col-span-1")
    ).not.toBeNull();
    expect(
      screen.getByText("GitHub").closest(".md\\:col-span-1")
    ).not.toBeNull();
  });

  it("stacks the bento grid to one column on mobile with experience first", () => {
    render(<Home />);
    const grid = screen
      .getByText("My Experience")
      .closest(".md\\:col-span-2")?.parentElement;
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("md:grid-cols-3");
    expect(grid?.firstElementChild?.textContent).toContain("My Experience");
  });

  it("renders featured projects section", () => {
    render(<Home />);
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("renders featured articles section", () => {
    render(<Home />);
    expect(screen.getByText("Featured Articles")).toBeInTheDocument();
  });

  it("does not render the old Currently Seeking section", () => {
    render(<Home />);
    expect(screen.queryByText("Currently Seeking")).not.toBeInTheDocument();
  });

  it("does not render the old Professional Experience heading", () => {
    render(<Home />);
    expect(
      screen.queryByText("Professional Experience")
    ).not.toBeInTheDocument();
  });
});
