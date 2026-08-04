# NetSTAR FastText demo model — reproduction

This directory reproduces the live model behind the NetSTAR case-study demo
(`/projects/netstar` → Live Demo → POST `/api/classify`).

## What ships in the repo

| File                        | Purpose                                                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/netstar/weights.ts`    | Generated model artifact: int16 per-row-quantized input matrix, output matrix, vocab, labels, eval metrics. Imported only by the edge route — never shipped to the browser. |
| `lib/netstar/fasttext.ts`   | FastText inference engine (pure TS, zero deps) implementing fasttext 0.9.2's predict semantics.                                                                             |
| `lib/netstar/preprocess.ts` | TS port of capstone's URL-only feature pipeline (normalization, heuristics, brand detection, token serializer).                                                             |
| `lib/netstar/classify.ts`   | Pipeline wrapper (URL text → tokens → prediction + latency).                                                                                                                |
| `app/api/classify/route.ts` | Edge route handler (`POST { url }` → verdict + confidence + latency).                                                                                                       |
| `lib/netstar/__tests__/`    | Unit tests incl. a Python-equivalence fixture (44 URLs generated with fasttext's own `predict()`).                                                                          |

## Model facts (measured, not claimed)

- **Training data:** 22,046 unique labeled URLs from the NetSTAR corpus
  (`capstone/old-data/baseline.csv` — 20,000 rows; `capstone/
phishing_features_extracted_6_features.csv` — 2,356 rows; both labeled
  `is_phishing`, source `netstar_csv`).
- **Split:** stratified 80/20, seed 42 → 17,637 train / 4,409 held-out.
- **Hyperparameters:** dim=64, epoch=50, lr=0.2, wordNgrams=3, minCount=2,
  bucket=2048, softmax loss (capstone's config).
- **Held-out eval (the exact semantics the TS engine implements):**
  accuracy 96.7%, phishing precision 99.3%, recall 94.1%.
- **Quantization:** int16 per-row scale — held-out accuracy is unchanged
  vs float32 to 4 decimal places; the artifact is ~0.9 MB (base64 in
  source) and runs a single request in <1 ms in Node, ~2-6 ms cold.

## Reproduce

Requirements: Python 3.12, `uv` (or a venv), a checkout of
https://github.com/kanitmann01/capstone (the NetSTAR source repo).

```bash
uv venv .venv -p 3.12
uv pip install --python .venv/Scripts/python.exe fasttext-wheel numpy
# NOTE: fasttext-wheel 0.9.2 calls np.array(probs, copy=False), which
# numpy 2.x rejects. Patch FastText.py: replace with np.asarray(probs).

python scripts/netstar-model/train_netstar.py \
    --capstone-dir <path-to-capstone> --out-dir <tmp-out>
python scripts/netstar-model/export_weights_ts.py \
    <tmp-out>/netstar-model-export.json .
```

`train_netstar.py` builds the corpus with capstone's own serializer
(`scripts/build_fasttext_corpus_url_only.py`), so the feature tokens the
demo sees are byte-identical to the production pipeline.

## Verification

- `lib/netstar/__tests__/fasttext.test.ts` asserts:
  - FNV-1a vectors and `addWordNgrams` hash mixing against reference values;
  - byte-identical URL → token serialization vs Python on 32 URLs;
  - per-URL label/probability parity vs fasttext's own `predict()` on a
    44-URL fixture (documented exceptions: fasttext-wheel emits malformed
    probabilities — p > 1.0 — on inputs under 9 tokens; those are asserted
    label-agnostic).
- Per-line agreement with the reference wheel on the full 4,409-URL held-out
  split: 98.3%.

## Fixture regeneration

`lib/netstar/__tests__/fixtures/netstar-python-equivalence.json` was
generated with the trained model's own `predict()` (see
`train_netstar.py`'s companion commands); regenerate it the same way after
retraining if you want the parity test to track a new model.
