import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { MuseumMentions } from "../museum-mentions";
import type { Fable5Mention } from "@/data/fable5";

const mentions: Fable5Mention[] = [
  {
    id: "demo-1",
    title: "Demo One",
    author: "@alpha",
    type: "Demo",
    sourceUrl: "https://x.com/alpha/status/1",
    addedAt: "2026-06-10",
  },
  {
    id: "demo-2",
    title: "Demo Two",
    author: "@beta",
    type: "Demo",
    sourceUrl: "https://x.com/beta/status/2",
    addedAt: "2026-06-09",
  },
  {
    id: "tut-1",
    title: "Tutorial One",
    author: "@gamma",
    type: "Tutorial",
    sourceUrl: "https://x.com/gamma/status/3",
    addedAt: "2026-06-08",
  },
  {
    id: "eval-1",
    title: "Evaluation One",
    author: "@delta",
    type: "Evaluation",
    sourceUrl: "https://x.com/delta/status/4",
    addedAt: "2026-06-07",
  },
  {
    id: "int-1",
    title: "Integration One",
    author: "@epsilon",
    type: "Integration",
    sourceUrl: "https://x.com/epsilon/status/5",
    addedAt: "2026-06-06",
  },
];

describe("MuseumMentions", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders the section heading with the mention count", () => {
    render(<MuseumMentions mentions={mentions} />);
    expect(
      screen.getByRole("heading", {
        name: new RegExp(`MENTIONS \\(${mentions.length}\\)`, "i"),
      })
    ).toBeInTheDocument();
  });

  it("renders every mention title", () => {
    render(<MuseumMentions mentions={mentions} />);
    mentions.forEach((mention) => {
      expect(screen.getByText(mention.title)).toBeInTheDocument();
    });
  });

  it("renders every mention author with the @ prefix", () => {
    render(<MuseumMentions mentions={mentions} />);
    mentions.forEach((mention) => {
      const handle = `@${mention.author.replace(/^@/, "")}`;
      expect(
        screen.getAllByText(handle, { exact: false }).length
      ).toBeGreaterThan(0);
    });
  });

  it("renders every mention date in brackets", () => {
    render(<MuseumMentions mentions={mentions} />);
    mentions.forEach((mention) => {
      expect(screen.getByText(`[${mention.addedAt}]`)).toBeInTheDocument();
    });
  });

  it("renders every type as a type chip", () => {
    render(<MuseumMentions mentions={mentions} />);
    const types = Array.from(new Set(mentions.map((m) => m.type)));
    types.forEach((type) => {
      expect(screen.getAllByText(type).length).toBeGreaterThan(0);
    });
  });

  it("renders the type filter pills: All, Demo, Tutorial, Evaluation, Integration", () => {
    render(<MuseumMentions mentions={mentions} />);
    ["All", "Demo", "Tutorial", "Evaluation", "Integration"].forEach(
      (label) => {
        expect(
          screen.getByRole("button", {
            name: new RegExp(`^${label}$`, "i"),
          })
        ).toBeInTheDocument();
      }
    );
  });

  it("marks the All filter as pressed by default", () => {
    render(<MuseumMentions mentions={mentions} />);
    const all = screen.getByRole("button", { name: /^all$/i });
    expect(all).toHaveAttribute("aria-pressed", "true");
  });

  it("filters the list to only Demo mentions when the Demo pill is clicked", () => {
    const { container } = render(<MuseumMentions mentions={mentions} />);
    const demoPill = screen.getByRole("button", { name: /^demo$/i });
    fireEvent.click(demoPill);
    expect(demoPill).toHaveAttribute("aria-pressed", "true");

    const rows = container.querySelectorAll("[data-mention-row]");
    expect(rows.length).toBe(2);
    rows.forEach((row) => {
      expect(row.getAttribute("data-mention-type")).toBe("Demo");
    });
  });

  it("filters to only Evaluation mentions when the Evaluation pill is clicked", () => {
    const { container } = render(<MuseumMentions mentions={mentions} />);
    const evalPill = screen.getByRole("button", { name: /^evaluation$/i });
    fireEvent.click(evalPill);
    const rows = container.querySelectorAll("[data-mention-row]");
    expect(rows.length).toBe(1);
    expect(rows[0].getAttribute("data-mention-type")).toBe("Evaluation");
    expect(screen.getByText("Evaluation One")).toBeInTheDocument();
  });

  it("restores the full list when All is clicked after a filter is active", () => {
    const { container } = render(<MuseumMentions mentions={mentions} />);
    fireEvent.click(screen.getByRole("button", { name: /^tutorial$/i }));
    expect(container.querySelectorAll("[data-mention-row]").length).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: /^all$/i }));
    expect(container.querySelectorAll("[data-mention-row]").length).toBe(
      mentions.length
    );
  });

  it("sorts the mentions by addedAt descending", () => {
    const { container } = render(<MuseumMentions mentions={mentions} />);
    const rows = container.querySelectorAll("[data-mention-row]");
    const dates = Array.from(rows).map((row) => {
      const dateSpan = within(row as HTMLElement).getByText(
        /^\[\d{4}-\d{2}-\d{2}\]$/
      );
      return dateSpan.textContent?.replace(/[\[\]]/g, "") ?? "";
    });
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it("links each mention to its sourceUrl in a new tab", () => {
    render(<MuseumMentions mentions={mentions} />);
    const firstMention = mentions[0];
    const titleEl = screen.getByText(firstMention.title);
    const row = titleEl.closest("[data-mention-row]") as HTMLElement;
    const link = within(row).getByRole("link");
    expect(link).toHaveAttribute("href", firstMention.sourceUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
