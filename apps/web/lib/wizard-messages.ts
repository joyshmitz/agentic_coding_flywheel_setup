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
      justGet64: "Just get 64GB. You're spending $400+/month on AI subscriptions, so the extra $14-20/month for 64GB vs 48GB is noise. Don't bottleneck a $400+/month investment to save $20. The headroom matters when you're running 15+ agents plus databases, build tools, and language servers.",
    },
    vpsPerformance: {
      title: "The Reality of VPS Performance",
      intro: "A VPS isn't a dedicated machine. It's a slice of a larger physical server shared with other customers. Understanding this helps you set realistic expectations:",
      sharedResources: {
        title: "Shared resources:",
        content: "Your \"16 vCPU\" VPS shares the physical CPU with other tenants. When neighbors run heavy workloads, your performance dips. This is normal and expected.",
      },
      overselling: {
        title: "Overselling is common:",
        content: "Providers bet that not everyone uses their full allocation simultaneously. When you're sleeping, they effectively reuse that capacity. This is how they offer low prices, and why performance can be inconsistent.",
      },
      dedicated: {
        title: "Dedicated servers exist:",
        content: "If you want guaranteed, consistent performance, bare-metal dedicated servers are available, but they cost 3-10× more. For most users, VPS is the right price/performance tradeoff.",
      },
      anotherReason: "This is another reason to get 64GB: You won't always get the full performance you'd expect from those specs. Having headroom means your agents keep running smoothly even when the underlying hardware is contested. Think of the extra RAM as insurance against noisy neighbors.",
    },
    fullInvestment: {
      title: "The Full Investment",
      intro: "To use the agentic coding approach, you'll need subscriptions to AI services in addition to your VPS. Here's what the full setup looks like:",
      claudeMax: {
        title: "Claude Max ($200/month)",
        content: "Unlimited Claude Code usage. For serious multi-agent workflows, consider 2 accounts ($400/month) to maximize parallel capacity.",
      },
      chatgptPro: {
        title: "ChatGPT Pro ($200/month): Critical for Planning",
        content: "Access to GPT 5.2 Pro with Extended Thinking in the ChatGPT webapp. This is the key to making this approach work: you use it to write, revise, and iterate on comprehensive plan documents in markdown. Everything depends on having an extremely detailed, granular plan, which you then convert into trackable tasks using Beads. The extended thinking capability is unmatched for this kind of strategic planning work.",
      },
      total: {
        title: "Total for full setup:",
        content: "VPS (~$56) + Claude Max x2 ($400) + ChatGPT Pro ($200) = ~$656/month",
        perspective: "This sounds like a lot, but compare it to hiring: a junior developer in the US costs $100k+/year (~$8,300+/month). For less than 10% of that, you get AI agents working 24/7 with no vacation, no onboarding, and instant scaling.",
      },
      realistic: {
        title: "⚠️ Realistic minimum investment:",
        content: "VPS (~$40-56/month for 64GB) + Claude Max ($200/month) + ChatGPT Pro ($200/month) = ~$440-456/month. The $20/month Claude Pro tier does NOT have enough capacity for agentic workflows; you'll hit rate limits almost immediately. Claude Max is required for execution, and ChatGPT Pro's extended thinking is essential for creating the detailed plan documents that make this approach work.",
        perspective: "Perspective: A junior US developer costs ~$8k+/month. This is ~5% of that, for AI agents that work 24/7.",
      },
    },
    whichProvider: {
      title: "Which provider should I choose?",
      intro: "Both providers we recommend are great. Here's how to choose:",
      contabo: "Contabo: Our top recommendation! Best specs for the price. Cloud VPS 50 (64GB RAM, ~$56/month US) is our top pick. Cloud VPS 40 (48GB RAM, ~$36/month US) for budget. Interface is basic but functional. Usually activates within minutes (occasionally up to ~1 hour).",
      ovh: "OVH: Great alternative with polished interface. VPS-5 (64GB RAM, ~$40/month) or VPS-4 (48GB RAM, ~$26/month). Great EU and US data centers. Typically activates within minutes.",
      pricingNote: "About pricing: All prices shown are month-to-month with no commitment. Both providers offer 5-20% discounts if you prepay for 6-12 months, but we recommend starting monthly so you can cancel anytime. Contabo US pricing includes the ~$10/month US datacenter fee.",
    },
    contaboSteps: {
      title: "Step-by-Step: Signing Up (Contabo Example)",
      step1: {
        title: "Go to Contabo's website",
        content: "Click on \"Contabo\" above, or go to contabo.com/en-us/vps",
        caption: "Contabo VPS page (US) — you'll pick a plan from here.",
      },
      step2: {
        title: "Choose a plan with enough resources",
        content: "Look for a plan with 12+ vCPU and 48GB+ RAM (32GB absolute minimum). NVMe storage is standard on all recommended plans. Click \"Configure\" or \"Order\".",
        caption: "Plans list — pick Cloud VPS 50 (64GB) or Cloud VPS 40 (48GB).",
      },
      step3: {
        title: "Configure your VPS",
        region: "Region: Choose closest to you (US or EU)",
        storage: "Storage: Keep the default NVMe option",
        image: "Image: Select \"Ubuntu 25.10\" or newest available",
        note: "If 25.10 isn't offered, Ubuntu 24.04 LTS is fine — ACFS upgrades to 25.10 automatically.",
        caption: "Configure page — choose region + Ubuntu image, then continue checkout.",
      },
      step4: {
        title: "Create an account",
        content: "Click \"Sign up\" or \"Register\". You'll need:",
        items: ["An email address", "A password (make it strong!)", "Your name and address"],
      },
      step5: {
        title: "Add payment method",
        content: "Contabo accepts credit cards and PayPal. You'll be charged for the first month upfront.",
        tip: "Tip: Monthly billing is fine to start. You can switch to annual billing later for a small discount.",
      },
      step6: {
        title: "Complete the order",
        content: "Review your order and complete checkout. Contabo activates servers quickly, usually within minutes (occasionally up to ~1 hour).",
      },
    },
    ovhSteps: {
      title: "Step-by-Step: Signing Up (OVH Example)",
      step1: {
        title: "Go to OVH's VPS page",
        content: "Click on \"OVH\" above, or go to us.ovhcloud.com/vps",
        caption: "OVH VPS page (US) — pick a VPS tier to start ordering.",
      },
      step2: {
        title: "Choose VPS-5 (64GB) or VPS-4 (48GB)",
        intro: "We recommend:",
        vps5: "VPS-5: 64GB RAM (best for multi-agent work)",
        vps4: "VPS-4: 48GB RAM (budget option)",
        action: "Click \"Order\" to continue.",
        caption: "Plans list — select VPS-5 (64GB) or VPS-4 (48GB), then click Order.",
      },
      step3: {
        title: "Configure your order",
        intro: "During configuration, look for:",
        image: "Image/OS: Ubuntu 25.10 (or latest available)",
        region: "Region: Closest to you (US-East/US-West/EU)",
        auth: "Authentication: Password (skip SSH keys for now)",
        note: "If Ubuntu 25.10 isn't available, Ubuntu 24.04 LTS is fine — ACFS upgrades automatically.",
        caption: "Order flow — pick Ubuntu + region, then continue to checkout.",
      },
      step4: {
        title: "Create an account + pay",
        content: "OVH will prompt you to create an account and add a payment method. Once the order completes, activation is usually instant.",
      },
    },
    understandingSpecs: {
      title: "Understanding the specs",
      intro: "When choosing a plan, you'll see terms like vCPU, RAM, and NVMe. Here's what they mean:",
      vcpu: "vCPU (12+): The \"brain\" of the computer. More = faster. 12 vCPU is comfortable for multi-agent work, 16 is great.",
      ram: "RAM (48-64 GB): Short-term memory. This is crucial for running multiple AI agents. 32GB is absolute minimum; 48GB+ is recommended.",
      storage: "Storage (250GB+ NVMe): Long-term storage for files, databases, and AI model caches. NVMe is fast. 250GB is a good starting point.",
      ubuntu: "Ubuntu: The operating system we'll install. It's like Windows or macOS, but for servers. It's free and widely used.",
    },
    backupStrategy: {
      title: "Backup Strategy",
      intro: "Both providers offer VPS snapshots (~$2-5/month) for quick restore points. But for code, GitHub is your real backup:",
      pushRegularly: "Push to GitHub regularly. If your VPS dies, your code is safe. We install the gh CLI for easy GitHub access.",
      openSource: "Open-source = free everything. Public repos, unlimited Actions, GitHub Pages, all free.",
      privateProjects: "Private projects: Free tier works for individuals. Teams or heavy CI/CD may need GitHub Pro ($4/month) or Team ($4/user/month) for more Actions minutes.",
    },
    tldr: "TL;DR: Get Contabo Cloud VPS 50 (64GB RAM, 16 vCPU, ~$56/month US). Don't overthink it. 64GB is the right choice when you're investing $400+/month in AI subscriptions. Contabo can take up to an hour to provision (usually minutes); OVH is typically faster.",
    caution: "Keep your account credentials safe! Write down your login email and password somewhere secure. You'll need them to manage your VPS later.",
    accountCreated: {
      title: "Account created?",
      content: "Next, you'll create and launch your actual VPS instance.",
    },
  },
};

