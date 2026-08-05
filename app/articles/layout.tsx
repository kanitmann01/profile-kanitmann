import type { Metadata } from "next";

/**
 * /articles is a client component with no metadata export, so it gets its
 * metadata from this layout: keyword-rich title/description plus a canonical
 * so the hub page can be indexed after the domain migration.
 */
export const metadata: Metadata = {
  title: "Articles — Kanit Mann",
  description:
    "Case studies, deep dives, and technical notes on machine learning, data engineering, and AI-assisted development from Kanit Mann.",
  keywords: [
    "case studies",
    "deep dives",
    "machine learning",
    "data engineering",
    "AI-assisted development",
    "data science",
    "Kanit Mann",
  ],
  alternates: { canonical: "/articles" },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
