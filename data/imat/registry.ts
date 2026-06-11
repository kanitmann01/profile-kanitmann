import type { AtomicNote, Subject, SubjectMeta, TopicMeta } from "./types";

import { glycolysisNote } from "@/content/imat/biology/bioenergetics/glycolysis";
import { krebsCycleNote } from "@/content/imat/biology/bioenergetics/krebs-cycle";
import { electronTransportChainNote } from "@/content/imat/biology/bioenergetics/electron-transport-chain";
import { fermentationNote } from "@/content/imat/biology/bioenergetics/fermentation";
import { photosynthesisNote } from "@/content/imat/biology/bioenergetics/photosynthesis";
import { atpNote } from "@/content/imat/biology/bioenergetics/atp";

import carbohydrates from "@/content/imat/biology/chemistry-of-living-things/carbohydrates";
import lipids from "@/content/imat/biology/chemistry-of-living-things/lipids";
import proteins from "@/content/imat/biology/chemistry-of-living-things/proteins";
import nucleicAcids from "@/content/imat/biology/chemistry-of-living-things/nucleic-acids";
import enzymes from "@/content/imat/biology/chemistry-of-living-things/enzymes";
import weakInteractions from "@/content/imat/biology/chemistry-of-living-things/weak-interactions";

import homeostasis from "@/content/imat/biology/anatomy-and-physiology/homeostasis";
import organSystems from "@/content/imat/biology/anatomy-and-physiology/organ-systems";

import dnaStructure from "@/content/imat/biology/reproduction-and-inheritance/dna-structure";
import dnaReplication from "@/content/imat/biology/reproduction-and-inheritance/dna-replication";
import geneticCode from "@/content/imat/biology/reproduction-and-inheritance/genetic-code";
import mendelianGenetics from "@/content/imat/biology/reproduction-and-inheritance/mendelian-genetics";
import inheritancePatterns from "@/content/imat/biology/reproduction-and-inheritance/inheritance-patterns";

import geneExpression from "@/content/imat/biology/inheritance-and-environment/gene-expression";
import mutations from "@/content/imat/biology/inheritance-and-environment/mutations";
import geneticEngineering from "@/content/imat/biology/inheritance-and-environment/genetic-engineering";
import evolutionBasics from "@/content/imat/biology/inheritance-and-environment/evolution-basics";

import cellTheory from "@/content/imat/biology/cell-biology/cell-theory";
import cellMembraneStructure from "@/content/imat/biology/cell-biology/cell-membrane-structure";
import membraneTransport from "@/content/imat/biology/cell-biology/membrane-transport";
import organelles from "@/content/imat/biology/cell-biology/organelles";
import cellCycle from "@/content/imat/biology/cell-biology/cell-cycle";
import mitosis from "@/content/imat/biology/cell-biology/mitosis";
import meiosis from "@/content/imat/biology/cell-biology/meiosis";
import prokaryotesVsEukaryotes from "@/content/imat/biology/cell-biology/prokaryotes-vs-eukaryotes";
import viruses from "@/content/imat/biology/cell-biology/viruses";

import pureSubstances from "@/content/imat/chemistry/composition-of-matter/pure-substances";
import mixturesSeparation from "@/content/imat/chemistry/composition-of-matter/mixtures-separation";
import atomicModels from "@/content/imat/chemistry/atomic-structure/atomic-models";
import electronConfiguration from "@/content/imat/chemistry/atomic-structure/electron-configuration";
import periodicTrends from "@/content/imat/chemistry/periodic-table/periodic-trends";
import groupsPeriods from "@/content/imat/chemistry/periodic-table/groups-periods";
import ionicBonds from "@/content/imat/chemistry/chemical-bonding/ionic-bonds";
import covalentBonds from "@/content/imat/chemistry/chemical-bonding/covalent-bonds";
import acidsBasesSalts from "@/content/imat/chemistry/inorganic-chemistry/acids-bases-salts";
import oxides from "@/content/imat/chemistry/inorganic-chemistry/oxides";
import balancingEquations from "@/content/imat/chemistry/reactions-stoichiometry/balancing-equations";
import moleCalculations from "@/content/imat/chemistry/reactions-stoichiometry/mole-calculations";
import concentration from "@/content/imat/chemistry/solutions/concentration";
import solubility from "@/content/imat/chemistry/solutions/solubility";
import oxidationReduction from "@/content/imat/chemistry/redox/oxidation-reduction";
import electrochemistry from "@/content/imat/chemistry/redox/electrochemistry";
import hydrocarbons from "@/content/imat/chemistry/organic-chemistry/hydrocarbons";
import functionalGroups from "@/content/imat/chemistry/organic-chemistry/functional-groups";
import enthalpy from "@/content/imat/chemistry/thermochemistry/enthalpy";
import hessLaw from "@/content/imat/chemistry/thermochemistry/hess-law";

