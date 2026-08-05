import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("notFound called");
  },
}));

import ProjectPage from "../[slug]/page";
import { projects } from "@/data/projects";

const renderPage = async (slug: string) =>
  render(await ProjectPage({ params: Promise.resolve({ slug }) }));

describe("Case-study project page (/projects/[slug], Exp 14)", () => {
  it("renders the metric-led layout for a case-study slug", async () => {
    const { container } = await renderPage("netstar");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Zero-Day Phishing Threat Intelligence Platform",
      })
    ).toBeInTheDocument();

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toContain("Problem");
    expect(headings).toContain("Outcome");
    expect(headings).toContain("Pipeline");
    expect(headings).toContain("What I'd Do Differently");

    const svg = container.querySelector("svg#netstar-diagram");
    expect(svg).not.toBeNull();
  });

  it("emits SoftwareApplication JSON-LD with breadcrumbs", async () => {
    const { container } = await renderPage("ericsson");

    const text = container.textContent ?? "";
    expect(text).toContain('"@type":"SoftwareApplication"');
    expect(text).toContain('"applicationCategory":"DeveloperApplication"');
    expect(text).toContain('"featureList"');
    expect(text).toContain("Ericsson");
    // BreadcrumbList is kept alongside the software schema.
    expect(text).toContain('"@type":"BreadcrumbList"');
  });

  it("keeps classic slugs on the legacy content path", async () => {
    const { container } = await renderPage("titanic");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: projects.find((p) => p.slug === "titanic")!.title,
      })
    ).toBeInTheDocument();
    // classic pages still render the hero tech chips
    expect(screen.getAllByText("Flask").length).toBeGreaterThan(0);
    // ...but no mermaid diagram (SVGs like lucide icons are fine)
    expect(container.querySelector("svg[aria-roledescription]")).toBeNull();
  });
});
