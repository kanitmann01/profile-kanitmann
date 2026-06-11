import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SectionBookmark } from "../section-bookmark";

const mockAddBookmark = vi.fn();
const mockRemoveBookmark = vi.fn();
const mockIsBookmarked = vi.fn().mockReturnValue(false);

vi.mock("@/hooks/use-bookmarks", () => ({
  useBookmarks: () => ({
    addBookmark: mockAddBookmark,
    removeBookmark: mockRemoveBookmark,
    isBookmarked: mockIsBookmarked,
  }),
}));

describe("SectionBookmark", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsBookmarked.mockReturnValue(false);
  });

  it("renders bookmark icon", () => {
    render(
      <SectionBookmark
        noteSlug="glycolysis"
        sectionId="eq-1"
        sectionType="equation"
        label="ATP yield equation"
      />
    );

    expect(screen.getByTestId("bookmark-toggle")).toBeInTheDocument();
  });

  it("calls addBookmark when clicked and not bookmarked", () => {
    mockIsBookmarked.mockReturnValue(false);

    render(
      <SectionBookmark
        noteSlug="glycolysis"
        sectionId="eq-1"
        sectionType="equation"
        label="ATP yield equation"
      />
    );

    fireEvent.click(screen.getByTestId("bookmark-toggle"));
    expect(mockAddBookmark).toHaveBeenCalledWith({
      noteSlug: "glycolysis",
      sectionId: "eq-1",
      sectionType: "equation",
      label: "ATP yield equation",
    });
  });

  it("calls removeBookmark when clicked and already bookmarked", () => {
    mockIsBookmarked.mockReturnValue(true);

    render(
      <SectionBookmark
        noteSlug="glycolysis"
        sectionId="eq-1"
        sectionType="equation"
        label="ATP yield equation"
      />
    );

    fireEvent.click(screen.getByTestId("bookmark-toggle"));
    expect(mockRemoveBookmark).toHaveBeenCalledWith("glycolysis", "eq-1");
  });

  it("shows filled icon when bookmarked", () => {
    mockIsBookmarked.mockReturnValue(true);

    render(
      <SectionBookmark
        noteSlug="glycolysis"
        sectionId="eq-1"
        sectionType="equation"
        label="ATP yield equation"
      />
    );

    const icon = screen.getByTestId("bookmark-icon");
    expect(icon.getAttribute("data-filled")).toBe("true");
  });

  it("shows outline icon when not bookmarked", () => {
    mockIsBookmarked.mockReturnValue(false);

    render(
      <SectionBookmark
        noteSlug="glycolysis"
        sectionId="eq-1"
        sectionType="equation"
        label="ATP yield equation"
      />
    );

    const icon = screen.getByTestId("bookmark-icon");
    expect(icon.getAttribute("data-filled")).toBe("false");
  });
});
