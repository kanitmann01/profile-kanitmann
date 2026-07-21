"use client";

import { use } from "react";
import { getNoteBySlug } from "@/data/imat/registry";
import { NoteChrome } from "@/components/imat/note-chrome";
import { NoteBody } from "@/components/imat/note-body";

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

  return (
    <NoteChrome
      note={note}
      subjectSlug={subjectSlug}
      topicSlug={topicSlug}
      noteSlug={noteSlug}
    >
      <NoteBody note={note} subjectSlug={subjectSlug} topicSlug={topicSlug} />
    </NoteChrome>
  );
}
