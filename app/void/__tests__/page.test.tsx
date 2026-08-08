import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import VoidPage, { generateMetadata } from "@/app/void/page";

// The /void page composes four client components (framer-motion + WebGL).
// Mock them so the server-component page test never pulls in the WebGL
// renderer or the animation runtime.
vi.mock("@/components/void/void-scene", () => ({
  VoidScene: () => null,
}));
vi.mock("@/components/void/void-ghost-nav", () => ({
  VoidGhostNav: () => null,
}));
vi.mock("@/components/void/void-hero", () => ({
  VoidHero: () => null,
}));
vi.mock("@/components/void/void-footer-hint", () => ({
  VoidFooterHint: () => null,
}));

describe("Void page", () => {
  it("renders without throwing", () => {
    const { container } = render(<VoidPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("metadata title contains Void", () => {
    const metadata = generateMetadata();
    expect(metadata.title).toContain("Void");
  });

  it("canonical URL ends with /void", () => {
    const metadata = generateMetadata();
    expect(String(metadata.alternates?.canonical)).toMatch(/\/void$/);
  });
});
