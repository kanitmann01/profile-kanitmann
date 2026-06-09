import Image from "next/image"
import { HeadingLink } from "@/components/heading-link"

const skills = [
  { name: "Python", icon: "/images/tech/python.svg" },
  { name: "SQL", icon: "/images/tech/sql.svg" },
  { name: "Machine Learning", icon: "/images/tech/machine-learning-frameworks.svg" },
  { name: "Apache Spark" },
  { name: "GCP", icon: "/images/tech/gcp.svg" },
  { name: "Docker", icon: "/images/tech/docker.svg" },
  { name: "Data Pipelines" },
  { name: "Snowflake" },
]

export function BentoTechStackCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <HeadingLink href="/about#skills" chip="/about/skills">
        Tech Stack
      </HeadingLink>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2"
          >
            {skill.icon ? (
              <div className="relative h-5 w-5 shrink-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-5 w-5 shrink-0 rounded bg-primary/20 flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary uppercase">
                  {skill.name.slice(0, 2)}
                </span>
              </div>
            )}
            <span className="font-sans text-xs text-foreground">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