// ssh-connect page
export const sshConnectMessages = {
  title: "SSH into your VPS",
  timeEstimate: "~1 min",
  description: "Connect to your new VPS for the first time.",

  commands: {
    runThis: "Run this command",
    connectAsRoot: "Connect as root with password",
    connectAsUbuntu: "Connect as ubuntu user (fallback)",
    ifRootFails: "If \"root\" doesn't work, try ubuntu:",
    someProvidersDisable: "Some providers disable root login. If you get \"Permission denied\" with root, try connecting as ubuntu:",
  },

  alerts: {
    connectingTo: "Connecting to:",
    passwordWarning: {
      title: "⚠️ Which password to use",
      intro: "You'll need the VPS root password — this is NOT the same as your VPS provider account password!",
      correct: "✓ Correct:",
      correctDesc: "VPS root password — the password you set when creating this specific VPS, or the one your provider emailed you",
      wrong: "✗ Wrong:",
      wrongDesc: "Your OVH/Contabo account login password",
      cantFind: "If you can't find it, check your email or your VPS provider's control panel for the VPS-specific password.",
    },
  },

  firstConnection: {
    title: "What you'll see first",
    intro: "The first time you connect, you'll see a scary-looking security message. This is completely normal! It just means SSH hasn't seen this server before.",
    youllSee: "You'll see something like:",
    looksAlarming: "This looks alarming, but it's just SSH confirming you want to trust this new server.",
    typeYes: {
      title: "✓ Type 'yes' and press Enter",
      content: "This is safe! You're telling SSH to remember this server. Type the full word yes (not just \"y\"), then press Enter.",
    },
  },

  passwordPrompt: {
    title: "Then enter your password",
    intro: "After typing \"yes\", you'll be asked for your password:",
    youllSee: "You'll see:",
    hiddenTitle: "The password won't appear as you type",
    hiddenContent: "When you type your password, nothing will show on screen — no dots, no asterisks, nothing. This is a security feature, not a bug! Just type your password and press Enter.",
  },

  fallback: {
    title: "If \"root\" doesn't work, try ubuntu:",
    intro: "Some providers disable root login. If you get \"Permission denied\" with root, try connecting as ubuntu:",
  },

  successIndicator: {
    title: "You're connected when you see:",
    description: "You should see a prompt with your username and \"vps\" or the server hostname. The \"#\" means you're logged in as root.",
  },

  verification: {
    title: "Verify you're on the VPS",
    intro: "Try this command to confirm you're controlling the VPS, not your laptop:",
    commandDesc: "Show this computer's name",
    youShouldSee: "You should see something like:",
    notYourLaptop: "(Your VPS hostname — not your laptop's name like \"MacBook-Pro\" or \"DESKTOP-ABC123\")",
    nowRemote: "You're now remote-controlling the VPS! Everything you type happens on the VPS. If you type ls, you see VPS files. If you install something, it installs on the VPS. Your laptop is just the remote control.",
  },

  troubleshooting: {
    title: "Having trouble?",
    connectionRefused: {
      name: "Connection refused",
      causes: ["VPS is still starting up", "SSH service not running on the VPS", "Firewall blocking port 22"],
      solutions: ["Wait 2-5 minutes for the VPS to fully boot", "Check your VPS provider's status page", "Use the VPS console in your provider's control panel to check"],
    },
    timeout: {
      name: "Connection timed out",
      causes: ["Wrong IP address", "VPS is offline", "Network issue between you and the VPS"],
      solutions: ["Double-check the IP address in your provider's control panel", "Try pinging the IP: ping YOUR_IP", "Check if your VPS is running in the control panel"],
    },
    permissionDenied: {
      name: "Permission denied",
      causes: ["Wrong password", "Password authentication might be disabled", "Trying wrong username"],
      solutions: ["Double-check the password from your provider", "Some providers email the password - check your inbox", "Make sure you're using 'root' as the username"],
    },
    hostKeyFailed: {
      name: "Host key verification failed",
      causes: ["You've connected to this IP before with a different VPS", "The server was reinstalled"],
      solutions: ["Remove the old key: ssh-keygen -R YOUR_IP", "Then try connecting again"],
    },
  },

  guide: {
    sshExplanation: {
      term: "SSH (Secure Shell)",
      content: "SSH is a way to securely connect to another computer over the internet. It's like making a phone call to your VPS. Once connected, everything you type appears on the VPS, not your local computer.",
      remote: "When you \"SSH into\" a computer, you're essentially remote-controlling it through text commands.",
    },
    stepByStep: {
      title: "Step-by-Step Connection Guide",
      step1: {
        title: "Open your terminal",
        content: "Open your terminal app (Ghostty, WezTerm, Windows Terminal, or your Linux terminal emulator).",
      },
      step2: {
        title: "Copy the SSH command",
        content: "Look at the gray command box above. Click the copy button on the right side (it looks like two overlapping squares).",
      },
      step3: {
        title: "Paste the command",
        content: "Click inside your terminal window, then paste:",
        mac: "Mac: ⌘ + V",
        linux: "Linux: Ctrl + Shift + V",
        windows: "Windows: Right-click inside the terminal, or Ctrl + V",
      },
      step4: {
        title: "Press Enter",
        content: "Press the Enter key to run the command.",
      },
      step5: {
        title: "Say 'yes' to the security question",
        content: "You'll see a scary-looking message about \"authenticity of host\" and a \"fingerprint\". This is normal for first-time connections!",
        action: "Type yes (spelled out, not just \"y\") and press Enter.",
      },
      step6: {
        title: "Enter your password",
        content: "Now it will ask for your password. Type the password you set during VPS creation (or the one your provider emailed you).",
        important: "Important: The password won't show as you type—no dots or asterisks. Just type it and press Enter. This is normal security behavior!",
      },
      step7: {
        title: "You're connected!",
        content: "If successful, you'll see a new prompt like:",
        prompt: "root@vps:~#",
        explanation: "The \"root@vps\" part means you're now controlling the VPS! Everything you type from now on runs on the VPS, not your laptop.",
      },
    },
    understanding: {
      title: "Understanding What You See",
      intro: "After connecting, your terminal looks different because you're now \"inside\" the VPS:",
      root: "root@ is your username on the VPS (you're the admin!)",
      vps: "vps is the VPS hostname (might be different)",
      tilde: "~ means you're in your \"home\" folder",
      hash: "# means you're logged in as root (vs $ for regular users)",
    },
    tip: {
      disconnect: "To disconnect from the VPS and return to your local computer, type exit and press Enter. You can always reconnect using the same SSH command.",
    },
    caution: {
      permissionDenied: "\"Permission denied\" error? Double-check your password. Some providers email the password instead of letting you set it—check your inbox. If you're trying root and it doesn't work, try the \"ubuntu\" command shown above.",
    },
    learnMore: {
      title: "Want to learn more about SSH?",
      content: "Check out the SSH & Persistence lesson in the Learning Hub →",
    },
  },

  continueButton: "I'm connected, continue",
};

