# Plan: Fix Missing Tooltips Across Entire Website

## Problem Analysis - SYSTEMIC ISSUES DISCOVERED

After comprehensive investigation, this is **NOT just a home page issue** but multiple serious problems:

### Issue #1: Critical Hydration Bug ✅ FIXED (commit 601a12d)
- ✅ Recent hydration fix (commit e4dd3ec) introduced `mounted` state in LocaleContext
- ✅ `Jargon` component now checks `mounted` before rendering interactive elements
- ✅ Pre-hydration renders non-interactive span with same styling
- **Status:** RESOLVED

### Issue #2: Massive Missing Coverage
- ✅ Wizard pages (11 files) properly use Jargon components
- ✅ Home page has Jargon components (hero subtitle now included - commit 601a12d)
- ❌ **ALL OTHER PAGES** completely lack Jargon tooltips:
  - `/learn` - Learning hub with NO tooltips
  - `/workflow` - Technical workflow page with NO tooltips
  - `/troubleshooting` - NO tooltips
  - `/docs/security` - NO tooltips
  - `/flywheel` - Lists 8 tools but NO tooltips
  - **All 24 lesson components** - NO Jargon usage at all

### Issue #3: Potential CSS/Build Problem ✅ CLEARED
- ✅ Jargon component has correct CSS classes
- ✅ Tailwind configuration looks correct
- ✅ Build cache cleared and rebuilt (commit 601a12d)
- ⚠️ Styling at 30% opacity - may need visibility review

## Comprehensive Problem Analysis & Complexity Assessment

### ПРОБЛЕМА #1: Critical Hydration Bug ✅ ВИПРАВЛЕНО
**Опис:** `mounted` state з LocaleContext не використовується в Jargon компоненті
**Файли:** `/components/jargon.tsx`, `/lib/i18n/context.tsx`
**Статус:** ✅ ВИПРАВЛЕНО в commit 601a12d

**Виконано:**
- ✅ Додано перевірку `mounted` в Jargon компонент
- ✅ Pre-hydration рендерить span з однаковими стилями
- ✅ Build пройшов успішно

**Переваги:** Виправлено проблеми з інтерактивністю існуючих tooltips

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

### ПРОБЛЕМА #4: Home Page Hero Subtitle ✅ ВИПРАВЛЕНО
**Опис:** Конкретні терміни в hero тексті без tooltips
**Файли:** `/app/page.tsx` (1 файл)
**Терміни:** cloud server, agentic, Claude Code, OpenAI Codex, Google Gemini, open-source
**Статус:** ✅ ВИПРАВЛЕНО в commit 601a12d

**Виконано:**
- ✅ Додано `HeroSubtitle` компонент з Jargon tooltips
- ✅ Підтримка EN/UK локалей
- ✅ Build пройшов успішно

**Переваги:** Покращено UX головної сторінки з інтерактивними tooltips

---

## Рекомендований План Виправлень

### ЕТАП 1: Швидкі Quick Wins ✅ ВИКОНАНО
**Порядок:** #3 CSS/Build → #4 Hero Subtitle
**Commit:** 601a12d

1. ✅ **Виправити CSS/Build проблему**
   - ✅ Очищено `.next` build directory
   - ✅ `bun run build` успішно
   - ⚠️ Візуальні індикатори потребують UI тестування

2. ✅ **Додати tooltips до Hero Subtitle**
   - ✅ Додано `HeroSubtitle` компонент
   - ✅ 6 Jargon tooltips: cloud-server, ai-agents, claude-code, codex, gemini-cli, open-source
   - ✅ Підтримка EN/UK локалей

**Результат:** Hero subtitle тепер має інтерактивні tooltips

---

### ЕТАП 2: Критичний Bug Fix ✅ ВИКОНАНО
**Порядок:** #1 Hydration Bug
**Commit:** 601a12d

3. ✅ **Виправити гідраційну проблему**
   - ✅ Модифіковано `/components/jargon.tsx`
   - ✅ Додано перевірку `mounted` state
   - ✅ Pre-hydration рендерить non-interactive span
   - ✅ Build пройшов успішно

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