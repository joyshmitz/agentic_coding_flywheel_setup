/**
 * RU Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку RU.
 * Технічні терміни залишаємо англійською: RU, Repo Updater, git, pull, push, clone, stash, fetch,
 * Claude Code, NTM, BV, Mail, agent-sweep, dry-run, parallel, worker, TUI, CLI, JSON, MCP
 */

import type { RuLessonMessages } from "./ru";

export const ruLessonMessagesUk: RuLessonMessages = {
  // ========================================
  // SECTION: GoalBanner
  // ========================================
  goalBanner: {
    content: "Опануйте синхронізацію багатьох репозиторіїв та AI-driven автоматизацію комітів з RU.",
  },

  // ========================================
  // SECTION 1: What Is RU?
  // ========================================
  whatIsRu: {
    title: "Що таке RU?",

    description: "це ваш центр керування для управління десятками GitHub репозиторіїв. Одна команда синхронізує все. AI автоматизація розумно комітить ваші dirty репозиторії.",

    withoutRu: "Без RU, вам треба було б вручну заходити в кожен репозиторій (через cd) і запускати git pull. З 20+ репозиторіями це нудно і схильно до помилок. RU обробляє все це з parallel workers.",

    features: {
      parallelSync: {
        title: "Parallel Sync",
        description: "Work-stealing черга синхронізує репозиторії в 4 рази швидше",
      },
      agentSweep: {
        title: "Agent Sweep",
        description: "AI-driven автоматизація комітів",
      },
      resumeSupport: {
        title: "Resume Support",
        description: "Продовжіть з того місця, де зупинились",
      },
      gitPlumbing: {
        title: "Git Plumbing",
        description: "Без парсингу рядків, locale-safe",
      },
    },
  },

  // ========================================
  // SECTION 2: Essential Commands
  // ========================================
  essentialCommands: {
    title: "Основні команди",

    intro: "Почніть з цих базових команд. Вони покривають 90% щоденного використання.",

    commands: [
      { command: "ru sync", description: "Clone missing + pull всі репозиторії" },
      { command: "ru sync -j4", description: "Parallel sync з 4 workers" },
      { command: "ru sync --autostash", description: "Stash локальні зміни перед pull" },
      { command: "ru status", description: "Перевірити стани всіх репозиторіїв" },
      { command: "ru status --fetch", description: "Fetch + показати ahead/behind" },
      { command: "ru list --paths", description: "Показати всі шляхи репозиторіїв" },
      { command: "ru doctor", description: "Перевірка здоров'я інсталяції RU" },
    ],

    tip: {
      content: "Використовуйте ru sync --resume якщо sync був перерваний. RU запам'ятовує прогрес!",
    },
  },

  // ========================================
  // SECTION 3: Agent Sweep
  // ========================================
  agentSweep: {
    title: "Agent Sweep: AI автоматизація",

    description: "Agent Sweep — це вбивча фіча RU. Він використовує Claude Code для автоматичного коміту dirty репозиторіїв з розумними commit messages.",

    threePhaseWorkflow: {
      title: "Трифазний робочий процес",
      filename: "Three-Phase Workflow",
      language: "bash",
      code: `# Phase 1: Understand
# Agent reads AGENTS.md, explores codebase, studies conventions

# Phase 2: Plan
# Agent creates JSON commit plan (files, messages)
# RU validates: no secrets, file size limits, schema check

# Phase 3: Execute
# RU executes validated plan with deterministic git commands`,
    },

    commands: [
      { command: "ru agent-sweep --dry-run", description: "Попередній перегляд того, що станеться" },
      { command: "ru agent-sweep --parallel 4", description: "Обробити 4 репозиторії одночасно" },
      { command: "ru agent-sweep --with-release", description: "Включити version bumps та tags" },
      { command: "ru agent-sweep --resume", description: "Продовжити перерваний sweep" },
    ],

    warning: {
      content: "Завжди запускайте --dry-run спочатку для перегляду плану коміту!",
    },
  },

  // ========================================
  // SECTION 4: AI Code Review
  // ========================================
  aiCodeReview: {
    title: "AI Code Review",

    description: "RU може організувати AI-assisted code review через ваші репозиторії використовуючи ru review. Система review інтегрується з ntm robot mode для spawn Claude agents для ретельного аналізу.",

    commands: [
      { command: "ru review", description: "Перевірити незакомічені зміни в поточному репозиторії" },
      { command: "ru review --plan", description: "Створити детальний план review спочатку" },
      { command: "ru review --all", description: "Перевірити всі dirty репозиторії" },
      { command: "ru review --scope=security", description: "Зосередитися на проблемах безпеки" },
    ],

    tip: {
      content: "Комбінуйте з ubs для повного охоплення: запустіть ubs . для статичного аналізу, потім ru review для семантичного розуміння.",
    },
  },

  // ========================================
  // SECTION 5: Configuration
  // ========================================
  configuration: {
    title: "Конфігурація",

    description: "RU слідує конвенціям XDG. Налаштуйте один раз, синхронізуйте скрізь.",

    configExample: {
      filename: "~/.config/ru/config",
      language: "bash",
      code: `# Base directory for repositories
PROJECTS_DIR=/data/projects

# Parallel workers (1-8)
PARALLEL=4

# Update strategy: ff-only | rebase | merge
UPDATE_STRATEGY=ff-only

# Auto-stash local changes before pull
AUTOSTASH=false`,
    },

    reposExample: {
      filename: "~/.config/ru/repos.d/public.txt",
      language: "text",
      code: `# Shorthand
Dicklesworthstone/ntm
Dicklesworthstone/beads_viewer

# З branch
owner/repo@develop

# Власна локальна назва
owner/repo as my-fork

# SSH URL
git@github.com:owner/repo.git as myrepo`,
    },

    tip: {
      content: "Запустіть ru init --example для створення стартових файлів конфігурації.",
    },
  },

  // ========================================
  // SECTION 6: Tool Integration
  // ========================================
  toolIntegration: {
    title: "Інтеграція інструментів",

    description: "RU стає потужнішим при поєднанні з іншими flywheel інструментами.",

    integrations: [
      {
        name: "RU + NTM",
        description: "Agent Sweep використовує NTM robot mode для spawn Claude sessions. NTM керує tmux panes, RU організовує workflow.",
      },
      {
        name: "RU + BV",
        description: "Після синхронізації репозиторіїв, використовуйте BV для перевірки beads через всі проєкти. Комбінуйте ru status з bv --robot-triage.",
      },
      {
        name: "RU + Mail",
        description: "Agents можуть claim репозиторії через Mail для запобігання конфліктам під час parallel agent-sweep runs.",
      },
    ],
  },

  // ========================================
  // SECTION 7: Exit Codes
  // ========================================
  exitCodes: {
    title: "Exit Codes",

    description: "RU використовує значущі exit codes для scripting та автоматизації.",

    codes: [
      {
        code: "0",
        label: "Успіх",
        color: "emerald",
      },
      {
        code: "1",
        label: "Часткова невдача (деякі репозиторії зазнали невдачі)",
        color: "amber",
      },
      {
        code: "2",
        label: "Конфлікти (потрібне ручне вирішення)",
        color: "red",
      },
      {
        code: "5",
        label: "Перервано (використовуйте --resume)",
        color: "violet",
      },
    ],
  },
};
