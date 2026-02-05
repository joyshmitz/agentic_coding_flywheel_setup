# План роботи з українським перекладом ACFS

## Огляд

Цей документ описує систематичний підхід до підтримки українського перекладу при оновленнях з upstream репозиторію.

**Гілка перекладу:** `translate-ukrainian-acfs`

---

## Швидкий старт сесії

Перед початком роботи - швидкий скан (1-2 хв), не повне дослідження репо:

```bash
# 1. Статус i18n файлів (web app)
ls apps/web/lib/*.uk.ts | head -10
ls apps/web/lib/lessons/*.uk.tsx | head -5

# 2. Статус enterprise документації
ls docs/enterprise/*.md | head -10

# 3. Перевірити upstream
git fetch upstream
git log translate-ukrainian-acfs..upstream/main --oneline | head -10

# 4. Покриття перекладу
grep -c 'term:' apps/web/lib/jargon.ts apps/web/lib/jargon.uk.ts
```

### Зразки для копіювання

| Тип файлу | Зразок |
|-----------|--------|
| Messages | `apps/web/lib/tools-page-messages.uk.ts` |
| Lesson component | `apps/web/components/lessons/pt-lesson.uk.tsx` |
| i18n getter | `apps/web/lib/i18n/translations.ts` → `getToolsPageMessages()` |
| Enterprise docs | `docs/enterprise/MAINTENANCE.md` → правила підтримки |

> **Принцип:** Контекст набирається органічно. Не потрібно досліджувати installer scripts, build систему чи bash логіку - тільки i18n файли та документацію.

---

## Фаза 0: Підготовка до merge

```bash
# 1. Зберегти поточний стан
git stash  # якщо є незакомічені зміни

# 2. Fetch upstream
git fetch upstream

# 3. Переглянути зміни
git log translate-ukrainian-acfs..upstream/main --oneline --stat
```

---

## Фаза 1: Виявлення нових файлів для перекладу

```bash
# Знайти нові/змінені файли що потребують перекладу
git diff translate-ukrainian-acfs..upstream/main --name-only | grep -E '\.(tsx?|md)$'
```

### Категорії файлів

| Тип | Приклад | Дія |
|-----|---------|-----|
| Нові lessons | `lessons/new-tool.tsx` | Створити `.uk.tsx` версію |
| Нові messages | `*-messages.ts` | Створити `.uk.ts` версію |
| Змінені messages | Оновлення EN тексту | Оновити UK версію |
| Компоненти з hardcoded strings | `app/*/page.tsx` | Екстрагувати в messages |
| Enterprise docs | `docs/enterprise/*.md` | Підтримка актуальності (див. [MAINTENANCE.md](docs/enterprise/MAINTENANCE.md)) |

---

## Фаза 2: Merge та вирішення конфліктів

```bash
# Merge upstream
git merge upstream/main

# При конфліктах у .uk.ts файлах:
# - Зберігати UK переклади
# - Додавати нові ключі з EN версії для перекладу
```

### Пріоритет вирішення конфліктів

1. Зберегти існуючі українські переклади
2. Додати нові ключі (позначити `// TODO: translate`)
3. Не втратити структурні зміни з upstream

---

## Фаза 3: Аудит нових матеріалів

```bash
# Порівняти кількість термінів/команд
grep -c 'term:' apps/web/lib/jargon.ts apps/web/lib/jargon.uk.ts
grep -c 'name:' apps/web/lib/commands.ts apps/web/lib/commands.uk.ts

# Знайти відсутні UK версії
find apps/web/lib -name "*.ts" ! -name "*.uk.ts" | while read f; do
  uk="${f%.ts}.uk.ts"
  [ ! -f "$uk" ] && echo "Missing: $uk"
done
```

---

## Фаза 4: Створення нових перекладів

### Чеклист для нового *-messages.uk.ts

- [ ] Скопіювати структуру з EN версії
- [ ] Перекласти всі рядки
- [ ] Зберегти технічні терміни англійською (VPS, SSH, API, CLI)
- [ ] Додати пробіл перед одиницями виміру (100 мс, 64 GB)
- [ ] Замінити `'` на `&#39;` в JSX контенті

### Чеклист для нового lesson.uk.tsx

