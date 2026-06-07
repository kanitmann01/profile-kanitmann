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
    slug: "unified-bharat",
    title: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse",
    description:
      "Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis of Indian state-level policy outcomes.",
    image: "/images/case-studies/unified-bharat.png",
    tags: ["Python", "Apache Spark", "Apache Iceberg", "Docker", "PySpark", "Panel Regression"],
    href: "/projects/unified-bharat",
    github: "https://github.com/kanitmann01/unified-bharat",
    status: "Completed",
    period: "May 2026",
    order: 202605,
    lastUpdated: "2026-05-01",
    featuredOnHome: true,
  },
  {
    slug: "twitch-analytics-pipeline",
    title: "Real-Time Twitch Analytics Pipeline",
    description:
      "End-to-end ELT streaming pipeline that ingests real-time Twitch viewership data through Apache Kafka, warehouses in Snowflake, and transforms with dbt for Looker Studio dashboards.",
    image: "/images/case-studies/twitch-analytics.png",
    tags: ["Python", "Apache Kafka", "Snowflake", "dbt", "Looker Studio", "ELT"],
    href: "/projects/twitch-analytics-pipeline",
    github: "https://github.com/kanitmann01/twitch_stat_board",
    demo: "https://lookerstudio.google.com/s/jyb_uKEUcmo",
    status: "Completed",
    period: "January 2026",
    order: 202601,
    lastUpdated: "2026-01-01",
    featuredOnHome: true,
  },
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
  },
]

export const featuredProjects = projects.filter((project) => project.featuredOnHome)

