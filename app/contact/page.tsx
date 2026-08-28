import { TactileButton } from "@/components/tactile-button";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif text-6xl text-foreground mb-4">
          Let&apos;s Connect
        </h1>
        <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-16 max-w-2xl">
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
                  href="mailto:mannkanit@gmail.com"
                  className="font-serif text-lg text-foreground hover:text-primary-text transition-colors"
                >
                  mannkanit@gmail.com
                </a>
              </div>

              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Location
                </span>
                <span className="font-serif text-lg text-foreground">
                  Princeton, NJ
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                Find Me
              </span>
              <div className="flex gap-6">
                <a
                  href="mailto:mannkanit@gmail.com"
                  className="font-mono text-sm text-foreground hover:text-primary-text transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-primary-text after:transition-all hover:after:w-full"
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/kanitmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-foreground hover:text-primary-text transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-primary-text after:transition-all hover:after:w-full"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/kanitmann01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-foreground hover:text-primary-text transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-primary-text after:transition-all hover:after:w-full"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-20 text-center">
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Prefer a Quick Chat?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sometimes a conversation is worth a thousand emails. Feel free to
            reach out directly.
          </p>
          <TactileButton asChild size="lg">
            <a href="mailto:mannkanit@gmail.com">Email Me Directly</a>
          </TactileButton>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Contact - Kanit Mann",
  description: "Get in touch with Kanit Mann for projects and collaborations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact - Kanit Mann",
    description:
      "Get in touch with Kanit Mann for projects and collaborations.",
    url: getSiteUrl() + "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Kanit Mann",
    description:
      "Get in touch with Kanit Mann for projects and collaborations.",
  },
};
