import { describe, it, expect } from "vitest";
import { projects, type Project } from "../projects";
import { projectDiagrams } from "../diagram-content";
import { experiences } from "../experiences";

const caseStudies = projects.filter((p) => p.caseStudy);

describe("case-study schema (Exp 14)", () => {
  it("migrates exactly the three intended projects", () => {
    expect(caseStudies.map((p) => p.slug).sort()).toEqual([
      "ericsson",
      "netstar",
      "unified-bharat",
    ]);
  });

  it("gives every case-study project the full schema", () => {
    for (const project of caseStudies) {
      const study = project.caseStudy!;
      expect(study.problem.length).toBeGreaterThan(40);
      expect(study.approach.length).toBeGreaterThanOrEqual(3);
      study.approach.forEach((step) => expect(step.length).toBeGreaterThan(20));
      expect(study.outcome.length).toBeGreaterThanOrEqual(2);
      study.outcome.forEach((metric) => {
        expect(metric.label.length).toBeGreaterThan(0);
        expect(metric.value.length).toBeGreaterThan(0);
        expect(metric.context.length).toBeGreaterThan(20);
      });
      expect(study.pipelineDiagram).toContain("flowchart");
      expect(study.retrospective.length).toBeGreaterThan(40);
    }
  });

  it("has a build-time-rendered diagram for every case-study project", () => {
    for (const project of caseStudies) {
      const diagram = projectDiagrams[project.slug];
      expect(diagram, `${project.slug} missing diagram`).toBeDefined();
      expect(diagram).toContain("<svg");
      expect(diagram).toContain(`id="${project.slug}-diagram"`);
      // Static SVG only — no mermaid runtime code in the payload.
      expect(diagram).not.toContain("<script");
    }
  });

  it("pulls the headline metrics from experiences.ts", () => {
    const byId = (id: string) => experiences.find((e) => e.id === id)!;

    const netstar = projects.find((p) => p.slug === "netstar")!;
    expect(netstar.caseStudy!.outcome[0].value).toBe("~96%");
    const netstarExp = byId("netstar");
    expect(netstarExp.achievements!.join(" ").includes("96% accuracy")).toBe(
      true
    );

    const ericsson = projects.find((p) => p.slug === "ericsson")!;
    const ericssonValues = ericsson.caseStudy!.outcome.map((m) => m.value);
    expect(ericssonValues).toContain("-30%");
    expect(ericssonValues).toContain("99.9%");
    const ericssonRole = byId("ericsson").roles![0];
    expect(
      ericssonRole
        .achievements!.join(" ")
        .includes("reducing infrastructure cost by an estimated 30%")
    ).toBe(true);
    expect(
      ericssonRole.achievements!.join(" ").includes("99.9% uptime SLA")
    ).toBe(true);
  });

  it("does not affect classic (non-case-study) projects", () => {
    const classic = projects.filter((p) => !p.caseStudy);
    expect(classic.length).toBe(5);
    classic.forEach((p: Project) => expect(p.caseStudy).toBeUndefined());
  });

  it("keeps every case-study project routable", () => {
    for (const project of caseStudies) {
      expect(project.href).toBe(`/projects/${project.slug}`);
      expect(project.image.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });
});
