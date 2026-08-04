import { describe, it, expect } from "vitest";
import { POST, GET } from "@/app/api/classify/route";

async function post(body: unknown, init?: RequestInit): Promise<Response> {
  return POST(
    new Request("http://localhost/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
      ...init,
    })
  );
}

describe("POST /api/classify", () => {
  it("classifies a typosquatting URL as phishing with confidence + latency", async () => {
    const response = await post({
      url: "http://paypal-account-verify.com/login",
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.verdict).toBe("phishing");
    expect(body.label).toBe("__label__phishing");
    expect(body.confidence).toBeGreaterThan(0.9);
    expect(body.confidenceOther).toBeGreaterThan(0);
    expect(body.latencyMs).toBeGreaterThan(0);
    expect(body.model.name).toContain("FastText");
    expect(body.model.evalAccuracy).toBeGreaterThan(0.9);
  });

  it("classifies a legit brand root as legitimate", async () => {
    const response = await post({ url: "http://netflix.com" });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.verdict).toBe("legitimate");
  });

  it("accepts bare hosts (no scheme)", async () => {
    const response = await post({ url: "paypal-account-verify.com/login" });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.verdict).toBe("phishing");
  });

  it("returns 400 for invalid JSON", async () => {
    const response = await post("{not json", {});
    expect(response.status).toBe(400);
    expect((await response.json()).error).toBeDefined();
  });

  it("returns 400 for empty URL", async () => {
    const response = await post({ url: "   " });
    expect(response.status).toBe(400);
  });

  it("returns 400 for non-string URL", async () => {
    const response = await post({ url: 42 });
    expect(response.status).toBe(400);
  });

  it("returns 400 for a URL over the length cap", async () => {
    const response = await post({
      url: "https://example.com/" + "x".repeat(3000),
    });
    expect(response.status).toBe(400);
  });

  it("returns 400 for an unparseable URL", async () => {
    const response = await post({ url: "://" });
    expect(response.status).toBe(400);
  });
});

describe("GET /api/classify", () => {
  it("rejects GET with 405 and a hint", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    const body = await response.json();
    expect(body.error).toContain("POST");
  });
});
