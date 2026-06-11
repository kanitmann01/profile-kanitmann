import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "archimedes",
  subject: "physics",
  topic: "fluid-mechanics",
  title: "Archimedes' Principle and Buoyancy",
  summary:
    "Archimedes' principle: the buoyant force on a submerged or floating object equals the weight of the fluid it displaces. This determines whether objects float, sink, or remain neutrally buoyant.",
  memoryHook:
    "'Buoyant force = weight of displaced fluid = ρ_fluid × V_submerged × g.' If object density &lt; fluid density → floats. If object density &gt; fluid density → sinks. Think: 'Steel ships float because they're mostly air — average density is less than water.'",
  imatTrap:
    "The buoyant force depends on the volume of FLUID DISPLACED, not the total volume of the object. A floating object displaces fluid equal to its own WEIGHT (not its volume). A sunken object displaces fluid equal to its own VOLUME.",
  whyItMatters:
    "Buoyancy explains why we feel lighter in water, how hydrometers work, and why ice floats (critical for aquatic ecosystems). In medicine, body density measurements via water displacement estimate body fat percentage.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Archimedes' Principle</h3>
      <p>
        When an object is partially or fully submerged in a fluid, the fluid
        exerts an upward <strong>buoyant force</strong> equal to the weight of
        the displaced fluid:
      </p>
      <p className="font-mono text-center py-2">
        F_b = ρ_fluid × V_displaced × g
      </p>

      <h3 className="text-lg font-semibold mt-4">Floating vs Sinking</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>F_b &gt; W</strong> (ρ_obj &lt; ρ_fluid): object rises /
          floats
        </li>
        <li>
          <strong>F_b = W</strong> (ρ_obj = ρ_fluid): neutral buoyancy
        </li>
        <li>
          <strong>F_b &lt; W</strong> (ρ_obj &gt; ρ_fluid): object sinks
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Floating Condition</h3>
      <p>
        For a floating object: weight = buoyant force → ρ_obj × V_obj × g =
        ρ_fluid × V_submerged × g. Therefore: V_submerged / V_obj = ρ_obj /
        ρ_fluid. Example: ice (ρ ≈ 917 kg/m³) in water (ρ ≈ 1000 kg/m³) → 91.7%
        submerged.
      </p>

      <h3 className="text-lg font-semibold mt-4">Apparent Weight</h3>
      <p>
        Apparent weight in fluid = True weight − Buoyant force. An object feels
        lighter in water because buoyancy partially supports it.
      </p>
    </div>
  ),
  questions: [
    {
      id: "archimedes-q1",
      type: "multiple-choice",
      prompt:
        "An object with density 800 kg/m³ is placed in water (density 1000 kg/m³). What fraction of the object is submerged?",
      options: ["20%", "50%", "80%", "100%"],
      answer: "80%",
      explanation:
        "For a floating object: V_sub/V_total = ρ_obj/ρ_fluid = 800/1000 = 0.8 = 80%.",
      difficulty: "apply",
    },
    {
      id: "archimedes-q2",
      type: "fill-blank",
      prompt:
        "A 0.005 m³ block is fully submerged in water (ρ = 1000 kg/m³, g = 9.8 m/s²). What is the buoyant force in N?",
      answer: "49",
      explanation: "F_b = ρ_fluid × V × g = 1000 × 0.005 × 9.8 = 49 N.",
      difficulty: "apply",
    },
    {
      id: "archimedes-q3",
      type: "true-false",
      prompt:
        "True or False: A fully submerged object always displaces a volume of fluid equal to its own volume.",
      answer: "True",
      explanation:
        "A fully submerged object displaces fluid equal to its own total volume. A partially submerged (floating) object displaces fluid whose weight equals the object's weight.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["pressure", "forces", "gas-laws"],
};

export default note;
