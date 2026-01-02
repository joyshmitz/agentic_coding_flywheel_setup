# Agent 2: Critical Hydration Fix Specialist (30 хв)

## 🎯 УЛЬТРА-ФОКУС: Hydration Bug Only

**РОЛЬ:** Виправити критичний hydration bug в jargon.tsx
**КРИТИЧНІСТЬ:** 🔴 Foundation для всіх tooltip функцій

---

## 🚀 ЄДИНЕ ЗАВДАННЯ: Hydration Bug Fix (30 хв)

### Завдання 2.1: Діагностика проблеми (10 хв)

#### Прочитати поточний jargon.tsx
```bash
# Проаналізувати current implementation
cat apps/web/components/jargon.tsx | head -50
```

#### Перевірити LocaleContext mounted state
```bash
# Знайти mounted state pattern
grep -n "mounted" apps/web/lib/i18n/context.tsx
```

#### Знайти hydration issues
```typescript
// Проблема: Component не перевіряє mounted state перед рендерингом
// Це викликає render mismatches під час hydration
// Symptoms: Tooltips можуть рендеритися але не бути інтерактивними до повної гідрації
```

### Завдання 2.2: Модифікація jargon.tsx (15 хв)

#### Крок 1: Додати mounted import
**Файл:** `apps/web/components/jargon.tsx`

```typescript
// ДОДАТИ цей імпорт (знайти існуючі imports)
import { useLocale } from '@/lib/i18n';
```

#### Крок 2: Додати mounted check в Jargon function
**Знайти основну функцію Jargon і додати перевірку:**

```typescript
export function Jargon({ term, children, className }: JargonProps) {
  const { locale, mounted } = useLocale(); // ДОДАТИ mounted

  // ДОДАТИ цю перевірку на початку функції:
  if (!mounted) {
    return <span className="text-white/70">{children}</span>;
  }

  // Решта існуючого коду залишається БЕЗ ЗМІН...
  // НЕ ТОРКАТИСЯ i18n messages, aria-labels тощо (це Agent 3)
}
```

### Завдання 2.3: SSR/CSR Testing (5 хв)

#### Тестувати hydration transition
```bash
# Перезапустити dev server для fresh hydration
bun run dev
```

#### Перевірити на різних сторінках:
1. **http://127.0.0.1:3000/** - home page tooltips
2. **http://127.0.0.1:3000/wizard/os** - wizard tooltips
3. **View page source** - має показати fallback `<span class="text-white/70">`
4. **JavaScript enabled** - має показати повноцінні interactive tooltips

#### Console errors check:
```bash
# Відкрити DevTools Console
# Перевірити відсутність hydration mismatch warnings
# Шукати: "Warning: Text content did not match", "Hydration failed"
```

---

## ✅ Success Criteria

### Технічні критерії:
- [ ] `mounted` state properly imported from useLocale
- [ ] Hydration guard added at start of Jargon function
- [ ] Fallback renders `<span className="text-white/70">` before hydration
- [ ] Повноцінні tooltips після hydration complete

### Functional критерії:
- [ ] No console hydration errors
- [ ] Tooltips interactive after page load
- [ ] Smooth SSR → CSR transition
- [ ] No render mismatches

### Page testing:
- [ ] Home page tooltips працюють
- [ ] Wizard page tooltips працюють
- [ ] View source shows fallback spans
- [ ] JavaScript tooltips functional

---

## 🚫 КРИТИЧНІ ОБМЕЖЕННЯ

### НЕ ТОРКАЙТЕСЯ:
- **i18n messages** - це Agent 3 завдання
- **aria-labels strings** - це Agent 3 завдання
- **будь-яких hardcoded strings** - це Agent 3 завдання
- **CSS styling** - це Agent 1 завдання

### ТІЛЬКИ РОБІТЬ:
- Додати `mounted` import
- Додати hydration guard
- Тестувати SSR/CSR transition

---

## 📊 КООРДИНАЦІЯ З ІНШИМИ АГЕНТАМИ

### ПАРАЛЕЛЬНО з Agent 1:
- Agent 1 робить build + CSS
- ВИ робите hydration fix
- ZERO conflicts - різні аспекти системи

### DEPENDENCIES OUT:
- **Agent 3** чекає вашого завершення для безпечної роботи з jargon.tsx i18n

### FILE OWNERSHIP:
- **jargon.tsx**: ВИ (hydration logic) → Agent 3 (i18n messages)

---

## 🎯 КРИТИЧНЕ ЗНАЧЕННЯ

**Проблема яку вирішуємо:**
- Tooltips можуть ламатися під час hydration
- Render mismatches між server і client
- Неконсистентна інтерактивність

**Після вирішення:**
- Стабільна tooltip система
- Smooth hydration transitions
- Foundation для всього i18n роботи Agents 3-7

**Impact на інших агентів:**
- Agent 3-7 можуть безпечно працювати з tooltip системою
- Zero hydration conflicts для нових features

---

## 📢 COORDINATION SIGNALS

### Input: Очікування
- Дочекатися власної готовності (не залежимо від інших)

### Output: Broadcast
**Signal:** "🔥 HYDRATION STABLE - jargon.tsx ready for i18n"

### Timing:
- Початок: Паралельно з Agent 1 (0 хв)
- Завершення: 30 хв
- Передача: Agent 3 може почати i18n роботу

---

## 🚀 ШВИДКИЙ EXECUTION PROTOCOL

```bash
# 1. Аналіз (10 хв)
cat apps/web/components/jargon.tsx | head -50
grep -n "mounted" apps/web/lib/i18n/context.tsx

# 2. Модифікація (15 хв)
# - Додати useLocale import з mounted
# - Додати hydration guard в Jargon function

# 3. Тестування (5 хв)
bun run dev
# - Перевірити home page, wizard page
# - Console errors check
# - SSR/CSR transition validation

# 4. Signal (instant)
# "🔥 HYDRATION STABLE - jargon.tsx ready for i18n"
```

**РЕЗУЛЬТАТ:** Стабільна tooltip foundation за 30 хв для 6 інших агентів