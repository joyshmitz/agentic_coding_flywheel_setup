/**
 * Home Page Messages - English (Default)
 *
 * All user-facing text for the home/landing page.
 */

export const homeMessages = {
  nav: {
    github: "GitHub",
    learn: "Learn",
    getStarted: "Get Started",
  },

  hero: {
    badge: "Zero to agentic coding in 30 minutes",
    title: {
      line1: "AI Agents",
      line2: "Coding For You",
    },
    subtitle:
      "Transform a fresh cloud server into a fully-configured agentic coding environment. Claude Code, OpenAI Codex, Google Gemini: all pre-configured with 30+ modern developer tools. All totally free and open-source.",
    cta: {
      primary: "Start the Wizard",
      secondary: "View on GitHub",
    },
    stats: {
      tools: { value: "30+", label: "Tools Installed" },
      agents: { value: "3", label: "AI Agents" },
      time: { value: "~30m", label: "Setup Time" },
    },
  },

  terminal: {
    prompt: "ubuntu@vps ~",
    lines: [
      { type: "command", text: "curl -fsSL https://agent-flywheel.com/install | bash" },
      { type: "output", text: "▸ Detecting Ubuntu 24.04... ✓" },
      { type: "output", text: "▸ Installing zsh + oh-my-zsh + powerlevel10k..." },
      { type: "output", text: "▸ Installing bun, uv, rust, go..." },
      { type: "output", text: "▸ Installing Claude Code, Codex CLI, Gemini CLI..." },
      { type: "output", text: "▸ Configuring tmux, ripgrep, lazygit..." },
      { type: "output", text: "▸ Setting up Dicklesworthstone stack..." },
      { type: "success", text: "✓ Setup complete! Run 'onboard' to get started." },
    ],
  },

  toolsTicker: {
    label: "Powered by",
  },

  features: {
    title: "Everything You Need",
    subtitle:
      "A single curl command installs and configures your complete agentic coding environment",
    items: [
      {
        title: "One-liner Install",
        description: "A single command transforms your VPS. No manual configuration, no dependency hell.",
      },
      {
        title: "Three AI Agents",
        description:
          "Claude Code, Codex CLI, and Gemini CLI, all configured with optimal settings for coding.",
      },
      {
        title: "Idempotent & Safe",
        description:
          "Re-run anytime. Idempotent phases resume on failure. SHA256 verified installers.",
      },
      {
        title: "Vibe Mode",
        description:
          "Passwordless sudo with dangerous flags enabled for maximum velocity on throwaway VPS environments.",
      },
      {
        title: "Modern Shell",
        description:
          "zsh + oh-my-zsh + powerlevel10k with lsd, atuin, fzf, and zoxide; developer UX perfected.",
      },
      {
        title: "Interactive Tutorial",
        description:
          "Run 'onboard' after setup for guided lessons from Linux basics to full agentic workflows.",
        linkText: "Preview lessons",
      },
    ],
  },

  flywheel: {
    badge: "Ecosystem",
    title: "The Agentic Coding Flywheel",
    subtitle: "Eight interconnected tools that transform multi-agent workflows. Each tool enhances the others.",
    cta: "Explore the Flywheel",
    tools: [
      { name: "NTM", desc: "Agent Orchestration" },
      { name: "Mail", desc: "Coordination" },
      { name: "UBS", desc: "Bug Scanning" },
      { name: "BV", desc: "Task Graph" },
      { name: "CASS", desc: "Search" },
      { name: "CM", desc: "Memory" },
      { name: "CAAM", desc: "Auth" },
      { name: "SLB", desc: "Safety" },
    ],
  },

  workflow: {
    title: "13 Steps to Liftoff",
    subtitle: 'The wizard guides you from "I have a laptop" to "AI agents are coding for me"',
    cta: "Start Your Journey",
    steps: [
      "Choose OS",
      "Install Terminal",
      "Generate SSH Key",
      "Rent VPS",
      "Create Instance",
      "SSH Connect",
      "Set Up Accounts",
      "Pre-Flight Check",
      "Run Installer",
      "Reconnect",
      "Verify Key",
      "Status Check",
      "Launch Onboard",
    ],
  },

  whyVps: {
    badge: "The Foundation",
    title: "Why a VPS?",
    subtitle: "Agentic workflows need dedicated compute. A VPS gives you a 24/7 server that's always ready.",
    cta: "Check If This Is For You",
    items: [
      {
        title: "Not Your Laptop",
        description:
          "AI agents consume significant RAM and CPU. Running them locally drains your battery and slows everything down.",
        detail: "Each agent uses ~2GB RAM. With 10+ agents, you need 48-64GB—more than most laptops have.",
      },
      {
        title: "Not AWS/GCP/Azure",
        description:
          "Cloud giants charge by the hour and make billing unpredictable. A dedicated VPS is simpler and cheaper.",
        detail: "A 64GB VPS costs ~$40-56/month flat. Equivalent cloud resources would cost 3-5x more.",
      },
      {
        title: "Works While You Sleep",
        description: "Your VPS runs 24/7. Queue up tasks before bed, wake up to completed code.",
        detail: "AI agents can refactor, test, and iterate autonomously—compounding progress overnight.",
      },
    ],
  },

  isThisForYou: {
    badge: "Honest Assessment",
    title: "Is This For You?",
    subtitle: "We believe in radical transparency. Here's who will get the most value from this setup.",
    forYou: {
      title: "This is for you if...",
      items: [
        {
          text: "You want AI to write real, production code for you",
          detail: "Full implementations, not just suggestions",
        },
        {
          text: "Sites like Lovable.dev are too limiting for what you want to build",
          detail: "You need full control and complexity",
        },
        {
          text: "You're willing to invest ~$500/month in AI subscriptions",
          detail: "Claude Max + ChatGPT Pro + VPS hosting",
        },
        {
          text: "You can follow step-by-step instructions",
          detail: "No coding experience required, just patience",
        },
      ],
    },
    notForYou: {
      title: "This is not for you if...",
      items: [
        {
          text: "You want a completely free solution",
          detail: "AI subscriptions have real costs",
        },
        {
          text: "You only want occasional AI help with snippets",
          detail: "This is for full agentic workflows",
        },
        {
          text: "You're looking for mobile-first development",
          detail: "This requires a desktop or laptop",
        },
        {
          text: "You need enterprise compliance out of the box",
          detail: "This is for individual developers",
        },
      ],
    },
    cta: "See Full Cost Breakdown",
  },

  pricing: {
    badge: "Investment",
    title: "What Does This Cost?",
    subtitle:
      "Complete transparency: here's what you'll actually pay each month. The tools are free; you pay for the AI services.",
    items: [
      {
        name: "Cloud VPS",
        price: "$40–56",
        period: "/month",
        description: "64GB RAM Ubuntu server (Contabo, OVH)",
        note: "64GB RAM for 10+ agents",
      },
      {
        name: "Claude Max",
        price: "$200",
        period: "/month",
        description: "Anthropic's Claude Code CLI",
        note: "$400 for power users (2 accounts)",
      },
      {
        name: "ChatGPT Pro",
        price: "$200",
        period: "/month",
        description: "ChatGPT 5.2 Pro for extended thinking planning",
        note: "Essential for plan documents",
      },
    ],
    total: {
      label: "Estimated Monthly Total",
      range: "$440 – $656",
      period: "/month",
      benefits: [
        "All tools & setup scripts included free",
        "Cancel AI subscriptions anytime",
        "No hidden fees or upsells",
      ],
    },
    comparison:
      "Consider: a junior developer costs $1,000+/month. For under $700, you get 10+ AI agents working 24/7, writing code while you sleep.",
    cta: "Start Your Setup",
  },

  about: {
    badge: "About",
    title: "Who Made This? Why Is It Free?",
    intro: {
      line1:
        "I'm Jeffrey Emanuel, and I built this because I was being inundated with requests from friends, older relatives, and strangers on the internet asking me to help them get started with using AI for software development.",
      line2:
        'I wanted one resource I could point people to that would help them "from soup to nuts" in getting set up; even if they have almost no computer expertise, just motivation and desire.',
      line3:
        "This is also a platform to share my suite of totally free, open-source agentic coding tools. I originally built these for myself to move faster in my consulting work with Private Equity and Hedge Funds. Now I want to help others be more productive and creative too.",
    },
    links: {
      twitter: "Follow me on X",
      github: "View my projects",
    },
  },

  footer: {
    links: {
      github: "GitHub",
      learn: "Learning Hub",
      ntm: "NTM",
      agentMail: "Agent Mail",
    },
    createdBy: "Created by",
    author: "Jeffrey Emanuel",
  },
};
