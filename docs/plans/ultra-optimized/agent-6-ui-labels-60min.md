# Agent 6: UI Component Labels Specialist (60 хв)

## 🎯 УЛЬТРА-ФОКУС: UI Component Labels Localization

**РОЛЬ:** Локалізувати UI labels в stepper.tsx та command-card.tsx
**КРИТИЧНІСТЬ:** 🔄 UX consistency для core UI components

---

## 🚀 ПАРАЛЕЛЬНИЙ СТАРТ: Без Dependencies

**МОЖЕТЕ ПОЧИНАТИ:** Одразу з Agents 3, 4, 5 (різні файли)

---

## ⚡ ЗАВДАННЯ 1: Аналіз UI Labels (15 хв)

### Завдання 1.1: Stepper Component Analysis
**Файл:** `apps/web/components/stepper.tsx`

```bash
# Знайти hardcoded labels
grep -n -i "in progress\|complete" apps/web/components/stepper.tsx
```

**Очікувані знахідки близько:**
- Line 85: `"In progress"`
- Line 88: `"Complete"`

### Завдання 1.2: Command Card Analysis
**Файл:** `apps/web/components/command-card.tsx`

```bash
# Знайти hardcoded UI strings
grep -n "Run on VPS\|Run on your computer\|Copy command" apps/web/components/command-card.tsx
```

**Очікувані знахідки близько:**
- Line 67: `"Run on VPS"`
- Line 74: `"Run on your computer"`
- Line 224: `aria-label="Copy command"`

### Завдання 1.3: Scope підрахунок
**Total strings для локалізації:**
- Stepper: 2 статуси
- Command Card: 3 labels + aria-label
- **Total: 5-6 strings**

---

## ⚡ ЗАВДАННЯ 2: Створити Component Labels Messages (20 хв)

### Завдання 2.1: English Messages
**Файл:** `apps/web/lib/component-labels.ts`

```typescript
export const componentLabels = {
  stepper: {
    inProgress: "In progress",
    complete: "Complete",
  },
  commandCard: {
    runOnVPS: "Run on VPS",
    runOnComputer: "Run on your computer",
    copyCommand: "Copy command",
  },
} as const;

export type ComponentLabels = typeof componentLabels;
```

### Завдання 2.2: Ukrainian Messages
**Файл:** `apps/web/lib/component-labels.uk.ts`

```typescript
import type { ComponentLabels } from './component-labels';

export const componentLabelsUk: ComponentLabels = {
  stepper: {
    inProgress: "В процесі",
    complete: "Завершено",
  },
  commandCard: {
    runOnVPS: "Виконати на VPS",
    runOnComputer: "Виконати на вашому комп'ютері",
    copyCommand: "Копіювати команду",
  },
};
```

### Завдання 2.3: Getter Function
**Додати до:** `apps/web/lib/i18n/translations.ts`

```typescript
// ДОДАТИ імпорти (після існуючих)
import { componentLabels } from '../component-labels';
import { componentLabelsUk } from '../component-labels.uk';

// ДОДАТИ функцію (після існуючих)
export function getComponentLabels(locale: string) {
  return locale === 'uk' ? componentLabelsUk : componentLabels;
}
```

---

## ⚡ ЗАВДАННЯ 3: Інтегрувати Stepper Component (10 хв)

### Завдання 3.1: Модифікувати stepper.tsx
**Файл:** `apps/web/components/stepper.tsx`

```typescript
// ДОДАТИ імпорти
import { useLocale } from '@/lib/i18n';
import { getComponentLabels } from '@/lib/i18n/translations';

// В компоненті ДОДАТИ:
const { locale } = useLocale();
const labels = getComponentLabels(locale);

// ЗНАЙТИ і ЗАМІНИТИ:
// Line 85:
"In progress"
// НА:
{labels.stepper.inProgress}

// Line 88:
"Complete"
// НА:
{labels.stepper.complete}
```

---

## ⚡ ЗАВДАННЯ 4: Інтегрувати Command Card Component (10 хв)

### Завдання 4.1: Модифікувати command-card.tsx
**Файл:** `apps/web/components/command-card.tsx`

```typescript
// ДОДАТИ імпорти
import { useLocale } from '@/lib/i18n';
import { getComponentLabels } from '@/lib/i18n/translations';

// В компоненті ДОДАТИ:
const { locale } = useLocale();
const labels = getComponentLabels(locale);

// ЗНАЙТИ і ЗАМІНИТИ:
// Line 67:
"Run on VPS"
// НА:
{labels.commandCard.runOnVPS}

// Line 74:
"Run on your computer"
// НА:
{labels.commandCard.runOnComputer}

// Line 224:
aria-label="Copy command"
// НА:
aria-label={labels.commandCard.copyCommand}
```

---

