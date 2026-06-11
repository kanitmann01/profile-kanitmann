"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

interface DNAStrandProps {
  onBaseClick?: (base: string) => void;
}

const BASE_PAIRS: Record<
  string,
  { complement: string; color: string; letter: string }
> = {
  Adenine: { complement: "Thymine", color: "#ef4444", letter: "A" },
  Thymine: { complement: "Adenine", color: "#3b82f6", letter: "T" },
  Guanine: { complement: "Cytosine", color: "#22c55e", letter: "G" },
  Cytosine: { complement: "Guanine", color: "#f59e0b", letter: "C" },
};

const SEQUENCE = [
  { left: "Adenine", right: "Thymine" },
  { left: "Thymine", right: "Adenine" },
  { left: "Guanine", right: "Cytosine" },
  { left: "Cytosine", right: "Guanine" },
  { left: "Adenine", right: "Thymine" },
  { left: "Guanine", right: "Cytosine" },
  { left: "Thymine", right: "Adenine" },
  { left: "Cytosine", right: "Guanine" },
  { left: "Adenine", right: "Thymine" },
  { left: "Thymine", right: "Adenine" },
  { left: "Guanine", right: "Cytosine" },
  { left: "Cytosine", right: "Guanine" },
  { left: "Adenine", right: "Thymine" },
  { left: "Guanine", right: "Cytosine" },
  { left: "Cytosine", right: "Guanine" },
];

const NUM_PAIRS = SEQUENCE.length;
const HELIX_RADIUS = 60;
const PAIR_SPACING = 28;
const TOP_PADDING = 30;
const SVG_WIDTH = 300;
const SVG_HEIGHT = TOP_PADDING * 2 + (NUM_PAIRS - 1) * PAIR_SPACING;
const CENTER_X = SVG_WIDTH / 2;
const BASE_RADIUS = 14;
const TWIST_PER_PAIR = (2 * Math.PI) / 10;
const ANIMATION_SPEED = 0.008;

