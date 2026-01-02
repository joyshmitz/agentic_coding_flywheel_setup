# Agent 1: Build Infrastructure & CSS Specialist (30 хв)

## 🎯 УЛЬТРА-ФОКУС: Build + CSS, Zero Блокування

**РОЛІ:**
- Фаза 1: Build cleanup (15 хв)
- Фаза 2: CSS Spacing Blitz (60 хв)

**КРИТИЧНІСТЬ:** 🔴 НУЛЬ блокування для інших агентів

---

## 🚀 ФАЗА 1: Build Infrastructure (15 хв)

### Завдання 1.1: Cache Cleanup
```bash
# Clean build artifacts
rm -rf .next/
rm -rf node_modules/.cache/

# Optional: Clean Bun cache if issues
rm -rf ~/.bun/install/cache/
```

### Завдання 1.2: Fresh Build
```bash
# Install dependencies (should be quick)
bun install

# Run production build to check Tailwind compilation
bun run build
```

### Завдання 1.3: Dev Server Validation
```bash
# Start dev server
bun run dev

# Verify pages load:
# http://127.0.0.1:3000/
# http://127.0.0.1:3000/flywheel (original problem page)
```

### ✅ Success Criteria Фаза 1:
- [ ] Build completes without errors
- [ ] Tailwind CSS classes compile correctly
- [ ] Dev server starts successfully
- [ ] Flywheel page loads without console errors

### 📢 Signal: "🔥 BUILD INFRASTRUCTURE READY" (broadcast після 15 хв)

---

## ⚡ ФАЗА 2: CSS Spacing Blitz (60 хв)

### Pre-requisite: Wait for Subagent A data
Дочекатися субагента A з CSS Pattern Audit результатами.

### Завдання 2.1: Flywheel Page Headers (20 хв)
**Файл:** `apps/web/app/flywheel/page.tsx`

**5 CRITICAL FIXES:**
```typescript
// Line ~269: WorkflowSection header
<div className="mb-4 flex items-center justify-center gap-3">
// ↓ CHANGE TO:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">

// Line ~396: PromptsSection header
<div className="mb-4 flex items-center justify-center gap-3">
// ↓ CHANGE TO:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">

// Line ~431: SynergySection header
<div className="mb-4 flex items-center justify-center gap-3">
// ↓ CHANGE TO:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">

// Line ~621: ToolsSection header
<div className="mb-4 flex items-center justify-center gap-3">
// ↓ CHANGE TO:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">

// Line ~684: PhilosophySection header
<div className="mb-4 flex items-center justify-center gap-3">
// ↓ CHANGE TO:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">
```

### Завдання 2.2: Flywheel Visualization (5 хв)
**Файл:** `apps/web/components/flywheel-visualization.tsx`

```typescript
// Line ~636: Ecosystem header (ORIGINAL PROBLEM)
<div className="mb-4 flex items-center justify-center gap-3">
// ↓ CHANGE TO:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">
```

### Завдання 2.3: Other Page Spacing (15 хв)
**Файл:** `apps/web/app/workflow/page.tsx`
```typescript
// Line ~633: Flywheel card
<div className="mb-3 rounded-2xl border border-white/[0.08]">
// ↓ CHANGE TO:
<div className="mb-5 md:mb-6 rounded-2xl border border-white/[0.08]">
```

**Файл:** `apps/web/app/troubleshooting/page.tsx`
```typescript
// Line ~97: IssueCard category
<span className="mb-2 inline-block rounded-full">
// ↓ CHANGE TO:
<span className="mb-4 inline-block rounded-full">
```

**Файл:** `apps/web/app/learn/page.tsx`
```typescript
// Line ~342: Progress section
<div className="mb-2 text-sm text-white/50">
// ↓ CHANGE TO:
<div className="mb-4 text-sm text-white/50">
```

### Завдання 2.4: Typography Standardization (15 хв)
**Глобальна заміна через всі .tsx файли:**

