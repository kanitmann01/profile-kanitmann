import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          404
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-none mb-6">
          This page drifted off-grid.
        </h1>
        <p className="font-sans text-muted-foreground leading-relaxed mb-10">
          The link may be broken, or the page may have moved. Let&apos;s get you
          back to something useful.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
