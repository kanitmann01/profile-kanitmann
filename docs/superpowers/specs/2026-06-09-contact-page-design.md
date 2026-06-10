# Contact Page — Server-Side Email Design

## Problem

The contact form at `/contact` uses `mailto:` to open the user's email client. Most visitors never complete that flow, so messages never arrive. The form needs server-side email sending.

## Goal

Replace the mailto-based form with a server action that sends two HTML emails via Resend:

1. A notification to the site owner (`kanitmann01@gmail.com`)
2. A confirmation to the sender with a Calendly booking link

## Approach

Next.js Server Action with Zod validation, honeypot spam protection, and inline success/error states.

## Files

| File                                         | Action | Purpose                                                                     |
| -------------------------------------------- | ------ | --------------------------------------------------------------------------- |
| `lib/actions/contact.ts`                     | New    | Server action: honeypot check, Zod validation, send 2 emails via Resend     |
| `lib/validations/contact.ts`                 | New    | Zod schema for form fields + honeypot                                       |
| `components/contact-form.tsx`                | Edit   | Replace mailto with server action, add honeypot field, success/error states |
| `components/__tests__/contact-form.test.tsx` | Edit   | Update tests for new behavior                                               |
| `.env.local`                                 | New    | `RESEND_API_KEY` and `RESEND_FROM_EMAIL` env vars                           |

## Zod Schema

```ts
// lib/validations/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0), // honeypot — must be empty
});

export type ContactInput = z.infer<typeof contactSchema>;
```

## Server Action

```ts
// lib/actions/contact.ts
"use server";

import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function sendContactEmail(
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);

  // Honeypot check — bots fill this, humans never see it
  if (raw.website && String(raw.website).length > 0) {
    return { success: true }; // silently pretend success
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { firstName, lastName, email, company, subject, message } = parsed.data;
  const composedSubject = subject || `Hello from ${firstName} ${lastName}`;

  // Email 1: Notification to owner
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: "kanitmann01@gmail.com",
    subject: composedSubject,
    replyTo: email,
    html: ownerEmailHtml({ firstName, lastName, email, company, message }),
  });

  // Email 2: Confirmation to sender with Calendly
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Thanks for reaching out, ${firstName}!`,
    html: senderEmailHtml({ firstName }),
  });

  return { success: true };
}
```

## Email Templates

### Owner notification email

Styled HTML with:

- Dark header with site branding
- Each form field as a labeled row (Name, Email, Company, Message)
- Reply-to set to sender's email for direct reply

### Sender confirmation email

Styled HTML with:

- Personalized greeting: "Hi {firstName},"
- Message: "Thanks for reaching out! I'd love to learn more about your project. Feel free to book a time that works for you:"
- CTA button linking to `https://calendly.com/mannkanit/connect-with-kanit`
- Clean, branded design matching site aesthetic

## Client-side changes

`components/contact-form.tsx`:

- Remove mailto logic
- Call `sendContactEmail(formData)` via React's `useActionState` or `useState` + form action
- Add hidden honeypot input (`name="website"`, `tabIndex={-1}`, `aria-hidden="true"`, styled with `position: absolute; left: -9999px`)
- On success: replace form with confirmation message
- On error: display inline field errors below each field
- Disable submit button during submission

## Spam protection

Honeypot field named `website`:

- Hidden from real users via CSS (absolute positioning off-screen)
- Bots auto-fill it thinking it's a company URL
- If any value present, server returns success silently (no email sent, no error shown)
- No CAPTCHA needed — zero friction for real users

## Environment variables

```
# .env.local
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev  # or verified domain
```

## Testing

- Update existing tests in `components/__tests__/contact-form.test.tsx`
- Mock the server action (not the Resend SDK directly)
- Test: renders all fields including hidden honeypot
- Test: successful submission shows success state
- Test: validation errors display inline
- Test: honeypot field is hidden and has correct attributes

## Success criteria

1. Form submits and sends two emails via Resend
2. Owner receives styled notification with all form data
3. Sender receives confirmation with Calendly booking link
4. Honeypot catches bots silently
5. Zod validates all fields client-side and server-side
6. Success state replaces form after submission
7. Existing tests pass, new tests cover new behavior