export function DNAStrand({ onBaseClick }: DNAStrandProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const phaseRef = useRef(0);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);
  const selectedRef = useRef(selected);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleBaseClick = useCallback(
    (base: string) => {
      setSelected(base);
      onBaseClick?.(base);
    },
    [onBaseClick]
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "backbone-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#94a3b8");
    gradient.append("stop").attr("offset", "50%").attr("stop-color", "#64748b");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#94a3b8");

    const backbone1 = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#backbone-gradient)")
      .attr("stroke-width", 3)
      .attr("opacity", 0.6);

    const backbone2 = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#backbone-gradient)")
      .attr("stroke-width", 3)
      .attr("opacity", 0.6);

    const rungGroup = svg.append("g").attr("class", "rungs");
    const baseGroup = svg.append("g").attr("class", "bases");

    const rungElements = rungGroup
      .selectAll("line")
      .data(SEQUENCE)
      .enter()
      .append("line")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2)
      .attr("opacity", 0.5);

    const leftBaseGroups = baseGroup
      .selectAll(".left-base")
      .data(SEQUENCE)
      .enter()
      .append("g")
      .attr("class", "left-base")
      .style("cursor", "pointer")
      .on("click", (_event: MouseEvent, d: (typeof SEQUENCE)[0]) => {
        handleBaseClick(d.left);
      });

    leftBaseGroups.append("circle").attr("r", BASE_RADIUS);

    leftBaseGroups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .attr("font-size", 12)
      .attr("font-weight", "bold")
      .attr("pointer-events", "none")
      .text((d) => BASE_PAIRS[d.left].letter);

    const rightBaseGroups = baseGroup
      .selectAll(".right-base")
      .data(SEQUENCE)
      .enter()
      .append("g")
      .attr("class", "right-base")
      .style("cursor", "pointer")
      .on("click", (_event: MouseEvent, d: (typeof SEQUENCE)[0]) => {
        handleBaseClick(d.right);
      });

    rightBaseGroups.append("circle").attr("r", BASE_RADIUS);

    rightBaseGroups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .attr("font-size", 12)
      .attr("font-weight", "bold")
      .attr("pointer-events", "none")
      .text((d) => BASE_PAIRS[d.right].letter);

    function updateHelix(phase: number) {
      const points1: [number, number][] = [];
      const points2: [number, number][] = [];

      for (let i = 0; i < NUM_PAIRS; i++) {
        const angle = i * TWIST_PER_PAIR + phase;
        const y = TOP_PADDING + i * PAIR_SPACING;
        const x1 = CENTER_X + HELIX_RADIUS * Math.sin(angle);
        const x2 = CENTER_X + HELIX_RADIUS * Math.sin(angle + Math.PI);
        points1.push([x1, y]);
        points2.push([x2, y]);
      }

      const lineGen = d3
        .line<[number, number]>()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(d3.curveCatmullRom.alpha(0.5));

      backbone1.attr("d", lineGen(points1));
      backbone2.attr("d", lineGen(points2));

      for (let i = 0; i < NUM_PAIRS; i++) {
        const angle = i * TWIST_PER_PAIR + phase;
        const y = TOP_PADDING + i * PAIR_SPACING;
        const x1 = CENTER_X + HELIX_RADIUS * Math.sin(angle);
        const x2 = CENTER_X + HELIX_RADIUS * Math.sin(angle + Math.PI);
        const z1 = Math.cos(angle);
        const z2 = Math.cos(angle + Math.PI);

        const depthScale1 = 0.6 + 0.4 * ((z1 + 1) / 2);
        const depthScale2 = 0.6 + 0.4 * ((z2 + 1) / 2);
        const depthOpacity1 = 0.5 + 0.5 * ((z1 + 1) / 2);
        const depthOpacity2 = 0.5 + 0.5 * ((z2 + 1) / 2);

        const sel = selectedRef.current;
        const leftSel = sel === SEQUENCE[i].left;
        const rightSel = sel === SEQUENCE[i].right;

        rungElements
          .filter((_, idx) => idx === i)
          .attr("x1", x1)
          .attr("y1", y)
          .attr("x2", x2)
          .attr("y2", y)
          .attr("stroke", leftSel || rightSel ? "#fbbf24" : "#94a3b8")
          .attr("stroke-width", leftSel || rightSel ? 3 : 2)
          .attr("opacity", 0.3 + 0.4 * ((Math.max(z1, z2) + 1) / 2));

        leftBaseGroups
          .filter((_, idx) => idx === i)
          .attr("transform", `translate(${x1},${y})`)
          .select("circle")
          .attr("r", BASE_RADIUS * depthScale1)
          .attr("fill", BASE_PAIRS[SEQUENCE[i].left].color)
          .attr("opacity", leftSel ? 1 : depthOpacity1)
          .attr("stroke", leftSel ? "#fbbf24" : "none")
          .attr("stroke-width", leftSel ? 3 : 0);

        leftBaseGroups
          .filter((_, idx) => idx === i)
          .select("text")
          .attr("font-size", 12 * depthScale1);

        rightBaseGroups
          .filter((_, idx) => idx === i)
          .attr("transform", `translate(${x2},${y})`)
          .select("circle")
          .attr("r", BASE_RADIUS * depthScale2)
          .attr("fill", BASE_PAIRS[SEQUENCE[i].right].color)
          .attr("opacity", rightSel ? 1 : depthOpacity2)
          .attr("stroke", rightSel ? "#fbbf24" : "none")
          .attr("stroke-width", rightSel ? 3 : 0);

        rightBaseGroups
          .filter((_, idx) => idx === i)
          .select("text")
          .attr("font-size", 12 * depthScale2);
      }
    }

    function animate() {
      if (!prefersReducedMotion.current) {
        phaseRef.current += ANIMATION_SPEED;
      }
      updateHelix(phaseRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    updateHelix(0);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleBaseClick]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const phase = phaseRef.current;

    for (let i = 0; i < NUM_PAIRS; i++) {
      const angle = i * TWIST_PER_PAIR + phase;
      const z1 = Math.cos(angle);
      const z2 = Math.cos(angle + Math.PI);
      const depthOpacity1 = 0.5 + 0.5 * ((z1 + 1) / 2);
      const depthOpacity2 = 0.5 + 0.5 * ((z2 + 1) / 2);
      const depthScale1 = 0.6 + 0.4 * ((z1 + 1) / 2);
      const depthScale2 = 0.6 + 0.4 * ((z2 + 1) / 2);

      const leftSel = selected === SEQUENCE[i].left;
      const rightSel = selected === SEQUENCE[i].right;

      svg
        .selectAll(".left-base")
        .filter((_, idx) => idx === i)
        .select("circle")
        .attr("opacity", leftSel ? 1 : depthOpacity1)
        .attr("stroke", leftSel ? "#fbbf24" : "none")
        .attr("stroke-width", leftSel ? 3 : 0)
        .attr("r", BASE_RADIUS * depthScale1);

      svg
        .selectAll(".right-base")
        .filter((_, idx) => idx === i)
        .select("circle")
        .attr("opacity", rightSel ? 1 : depthOpacity2)
        .attr("stroke", rightSel ? "#fbbf24" : "none")
        .attr("stroke-width", rightSel ? 3 : 0)
        .attr("r", BASE_RADIUS * depthScale2);

      svg
        .selectAll<SVGLineElement, (typeof SEQUENCE)[0]>(".rungs line")
        .filter((_, idx) => idx === i)
        .attr("stroke", leftSel || rightSel ? "#fbbf24" : "#94a3b8")
        .attr("stroke-width", leftSel || rightSel ? 3 : 2);
    }
  }, [selected]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full max-w-[300px]"
        role="img"
        aria-label="DNA double helix"
      />

      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(BASE_PAIRS).map(([name, info]) => (
          <button
            key={name}
            onClick={() => handleBaseClick(name)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ backgroundColor: info.color }}
          >
            <span className="font-bold">{info.letter}</span>
            {name}
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="rounded-lg border bg-muted p-3 text-center"
          data-testid="complement-info"
        >
          <p className="text-sm text-muted-foreground">Complement of</p>
          <p
            className="text-lg font-bold"
            style={{ color: BASE_PAIRS[selected].color }}
          >
            {selected} ({BASE_PAIRS[selected].letter})
          </p>
          <p className="text-sm text-muted-foreground">pairs with</p>
          <p
            className="text-lg font-bold"
            style={{
              color: BASE_PAIRS[BASE_PAIRS[selected].complement].color,
            }}
          >
            {BASE_PAIRS[selected].complement} (
            {BASE_PAIRS[BASE_PAIRS[selected].complement].letter})
          </p>
        </div>
      )}
    </div>
  );
}
