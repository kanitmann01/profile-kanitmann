import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";
import {
  buildNetstarLossLandscape,
  buildLossChart,
  buildScatterChart,
  buildMetrics,
} from "@/lib/loss-landscape/netstar";

const netstar = projects.find((p) => p.slug === "netstar")!;

describe("buildNetstarLossLandscape (Wave E.2)", () => {
  it("parses precision/recall/F1 from the NetSTAR record — not hardcoded", () => {
    const { metrics } = buildNetstarLossLandscape(netstar);

    // These exact figures live in netstar.caseStudy.evaluation in
    // data/projects.ts ("96.7% accuracy, 94.1% phishing recall, and 99.3%
    // precision on a held-out 4,409-URL split").
    expect(metrics.accuracyPct).toBeCloseTo(96.7, 5);
    expect(metrics.precisionPct).toBeCloseTo(99.3, 5);
    expect(metrics.recallPct).toBeCloseTo(94.1, 5);
    expect(metrics.f1Pct).toBeCloseTo(96.63, 1);
    expect(metrics.testSize).toBe(4409);
  });

  it("lays out three bars whose height matches each metric", () => {
    const { metrics } = buildNetstarLossLandscape(netstar);

    expect(metrics.bars).toHaveLength(3);
    expect(metrics.bars.map((b) => b.key)).toEqual([
      "precision",
      "recall",
      "f1",
    ]);
    for (const bar of metrics.bars) {
      expect(bar.width).toBe(118);
      expect(bar.height).toBeGreaterThan(0);
      expect(bar.valuePct).toBeCloseTo((bar.height / 186) * 100, 1);
    }
  });

  it("precomputes a descending loss curve with a drawable dash length", () => {
    const loss = buildLossChart();

    expect(loss.epochs).toBe(90);
    expect(loss.trainPath.startsWith("M")).toBe(true);
    expect(loss.valPath.startsWith("M")).toBe(true);
    expect(loss.trainDash).toBeGreaterThan(0);
    expect(loss.valDash).toBeGreaterThan(0);
    // Monotonic descent: the curve ends well below where it started.
    expect(loss.finalLoss).toBeLessThan(loss.initialLoss);
    expect(loss.series.length).toBe(90);
  });

  it("builds a class-colored scatter with misclassified URLs", () => {
    const scatter = buildScatterChart();

    expect(scatter.points.length).toBeGreaterThan(30);
    expect(scatter.classes.map((c) => c.key)).toEqual([
      "phishing",
      "legitimate",
      "spoof",
    ]);
    const classes = new Set(scatter.points.map((p) => p.cls));
    expect(classes).toEqual(new Set(["phishing", "legitimate", "spoof"]));
    for (const p of scatter.points) {
      expect(p.url).toBeTruthy();
      expect(p.r).toBeGreaterThan(0);
    }
  });

  it("reports the model bundle size derived from the real artifact", () => {
    const { cost } = buildNetstarLossLandscape(netstar);

    expect(cost.chips).toHaveLength(2);
    expect(cost.chips[0].value).toMatch(/~?\d+ KB/);
    expect(cost.chips[1].value).toMatch(/~?\d+ ms/);
  });

  it("fails loudly when the record stops carrying the metrics", () => {
    const withoutMetrics = {
      ...netstar,
      caseStudy: { ...netstar.caseStudy!, evaluation: "no numbers here" },
    };

    expect(() => buildMetrics(withoutMetrics)).toThrow(/could not parse/);
  });
});
