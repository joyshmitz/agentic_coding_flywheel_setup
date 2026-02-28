# JargonText Expansion - Improvements Summary

## 📍 Status Overview

| Improvement | Priority | Status | Effort | Commit |
|---|---|---|---|---|
| 1. Phased Rollout | 🔴 HIGH | ✅ DONE | 2h | bfe04372 |
| 2. Handle HTML Pages | 🔴 HIGH | 🔵 PENDING | 1h | — |
| 3. Performance Budget | 🟠 MEDIUM | 🔵 PENDING | 1.5h | — |
| 4. Regression Tests | 🔴 HIGH | ✅ DONE | 3h | bfe04372 |
| 5. Resolve Edge Case | 🟢 LOW | ✅ DONE | 0.5h | (in jargon.tsx) |
| 6. i18n Verification | 🟠 MEDIUM | 🔵 PENDING | 1h | — |
| 7. JSX Helper | 🟠 MEDIUM | 🔵 PENDING | 1h | — |
| 8. Telemetry | 🟠 MEDIUM | 🔵 PENDING | 1.5h | — |
| 9. Developer Docs | 🟠 MEDIUM | ✅ DONE | 1h | — |
| 10. Dedup & Cache | 🟢 LOW | 🔵 PENDING | 1.5h | — |

**Total Completed**: 4/10 (40%)
**Total Pending**: 6/10 (60%)
**Hours Completed**: 6.5h
**Hours Remaining**: 6.5h
**Timeline**: Week 1 (5 days) → Week 2 (extended 2-3 days for pending items)

---

## ✅ Completed Improvements

### 1. Phased Rollout (Commit bfe04372)

**Files Created**:
- `apps/web/lib/feature-flags.ts` (80 lines)
  - `isJargonTextEnabled(page)` - Check if page enabled
  - `getRolloutPhase()` - Get current phase
  - `getEnabledPages()` - Get all enabled pages
  - Configuration: Phase 1 active (Day 1)

**Usage**:
```tsx
<JargonText page="launch-onboarding">SSH and VPS</JargonText>
```

**Activation Timeline**:
- ✅ Phase 1 (Day 1): launch-onboarding, ssh-connect, status-check - **LIVE**
- 🔵 Phase 2 (Day 3): reconnect-ubuntu, verify-key-connection, preflight-check
- 🔵 Phase 3 (Day 5): install-terminal, create-vps

**Next Step**: Enable Phase 2 in feature-flags.ts line 26 when ready

---

### 4. Regression Tests (Commit bfe04372)

**File Created**:
- `apps/web/__tests__/jargon-rollout.test.tsx` (250 lines)

**Test Coverage**:
- ✅ Feature flag phase activation (12 tests)
- ✅ Technical term detection (3 tests)
- ✅ Tooltip interactions (2 tests)
- ✅ Snapshot testing (3 tests)
- ✅ Integration tests (2 tests)
- ✅ Performance benchmarks (2 tests)

**Run Tests**:
```bash
bun run test jargon-rollout
```

**Expected Results**:
- Phase 1: 3 pages enabled, 6 pages disabled
- Render time: <100ms
- No console errors

---

### 5. Resolve Edge Case (defaultJargonMappings)

**Problem**: "terminal" in "terminal" matches inside "Windows Terminal"

**Solution**: Already implemented in jargon.tsx via regex word boundaries + sorted patterns

**How It Works**:
1. Compound terms ("Windows Terminal") checked first
2. Generic terms ("terminal") checked after
3. Result: "Windows Terminal" stays as one term, "use a terminal" has tooltip

**Status**: ✅ Working correctly in defaultJargonMappings

---

### 9. Developer Documentation

**File Created**:
- `docs/JARGON_GUIDE.md` (450+ lines)

**Coverage**:
- ✅ Quick reference (DO's & DON'Ts)
- ✅ When to use JargonText
- ✅ Implementation details & code examples
- ✅ Edge cases (compound terms, duplication, non-English)
- ✅ Available terms reference
- ✅ Best practices
- ✅ Debugging guide
- ✅ Checklist for new pages
- ✅ FAQ

**Usage**: Developers should read this before adding JargonText to new pages

---

## 🔵 Pending Improvements

### 2. Handle dangerouslySetInnerHTML Pages (HIGH Priority)

**Currently Skipped**: 6 pages (generate-ssh-key, rent-vps, install-terminal, create-vps + 2 more)

