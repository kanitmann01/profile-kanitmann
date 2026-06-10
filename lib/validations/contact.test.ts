import { describe, it, expect } from "vitest";
import { contactSchema } from "./contact";

describe("contactSchema", () => {
  it("accepts valid input with all fields", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      company: "Acme",
      subject: "Collaboration",
      message: "Let's work together on a project",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid input with only required fields", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty firstName", () => {
    const result = contactSchema.safeParse({
      firstName: "",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty lastName", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "not-an-email",
      message: "Let's work together on a project",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Short",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot field with value", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
      website: "https://spam-bot.com",
    });
    expect(result.success).toBe(false);
  });

  it("allows missing optional fields", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Let's work together on a project",
    });
    expect(result.success).toBe(true);
  });
});
