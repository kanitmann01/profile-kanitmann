export type ArticleMeta = {
  slug: string
  title: string
  description: string
  summary: string
  canonicalPath: string
  heroImage?: string
  publishedAt: string
  updatedAt?: string
  readTime: string
  tags: string[]
  keywords?: string[]
  featuredOnHome?: boolean
}

export const articles: ArticleMeta[] = [
  {
    slug: "data-viz-analysis",
    title: "Data Visualization Portfolio Reflection",
    description:
      "A guided tour through five portfolio visualizations demonstrating polish, communication, and analytical rigor in data storytelling.",
    summary:
      "Five portfolio visuals that track a semester's growth in polish, accessibility, and narrative storytelling.",
    canonicalPath: "/articles/data-viz-analysis",
    heroImage: "/images/articles/data-visualization.svg",
    publishedAt: "2025-11-03",
    updatedAt: "2025-11-03",
    readTime: "6 min read",
    tags: ["Data Visualization", "Portfolio", "Storytelling"],
    keywords: [
      "data visualization",
      "portfolio",
      "accessibility",
      "storytelling",
      "R",
      "data presentation",
    ],
  },
  {
    slug: "technical-blog-3",
    title: "Technical Blog 3: The Wonderful World of Windows Registry",
    description:
      "A firsthand story about wrestling with corporate device restrictions, discovering the Windows Registry, and automating the fixes.",
    summary:
      "How a locked-down corporate laptop sparked a registry deep dive, automation, and empathy for IT guardrails.",
    canonicalPath: "/articles/technical-blog-3",
    heroImage: "/images/articles/windows-registry.svg",
    publishedAt: "2025-09-21",
    updatedAt: "2025-09-21",
    readTime: "4 min read",
    tags: ["Windows", "Automation", "Productivity"],
    keywords: [
      "windows registry",
      "automation",
      "corporate laptop",
      "productivity",
      "scripting",
    ],
  },
  {
    slug: "technical-blog-2",
    title: "Technical Blog 2: Command Line Interface vs Graphical User Interface",
    description:
      "A practitioner's perspective on the CLI vs GUI debate: when to embrace the terminal, when to grab the mouse, and why a hybrid mindset wins.",
    summary:
      "A balanced look at when to lean on terminals, when to embrace GUIs, and why a blended workflow works best.",
    canonicalPath: "/articles/technical-blog-2",
    heroImage: "/images/articles/cli-gui.svg",
    publishedAt: "2025-09-14",
    updatedAt: "2025-09-14",
    readTime: "5 min read",
    tags: ["CLI", "GUI", "Workflow"],
    keywords: [
      "command line interface",
      "graphical user interface",
      "productivity",
      "automation",
      "tech blog",
    ],
  },
  {
    slug: "ccrb-allegations-analysis",
    title: "CCRB Allegations Analysis (Ongoing)",
    description:
      "An ongoing, multi-week analysis of CCRB allegations data. Week 1 establishes the baseline: data familiarization, preliminary trends, and a working roadmap.",
    summary:
      "Multi-week data analysis project on CCRB allegations; Week 1 lays the baseline and embeds the first report.",
    canonicalPath: "/articles/ccrb-allegations-analysis",
    heroImage: "/images/articles/ccrb-analysis.svg",
    publishedAt: "2025-09-08",
    updatedAt: "2025-09-08",
    readTime: "7 min read",
    tags: ["Data Analysis", "CCRB", "NYC"],
    keywords: [
      "CCRB",
      "NYPD",
      "NYC",
      "police accountability",
      "data analysis",
      "pandas",
      "Python",
      "visualization",
    ],
  },
  {
    slug: "bios-issues-ubuntu",
    title: "Technical Blog 1: BIOS Issues and Ubuntu",
    description:
      "Troubleshooting BIOS, UEFI, and Secure Boot issues on Ubuntu: lessons from a community thread and a practical checklist for approaching firmware and OS interactions.",
    summary:
      "Troubleshooting BIOS/UEFI, Secure Boot, and firmware issues on Ubuntu, notes from a community thread and a practical checklist.",
    canonicalPath: "/articles/bios-issues-ubuntu",
    heroImage: "/images/articles/bios-issues-ubuntu.svg",
    publishedAt: "2025-09-08",
    updatedAt: "2025-09-08",
    readTime: "5 min read",
    tags: ["Linux", "Ubuntu", "Firmware"],
    keywords: [
      "Ubuntu",
      "BIOS",
      "UEFI",
      "Secure Boot",
      "LVFS",
      "firmware",
      "Linux troubleshooting",
      "motherboard",
      "ASRock",
    ],
  },
  {
    slug: "titanic-survival",
    title: "Would You Have Survived the Titanic?",
    description:
      "Discover if you would have survived the Titanic disaster using machine learning. Explore survival patterns by gender, class, and age with interactive data visualizations and historical insights.",
    summary:
      "What this historic disaster reveals about inequality, decision-making, and leadership under pressure.",
    canonicalPath: "/articles/titanic-survival",
    heroImage: "/images/case-studies/titanic.jpeg",
    publishedAt: "2025-03-15",
    updatedAt: "2025-03-15",
    readTime: "8 min read",
    tags: ["Data Science", "Machine Learning", "Social Analysis"],
    keywords: [
      "Titanic survival",
      "machine learning",
      "data analysis",
      "survival prediction",
      "RMS Titanic",
      "passenger data",
      "social inequality",
      "decision trees",
      "Python",
      "data science",
    ],
    featuredOnHome: true,
  },
]

export function getArticleBySlug(slug: string): ArticleMeta {
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    throw new Error(`Article with slug "${slug}" not found`)
  }

  return article
}

