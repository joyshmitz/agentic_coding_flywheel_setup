/**
 * Keeping Updated Lesson Messages - English (Default)
 *
 * All user-facing text for the keeping-updated lesson component.
 * Technical terms kept in English: ACFS, VPS, apt, acfs-update, CLI, cron
 */

export const keepingUpdatedLessonMessages = {
  goalBanner: {
    content: "Learn how to keep your ACFS tools current.",
  },

  whyUpdatesMatter: {
    title: "Why Updates Matter",
    intro: "Your VPS has 30+ tools installed. Each one gets improvements:",

    benefits: [
      "Bug fixes and security patches",
      "New features and capabilities",
      "Better performance",
    ],

    updateBenefitsCard: {
      title: "Keeping things updated means:",
      benefits: [
        "Fewer mysterious errors",
        "Better security",
        "Access to new agent features",
      ],
    },
  },

  updateCommand: {
    title: "The Update Command",
    intro: "ACFS provides a single command to update everything:",
    command: "acfs-update",
    description: "That's it! This updates:",

    updateItems: [
      {
        label: "System packages",
        description: "apt",
      },
      {
        label: "Shell tools",
        description: "OMZ, P10K, plugins",
      },
      {
        label: "Coding agents",
        description: "Claude, Codex, Gemini",
      },
      {
        label: "Cloud CLIs",
        description: "Wrangler, Supabase, Vercel",
      },
    ],
  },

  commonPatterns: {
    title: "Common Update Patterns",

    patterns: [
      {
        title: "Quick Agent Update",
        description: "If you just want the latest agent versions:",
        command: "acfs-update --agents-only",
      },
      {
        title: "Skip System Packages",
        description: "apt updates can be slow. Skip them when you're in a hurry:",
        command: "acfs-update --no-apt",
      },
      {
        title: "Preview Changes",
        description: "See what would be updated without changing anything:",
        command: "acfs-update --dry-run",
      },
      {
        title: "Include Stack Tools",
        description: "The Dicklesworthstone stack (ntm, slb, ubs, etc.) is skipped by default because it takes longer. Include it with:",
        command: "acfs-update --stack",
      },
    ],
  },

  automatedUpdates: {
    title: "Automated Updates",
    intro: "For hands-off maintenance, use quiet mode:",
    command: "acfs-update --yes --quiet",
    description: "This runs without prompts and only shows errors.",
    tip: "You can add this to a cron job for weekly updates!",

    cronExample: {
      comment1: "# Edit crontab",
      command1: "crontab -e",
      comment2: "# Add this line for weekly Sunday 3am updates",
      cronLine: "0 3 * * 0 $HOME/.local/bin/acfs-update --yes --quiet >> $HOME/.acfs/logs/cron-update.log 2>&1",
    },
  },

  checkingLogs: {
    title: "Checking Update Logs",
    intro: "Every update is logged:",

    commands: [
      {
        comment: "# List recent logs",
        command: "ls -lt ~/.acfs/logs/updates/ | head -5",
      },
      {
        comment: "# View the most recent log",
        command: "cat ~/.acfs/logs/updates/$(ls -1t ~/.acfs/logs/updates | head -1)",
      },
      {
        comment: "# Watch a running update",
        command: "tail -f ~/.acfs/logs/updates/$(ls -1t ~/.acfs/logs/updates | head -1)",
      },
    ],
  },

  troubleshooting: {
    title: "Troubleshooting",

    issues: [
      {
        title: "apt is locked",
        description: 'If you see "apt is locked by another process":',
        solution: `# Wait for other apt operations to finish, or:
sudo rm /var/lib/dpkg/lock-frontend
sudo dpkg --configure -a`,
      },
      {
        title: "Agent update failed",
        description: "Try updating directly:",
        solution: `# Claude
claude update

# Codex
bun install -g --trust @openai/codex@latest

# Gemini
bun install -g --trust @google/gemini-cli@latest`,
      },
      {
        title: "Shell tools won't update",
        description: "Check git remote access:",
        solution: "git -C ~/.oh-my-zsh remote -v",
      },
    ],
  },

  quickReference: {
    title: "Quick Reference",

    commands: [
      { command: "acfs-update", description: "Update everything (except stack)" },
      { command: "acfs-update --stack", description: "Include stack tools" },
      { command: "acfs-update --agents-only", description: "Just update agents" },
      { command: "acfs-update --no-apt", description: "Skip apt (faster)" },
      { command: "acfs-update --dry-run", description: "Preview changes" },
      { command: "acfs-update --yes --quiet", description: "Automated mode" },
      { command: "acfs-update --help", description: "Full help" },
    ],

    tableHeaders: {
      command: "Command",
      description: "What it does",
    },
  },

  howOften: {
    title: "How Often to Update?",
    intro: "Recommendations:",

    frequencies: [
      {
        frequency: "Weekly",
        recommendation: "Full update including stack",
      },
      {
        frequency: "After issues",
        recommendation: "If something breaks, update first",
      },
      {
        frequency: "Before major work",
        recommendation: "Get latest agent versions",
      },
    ],
  },

  congratulations: {
    title: "Congratulations!",
    subtitle: "You've completed the ACFS onboarding!",
    description: "You now have:",

    achievements: [
      "A fully configured development VPS",
      "Three powerful coding agents",
      "A complete coordination toolstack",
      "The knowledge to use it all",
    ],

    finalMessage: "Go build something amazing!",
  },
};