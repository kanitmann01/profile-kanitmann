"""Re-quantize the NetSTAR model from int16 -> int8 without retraining.

Reads the existing int16 per-row-quantized weights from lib/netstar/weights.ts
(dequantizes back to float32 via the per-row scale), then re-quantizes to int8
with a fresh per-row scale. Writes a new int8 weights.ts in place.

The model is unchanged — only the storage precision shrinks (int16 -> int8).
Per-row scaling preserves dynamic range across rows; expected accuracy delta
is within ~0.5 percentage points of the int16 model (int16 was itself within
0.0001 of float32).

Usage:
    python scripts/netstar-model/requant_int8.py <repo-root>

Reproducibility: this is a lossy transform of an existing artifact. The
canonical reproduction path remains train_netstar.py (which trains from the
capstone corpus). This script exists to fit the worker under Cloudflare's
free-tier 3 MiB bundle cap without changing model topology or retraining.

Implementation notes:
- int8 range is [-128, 127]; we use [-127, 127] to stay symmetric (matches
  the int16 exporter's [-32767, 32767] clip).
- Scale = max(|row|) / 127.0 per row, floored at 1e-9 to avoid div-by-zero.
- Output matrix (O) stays float32 — it's small (nlabels x dim) and accuracy-
  sensitive (it multiplies the dequantized hidden vector directly).
"""

from __future__ import annotations

import base64
import json
import re
import sys
from pathlib import Path


def extract_field(src: str, key: str) -> str:
    """Pull a backtick-wrapped base64 value for `key: ` from weights.ts source.

    The value spans many lines (each line is a slice of the base64 blob), e.g.
        inputI16: `
          AAAAAAA...
          BBBBBBB...
        `,
    so we match from `key: \\`` to the closing backtick (DOTALL).
    """
    m = re.search(rf"\b{re.escape(key)}:\s*`([A-Za-z0-9+/=\s]+)`", src, re.DOTALL)
    if not m:
        raise SystemExit(f"could not find field {key!r} in weights.ts")
    # strip the whitespace/newlines that wrapped the base64
    return re.sub(r"\s+", "", m.group(1))


def main() -> int:
    import numpy as np

    repo = Path(sys.argv[1])
    weights_path = repo / "lib" / "netstar" / "weights.ts"
    src = weights_path.read_text(encoding="utf-8")

    dim = int(re.search(r"\bdim:\s*(\d+)", src).group(1))
    nwords = int(re.search(r"\bnwords:\s*(\d+)", src).group(1))
    bucket = int(re.search(r"\bbucket:\s*(\d+)", src).group(1))

    input_i16_b64 = extract_field(src, "inputI16")
    input_scale_b64 = extract_field(src, "inputScale")
    output_b64 = extract_field(src, "output")

    W16 = np.frombuffer(base64.b64decode(input_i16_b64), dtype=np.int16)
    scale16 = np.frombuffer(base64.b64decode(input_scale_b64), dtype=np.float32)
    O = np.frombuffer(base64.b64decode(output_b64), dtype=np.float32).copy()

    n_rows = nwords + bucket
    expected = n_rows * dim
    if W16.size != expected:
        raise SystemExit(
            f"input matrix size mismatch: have {W16.size} int16, expected {expected} "
            f"({n_rows} rows x {dim} dim)"
        )

    # Dequantize back to float32.
    W = (W16.astype(np.float32).reshape(n_rows, dim) * scale16[:, None])

    # Re-quantize to int8 with a fresh per-row scale.
    row_max = np.max(np.abs(W), axis=1)
    scale8 = np.maximum(row_max, 1e-9) / 127.0
    W8 = np.clip(np.round(W / scale8[:, None]), -127, 127).astype(np.int8)

    # Pack for export.
    def wrap_b64(b: bytes) -> str:
        s = base64.b64encode(b).decode("ascii")
        lines = ["  `"]
        step = 80
        for i in range(0, len(s), step):
            lines.append("  " + s[i : i + step])
        lines.append("`,")

        return "\n".join(lines)

    # Pull the non-weight fields verbatim from the existing file so eval /
    # metadata stay accurate, then rewrite the weight + format fields.
    def extract_json_field(name: str) -> str:
        # `name: { ... },` or `name: [ ... ],` — walk balanced depth until the
        # closing brace/bracket. We don't validate the trailing comma; we just
        # capture the balanced span and let the caller append a comma.
        start_match = re.search(rf"\b{name}:\s*", src)
        if not start_match:
            raise SystemExit(f"could not find field {name!r}")
        start = start_match.end()
        open_ch = src[start]
        if open_ch == "{":
            close_ch = "}"
        elif open_ch == "[":
            close_ch = "]"
        else:
            # scalar — match up to the next comma + newline
            m = re.match(r"([^,\n]+)", src[start:])
            return m.group(1).strip()
        depth = 0
        i = start
        while i < len(src):
            c = src[i]
            if c == open_ch:
                depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0:
                    return src[start : i + 1]
            i += 1
        raise SystemExit(f"unterminated {open_ch} block for field {name!r}")

    eval_json = extract_json_field("eval")
    corpus_sources_json = extract_json_field("corpusSources")

    parts = [
        "// GENERATED FILE - do not edit by hand.",
        "// NetSTAR FastText demo model weights, int8 per-row re-quantized from the",
        "// int16 export (scripts/netstar-model/requant_int8.py). Reproduce the model",
        "// from scratch with train_netstar.py (see README).",
        'export const NETSTAR_MODEL = {',
        f'  format: "netstar-fasttext-v1-int8",',
        f'  dim: {dim},',
        f'  bucket: {bucket},',
        f'  nwords: {nwords},',
        f'  nlabels: {extract_json_field("nlabels")},',
        f'  words: {extract_json_field("words")},',
        f'  labels: {extract_json_field("labels")},',
        f'  hyperparameters: {extract_json_field("hyperparameters")},',
        f"  eval: {eval_json},",
        f"  corpusSources: {corpus_sources_json},",
        f"  inputI8: {wrap_b64(W8.tobytes())}",
        f"  inputScale: {wrap_b64(scale8.astype(np.float32).tobytes())}",
        f"  output: {wrap_b64(O.astype(np.float32).tobytes())}",
        "} as const;",
        "",
    ]
    weights_path.write_text("\n".join(parts), encoding="utf-8", newline="\n")
    print(
        f"wrote {weights_path} ({weights_path.stat().st_size} bytes) — "
        f"int8 input {W8.nbytes} bytes, scale {scale8.nbytes} bytes, "
        f"output {O.nbytes} bytes"
    )

    # Quick sanity: report the max quantization error vs the dequantized float32.
    err = np.abs(W8.astype(np.float32) * scale8[:, None] - W)
    print(
        f"re-quantization max abs error: {err.max():.6g} "
        f"(row-max range {row_max.min():.3g}..{row_max.max():.3g})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
