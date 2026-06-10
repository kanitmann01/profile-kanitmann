# Contact Form: Server-Side Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mailto-based contact form with server-side email sending via Resend, including Zod validation, honeypot spam protection, and dual-email output (notification + Calendly confirmation).

**Architecture:** Next.js Server Action validates form data with Zod, checks honeypot, then sends two HTML emails via Resend SDK. Client calls the server action and shows inline success/error states.

**Tech Stack:** Next.js 16, React 19, Zod, Resend, vitest, @testing-library/react

**Issue:** [#72](https://github.com/kanitmann01/profile-kanitmann/issues/72)
**Spec:** `docs/superpowers/specs/2026-06-09-contact-page-design.md`

---

## File Structure

| File                                         | Action | Purpose                                                                |
| -------------------------------------------- | ------ | ---------------------------------------------------------------------- |
| `lib/validations/contact.ts`                 | Create | Zod schema for contact form fields + honeypot                          |
| `lib/validations/contact.test.ts`            | Create | Tests for Zod schema validation                                        |
| `lib/actions/contact.ts`                     | Create | Server action: validate, send 2 emails via Resend                      |
| `lib/actions/contact.test.ts`                | Create | Tests for server action behavior                                       |
| `components/contact-form.tsx`                | Modify | Replace mailto with server action, add honeypot + success/error states |
| `components/__tests__/contact-form.test.tsx` | Modify | Update tests for new behavior                                          |
| `app/contact/__tests__/page.test.tsx`        | Modify | Update tests for honeypot field                                        |
| `.env.local`                                 | Create | `RESEND_API_KEY` and `RESEND_FROM_EMAIL`                               |

---

## Task 1: Install Resend

- [ ] **Step 1: Install the Resend package**

Run: `npm install resend`

- [ ] **Step 2: Verify installation**

Run: `npm ls resend`
Expected: `resend@x.x.x`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add resend for email sending"
```

---

## Task 2: Zod Validation Schema

### Task 2a: Write failing tests for Zod schema

- [ ] **Step 1: Create test file with failing tests**

Create `lib/validations/contact.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/validations/contact.test.ts`
Expected: FAIL — module `./contact` not found

### Task 2b: Implement Zod schema

- [ ] **Step 3: Create the Zod schema**

Create `lib/validations/contact.ts`:

```ts
import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/validations/contact.test.ts`
Expected: PASS — all 8 tests pass

- [ ] **Step 5: Commit**

```bash
git add lib/validations/contact.ts lib/validations/contact.test.ts
git commit -m "feat: add Zod schema for contact form validation"
```

---

## Task 3: Server Action — Honeypot + Validation

### Task 3a: Write failing tests for server action

- [ ] **Step 1: Create test file with failing tests**

Create `lib/actions/contact.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendContactEmail } from "./contact";

const mockSend = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/actions/contact.test.ts`
Expected: FAIL — module `./contact` not found

### Task 3b: Implement server action

- [ ] **Step 3: Create the server action**

Create `lib/actions/contact.ts`:

```ts
"use server";

import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

