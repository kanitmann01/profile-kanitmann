import Image from "next/image";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { GraduationSection } from "@/components/graduation-section";
import { AboutNav } from "@/components/about-nav";
import { experiences } from "@/data/experiences";
import { certifications } from "@/data/certifications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-format";
import { getSiteUrl } from "@/lib/site";

const skillImageMap: Record<string, { src: string; className?: string }> = {
  Python: { src: "/images/tech/python.svg" },
  "C++": { src: "/images/tech/cpp.svg" },
  SQL: { src: "/images/tech/sql.svg" },
  Pandas: { src: "/images/tech/pandas.svg", className: "svg-pandas" },
  NumPy: { src: "/images/tech/numpy.svg" },
  "Scikit-learn": { src: "/images/tech/scikit-learn.svg" },
  Matplotlib: { src: "/images/tech/matplotlib.svg" },
  Seaborn: { src: "/images/tech/seaborn.svg" },
  Plotly: { src: "/images/tech/plotly.svg" },
  Docker: { src: "/images/tech/docker.svg" },
  GCP: { src: "/images/tech/gcp.svg" },
  GitHub: { src: "/images/tech/github.svg", className: "svg-github" },
  Tableau: { src: "/images/tech/tableau.svg" },
  Figma: { src: "/images/tech/figma.svg" },
  "Microsoft Excel": { src: "/images/tech/microsoft-excel.svg" },
};

const skillGroups = [
  {
    category: "Languages",
    items: ["Python", "C++", "SQL"],
  },
  {
    category: "Data & ML",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Plotly",
    ],
  },
  {
    category: "Frameworks",
    items: ["Docker", "GCP"],
  },
  {
    category: "Tools",
    items: ["GitHub", "Tableau", "Figma", "Microsoft Excel"],
  },
];

