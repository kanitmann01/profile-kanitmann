/**
 * Content for the /now page (build-time static).
 *
 * "Currently building" and "Reading" are free text — edit this file directly.
 * "Available for" mirrors the site's hero/contact positioning. The page's
 * "Last updated" timestamp is stamped at build time, not stored here.
 */
export type NowReading = {
  title: string;
  author?: string;
  url?: string;
};

export const now = {
  currentlyBuilding: [
    "An agent-native surface for this site: llms.txt, llms-full.txt, a .well-known/agent.json manifest, and machine-readable JSON snapshots of projects and articles.",
    "Data and ML projects in Python, PySpark, and SQL — streaming analytics pipelines, policy analytics lakehouses, and threat-intelligence classification.",
  ],
  reading: [
    {
      title:
        "Synthetic Control Method literature for causal inference in policy analysis",
    },
    {
      title: "Streaming data architecture and Apache Kafka + dbt patterns",
    },
    {
      title: "Agent workflows: how LLMs consume machine-readable web surfaces",
    },
  ],
  availableFor:
    "Full-time Data, ML & AI engineering roles — and open to contract and consulting engagements.",
} as const;