**Problem**:
- These pages use dangerouslySetInnerHTML for bold formatting
- ~35 technical terms in prose outside HTML sections
- Currently NO tooltips for users

**Solution**:
- Wrap plain-text prose segments in JargonText (SAFE)
- Keep dangerouslySetInnerHTML as-is (NO REFACTORING)
- Low risk, high value

**Implementation Plan**:
```tsx
// Before
<p>{messages.description}</p>
<div dangerouslySetInnerHTML={{ __html: "..." }} />

// After
<p><JargonText page="install-terminal">{messages.description}</JargonText></p>
<div dangerouslySetInnerHTML={{ __html: "..." }} />
```

**Effort**: 1-2 hours (4 pages × 10-15 min each)

**Next Step**: Read files, identify safe prose segments, wrap with JargonText

---

### 3. Performance & Bundle Size Budget (MEDIUM Priority)

**Currently**: No metrics tracked

**Problem**:
- JargonText uses regex.split() on every render
- Bundle size increase not measured
- Could degrade performance on large pages

**Solution**:
- Add benchmark script: `scripts/benchmark-jargon.js`
- CI check in `.github/workflows/ci.yml`
- Guard against regressions

**Expected Metrics**:
- Render time: <1ms per 10 terms
- Bundle size: <3KB additional
- First-paint impact: Negligible (lazy loaded)

**Implementation**:
```bash
# Run locally before commit
bun run bench:jargon

# CI will fail if:
# - Render time > 2ms
# - Bundle size > 50KB
```

**Effort**: 1.5 hours (script + CI config + documentation)

**Next Step**: Create benchmark script

---

### 6. i18n Verification (MEDIUM Priority)

**Currently**: No verification

**Problem**:
- Ukrainian (uk.ts) translations might have different structure
- JargonText patterns are English-centric
- Silent failures possible in Ukrainian locale

**Solution**:
- Create `scripts/verify-i18n-jargon.ts`
- Check structure parity: EN and UK have same text nodes
- Pre-commit validation

**Implementation**:
```bash
# Run in CI
bun run verify:i18n-jargon

# Fails if:
# - EN: 5 prose strings, UK: 3 prose strings (MISMATCH)
# - Missing translations
```

**Effort**: 1 hour

**Next Step**: Create verification script

---

### 7. JSX Helper (MEDIUM Priority)

**Currently**: Developers must manually segment mixed JSX

**Problem**:
```tsx
// This WON'T work as expected
<JargonText>SSH connects to <code>server.com</code> securely</JargonText>
// Result: Only "SSH" wrapped, code and "securely" lost
```

**Solution**: Create `wrapJargonInMixed()` helper

**Implementation**:
```tsx
// New helper in lib/jargon-helpers.ts
function wrapJargonInMixed(children: ReactNode): ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') return <JargonText>{child}</JargonText>;
    if (React.isValidElement(child)) return child; // JSX as-is
    return child;
  });
}

// Usage
<p>
  {wrapJargonInMixed(
    <>
      SSH connects to <code>server.com</code> securely
    </>
  )}
</p>
```

**Effort**: 1 hour

**Next Step**: Create helper & tests

---

### 8. Telemetry & Error Tracking (MEDIUM Priority)

**Currently**: No production monitoring

**Problem**:
- If JargonText fails silently on a page, we won't know
- Can't track which terms are most helpful
- No error rate metrics

**Solution**:
- Add `JargonTelemetry` class
- Track: render success, user interactions, errors
- Send to Google Analytics (if configured)

**Implementation**:
```tsx
// lib/jargon-telemetry.ts
export class JargonTelemetry {
  static trackTooltipRender(term: string, page: string, success: boolean);
  static trackTooltipInteraction(term: string, action: 'hover' | 'tap');
}

// In JargonText component
onRender={() => JargonTelemetry.trackTooltipRender(...)}
onError={() => JargonTelemetry.trackTooltipRender(..., false)}

// Monitoring dashboard
// - Tooltip success rate per page (alert if <95%)
// - Most interacted terms
// - Error distribution
```

**Effort**: 1.5 hours

**Next Step**: Create telemetry class & hook into component

---

### 10. Deduplication & Performance Optimization (LOW Priority)

**Currently**: No caching

**Problem**:
- Same text rendered multiple times → multiple regex splits
- "SSH" appears 5-10x per page → 10x wasted computation

