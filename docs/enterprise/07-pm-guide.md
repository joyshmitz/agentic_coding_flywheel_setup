# Блок 7: Гайд для Project Manager

## Зміст

- [Огляд ролі](#огляд-ролі)
- [Капелюхи PM](#капелюхи-pm)
- [Core інструменти](#core-інструменти)
- [Щоденні процеси](#щоденні-процеси)
- [Планування та декомпозиція](#планування-та-декомпозиція)
- [Координація multi-agent](#координація-multi-agent)
- [Звітність та комунікація](#звітність-та-комунікація)
- [Зв'язок з Odoo](#звязок-з-odoo)
- [Метрики ефективності](#метрики-ефективності)
- [Ризики та обмеження](#ризики-та-обмеження)
- [Case study: мультидоменний PM](#case-study-мультидоменний-pm)
- [Наступні кроки](#наступні-кроки)

---

## Огляд ролі

Project Manager в ACFS координує AI agents в різних доменах підприємства.
Це НЕ тільки software PM — це PM будь-якого проєкту, де AI agents є виконавцями.

**PM vs Agent Orchestrator:**

- **PM** фокусується на бізнес-результаті: задачі, пріоритети, звітність, бюджет
- **Agent Orchestrator** фокусується на технічній координації: tmux, NTM, multi-agent sessions
- В малих командах це може бути одна людина

**Виконавці:** AI agents (Claude Code, Codex CLI, Gemini CLI) — PM не пише код,
а координує агентів що створюють артефакти. Кілька агентів працюють паралельно.

### PM в ACFS vs Традиційний PM

| Аспект | Традиційний PM | PM в ACFS |
|--------|----------------|-----------|
| Задачі | Jira, Trello | `br create` + Agent Mail |
| Трекінг | Standups, status meetings | `bv` (TUI) + Agent Mail |
| Специфікації | Word, Confluence | `apr setup` + `apr run` |
| Виконавці | Люди | AI agents (кілька паралельно) |
| Scope | Один домен | Мультидоменний (капелюхи) |

> Загальний контекст системи: [00-system-overview.md](./00-system-overview.md)

---

## Капелюхи PM

PM надягає різний капелюх залежно від типу проєкту.
Інструменти (`br`, `bv`, Agent Mail, `apr`, `caut`) — ті самі. Різне — контекст, артефакти та метрики.

| Капелюх | Тип проєкту | Артефакти | Приклад задачі |
|---------|-------------|-----------|----------------|
| **Розробка ПЗ** (Software development) | Software development | Код, тести, PR | "Implement OAuth module" |
| **Дослідження** (Research) | Аналіз, моделювання | Звіти, моделі, дані | "Проаналізувати втрати в мережі 110кВ" |
| **Документація** (Documentation) | Стандарти, регламенти | Markdown, PDF | "Оновити СОП обслуговування трансформаторів" |
| **Аналітика** (Analytics) | Дані з об'єктів, звітність | Dashboards, CSV, SQL | "Побудувати звіт споживання за квартал" |
| **Навчання** (Training) | Онбординг, курси | Матеріали, тести | "Створити курс з нових протоколів безпеки" |

### Що спільного між капелюхами

Незалежно від домену, workflow однаковий:

1. Все починається зі специфікації → `apr setup` + `apr run`
2. Все розбивається на задачі → `br create` + `br dep add`
3. Все координується → Agent Mail
4. Все трекається → `bv` (TUI)
5. Все звітується → Odoo Projects

### Приклад з реальності

Dicklesworthstone (автор ACFS) — одна людина, 146 репозиторіїв в різних доменах:
AI/ML, математика, історія, юриспруденція, біологія, музика, освіта, дизайн.
Ті самі інструменти координації (beads, Agent Mail, APR) — різні домени.

Підприємство "інженерія в енергетиці" аналогічно має різні напрямки:
розробка ПЗ, дослідження, документація/стандарти, аналітика, навчання персоналу.
PM координує AI agents в БУДЬ-ЯКОМУ з цих напрямків.

---

## Core інструменти

PM використовує п'ять основних інструментів. Всі вони domain-agnostic —
працюють однаково незалежно від капелюха.

| Інструмент | CLI / UI | Призначення | Деталі |
|------------|----------|-------------|--------|
| beads_rust | `br` | Задачі, залежності (будь-який домен) | [02b](./02b-tools-acfs-stack.md) |
| Beads Viewer | `bv` | PageRank, візуалізація пріоритетів (TUI) | [02b](./02b-tools-acfs-stack.md) |
| Agent Mail | Web UI + MCP | Координація агентів (НЕ CLI inbox/send) | [02a](./02a-tools-ai-agents.md) |
| APR | `apr` | Уточнення специфікацій | [02b](./02b-tools-acfs-stack.md) |
| coding_agent_usage_tracker | `caut` (planned — не встановлений) | Витрати LLM, контроль бюджету | [02c](./02c-tools-infrastructure.md) |

> Детальний опис кожного інструменту — у відповідних блоках.
> PM не потребує знання всіх 60+ інструментів ACFS — лише ці п'ять.

**Виконавці:** AI agents (Claude Code, Codex CLI, Gemini CLI). PM ставить задачі через
`br create` + Agent Mail, агенти виконують роботу, PM контролює результат.

---

## Щоденні процеси

### Ранковий ритуал

```bash
# Перевірити що зробили агенти (за ніч / з моменту останнього перегляду)
# Agent Mail Web UI: http://localhost:8765/mail
# Або агент використовує MCP: fetch_inbox

# Пріоритети (cross-project, всі капелюхи)
bv                          # TUI інтерактивний
bv -robot-priority          # JSON для автоматизації

# Відкриті задачі
br list -s open
```

### Моніторинг впродовж дня

```bash
# Нові повідомлення від агентів
# Agent Mail Web UI: http://localhost:8765/mail
# Або агент використовує MCP: fetch_inbox
```

File reservations координуються через Agent Mail — агенти повідомляють які файли зарезервовано.

PM реагує на повідомлення: уточнює специфікації, вирішує блокери,
переставляє пріоритети якщо потрібно.

### Завершення дня

```bash
# Синхронізувати beads з GitHub
br sync --flush-only

# Закрити завершені задачі
br close <id> -r "delivered and verified"

# Повідомити агенту (конкретному по імені)
# Agent Mail Web UI: http://localhost:8765/mail
# Або агент використовує MCP: send_message(to=["GreenCastle"], subject="EOD", body_md="...")
```

> Agent Mail адресує конкретних агентів по іменах (GreenCastle, BlueLake),
> не абстрактний "team".

**Детальніше:** [04-workflows.md](./04-workflows.md)

---

## Планування та декомпозиція

Workflow однаковий для всіх капелюхів — три кроки:

### Крок 1: Специфікація

Ідея → `spec.md` → уточнення через APR:

```bash
apr setup && apr run 1 && apr run 2 && apr run 3
```

APR допомагає перетворити нечітку ідею в конкретну специфікацію з acceptance criteria.

### Крок 2: Декомпозиція на задачі

```bash
# Створити задачі
br create "Implement OAuth" -l feature
br create "Write OAuth tests" -l test

# Встановити залежності (test_id залежить від impl_id)
br dep add <test_id> <impl_id>
```

### Крок 3: Розподіл агентам

```
Надіслати задачу агенту з контекстом:
  PM (людина): Agent Mail Web UI → http://localhost:8765/mail
  Агент (MCP): send_message(to=["GreenCastle"], subject="Task: OAuth",
               body_md="Bead #12. Files: src/auth/*. Spec: docs/specs/oauth.md")
```

### Приклади для різних капелюхів

**Розробка ПЗ:**

```bash
br create "Implement OAuth" -l feature
# Agent Mail: надіслати задачу GreenCastle
# MCP: send_message(to=["GreenCastle"], subject="Task: OAuth",
#       body_md="Bead #12. Files: src/auth/*")
```

**Дослідження:**

```bash
br create "Аналіз втрат 110кВ Q4" -l research
# Agent Mail: надіслати задачу BlueLake
# MCP: send_message(to=["BlueLake"], subject="Task: Grid loss analysis",
#       body_md="Bead #45. Data: grid_data/q4/*.csv. Output: reports/q4-losses.md")
```

### Flow diagram

```
Ідея → spec.md → apr setup + run → br create → br dep add → Agent Mail → моніторинг → br close
```

**Детальніше:** [04-workflows.md#feature-development](./04-workflows.md#feature-development)

---

## Координація multi-agent

### Розподіл роботи

Розділити задачі по scope: файли, data domains, deliverables.
Кожен агент отримує чітко визначену зону відповідальності.

```
Розподіл через Agent Mail (Web UI або MCP):
  Агент 1 (backend): send_message(to=["GreenCastle"], subject="OAuth: backend",
                      body_md="Bead #12. Files: src/api/auth/*")
  Агент 2 (frontend): send_message(to=["BlueLake"], subject="OAuth: frontend",
                       body_md="Bead #13. Files: src/ui/login/*")
```

### File reservation

Перевірити що агенти не працюють з одними файлами одночасно:

File reservations координуються через Agent Mail — агенти повідомляють які файли зарезервовано.
Якщо конфлікт — координувати через Agent Mail, розділити scope або запланувати послідовно.

### Типи блокерів та PM-дії

| Тип блокера | PM-дія |
|-------------|--------|
| Залежність між задачами | Переставити пріоритет blocked задачі |
| Технічне питання | Agent Mail: reply з уточненням специфікації (MCP: `reply_message`) |
| Конфлікт файлів | Agent Mail: координація з інструкцією зарезервувати файли |
| Агент застряг | Перепризначити задачу іншому агенту |
| Зовнішня залежність | Ескалація в Odoo |

```bash
# Перевірити відкриті задачі та залежності
br list -s open
```

```
Відповісти на питання агента:
  PM (людина): Agent Mail Web UI → http://localhost:8765/mail
  Агент (MCP): reply_message(message_id=<id>, body_md="Clarification: use JWT, not session-based auth")
```

**Детальніше:** [04-workflows.md#multi-agent-collaboration](./04-workflows.md#multi-agent-collaboration)

---

## Звітність та комунікація

### Dashboards та візуалізація

```bash
# Поточні пріоритети (PageRank) — TUI інтерактивний
bv

# Експорт графа залежностей
bv -export-graph graph.svg
```

### Status updates

Шаблон для щоденного/щотижневого звіту:

```
## Status Update [дата]

### Завершено
- Bead #12: OAuth backend — delivered
- Bead #15: Grid analysis Q4 — report ready

### Заблоковано
- Bead #18: Needs API spec clarification

### Наступні кроки
- Bead #20: Frontend integration
- Bead #22: Q1 data collection
```

### Звітність для менеджменту

| Звіт | Частота | Інструменти |
|------|---------|------------|
| Пріоритети по проєкту | Щоденно | `bv` (TUI) або `bv -robot-priority` (JSON) |
| Cross-project overview | Щоденно | `bv` (всі капелюхи) |
| Velocity | Щотижня | `br list -s closed` |
| Stakeholder report | Щотижня | `bv -export-graph report.svg` + Odoo dashboard |
| LLM витрати | Щотижня | `caut` (planned — не встановлений) |

---

## Зв'язок з Odoo

### Архітектура зв'язку (FCP)

```
ACFS Tools ──[FCP]──> flywheel_connectors ──[API]──> Odoo v19
  (br, bv, am, caut)    (zone-isolated)        (Projects, Quality, Accounting)
```

FCP (Flywheel Connector Protocol) — протокол зв'язку між ACFS та Odoo.
Реалізація — в окремому репо `flywheel_connectors` (branch `research/odoo-v19-fcp-integration`).

### Зони FCP

Криптографічна ізоляція + capability-based дозволи:

| Зона | Integrity | Confidentiality | Призначення |
|------|-----------|-----------------|-------------|
| `z:owner` | 100 | 100 | Повний контроль |
| `z:private` | 80 | 90 | Приватні дані |
| `z:work` | 60 | 70 | Робочі операції (PM working space) |
| `z:community` | 40 | 40 | Командна робота |
| `z:public` | 20 | 10 | Публічні API |

### Синхронізація даних

| Дані | ACFS → Odoo | Odoo → ACFS |
|------|-------------|-------------|
| Задачі | br tasks → Odoo tasks | Odoo tasks → br tasks |
| Статуси | br close → stage change | Stage change → br status |
| Пріоритети | PageRank → Odoo priority | Odoo priority → br |
| Витрати LLM | caut → Accounting (planned) | — |
| Quality gates | — | PDCA checks → br gates |

> Синхронізація — planned архітектура. Поточний стан реалізації: див. flywheel_connectors.

### Odoo v19 Quality API для PM

PDCA (Plan-Do-Check-Act) контролює якість БУДЬ-ЯКИХ процесів, не лише продукції.

> **Proposed workflow** — ще не реалізовано в flywheel_connectors.

**Quality gate workflow:**

```
Odoo створює check point
  → connector передає в beads
    → агент виконує перевірку
      → PM приймає рішення (approve/reject)
        → статус повертається в Odoo
```

PM отримує quality alerts з Odoo → створюються beads з відповідним статусом.
Кожен "капелюх" — окремий Odoo Project з відповідним quality control plan.

### Policy Profiles (масштаб PM)

| Профіль | Автоматизація | PM involvement | Приклад |
|---------|---------------|----------------|---------|
| ФОП | 80-95% | Мінімальний — PM = сам підприємець | 1-3 проєкти, 2-5 агентів |
| ТОВ | 50-70% | Середній — PM координує кілька напрямків | 5-10 проєктів, капелюхи |
| ПАТ | 30-50% | Високий — PM + compliance + аудит | 10+ проєктів, суворі gates |

### Process Decomposition Model

```
Бізнес-процес = Σ(Operations) + Σ(Gates) + Σ(Decisions)
                 ↓               ↓           ↓
              br tasks       quality checks  PM decisions
              → агенти       → Odoo PDCA     → Agent Mail
```

- PM розбиває процес на Operations → кожна стає bead
- Operations можуть бути Skills (автоматизовані агентами)
- Gates — контрольні точки якості (Odoo Quality API)
- Decisions — моменти де PM приймає рішення (не агент)

> Деталі реалізації FCP — в репо `flywheel_connectors` (branch `research/odoo-v19-fcp-integration`).

---

## Метрики ефективності

Метрики domain-agnostic — працюють для всіх капелюхів.

| Метрика | Як виміряти | Ціль |
|---------|-------------|------|
| Velocity | `br list -s closed` → закриті за тиждень | 15-25/тиждень |
| Cycle time | Створення → закриття bead | < 3 дні |
| Blocker resolution | Час від виявлення блокера до вирішення | < 4 години |
| Agent utilization | Робота vs очікування | > 80% |
| Spec quality | Кількість ітерацій APR до прийняття | <= 3 |
| LLM budget | `caut` (planned — не встановлений) | В межах бюджету |

```bash
# Перевірити velocity
br list -s closed

# Перевірити бюджет LLM
# caut (planned — не встановлений)
```

---

## Ризики та обмеження

| Ризик | Опис | Мітігація |
|-------|------|----------|
| Context switching | PM з 5 капелюхами втрачає фокус | Timebox по капелюхах, daily review тільки пріоритети |
| Knowledge gap | PM не експерт в кожному домені | APR для специфікацій, агенти як domain experts |
| PM bottleneck | Всі рішення через одну людину | Делегувати рутинні Decisions агентам (тільки Gates — PM) |
| Tooling learning curve | 5 CLI інструментів одночасно | Послідовний онбординг (див. нижче) |

### Онбординг нового PM

Рекомендований порядок вивчення інструментів (перший тиждень):

| День | Інструмент | Фокус |
|------|-----------|-------|
| 1-2 | `br` | `br create`, `br list`, `br close` — задачі |
| 3 | Agent Mail | Web UI (`http://localhost:8765/mail`) — координація |
| 4 | `bv` | `bv` (TUI), `bv -export-graph` — візуалізація |
| 5 | `apr` | `apr setup` + `apr run` — специфікації |
| Далі | `caut` | Бюджет LLM, Odoo інтеграція (planned — не встановлений) |

---

## Case study: мультидоменний PM

Приклад тижня PM з трьома капелюхами одночасно.

### Понеділок — Розробка ПЗ

5 задач OAuth feature → 2 агенти паралельно (GreenCastle, BlueLake):

```bash
br create "OAuth: token endpoint" -l feature
br create "OAuth: refresh flow" -l feature
br create "OAuth: middleware" -l feature
br create "OAuth: frontend login" -l feature
br create "OAuth: integration tests" -l test
```

```
Agent Mail — надіслати задачі:
  → GreenCastle: "OAuth backend" (Beads #30-32. Files: src/api/auth/*)
  → BlueLake: "OAuth frontend" (Bead #33. Files: src/ui/login/*)
```

File reservations координуються через Agent Mail з інструкцією зарезервувати файли.

### Вівторок-Середа — Дослідження

3 задачі аналіз втрат в мережі 110кВ → 1 агент (RedStone):

```bash
br create "Зібрати дані Q4 з об'єктів" -l research
br create "Аналіз втрат по фідерах" -l research
br create "Звіт з рекомендаціями" -l research
```

```
Agent Mail — надіслати задачу:
  → RedStone: "Grid loss analysis Q4"
    (Beads #35-37. Data: grid_data/q4/*.csv. Output: reports/q4-losses.md)
```

- Вхідні дані: CSV з об'єктів за Q4
- Вихідні артефакти: `reports/q4-losses.md`, графіки
- Quality gate: Odoo PDCA check на достовірність даних → PM approve

### Четвер — Документація

2 задачі оновлення СОП обслуговування трансформаторів → 1 агент:

```bash
br create "Оновити СОП: розділ 3 (періодичність)" -l docs
br create "Оновити СОП: додаток А (чеклист)" -l docs

apr setup && apr run 1 && apr run 2 && apr run 3
```

APR refine → уточнення вимог до документу перед передачею агенту.

### Щоденно (cross-project)

```bash
# PageRank cross-project — всі капелюхи в одному view
bv

# Повідомлення з усіх напрямків
# Agent Mail Web UI: http://localhost:8765/mail
```

### П'ятниця — звітність

```bash
# Граф залежностей для stakeholders
bv -export-graph weekly.svg

# Синхронізація з GitHub
br sync --flush-only
```

Odoo dashboard → менеджмент бачить прогрес по всіх напрямках.

---

## Наступні кроки

- **Загальний огляд системи:** [00-system-overview.md](./00-system-overview.md)
- **Робочі процеси:** [04-workflows.md](./04-workflows.md)
- **Вимоги до кандидатів (PM):** [05-candidate-requirements.md](./05-candidate-requirements.md)
- **Гайд для HR:** [06-hr-guide.md](./06-hr-guide.md)

> PM role описана в [00-system-overview.md](./00-system-overview.md),
> технічні навички — в [05-candidate-requirements.md](./05-candidate-requirements.md).

---

*Див. також: [README](./README.md) | [Workflows](./04-workflows.md)*

*Версія: 1.0.0*
*Останнє оновлення: 2026-02-05T08:17:42+02:00*
