"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  Copy,
  FileText,
  FolderKanban,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Monitor,
  Moon,
  Newspaper,
  Sun,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandPaletteContext } from "@/components/command-palette-context";
import { useToast } from "@/hooks/use-toast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLenis } from "lenis/react";

export { useCommandPalette } from "@/components/command-palette-context";

const EMAIL = "mannkanit@gmail.com";
const RESUME_URL = "/Kanit Mann - Resume.pdf";
const GITHUB_URL = "https://github.com/kanitmann01";
const LINKEDIN_URL = "https://www.linkedin.com/in/kanitmann";
const CALENDLY_URL = "https://calendly.com/mannkanit/connect-with-kanit";

const navigateItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Articles", href: "/articles", icon: Newspaper },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "IMAT", href: "/imat", icon: GraduationCap },
  { label: "Fable-5", href: "/fable-5", icon: BookOpen },
];

const sectionItems = [
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "articles", label: "Articles", icon: Newspaper },
];

const themeOptions = [
  { label: "Dark", value: "dark", icon: Moon },
  { label: "Light", value: "light", icon: Sun },
  { label: "System", value: "system", icon: Monitor },
] as const;

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CommandPaletteProps {
  children?: React.ReactNode;
  /** Controlled open state — used by the lazy-mount provider. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({
  children,
  open: openProp,
  onOpenChange,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = openProp ?? internalOpen;
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  // Lenis instance when smooth scroll is active (Exp 07); undefined under
  // reduced motion (provider doesn't mount Lenis) or before first mount.
  const lenis = useLenis();

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      // The palette has no trigger element (opened via shortcut/menu), so
      // remember where focus was and return it there on close.
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
    }
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
  };

  React.useEffect(() => {
    // Restore focus once the dialog has unmounted — restoring it inside the
    // close handler would be re-captured by the dialog's focus trap.
    if (!open) {
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    }
  }, [open]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "k" ||
        !(event.metaKey || event.ctrlKey)
      ) {
        return;
      }
      // Don't steal ⌘K/Ctrl+K while the user is typing somewhere.
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      handleOpenChange(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runCommand = (action: () => void) => {
    handleOpenChange(false);
    action();
  };

  const navigateTo = (href: string) => runCommand(() => router.push(href));

  const jumpToSection = (id: string) =>
    runCommand(() => {
      if (pathname === "/") {
        if (lenis) {
          // Route through Lenis so the animated jump matches the site's
          // smooth-scroll layer. Lenis honors the sections' CSS
          // scroll-margin-top (scroll-mt-20) internally, so no manual
          // offset is needed — final position matches native scrollIntoView.
          lenis.scrollTo(`#${id}`);
        } else {
          // No Lenis (reduced motion / not yet mounted): native jump.
          document.getElementById(id)?.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      } else {
        router.push(`/#${id}`);
      }
    });

  const openExternal = (url: string) =>
    runCommand(() => window.open(url, "_blank", "noopener,noreferrer"));

  const copyEmail = () =>
    runCommand(() => {
      navigator.clipboard.writeText(EMAIL).then(
        () => toast({ title: "Email copied", description: EMAIL }),
        () => toast({ title: "Couldn't copy email", description: EMAIL })
      );
    });

  const bookCall = () =>
    runCommand(() => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else {
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      }
    });

  const actionItems = [
    { label: "Copy email", icon: Copy, onSelect: copyEmail },
    {
      label: "Open résumé PDF",
      icon: FileText,
      onSelect: () => openExternal(RESUME_URL),
    },
    {
      label: "Open GitHub",
      icon: Github,
      onSelect: () => openExternal(GITHUB_URL),
    },
    {
      label: "Open LinkedIn",
      icon: Linkedin,
      onSelect: () => openExternal(LINKEDIN_URL),
    },
    { label: "Book a call", icon: CalendarClock, onSelect: bookCall },
  ];

  return (
    <CommandPaletteContext.Provider
      value={{ openPalette: () => handleOpenChange(true) }}
    >
      {children}
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigate">
            {navigateItems.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => navigateTo(item.href)}
              >
                <item.icon />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Theme">
            {themeOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => runCommand(() => setTheme(option.value))}
              >
                <option.icon />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Actions">
            {actionItems.map((item) => (
              <CommandItem
                key={item.label}
                value={item.label}
                onSelect={item.onSelect}
              >
                <item.icon />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Jump to">
            {sectionItems.map((item) => (
              <CommandItem
                key={item.id}
                value={item.label}
                onSelect={() => jumpToSection(item.id)}
              >
                <item.icon />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}
