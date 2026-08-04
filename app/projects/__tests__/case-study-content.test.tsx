import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CaseStudyContent } from "@/components/case-study-content";
import { projects, type Project } from "@/data/projects";

const netstar = projects.find((p) => p.slug === "netstar")!;
const ericsson = projects.find((p) => p.slug === "ericsson")!;

describe("CaseStudyContent (Exp 14)", () => {
  it("renders sections in metric-led order with proper headings", () => {
    render(<CaseStudyContent project={netstar} />);

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toEqual([
      "Problem",
      "Approach",
      "Outcome",
      "Pipeline",
      "Evaluation",
      "What I'd Do Differently",
      "Tech Stack",
    ]);
  });

  it("renders the metrics strip with value, label, and context", () => {
    render(<CaseStudyContent project={netstar} />);

    expect(screen.getByText("~96%")).toBeInTheDocument();
    expect(screen.getByText("Detection accuracy")).toBeInTheDocument();
    expect(
      screen.getByText(/zero-day phishing threats with the ML ensemble/i)
    ).toBeInTheDocument();
  });

  it("renders every approach step as a numbered list", () => {
    render(<CaseStudyContent project={ericsson} />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(ericsson.caseStudy!.approach.length);
    expect(items[0].textContent).toContain("01");
  });

  it("inlines the build-time static SVG diagram", () => {
    const { container } = render(<CaseStudyContent project={netstar} />);

    const svg = container.querySelector("svg#netstar-diagram");
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute("aria-roledescription")).toBe("flowchart-v2");
    expect(svg!.getAttribute("style")).toContain(
      "background-color: transparent"
    );
    // figcaption carries the accessible name
    expect(
      screen.getByText(/pipeline overview \(Mermaid, rendered at build time\)/i)
    ).toBeInTheDocument();
  });

  it("renders tech chips from project tags", () => {
    render(<CaseStudyContent project={netstar} />);

    expect(screen.getByText("FastText")).toBeInTheDocument();
    expect(screen.getByText("XGBoost")).toBeInTheDocument();
  });

  it("renders live demo and github links when present", () => {
    const withLinks: Project = {
      ...netstar,
      demo: "https://example.com/demo",
      github: "https://github.com/example/repo",
    };
    render(<CaseStudyContent project={withLinks} />);

    expect(screen.getByRole("link", { name: /Live Demo/i })).toHaveAttribute(
      "href",
      "https://example.com/demo"
    );
    expect(screen.getByRole("link", { name: /GitHub Repo/i })).toHaveAttribute(
      "href",
      "https://github.com/example/repo"
    );
  });

  it("omits the links section when no links exist", () => {
    render(<CaseStudyContent project={netstar} />);

    expect(screen.queryByRole("link", { name: /Live Demo/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /GitHub Repo/i })).toBeNull();
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((h) => h.textContent)).not.toContain("Links");
  });

  it("renders evaluation and retrospective prose", () => {
    render(<CaseStudyContent project={ericsson} />);

    expect(
      screen.getByText(/The 30% cost reduction is an estimate/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I would have started the security hardening track/i)
    ).toBeInTheDocument();
  });

  it("renders nothing for a project without a case study", () => {
    const { container } = render(
      <CaseStudyContent project={projects.find((p) => p.slug === "titanic")!} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
