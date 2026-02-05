# Детальний опис: Safety, Tasks, Analysis та Build

## Зміст

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
br create "Implement authentication" -l feature

# Список issues
br list
br list -s open           # фільтр по статусу

# З залежностями
br create "Write tests" --deps blocks:auth-123

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
# Відкрити viewer (TUI інтерактивний)
bv

# Top priorities (JSON для автоматизації)
bv -robot-priority

# Priority brief (Markdown експорт)
bv -priority-brief brief.md

# Export graph (формат визначається розширенням: .svg, .html, .png)
bv -export-graph deps.svg
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
# Ініціалізувати workflow
apr setup

# Виконати ітерації (кожен round — окрема ітерація)
apr run 1
apr run 2
apr run 3

# Або одним рядком
apr setup && apr run 1 && apr run 2 && apr run 3
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

## Наступні кроки

- **AI Agents:** [02a: AI Agents та координація](./02a-tools-ai-agents.md)
- **Infrastructure:** [02c: Infrastructure](./02c-tools-infrastructure.md)
- **Інтеграції:** [Блок 3: Взаємозв'язки](./03-tool-integrations.md)
- **Робочі процеси:** [Блок 4: Workflows](./04-workflows.md)

---

*Див. також: [Огляд](./01-tools-overview.md) | [README](./README.md)*
