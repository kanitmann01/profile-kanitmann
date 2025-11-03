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

export default function About() {
  const experiences = [
    {
      id: "ericsson-engineer",
      company: "Ericsson",
      position: "Engineer, Cloud and Infra",
      type: "Full-time" as const,
      location: "Noida, Uttar Pradesh, India",
      startDate: "Sep 2023",
      endDate: "Dec 2024",
      duration: "1 yr 4 mos",
      workMode: "Hybrid" as const,
      description: "Led deployment and optimization of Citrix virtual infrastructure across regional data centers, improving resource utilization and reducing system latency. Played a key role in Ericsson's strategic hybrid cloud initiative by contributing to the migration of approximately 2,000 servers from on-premises infrastructure to Google Cloud Platform (GCP), one of the company's largest public cloud migrations. Successfully maintained application functionality and service continuity throughout the transition period, ensuring minimal disruption to business operations. Implemented automated database management workflows that decreased maintenance time significantly. Collaborated with network security teams to enhance cloud infrastructure resilience, achieving high uptime for mission-critical applications.",
      skills: ["Citrix Workspace", "Citrix Virtual Apps", "Google Cloud Platform", "Cloud Migration", "Database Management"],
      achievements: [
        "Successfully migrated 2,000+ servers to GCP with minimal disruption",
        "Improved resource utilization and reduced system latency",
        "Implemented automated database management workflows",
        "Achieved high uptime for mission-critical applications"
      ]
    },
    {
      id: "ericsson-intern",
      company: "Ericsson",
      position: "Cloud and Infrastructure Intern",
      type: "Internship" as const,
      location: "Noida, Uttar Pradesh, India",
      startDate: "Feb 2023",
      endDate: "Sep 2023",
      duration: "8 mos",
      workMode: "On-site" as const,
      description: "As a Cloud & Infra Ops Intern at Ericsson Global, I manage and maintain cloud and infrastructure systems, ensuring they meet high standards for reliability, security, and performance.",
      skills: ["Citrix Workspace", "Citrix Virtual Apps", "Cloud Infrastructure"]
    },
    {
      id: "robovitics",
      company: "roboVITics - The Official Robotics Club of VIT",
      position: "Member of the Management Board",
      type: "Part-time" as const,
      location: "Vellore, Tamil Nadu, India",
      startDate: "Mar 2021",
      endDate: "Jan 2022",
      duration: "11 mos",
      workMode: "On-site" as const,
      description: "Served as Management Board Member for VIT's premier robotics organization with 500+ members. Developed and led design department teaching Adobe Creative Suite and Figma to 75+ students, with 90% successfully completing club design projects.",
      skills: ["Adobe Creative Suite", "Figma", "Leadership", "Event Management"]
    },
    {
      id: "tata-power",
      company: "TATA Power",
      position: "Full Stack Intern",
      type: "Part-time" as const,
      location: "Noida, Uttar Pradesh, India",
      startDate: "Jul 2021",
      endDate: "Sep 2021",
      duration: "3 mos",
      workMode: "On-site" as const,
      description: "As a Full Stack Intern, I streamlined employee transfer and joining policies by deploying a DB schema and worked on a full-stack project to prototype the company's internal portal structure. I gained valuable experience in database design, web development, and project management, as well as exposure to the complexities of HR processes in a large organization.",
      skills: ["MongoDB", "React.js", "Database Design", "Web Development", "Project Management"]
    },
    {
      id: "trikon",
      company: "Trikon Technologies",
      position: "Firmware Developer",
      type: "Internship" as const,
      location: "Noida, Uttar Pradesh, India",
      startDate: "May 2021",
      endDate: "Aug 2021",
      duration: "4 mos",
      workMode: "On-site" as const,
      description: "As a Firmware Development Intern at Trikon Technologies, I developed and tested firmware for embedded systems and microcontrollers, collaborating with cross-functional teams on automation systems, IoT devices, and motor control applications. I honed my skills in Marlin and embedded-C and gained valuable experience in debugging and problem-solving. My internship at Trikon Technologies has prepared me for future career opportunities in firmware development.",
      skills: ["Embedded Software", "Embedded C", "Marlin", "IoT", "Motor Control"]
    },
    {
      id: "syolo",
      company: "Syolo Consulting",
      position: "Engineer Intern",
      type: "Internship" as const,
      location: "Noida, Uttar Pradesh, India",
      startDate: "Mar 2020",
      endDate: "May 2020",
      duration: "3 mos",
      workMode: "On-site" as const,
      description: "Gained foundational experience in engineering practices and consulting methodologies.",
      skills: ["Engineering", "Consulting", "Problem Solving"]
    }
  ]

  const skillCategories = [
    {
      title: "Programming Languages",
      items: ["Python", "C++", "Hands-on Coding"],
    },
    {
      title: "Machine Learning & Frameworks",
      items: ["Machine learning frameworks", "Scikit learn"],
    },
    {
      title: "Data Management",
      items: ["Data wrangling tools", "Pandas", "SQL", "Plotly", "Seaborn", "Tableau", "Microsoft Excel"],
    },
    {
      title: "Mindset & Analysis",
      items: ["Analytical mindset", "Curiosity"],
    },
    {
      title: "Field Expertise",
      items: ["Data Science", "GCP", "Cloud Infrastructure"],
    },
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
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <StaggerItem key={category.title}>
                <ScaleOnHover>
                  <Card className="h-full">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <Badge key={item} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
          <ScaleOnHover>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-primary mb-6">Board Member, Robovitics</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      As a Board Member for Robovitics, I directed collaborations for the campus robotics club,
                      impacting over 250 students. My role involved strategic planning, event coordination, and
                      fostering partnerships that enhanced learning opportunities for our community.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      I organized 10+ events and workshops, including a global MLH-partnered hackathon with 800+
                      registrations. These experiences taught me the importance of bringing people together around
                      shared goals and creating environments where innovation can flourish.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    <Badge variant="secondary">Event Planning</Badge>
                    <Badge variant="secondary">Team Leadership</Badge>
                    <Badge variant="secondary">Partnership Development</Badge>
                    <Badge variant="secondary">Community Building</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScaleOnHover>
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
