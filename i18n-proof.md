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

---

GREEN: 0/77 routes failing, 77 pass
Scope: 13c0ef54
Date: 2026-02-08
Detector: v5 (attached-clone innerText for correct block boundaries)

Changes from Batch 1 → GREEN:
  - Detector: extractText now temporarily attaches clone to DOM for correct
    innerText block boundaries (fixes h3+p gluing like "MacmacOS")
  - Whitelist: added brand names (Mac, Debian, Fedora, Arch, Contabo, OVH,
    Microsoft, ChromeOS, Manjaro, Hubspot, Stripe)
  - Compound brands: added Agent Flywheel, Mac Mini, Mac Studio, Mac Pro,
    Oh My Zsh
  - Wizard layout: nav buttons use localized step titles via
    getWizardStepTranslations()
  - Lesson data: fixed "LLM-ready" → "промпти для LLM" in lessons.uk.ts
  - Tools page: fixed framer-motion LazyMotion strict mode error
    (import from @/components/motion instead of framer-motion)

All gates:
  check-tool-ids: 19/19 ✅
  check-lessons: 33/33 ✅
  type-check: ✅
  lint: 0 errors ✅
  build: ✅
  i18n:check: 77/77 ✅

---

## Post-merge re-validation: GREEN

Commit: 0c93018a
Date: 2026-02-21
Merge: upstream/main (71 commits) into translate-ukrainian-acfs

Upstream changes absorbed:
  - Claude update refactor (verified installer fallback)
  - AGENTS.md rewrite (+1017/-626 lines)
  - ntfy.sh notifications, git strategy lesson
  - Security checksums (dcg, pt, uv, mcp_agent_mail)
  - Mobile Safari fix (wizard os-selection, stepper)

Conflicts resolved (2):
  - keeping-updated-lesson.tsx — kept our .map() i18n iteration
  - scripts/lib/update.sh — accepted upstream's corrected logic

All gates:
  type-check: ✅
  build: ✅
  i18n:check: 77/77 ✅
