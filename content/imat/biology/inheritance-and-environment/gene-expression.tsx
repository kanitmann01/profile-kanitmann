import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "gene-expression",
  subject: "biology",
  topic: "inheritance-and-environment",
  title: "Gene Expression and Regulation",
  summary:
    "Gene expression is the process by which information from a gene is used to synthesise a functional gene product (protein). Regulation occurs at transcription, RNA processing, translation, and post-translation levels.",
  memoryHook:
    "The lac operon is like a light switch: lactose is the hand that flips it ON (inducer binds repressor, removing it from the operator). Glucose is the master switch — when glucose is present, cAMP is low, CAP can't activate, so the operon stays OFF even if lactose is present. 'No glucose? cAMP goes! CAP binds, operon tries.'",
  imatTrap:
    "The lac operon is INDUCIBLE (normally OFF, turned ON by lactose/allolactose). The trp operon is REPRESSIBLE (normally ON, turned OFF by tryptophan). Students mix these up. Also, in eukaryotes, transcription occurs in the nucleus and translation in the cytoplasm — they are spatially separated (unlike prokaryotes where both occur simultaneously).",
  whyItMatters:
    "Cancer often results from dysregulated gene expression — oncogenes are overexpressed or tumour suppressor genes are silenced. Understanding the lac operon is foundational for genetic engineering (inducible expression systems) and for understanding how bacteria develop antibiotic resistance.",
  explanation: (
    <div>
      <h3>Central Dogma Recap</h3>
      <p>
        <strong>Transcription</strong> (DNA → mRNA) occurs in the nucleus.
        <strong>Translation</strong> (mRNA → protein) occurs at ribosomes in the
        cytoplasm/rough ER.
      </p>
      <h3>Prokaryotic Gene Regulation: The lac Operon</h3>
      <p>
        An <strong>inducible operon</strong> — normally OFF, turned ON when
        lactose is present and glucose is absent.
      </p>
      <ul>
        <li>
          <strong>Structural genes:</strong> lacZ (β-galactosidase — breaks
          lactose → glucose + galactose), lacY (permease — transports lactose
          into cell), lacA (transacetylase)
        </li>
        <li>
          <strong>Promoter (P):</strong> Binding site for RNA polymerase
        </li>
        <li>
          <strong>Operator (O):</strong> Binding site for the lac repressor
          (encoded by lacI)
        </li>
        <li>
          <strong>CAP binding site:</strong> Binding site for cAMP-CAP complex
          (positive regulation)
        </li>
      </ul>
      <p>
        <strong>When lactose is present, glucose is absent:</strong> Allolactose
        binds the repressor → repressor detaches from operator. Low glucose →
        high cAMP → cAMP binds CAP → CAP binds promoter → RNA polymerase
        transcribes lacZYA at high rate.
      </p>
      <p>
        <strong>When glucose is present:</strong> cAMP is low → CAP cannot bind
        → transcription is minimal regardless of lactose (preferential use of
        glucose).
      </p>
      <h3>The trp Operon (Repressible)</h3>
      <p>
        Normally ON (tryptophan is needed). When tryptophan accumulates, it acts
        as a <strong>corepressor</strong>, binding the inactive repressor and
        activating it → repressor binds operator → transcription stops.
      </p>
      <h3>Eukaryotic Regulation</h3>
      <ul>
        <li>
          <strong>Chromatin remodelling:</strong> Histone acetylation opens
          chromatin (euchromatin → active); deacetylation/methylation condenses
          it (heterochromatin → silent)
        </li>
        <li>
          <strong>Transcription factors:</strong> Enhancers and silencers bind
          activator/repressor proteins
        </li>
        <li>
          <strong>RNA processing:</strong> Alternative splicing produces
          different mRNAs from one gene
        </li>
        <li>
          <strong>Post-translational:</strong> Phosphorylation, ubiquitination,
          proteolytic cleavage
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "gene-expr-q1",
      type: "multiple-choice",
      prompt: "In the lac operon, what is the role of allolactose?",
      answer:
        "It binds the repressor, inactivating it and allowing transcription",
      options: [
        "It activates RNA polymerase directly",
        "It binds the repressor, inactivating it and allowing transcription",
        "It binds CAP to activate the promoter",
        "It degrades lactose into glucose and galactose",
      ],
      explanation:
        "Allolactose (an isomer of lactose) is the inducer. It binds the lac repressor, changing its conformation so it can no longer bind the operator, allowing RNA polymerase to transcribe the operon.",
      difficulty: "recall",
    },
    {
      id: "gene-expr-q2",
      type: "true-false",
      prompt:
        "The trp operon is an inducible operon that is normally OFF and turned ON when tryptophan is present.",
      answer: "False",
      explanation:
        "The trp operon is REPRESSIBLE — normally ON. Tryptophan acts as a corepressor: when abundant, it binds the repressor, activating it to block transcription. This makes sense because the cell only needs to synthesise tryptophan when it's scarce.",
      difficulty: "apply",
    },
    {
      id: "gene-expr-q3",
      type: "explain-why",
      prompt:
        "Why does the lac operon show low transcription even when lactose is present if glucose is also present?",
      answer:
        "When glucose is present, cAMP levels are low. Without cAMP, the CAP protein cannot bind the CAP binding site near the promoter. Even though the repressor is removed (lactose present), RNA polymerase binds the promoter weakly without CAP assistance, resulting in minimal transcription. The cell preferentially uses glucose.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["genetic-code", "dna-structure", "genetic-engineering"],
  prerequisites: ["genetic-code", "dna-structure"],
};

export default note;
