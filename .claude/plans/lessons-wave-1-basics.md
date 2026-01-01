# Wave 1: Basics Lessons Translation

## Задача
Створити message файли та підключити i18n для 4 базових уроків.

## Уроки цієї хвилі

| Урок | Файл | Рядків |
|------|------|--------|
| welcome | `components/lessons/welcome-lesson.tsx` | 326 |
| linux-basics | `components/lessons/linux-basics-lesson.tsx` | 279 |
| tmux-basics | `components/lessons/tmux-basics-lesson.tsx` | 301 |
| ssh-basics | `components/lessons/ssh-basics-lesson.tsx` | 427 |

## Архітектура

### Створити файли:
```
lib/lessons/
├── welcome-messages.ts
├── welcome-messages.uk.ts
├── linux-basics-messages.ts
├── linux-basics-messages.uk.ts
├── tmux-basics-messages.ts
├── tmux-basics-messages.uk.ts
├── ssh-basics-messages.ts
├── ssh-basics-messages.uk.ts
└── index.ts
```

### Структура message об'єкта:
```typescript
export const welcomeMessages = {
  goalBanner: "...",
  sections: {
    sectionName: {
      title: "...",
      content: "...",
      items: [...],
    },
  },
  tips: { ... },
  // mirror the JSX structure
};
```

## Кроки виконання

### 1. Читання шаблону
Прочитати існуючий i18n патерн з:
- `lib/wizard-messages.ts` (структура)
- `lib/i18n/translations.ts` (getter pattern)

### 2. Для кожного уроку (паралельно 3 агенти):

**Агент 1: welcome**
1. Читати `components/lessons/welcome-lesson.tsx`
2. Екстрактувати всі текстові рядки в message об'єкт
3. Створити `lib/lessons/welcome-messages.ts` (EN)
4. Створити `lib/lessons/welcome-messages.uk.ts` (UK переклад)
5. Модифікувати компонент використовувати messages

**Агент 2: linux-basics**
- Аналогічно для linux-basics-lesson.tsx

**Агент 3: tmux-basics + ssh-basics**
- Два менших уроки разом

### 3. Integration (main agent)
1. Створити `lib/lessons/index.ts` з експортами
2. Додати getters в `lib/i18n/translations.ts`:
```typescript
import { welcomeMessages } from "../lessons/welcome-messages";
import { welcomeMessagesUk } from "../lessons/welcome-messages.uk";
// ...

export function getWelcomeMessages(locale: Locale) {
  return locale === "uk" ? welcomeMessagesUk : welcomeMessages;
}
```
3. Експортувати з `lib/i18n/index.ts`

### 4. Build & Verify
```bash
bun run build
```

### 5. Commit
```bash
git add .
git commit -m "feat(i18n): add Ukrainian translations for Wave 1 lessons (welcome, linux, tmux, ssh)"
```

## Правила перекладу

### НЕ перекладати:
- Команди: `ls`, `cd`, `ssh`, `tmux`, `pwd`
- Технічні терміни: VPS, SSH, CLI, terminal
- Код у `<CodeBlock>` компонентах
- Назви інструментів: zsh, Oh My Zsh, tmux

### Перекладати:
- Заголовки секцій
- Пояснювальний текст
- Кроки інструкцій (текстова частина)
- TipBox контент

## Очікуваний результат
- 8 нових файлів у `lib/lessons/`
- 4 модифікованих lesson компонентів
- Білд проходить
- Коміт створено
