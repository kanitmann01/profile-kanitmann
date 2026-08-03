import Image from "next/image";
import { HeadingLink } from "@/components/heading-link";

// Homepage tech-stack bento card — surfaces the stack the flagship projects
// actually use (Unified Bharat: Spark/Iceberg; Twitch: Kafka/Snowflake/dbt;
// NetSTAR: FastText/Power BI). Missing icons fall back to a 2-letter monogram.
const skills = [
  { name: "Python", icon: "/images/tech/python.svg" },
  { name: "SQL", icon: "/images/tech/sql.svg" },
  { name: "Apache Spark" },
  { name: "Snowflake" },
  { name: "Apache Kafka" },
  { name: "dbt" },
  { name: "Docker", icon: "/images/tech/docker.svg" },
  { name: "GCP", icon: "/images/tech/gcp.svg" },
];

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
            <span className="font-sans text-xs text-foreground">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
