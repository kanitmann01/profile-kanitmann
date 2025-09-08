import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { CompactExperienceTimeline } from "@/components/experience-timeline"
import { ProjectCard } from "@/components/project-card"

export default function Home() {
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
      skills: ["Citrix Workspace", "Citrix Virtual Apps", "Google Cloud Platform", "Cloud Migration", "Database Management"]
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
      id: "trikon",
      company: "Trikon Technologies",
      position: "Firmware Development Intern",
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

  const featuredProjects = [
    {
      title: "VoiceBridge - Real-Time P2P Translation",
      description:
        "Break language barriers with real-time speech translation using cutting-edge AI models for speech recognition, translation, and speech synthesis.",
      image: "/images/case-studies/voicebridge.jpeg",
      tags: ["Python", "Flask", "PyTorch", "Socket.IO"],
      href: "/projects/voicebridge",
      github: "https://github.com/kanitmann01/hackaz_team_wildhackers",
      live: false,
      status: "Completed",
    },
    {
      title: "Titanic Survival Predictor Web App",
      description:
        "A fun and interactive web application that predicts whether you would have survived the Titanic disaster based on your passenger profile.",
      image: "/images/case-studies/titanic.jpeg",
      tags: ["Python", "Flask", "Scikit-learn", "Bootstrap"],
      href: "/projects/titanic",
      github: "https://github.com/kanitmann01/titanic_survivor_web_app",
      live: true,
      demo: "https://titanic-survival-predictor.herokuapp.com",
      status: "Live",
    },
    {
      title: "The Echo Effect: WTO Accession Impact Analysis",
      description:
        "Research project using Synthetic Control Method to analyze the causal impact of World Trade Organization accession on national economies.",
      image: "/images/case-studies/echoeffect.jpg",
      tags: ["Python", "Synthetic Control", "Economics", "Research"],
      href: "/projects/echo-effect",
      github: "https://github.com/kanitmann01/The-Echo-Effect",
      live: false,
      status: "In Progress",
    },
  ]

  const featuredArticles = [
    {
      title: "Would you have survived the Titanic?",
      description:
        "What this historic disaster reveals about inequality, decision-making, and leadership under pressure.",
      readTime: "8 min read",
      href: "/articles/titanic-survival",
    },
  ]

  const techStack = [
    { name: "Python", icon: "/images/tech/python.svg" },
    { name: "GCP", icon: "/images/tech/gcp.svg" },
    { name: "Scikit-learn", icon: "/images/tech/scikit-learn.svg" },
    { name: "Docker", icon: "/images/tech/docker.svg" },
    { name: "SQL", icon: "/images/tech/sql.svg" },
    { name: "GitHub", icon: "/images/tech/github.svg" },
    { name: "NumPy", icon: "/images/tech/numpy.svg" },
    { name: "Seaborn", icon: "/images/tech/seaborn.svg" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <FadeIn delay={0.2}>
                <div className="mb-4 sm:mb-6">
                  <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">
                    👋 Available for opportunities
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                    <span className="gradient-text">KANIT MANN</span>
                  </h1>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 sm:mb-6 font-light">
                  Building intelligent applications from data and cloud.
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.6}>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8">
                  A Data Science MS student with a 4.0 GPA and 1.5 years of cloud infrastructure experience. I combine
                  expertise in statistical analysis, machine learning, and data visualization to create impactful solutions.
                </p>
              </FadeIn>

              {/* Quick Stats */}
              <FadeIn delay={0.7}>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto lg:mx-0">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">4.0</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">1.5</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">10+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Projects</div>
                  </div>
                </div>
              </FadeIn>

              {/* Tech Stack */}
              <FadeIn delay={0.8}>
                <div className="mb-6 sm:mb-8">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                    {techStack.map((tech) => (
                      <div key={tech.name} className="flex items-center gap-1.5 sm:gap-2 bg-muted/50 px-2 sm:px-3 py-1 rounded-full">
                        <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.9}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-sm sm:text-base" asChild>
                    <Link href="/projects">
                      View Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-sm sm:text-base" asChild>
                    <Link href="/contact">Get In Touch</Link>
                  </Button>
                </div>
              </FadeIn>

              {/* Social Links */}
              <FadeIn delay={1.0}>
                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start mt-4 sm:mt-6">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="mailto:kanitmann01@gmail.com">
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="https://github.com/kanitmann01" target="_blank">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="https://linkedin.com/in/kanitmann" target="_blank">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/Kanit Mann - Resume.pdf" target="_blank">
                      <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 mb-6 lg:mb-0">
              <FadeIn delay={0.5}>
                <div className="relative">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                      <Image
                        src="/images/profile/kanit-mann.png"
                        alt="Kanit Mann"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Floating elements around the image - hidden on mobile */}
                  <div className="hidden sm:block absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce"></div>
                  <div className="hidden sm:block absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-bounce delay-1000"></div>
                  <div className="hidden sm:block absolute top-1/2 -right-8 w-4 h-4 bg-accent/20 rounded-full animate-pulse"></div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
              <p className="text-lg text-muted-foreground">
                My journey through various roles and companies, building expertise in cloud infrastructure and leadership
              </p>
            </div>
          </FadeIn>

          <div className="bg-muted/30 rounded-lg p-8">
            <CompactExperienceTimeline experiences={experiences} />
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/about">
                  View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">
                Deep dives into projects that showcase technical expertise and business impact
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((study, index) => (
              <StaggerItem key={index}>
                <ProjectCard project={study} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Featured Articles</h2>
              <p className="text-lg text-muted-foreground">Insights and analysis on data science, technology, and innovation</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6">
            {featuredArticles.map((article, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                          <CardDescription className="text-base">{article.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{article.readTime}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <Link href={article.href}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kanit Mann",
            "jobTitle": "Data Scientist & Product Builder",
            "description": "Building intelligent applications from data and cloud. Data Science MS student with expertise in statistical analysis, machine learning, and data visualization.",
            "url": "https://kanit.codes",
            "image": "https://kanit.codes/images/profile/kanit-mann.png",
            "email": "kanitmann01@gmail.com",
            "sameAs": [
              "https://github.com/kanitmann01",
              "https://linkedin.com/in/kanitmann"
            ],
            "knowsAbout": [
              "Data Science",
              "Machine Learning",
              "Python",
              "GCP",
              "Cloud Infrastructure",
              "Statistical Analysis",
              "Data Visualization"
            ],
            "alumniOf": {
              "@type": "Organization",
              "name": "University of Arizona"
            }
          })
        }}
      />
    </div>
  )
}
