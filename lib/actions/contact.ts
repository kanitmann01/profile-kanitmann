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
