/**
 * Agents Login Lesson Messages - English (Default)
 *
 * All user-facing text for the agents login lesson component.
 * Organized by component structure for easy maintenance.
 */

export const agentsLoginLessonMessages = {
  goalBanner: {
    content: "Login to your coding agents and understand the shortcuts.",
  },

  threeAgents: {
    title: "The Three Agents",
    description: "You have three powerful coding agents installed, each from a different AI company:",

    agents: {
      claudeCode: {
        name: "Claude Code",
        command: "claude",
        alias: "cc",
        company: "Anthropic",
      },
      codexCli: {
        name: "Codex CLI",
        command: "codex",
        alias: "cod",
        company: "OpenAI",
      },
      geminiCli: {
        name: "Gemini CLI",
        command: "gemini",
        alias: "gmi",
        company: "Google",
      },
    },
  },

  whatAliasesDo: {
    title: "What The Aliases Do",
    description: "The aliases are configured for maximum power (vibe mode):",

    aliases: {
      claudeCode: {
        alias: "cc",
        name: "Claude Code",
        code: `NODE_OPTIONS="--max-old-space-size=32768" \\
  ENABLE_BACKGROUND_TASKS=1 \\
  claude --dangerously-skip-permissions`,
        features: [
          "Extra memory for large projects",
          "Background task support",
          "No permission prompts",
        ],
      },
      codexCli: {
        alias: "cod",
        name: "Codex CLI",
        code: "codex --dangerously-bypass-approvals-and-sandbox",
        features: [
          "Bypass safety prompts",
          "No approval/sandbox checks",
        ],
      },
      geminiCli: {
        alias: "gmi",
        name: "Gemini CLI",
        code: "gemini --yolo",
        features: ["YOLO mode (no confirmations)"],
      },
    },
  },

  firstLogin: {
    title: "First Login",
    description: "Each agent needs to be authenticated once:",

    loginSteps: {
      claudeCode: {
        agent: "Claude Code",
        command: "claude auth login",
        description: "Follow the browser link to authenticate with your Anthropic account.",
      },
      codexCli: {
        agent: "Codex CLI",
        command: "codex login",
        description: "Follow the browser prompts to authenticate with your ChatGPT Pro/Plus/Team account.",
      },
      geminiCli: {
        agent: "Gemini CLI",
        command: "gemini",
        description: "Follow the prompts to authenticate with your Google account.",
      },
    },

    openaiWarning: {
      title: "OpenAI Has TWO Account Types",
      chatgptType: {
        title: "ChatGPT (Pro/Plus/Team)",
        items: [
          "For Codex CLI, ChatGPT web",
          "Auth via OAuth (codex login)",
          "Get at chat.openai.com",
        ],
      },
      apiType: {
        title: "API (pay-as-you-go)",
        items: [
          "For OpenAI API, libraries",
          "Uses OPENAI_API_KEY env var",
          "Get at platform.openai.com",
        ],
      },
      description: "Codex CLI uses ChatGPT OAuth, not API keys. If you have an OPENAI_API_KEY, that's for the API—different system!",
      troubleshooting: "If login fails: Check ChatGPT Settings → Security → \"API/Device access\"",
    },
  },

  backupCredentials: {
    title: "Backup Your Credentials!",
    description: "After logging in, immediately back up your credentials:",
    instructionsAfter: "Now you can switch accounts later with:",
    tipBoxContent: "This is incredibly useful when you hit rate limits! Switch to a backup account and keep working.",
  },

  testAgents: {
    title: "Test Your Agents",
    description: "Try each one to verify they're working:",
  },

  quickTips: {
    title: "Quick Tips",
    tips: [
      {
        title: "Start simple",
        description: "Let agents do small tasks first",
      },
      {
        title: "Be specific",
        description: "Clear instructions get better results",
      },
      {
        title: "Check the output",
        description: "Agents can make mistakes",
      },
      {
        title: "Use multiple agents",
        description: "Different agents have different strengths",
      },
    ],
  },

  practiceNow: {
    title: "Practice This Now",
    description: "Let's verify your agents are ready:",
    comment1: "Check which agents are installed",
    comment2: "Check your agent credential backups",
    comment3: "If you haven't logged in yet, start with Claude:",
    tipBoxContent: "If you set up your accounts during the wizard (Step 7: Set Up Accounts), you already have the credentials ready—just run the login commands!",
  },
};