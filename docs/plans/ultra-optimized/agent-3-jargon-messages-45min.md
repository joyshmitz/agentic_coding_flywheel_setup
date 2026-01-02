# Agent 3: Jargon i18n Messages Specialist (45 хв)

## 🎯 УЛЬТРА-ФОКУС: Jargon Message System

**РОЛЬ:** Створити i18n message system для jargon tooltips
**КРИТИЧНІСТЬ:** 🔄 Базовий tooltip i18n для всього сайту

---

## 🚀 DEPENDENCY: Дочекатися Agent 2

**ОБОВ'ЯЗКОВО:** Дочекатися сигналу "🔥 HYDRATION STABLE - jargon.tsx ready for i18n"

---

## ⚡ ЗАВДАННЯ 1: Створити Message Files (15 хв)

### Завдання 1.1: English Messages
**Файл:** `apps/web/lib/jargon-messages.ts`

```typescript
export const jargonMessages = {
  tooltip: {
    learnAbout: "Learn about {term}",
    close: "Close",
    hoverToLearn: "Hover or focus to learn more",
    openInGlossary: "Open in glossary →",
    viewInGlossary: "View in glossary →",
  },
} as const;

export type JargonMessages = typeof jargonMessages;
```

### Завдання 1.2: Ukrainian Messages
**Файл:** `apps/web/lib/jargon-messages.uk.ts`

```typescript
import type { JargonMessages } from './jargon-messages';

export const jargonMessagesUk: JargonMessages = {
  tooltip: {
    learnAbout: "Дізнатися про {term}",
    close: "Закрити",
    hoverToLearn: "Наведіть або сфокусуйтеся, щоб дізнатися більше",
    openInGlossary: "Відкрити в глосарії →",
    viewInGlossary: "Переглянути в глосарії →",
  },
};
```

---

## ⚡ ЗАВДАННЯ 2: Додати Getter Function (10 хв)

### Завдання 2.1: Модифікація translations.ts
**Файл:** `apps/web/lib/i18n/translations.ts`

```typescript
// ДОДАТИ ці імпорти (після існуючих)
import { jargonMessages } from '../jargon-messages';
import { jargonMessagesUk } from '../jargon-messages.uk';

// ДОДАТИ цю функцію (після існуючих функцій)
export function getJargonMessages(locale: string) {
  return locale === 'uk' ? jargonMessagesUk : jargonMessages;
}
```

---

## ⚡ ЗАВДАННЯ 3: Інтегрувати з jargon.tsx (20 хв)

### Pre-requisite check:
Перевірити що Agent 2 завершив hydration fix:
- [ ] `mounted` state є в jargon.tsx
- [ ] Hydration guard додано

### Завдання 3.1: Додати imports в jargon.tsx
**Файл:** `apps/web/components/jargon.tsx`

```typescript
// ЗНАЙТИ існуючі імпорти і ДОДАТИ:
import { getJargonMessages } from '@/lib/i18n/translations';
```

### Завдання 3.2: Додати messages в Jargon function
**ПІСЛЯ mounted check, ДОДАТИ:**

```typescript
export function Jargon({ term, children, className }: JargonProps) {
  const { locale, mounted } = useLocale();

  if (!mounted) {
    return <span className="text-white/70">{children}</span>;
  }

  // ДОДАТИ цю лінію:
  const messages = getJargonMessages(locale);

  // Решта коду...
}
```

### Завдання 3.3: Замінити hardcoded strings

**Знайти ці 5 захардкожених рядків і замінити:**

```typescript
// Line ~219: ЗНАЙТИ
aria-label={`Learn about ${jargonData.term}`}
// ЗАМІНИТИ НА:
aria-label={messages.tooltip.learnAbout.replace('{term}', jargonData.term)}

// Line ~311: ЗНАЙТИ
aria-label="Close"
// ЗАМІНИТИ НА:
aria-label={messages.tooltip.close}

// Line ~364: ЗНАЙТИ
"Hover or focus to learn more"
// ЗАМІНИТИ НА:
{messages.tooltip.hoverToLearn}

// Line ~374: ЗНАЙТИ
"Open in glossary →"
// ЗАМІНИТИ НА:
{messages.tooltip.openInGlossary}

// Line ~463: ЗНАЙТИ
"View in glossary →"
// ЗАМІНИТИ НА:
{messages.tooltip.viewInGlossary}
```

