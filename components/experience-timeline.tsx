"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building2, Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface Experience {
  id: string
  company: string
  position: string
  type: "Full-time" | "Part-time" | "Internship"
  location: string
  startDate: string
  endDate: string
  duration: string
  workMode: "On-site" | "Hybrid" | "Remote"
  description: string
  skills: string[]
  achievements?: string[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
  compact?: boolean
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

  const truncateDescription = (description: string, maxLength: number = 200) => {
    if (description.length <= maxLength) return description
    return description.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-4">
      {experiences.map((experience, index) => {
        const isExpanded = expandedCards.has(experience.id)
        const shouldTruncate = experience.description.length > 200
        const displayDescription = isExpanded || !shouldTruncate 
          ? experience.description 
          : truncateDescription(experience.description)

        return (
          <div key={experience.id}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{experience.position}</h3>
                        <p className="text-primary font-medium">{experience.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {experience.type}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {experience.workMode}
                        </Badge>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.startDate} - {experience.endDate}</span>
                        <span>·</span>
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {!compact && (
                      <div className="mb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {displayDescription}
                        </p>
                        {shouldTruncate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCard(experience.id)}
                            className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
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
                      </div>
                    )}

                    {/* Skills */}
                    {experience.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Achievements */}
                    {!compact && experience.achievements && experience.achievements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-sm text-foreground mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

// Compact version for homepage
export function CompactExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="space-y-3">
      {experiences.slice(0, 5).map((experience, index) => (
        <div
          key={experience.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{experience.position}</p>
            <p className="text-xs text-muted-foreground truncate">{experience.company}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {experience.startDate.split(' ')[1]} - {experience.endDate.split(' ')[1]}
          </div>
        </div>
      ))}
    </div>
  )
} 