import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReviewButtons } from "../review-buttons";

const mockRecordReview = vi.fn();

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    recordReview: mockRecordReview,
  }),
}));

beforeEach(() => {
  mockRecordReview.mockClear();
});

describe("ReviewButtons", () => {
  it("renders three buttons: Forgot, Fuzzy, Nailed it", () => {
    render(<ReviewButtons slug="test-note" />);
    expect(screen.getByRole("button", { name: /forgot/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fuzzy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nailed/i })).toBeInTheDocument();
  });

  it("calls recordReview with 'forgot' rating when Forgot is clicked", () => {
    render(<ReviewButtons slug="bio-cells" />);
    fireEvent.click(screen.getByRole("button", { name: /forgot/i }));
    expect(mockRecordReview).toHaveBeenCalledWith("bio-cells", "forgot");
  });

  it("calls recordReview with 'fuzzy' rating when Fuzzy is clicked", () => {
    render(<ReviewButtons slug="bio-cells" />);
    fireEvent.click(screen.getByRole("button", { name: /fuzzy/i }));
    expect(mockRecordReview).toHaveBeenCalledWith("bio-cells", "fuzzy");
  });

  it("calls recordReview with 'nailed' rating when Nailed it is clicked", () => {
    render(<ReviewButtons slug="bio-cells" />);
    fireEvent.click(screen.getByRole("button", { name: /nailed/i }));
    expect(mockRecordReview).toHaveBeenCalledWith("bio-cells", "nailed");
  });

  it("disables all buttons after one is clicked", () => {
    render(<ReviewButtons slug="test-note" />);
    fireEvent.click(screen.getByRole("button", { name: /nailed/i }));
    expect(screen.getByRole("button", { name: /forgot/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /fuzzy/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /nailed/i })).toBeDisabled();
  });

  it("does not call recordReview twice on double click", () => {
    render(<ReviewButtons slug="test-note" />);
    const nailedBtn = screen.getByRole("button", { name: /nailed/i });
    fireEvent.click(nailedBtn);
    fireEvent.click(nailedBtn);
    expect(mockRecordReview).toHaveBeenCalledTimes(1);
  });
});
