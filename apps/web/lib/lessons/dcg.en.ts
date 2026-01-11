/**
 * DCG Lesson Messages - English (Default)
 *
 * All user-facing text for the DCG lesson component.
 * Technical terms kept in English: DCG, Destructive Command Guard, git, reset, delete, rm,
 * Claude Code, PreToolUse, hook, pack, allow-once, fail-open, CLI, TOML, bash
 */

export const dcgLessonMessages = {
  // ========================================
  // SECTION: GoalBanner
  // Source: dcg-lesson.tsx lines 30-32
  // ========================================
  goalBanner: {
    content: "Use DCG to block destructive commands before they do damage.",
  },

  // ========================================
  // SECTION 1: What Is DCG?
  // Source: dcg-lesson.tsx lines 34-78
  // ========================================
  whatIsDcg: {
    title: "What Is DCG?",

    // Paragraph 1 (lines 40-44)
    description: "is a Claude Code hook that blocks dangerous commands before they execute. It protects your repos from hard resets, recursive deletes, destructive database commands, and more.",

    // Paragraph 2 (lines 45-48)
    thinkOfIt: "Think of it as a safety interlock: if a command looks destructive, DCG stops it and suggests a safer alternative.",

    // FeatureGrid (lines 50-76) - 4 cards
    features: {
      preExecutionBlocking: {
        // FeatureCard lines 52-57
        title: "Pre-Execution Blocking",
        description: "Stops damage before it happens",
      },
      protectionPacks: {
        // FeatureCard lines 58-63
        title: "Protection Packs",
        description: "Git, filesystem, database, cloud, and more",
      },
      allowOnceCodes: {
        // FeatureCard lines 64-69
        title: "Allow-Once Codes",
        description: "Explicit bypass when you know it is safe",
      },
      failOpenDesign: {
        // FeatureCard lines 70-75
        title: "Fail-Open Design",
        description: "Errors never block your workflow",
      },
    },
  },

  // ========================================
  // SECTION 2: How DCG Intercepts Commands
  // Source: dcg-lesson.tsx lines 82-107
  // ========================================
  howItWorks: {
    title: "How DCG Intercepts Commands",

    // Paragraph (lines 87-90)
    description: "DCG runs as a PreToolUse hook inside Claude Code. Every command is checked against a set of rules before it runs.",

    // CodeBlock (lines 93-100)
    example: {
      language: "bash",
      code: `# Example: test a command before running it
$ dcg test "git reset --hard" --explain
> BLOCKED: git.reset.hard
> Why: hard reset discards uncommitted work
> Safer: git restore --staged .`,
    },

    // TipBox warning (lines 103-106)
    warning: {
      content: "If DCG blocks a command, slow down and read the explanation. It is showing you the dangerous part and a safer path.",
    },
  },

  // ========================================
  // SECTION 3: Essential Commands
  // Source: dcg-lesson.tsx lines 111-148
  // ========================================
  essentialCommands: {
    title: "Essential Commands",

    // CommandList (lines 116-147) - 7 commands
    commands: [
      {
        command: "dcg test '<command>'",
        description: "Check if a command would be blocked",
      },
      {
        command: "dcg test '<command>' --explain",
        description: "Explain why a command is unsafe",
      },
      {
        command: "dcg packs",
        description: "List available protection packs",
      },
      {
        command: "dcg install",
        description: "Register the Claude Code hook",
      },
      {
        command: "dcg uninstall",
        description: "Remove the hook (use --purge for full removal)",
      },
      {
        command: "dcg allow-once <code>",
        description: "Bypass for a single approved command",
      },
      {
        command: "dcg doctor",
        description: "Check installation and hook status",
      },
    ],
  },

  // ========================================
  // SECTION 4: Uninstalling DCG
  // Source: dcg-lesson.tsx lines 152-182
  // ========================================
  uninstalling: {
    title: "Uninstalling DCG",

    // Paragraph (lines 157-161)
    description: "If you need to remove DCG, you can uninstall the hook and optionally purge the binary and config. You can always re-enable it later with dcg install.",

    // CodeBlock (lines 164-175)
    example: {
      language: "bash",
      code: `# Remove hook only (keeps dcg installed)
$ dcg uninstall

# Full removal (hook + binary + config)
$ dcg uninstall --purge

# Verify removal
$ dcg doctor
$ claude /hooks`,
    },

    // TipBox (lines 178-181)
    tip: {
      content: "If you still want command safety but fewer blocks, prefer adjusting packs instead of uninstalling.",
    },
  },

  // ========================================
  // SECTION 5: Protection Packs
  // Source: dcg-lesson.tsx lines 186-211
  // ========================================
  protectionPacks: {
    title: "Protection Packs",

    // Paragraph (lines 191-194)
    description: "Packs let you enable or disable rules based on your workflow. Keep the ones you need to avoid false positives.",

    // CodeBlock (lines 197-203)
    example: {
      filename: "config.toml",
      language: "toml",
      code: `# ~/.config/dcg/config.toml
[packs]
enabled = ["git", "filesystem", "database.postgresql", "containers.docker"]`,
    },

    // TipBox (lines 206-210)
    tip: {
      content: "Start with git and filesystem packs. Add database or cloud packs only when you use those tools.",
    },
  },

  // ========================================
  // SECTION 6: When You See a Block
  // Source: dcg-lesson.tsx lines 215-231
  // ========================================
  whenBlocked: {
    title: "When You See a Block",

    // Paragraph (lines 220-222)
    description: "A block is a warning, not a dead end. Use it as a checkpoint:",

    // BulletList (lines 223-230) - 4 items
    steps: [
      "Read the explanation carefully.",
      "Prefer the safer alternative when possible.",
      "Use allow-once only if you are confident.",
      "Document the decision in your commit or notes.",
    ],
  },

  // ========================================
  // SECTION 7: DCG + SLB
  // Source: dcg-lesson.tsx lines 235-251
  // ========================================
  dcgPlusSLB: {
    title: "DCG + SLB",

    // Paragraph in motion.div (lines 245-250)
    description: "DCG blocks obvious destructive commands instantly. SLB handles contextual risk that needs human approval. Together, they form a layered safety system.",
  },
};

// Export type for TypeScript
export type DcgLessonMessages = typeof dcgLessonMessages;
