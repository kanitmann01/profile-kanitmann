import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "VoiceBridge - Real-Time P2P Translation",
      description:
        "Break language barriers with real-time speech translation using cutting-edge AI models for speech recognition, translation, and speech synthesis.",
      image: "/images/case-studies/voicebridge.jpeg",
      tags: ["Python", "Flask", "PyTorch", "Socket.IO"],
      href: "/case-studies/voicebridge",
      status: "Completed",
      github: "https://github.com/kanitmann01/hackaz_team_wildhackers",
    },
    {
      title: "Titanic Survival Predictor Web App",
      description:
        "A fun and interactive web application that predicts whether you would have survived the Titanic disaster based on your passenger profile.",
      image: "/images/case-studies/titanic.jpeg",
      tags: ["Python", "Flask", "Scikit-learn", "Bootstrap"],
      href: "/case-studies/titanic",
      status: "Live",
      github: "https://github.com/kanitmann01/titanic_survivor_web_app",
      demo: "https://titanic-survival-predictor.herokuapp.com",
    },
    {
      title: "The Echo Effect: WTO Accession Impact Analysis",
      description:
        "Research project using Synthetic Control Method to analyze the causal impact of World Trade Organization accession on national economies.",
      image: "/images/case-studies/echoeffect.jpg",
      tags: ["Python", "Synthetic Control", "Economics", "Research"],
      href: "/case-studies/echo-effect",
      status: "In Progress",
      github: "https://github.com/kanitmann01/The-Echo-Effect",
    },
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Case Studies</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dives into projects that showcase technical expertise, problem-solving approach, and business impact
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <StaggerItem key={index}>
              <ScaleOnHover>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={study.image} alt={study.title} fill className="object-cover" />
                    <Badge 
                      className={`absolute top-4 right-4 ${
                        study.status === "Live" 
                          ? "bg-green-500" 
                          : study.status === "In Progress" 
                          ? "bg-yellow-500" 
                          : "bg-blue-500"
                      }`}
                    >
                      {study.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <CardDescription className="text-base">{study.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button asChild className="flex-1">
                        <Link href={study.href}>
                          Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      {study.github && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={study.github} target="_blank">
                            <Github className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {study.demo && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={study.demo} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}
