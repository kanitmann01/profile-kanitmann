"use client";

import { use } from "react";
import Link from "next/link";
import { subjects, topics, getNotesByTopic } from "@/data/imat/registry";
import type { Subject } from "@/data/imat/types";
import { useSpacedRepetition } from "@/hooks/use-spaced-repetition";
import { IMATBreadcrumb } from "@/components/imat/imat-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getConfidenceColor(confidence: string | undefined): string {
  switch (confidence) {
    case "strong":
      return "bg-green-500/20 text-green-700 border-green-500/30";
    case "ok":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
    case "weak":
      return "bg-red-500/20 text-red-700 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-600 border-gray-500/30";
  }
}

function getConfidenceLabel(confidence: string | undefined): string {
  switch (confidence) {
    case "strong":
      return "Strong";
    case "ok":
      return "OK";
    case "weak":
      return "Weak";
    default:
      return "Not started";
  }
}

export default function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject: subjectSlug, topic: topicSlug } = use(params);
  const { getProgress } = useSpacedRepetition();

  const subject = subjects.find((s) => s.slug === subjectSlug);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-5xl text-foreground mb-4">
            Not Found
          </h1>
          <p className="text-muted-foreground">
            The subject &quot;{subjectSlug}&quot; was not found.
          </p>
        </div>
      </div>
    );
  }

  const subjectTitle = subject.title;

  const topic = topics.find(
    (t) => t.subject === subjectSlug && t.slug === topicSlug
  );
  const topicTitle = topic?.title ?? formatSlug(topicSlug);

  const notes = getNotesByTopic(subjectSlug as Subject, topicSlug);

  const hasNotes = notes.length > 0;

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <IMATBreadcrumb
          items={[
            { label: subjectTitle, href: `/imat/${subjectSlug}` },
            { label: topicTitle },
          ]}
        />

        <h1 className="font-serif text-5xl text-foreground mb-4">
          {topicTitle}
        </h1>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>

        {!hasNotes && (
          <>
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Concept map will appear when notes are added
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No notes yet
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {hasNotes && (
          <div className="space-y-3">
            {notes.map((note) => {
              const progress = getProgress(note.slug);
              const confidence = progress?.confidence;
              return (
                <Link
                  key={note.slug}
                  href={`/imat/${subjectSlug}/${topicSlug}/${note.slug}`}
                  className="block"
                >
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardContent className="flex items-center justify-between p-4">
                      <span className="font-medium">{note.title}</span>
                      <Badge
                        variant="outline"
                        className={getConfidenceColor(confidence)}
                      >
                        {getConfidenceLabel(confidence)}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
