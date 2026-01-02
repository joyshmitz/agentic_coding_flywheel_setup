# FINAL Workflow: З урахуванням Wave 2+3 coordination

## 📊 PRE-EXECUTION STATE

### Lesson Agents ЗАВЕРШЕНО:
- ✅ **Wave 2 Tools:** 4 lessons, 4 getters, коміт 07af758
- ✅ **Wave 3 Development:** 3 lessons integration
- ✅ **translations.ts:** 7+ lesson getters готові
- ✅ **Build system:** Протестований з lesson files

### Наш plan timing: **2.65 години** (vs 8.8h sequential)

---

## ⚡ ФАЗА 0: Discovery (15 хв)

```bash
# Субагент A: CSS Audit
Task({
  subagent_type: "Explore",
  description: "CSS spacing audit",
  prompt: "CSS spacing issues mapping для flywheel/page.tsx, workflow/page.tsx, troubleshooting/page.tsx, learn/page.tsx, flywheel-visualization.tsx"
})

# Субагент B: Current State + Jargon
Task({
  subagent_type: "Explore",
  description: "State analysis",
  prompt: "Аналіз jargon.tsx + поточний стан translations.ts - всі lesson exports (Wave 2+3), щоб додати наші getters безпечно"
})

# Субагент C: Content Inventory
Task({
  subagent_type: "Explore",
  description: "Content scan",
  prompt: "Inventory для page.tsx data arrays та UI component labels"
})
```

---

## 🚀 ФАЗА 1: Foundation (30 хв)

```bash
# Agent 1: Build Infrastructure
"agent-1-build-css-30min.md Phase 1"

# Agent 2: Hydration Fix
"agent-2-hydration-fix-30min.md"
```

**Signal:** "🔥 BUILD+HYDRATION READY"

---

## ⚡ ФАЗА 2: Core Work (100 хв)

```bash
# Agent 1 (continued): CSS Blitz (60 хв)
"agent-1-build-css-30min.md Phase 2"

# Agent 3: Jargon i18n (55 хв) - EXTENDED
"agent-3-jargon-messages-45min.md + LESSON COORDINATION"
# APPEND getJargonMessages() ПІСЛЯ всіх lesson getters

# Agent 4: Hero Tooltips (45 хв)
"agent-4-hero-tooltips-45min.md"

# Agent 5: Home Arrays (90 хв) - COORDINATION
"agent-5-home-arrays-90min.md + LESSON COORDINATION"
# APPEND home getters ПІСЛЯ jargon

# Agent 6: UI Labels (60 хв) - COORDINATION
"agent-6-ui-labels-60min.md + LESSON COORDINATION"
# APPEND component getters в кінець

# Agent 7: Flywheel Popup (45 хв)
"agent-7-flywheel-popup-45min.md"
```

**Signal:** "⚡ CORE LOCALIZATION DONE"

---

## 🎯 ФАЗА 3: Validation (35 хв)

```bash
# Agent 8: Extended Integration Testing
"agent-8-integration-test-30min.md EXTENDED"
# Build validation з Wave 2+3 files
# Locale testing на core + lesson pages
# Performance з розширеною lesson базою

# Субагент D: Full System Validation
Task({
  description: "Complete validation",
  prompt: "TypeScript compilation, всі exports working (lesson + core), build success, no conflicts"
})
```

---

## 📋 SAFE COORDINATION

### translations.ts Final Structure:
```typescript
// ІСНУЮЧІ (lesson getters Wave 2+3):
export function getNtmPaletteLessonMessages(locale)    // Wave 2
export function getNtmCoreLessonMessages(locale)       // Wave 2
export function getAgentsLoginLessonMessages(locale)   // Wave 2
export function getCassLessonMessages(locale)          // Wave 2
export function getUbsLessonMessages(locale)           // Wave 3
export function getGithubCliLessonMessages(locale)     // Wave 3
export function getGitBasicsLessonMessages(locale)     // Wave 3

// ДОДАЄМО (наші core getters):
export function getJargonMessages(locale)              // Agent 3
export function getHomeWorkflowSteps(locale)           // Agent 5
export function getHomeEligibility(locale)             // Agent 5
export function getHomePricing(locale)                 // Agent 5
export function getComponentLabels(locale)             // Agent 6
```

### Risk Level: **LOW**
- Різні directories (lessons/ vs core)
- Append-only pattern безпечний
- Lesson patterns встановлені

---

## ⏱️ FINAL TIMING

- **Phase 0:** 15 хв
- **Phase 1:** 30 хв
- **Phase 2:** 100 хв (+coordination overhead)
- **Phase 3:** 35 хв (extended testing)

**TOTAL: 3 години** (vs 8.8h sequential) = **66% reduction**

---

## 🎯 SUCCESS DEFINITION

### Core Achievement:
- Professional Ukrainian website
- Stable tooltip system
- Original flywheel problem SOLVED
- Zero conflicts з lesson work

### Extended Achievement:
- Core + Lesson pages working Ukrainian
- Build system robust з повною базою
- i18n система production-ready
- Scalable coordination model proven

---

## ✅ ПЛАН ГОТОВИЙ

**Повний coordination з Wave 2+3 врахований.**

**Готовий почати Phase 0 discovery?**