import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ProjectCard } from "@/components/project-card"
import type { Metadata } from "next"

export default function Projects() {
  const projects = [
    {
      title: "VoiceBridge - Real-Time P2P Translation",
      description:
        "Break language barriers with real-time speech translation using cutting-edge AI models for speech recognition, translation, and speech synthesis.",
      image: "/images/case-studies/voicebridge.jpeg",
      tags: ["Python", "Flask", "PyTorch", "Socket.IO"],
      href: "/projects/voicebridge",
      status: "Completed",
      github: "https://github.com/kanitmann01/hackaz_team_wildhackers",
    },
    {
      title: "Titanic Survival Predictor Web App",
      description:
        "A fun and interactive web application that predicts whether you would have survived the Titanic disaster based on your passenger profile.",
      image: "/images/case-studies/titanic.jpeg",
      tags: ["Python", "Flask", "Scikit-learn", "Bootstrap"],
      href: "/projects/titanic",
      status: "Live",
      github: "https://github.com/kanitmann01/titanic_survivor_web_app",
      demo: "https://web-production-db6b.up.railway.app/",
    },
    {
      title: "The Echo Effect: WTO Accession Impact Analysis",
      description:
        "Research project using Synthetic Control Method to analyze the causal impact of World Trade Organization accession on national economies.",
      image: "/images/case-studies/echoeffect.jpg",
      tags: ["Python", "Synthetic Control", "Economics", "Research"],
      href: "/projects/echo-effect",
      status: "In Progress",
      github: "https://github.com/kanitmann01/The-Echo-Effect",
    },
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dives into projects that showcase technical expertise, problem-solving approach, and business impact
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {projects.map((study, index) => (
            <StaggerItem key={index}>
              <ProjectCard project={study} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Projects - Kanit Mann",
  description: "Featured projects by Kanit Mann showcasing AI, ML, and data-driven applications.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects - Kanit Mann",
    description: "Featured projects by Kanit Mann showcasing AI, ML, and data-driven applications.",
    url: "https://kanit.codes/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Kanit Mann",
    description: "Featured projects by Kanit Mann showcasing AI, ML, and data-driven applications.",
  },
}
