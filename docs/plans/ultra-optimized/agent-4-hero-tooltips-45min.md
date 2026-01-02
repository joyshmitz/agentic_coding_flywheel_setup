# Agent 4: Hero Tooltips Specialist (45 хв)

## 🎯 УЛЬТРА-ФОКУС: Hero Subtitle Tooltips

**РОЛЬ:** Додати інтерактивні tooltips до hero section головної сторінки
**КРИТИЧНІСТЬ:** 🟢 Швидка демонстрація покращення UX

---

## 🚀 ПАРАЛЕЛЬНИЙ СТАРТ: Без Dependencies

**МОЖЕТЕ ПОЧИНАТИ:** Одночасно з Agents 3, 5, 6 (різні файли/секції)

---

## ⚡ ЗАВДАННЯ 1: Проаналізувати Hero Section (10 хв)

### Завдання 1.1: Знайти hero subtitle
**Файл:** `apps/web/app/page.tsx`

```bash
# Знайти hero section (шукати близько lines 150-200)
grep -n -A 5 -B 5 "cloud server" apps/web/app/page.tsx
```

### Завдання 1.2: Ідентифікувати терміни для tooltips
**Шукати такі технічні терміни:**
- `cloud server` → `cloud-server` (jargon term)
- `agentic` → `agentic` (jargon term)
- `Claude Code` → `claude-code` (jargon term)
- `OpenAI Codex` → `openai-codex` (jargon term)
- `Google Gemini` → `google-gemini` (jargon term)
- `open-source` → `open-source` (jargon term)

### Завдання 1.3: Перевірити jargon dictionary
```bash
# Перевірити що терміни існують в словнику
grep -E "(cloud-server|agentic|claude-code|openai-codex|google-gemini|open-source)" apps/web/lib/jargon.ts
```

---

## ⚡ ЗАВДАННЯ 2: Створити Helper Function (15 хв)

### Завдання 2.1: Додати imports
**Файл:** `apps/web/app/page.tsx`

```typescript
// ЗНАЙТИ існуючі імпорти і ДОДАТИ:
import { Jargon } from '@/components/jargon';
```

### Завдання 2.2: Створити renderHeroSubtitle helper
**ДОДАТИ перед головним компонентом HomePage:**

```typescript
function renderHeroSubtitle() {
  return (
    <>
      Set up a <Jargon term="cloud-server">cloud server</Jargon> for{" "}
      <Jargon term="agentic">agentic</Jargon> coding in 30 minutes.{" "}
      Support for <Jargon term="claude-code">Claude Code</Jargon>,{" "}
      <Jargon term="openai-codex">OpenAI Codex</Jargon>, and{" "}
      <Jargon term="google-gemini">Google Gemini</Jargon>.
    </>
  );
}
```

### Завдання 2.3: Замінити в JSX
**ЗНАЙТИ щось схоже на:**
```typescript
<p className="text-lg text-white/70 mb-8">
  Set up a cloud server for agentic coding in 30 minutes.
</p>
```

**ЗАМІНИТИ НА:**
```typescript
<p className="text-lg text-white/70 mb-8">
  {renderHeroSubtitle()}
</p>
```

---

## ⚡ ЗАВДАННЯ 3: Тестування Locales (20 хв)

### Завдання 3.1: English Testing
```bash
# Відкрити http://127.0.0.1:3000/?lang=en
# Перевірити що tooltips працюють:
# - Hover над "cloud server" → tooltip з'являється
# - Hover над "agentic" → tooltip з'являється
# - Hover над "Claude Code" → tooltip з'являється
# - Hover над "OpenAI Codex" → tooltip з'являється
# - Hover над "Google Gemini" → tooltip з'являється
```

### Завдання 3.2: Ukrainian Testing
```bash
# Відкрити http://127.0.0.1:3000/?lang=uk
# Перевірити українські tooltips:
# - Всі терміни мають Ukrainian explanations
# - Tooltip UI українською (якщо Agent 3 завершив роботу)
# - Glossary links працюють
```

### Завдання 3.3: Responsive Testing
```bash
# Mobile (375px): tooltips працюють на touch
# Desktop (1024px+): hover tooltips працюють
# Tablet (768px): touch та hover обидва працюють
```

