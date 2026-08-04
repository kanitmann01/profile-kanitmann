export type ProjectStatus = "Live" | "Completed" | "In Progress";

/**
 * One quantified result in a case study's outcome strip.
 * `value` carries the headline number ("~96%", "-30%"), `context` explains
 * how it was measured and why it matters.
 */
export type ProjectMetric = {
  label: string;
  value: string;
  context: string;
};

/**
 * Metric-led case-study schema (Exp 14). Rendered by CaseStudyContent in a
 * fixed order: problem → approach → outcome metrics → pipeline diagram →
 * evaluation → retrospective. `pipelineDiagram` is Mermaid source, rendered
 * to a static SVG at build time (no client JS for the diagram).
 */
export type CaseStudy = {
  problem: string;
  approach: string[];
  outcome: ProjectMetric[];
  pipelineDiagram: string;
  evaluation?: string;
  retrospective: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  github?: string;
  demo?: string;
  status?: ProjectStatus;
  live?: boolean;
  period: string;
  order: number;
  lastUpdated: string;
  featuredOnHome?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "netstar",
    title: "Zero-Day Phishing Threat Intelligence Platform",
    description:
      "Enterprise-grade automated threat intelligence platform combining a FastText NLP classifier, structured ML models, and algorithmic distance rules to identify deceptive URLs and brand spoofing for client security teams at NetSTAR Global.",
    image: "/images/case-studies/netstar.png",
    tags: ["FastText", "XGBoost", "LightGBM", "Docker", "Power BI", "SQL"],
    href: "/projects/netstar",
    status: "Completed",
    period: "Jan 2026 – May 2026",
    order: 202601,
    lastUpdated: "2026-05-01",
    featuredOnHome: true,
    caseStudy: {
      problem:
        "Client security teams were drowning in zero-day phishing URLs. Attackers rotate domains faster than blocklist-based tools can react, and brand spoofing sites often evade signature detection entirely — forcing analysts to triage deceptive links by hand. NetSTAR needed a platform that could score a URL as a potential zero-day threat in near real time and feed that signal into a dashboard their security teams actually watched.",
      approach: [
        "Built a hybrid detection architecture instead of betting on a single model: a FastText NLP classifier for URL semantics, structured ML models over hand-engineered features, and algorithmic distance rules to catch brand-spoofing variants.",
        "Analyzed 1B+ phishing URLs with SQL to train and validate the ensemble (XGBoost, LightGBM, Random Forest, Logistic Regression) against real threat telemetry rather than synthetic samples.",
        "Integrated the NetSTAR and PhishStats APIs so zero-day evaluations are dynamically enriched with fresh threat context instead of relying on a static corpus.",
        "Orchestrated the whole platform in a containerized environment (Docker) so the pipeline and its Power BI telemetry layer deploy identically across client environments.",
        "Quantized the FastText classifier to int8 (per-row scale) and shipped it as an edge endpoint (POST /api/classify), so the model itself is testable live from a browser — the demo on this page runs that exact artifact.",
      ],
      outcome: [
        {
          label: "Detection accuracy",
          value: "~96%",
          context:
            "on zero-day phishing threats with the ML ensemble (XGBoost, LightGBM, Random Forest, Logistic Regression)",
        },
        {
          label: "URLs analyzed",
          value: "1B+",
          context:
            "phishing URLs processed through SQL pipelines to train models and drive live telemetry",
        },
        {
          label: "Response mode",
          value: "Real-time",
          context:
            "containerized pipeline feeding a live Power BI dashboard for enterprise client security teams",
        },
      ],
      pipelineDiagram: `flowchart LR
  subgraph IN["Threat Sources"]
    A["NetSTAR API"]
    B["PhishStats API"]
  end
  IN --> C["SQL Pipeline<br/>1B+ URLs"]
  C --> D["FastText NLP Classifier"]
  C --> E["Structured ML Ensemble<br/>XGBoost / LightGBM / RF / LR"]
  D --> F["Algorithmic Distance Rules"]
  E --> F
  F --> G["Zero-Day Threat Score"]
  G --> H["Power BI Telemetry<br/>Docker-orchestrated"]
  subgraph DEMO["Live Demo — this page"]
    I["Browser URL input"] --> J["Edge inference<br/>int8 FastText<br/>POST /api/classify"]
    J --> K["Verdict + confidence + latency"]
  end
  D --> J`,
      evaluation:
        "The ~96% accuracy figure comes from evaluating the ensemble against held-out zero-day phishing samples during training. The strongest gains came from the hybrid combination: FastText caught semantically deceptive URLs that structured models missed, while distance rules closed the gap on domain typo-squatting that neither model was explicitly trained on. The live demo on this page runs the FastText component retrained from the same corpus and measured on the deployed artifact: 96.7% accuracy, 94.1% phishing recall, and 99.3% precision on a held-out 4,409-URL split (stratified by class, unseen during training). The int16 quantization that lets the model run on the edge costs nothing measurable in accuracy — you are interacting with the deployed artifact, not a screenshot of it. It is still a URL-text-only model: it sees structure and brand tokens, never page content, so treat edge cases as signals, not verdicts.",
      retrospective:
        "I would instrument the pipeline with explicit offline evaluation harnesses earlier. Accuracy on zero-day samples was measured retrospectively rather than continuously, which made it harder to prove which component contributed each gain. I would also push harder on explainability artifacts — security teams trust a verdict more when they can see the rule or feature that triggered it, and that would have shortened the path from detection to analyst action.",
    },
  },
  {
    slug: "unified-bharat",
    title: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse",
    description:
      "Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis of Indian state-level policy outcomes.",
    image: "/images/case-studies/unified-bharat.png",
    tags: [
      "Python",
      "Apache Spark",
      "Apache Iceberg",
      "Docker",
      "PySpark",
      "Panel Regression",
    ],
    href: "/projects/unified-bharat",
    github: "https://github.com/kanitmann01/unified-bharat",
    status: "Completed",
    period: "May 2026",
    order: 202605,
    lastUpdated: "2026-05-01",
    featuredOnHome: true,
    caseStudy: {
      problem:
        "Indian state policy outcomes are scattered across ministry silos: CSR spending lives in Ministry of Corporate Affairs filings, groundwater quality in Jal Shakti station measurements, and educational capacity in Ministry of Education data. Each dataset uses different identifiers, granularities, and quality standards, so asking whether state-level CSR spending associates with groundwater outcomes requires assembling and reconciling them by hand.",
      approach: [
        "Ingested five government sources — CSR spending (28,834 rows), groundwater quality (188,209 rows), educational institutions (2,141 rows), LGD master codes, and population estimates — into a raw Bronze layer.",
        "Applied a Medallion architecture on Apache Iceberg (Bronze → Silver → Gold) with PySpark on Docker, aggregating to state-year granularity and filtering for quality.",
        "Assembled a unified panel of ~300 rows with derived features (lagged CSR spending, per-capita normalizations, a 0–4 contamination index) for two-way fixed-effects regression.",
        "Benchmarked OLS against Random Forest and XGBoost with 5-fold cross-validation instead of trusting a single model family.",
      ],
      outcome: [
        {
          label: "Data reduction",
          value: "99.88%",
          context:
            "245K+ raw rows distilled to ~300 unified panel rows through intentional aggregation and quality filtering",
        },
        {
          label: "Best model",
          value: "RMSE 0.811",
          context:
            "Random Forest beat OLS and XGBoost on 5-fold CV — evidence of non-linear CSR–environment relationships",
        },
        {
          label: "Top predictor",
          value: "51%",
          context:
            "monitoring-station count, with lagged CSR spending at 21% and institutional capacity at 18.8%",
        },
      ],
      pipelineDiagram: `flowchart LR
  subgraph BR["Bronze Layer — Raw Ingestion"]
    A["CSR Spending<br/>28,834 rows"]
    B["Groundwater Quality<br/>188,209 rows"]
    C["Education Institutions<br/>2,141 rows"]
  end
  BR --> D["Silver Layer<br/>Cleaning + State-Year Aggregation"]
  D --> E["Gold Layer<br/>Unified Panel ~300 rows"]
  E --> F["Spark Panel Regression</br>OLS / RF / XGBoost"]
  F --> G["Policy Insights"]`,
      evaluation:
        "Random Forest's win over OLS (RMSE 0.811 on 5-fold CV) is the key finding: it suggests the relationship between CSR spending and environmental outcomes is non-linear, which a textbook fixed-effects specification would miss. Feature importance is best read as correlation given the observational design — monitoring-station count (51%) likely proxies enforcement intensity as much as monitoring itself.",
      retrospective:
        "The lakehouse was over-engineered for the final dataset — 99.88% reduction means most of the infrastructure existed to shrink a problem that a few well-written pandas pipelines could have handled. The Iceberg layer did pay off for reproducibility, but I would right-size the stack to the analysis earlier. I would also add explicit causal framing from day one: the panel answers association questions cleanly, but difference-in-differences would have taken the policy claim further.",
    },
  },
  {
    slug: "twitch-analytics-pipeline",
    title: "Real-Time Twitch Analytics Pipeline",
    description:
      "End-to-end ELT streaming pipeline that ingests real-time Twitch viewership data through Apache Kafka, warehouses in Snowflake, and transforms with dbt for Looker Studio dashboards.",
    image: "/images/case-studies/twitch-analytics.png",
    tags: [
      "Python",
      "Apache Kafka",
      "Snowflake",
      "dbt",
      "Looker Studio",
      "ELT",
    ],
    href: "/projects/twitch-analytics-pipeline",
    github: "https://github.com/kanitmann01/twitch_stat_board",
    demo: "https://lookerstudio.google.com/s/jyb_uKEUcmo",
    status: "Completed",
    period: "January 2026",
    order: 202601,
    lastUpdated: "2026-01-01",
    featuredOnHome: true,
  },
  {
    slug: "college-major-shift-analysis",
    title: "College Major Selection & Shift Analysis",
    description:
      "Longitudinal analysis of IPUMS USA microdata to understand how wage trends influence shifts in U.S. college major popularity from 2009–2023.",
    image: "/major-img.png",
    tags: ["Python", "Pandas", "Seaborn", "Data Storytelling"],
    href: "/projects/college-major-shift-analysis",
    github: "https://github.com/kanitmann01/college-major-shift-analysis",
    status: "Completed",
    period: "September 2025",
    order: 202509,
    lastUpdated: "2025-09-01",
  },
  {
    slug: "echo-effect",
    title: "The Echo Effect: WTO Accession Impact Analysis",
    description:
      "Research project using Synthetic Control Method to analyze the causal impact of World Trade Organization accession on national economies.",
    image: "/images/case-studies/echoeffect.jpg",
    tags: ["Python", "Synthetic Control", "Economics", "Research"],
    href: "/projects/echo-effect",
    github: "https://github.com/kanitmann01/The-Echo-Effect",
    status: "In Progress",
    period: "July 2025",
    order: 202507,
    lastUpdated: "2025-07-01",
  },
  {
    slug: "titanic",
    title: "Titanic Survival Predictor Web App",
    description:
      "A fun and interactive web application that predicts whether you would have survived the Titanic disaster based on your passenger profile.",
    image: "/images/case-studies/titanic.jpeg",
    tags: ["Python", "Flask", "Scikit-learn", "Bootstrap"],
    href: "/projects/titanic",
    github: "https://github.com/kanitmann01/titanic_survivor_web_app",
    demo: "https://web-production-db6b.up.railway.app/",
    status: "Live",
    live: true,
    period: "March 2025",
    order: 202503,
    lastUpdated: "2025-03-01",
  },
  {
    slug: "voicebridge",
    title: "VoiceBridge - Real-Time P2P Translation",
    description:
      "Break language barriers with real-time speech translation using cutting-edge AI models for speech recognition, translation, and speech synthesis.",
    image: "/images/case-studies/voicebridge.jpeg",
    tags: ["Python", "Flask", "PyTorch", "Socket.IO"],
    href: "/projects/voicebridge",
    github: "https://github.com/kanitmann01/hackaz_team_wildhackers",
    status: "Completed",
    period: "February 2025",
    order: 202502,
    lastUpdated: "2025-02-01",
  },
  {
    slug: "ericsson",
    title: "Scale-Out Cloud Migration of 2,000+ Servers to GCP",
    description:
      "Led the team migration of Ericsson's Citrix virtual infrastructure — 2,000+ production servers — from on-prem to Google Cloud Platform, one of the company's largest public cloud modernization initiatives, with hardened hybrid security and automated database operations.",
    image: "/images/case-studies/ericsson.png",
    tags: [
      "Google Cloud Platform",
      "Citrix Workspace",
      "Citrix Virtual Apps",
      "Cloud Migration",
      "Database Management",
      "SQL",
    ],
    href: "/projects/ericsson",
    status: "Completed",
    period: "Feb 2023 – Dec 2024",
    order: 202412,
    lastUpdated: "2024-12-01",
    featuredOnHome: true,
    caseStudy: {
      problem:
        "Ericsson's Citrix virtual infrastructure ran on aging on-prem hardware with no clear path to scale. 2,000+ production servers were expensive to maintain, hard to resize, and a single point of failure for tool uptime. The company needed one of its largest public cloud modernization initiatives executed without disrupting the internal tools that global teams depended on daily.",
      approach: [
        "Ran discovery and assessment across the 2,000+ server estate to map dependencies before touching production, so migration batches could be planned around application affinity.",
        "Built the GCP landing zone first — networking, identity, and quotas — then executed a scale-out Citrix migration in waves rather than a big-bang cutover.",
        "Collaborated with security teams to harden the resulting hybrid cloud environment during migration, treating security as a migration track rather than a post-migration review.",
        "Automated database management workflows alongside the migration so post-cutover operations did not inherit the manual maintenance burden of the old estate.",
      ],
      outcome: [
        {
          label: "Infrastructure cost",
          value: "-30%",
          context:
            "estimated reduction after migrating 2,000+ production servers from on-prem to GCP",
        },
        {
          label: "Uptime SLA",
          value: "99.9%",
          context:
            "three nines on migrated tools, up from the prior on-prem reliability baseline",
        },
        {
          label: "Maintenance time",
          value: "-40%",
          context:
            "database management workflows automated, freeing roughly 8 hours per week for the team",
        },
      ],
      pipelineDiagram: `flowchart LR
  A["2,000+ On-Prem Servers"] --> B["Discovery & Assessment"]
  B --> C["GCP Landing Zone<br/>Network / IAM / Quotas"]
  C --> D["Citrix Scale-Out Migration<br/>Wave-based Cutover"]
  D --> E["Hybrid Cloud Hardening"]
  E --> F["99.9% Uptime Operations"]
  E --> G["Automated DB Workflows<br/>-40% Maintenance Time"]`,
      evaluation:
        "The 30% cost reduction is an estimate built from the difference between on-prem hosting costs (hardware refresh, power, licensing) and the GCP consumption plan post-migration; the 99.9% SLA is measured from tool availability after cutover. Both were tracked per wave during the migration, which is how the team could prove the program was working before the final waves landed.",
      retrospective:
        "I would have started the security hardening track even earlier. Collaborating with security teams mid-migration worked, but weaving their requirements into the landing zone from week one would have removed rework in later waves. I would also standardize the per-wave cost and uptime reporting into a single dashboard from the start — the numbers existed, but they lived in too many spreadsheets before I consolidated them.",
    },
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featuredOnHome
);
