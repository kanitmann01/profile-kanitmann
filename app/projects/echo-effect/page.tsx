import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Users, Target, TrendingUp, Database, BarChart3, Globe, BookOpen, AlertTriangle, CheckCircle, Clock, FileText, Code, ChartBar } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"

export default function EchoEffectCaseStudy() {
  const methodologies = [
    {
      title: "Synthetic Control Method",
      description: "Constructs weighted combinations of control countries to create synthetic counterfactuals for treated countries.",
      icon: BarChart3,
      details: "Based on Abadie et al. (2010), this method addresses fundamental problems of causal inference in observational studies by providing a data-driven approach to counterfactual construction."
    },
    {
      title: "Causal Inference",
      description: "Addresses fundamental problems in observational studies through data-driven counterfactual construction.",
      icon: Target,
      details: "Uses rigorous statistical methods to isolate the causal effect of WTO accession from other confounding factors and policy changes."
    },
    {
      title: "Robustness Analysis",
      description: "Comprehensive placebo tests and sensitivity analysis across different specifications.",
      icon: TrendingUp,
      details: "Multiple validation techniques including placebo tests, sensitivity analysis, and alternative model specifications to ensure result reliability."
    },
  ]

  const dataSources = [
    {
      name: "World Bank WDI",
      description: "Economic indicators including GDP per capita, trade (% of GDP), FDI, and other macroeconomic variables",
      category: "Economic Data",
      variables: ["GDP per capita", "Trade (% of GDP)", "FDI inflows", "Inflation", "Government spending"]
    },
    {
      name: "WTO Accession Database",
      description: "Official accession dates and membership information",
      category: "Institutional Data",
      variables: ["Accession dates", "Membership status", "Trade agreements", "Policy commitments"]
    },
    {
      name: "Polity IV Project",
      description: "Democracy and governance indicators",
      category: "Political Data",
      variables: ["Democracy score", "Institutional quality", "Regulatory framework", "Political stability"]
    },
    {
      name: "Penn World Tables",
      description: "Purchasing power parity and real income measures",
      category: "Economic Data",
      variables: ["PPP-adjusted GDP", "Real income measures", "Price levels", "Economic complexity"]
    },
  ]

  const outcomeVariables = [
    {
      category: "Primary Outcomes",
      variables: [
        "GDP per capita (constant 2015 US$)",
        "Trade as percentage of GDP",
        "Foreign Direct Investment (net inflows % of GDP)",
      ],
      description: "Core economic indicators directly affected by trade liberalization policies"
    },
    {
      category: "Secondary Outcomes",
      variables: [
        "Institutional quality (Polity score)",
        "Economic complexity index",
        "Human development index",
      ],
      description: "Broader development indicators that may be indirectly influenced by WTO membership"
    },
  ]

  const implementationPhases = [
    {
      phase: "Phase 1",
      title: "Data Collection and Preparation",
      duration: "Weeks 1-2",
      status: "In Progress",
      tasks: [
        "Download and clean all raw datasets from multiple sources",
        "Create consistent country and time identifiers across datasets",
        "Merge datasets into master panel structure with 40-year time series",
        "Conduct initial data quality assessments and missing data analysis",
        "Standardize variable definitions and units across sources"
      ],
      deliverables: ["Clean master dataset", "Data quality report", "Variable dictionary"]
    },
    {
      phase: "Phase 2",
      title: "Exploratory Analysis",
      duration: "Weeks 3-4",
      status: "Planned",
      tasks: [
        "Descriptive statistics and data visualization for all variables",
        "Identification of suitable treated and control countries based on data availability",
        "Preliminary trend analysis and pattern identification",
        "Data completeness assessment and sample selection criteria",
        "Initial correlation analysis between key variables"
      ],
      deliverables: ["Exploratory analysis report", "Sample selection criteria", "Preliminary visualizations"]
    },
    {
      phase: "Phase 3",
      title: "Synthetic Control Analysis",
      duration: "Weeks 5-8",
      status: "Planned",
      tasks: [
        "Implement synthetic control algorithm for each treated country (1995-2015 joiners)",
        "Conduct placebo tests using countries that never joined the WTO",
        "Generate treatment effect estimates with confidence intervals",
        "Create visualizations of real vs. synthetic trajectories",
        "Perform robustness checks with alternative specifications"
      ],
      deliverables: ["Individual country analyses", "Treatment effect estimates", "Robustness test results"]
    },
    {
      phase: "Phase 4",
      title: "Results Synthesis and Reporting",
      duration: "Weeks 9-10",
      status: "Planned",
      tasks: [
        "Compile comprehensive results across all treated countries",
        "Conduct meta-analysis of treatment effects by region and development level",
        "Prepare final visualizations and summary tables",
        "Write comprehensive technical report with methodology and findings",
        "Create interactive dashboard for results exploration"
      ],
      deliverables: ["Technical report", "Interactive dashboard", "Replication materials"]
    },
  ]

  const tools = [
    { name: "Python", category: "Programming Language", description: "Primary analysis language for data processing and statistical analysis" },
    { name: "pandas", category: "Data Manipulation", description: "Data manipulation and analysis for panel data structures" },
    { name: "numpy", category: "Numerical Computing", description: "Numerical computations and statistical functions" },
    { name: "matplotlib/seaborn", category: "Visualization", description: "Static data visualization for publication-quality figures" },
    { name: "pysyncon", category: "Synthetic Control", description: "Implementation of synthetic control method algorithms" },
    { name: "scipy", category: "Statistics", description: "Statistical functions and hypothesis testing" },
    { name: "plotly", category: "Interactive Viz", description: "Interactive visualizations for dashboard development" },
    { name: "Jupyter", category: "Development", description: "Interactive analysis and documentation environment" },
    { name: "Streamlit", category: "Dashboard", description: "Web-based interactive dashboard for results exploration" },
  ]

  const expectedFindings = [
    {
      category: "Trade Effects",
      hypothesis: "Significant increase in trade openness following WTO accession",
      expectedMagnitude: "15-25% increase in trade-to-GDP ratio",
      theoreticalBasis: "Trade liberalization policies reduce tariffs and non-tariff barriers",
      regionalVariation: "Stronger effects in developing countries with higher initial trade barriers"
    },
    {
      category: "Economic Growth",
      hypothesis: "Accelerated GDP per capita growth in the post-accession period",
      expectedMagnitude: "0.5-1.5 percentage points annual growth acceleration",
      theoreticalBasis: "Improved market access and efficiency gains from trade",
      regionalVariation: "Larger effects in countries with complementary domestic reforms"
    },
    {
      category: "Institutional Quality",
      hypothesis: "Enhanced governance and regulatory quality",
      expectedMagnitude: "Improvement in Polity scores and regulatory indicators",
      theoreticalBasis: "WTO membership requires institutional reforms and transparency",
      regionalVariation: "Stronger effects in countries with initial institutional weaknesses"
    },
    {
      category: "FDI Inflows",
      hypothesis: "Increased foreign direct investment following accession",
      expectedMagnitude: "20-40% increase in FDI as percentage of GDP",
      theoreticalBasis: "Improved investment climate and market access",
      regionalVariation: "Larger effects in countries with significant market potential"
    },
  ]

  const successCriteria = [
    {
      category: "Methodological Standards",
      criteria: [
        "Pre-treatment fit quality (RMSPE < 0.5 for treated units)",
        "Successful placebo tests (treatment effects outside 95% confidence interval)",
        "Robustness across alternative specifications and time windows",
        "Clear identification of synthetic control weights and donor countries"
      ]
    },
    {
      category: "Substantive Findings",
      criteria: [
        "Statistically significant treatment effects on key economic outcomes",
        "Plausible magnitude of effects consistent with economic theory",
        "Heterogeneous effects that align with theoretical expectations",
        "Robust results across different regions and development levels"
      ]
    },
    {
      category: "Reproducibility",
      criteria: [
        "Complete code documentation and comprehensive comments",
        "Clear data processing pipeline with automated scripts",
        "Version-controlled project structure with detailed README",
        "Step-by-step replication guide for independent verification"
      ]
    }
  ]

  const riskAssessment = [
    {
      category: "Data Quality Risks",
      risks: [
        {
          risk: "High missingness in key variables",
          probability: "Medium",
          impact: "High",
          mitigation: "Multiple data sources, imputation techniques, sensitivity analysis"
        },
        {
          risk: "Inconsistent definitions across sources",
          probability: "Low",
          impact: "Medium",
          mitigation: "Careful variable harmonization, expert consultation"
        },
        {
          risk: "Insufficient control countries for synthetic control",
          probability: "Low",
          impact: "High",
          mitigation: "Alternative methods, expanded control pool, robustness checks"
        }
      ]
    },
    {
      category: "Methodological Risks",
      risks: [
        {
          risk: "Poor pre-treatment fit for synthetic controls",
          probability: "Medium",
          impact: "High",
          mitigation: "Alternative matching methods, sensitivity analysis"
        },
        {
          risk: "Confounding events coinciding with WTO accession",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Event study analysis, robustness checks, expert consultation"
        },
        {
          risk: "Heterogeneous treatment effects across countries",
          probability: "High",
          impact: "Medium",
          mitigation: "Subgroup analysis, interaction terms, theoretical guidance"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-6">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
              
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  In Progress
                </Badge>
                <Badge variant="secondary">Research Project</Badge>
                <Badge variant="outline">Economics</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                The Echo Effect: WTO Accession Impact Analysis
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                A comprehensive research project analyzing the causal impact of World Trade Organization accession on national economies using advanced econometric methods and synthetic control methodology.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Button asChild>
                  <Link href="https://github.com/kanitmann01/The-Echo-Effect" target="_blank">
                    <Image src="/images/tech/github.svg" alt="GitHub" width={16} height={16} className="mr-2" />
                    View on GitHub
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Research in Progress</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="mb-8">
              <img
                src="/images/case-studies/echoeffect.jpg"
                alt="The Echo Effect: WTO Accession Impact Analysis"
                className="w-full rounded-lg shadow-lg mb-8"
                style={{ maxWidth: '800px', height: 'auto' }}
              />
            </div>
            
            <h2 className="text-3xl font-bold mb-8">Executive Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Abstract</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This project employs the Synthetic Control Method to analyze the causal impact of World Trade Organization (WTO) accession on national economies. By constructing synthetic counterfactuals for countries that joined the WTO between 1995-2015, we aim to isolate and quantify the economic effects of trade liberalization policies, providing robust evidence for the "echo effect" of WTO membership on economic development trajectories.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Research Question</h3>
                <p className="text-muted-foreground leading-relaxed">
                  What is the causal impact of WTO accession on key economic indicators (GDP per capita, trade openness, foreign direct investment, and institutional quality) in member countries, and how do these effects vary across different regions and development levels?
                </p>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Key Research Objectives</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Quantify causal effects of WTO accession on economic outcomes</span>
                </div>
                <div className="flex items-start gap-2">
                  <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Analyze heterogeneous effects across regions and development levels</span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Provide robust evidence for trade liberalization policy impacts</span>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Contribute to understanding of international trade policy effectiveness</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Methodology</h2>
            
            <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-8">
              {methodologies.map((method, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full">
                    <CardHeader>
                      <method.icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{method.description}</p>
                      <p className="text-sm text-muted-foreground">{method.details}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Treatment Definition</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Treatment Variable</h4>
                  <p className="text-sm text-muted-foreground">WTO accession (binary variable indicating membership)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Treatment Period</h4>
                  <p className="text-sm text-muted-foreground">Year of official WTO membership (1995-2015)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Pre-treatment Period</h4>
                  <p className="text-sm text-muted-foreground">10-15 years before accession for baseline establishment</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Post-treatment Period</h4>
                  <p className="text-sm text-muted-foreground">10-15 years after accession for effect measurement</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Data Sources & Variables</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {dataSources.map((source, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <Badge variant="outline">{source.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{source.description}</p>
                    <div className="space-y-1">
                      {source.variables.map((variable, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>{variable}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Sample Selection Criteria</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Treated Units</h4>
                  <p className="text-sm text-muted-foreground">Countries that joined the WTO between 1995-2015</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Control Pool</h4>
                  <p className="text-sm text-muted-foreground">Countries that never joined the WTO or joined after 2015</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Time Period</h4>
                  <p className="text-sm text-muted-foreground">1980-2020 (40-year panel data)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Requirements</h4>
                  <p className="text-sm text-muted-foreground">Countries with at least 20 years of complete data</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Outcome Variables */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Outcome Variables</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {outcomeVariables.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.variables.map((variable, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{variable}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Expected Findings */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Expected Findings & Hypotheses</h2>
            
            <div className="space-y-6">
              {expectedFindings.map((finding, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{finding.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Hypothesis</h4>
                        <p className="text-sm text-muted-foreground">{finding.hypothesis}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Expected Magnitude</h4>
                        <p className="text-sm text-muted-foreground">{finding.expectedMagnitude}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Theoretical Basis</h4>
                        <p className="text-sm text-muted-foreground">{finding.theoreticalBasis}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Regional Variation</h4>
                        <p className="text-sm text-muted-foreground">{finding.regionalVariation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Implementation Plan */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Implementation Plan</h2>
            
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                        <CardDescription>{phase.phase} • {phase.duration}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{phase.duration}</Badge>
                        <Badge 
                          variant={phase.status === "In Progress" ? "default" : "outline"}
                          className={phase.status === "In Progress" ? "bg-blue-500" : ""}
                        >
                          {phase.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Tasks</h4>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-sm text-muted-foreground">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Deliverables</h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tools and Technologies */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Tools and Technologies</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div>
                    <span className="font-medium">{tool.name}</span>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                </div>
              ))}
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Development Environment</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Primary Tools</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground">• Jupyter Notebooks for interactive analysis</li>
                    <li className="text-sm text-muted-foreground">• Git for version control and collaboration</li>
                    <li className="text-sm text-muted-foreground">• Streamlit for interactive dashboard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Storage</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground">• CSV/Excel for raw and processed data</li>
                    <li className="text-sm text-muted-foreground">• SQLite for large dataset management</li>
                    <li className="text-sm text-muted-foreground">• Cloud storage for backup and collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Success Criteria */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Success Criteria</h2>
            
            <div className="space-y-6">
              {successCriteria.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.criteria.map((criterion, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-muted-foreground">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Risk Assessment */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Risk Assessment & Mitigation</h2>
            
            <div className="space-y-6">
              {riskAssessment.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.risks.map((risk, idx) => (
                        <div key={idx} className="border-l-4 border-red-200 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <h4 className="font-medium">{risk.risk}</h4>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Probability: </span>
                              <Badge variant="outline" className="text-xs">{risk.probability}</Badge>
                            </div>
                            <div>
                              <span className="font-medium">Impact: </span>
                              <Badge variant="outline" className="text-xs">{risk.impact}</Badge>
                            </div>
                            <div>
                              <span className="font-medium">Mitigation: </span>
                              <span className="text-muted-foreground">{risk.mitigation}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Deliverables</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Outputs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Database className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Master Dataset: Clean, merged panel dataset ready for analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Code className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Analysis Scripts: Reproducible Python code for all analyses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Synthetic Control Results: Individual country analyses and meta-results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChartBar className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Interactive Dashboard: Web-based tool for exploring results</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Technical Report: Detailed methodology and results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Code className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Code Documentation: Comprehensive comments and README files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Database className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Data Dictionary: Complete variable definitions and sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Replication Guide: Step-by-step instructions for reproducing results</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Interested in this research?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Follow the project's progress and contribute to the analysis of WTO accession impacts on global economies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="https://github.com/kanitmann01/The-Echo-Effect" target="_blank">
                  <Image src="/images/tech/github.svg" alt="GitHub" width={16} height={16} className="mr-2" />
                  View on GitHub
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
} 