## ⚡ ЗАВДАННЯ 5: Тестування та Validation (5 хв)

### Завдання 5.1: Stepper Testing
```bash
# Знайти сторінку з stepper component
# Переглянути progress indicators з обома мовами
# http://127.0.0.1:3000/?lang=en vs http://127.0.0.1:3000/?lang=uk
```

### Завдання 5.2: Command Card Testing
```bash
# Знайти сторінку з command cards
# Перевірити VPS/computer labels
# Перевірити копіювання command aria-labels
```

### Завдання 5.3: TypeScript Validation
```bash
# Перевірити що немає TypeScript помилок
bun run type-check
```

---

## ✅ Success Criteria

### Files Created:
- [ ] component-labels.ts - English labels
- [ ] component-labels.uk.ts - Ukrainian labels
- [ ] getComponentLabels() додано до translations.ts

### Stepper Integration:
- [ ] useLocale та getComponentLabels imports додано
- [ ] "In progress" → labels.stepper.inProgress
- [ ] "Complete" → labels.stepper.complete

### Command Card Integration:
- [ ] useLocale та getComponentLabels imports додано
- [ ] "Run on VPS" → labels.commandCard.runOnVPS
- [ ] "Run on your computer" → labels.commandCard.runOnComputer
- [ ] aria-label локалізований

### Functional Testing:
- [ ] EN stepper labels працюють
- [ ] UK stepper labels працюють
- [ ] EN command card labels працюють
- [ ] UK command card labels працюють
- [ ] aria-labels локалізовані
- [ ] TypeScript компілює без помилок

---

## 🚫 КРИТИЧНІ ОБМЕЖЕННЯ

### НЕ ТОРКАЙТЕСЯ:
- **Будь-яких інших components** крім stepper.tsx та command-card.tsx
- **CSS styling** - це Agent 1 відповідальність
- **jargon.tsx** - це Agent 3

### ТІЛЬКИ UI LABELS:
- Статуси progress indicators
- Button labels
- aria-labels для accessibility

---

## 📊 КООРДИНАЦІЯ З ІНШИМИ АГЕНТАМИ

### PARALLEL з:
- **Agents 3, 4, 5**: Всі працюють з різними файлами
- **NO dependencies або conflicts**

### INDEPENDENT WORK:
- Можете працювати повністю незалежно

### FILE OWNERSHIP:
- **stepper.tsx**: ВИКЛЮЧНА власність
- **command-card.tsx**: ВИКЛЮЧНА власність
- **component-labels.***: ВИКЛЮЧНА власність

---

## 🎯 КРИТИЧНЕ ЗНАЧЕННЯ

**Scope роботи:**
- 2 core UI components
- 5-6 user-facing strings
- Critical UX consistency

**Impact:**
- Consistent Ukrainian UI experience
- Accessibility improvements (локалізовані aria-labels)
- Professional component localization patterns

**Strategic value:**
- Template для локалізації інших UI components
- Core user interaction elements
- Foundation для подальшої component localization

---

## 📢 COORDINATION SIGNALS

### Input: Очікування
- **НЕ ЗАЛЕЖИТЕ** від інших агентів

### Output: Broadcast
**Signal:** "🔄 UI LABELS COMPLETE - core components localized"

### Timing:
- Початок: Одразу (паралельно з іншими)
- Завершення: 60 хв
- Independent completion

---

## 🚀 EXECUTION PROTOCOL

```bash
# 1. Аналіз UI labels (15 хв)
grep -n "In progress\|Complete" apps/web/components/stepper.tsx
grep -n "Run on VPS\|Copy command" apps/web/components/command-card.tsx

# 2. Створити message files (20 хв)
# - component-labels.ts (EN)
# - component-labels.uk.ts (UK)
# - getComponentLabels() в translations.ts

# 3. Stepper integration (10 хв)
# - imports, labels variable, string replacement

# 4. Command Card integration (10 хв)
# - imports, labels variable, string replacement

# 5. Testing & validation (5 хв)
# - EN/UK functionality
# - TypeScript check
# - Signal broadcast

# "🔄 UI LABELS COMPLETE - core components localized"
```

**РЕЗУЛЬТАТ:** Professional UI component localization з accessible Ukrainian labels за 60 хв

---

## 🎨 EXPECTED UI RESULT

### Stepper Component:
**Before:** `In progress` / `Complete`
**After:** `В процесі` / `Завершено` (Ukrainian)

### Command Card Component:
**Before:**
- `Run on VPS`
- `Run on your computer`
- `Copy command` (aria-label)

**After:**
- `Виконати на VPS`
- `Виконати на вашому комп'ютері`
- `Копіювати команду` (aria-label)

**User Experience:**
- Seamless Ukrainian interface
- Consistent terminology
- Accessibility compliance