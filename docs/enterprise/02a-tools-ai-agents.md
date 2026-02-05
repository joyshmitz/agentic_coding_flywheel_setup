# Детальний опис: AI Agents та координація

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

Agent Mail — це MCP сервер з Web UI, НЕ CLI tool для inbox/send/reply.

**PM (людина):** Web UI — `http://localhost:8765/mail`

**Агент (MCP):**

```json
// Відправити повідомлення
{"method": "send_message", "params": {
  "to": ["BlueLake"], "subject": "Review needed",
  "body_md": "Please review PR #42"}}

// Перевірити inbox
{"method": "fetch_inbox", "params": {"agent_name": "GreenCastle"}}

// Відповісти на повідомлення
{"method": "reply_message", "params": {
  "message_id": 123, "body_md": "Approved, merging now"}}

// Пошук
{"method": "search_messages", "params": {"query": "authentication bug"}}
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
| "Agent not found" | `am list-projects` або Web UI для перегляду агентів |
| Message not delivered | Перевірити contact policy |
| Search not working | `am doctor check` |

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

## Наступні кроки

- **Safety та Task Management:** [02b: ACFS Stack](./02b-tools-acfs-stack.md)
- **Infrastructure:** [02c: Infrastructure](./02c-tools-infrastructure.md)
- **Інтеграції:** [Блок 3: Взаємозв'язки](./03-tool-integrations.md)

---

*Див. також: [Огляд](./01-tools-overview.md) | [README](./README.md)*
