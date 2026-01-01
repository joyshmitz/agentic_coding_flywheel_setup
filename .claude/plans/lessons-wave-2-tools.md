# Wave 2: Tools Lessons Translation

## Задача
Створити message файли та підключити i18n для 4 уроків про інструменти.

## Залежності
- Wave 1 має бути завершена (патерн `lib/lessons/` існує)

## Уроки цієї хвилі

| Урок | Файл | Рядків |
|------|------|--------|
| ntm-palette | `components/lessons/ntm-palette-lesson.tsx` | 393 |
| ntm-core | `components/lessons/ntm-core-lesson.tsx` | 512 |
| agents-login | `components/lessons/agents-login-lesson.tsx` | 475 |
| cass | `components/lessons/cass-lesson.tsx` | 466 |

## Кроки виконання

### 1. Перевірка Wave 1
```bash
ls lib/lessons/
# Має показати welcome-messages.ts, etc.
```

### 2. Для кожного уроку (паралельно 3 агенти):

**Агент 1: ntm-palette + ntm-core** (905 рядків)
1. Читати обидва lesson файли
2. Створити 4 message файли (EN + UK для кожного)
3. Модифікувати компоненти

**Агент 2: agents-login** (475 рядків)
1. Читати agents-login-lesson.tsx
2. Створити message файли
3. Модифікувати компонент

**Агент 3: cass** (466 рядків)
1. Читати cass-lesson.tsx
2. Створити message файли
3. Модифікувати компонент

### 3. Integration (main agent)
1. Додати експорти в `lib/lessons/index.ts`
2. Додати getters в `lib/i18n/translations.ts`
3. Експортувати з `lib/i18n/index.ts`

### 4. Build & Verify
```bash
bun run build
```

### 5. Commit
```bash
git add .
git commit -m "feat(i18n): add Ukrainian translations for Wave 2 lessons (ntm, agents-login, cass)"
```

## Правила перекладу

### НЕ перекладати:
- Команди: `ntm`, `ntm new`, `ntm attach`, `cc`, `cod`, `gmi`
- Сервіси: Claude, Anthropic, OpenAI, Google
- Код у `<CodeBlock>`
- Технічні терміни: tmux, session, pane, window

### Перекладати:
- Заголовки та описи
- Пояснення концепцій
- Кроки інструкцій

## Очікуваний результат
- 8 нових файлів у `lib/lessons/`
- 4 модифікованих lesson компонентів
- Білд проходить
- Коміт створено
