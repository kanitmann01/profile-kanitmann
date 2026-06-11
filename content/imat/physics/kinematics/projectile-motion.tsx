"use client";

import type { AtomicNote } from "@/data/imat/types";
import { ProjectileMotion } from "@/components/imat/interactive/projectile-motion";

const note: AtomicNote = {
  slug: "projectile-motion",
  subject: "physics",
  topic: "kinematics",
  title: "Projectile Motion",
  summary:
    "Projectile motion is 2D motion under gravity alone. The key insight: horizontal and vertical components are independent. Horizontal velocity is constant (no air resistance); vertical motion has constant acceleration g = 9.8 m/s².",
  memoryHook:
    "Split it: 'Horizontal = cruise control (constant v), Vertical = free fall (a = g).' Range is maximised at 45°. Complementary angles (30°/60°) give the same range but different heights and flight times.",
  imatTrap:
    "At the highest point, velocity is NOT zero — only the vertical component is zero; horizontal velocity persists. Also: time up = time down (for same launch/landing height). Do NOT use v = d/t for projectile motion — use the component equations.",
  whyItMatters:
    "Projectile motion governs ballistics, sports biomechanics, and water fountains. Understanding independence of components is foundational for all 2D physics, from electric fields to orbital mechanics.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Component Decomposition</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Horizontal</strong>: vₓ = v₀ cos θ (constant, aₓ = 0)
        </li>
        <li>
          <strong>Vertical</strong>: vᵧ = v₀ sin θ − gt (aᵧ = −g)
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Key Formulas</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Range</strong>: R = v₀² sin(2θ) / g
        </li>
        <li>
          <strong>Max height</strong>: H = v₀² sin²(θ) / (2g)
        </li>
        <li>
          <strong>Time of flight</strong>: T = 2v₀ sin(θ) / g
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Key Insights</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Maximum range at θ = 45°</li>
        <li>Complementary angles (θ and 90°−θ) give the same range</li>
        <li>At max height: vᵧ = 0, but vₓ = v₀ cos θ (not zero!)</li>
        <li>Time to max height = T/2 = v₀ sin θ / g</li>
        <li>Trajectory is a parabola: y = x tan θ − gx² / (2v₀² cos²θ)</li>
      </ul>

      <ProjectileMotion />
    </div>
  ),
  questions: [
    {
      id: "projectile-q1",
      type: "multiple-choice",
      prompt:
        "At the highest point of a projectile's trajectory, which statement is correct?",
      options: [
        "Both velocity and acceleration are zero",
        "Velocity is zero but acceleration is g downward",
        "Vertical velocity is zero but horizontal velocity is non-zero",
        "Velocity is purely vertical",
      ],
      answer: "Vertical velocity is zero but horizontal velocity is non-zero",
      explanation:
        "At max height, vᵧ = 0 but vₓ = v₀ cos θ remains. Acceleration is g downward throughout the entire flight.",
      difficulty: "apply",
    },
    {
      id: "projectile-q2",
      type: "fill-blank",
      prompt:
        "A ball is launched at 20 m/s at 30° above horizontal. What is its horizontal velocity component? (Give answer in m/s to 1 decimal place, use g = 9.8 m/s², cos 30° = 0.866)",
      answer: "17.3",
      explanation:
        "vₓ = v₀ cos θ = 20 × cos 30° = 20 × 0.866 = 17.3 m/s. Horizontal velocity is constant throughout the flight.",
      difficulty: "apply",
    },
    {
      id: "projectile-q3",
      type: "multiple-choice",
      prompt:
        "Which launch angle gives the maximum horizontal range (ignoring air resistance)?",
      options: ["30°", "45°", "60°", "90°"],
      answer: "45°",
      explanation:
        "Range = v₀² sin(2θ)/g. Maximum when sin(2θ) = 1, i.e., 2θ = 90°, so θ = 45°.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["uniform-motion", "newton-laws", "forces"],
};

export default note;
