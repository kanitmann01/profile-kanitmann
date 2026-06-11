import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfidenceCalibration } from "../confidence-calibration";

describe("ConfidenceCalibration", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders phase 1 (before) confidence prompt", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    expect(screen.getByTestId("confidence-calibration")).toBeInTheDocument();
    expect(screen.getByText(/how confident/i)).toBeInTheDocument();
    expect(screen.getByTestId("rating-weak")).toBeInTheDocument();
    expect(screen.getByTestId("rating-ok")).toBeInTheDocument();
    expect(screen.getByTestId("rating-strong")).toBeInTheDocument();
  });

  it("stores before rating in localStorage when selected", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-ok"));

    const stored = JSON.parse(
      localStorage.getItem("imat-calibration-test-note") || "{}"
    );
    expect(stored.before).toBe("ok");
  });

  it("shows phase 2 prompt after before rating is selected", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-ok"));

    expect(screen.getByText(/now that you/i)).toBeInTheDocument();
  });

  it("stores after rating and shows delta when both ratings complete", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-weak"));
    fireEvent.click(screen.getByTestId("rating-strong"));

    const stored = JSON.parse(
      localStorage.getItem("imat-calibration-test-note") || "{}"
    );
    expect(stored.before).toBe("weak");
    expect(stored.after).toBe("strong");
    expect(screen.getByTestId("delta-indicator")).toBeInTheDocument();
  });

  it("shows improved delta when confidence increased", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-weak"));
    fireEvent.click(screen.getByTestId("rating-strong"));

    expect(screen.getByTestId("delta-indicator")).toHaveTextContent(
      /improved/i
    );
  });

  it("shows dropped delta when confidence decreased", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-strong"));
    fireEvent.click(screen.getByTestId("rating-weak"));

    expect(screen.getByTestId("delta-indicator")).toHaveTextContent(/dropped/i);
  });

  it("shows same delta when confidence unchanged", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-ok"));
    fireEvent.click(screen.getByTestId("rating-ok"));

    expect(screen.getByTestId("delta-indicator")).toHaveTextContent(/same/i);
  });

  it("shows nudge to review prerequisites when confidence dropped", () => {
    render(<ConfidenceCalibration noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("rating-strong"));
    fireEvent.click(screen.getByTestId("rating-weak"));

    expect(screen.getByText(/review.*prerequisites/i)).toBeInTheDocument();
  });

  it("loads existing calibration from localStorage", () => {
    localStorage.setItem(
      "imat-calibration-test-note",
      JSON.stringify({
        before: "weak",
        after: "strong",
        timestamp: "2025-01-01",
      })
    );

    render(<ConfidenceCalibration noteSlug="test-note" />);

    expect(screen.getByTestId("delta-indicator")).toBeInTheDocument();
    expect(screen.queryByTestId("rating-weak")).not.toBeInTheDocument();
  });
});
