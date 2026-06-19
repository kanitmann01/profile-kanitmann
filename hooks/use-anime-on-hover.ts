"use client";

import * as React from "react";
import { animate, splitText } from "animejs";

import { getPreset } from "@/lib/anime";
import type {
  AnimeHoverBindings,
  PresetConfig,
  PresetName,
  UseAnimeOnHoverOptions,
} from "@/lib/anime";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Splitter = ReturnType<typeof splitText> | null;

export function useAnimeOnHover<T extends HTMLElement>({
  preset,
  ref: externalRef,
  overrides,
  enabled = true,
}: UseAnimeOnHoverOptions<T>): AnimeHoverBindings {
  const internalRef = React.useRef<HTMLElement | null>(null);
  const ref =
    (externalRef as React.RefObject<HTMLElement | null>) ?? internalRef;
  const prefersReducedMotion = useReducedMotion();
  const splitterRef = React.useRef<Splitter>(null);
  const enterAnimRef = React.useRef<ReturnType<typeof animate> | null>(null);
  const leaveAnimRef = React.useRef<ReturnType<typeof animate> | null>(null);
  const isActiveRef = React.useRef(false);

  const baseConfig = React.useMemo(
    () => getPreset(preset, prefersReducedMotion),
    [preset, prefersReducedMotion]
  );
  const config: PresetConfig = React.useMemo(
    () => ({ ...baseConfig, ...(overrides ?? {}) }),
    [baseConfig, overrides]
  );

  React.useLayoutEffect(() => {
    if (!enabled) return;
    if (preset !== "splitTextHover") return;
    const el = ref.current;
    if (!el) return;
    if (splitterRef.current) return;
    splitterRef.current = splitText(el, {
      includeSpaces: true,
      accessible: true,
    });
  }, [enabled, preset, ref]);

  const cancelInFlight = React.useCallback(() => {
    enterAnimRef.current?.revert();
    leaveAnimRef.current?.revert();
    enterAnimRef.current = null;
    leaveAnimRef.current = null;
  }, []);

  const buildTargets = React.useCallback((): HTMLElement[] => {
    const splitter = splitterRef.current;
    if (splitter && splitter.chars?.length) {
      return splitter.chars as HTMLElement[];
    }
    const el = ref.current;
    return el ? [el] : [];
  }, [ref]);

  const play = React.useCallback(
    (variant: "enter" | "leave") => {
      if (!enabled) return;
      const params = config[variant];
      if (!params) return;
      const targets = buildTargets();
      if (targets.length === 0) return;
      cancelInFlight();
      const stagger = config.options?.stagger;
      const anim = animate(targets, {
        ...params,
        ...(stagger !== undefined ? { delay: stagger as never } : {}),
      });
      if (variant === "enter") enterAnimRef.current = anim;
      else leaveAnimRef.current = anim;
    },
    [enabled, config, buildTargets, cancelInFlight]
  );

  const handleEnter = React.useCallback(() => {
    if (isActiveRef.current) return;
    isActiveRef.current = true;
    play("enter");
  }, [play]);

  const handleLeave = React.useCallback(() => {
    isActiveRef.current = false;
    play("leave");
  }, [play]);

  React.useEffect(() => {
    return () => {
      cancelInFlight();
      splitterRef.current?.revert();
      splitterRef.current = null;
    };
  }, [cancelInFlight]);

  return {
    ref: ref as React.RefObject<HTMLElement | null>,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onFocus: handleEnter,
    onBlur: handleLeave,
  };
}

export type { PresetName };
