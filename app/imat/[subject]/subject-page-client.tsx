"use client";

import Link from "next/link";
import { useSpacedRepetition } from "@/hooks/use-spaced-repetition";
import { getNotesBySubject } from "@/data/imat/registry";
import type { SubjectMeta } from "@/data/imat/types";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SubjectPageClientProps {
  subject: SubjectMeta;
}

export function SubjectPageClient({ subject }: SubjectPageClientProps) {
  const { getStats } = useSpacedRepetition();
  const stats = getStats();

  const masteryPercent =
    stats.total > 0 ? Math.round((stats.strong / stats.total) * 100) : 0;

  const hasTopics = subject.topics.length > 0;

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="font-serif text-5xl text-foreground mb-4">
            {subject.title}
          </h1>
          <p className="text-muted-foreground">
            {subject.questionCount} questions, {subject.examWeight} of IMAT
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Mastery
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {masteryPercent}%
            </span>
          </div>
          <Progress value={masteryPercent} />
          <div className="flex gap-4 mt-2 font-mono text-xs text-muted-foreground">
            <span>{stats.weak} weak</span>
            <span>{stats.ok} ok</span>
            <span>{stats.strong} strong</span>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-serif text-2xl text-foreground mb-6">Topics</h2>
          {!hasTopics && (
            <p className="text-muted-foreground italic">No topics yet</p>
          )}
          {hasTopics && (
            <div className="grid gap-4">
              {subject.topics.map((topicSlug) => {
                const slug = topicSlug;
                const title = slug
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ");
                const notes = getNotesBySubject(subject.slug);
                const topicNotes = notes.filter((n) => n.topic === slug);

                return (
                  <Link
                    key={slug}
                    href={`/imat/${subject.slug}/${slug}`}
                    className="block"
                  >
                    <Card className="hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">
                            {title}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {topicNotes.length}{" "}
                            {topicNotes.length === 1 ? "note" : "notes"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
