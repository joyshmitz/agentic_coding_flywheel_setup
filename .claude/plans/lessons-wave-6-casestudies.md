# Wave 6: Case Studies + Final Integration

## Задача
Створити message файли для 3 великих case study уроків та завершити інтеграцію.

## Залежності
- Wave 1-5 завершені

## Уроки цієї хвилі

| Урок | Файл | Рядків |
|------|------|--------|
| slb-case-study | `components/lessons/slb-case-study-lesson.tsx` | 722 |
| prompt-engineering | `components/lessons/prompt-engineering-lesson.tsx` | 767 |
| real-world-case-study | `components/lessons/real-world-case-study-lesson.tsx` | 1100 |

**Увага:** Це найбільші уроки. Кожен агент працює з одним файлом.

## Кроки виконання

### 1. Для кожного уроку (паралельно 3 агенти):

**Агент 1: slb-case-study** (722 рядків)
- SLB case study

**Агент 2: prompt-engineering** (767 рядків)
- Prompt engineering techniques

**Агент 3: real-world-case-study** (1100 рядків)
- Real world case study (найбільший!)

### 2. Final Integration (main agent)

1. Перевірити всі exports в `lib/lessons/index.ts`
2. Перевірити всі getters в `lib/i18n/translations.ts`
3. Перевірити exports в `lib/i18n/index.ts`

### 3. Full Build & Test
```bash
bun run build
bun run type-check
```

### 4. Final Commit
```bash
git add .
git commit -m "feat(i18n): complete Ukrainian translations for all 20 lessons"
```

### 5. Summary Verification
Перевірити що всі 20 уроків працюють:
- 40 message файлів у `lib/lessons/`
- 20 модифікованих lesson компонентів
- Білд проходить без помилок

## Правила перекладу

### НЕ перекладати:
- Приклади промптів (залишати англійською з поясненням)
- Код та команди
- Назви проєктів у case studies

### Перекладати:
- Заголовки та описи
- Аналіз та висновки
- Поради та best practices

## Очікуваний результат
- 6 нових файлів у `lib/lessons/`
- 3 модифікованих lesson компонентів
- Повний білд проходить
- Фінальний коміт створено
- Переклад завершено!
