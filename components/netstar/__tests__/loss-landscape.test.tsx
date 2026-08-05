import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";
import { buildNetstarLossLandscape } from "@/lib/loss-landscape/netstar";
import { NetstarLossLandscape } from "@/components/netstar/loss-landscape";

const data = buildNetstarLossLandscape(
  projects.find((p) => p.slug === "netstar")!
);

describe("NetstarLossLandscape (Wave E.2 scrollytelling)", () => {
  it("renders one viewport section per narrative beat", () => {
    render(<NetstarLossLandscape data={data} />);

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toEqual([
      "Training",
      "Where it fails",
      "How we measured",
      "What it costs",
    ]);

    // Each section occupies a full scroll viewport (scroll-linked).
    const sections = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.closest("section")!);
    sections.forEach((s) => {
      expect(s).not.toBeNull();
      expect(s.className).toContain("min-h-[100svh]");
    });
  });

  it("renders all four chart/cost panels", () => {
    const { container } = render(<NetstarLossLandscape data={data} />);

    expect(
      container.querySelector('[data-testid="nsl-loss-chart"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="nsl-scatter-chart"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="nsl-metrics-chart"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="nsl-cost-panel"]')
    ).not.toBeNull();
  });

  it("draws a real loss curve, scatter dots, and metric bars as SVG", () => {
    const { container } = render(<NetstarLossLandscape data={data} />);

    const lossChart = container.querySelector('[data-testid="nsl-loss-chart"]');
    expect(lossChart!.querySelectorAll("path").length).toBeGreaterThanOrEqual(
      2
    );

    const scatter = container.querySelector(
      '[data-testid="nsl-scatter-chart"]'
    );
    expect(scatter!.querySelectorAll("circle").length).toBeGreaterThan(20);
    expect(scatter!.querySelectorAll("title").length).toBeGreaterThan(20);

    const metrics = container.querySelector(
      '[data-testid="nsl-metrics-chart"]'
    );
    expect(metrics!.querySelectorAll("rect").length).toBe(3);
  });

  it("narrates with numbers pulled from the NetSTAR record", () => {
    render(<NetstarLossLandscape data={data} />);

    // Held-out split size rendered with locale separators, straight from
    // the data (4,409) — not hardcoded. Appears in the copy and the
    // chart caption.
    expect(screen.getAllByText(/4,409/).length).toBeGreaterThan(0);
    expect(screen.getByText(/96\.7%/)).toBeInTheDocument();

    // The quoted failure caption is verbatim.
    expect(
      screen.getByText(/Subword tokenization handles unseen domains/i)
    ).toBeInTheDocument();

    // Cost chips carry the derived bundle size + static latency.
    const cost = screen.getByTestId("nsl-cost-panel");
    expect(within(cost).getByText(/KB$/)).toBeInTheDocument();
    expect(within(cost).getByText(/ms$/)).toBeInTheDocument();
  });

  it("colors scatter dots by class via the class legend", () => {
    const { container } = render(<NetstarLossLandscape data={data} />);

    const scatter = container.querySelector(
      '[data-testid="nsl-scatter-chart"]'
    );
    // Circles are grouped by class in the static path; the legend lists
    // each class with its color.
    const legend = screen.getByText("phishing missed");
    expect(legend).toBeInTheDocument();
    expect(scatter!.querySelectorAll("circle").length).toBe(
      data.scatter.points.length
    );
  });
});
