/**
 * Commands Data - Ukrainian
 *
 * Ukrainian translations for command categories and descriptions.
 * Technical command names stay in English.
 */

import type { CommandCategory, CommandRef } from "./commands";
import { manifestCommands } from "./generated/manifest-web-index";

export const COMMAND_CATEGORIES_UK: Array<{
  id: CommandCategory;
  label: string;
  description: string;
}> = [
  {
    id: "agents",
    label: "Агенти",
    description: "AI асистенти для кодування, встановлені ACFS",
  },
  {
    id: "search",
    label: "Пошук",
    description: "Швидкий пошук файлів та патернів",
  },
  {
    id: "git",
    label: "Git",
    description: "Інструменти контролю версій",
  },
  {
    id: "system",
    label: "Система",
    description: "Shell, термінал та зручні інструменти",
  },
  {
    id: "stack",
    label: "Stack",
    description: "Інструменти Dicklesworthstone для агентних workflow",
  },
  {
    id: "languages",
    label: "Мови",
    description: "Рантайми та пакетні менеджери",
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "CLI для хмари та баз даних",
  },
];

export const COMMANDS_UK: CommandRef[] = [
  {
    name: "cc",
    fullName: "Claude Code",
    description: "Агент Anthropic для кодування (аліас для claude).",
    category: "agents",
    example: 'cc "fix the auth bug in auth.ts"',
    aliases: ["claude"],
    docsUrl: "/learn/agent-commands",
  },
  {
    name: "cod",
    fullName: "Codex CLI",
    description: "Агент OpenAI для кодування (аліас для codex).",
    category: "agents",
    example: 'cod "add tests for utils.ts"',
    aliases: ["codex"],
    docsUrl: "/learn/agent-commands",
  },
  {
    name: "gmi",
    fullName: "Gemini CLI",
    description: "Агент Google для кодування (аліас для gemini).",
    category: "agents",
    example: 'gmi "review this PR"',
    aliases: ["gemini"],
    docsUrl: "/learn/agent-commands",
  },
  {
    name: "rg",
    fullName: "ripgrep",
    description: "Надшвидкий пошук по коду.",
    category: "search",
    example: 'rg "TODO" ./apps',
    aliases: ["grep"],
  },
  {
    name: "fd",
    fullName: "fd-find",
    description: "Швидкий пошук файлів.",
    category: "search",
    example: 'fd "*.ts"',
    aliases: ["find", "fdfind"],
  },
  {
    name: "fzf",
    fullName: "Fuzzy Finder",
    description: "Інтерактивний нечіткий пошук файлів та команд.",
    category: "search",
    example: "fzf",
  },
  {
    name: "sg",
    fullName: "ast-grep",
    description: "Структурний пошук та заміна коду.",
    category: "search",
    example: 'sg -p "foo($A)" -r "bar($A)"',
  },
  {
    name: "git",
    fullName: "Git",
    description: "Система контролю версій.",
    category: "git",
    example: "git status",
  },
  {
    name: "lazygit",
    fullName: "LazyGit",
    description: "Термінальний UI для Git.",
    category: "git",
    example: "lazygit",
    aliases: ["lg"],
  },
  {
    name: "ntm",
    fullName: "Named Tmux Manager",
    description: "Менеджер сесій для агентів та workflow.",
    category: "system",
    example: "ntm new acfs",
  },
  {
    name: "tmux",
    fullName: "tmux",
    description: "Термінальний мультиплексор.",
    category: "system",
    example: "tmux new -s work",
  },
  {
    name: "lsd",
    fullName: "LSDeluxe",
    description: "Сучасна заміна ls (fallback eza).",
    category: "system",
    example: "lsd -la",
    aliases: ["eza", "ls"],
  },
  {
    name: "bat",
    fullName: "bat",
    description: "Cat з підсвіткою синтаксису.",
    category: "system",
    example: "bat README.md",
    aliases: ["cat", "batcat"],
  },
  {
    name: "zoxide",
    fullName: "zoxide",
    description: "Розумна заміна cd.",
    category: "system",
    example: "z project",
  },
  {
    name: "atuin",
    fullName: "atuin",
    description: "Синхронізація історії shell з потужним пошуком.",
    category: "system",
    example: "atuin search ssh",
  },
  {
    name: "direnv",
    fullName: "direnv",
    description: "Змінні середовища для директорій.",
    category: "system",
    example: "direnv allow",
  },
  {
    name: "ananicy-cpp",
    fullName: "Ananicy-CPP Daemon",
    description: "Демон пріоритету процесів з 1700+ правилами автоматичного зниження пріоритету.",
    category: "system",
    example: "systemctl status ananicy-cpp",
    docsUrl: "https://gitlab.com/ananicy-cpp/ananicy-cpp",
  },
  {
    name: "br",
    fullName: "Beads CLI",
    description: "Управління графом задач.",
    category: "stack",
    example: "br ready",
  },
  {
    name: "bv",
    fullName: "Beads Viewer",
    description: "Переглядач issues та workflow (--robot-* флаги).",
    category: "stack",
    example: "bv --robot-triage",
  },
  {
    name: "ms",
    fullName: "Meta Skill",
    description: "Локальне управління знаннями з гібридним семантичним пошуком.",
    category: "stack",
    example: "ms search 'auth flow'",
    aliases: ["meta-skill"],
  },
  {
    name: "ubs",
    fullName: "Ultimate Bug Scanner",
    description: "Статичний аналіз з guardrails.",
    category: "stack",
    example: "ubs .",
  },
  {
    name: "cass",
    fullName: "CASS",
    description: "Пошук по сесіях агентів.",
    category: "stack",
    example: "cass health",
  },
  {
    name: "cm",
    fullName: "CASS Memory",
    description: "Процедурна пам'ять для агентних workflow.",
    category: "stack",
    example: 'cm context "auth flow"',
  },
  {
    name: "caam",
    fullName: "CAAM",
    description: "Менеджер акаунтів агентів.",
    category: "stack",
    example: "caam status",
  },
  {
    name: "slb",
    fullName: "Simultaneous Launch Button",
    description: "Правило двох осіб для небезпечних команд.",
    category: "stack",
    example: "slb",
  },
  {
    name: "am",
    fullName: "Agent Mail",
    description: "Координація та обмін повідомленнями між агентами.",
    category: "stack",
    example: "am status",
  },
  {
    name: "apr",
    fullName: "Automated Plan Reviser",
    description: "Автоматичне ітеративне уточнення специфікацій з розширеним AI reasoning.",
    category: "stack",
    example: "apr refine plan.md",
    aliases: ["automated-plan-reviser"],
  },
  {
    name: "jfp",
    fullName: "JeffreysPrompts CLI",
    description: "Бібліотека перевірених промптів з установкою скілів одним кліком.",
    category: "stack",
    example: "jfp install idea-wizard",
    aliases: ["jeffreysprompts"],
    docsUrl: "https://jeffreysprompts.com",
  },
  {
    name: "pt",
    fullName: "Process Triage",
    description: "Пошук та завершення зависших/zombie процесів з Bayesian скорінгом.",
    category: "stack",
    example: "pt",
    aliases: ["process-triage"],
  },
  {
    name: "xf",
    fullName: "X Archive Search",
    description: "Блискавичний локальний пошук по вашому X/Twitter архіву.",
    category: "stack",
    example: 'xf search "machine learning"',
    docsUrl: "https://github.com/Dicklesworthstone/xf",
  },
  {
    name: "bun",
    fullName: "Bun",
    description: "JS/TS рантайм та пакетний менеджер.",
    category: "languages",
    example: "bun install",
  },
  {
    name: "uv",
    fullName: "uv",
    description: "Швидкий пакетний менеджер Python.",
    category: "languages",
    example: "uv venv",
  },
  {
    name: "cargo",
    fullName: "Rust Cargo",
    description: "Пакетний менеджер Rust.",
    category: "languages",
    example: "cargo build",
  },
  {
    name: "go",
    fullName: "Go",
    description: "Go toolchain.",
    category: "languages",
    example: "go test ./...",
  },
  {
    name: "wrangler",
    fullName: "Wrangler",
    description: "CLI для Cloudflare.",
    category: "cloud",
    example: "wrangler whoami",
  },
  {
    name: "supabase",
    fullName: "Supabase CLI",
    description: "Інструменти управління Supabase.",
    category: "cloud",
    example: "supabase status",
  },
  {
    name: "vercel",
    fullName: "Vercel CLI",
    description: "Інструменти деплою Vercel.",
    category: "cloud",
    example: "vercel whoami",
  },
  {
    name: "psql",
    fullName: "PostgreSQL Client",
    description: "Підключення до баз даних PostgreSQL.",
    category: "cloud",
    example: "psql -h localhost -U postgres",
  },
  {
    name: "vault",
    fullName: "Vault CLI",
    description: "Менеджер секретів HashiCorp Vault.",
    category: "cloud",
    example: "vault status",
  },
  {
    name: "dcg",
    fullName: "Destructive Command Guard",
    description: "Hook для Claude Code, що блокує небезпечні git/fs команди перед виконанням.",
    category: "stack",
    example: "dcg test 'rm -rf /' --explain",
    aliases: ["destructive-command-guard"],
  },
  {
    name: "ru",
    fullName: "Repo Updater",
    description: "Синхронізація багатьох репозиторіїв з AI-driven автоматизацією комітів.",
    category: "stack",
    example: "ru sync --parallel 4",
    aliases: ["repo-updater"],
  },
  {
    name: "sysmoni",
    fullName: "SRPS System Monitor",
    description: "TUI в реальному часі, що показує CPU/пам'ять по процесах зі статусом правил ananicy.",
    category: "stack",
    example: "sysmoni",
    docsUrl: "https://github.com/Dicklesworthstone/system_resource_protection_script",
  },
];

// Auto-merge any manifest-defined commands not already in the hand-maintained list.
// This ensures new tools added to acfs.manifest.yaml appear automatically.
const _handMaintainedNames = new Set(COMMANDS_UK.map((c) => c.name));
const _generatedExtras: CommandRef[] = manifestCommands
  .filter((mc) => !_handMaintainedNames.has(mc.cliName))
  .map((mc) => ({
    name: mc.cliName,
    fullName: mc.description.split(" - ")[0] || mc.cliName,
    description: mc.description,
    category: "stack" as CommandCategory,
    example: mc.commandExample ?? `${mc.cliName} --help`,
    aliases: mc.cliAliases.length > 0 ? mc.cliAliases : undefined,
    docsUrl: mc.docsUrl,
  }));

/** All commands: hand-maintained + auto-discovered from manifest. */
export const ALL_COMMANDS_UK: CommandRef[] = [...COMMANDS_UK, ..._generatedExtras];
