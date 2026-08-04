import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { NetstarClassifierDemo } from "@/components/netstar-classifier-demo";
import type { ClassifyResponse } from "@/lib/netstar/types";

const okPayload: ClassifyResponse = {
  verdict: "phishing",
  label: "__label__phishing",
  confidence: 0.997,
  confidenceOther: 0.003,
  latencyMs: 1.2,
  model: {
    name: "NetSTAR FastText (int8)",
    format: "netstar-fasttext-v1",
    dim: 64,
    bucket: 2048,
    nwords: 2892,
    evalAccuracy: 0.9664,
    evalTestSize: 4409,
  },
};

function typeUrl(url: string) {
  fireEvent.change(screen.getByLabelText(/url to classify/i), {
    target: { value: url },
  });
}

describe("NetstarClassifierDemo (client island)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the labelled input, submit button and examples", () => {
    render(<NetstarClassifierDemo />);
    expect(screen.getByLabelText(/url to classify/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /classify url/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /typosquat brand login/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /raw-ip login page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /legit brand root/i })
    ).toBeInTheDocument();
  });

  it("shows a validation message when submitted empty", async () => {
    render(<NetstarClassifierDemo />);
    fireEvent.click(screen.getByRole("button", { name: /classify url/i }));
    expect(
      await screen.findByText(/paste a url to classify/i)
    ).toBeInTheDocument();
  });

  it("POSTs the URL and renders verdict, confidence and latency", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => okPayload,
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<NetstarClassifierDemo />);
    typeUrl("http://evil.example/login");
    fireEvent.click(screen.getByRole("button", { name: /classify url/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/classify",
      expect.objectContaining({ method: "POST" })
    );
    const body = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string
    );
    expect(body.url).toBe("http://evil.example/login");

    expect(await screen.findByText(/phishing/i)).toBeInTheDocument();
    expect(await screen.findByText(/99\.7%/)).toBeInTheDocument();
    expect(screen.getByText(/1\.2 ms/)).toBeInTheDocument();
    expect(screen.getByText(/live inference/i)).toBeInTheDocument();
  });

  it("disables the button while a request is in flight", async () => {
    let release: (value: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      release = resolve;
    });
    const fetchMock = vi.fn().mockReturnValue(pending);
    vi.stubGlobal("fetch", fetchMock);

    render(<NetstarClassifierDemo />);
    typeUrl("http://evil.example/login");
    fireEvent.click(screen.getByRole("button", { name: /classify url/i }));

    expect(screen.getByRole("button", { name: /checking…/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /checking…/i })).toHaveAttribute(
      "aria-busy",
      "true"
    );
    release!(
      new Response(JSON.stringify(okPayload), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /classify url/i })
      ).toBeEnabled();
    });
  });

  it("surfaces endpoint failures with a retry path (graceful fallback)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );
    render(<NetstarClassifierDemo />);
    typeUrl("http://evil.example/login");
    fireEvent.click(screen.getByRole("button", { name: /classify url/i }));

    expect(
      await screen.findByText(/could not classify: network down/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /retry classification/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/unreachable right now/i)).toBeInTheDocument();
  });

  it("surfaces HTTP error bodies from the endpoint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: "URL host is missing or invalid." }),
      })
    );
    render(<NetstarClassifierDemo />);
    typeUrl("://");
    fireEvent.click(screen.getByRole("button", { name: /classify url/i }));

    expect(
      await screen.findByText(
        /could not classify: url host is missing or invalid\./i
      )
    ).toBeInTheDocument();
  });

  it("fills the input from example chips without submitting", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<NetstarClassifierDemo />);
    fireEvent.click(
      screen.getByRole("button", { name: /typosquat brand login/i })
    );
    const input = screen.getByLabelText(/url to classify/i) as HTMLInputElement;
    expect(input.value).toBe("http://paypal-account-verify.com/login");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("announces results through a polite live region", () => {
    render(<NetstarClassifierDemo />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveAttribute("aria-atomic", "true");
  });
});
