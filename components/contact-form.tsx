"use client"

import { useState } from "react"
import { TactileButton } from "@/components/tactile-button"

const CONTACT_EMAIL = "kanitmann01@gmail.com"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const firstName = (data.get("firstName") as string | null) ?? ""
    const lastName = (data.get("lastName") as string | null) ?? ""
    const email = (data.get("email") as string | null) ?? ""
    const company = (data.get("company") as string | null) ?? ""
    const subject = (data.get("subject") as string | null) ?? ""
    const message = (data.get("message") as string | null) ?? ""

    const composedSubject = subject || `Hello from ${firstName} ${lastName}`.trim()
    const bodyLines = [
      `Name: ${firstName} ${lastName}`.trim(),
      email ? `Email: ${email}` : undefined,
      company ? `Company: ${company}` : undefined,
      "",
      message,
    ].filter(Boolean)

    const mailtoUrl = new URL(`mailto:${CONTACT_EMAIL}`)
    mailtoUrl.searchParams.set("subject", composedSubject)
    mailtoUrl.searchParams.set("body", bodyLines.join("\n"))

    setIsSubmitting(true)
    window.location.href = mailtoUrl.toString()
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            placeholder="John"
            autoComplete="given-name"
            className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            autoComplete="family-name"
            className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
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
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
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
        <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
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
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, idea, or how we might work together..."
          rows={4}
          className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
        />
      </div>

      <TactileButton type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Opening email..." : "Send via Email"}
      </TactileButton>
    </form>
  )
}
