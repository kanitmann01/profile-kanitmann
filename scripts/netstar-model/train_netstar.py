"""Train and export the NetSTAR FastText demo model (Exp 13).

Reproduces lib/netstar/weights.ts from the NetSTAR-labeled URL corpus
(capstone repo: https://github.com/kanitmann01/capstone):

1. Builds a URL-only FastText corpus with capstone's own serializer
   (scripts/build_fasttext_corpus_url_only.py -> scanner/*), so the demo's
   feature tokens are byte-identical to the production pipeline.
2. Stratified 80/20 train/test split (seed 42), trains fasttext with
   capstone's hyperparameters (dim=64, epoch=50, lr=0.2, wordNgrams=3,
   minCount=2, bucket=2048, softmax loss).
3. Evaluates on the held-out split with the exact predict semantics the
   TypeScript engine implements (vocab rows + word-n-gram bucket rows,
   mean, softmax) and records the numbers.
4. Exports int16 per-row-quantized weights + labels + eval into a JSON
   artifact; lib/netstar/weights.ts is generated from it.

Requirements: Python 3.12 + uv (or venv) with:
  uv pip install fasttext-wheel numpy
(numpy 2.x requires patching fasttext-wheel 0.9.2's `np.array(probs,
copy=False)` -> `np.asarray(probs)` in FastText.py to call model.predict;
training itself does not need the patch.)

Usage:
  uv venv .venv -p 3.12
  uv pip install --python .venv/Scripts/python.exe fasttext-wheel numpy
  python scripts/netstar-model/train_netstar.py \\
      --capstone-dir <path-to-capstone> --out-dir <tmp-out>
  python scripts/netstar-model/export_weights_ts.py <export.json> <repo-root>
"""
from __future__ import annotations

import argparse
import base64
import csv
import json
import random
import sys
from collections import Counter
from pathlib import Path

import numpy as np

SEED = 42
TEST_FRAC = 0.2
DIM = 64
EPOCH = 50
LR = 0.2
WORD_NGRAMS = 3
MIN_COUNT = 2
BUCKET = 2048
LABEL_PREFIX = "__label__"


