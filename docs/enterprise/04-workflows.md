# Блок 4: Робочі процеси

## Зміст

- [Daily Workflows](#daily-workflows)
- [Feature Development](#feature-development)
- [Bug Fixing](#bug-fixing)
- [Code Review](#code-review)
- [Multi-Agent Collaboration](#multi-agent-collaboration)
- [Research & Analysis](#research--analysis)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Real-World Case Studies](#real-world-case-studies)

---

## Daily Workflows

### Morning Setup

Типовий початок робочого дня.

```bash
# 1. Запустити або приєднатися до сесії
ntm attach my-project || ntm new my-project

# 2. Перевірити inbox
# Agent Mail Web UI: http://localhost:8765/mail

# 3. Синхронізувати репозиторії
ru sync --quick

# 4. Перевірити пріоритетні задачі
bv                              # TUI інтерактивний
# bv -priority-brief brief.md   # експорт в Markdown

# 5. Запустити агент з контекстом
claude
```

**Автоматизований варіант:**

```bash
# ~/.bashrc або ~/.zshrc
alias morning='ntm attach work 2>/dev/null || ntm new work && bv -priority-brief brief.md && cat brief.md'
```

### Налаштування ідентичності агентів

При перезапуску агента (`ntm respawn`) втрачається Agent Mail ідентичність.
Агент не знає свого імені (LilacCat, GreenCastle) і не може надсилати/отримувати повідомлення.

**Три стратегії відновлення:**

| Стратегія | Механізм | Плюси | Мінуси |
|-----------|----------|-------|--------|
| A. Startup Instructions | Конфіги агентів | Автоматично | Дублювання в проєктах |
| B. NTM post-spawn Hook | hooks.toml | Централізовано | НЕ працює для respawn |
| C. Manual Script | ~/bin скрипт | Працює завжди | Ручний виклик |

#### Стратегія A: Startup Instructions (РЕКОМЕНДОВАНА)

Додати інструкції реєстрації в конфіги кожного агента.

**Claude Code** — `.claude/CLAUDE.md`:

```markdown
## Agent Mail Identity

При старті сесії виконай одне з:

**Варіант 1 — register_agent:**
- project_key: поточна робоча директорія (абсолютний шлях)
- name: "LilacCat"
- program: "claude-code"
- model: "opus-4.5"

**Варіант 2 — macro_start_session (все в одному):**
- human_key: поточна робоча директорія
- agent_name: "LilacCat"
- program: "claude-code"
- model: "opus-4.5"
```

**Gemini CLI** — `.gemini/rules` (файл, не директорія):

```text
## Agent Mail Identity

At session start, use MCP tool register_agent:
- project_key: current working directory (absolute path)
- name: "GreenCastle"
- program: "gemini-cli"
- model: "gemini-2.5-pro"

Alternative: macro_start_session with human_key and agent_name params.
```

**Codex CLI** — `.codex/rules/agent-mail.md` (директорія з .md файлами):

```markdown
## Agent Mail Identity

Register with MCP register_agent at session start:
- project_key: current working directory (absolute path)
- name: "RedStone"
- program: "codex-cli"
- model: "gpt-5.2-codex"
```

#### Стратегія B: NTM post-spawn Hook

Працює ТІЛЬКИ для `ntm spawn`, НЕ для `ntm respawn`.

**~/.config/ntm/hooks.toml:**

```toml
[[command_hooks]]
event = "post-spawn"
name = "am-register-agents"
enabled = true
timeout = "15s"
continue_on_error = true
command = '''
sleep 3
PROJECT_KEY="$NTM_PROJECT_DIR"

if [ "$NTM_AGENT_COUNT_CC" -gt 0 ]; then
  ntm send "$NTM_SESSION" --cc "Use MCP tool register_agent with project_key='$PROJECT_KEY', name='LilacCat', program='claude-code', model='opus-4.5'"
fi

if [ "$NTM_AGENT_COUNT_GMI" -gt 0 ]; then
  ntm send "$NTM_SESSION" --gmi "Use the MCP tool register_agent with project_key='$PROJECT_KEY', name='GreenCastle', program='gemini-cli', model='gemini-2.5-pro'"
fi
'''
```

**Примітка:** Gemini CLI потребує фразу "Use the MCP tool" для виклику MCP інструментів.

#### Стратегія C: Manual Script

Скрипт для ручного виклику після respawn.

**~/bin/ntm-register-identity.sh:**

```bash
#!/bin/bash
SESSION="${1:-acfs}"
PROJECT_KEY="${2:-/data/projects/agentic_coding_flywheel_setup}"

ntm send "$SESSION" --cc "Use MCP tool register_agent with project_key='$PROJECT_KEY', name='LilacCat', program='claude-code', model='opus-4.5'"
ntm send "$SESSION" --gmi "Use the MCP tool register_agent with project_key='$PROJECT_KEY', name='GreenCastle', program='gemini-cli', model='gemini-2.5-pro'"

echo "Identity registration sent to agents in session: $SESSION"
```

**Використання:**

```bash
chmod +x ~/bin/ntm-register-identity.sh
ntm-register-identity.sh acfs
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Agent not found" | Перевірити `resource://agents/{project_key}` |
| Gemini ігнорує MCP | Додати "Use the MCP tool" на початку |
| Ім'я вже зайняте | Використати інше adjective+noun або опустити `name` |

Для API деталей див. [Реєстрація агентів](./02a-tools-ai-agents.md#reyestratsiya-ahentiv).
Архітектура persistence — [Збереження ідентичності](./03-tool-integrations.md#zberezhennya-identychnosti-ahentiv).

### Session Management

Робота з кількома проектами.

```bash
# Перегляд активних сесій
ntm list

# Перемикання між проектами
ntm attach frontend
ntm attach backend
ntm attach docs

# Broadcast команду всім
ntm broadcast "git status"
```

### End of Day

Завершення робочого дня.

```bash
# 1. Комміт незакінченої роботи (WIP)
git add -A && git commit -m "WIP: [опис]"

# 2. Sync beads з GitHub
br sync --flush-only

# 3. Перевірити статус всіх репо
ru status

# 4. Повідомити команду (якщо потрібно)
# Agent Mail Web UI: http://localhost:8765/mail
# Або агент (MCP): send_message(to=["GreenCastle"], subject="EOD update", body_md="Progress: [опис]")
```

---

## Feature Development

### Workflow: Нова функціональність

```
┌─────────────────────────────────────────────────────────────────┐
│  1. PLANNING                                                    │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│  │ Create  │───▶│ Refine  │───▶│ Break   │───▶│ Assign  │      │
│  │  spec   │    │  spec   │    │ down    │    │ tasks   │      │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘      │
│      │              │              │              │             │
│    (apr)          (apr)      (br create)  (Agent Mail)         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. IMPLEMENTATION                                              │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│  │ Start   │───▶│ Develop │───▶│  Test   │───▶│ Review  │      │
│  │ agent   │    │ feature │    │  code   │    │  code   │      │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘      │
│      │              │              │              │             │
│  (claude)      (edit files)    (ubs scan)    (claude /review)  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. FINALIZATION                                                │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│  │ Commit  │───▶│ Push    │───▶│ Create  │───▶│ Update  │      │
│  │ changes │    │ branch  │    │   PR    │    │  task   │      │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘      │
│      │              │              │              │             │
│   (git)         (git)          (gh pr)      (br update)        │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step

#### 1. Створення та уточнення специфікації

```bash
# Написати початкову специфікацію
cat > spec.md << 'EOF'
## Feature: User Authentication

### Requirements
- OAuth 2.0 support (Google, GitHub)
- JWT token management
- Refresh token rotation

### Acceptance Criteria
- User can login via OAuth
- Session persists for 7 days
- Logout invalidates all tokens
EOF

# Покращити специфікацію з APR
apr setup && apr run 1 && apr run 2
```

#### 2. Розбиття на задачі

```bash
# Створити головну задачу
br create "Implement OAuth authentication" -l feature

# Створити підзадачі
br create "Setup OAuth providers" -l subtask
br create "Implement JWT handling" -l subtask
br create "Add refresh token rotation" -l subtask
br create "Write integration tests" -l subtask

# Встановити залежності (tests-task залежить від jwt-task, jwt від providers)
br dep add <tests-task> <jwt-task>
br dep add <jwt-task> <providers-task>
```

#### 3. Розробка з AI-агентом

```bash
# Запустити Claude Code з контекстом
claude

# В Claude Code:
> Read spec-v2.md
> Implement OAuth provider setup following the specification
> Focus on Google OAuth first, then GitHub

# Сканування на баги після змін
ubs scan src/auth/
```

#### 4. Тестування

```bash
# Запустити тести
bun test

# Або з coverage
bun test --coverage
```

#### 5. Commit та PR

```bash
# Перевірити зміни
git diff

# Commit (DCG перевірить команду)
git add src/auth/
git commit -m "feat(auth): implement OAuth 2.0 with Google and GitHub providers"

# Push
git push -u origin feature/oauth-auth

# Створити PR
gh pr create --title "feat: OAuth authentication" --body "Implements OAuth 2.0 login"
```

#### 6. Оновлення задач

```bash
# Закрити завершені задачі
br close oauth-task --reason "Implemented and merged"

# Sync з GitHub
br sync
```

---

## Bug Fixing

### Workflow: Виправлення бага

```
┌──────────────────────────────────────────────────────────────────┐
│  1. TRIAGE                                                       │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Receive │───▶│Reproduce│───▶│ Isolate │───▶│ Create  │       │
│  │ report  │    │  bug    │    │  cause  │    │  task   │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  2. FIX                                                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Search  │───▶│Understand│───▶│  Fix    │───▶│  Test   │       │
│  │ history │    │  code   │    │  bug    │    │  fix    │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
│      │              │              │              │              │
│   (cass)        (claude)       (claude)        (ubs)            │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  3. VERIFY                                                       │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                      │
│  │ Run all │───▶│ Verify  │───▶│ Deploy  │                      │
│  │  tests  │    │  fix    │    │ (merge) │                      │
│  └─────────┘    └─────────┘    └─────────┘                      │
└──────────────────────────────────────────────────────────────────┘
```

### Step-by-Step

#### 1. Пошук попередніх рішень

```bash
# Пошук в історії агентів
cass "authentication error"
cass "null pointer exception"

# Пошук в коді
rg "handleAuth" --type ts
```

#### 2. Аналіз з AI

```bash
claude

# В Claude Code:
> I'm seeing this error: [вставити error]
> The relevant code is in src/auth/handler.ts
> Help me understand the cause and fix it
```

#### 3. Сканування після фіксу

```bash
# Перевірка на нові баги
ubs scan src/auth/handler.ts

# Перевірка related файлів
ubs scan src/auth/
```

#### 4. Тестування

```bash
# Запустити конкретний тест
bun test src/auth/handler.test.ts

# Запустити всі тести
bun test
```

---

## Code Review

### Workflow: Code Review з AI

```bash
# 1. Отримати PR для review
gh pr checkout 123

# 2. Запустити сканування
ubs scan --changed-only

# 3. AI-assisted review
claude

# В Claude Code:
> Review the changes in this PR
> Focus on security issues, performance, and code quality
> Check: src/api/*.ts
```

### Automated Review Pipeline

```bash
#!/bin/bash
# scripts/review-pr.sh

PR_NUMBER=$1

# Checkout PR
gh pr checkout $PR_NUMBER

# Get changed files
CHANGED=$(gh pr diff $PR_NUMBER --name-only)

# UBS scan
ubs scan $CHANGED --format json > ubs-report.json

# AI review
claude "Review these changes for PR #$PR_NUMBER. Focus on security and performance. Files: $CHANGED"
```

---

## Multi-Agent Collaboration

### Workflow: Паралельна розробка

```
┌───────────────────────────────────────────────────────────────────┐
│                    COORDINATOR (Human/Lead Agent)                 │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  1. Define tasks                                          │    │
│  │  2. Assign to agents                                      │    │
│  │  3. Monitor progress                                      │    │
│  │  4. Resolve conflicts                                     │    │
│  └──────────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│    Agent A        │ │    Agent B        │ │    Agent C        │
│  (Claude Code)    │ │  (Codex CLI)      │ │  (Claude Code)    │
│  ────────────     │ │  ────────────     │ │  ────────────     │
│  Task: Backend    │ │  Task: Frontend   │ │  Task: Tests      │
│  Files: src/api/* │ │  Files: src/ui/*  │ │  Files: test/*    │
└─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     Agent Mail        │
                    │  (coordination hub)   │
                    └───────────────────────┘
```

### Setup

```bash
# Terminal 1: Coordinator
ntm new project-main

# Terminal 2: Agent A (Backend)
ntm new project-backend
claude

# Terminal 3: Agent B (Frontend)
ntm new project-frontend
codex

# Terminal 4: Agent C (Tests)
ntm new project-tests
claude
```

### Coordination Protocol

```
Coordinator розподіляє задачі через Agent Mail (Web UI або MCP):
  → GreenCastle: "Task: Backend API"
    (Implement REST endpoints for /users. Coordinate with BlueLake for types.)
  → BlueLake: "Task: Frontend components"
    (Implement UserList and UserProfile. Wait for API types from GreenCastle.)
  → RedStone: "Task: E2E tests"
    (Write E2E tests after both API and UI are ready.)

MCP приклад:
  send_message(to=["GreenCastle"], subject="Task: Backend API",
               body_md="Implement REST endpoints for /users...")
```

### File Reservation (уникнення конфліктів)

```
File reservations координуються через Agent Mail MCP:
  Agent A: file_reservation_paths(paths=["src/api/*.ts"], ttl_seconds=7200, exclusive=true)
  Agent B: file_reservation_paths(paths=["src/ui/*.tsx"], ttl_seconds=7200, exclusive=true)
```

---

## Research & Analysis

### Workflow: Дослідження кодової бази

```bash
# 1. Загальна структура
eza --tree --level 2 src/

# 2. Пошук патернів
rg "TODO|FIXME|HACK" --type ts

# 3. AI аналіз
claude

# В Claude Code:
> Analyze the architecture of this codebase
> Focus on: src/core/, src/api/, src/services/
> Identify patterns, anti-patterns, and improvement opportunities
```

### Workflow: Пошук в історії рішень

```bash
# Пошук попередніх рішень
cass "how to handle authentication timeout"

# Пошук в конкретному проекті
cass --project my-app "database migration"

# Export результатів
cass "API design" --export research-notes.md
```

---

## Deployment

### Workflow: Безпечний деплой

```
┌──────────────────────────────────────────────────────────────────┐
│  PRE-DEPLOY CHECKS                                               │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │  Tests  │───▶│   UBS   │───▶│  Build  │───▶│ Review  │       │
│  │  pass   │    │  clean  │    │  works  │    │ config  │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  DEPLOY (requires SLB approval)                                  │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Request │───▶│ Approve │───▶│ Deploy  │───▶│ Verify  │       │
│  │ (slb)   │    │ (human) │    │ (vercel)│    │ (health)│       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
└──────────────────────────────────────────────────────────────────┘
```

### Step-by-Step

```bash
# 1. Pre-deploy checks
bun test
ubs scan --ci --fail-on high
bun build

# 2. Request deploy approval
slb exec "vercel deploy --prod"

# 3. Verify deployment
curl -s https://myapp.vercel.app/health | jq

# 4. Notify team
# Agent Mail Web UI: http://localhost:8765/mail
# Або агент (MCP): send_message(to=["GreenCastle"], subject="Deploy complete", body_md="v1.2.3 deployed")
```

---

## Best Practices

### 1. Session Hygiene

| Practice | Опис |
|----------|------|
| Name sessions clearly | `ntm new feature-auth` замість `ntm new test1` |
| One task per session | Не змішувати різні features |
| Regular commits | WIP commits кожні 30 хвилин |
| Clean up stale sessions | `ntm list && ntm kill stale-session` |

### 2. Safety First

| Practice | Опис |
|----------|------|
| DCG always enabled | Ніколи не вимикати DCG в production |
| UBS before commit | Git hook для автоматичного сканування |
| SLB for critical ops | Деплой, database changes |
| Review AI output | Перевіряти код від AI перед commit |

### 3. Communication

| Practice | Опис |
|----------|------|
| Clear subjects | "Bug: null pointer in auth" замість "fix" |
| Thread continuity | Використовувати reply замість нових threads |
| Acknowledgements | Agent Mail acknowledge для важливих повідомлень |
| Status updates | Регулярні оновлення в Agent Mail |

### 4. Context Management

| Practice | Опис |
|----------|------|
| Use CASS Memory | Зберігати важливі рішення |
| Reference history | `cass "similar problem"` перед новим рішенням |
| Document decisions | ADR (Architecture Decision Records) |
| Clean old memories | `cm compact` регулярно |

### 5. Task Tracking

| Practice | Опис |
|----------|------|
| Granular tasks | 1-4 години на задачу |
| Clear dependencies | `br dep add` для зв'язків |
| Regular sync | `br sync` щодня |
| Prioritize visually | `bv` (TUI) для планування |

---

## Real-World Case Studies

### Case Study 1: Authentication System Refactoring

**Ситуація:** Legacy auth система з session-based підходом потребувала міграції на JWT.

**Workflow використаний:**
1. `apr setup` + `apr run` для специфікації міграції
2. `br create` для розбиття на 15 задач
3. Два агенти паралельно (Claude для backend, Codex для frontend)
4. `am` для координації
5. `ubs` для виявлення security issues

**Результат:**
- 2 тижні замість оцінених 4
- 0 security issues в production
- Повна backward compatibility

### Case Study 2: Multi-Repository Feature

**Ситуація:** Нова feature потребувала змін у 3 репозиторіях (API, Web, Mobile).

**Workflow використаний:**
1. `ru sync` для синхронізації всіх репо
2. `ntm` з 3 панелями для кожного репо
3. Agent Mail file reservations для уникнення конфліктів
4. `br` з cross-repo залежностями
5. Coordinated deploy через `slb`

**Результат:**
- Синхронний реліз всіх 3 компонентів
- Atomic rollback можливість
- Clear audit trail

### Case Study 3: Emergency Bug Fix

**Ситуація:** Production bug о 2:00 ночі — auth endpoint returning 500.

**Workflow використаний:**
1. `cass "500 error auth"` — знайдено similar issue з 3 місяці тому
2. CASS Memory повернула контекст попереднього фіксу
3. `claude` з контекстом для швидкого аналізу
4. `ubs scan` для перевірки фіксу
5. `slb exec "vercel deploy --prod"` для швидкого деплою

**Результат:**
- Fix за 25 хвилин замість estimated 2 години
- Existing pattern reused
- No regression

---

## Наступні кроки

- **Вимоги до кандидатів:** [Блок 5](./05-candidate-requirements.md)
- **Гайд для HR:** [Блок 6](./06-hr-guide.md)

---

*Див. також: [Інтеграції](./03-tool-integrations.md) | [README](./README.md)*
