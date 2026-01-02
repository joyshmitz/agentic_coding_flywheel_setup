# Dependency Graph: Agent Coordination Matrix

## 🚀 CRITICAL PATH ANALYSIS

### Фаза 0: Instant Analysis (0-15 хв)
```
Субагент A (CSS Audit) ─┐
Субагент B (Jargon Analysis) ─┼── 15 хв ── Data Ready
Субагент C (Content Scan) ─┘
```

### Фаза 1: Critical Path (15-45 хв) - PARALLEL FOUNDATION
```
Agent 1 (Build+CSS) ── 30 хв ──┐
                                ├── "🔥 BUILD+HYDRATION READY"
Agent 2 (Hydration) ── 30 хв ──┘
```

### Фаза 2: Maximum Parallelism (45-120 хв)
```
Agent 1 (CSS Blitz) ── 60 хв ──┐
                                ├── "⚡ CORE LOCALIZATION DONE"
Agent 3 (Jargon i18n) ── 45 хв ┤
Agent 4 (Hero Tooltips) ── 45 хв ┤
Agent 5 (Home Arrays) ── 90 хв ┤
Agent 6 (UI Labels) ── 60 хв ──┘

Agent 7 (Flywheel Popup) ── DEPENDENCY ──> Agent 1 CSS
```

### Фаза 3: Integration (120-150 хв)
```
All Agents ──> Agent 8 (Integration Testing) ── 30 хв ── "✨ PRODUCTION READY"
```

---

## 📊 DETAILED DEPENDENCY MATRIX

| Agent | Depends On | Provides To | Parallel With | Blocks |
|-------|------------|-------------|---------------|--------|
| **Agent 1** | Субагент A | Agent 7 | Agent 2 | Agent 7 |
| **Agent 2** | None | Agent 3 | Agent 1 | Agent 3 |
| **Agent 3** | Agent 2 | All tooltip users | 4,5,6 | None |
| **Agent 4** | None | None | 3,5,6 | None |
| **Agent 5** | None | None | 3,4,6 | None |
| **Agent 6** | None | None | 3,4,5 | None |
| **Agent 7** | Agent 1 | None | None | None |
| **Agent 8** | All 1-7 | Production | None | Deployment |

---

## ⚡ CRITICAL PATH SEQUENCES

### Sequence 1: Build Infrastructure (BLOCKING)
```
0 хв: Agent 1 Start (Build Cleanup)
15 хв: Agent 1 Signal "🔥 BUILD INFRASTRUCTURE READY"
30 хв: Agent 1 Continue (CSS Blitz)
75 хв: Agent 1 Signal "⚡ CSS SPACING COMPLETE"
75 хв: Agent 7 Start (Flywheel Popup)
```

### Sequence 2: Hydration Foundation (SEMI-BLOCKING)
```
0 хв: Agent 2 Start (Hydration Fix)
30 хв: Agent 2 Signal "🔥 HYDRATION STABLE"
30 хв: Agent 3 Start (Jargon i18n)
75 хв: Agent 3 Signal "⚙️ JARGON I18N READY"
```

### Sequence 3: Parallel Content Work (NON-BLOCKING)
```
0 хв: Agents 4,5,6 Start (Parallel)
45 хв: Agent 4 Signal "🎯 HERO TOOLTIPS COMPLETE"
60 хв: Agent 6 Signal "🔄 UI LABELS COMPLETE"
90 хв: Agent 5 Signal "📖 HOME ARRAYS COMPLETE"
```

---

## 🔒 BLOCKING DEPENDENCIES

### Agent 1 → Agent 7 (FILE CONFLICT)
**Why Critical:**
- Both modify `flywheel-visualization.tsx`
- Agent 1: CSS classes (line 636)
- Agent 7: JS strings (popup content)
- **Risk:** Overwrite conflicts

**Mitigation:**
- Agent 1 signals completion with "⚡ CSS SPACING COMPLETE"
- Agent 7 waits before starting
- Agent 7 preserves Agent 1's CSS changes

### Agent 2 → Agent 3 (COMPONENT STABILITY)
**Why Important:**
- Agent 2: Hydration fixes in jargon.tsx
- Agent 3: i18n modifications to same file
- **Risk:** Unstable component foundation

