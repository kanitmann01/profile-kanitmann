import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as React from "react";

import { MuseumModal } from "../museum-modal";
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

describe("MuseumModal", () => {
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

  it("renders no dialog content when open is false", () => {
    const onOpenChange = vi.fn();
    render(
      <MuseumModal site={mockSite} open={false} onOpenChange={onOpenChange} />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders no dialog content when site is null", () => {
    const onOpenChange = vi.fn();
    render(<MuseumModal site={null} open={true} onOpenChange={onOpenChange} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the poster, Play live button, and Visit site link when opened with a site", () => {
    const onOpenChange = vi.fn();
    render(
      <MuseumModal site={mockSite} open={true} onOpenChange={onOpenChange} />
    );

    const poster = screen.getByAltText(mockSite.name);
    expect(poster).toBeInTheDocument();

    const playButton = screen.getByRole("button", { name: /play live/i });
    expect(playButton).toBeInTheDocument();

    const visitLink = screen.getByRole("link", { name: /visit site/i });
    expect(visitLink).toHaveAttribute("href", mockSite.demoUrl);
    expect(visitLink).toHaveAttribute("target", "_blank");
    expect(visitLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(document.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("renders the site name as the dialog title and one-liner as description", () => {
    const onOpenChange = vi.fn();
    render(
      <MuseumModal site={mockSite} open={true} onOpenChange={onOpenChange} />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName(mockSite.name);
    expect(dialog).toHaveAccessibleDescription(mockSite.oneLiner);
  });

  it("mounts the iframe with the correct src and sandbox when Play live is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <MuseumModal site={mockSite} open={true} onOpenChange={onOpenChange} />
    );

    const playButton = screen.getByRole("button", { name: /play live/i });
    fireEvent.click(playButton);

    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", mockSite.demoUrl);
    expect(iframe).toHaveAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-forms"
    );
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("referrerpolicy", "no-referrer");
  });

  it("unmounts the iframe and shows error state when iframe onError fires", () => {
    const onOpenChange = vi.fn();
    render(
      <MuseumModal site={mockSite} open={true} onOpenChange={onOpenChange} />
    );

    const playButton = screen.getByRole("button", { name: /play live/i });
    fireEvent.click(playButton);

    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();

    fireEvent.error(iframe!);

    expect(document.querySelector("iframe")).not.toBeInTheDocument();
    expect(screen.getByTestId("museum-iframe-error")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /visit site/i })
    ).toBeInTheDocument();
  });

  it("removes content and unmounts the iframe when the modal is closed", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <MuseumModal site={mockSite} open={true} onOpenChange={onOpenChange} />
    );

    const playButton = screen.getByRole("button", { name: /play live/i });
    fireEvent.click(playButton);
    expect(document.querySelector("iframe")).toBeInTheDocument();

    rerender(
      <MuseumModal site={mockSite} open={false} onOpenChange={onOpenChange} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("calls onOpenChange(false) when Escape is pressed", () => {
    const onOpenChange = vi.fn();
    render(
      <MuseumModal site={mockSite} open={true} onOpenChange={onOpenChange} />
    );

    fireEvent.keyDown(document.body, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
