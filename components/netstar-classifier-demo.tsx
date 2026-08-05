"use client";

/**
 * NetSTAR live classification demo (Exp 13 flagship) — TEMPORARILY OFFLINE.
 *
 * The interactive classifier is disabled while backend work is in progress:
 * the URL input stays visible (disabled) with an explanatory status message,
 * and no request is ever fired. The research and architecture content around
 * this island is unaffected. Re-enable the fetch path when the backend is
 * back.
 *
 * Accessibility: labelled (disabled) input, status announced through a polite
 * live region. No motion is used (nothing to gate).
 */

const EXAMPLES = [
  {
    label: "Typosquat brand login",
    url: "http://paypal-account-verify.com/login",
  },
  { label: "Raw-IP login page", url: "http://192.168.1.1/bank/login" },
  { label: "Legit brand root", url: "http://netflix.com" },
];

export function NetstarClassifierDemo() {
  const inputId = "netstar-url-input";

  return (
    <div className="border border-border rounded-lg bg-muted/30 p-6 sm:p-8">
      <form
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor={inputId}
            className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            URL to classify
          </label>
          <input
            id={inputId}
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            disabled
            aria-disabled="true"
            placeholder="https://example.com/login"
            maxLength={2048}
            className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors font-mono text-sm opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-sans opacity-60 cursor-not-allowed"
          >
            Classify URL
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-muted-foreground">
              Try:
            </span>
            {EXAMPLES.map((example) => (
              <button
                key={example.url}
                type="button"
                disabled
                className="px-2 py-1 border border-border rounded-sm text-muted-foreground opacity-60 cursor-not-allowed font-mono"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      <div
        role="status"
        aria-live="polite"
        className="mt-6 min-h-[6rem]"
        aria-atomic="true"
      >
        <p className="text-sm text-foreground">
          Live demo is temporarily offline for backend work — coming back soon.
        </p>
        <p className="text-sm text-muted-foreground">
          The research, architecture, and evaluation on this page are
          unaffected. The classifier and its example URLs will return once the
          model backend is back up.
        </p>
      </div>
    </div>
  );
}
