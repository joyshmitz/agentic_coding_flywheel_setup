# План виправлення недоліків сторінки Flywheel та popup компонентів

## 🔍 РЕЗУЛЬТАТИ ПОВНОГО АУДИТУ САЙТУ

### Знайдено проблем:
- ❌ **15+ сторінок з проблемами CSS відступів**
- ❌ **100+ захардкожених англійських рядків**
- ❌ **8 компонентів без i18n інтеграції**
- ❌ **3 modal/tooltip системи з проблемами локалізації**

---

## Поетапне виконання (від простого до складного)

### Фаза 1: Швидкі CSS виправлення по всьому сайту (15-20 хв)
**ПРІОРИТЕТ: КРИТИЧНИЙ** 🚨

#### Проблема: Неконсистентні відступи badge-to-heading по всьому сайту

**Локації з проблемами `mb-4` → `mb-6 md:mb-8`**:

1. **flywheel/page.tsx**:
   - Лінія 269: WorkflowSection header
   - Лінія 396: PromptsSection header
   - Лінія 431: SynergySection header
   - Лінія 621: ToolsSection header
   - Лінія 684: PhilosophySection header

2. **components/flywheel-visualization.tsx**:
   - Лінія 636: Ecosystem header (оригінальна проблема)

3. **workflow/page.tsx**:
   - Лінія 633: `mb-3` → `mb-5 md:mb-6` (Flywheel card)

4. **troubleshooting/page.tsx**:
   - Лінія 97: IssueCard category → `mb-4` замість `mb-2`

5. **learn/page.tsx**:
   - Лінія 342: Progress section → `mb-4` замість `mb-2`

#### Letter-spacing консистентність:
**Змінити**: `tracking-[0.25em]` → `tracking-[0.2em]` (по всьому сайту)

#### Icon-text gaps стандартизація:
**Змінити**: `gap-1.5` → `gap-2` для кращої читабельності

**Тестування**: Перевірити responsive поведінку на всіх змінених сторінках

---

### Фаза 2: Локалізація modal/tooltip компонентів (45-60 хв)
**ПРІОРИТЕТ: ВИСОКИЙ** 🔄

#### 2.1 Jargon Component (основна tooltip/modal система)

**Файл**: `/data/projects/acfs-repo/apps/web/components/jargon.tsx`

**Захардкожені рядки для виправлення**:
- Лінія 219: `aria-label="Learn about ${jargonData.term}"`
- Лінія 311: `aria-label="Close"`
- Лінія 364: `"Hover or focus to learn more"`
- Лінія 374: `"Open in glossary →"`
- Лінія 463: `"View in glossary →"`

**Створити**: `/data/projects/acfs-repo/apps/web/lib/jargon-messages.ts`
```typescript
export const jargonMessages = {
  tooltip: {
    learnAbout: "Learn about {term}",
    close: "Close",
    hoverToLearn: "Hover or focus to learn more",
    openInGlossary: "Open in glossary →",
    viewInGlossary: "View in glossary →",
  },
}
```

#### 2.2 Flywheel Visualization Component

**Файл**: `/data/projects/acfs-repo/apps/web/components/flywheel-visualization.tsx`

**Додати до flywheel-messages.ts**:
```typescript
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
```

#### 2.3 Glossary Pages Консистентність

**Проблема**: Два різних glossary implementations
- ✅ `/apps/web/app/learn/glossary/page.tsx` (новий, локалізований)
- ❌ `/apps/web/app/glossary/page.tsx` (старий, захардкожений)

**Рішення**: Мігрувати старий glossary page до нового патерну

---

### Фаза 3: Масштабна локалізація захардкоженого контенту (2-3 години)
**ПРІОРИТЕТ: СЕРЕДНІЙ** 📚

#### 3.1 Home Page Data Arrays (100+ рядків)

**Файл**: `/data/projects/acfs-repo/apps/web/app/page.tsx`

**Створити нові message файли**:
- `home-workflow-steps.ts/.uk.ts` (13 кроків)
- `home-eligibility.ts/.uk.ts` (8 критеріїв)
- `home-pricing.ts/.uk.ts` (3 pricing items)

**Масиви для локалізації**:
```typescript
// WORKFLOW_STEPS (лінії 443-457)
- "Choose OS", "Install Terminal", "Generate SSH Key"...

// FOR_YOU_ITEMS (лінії 725-730)
- "You want AI to write real, production code for you"...

// NOT_FOR_YOU_ITEMS (лінії 732-737)
- "You want a completely free solution"...

// PRICING_ITEMS (лінії 825-829)
- "Cloud VPS $40–56/month", "Claude Max $200"...
```

#### 3.2 UI Component Labels

**Файл**: `/data/projects/acfs-repo/apps/web/components/stepper.tsx`
```typescript
// Захардкожені статуси:
- "In progress" (лінія 85)
- "Complete" (лінія 88)
```

**Файл**: `/data/projects/acfs-repo/apps/web/components/command-card.tsx`
```typescript
// Захардкожені labels:
- "Run on VPS" (лінія 67)
- "Run on your computer" (лінія 74)
- aria-label: "Copy command" (лінія 224)
```

#### 3.3 Educational Content

**Файл**: `/data/projects/acfs-repo/apps/web/components/connection-check.tsx`

