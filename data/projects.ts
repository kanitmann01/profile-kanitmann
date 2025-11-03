export type ProjectStatus = "Live" | "Completed" | "In Progress"

export type Project = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  href: string
  github?: string
  demo?: string
  status?: ProjectStatus
  live?: boolean
  period: string
  order: number
  lastUpdated: string
  featuredOnHome?: boolean
}

export const projects: Project[] = [
  {
    slug: "college-major-shift-analysis",
    title: "College Major Selection & Shift Analysis",
    description:
      "Longitudinal analysis of IPUMS USA microdata to understand how wage trends influence shifts in U.S. college major popularity from 2009–2023.",
    image: "/major-img.png",
    tags: ["Python", "Pandas", "Seaborn", "Data Storytelling"],
    href: "/projects/college-major-shift-analysis",
    github: "https://github.com/kanitmann01/college-major-shift-analysis",
    status: "Completed",
    period: "September 2025",
    order: 202509,
    lastUpdated: "2025-09-01",
  },
  {
    slug: "echo-effect",
    title: "The Echo Effect: WTO Accession Impact Analysis",
    description:
      "Research project using Synthetic Control Method to analyze the causal impact of World Trade Organization accession on national economies.",
    image: "/images/case-studies/echoeffect.jpg",
    tags: ["Python", "Synthetic Control", "Economics", "Research"],
    href: "/projects/echo-effect",
    github: "https://github.com/kanitmann01/The-Echo-Effect",
    status: "In Progress",
    period: "July 2025",
    order: 202507,
    lastUpdated: "2025-07-01",
    featuredOnHome: true,
  },
  {
    slug: "titanic",
    title: "Titanic Survival Predictor Web App",
    description:
      "A fun and interactive web application that predicts whether you would have survived the Titanic disaster based on your passenger profile.",
    image: "/images/case-studies/titanic.jpeg",
    tags: ["Python", "Flask", "Scikit-learn", "Bootstrap"],
    href: "/projects/titanic",
    github: "https://github.com/kanitmann01/titanic_survivor_web_app",
    demo: "https://web-production-db6b.up.railway.app/",
    status: "Live",
    live: true,
    period: "March 2025",
    order: 202503,
    lastUpdated: "2025-03-01",
    featuredOnHome: true,
  },
  {
    slug: "voicebridge",
    title: "VoiceBridge - Real-Time P2P Translation",
    description:
      "Break language barriers with real-time speech translation using cutting-edge AI models for speech recognition, translation, and speech synthesis.",
    image: "/images/case-studies/voicebridge.jpeg",
    tags: ["Python", "Flask", "PyTorch", "Socket.IO"],
    href: "/projects/voicebridge",
    github: "https://github.com/kanitmann01/hackaz_team_wildhackers",
    status: "Completed",
    period: "February 2025",
    order: 202502,
    lastUpdated: "2025-02-01",
    featuredOnHome: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featuredOnHome)

export function groupProjectsByPeriod() {
  const groups = new Map<string, Project[]>()

  projects
    .slice()
    .sort((a, b) => b.order - a.order)
    .forEach((project) => {
      if (!groups.has(project.period)) {
        groups.set(project.period, [])
      }
      groups.get(project.period)!.push(project)
    })

  return Array.from(groups.entries()).map(([period, periodProjects]) => ({
    period,
    projects: periodProjects,
  }))
}

