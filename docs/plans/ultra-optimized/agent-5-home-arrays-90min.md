# Agent 5: Home Data Arrays Specialist (90 хв)

## 🎯 УЛЬТРА-ФОКУС: Масштабна локалізація home page arrays

**РОЛЬ:** Найбільший content localization chunk - 100+ рядків
**КРИТИЧНІСТЬ:** 📖 Фундаментальна українська локалізація головної сторінки

---

## 🚀 ПАРАЛЕЛЬНИЙ СТАРТ: Без Dependencies

**МОЖЕТЕ ПОЧИНАТИ:** Одразу з Agents 3, 4, 6 (різні файли/секції)

---

## ⚡ ЗАВДАННЯ 1: Аналіз поточних arrays (20 хв)

### Завдання 1.1: Знайти data arrays в page.tsx
**Файл:** `apps/web/app/page.tsx`

```bash
# Знайти WORKFLOW_STEPS (близько lines 443-457)
grep -n -A 20 "WORKFLOW_STEPS" apps/web/app/page.tsx

# Знайти FOR_YOU_ITEMS (близько lines 725-730)
grep -n -A 10 "FOR_YOU_ITEMS" apps/web/app/page.tsx

# Знайти NOT_FOR_YOU_ITEMS (близько lines 732-737)
grep -n -A 10 "NOT_FOR_YOU_ITEMS" apps/web/app/page.tsx

# Знайти PRICING_ITEMS (близько lines 825-829)
grep -n -A 10 "PRICING_ITEMS" apps/web/app/page.tsx
```

### Завдання 1.2: Підрахувати scope роботи
**Підрахувати кількість рядків для локалізації:**
- WORKFLOW_STEPS: ~13 кроків
- FOR_YOU_ITEMS: ~4 пункти
- NOT_FOR_YOU_ITEMS: ~4 пункти
- PRICING_ITEMS: ~3 items

**Total: ~24 пункти = ~100+ рядків тексту**

---

## ⚡ ЗАВДАННЯ 2: Створити Message Files (50 хв)

### Завдання 2.1: Home Workflow Steps (20 хв)
**Файл:** `apps/web/lib/home-workflow-steps.ts`

```typescript
export const homeWorkflowSteps = [
  {
    number: "01",
    title: "Choose OS",
    description: "Ubuntu 25.10 (recommended)",
  },
  {
    number: "02",
    title: "Install Terminal",
    description: "Windows Terminal or iTerm2",
  },
  {
    number: "03",
    title: "Generate SSH Key",
    description: "Create secure connection credentials",
  },
  {
    number: "04",
    title: "Get VPS",
    description: "Digital Ocean, Hetzner, or similar",
  },
  {
    number: "05",
    title: "Connect via SSH",
    description: "Access your remote server",
  },
  {
    number: "06",
    title: "Run Install Script",
    description: "One command setup everything",
  },
  {
    number: "07",
    title: "Install Claude Code",
    description: "AI-powered development environment",
  },
  {
    number: "08",
    title: "Configure Projects",
    description: "Set up your development workspace",
  },
  {
    number: "09",
    title: "Start Coding",
    description: "Begin agentic development",
  },
] as const;
```

**Файл:** `apps/web/lib/home-workflow-steps.uk.ts`

```typescript
export const homeWorkflowStepsUk = [
  {
    number: "01",
    title: "Виберіть ОС",
    description: "Ubuntu 25.10 (рекомендовано)",
  },
  {
    number: "02",
    title: "Встановіть термінал",
    description: "Windows Terminal або iTerm2",
  },
  {
    number: "03",
    title: "Створіть SSH ключ",
    description: "Створіть безпечні облікові дані",
  },
  {
    number: "04",
    title: "Отримайте VPS",
    description: "Digital Ocean, Hetzner або аналогічний",
  },
  {
    number: "05",
    title: "Підключіться через SSH",
    description: "Отримайте доступ до віддаленого сервера",
  },
  {
    number: "06",
    title: "Запустіть скрипт встановлення",
    description: "Налаштувати все однією командою",
  },
  {
    number: "07",
    title: "Встановіть Claude Code",
    description: "Середовище розробки на базі ШІ",
  },
  {
    number: "08",
    title: "Налаштуйте проекти",
    description: "Налаштуйте робочий простір розробки",
  },
  {
    number: "09",
    title: "Почніть кодувати",
    description: "Розпочніть агентну розробку",
  },
] as const;
```

