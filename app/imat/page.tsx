"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap } from "lucide-react";
import { useSpacedRepetition } from "@/hooks/use-spaced-repetition";
import { subjects } from "@/data/imat/registry";
import type { Subject } from "@/data/imat/types";
import { FadeIn } from "@/components/animations/fade-in";

function parseWeight(w: string): number {
  return parseFloat(w.replace(/[^0-9.]/g, "")) || 0;
}

function CircularProgress({ value }: { value: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="8"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-foreground">
        {Math.round(value)}%
      </span>
    </div>
  );
}

export default function ImatDashboard() {
  const { progress, getDueNotes, getStreak, getStats, getRecentReviews } =
    useSpacedRepetition();

  const stats = getStats();
  const streak = getStreak();
  const recentReviews = getRecentReviews(7);
  const dueNotes = getDueNotes();

  const weeklyCount = recentReviews.reduce((sum, r) => sum + r.count, 0);
  const strongPct =
    stats.total > 0 ? Math.round((stats.strong / stats.total) * 100) : 0;

  const subjectProgress = useMemo(() => {
    return subjects.map((s) => {
      const subjectNotes = Object.values(progress).filter((p) =>
        p.noteSlug.startsWith(s.slug + "/")
      );
      const total = subjectNotes.length;
      const strong = subjectNotes.filter(
        (p) => p.confidence === "strong"
      ).length;
      const weak = subjectNotes.filter((p) => p.confidence === "weak").length;
      const pct = total > 0 ? Math.round((strong / total) * 100) : 0;
      return { ...s, total, strong, weak, pct };
    });
  }, [progress]);

  const overallReadiness = useMemo(() => {
    const totalWeight = subjectProgress.reduce(
      (s, sub) => s + parseWeight(sub.examWeight),
      0
    );
    if (totalWeight === 0) return 0;
    const weighted = subjectProgress.reduce(
      (sum, sub) => sum + sub.pct * (parseWeight(sub.examWeight) / totalWeight),
      0
    );
    return Math.round(weighted);
  }, [subjectProgress]);

  const priorityNotes = useMemo(() => {
    const now = new Date();
    return dueNotes
      .map((slug) => {
        const p = progress[slug];
        if (!p) return null;
        const subjectMatch = slug.split("/")[0] as Subject;
        const meta = subjects.find((s) => s.slug === subjectMatch);
        const weight = meta ? parseWeight(meta.examWeight) : 0;
        const overdueDays = Math.max(
          0,
          Math.floor(
            (now.getTime() - new Date(p.nextReviewDate).getTime()) / 86400000
          )
        );
        const weaknessMultiplier =
          p.confidence === "weak" ? 3 : p.confidence === "ok" ? 2 : 1;
        return {
          slug,
          score: weight * weaknessMultiplier * (overdueDays + 1),
          meta,
          progress: p,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score)
      .slice(0, 5) as {
      slug: string;
      score: number;
      meta: (typeof subjects)[0];
      progress: any;
    }[];
  }, [dueNotes, progress]);

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-serif text-5xl text-foreground mb-2">
              IMAT Dashboard
            </h1>
            <p className="text-muted-foreground">
              Spaced repetition & exam readiness
            </p>
          </div>
        </FadeIn>

        <motion.div
          data-testid="stats-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardContent className="flex flex-wrap gap-6 py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {weeklyCount}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  This Week
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {streak}-day
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Streak
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {strongPct}%
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Strong
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          data-testid="exam-readiness"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Readiness</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-8">
              <CircularProgress value={overallReadiness} />
              <p className="text-sm text-muted-foreground">
                Weighted across all subjects based on IMAT exam proportions.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          data-testid="subject-breakdown"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subject Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectProgress.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/imat/${sub.slug}`}
                  className="block no-underline"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {sub.title}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {sub.examWeight}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      {sub.weak > 0 && (
                        <span className="text-destructive">
                          {sub.weak} weak
                        </span>
                      )}
                      <span>{sub.pct}%</span>
                    </div>
                  </div>
                  <Progress value={sub.pct} className="h-2" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          data-testid="priority-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Priority Actions</CardTitle>
            </CardHeader>
            <CardContent>
              {priorityNotes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  You&apos;re caught up! No reviews due.
                </p>
              ) : (
                <div className="space-y-3">
                  {priorityNotes.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {item.slug}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.meta?.title} · {item.progress.confidence}
                        </p>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/imat/${item.slug}`}>Start Review</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          data-testid="quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/imat/universities">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  University Guide
                </Link>
              </Button>
              <Button variant="outline">Random Quiz</Button>
              <Button variant="outline">Weak Topics</Button>
              <Button variant="outline">New Content</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
