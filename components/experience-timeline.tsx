"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { truncate } from "@/lib/truncate"
import type { Experience, SubRole } from "@/data/experiences"

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

function SubRoleCard({ role }: { role: SubRole }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = role.description.length > 200
  const displayDescription =
    isExpanded || !shouldTruncate
      ? role.description
      : truncate(role.description)

  return (
    <div className="ml-8 border-l-2 border-primary/20 pl-6 py-4 mt-4">
      <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest mb-2">
        {role.startDate} – {role.endDate}
        <span className="mx-2">·</span>
        {role.duration}
      </p>

      <p className="font-mono text-accent text-sm">
        {role.position}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="outline" className="text-xs font-mono">
          {role.type}
        </Badge>
        <Badge variant="secondary" className="text-xs font-mono">
          {role.workMode}
        </Badge>
      </div>

      <p className="font-sans text-muted-foreground leading-relaxed max-w-2xl mt-4">
        {displayDescription}
      </p>

      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto text-primary hover:text-primary/80 font-mono text-xs mt-2"
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

      {role.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {role.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs font-mono">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      {role.achievements && role.achievements.length > 0 && (
        <div className="mt-4 space-y-2">
          {role.achievements.map((achievement, idx) => (
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
  )
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = (experience.description?.length ?? 0) > 200
  const displayDescription =
    isExpanded || !shouldTruncate
      ? experience.description
      : experience.description ? truncate(experience.description) : ""

  return (
    <motion.div
      className="relative pl-8 sm:pl-12 py-12"
      variants={roleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute left-[-5px] top-14 w-[10px] h-[10px] rounded-full bg-primary border-2 border-background" />

      <div className="space-y-4">
        <motion.div variants={parallaxVariants}>
          {experience.startDate && (
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest mb-2">
              {experience.startDate} – {experience.endDate}
              <span className="mx-2">·</span>
              {experience.duration}
            </p>
          )}

          <h3 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
            {experience.company}
          </h3>

          {experience.position && (
            <p className="font-mono text-accent text-sm mt-1">
              {experience.position}
            </p>
          )}
        </motion.div>

        {experience.type && experience.workMode && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs font-mono">
              {experience.type}
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono">
              {experience.workMode}
            </Badge>
          </div>
        )}

        {experience.description && (
          <>
            <p className="font-sans text-muted-foreground leading-relaxed max-w-2xl">
              {displayDescription}
            </p>

            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
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
          </>
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

        {experience.roles && experience.roles.map((role, idx) => (
          <SubRoleCard key={idx} role={role} />
        ))}
      </div>
    </motion.div>
  )
}

export function ExperienceTimeline({ experiences, compact = false }: ExperienceTimelineProps) {
  const [showCollapsed, setShowCollapsed] = useState(false)

  if (compact) {
    const compactExperiences = experiences.filter((e) => e.featuredOnHome)
    return (
      <div className="relative border-l-2 border-primary/30 ml-4">
        {compactExperiences.slice(0, 5).map((experience) => (
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
              {experience.position || experience.roles?.[0]?.position || ""}
            </p>
            <p className="font-mono text-xs text-muted-foreground truncate">
              {experience.company}
            </p>
          </motion.div>
        ))}
      </div>
    )
  }

  const visibleExperiences = experiences.filter((e) => !e.collapsible)
  const collapsedExperiences = experiences.filter((e) => e.collapsible)

  return (
    <div className="relative">
      <div
        data-testid="timeline-connector"
        className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"
      />

      <div className="space-y-0">
        {visibleExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}

        {collapsedExperiences.length > 0 && (
          <>
            {!showCollapsed && (
              <motion.div
                className="relative pl-8 sm:pl-12 py-8"
                variants={roleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Button
                  variant="outline"
                  onClick={() => setShowCollapsed(true)}
                  className="font-mono text-xs"
                >
                  Show more <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </motion.div>
            )}

            <AnimatePresence>
              {showCollapsed && (
                <>
                  {collapsedExperiences.map((experience) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <ExperienceCard experience={experience} />
                    </motion.div>
                  ))}
                  <motion.div
                    className="relative pl-8 sm:pl-12 py-4"
                    variants={roleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setShowCollapsed(false)}
                      className="font-mono text-xs"
                    >
                      Show less <ChevronUp className="ml-1 h-3 w-3" />
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

export function CompactExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return <ExperienceTimeline experiences={experiences} compact />
}