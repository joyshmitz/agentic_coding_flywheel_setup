# Субагенти Протоколи: Task Tool Coordination

## 🎯 ФАЗА 0: Instant Analysis Субагенти (0-15 хв)

### Субагент A: CSS Pattern Audit
**Мета:** Знайти всі CSS spacing patterns для batch replacement

**Task Tool Call:**
```typescript
Task({
  subagent_type: "Explore",
  description: "CSS audit",
  prompt: `Знайти всі CSS spacing issues в наступних файлах:

  TARGET FILES:
  - apps/web/app/flywheel/page.tsx
  - apps/web/app/workflow/page.tsx
  - apps/web/app/troubleshooting/page.tsx
  - apps/web/app/learn/page.tsx
  - apps/web/components/flywheel-visualization.tsx

  SEARCH PATTERNS:
  - mb-4 (має бути mb-6 md:mb-8)
  - mb-3 (має бути mb-5 md:mb-6)
  - mb-2 (має бути mb-4)
  - tracking-[0.25em] (має бути tracking-[0.2em])
  - gap-1.5 (має бути gap-2)

  OUTPUT FORMAT:
  Створити мапу: FILE:LINE_NUMBER:OLD_VALUE → NEW_VALUE

  Example:
  apps/web/app/flywheel/page.tsx:269:mb-4 → mb-6 md:mb-8
  apps/web/app/flywheel/page.tsx:396:mb-4 → mb-6 md:mb-8
  `
})
```

**Expected Output:** Детальна мапа всіх CSS змін для Agent 1

---

### Субагент B: Jargon Analysis
**Мета:** Проаналізувати jargon.tsx для hardcoded strings та hydration patterns

**Task Tool Call:**
```typescript
Task({
  subagent_type: "Explore",
  description: "Jargon analysis",
  prompt: `Аналізувати apps/web/components/jargon.tsx для:

  1. HARDCODED STRINGS:
  - aria-label patterns
  - Tooltip text strings
  - Glossary link text
  - Button labels

  2. HYDRATION PATTERNS:
  - useLocale usage patterns
  - mounted state checking
  - SSR/CSR transition logic

  3. IMPORT DEPENDENCIES:
  - Existing imports structure
  - Where to insert new imports

  OUTPUT:
  - List of hardcoded strings з line numbers
  - Current hydration logic analysis
  - Import insertion points
  - Jargon component structure overview
  `
})
```

**Expected Output:** Complete jargon.tsx blueprint для Agents 2-3

---

### Субагент C: Content Structure Scan
**Мета:** Сканувати data arrays та UI labels для localization mapping

**Task Tool Call:**
```typescript
Task({
  subagent_type: "Explore",
  description: "Content scan",
  prompt: `Сканувати локалізаційний контент в:

  1. HOME PAGE ARRAYS (apps/web/app/page.tsx):
  - WORKFLOW_STEPS location та structure
  - FOR_YOU_ITEMS/NOT_FOR_YOU_ITEMS location
  - PRICING_ITEMS location
  - Line numbers для кожного array

  2. UI COMPONENT LABELS:
  - apps/web/components/stepper.tsx hardcoded statuses
  - apps/web/components/command-card.tsx button labels
  - aria-label patterns

  3. EXISTING i18n PATTERNS:
  - apps/web/lib/i18n/translations.ts current structure
  - Existing message file patterns
  - Import/export patterns

  OUTPUT:
  - Data array structures з types
  - UI label inventory з line numbers
  - i18n integration patterns
  - Scope estimate (кількість strings для локалізації)
  `
})
```

**Expected Output:** Comprehensive content inventory для Agents 4-6

---

## 🤖 ФАЗА 3: Automated Validation Субагент

### Субагент D: Automated Validation
**Мета:** Перевірити completion та consistency після Фази 2

