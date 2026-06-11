import { getSubjectBySlug, subjects } from "@/data/imat/registry";
import type { Subject } from "@/data/imat/types";
import { notFound } from "next/navigation";
import { SubjectPageClient } from "./subject-page-client";

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  let subject;
  try {
    subject = getSubjectBySlug(subjectSlug as Subject);
  } catch {
    notFound();
  }

  return <SubjectPageClient subject={subject} />;
}