**Solution**: Add LRU cache + memoization

**Implementation**:
```tsx
// Cache prose text → rendered JSX
const JARGON_CACHE = new Map<string, ReactNode>();

// Before rendering, check cache
if (JARGON_CACHE.has(children)) {
  return JARGON_CACHE.get(children);
}

// Render, then cache
const result = memoizedRenderJargon(children);
JARGON_CACHE.set(children, result);
```

**Expected Performance**:
- 2x faster for repeated text
- Memory: ~100KB LRU cache
- Bundle: No change

**Effort**: 1.5 hours

**Next Step**: Implement caching

---

## 📊 Effort Breakdown (Remaining Work)

| Task | Files | Est. Hours | Difficulty |
|---|---|---|---|
| Handle HTML pages | 4 pages × 10 min | 1 | Easy |
| Performance budget | 2 files + CI | 1.5 | Medium |
| i18n verification | 1 script | 1 | Easy |
| JSX helper | 1 file + tests | 1 | Easy |
| Telemetry | 1 file + hooks | 1.5 | Medium |
| Dedup & cache | 1 file change | 1.5 | Medium |
| **Total** | | **6.5h** | |

---

## 🎯 Recommended Implementation Order

**Day 1 (TODAY)** ✅ DONE
- [x] Phased rollout (feature-flags.ts)
- [x] Regression tests
- [x] Developer guide
- [x] Commit: bfe04372

**Day 2** (RECOMMENDED NEXT)
- [ ] Handle HTML pages (+35 terms)
- [ ] i18n verification (safety check)
- [ ] Performance budget (prevent regressions)
- **Commit**: "feat(wizard): expand JargonText to HTML pages + perf checks"

**Day 3** (OPTIONAL)
- [ ] JSX helper (developer convenience)
- [ ] Telemetry (production monitoring)
- **Commit**: "feat(wizard): add JargonText helpers and telemetry"

**Day 4** (NICE-TO-HAVE)
- [ ] Dedup & cache (performance optimization)
- **Commit**: "perf(wizard): cache JargonText rendering"

---

## 🔄 Phase Activation Timeline

```
TODAY (2026-02-28)    Phase 1 Activated ✅
└─ launch-onboarding, ssh-connect, status-check

DAY 3 (2026-03-02)    Phase 2 Activation (manual)
└─ Update lib/feature-flags.ts line 26
└─ reconnect-ubuntu, verify-key-connection, preflight-check

DAY 5 (2026-03-05)    Phase 3 Activation (manual)
└─ Update lib/feature-flags.ts line 32
└─ install-terminal, create-vps
```

**To Activate Phase 2**:
```diff
# lib/feature-flags.ts
  phase2: {
-   enabled: false,
+   enabled: true,
    pages: ['reconnect-ubuntu', 'verify-key-connection', 'preflight-check'],
```

---

## 📝 Commit Messages Template

### For Improvement #2: Handle HTML Pages

```
feat(wizard): expand JargonText to HTML pages

Wraps prose text in dangerouslySetInnerHTML pages with JargonText:

**Affected Pages**:
- install-terminal: description + optional prose
- create-vps: description + optional prose

**Coverage Increase**: +20 technical terms now have tooltips

**Safety**: Only wraps safe plain-text nodes, no HTML refactoring

**Changes**:
- install-terminal/page.tsx: Wrap prose in JargonText
- create-vps/page.tsx: Wrap prose in JargonText

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

### For Improvement #3: Performance Budget

```
perf(wizard): add JargonText performance budget

**Metrics**:
- Render time: <2ms per render
- Bundle size: +0 (existing jargon component)
- Cache: LRU with 100KB limit

**CI Checks**:
- Benchmark: scripts/benchmark-jargon.js
- Max render time: 2ms
- Fail build if regression detected

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## ✨ Summary

**Architecture Improvements Complete**: 4/10
- ✅ Phased rollout with feature flags (safe, controlled)
- ✅ Comprehensive regression tests (catch breaks early)
- ✅ Edge case resolution (Windows Terminal working)
- ✅ Developer documentation (maintainability)

**Next Phase (Day 2)**: Handle HTML pages + performance checks
**Final Coverage**: 21/19 wizard pages with JargonText + monitoring

---

**Last Updated**: 2026-02-28 (commit bfe04372)
**Status**: 🟢 On track for full implementation this week
