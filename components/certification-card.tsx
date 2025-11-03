import { CalendarDays, CalendarClock, Award, ExternalLink } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Certification } from "@/data/certifications"

type CertificationCardProps = {
  certification: Certification
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})

function formatDate(dateString?: string) {
  if (!dateString) return undefined
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return undefined
  return DATE_FORMATTER.format(date)
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const issuedOn = formatDate(certification.issueDate)
  const expiresOn = formatDate(certification.expirationDate)

  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              {certification.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{certification.issuer}</p>
          </div>
          <Award className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {issuedOn ? (
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Issued {issuedOn}
            </span>
          ) : null}
          {expiresOn ? (
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              Expires {expiresOn}
            </span>
          ) : null}
          {certification.credentialId ? (
            <span className="inline-flex items-center gap-1">
              <span className="font-medium">ID:</span>
              <span>{certification.credentialId}</span>
            </span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {certification.skills && certification.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {certification.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}

        {certification.credentialUrl ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer">
              View Credential
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

