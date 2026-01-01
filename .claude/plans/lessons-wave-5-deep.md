# Wave 5: Deep Dive Lessons Translation

## Задача
Створити message файли та підключити i18n для 3 глибоких уроків.

## Залежності
- Wave 1-4 завершені

## Уроки цієї хвилі

| Урок | Файл | Рядків |
|------|------|--------|
| cm | `components/lessons/cm-lesson.tsx` | 587 |
| safety-tools | `components/lessons/safety-tools-lesson.tsx` | 602 |
| flywheel-loop | `components/lessons/flywheel-loop-lesson.tsx` | 606 |

## Кроки виконання

### 1. Для кожного уроку (паралельно 3 агенти):

**Агент 1: cm** (587 рядків)
- Context Manager lesson

**Агент 2: safety-tools** (602 рядків)
- Safety tools and practices

**Агент 3: flywheel-loop** (606 рядків)
- The Flywheel Loop concept

### 2. Integration (main agent)
1. Додати експорти в `lib/lessons/index.ts`
2. Додати getters в `lib/i18n/translations.ts`

### 3. Build & Commit
```bash
bun run build
git add .
git commit -m "feat(i18n): add Ukrainian translations for Wave 5 lessons (cm, safety-tools, flywheel-loop)"
```

## Правила перекладу

### НЕ перекладати:
- Команди: `cm`, context manager commands
- Концепції: flywheel, loop (можна пояснити в дужках)
- Технічні терміни: context, token, prompt

### Перекладати:
- Заголовки та описи
- Пояснення концепцій
- Кроки інструкцій
- Поради з безпеки

## Очікуваний результат
- 6 нових файлів у `lib/lessons/`
- 3 модифікованих lesson компонентів
- Білд проходить
- Коміт створено
