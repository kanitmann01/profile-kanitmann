/**
 * NetSTAR URL preprocessing — a TypeScript port of the capstone
 * (NetSTAR BrandGuard) URL-only feature pipeline:
 *
 *   scanner/normalization.py  -> normalizeInputUrl
 *   scanner/heuristics.py     -> URLHeuristics
 *   scanner/brand_recognition.py -> brand analysis (decision logic)
 *   scripts/build_fasttext_corpus_url_only.py -> serializeUrlOnly
 *
 * The token stream produced here is byte-for-byte the input the FastText
 * model was trained on (verified against the Python pipeline with an
 * equivalence fixture in lib/netstar/__tests__/).
 *
 * Deliberate approximations (documented in the module docs + case study):
 *  - tldextract's full Public Suffix List is replaced with a compact suffix
 *    set covering the corpus's TLDs (com/net/org/io/top/ru/... + multi-part
 *    suffixes like co.uk/com.au). Exotic TLDs fall back to "whole host is
 *    the root", which mirrors tldextract's no-suffix behavior.
 *  - FAISS ANN brand retrieval is replaced by an exact full scan (the
 *    verdict path only reads Levenshtein distance, so results are identical
 *    for the distance<=3 decision boundary).
 */

export interface NormalizedUrl {
  original: string;
  normalizedUrl: string;
  scheme: string;
  host: string;
  path: string;
  query: string;
  isIp: boolean;
}

export interface HeuristicSignals {
  isIpAddress: boolean;
  excessiveLength: boolean;
  suspiciousChars: boolean;
  keywordMasking: boolean;
}

export interface BrandAnalysis {
  status: "safe" | "scam" | "unknown";
  matchedBrand?: string;
  threatType?: string;
}

const IPV4_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

export function isIpAddress(value: string): boolean {
  if (value.includes(":")) return true; // IPv6 (bare heuristic, mirrors ipaddress for corpus shapes)
  const match = IPV4_RE.exec(value);
  if (!match) return false;
  return match.slice(1).every((octet) => Number(octet) <= 255);
}

/** Lower-case and strip trailing dots from a hostname. */
export function normalizeHost(host: string): string {
  return host.trim().toLowerCase().replace(/\.+$/, "");
}

/**
 * Port of scanner/normalization.py normalize_input_url. Throws on
 * unparseable input (the Python side also raises and skips the row).
 */
export function normalizeInputUrl(rawUrl: string): NormalizedUrl {
  const original = (rawUrl ?? "").trim();
  if (!original) throw new Error("URL is required.");
  const withScheme = original.includes("://") ? original : `http://${original}`;

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    throw new Error("URL host is missing or invalid.");
  }

  const host = normalizeHost(parsed.hostname || "");
  if (!host) throw new Error("URL host is missing or invalid.");

  const scheme = (parsed.protocol || "http:").replace(/:$/, "").toLowerCase();
  const path = parsed.pathname || "/";
  // Python: urlencode(sorted(parse_qsl(query, keep_blank_values=True)))
  const params = new URLSearchParams(parsed.search.slice(1));
  params.sort();
  const sortedQuery = params.toString();

  let port = parsed.port ? Number(parsed.port) : null;
  if (
    (scheme === "http" && port === 80) ||
    (scheme === "https" && port === 443)
  ) {
    port = null;
  }
  const netloc = port === null ? host : `${host}:${port}`;
  const normalizedUrl = `${scheme}://${netloc}${path}${sortedQuery ? `?${sortedQuery}` : ""}`;

  return {
    original,
    normalizedUrl,
    scheme,
    host,
    path,
    query: sortedQuery,
    isIp: isIpAddress(host),
  };
}

/**
 * Port of scanner/heuristics.py URLHeuristics (the four flags consumed by
 * the URL-only corpus serializer).
 */
export function urlHeuristics(target: NormalizedUrl): HeuristicSignals {
  const fullUrl = target.normalizedUrl;
  const suspiciousChars =
    fullUrl.includes("@") || target.host.split(".").length - 1 > 4;

  const suspiciousKeywords = [
    "paypal",
    "apple",
    "google",
    "microsoft",
    "facebook",
    "amazon",
    "bank",
    "login",
    "signin",
    "verify",
    "secure",
  ];
  let keywordMasking = false;
  for (const keyword of suspiciousKeywords) {
    if (!fullUrl.includes(keyword)) continue;
    if (!target.host.includes(keyword)) {
      keywordMasking = true;
      break;
    }
    if (target.path.includes(keyword) || target.query.includes(keyword)) {
      keywordMasking = true;
      break;
    }
  }

  return {
    isIpAddress: target.isIp,
    excessiveLength: fullUrl.length > 80,
    suspiciousChars,
    keywordMasking,
  };
}

/** Compact Public Suffix List subset (see module docstring). */
const PUBLIC_SUFFIXES = new Set([
  "com",
  "net",
  "org",
  "edu",
  "gov",
  "mil",
  "int",
  "info",
  "biz",
  "name",
  "mobi",
  "asia",
  "pro",
  "tel",
  "travel",
  "museum",
  "coop",
  "jobs",
  "post",
  "io",
  "co",
  "ai",
  "dev",
  "tech",
  "app",
  "blog",
  "shop",
  "site",
  "online",
  "store",
  "cloud",
  "xyz",
  "top",
  "club",
  "ru",
  "de",
  "fr",
  "jp",
  "cn",
  "in",
  "br",
  "au",
  "ca",
  "uk",
  "nl",
  "se",
  "no",
  "fi",
  "dk",
  "pl",
  "it",
  "es",
  "co.uk",
  "org.uk",
  "ac.uk",
  "gov.uk",
  "com.au",
  "net.au",
  "org.au",
  "co.nz",
  "net.nz",
  "org.nz",
  "co.jp",
  "ne.jp",
  "or.jp",
  "ac.jp",
  "go.jp",
  "co.in",
  "net.in",
  "org.in",
  "ac.in",
  "res.in",
  "gov.in",
  "co.kr",
  "or.kr",
  "ne.kr",
  "go.kr",
  "com.br",
  "com.mx",
  "com.cn",
  "net.cn",
  "org.cn",
  "github.io",
  "herokuapp.com",
  "netlify.app",
  "vercel.app",
  "web.app",
  "firebaseapp.com",
  "pages.dev",
  "workers.dev",
  "blogspot.com",
]);

