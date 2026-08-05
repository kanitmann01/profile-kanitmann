"use client";

import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { Loader2, MessageSquare, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import type { AskChunk } from "@/lib/ask/types";

export { useAskPanel } from "@/components/ask-panel-context";

/**
 * Wave E.1 — "Ask Kanit" slide-over panel (NO floating bubble — the entry
 * points are the nav "ASK" button and the ⌘J shortcut, both wired through
 * AskPanelProvider).
 *
 * Renders the streamed SSE response from POST /api/ask with a citation-chip
 * row linking back to the source pages. Desktop: slide-over from the right.
 * Mobile (<768px): full-screen sheet. Reduced-motion users get an instant
 * opacity crossfade instead of the slide transform.
 *
 * The component is dynamically imported by AskPanelProvider (ssr: false), so
 * framer-motion + lucide leave the initial bundle until the first ⌘J.
 */

type ChatMessage = { role: "user" | "assistant"; text: string };

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          theme?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function parseSseStream(
  stream: ReadableStream<Uint8Array>,
  handlers: {
    onCitations: (citations: AskChunk[]) => void;
    onDelta: (text: string) => void;
    onError: (message: string) => void;
    onDone: () => void;
  }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    const dispatch = (raw: string) => {
      const eventLine = raw.split("\n").find((l) => l.startsWith("event: "));
      const dataLine = raw.split("\n").find((l) => l.startsWith("data: "));
      const type = eventLine?.slice(7).trim();
      if (!type || !dataLine) return;
      let data: unknown = null;
      try {
        data = JSON.parse(dataLine.slice(6));
      } catch {
        return;
      }
      if (type === "citations") {
        handlers.onCitations(
          (data as { citations: AskChunk[] }).citations ?? []
        );
      } else if (type === "delta") {
        handlers.onDelta((data as { text: string }).text ?? "");
      } else if (type === "error") {
        handlers.onError(
          (data as { message: string }).message ?? "Unknown error"
        );
      } else if (type === "done") {
        handlers.onDone();
      }
    };

    const pump = async () => {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let sep = buffer.indexOf("\n\n");
          while (sep >= 0) {
            dispatch(buffer.slice(0, sep));
            buffer = buffer.slice(sep + 2);
            sep = buffer.indexOf("\n\n");
          }
        }
        if (buffer.trim()) dispatch(buffer);
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    void pump();
  });
}

async function askQuestion(
  message: string,
  token: string,
  handlers: {
    onCitations: (citations: AskChunk[]) => void;
    onDelta: (text: string) => void;
    onError: (message: string) => void;
    onDone: () => void;
  }
): Promise<void> {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Turnstile-Token": token,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    handlers.onError(body?.error ?? `Request failed (${response.status}).`);
    handlers.onDone();
    return;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!response.body || !contentType.includes("text/event-stream")) {
    handlers.onError("Unexpected server response.");
    handlers.onDone();
    return;
  }

  await parseSseStream(response.body, handlers);
}

