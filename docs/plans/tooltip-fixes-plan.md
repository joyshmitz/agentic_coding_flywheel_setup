# Plan: Fix Missing Tooltips Across Entire Website

## Problem Analysis - SYSTEMIC ISSUES DISCOVERED

After comprehensive investigation, this is **NOT just a home page issue** but multiple serious problems:

### Issue #1: Critical Hydration Bug
- ✅ Recent hydration fix (commit e4dd3ec) introduced `mounted` state in LocaleContext
- ❌ `Jargon` component doesn't check `mounted` before rendering
- ❌ This causes render mismatches during hydration, breaking tooltip interactivity
- **Impact:** Tooltips may appear but not be interactive until full hydration

### Issue #2: Massive Missing Coverage
- ✅ Wizard pages (11 files) properly use Jargon components
- ✅ Home page has Jargon components (but hero subtitle missing)
- ❌ **ALL OTHER PAGES** completely lack Jargon tooltips:
  - `/learn` - Learning hub with NO tooltips
  - `/workflow` - Technical workflow page with NO tooltips
  - `/troubleshooting` - NO tooltips
  - `/docs/security` - NO tooltips
  - `/flywheel` - Lists 8 tools but NO tooltips
  - **All 24 lesson components** - NO Jargon usage at all

### Issue #3: Potential CSS/Build Problem
- ✅ Jargon component has correct CSS classes
- ✅ Tailwind configuration looks correct
- ❌ Possible build cache issue preventing `cursor-help`, `decoration-dotted` from rendering
- ❌ Very subtle styling (30% opacity) might be invisible

## Comprehensive Problem Analysis & Complexity Assessment

### ПРОБЛЕМА #1: Critical Hydration Bug 🔴 HIGH RISK
**Опис:** `mounted` state з LocaleContext не використовується в Jargon компоненті
**Файли:** `/components/jargon.tsx`, `/lib/i18n/context.tsx`
**Симптоми:** Tooltips можуть рендеритися але не бути інтерактивними до повної гідрації

**Складність виправлення:** 🟡 MEDIUM
- Додати перевірку `mounted` в Jargon компонент
- Повернути fallback до гідрації
- Тестування на SSR/CSR переходах

**Ризики:**
- 🟢 НИЗЬКИЙ: Простий код, не ламає існуючий функціонал
- 🟢 НИЗЬКИЙ: Покращує стабільність гідрації
- 🔴 MEDIUM: Потребує тестування на всіх сторінках з tooltips

**Переваги:** Виправить проблеми з інтерактивністю існуючих tooltips

---

### ПРОБЛЕМА #2: Massive Missing Coverage 🟠 MEDIUM IMPACT
**Опис:** 80% сайту не має tooltips взагалі
**Файли:** 30+ сторінок та компонентів без Jargon usage
**Сторінки без tooltips:**
- `/learn` - Learning hub
- `/workflow` - Technical workflows
- `/troubleshooting` - Support page
- `/docs/security` - Security docs
- `/flywheel` - Tools overview
- **Усі 24 lesson компоненти**

**Складність виправлення:** 🔴 VERY HIGH
- Ідентифікувати всі технічні терміни (100+ випадків)
- Додати Jargon imports до 30+ файлів
- Обгорнути терміни в <Jargon> компоненти
- Перевірити існування всіх term keys в словнику
- Тестування на всіх сторінках

**Ризики:**
- 🔴 HIGH: Масштабні зміни в багатьох файлах
- 🟡 MEDIUM: Можливо буде забагато tooltips (UX проблема)
- 🟡 MEDIUM: Performance impact від рендерингу багатьох tooltip portals
- 🔴 HIGH: Потребує детального UI/UX ревю

**Переваги:** Консистентний UX у всьому сайті, покращення onboarding

---

### ПРОБЛЕМА #3: CSS/Build Issue 🟡 MEDIUM IMPACT
**Опис:** Dotted underlines та cursor changes не відображаються
**Файли:** `/components/jargon.tsx`, Tailwind build, `/app/globals.css`
**Симптоми:** Jargon компоненти рендеряться але без візуальних індикаторів

**Складність виправлення:** 🟢 LOW-MEDIUM
- Очистити `.next` build cache
- Перевірити Tailwind CSS compilation
- Можливо збільшити opacity з 30% до 50%+
- Тестування візуальної видимості