export interface DomainParts {
  subdomain: string;
  root: string;
  tld: string;
  isHomograph: boolean;
}

/**
 * Port of tldextract-based preprocess_url in scanner/brand_recognition.py.
 * No-suffix hosts fall back to "whole host is the root" (tldextract parity).
 */
export function extractDomainParts(host: string): DomainParts {
  const labels = host.split(".");
  let subdomain = "";
  let root = "";
  let tld = "";
  if (labels.length > 1) {
    for (let len = Math.min(3, labels.length - 1); len >= 1; len--) {
      const suffix = labels.slice(labels.length - len).join(".");
      if (PUBLIC_SUFFIXES.has(suffix)) {
        const rootIdx = labels.length - len - 1;
        root = labels[rootIdx] ?? "";
        subdomain = labels.slice(0, rootIdx).join(".");
        tld = suffix;
        break;
      }
    }
  }
  if (!root) root = host;
  const isHomograph = /[^\x00-\x7f]/.test(root) || root.startsWith("xn--");
  return { subdomain, root, tld, isHomograph };
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array<number>(n + 1);
  let curr = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/** Port of _brand_in_subdomain: first brand contained in the stripped subdomain. */
export function brandInSubdomain(
  subdomain: string,
  brands: readonly string[]
): string {
  const normalized = subdomain.replace(/[-_.]/g, "");
  for (const brand of brands) {
    if (normalized.includes(brand)) return brand;
  }
  return "";
}

/**
 * Port of BrandRecognitionDetector.analyze_url verdict path. The FAISS
 * candidate retrieval is replaced by an exact scan: the verdict only
 * depends on Levenshtein distance <= 3, which the exact scan reproduces
 * completely (the ANN step was a search-space optimization, not a feature).
 */
export function analyzeBrand(
  url: string,
  brands: readonly string[]
): BrandAnalysis {
  let target: NormalizedUrl;
  try {
    target = normalizeInputUrl(url);
  } catch {
    return { status: "unknown" };
  }
  const { subdomain, root, isHomograph } = extractDomainParts(target.host);
  if (!root) return { status: "unknown" };

  if (brands.includes(root)) {
    return { status: "safe", matchedBrand: root };
  }

  const candidates = brands
    .map((brand) => ({ brand, distance: levenshtein(root, brand) }))
    .sort((x, y) => x.distance - y.distance || x.brand.localeCompare(y.brand));
  const closest = candidates[0];
  if (
    isHomograph &&
    closest &&
    closest.distance >= 0 &&
    closest.distance <= 3
  ) {
    return {
      status: "scam",
      matchedBrand: closest.brand,
      threatType: "homograph",
    };
  }
  const typo = candidates.find((c) => c.distance >= 1 && c.distance <= 3);
  if (typo) {
    return {
      status: "scam",
      matchedBrand: typo.brand,
      threatType: "typosquatting",
    };
  }
  const deceptive = brandInSubdomain(subdomain, brands);
  if (deceptive) {
    return {
      status: "scam",
      matchedBrand: deceptive,
      threatType: "deceptive_subdomain",
    };
  }
  return { status: "safe" };
}

/** Port of clean_text from scripts/build_fasttext_corpus_url_only.py. */
export function cleanText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Port of serialize_url_only: renders a URL into the FastText feature token
 * string (whitespace-joined; the model tokenizer splits on whitespace).
 */
export function serializeUrlOnly(
  rawUrl: string,
  brands: readonly string[]
): string {
  const target = normalizeInputUrl(rawUrl);
  const tokens: string[] = [];

  const host = cleanText(target.host);
  if (host) tokens.push(`__domain__${host}`);

  const path = cleanText(target.path);
  if (path && path !== "/") tokens.push(`__path__${path}`);

  const query = cleanText(target.query);
  if (query) tokens.push(`__query__${query}`);

  const heuristics = urlHeuristics(target);
  if (heuristics.isIpAddress) tokens.push("__signal__ip_address");
  if (heuristics.excessiveLength) tokens.push("__signal__excessive_length");
  if (heuristics.suspiciousChars) tokens.push("__signal__suspicious_chars");
  if (heuristics.keywordMasking) tokens.push("__signal__keyword_masking");

  const brand = analyzeBrand(rawUrl, brands);
  if (brand.status === "scam") {
    if (brand.matchedBrand)
      tokens.push(`__brand__${cleanText(brand.matchedBrand)}`);
    if (brand.threatType) tokens.push(`__signal__${brand.threatType}`);
  } else if (brand.matchedBrand) {
    tokens.push(`__brand__${cleanText(brand.matchedBrand)}`);
  }

  const urlLength = rawUrl.length;
  if (urlLength > 100) tokens.push("__feature__very_long_url");
  else if (urlLength > 60) tokens.push("__feature__long_url");

  if (target.host.split(".").length - 1 > 2)
    tokens.push("__feature__deep_subdomain");

  tokens.push(
    target.scheme === "https" ? "__feature__https" : "__feature__http"
  );

  if (tokens.length === 0) tokens.push("__feature__url_only");

  return tokens.join(" ");
}
