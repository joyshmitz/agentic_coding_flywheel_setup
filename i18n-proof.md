RED baseline: 77/77 routes failed (exit 1)
Scope: 13c0ef54
Date: 2026-02-08T16:45:00+00:00
Detector: v3 (innerText, Agentic whitelisted)

Known noise: token gluing (FlywheelEnglish, CodeCodex) - DOM spacing issue

---

## Batch 1 checkpoint: 58/77

Commit: 8c5b544f
Date: 2026-02-08
Detector: v4 (camelCase normalizer, all-caps acronym splitter, compound brand stripping)
Gate: 58/77 routes failing, 19 pass

Passing routes (19):
  /learn/tools/claude-code
  /learn/tools/codex-cli
  /learn/tools/gemini-cli
  /learn/tools/ntm
  /learn/tools/beads
  /learn/tools/agent-mail
  /learn/tools/ubs
  /learn/tools/cass
  /learn/tools/cm
  /learn/tools/caam
  /learn/tools/slb
  /learn/tools/dcg
  /learn/tools/ru
  /learn/tools/ms
  /learn/tools/apr
  /learn/tools/jfp
  /learn/tools/pt
  /learn/tools/srps
  /learn/tools/xf

Top offenders (remaining):
  32 × Agent
  21 × to
  16 × flywheel
  15 × Mail
  15 × for
  13 × agent, with, is
  12 × Pro, the, and, root
  11 × coding, all, code, Check
  10 × Cloud, of, agents, search

Remaining batches:
  Batch 2: lesson components (~30 routes) — EN content in JSX
  Batch 3: wizard + glossary + shared pages (~27 routes)
