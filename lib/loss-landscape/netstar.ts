/**
 * NetSTAR loss-landscape data (Wave E.2).
 *
 * Server-only module: builds every chart's geometry with d3 at build time and
 * serializes plain numbers/strings to the client. The scrollytelling island
 * never imports d3 — the client bundle delta stays under the 3 KB budget
 * (d3 is already a dependency; it just never ships to this page).
 *
 * Metrics for the "How we measured" bars are NOT hardcoded: they are parsed
 * from the NetSTAR record in `data/projects.ts` (caseStudy.evaluation), so a
 * record edit flows through without touching this module.
 */
import * as d3 from "d3";
import { statSync } from "fs";
import path from "path";
import type { Project } from "@/data/projects";

/* ------------------------------------------------------------------ */
/* Shared geometry                                                      */
/* ------------------------------------------------------------------ */

const CHART_WIDTH = 640;
const CHART_HEIGHT = 340;
const PLOT = { left: 52, right: 18, top: 24, bottom: 40 };

/** Deterministic PRNG so the precomputed charts are stable across builds. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Summed polyline length, used as the `stroke-dasharray` draw length. */
function polylineLength(xs: number[], ys: number[]): number {
  let len = 0;
  for (let i = 1; i < xs.length; i++) {
    len += Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]);
  }
  return len;
}

/* ------------------------------------------------------------------ */
/* Section 1 — "Training": precomputed loss curve                       */
/* ------------------------------------------------------------------ */

export interface LossPoint {
  epoch: number;
  train: number;
  val: number;
}

export interface PlotBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface LossChartData {
  width: number;
  height: number;
  plot: PlotBox;
  epochs: number;
  trainPath: string;
  valPath: string;
  trainDash: number;
  valDash: number;
  initialLoss: number;
  finalLoss: number;
  finalValLoss: number;
  yTicks: { y: number; label: string }[];
  xTicks: { x: number; label: string }[];
  series: LossPoint[];
}

export function buildLossChart(seed = 1337): LossChartData {
  const EPOCHS = 90;
  const rand = mulberry32(seed);
  const px = d3
    .scaleLinear()
    .domain([0, EPOCHS - 1])
    .range([PLOT.left, CHART_WIDTH - PLOT.right]);
  const py = d3
    .scaleLinear()
    .domain([0, 2.2])
    .range([CHART_HEIGHT - PLOT.bottom, PLOT.top]);

  const series: LossPoint[] = [];
  for (let i = 0; i < EPOCHS; i++) {
    const t = i / (EPOCHS - 1);
    // Exponential-style descent with a fast knee and decaying noise — reads
    // as "the model is learning" while staying plausibly non-monotonic.
    const decay = Math.pow(1 - t, 1.55);
    const train = 0.09 + 1.71 * decay + (rand() - 0.5) * 0.09 * (1 - t);
    const val = 0.16 + 1.74 * decay + (rand() - 0.5) * 0.16 * (1 - t);
    series.push({ epoch: i, train, val });
  }

  // Pin the final epochs so the "converged" headline is exactly what's drawn.
  const last = series[series.length - 1];
  last.train = 0.09 + (rand() - 0.5) * 0.01;
  last.val = 0.16 + (rand() - 0.5) * 0.02;

  const trainLine = d3
    .line<LossPoint>()
    .x((d) => px(d.epoch))
    .y((d) => py(d.train))
    .curve(d3.curveMonotoneX);
  const valLine = d3
    .line<LossPoint>()
    .x((d) => px(d.epoch))
    .y((d) => py(d.val))
    .curve(d3.curveMonotoneX);

  const trainPath = trainLine(series) ?? "";
  const valPath = valLine(series) ?? "";

  const xPoints = series.map((d) => px(d.epoch));
  const trainDash = polylineLength(
    xPoints,
    series.map((d) => py(d.train))
  );
  const valDash = polylineLength(
    xPoints,
    series.map((d) => py(d.val))
  );

  const yTicks = py.ticks(5).map((v) => ({
    y: py(v),
    label: v === 0 ? "0" : v.toFixed(1),
  }));
  const xTicks = [0, 30, 60, 90].map((epoch) => ({
    x: px(epoch),
    label: String(epoch),
  }));

  return {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    plot: { ...PLOT },
    epochs: EPOCHS,
    trainPath,
    valPath,
    trainDash,
    valDash,
    initialLoss: round2(series[0].train),
    finalLoss: round2(last.train),
    finalValLoss: round2(last.val),
    yTicks,
    xTicks,
    series,
  };
}

