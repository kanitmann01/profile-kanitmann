"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { truncate } from "@/lib/truncate"
import type { Experience } from "@/data/experiences"

interface ExperienceTimelineProps {
  experiences: Experience[]
  compact?: boolean
}

const roleVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

const parallaxVariants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export function ExperienceTimeline({ experiences, compact = false }: ExperienceTimelineProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  if (compact) {
    return (
      <div className="relative border-l-2 border-primary/30 ml-4">
        {experiences.slice(0, 5).map((experience) => (
          <motion.div
            key={experience.id}
            className="relative pl-8 py-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="absolute left-[-5px] top-6 w-2 h-2 rounded-full bg-primary" />
            <p className="font-sans font-medium text-sm text-foreground truncate">
              {experience.position}
            </p>
            <p className="font-mono text-xs text-muted-foreground truncate">
              {experience.company}
            </p>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        data-testid="timeline-connector"
        className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"
      />

      <div className="space-y-0">
        {experiences.map((experience, index) => {
          const isExpanded = expandedCards.has(experience.id)
          const shouldTruncate = experience.description.length > 200
          const displayDescription =
            isExpanded || !shouldTruncate
              ? experience.description
              : truncate(experience.description)

          return (
            <motion.div
              key={experience.id}
              className="relative pl-8 sm:pl-12 py-12"
              variants={roleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute left-[-5px] top-14 w-[10px] h-[10px] rounded-full bg-primary border-2 border-background" />

              <div className="space-y-4">
                <motion.div variants={parallaxVariants}>
                  <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest mb-2">
                    {experience.startDate} – {experience.endDate}
                    <span className="mx-2">·</span>
                    {experience.duration}
                  </p>

                  <h3 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                    {experience.company}
                  </h3>

                  <p className="font-mono text-accent text-sm mt-1">
                    {experience.position}
                  </p>
                </motion.div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {experience.type}
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {experience.workMode}
                  </Badge>
                </div>

                <p className="font-sans text-muted-foreground leading-relaxed max-w-2xl">
                  {displayDescription}
                </p>

                {shouldTruncate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCard(experience.id)}
                    className="p-0 h-auto text-primary hover:text-primary/80 font-mono text-xs"
                  >
                    {isExpanded ? (
                      <>
                        Show less <ChevronUp className="ml-1 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="ml-1 h-3 w-3" />
                      </>
                    )}
                  </Button>
                )}

                {experience.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs font-mono">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        className="font-sans text-sm text-muted-foreground flex items-start gap-3 list-none"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function CompactExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return <ExperienceTimeline experiences={experiences} compact />
}
