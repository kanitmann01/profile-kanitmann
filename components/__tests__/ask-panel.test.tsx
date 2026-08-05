import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AskPanel } from "../ask-panel";

/** Build a fake SSE Response from event blocks. */
function sseResponse(events: { event: string; data: unknown }[]): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const { event, data } of events) {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      }
      controller.close();
    },
  });
  return new Response(body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}

function renderPanel() {
  const onOpenChange = vi.fn();
  render(
    <AskPanel open onOpenChange={onOpenChange}>
      <div>page content</div>
    </AskPanel>
  );
  return { onOpenChange };
}

describe("AskPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("renders the panel as a dialog with a header and input", () => {
    renderPanel();
    expect(
      screen.getByRole("dialog", { name: /Ask Kanit/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Ask a question/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send question/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("closes via the close button", () => {
    const { onOpenChange } = renderPanel();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", () => {
    const { onOpenChange } = renderPanel();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("streams the answer and renders citation chips linking to sources", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      sseResponse([
        {
          event: "citations",
          data: {
            citations: [
              {
                slug: "ericsson",
                title: "Ericsson",
                type: "experience",
                url: "https://kanitmann.com/about",
                text: "Migrated 2,000+ servers to GCP.",
              },
            ],
          },
        },
        { event: "delta", data: { text: "Kanit migrated 2,000+ servers" } },
        { event: "delta", data: { text: " to GCP at Ericsson." } },
        { event: "done", data: {} },
      ])
    );
    vi.stubGlobal("fetch", fetchMock);

    renderPanel();
    const input = screen.getByLabelText(/Ask a question/i);
    fireEvent.change(input, {
      target: { value: "What did Kanit build at Ericsson?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send question/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/ask",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "X-Turnstile-Token": "test",
        }),
      })
    );

    await waitFor(() =>
      expect(
        screen.getByText(/2,000\+ servers to GCP at Ericsson/i)
      ).toBeInTheDocument()
    );
    expect(
      screen.getByText("What did Kanit build at Ericsson?")
    ).toBeInTheDocument();

    const sourceLink = screen.getByRole("link", { name: /Ericsson/i });
    expect(sourceLink).toHaveAttribute("href", "https://kanitmann.com/about");
  });

  it("shows a thinking indicator while the first delta is pending", async () => {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => (release = resolve));
    const fetchMock = vi.fn().mockImplementation(() => {
      // Delay before returning the stream so the "Thinking…" state renders.
      return gate.then(() =>
        sseResponse([
          { event: "citations", data: { citations: [] } },
          { event: "delta", data: { text: "hello" } },
          { event: "done", data: {} },
        ])
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    renderPanel();
    fireEvent.change(screen.getByLabelText(/Ask a question/i), {
      target: { value: "hi" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send question/i }));

    expect(screen.getByText(/Thinking/i)).toBeInTheDocument();
    release();
    await waitFor(() => expect(screen.getByText("hello")).toBeInTheDocument());
  });

  it("surfaces server errors in the message area", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
          status: 429,
          headers: { "Content-Type": "application/json" },
        })
      )
    );

    renderPanel();
    fireEvent.change(screen.getByLabelText(/Ask a question/i), {
      target: { value: "hi" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send question/i }));

    await waitFor(() =>
      expect(screen.getByText(/Rate limit exceeded/i)).toBeInTheDocument()
    );
  });
});