---

## ✅ Success Criteria

### Technical Implementation:
- [ ] Jargon import додано до page.tsx
- [ ] renderHeroSubtitle() helper створено
- [ ] Hero subtitle замінено на helper function
- [ ] Всі технічні терміни wrapped в <Jargon> tags

### Functional Testing:
- [ ] English tooltips працюють
- [ ] Ukrainian tooltips працюють (після Agent 3)
- [ ] Responsive поведінка правильна
- [ ] Jargon dictionary terms існують

### UI/UX Verification:
- [ ] Hero text читається nature (not broken by tooltip styling)
- [ ] Tooltip positioning правильне
- [ ] Performance impact мінімальний
- [ ] Visual regression відсутня

---

## 🚫 КРИТИЧНІ ОБМЕЖЕННЯ

### НЕ ТОРКАЙТЕСЯ:
- **Data arrays** в page.tsx (lines 443+, 725+) - це Agent 5
- **Будь-яких інших секцій** page.tsx крім hero
- **Build system або CSS** - це Agent 1

### КООРДИНАЦІЯ З Agent 5:
- **ВИ**: Hero section (lines ~150-200)
- **Agent 5**: Data arrays (lines 443+, 725+, 825+)
- **ZERO conflicts** - різні частини файлу

---

## 📊 КООРДИНАЦІЯ З ІНШИМИ АГЕНТАМИ

### PARALLEL з:
- **Agent 5**: Обидва в page.tsx, але різні секції
- **Agent 6**: UI components (різні файли)
- **Agent 3**: Jargon messages (він робить infrastructure, ви використовуєте)

### DEPENDENCIES:
- **НЕ ЗАЛЕЖИТЕ** від інших агентів
- **Agent 3**: Якщо завершить, отримаєте кращі Ukrainian tooltips

### FILE OWNERSHIP:
- **page.tsx**: ВИ (hero) ∥ Agent 5 (data arrays) - NO CONFLICTS

---

## 🎯 КРИТИЧНЕ ЗНАЧЕННЯ

**Що робимо:**
- Перша демонстрація tooltip покращення
- Hero section UX enhancement
- Foundation для подальшої tooltip expansion

**Impact:**
- Користувачі одразу бачать покращення на главній сторінці
- Technical terms стають зрозумілими
- Professional onboarding experience

**Strategic value:**
- Швидкий win для демонстрації прогресу
- Base pattern для інших агентів
- Minimal risk, maximum visibility

---

## 📢 COORDINATION SIGNALS

### Input: Очікування
- **НЕ ЗАЛЕЖИТЕ** від інших агентів (можете починати одразу)

### Output: Broadcast
**Signal:** "🎯 HERO TOOLTIPS COMPLETE - main page enhanced"

### Timing:
- Початок: Одразу з Agents 3, 5, 6 (паралельно)
- Завершення: 45 хв
- Independent completion

---

## 🚀 EXECUTION PROTOCOL

```bash
# 1. Аналіз hero section (10 хв)
grep -n "cloud server" apps/web/app/page.tsx
# Знайти точне місце hero subtitle

# 2. Модифікація (15 хв)
# - Додати Jargon import
# - Створити renderHeroSubtitle()
# - Замінити в JSX

# 3. Testing (20 хв)
# - EN tooltips: http://127.0.0.1:3000/?lang=en
# - UK tooltips: http://127.0.0.1:3000/?lang=uk
# - Responsive testing

# 4. Signal
# "🎯 HERO TOOLTIPS COMPLETE - main page enhanced"
```

**РЕЗУЛЬТАТ:** Professional hero section з interactive tooltips, мінімальний ризик, швидкий wins за 45 хв

---

## 🎨 EXPECTED VISUAL RESULT

**До:**
```
Set up a cloud server for agentic coding in 30 minutes.
Support for Claude Code, OpenAI Codex, and Google Gemini.
```

**Після:**
```
Set up a [cloud server] for [agentic] coding in 30 minutes.
Support for [Claude Code], [OpenAI Codex], and [Google Gemini].
```
*(where [...] indicates interactive tooltip terms)*

**User Experience:**
- Hover reveals explanations of technical terms
- Glossary links for deeper learning
- Seamless integration with existing design