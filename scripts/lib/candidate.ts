import type { Fable5MentionType, Fable5Tag } from "../../data/fable5";
import type { SeenSource } from "./seen";
import { normalizeUrl } from "./seen";

export type Fable5Candidate = {
  id: string;
  source: SeenSource;
  sourceUrl: string;
  demoUrl: string;
  author: string;
  submitter?: string;
  oneLiner: string;
  tags: Fable5Tag[];
  type: Fable5MentionType;
  notes?: string;
};

export type Fable5CandidateInput = Omit<Fable5Candidate, "id">;

export function buildCandidateId(input: Fable5CandidateInput): string {
  const key = normalizeUrl(input.sourceUrl);
  return `${input.source}:${key}`;
}

export function toCandidate(input: Fable5CandidateInput): Fable5Candidate {
  return { ...input, id: buildCandidateId(input) };
}
