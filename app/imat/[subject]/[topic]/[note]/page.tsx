"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, AlertTriangle, Stethoscope } from "lucide-react";
import { getNoteBySlug } from "@/data/imat/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewSession } from "@/components/imat/review-session";
import { ReviewButtons } from "@/components/imat/review-buttons";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function NotePage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; note: string }>;
}) {
  const {
    subject: subjectSlug,
    topic: topicSlug,
    note: noteSlug,
  } = use(params);
  let note;
  try {
    note = getNoteBySlug(noteSlug);
  } catch {
    return (
      <div className="min-h-screen bg-background py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-5xl text-foreground mb-4">
            Not Found
          </h1>
          <p className="text-muted-foreground">
            The note &quot;{noteSlug}&quot; was not found.
          </p>
        </div>
      </div>
    );
  }

  const topicTitle = formatSlug(topicSlug);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href={`/imat/${subjectSlug}/${topicSlug}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to {topicTitle}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="font-serif text-4xl text-foreground mb-3">
            {note.title}
          </h1>
          <p className="text-lg text-muted-foreground">{note.summary}</p>
        </motion.div>

        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <Card className="border-indigo-500/30 bg-indigo-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-indigo-700 mb-1">
                    Memory Hook
                  </h2>
                  <p className="text-indigo-900/80 dark:text-indigo-200">
                    {note.memoryHook}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <article className="prose dark:prose-invert max-w-none">
            {note.explanation}
          </article>
        </motion.div>

        {note.diagram && (
          <motion.div
            custom={4}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <Card>
              <CardContent className="pt-6">
                {note.diagram.type === "svg" ? (
                  <div
                    className="flex justify-center"
                    dangerouslySetInnerHTML={{ __html: note.diagram.data }}
                  />
                ) : (
                  <pre className="text-sm overflow-x-auto">
                    {note.diagram.data}
                  </pre>
                )}
                {note.diagram.caption && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    {note.diagram.caption}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          custom={note.diagram ? 5 : 4}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-red-700 mb-1">IMAT Trap</h2>
                  <p className="text-red-900/80 dark:text-red-200">
                    {note.imatTrap}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={note.diagram ? 6 : 5}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Stethoscope className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-green-700 mb-1">
                    Why It Matters
                  </h2>
                  <p className="text-green-900/80 dark:text-green-200">
                    {note.whyItMatters}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {note.questions.length > 0 && (
          <motion.div
            custom={note.diagram ? 7 : 6}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Active Recall
            </h2>
            <ReviewSession questions={note.questions} slug={note.slug} />
          </motion.div>
        )}

        {note.crosslinks.length > 0 && (
          <motion.div
            custom={note.diagram ? 8 : 7}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Related Notes
            </h2>
            <div className="flex flex-wrap gap-2">
              {note.crosslinks.map((link) => (
                <Link
                  key={link}
                  href={`/imat/${subjectSlug}/${topicSlug}/${link}`}
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent transition-colors min-h-[32px] px-3 py-1"
                  >
                    {link}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          custom={note.diagram ? 9 : 8}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="font-serif text-2xl text-foreground mb-4">
            How confident are you?
          </h2>
          <ReviewButtons slug={note.slug} />
        </motion.div>
      </div>
    </div>
  );
}