import siUnits from "@/content/imat/physics/measures/si-units";
import significantFigures from "@/content/imat/physics/measures/significant-figures";
import uniformMotion from "@/content/imat/physics/kinematics/uniform-motion";
import projectileMotion from "@/content/imat/physics/kinematics/projectile-motion";
import newtonLaws from "@/content/imat/physics/dynamics/newton-laws";
import forces from "@/content/imat/physics/dynamics/forces";
import pressure from "@/content/imat/physics/fluid-mechanics/pressure";
import archimedes from "@/content/imat/physics/fluid-mechanics/archimedes";
import heatTransfer from "@/content/imat/physics/thermodynamics/heat-transfer";
import gasLaws from "@/content/imat/physics/thermodynamics/gas-laws";
import coulombsLaw from "@/content/imat/physics/electrostatics-electrodynamics/coulombs-law";
import ohmsLaw from "@/content/imat/physics/electrostatics-electrodynamics/ohms-law";

import renaissance from "@/content/imat/general-knowledge/european-history/renaissance";
import worldWars from "@/content/imat/general-knowledge/european-history/world-wars";
import dante from "@/content/imat/general-knowledge/italian-literature/dante";
import modernItalian from "@/content/imat/general-knowledge/italian-literature/modern-italian";
import ancientPhilosophy from "@/content/imat/general-knowledge/philosophy/ancient-philosophy";
import modernPhilosophy from "@/content/imat/general-knowledge/philosophy/modern-philosophy";
import unSystem from "@/content/imat/general-knowledge/international-institutions/un-system";
import euInstitutions from "@/content/imat/general-knowledge/international-institutions/eu-institutions";

import mainConclusionNote from "@/content/imat/logical-reasoning/argument-structure/main-conclusion";
import premisesNote from "@/content/imat/logical-reasoning/argument-structure/premises";
import drawingConclusionNote from "@/content/imat/logical-reasoning/conclusion-types/drawing-conclusion";
import assumptionsNote from "@/content/imat/logical-reasoning/conclusion-types/assumptions";
import additionalEvidenceNote from "@/content/imat/logical-reasoning/evaluation/additional-evidence";
import reasoningErrorsNote from "@/content/imat/logical-reasoning/evaluation/reasoning-errors";
import matchingArgumentsNote from "@/content/imat/logical-reasoning/application/matching-arguments";
import applyingPrinciplesNote from "@/content/imat/logical-reasoning/application/applying-principles";
import dataInterpretationNote from "@/content/imat/logical-reasoning/problem-solving/data-interpretation";
import numericalReasoningNote from "@/content/imat/logical-reasoning/problem-solving/numerical-reasoning";

import equationsInequalities from "@/content/imat/mathematics/algebra/equations-inequalities";
import polynomials from "@/content/imat/mathematics/algebra/polynomials";
import linearFunctions from "@/content/imat/mathematics/functions/linear-functions";
import quadraticFunctions from "@/content/imat/mathematics/functions/quadratic-functions";
import planeGeometry from "@/content/imat/mathematics/geometry/plane-geometry";
import solidGeometry from "@/content/imat/mathematics/geometry/solid-geometry";
import probabilityBasics from "@/content/imat/mathematics/probability-statistics/probability-basics";
import descriptiveStatistics from "@/content/imat/mathematics/probability-statistics/descriptive-statistics";

