"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" placeholder="John" autoComplete="given-name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Doe" autoComplete="family-name" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="your.email@example.com" autoComplete="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input id="company" name="company" placeholder="Your Company" autoComplete="organization" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="Project collaboration opportunity" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, idea, or how we might work together..."
          className="min-h-[120px]"
        />
      </div>

      <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Opening email client..." : "Send Message"}
      </Button>
    </form>
  )
}

