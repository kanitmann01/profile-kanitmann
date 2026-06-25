"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Fable5Site } from "@/data/fable5";

type PlayState = "poster" | "playing" | "error";

export interface MuseumModalProps {
  site: Fable5Site | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PLAY_TIMEOUT_MS = 6000;

function extractTweetIdFromUrl(url: string): string | null {
  const match = url.match(/x\.com\/[^/]+\/status\/(\d+)/);
  return match ? match[1] : null;
}

function isEmbeddableUrl(url: string): boolean {
  // URLs that can be embedded in iframes
  const embeddableHosts = [
    "github.io",
    "vercel.app",
    "netlify.app",
    "pages.dev",
    "web.app",
    "replit.com",
    "stackblitz.com",
    "codepen.io",
    "glitch.me",
    "platform.twitter.com",
    "example.com", // For testing
  ];

  try {
    const urlObj = new URL(url);
    return embeddableHosts.some((host) => urlObj.hostname.includes(host));
  } catch {
    return false;
  }
}

function getIframeSrc(site: Fable5Site): string | null {
  // For Twitter/X URLs, extract the tweet ID and use the embed URL
  const tweetId = extractTweetIdFromUrl(site.demoUrl);
  if (tweetId) {
    return `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
  }

  // Check if the URL can be embedded
  if (isEmbeddableUrl(site.demoUrl)) {
    return site.demoUrl;
  }

  // For non-embeddable URLs (like github.com repos), return null
  return null;
}

export function MuseumModal({ site, open, onOpenChange }: MuseumModalProps) {
  const [playState, setPlayState] = React.useState<PlayState>("poster");
  const [imageFailed, setImageFailed] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const clearPlayTimeout = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!open) {
      setPlayState("poster");
      setImageFailed(false);
      clearPlayTimeout();
    }
  }, [open, clearPlayTimeout]);

  React.useEffect(() => {
    return () => {
      clearPlayTimeout();
    };
  }, [clearPlayTimeout]);

  React.useEffect(() => {
    if (playState !== "playing") return;
    const el = iframeRef.current;
    if (!el) return;

    const handleError = () => {
      clearPlayTimeout();
      setPlayState("error");
    };
    const handleLoad = () => {
      clearPlayTimeout();
      setPlayState("playing");
    };

    el.addEventListener("error", handleError);
    el.addEventListener("load", handleLoad);
    return () => {
      el.removeEventListener("error", handleError);
      el.removeEventListener("load", handleLoad);
    };
  }, [playState, clearPlayTimeout]);

  const iframeSrc = site ? getIframeSrc(site) : null;
  const isEmbeddable = iframeSrc !== null;

  const handlePlayClick = React.useCallback(() => {
    if (!site) return;
    if (!isEmbeddable) {
      if (typeof window !== "undefined") {
        window.open(site.demoUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    setPlayState("playing");
    clearPlayTimeout();
    timeoutRef.current = setTimeout(() => {
      setPlayState((current) => (current === "playing" ? "error" : current));
      timeoutRef.current = null;
    }, PLAY_TIMEOUT_MS);
  }, [clearPlayTimeout, isEmbeddable, site]);

  if (!open || !site) {
    return null;
  }

  const renderMedia = () => {
    if (playState === "playing") {
      if (!isEmbeddable) {
        return (
          <div
            data-testid="museum-iframe-error"
            className="relative aspect-[16/10] w-full bg-zinc-900 flex items-center justify-center px-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
              This site can&apos;t be embedded. Use the link below to open it
              directly.
            </p>
          </div>
        );
      }

      return (
        <div className="relative aspect-[16/10] w-full bg-black">
          <iframe
            ref={iframeRef}
            data-museum-iframe
            src={iframeSrc!}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      );
    }

    if (playState === "error") {
      return (
        <div
          data-testid="museum-iframe-error"
          className="relative aspect-[16/10] w-full bg-zinc-900 flex items-center justify-center px-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
            This site can&apos;t be embedded. Use the link below to open it
            directly.
          </p>
        </div>
      );
    }

    return (
      <div className="relative aspect-[16/10] w-full bg-muted">
        {imageFailed ? (
          <div
            data-museum-poster-fallback
            className="absolute inset-0 flex items-center justify-center bg-zinc-900"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {site.name}
            </span>
          </div>
        ) : (
          <Image
            src={site.screenshotUrl}
            alt={site.name}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    );
  };

  const innerContent = (
    <React.Fragment>
      {renderMedia()}

      <div className="p-6 space-y-4">
        <div className="space-y-1 pr-8">
          <DialogPrimitive.Title className="text-2xl font-serif font-semibold leading-tight">
            {site.name}
          </DialogPrimitive.Title>
          <p className="font-mono text-xs text-muted-foreground">
            @{site.author.replace(/^@/, "")}
          </p>
        </div>

        <DialogPrimitive.Description className="text-sm text-muted-foreground">
          {site.oneLiner}
        </DialogPrimitive.Description>

        <div
          data-museum-modal-tags
          className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider"
        >
          {site.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono text-xs uppercase tracking-wider"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div data-museum-modal-actions className="flex flex-wrap gap-2 pt-2">
          {playState !== "playing" ? (
            <Button type="button" onClick={handlePlayClick}>
              <Play className="h-3 w-3 fill-current" />
              Play live
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <a href={site.demoUrl} target="_blank" rel="noopener noreferrer">
              Visit site
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "bg-card text-card-foreground border border-border rounded-md",
            "max-w-4xl w-[90vw] max-h-[90vh] overflow-auto p-0",
            "shadow-lg duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
          {prefersReducedMotion ? (
            innerContent
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {innerContent}
            </motion.div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