export const subjects: SubjectMeta[] = [
  {
    slug: "biology",
    title: "Biology",
    description:
      "Cell biology, genetics, evolution, ecology, and human anatomy — the largest IMAT section.",
    examWeight: "38%",
    questionCount: 23,
    topics: [
      "chemistry-of-living-things",
      "anatomy-and-physiology",
      "bioenergetics",
      "cell-biology",
      "reproduction-and-inheritance",
      "inheritance-and-environment",
    ],
  },
  {
    slug: "chemistry",
    title: "Chemistry",
    description:
      "General, inorganic, and organic chemistry fundamentals for the IMAT exam.",
    examWeight: "25%",
    questionCount: 15,
    topics: [
      "composition-of-matter",
      "atomic-structure",
      "periodic-table",
      "chemical-bonding",
      "inorganic-chemistry",
      "reactions-stoichiometry",
      "solutions",
      "redox",
      "organic-chemistry",
      "thermochemistry",
    ],
  },
  {
    slug: "physics",
    title: "Physics",
    description:
      "Mechanics, thermodynamics, electromagnetism, and modern physics.",
    examWeight: "~10%",
    questionCount: 6,
    topics: [
      "measures",
      "kinematics",
      "dynamics",
      "fluid-mechanics",
      "thermodynamics",
      "electrostatics-electrodynamics",
    ],
  },
  {
    slug: "mathematics",
    title: "Mathematics",
    description:
      "Algebra, geometry, probability, and statistics for the IMAT exam.",
    examWeight: "~10%",
    questionCount: 6,
    topics: ["algebra", "functions", "geometry", "probability-statistics"],
  },
  {
    slug: "logical-reasoning",
    title: "Logical Reasoning",
    description:
      "Deductive and inductive reasoning, syllogisms, and problem-solving strategies.",
    examWeight: "8%",
    questionCount: 5,
    topics: [
      "argument-structure",
      "conclusion-types",
      "evaluation",
      "application",
      "problem-solving",
    ],
  },
  {
    slug: "general-knowledge",
    title: "General Knowledge",
    description:
      "History, literature, politics, and current affairs at a broad level.",
    examWeight: "7%",
    questionCount: 5,
    topics: [
      "european-history",
      "italian-literature",
      "philosophy",
      "international-institutions",
    ],
  },
];