---

## ✅ Success Criteria

### Files Created:
- [ ] `apps/web/lib/jargon-messages.ts` - English messages
- [ ] `apps/web/lib/jargon-messages.uk.ts` - Ukrainian messages
- [ ] `getJargonMessages()` додано до translations.ts

### jargon.tsx Integration:
- [ ] `getJargonMessages` import додано
- [ ] `messages` variable створена в component
- [ ] Всі 5 hardcoded strings замінені
- [ ] `{term}` placeholder replacement працює

### Functional Testing:
- [ ] EN tooltips працюють з новими messages
- [ ] UK tooltips працюють з новими messages
- [ ] aria-labels локалізовані
- [ ] "Learn about" + term підстановка працює
- [ ] Glossary links локалізовані

---

## 🚫 КРИТИЧНІ ОБМЕЖЕННЯ

### НЕ ТОРКАЙТЕСЯ:
- **Hydration logic** - Agent 2 вже виправив
- **CSS styles** - Agent 1 керує
- **Build system** - Agent 1 керує

### ТІЛЬКИ РОБІТЬ:
- Message файли створення
- String localization в jargon.tsx
- i18n infrastructure

---

## 📊 КООРДИНАЦІЯ З ІНШИМИ АГЕНТАМИ

### DEPENDENCIES IN:
- **Agent 2**: "🔥 HYDRATION STABLE" signal ОБОВ'ЯЗКОВИЙ

### DEPENDENCIES OUT:
- **Agents 4-7** можуть використовувати stabilized tooltip system

### FILE OWNERSHIP:
- **jargon.tsx**: Agent 2 (hydration) → ВИ (i18n) → готово для інших
- **lib/jargon-messages.***: ВИ (створення) → ВИКЛЮЧНА власність

---

## 🎯 КРИТИЧНЕ ЗНАЧЕННЯ

**Що робимо:**
- Локалізуємо ВСЮ tooltip систему
- Створюємо foundation для всіх <Jargon> компонентів
- Стандартизуємо i18n pattern

**Impact:**
- Всі aria-labels українською
- Glossary links локалізовані
- Consistent tooltip messaging
- Foundation для Agents 4-7 tooltip роботи

**Після завершення:**
- Jargon компонент повністю i18n ready
- Agents 4-7 можуть безпечно додавати <Jargon> wrapping

---

## 📢 COORDINATION SIGNALS

### Input: Очікування
**КРИТИЧНО:** Дочекатися "🔥 HYDRATION STABLE - jargon.tsx ready for i18n" від Agent 2

### Output: Broadcast
**Signal:** "⚙️ JARGON I18N READY - tooltip system localized"

### Timing:
- Початок: Після Agent 2 signal (~30 хв)
- Завершення: ~75 хв total
- Паралельно: Agents 4-6 можуть працювати одночасно

---

## 🚀 EXECUTION PROTOCOL

```bash
# 1. Wait for Agent 2 signal
# "🔥 HYDRATION STABLE - jargon.tsx ready for i18n"

# 2. Create message files (15 хв)
# - jargon-messages.ts (EN)
# - jargon-messages.uk.ts (UK)
# - Add getJargonMessages() to translations.ts

# 3. Integrate with jargon.tsx (20 хв)
# - Add import
# - Add messages variable
# - Replace 5 hardcoded strings

# 4. Test both locales (10 хв)
# - EN tooltips functionality
# - UK tooltips functionality
# - aria-label localization
# - Glossary links

# 5. Signal ready
# "⚙️ JARGON I18N READY - tooltip system localized"
```

**РЕЗУЛЬТАТ:** Повністю локалізована tooltip система за 45 хв, ready for mass <Jargon> usage