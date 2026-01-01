/**
 * Welcome Lesson Messages - English (Default)
 *
 * All user-facing text for the welcome lesson component.
 * Organized by component structure for easy maintenance.
 */

export const welcomeLessonMessages = {
  goalBanner: {
    content: "Understand what you have and what you're about to learn.",
  },

  whatYouNowHave: {
    title: "What You Now Have",
    congratulations: "Congratulations! You've just set up a fully-armed agentic engineering workstation.",
    highlight: "agentic engineering workstation",
    installedIntro: "Here's what's installed on your VPS:",

    features: {
      beautifulTerminal: {
        title: "Beautiful Terminal",
        description: "zsh, Oh My Zsh, and Powerlevel10k for a stunning shell experience",
      },
      modernCliTools: {
        title: "Modern CLI Tools",
        description: "lsd, bat, ripgrep, fzf, and zoxide for supercharged productivity",
      },
      languageRuntimes: {
        title: "Language Runtimes",
        description: "JavaScript (Bun), Python (uv), Rust, and Go ready to go",
      },
      threeCodingAgents: {
        title: "Three Coding Agents",
        description: "Claude Code (cc), Codex CLI (cod), and Gemini CLI (gmi)",
      },
    },

    agents: {
      claudeCode: {
        name: "Claude Code",
        shortcut: "cc",
      },
      codexCli: {
        name: "Codex CLI",
        shortcut: "cod",
      },
      geminiCli: {
        name: "Gemini CLI",
        shortcut: "gmi",
      },
    },
  },

  mentalModel: {
    title: "The Mental Model",
    intro: "Think of your setup like this:",
    laptopExplanation: "Your laptop is just the remote control. The real work happens on the VPS.",
    connectionExplanation: "If your SSH connection drops? No problem. Your work continues in tmux.",

    diagram: {
      yourLaptop: {
        label: "Your Laptop",
        sublabel: "The Cockpit",
      },
      yourVps: {
        label: "Your VPS",
        sublabel: "The Engine Room",
      },
      sshConnection: "SSH",

      vpsComponents: {
        tmux: {
          label: "tmux",
          sublabel: "Sessions",
        },
        agents: {
          label: "Agents",
          sublabel: "Workers",
        },
        ntm: {
          label: "NTM",
          sublabel: "Orchestrator",
        },
      },
    },
  },

  whatYoullLearn: {
    title: "What You'll Learn",

    steps: [
      {
        title: "Linux basics",
        description: "Navigating the filesystem with confidence",
      },
      {
        title: "SSH fundamentals",
        description: "Staying connected to your VPS",
      },
      {
        title: "tmux essentials",
        description: "Persistent sessions that survive disconnects",
      },
      {
        title: "Agent commands",
        description: "Talking to Claude, Codex, and Gemini",
      },
      {
        title: "NTM mastery",
        description: "Orchestrating multiple agents at once",
      },
      {
        title: "The flywheel workflow",
        description: "Putting it all together for maximum velocity",
      },
    ],
  },

  tipBox: {
    content: "If you ever break something, you can delete this VPS and re-run ACFS. That's the beauty of VPS development!",
  },
};