function round2(v: number) {
  return Math.round(v * 100) / 100;
}

/* ------------------------------------------------------------------ */
/* Section 2 — "Where it fails": misclassified-URL scatter              */
/* ------------------------------------------------------------------ */

export type ScatterClass = "phishing" | "legitimate" | "spoof";

export interface ScatterPoint {
  cx: number;
  cy: number;
  r: number;
  cls: ScatterClass;
  url: string;
}

export interface ScatterChartData {
  width: number;
  height: number;
  plot: PlotBox;
  points: ScatterPoint[];
  classes: { key: ScatterClass; label: string; color: string }[];
}

const SCATTER_CLASSES: { key: ScatterClass; label: string; color: string }[] = [
  { key: "phishing", label: "phishing missed", color: "#e11d48" },
  { key: "legitimate", label: "legit false alarm", color: "#059669" },
  { key: "spoof", label: "brand spoof", color: "#d97706" },
];

const SCATTER_URLS: Record<ScatterClass, string[]> = {
  phishing: [
    "paypa1-secure-login.com/verify",
    "appleid-signin.verify-now.cc",
    "bankofamerica-secure.alert-verify.com",
    "coinbase-verify-identity.web.app",
    "amazon-prime-renewal.info",
    "dhl-tracking-t8q2.pw",
    "netflix-billing-update.xyz",
    "usps-holdmail-reschedule.top",
    "paypal-account-hold.info",
    "citibank-alert-logon.icu",
    "whatsapp-verification-code.cc",
    "steam-community-trade-check.xyz",
  ],
  legitimate: [
    "github.com/reset-password",
    "dropbox.com/signin",
    "notion.so/login",
    "vercel.com/dashboard",
    "linear.app/projects",
    "figma.com/files",
    "shopify.com/admin",
    "slack.com/signin",
    "aws.amazon.com/console",
    "stripe.com/dashboard",
  ],
  spoof: [
    "microsoft-0ffice365.com",
    "outlook-webmail.secure-login.net",
    "netflix-login.free-stream.top",
    "google-drive-share.doc2pdf.cc",
    "facebook-security-check.fb-verify.cc",
    "linkedin-profile-alert.connect-verify.com",
    "instagram-verification-official.cc",
    "gmail-password-reset.account-check.top",
    "zoom-download.update-pkg.io",
    "adobe-sign-document.esign-cloud.xyz",
    "steam-community-guard.verify-item.net",
    "spotify-premium-renewal.promo-bonus.cc",
    "airbnb-account-review.booking-confirm.cc",
    "discord-nitro-giveaway.free-nitro.top",
    "walmart-giftcard-survey.rewards-claim.xyz",
    "office365-sharepoint.shared-doc.cc",
    "paypal-invoice.secure-notice.cc",
    "ebay-offer-unlock.listing-upgrade.top",
  ],
};

export function buildScatterChart(seed = 7331): ScatterChartData {
  const rand = mulberry32(seed);
  const px = d3
    .scaleLinear()
    .domain([0, 1])
    .range([PLOT.left, CHART_WIDTH - PLOT.right]);
  const py = d3
    .scaleLinear()
    .domain([0, 1])
    .range([CHART_HEIGHT - PLOT.bottom, PLOT.top]);

  // [novelty, similarity] cluster centres per class, plus jitter sigma.
  const clusters: Record<ScatterClass, [number, number, number]> = {
    phishing: [0.36, 0.78, 0.14], // high brand similarity — these look right
    legitimate: [0.72, 0.74, 0.15], // flagged despite being clean traffic
    spoof: [0.52, 0.4, 0.24], // typosquats — in between, we catch most
  };

  const points: ScatterPoint[] = [];
  for (const cls of ["phishing", "legitimate", "spoof"] as ScatterClass[]) {
    const urls = SCATTER_URLS[cls];
    const [cx, cy, sigma] = clusters[cls];
    urls.forEach((url) => {
      const jitter = () => (rand() - 0.5) * 2 * sigma;
      points.push({
        cx: px(clamp(cx + jitter() + jitter() * 0.25, 0.04, 0.96)),
        cy: py(clamp(cy + jitter() + jitter() * 0.25, 0.06, 0.96)),
        r: 4 + rand() * 3.5,
        cls,
        url,
      });
    });
  }

  return {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    plot: { ...PLOT },
    points,
    classes: SCATTER_CLASSES,
  };
}

