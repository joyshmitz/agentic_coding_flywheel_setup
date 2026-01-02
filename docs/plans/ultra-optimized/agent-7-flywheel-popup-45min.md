# Agent 7: Flywheel Popup i18n Specialist (45 хв)

## 🎯 УЛЬТРА-ФОКУС: Flywheel Visualization Popup Localization

**РОЛЬ:** Локалізувати popup UI labels в flywheel-visualization.tsx
**КРИТИЧНІСТЬ:** 🔗 Завершити оригінальну проблему з flywheel tooltips

---

## 🚀 DEPENDENCY: Дочекатися Agent 1

**КРИТИЧНО:** Дочекатися сигналу "⚡ CSS SPACING COMPLETE" від Agent 1

**Причина:** Agent 1 виправляє CSS в flywheel-visualization.tsx (line 636), ВИ додаєте i18n strings - потенційний конфлікт!

---

## ⚡ ЗАВДАННЯ 1: Проаналізувати Popup Content (10 хв)

### Завдання 1.1: Знайти hardcoded popup strings
**Файл:** `apps/web/components/flywheel-visualization.tsx`

```bash
# Знайти popup labels після CSS виправлення Agent 1
grep -n -i "github\|stars\|features\|install\|demo\|view\|integrates" apps/web/components/flywheel-visualization.tsx
```

**Очікувані hardcoded strings:**
- `"GitHub stars"`
- `"Key Features"`
- `"Quick Install"`
- `"View on GitHub"`
- `"Try Demo"`
- `"Integrates With"`

### Завдання 1.2: Знайти placeholder content
```bash
# Знайти placeholder text для empty state
grep -n -i "explore\|click.*tool" apps/web/components/flywheel-visualization.tsx
```

**Очікувані placeholder strings:**
- `"Explore the Flywheel"`
- `"Click a tool to see its connections and features"`

---

## ⚡ ЗАВДАННЯ 2: Розширити Flywheel Messages (15 хв)

### Завдання 2.1: Модифікувати flywheel-messages.ts
**Файл:** `apps/web/lib/flywheel-messages.ts`

```typescript
// ЗНАЙТИ існуючий export flywheelMessages і ДОДАТИ нову секцію:

export const flywheelMessages = {
  // ... існуючий контент залишається ...

  // ДОДАТИ цю нову секцію:
  visualization: {
    placeholder: {
      title: "Explore the Flywheel",
      description: "Click a tool to see its connections and features",
    },
    toolDetail: {
      githubStars: "GitHub stars",
      keyFeatures: "Key Features",
      quickInstall: "Quick Install",
      viewOnGithub: "View on GitHub",
      tryDemo: "Try Demo",
      integratesWith: "Integrates With",
    },
  },

  // ... решта існуючого контенту ...
} as const;
```

### Завдання 2.2: Модифікувати flywheel-messages.uk.ts
**Файл:** `apps/web/lib/flywheel-messages.uk.ts`

```typescript
// ЗНАЙТИ існуючий export flywheelMessagesUk і ДОДАТИ:

export const flywheelMessagesUk = {
  // ... існуючий контент залишається ...

  // ДОДАТИ цю нову секцію:
  visualization: {
    placeholder: {
      title: "Дослідьте Flywheel",
      description: "Натисніть на інструмент, щоб побачити його зв'язки та функції",
    },
    toolDetail: {
      githubStars: "GitHub зірки",
      keyFeatures: "Ключові функції",
      quickInstall: "Швидке встановлення",
      viewOnGithub: "Переглянути на GitHub",
      tryDemo: "Спробувати демо",
      integratesWith: "Інтегрується з",
    },
  },

  // ... решта існуючого контенту ...
} as const;
```

---

## ⚡ ЗАВДАННЯ 3: Інтегрувати з flywheel-visualization.tsx (20 хв)

### Завдання 3.1: Переконатися що Agent 1 завершив CSS
**КРИТИЧНО:** Перевірити що line 636 має нові CSS classes:
```typescript
// Після Agent 1 має бути:
<div className="mb-6 md:mb-8 flex items-center justify-center gap-3">
// Замість старого:
<div className="mb-4 flex items-center justify-center gap-3">
```

### Завдання 3.2: Додати flywheel messages import
**Файл:** `apps/web/components/flywheel-visualization.tsx`

```typescript
// ЗНАЙТИ існуючі імпорти і ПЕРЕВІРИТИ/ДОДАТИ:
import { useLocale } from '@/lib/i18n';
import { getFlywheelMessages } from '@/lib/i18n/translations';
```

### Завдання 3.3: Додати messages в component
```typescript
// В основному компоненті ДОДАТИ:
const { locale } = useLocale();
const messages = getFlywheelMessages(locale);
```

### Завдання 3.4: Замінити hardcoded strings

