# Блок 3: Взаємозв'язки інструментів

## Зміст

- [Архітектура екосистеми](#архітектура-екосистеми)
- [Карта інтеграцій](#карта-інтеграцій)
- [Core Integration Layers](#core-integration-layers)
- [Залежності та сумісність](#залежності-та-сумісність)
- [Точки взаємодії](#точки-взаємодії)
- [Синергетичні ефекти](#синергетичні-ефекти)
- [Діаграма потоків даних](#діаграма-потоків-даних)

---

## Архітектура екосистеми

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ Claude  │  │ Codex   │  │ Gemini  │  │ NTM     │  │ Terminal│   │
│  │ Code    │  │ CLI     │  │ CLI     │  │ (tmux)  │  │ (shell) │   │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │
│       │            │            │            │            │         │
└───────┼────────────┼────────────┼────────────┼────────────┼─────────┘
        │            │            │            │            │
┌───────┼────────────┼────────────┼────────────┼────────────┼─────────┐
│       ▼            ▼            ▼            ▼            ▼         │
│                    COORDINATION LAYER                               │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     MCP Agent Mail                            │  │
│  │  (messaging, threading, acknowledgements)                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │   CASS     │  │   CASS     │  │   CAAM     │  │   Meta     │    │
│  │  (search)  │  │  Memory    │  │  (auth)    │  │   Skill    │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
        │                    │                    │
┌───────┼────────────────────┼────────────────────┼───────────────────┐
│       ▼                    ▼                    ▼                   │
│                     SAFETY LAYER                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │    DCG     │  │    SLB     │  │    UBS     │  │  ast-grep  │    │
│  │ (commands) │  │ (approval) │  │  (bugs)    │  │  (AST)     │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
        │                    │                    │
┌───────┼────────────────────┼────────────────────┼───────────────────┐
│       ▼                    ▼                    ▼                   │
│                    PRODUCTIVITY LAYER                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │ beads_rust │  │   Repo     │  │    RCH     │  │   Process  │    │
│  │  (tasks)   │  │  Updater   │  │  (build)   │  │   Triage   │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
        │                    │                    │
┌───────┼────────────────────┼────────────────────┼───────────────────┐
│       ▼                    ▼                    ▼                   │
│                   INFRASTRUCTURE LAYER                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │   Docker   │  │ PostgreSQL │  │  Tailscale │  │   Cloud    │    │
│  │            │  │            │  │   (VPN)    │  │  (Vercel)  │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Карта інтеграцій

### AI Agents ↔ Coordination

| Інтеграція | Тип | Опис |
|------------|-----|------|
| Claude Code → NTM | Запуск | Агент запускається в класифікованій tmux-панелі |
| Claude Code → Agent Mail | MCP | Комунікація з іншими агентами через MCP server |
| Claude Code → CASS | Logging | Автоматичне логування сесій для пошуку |
| Claude Code → CASS Memory | Context | Завантаження релевантних memories при старті |
| Claude Code → Meta Skill | MCP | Доступ до бібліотеки skills |
| Codex CLI → CAAM | Auth | Перемикання API keys |
| Gemini CLI → NTM | Запуск | Паралельний запуск з Claude Code |

### Safety ↔ All Layers

| Інтеграція | Тип | Опис |
|------------|-----|------|
| DCG → Shell | Intercept | Перехоплення команд перед виконанням |
| DCG → Claude Code | Protection | Захист від небезпечних bash команд |
| SLB → DCG | Escalation | Команди DCG-block → SLB approval |
| UBS → Claude Code | Hook | Auto-scan після змін коду |
| UBS → Git Hooks | Pre-commit | Сканування перед комітом |
| ast-grep → UBS | Backend | AST analysis engine |

### Task Management ↔ Coordination

| Інтеграція | Тип | Опис |
|------------|-----|------|
| beads_rust → Agent Mail | Linking | Прив'язка задач до повідомлень |
| beads_rust → GitHub | Sync | Двостороння синхронізація issues |
| Beads Viewer → beads_rust | Data | Візуалізація даних з beads_rust |
| Process Triage → NTM | Management | Per-session process cleanup |

### Build ↔ Infrastructure

| Інтеграція | Тип | Опис |
|------------|-----|------|
| RCH → Tailscale | Network | Secure connection to build workers |
| RCH → Rust (cargo) | Offload | Transparent build offloading |
| Repo Updater → GitHub CLI | API | PR creation, issue management |
| Repo Updater → Agent Mail | Notification | Sync completion notifications |

---

## Core Integration Layers

### 1. MCP (Model Context Protocol)

MCP — центральний протокол інтеграції для AI агентів.

```
┌─────────────────────────────────────────────────────────────┐
│                     MCP Ecosystem                           │
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │ Agent Mail  │     │ Meta Skill  │     │   Custom    │   │
│  │   Server    │     │   Server    │     │   Servers   │   │
│  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘   │
│         │                   │                   │          │
│         └───────────────────┼───────────────────┘          │
│                             │                              │
│                     ┌───────┴───────┐                      │
│                     │  Claude Code  │                      │
│                     │  MCP Client   │                      │
│                     └───────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

**Конфігурація MCP:**

```json
// ~/.config/claude/mcp.json
{
  "servers": {
    "agent-mail": {
      "command": "am",
      "args": ["mcp-serve"],
      "capabilities": ["messaging", "threading"]
    },
    "meta-skill": {
      "command": "ms",
      "args": ["serve"],
      "capabilities": ["skills", "search"]
    }
  }
}
```

### 2. Shell Integration Layer

Всі CLI інструменти інтегруються через shell.

```
┌──────────────────────────────────────────────────────────────┐
│                    Shell Integration                         │
│                                                              │
│  User Input                                                  │
│      │                                                       │
│      ▼                                                       │
│  ┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐    │
│  │  DCG   │ ──▶ │  SLB   │ ──▶ │ Shell  │ ──▶ │ Output │    │
│  │(check) │     │(approve│     │(exec)  │     │        │    │
│  └────────┘     └────────┘     └────────┘     └────────┘    │
│      │                             │                         │
│      ▼                             ▼                         │
│  [Block/Warn]               [Atuin History]                  │
│                             [CASS Logging]                   │
└──────────────────────────────────────────────────────────────┘
```

### 3. Storage Integration Layer

Спільне сховище для координації.

```
┌──────────────────────────────────────────────────────────────┐
│                    Storage Layer                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                     SQLite DBs                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │Agent Mail│  │   CASS   │  │ beads_rs │           │   │
│  │  │   .db    │  │   .db    │  │   .db    │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Git Archives                       │   │
│  │  - Agent Mail messages                                │   │
│  │  - CASS session logs                                  │   │
│  │  - beads_rust issues                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Залежності та сумісність

### Hard Dependencies

| Інструмент | Залежить від | Тип залежності |
|------------|--------------|----------------|
| UBS | ast-grep | Runtime |
| Beads Viewer | beads_rust | Data source |
| RCH | Tailscale (optional) | Network |
| RCH | Rust toolchain | Build target |
| NTM | tmux | Core |
| CASS Memory | CASS | Data source |
| Meta Skill | Claude Code | Consumer |
| Agent Mail | Git | Storage |

### Soft Dependencies (Optional)

| Інструмент | Може використовувати | Покращення |
|------------|---------------------|------------|
| Claude Code | CASS Memory | Long-term memory |
| Claude Code | Agent Mail | Multi-agent coordination |
| beads_rust | GitHub | Remote sync |
| Repo Updater | Claude Code | AI commit messages |
| DCG | SLB | Approval escalation |

### Version Compatibility Matrix

| Tool A | Tool B | Min Version A | Min Version B | Notes |
|--------|--------|---------------|---------------|-------|
| NTM | tmux | 1.0 | 3.0 | Requires tmux 3.0+ features |
| UBS | ast-grep | 1.0 | 0.6 | AST patterns compatibility |
| Agent Mail | Git | 1.0 | 2.20 | Git LFS support |
| RCH | Rust | 1.0 | 1.70 | Nightly features |

---

## Точки взаємодії

### 1. Session Start Workflow

Що відбувається при запуску сесії:

```
User: ntm new my-project
           │
           ▼
    ┌──────────────┐
    │     NTM      │ ──▶ Створює tmux session
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Agent Mail   │ ──▶ ensure_project, register_agent
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ CASS Memory  │ ──▶ Load relevant memories
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Claude Code  │ ──▶ Ready with context
    └──────────────┘
```

### Збереження ідентичності агентів

При перезапуску агента (`ntm respawn`) ідентичність Agent Mail потрібно відновити.
Система зберігає дані в SQLite + Git, але агент при старті повинен зареєструватися.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    IDENTITY PERSISTENCE                              │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                     SQLite Database                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │ │
│  │  │   agents     │  │   messages   │  │   projects   │         │ │
│  │  │  ─────────   │  │  ─────────   │  │  ─────────   │         │ │
│  │  │  id          │  │  sender_id   │  │  human_key   │         │ │
│  │  │  name        │  │  thread_id   │  │  slug        │         │ │
│  │  │  program     │  │  body_md     │  │              │         │ │
│  │  │  model       │  │              │  │              │         │ │
│  │  │  last_active │  │              │  │              │         │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                               │                                      │
│                               ▼                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                      Git Archive                                │ │
│  │  agents/<Name>/profile.json                                     │ │
│  │  messages/YYYY/MM/<id>.md                                       │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Ключовий момент:** `register_agent` — ідемпотентний. Повторний виклик з тим самим `name`
оновлює `last_active_ts` і повертає існуючий профіль (не створює дублікати).

Для практичних стратегій реєстрації див.
[Налаштування ідентичності агентів](./04-workflows.md#nalashtuvannya-identychnosti-ahentiv).
API деталі — [Реєстрація агентів](./02a-tools-ai-agents.md#reyestratsiya-ahentiv).

### 2. Code Change Workflow

Потік при зміні коду:

```
Claude Code: Edit file
           │
           ▼
    ┌──────────────┐
    │     UBS      │ ──▶ Scan for bugs
    └──────┬───────┘
           │
           ├──▶ Bugs found? ──▶ Report to Claude Code
           │
           ▼
    ┌──────────────┐
    │  Git Hooks   │ ──▶ Pre-commit checks
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │     DCG      │ ──▶ Verify safe commands
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   Commit     │
    └──────────────┘
```

### 3. Multi-Agent Coordination

```
Agent A (Claude Code)              Agent B (Codex CLI)
        │                                  │
        │  ┌───────────────────────────┐   │
        └─▶│      Agent Mail          │◀──┘
           │  (send_message)          │
           └───────────┬───────────────┘
                       │
                       ▼
           ┌───────────────────────────┐
           │     Message Queue         │
           │  - Threading              │
           │  - Priority               │
           │  - Acknowledgements       │
           └───────────┬───────────────┘
                       │
           ┌───────────┴───────────┐
           ▼                       ▼
    ┌──────────────┐       ┌──────────────┐
    │  Agent A     │       │  Agent B     │
    │  Inbox       │       │  Inbox       │
    └──────────────┘       └──────────────┘
```

### 4. Build Offloading

```
Local Machine                    Remote Worker
      │                               │
      ▼                               │
┌──────────────┐                      │
│     RCH      │                      │
│  (intercept) │                      │
└──────┬───────┘                      │
       │                              │
       │  ┌────────────────────┐      │
       └─▶│    Tailscale      │◀─────┘
          │  (secure tunnel)   │
          └────────┬───────────┘
                   │
                   ▼
          ┌────────────────────┐
          │   Remote Build     │
          │   (cargo build)    │
          └────────┬───────────┘
                   │
                   ▼
          ┌────────────────────┐
          │  Artifacts sync    │
          │  (rsync)           │
          └────────────────────┘
```

---

## Синергетичні ефекти

### 1. Multi-Agent + Memory = Persistent Context

**Компоненти:** Claude Code + CASS + CASS Memory + Agent Mail

**Ефект:**
- Агенти зберігають історію рішень
- Нові сесії отримують контекст попередніх
- Координація без повторення інформації

**Приклад:**
```bash
# Agent A завершує роботу
claude "Implement auth module"
# → CASS logs session
# → CASS Memory extracts patterns
# → Agent Mail notifies Agent B

# Agent B продовжує
codex "Add tests for auth"
# → CASS Memory recalls "Agent A implemented JWT-based auth"
# → Context already loaded
```

### 2. Safety Stack = Defense in Depth

**Компоненти:** DCG + SLB + UBS + ast-grep

**Ефект:**
- Багаторівневий захист
- Різні типи перевірок
- Escalation path

**Flow:**
```
Command Input
     │
     ▼
┌─────────┐   Block/Warn
│   DCG   │ ─────────────▶ [Stopped]
└────┬────┘
     │ Passed
     ▼
┌─────────┐   Needs Approval
│   SLB   │ ─────────────▶ [Wait for approval]
└────┬────┘
     │ Approved/Auto
     ▼
┌─────────┐   Bugs Found
│   UBS   │ ─────────────▶ [Report + Continue/Stop]
└────┬────┘
     │ Clean
     ▼
[Execute]
```

### 3. Task Tracking + Visualization = Clarity

**Компоненти:** beads_rust + Beads Viewer + GitHub + Agent Mail

**Ефект:**
- Local-first speed з cloud backup
- Visual dependencies
- Cross-agent task assignments

**Workflow:**
```bash
# Create task locally (instant)
br create "Implement feature X"

# View dependencies
bv

# Sync to GitHub (async)
br sync

# Assign via Agent Mail (MCP)
# send_message(to=["BlueLake"], subject="Task: Feature X", body_md="See bead #123")
```

### 4. Remote Build + Fast Search = Developer Velocity

**Компоненти:** RCH + Tailscale + ripgrep + fzf + CASS

**Ефект:**
- Локальний пошук миттєвий
- Компіляція на потужному сервері
- Історія команд доступна

**Metrics Improvement:**
| Операція | Без синергії | З синергією |
|----------|--------------|-------------|
| Rust build (release) | 15 min | 3 min (RCH) |
| Code search | 5 sec | 0.1 sec (rg+fzf) |
| Session recall | 30 sec | 1 sec (CASS) |

### 5. AI Agents + Skills = Specialized Capabilities

**Компоненти:** Claude Code + Meta Skill + JeffreysPrompts

**Ефект:**
- Base agent + domain skills
- Reusable expertise
- Community knowledge

**Example:**
```bash
# Install specialized skill
jfp install code-review --as-skill

# Use in Claude Code
claude /code-review
# → Activates detailed review prompts
# → Domain-specific checks
# → Consistent output format
```

---

## Діаграма потоків даних

### Data Flow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           DATA SOURCES                              │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Code    │  │  User    │  │ External │  │  Config  │           │
│  │  Files   │  │  Input   │  │  APIs    │  │  Files   │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │             │             │             │                  │
└───────┼─────────────┼─────────────┼─────────────┼──────────────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        PROCESSING LAYER                             │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                      AI Agents                              │    │
│  │  Claude Code │ Codex CLI │ Gemini CLI                       │    │
│  └──────────────────────────┬─────────────────────────────────┘    │
│                             │                                       │
│  ┌──────────────────────────┼──────────────────────────────────┐   │
│  │                    Tool Pipeline                             │   │
│  │  DCG → SLB → UBS → ast-grep → Shell                         │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                       │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         STORAGE LAYER                               │
│                                                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
│  │   SQLite   │  │    Git     │  │   Vector   │  │   Cache    │   │
│  │   (state)  │  │ (history)  │  │   (embed)  │  │  (temp)    │   │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         OUTPUT LAYER                                │
│                                                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
│  │  Terminal  │  │   Files    │  │  Messages  │  │   Logs     │   │
│  │  (user)    │  │  (code)    │  │  (agents)  │  │  (audit)   │   │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Наступні кроки

- **Робочі процеси:** [Блок 4: Workflows](./04-workflows.md)
- **Вимоги до кандидатів:** [Блок 5](./05-candidate-requirements.md)

---

*Див. також: [AI Agents](./02a-tools-ai-agents.md) | [ACFS Stack](./02b-tools-acfs-stack.md) | [Infrastructure](./02c-tools-infrastructure.md) | [README](./README.md)*