- [ ] Скопіювати структуру з EN версії
- [ ] Перекласти текст в JSX
- [ ] Зберегти code blocks без змін
- [ ] Екранувати апострофи (`&#39;`)
- [ ] Перевірити імпорти компонентів

---

## Фаза 5: Підключення до i18n системи

```typescript
// 1. apps/web/lib/i18n/translations.ts
import { newMessages } from "../new-messages";
import { newMessagesUk } from "../new-messages.uk";

export function getNewMessages(locale: Locale) {
  return locale === "uk" ? newMessagesUk : newMessages;
}

// 2. apps/web/lib/i18n/index.ts
export { getNewMessages } from "./translations";

// 3. Компонент
import { useLocale, getNewMessages } from "@/lib/i18n";
const { locale } = useLocale();
const messages = getNewMessages(locale);
```

---

## Фаза 6: Верифікація

```bash
# 1. Type check
bun run type-check

# 2. Lint (особливо апострофи)
bun run lint 2>&1 | grep -E "error|'\`"

# 3. Build
bun run build

# 4. Візуальна перевірка
bun run dev
# Перемкнути на UK, перевірити нові сторінки
```

---

## Фаза 7: Commit та push

```bash
# Окремі коміти для різних типів змін
git add -f apps/web/lib/*.uk.ts  # force через gitignore
git commit -m "feat(i18n): add Ukrainian translations for [feature]"

git push origin translate-ukrainian-acfs
```

---

## Структура i18n файлів

```
apps/web/lib/
├── *-messages.ts        # EN messages
├── *-messages.uk.ts     # UK messages
├── jargon.ts / .uk.ts   # Глосарій термінів
├── commands.ts / .uk.ts # Команди CLI
├── lessons.ts / .uk.ts  # Метадані уроків
├── i18n/
│   ├── config.ts        # Locales config
│   ├── context.tsx      # React context (useLocale)
│   ├── translations.ts  # Getters для всіх messages
│   └── index.ts         # Public exports
└── lessons/
    ├── *.tsx            # EN lesson components
    └── *.uk.tsx         # UK lesson components
```

---

## Enterprise Documentation (docs/enterprise/)

Правила підтримки enterprise документації винесені в окремий файл:
**[docs/enterprise/MAINTENANCE.md](docs/enterprise/MAINTENANCE.md)**

---

## Типові проблеми та рішення

| Проблема | Рішення |
|----------|---------|
| Апостроф `'` в JSX | Замінити на `&#39;` |
| Hardcoded strings в компоненті | Створити *-messages.ts + .uk.ts, додати getter в i18n |
| Файли в lib/ ігноруються git | Використати `git add -f` |
| Messages існують але не використовуються | Перевірити чи компонент імпортує useLocale + getMessages |

---

## Типові патерни

```typescript
// В компоненті:
const { locale } = useLocale();
const messages = getXxxMessages(locale);

// В JSX для апострофів:
<p>Це м&#39;який перехід</p>

// Одиниці виміру:
"100 мс"  // ✓ з пробілом
"100мс"   // ✗ без пробілу
```

---

## Команди для діагностики

```bash
# Порівняти EN/UK файли
diff <(grep -o 'key:' file.ts | sort) <(grep -o 'key:' file.uk.ts | sort)

# Знайти hardcoded strings
grep -rn '"[A-Z][a-z].*"' apps/web/app --include="*.tsx" | grep -v import

# Перевірити апострофи в UK файлах
grep -rn "'" apps/web --include="*.uk.tsx" | grep -v "&#39;"

# Перевірити пробіли перед одиницями
grep -rn '[0-9]мс\|[0-9]GB\|[0-9]MB' apps/web/lib --include="*.uk.ts"

# Перевірити зміни в manifest (для оновлення enterprise docs)
git diff upstream/main -- packages/manifest/ --name-only
```

---

## Технічні терміни (залишати англійською)

VPS, SSH, API, CLI, CPU, RAM, GPU, NVMe, SSD, IP, URL, DNS, HTTP, HTTPS,
Git, GitHub, Ubuntu, Linux, Bash, JSON, YAML, TypeScript, JavaScript,
React, Next.js, Node.js, Bun, Docker, PostgreSQL, Redis, OAuth, JWT, SSO

---

*Останнє оновлення: 2026-02-05T05:15:30+02:00*
