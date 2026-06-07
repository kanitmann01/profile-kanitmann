export function EchoEffectContent() {
  return (
    <>
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Executive Summary</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Abstract</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              This project employs the Synthetic Control Method to analyze the causal impact of World Trade Organization (WTO) accession on national economies. By constructing synthetic counterfactuals for countries that joined the WTO between 1995-2015, we aim to isolate and quantify the economic effects of trade liberalization policies, providing robust evidence for the &ldquo;echo effect&rdquo; of WTO membership on economic development trajectories.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Research Question</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              What is the causal impact of WTO accession on key economic indicators (GDP per capita, trade openness, foreign direct investment, and institutional quality) in member countries, and how do these effects vary across different regions and development levels?
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Key Research Objectives</h3>
            <div className="space-y-3">
              <p className="font-sans text-muted-foreground leading-relaxed">
                Quantify causal effects of WTO accession on economic outcomes. Analyze heterogeneous effects across regions and development levels. Provide robust evidence for trade liberalization policy impacts. Contribute to understanding of international trade policy effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Methodology</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Synthetic Control Method</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Constructs weighted combinations of control countries to create synthetic counterfactuals for treated countries. Based on Abadie et al. (2010), this method addresses fundamental problems of causal inference in observational studies by providing a data-driven approach to counterfactual construction.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Causal Inference</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Addresses fundamental problems in observational studies through data-driven counterfactual construction. Uses rigorous statistical methods to isolate the causal effect of WTO accession from other confounding factors and policy changes.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Robustness Analysis</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Comprehensive placebo tests and sensitivity analysis across different specifications. Multiple validation techniques including placebo tests, sensitivity analysis, and alternative model specifications to ensure result reliability.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Treatment Definition</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Treatment Variable</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">WTO accession (binary variable indicating membership)</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Treatment Period</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">Year of official WTO membership (1995-2015)</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Pre-treatment Period</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">10-15 years before accession for baseline establishment</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Post-treatment Period</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">10-15 years after accession for effect measurement</p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Data Sources & Variables</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">World Bank WDI</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Economic indicators including GDP per capita, trade (% of GDP), FDI, and other macroeconomic variables.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">WTO Accession Database</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Official accession dates and membership information.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Polity IV Project</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Democracy and governance indicators.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Penn World Tables</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Purchasing power parity and real income measures.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Sample Selection Criteria</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Treated Units</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">Countries that joined the WTO between 1995-2015</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Control Pool</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">Countries that never joined the WTO or joined after 2015</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Time Period</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">1980-2020 (40-year panel data)</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Data Requirements</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">Countries with at least 20 years of complete data</p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Outcome Variables</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Primary Outcomes</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Core economic indicators directly affected by trade liberalization policies: GDP per capita (constant 2015 US$), Trade as percentage of GDP, Foreign Direct Investment (net inflows % of GDP).
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Secondary Outcomes</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Broader development indicators that may be indirectly influenced by WTO membership: Institutional quality (Polity score), Economic complexity index, Human development index.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Expected Findings & Hypotheses</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Trade Effects</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Significant increase in trade openness following WTO accession, with expected 15-25% increase in trade-to-GDP ratio. Stronger effects in developing countries with higher initial trade barriers.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Economic Growth</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Accelerated GDP per capita growth in the post-accession period, with expected 0.5-1.5 percentage points annual growth acceleration. Larger effects in countries with complementary domestic reforms.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Institutional Quality</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Enhanced governance and regulatory quality, with improvement in Polity scores and regulatory indicators. Stronger effects in countries with initial institutional weaknesses.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">FDI Inflows</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Increased foreign direct investment following accession, with expected 20-40% increase in FDI as percentage of GDP. Larger effects in countries with significant market potential.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Implementation Plan</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Phase 1: Data Collection and Preparation (Weeks 1-2)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Download and clean all raw datasets from multiple sources. Create consistent country and time identifiers across datasets. Merge datasets into master panel structure with 40-year time series. Conduct initial data quality assessments and missing data analysis. Standardize variable definitions and units across sources.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Phase 2: Exploratory Analysis (Weeks 3-4)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Descriptive statistics and data visualization for all variables. Identification of suitable treated and control countries based on data availability. Preliminary trend analysis and pattern identification. Data completeness assessment and sample selection criteria. Initial correlation analysis between key variables.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Phase 3: Synthetic Control Analysis (Weeks 5-8)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Implement synthetic control algorithm for each treated country (1995-2015 joiners). Conduct placebo tests using countries that never joined the WTO. Generate treatment effect estimates with confidence intervals. Create visualizations of real vs. synthetic trajectories. Perform robustness checks with alternative specifications.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Phase 4: Results Synthesis and Reporting (Weeks 9-10)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Compile comprehensive results across all treated countries. Conduct meta-analysis of treatment effects by region and development level. Prepare final visualizations and summary tables. Write comprehensive technical report with methodology and findings. Create interactive dashboard for results exploration.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Success Criteria</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Methodological Standards</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Pre-treatment fit quality (RMSPE &lt; 0.5 for treated units). Successful placebo tests (treatment effects outside 95% confidence interval). Robustness across alternative specifications and time windows. Clear identification of synthetic control weights and donor countries.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Substantive Findings</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Statistically significant treatment effects on key economic outcomes. Plausible magnitude of effects consistent with economic theory. Heterogeneous effects that align with theoretical expectations. Robust results across different regions and development levels.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Reproducibility</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Complete code documentation and comprehensive comments. Clear data processing pipeline with automated scripts. Version-controlled project structure with detailed README. Step-by-step replication guide for independent verification.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Risk Assessment & Mitigation</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Data Quality Risks</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              High missingness in key variables (mitigation: multiple data sources, imputation techniques, sensitivity analysis). Inconsistent definitions across sources (mitigation: careful variable harmonization, expert consultation). Insufficient control countries for synthetic control (mitigation: alternative methods, expanded control pool, robustness checks).
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Methodological Risks</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Poor pre-treatment fit for synthetic controls (mitigation: alternative matching methods, sensitivity analysis). Confounding events coinciding with WTO accession (mitigation: event study analysis, robustness checks, expert consultation). Heterogeneous treatment effects across countries (mitigation: subgroup analysis, interaction terms, theoretical guidance).
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Deliverables</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Technical Outputs</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Master dataset: clean, merged panel dataset ready for analysis. Analysis scripts: reproducible Python code for all analyses. Synthetic control results: individual country analyses and meta-results. Interactive dashboard: web-based tool for exploring results.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Documentation</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Technical report: detailed methodology and results. Code documentation: comprehensive comments and README files. Data dictionary: complete variable definitions and sources. Replication guide: step-by-step instructions for reproducing results.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