function ownerEmailHtml(data: ContactInput): string {
  const rows = [
    { label: "Name", value: `${data.firstName} ${data.lastName}` },
    { label: "Email", value: data.email },
    data.company ? { label: "Company", value: data.company } : null,
    { label: "Message", value: data.message },
  ].filter(Boolean);

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ededed; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 24px; margin-bottom: 24px;">New Contact Form Submission</h1>
        ${rows
          .map(
            (row) => `
          <div style="margin-bottom: 16px;">
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 4px;">${row!.label}</div>
            <div style="font-size: 16px; color: #ededed;">${row!.value}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </body>
    </html>
  `;
}

function senderEmailHtml(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ededed; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Thanks for reaching out, ${firstName}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #ccc; margin-bottom: 24px;">
          I'd love to learn more about your project. Feel free to book a time that works for you:
        </p>
        <a href="https://calendly.com/mannkanit/connect-with-kanit"
           style="display: inline-block; background: #ededed; color: #0a0a0a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
          Book a Meeting
        </a>
      </div>
    </body>
    </html>
  `;
}

export async function sendContactEmail(
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);

  // Honeypot check
  if (raw.website && String(raw.website).length > 0) {
    return { success: true };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { firstName, lastName, email, company, subject, message } = parsed.data;
  const composedSubject = subject || `Hello from ${firstName} ${lastName}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: "kanitmann01@gmail.com",
    subject: composedSubject,
    replyTo: email,
    html: ownerEmailHtml(parsed.data),
  });

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Thanks for reaching out, ${firstName}!`,
    html: senderEmailHtml(firstName),
  });

  return { success: true };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/actions/contact.test.ts`
Expected: PASS — all 9 tests pass

- [ ] **Step 5: Commit**

```bash
git add lib/actions/contact.ts lib/actions/contact.test.ts
git commit -m "feat: add server action for contact form email sending"
```

---

## Task 4: Update Contact Form Component

### Task 4a: Write failing tests for new form behavior

- [ ] **Step 1: Update test file**

Replace `components/__tests__/contact-form.test.tsx` with:

```ts
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"

import { ContactForm } from "../contact-form"

const mockSendContactEmail = vi.fn()
vi.mock("@/lib/actions/contact", () => ({
  sendContactEmail: (...args: unknown[]) => mockSendContactEmail(...args),
}))

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders all form fields", () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it("renders submit button with correct text", () => {
    render(<ContactForm />)

    const button = screen.getByRole("button", { name: /send via email/i })
    expect(button).toBeInTheDocument()
  })

  it("renders hidden honeypot field", () => {
    render(<ContactForm />)

    const honeypot = screen.getByRole("textbox", { name: /website/i })
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute("aria-hidden", "true")
    expect(honeypot).toHaveAttribute("tabindex", "-1")
  })

  it("calls server action on submit with form data", async () => {
    mockSendContactEmail.mockResolvedValue({ success: true })

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } })
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's work together on a project" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockSendContactEmail).toHaveBeenCalledTimes(1)
    })

    const formData = mockSendContactEmail.mock.calls[0][0] as FormData
    expect(formData.get("firstName")).toBe("John")
    expect(formData.get("lastName")).toBe("Doe")
    expect(formData.get("email")).toBe("john@example.com")
    expect(formData.get("message")).toBe("Let's work together on a project")
  })

  it("shows success state after successful submission", async () => {
    mockSendContactEmail.mockResolvedValue({ success: true })

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } })
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's work together on a project" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })
  })

  it("shows validation errors on failed submission", async () => {
    mockSendContactEmail.mockResolvedValue({
      success: false,
      errors: { firstName: ["Required"], email: ["Invalid email"] },
    })

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "" } })
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "bad" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's work together" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument()
      expect(screen.getByText("Invalid email")).toBeInTheDocument()
    })
  })

  it("disables submit button during submission", async () => {
    let resolveSubmit: (value: unknown) => void
    mockSendContactEmail.mockImplementation(
      () => new Promise((resolve) => { resolveSubmit = resolve })
    )

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } })
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's work together" } })

    const form = screen.getByRole("button", { name: /send via email/i }).closest("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled()
    })

    resolveSubmit!({ success: true })

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /send via email/i })).not.toBeDisabled()
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/__tests__/contact-form.test.tsx`
Expected: FAIL — imports `@/lib/actions/contact` which doesn't export expected function yet (or mock issue)

### Task 4b: Implement updated contact form

- [ ] **Step 3: Update the contact form component**

Replace `components/contact-form.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { TactileButton } from "@/components/tactile-button";
import { sendContactEmail } from "@/lib/actions/contact";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setErrors({});

    const result = await sendContactEmail(formData);

    if (result.success) {
      setSubmitted(true);
      form.reset();
    } else {
      setErrors(result.errors);
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h2 className="font-serif text-3xl text-foreground mb-4">
          Message Sent!
        </h2>
        <p className="text-muted-foreground mb-6">
          Thanks for reaching out. Check your email for a confirmation with my
          Calendly link.
        </p>
        <TactileButton variant="outline" onClick={() => setSubmitted(false)}>
          Send Another Message
        </TactileButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot field — hidden from humans, bots fill it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            placeholder="John"
            autoComplete="given-name"
            className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            autoComplete="family-name"
            className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          autoComplete="email"
          className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="company"
          className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          Company <span className="text-muted-foreground/50">(Optional)</span>
        </label>
        <input
          id="company"
          name="company"
          placeholder="Your Company"
          autoComplete="organization"
          className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          placeholder="Project collaboration opportunity"
          className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, idea, or how we might work together..."
          rows={4}
          className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message[0]}</p>
        )}
      </div>

      <TactileButton
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send via Email"}
      </TactileButton>
    </form>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/__tests__/contact-form.test.tsx`
Expected: PASS — all 7 tests pass

- [ ] **Step 5: Run all tests together**

Run: `npx vitest run`
Expected: PASS — all tests pass

- [ ] **Step 6: Commit**

```bash
git add components/contact-form.tsx components/__tests__/contact-form.test.tsx
git commit -m "feat: update contact form to use server action with validation"
```

---

## Task 5: Update Contact Page Tests

- [ ] **Step 1: Update page test to check honeypot**

Replace `app/contact/__tests__/page.test.tsx` with:

```ts
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import ContactPage from "@/app/contact/page"

describe("Contact page", () => {
  it("renders the headline", () => {
    render(<ContactPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("renders contact form inputs", () => {
    render(<ContactPage />)
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it("renders hidden honeypot field", () => {
    render(<ContactPage />)
    const honeypot = screen.getByRole("textbox", { name: /website/i })
    expect(honeypot).toHaveAttribute("aria-hidden", "true")
  })

  it("renders social links as text links", () => {
    render(<ContactPage />)
    const emailLinks = screen.getAllByRole("link", { name: /email/i })
    const socialEmailLink = emailLinks.find((l) => l.textContent === "Email")
    expect(socialEmailLink).toBeTruthy()
    expect(socialEmailLink).toHaveAttribute("href", "mailto:kanitmann01@gmail.com")

    const linkedInLink = screen.getByRole("link", { name: /linkedin/i })
    expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/kanitmann")

    const githubLink = screen.getByRole("link", { name: /github/i })
    expect(githubLink).toHaveAttribute("href", "https://github.com/kanitmann01")
  })

  it("renders the prefer a quick chat CTA", () => {
    render(<ContactPage />)
    expect(screen.getByText(/prefer a quick chat/i)).toBeInTheDocument()
  })

  it("renders contact info with email and location", () => {
    render(<ContactPage />)
    expect(screen.getByText("kanitmann01@gmail.com")).toBeInTheDocument()
    expect(screen.getByText("Tucson, AZ")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run page tests**

Run: `npx vitest run app/contact/__tests__/page.test.tsx`
Expected: PASS — all 6 tests pass

- [ ] **Step 3: Commit**

```bash
git add app/contact/__tests__/page.test.tsx
git commit -m "test: update contact page tests for honeypot field"
```

---

## Task 6: Add Environment Variables

- [ ] **Step 1: Create .env.local**

Create `.env.local`:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

- [ ] **Step 2: Verify .env.local is in .gitignore**

Check `.gitignore` contains `.env*` — it already does.

- [ ] **Step 3: Run full test suite**

Run: `npx vitest run`
Expected: PASS — all tests pass

- [ ] **Step 4: Run lint and typecheck**

Run: `npm run lint && npm run typecheck`
Expected: PASS — no errors

- [ ] **Step 5: Commit**

```bash
git add .env.local
git commit -m "chore: add env vars template for Resend"
```

Note: `.env.local` is gitignored, so this commit only adds it locally. The user needs to add their actual Resend API key.

---

## Task 7: Final Verification

- [ ] **Step 1: Run full test suite**

Run: `npx vitest run`
Expected: PASS — all tests pass

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS — no errors

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: PASS — no errors

- [ ] **Step 4: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts without errors

- [ ] **Step 5: Manual test in browser**

1. Navigate to `http://localhost:3000/contact`
2. Fill out the form with valid data
3. Submit — should show "Sending..." then "Message Sent!" state
4. Check Resend dashboard for both emails sent
5. Fill form with invalid data — should show inline errors
6. Verify honeypot field is invisible but in DOM
