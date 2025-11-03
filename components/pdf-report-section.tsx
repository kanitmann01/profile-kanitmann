"use client"

import { useMemo, type ReactNode } from "react"
import { Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useIsMobile } from "@/components/ui/use-mobile"
import { cn } from "@/lib/utils"

type PdfReportSectionProps = {
  title: string
  description?: string
  /** Absolute or relative URL to the PDF asset */
  pdfUrl: string
  /** Optional filename override when downloading */
  downloadFileName?: string
  /** Override the default download button label */
  downloadLabel?: string
  /** Optional secondary actions (e.g., buttons) */
  actions?: ReactNode
  className?: string
  children?: ReactNode
  /** Aspect ratio for the embedded viewer (defaults to 4/3) */
  ratio?: number
}

export function PdfReportSection({
  title,
  description,
  pdfUrl,
  downloadFileName,
  downloadLabel = "Download PDF",
  actions,
  className,
  children,
  ratio = 4 / 3,
}: PdfReportSectionProps) {
  const isMobile = useIsMobile()

  const downloadAttributes = useMemo(() => {
    if (!downloadFileName) return { download: undefined }
    return { download: downloadFileName }
  }, [downloadFileName])

  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
          {description ? <p className="text-muted-foreground text-base leading-relaxed">{description}</p> : null}
          {children ? <div className="text-sm sm:text-base text-muted-foreground">{children}</div> : null}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:shrink-0">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" /> View PDF
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
          >
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" {...downloadAttributes}>
              <Download className="mr-2 h-4 w-4" /> {downloadLabel}
            </a>
          </Button>
          {actions}
        </div>
      </div>

      {isMobile ? (
        <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-primary-foreground/80 dark:text-primary-foreground/90">
          <p className="font-medium text-primary-foreground/90">PDF preview is best on larger screens.</p>
          <p className="mt-1 text-muted-foreground">
            Use the buttons above to open or download the report. This keeps the page lightweight on mobile connections.
          </p>
        </div>
      ) : (
        <AspectRatio
          ratio={ratio}
          className="w-full overflow-hidden rounded-lg border bg-muted/30 shadow-sm"
        >
          <iframe
            src={`${pdfUrl}#view=FitH`}
            className="h-full w-full"
            title={title}
            loading="lazy"
          />
        </AspectRatio>
      )}
    </section>
  )
}

