# Огляд системи: навіщо це все існує

## Бізнес-цикл

ACFS інструменти існують не самі для себе. Вони існують тому, що підприємство
виділяє ресурси і очікує результат. Ось повний цикл:

```
Підприємство (Odoo ERP)
  ├── виділяє ресурси → VPS, API keys, час людей
  ├── формує вимоги → задачі, проєкти, бюджети
  │
  ├── ACFS інструменти (виконання)
  │   ├── AI agents → створюють код
  │   ├── Safety tools → забезпечують якість
  │   ├── Task management → трекають прогрес
  │   └── Coordination → синхронізують агентів
  │
  ├── flywheel_connectors (pipes)
  │   └── beads↔Odoo, caut↔Odoo, Agent Mail↔Odoo
  │
  └── результат → продукт, звітність, ROI
```

---

## Три компоненти системи

### 1. Odoo ERP — облік та управління ресурсами

Центральна система обліку підприємства:

| Модуль Odoo | Що трекає | Зв'язок з ACFS |
|-------------|-----------|----------------|
| Projects | Проєкти та задачі | beads_rust задачі → Odoo Projects |
| Accounting | Витрати | caut (LLM usage) → Odoo Accounting |
| HR | Персонал | Ролі та компетенції → Odoo HR |
| Inventory | Ресурси | VPS, API keys → Odoo Inventory |

### 2. ACFS — інструменти виконання

60+ інструментів, встановлених на VPS, організованих у категорії:

| Категорія | Призначення | Ключові інструменти |
|-----------|-------------|---------------------|
| AI Coding Agents | Написання коду | Claude Code, Codex CLI, Gemini CLI |
| Agent Coordination | Синхронізація агентів | NTM, Agent Mail, CASS, CAAM |
| Safety & Quality | Захист від помилок | UBS, DCG, SLB, ast-grep |
| Task Management | Трекінг задач | beads_rust, Beads Viewer |
| Code Analysis | Аналіз та навички | Meta Skill, APR, JeffreysPrompts |
| Build Management | Збірка та репо | Repo Updater, RCH, WezTerm Automata |
| Infrastructure | Рантайми, CLI, хмара | Bun, uv, Rust, Go, Docker, Vercel |

Детальний опис: [02a](./02a-tools-ai-agents.md), [02b](./02b-tools-acfs-stack.md), [02c](./02c-tools-infrastructure.md)

### 3. flywheel_connectors — pipes між ACFS та ERP

Окремий репозиторій, що реалізує інтеграції:

| Connector | Напрямок | Що передає |
|-----------|----------|------------|
| beads → Odoo | ACFS → ERP | Задачі, статуси, залежності |
| caut → Odoo | ACFS → ERP | Витрати на LLM API |
| Agent Mail → Odoo | ACFS → ERP | Активність агентів |
| Odoo → beads | ERP → ACFS | Нові задачі, пріоритети |

> **Важливо:** ACFS manifest НЕ змінюється для інтеграцій.
> Connectors працюють як зовнішні pipes, зберігаючи чистий upstream sync.

---

## Ролі учасників

### Developer (AI-Augmented)

**Основне:** пише код за допомогою AI agents.

| Інструменти | Використання |
|-------------|-------------|
| Claude Code, Codex CLI, Gemini CLI | Щоденна робота |
| NTM, Agent Mail | Координація |
| UBS, DCG | Безпека |
| beads_rust | Трекінг задач |

**Документація:** [02a](./02a-tools-ai-agents.md) → [04](./04-workflows.md)

### Project Manager

**Основне:** координує задачі, пріоритизує, звітує.

| Інструменти | Використання |
|-------------|-------------|
| beads_rust, Beads Viewer | Задачі, залежності, PageRank |
| Agent Mail | Координація агентів |
| APR | Уточнення специфікацій |

**Зв'язок з Odoo:** проєкти та задачі → Odoo Projects (через connectors).

### DevOps / SRE

**Основне:** інфраструктура, деплой, моніторинг.

| Інструменти | Використання |
|-------------|-------------|
| Docker, Tailscale, RCH | Інфраструктура |
| Vercel, Wrangler, Supabase | Деплой |
| DCG, SLB | Safety gates |
| Process Triage | Управління процесами |

**Зв'язок з Odoo:** інфраструктурні витрати → Odoo Accounting.

### HR

**Основне:** найм, онбординг, оцінка компетенцій.

| Інструменти | Використання |
|-------------|-------------|
| (знання про всі категорії) | Оцінка кандидатів |

**Документація:** [05](./05-candidate-requirements.md) → [06](./06-hr-guide.md)

### Operations

**Основне:** облік витрат, управління ресурсами.

| Інструменти | Використання |
|-------------|-------------|
| caut | Трекінг витрат на LLM |
| CAAM | Управління акаунтами |

**Зв'язок з Odoo:** витрати на API → Odoo Accounting, HR → Odoo HR.

---

## Як читати цю документацію

### Маршрути за ролями

| Роль | Маршрут |
|------|---------|
| Developer | [01](./01-tools-overview.md) → [02a](./02a-tools-ai-agents.md) → [04](./04-workflows.md) → [03](./03-tool-integrations.md) |
| PM | 00 (цей файл) → [02b](./02b-tools-acfs-stack.md) (beads, Agent Mail) → [04](./04-workflows.md) |
| DevOps | [02c](./02c-tools-infrastructure.md) → [02b](./02b-tools-acfs-stack.md) (safety) → [04](./04-workflows.md) |
| HR | [05](./05-candidate-requirements.md) → [06](./06-hr-guide.md) → [01](./01-tools-overview.md) |
| Operations | 00 (цей файл) → [02b](./02b-tools-acfs-stack.md) (caut, CAAM) |

### Загальна структура

| Файл | Питання |
|------|---------|
| 00-system-overview.md | **Навіщо?** Бізнес-контекст, ролі |
| 01-tools-overview.md | **Що?** Категорії інструментів |
| 02a/02b/02c | **Як саме?** Детальний опис кожного інструменту |
| 03-tool-integrations.md | **Як взаємодіють?** Архітектура, MCP |
| 04-workflows.md | **Як працювати?** Щоденні процеси |
| 05-candidate-requirements.md | **Хто?** Ролі, навички, рівні |
| 06-hr-guide.md | **Як наймати?** Профілі, інтерв'ю |
| MAINTENANCE.md | **Як підтримувати?** Правила оновлення docs |

---

*Див. також: [README](./README.md) | [Огляд інструментів](./01-tools-overview.md)*
