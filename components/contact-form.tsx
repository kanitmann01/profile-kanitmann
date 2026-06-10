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