// accounts page
export const accountsMessages = {
  title: "Set up your accounts",
  timeEstimate: "~5-10 min",
  description: "Create accounts for the services you'll use with your VPS. Do this now while the installer runs later.",

  tierMeta: {
    essential: {
      title: "Essential (Do these now)",
      description: "Two accounts you need to start your first project.",
    },
    recommended: {
      title: "Recommended (After your first project)",
      description: "Add more AI agents when you want extra coverage.",
    },
    optional: {
      title: "Optional (When you need them)",
      description: "Deployment, databases, and infrastructure extras.",
    },
  },

  alerts: {
    subscriptionCosts: {
      title: "Subscription costs ahead",
      intro: "Some AI coding agents require expensive subscriptions to use after installation:",
      claudeCode: "Claude Code: Requires Claude Max ($200/mo)",
      codexCli: "Codex CLI: Requires ChatGPT Pro ($200/mo)",
      geminiCli: "Gemini CLI: Requires Gemini Advanced (~$20/mo)",
      dontNeedAll: "You don't need all of them! Start with one agent (Claude Code is recommended) and add others later if you want different AI perspectives.",
    },
    googleSso: {
      title: "Quick signup with Google",
      content: "{count} of {total} services support Google SSO. Use the same Google account for all of them to streamline your setup.",
    },
  },

  progress: {
    essentialAccounts: "Essential accounts:",
  },

  serviceCard: {
    authenticated: "Authenticated",
    paidPlanRequired: "Paid plan required",
    paidPlanNote: "Paid plan needed to actually use this service on your VPS.",
    signUpWithGoogle: "Sign up with Google",
    otherSignupOptions: "Other signup options",
    signUp: "Sign up",
    docs: "Docs",
    afterInstall: "After install:",
  },

  guide: {
    whyAccounts: {
      term: "Why do I need all these accounts?",
      content: "You don't need all of them right now! We've organized them into three tiers:",
      essential: "Essential (do now): GitHub for code backup and Claude Code for AI assistance. These two are all you need to start.",
      recommended: "Recommended (after first project): Add Codex CLI and Gemini CLI for more AI options with different perspectives.",
      optional: "Optional (when you need them): Cloud platforms for deployment, databases, and VPN access. Set these up when your project needs them.",
    },
    howToSignUp: {
      title: "How to Sign Up Efficiently",
      step1: {
        title: "Use Google SSO when available",
        content: "Click the green \"Sign up with Google\" button. This is fastest and you won't need to remember extra passwords.",
      },
      step2: {
        title: "Check the box after signing up",
        content: "After you create each account, check the box next to it. This helps you track your progress.",
      },
      step3: {
        title: "Focus on the Essential tier first",
        content: "Knock out the two essential accounts. You can leave recommended and optional services for later.",
      },
      step4: {
        title: "You can come back later",
        content: "Don't want to create all accounts now? That's fine! Click \"Skip for now\" and create them after installation.",
      },
    },
    tip: "Pro tip: Open each signup link in a new tab (Cmd+click on Mac, Ctrl+click on Linux/Windows). That way you can create multiple accounts quickly without losing your place here.",
    learnMore: {
      title: "Need help with agent logins?",
      content: "See the Agent Commands lesson for auth tips and shortcuts →",
    },
  },

  skipNote: {
    title: "Don't want to create accounts now?",
    content: "That's completely fine! You can skip this step and create accounts after installation. The ACFS installer will still install all the tools—you'll just need to authenticate them later when you're ready to use them.",
  },

  buttons: {
    skipForNow: "Skip for now",
    continueToPreflightCheck: "Continue to pre-flight check",
  },
};

// Type definitions for wizard messages
export type WizardMessages = {
  common: typeof commonMessages;
  rentVps: typeof rentVpsMessages;
  sshConnect: typeof sshConnectMessages;
  accounts: typeof accountsMessages;
};
