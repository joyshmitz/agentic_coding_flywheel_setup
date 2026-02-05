# Блок 2: Детальний опис інструментів

## Зміст

- [AI Coding Agents](#ai-coding-agents)
  - [Claude Code](#claude-code)
  - [Codex CLI](#codex-cli)
  - [Gemini CLI](#gemini-cli)
- [Agent Coordination](#agent-coordination)
  - [Named Tmux Manager (NTM)](#named-tmux-manager-ntm)
  - [MCP Agent Mail](#mcp-agent-mail)
  - [CASS](#cass)
  - [CASS Memory](#cass-memory)
  - [CAAM](#caam)
- [Safety & Quality](#safety--quality)
  - [Ultimate Bug Scanner (UBS)](#ultimate-bug-scanner-ubs)
  - [Destructive Command Guard (DCG)](#destructive-command-guard-dcg)
  - [SLB](#slb)
  - [ast-grep](#ast-grep)
- [Task & Issue Management](#task--issue-management)
  - [beads_rust](#beads_rust)
  - [Beads Viewer](#beads-viewer)
  - [Process Triage](#process-triage)
- [Code Analysis & Skills](#code-analysis--skills)
  - [Meta Skill](#meta-skill)
  - [Automated Plan Reviser](#automated-plan-reviser)
  - [JeffreysPrompts CLI](#jeffreysprompts-cli)
- [Repository & Build Management](#repository--build-management)
  - [Repo Updater](#repo-updater)
  - [Remote Compilation Helper](#remote-compilation-helper)
  - [WezTerm Automata](#wezterm-automata)
- [Language Runtimes](#language-runtimes)
  - [Bun](#bun)
  - [uv](#uv)
  - [Rust](#rust)
  - [Go](#go)
  - [Node.js](#nodejs)
- [Modern CLI Tools](#modern-cli-tools)
- [Cloud & Deployment](#cloud--deployment)
- [Specialized Utilities](#specialized-utilities)

---

## AI Coding Agents

### Claude Code

**Тип:** AI Coding Agent
**CLI:** `claude`
**Розробник:** Anthropic
**Документація:** [docs.anthropic.com](https://docs.anthropic.com)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Модель | Claude 3.5 Sonnet / Claude 3 Opus |
| Автентифікація | OAuth (Anthropic Console) |
| MCP Support | Так |
| Контекст | До 200K токенів |
| Мови | Всі популярні мови програмування |

#### Функціонал та можливості

1. **Багатофайлове редагування**
   - Одночасна робота з кількома файлами
   - Автоматичне створення та видалення файлів
   - Git-aware операції

2. **MCP Servers**
   - Підключення зовнішніх інструментів
   - Інтеграція з базами даних
   - Кастомні capabilities

3. **Skills System**
   - Багаторазові промпти як skills
   - Інсталяція з JeffreysPrompts
   - Кастомні slash-команди

4. **Agentic Mode**
   - Автономне виконання завдань
   - Ітеративне покращення
   - Self-healing при помилках

#### Обмеження

- Потребує інтернет-з'єднання
- Rate limits на API
- Вартість за токени
- Не зберігає стан між сесіями (без CASS Memory)

#### Приклади застосування

```bash
# Базовий запуск
claude

# З конкретним завданням
claude "Refactor the authentication module to use JWT"

# З конфігурацією MCP
claude --mcp-config ~/.config/claude/mcp.json

# Resume попередньої сесії
claude --resume
```

#### Типові сценарії

| Сценарій | Команда |
|----------|---------|
| Code review | `claude "Review this PR for security issues"` |
| Bug fix | `claude "Fix the null pointer exception in parser.ts"` |
| New feature | `claude "Add user authentication with OAuth"` |
| Refactoring | `claude "Convert class components to hooks"` |

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Authentication failed" | `claude logout && claude login` |
| Rate limit exceeded | Почекати 60 секунд або використати інший агент |
| MCP server not found | Перевірити шлях в `~/.config/claude/mcp.json` |
| Context too long | Розбити завдання на менші частини |

#### Інтеграції

- **NTM:** Запуск в іменованих tmux-панелях
- **CASS:** Пошук по історії сесій
- **CASS Memory:** Довготривала пам'ять
- **DCG:** Захист від небезпечних команд
- **UBS:** Автоматичне сканування коду

---

### Codex CLI

**Тип:** AI Coding Agent
**CLI:** `codex`
**Розробник:** OpenAI
**Документація:** [platform.openai.com](https://platform.openai.com)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Модель | GPT-4 / GPT-4-turbo |
| Автентифікація | API Key |
| Контекст | До 128K токенів |
| Мови | Всі популярні мови |

#### Функціонал та можливості

1. **Code Generation**
   - Генерація коду з опису
   - Автодоповнення
   - Переклад між мовами

2. **Conversation Mode**
   - Інтерактивний діалог
   - Контекст розмови
   - Follow-up питання

3. **Batch Processing**
   - Обробка кількох файлів
   - Скриптова автоматизація

#### Обмеження

- Потребує OpenAI API key
- Платний API
- Менш потужний agentic mode ніж Claude Code

#### Приклади застосування

```bash
# Базовий запуск
codex

# З питанням
codex "Explain this regex pattern"

# З файлом
codex --file src/parser.ts "Add error handling"
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Invalid API key" | Перевірити `OPENAI_API_KEY` |
| Rate limit | Почекати або upgrade план |
| Timeout | Збільшити timeout в конфігурації |

#### Інтеграції

- **NTM:** Запуск в окремій панелі
- **CASS:** Пошук по історії
- **CAAM:** Перемикання API keys

---

### Gemini CLI

**Тип:** AI Coding Agent
**CLI:** `gemini`
**Розробник:** Google
**Документація:** [cloud.google.com/vertex-ai](https://cloud.google.com/vertex-ai)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Модель | Gemini Pro / Gemini Ultra |
| Автентифікація | Google Cloud OAuth |
| Контекст | До 1M токенів |
| Мови | Всі популярні мови |

#### Функціонал та можливості

1. **Multimodal Input**
   - Текст + зображення
   - Аналіз скріншотів UI
   - Діаграми та схеми

2. **Long Context**
   - Найбільший контекст серед агентів
   - Робота з великими кодовими базами

3. **Google Cloud Integration**
   - BigQuery
   - Cloud Functions
   - Firebase

#### Обмеження

- Потребує Google Cloud account
- Складніша автентифікація
- Менша спільнота ніж Claude/OpenAI

#### Приклади застосування

```bash
# Базовий запуск
gemini

# З зображенням
gemini --image screenshot.png "Fix the UI bug shown"

# З великим контекстом
gemini --context-size 500000 "Analyze this codebase"
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Not authenticated" | `gcloud auth login` |
| Quota exceeded | Перевірити Cloud Console quotas |
| Model not available | Перевірити region settings |

#### Інтеграції

- **NTM:** Третя панель для порівняння
- **CASS:** Пошук по історії
- **CAAM:** Перемикання Google accounts

---

## Agent Coordination

### Named Tmux Manager (NTM)

**Тип:** Session Manager
**CLI:** `ntm`
**Розробник:** Dicklesworthstone
**Репозиторій:** github.com/Dicklesworthstone/named_tmux_manager

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Залежності | tmux 3.0+ |
| Конфігурація | `~/.config/ntm/config.yaml` |
| Persistent | Так (tmux sessions) |

#### Функціонал та можливості

1. **Session Management**
   - Іменовані сесії
   - Шаблони сесій
   - Auto-restore при перезавантаженні

2. **Pane Classification**
   - Класифікація панелей за типом
   - Кольорове кодування
   - Quick-switch між агентами

3. **Multi-Agent Support**
   - Одночасний запуск кількох агентів
   - Ізольовані середовища
   - Shared clipboard

#### Приклади застосування

```bash
# Створити нову сесію
ntm new project-name

# Список сесій
ntm list

# Приєднатися до сесії
ntm attach project-name

# Створити панель для Claude
ntm pane claude --class agent

# Broadcast команду всім панелям
ntm broadcast "git status"
```

#### Конфігурація

```yaml
# ~/.config/ntm/config.yaml
sessions:
  default:
    windows:
      - name: agents
        panes:
          - command: claude
            class: agent
          - command: codex
            class: agent
      - name: terminal
        panes:
          - command: bash
            class: shell
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Session not found" | `ntm list` для перевірки існуючих |
| Panes not responding | `ntm kill-pane <id>` і перестворити |
| Config not loading | Перевірити YAML syntax |

#### Інтеграції

- **Claude Code:** Запуск в класифікованій панелі
- **Agent Mail:** Координація між панелями
- **CASS:** Логування всіх панелей

---

### MCP Agent Mail

**Тип:** Inter-Agent Communication
**CLI:** `am`
**Розробник:** Dicklesworthstone
**Протокол:** MCP (Model Context Protocol)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Storage | SQLite + Git |
| Threading | Gmail-like |
| Format | Markdown |

#### Функціонал та можливості

1. **Message Threading**
   - Ланцюжки повідомлень
   - Reply/Forward
   - CC/BCC підтримка

2. **Priority System**
   - Urgent/High/Normal/Low
   - Acknowledgement required
   - Read receipts

3. **Attachments**
   - Файли та зображення
   - Auto-convert to WebP
   - Inline embedding

4. **Search**
   - Full-text search (FTS5)
   - Filter by sender/recipient
   - Date ranges

#### Приклади застосування

```bash
# Відправити повідомлення
am send --to BlueLake --subject "Review needed" --body "Please review PR #42"

# Перевірити inbox
am inbox

# Відповісти на повідомлення
am reply 123 --body "Approved, merging now"

# Пошук
am search "authentication bug"
```

#### API (для MCP)

```json
{
  "method": "send_message",
  "params": {
    "project_key": "/path/to/project",
    "sender_name": "GreenCastle",
    "to": ["BlueLake"],
    "subject": "Task completed",
    "body_md": "Feature implemented and tested."
  }
}
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Agent not found" | `am agents` для списку |
| Message not delivered | Перевірити contact policy |
| Search not working | `am reindex` |

#### Інтеграції

- **NTM:** Комунікація між панелями
- **Claude Code:** MCP server integration
- **beads_rust:** Linking tasks to messages

---

### CASS

**Тип:** Session History Search
**CLI:** `cass`
**Розробник:** Dicklesworthstone
**Повна назва:** Claude Agent Session Search

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Індексування | Incremental |
| Search Engine | FTS5 + semantic |
| Storage | SQLite |

#### Функціонал та можливості

1. **Fast Search**
   - Sub-second results
   - Regex support
   - Fuzzy matching

2. **Multi-Agent**
   - Claude Code sessions
   - Codex sessions
   - Gemini sessions

3. **Filters**
   - Date range
   - Project
   - Agent type

#### Приклади застосування

```bash
# Базовий пошук
cass "authentication bug"

# З фільтрами
cass --agent claude --since 2024-01-01 "JWT implementation"

# Regex пошук
cass --regex "function\s+handle.*Error"

# Export результатів
cass "bug fix" --export results.md
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "No results" | `cass --reindex` |
| Slow search | Очистити старі сесії |
| Missing sessions | Перевірити log directories |

#### Інтеграції

- **Claude Code:** Автоматичне логування
- **CASS Memory:** Episodic memory source
- **NTM:** Session correlation

---

### CASS Memory

**Тип:** Agent Memory System
**CLI:** `cm`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Layers | Episodic / Working / Procedural |
| Backend | Vector DB + SQLite |
| Retrieval | Semantic search |

#### Функціонал та можливості

1. **Episodic Memory**
   - Записи подій
   - Часові мітки
   - Context reconstruction

2. **Working Memory**
   - Поточний контекст
   - Short-term facts
   - Auto-eviction

3. **Procedural Memory**
   - Learned patterns
   - Best practices
   - Error recovery

#### Приклади застосування

```bash
# Зберегти факт
cm remember "User prefers TypeScript over JavaScript"

# Отримати релевантні memories
cm recall "code style preferences"

# Очистити working memory
cm clear-working

# Export memories
cm export project-memories.json
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| Memory not persisting | Перевірити permissions |
| Irrelevant recalls | Tune similarity threshold |
| Memory overflow | `cm compact` |

#### Інтеграції

- **Claude Code:** Auto-recall при запуску
- **CASS:** Source for episodic
- **Agent Mail:** Context enrichment

---

### CAAM

**Тип:** Account Switcher
**CLI:** `caam`
**Розробник:** Dicklesworthstone
**Повна назва:** Claude Agent Account Manager

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Switch Time | Sub-100ms |
| Accounts | Unlimited |
| Encryption | Yes (keyring) |

#### Функціонал та можливості

1. **Fast Switching**
   - Instant account change
   - No re-authentication
   - Session preservation

2. **Multi-Provider**
   - Anthropic accounts
   - OpenAI API keys
   - Google Cloud accounts

3. **Security**
   - Encrypted storage
   - Keyring integration
   - Auto-lock

#### Приклади застосування

```bash
# Список акаунтів
caam list

# Перемикання
caam switch work-account

# Додати новий
caam add personal --provider anthropic

# Поточний акаунт
caam current
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| "Account not found" | `caam list` |
| Credentials expired | `caam refresh <name>` |
| Keyring error | `caam repair-keyring` |

#### Інтеграції

- **Claude Code:** Transparent auth
- **Codex CLI:** API key management
- **Gemini CLI:** Google account switching

---

## Safety & Quality

### Ultimate Bug Scanner (UBS)

**Тип:** Static Analysis
**CLI:** `ubs`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Patterns | 1000+ |
| Languages | 20+ |
| Backend | ast-grep |

#### Функціонал та можливості

1. **Multi-Language Support**
   - JavaScript/TypeScript
   - Python
   - Rust, Go, Java
   - SQL, Shell

2. **Pattern Categories**
   - Security vulnerabilities
   - Logic errors
   - Performance issues
   - Code smells

3. **Custom Rules**
   - YAML rule definitions
   - Project-specific patterns
   - Severity levels

#### Приклади застосування

```bash
# Сканування проекту
ubs scan .

# Конкретна мова
ubs scan --lang typescript src/

# Тільки security issues
ubs scan --category security

# Custom rules
ubs scan --rules custom-rules.yaml

# CI mode (exit code)
ubs scan --ci --fail-on high
```

#### Категорії патернів

| Категорія | Приклади |
|-----------|----------|
| Security | SQL injection, XSS, path traversal |
| Logic | Null pointer, race conditions |
| Performance | N+1 queries, memory leaks |
| Style | Unused variables, dead code |

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| False positives | Додати до `.ubsignore` |
| Missing language | Встановити parser |
| Slow scan | Exclude `node_modules` |

#### Інтеграції

- **Claude Code:** Auto-scan after changes
- **Git Hooks:** Pre-commit scanning
- **CI/CD:** Quality gate

---

### Destructive Command Guard (DCG)

**Тип:** Command Protection
**CLI:** `dcg`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Mode | Intercept/Warn/Block |
| Shell | bash, zsh, fish |
| Bypass | Explicit flag |

#### Функціонал та можливості

1. **Command Interception**
   - Shell wrapper
   - Real-time analysis
   - Pattern matching

2. **Blocked Commands**
   - `rm -rf /`
   - `git reset --hard`
   - `DROP TABLE`
   - `chmod 777`
   - `> /dev/sda`

3. **Modes**
   - **Block:** Повна заборона
   - **Warn:** Попередження + підтвердження
   - **Log:** Тільки логування

#### Приклади застосування

```bash
# Статус
dcg status

# Включити
dcg enable

# Режим warn
dcg mode warn

# Тимчасовий bypass
dcg bypass "rm -rf build/"

# Whitelist команду
dcg whitelist "rm -rf node_modules"
```

#### Protected Commands

| Команда | Ризик |
|---------|-------|
| `rm -rf /` | System destruction |
| `rm -rf ~` | Home directory |
| `git reset --hard` | Lost commits |
| `git push --force` | Rewritten history |
| `chmod -R 777` | Security hole |
| `dd if=/dev/zero of=/dev/sda` | Disk wipe |

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| Legitimate command blocked | `dcg whitelist <cmd>` |
| DCG not active | `dcg enable` |
| Too many prompts | `dcg mode log` |

#### Інтеграції

- **Claude Code:** Shell command protection
- **NTM:** Per-session configuration
- **SLB:** Two-person approval

---

### SLB

**Тип:** Approval Gate
**CLI:** `slb`
**Повна назва:** Second Look Before

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Mode | Local / Remote |
| Approval | Manual / Timeout |
| Log | Full audit trail |

#### Функціонал та можливості

1. **Two-Person Rule**
   - Критичні команди потребують підтвердження
   - Другий reviewer
   - Audit log

2. **Command Categories**
   - Database changes
   - Deployment
   - Configuration changes

3. **Approval Methods**
   - Terminal prompt
   - Slack notification
   - Email

#### Приклади застосування

```bash
# Виконати з підтвердженням
slb exec "kubectl delete pod production-api"

# Статус pending approvals
slb pending

# Схвалити
slb approve request-123

# Відхилити
slb reject request-123 --reason "Not ready for production"
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| Stuck approval | `slb cancel <id>` |
| No approvers available | `slb config --timeout 5m` |
| Missed notification | Перевірити notification settings |

#### Інтеграції

- **DCG:** High-risk commands
- **NTM:** Cross-pane approval
- **Agent Mail:** Approval notifications

---

### ast-grep

**Тип:** Syntax-Aware Search
**CLI:** `sg`
**Документація:** [ast-grep.github.io](https://ast-grep.github.io)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Parsers | Tree-sitter |
| Languages | 20+ |
| Output | JSON, text |

#### Функціонал та можливості

1. **AST-Based Search**
   - Структурний пошук
   - Ігнорування whitespace
   - Pattern variables

2. **Rewriting**
   - Code transformation
   - Automated refactoring

3. **Rule System**
   - YAML rules
   - Constraints
   - Fix suggestions

#### Приклади застосування

```bash
# Пошук патерну
sg -p 'console.log($MSG)' --lang typescript

# Заміна
sg -p 'console.log($MSG)' -r 'logger.debug($MSG)' --lang typescript

# З правилом
sg scan --rule no-console.yaml

# Interactive mode
sg -p 'function $NAME() {}' --interactive
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| Pattern not matching | Перевірити AST структуру |
| Language not supported | Встановити parser |
| Too many results | Додати constraints |

#### Інтеграції

- **UBS:** Backend for scanning
- **Claude Code:** Refactoring tool
- **CI/CD:** Code quality checks

---

## Task & Issue Management

### beads_rust

**Тип:** Local Issue Tracker
**CLI:** `br`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Storage | Local files + SQLite |
| Sync | GitHub Issues (optional) |
| Graph | Dependency tracking |

#### Функціонал та можливості

1. **Local-First**
   - Працює офлайн
   - Git-based storage
   - Fast operations

2. **Dependency Graphs**
   - Task dependencies
   - Blocking relationships
   - Critical path

3. **GitHub Sync**
   - Two-way sync
   - Label mapping
   - Milestone support

#### Приклади застосування

```bash
# Створити issue
br new "Implement authentication" --label feature

# Список issues
br list

# З залежностями
br new "Write tests" --blocks auth-123

# Sync з GitHub
br sync --flush-only

# Граф залежностей
br graph --format dot | dot -Tpng > deps.png
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| Sync conflict | `br resolve <id>` |
| Missing dependencies | `br check-deps` |
| Corrupted state | `br repair` |

#### Інтеграції

- **Beads Viewer:** Visualization
- **Agent Mail:** Task linking
- **GitHub Issues:** Sync

---

### Beads Viewer

**Тип:** Task Visualization
**CLI:** `bv`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Ranking | PageRank |
| Visualization | Graph + Table |
| Export | SVG, PNG, PDF |

#### Функціонал та можливості

1. **PageRank Prioritization**
   - Автоматичне ранжування
   - Врахування залежностей
   - Urgency factors

2. **Visualization**
   - Interactive graphs
   - Burndown charts
   - Dependency trees

#### Приклади застосування

```bash
# Відкрити viewer
bv

# Top priorities
bv priorities --limit 10

# Export graph
bv export --format svg deps.svg

# Filter by label
bv --filter "label:bug"
```

#### Інтеграції

- **beads_rust:** Data source
- **NTM:** Dedicated pane
- **Agent Mail:** Priority updates

---

### Process Triage

**Тип:** Process Manager
**CLI:** `pt`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Algorithm | Bayesian scoring |
| Mode | Interactive / Auto |
| Protection | System processes |

#### Функціонал та можливості

1. **Intelligent Termination**
   - Bayesian scoring
   - Resource usage analysis
   - Safety checks

2. **Process Categories**
   - Protected (system)
   - Important (user apps)
   - Background (optional)
   - Zombie (auto-kill)

#### Приклади застосування

```bash
# Аналіз процесів
pt analyze

# Інтерактивний режим
pt triage

# Auto-clean zombies
pt clean --zombies

# Kill by score threshold
pt clean --threshold 0.3
```

#### Troubleshooting

| Проблема | Рішення |
|----------|---------|
| Wrong process killed | `pt undo` (якщо можливо) |
| Protected process | Додати до whitelist |
| High CPU from pt | `pt config --interval 5s` |

#### Інтеграції

- **NTM:** Per-session management
- **System Resource Protection:** Coordination

---

## Code Analysis & Skills

### Meta Skill

**Тип:** Skill Management
**CLI:** `ms`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Protocol | MCP Server |
| Search | Hybrid (keyword + semantic) |
| Storage | Local + Cloud |

#### Функціонал та можливості

1. **Skill Library**
   - Browse skills
   - Install/Uninstall
   - Version management

2. **Semantic Search**
   - Natural language queries
   - Similarity matching
   - Context-aware

3. **MCP Integration**
   - Claude Code skills
   - Custom capabilities
   - Dynamic loading

#### Приклади застосування

```bash
# Пошук skills
ms search "code review"

# Встановити skill
ms install review-pr

# Список встановлених
ms list --installed

# Видалити
ms uninstall outdated-skill
```

#### Інтеграції

- **Claude Code:** Skill provider
- **JeffreysPrompts:** Skill source
- **CASS Memory:** Usage patterns

---

### Automated Plan Reviser

**Тип:** Specification Improvement
**CLI:** `apr`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Mode | Extended reasoning |
| Iterations | Configurable |
| Output | Markdown spec |

#### Функціонал та можливості

1. **Iterative Refinement**
   - Аналіз специфікації
   - Виявлення gaps
   - Покращення формулювань

2. **Extended Reasoning**
   - Deep analysis
   - Edge case identification
   - Consistency checking

#### Приклади застосування

```bash
# Покращити специфікацію
apr refine spec.md

# З кількома ітераціями
apr refine spec.md --iterations 3

# Output to file
apr refine spec.md --output improved-spec.md
```

#### Інтеграції

- **Claude Code:** Spec input
- **beads_rust:** Task generation
- **Agent Mail:** Review requests

---

### JeffreysPrompts CLI

**Тип:** Prompt Library
**CLI:** `jfp`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Prompts | Battle-tested |
| Format | Claude Code skills |
| Updates | Automatic |

#### Функціонал та можливості

1. **Prompt Browsing**
   - Categories
   - Search
   - Preview

2. **Installation**
   - As Claude Code skills
   - Version pinning
   - Auto-updates

#### Приклади застосування

```bash
# Browse prompts
jfp browse

# Search
jfp search "code review"

# Install as skill
jfp install review-pr --as-skill

# Update all
jfp update
```

#### Інтеграції

- **Claude Code:** Skill installation
- **Meta Skill:** Provider
- **CASS Memory:** Usage tracking

---

## Repository & Build Management

### Repo Updater

**Тип:** Multi-Repo Sync
**CLI:** `ru`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Parallelism | Configurable |
| AI Commits | Optional |
| Hooks | Pre/Post sync |

#### Функціонал та можливості

1. **Parallel Sync**
   - Multiple repos simultaneously
   - Progress tracking
   - Error handling

2. **AI-Driven Commits**
   - Auto-generated messages
   - Conventional commits
   - Review before commit

#### Приклади застосування

```bash
# Sync all repos
ru sync

# Specific repos
ru sync --repos frontend,backend

# With AI commits
ru sync --ai-commits

# Status
ru status
```

#### Інтеграції

- **NTM:** Status panel
- **GitHub CLI:** PR creation
- **Agent Mail:** Sync notifications

---

### Remote Compilation Helper

**Тип:** Build Offloading
**CLI:** `rch`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Protocol | SSH + rsync |
| Cache | Distributed |
| Workers | Configurable |

#### Функціонал та можливості

1. **Transparent Offloading**
   - Local command → Remote build
   - Automatic sync
   - Result caching

2. **Worker Fleet**
   - Multiple build servers
   - Load balancing
   - Health checks

#### Приклади застосування

```bash
# Статус workers
rch doctor

# Компіляція на remote
rch cargo build --release

# Deploy fleet
rch fleet deploy

# Self-test
rch self-test
```

#### Конфігурація

```toml
# workers.toml
[[workers]]
host = "build-server-1"
user = "builder"
cores = 32

[[workers]]
host = "build-server-2"
user = "builder"
cores = 16
```

#### Інтеграції

- **Rust:** Primary use case
- **NTM:** Worker monitoring
- **Tailscale:** Secure connection

---

### WezTerm Automata

**Тип:** Terminal Automation
**CLI:** `wa`
**Розробник:** Dicklesworthstone

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Terminal | WezTerm |
| Scripting | Lua |
| API | Unix socket |

#### Функціонал та можливості

1. **Terminal Hypervisor**
   - Multi-window management
   - Tab orchestration
   - Pane splitting

2. **Multi-Agent Workflows**
   - Coordinated execution
   - Output capture
   - State synchronization

#### Приклади застосування

```bash
# Запустити workflow
wa run multi-agent-review.lua

# Create layout
wa layout 3x2

# Broadcast command
wa broadcast "git pull"
```

#### Інтеграції

- **NTM:** Layout templates
- **Claude Code:** Agent launching
- **Agent Mail:** Workflow triggers

---

## Language Runtimes

### Bun

**Тип:** JavaScript Runtime
**CLI:** `bun`
**Документація:** [bun.sh](https://bun.sh)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Engine | JavaScriptCore |
| Speed | 4x faster than Node.js |
| Compatibility | Node.js APIs |

#### Функціонал та можливості

- Package manager (faster than npm/yarn)
- Test runner
- Bundler
- TypeScript support native

#### Приклади застосування

```bash
# Install dependencies
bun install

# Run script
bun run dev

# Test
bun test

# Build
bun build src/index.ts --outdir dist
```

---

### uv

**Тип:** Python Tooling
**CLI:** `uv`
**Документація:** [github.com/astral-sh/uv](https://github.com/astral-sh/uv)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Speed | 10-100x faster than pip |
| Compatibility | pip, virtualenv |
| Language | Rust |

#### Функціонал та можливості

- Virtual environment creation
- Package installation
- Dependency resolution
- Lock files

#### Приклади застосування

```bash
# Create venv
uv venv

# Install package
uv pip install requests

# Sync from requirements
uv pip sync requirements.txt
```

---

### Rust

**Тип:** Systems Language
**CLI:** `cargo`, `rustc`
**Документація:** [rust-lang.org](https://www.rust-lang.org)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Channel | Nightly |
| Target | Multi-platform |

#### Приклади застосування

```bash
# New project
cargo new project-name

# Build
cargo build --release

# Test
cargo test

# Run
cargo run
```

---

### Go

**Тип:** Systems Language
**CLI:** `go`
**Документація:** [go.dev](https://go.dev)

#### Приклади застосування

```bash
# Run
go run main.go

# Build
go build -o app

# Test
go test ./...

# Get dependency
go get github.com/pkg/errors
```

---

### Node.js

**Тип:** JavaScript Runtime
**CLI:** `node`, `npm`
**Документація:** [nodejs.org](https://nodejs.org)

Встановлюється через nvm для version management.

```bash
# Install version
nvm install 20

# Use version
nvm use 20

# List versions
nvm list
```

---

## Modern CLI Tools

### Quick Reference

| Tool | CLI | Замінює | Опис |
|------|-----|---------|------|
| ripgrep | `rg` | grep | Fast content search |
| fd | `fd` | find | Fast file finder |
| bat | `bat` | cat | Syntax highlighting |
| eza | `eza` | ls | Modern ls |
| zoxide | `z` | cd | Smart cd |
| fzf | `fzf` | — | Fuzzy finder |
| btop | `btop` | top | System monitor |
| dust | `dust` | du | Disk usage |
| Lazygit | `lazygit` | git | Git TUI |
| Lazydocker | `lazydocker` | docker | Docker TUI |
| jq | `jq` | — | JSON processor |
| Atuin | `atuin` | history | Shell history |
| tmux | `tmux` | screen | Terminal multiplexer |
| Neovim | `nvim` | vim | Text editor |

---

## Cloud & Deployment

### Quick Reference

| Tool | CLI | Service | Опис |
|------|-----|---------|------|
| Vercel CLI | `vercel` | Vercel | Next.js deployment |
| Wrangler | `wrangler` | Cloudflare | Edge workers |
| Supabase | `supabase` | Supabase | Backend-as-a-service |
| Vault | `vault` | HashiCorp | Secrets management |

---

## Specialized Utilities

### Quick Reference

| Tool | CLI | Опис |
|------|-----|------|
| giil | `giil` | Download images from cloud links |
| csctf | `csctf` | Convert chat shares to files |
| xf | `xf` | Search X/Twitter archives |
| tru | `tru` | Token-optimized notation |
| rano | `rano` | Network observer for AI CLIs |
| mdwb | `mdwb` | Web to Markdown converter |
| s2p | `s2p` | Source code to prompt TUI |
| rust_proxy | `rust_proxy` | Transparent network proxy |
| aadc | `aadc` | ASCII diagram corrector |
| caut | `caut` | LLM usage tracker |

---

## Наступні кроки

- **Інтеграції:** [Блок 3: Взаємозв'язки](./03-tool-integrations.md)
- **Робочі процеси:** [Блок 4: Workflows](./04-workflows.md)

---

*Див. також: [Огляд](./01-tools-overview.md) | [README](./README.md)*
