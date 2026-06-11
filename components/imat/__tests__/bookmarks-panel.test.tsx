import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookmarksPanel } from "../bookmarks-panel";

const mockRemoveBookmark = vi.fn();

vi.mock("@/hooks/use-bookmarks", () => ({
  useBookmarks: () => ({
    bookmarks: [
      {
        noteSlug: "glycolysis",
        sectionId: "eq-1",
        sectionType: "equation" as const,
        label: "ATP yield equation",
        timestamp: "2025-01-01T00:00:00.000Z",
      },
      {
        noteSlug: "glycolysis",
        sectionId: "we-1",
        sectionType: "worked-example" as const,
        label: "Example 1",
        timestamp: "2025-01-02T00:00:00.000Z",
      },
      {
        noteSlug: "krebs-cycle",
        sectionId: "explanation",
        sectionType: "explanation" as const,
        label: "Explanation",
        timestamp: "2025-01-03T00:00:00.000Z",
      },
    ],
    removeBookmark: mockRemoveBookmark,
  }),
}));

describe("BookmarksPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders bookmarks grouped by note", () => {
    render(<BookmarksPanel />);

    expect(screen.getByTestId("bookmarks-panel")).toBeInTheDocument();
    expect(screen.getByText("Glycolysis")).toBeInTheDocument();
    expect(
      screen.getByText("Krebs Cycle (Citric Acid Cycle)")
    ).toBeInTheDocument();
  });

  it("shows bookmark labels", () => {
    render(<BookmarksPanel />);

    expect(screen.getByText("ATP yield equation")).toBeInTheDocument();
    expect(screen.getByText("Example 1")).toBeInTheDocument();
    expect(screen.getByText("Explanation")).toBeInTheDocument();
  });

  it("has navigation links for each bookmark", () => {
    render(<BookmarksPanel />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("has remove button for each bookmark", () => {
    render(<BookmarksPanel />);

    const removeButtons = screen.getAllByTestId("remove-bookmark");
    expect(removeButtons.length).toBe(3);
  });

  it("calls removeBookmark when remove button clicked", () => {
    render(<BookmarksPanel />);

    const removeButtons = screen.getAllByTestId("remove-bookmark");
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveBookmark).toHaveBeenCalled();
  });
});
