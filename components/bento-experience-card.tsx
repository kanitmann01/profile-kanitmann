import { CompactExperienceTimeline } from "@/components/experience-timeline"
import { HeadingLink } from "@/components/heading-link"
import type { Experience } from "@/data/experiences"

interface BentoExperienceCardProps {
  experiences: Experience[]
}

export function BentoExperienceCard({ experiences }: BentoExperienceCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <HeadingLink href="/about#experience" chip="/about/experience">
        My Experience
      </HeadingLink>
      <CompactExperienceTimeline experiences={experiences} />
    </div>
  )
}