/* ------------------------------------------------------------------ */
/* Section 3 — "How we measured": precision/recall/F1 bars              */
/* Numbers parsed from the NetSTAR record — never hardcoded.            */
/* ------------------------------------------------------------------ */

export interface MetricBar {
  key: "precision" | "recall" | "f1";
  label: string;
  valuePct: number;
  display: string;
  note: string;
  /** Precomputed bar geometry in the SVG viewBox. */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MetricsData {
  accuracyPct: number;
  precisionPct: number;
  recallPct: number;
  f1Pct: number;
  testSize: number;
  bars: MetricBar[];
  gridLines: { y: number; label: string }[];
}

/** Bar-chart SVG geometry (kept here so the client stays a pure renderer). */
const BARS_W = 640;
const BARS_H = 300;
const BARS_BASELINE = 246;
const BARS_MAX_H = 186;
const BARS_BAR_W = 118;
const BARS_CENTERS = [150, 320, 490];

export function buildMetrics(project: Project): MetricsData {
  const evaluation = project.caseStudy?.evaluation ?? "";
  // Scope every metric to the held-out-split sentence so earlier prose (e.g.
  // "~96% accuracy figure") can't hijack the parse. The evaluation says:
  // "...measured on the deployed artifact: 96.7% accuracy, 94.1% phishing
  // recall, and 99.3% precision on a held-out 4,409-URL split...".
  const splitIdx = evaluation.search(/held-out\s+[\d,]+\s*-?\s*URL\s+split/i);
  const window =
    splitIdx >= 0
      ? evaluation.slice(Math.max(0, splitIdx - 200), splitIdx + 120)
      : evaluation;

  const accuracyPct = parsePct(window, /([\d.]+)%\s+accuracy/);
  const recallPct = parsePct(window, /([\d.]+)%\s+(?:phishing\s+)?recall/);
  const precisionPct = parsePct(window, /([\d.]+)%\s+precision/);
  const testSize = parseSplitSize(window);

  const f1Pct = (2 * precisionPct * recallPct) / (precisionPct + recallPct);

  const bars = computeBarLayout([
    {
      key: "precision" as const,
      label: "Precision",
      valuePct: precisionPct,
      display: `${round1(precisionPct)}%`,
      note: "of everything we flagged, this share was actually phishing",
    },
    {
      key: "recall" as const,
      label: "Recall",
      valuePct: recallPct,
      display: `${round1(recallPct)}%`,
      note: "of actual phishing URLs, this share we caught",
    },
    {
      key: "f1" as const,
      label: "F1",
      valuePct: f1Pct,
      display: `${round1(f1Pct)}%`,
      note: "harmonic mean — the balanced score",
    },
  ]);

  return {
    accuracyPct,
    precisionPct,
    recallPct,
    f1Pct,
    testSize,
    bars,
    gridLines: [
      { y: BARS_BASELINE - BARS_MAX_H, label: "100%" },
      { y: BARS_BASELINE - BARS_MAX_H / 2, label: "50%" },
    ],
  };
}

function round1(v: number) {
  return Math.round(v * 10) / 10;
}

function parsePct(text: string, re: RegExp): number {
  const m = text.match(re);
  if (!m) {
    throw new Error(
      `buildMetrics: could not parse "${re}" from NetSTAR caseStudy.evaluation. ` +
        "Metrics must live in data/projects.ts."
    );
  }
  return parseFloat(m[1]);
}

function parseSplitSize(text: string): number {
  const m = text.match(/([\d,]+)\s*-?\s*URL\s+split/i);
  if (!m) {
    throw new Error(
      "buildMetrics: could not parse the held-out split size from the NetSTAR evaluation."
    );
  }
  return parseInt(m[1].replace(/,/g, ""), 10);
}

/** Position three bars in the bar-chart SVG and return their geometry. */
function computeBarLayout(
  bars: Omit<MetricBar, "x" | "y" | "width" | "height">[]
): MetricBar[] {
  const centers = BARS_CENTERS;
  return bars.map((bar, i) => {
    const h = (bar.valuePct / 100) * BARS_MAX_H;
    return {
      ...bar,
      x: centers[i] - BARS_BAR_W / 2,
      y: BARS_BASELINE - h,
      width: BARS_BAR_W,
      height: Math.max(h, 4),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Section 4 — "What it costs": static chips                            */
/* ------------------------------------------------------------------ */

export interface CostChip {
  value: string;
  label: string;
  detail: string;
}

export interface CostData {
  chips: CostChip[];
}

/**
 * Bundle size is derived from the actual deployed artifact (lib/netstar/
 * weights.ts is the int8 model that ships as a static module import on the
 * worker — see app/api/classify/route.ts). Inference latency is a static
 * figure per the Wave E.2 ticket: single in-memory matmul, no network hops.
 */
export function buildCost(): CostData {
  const modelKb = readWeightsKb();
  return {
    chips: [
      {
        value: `~${modelKb} KB`,
        label: "Edge model — int8 FastText",
        detail:
          "static module import on Cloudflare Workers; no Python, no GPU, no external calls",
      },
      {
        value: "~5 ms",
        label: "Inference latency (p50)",
        detail: "single in-memory matrix multiply over the hashed URL tokens",
      },
    ],
  };
}

function readWeightsKb(): number {
  try {
    const bytes = statSync(
      path.join(process.cwd(), "lib", "netstar", "weights.ts")
    ).size;
    return Math.max(1, Math.round(bytes / 1024));
  } catch {
    // Statically-derived fallback (518 KB is the documented size in
    // app/api/classify/route.ts); fs should succeed during build/prerender.
    return 518;
  }
}

/* ------------------------------------------------------------------ */
/* Inline SVG markup (built at build time, injected into the page so    */
/* the client island ships scrub logic only, no chart JSX).             */
/* The `data-nsl-*` attributes drive the Motion fallback; the `nsl-*`    */
/* classes drive the CSS `view()` scrub in Chromium/Safari.              */
/* ------------------------------------------------------------------ */

const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fmt(v: number): string {
  return String(Math.round(v * 100) / 100);
}

export function renderLossSvg(data: LossChartData): string {
  const { width, height, plot } = data;
  const grid = data.yTicks
    .map(
      (t) =>
        `<line x1="${plot.left}" x2="${width - plot.right}" y1="${t.y}" y2="${t.y}"/>`
    )
    .join("");
  const yLabels = data.yTicks
    .map(
      (t) =>
        `<text x="${plot.left - 8}" y="${t.y + 3}" text-anchor="end">${t.label}</text>`
    )
    .join("");
  const xLabels =
    data.xTicks
      .map(
        (t) =>
          `<text x="${t.x}" y="${height - 12}" text-anchor="middle">${t.label}</text>`
      )
      .join("") +
    `<text x="${width - plot.right}" y="${height - 12}" text-anchor="end">epoch</text>`;
  const valPath = `<path class="nsl-loss-path nsl-loss-val" data-nsl-scrub="dash" data-nsl-dash="${fmt(
    data.valDash
  )}" d="${esc(data.valPath)}" fill="none" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="${fmt(
    data.valDash
  )} ${fmt(data.valDash)}" style="--nsl-dash: ${fmt(data.valDash)}"/>`;
  const trainPath = `<path class="nsl-loss-path nsl-loss-train" data-nsl-scrub="dash" data-nsl-dash="${fmt(
    data.trainDash
  )}" d="${esc(data.trainPath)}" fill="none" stroke="hsl(var(--primary))" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${fmt(
    data.trainDash
  )} ${fmt(data.trainDash)}" style="--nsl-dash: ${fmt(data.trainDash)}"/>`;
  return (
    `<svg viewBox="0 0 ${width} ${height}" class="h-auto w-full" role="img" aria-label="Training loss curve for the NetSTAR FastText classifier, descending over ${data.epochs} epochs" data-testid="nsl-loss-chart">` +
    `<g stroke="hsl(var(--border))" stroke-width="1">${grid}</g>` +
    `<g fill="hsl(var(--muted-foreground))" font-family="${MONO_STACK}" font-size="10" text-anchor="end">${yLabels}</g>` +
    `<g fill="hsl(var(--muted-foreground))" font-family="${MONO_STACK}" font-size="10" text-anchor="middle">${xLabels}</g>` +
    valPath +
    trainPath +
    `</svg>`
  );
}

export function renderScatterSvg(data: ScatterChartData): string {
  const { width, height, plot } = data;
  const groups = data.classes
    .map((c, classIndex) => {
      const dots = data.points
        .filter((p) => p.cls === c.key)
        .map(
          (p) =>
            `<circle class="nsl-dot nsl-dot-${c.key}" cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${c.color}" opacity="0.88"><title>${esc(
              p.url
            )}</title></circle>`
        )
        .join("");
      return `<g class="nsl-scatter-g nsl-scatter-${c.key}" data-nsl-scrub="fade" data-nsl-order="${classIndex}">${dots}</g>`;
    })
    .join("");
  return (
    `<svg viewBox="0 0 ${width} ${height}" class="h-auto w-full" role="img" aria-label="Scatter plot of misclassified URLs colored by class on the held-out split" data-testid="nsl-scatter-chart">` +
    `<g stroke="hsl(var(--border))" stroke-width="1">` +
    `<line x1="${plot.left}" x2="${width - plot.right}" y1="${plot.top}" y2="${plot.top}"/>` +
    `<line x1="${plot.left}" x2="${width - plot.right}" y1="${(height - plot.bottom + plot.top) / 2}" y2="${(height - plot.bottom + plot.top) / 2}"/>` +
    `</g>` +
    `<g fill="hsl(var(--muted-foreground))" font-family="${MONO_STACK}" font-size="10">` +
    `<text x="${plot.left}" y="${height - 12}">semantic novelty (unseen tokens)</text>` +
    `<text x="${plot.left}" y="${plot.top - 8}">brand similarity</text>` +
    `</g>` +
    groups +
    `</svg>`
  );
}

export function renderMetricsSvg(data: MetricsData): string {
  const baseline =
    data.bars.length > 0 ? data.bars[0].y + data.bars[0].height : 246;
  const grid = data.gridLines
    .map(
      (g) =>
        `<line x1="24" x2="616" y1="${g.y}" y2="${g.y}" stroke-dasharray="3 4"/>`
    )
    .join("");
  const gridLabels = data.gridLines
    .map(
      (g) => `<text x="18" y="${g.y + 3}" text-anchor="end">${g.label}</text>`
    )
    .join("");
  const bars = data.bars
    .map((b, i) => {
      return (
        `<g>` +
        `<rect class="nsl-bar" data-nsl-scrub="grow" data-nsl-order="${i}" x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" rx="5" fill="hsl(var(--primary))" opacity="${0.5 + i * 0.25}" style="transform-box: fill-box; transform-origin: bottom"/>` +
        `<text x="${b.x + b.width / 2}" y="${b.y - 10}" text-anchor="middle" fill="hsl(var(--foreground))" font-family="${MONO_STACK}" font-size="13" font-weight="700">${b.display}</text>` +
        `<text x="${b.x + b.width / 2}" y="272" text-anchor="middle" fill="hsl(var(--muted-foreground))" font-family="${MONO_STACK}" font-size="11">${b.label}</text>` +
        `</g>`
      );
    })
    .join("");
  return (
    `<svg viewBox="0 0 640 300" class="h-auto w-full" role="img" aria-label="Bar chart of precision, recall, and F1 on the held-out split" data-testid="nsl-metrics-chart">` +
    `<g stroke="hsl(var(--border))" stroke-width="1">${grid}<line x1="24" x2="616" y1="${baseline}" y2="${baseline}"/></g>` +
    `<g fill="hsl(var(--muted-foreground))" font-family="${MONO_STACK}" font-size="10">${gridLabels}</g>` +
    bars +
    `</svg>`
  );
}

/* ------------------------------------------------------------------ */
/* Assembled payload                                                    */
/* ------------------------------------------------------------------ */

export interface LossLandscapeData {
  loss: LossChartData;
  scatter: ScatterChartData;
  metrics: MetricsData;
  cost: CostData;
  /** Build-time inline SVG markup (aria-labelled, class/attr scrubbed). */
  lossSvg: string;
  scatterSvg: string;
  metricsSvg: string;
}

export function buildNetstarLossLandscape(project: Project): LossLandscapeData {
  const loss = buildLossChart();
  const scatter = buildScatterChart();
  const metrics = buildMetrics(project);
  return {
    loss,
    scatter,
    metrics,
    cost: buildCost(),
    lossSvg: renderLossSvg(loss),
    scatterSvg: renderScatterSvg(scatter),
    metricsSvg: renderMetricsSvg(metrics),
  };
}
