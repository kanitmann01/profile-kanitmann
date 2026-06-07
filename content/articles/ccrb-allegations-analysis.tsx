import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Layers, LineChart } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { PdfReportSection } from "@/components/pdf-report-section"
import { getArticleBySlug } from "@/data/articles"

const article = getArticleBySlug("ccrb-allegations-analysis")

const weeklyReports = [
  {
    week: 1,
    title: "Week 1 - Baseline Exploration and Data Familiarization",
    publishedAt: article.publishedAt,
    pdfPath: "/CCRB%20Allegations%20Analysis.pdf",
    summary:
      "Initial sweep across complaint categories, officer counts, temporal trends, and borough-level patterns, establishing a baseline for deeper analysis.",
  },
]

export function CCRBAllegationsAnalysisContent() {
  return (
    <>
      <section className="mb-16">
        <SlideIn direction="left">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Week 1 Focus</h3>
                    <p className="text-muted-foreground">
                      Data familiarization, cleaning notes, and initial descriptive visual checks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Layers className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Dimensions Explored</h3>
                    <p className="text-muted-foreground">
                      Complaint categories, officers, time trends, borough-level patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <LineChart className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Next Steps</h3>
                    <p className="text-muted-foreground">
                      Normalization, officer-level cohorts, allegation types × outcomes, borough cohorts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <FadeIn>
          <PdfReportSection
            title="Week 1 Report (PDF)"
            description="Embedded below. You can also download it to view offline."
            pdfUrl={weeklyReports[0].pdfPath}
            downloadLabel="Download Week 1 PDF"
          >
            This baseline report captures the initial exploratory analysis and notes open questions that guide the next phase.
          </PdfReportSection>
        </FadeIn>
      </section>

      <section className="mb-16">
        <FadeIn>
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Week 1 Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              The CCRB dataset is wide, with allegation-level information connected to officers and complainants. Baseline exploration focused on understanding allegation types, borough concentration, and officer counts to identify where normalization and derived metrics will be most useful.
            </p>
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              <StaggerItem>
                <ScaleOnHover>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Complaint Categories</h3>
                      <p className="text-muted-foreground text-sm">
                        Force, abuse of authority, and discourtesy dominate historical complaints. Force is trending downward, but discourtesy rises in recent years.
                      </p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
              <StaggerItem>
                <ScaleOnHover>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Officer Ratios</h3>
                      <p className="text-muted-foreground text-sm">
                        A small cohort of officers accrue 10+ allegations. Highlighting repeat officers is a priority for Phase 2.
                      </p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
              <StaggerItem>
                <ScaleOnHover>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Temporal Trends</h3>
                      <p className="text-muted-foreground text-sm">
                        Complaints decline after 2014 reforms but spike during periods of civil unrest. A rolling 12-month view smooths seasonal noise.
                      </p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
              <StaggerItem>
                <ScaleOnHover>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Borough Distribution</h3>
                      <p className="text-muted-foreground text-sm">
                        Brooklyn and the Bronx account for more than half the complaints. Future analysis normalizes by population to contextualize volume.
                      </p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </FadeIn>
      </section>

      <footer className="border-t pt-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
