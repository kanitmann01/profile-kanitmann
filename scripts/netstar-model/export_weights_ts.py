"""Generate lib/netstar/weights.ts from a train_netstar.py export JSON.

Usage: python scripts/netstar-model/export_weights_ts.py <export.json> <repo-root>
"""
from __future__ import annotations

import json
import sys
from pathlib import Path


def wrap_b64(b64: str) -> str:
    lines = ["  `"]
    step = 80
    for i in range(0, len(b64), step):
        lines.append(b64[i : i + step])
    lines.append("`,")
    return "\n".join(lines)


def main() -> int:
    export_path = Path(sys.argv[1])
    repo = Path(sys.argv[2])
    exp = json.loads(export_path.read_text(encoding="utf-8"))

    parts = [
        "// GENERATED FILE - do not edit by hand.",
        "// NetSTAR FastText demo model weights, quantized int16 (per-row scale).",
        "// Reproduce with: scripts/netstar-model/train_netstar.py (see README).",
        "export const NETSTAR_MODEL = {",
        f'  format: {json.dumps(exp["format"])},',
        f'  dim: {exp["dim"]},',
        f'  bucket: {exp["bucket"]},',
        f'  nwords: {exp["nwords"]},',
        f'  nlabels: {exp["nlabels"]},',
        f'  words: {json.dumps(exp["words"], ensure_ascii=False)},',
        f'  labels: {json.dumps(exp["labels"], ensure_ascii=False)},',
        f'  hyperparameters: {json.dumps(exp["hyperparameters"])},',
        f'  eval: {json.dumps(exp["eval"])},',
        f'  corpusSources: {json.dumps(exp["corpus_sources"])},',
        f'  inputI16: {wrap_b64(exp["inputI16B64"])}',
        f'  inputScale: {wrap_b64(exp["inputScaleB64"])}',
        f'  output: {wrap_b64(exp["outputB64"])}',
        "} as const;",
        "",
    ]
    out = repo / "lib" / "netstar" / "weights.ts"
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(parts))
    print("wrote", out, out.stat().st_size, "bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
