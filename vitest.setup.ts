import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { createElement, Fragment, useEffect } from "react";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom does not implement matchMedia; components using useReducedMotion
// (e.g. the list filter bar) call it in an effect. Script tests run in a
// node environment where `window` does not exist, hence the guard.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: (props: any) => {
    const { unoptimized, ...rest } = props;
    return createElement("img", rest);
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    createElement("a", { href, ...props }, children),
}));

vi.mock("next/script", () => ({
  default: ({ children }: any) => children ?? null,
}));

vi.mock("framer-motion", () => {
  const componentCache = new Map<string, any>();
  // Minimal stand-in for motion-dom's MotionValue: `current` getter, `set`
  // notifies `change` listeners, `on` returns an unsubscribe. Tests drive
  // scroll progress by calling set() inside act().
  const motionValue = vi.fn((initial = 0) => {
    let current = initial;
    const listeners = new Set<(v: number) => void>();
    return {
      get current() {
        return current;
      },
      set(next: number) {
        current = next;
        listeners.forEach((cb) => cb(next));
      },
      on(_event: string, cb: (v: number) => void) {
        listeners.add(cb);
        return () => listeners.delete(cb);
      },
    };
  });
  const m = new Proxy(
    {},
    {
      get: (_, tag: string) => {
        if (!componentCache.has(tag)) {
          componentCache.set(tag, ({ children, ...props }: any) => {
            const {
              initial,
              animate,
              exit,
              transition,
              whileHover,
              whileTap,
              whileInView,
              whileDrag,
              whileFocus,
              variants,
              layout,
              layoutId,
              viewport,
              drag,
              dragControls,
              dragConstraints,
              dragElastic,
              dragMomentum,
              dragPropagation,
              dragSnapToOrigin,
              ...domProps
            } = props;
            return createElement(tag, domProps, children);
          });
        }
        return componentCache.get(tag);
      },
    }
  );
  return {
    m,
    // LazyMotion is a no-op in tests: the proxy `m` above already strips
    // motion props and renders plain elements, so feature loading is moot.
    LazyMotion: ({ children }: any) => createElement(Fragment, null, children),
    domAnimation: {},
    domMax: {},
    AnimatePresence: ({ children }: any) =>
      createElement(Fragment, null, children),
    MotionConfig: ({ children }: any) =>
      createElement(Fragment, null, children),
    useScroll: vi.fn(() => ({ scrollYProgress: motionValue(0) })),
    // Mirror of the real hook: subscribe on "change", re-subscribe when the
    // callback identity changes. The motionValue above is what fires it.
    useMotionValueEvent: (
      value: { on: (event: string, cb: (v: number) => void) => () => void },
      event: string,
      callback: (v: number) => void
    ) => {
      useEffect(() => value.on(event, callback), [value, event, callback]);
    },
    motionValue,
    // Hook form of the factory above (used by velocity-skew / Wave E.4).
    useMotionValue: motionValue,
    useTransform: (_value: any, _input: number[], output: number[]) =>
      output[0],
    // Pass-through spring: tests keep driving the underlying motionValue via
    // its `.set()` and the spring mirrors it immediately.
    useSpring: (value: any) => value,
    // vi.fn so individual tests can override per-path (see
    // components/__tests__/hero-stats-strip.test.tsx).
    useReducedMotion: vi.fn(() => false),
    // jsdom has no IntersectionObserver, so default to "in view"; tests
    // override to assert the not-yet-in-view path.
    useInView: vi.fn(() => true),
    // Safe default (stop() must exist for effect cleanup); the count-up test
    // replaces this with a timer-driven tween.
    animate: vi.fn(() => ({ stop: vi.fn() })),
  };
});

vi.mock("@/components/tactile-feedback-provider", () => ({
  useTactileFeedback: () => ({
    isMuted: true,
    toggleMute: vi.fn(),
    playSound: vi.fn(),
    triggerHaptic: vi.fn(),
  }),
  TactileFeedbackProvider: ({ children }: any) => children,
}));
