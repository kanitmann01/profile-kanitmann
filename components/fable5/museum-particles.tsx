"use client";

import * as React from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PARTICLE_COUNT = 300;
const MAX_VELOCITY = 18;
const POINT_BASE_SIZE = 2.2;
const PULSE_AMPLITUDE = 0.35;
const PULSE_SPEED = 1.5;
const ALPHA_PEAK = 0.4;

const VERTEX_SRC = /* glsl */ `#version 300 es
in vec2 a_position;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
  clip.y = -clip.y;
  gl_Position = vec4(clip, 0.0, 1.0);
  float pulse = 1.0 + ${PULSE_AMPLITUDE.toFixed(4)} * sin(u_time * ${PULSE_SPEED.toFixed(4)} + a_position.x * 0.01);
  gl_PointSize = ${POINT_BASE_SIZE.toFixed(4)} * pulse;
}
`;

const FRAGMENT_SRC = /* glsl */ `#version 300 es
precision mediump float;
out vec4 outColor;

void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);
  if (d > 0.5) discard;
  float alpha = (1.0 - d * 2.0) * ${ALPHA_PEAK.toFixed(4)};
  outColor = vec4(1.0, 1.0, 1.0, alpha);
}
`;

type GLResources = {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  buffer: WebGLBuffer;
  aPosition: number;
  uResolution: WebGLUniformLocation;
  uTime: WebGLUniformLocation;
  width: number;
  height: number;
  positions: Float32Array;
  velocities: Float32Array;
  handleResize: () => void;
  handleVisibility: () => void;
  raf: number;
};

const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null => {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const initParticles = (
  positions: Float32Array,
  velocities: Float32Array,
  width: number,
  height: number
) => {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 2] = Math.random() * width * 1.2 - width * 0.1;
    positions[i * 2 + 1] = Math.random() * height * 1.2 - height * 0.1;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * MAX_VELOCITY;
    velocities[i * 2] = Math.cos(angle) * speed;
    velocities[i * 2 + 1] = Math.sin(angle) * speed;
  }
};

export function MuseumParticles() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const resourcesRef = React.useRef<GLResources | null>(null);
  const [webglFailed, setWebglFailed] = React.useState(false);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!gl) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "MuseumParticles: WebGL2 unavailable; skipping particle background."
        );
      }
      setWebglFailed(true);
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const aPosition = gl.getAttribLocation(program, "a_position");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    if (!uResolution || !uTime) return;

    const buffer = gl.createBuffer();
    if (!buffer) return;

    const positions = new Float32Array(PARTICLE_COUNT * 2);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    initParticles(positions, velocities, width, height);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

    const resources: GLResources = {
      gl,
      program,
      vertexShader,
      fragmentShader,
      buffer,
      aPosition,
      uResolution,
      uTime,
      width,
      height,
      positions,
      velocities,
      handleResize: () => {},
      handleVisibility: () => {},
      raf: 0,
    };
    resourcesRef.current = resources;

    let paused = document.hidden;

    resources.handleResize = () => {
      resources.width = window.innerWidth;
      resources.height = window.innerHeight;
      canvas.width = resources.width;
      canvas.height = resources.height;
      resources.gl.viewport(0, 0, resources.width, resources.height);
    };

    resources.handleVisibility = () => {
      paused = document.hidden;
    };

    window.addEventListener("resize", resources.handleResize);
    document.addEventListener("visibilitychange", resources.handleVisibility);

    let lastT = performance.now();
    let raf = 0;

    const render = (t: number) => {
      raf = requestAnimationFrame(render);
      resources.raf = raf;
      if (paused) {
        lastT = t;
        return;
      }
      const dt = Math.min(0.1, (t - lastT) / 1000);
      lastT = t;

      const w = resources.width;
      const h = resources.height;
      const pos = resources.positions;
      const vel = resources.velocities;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 2] += vel[i * 2] * dt;
        pos[i * 2 + 1] += vel[i * 2 + 1] * dt;
        if (pos[i * 2] < 0) pos[i * 2] += w;
        if (pos[i * 2] > w) pos[i * 2] -= w;
        if (pos[i * 2 + 1] < 0) pos[i * 2 + 1] += h;
        if (pos[i * 2 + 1] > h) pos[i * 2 + 1] -= h;
      }

      resources.gl.clear(resources.gl.COLOR_BUFFER_BIT);
      resources.gl.uniform2f(resources.uResolution, w, h);
      resources.gl.uniform1f(resources.uTime, t / 1000);
      resources.gl.bufferData(
        resources.gl.ARRAY_BUFFER,
        pos,
        resources.gl.DYNAMIC_DRAW
      );
      resources.gl.drawArrays(resources.gl.POINTS, 0, PARTICLE_COUNT);
    };

    raf = requestAnimationFrame(render);
    resources.raf = raf;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resources.handleResize);
      document.removeEventListener(
        "visibilitychange",
        resources.handleVisibility
      );
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      resourcesRef.current = null;
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  if (webglFailed) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-museum-particles
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