def fnv1a32(word: str) -> int:
    h = 2166136261
    for ch in word.encode("utf-8"):
        h ^= ch
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--capstone-dir", required=True, help="Path to the capstone repo checkout")
    parser.add_argument("--out-dir", required=True, help="Where to write corpus/model/export artifacts")
    args = parser.parse_args()

    capstone = Path(args.capstone_dir)
    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)
    sys.path.insert(0, str(capstone))
    sys.path.insert(0, str(capstone / "scripts"))

    import fasttext  # noqa: PLC0415
    from scripts.build_fasttext_corpus_url_only import serialize_url_only  # noqa: PLC0415
    from scanner.brand_recognition import BrandRecognitionDetector  # noqa: PLC0415

    random.seed(SEED)
    rng = np.random.default_rng(SEED)

    def load_rows(csv_path: Path) -> list[dict[str, str]]:
        rows = []
        with open(csv_path, newline="", encoding="utf-8", errors="replace") as fh:
            for row in csv.DictReader(fh):
                url = (row.get("url") or "").strip()
                label = (row.get("is_phishing") or "").strip().lower()
                if url and label in {"0", "1"}:
                    rows.append({"url": url, "is_phishing": label})
        return rows

    rows: dict[str, dict[str, str]] = {}
    for source in [
        capstone / "old-data" / "baseline.csv",
        capstone / "phishing_features_extracted_6_features.csv",
    ]:
        for row in load_rows(source):
            rows.setdefault(row["url"], row)
    rows_list = list(rows.values())
    print(
        f"unique labeled URLs: {len(rows_list)}",
        dict(Counter(r["is_phishing"] for r in rows_list)),
    )

    phish = [r for r in rows_list if r["is_phishing"] == "1"]
    clean = [r for r in rows_list if r["is_phishing"] == "0"]
    rng.shuffle(phish)
    rng.shuffle(clean)
    cut_p = int(len(phish) * TEST_FRAC)
    cut_c = int(len(clean) * TEST_FRAC)
    train_rows = phish[cut_p:] + clean[cut_c:]
    test_rows = phish[:cut_p] + clean[:cut_c]
    print(f"train: {len(train_rows)}  test: {len(test_rows)}")

    detector = BrandRecognitionDetector()

    def build_corpus(rs: list[dict[str, str]]) -> list[str]:
        lines = []
        for r in rs:
            try:
                lines.append(serialize_url_only(r["url"], r["is_phishing"], detector))
            except Exception as exc:
                print("skip", r["url"], exc)
        return lines

    train_corpus = build_corpus(train_rows)
    test_corpus = build_corpus(test_rows)
    train_path = out / "netstar-train.txt"
    test_path = out / "netstar-test.txt"
    train_path.write_text("\n".join(train_corpus) + "\n", encoding="utf-8")
    test_path.write_text("\n".join(test_corpus) + "\n", encoding="utf-8")

    model = fasttext.train_supervised(
        input=str(train_path),
        dim=DIM, epoch=EPOCH, lr=LR, wordNgrams=WORD_NGRAMS,
        minCount=MIN_COUNT, loss="softmax", bucket=BUCKET,
    )
    model_path = out / "netstar-demo.bin"
    model.save_model(str(model_path))

    # --- held-out eval with the exact TS predict semantics ---
    words = model.get_words()
    labels = model.get_labels()
    args = model.f.getArgs()
    nwords = len(words)
    bucket = int(args.bucket)
    word_index = {w: i for i, w in enumerate(words)}
    W = np.asarray(model.get_input_matrix(), dtype=np.float32)
    O = np.asarray(model.get_output_matrix(), dtype=np.float32)

    def v1_probs(tokens: list[str]) -> np.ndarray:
        hashes = [fnv1a32(t) for t in tokens]
        rows: list[int] = [word_index[t] for t in tokens if t in word_index]
        n = len(hashes)
        for i in range(n):
            h = hashes[i]
            for j in range(i + 1, min(n, i + WORD_NGRAMS)):
                h = (h * 116049371 + hashes[j]) & 0xFFFFFFFFFFFFFFFF
                rows.append(nwords + (h % bucket))
        hidden = W[rows].mean(axis=0)
        scores = O @ hidden
        p = np.exp(scores - scores.max())
        return p / p.sum()

    test_lines = [ln for ln in test_corpus if ln.strip()]
    y_true = np.array([1 if ln.split()[0] == f"{LABEL_PREFIX}phishing" else 0 for ln in test_lines])
    y_pred = np.array([int(v1_probs(ln.split()[1:])[0] > 0.5) for ln in test_lines])
    tp = int(((y_pred == 1) & (y_true == 1)).sum())
    fp = int(((y_pred == 1) & (y_true == 0)).sum())
    fn = int(((y_pred == 0) & (y_true == 1)).sum())
    tn = int(((y_pred == 0) & (y_true == 0)).sum())
    eval_metrics = {
        "n_test": int(len(y_true)),
        "n_train": int(len(train_corpus)),
        "accuracy": round(float((y_pred == y_true).mean()), 4),
        "precision_phishing": round(tp / (tp + fp), 4) if tp + fp else 0.0,
        "recall_phishing": round(tp / (tp + fn), 4) if tp + fn else 0.0,
        "f1_phishing": round(2 * tp / (2 * tp + fp + fn), 4) if tp + fp + fn else 0.0,
        "confusion": {"tp": tp, "tn": tn, "fp": fp, "fn": fn},
    }
    print(json.dumps(eval_metrics, indent=2))

    # --- export int16 per-row quantized weights ---
    row_max = np.max(np.abs(W), axis=1)
    scale = np.maximum(row_max, 1e-9) / 32767.0
    W16 = np.clip(np.round(W / scale[:, None]), -32767, 32767).astype(np.int16)
    export = {
        "format": "netstar-fasttext-v1-int16",
        "dim": int(args.dim),
        "bucket": bucket,
        "nwords": nwords,
        "nlabels": len(labels),
        "words": words,
        "labels": labels,
        "inputI16B64": base64.b64encode(W16.tobytes()).decode("ascii"),
        "inputScaleB64": base64.b64encode(scale.astype(np.float32).tobytes()).decode("ascii"),
        "outputB64": base64.b64encode(O.astype(np.float32).tobytes()).decode("ascii"),
        "hyperparameters": {
            "dim": DIM, "epoch": EPOCH, "lr": LR, "wordNgrams": WORD_NGRAMS,
            "minCount": MIN_COUNT, "loss": "softmax", "bucket": BUCKET,
        },
        "eval": eval_metrics,
        "corpus_sources": [
            "capstone/old-data/baseline.csv (20,000 labeled URLs)",
            "capstone/phishing_features_extracted_6_features.csv (2,356 labeled URLs)",
        ],
    }
    export_path = out / "netstar-model-export.json"
    export_path.write_text(json.dumps(export), encoding="utf-8")
    print("export:", export_path, export_path.stat().st_size, "bytes")
    print("next: python scripts/netstar-model/export_weights_ts.py <export.json> <repo-root>")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
