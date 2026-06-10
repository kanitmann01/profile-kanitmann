import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendContactEmail } from "./contact";

const mockSend = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: mockSend } };
  }),
}));

function createFormData(data: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.set(key, value);
  }
  return formData;
}

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "test-key";
    process.env.RESEND_FROM_EMAIL = "test@example.com";
  });

  it("returns success with valid data", async () => {
    mockSend.mockResolvedValue({ id: "email-1" });

    const formData = createFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });

    const result = await sendContactEmail(formData);
    expect(result).toEqual({ success: true });
  });

  it("sends two emails on success", async () => {
    mockSend.mockResolvedValue({ id: "email-1" });

    const formData = createFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });

    await sendContactEmail(formData);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("sets reply-to sender email on owner notification", async () => {
    mockSend.mockResolvedValue({ id: "email-1" });

    const formData = createFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });

    await sendContactEmail(formData);
    const ownerEmail = mockSend.mock.calls[0][0];
    expect(ownerEmail.replyTo).toBe("john@example.com");
  });

  it("sends confirmation to sender email", async () => {
    mockSend.mockResolvedValue({ id: "email-1" });

    const formData = createFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });

    await sendContactEmail(formData);
    const senderEmail = mockSend.mock.calls[1][0];
    expect(senderEmail.to).toBe("john@example.com");
  });

  it("returns validation errors for invalid data", async () => {
    const formData = createFormData({
      firstName: "",
      lastName: "",
      email: "bad-email",
      message: "Short",
      website: "",
    });

    const result = await sendContactEmail(formData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toBeDefined();
    }
  });

  it("does not send emails for invalid data", async () => {
    const formData = createFormData({
      firstName: "",
      lastName: "",
      email: "bad-email",
      message: "Short",
      website: "",
    });

    await sendContactEmail(formData);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("silently succeeds for honeypot (bot detection)", async () => {
    const formData = createFormData({
      firstName: "Bot",
      lastName: "Spam",
      email: "bot@spam.com",
      message: "Buy cheap stuff now!!!",
      website: "https://spam-bot.com",
    });

    const result = await sendContactEmail(formData);
    expect(result).toEqual({ success: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("uses subject field when provided", async () => {
    mockSend.mockResolvedValue({ id: "email-1" });

    const formData = createFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      subject: "Custom Subject",
      message: "Let's work together on a project",
      website: "",
    });

    await sendContactEmail(formData);
    const ownerEmail = mockSend.mock.calls[0][0];
    expect(ownerEmail.subject).toBe("Custom Subject");
  });

  it("uses default subject when subject field is empty", async () => {
    mockSend.mockResolvedValue({ id: "email-1" });

    const formData = createFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });

    await sendContactEmail(formData);
    const ownerEmail = mockSend.mock.calls[0][0];
    expect(ownerEmail.subject).toBe("Hello from John Doe");
  });
});
