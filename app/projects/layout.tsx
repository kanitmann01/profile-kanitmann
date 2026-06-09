import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Kanit Mann",
  alternates: { canonical: "/projects" },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