```bash
# Letter-spacing consistency
find apps/web -name "*.tsx" -type f -exec sed -i 's/tracking-\[0\.25em\]/tracking-[0.2em]/g' {} \;

# Icon-text gap standardization
find apps/web -name "*.tsx" -type f -exec sed -i 's/gap-1\.5/gap-2/g' {} \;
```

**ОБЕРЕЖНО:** Перевірити що зміни не торкнулися JS strings в коментарях.

### Завдання 2.5: Responsive Testing (5 хв)
**Швидко перевірити на різних розмірах екрана:**

1. **http://127.0.0.1:3000/flywheel**
   - Mobile (375px): badge-to-heading має бути `mb-6`
   - Desktop (1024px+): badge-to-heading має бути `mb-8`

2. **Швидко перевірити інші сторінки:**
   - http://127.0.0.1:3000/workflow
   - http://127.0.0.1:3000/troubleshooting
   - http://127.0.0.1:3000/learn

### ✅ Success Criteria Фаза 2:
- [ ] Всі 5 sections в flywheel/page.tsx виправлені
- [ ] Flywheel-visualization.tsx original problem fixed
- [ ] Workflow, troubleshooting, learn pages updated
- [ ] Typography globally standardized
- [ ] Responsive behavior verified

### 📢 Signal: "⚡ CSS SPACING COMPLETE" (broadcast після 75 хв total)

---

## 🚫 КРИТИЧНІ ЗАБОРОНИ

### НЕ ТОРКАЙТЕСЯ:
- **Будь-якого JS/React логіки** - тільки CSS classes
- **jargon.tsx** - це Agent 2
- **page.tsx content/data** - це Agents 4 & 5
- **flywheel-visualization.tsx JS code** - Agent 7 додасть i18n пізніше

### ТІЛЬКИ ЗМІНЮЙТЕ:
- CSS класи та Tailwind utilities
- Spacing, margins, paddings
- Build configurations

---

## 📊 КООРДИНАЦІЯ З ІНШИМИ АГЕНТАМИ

### DEPENDENCIES IN:
- Субагент A: CSS Pattern Audit (15 хв) → використати для batch заміни

### DEPENDENCIES OUT:
- **Agent 7** чекає "CSS SPACING COMPLETE" перед flywheel-visualization i18n роботою

### FILE OWNERSHIP:
- **flywheel/page.tsx**: ВИ (CSS) → Agent 7 (i18n) - НЕ КОНФЛІКТУЄТЕ
- **flywheel-visualization.tsx**: ВИ (CSS line 636) → Agent 7 (JS i18n strings)

---

## 🎯 IMPACT METRICS

**До виправлення:**
- Inconsistent spacing на 15+ сторінках
- Typography варіює між 0.25em та 0.2em
- Icon gaps нестабільні (gap-1.5 vs gap-2)

**Після виправлення:**
- Professional consistent spacing patterns
- Responsive badge-to-heading правильно масштабується
- Typography стандартизований по всьому сайту
- Visual consistency досягнута

**TIME SAVED для інших агентів:**
- Agent 7 може починати i18n роботу відразу після CSS ready
- Zero blocking delays for Agents 3-6

---

## 🚀 ШВИДКИЙ CHECKLIST

### Фаза 1 (15 хв):
- [ ] `rm -rf .next/ node_modules/.cache/`
- [ ] `bun install && bun run build`
- [ ] `bun run dev` + test flywheel page
- [ ] Broadcast "🔥 BUILD INFRASTRUCTURE READY"

### Фаза 2 (60 хв):
- [ ] flywheel/page.tsx: 5x `mb-4` → `mb-6 md:mb-8`
- [ ] flywheel-visualization.tsx: line 636 fix
- [ ] workflow/troubleshooting/learn: spacing fixes
- [ ] Global: `tracking-[0.25em]` → `tracking-[0.2em]`
- [ ] Global: `gap-1.5` → `gap-2`
- [ ] Responsive testing
- [ ] Broadcast "⚡ CSS SPACING COMPLETE"

**TOTAL TIME:** 75 хв (30 хв build + 45 хв main CSS work)
**NEXT:** Agent 7 може починати flywheel i18n роботу