"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

type FunctionType = "quadratic" | "trigonometric";

export function FunctionGrapher() {
  const [functionType, setFunctionType] = useState<FunctionType>("quadratic");
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 50;
  const xRange = 10;
  const yRange = 10;

  const toSvgX = (x: number) =>
    padding + ((x + xRange) / (2 * xRange)) * (svgWidth - 2 * padding);
  const toSvgY = (y: number) =>
    svgHeight -
    padding -
    ((y + yRange) / (2 * yRange)) * (svgHeight - 2 * padding);

  const evaluate = (x: number): number => {
    if (functionType === "quadratic") {
      return a * x * x + b * x + c;
    } else {
      return a * Math.sin(b * x + c);
    }
  };

  const graphPoints: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = -xRange + (i / 100) * 2 * xRange;
    const y = evaluate(x);
    if (Math.abs(y) <= yRange) {
      graphPoints.push(`${toSvgX(x)},${toSvgY(y)}`);
    }
  }

  const equation =
    functionType === "quadratic"
      ? `y = ${a}x² + ${b}x + ${c}`
      : `y = ${a}·sin(${b}x + ${c})`;

  const vertexX = functionType === "quadratic" && a !== 0 ? -b / (2 * a) : 0;
  const vertexY = functionType === "quadratic" ? evaluate(vertexX) : 0;

  const amplitude = functionType === "trigonometric" ? Math.abs(a) : 0;
  const period =
    functionType === "trigonometric" && b !== 0
      ? (2 * Math.PI) / Math.abs(b)
      : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">Function Grapher</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label
            htmlFor="function-type"
            className="block text-sm font-medium mb-2"
          >
            Function Type
          </label>
          <select
            id="function-type"
            value={functionType}
            onChange={(e) => setFunctionType(e.target.value as FunctionType)}
            className="w-full px-3 py-2 border rounded-md bg-background"
            aria-label="Function"
          >
            <option value="quadratic">Quadratic</option>
            <option value="trigonometric">Trigonometric</option>
          </select>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Coefficient a: {a}
            </label>
            <Slider
              min={-5}
              max={5}
              step={0.1}
              value={[a]}
              onValueChange={([v]) => setA(v)}
              aria-label="Coefficient a"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Coefficient b: {b}
            </label>
            <Slider
              min={-5}
              max={5}
              step={0.1}
              value={[b]}
              onValueChange={([v]) => setB(v)}
              aria-label="Coefficient b"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Coefficient c: {c}
            </label>
            <Slider
              min={-5}
              max={5}
              step={0.1}
              value={[c]}
              onValueChange={([v]) => setC(v)}
              aria-label="Coefficient c"
            />
          </div>
        </div>

        <div className="text-center text-lg font-mono font-semibold">
          {equation}
        </div>

        <div className="flex justify-center">
          <svg
            width={svgWidth}
            height={svgHeight}
            className="border rounded-lg bg-slate-50 dark:bg-slate-900"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          >
            {Array.from({ length: 21 }, (_, i) => {
              const x = -xRange + i;
              return (
                <line
                  key={`vgrid-${i}`}
                  x1={toSvgX(x)}
                  y1={padding}
                  x2={toSvgX(x)}
                  y2={svgHeight - padding}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              );
            })}
            {Array.from({ length: 21 }, (_, i) => {
              const y = -yRange + i;
              return (
                <line
                  key={`hgrid-${i}`}
                  x1={padding}
                  y1={toSvgY(y)}
                  x2={svgWidth - padding}
                  y2={toSvgY(y)}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              );
            })}

            <line
              x1={padding}
              y1={toSvgY(0)}
              x2={svgWidth - padding}
              y2={toSvgY(0)}
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1={toSvgX(0)}
              y1={padding}
              x2={toSvgX(0)}
              y2={svgHeight - padding}
              stroke="currentColor"
              strokeWidth="2"
            />

            <polyline
              points={graphPoints.join(" ")}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />

            {functionType === "quadratic" && (
              <circle
                cx={toSvgX(vertexX)}
                cy={toSvgY(vertexY)}
                r="5"
                fill="hsl(var(--destructive))"
              />
            )}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center border-t pt-4">
          {functionType === "quadratic" ? (
            <>
              <div>
                <div className="text-sm text-muted-foreground">Vertex</div>
                <div className="text-lg font-semibold">
                  ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="text-lg font-semibold">
                  {a > 0 ? "Opens Up" : a < 0 ? "Opens Down" : "Linear"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-sm text-muted-foreground">Amplitude</div>
                <div className="text-lg font-semibold">
                  {amplitude.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Period</div>
                <div className="text-lg font-semibold">{period.toFixed(2)}</div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