export const topics: TopicMeta[] = [
  {
    slug: "chemistry-of-living-things",
    subject: "biology",
    title: "Chemistry of Living Things",
    description:
      "Biological macromolecules — carbohydrates, lipids, proteins, nucleic acids — and the weak interactions that shape them.",
    examWeight: "~8%",
  },
  {
    slug: "anatomy-and-physiology",
    subject: "biology",
    title: "Anatomy and Physiology",
    description:
      "Human organ systems, homeostasis, and feedback mechanisms essential for the IMAT exam.",
    examWeight: "~8%",
  },
  {
    slug: "bioenergetics",
    subject: "biology",
    title: "Bioenergetics",
    description:
      "Cellular respiration (glycolysis, Krebs cycle, ETC, fermentation) and photosynthesis — how cells capture and use energy.",
    examWeight: "~6%",
  },
  {
    slug: "cell-biology",
    subject: "biology",
    title: "Cell Biology",
    description:
      "Cell theory, membrane structure and transport, organelles, the cell cycle, mitosis, meiosis, prokaryotes vs eukaryotes, and viruses.",
    examWeight: "~8%",
  },
  {
    slug: "reproduction-and-inheritance",
    subject: "biology",
    title: "Reproduction and Inheritance",
    description:
      "DNA structure and replication, the genetic code, Mendelian genetics, and non-Mendelian inheritance patterns.",
    examWeight: "~6%",
  },
  {
    slug: "inheritance-and-environment",
    subject: "biology",
    title: "Inheritance and Environment",
    description:
      "Gene expression and regulation, mutations, genetic engineering, and evolution by natural selection.",
    examWeight: "~6%",
  },
  {
    slug: "composition-of-matter",
    subject: "chemistry",
    title: "Composition of Matter",
    description:
      "Pure substances (elements and compounds), mixtures (homogeneous and heterogeneous), and separation techniques.",
    examWeight: "~2%",
  },
  {
    slug: "atomic-structure",
    subject: "chemistry",
    title: "Atomic Structure",
    description:
      "Historical atomic models, electron configuration, quantum numbers, and the Aufbau principle.",
    examWeight: "~3%",
  },
  {
    slug: "periodic-table",
    subject: "chemistry",
    title: "Periodic Table",
    description:
      "Periodic trends (atomic radius, ionization energy, electronegativity), groups, periods, and element classification.",
    examWeight: "~3%",
  },
  {
    slug: "chemical-bonding",
    subject: "chemistry",
    title: "Chemical Bonding",
    description:
      "Ionic and covalent bonds, lattice energy, VSEPR theory, molecular geometry, and bond polarity.",
    examWeight: "~3%",
  },
  {
    slug: "inorganic-chemistry",
    subject: "chemistry",
    title: "Inorganic Chemistry",
    description:
      "Acids, bases, salts, pH scale, neutralisation, and classification of oxides.",
    examWeight: "~3%",
  },
  {
    slug: "reactions-stoichiometry",
    subject: "chemistry",
    title: "Reactions & Stoichiometry",
    description:
      "Balancing chemical equations, the mole concept, molar mass, Avogadro's number, and percent composition.",
    examWeight: "~3%",
  },
  {
    slug: "solutions",
    subject: "chemistry",
    title: "Solutions",
    description:
      "Concentration (molarity, molality), dilution, solubility rules, and factors affecting solubility.",
    examWeight: "~2%",
  },
  {
    slug: "redox",
    subject: "chemistry",
    title: "Redox & Electrochemistry",
    description:
      "Oxidation states, redox reactions, galvanic cells, electrolysis, and standard reduction potentials.",
    examWeight: "~3%",
  },
  {
    slug: "organic-chemistry",
    subject: "chemistry",
    title: "Organic Chemistry",
    description:
      "Hydrocarbons (alkanes, alkenes, alkynes), IUPAC nomenclature, isomerism, and functional groups.",
    examWeight: "~3%",
  },
  {
    slug: "thermochemistry",
    subject: "chemistry",
    title: "Thermochemistry",
    description:
      "Enthalpy changes, exothermic and endothermic reactions, calorimetry, bond enthalpy, and Hess's law.",
    examWeight: "~2%",
  },
  {
    slug: "algebra",
    subject: "mathematics",
    title: "Algebra",
    description:
      "Linear and quadratic equations, systems of equations, inequalities, and polynomial operations.",
    examWeight: "~3%",
  },
  {
    slug: "functions",
    subject: "mathematics",
    title: "Functions",
    description:
      "Linear and quadratic functions, slope, vertex form, discriminant, and graphing.",
    examWeight: "~3%",
  },
  {
    slug: "geometry",
    subject: "mathematics",
    title: "Geometry",
    description:
      "Plane geometry (angles, triangles, circles, polygons) and solid geometry (volume and surface area).",
    examWeight: "~2%",
  },
  {
    slug: "probability-statistics",
    subject: "mathematics",
    title: "Probability & Statistics",
    description:
      "Basic probability, mutually exclusive and independent events, measures of central tendency and spread.",
    examWeight: "~2%",
  },
  {
    slug: "argument-structure",
    subject: "logical-reasoning",
    title: "Argument Structure",
    description:
      "Identifying main conclusions and premises — the building blocks of every logical argument.",
    examWeight: "~2%",
  },
  {
    slug: "conclusion-types",
    subject: "logical-reasoning",
    title: "Conclusion Types",
    description:
      "Drawing valid conclusions from premises and identifying hidden assumptions in arguments.",
    examWeight: "~2%",
  },
  {
    slug: "evaluation",
    subject: "logical-reasoning",
    title: "Evaluation",
    description:
      "Strengthening and weakening arguments with additional evidence, and identifying logical fallacies.",
    examWeight: "~2%",
  },
  {
    slug: "application",
    subject: "logical-reasoning",
    title: "Application",
    description:
      "Matching parallel argument structures and applying general principles to specific cases.",
    examWeight: "~1%",
  },
  {
    slug: "problem-solving",
    subject: "logical-reasoning",
    title: "Problem Solving",
    description:
      "Data interpretation from charts and graphs, and numerical reasoning with word problems.",
    examWeight: "~1%",
  },
  {
    slug: "european-history",
    subject: "general-knowledge",
    title: "European History",
    description:
      "The Renaissance, World Wars, and key events that shaped European civilisation, medicine, and politics.",
    examWeight: "~2%",
  },
  {
    slug: "italian-literature",
    subject: "general-knowledge",
    title: "Italian Literature",
    description:
      "From Dante's Divine Comedy to Calvino and Eco — the literary tradition that forged Italian identity.",
    examWeight: "~2%",
  },
  {
    slug: "philosophy",
    subject: "general-knowledge",
    title: "Philosophy",
    description:
      "Ancient Greek philosophy (Socrates, Plato, Aristotle) and modern Western thought (Descartes, Kant, Nietzsche).",
    examWeight: "~1.5%",
  },
  {
    slug: "international-institutions",
    subject: "general-knowledge",
    title: "International Institutions",
    description:
      "The United Nations system and European Union institutions — governance, health, and cooperation frameworks.",
    examWeight: "~1.5%",
  },
  {
    slug: "measures",
    subject: "physics",
    title: "Measures and Units",
    description:
      "SI base and derived units, unit conversions, significant figures, and dimensional analysis for IMAT physics.",
    examWeight: "~1%",
  },
  {
    slug: "kinematics",
    subject: "physics",
    title: "Kinematics",
    description:
      "Uniform motion, projectile motion, and the description of motion without reference to forces.",
    examWeight: "~2%",
  },
  {
    slug: "dynamics",
    subject: "physics",
    title: "Dynamics",
    description:
      "Newton's three laws of motion, types of forces (gravity, normal, friction, tension, spring), and free-body diagrams.",
    examWeight: "~2%",
  },
  {
    slug: "fluid-mechanics",
    subject: "physics",
    title: "Fluid Mechanics",
    description:
      "Pressure, Pascal's principle, Archimedes' principle, and buoyancy.",
    examWeight: "~1.5%",
  },
  {
    slug: "thermodynamics",
    subject: "physics",
    title: "Thermodynamics",
    description:
      "Heat transfer mechanisms, specific heat, latent heat, and the gas laws (Boyle, Charles, ideal gas).",
    examWeight: "~2%",
  },
  {
    slug: "electrostatics-electrodynamics",
    subject: "physics",
    title: "Electrostatics and Electrodynamics",
    description:
      "Coulomb's law, electric fields, Ohm's law, series and parallel circuits, and electrical power.",
    examWeight: "~1.5%",
  },
];