### Завдання 2.2: Home Eligibility (15 хв)
**Файл:** `apps/web/lib/home-eligibility.ts`

```typescript
export const homeEligibility = {
  forYou: [
    "You want AI to write real, production code for you",
    "You're comfortable with command line basics",
    "You want to learn agentic coding patterns",
    "You have $40-56/month for VPS + Claude subscription",
  ],
  notForYou: [
    "You want a completely free solution",
    "You're afraid of the command line",
    "You prefer traditional coding workflows",
    "You're not ready for AI-assisted development",
  ],
} as const;
```

**Файл:** `apps/web/lib/home-eligibility.uk.ts`

```typescript
export const homeEligibilityUk = {
  forYou: [
    "Ви хочете, щоб ШІ писав справжній, продакшн код для вас",
    "Ви знайомі з основами командного рядка",
    "Ви хочете вивчити шаблони агентного кодування",
    "У вас є $40-56/місяць на VPS + підписку Claude",
  ],
  notForYou: [
    "Ви хочете повністю безкоштовне рішення",
    "Ви боїтеся командного рядка",
    "Ви віддаєте перевагу традиційним робочим процесам кодування",
    "Ви не готові до розробки за допомогою ШІ",
  ],
} as const;
```

### Завдання 2.3: Home Pricing (15 хв)
**Файл:** `apps/web/lib/home-pricing.ts`

```typescript
export const homePricing = [
  {
    title: "Cloud VPS",
    price: "$40–56/month",
    description: "Digital Ocean, Hetzner, or equivalent",
  },
  {
    title: "Claude Max",
    price: "$200/month",
    description: "Anthropic's premium AI assistant",
  },
  {
    title: "ACFS Setup",
    price: "Free",
    description: "Open source installation scripts",
  },
] as const;
```

**Файл:** `apps/web/lib/home-pricing.uk.ts`

```typescript
export const homePricingUk = [
  {
    title: "Cloud VPS",
    price: "$40–56/місяць",
    description: "Digital Ocean, Hetzner або еквівалент",
  },
  {
    title: "Claude Max",
    price: "$200/місяць",
    description: "Преміум ШІ асистент від Anthropic",
  },
  {
    title: "ACFS Налаштування",
    price: "Безкоштовно",
    description: "Скрипти встановлення з відкритим кодом",
  },
] as const;
```

---

## ⚡ ЗАВДАННЯ 3: Додати Getter Functions (10 хв)

### Завдання 3.1: Модифікація translations.ts
**Файл:** `apps/web/lib/i18n/translations.ts`

```typescript
// ДОДАТИ імпорти (після існуючих)
import { homeWorkflowSteps } from '../home-workflow-steps';
import { homeWorkflowStepsUk } from '../home-workflow-steps.uk';
import { homeEligibility } from '../home-eligibility';
import { homeEligibilityUk } from '../home-eligibility.uk';
import { homePricing } from '../home-pricing';
import { homePricingUk } from '../home-pricing.uk';

// ДОДАТИ функції (після існуючих)
export function getHomeWorkflowSteps(locale: string) {
  return locale === 'uk' ? homeWorkflowStepsUk : homeWorkflowSteps;
}

export function getHomeEligibility(locale: string) {
  return locale === 'uk' ? homeEligibilityUk : homeEligibility;
}

export function getHomePricing(locale: string) {
  return locale === 'uk' ? homePricingUk : homePricing;
}
```

---

## ⚡ ЗАВДАННЯ 4: Інтегрувати з page.tsx (20 хв)

### Завдання 4.1: Додати imports в page.tsx
**Файл:** `apps/web/app/page.tsx`

```typescript
// ЗНАЙТИ існуючі імпорти і ДОДАТИ:
import { getHomeWorkflowSteps, getHomeEligibility, getHomePricing } from '@/lib/i18n/translations';
```

### Завдання 4.2: Додати locale variables
**В HomePage компоненті ДОДАТИ:**

```typescript
export default function HomePage() {
  const { locale } = useLocale(); // може вже існувати

  // ДОДАТИ ці лінії:
  const workflowSteps = getHomeWorkflowSteps(locale);
  const eligibility = getHomeEligibility(locale);
  const pricing = getHomePricing(locale);

  // ... rest of component
}
```

### Завдання 4.3: Замінити arrays в JSX

**ЗНАЙТИ WORKFLOW_STEPS використання:**
```typescript
// БУЛО щось схоже на:
{WORKFLOW_STEPS.map((step, index) => ...)}

// СТАЄ:
{workflowSteps.map((step, index) => ...)}
```

