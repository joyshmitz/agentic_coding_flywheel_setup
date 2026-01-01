/**
 * Wizard Messages - English (Default)
 *
 * All user-facing text for the wizard pages.
 * Organized by page slug for easy maintenance.
 */

// Common strings used across multiple pages
export const commonMessages = {
  buttons: {
    continue: "Continue",
    back: "Back",
    next: "Next",
    loading: "Loading...",
    copy: "Copy",
    copied: "Copied!",
  },
  time: {
    minutes: "min",
    hours: "hour",
  },
  alerts: {
    success: "Success",
    warning: "Warning",
    error: "Error",
    info: "Info",
    tip: "Tip",
  },
  navigation: {
    learningHub: "Learning Hub",
    home: "Home",
    setupWizard: "Setup Wizard",
  },
};

// rent-vps page
export const rentVpsMessages = {
  title: "Rent a VPS",
  timeEstimate: "~5 min",
  description: "Pick a VPS provider and rent a server. This is where your coding agents will live.",

  specChecklist: {
    title: "What to choose",
    specs: [
      { label: "OS", value: "Ubuntu 24.x or newer" },
      { label: "CPU", value: "12-16 vCPU" },
      { label: "RAM", value: "64GB recommended (48GB workable, 32GB minimum)" },
      { label: "Storage", value: "250GB+ NVMe SSD" },
      { label: "Price", value: "~$40-56/month for 64GB (month-to-month)" },
    ],
  },

  alerts: {
    beforeSignup: {
      title: "Before you sign up",
      creditCard: "Credit card required:",
      creditCardDesc: "Both providers require a valid credit card for signup. Prepaid cards may not work.",
      emailVerification: "Email verification:",
      emailVerificationDesc: "You'll need to verify your email address. Check your spam folder if you don't see the verification email.",
      identityNote: "Some providers (especially Contabo) may require additional identity verification for new accounts. This usually takes a few minutes but can occasionally take up to 24 hours.",
    },
    differentProvider: {
      title: "Using a different provider?",
      content: "Any provider with Ubuntu VPS and SSH key login works. Just make sure you can add your SSH public key during setup.",
    },
  },

  providers: {
    title: "Recommended providers",
    recommendedPlan: "Recommended plan:",
    whyProvider: "Why {name}:",
    goTo: "Go to {name}",
    contabo: {
      name: "Contabo",
      tagline: "Best value for high specs",
      pros: [
        "Best specs-to-price ratio on the market",
        "Cloud VPS 50 (64GB RAM, 16 vCPU): ~$56/month (US datacenter)",
        "Cloud VPS 40 (48GB RAM, 12 vCPU): ~$36/month (US datacenter)",
        "Prices are month-to-month, no commitment required",
      ],
      recommended: "Cloud VPS 50 (64GB RAM, 16 vCPU, ~$56/month US) - our top pick for serious multi-agent work",
    },
    ovh: {
      name: "OVH",
      tagline: "Reliable, good support",
      pros: [
        "Great EU and US data centers with anti-DDoS included",
        "VPS-5 (64GB RAM, 16 vCore): ~$40/month (no commitment)",
        "VPS-4 (48GB RAM, 12 vCore): ~$26/month (no commitment)",
        "Prices are month-to-month; longer commitments offer 5-15% discounts",
      ],
      recommended: "VPS-5 (64GB RAM, 16 vCore, ~$40/month) for best multi-agent performance",
    },
  },

  disclaimer: {
    title: "No affiliate deals, just honest recommendations",
    content: "I'm Jeffrey Emanuel, and I have zero financial relationship with Contabo, OVH, or any cloud provider. No affiliate links, no kickbacks, no sponsored content. I recommend these because I use them myself. They offer beefy machines (48GB+ RAM) at a fraction of what AWS, GCP, or Azure charge. On those big providers, equivalent specs would cost 3-5× more.",
  },

  guide: {
    vpsExplanation: {
      term: "a VPS (Virtual Private Server)",
      content: "A dedicated server in a data center that runs 24/7, even when your laptop is closed. You get root access and full control.",
      whyNeeded: "Why do you need one?",
      whyContent: "AI coding assistants work best on a dedicated server that's always on. Running them on your laptop would drain your battery and slow everything down. With a VPS, your AI assistants can work even when you're asleep.",
    },
    whyRam: {
      title: "Why 64GB RAM?",
      highlight: "⚡ This matters a lot!",
      description: "Each AI coding agent (like Claude Code) uses about 2GB of RAM when running. To get the full power of this approach, you'll want to run 10-20+ agents simultaneously. That's 20-40GB just for the agents, plus room for your development tools and databases.",
      options: {
        ram32: "32GB RAM: Absolute minimum. Can run 5-8 agents. Not recommended.",
        ram48: "48GB RAM: Workable but tight. Run 10+ agents. (~$26-36/month)",
        ram64: "64GB RAM: Just get this. Run 20+ agents with headroom. (~$40-56/month)",
      },
    },
  },
};