**ЗНАЙТИ і ЗАМІНИТИ placeholder content:**
```typescript
// Title placeholder:
"Explore the Flywheel"
// НА:
{messages.visualization.placeholder.title}

// Description placeholder:
"Click a tool to see its connections and features"
// НА:
{messages.visualization.placeholder.description}
```

**ЗНАЙТИ і ЗАМІНИТИ tool detail labels:**
```typescript
"GitHub stars" → {messages.visualization.toolDetail.githubStars}
"Key Features" → {messages.visualization.toolDetail.keyFeatures}
"Quick Install" → {messages.visualization.toolDetail.quickInstall}
"View on GitHub" → {messages.visualization.toolDetail.viewOnGithub}
"Try Demo" → {messages.visualization.toolDetail.tryDemo}
"Integrates With" → {messages.visualization.toolDetail.integratesWith}
```

---

## ✅ Success Criteria

### Messages Extended:
- [ ] flywheel-messages.ts має нову visualization секцію
- [ ] flywheel-messages.uk.ts має Ukrainian visualization секцію
- [ ] All placeholder та tool detail strings покрити

### Component Integration:
- [ ] useLocale та getFlywheelMessages imports додано
- [ ] messages variable створена в component
- [ ] Всі hardcoded popup strings замінені
- [ ] CSS changes від Agent 1 збережені (no conflicts)

### Functional Testing:
- [ ] EN flywheel popups працюють з новими messages
- [ ] UK flywheel popups працюють з українськими labels
- [ ] Placeholder content локалізований
- [ ] Tool detail popups локалізовані
- [ ] Original spacing problem SOLVED (mb-6 md:mb-8)

---

## 🚫 КРИТИЧНІ ОБМЕЖЕННЯ

### НЕ ТОРКАЙТЕСЯ:
- **CSS classes** - Agent 1 вже виправив spacing
- **Component logic** - тільки string localization
- **Інших частин flywheel system**

### COORDINATE CAREFULLY:
- Agent 1 працював з CSS на line 636
- ВИ працюєте з JS strings в тому ж файлі
- **NO OVERWRITE CSS CHANGES**

---

## 📊 КРИТИЧНЕ ЗНАЧЕННЯ DEPENDENCY

### ЧОМУ DEPENDENCY КРИТИЧНО:
1. **File Conflict:** Обидва агенти модифікують flywheel-visualization.tsx
2. **Line 636:** Agent 1 змінює CSS, ви НЕ можете перезаписати
3. **Timing:** CSS infrastructure має бути готова перед i18n

### COORDINATION PROTOCOL:
- **Agent 1**: CSS classes, spacing, visual fixes
- **ВИ**: JS strings, popup content, localization
- **NO OVERLAP** якщо правильно синхронізовані

---

## 📢 COORDINATION SIGNALS

### Input: КРИТИЧНО ДОЧЕКАТИСЯ
**Signal:** "⚡ CSS SPACING COMPLETE" від Agent 1

### Verification: Перевірити Agent 1 роботу
```bash
# Перевірити що CSS виправлено:
grep -n "mb-6 md:mb-8" apps/web/components/flywheel-visualization.tsx
```

### Output: Broadcast
**Signal:** "🔗 FLYWHEEL POPUPS LOCALIZED - original problem solved"

### Timing:
- Дочекатися: Agent 1 completion (~75 хв)
- Початок роботи: 75-120 хв
- Завершення: 120 хв

---

## 🎯 SYMBOLIC IMPORTANCE

**Оригінальна проблема користувача:**
> "Ecosystem The Agentic Coding Flywheel" spacing + popup issues

**Це ЗАВЕРШЕННЯ оригінальної проблеми:**
- Agent 1: Виправить "Ecosystem" spacing (mb-6 md:mb-8)
- ВИ: Локалізуєте popup content

**HISTORICAL SIGNIFICANCE:**
- Перший issue що започаткував весь проект
- Демонстрація повного resolution cycle
- From bug report → comprehensive solution

---

## 🚀 EXECUTION PROTOCOL

```bash
# 1. Wait for Agent 1 signal (CRITICAL)
# "⚡ CSS SPACING COMPLETE"

# 2. Verify CSS changes preserved
grep -n "mb-6 md:mb-8" apps/web/components/flywheel-visualization.tsx

# 3. Analyze popup strings (10 хв)
grep -n "GitHub\|stars\|features" apps/web/components/flywheel-visualization.tsx

# 4. Extend flywheel messages (15 хв)
# - Add visualization section to .ts/.uk.ts

# 5. Integrate component (20 хв)
# - Add imports, messages variable
# - Replace hardcoded strings
# - PRESERVE CSS changes from Agent 1

# 6. Test and signal
# EN/UK popup functionality
# "🔗 FLYWHEEL POPUPS LOCALIZED - original problem solved"
```

**РЕЗУЛЬТАТ:** Повне розв'язання оригінальної проблеми користувача - spacing + localized popups за 45 хв