"use client"

import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GraduationSectionProps {
  heading: string
  degree: string
  degreeSubtitle: string
  university: string
  location: string
  graduationDate: string
  gpa: string
  narrative: string
  images: string[]
}

export function GraduationSection({
  heading,
  degree,
  degreeSubtitle,
  university,
  location,
  graduationDate,
  gpa,
  narrative,
  images,
}: GraduationSectionProps) {
  return (
    <section className="mb-20">
      <FadeIn>
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">{heading}</h2>
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-primary mb-1">{degree}</div>
            <div className="text-xl text-muted-foreground">{degreeSubtitle}</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              <span>{university}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{graduationDate}</span>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              GPA: {gpa}
            </Badge>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-muted/30 rounded-lg p-8 mb-10">
            <p className="text-muted-foreground leading-relaxed text-lg">{narrative}</p>
          </div>
        </FadeIn>

        {images.length > 0 && (
          <FadeIn delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((src, index) => (
                <ScaleOnHover key={src}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={src}
                      alt={`Graduation photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScaleOnHover>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
