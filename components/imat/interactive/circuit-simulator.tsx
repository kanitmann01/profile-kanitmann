"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Minus } from "lucide-react";

const VOLTAGE = 12;

export function CircuitSimulator() {
  const [mode, setMode] = useState<"series" | "parallel">("series");
  const [resistors, setResistors] = useState([100, 100]);

  const addResistor = () => {
    if (resistors.length < 4) {
      setResistors([...resistors, 100]);
    }
  };

  const removeResistor = () => {
    if (resistors.length > 1) {
      setResistors(resistors.slice(0, -1));
    }
  };

  const updateResistor = (index: number, value: number) => {
    const newResistors = [...resistors];
    newResistors[index] = value;
    setResistors(newResistors);
  };

  const equivalentResistance =
    mode === "series"
      ? resistors.reduce((sum, r) => sum + r, 0)
      : 1 / resistors.reduce((sum, r) => sum + 1 / r, 0);

  const totalCurrent = VOLTAGE / equivalentResistance;

  const svgWidth = 600;
  const svgHeight = 200;

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">Circuit Simulator</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 justify-center">
          <Button
            variant={mode === "series" ? "default" : "outline"}
            onClick={() => setMode("series")}
          >
            Series
          </Button>
          <Button
            variant={mode === "parallel" ? "default" : "outline"}
            onClick={() => setMode("parallel")}
          >
            Parallel
          </Button>
        </div>

        <div className="flex justify-center">
          <svg
            width={svgWidth}
            height={svgHeight}
            className="border rounded-lg bg-slate-50 dark:bg-slate-900"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          >
            <rect
              x="50"
              y="80"
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="70"
              y="105"
              textAnchor="middle"
              className="text-sm"
              fill="currentColor"
            >
              {VOLTAGE}V
            </text>

            {mode === "series" ? (
              <>
                <line
                  x1="90"
                  y1="100"
                  x2="150"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {resistors.map((_, i) => (
                  <g key={i}>
                    <rect
                      x={150 + i * 120}
                      y="80"
                      width="80"
                      height="40"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                    />
                    <text
                      x={190 + i * 120}
                      y="105"
                      textAnchor="middle"
                      className="text-xs"
                      fill="currentColor"
                    >
                      R{i + 1}
                    </text>
                    {i < resistors.length - 1 && (
                      <line
                        x1={230 + i * 120}
                        y1="100"
                        x2={270 + i * 120}
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                ))}
                <line
                  x1={150 + (resistors.length - 1) * 120 + 80}
                  y1="100"
                  x2="550"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="550"
                  y1="100"
                  x2="550"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </>
            ) : (
              <>
                <line
                  x1="90"
                  y1="100"
                  x2="150"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="150"
                  y1="40"
                  x2="150"
                  y2="160"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {resistors.map((_, i) => (
                  <g key={i}>
                    <line
                      x1="150"
                      y1={60 + i * 30}
                      x2="200"
                      y2={60 + i * 30}
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="200"
                      y={45 + i * 30}
                      width="80"
                      height="30"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                    />
                    <text
                      x="240"
                      y={65 + i * 30}
                      textAnchor="middle"
                      className="text-xs"
                      fill="currentColor"
                    >
                      R{i + 1}
                    </text>
                    <line
                      x1="280"
                      y1={60 + i * 30}
                      x2="330"
                      y2={60 + i * 30}
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </g>
                ))}
                <line
                  x1="330"
                  y1="40"
                  x2="330"
                  y2="160"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="330"
                  y1="100"
                  x2="550"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </>
            )}

            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                r="4"
                fill="hsl(var(--primary))"
                animate={{
                  cx: mode === "series" ? [100, 500] : [100, 150, 150, 500],
                  cy: mode === "series" ? [100, 100] : [100, 100, 60, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear",
                }}
              />
            ))}
          </svg>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            <Button
              onClick={addResistor}
              disabled={resistors.length >= 4}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Resistor
            </Button>
            <Button
              onClick={removeResistor}
              disabled={resistors.length <= 1}
              size="sm"
            >
              <Minus className="mr-2 h-4 w-4" />
              Remove Resistor
            </Button>
          </div>

          {resistors.map((resistance, i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-2">
                R{i + 1} Resistance: {resistance} Ω
              </label>
              <Slider
                min={10}
                max={1000}
                step={10}
                value={[resistance]}
                onValueChange={([v]) => updateResistor(i, v)}
                aria-label="Resistance"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center border-t pt-4">
          <div>
            <div className="text-sm text-muted-foreground">
              Equivalent Resistance
            </div>
            <div className="text-2xl font-bold">
              {equivalentResistance.toFixed(1)} Ω
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Current</div>
            <div className="text-2xl font-bold">
              {totalCurrent.toFixed(3)} A
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground border-t pt-4">
          <div className="font-semibold mb-2">Formulas:</div>
          <div>Series: R_eq = R₁ + R₂ + ...</div>
          <div>Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ...</div>
          <div>Ohm&apos;s Law: I = V/R</div>
        </div>
      </CardContent>
    </Card>
  );
}
