import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { MuseumCard } from "../museum-card";
import type { Fable5Site } from "@/data/fable5";

const mockSite: Fable5Site = {
  id: "test-site",
  name: "Test Fable 5 Site",
  demoUrl: "https://example.com/demo",
  screenshotUrl: "https://example.com/screenshot.png",
  oneLiner: "A short description of the test site.",
  author: "@testauthor",
  sourceUrl: "https://x.com/testauthor/status/123",
  tags: ["3d", "shader", "game"],
  featured: true,
  addedAt: "2026-06-09",
  playable: true,
};

describe("MuseumCard", () => {
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the site name as a visible title", () => {
    render(<MuseumCard site={mockSite} />);
    expect(screen.getByText(mockSite.name)).toBeInTheDocument();
  });

  it("renders the author handle prefixed with @", () => {
    render(<MuseumCard site={mockSite} />);
    expect(
      screen.getByText(`@${mockSite.author.replace(/^@/, "")}`)
    ).toBeInTheDocument();
  });

  it("renders all tag chips", () => {
    render(<MuseumCard site={mockSite} />);
    mockSite.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("renders a button with an aria-label containing name and author", () => {
    render(<MuseumCard site={mockSite} />);
    const card = screen.getByRole("button", {
      name: /Test Fable 5 Site by @testauthor/i,
    });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabindex", "0");
  });

  it("calls onActivate with the site when clicked and onActivate is provided", () => {
    const onActivate = vi.fn();
    render(<MuseumCard site={mockSite} onActivate={onActivate} />);
    const card = screen.getByRole("button", { name: /Test Fable 5 Site/i });
    fireEvent.click(card);
    expect(onActivate).toHaveBeenCalledTimes(1);
    expect(onActivate).toHaveBeenCalledWith(mockSite);
  });

  it("opens the demo URL in a new tab when clicked and no onActivate is provided", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<MuseumCard site={mockSite} />);
    const card = screen.getByRole("button", { name: /Test Fable 5 Site/i });
    fireEvent.click(card);
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(
      mockSite.demoUrl,
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("triggers activation when Enter is pressed", () => {
    const onActivate = vi.fn();
    render(<MuseumCard site={mockSite} onActivate={onActivate} />);
    const card = screen.getByRole("button", { name: /Test Fable 5 Site/i });
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onActivate).toHaveBeenCalledTimes(1);
    expect(onActivate).toHaveBeenCalledWith(mockSite);
  });

  it("triggers activation when Space is pressed", () => {
    const onActivate = vi.fn();
    render(<MuseumCard site={mockSite} onActivate={onActivate} />);
    const card = screen.getByRole("button", { name: /Test Fable 5 Site/i });
    fireEvent.keyDown(card, { key: " " });
    expect(onActivate).toHaveBeenCalledTimes(1);
    expect(onActivate).toHaveBeenCalledWith(mockSite);
  });

  it("does not call onActivate when other keys are pressed", () => {
    const onActivate = vi.fn();
    render(<MuseumCard site={mockSite} onActivate={onActivate} />);
    const card = screen.getByRole("button", { name: /Test Fable 5 Site/i });
    fireEvent.keyDown(card, { key: "a" });
    expect(onActivate).not.toHaveBeenCalled();
  });

  it("renders a PLAYABLE badge when the site is playable", () => {
    render(<MuseumCard site={mockSite} />);
    expect(screen.getByText(/PLAYABLE/i)).toBeInTheDocument();
  });

  it("does not render a PLAYABLE badge when the site is not playable", () => {
    render(<MuseumCard site={{ ...mockSite, playable: false }} />);
    expect(screen.queryByText(/PLAYABLE/i)).not.toBeInTheDocument();
  });

  it("renders an image element for the screenshot", () => {
    const { container } = render(<MuseumCard site={mockSite} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", mockSite.name);
  });

  it("falls back to a placeholder when the image fails to load", () => {
    const { container } = render(<MuseumCard site={mockSite} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    fireEvent.error(img!);
    const fallback = container.querySelector("[data-museum-card-fallback]");
    expect(fallback).toBeInTheDocument();
  });

  it("calls onTagClick when a tag is clicked and stops propagation", () => {
    const onTagClick = vi.fn();
    const onActivate = vi.fn();
    render(
      <MuseumCard
        site={mockSite}
        onActivate={onActivate}
        onTagClick={onTagClick}
      />
    );
    const tag = screen.getByText("3d");
    fireEvent.click(tag);
    expect(onTagClick).toHaveBeenCalledTimes(1);
    expect(onTagClick.mock.calls[0][0]).toBe("3d");
    expect(onActivate).not.toHaveBeenCalled();
  });
});
