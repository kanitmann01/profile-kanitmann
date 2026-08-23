"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  AskPanelContext,
  type AskPanelContextValue,
} from "@/components/ask-panel-context";

/**
 * Async AskPanel — `ssr: false` keeps framer-motion + lucide-react out of the
 * server render and out of the initial client bundle (Wave E.1 budget: the
 * widget must not grow the initial bundle beyond ~8KB).
 */
const AskPanel = dynamic(
  () => import("@/components/ask-panel").then((m) => m.AskPanel),
  { ssr: false }
);

/**
 * Lazy-mount AskPanel host. The shared context (openAsk) stays available for
 * programmatic opens; the ⌘J/Ctrl+J listener is currently commented out while
 * the feature ships dark (go-live: docs/agent-setup.md §7). When restored, it
 * registers in a useEffect BEFORE the panel mounts so the shortcut works on
 * the first keystroke on every route; the dynamic import is gated behind that
 * first invocation.
 */
export function AskPanelProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const openAsk = React.useCallback(() => {
    setOpen(true);
    setMounted(true);
  }, []);

  // ASK DARK (go-live): the ⌘J/Ctrl+J listener is disabled while the feature
  // ships hidden (nav entry points commented out). Restore together with the
  // navigation entries — see docs/agent-setup.md §7.
  //
  // React.useEffect(() => {
  //   const onKeyDown = (event: KeyboardEvent) => {
  //     if (
  //       event.key.toLowerCase() !== "j" ||
  //       !(event.metaKey || event.ctrlKey)
  //     ) {
  //       return;
  //     }
  //     // Don't steal ⌘J/Ctrl+J while the user is typing somewhere.
  //     const target = event.target as HTMLElement | null;
  //     if (
  //       target &&
  //       (target.tagName === "INPUT" ||
  //         target.tagName === "TEXTAREA" ||
  //         target.isContentEditable)
  //     ) {
  //       return;
  //     }
  //     event.preventDefault();
  //     openAsk();
  //   };
  //
  //   window.addEventListener("keydown", onKeyDown);
  //   return () => window.removeEventListener("keydown", onKeyDown);
  // }, [openAsk]);

  const contextValue = React.useMemo<AskPanelContextValue>(
    () => ({ openAsk }),
    [openAsk]
  );

  return (
    <AskPanelContext.Provider value={contextValue}>
      {mounted ? (
        <AskPanel open={open} onOpenChange={setOpen}>
          {children}
        </AskPanel>
      ) : (
        children
      )}
    </AskPanelContext.Provider>
  );
}
