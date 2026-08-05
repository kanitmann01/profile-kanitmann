import type { ReactNode } from "react";
import { NetstarScrubChart } from "@/components/netstar/scrub-chart";
import type {
  LossLandscapeData,
  ScatterChartData,
} from "@/lib/loss-landscape/netstar";

/**
 * NetSTAR loss-landscape scrollytelling (Wave E.2) — server component.
 *
 * Four scroll-linked viewport sections that make the FastText classifier's
 * training legible to non-ML readers. All chart SVG is built at build time
 * in lib/loss-landscape/netstar.ts with d3 and injected by the tiny client
 * scrub island (NetstarScrubChart). The scrub itself runs on three
 * progressive-enhancement paths, mirroring the `.rv-*` reveal pattern:
 *
 * 1. CSS — Chromium/Safari drive `animation-timeline: view()` (zero JS).
 * 2. Motion — Firefox falls back to useScroll + useTransform.
 * 3. Reduced motion / mobile — charts render their final state statically.
 */
export function NetstarLossLandscape({ data }: { data: LossLandscapeData }) {
  return (
    <>
      <ScrollySection
        step="01"
        title="Training"
        headingId="nsl-training"
        copy={
          <>
            <p>
              The FastText classifier trained on 1B+ phishing URLs —{" "}
              {data.loss.epochs} epochs, then int8-quantized so it runs on the
              edge. Train loss falls from {data.loss.initialLoss.toFixed(2)} to{" "}
              {data.loss.finalLoss.toFixed(2)}; validation settles at{" "}
              {data.loss.finalValLoss.toFixed(2)}.
            </p>
            <p>
              Scroll slowly — the descent is the point. Every epoch eats a
              little more of the loss surface.
            </p>
          </>
        }
      >
        <NetstarScrubChart
          svg={data.lossSvg}
          caption="Cross-entropy loss by epoch"
          scrub="dash"
        >
          <LossLegend />
        </NetstarScrubChart>
      </ScrollySection>

      <ScrollySection
        step="02"
        title="Where it fails"
        headingId="nsl-fails"
        copy={
          <>
            <blockquote className="border-l-2 border-primary pl-4 italic">
              Subword tokenization handles unseen domains, but [UNK] still slips
              past — these are the ones we miss.
            </blockquote>
            <p>
              Each dot is a URL the classifier got wrong on the held-out split.
              Color is the class that slipped through — a missed phish costs
              more than a false alarm, so recall is the number to watch.
            </p>
          </>
        }
      >
        <NetstarScrubChart
          svg={data.scatterSvg}
          caption={`Misclassified URLs — held-out split (${data.scatter.points.length} dots)`}
          scrub="fade"
        >
          <ScatterLegend data={data.scatter} />
        </NetstarScrubChart>
      </ScrollySection>

      <ScrollySection
        step="03"
        title="How we measured"
        headingId="nsl-measured"
        copy={
          <>
            <p>
              A held-out split of{" "}
              {data.metrics.testSize.toLocaleString("en-US")} URLs, stratified
              by class and never seen during training.
            </p>
            <p>
              Overall accuracy on the split:{" "}
              <strong className="font-sans text-foreground">
                {data.metrics.accuracyPct}%
              </strong>
              . The bars scrub in as you scroll.
            </p>
          </>
        }
      >
        <NetstarScrubChart
          svg={data.metricsSvg}
          caption={`Held-out split — ${data.metrics.testSize.toLocaleString("en-US")} URLs, stratified by class`}
          scrub="grow"
        >
          <div className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
            {data.metrics.bars.map((b) => (
              <p key={b.key}>
                <span className="text-foreground">{b.label}</span> — {b.note}
              </p>
            ))}
          </div>
        </NetstarScrubChart>
      </ScrollySection>

      <ScrollySection
        step="04"
        title="What it costs"
        headingId="nsl-cost"
        copy={
          <>
            <p>
              Deploying this costs almost nothing to operate: the whole model is
              a static import on Cloudflare Workers — no GPU, no Python, no
              external API calls.
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Static figures from the deployed artifact.
            </p>
          </>
        }
      >
        <CostPanel cost={data.cost} />
      </ScrollySection>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Section chrome (server-rendered)                                     */
/* ------------------------------------------------------------------ */

function ScrollySection({
  step,
  title,
  headingId,
  copy,
  children,
}: {
  step: string;
  title: string;
  headingId: string;
  copy: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[100svh] w-screen items-center overflow-x-clip border-t border-border/70 ml-[calc(50%-50vw)]">
      <div className="mx-auto grid w-full max-w-[980px] gap-10 px-6 py-20 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-14 md:py-24">
        <div className="rv-rise-soft">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {step}
          </p>
          <h2
            id={headingId}
            className="mt-2 mb-4 font-serif text-3xl text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <div className="mb-6 h-0.5 w-12 bg-primary" />
          <div className="space-y-4 font-sans text-muted-foreground leading-relaxed">
            {copy}
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}

function LossLegend() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="h-0.5 w-5 bg-primary" />
        train loss
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="h-0.5 w-5 border-t border-dashed border-muted-foreground"
        />
        validation loss
      </span>
    </div>
  );
}

function ScatterLegend({ data }: { data: ScatterChartData }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
      {data.classes.map((c) => (
        <span key={c.key} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: c.color }}
          />
          {c.label}
        </span>
      ))}
    </div>
  );
}

function CostPanel({ cost }: { cost: LossLandscapeData["cost"] }) {
  return (
    <div className="grid gap-4" data-testid="nsl-cost-panel">
      {cost.chips.map((chip) => (
        <div
          key={chip.label}
          className="rounded-xl border border-border bg-muted/30 p-6"
        >
          <p className="font-serif text-4xl text-primary md:text-5xl">
            {chip.value}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-foreground">
            {chip.label}
          </p>
          <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
            {chip.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
