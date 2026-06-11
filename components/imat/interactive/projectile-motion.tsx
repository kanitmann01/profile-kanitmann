"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play } from "lucide-react";

const G = 9.8;

export function ProjectileMotion() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);

  const theta = (angle * Math.PI) / 180;
  const range = (velocity * velocity * Math.sin(2 * theta)) / G;
  const maxHeight = (velocity * velocity * Math.sin(theta) ** 2) / (2 * G);
  const timeOfFlight = (2 * velocity * Math.sin(theta)) / G;

  const svgWidth = 600;
  const svgHeight = 300;
  const padding = 40;

  const scaleX = (svgWidth - 2 * padding) / Math.max(range, 1);
  const scaleY = (svgHeight - 2 * padding) / Math.max(maxHeight, 1);

  const trajectoryPoints: string[] = [];
  const steps = 50;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * timeOfFlight;
    const x = velocity * Math.cos(theta) * t;
    const y = velocity * Math.sin(theta) * t - 0.5 * G * t * t;
    const svgX = padding + x * scaleX;
    const svgY = svgHeight - padding - Math.max(0, y) * scaleY;
    trajectoryPoints.push(`${svgX},${svgY}`);
  }

  const handleLaunch = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">Projectile Motion</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="angle" className="block text-sm font-medium mb-2">
              Angle: {angle}°
            </label>
            <Slider
              id="angle"
              min={0}
              max={90}
              step={1}
              value={[angle]}
              onValueChange={([v]) => setAngle(v)}
              aria-label="Angle"
            />
          </div>

          <div>
            <label
              htmlFor="velocity"
              className="block text-sm font-medium mb-2"
            >
              Velocity: {velocity} m/s
            </label>
            <Slider
              id="velocity"
              min={10}
              max={100}
              step={1}
              value={[velocity]}
              onValueChange={([v]) => setVelocity(v)}
              aria-label="Velocity"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <svg
            width={svgWidth}
            height={svgHeight}
            className="border rounded-lg bg-slate-50 dark:bg-slate-900"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          >
            <line
              x1={padding}
              y1={svgHeight - padding}
              x2={svgWidth - padding}
              y2={svgHeight - padding}
              stroke="currentColor"
              strokeWidth="2"
            />
            <polyline
              points={trajectoryPoints.join(" ")}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4"
            />
            {isAnimating && (
              <motion.circle
                r="8"
                fill="hsl(var(--primary))"
                initial={{ cx: padding, cy: svgHeight - padding }}
                animate={{
                  cx: trajectoryPoints.map((p) => parseFloat(p.split(",")[0])),
                  cy: trajectoryPoints.map((p) => parseFloat(p.split(",")[1])),
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            )}
          </svg>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleLaunch} disabled={isAnimating}>
            <Play className="mr-2 h-4 w-4" />
            Launch
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Range</div>
            <div className="text-2xl font-bold">{range.toFixed(1)} m</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Max Height</div>
            <div className="text-2xl font-bold">{maxHeight.toFixed(1)} m</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Time of Flight</div>
            <div className="text-2xl font-bold">
              {timeOfFlight.toFixed(2)} s
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1 border-t pt-4">
          <div className="font-semibold mb-2">Formulas:</div>
          <div>R = v²sin(2θ)/g</div>
          <div>H = v²sin²(θ)/(2g)</div>
          <div>T = 2v·sin(θ)/g</div>
          <div className="text-xs mt-2">where g = {G} m/s²</div>
        </div>
      </CardContent>
    </Card>
  );
}
