import type { ReactNode } from "react";

export type Subject =
  | "biology"
  | "chemistry"
  | "physics"
  | "mathematics"
  | "logical-reasoning"
  | "general-knowledge";

export type QuestionType =
  | "multiple-choice"
  | "fill-blank"
  | "explain-why"
  | "true-false";

export type Difficulty = "recall" | "apply" | "analyze";

export type Confidence = "weak" | "ok" | "strong";

export type Rating = "forgot" | "fuzzy" | "nailed";

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  answer: string;
  explanation?: string;
  difficulty: Difficulty;
  options?: string[];
};

export type DiagramType = "svg" | "mermaid";

export type Diagram = {
  type: DiagramType;
  data: string;
  caption: string;
};

export type AtomicNote = {
  slug: string;
  subject: Subject;
  topic: string;
  title: string;
  summary: string;
  memoryHook: string;
  imatTrap: string;
  whyItMatters: string;
  explanation: ReactNode;
  diagram?: Diagram;
  questions: Question[];
  crosslinks: string[];
  prerequisites?: string[];
};

export type TopicMeta = {
  slug: string;
  subject: Subject;
  title: string;
  description: string;
  examWeight?: string;
};

export type SubjectMeta = {
  slug: Subject;
  title: string;
  description: string;
  examWeight: string;
  questionCount: number;
  topics: string[];
};
