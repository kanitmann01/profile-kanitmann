import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { createElement, Fragment } from "react";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

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
  const motion = new Proxy(
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
    motion,
    AnimatePresence: ({ children }: any) =>
      createElement(Fragment, null, children),
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: (_value: any, _input: number[], output: number[]) =>
      output[0],
  };
});

vi.mock("@/hooks/use-likes", () => ({
  useLikes: () => ({
    likes: {},
    isLoading: false,
    updateLikeCount: vi.fn(),
  }),
}));

vi.mock("@/components/tactile-feedback-provider", () => ({
  useTactileFeedback: () => ({
    isMuted: true,
    toggleMute: vi.fn(),
    playSound: vi.fn(),
    triggerHaptic: vi.fn(),
  }),
  TactileFeedbackProvider: ({ children }: any) => children,
}));
