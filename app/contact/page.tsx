import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Github } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import type { Metadata } from "next"

import { ContactForm } from "@/components/contact-form"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Let's Connect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious
            team.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <SlideIn direction="left">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear
                  from you. Let's create something amazing together.
                </p>
              </div>

              {/* Contact Methods */}
              <StaggerContainer className="space-y-6">
                <StaggerItem>
                  <ScaleOnHover>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <Mail className="h-5 w-5 text-primary" />
                          Email
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <a href="mailto:kanitmann01@gmail.com" className="text-primary hover:underline font-medium">
                          kanitmann01@gmail.com
                        </a>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>

                <StaggerItem>
                  <ScaleOnHover>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <a
                          href="https://www.linkedin.com/in/kanitmann"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Connect with me on LinkedIn
                        </a>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>

                <StaggerItem>
                  <ScaleOnHover>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <Github className="h-5 w-5 text-primary" />
                          GitHub
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <a
                          href="https://github.com/kanitmann01"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Check out my projects
                        </a>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>


              </StaggerContainer>
            </div>
          </SlideIn>

          {/* Contact Form */}
          <SlideIn direction="right">
            <ScaleOnHover>
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </ScaleOnHover>
          </SlideIn>
        </div>

        {/* Additional CTA */}
        <div className="mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
                          <h3 className="text-2xl font-bold text-foreground mb-4">Prefer a Quick Chat?</h3>
              <p className="text-muted-foreground mb-6">
                Sometimes a conversation is worth a thousand emails. Feel free to reach out directly.
              </p>
            <Button size="lg" asChild>
              <a href="mailto:kanitmann01@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Me Directly
              </a>
            </Button>
          </div>
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
