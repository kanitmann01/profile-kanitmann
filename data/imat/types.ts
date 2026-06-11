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
  /** Year this question appeared in IMAT (for pattern tracking) */
  imatYear?: number;
};

export type DiagramType = "svg" | "mermaid";

export type Diagram = {
  type: DiagramType;
  data: string;
  caption: string;
};

export type EquationDef = {
  id: string;
  latex: string;
  description?: string;
  variables?: string;
};

export type IMATFrequency = "high" | "medium" | "low";

export type IMATPattern = {
  years: number[];
  frequency: IMATFrequency;
  notes?: string;
};

export type WorkedExample = {
  id: string;
  question: string;
  hints: string[];
  solution: string;
  equations?: string[];
  imatYear?: number;
};

export type ResourceType =
  | "video"
  | "article"
  | "practice"
  | "textbook"
  | "simulation"
  | "past-paper";

export type ResourceLink = {
  title: string;
  url: string;
  type: ResourceType;
  description?: string;
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
  /** KaTeX equations for practice mode */
  equations?: EquationDef[];
  /** IMAT exam appearance patterns */
  imatPatterns?: IMATPattern[];
  /** Step-by-step worked examples */
  workedExamples?: WorkedExample[];
  /** Curated external resources */
  externalResources?: ResourceLink[];
  /** High-yield summary for last-minute revision */
  highYieldPoints?: string[];
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
