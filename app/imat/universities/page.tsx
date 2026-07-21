"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeIn } from "@/components/animations/fade-in";
import {
  universities,
  criticalDeadlines,
  imatExamInfo,
  getRecommendationsByTier,
  getTierForScore,
  getUniversityBySlug,
  type University,
  type IMATScoreTier,
  type DeadlineUrgency,
} from "@/data/imat/universities";

const urgencyColor: Record<DeadlineUrgency, string> = {
  critical: "bg-red-500/10 text-red-600 border-red-500/20",
  high: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  passed: "bg-muted text-muted-foreground border-muted",
};

const tierColors: Record<IMATScoreTier, string> = {
  lower: "bg-green-500/10 text-green-600 border-green-500/20",
  mid: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  upper: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  elite: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

type FocusUniversity = {
  slug: string;
  shortName: string;
  cutoff2025: number;
  safeTarget2026: string;
  nonEuSeats: number;
  overallRating: number;
};

const WEEKS_UNTIL_EXAM = 11; // 21 Jul → 8 Oct 2026

function GapCard({
  uni,
  currentScore,
}: {
  uni: FocusUniversity;
  currentScore: number;
}) {
  const targetMin = parseFloat(uni.safeTarget2026.split("–")[0]);
  const gap = targetMin - currentScore;
  const gapPercent = ((currentScore / targetMin) * 100).toFixed(0);
  const weeklyPointsNeeded = (gap / WEEKS_UNTIL_EXAM).toFixed(1);
  const isInRange = currentScore >= targetMin;
  const isClose = gap > 0 && gap <= 10;

  return (
    <div
      className={`rounded-lg border p-4 ${
        isInRange
          ? "border-green-500/30 bg-green-500/5"
          : isClose
            ? "border-amber-500/30 bg-amber-500/5"
            : "border-red-500/20 bg-red-500/5"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-foreground text-sm">
            {uni.shortName}
          </h4>
          <p className="text-xs text-muted-foreground">
            {uni.nonEuSeats} seats · ⭐ {uni.overallRating.toFixed(1)}/5 overall
          </p>
        </div>
        <Badge
          variant="outline"
          className={
            isInRange
              ? "border-green-500 text-green-600"
              : isClose
                ? "border-amber-500 text-amber-600"
                : "border-red-500 text-red-600"
          }
        >
          {isInRange
            ? "IN RANGE ✓"
            : isClose
              ? "CLOSE"
              : `${gap.toFixed(0)} pts away`}
        </Badge>
      </div>

      {/* Score vs Cut-off visual bar */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Your score:{" "}
            <strong className="text-foreground">{currentScore}</strong>
          </span>
          <span>
            Target:{" "}
            <strong className="text-foreground">{uni.safeTarget2026}</strong>
          </span>
        </div>
        <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary"
            style={{
              width: `${Math.min(100, (currentScore / targetMin) * 100)}%`,
            }}
          />
          <div
            className="absolute inset-y-0 rounded-full bg-destructive/30"
            style={{
              left: `${Math.min(100, (currentScore / targetMin) * 100)}%`,
              width: `${Math.min(100, ((targetMin - currentScore) / targetMin) * 100)}%`,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{gapPercent}% of target</span>
          {gap > 0 && (
            <span className="text-destructive">
              Need +{weeklyPointsNeeded} pts/week
            </span>
          )}
        </div>
      </div>

      {/* 2025 cut-off */}
      <p className="text-xs text-muted-foreground">
        2025 cut-off was <strong>{uni.cutoff2025}</strong>
        {uni.cutoff2025 <= currentScore
          ? " — you'd have passed last year ✓"
          : ` — ${(uni.cutoff2025 - currentScore).toFixed(0)} pts above your current`}
      </p>
    </div>
  );
}

function ScoreBar({ value, max = 5 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <Progress value={pct} className="h-2 flex-1" />
      <span className="text-xs font-mono text-muted-foreground w-8 text-right">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function UniversityCard({ university }: { university: University }) {
  const [expanded, setExpanded] = useState(false);
  const u = university;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              #{u.rank}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {u.shortName}
              </h3>
              <p className="text-sm text-muted-foreground">{u.italianName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {u.location} · {u.region}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`text-lg font-bold px-3 py-1 ${
              u.ratings.overall >= 4
                ? "bg-green-500/10 text-green-600"
                : u.ratings.overall >= 3.5
                  ? "bg-blue-500/10 text-blue-600"
                  : u.ratings.overall >= 3
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-muted text-muted-foreground"
            }`}
          >
            {u.ratings.overall.toFixed(1)}
          </Badge>
        </div>

        {/* Key Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">2025 Cut-off</p>
            <p className="font-semibold text-foreground">
              {u.imatCutoff["2025"]}
            </p>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Non-EU Seats</p>
            <p className="font-semibold text-foreground">
              {u.nonEuSeatsProjection2026}
            </p>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Monthly Budget</p>
            <p className="font-semibold text-foreground">{u.monthlyBudget}</p>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">QS Med Rank</p>
            <p className="font-semibold text-foreground text-xs">
              {u.qsRankings.medicine || "N/A"}
            </p>
          </div>
        </div>

        {/* Verdict */}
        <p className="text-sm text-foreground mb-4 italic border-l-2 border-primary/30 pl-3">
          {u.verdict}
        </p>

        {/* Expand/Collapse */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-xs text-muted-foreground"
        >
          {expanded ? "▲ Show Less" : "▼ Show Details"}
        </Button>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-4 space-y-6 border-t pt-4"
          >
            {/* Ratings Breakdown */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Ratings Breakdown
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Admission Odds</span>
                  <ScoreBar value={u.ratings.admissionOdds.score} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Academic Reputation
                  </span>
                  <ScoreBar value={u.ratings.academicReputation.score} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Cost & Scholarships
                  </span>
                  <ScoreBar value={u.ratings.costAndScholarships.score} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Livability</span>
                  <ScoreBar value={u.ratings.livability.score} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Practicality</span>
                  <ScoreBar value={u.ratings.practicality.score} />
                </div>
              </div>
            </div>

            {/* Scholarship */}
            <div className="rounded-md bg-blue-500/5 border border-blue-500/20 p-3">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Scholarship
              </h4>
              <p className="text-sm text-muted-foreground">
                <strong>{u.scholarship.name}</strong> — {u.scholarship.benefits}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Deadline:{" "}
                <span className="font-semibold text-foreground">
                  {u.scholarship.deadline}
                </span>
              </p>
            </div>

            {/* Safety & Community */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Safety</h4>
                <p className="text-muted-foreground">{u.safety}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  International Community
                </h4>
                <p className="text-muted-foreground">
                  {u.internationalCommunity}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Part-time Work
                </h4>
                <p className="text-muted-foreground">{u.partTimeWork}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Crowding & Admin
                </h4>
                <p className="text-muted-foreground">{u.crowding}</p>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-600 mb-1">
                  Strengths
                </h4>
                <ul className="space-y-0.5">
                  {u.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
                      <span className="mt-0.5 text-green-500">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-600 mb-1">
                  Weaknesses
                </h4>
                <ul className="space-y-0.5">
                  {u.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
                      <span className="mt-0.5 text-red-500">✗</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function UniversitiesPage() {
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [scoreEstimate, setScoreEstimate] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rank" | "cutoff" | "rating">("rank");
  const [hardExamScore, setHardExamScore] = useState<string>("");
  const [easyMockScore, setEasyMockScore] = useState<string>("");
  const [focusSlugs, setFocusSlugs] = useState<string[]>([
    "federico-ii",
    "padova",
    "parma",
    "turin",
  ]);

  const toggleFocus = (slug: string) => {
    setFocusSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const currentBaseline = useMemo(() => {
    const hard = parseFloat(hardExamScore);
    const easy = parseFloat(easyMockScore);
    if (!isNaN(hard) && !isNaN(easy)) return Math.round((hard + easy) / 2);
    if (!isNaN(hard)) return hard;
    if (!isNaN(easy)) return easy;
    return 0;
  }, [hardExamScore, easyMockScore]);

  const focusUniversities: FocusUniversity[] = useMemo(() => {
    return focusSlugs
      .map((slug) => {
        const u = getUniversityBySlug(slug as any);
        if (!u) return null;
        return {
          slug: u.slug,
          shortName: u.shortName,
          cutoff2025: u.imatCutoff["2025"],
          safeTarget2026: u.imatCutoff.safeTarget2026,
          nonEuSeats: u.nonEuSeatsProjection2026,
          overallRating: u.ratings.overall,
        };
      })
      .filter(Boolean) as FocusUniversity[];
  }, [focusSlugs]);

  const sortedUniversities = useMemo(() => {
    const list = showOnlyOpen
      ? universities.filter((u) => u.slug === "messina" || u.slug === "catania")
      : [...universities];

    switch (sortBy) {
      case "cutoff":
        return list.sort((a, b) => a.imatCutoff["2025"] - b.imatCutoff["2025"]);
      case "rating":
        return list.sort((a, b) => b.ratings.overall - a.ratings.overall);
      default:
        return list.sort((a, b) => a.rank - b.rank);
    }
  }, [showOnlyOpen, sortBy]);

  const parsedScore = parseFloat(scoreEstimate);
  const recommendationTier = isNaN(parsedScore)
    ? null
    : getTierForScore(parsedScore);

  const recommendations = recommendationTier
    ? getRecommendationsByTier(recommendationTier)
    : [];

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8">
            <Link
              href="/imat"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
            >
              ← Back to IMAT Dashboard
            </Link>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-2">
              IMAT 2026 University Guide
            </h1>
            <p className="text-muted-foreground">
              Comprehensive comparison of all 16 Italian public universities
              offering English-taught Medicine & Surgery via IMAT 2026. Compiled
              18 July 2026.
            </p>
          </div>
        </FadeIn>

        {/* Critical Deadlines Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-red-500">⚠</span>
                Critical Deadlines — Act Now
              </CardTitle>
              <CardDescription>
                Today is 21 July 2026. Several application and scholarship
                deadlines are imminent or already passing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalDeadlines.map((d, i) => (
                <div
                  key={i}
                  className={`rounded-md border p-3 text-sm ${urgencyColor[d.urgency]}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{d.date}</p>
                      <p className="text-muted-foreground mt-0.5">
                        {d.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {d.universities.map((uni) => (
                          <Badge
                            key={uni}
                            variant="secondary"
                            className="text-xs"
                          >
                            {uni}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`shrink-0 uppercase text-xs ${
                        d.urgency === "critical"
                          ? "border-red-500 text-red-500"
                          : d.urgency === "high"
                            ? "border-amber-500 text-amber-500"
                            : ""
                      }`}
                    >
                      {d.urgency === "critical"
                        ? "⚠ CRITICAL"
                        : d.urgency === "high"
                          ? "HIGH"
                          : "UPCOMING"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* IMAT Exam Format Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">IMAT 2026 — Exam Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p>
                    <strong>Date:</strong> {imatExamInfo.examDate}
                  </p>
                  <p>
                    <strong>Format:</strong> {imatExamInfo.format}
                  </p>
                  <p>
                    <strong>Duration:</strong> {imatExamInfo.duration}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Fee:</strong> {imatExamInfo.fee}
                  </p>
                  <p>
                    <strong>Scoring:</strong> {imatExamInfo.scoring}
                  </p>
                  <p>
                    <strong>Registration:</strong> {imatExamInfo.registration}
                  </p>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Section</th>
                    <th className="text-center py-2 font-medium">Questions</th>
                    <th className="text-right py-2 font-medium">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {imatExamInfo.sections.map((s, i) => (
                    <tr key={i} className="border-b border-muted">
                      <td className="py-1.5">{s.section}</td>
                      <td className="text-center py-1.5">{s.questions}</td>
                      <td className="text-right py-1.5">{s.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-3">
                {imatExamInfo.note}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Profile & Gap Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-primary">🎯</span>
                My Profile & Gap Analysis
              </CardTitle>
              <CardDescription>
                Enter your practice scores and pick your target universities to
                see exactly how far you are from each cut-off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    Hard Exam Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    placeholder="e.g. 25"
                    value={hardExamScore}
                    onChange={(e) => setHardExamScore(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your score on a difficult IMAT practice paper
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    Medium/Easy Mock Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    placeholder="e.g. 25"
                    value={easyMockScore}
                    onChange={(e) => setEasyMockScore(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your score on a medium or easy difficulty mock
                  </p>
                </div>
              </div>

              {/* Baseline Display */}
              {currentBaseline > 0 && (
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="text-muted-foreground">
                    Current estimated baseline:{" "}
                    <strong className="text-foreground text-lg">
                      {currentBaseline}
                    </strong>
                    /90
                    <span className="text-xs ml-2 text-muted-foreground">
                      (average of your two scores)
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Exam: <strong>8 Oct 2026</strong> —{" "}
                    <strong>{WEEKS_UNTIL_EXAM} weeks</strong> to improve
                  </p>
                </div>
              )}

              {/* Focus University Picker */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Your Target Universities
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { slug: "federico-ii", label: "Federico II" },
                    { slug: "padova", label: "Padova" },
                    { slug: "parma", label: "Parma" },
                    { slug: "turin", label: "Turin" },
                    { slug: "messina", label: "Messina (backup)" },
                    { slug: "catania", label: "Catania (backup)" },
                    { slug: "bologna", label: "Bologna" },
                    { slug: "pavia", label: "Pavia" },
                    { slug: "milan-statale", label: "Milan Statale" },
                    { slug: "sapienza", label: "Sapienza" },
                    { slug: "tor-vergata", label: "Tor Vergata" },
                    { slug: "cagliari", label: "Cagliari" },
                    { slug: "vanvitelli", label: "Vanvitelli" },
                    { slug: "marche-polytechnic", label: "Marche Poly" },
                    { slug: "milan-bicocca", label: "Milan-Bicocca" },
                    { slug: "bari", label: "Bari" },
                  ].map((u) => (
                    <button
                      key={u.slug}
                      onClick={() => toggleFocus(u.slug)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                        focusSlugs.includes(u.slug)
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gap Analysis Results */}
              {currentBaseline > 0 && focusUniversities.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Your Score vs Target Universities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {focusUniversities.map((uni) => (
                      <GapCard
                        key={uni.slug}
                        uni={uni}
                        currentScore={currentBaseline}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Strategic Advice */}
              {currentBaseline > 0 && currentBaseline < 60 && (
                <div className="rounded-md bg-blue-500/5 border border-blue-500/20 p-4 text-sm">
                  <h4 className="font-semibold text-foreground mb-2">
                    📈 Study Strategy
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    At your current baseline of{" "}
                    <strong>{currentBaseline}/90</strong>, none of your target
                    universities are within range yet. But you have{" "}
                    <strong>{WEEKS_UNTIL_EXAM} weeks</strong> until the exam —
                    significant improvement is possible.
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        <strong>Priority:</strong> Biology (23 Qs, 38%) +
                        Chemistry (15 Qs, 25%) = 63% of the exam. Master these
                        two sections first.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        Target <strong>+3–4 points per week</strong> through
                        focused topic-by-topic study using the IMAT notes in
                        this site.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        <strong>Backup plan:</strong> Consider adding Messina
                        (cut-off 58.2, 56 seats, still open until 20 Jul) or
                        Catania (cut-off 61.6, 60 seats, open until 31 Jul) as
                        insurance.
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {currentBaseline > 0 && currentBaseline >= 60 && (
                <div className="rounded-md bg-green-500/5 border border-green-500/20 p-4 text-sm">
                  <h4 className="font-semibold text-foreground mb-2">
                    ✅ You're in striking distance
                  </h4>
                  <p className="text-muted-foreground">
                    With a baseline of <strong>{currentBaseline}/90</strong>,
                    you're competitive for some of your target universities.
                    Focus on shoring up weak topics and doing timed mock exams
                    to build speed.
                  </p>
                </div>
              )}

              {/* General score finder */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-foreground block mb-2">
                  Or try a different score:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="90"
                    placeholder="Estimate any IMAT score (0-90)"
                    value={scoreEstimate}
                    onChange={(e) => setScoreEstimate(e.target.value)}
                    className="flex h-10 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {recommendationTier && (
                    <Badge
                      variant="outline"
                      className={`text-sm px-3 py-1 ${tierColors[recommendationTier]}`}
                    >
                      {recommendationTier === "lower"
                        ? "Lower-tier (50-58)"
                        : recommendationTier === "mid"
                          ? "Mid-tier (60-66)"
                          : recommendationTier === "upper"
                            ? "Upper-tier (68-72)"
                            : "Elite-tier (73+)"}
                    </Badge>
                  )}
                </div>
                {recommendations.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Recommended for this score:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.map((u) => (
                        <Badge
                          key={u.slug}
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                        >
                          #{u.rank} {u.shortName} (cut-off{" "}
                          {u.imatCutoff["2025"]})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="rank">Rank</option>
              <option value="cutoff">Cut-off (lowest first)</option>
              <option value="rating">Overall Rating</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showOnlyOpen}
              onChange={(e) => setShowOnlyOpen(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            Applications still open
          </label>
        </motion.div>

        {/* University Grid */}
        <div className="space-y-4">
          {sortedUniversities.map((u, i) => (
            <motion.div
              key={u.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <UniversityCard university={u} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/imat"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to IMAT Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