**Ризики:**
- 🟢 НИЗЬКИЙ: Зміни в стилях, легко rollback
- 🟢 НИЗЬКИЙ: Не ламає функціонал
- 🟡 MEDIUM: Збільшення opacity може бути занадто помітним

**Переваги:** Швидке покращення UX для існуючих tooltips

---

### ПРОБЛЕМА #4: Home Page Hero Subtitle 🟢 LOW IMPACT
**Опис:** Конкретні терміни в hero тексті без tooltips
**Файли:** `/app/page.tsx` (1 файл)
**Терміни:** cloud server, agentic, Claude Code, OpenAI Codex, Google Gemini, open-source

**Складність виправлення:** 🟢 LOW
- Додати helper функцію `renderHeroSubtitle(locale)`
- Замінити 1 рядок коду
- Тестування на EN/UK мовах

**Ризики:**
- 🟢 НИЗЬКИЙ: Ізольована зміна в 1 файлі
- 🟢 НИЗЬКИЙ: Не впливає на інші компоненти
- 🟢 НИЗЬКИЙ: Легко rollback

**Переваги:** Швидка демонстрація покращення UX

---

## Рекомендований План Виправлень

### ЕТАП 1: Швидкі Quick Wins (1-2 години) 🟢
**Порядок:** #3 CSS/Build → #4 Hero Subtitle

1. **Виправити CSS/Build проблему**
   - Очистити `.next` build directory
   - `bun run build` для regeneration
   - Перевірити візуальні індикатори tooltips
   - **Ризик:** Мінімальний, швидкий rollback

2. **Додати tooltips до Hero Subtitle**
   - 1 файл: `/app/page.tsx`
   - Додати helper функцію + замінити 1 рядок
   - **Ризик:** Мінімальний, ізольована зміна

**Результат:** Користувач одразу побачить покращення на головній сторінці

---

### ЕТАП 2: Критичний Bug Fix (2-4 години) 🟡
**Порядок:** #1 Hydration Bug

3. **Виправити гідраційну проблему**
   - Модифікувати `/components/jargon.tsx`
   - Додати перевірку `mounted` state
   - Тестування на всіх сторінках з tooltips
   - **Ризик:** Середній, потребує ретельного тестування

**Результат:** Стабільна робота всіх існуючих tooltips

---

### ЕТАП 3: Масштабне Покриття (20-40 годин) 🔴
**Порядок:** #2 Missing Coverage - **ОПЦІОНАЛЬНО**

4. **Додати tooltips на всі сторінки**
   - 30+ файлів для модифікації
   - 100+ технічних термінів для mapping
   - Комплексне тестування UX
   - **Ризик:** Високий, масштабні зміни

**Результат:** Консистентний UX у всьому сайті

---

## Critical Files Summary

**Immediate Changes Required:**
- `/data/projects/acfs-repo/apps/web/components/jargon.tsx` - Hydration fix
- `/data/projects/acfs-repo/apps/web/app/page.tsx` - Hero subtitle
- `/data/projects/acfs-repo/apps/web/lib/i18n/context.tsx` - Reference for mounted state

**Files with Missing Tooltips (For Етап 3):**
- `/data/projects/acfs-repo/apps/web/app/learn/page.tsx`
- `/data/projects/acfs-repo/apps/web/app/workflow/page.tsx`
- `/data/projects/acfs-repo/apps/web/app/troubleshooting/page.tsx`
- `/data/projects/acfs-repo/apps/web/app/docs/security/page.tsx`
- `/data/projects/acfs-repo/apps/web/app/flywheel/page.tsx`
- **24 lesson components** in `/data/projects/acfs-repo/apps/web/components/lessons/*.tsx`

**Dependencies (No Changes):**
- `/data/projects/acfs-repo/apps/web/lib/jargon.ts` - Dictionary (949 lines)
- `/data/projects/acfs-repo/apps/web/lib/jargon.uk.ts` - Ukrainian dictionary (680 lines)

## Підсумок

**Найбільша проблема:** 80% сайту не має tooltips взагалі (проблема #2)
**Найкритичніша проблема:** Hydration bug може ламати існуючі tooltips (проблема #1)
**Найшвидше виправлення:** CSS/Build + Hero Subtitle (проблеми #3, #4)

**Рекомендація:** Почати з Етапів 1-2 для швидкого покращення, потім вирішувати чи варто інвестувати в масштабне Етап 3.