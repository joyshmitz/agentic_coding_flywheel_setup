# Wave 3: Development Lessons Translation

## Задача
Створити message файли та підключити i18n для 3 уроків про розробку.

## Залежності
- Wave 1-2 завершені

## Уроки цієї хвилі

| Урок | Файл | Рядків |
|------|------|--------|
| ubs | `components/lessons/ubs-lesson.tsx` | 443 |
| github-cli | `components/lessons/github-cli-lesson.tsx` | 526 |
| git-basics | `components/lessons/git-basics-lesson.tsx` | 558 |

## Кроки виконання

### 1. Для кожного уроку (паралельно 3 агенти):

**Агент 1: ubs** (443 рядків)
- Universal Base Setup lesson

**Агент 2: github-cli** (526 рядків)
- GitHub CLI lesson

**Агент 3: git-basics** (558 рядків)
- Git basics lesson

### 2. Integration (main agent)
1. Додати експорти в `lib/lessons/index.ts`
2. Додати getters в `lib/i18n/translations.ts`

### 3. Build & Commit
```bash
bun run build
git add .
git commit -m "feat(i18n): add Ukrainian translations for Wave 3 lessons (ubs, github-cli, git-basics)"
```

## Правила перекладу

### НЕ перекладати:
- Команди: `git`, `gh`, `git clone`, `git push`, `gh pr create`
- Сервіси: GitHub, Git
- Технічні терміни: repository, branch, commit, pull request, merge

### Перекладати:
- Заголовки та описи
- Пояснення концепцій
- Кроки інструкцій

## Очікуваний результат
- 6 нових файлів у `lib/lessons/`
- 3 модифікованих lesson компонентів
- Білд проходить
- Коміт створено