// ssh-connect page
export const sshConnectMessages = {
  title: "SSH into your VPS",
  timeEstimate: "~3 min",
  description: "Connect to your server using SSH.",

  alerts: {
    ipConfirmation: {
      title: "Your VPS IP address",
      content: "Make sure you have your IP address from the previous step.",
    },
    passwordWarning: {
      title: "Which password to use",
      correct: "Your VPS root password (from provider email or dashboard)",
      incorrect: [
        "NOT your computer login password",
        "NOT your provider account password",
      ],
    },
    typeYes: {
      content: "When you see 'Are you sure you want to continue connecting?', type 'yes' and press Enter.",
    },
    passwordHidden: {
      content: "When typing your password, nothing will appear on screen. This is normal - just type and press Enter.",
    },
  },

  troubleshooting: {
    title: "Common issues",
    connectionRefused: {
      name: "Connection refused",
      causes: ["VPS not fully booted yet", "Wrong IP address", "Firewall blocking port 22"],
      solutions: ["Wait 2-3 minutes and try again", "Double-check IP address", "Contact provider support"],
    },
    timeout: {
      name: "Connection timed out",
      causes: ["Network issues", "VPS not responding"],
      solutions: ["Check your internet connection", "Try again in a few minutes", "Check VPS status in provider dashboard"],
    },
    permissionDenied: {
      name: "Permission denied",
      causes: ["Wrong password", "Wrong username"],
      solutions: ["Double-check password from provider", "Try 'ubuntu' instead of 'root'"],
    },
  },

  guide: {
    sshExplanation: {
      term: "SSH (Secure Shell)",
      content: "A secure way to connect to remote computers over the internet. Think of it as a secure tunnel to your server.",
    },
  },
};

// accounts page
export const accountsMessages = {
  title: "Create accounts",
  timeEstimate: "~10 min",
  description: "Sign up for the services that power your AI coding environment.",

  tiers: {
    essential: {
      title: "Essential",
      description: "Required for basic functionality",
    },
    recommended: {
      title: "Recommended",
      description: "Significantly improves the experience",
    },
    optional: {
      title: "Optional",
      description: "Nice to have, can add later",
    },
  },

  services: {
    anthropic: {
      name: "Anthropic (Claude)",
      description: "Powers Claude Code, the primary AI coding agent",
      note: "API access required, not just chat",
    },
    openai: {
      name: "OpenAI",
      description: "Powers Codex CLI for additional AI assistance",
    },
    google: {
      name: "Google Cloud",
      description: "Powers Gemini CLI",
    },
    github: {
      name: "GitHub",
      description: "Code hosting and collaboration",
    },
  },

  alerts: {
    apiKeys: {
      title: "About API keys",
      content: "You'll need API keys from these services. Don't share them publicly - treat them like passwords.",
    },
  },
};

// Type definitions for wizard messages
export type WizardMessages = {
  common: typeof commonMessages;
  rentVps: typeof rentVpsMessages;
  sshConnect: typeof sshConnectMessages;
  accounts: typeof accountsMessages;
};