**20+ захардкожених рядків**:
- "STOP! Are you connected to your VPS?"
- "Understanding: You have TWO computers"
- "Your Computer (laptop/desktop)"
- "SSH is like a phone call to your VPS..."

#### 3.4 Navigation & Layout

**Файл**: `/data/projects/acfs-repo/apps/web/app/wizard/layout.tsx`

**Navigation labels**:
- "Back to Home" (лінія 136)
- "Back" / "Next" buttons (лінії 218, 228)
- "Step X of Y" format
- "Progress" label

#### 3.5 Flywheel Content Data

**Структурувати локалізовані дані** (як в оригінальному плані):
- `flywheel-content.ts/.uk.ts`
- Tool descriptions, workflow scenarios, agent prompts

---

### Фаза 4: Cleanup та консистентність (30-45 хв)
**ПРІОРИТЕТ: НИЗЬКИЙ** 🧹

#### 4.1 Мігрувати старий Glossary

**Проблема**: `/apps/web/app/glossary/page.tsx` (старий) vs `/apps/web/app/learn/glossary/page.tsx` (новий)

**Рішення**:
- Redirect старої сторінки → нової
- Або повністю мігрувати старий код до нового патерну

#### 4.2 Стандартизувати Spacing Patterns

**Створити CSS utilities або компоненти**:
- `SectionHeader` component для consistent badge-to-heading spacing
- Стандартизувати `gap-2` для icon-text pairs
- Responsive spacing patterns документувати

#### 4.3 Jargon Component Поліпшення

**Spacing fixes** після локалізації:
- Desktop tooltip: `space-y-2` → `space-y-3`
- Icon-text consistency: всюди `gap-2`
- Mobile sheet padding optimization

#### 4.4 Error Handling для Missing Translations

**Додати fallbacks** для відсутніх перекладів:
- Default до English якщо Ukrainian переклад відсутній
- Dev mode warnings для missing keys
- Type safety для нових message files

---

## 📋 ФАЙЛИ ДЛЯ МОДИФІКАЦІЇ

### Фаза 1: CSS фікси (15+ файлів)
- ✏️ `apps/web/app/flywheel/page.tsx` (5 sections)
- ✏️ `apps/web/components/flywheel-visualization.tsx` (1 лінія)
- ✏️ `apps/web/app/workflow/page.tsx` (1 section)
- ✏️ `apps/web/app/troubleshooting/page.tsx` (1 section)
- ✏️ `apps/web/app/learn/page.tsx` (1 section)

### Фаза 2: Modal/Tooltip i18n (5 files)
- 📁 `apps/web/lib/jargon-messages.ts` (новий)
- 📁 `apps/web/lib/jargon-messages.uk.ts` (новий)
- ✏️ `apps/web/components/jargon.tsx` (5+ рядків)
- ✏️ `apps/web/lib/flywheel-messages.ts` (додати visualization)
- ✏️ `apps/web/components/flywheel-visualization.tsx` (8+ рядків)

### Фаза 3: Масштабна локалізація (15+ files)
- 📁 `apps/web/lib/home-workflow-steps.ts/.uk.ts` (нові)
- 📁 `apps/web/lib/home-eligibility.ts/.uk.ts` (нові)
- 📁 `apps/web/lib/home-pricing.ts/.uk.ts` (нові)
- 📁 `apps/web/lib/component-labels.ts/.uk.ts` (нові)
- 📁 `apps/web/lib/connection-check-messages.ts/.uk.ts` (нові)
- 📁 `apps/web/lib/wizard-navigation.ts/.uk.ts` (нові)
- ✏️ `apps/web/app/page.tsx` (масиви даних)
- ✏️ `apps/web/components/stepper.tsx`
- ✏️ `apps/web/components/command-card.tsx`
- ✏️ `apps/web/components/connection-check.tsx`
- ✏️ `apps/web/app/wizard/layout.tsx`
- ✏️ `apps/web/lib/i18n/translations.ts` (експорти)

### Фаза 4: Cleanup (3 files)
- ✏️ `apps/web/app/glossary/page.tsx` (cleanup або redirect)
- 📁 `apps/web/components/ui/section-header.tsx` (можливо новий)
- ✏️ `apps/web/lib/i18n/fallbacks.ts` (можливо новий)

## 🎯 ОЧІКУВАНИЙ РЕЗУЛЬТАТ

### Після Фази 1:
- ✨ **15+ сторінок** з правильним форматуванням
- ✨ Консистентні відступи badge-to-heading
- ✨ Стандартизований letter-spacing

### Після Фази 2:
- 🌐 **Jargon tooltips** повністю локалізовані
- 🌐 **Flywheel popups** українською
- 🌐 **Glossary consistency** між версіями

### Після Фази 3:
- 📖 **100+ hardcoded strings** локалізовані
- 📖 Home page повністю українською
- 📖 UI components з proper i18n
- 📖 Educational content перекладений

### Після Фази 4:
- 🧹 Консистентна архітектура
- 🧹 Reusable patterns
- 🧹 Error handling готовий
- 🧹 Документація оновлена

**Фінальний стан**: Повністю локалізований, професійно відформатований український сайт з консистентною UX/UI архітектурою.