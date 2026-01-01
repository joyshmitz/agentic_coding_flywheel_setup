# Wave 4: Advanced Lessons Translation

## Задача
Створити message файли та підключити i18n для 3 advanced уроків.

## Залежності
- Wave 1-3 завершені

## Уроки цієї хвилі

| Урок | Файл | Рядків |
|------|------|--------|
| beads | `components/lessons/beads-lesson.tsx` | 535 |
| keeping-updated | `components/lessons/keeping-updated-lesson.tsx` | 532 |
| agent-mail | `components/lessons/agent-mail-lesson.tsx` | 576 |

## Кроки виконання

### 1. Для кожного уроку (паралельно 3 агенти):

**Агент 1: beads** (535 рядків)
- Beads issue tracker lesson

**Агент 2: keeping-updated** (532 рядків)
- How to keep system updated

**Агент 3: agent-mail** (576 рядків)
- Agent Mail coordination

### 2. Integration (main agent)
1. Додати експорти в `lib/lessons/index.ts`
2. Додати getters в `lib/i18n/translations.ts`

### 3. Build & Commit
```bash
bun run build
git add .
git commit -m "feat(i18n): add Ukrainian translations for Wave 4 lessons (beads, keeping-updated, agent-mail)"
```

## Правила перекладу

### НЕ перекладати:
- Команди: `bd`, `bd create`, `bd list`, `bd show`
- Інструменти: beads, Agent Mail, MCP
- Технічні терміни: issue, dependency, blocker

### Перекладати:
- Заголовки та описи
- Пояснення концепцій
- Кроки інструкцій

## Очікуваний результат
- 6 нових файлів у `lib/lessons/`
- 3 модифікованих lesson компонентів
- Білд проходить
- Коміт створено
