import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { NetstarClassifierDemo } from "@/components/netstar-classifier-demo";

describe("NetstarClassifierDemo (client island — temporarily offline)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the labelled input, submit button and example chips", () => {
    render(<NetstarClassifierDemo />);
    expect(screen.getByLabelText(/url to classify/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /classify url/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /typosquat brand login/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /raw-ip login page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /legit brand root/i })
    ).toBeInTheDocument();
  });

  it("keeps the URL input visible but disabled with aria-disabled", () => {
    render(<NetstarClassifierDemo />);
    const input = screen.getByLabelText(/url to classify/i);
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("disables the submit button and example chips", () => {
    render(<NetstarClassifierDemo />);
    expect(
      screen.getByRole("button", { name: /classify url/i })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /typosquat brand login/i })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /raw-ip login page/i })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /legit brand root/i })
    ).toBeDisabled();
  });

  it("shows the offline status message (backend work + coming back soon)", () => {
    render(<NetstarClassifierDemo />);
    expect(
      screen.getByText(/temporarily offline for backend work/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/coming back soon/i)).toBeInTheDocument();
  });

  it("never fires a fetch on mount or interaction", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<NetstarClassifierDemo />);
    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: /typosquat brand login/i })
    );
    fireEvent.click(screen.getByRole("button", { name: /classify url/i }));
    fireEvent.submit(form!);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("announces the offline status through a polite live region", () => {
    render(<NetstarClassifierDemo />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveAttribute("aria-atomic", "true");
    expect(region).toHaveTextContent(/coming back soon/i);
  });
});