**ЗНАЙТИ FOR_YOU_ITEMS використання:**
```typescript
// БУЛО:
{FOR_YOU_ITEMS.map(...)}

// СТАЄ:
{eligibility.forYou.map(...)}
```

**ЗНАЙТИ NOT_FOR_YOU_ITEMS використання:**
```typescript
// БУЛО:
{NOT_FOR_YOU_ITEMS.map(...)}

// СТАЄ:
{eligibility.notForYou.map(...)}
```

**ЗНАЙТИ PRICING_ITEMS використання:**
```typescript
// БУЛО:
{PRICING_ITEMS.map(...)}

// СТАЄ:
{pricing.map(...)}
```

---

## ✅ Success Criteria

### Files Created:
- [ ] home-workflow-steps.ts/.uk.ts (9 кроків)
- [ ] home-eligibility.ts/.uk.ts (8 пунктів)
- [ ] home-pricing.ts/.uk.ts (3 items)
- [ ] Getter functions в translations.ts

### page.tsx Integration:
- [ ] Imports додано
- [ ] Locale variables створені
- [ ] Всі 4 arrays замінені на localized versions
- [ ] TypeScript компілює без помилок

### Functional Testing:
- [ ] EN: Workflow steps відображаються англійською
- [ ] UK: Workflow steps відображаються українською
- [ ] EN: Eligibility sections англійською
- [ ] UK: Eligibility sections українською
- [ ] EN: Pricing англійською
- [ ] UK: Pricing українською

---

## 🚫 КРИТИЧНІ ОБМЕЖЕННЯ

### НЕ ТОРКАЙТЕСЯ:
- **Hero section** в page.tsx (lines ~150-200) - це Agent 4
- **Будь-яких інших файлів** крім зазначених
- **CSS або styling** - це Agent 1

### КООРДИНАЦІЯ З Agent 4:
- **Agent 4**: Hero section (lines ~150-200)
- **ВИ**: Data arrays (lines 443+, 725+, 825+)
- **ZERO conflicts** - різні частини файлу

---

## 📊 КООРДИНАЦІЯ З ІНШИМИ АГЕНТАМИ

### PARALLEL з:
- **Agent 4**: Обидва в page.tsx, але різні секції
- **Agent 6**: UI components (різні файли)
- **Agent 3**: Jargon infrastructure

### NO DEPENDENCIES:
- Можете працювати незалежно від інших агентів

### FILE OWNERSHIP:
- **page.tsx**: Agent 4 (hero) ∥ ВИ (data arrays) - NO CONFLICTS
- **home-*.ts/.uk.ts**: ВИКЛЮЧНА власність

---

## 🎯 КРИТИЧНЕ ЗНАЧЕННЯ

**Scope роботи:**
- 24 пункти контенту
- 100+ рядків тексту
- 4 major content sections

**Impact:**
- Home page повністю українською
- Professional localization quality
- Consistent user experience

**Strategic value:**
- Largest content localization chunk
- Foundation для інших pages
- Core user-facing content

---

## 📢 COORDINATION SIGNALS

### Input: Очікування
- **НЕ ЗАЛЕЖИТЕ** від інших агентів

### Output: Broadcast
**Signal:** "📖 HOME ARRAYS COMPLETE - main page fully localized"

### Timing:
- Початок: Одразу (паралельно з Agents 3, 4, 6)
- Завершення: 90 хв
- Найдовший блок, але паралельний

---

## 🚀 EXECUTION PROTOCOL

```bash
# 1. Аналіз arrays (20 хв)
grep -n "WORKFLOW_STEPS\|FOR_YOU_ITEMS\|NOT_FOR_YOU_ITEMS\|PRICING_ITEMS" apps/web/app/page.tsx

# 2. Створити message files (50 хв)
# - home-workflow-steps.ts/.uk.ts (20 хв)
# - home-eligibility.ts/.uk.ts (15 хв)
# - home-pricing.ts/.uk.ts (15 хв)

# 3. Getter functions (10 хв)
# - Додати до translations.ts

# 4. Інтеграція (20 хв)
# - Imports, variables, JSX заміна
# - TypeScript validation

# 5. Testing & Signal
# - EN/UK перевірка
# "📖 HOME ARRAYS COMPLETE - main page fully localized"
```

**РЕЗУЛЬТАТ:** Повністю локалізована головна сторінка з професійною якістю українського перекладу за 90 хв