export function AskPanel({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [citations, setCitations] = React.useState<AskChunk[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(
    null
  );
  const turnstileWidget = React.useRef<string | null>(null);
  const turnstileHost = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  // Lock page scroll while open.
  React.useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  // Escape closes the panel.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Turnstile widget (only when a site key is configured).
  React.useEffect(() => {
    if (!open || !SITE_KEY) return;
    let cancelled = false;

    const init = () => {
      if (cancelled || !window.turnstile || !turnstileHost.current) return;
      if (turnstileWidget.current)
        window.turnstile.remove(turnstileWidget.current);
      turnstileWidget.current = window.turnstile.render(turnstileHost.current, {
        sitekey: SITE_KEY,
        theme: document.documentElement.classList.contains("dark")
          ? "dark"
          : "light",
        callback: (token) => setTurnstileToken(token),
      });
    };

    if (window.turnstile) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
    return () => {
      cancelled = true;
      if (turnstileWidget.current && window.turnstile) {
        window.turnstile.remove(turnstileWidget.current);
        turnstileWidget.current = null;
      }
    };
  }, [open, SITE_KEY]);

  // Keep the streamed response in view.
  React.useEffect(() => {
    listRef.current?.scrollTo?.({
      top: listRef.current.scrollHeight,
      ...(reducedMotion ? {} : { behavior: "smooth" }),
    });
  }, [messages, isStreaming, reducedMotion]);

  const tokenForRequest = SITE_KEY ? turnstileToken : "test";

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const query = input.trim();
    if (!query || isStreaming) return;
    if (SITE_KEY && !turnstileToken) {
      setError("Please complete the human verification first.");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setError(null);
    setCitations([]);
    setIsStreaming(true);

    let accumulated = "";
    try {
      await askQuestion(query, tokenForRequest ?? "", {
        onCitations: (c) => setCitations(c),
        onDelta: (t) => {
          accumulated += t;
          setMessages((prev) => {
            const next = [...prev];
            if (next[next.length - 1]?.role === "assistant") {
              next[next.length - 1] = { role: "assistant", text: accumulated };
            } else {
              next.push({ role: "assistant", text: accumulated });
            }
            return next;
          });
        },
        onError: (message) => setError(message),
        onDone: () => {},
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setIsStreaming(false);
      if (SITE_KEY && window.turnstile && turnstileWidget.current) {
        setTurnstileToken(null);
        window.turnstile.reset(turnstileWidget.current);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="ask-panel-root"
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Backdrop */}
          <m.button
            type="button"
            aria-label="Close ask panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
          />

          {/* Sheet */}
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Ask Kanit — grounded portfolio assistant"
            initial={reducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", damping: 32, stiffness: 320 }
            }
            className={cn(
              "absolute flex flex-col bg-background border-l border-border shadow-2xl",
              isMobile
                ? "inset-0 border-l-0 w-full h-full"
                : "top-0 right-0 h-full w-full max-w-[420px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center size-8 rounded-md bg-primary/10 text-primary">
                  <MessageSquare className="size-4" />
                </span>
                <div>
                  <p className="font-serif text-lg leading-tight">Ask Kanit</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Grounded in projects · articles · experience
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            >
              {messages.length === 0 && !error && (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Ask anything about Kanit&apos;s work — projects, articles,
                    or experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "What did Kanit build at Ericsson?",
                      "Explain the NetSTAR platform",
                      "What are Kanit's skills?",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setInput(suggestion);
                        }}
                        className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5"
                      : "mr-auto bg-card border border-border/50 rounded-2xl rounded-bl-sm px-4 py-2.5"
                  )}
                >
                  {message.text}
                  {isStreaming &&
                    index === messages.length - 1 &&
                    message.role === "assistant" && (
                      <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-primary/70 animate-pulse" />
                    )}
                </div>
              ))}

              {isStreaming &&
                messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="mr-auto bg-card border border-border/50 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" />
                    Thinking…
                  </div>
                )}

              {error && (
                <div className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
            </div>

            {/* Citations */}
            {citations.length > 0 && (
              <div className="px-5 pb-2 border-t border-border/30 pt-3 shrink-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Sources
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {citations.map((citation) => (
                    <a
                      key={`${citation.slug}-${citation.url}`}
                      href={citation.url}
                      target={
                        citation.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        citation.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-primary/25 text-foreground hover:border-primary hover:text-primary transition-colors"
                      title={citation.title}
                    >
                      {citation.type === "project"
                        ? "▣"
                        : citation.type === "article"
                          ? "✎"
                          : "◆"}
                      <span className="max-w-[140px] truncate">
                        {citation.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border/50 shrink-0"
            >
              {SITE_KEY && (
                <div ref={turnstileHost} className="mb-3 [&_iframe]:!w-auto" />
              )}
              <div className="flex items-end gap-2">
                <label htmlFor="ask-input" className="sr-only">
                  Ask a question about Kanit&apos;s work
                </label>
                <textarea
                  id="ask-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void handleSubmit();
                    }
                  }}
                  placeholder="Ask about Kanit's work…"
                  className="flex-1 resize-none bg-card border border-border/60 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/70 min-h-[44px]"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  aria-label="Send question"
                  className="inline-flex items-center justify-center size-11 shrink-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="size-4" />
                </button>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                ⌘J toggles · answers cite sources · replies stay under 150 words
              </p>
            </form>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
