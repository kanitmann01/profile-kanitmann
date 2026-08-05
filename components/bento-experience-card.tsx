import { CompactExperienceTimeline } from "@/components/experience-timeline";
import { HeadingLink } from "@/components/heading-link";
import { VelocitySkew } from "@/components/animations/velocity-skew";
import type { Experience } from "@/data/experiences";

interface BentoExperienceCardProps {
  experiences: Experience[];
}

export function BentoExperienceCard({ experiences }: BentoExperienceCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      {/* Wave E.4: the bento grid's primary section header gets the same
          Lenis-driven velocity skew as the h2 section titles. */}
      <VelocitySkew as="div">
        <HeadingLink href="/about#experience" chip="/about/experience">
          My Experience
        </HeadingLink>
      </VelocitySkew>
      <CompactExperienceTimeline experiences={experiences} />
    </div>
  );
}
