import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockReplace, mockUseSearchParams, mockUsePathname, setUrl } =
  vi.hoisted(() => {
    let current = new URLSearchParams("");
    return {
      setUrl: (queryString: string) => {
        current = new URLSearchParams(queryString);
      },
      mockUseSearchParams: vi.fn(() => current),
      mockUsePathname: vi.fn(() => "/projects"),
      // Simulate the router: replace() updates the URL the page reads next.
      mockReplace: vi.fn((url: string) => {
        const queryIndex = url.indexOf("?");
        current = new URLSearchParams(
          queryIndex >= 0 ? url.slice(queryIndex + 1) : ""
        );
      }),
    };
  });

vi.mock("next/navigation", () => ({
  useSearchParams: mockUseSearchParams,
  useRouter: () => ({ replace: mockReplace }),
  usePathname: mockUsePathname,
}));

import Projects from "@/app/projects/page";
import { projects } from "@/data/projects";

describe("Projects page - editorial layout", () => {
  beforeEach(() => {
    setUrl("");
    mockReplace.mockClear();
  });

  it("renders all project titles", () => {
    render(<Projects />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("renders all project descriptions", () => {
    render(<Projects />);
    projects.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it("renders project images for each project", () => {
    render(<Projects />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(projects.length);
  });

  it("renders the page heading", () => {
    render(<Projects />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders tech tags for each project", () => {
    render(<Projects />);
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        const tagElements = screen.getAllByText(tag);
        expect(tagElements.length).toBeGreaterThan(0);
      });
    });
  });

  it("renders status badges for projects with status", () => {
    render(<Projects />);
    const projectsWithStatus = projects.filter((p) => p.status);
    projectsWithStatus.forEach((project) => {
      const statusElements = screen.getAllByText(project.status!);
      expect(statusElements.length).toBeGreaterThan(0);
    });
  });

  it("renders project links to detail pages", () => {
    render(<Projects />);
    projects.forEach((project) => {
      const link = screen.getByRole("link", {
        name: new RegExp(project.title, "i"),
      });
      expect(link).toHaveAttribute("href", project.href);
    });
  });

  it("uses editorial vertical layout with alternating image positions", () => {
    const { container } = render(<Projects />);
    const sections = container.querySelectorAll("[data-editorial-project]");
    expect(sections.length).toBe(projects.length);
  });

  it("renders project titles in serif font", () => {
    const { container } = render(<Projects />);
    const titles = container.querySelectorAll("[data-project-title]");
    expect(titles.length).toBe(projects.length);
    titles.forEach((title) => {
      expect(title.className).toContain("font-serif");
    });
  });

  it("renders tech tags in monospace font", () => {
    const { container } = render(<Projects />);
    const tagContainers = container.querySelectorAll("[data-project-tags]");
    expect(tagContainers.length).toBe(projects.length);
    tagContainers.forEach((tagGroup) => {
      expect(tagGroup.className).toContain("font-mono");
    });
  });
});

describe("Projects page - filters", () => {
  beforeEach(() => {
    setUrl("");
    mockReplace.mockClear();
  });

  it("pre-populates from ?stack= and filters the list", () => {
    setUrl("stack=Snowflake");
    render(<Projects />);
    expect(
      screen.getByText("Real-Time Twitch Analytics Pipeline")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Titanic Survival Predictor Web App")
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Filter by Snowflake" })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("multi-selected stack chips union their projects", () => {
    setUrl("stack=Flask,Pandas");
    render(<Projects />);
    expect(
      screen.getByText("Titanic Survival Predictor Web App")
    ).toBeInTheDocument();
    expect(
      screen.getByText("VoiceBridge - Real-Time P2P Translation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("College Major Selection & Shift Analysis")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("The Echo Effect: WTO Accession Impact Analysis")
    ).not.toBeInTheDocument();
  });

  it("text search narrows by title and description (case-insensitive)", () => {
    setUrl("q=medallion");
    render(<Projects />);
    expect(
      screen.getByText(
        "Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Titanic Survival Predictor Web App")
    ).not.toBeInTheDocument();
  });

  it("stack chips combine with text search", () => {
    setUrl("stack=Python&q=medallion");
    render(<Projects />);
    expect(
      screen.getByText(
        "Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Real-Time Twitch Analytics Pipeline")
    ).not.toBeInTheDocument();
  });

  it("clicking a chip filters interactively and clear resets", () => {
    render(<Projects />);
    fireEvent.click(screen.getByRole("button", { name: "Filter by Flask" }));
    expect(
      screen.getByText("Titanic Survival Predictor Web App")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
      )
    ).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/projects?stack=Flask", {
      scroll: false,
    });

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(
      screen.getByText(
        "Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
      )
    ).toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/projects", { scroll: false });
  });

  it("typing in the search box narrows the list and syncs the URL", () => {
    render(<Projects />);
    fireEvent.change(screen.getByLabelText("Search projects"), {
      target: { value: "titanic" },
    });
    expect(
      screen.getByText("Titanic Survival Predictor Web App")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
      )
    ).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/projects?q=titanic", {
      scroll: false,
    });
  });

  it("renders the empty state when nothing matches and clears from it", () => {
    setUrl("q=zzz");
    render(<Projects />);
    expect(
      screen.getByText("No projects match — clear filters")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(
      screen.getByText(
        "Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("No projects match — clear filters")
    ).not.toBeInTheDocument();
  });
});
