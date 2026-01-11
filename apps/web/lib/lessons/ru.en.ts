/**
 * RU Lesson Messages - English (Default)
 *
 * All user-facing text for the RU lesson component.
 * Technical terms kept in English: RU, Repo Updater, git, pull, push, clone, stash, fetch,
 * Claude Code, NTM, BV, Mail, agent-sweep, dry-run, parallel, worker, TUI, CLI, JSON, MCP
 */

export const ruLessonMessages = {
  // ========================================
  // SECTION: GoalBanner
  // Source: ru-lesson.tsx lines 32-34
  // ========================================
  goalBanner: {
    content: "Master multi-repo synchronization and AI-driven commit automation with RU.",
  },

  // ========================================
  // SECTION 1: What Is RU?
  // Source: ru-lesson.tsx lines 37-76
  // ========================================
  whatIsRu: {
    title: "What Is RU?",

    // Paragraph 1 (lines 39-42)
    description: "is your command center for managing dozens of GitHub repositories. One command syncs everything. AI automation commits your dirty repos intelligently.",

    // Paragraph 2 (lines 44-46)
    withoutRu: "Without RU, you'd manually cd into each repo and run git pull. With 20+ repos, that's tedious and error-prone. RU handles it all with parallel workers.",

    // FeatureGrid (lines 50-73) - 4 cards
    features: {
      parallelSync: {
        // FeatureCard lines 50-55
        title: "Parallel Sync",
        description: "Work-stealing queue syncs repos 4x faster",
      },
      agentSweep: {
        // FeatureCard lines 56-61
        title: "Agent Sweep",
        description: "AI-driven commit automation",
      },
      resumeSupport: {
        // FeatureCard lines 62-67
        title: "Resume Support",
        description: "Pick up where you left off",
      },
      gitPlumbing: {
        // FeatureCard lines 68-73
        title: "Git Plumbing",
        description: "No string parsing, locale-safe",
      },
    },
  },

  // ========================================
  // SECTION 2: Essential Commands
  // Source: ru-lesson.tsx lines 81-101
  // ========================================
  essentialCommands: {
    title: "Essential Commands",

    // Paragraph (lines 82-84)
    intro: "Start with these core commands. They cover 90% of daily usage.",

    // CommandList (lines 87-95) - 7 commands
    commands: [
      { command: "ru sync", description: "Clone missing + pull all repos" },
      { command: "ru sync -j4", description: "Parallel sync with 4 workers" },
      { command: "ru sync --autostash", description: "Stash local changes before pull" },
      { command: "ru status", description: "Check all repo states" },
      { command: "ru status --fetch", description: "Fetch + show ahead/behind" },
      { command: "ru list --paths", description: "Show all repo paths" },
      { command: "ru doctor", description: "Health check RU installation" },
    ],

    // TipBox (lines 98-100)
    tip: {
      content: "Use ru sync --resume if sync was interrupted. RU remembers progress!",
    },
  },

  // ========================================
  // SECTION 3: Agent Sweep
  // Source: ru-lesson.tsx lines 106-137
  // ========================================
  agentSweep: {
    title: "Agent Sweep: AI Automation",

    // Paragraph (lines 107-110)
    description: "Agent Sweep is RU's killer feature. It uses Claude Code to automatically commit dirty repos with intelligent commit messages.",

    // CodeBlock section (lines 112-123)
    threePhaseWorkflow: {
      title: "Three-Phase Workflow",
      filename: "Three-Phase Workflow",
      language: "bash",
      code: `# Phase 1: Understand
# Agent reads AGENTS.md, explores codebase, learns conventions

# Phase 2: Plan
# Agent produces JSON commit plan (files, messages)
# RU validates: no secrets, file size limits, schema check

# Phase 3: Execute
# RU executes validated plan with deterministic git commands`,
    },

    // CommandList (lines 125-131) - 4 commands
    commands: [
      { command: "ru agent-sweep --dry-run", description: "Preview what would happen" },
      { command: "ru agent-sweep --parallel 4", description: "Process 4 repos simultaneously" },
      { command: "ru agent-sweep --with-release", description: "Include version bumps and tags" },
      { command: "ru agent-sweep --resume", description: "Continue interrupted sweep" },
    ],

    // TipBox warning (lines 134-136)
    warning: {
      content: "Always run --dry-run first to preview the commit plan!",
    },
  },

  // ========================================
  // SECTION 4: AI Code Review
  // Source: ru-lesson.tsx lines 142-162
  // ========================================
  aiCodeReview: {
    title: "AI Code Review",

    // Paragraph (lines 143-147)
    description: "RU can orchestrate AI-assisted code reviews across your repos using ru review. The review system integrates with ntm's robot mode to spawn Claude agents for thorough analysis.",

    // CommandList (lines 149-156) - 4 commands
    commands: [
      { command: "ru review", description: "Review uncommitted changes in current repo" },
      { command: "ru review --plan", description: "Create detailed review plan first" },
      { command: "ru review --all", description: "Review all dirty repos" },
      { command: "ru review --scope=security", description: "Focus on security issues" },
    ],

    // TipBox (lines 158-161)
    tip: {
      content: "Combine with ubs for comprehensive coverage: run ubs . for static analysis, then ru review for semantic understanding.",
    },
  },

  // ========================================
  // SECTION 5: Configuration
  // Source: ru-lesson.tsx lines 167-206
  // ========================================
  configuration: {
    title: "Configuration",

    // Paragraph (lines 168-170)
    description: "RU follows XDG conventions. Configure once, sync everywhere.",

    // CodeBlock 1 (lines 172-185)
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

    // CodeBlock 2 (lines 187-201)
    reposExample: {
      filename: "~/.config/ru/repos.d/public.txt",
      language: "text",
      code: `# Shorthand
Dicklesworthstone/ntm
Dicklesworthstone/beads_viewer

# With branch
owner/repo@develop

# Custom local name
owner/repo as my-fork

# SSH URL
git@github.com:owner/repo.git as myrepo`,
    },

    // TipBox (lines 203-205)
    tip: {
      content: "Run ru init --example to create starter config files.",
    },
  },

  // ========================================
  // SECTION 6: Tool Integration
  // Source: ru-lesson.tsx lines 211-255
  // ========================================
  toolIntegration: {
    title: "Tool Integration",

    // Paragraph (lines 212-214)
    description: "RU becomes more powerful when combined with other flywheel tools.",

    // Integration cards (lines 217-253) - 3 integrations
    integrations: [
      {
        // Card 1 (lines 223-228)
        name: "RU + NTM",
        description: "Agent Sweep uses NTM robot mode to spawn Claude sessions. NTM manages the tmux panes, RU orchestrates the workflow.",
      },
      {
        // Card 2 (lines 234-240)
        name: "RU + BV",
        description: "After syncing repos, use BV to check beads across all projects. Combine ru status with bv --robot-triage.",
      },
      {
        // Card 3 (lines 247-251)
        name: "RU + Mail",
        description: "Agents can claim repos via Mail to prevent conflicts during parallel agent-sweep runs.",
      },
    ],
  },

  // ========================================
  // SECTION 7: Exit Codes
  // Source: ru-lesson.tsx lines 260-283
  // ========================================
  exitCodes: {
    title: "Exit Codes",

    // Paragraph (lines 261-263)
    description: "RU uses meaningful exit codes for scripting and automation.",

    // Exit code grid (lines 265-282) - 4 codes
    codes: [
      {
        code: "0",
        label: "Success",
        color: "emerald",
      },
      {
        code: "1",
        label: "Partial failure (some repos failed)",
        color: "amber",
      },
      {
        code: "2",
        label: "Conflicts (manual resolution needed)",
        color: "red",
      },
      {
        code: "5",
        label: "Interrupted (use --resume)",
        color: "violet",
      },
    ],
  },
};

// Export type for TypeScript
export type RuLessonMessages = typeof ruLessonMessages;