**Mitigation:**
- Agent 2 completes hydration logic first
- Agent 3 builds on stable foundation
- Clear handoff with "🔥 HYDRATION STABLE" signal

---

## 🔄 NON-BLOCKING PARALLELS

### Agents 4, 5, 6 (INDEPENDENT)
**Why Parallel:**
- Different files: page.tsx (sections), stepper.tsx, command-card.tsx
- No shared dependencies
- No resource conflicts

**Coordination:**
- Agent 4: page.tsx hero section (lines ~150-200)
- Agent 5: page.tsx data arrays (lines 443+)
- Agent 6: stepper.tsx + command-card.tsx
- **Zero overlap**

### Agent 3 + Parallel Group (SAFE)
**Why Safe:**
- Agent 3: jargon.tsx component logic
- Agents 4-6: Using <Jargon> components
- **Relationship:** Provider → Consumers

---

## ⏰ TIMING OPTIMIZATION

### Bottleneck Analysis:
1. **Agent 5 (90 хв)** - Longest individual task
2. **Agent 1→7 sequence (75+45=120 хв)** - Longest dependency chain
3. **Agent 8 (30 хв)** - Final validation

### Parallelization Gains:
**Sequential approach:** 30+30+45+45+90+60+45+30 = **375 хв** (6.25 годин)
**Parallel approach:** max(30, 30) + max(60, 45, 45, 90, 60) + 45 + 30 = **30 + 90 + 45 + 30** = **195 хв** (3.25 годин)

**Optimization:** 47% time reduction through parallelization

---

## 🚨 RISK MITIGATION

### High-Risk Dependencies:
1. **Agent 1→7 File Conflict**
   - **Mitigation:** Clear signaling protocol
   - **Fallback:** Manual coordination if signals fail

2. **Agent 2→3 Component Handoff**
   - **Mitigation:** Stabilization testing
   - **Fallback:** Agent 3 includes hydration validation

3. **All→8 Integration Testing**
   - **Mitigation:** Comprehensive test matrix
   - **Fallback:** Incremental fix deployment

### Medium-Risk Dependencies:
1. **Субагент A→Agent 1**
   - **Risk:** CSS audit incomplete
   - **Mitigation:** Agent 1 can proceed with manual discovery

2. **Agent 3→Others (Optional)**
   - **Risk:** Jargon system unstable
   - **Mitigation:** Agents 4-6 can work without perfect tooltip system

---

## 📢 SIGNAL PROTOCOL

### Phase Completion Signals:
```
"🔥 BUILD INFRASTRUCTURE READY" (Agent 1 @ 15min)
"🔥 HYDRATION STABLE" (Agent 2 @ 30min)
"🔥 BUILD+HYDRATION READY" (Combined @ 30min)

"⚡ CSS SPACING COMPLETE" (Agent 1 @ 75min)
"⚙️ JARGON I18N READY" (Agent 3 @ 75min)
"🎯 HERO TOOLTIPS COMPLETE" (Agent 4 @ 45min)
"📖 HOME ARRAYS COMPLETE" (Agent 5 @ 90min)
"🔄 UI LABELS COMPLETE" (Agent 6 @ 60min)
"🔗 FLYWHEEL POPUPS LOCALIZED" (Agent 7 @ 120min)
"⚡ CORE LOCALIZATION DONE" (All core @ 120min)

"✨ INTEGRATION VERIFIED" (Agent 8 @ 150min)
"✨ PRODUCTION READY" (Final @ 150min)
```

### Signal Broadcasting:
- **Method:** Agent chat/coordination channel
- **Format:** Exact signal text for automation
- **Verification:** Recipient acknowledges receipt

---

## 🎯 CRITICAL SUCCESS FACTORS

### Must-Have Dependencies:
1. ✅ Build system stable (Agent 1 Phase 1)
2. ✅ Hydration fixed (Agent 2)
3. ✅ File conflicts avoided (Agent 1→7)

### Nice-to-Have Dependencies:
1. 🟡 CSS audit complete (Субагент A→Agent 1)
2. 🟡 Perfect Jargon system (Agent 3→Others)

### Success Metrics:
- **Zero blocking conflicts** achieved
- **Maximum parallelization** utilized
- **3x speed improvement** delivered
- **Production quality** maintained

**РЕЗУЛЬТАТ:** Efficient dependency management enabling 3.25-hour delivery vs 6.25-hour sequential approach