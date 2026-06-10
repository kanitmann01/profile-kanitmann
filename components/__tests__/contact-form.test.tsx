import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { ContactForm } from "../contact-form";

const mockSendContactEmail = vi.fn();
vi.mock("@/lib/actions/contact", () => ({
  sendContactEmail: (...args: unknown[]) => mockSendContactEmail(...args),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders submit button with correct text", () => {
    render(<ContactForm />);

    const button = screen.getByRole("button", { name: /send via email/i });
    expect(button).toBeInTheDocument();
  });

  it("renders hidden honeypot field", () => {
    const { container } = render(<ContactForm />);

    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot?.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("calls server action on submit with form data", async () => {
    mockSendContactEmail.mockResolvedValue({ success: true });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Let's work together on a project" },
    });

    const form = screen
      .getByRole("button", { name: /send via email/i })
      .closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSendContactEmail).toHaveBeenCalledTimes(1);
    });

    const formData = mockSendContactEmail.mock.calls[0][0] as FormData;
    expect(formData.get("firstName")).toBe("John");
    expect(formData.get("lastName")).toBe("Doe");
    expect(formData.get("email")).toBe("john@example.com");
    expect(formData.get("message")).toBe("Let's work together on a project");
  });

  it("shows success state after successful submission", async () => {
    mockSendContactEmail.mockResolvedValue({ success: true });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Let's work together on a project" },
    });

    const form = screen
      .getByRole("button", { name: /send via email/i })
      .closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it("shows validation errors on failed submission", async () => {
    mockSendContactEmail.mockResolvedValue({
      success: false,
      errors: { firstName: ["Required"], email: ["Invalid email"] },
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "bad" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Let's work together" },
    });

    const form = screen
      .getByRole("button", { name: /send via email/i })
      .closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("disables submit button during submission", async () => {
    let resolveSubmit: (value: unknown) => void;
    mockSendContactEmail.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSubmit = resolve;
        })
    );

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Let's work together" },
    });

    const form = screen
      .getByRole("button", { name: /send via email/i })
      .closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    });

    resolveSubmit!({ success: true });

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });
});
