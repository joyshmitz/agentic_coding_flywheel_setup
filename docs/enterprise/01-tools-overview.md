# Блок 1: Загальний опис інструментів

## Зміст

- [Огляд екосистеми](#огляд-екосистеми)
- [Категорії інструментів](#категорії-інструментів)
- [AI Coding Agents](#1-ai-coding-agents)
- [Agent Coordination](#2-agent-coordination)
- [Safety & Quality](#3-safety--quality)
- [Task & Issue Management](#4-task--issue-management)
- [Code Analysis & Skills](#5-code-analysis--skills)
- [Repository & Build Management](#6-repository--build-management)
- [Language Runtimes](#7-language-runtimes)
- [Modern CLI Tools](#8-modern-cli-tools)
- [Cloud & Deployment](#9-cloud--deployment)
- [Database](#10-database)
- [Specialized Utilities](#11-specialized-utilities)
- [Ключові можливості екосистеми](#ключові-можливості-екосистеми)

---

## Огляд екосистеми

ACFS встановлює **60+ інструментів**, які разом формують повноцінне AI-powered середовище розробки. Інструменти встановлюються поетапно (Phase 5-9B) і організовані в логічні категорії.

### Статистика

| Категорія | Кількість | Призначення |
|-----------|-----------|-------------|
| AI Coding Agents | 3 | Основні AI-асистенти |
| Agent Coordination | 5 | Управління агентами |
| Safety & Quality | 4 | Безпека коду |
| Task Management | 3 | Управління завданнями |
| Code Analysis & Skills | 3 | Аналіз та навички |
| Repository & Build | 3 | Репозиторії та збірка |
| Language Runtimes | 5 | Мови програмування |
| Modern CLI Tools | 20+ | Командний рядок |
| Cloud & Deployment | 4 | Хмарні платформи |
| Database | 1 | База даних |
| Specialized Utilities | 10+ | Спеціалізовані утиліти |

---

## Категорії інструментів

### 1. AI Coding Agents

Головні AI-асистенти для написання та редагування коду.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Claude Code** | `claude` | Основний AI-асистент від Anthropic | OAuth auth, MCP servers, багатофайлове редагування |
| **Codex CLI** | `codex` | AI-асистент від OpenAI | GPT-based, інтеграція з ChatGPT |
| **Gemini CLI** | `gemini` | AI-асистент від Google | Google Gemini, інтеграція з Google Cloud |

**Чому три агенти?**
- Різні моделі мають різні сильні сторони
- Резервування при недоступності сервісу
- Можливість порівняння відповідей

---

### 2. Agent Coordination

Інструменти для управління, комунікації та координації AI-агентів.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Named Tmux Manager (NTM)** | `ntm` | Управління tmux-сесіями агентів | Класифікація панелей, multi-agent sessions |
| **MCP Agent Mail** | `am` | Комунікація між агентами | Gmail-like threading, повідомлення |
| **CASS** | `cass` | Пошук по історії сесій | Sub-second search, всі агенти |
| **CASS Memory** | `cm` | Пам'ять агентів | Episodic/working/procedural layers |
| **CAAM** | `caam` | Перемикання облікових записів | Sub-100ms auth switching |

**Ключова синергія:** NTM + Agent Mail дозволяють кільком агентам працювати паралельно з координацією.

---

### 3. Safety & Quality

Інструменти захисту від помилок та забезпечення якості коду.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Ultimate Bug Scanner (UBS)** | `ubs` | Виявлення багів | 1000+ патернів, multi-language |
| **Destructive Command Guard (DCG)** | `dcg` | Блокування небезпечних команд | Запобігає `rm -rf`, `git reset --hard` |
| **SLB** | `slb` | Правило двох осіб | Approval gate для критичних команд |
| **ast-grep** | `sg` | Syntax-aware сканування | AST-based пошук |

**Критично важливо:** DCG та SLB — обов'язкові для production середовищ.

---

### 4. Task & Issue Management

Управління завданнями, багами та процесами.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **beads_rust** | `br` | Локальний issue tracker | Dependency graphs, local-first |
| **Beads Viewer** | `bv` | Візуалізація завдань | PageRank prioritization, graphs |
| **Process Triage** | `pt` | Очищення процесів | Bayesian scoring, intelligent termination |

**Local-first підхід:** beads_rust працює без інтернету, синхронізується з GitHub Issues.

---

### 5. Code Analysis & Skills

Аналіз коду та управління навичками/промптами.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Meta Skill** | `ms` | Бібліотека навичок | MCP server, semantic search |
| **Automated Plan Reviser** | `apr` | Покращення специфікацій | Extended reasoning, iteration |
| **JeffreysPrompts CLI** | `jfp` | Бібліотека промптів | Battle-tested prompts as skills |

**Use case:** `jfp` дозволяє встановити перевірені промпти як Claude Code skills.

---

### 6. Repository & Build Management

Управління репозиторіями та процесом збірки.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Repo Updater** | `ru` | Синхронізація репозиторіїв | Parallel sync, AI commits |
| **Remote Compilation Helper** | `rch` | Віддалена компіляція | Rust build offloading |
| **WezTerm Automata** | `wa` | Автоматизація терміналу | Multi-agent workflows |

**Оптимізація:** `rch` дозволяє компілювати Rust на потужніших машинах.

---

### 7. Language Runtimes

Середовища виконання для різних мов програмування.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Bun** | `bun` | JavaScript/TypeScript runtime | Швидкий package manager |
| **uv** | `uv` | Python venv tooling | Ultra-fast venv creation |
| **Rust Nightly** | `cargo` | Rust compiler | Extended reasoning features |
| **Go** | `go` | Go programming | Statically compiled |
| **Node.js** | `node` | JavaScript runtime (via nvm) | Alternative to Bun |

**Рекомендація:** Bun як основний JS runtime, uv для Python проектів.

---

### 8. Modern CLI Tools

Сучасні заміни класичних Unix-утиліт.

#### Пошук та навігація

| Інструмент | CLI | Замінює | Призначення |
|------------|-----|---------|-------------|
| **ripgrep** | `rg` | grep | Швидкий пошук у файлах |
| **fzf** | `fzf` | — | Fuzzy finder |
| **fd-find** | `fd` | find | Швидкий пошук файлів |
| **zoxide** | `z` | cd | Розумна навігація |

#### Перегляд та моніторинг

| Інструмент | CLI | Замінює | Призначення |
|------------|-----|---------|-------------|
| **eza/lsd** | `eza` | ls | Modern directory listing |
| **bat** | `bat` | cat | Syntax highlighting |
| **btop** | `btop` | top/htop | System monitor |
| **dust** | `dust` | du | Disk usage |

#### Git та контейнери

| Інструмент | CLI | Призначення |
|------------|-----|-------------|
| **Lazygit** | `lazygit` | Git TUI |
| **Lazydocker** | `lazydocker` | Docker TUI |
| **gh** | `gh` | GitHub CLI |
| **git-lfs** | `git-lfs` | Large files |

#### Термінал та середовище

| Інструмент | CLI | Призначення |
|------------|-----|-------------|
| **tmux** | `tmux` | Terminal multiplexer |
| **direnv** | `direnv` | Environment management |
| **Atuin** | `atuin` | Shell history |
| **Neovim** | `nvim` | Text editor |

#### Інфраструктура

| Інструмент | CLI | Призначення |
|------------|-----|-------------|
| **Docker** | `docker` | Containers |
| **Tailscale** | `tailscale` | Mesh VPN |
| **jq** | `jq` | JSON processor |

---

### 9. Cloud & Deployment

Інструменти для деплою та хмарних сервісів.

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **Vercel CLI** | `vercel` | Next.js deployment | Edge functions |
| **Cloudflare Wrangler** | `wrangler` | Edge computing | Workers, KV |
| **Supabase CLI** | `supabase` | Backend-as-a-service | PostgreSQL, auth, realtime |
| **HashiCorp Vault** | `vault` | Secrets management | Centralized credentials |

---

### 10. Database

| Інструмент | CLI | Призначення | Ключові можливості |
|------------|-----|-------------|-------------------|
| **PostgreSQL 18** | `psql` | Relational database | Production-grade SQL |

---

### 11. Specialized Utilities

Спеціалізовані утиліти для специфічних задач.

| Інструмент | CLI | Призначення |
|------------|-----|-------------|
| **Get Image from Internet Link** | `giil` | Download images from cloud |
| **Chat Share to File** | `csctf` | Export AI chats to MD |
| **X Archive Search** | `xf` | Search X/Twitter archives |
| **toon_rust** | `tru` | Token-optimized notation |
| **rano** | `rano` | Network observer for AI CLIs |
| **markdown_web_browser** | `mdwb` | Web to Markdown |
| **Source to Prompt TUI** | `s2p` | Code-to-prompt generator |
| **rust_proxy** | `rust_proxy` | Network proxy |
| **ASCII Diagram Corrector** | `aadc` | Fix ASCII art |
| **coding_agent_usage_tracker** | `caut` (planned — не встановлений) | LLM usage tracking |

---

## Ключові можливості екосистеми

### 1. Multi-Agent Orchestration
- Кілька AI-агентів працюють паралельно
- Координація через NTM + Agent Mail
- Спільна пам'ять через CASS Memory

### 2. Safety by Default
- DCG блокує небезпечні команди
- SLB вимагає підтвердження
- UBS сканує код на баги

### 3. Local-First Development
- beads_rust працює офлайн
- Локальна історія всіх сесій
- Синхронізація за потреби

### 4. Performance Optimization
- rch для віддаленої компіляції
- Bun замість npm
- uv замість pip

### 5. Unified Search
- ripgrep для файлів
- fzf для fuzzy пошуку
- CASS для історії агентів

---

## Наступні кроки

- **AI Agents та координація:** [02a: AI Agents](./02a-tools-ai-agents.md)
- **Safety, Tasks, Analysis, Build:** [02b: ACFS Stack](./02b-tools-acfs-stack.md)
- **Infrastructure:** [02c: Runtimes, CLI, Cloud](./02c-tools-infrastructure.md)
- **Інтеграції:** [Блок 3: Взаємозв'язки](./03-tool-integrations.md)
- **Робочі процеси:** [Блок 4: Workflows](./04-workflows.md)

---

*Див. також: [README](./README.md) | [System Overview](./00-system-overview.md)*
