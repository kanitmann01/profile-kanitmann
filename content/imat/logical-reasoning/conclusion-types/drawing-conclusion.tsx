import type { AtomicNote } from "@/data/imat/types";

const drawingConclusionNote: AtomicNote = {
  slug: "drawing-conclusion",
  subject: "logical-reasoning",
  topic: "conclusion-types",
  title: "Drawing a Conclusion",
  summary:
    "These questions ask what MUST be true based on the passage. The correct answer follows logically from the given information — it does not require outside knowledge or assumptions.",
  memoryHook:
    '"Must Be True, Not Could Be True" — the answer is not what might be true or is probably true, but what is GUARANTEED by the passage. If you need to add information, it is wrong.',
  imatTrap:
    "The most dangerous wrong answers are ones that are PLAUSIBLE but not necessarily true. Just because something seems likely does not mean it MUST follow. Stick strictly to what the passage guarantees.",
  whyItMatters:
    "In medicine, drawing valid conclusions from test results is critical. A positive screening test does not necessarily mean a patient has the disease — you must consider base rates and false positives.",
  explanation: (
    <div>
      <p>
        &quot;Drawing a conclusion&quot; questions present a set of facts or
        premises and ask what <strong>must logically follow</strong>. This is
        deductive reasoning at its core.
      </p>
      <h3>Rules for Drawing Conclusions</h3>
      <ul>
        <li>
          <strong>Stay within the passage:</strong> Only use information
          explicitly stated or necessarily implied.
        </li>
        <li>
          <strong>Avoid overreaching:</strong> &quot;Some&quot; does not mean
          &quot;all.&quot; &quot;Many&quot; does not mean &quot;most.&quot;
        </li>
        <li>
          <strong>Eliminate &quot;could be true&quot; answers:</strong> The
          correct answer must be <em>necessarily</em> true, not merely possible.
        </li>
        <li>
          <strong>Watch for extreme language:</strong> Answers with
          &quot;always,&quot; &quot;never,&quot; or &quot;all&quot; are often
          wrong unless the passage supports that certainty.
        </li>
      </ul>
      <h3>Valid Deductive Patterns</h3>
      <ul>
        <li>
          <strong>Modus ponens:</strong> If P then Q. P. Therefore Q.
        </li>
        <li>
          <strong>Modus tollens:</strong> If P then Q. Not Q. Therefore not P.
        </li>
        <li>
          <strong>Syllogism:</strong> All A are B. All B are C. Therefore all A
          are C.
        </li>
      </ul>
      <h3>Example</h3>
      <p>
        &quot;All IMAT candidates study biology. Maria is an IMAT
        candidate.&quot; → Conclusion: <strong>Maria studies biology.</strong>
      </p>
      <p>
        This <em>must</em> be true — it follows necessarily from the premises.
      </p>
    </div>
  ),
  questions: [
    {
      id: "drawing-conclusion-q1",
      type: "multiple-choice",
      prompt:
        "If all antibiotics target bacteria, and penicillin is an antibiotic, which MUST be true?",
      answer: "Penicillin targets bacteria",
      explanation:
        "This is a valid syllogism: All A (antibiotics) are B (target bacteria). Penicillin is A. Therefore penicillin is B.",
      difficulty: "recall",
      options: [
        "Penicillin targets bacteria",
        "All bacteria are killed by penicillin",
        "Penicillin is the best antibiotic",
        "Bacteria cannot resist penicillin",
      ],
    },
    {
      id: "drawing-conclusion-q2",
      type: "multiple-choice",
      prompt:
        'Given: "Some doctors specialise in cardiology. All cardiologists complete a fellowship." Which MUST be true?',
      answer: "Some doctors complete a fellowship",
      explanation:
        "Since some doctors are cardiologists, and all cardiologists complete fellowships, those doctors must complete fellowships. We cannot conclude ALL doctors complete fellowships.",
      difficulty: "apply",
      options: [
        "All doctors complete a fellowship",
        "Some doctors complete a fellowship",
        "No general practitioner has completed a fellowship",
        "All fellowship graduates are cardiologists",
      ],
    },
    {
      id: "drawing-conclusion-q3",
      type: "explain-why",
      prompt:
        'Explain why "If it rains, the ground is wet. The ground is wet. Therefore it rained" is invalid reasoning.',
      answer:
        "This is the fallacy of affirming the consequent. The ground could be wet for other reasons (sprinklers, dew). The valid form is modus ponens: If P then Q, P, therefore Q — not: If P then Q, Q, therefore P.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["main-conclusion", "assumptions", "reasoning-errors"],
  prerequisites: ["main-conclusion", "premises"],
};

export default drawingConclusionNote;