const sections = [
  { id: "story", label: "The Story" },
  { id: "graduation", label: "My Graduation" },
  { id: "skills", label: "Toolkit" },
  { id: "experience", label: "Experience" },
  { id: "leadership", label: "Leadership" },
  { id: "certifications", label: "Certifications" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeIn className="mb-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            About
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-foreground leading-none">
            The Story
          </h1>
        </FadeIn>

        <section id="story" className="mb-32 scroll-mt-20">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <SlideIn direction="right" className="md:col-span-4 md:col-start-1">
              <div className="relative">
                <Image
                  src="/images/profile/kanit-mann.png"
                  alt="Kanit Mann"
                  width={400}
                  height={500}
                  className="rounded-sm"
                />
                <div className="absolute inset-0 rounded-sm opacity-[0.04] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20200%20200%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.85%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')]" />
              </div>
            </SlideIn>

            <SlideIn direction="left" className="md:col-span-7 md:col-start-6">
              <div className="max-w-prose">
                <p className="font-sans text-foreground leading-relaxed mb-6 text-lg font-medium">
                  Data &amp; ML Engineer with 2 years of experience spanning
                  cloud infrastructure, machine learning, and data pipelines —
                  from migrating 2,000 servers at Ericsson to building real-time
                  analytics systems.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6 text-lg">
                  My journey into data science began with a foundation in
                  building tangible things, from engineering firmware for 3D
                  printers to developing full-stack web applications. This
                  hands-on experience taught me that the best solutions come
                  from understanding both the technical possibilities and the
                  human needs.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6 text-lg">
                  My time at Ericsson as an Engineer, Cloud and Infra, where my
                  team managed the migration of over 2,000 servers to GCP,
                  taught me how to work with complex, large-scale systems. I
                  learned that successful technology implementations require not
                  just technical expertise, but also careful planning,
                  stakeholder communication, and a deep understanding of
                  business requirements.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed text-lg">
                  Now, I'm a Master's student at the University of Arizona (GPA:
                  3.75), where I'm combining my engineering background with a
                  passion for data to build intelligent solutions. I believe the
                  future belongs to those who can bridge the gap between complex
                  algorithms and practical applications that solve real-world
                  problems.
                </p>
              </div>
            </SlideIn>
          </div>
        </section>

        <div className="flex gap-12">
          <div className="flex-1 min-w-0">
            <section id="graduation" className="mb-32 scroll-mt-20">
              <GraduationSection
                heading="My Graduation"
                degree="Master of Science"
                degreeSubtitle="in Data Science"
                university="University of Arizona"
                location="Tucson, AZ"
                graduationDate="May 2026"
                gpa="3.75"
                narrative="Completing my Master of Science in Data Science with a 3.75 GPA in May 2026 marked a pivotal moment in my journey from building firmware and cloud infrastructure to creating intelligent solutions from data. I'm incredibly proud of this achievement and grateful to my family, friends, and mentors at the University of Arizona who supported me through every late-night study session and complex project. This milestone has deepened my expertise in machine learning and data visualization, and I'm excited to bring these skills to build solutions that make a real impact."
                images={[
                  "/images/graduation/grad-1.jpg",
                  "/images/graduation/grad-2.jpg",
                  "/images/graduation/grad-3.jpg",
                ]}
              />
            </section>

            <section id="skills" className="mb-32 scroll-mt-20">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  01
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-12">
                  Toolkit
                </h2>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-prose">
                {skillGroups.map((group) => (
                  <FadeIn key={group.category}>
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        {group.category}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {group.items.map((skill) => {
                          const img = skillImageMap[skill];
                          return (
                            <div
                              key={skill}
                              className="border border-border/40 rounded-sm p-4 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                            >
                              {img && (
                                <Image
                                  src={img.src}
                                  alt={skill}
                                  width={40}
                                  height={40}
                                  className={img.className ?? ""}
                                />
                              )}
                              <span className="font-mono text-xs text-foreground/80 text-center leading-tight">
                                {skill}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            <section id="experience" className="mb-32 scroll-mt-20">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  02
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-12">
                  Professional Experience
                </h2>
              </FadeIn>
              <ExperienceTimeline experiences={experiences} />
            </section>

            <section id="leadership" className="mb-32 scroll-mt-20">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  03
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-12">
                  Leadership & Collaboration
                </h2>
              </FadeIn>
              <div className="space-y-8 max-w-prose">
                <FadeIn>
                  <div className="border-b border-border/40 pb-8">
                    <h3 className="font-serif text-2xl text-foreground mb-1">
                      University of Arizona Campus Store
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mb-4">
                      Student Lead & Keyholder · Oct 2025 – Present · Tucson, AZ
                    </p>
                    <ul className="space-y-2 text-muted-foreground font-sans">
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 flex-shrink-0">
                          —
                        </span>
                        <span>
                          Lead a team of 70 students, designing onboarding
                          playbooks and mentoring new hires, coupling shadowing
                          rotations with clear accountability so student
                          associates master essential store procedures quickly.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 flex-shrink-0">
                          —
                        </span>
                        <span>
                          Direct day-to-day floor operations-staff scheduling,
                          inventory checks, and guest experience initiatives-to
                          keep the team aligned on service standards and sales
                          goals.
                        </span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="font-mono text-xs">
                        Team Leadership
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        Training & Development
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        Retail Operations
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        Customer Experience
                      </Badge>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn>
                  <div className="border-b border-border/40 pb-8">
                    <h3 className="font-serif text-2xl text-foreground mb-1">
                      Robovitics
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mb-4">
                      Board Member
                    </p>
                    <div className="space-y-2 text-muted-foreground font-sans">
                      <p>
                        As a Board Member for Robovitics, I directed
                        collaborations for the campus robotics club, impacting
                        over 250 students. My role involved strategic planning,
                        event coordination, and fostering partnerships that
                        enhanced learning opportunities for our community.
                      </p>
                      <p>
                        I organized 10+ events and workshops, including a global
                        MLH-partnered hackathon with 800+ registrations. These
                        experiences taught me the importance of bringing people
                        together around shared goals and creating environments
                        where innovation can flourish.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="font-mono text-xs">
                        Event Planning
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        Team Leadership
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        Partnership Development
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        Community Building
                      </Badge>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>

            <section id="certifications" className="mb-32 scroll-mt-20">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  04
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-12">
                  Licenses & Certifications
                </h2>
              </FadeIn>

              <div className="max-w-prose space-y-6">
                {certifications.map((cert) => {
                  const issued = formatDate(cert.issueDate);
                  const expires = cert.expirationDate
                    ? formatDate(cert.expirationDate)
                    : undefined;
                  return (
                    <FadeIn key={`${cert.title}-${cert.issueDate}`}>
                      <div className="border-b border-border/40 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <h3 className="font-serif text-lg text-foreground">
                            {cert.title}
                          </h3>
                          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                            {issued}
                            {expires ? ` — ${expires}` : ""}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground mt-1">
                          {cert.issuer}
                        </p>
                        {cert.credentialId && (
                          <p className="font-mono text-xs text-muted-foreground/60 mt-1">
                            ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </section>

            <section className="text-center">
              <FadeIn>
                <div className="border-t border-border/40 pt-16">
                  <h2 className="font-serif text-3xl text-foreground mb-4">
                    Let's Build Something That Works
                  </h2>
                  <p className="font-sans text-muted-foreground max-w-prose mx-auto">
                    I'm looking for teams that ship data products end-to-end —
                    from pipeline to dashboard. If that sounds like your stack,
                    I'd love to talk.
                  </p>
                </div>
              </FadeIn>
            </section>
          </div>

          <div className="hidden lg:block flex-shrink-0 w-64">
            <div className="sticky top-32">
              <AboutNav sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "About - Kanit Mann",
  description:
    "About Kanit Mann: Data & ML Engineer with experience in cloud infrastructure, machine learning, and data pipelines.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About - Kanit Mann",
    description:
      "About Kanit Mann: Data & ML Engineer with experience in cloud infrastructure, machine learning, and data pipelines.",
    url: getSiteUrl() + "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Kanit Mann",
    description:
      "About Kanit Mann: Data & ML Engineer with experience in cloud infrastructure, machine learning, and data pipelines.",
  },
};