**Task Tool Call:**
```typescript
Task({
  subagent_type: "general-purpose",
  description: "Validation",
  prompt: `Автоматично валідувати integration consistency:

  1. MESSAGE FILES VERIFICATION:
  - Кожний .ts файл має відповідний .uk.ts
  - Type consistency між EN та UK versions
  - No missing exports

  2. TRANSLATIONS.TS EXPORTS:
  - All getter functions properly exported
  - Import paths correct
  - Function signatures consistent

  3. TYPESCRIPT COMPILATION:
  - No type errors
  - All imports resolved
  - Component props compatibility

  4. FILE STRUCTURE INTEGRITY:
  - All expected files created
  - No orphaned references
  - Consistent naming patterns

  OUTPUT:
  - ✅/❌ status для кожної category
  - List of issues якщо знайдено
  - Recommendations для fixes
  `
})
```

**Expected Output:** Go/No-Go decision для production readiness

---

## 🚀 ФАЗА 4: Mass Tooltip Expansion Субагент

### Субагент E: Mass Tooltip Detection (ОПЦІОНАЛЬНО)
**Мета:** Batch detection технічних термінів у lesson components

**Task Tool Call:**
```typescript
Task({
  subagent_type: "general-purpose",
  description: "Mass tooltips",
  prompt: `Scan components/lessons/*.tsx для mass tooltip opportunities:

  1. TECHNICAL TERMS DETECTION:
  - SSH, VPS, CLI, API related terms
  - Programming language names
  - Tool names (Claude Code, GitHub, Docker, etc.)
  - Development concepts (repository, branch, commit, etc.)

  2. EXISTING JARGON DICTIONARY CHECK:
  - Cross-reference знайдені terms з apps/web/lib/jargon.ts
  - Identify terms already defined
  - Flag missing terms

  3. CANDIDATE GENERATION:
  - Generate <Jargon> wrapping candidates
  - Prioritize by frequency та educational value
  - Consider context appropriateness

  4. IMPLEMENTATION ESTIMATES:
  - File modification scope
  - Time estimates per component
  - Risk assessment

  OUTPUT:
  - Priority list термінів для wrapping
  - File-by-file implementation plan
  - Risk/benefit analysis
  - Time estimates
  `
})
```

**Expected Output:** Strategic plan for massive tooltip expansion

---

## 📋 СУБАГЕНТИ COORDINATION RULES

### Timing Sequence:
1. **Субагенти A, B, C**: Launch ПАРАЛЕЛЬНО (0 хв)
2. **Data Collection**: 15 хв maximum
3. **Agent handoff**: Передати data Agents 1-7
4. **Субагент D**: Launch після Agents 3-7 completion
5. **Субагент E**: Launch only if Phase 4 needed

### Task Tool Best Practices:
- **Specific prompts**: Detailed requirements, не загальні вказівки
- **Structured output**: Request specific formats для easy parsing
- **Scope limitation**: Clear boundaries для focused results
- **Context preservation**: Include file paths та line numbers

### Error Handling:
- **Субагент timeout**: 20 хв maximum per субагент
- **Incomplete data**: Agents proceed з available information
- **Субагент failure**: Manual fallback procedures

### Performance Optimization:
- **Parallel execution**: All Phase 0 субагенти одночасно
- **Data caching**: Results reused across agents
- **Incremental validation**: Continuous quality checks

---

## 🎯 СУБАГЕНТИ SUCCESS METRICS

### Phase 0 Success:
- [ ] CSS audit complete з actionable map
- [ ] Jargon analysis provides implementation roadmap
- [ ] Content scan enables accurate scope planning
- [ ] All data delivered within 15 хв

### Phase 3 Success:
- [ ] All .ts файли мають .uk.ts pairs
- [ ] TypeScript compilation clean
- [ ] Exports consistency verified
- [ ] Production readiness confirmed

### Phase 4 Success (optional):
- [ ] Technical terms inventory complete
- [ ] Implementation priorities established
- [ ] Risk assessment provided
- [ ] Expansion roadmap ready

**РЕЗУЛЬТАТ:** Automated intelligence supporting всіх 8 agents з мінімальним human oversight