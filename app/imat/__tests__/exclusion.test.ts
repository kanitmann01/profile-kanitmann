import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("IMAT exclusion from public surfaces", () => {
  it("navigation does not contain /imat link", async () => {
    const fs = await import("fs");
    const navContent = fs.readFileSync("components/navigation.tsx", "utf-8");
    expect(navContent).not.toContain("/imat");
  });

  it("sitemap does not contain /imat route", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const imatUrls = urls.filter((url) => url.includes("/imat"));
    expect(imatUrls).toHaveLength(0);
  });
});
