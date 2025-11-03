import Image from "next/image"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { FloatingElement } from "@/components/animations/floating-element"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { CertificationCard } from "@/components/certification-card"
import { experiences } from "@/data/experiences"
import { certifications } from "@/data/certifications"

export default function About() {
  const skills = [
    { name: "Python", logo: "/images/tech/python.svg" },
    { name: "C++", logo: "/images/tech/cpp.svg" },
    { name: "SQL", logo: "/images/tech/sql.svg" },
    { name: "Pandas", logo: "/images/tech/pandas.svg", themeAware: true },
    { name: "NumPy", logo: "/images/tech/numpy.svg" },
    { name: "Matplotlib", logo: "/images/tech/matplotlib.svg" },
    { name: "Seaborn", logo: "/images/tech/seaborn.svg" },
    { name: "Scikit-learn", logo: "/images/tech/scikit-learn.svg" },
    { name: "GitHub", logo: "/images/tech/github.svg", themeAware: true },
    { name: "Docker", logo: "/images/tech/docker.svg" },
    { name: "GCP", logo: "/images/tech/gcp.svg" },
    { name: "Tableau", logo: "/images/tech/tableau.svg" },
    { name: "Figma", logo: "/images/tech/figma.svg" },
    // { name: "Hands-on Coding", logo: "/images/tech/hands-on-coding.svg" },
    // { name: "Machine Learning Frameworks", logo: "/images/tech/machine-learning-frameworks.svg" },
    // { name: "Data Wrangling Tools", logo: "/images/tech/data-wrangling-tools.svg" },
    { name: "Plotly", logo: "/images/tech/plotly.svg" },
    { name: "Microsoft Excel", logo: "/images/tech/microsoft-excel.svg" },
    // { name: "Analytical Mindset", logo: "/images/tech/analytical-mindset.svg" },
    { name: "Curiosity", logo: "/images/tech/curiosity.svg" },
    // { name: "Data Science", logo: "/images/tech/data-science.svg" },
    // { name: "Cloud Infrastructure", logo: "/images/tech/cloud-infrastructure.svg" },
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center mb-20">
          <h1 className="text-5xl font-bold text-foreground mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining engineering expertise with data science to build intelligent solutions that make a real impact
          </p>
        </FadeIn>

        {/* My Story Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">My Story</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left" className="order-2 md:order-1">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  My journey into data science began with a foundation in building tangible things, from engineering
                  firmware for 3D printers to developing full-stack web applications. This hands-on experience taught me
                  that the best solutions come from understanding both the technical possibilities and the human needs.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  My time at Ericsson as an Engineer, Cloud and Infra, where my team managed the migration of over 2,000 servers to GCP,
                  taught me how to work with complex, large-scale systems. I learned that successful technology
                  implementations require not just technical expertise, but also careful planning, stakeholder
                  communication, and a deep understanding of business requirements.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Now, I'm a Master's student at the University of Arizona (GPA: 4.0/4.0), where I'm combining my
                  engineering background with a passion for data to build intelligent solutions. I believe the future
                  belongs to those who can bridge the gap between complex algorithms and practical applications that
                  solve real-world problems.
                </p>
              </div>
            </SlideIn>
            <SlideIn direction="right" className="order-1 md:order-2">
              <FloatingElement>
                <div className="relative">
                  <Image
                    src="/images/profile/kanit-mann.png"
                    alt="Kanit Mann"
                    width={400}
                    height={500}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </FloatingElement>
            </SlideIn>
          </div>
        </section>

        {/* My Toolkit Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">My Toolkit</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8">
            {skills.map((skill) => (
              <StaggerItem key={skill.name}>
                <ScaleOnHover className="text-center group">
                  <div className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={60}
                      height={60}
                      className={`mx-auto mb-2 ${skill.themeAware ? `svg-${skill.name.toLowerCase()}` : ""}`}
                    />
                    <p className="text-sm font-medium text-foreground">{skill.name}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Licenses & Certifications */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Licenses & Certifications</h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {certifications.map((certification) => (
              <StaggerItem key={`${certification.title}-${certification.issueDate}`}>
                <ScaleOnHover>
                  <CertificationCard certification={certification} />
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Professional Experience Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Professional Experience</h2>
          </FadeIn>
          <ExperienceTimeline experiences={experiences} />
        </section>

        {/* Leadership & Collaboration Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Leadership & Collaboration</h2>
          </FadeIn>
          <div className="space-y-6 max-w-4xl mx-auto">
            <ScaleOnHover>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6 text-left">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary">University of Arizona Campus Store</h3>
                      <p className="text-muted-foreground">Student Lead & Keyholder · Oct 2025 – Present · Tucson, AZ</p>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <ul className="text-muted-foreground leading-relaxed list-disc pl-5">
                        <li>
                          Design onboarding playbooks and mentor new hires, coupling shadowing rotations with clear accountability so
                          student associates master essential store procedures quickly.
                        </li>
                        <li>
                          Direct day-to-day floor operations-staff scheduling, inventory checks, and guest experience initiatives-to
                          keep the team aligned on service standards and sales goals.
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Team Leadership</Badge>
                      <Badge variant="secondary">Training & Development</Badge>
                      <Badge variant="secondary">Retail Operations</Badge>
                      <Badge variant="secondary">Customer Experience</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6 text-left">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary">Robovitics</h3>
                      <p className="text-muted-foreground">Board Member</p>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        As a Board Member for Robovitics, I directed collaborations for the campus robotics club, impacting over 250 students. My role involved strategic planning, event coordination, and fostering partnerships that enhanced learning opportunities for our community.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I organized 10+ events and workshops, including a global MLH-partnered hackathon with 800+ registrations. These experiences taught me the importance of bringing people together around shared goals and creating environments where innovation can flourish.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Event Planning</Badge>
                      <Badge variant="secondary">Team Leadership</Badge>
                      <Badge variant="secondary">Partnership Development</Badge>
                      <Badge variant="secondary">Community Building</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <FadeIn>
            <div className="bg-muted/30 rounded-lg p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Let's Build Something Amazing</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always excited to collaborate on projects that combine technical innovation with meaningful impact.
                Whether you're looking to leverage data for business insights or build intelligent applications, let's
                explore what we can create together.
              </p>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "About - Kanit Mann",
  description: "About Kanit Mann: Data Scientist & Product Builder with experience in cloud infrastructure and a passion for building intelligent applications.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About - Kanit Mann",
    description: "About Kanit Mann: Data Scientist & Product Builder with experience in cloud infrastructure and a passion for building intelligent applications.",
    url: "https://kanit.codes/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Kanit Mann",
    description: "About Kanit Mann: Data Scientist & Product Builder with experience in cloud infrastructure and a passion for building intelligent applications.",
  },
}