export const notes: AtomicNote[] = [
  carbohydrates,
  lipids,
  proteins,
  nucleicAcids,
  enzymes,
  weakInteractions,
  homeostasis,
  organSystems,
  glycolysisNote,
  krebsCycleNote,
  electronTransportChainNote,
  fermentationNote,
  photosynthesisNote,
  atpNote,
  cellTheory,
  cellMembraneStructure,
  membraneTransport,
  organelles,
  cellCycle,
  mitosis,
  meiosis,
  prokaryotesVsEukaryotes,
  viruses,
  dnaStructure,
  dnaReplication,
  geneticCode,
  mendelianGenetics,
  inheritancePatterns,
  geneExpression,
  mutations,
  geneticEngineering,
  evolutionBasics,
  pureSubstances,
  mixturesSeparation,
  atomicModels,
  electronConfiguration,
  periodicTrends,
  groupsPeriods,
  ionicBonds,
  covalentBonds,
  acidsBasesSalts,
  oxides,
  balancingEquations,
  moleCalculations,
  concentration,
  solubility,
  oxidationReduction,
  electrochemistry,
  hydrocarbons,
  functionalGroups,
  enthalpy,
  hessLaw,
  equationsInequalities,
  polynomials,
  linearFunctions,
  quadraticFunctions,
  planeGeometry,
  solidGeometry,
  probabilityBasics,
  descriptiveStatistics,
  mainConclusionNote,
  premisesNote,
  drawingConclusionNote,
  assumptionsNote,
  additionalEvidenceNote,
  reasoningErrorsNote,
  matchingArgumentsNote,
  applyingPrinciplesNote,
  dataInterpretationNote,
  numericalReasoningNote,
  renaissance,
  worldWars,
  dante,
  modernItalian,
  ancientPhilosophy,
  modernPhilosophy,
  unSystem,
  euInstitutions,
  siUnits,
  significantFigures,
  uniformMotion,
  projectileMotion,
  newtonLaws,
  forces,
  pressure,
  archimedes,
  heatTransfer,
  gasLaws,
  coulombsLaw,
  ohmsLaw,
];

export function getNoteBySlug(slug: string): AtomicNote {
  const note = notes.find((n) => n.slug === slug);
  if (!note) {
    throw new Error(`Atomic note with slug "${slug}" not found`);
  }
  return note;
}

export function getNotesBySubject(subject: Subject): AtomicNote[] {
  return notes.filter((n) => n.subject === subject);
}

export function getNotesByTopic(subject: Subject, topic: string): AtomicNote[] {
  return notes.filter((n) => n.subject === subject && n.topic === topic);
}

export function getSubjectBySlug(slug: Subject): SubjectMeta {
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) {
    throw new Error(`Subject "${slug}" not found`);
  }
  return subject;
}

export function getTopicBySlug(subject: Subject, topic: string): TopicMeta {
  const t = topics.find((tp) => tp.subject === subject && tp.slug === topic);
  if (!t) {
    throw new Error(`Topic "${topic}" not found for subject "${subject}"`);
  }
  return t;
}
