import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Kanit Mann",
  description:
    "Case studies and project write-ups from Kanit Mann: zero-day phishing URL classification, real-time streaming analytics, and cross-sector policy lakehouses — with accessibility tooling, measured outcomes, architecture deep dives, and honest retrospectives.",
  keywords: [
    "phishing URL classification",
    "streaming analytics",
    "policy lakehouse",
    "accessibility tooling",
    "data engineering projects",
    "machine learning",
    "Kanit Mann",
  ],
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
