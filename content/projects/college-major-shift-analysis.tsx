import { PdfReportSection } from "@/components/pdf-report-section"

export function CollegeMajorShiftAnalysisContent() {
  return (
    <>
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Research Focus</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Which majors gained and lost traction?</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Ranked the top majors by graduate counts over time, highlighting growing domains like Computer Engineering
              and Psychology versus declines in General Business.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Do wage signals precede popularity shifts?</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Tracked median wages and wage growth to see how compensation correlates with enrollment changes,
              revealing strong alignment for high-growth technical majors.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">What broader socio-economic patterns emerge?</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Connected trends to cultural and policy factors-e.g., psychology and biology growth alongside increased
              focus on healthcare and mental health services.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Data Pipeline</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">IPUMS USA Extraction</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Filtered ACS microdata (2009–2024) for employed bachelor-degree holders with valid wages, respecting
              IPUMS weighting guidance and omitting anomalous 2020 data.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Weighted Aggregation</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Applied person-level weights (`PERWT`) to compute nationally representative graduate counts and
              median wage benchmarks per major and year.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Visualization & Storytelling</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Built time-series and slope charts with Seaborn/Matplotlib, layering annotations to narrate how
              compensation, policy, and student preference intersect.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Key Insights</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Wage growth and enrollment move in sync</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Computer Engineering majors enjoyed ~40% wage growth while adding thousands of graduates, suggesting
              compensation remains a pivotal decision factor for STEM-bound students.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Accounting&rsquo;s durable appeal</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Despite turbulence in other business tracks, Accounting expanded its graduate share by 16.6%, pairing
              steady wage growth with resilient employer demand.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Cultural shifts influence STEM vs. social sciences</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Psychology and Biology growth tracks broader interest in health, wellness, and public sector careers,
              balancing out declines in generalist business programs.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <PdfReportSection
          title="Full Analysis (PDF)"
          description="Detailed report containing methodology, visualizations, and policy takeaways. Mobile users can open or download using the buttons."
          pdfUrl="/Major%20Analysis.pdf"
          downloadLabel="Download Analysis PDF"
          downloadFileName="Major Analysis.pdf"
        />
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Next Steps</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Causal inference opportunities</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Extend the analysis with lag models or difference-in-differences to better isolate whether wage changes
              precede enrollment shifts or follow demand signals.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Equity deep dive</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Segment by gender and race to surface representation gaps and ensure wage gains are equitably
              distributed across demographic cohorts.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Program planning partnerships</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Package recommendations for university leaders to align curriculum investments with verified demand,
              especially in high-growth engineering and health tracks.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
