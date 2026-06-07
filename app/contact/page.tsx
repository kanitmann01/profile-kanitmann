import { TactileButton } from "@/components/tactile-button"
import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif text-5xl text-foreground text-center mb-4">
          Let&apos;s Connect
        </h1>
        <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
          Email works best. I usually respond within a few hours.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="space-y-6">
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </span>
                <a
                  href="mailto:kanitmann01@gmail.com"
                  className="font-serif text-lg text-foreground hover:text-primary transition-colors"
                >
                  kanitmann01@gmail.com
                </a>
              </div>

              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Location
                </span>
                <span className="font-serif text-lg text-foreground">
                  Tucson, AZ
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                Find Me
              </span>
              <div className="flex gap-6">
                <a
                  href="mailto:kanitmann01@gmail.com"
                  className="font-mono text-sm text-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full"
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/kanitmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/kanitmann01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-20 text-center">
          <h3 className="font-serif text-2xl text-foreground mb-4">
            Prefer a Quick Chat?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sometimes a conversation is worth a thousand emails. Feel free to reach out directly.
          </p>
          <TactileButton asChild size="lg">
            <a href="mailto:kanitmann01@gmail.com">
              Email Me Directly
            </a>
          </TactileButton>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Contact - Kanit Mann",
  description: "Get in touch with Kanit Mann for projects, collaborations, or opportunities.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact - Kanit Mann",
    description: "Get in touch with Kanit Mann for projects, collaborations, or opportunities.",
    url: "https://kanit.codes/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Kanit Mann",
    description: "Get in touch with Kanit Mann for projects, collaborations, or opportunities.",
  },
}
