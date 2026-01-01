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

// create-vps page
export const createVpsMessages = {
  title: "Create your VPS instance",
  timeEstimate: "~5 min",
  description: "You have an account with your VPS provider. Now let's create the actual server (the VPS instance) that will run your development environment.",

  checklist: {
    title: "Setup checklist",
    subtitle: "Check each item as you complete it to unlock the next step",
    progress: "{done} of {total}",
    items: {
      ubuntu: "Selected Ubuntu 24.04+ (25.10 preferred)",
      region: "Picked a region close to me",
      password: "Set a root password (or received one via email)",
      created: "Created the VPS and waited for it to start",
      copiedIp: "Copied the IP address",
    },
  },

  regionTip: {
    title: "Why region matters",
    content: "Closer servers = faster response times. When you type, commands reach your VPS faster. When AI generates code, it appears on your screen faster.",
    regions: {
      usa: { label: "USA:", hint: "Pick US-West (California) or US-East (Virginia)" },
      europe: { label: "Europe:", hint: "Pick Germany, France, or Finland" },
      asiaPacific: { label: "Asia-Pacific:", hint: "Pick Singapore, Sydney, or Tokyo" },
      unsure: { label: "Unsure?", hint: "Any region works fine—pick one!" },
    },
  },

  providerHelp: {
    title: "Need help with your provider?",
    specificSteps: "{name} specific steps",
    contabo: {
      steps: [
        "Go to contabo.com/en-us/vps and select Cloud VPS 50 (64GB RAM, ~$56/month) or Cloud VPS 40 (48GB, ~$36/month)",
        "Click \"Configure\" and select your preferred region (US recommended for best latency)",
        "Under \"Image\", select Ubuntu 25.10 (or newest available; 24.04 LTS is fine too)",
        "Set a root password when prompted (save it - you'll need it once)",
        "Complete checkout (servers activate within minutes, occasionally up to 1 hour)",
        "Go to \"Your services\" > \"VPS control\" to find your IP address",
      ],
      screenshotCaption: "Contabo order page — select region + Ubuntu image here.",
    },
    ovh: {
      steps: [
        "Click \"Order\" on VPS-5 (64GB RAM, ~$40/month) or VPS-4 (48GB, ~$26/month)",
        "Under \"Image\", select Ubuntu 25.10 (or latest available)",
        "Pick the data center/region closest to you (US-East, US-West, or EU)",
        "Choose \"Password\" authentication (skip SSH key section for now)",
        "Set a strong root password and save it somewhere safe",
        "Complete the order (activation is usually instant)",
        "Copy the IP address from your control panel",
      ],
      screenshotCaption: "OVH order flow — select Ubuntu + region during configuration.",
    },
  },

  guide: {
    ipAddress: {
      term: "an IP Address",
      content: "An IP address is like a phone number for computers. It's a series of numbers (like 192.168.1.100) that identifies your VPS on the internet.",
      purpose: "You'll need this address to connect to your VPS from your computer. It's like knowing someone's phone number so you can call them.",
    },
    whyPassword: {
      title: "Why password first?",
      content: "Adding SSH keys in the provider website is confusing and easy to mess up. Instead, we connect once with a password, then the installer sets up your SSH key the right way.",
    },
    detailedSteps: {
      title: "Detailed Steps for Creating Your VPS",
      step1: { title: "Log into your VPS provider", content: "Go to the website where you created your account (OVH or Contabo) and sign in with the email and password you created earlier." },
      step2: { title: "Find the 'Create Server' or 'Add VPS' button", ovh: "OVH: Click \"Create an instance\" or \"Order\"", contabo: "Contabo: Go to \"Your services\" → click the VPS you ordered" },
      step3: { title: "Choose your server location", content: "Pick a data center close to you for faster speeds. The closer the server, the faster your typing appears and AI responses stream back." },
      step4: { title: "Select Ubuntu as the operating system", content: "You'll see a list of \"images\" or \"operating systems\".", lookFor: "Look for: Ubuntu 25.10 (or newest available)", fallback: "If only Ubuntu 24.04 LTS is offered, that's fine. The installer automatically upgrades to 25.10 before ACFS installs." },
      step5: { title: "Set a root password", skipSsh: "If asked about SSH keys, skip that section", choosePassword: "Choose \"Password\" authentication", setPassword: "Set a strong root password", saveIt: "Save this password! You'll need it once to connect", emailNote: "Some providers email you a password instead - that's fine too!" },
      step6: { title: "Choose your plan size", specs: "12-16 vCPU, 48-64 GB RAM, 250GB+ NVMe storage, ~$40-56/month", recommendation: "64GB is strongly recommended. You're investing $400+/month in AI subscriptions, so don't bottleneck that with insufficient RAM." },
      step7: { title: "Create and wait", content: "Click the \"Create\", \"Deploy\", or \"Order\" button.", waitTime: "Your VPS will take 1-5 minutes to start up. You'll see a status like \"Running\" or a green indicator when it's ready." },
      step8: { title: "Find and copy the IP address", content: "Once your VPS is running, look for the IP address.", locations: ["On the main server overview page", "In a \"Network\" or \"IP Addresses\" section"], example: "It looks like: 123.45.67.89", action: "Copy this number and paste it in the box below!" },
    },
    ipTip: "The IP address should be 4 groups of numbers separated by periods, like 192.168.1.100. Don't include any letters or extra characters!",
    passwordCaution: "Save your password! You'll need it once to connect for the first time. After that, the installer will set up SSH key access so you won't need the password anymore.",
  },

  ipInput: {
    title: "Your VPS IP address",
    subtitle: "Enter the IP address of your new VPS. You'll find this in your provider's control panel after the VPS is created.",
    privacy: {
      title: "Your data stays on your device",
      content: "This IP address is stored only in your browser's local storage. It's never sent to our servers or any third party.",
      openSource: "entire codebase is open source",
      verifySuffix: "so you can verify this yourself.",
    },
    placeholder: "e.g., 192.168.1.100",
    validation: {
      invalid: "Please enter a valid IP address (e.g., 192.168.1.1)",
      required: "Please enter your VPS IP address",
      valid: "Valid IP address",
    },
    checklistHint: "Complete the checklist above to continue",
  },

  buttons: {
    continue: "Continue to SSH",
    loading: "Loading...",
  },
};

// windows-terminal-setup page
export const windowsTerminalSetupMessages = {
  title: "Windows Terminal: One-Click VPS Access",
  timeEstimate: "~3 min (optional but very helpful)",
  description: "Set up a custom profile in Windows Terminal so you can connect to your VPS with a single click.",

  whySetup: {
    title: "Why set this up?",
    intro: "Instead of opening PowerShell and typing your SSH command every time, you can:",
    benefits: [
      "Click a tab in Windows Terminal to instantly connect to your VPS",
      "Give it a custom name like \"My VPS\" or \"ACFS Server\"",
      "Optionally set it as your default profile",
    ],
  },

  steps: {
    title: "Step-by-Step Setup",
    step1: {
      title: "Open Windows Terminal Settings",
      content: "Open Windows Terminal, then press Ctrl + , (comma) to open Settings.",
      alt: "Or click the dropdown arrow (▼) next to the tab bar and select \"Settings\".",
    },
    step2: {
      title: "Add a New Profile",
      content: "In the left sidebar, scroll down and click",
      addProfile: "Add a new profile",
      then: "Then click \"New empty profile\".",
    },
    step3: {
      title: "Configure the Profile",
      name: {
        label: "Name:",
        value: "My VPS",
        hint: "(or whatever name you prefer, like \"ACFS Server\" or \"Ubuntu VPS\")",
      },
      commandLine: {
        label: "Command line:",
        hint: "This is your personalized SSH command with your VPS IP ({ip}).",
      },
      startingDir: {
        label: "Starting directory (optional):",
      },
      icon: {
        label: "Icon (optional):",
        hint: "You can pick any icon. The \"penguin\" emoji (🐧) or a cloud (☁️) work nicely for a Linux server.",
      },
    },
    step4: {
      title: "Save and Test",
      save: "Click Save at the bottom of the page.",
      test: "Now click the dropdown arrow (▼) next to your tabs — you should see your new \"My VPS\" profile! Click it to connect.",
    },
  },

  preview: {
    title: "When you click your new profile:",
    connecting: "Connecting to ubuntu@{ip}...",
    welcome: "Welcome to Ubuntu 25.10",
    prompt: "ubuntu@vps:~$",
  },

  makeDefault: {
    title: "Optional: Make it your default profile",
    intro: "If you want Windows Terminal to open directly to your VPS:",
    steps: [
      "Go to Settings → Startup",
      "Under \"Default profile\", select your new \"My VPS\" profile",
      "Click Save",
    ],
    result: "Now every time you open Windows Terminal, it will connect to your VPS automatically!",
  },

  guide: {
    whatIs: {
      term: "What is Windows Terminal?",
      content: "Windows Terminal is Microsoft's modern terminal app. It's better than the old Command Prompt because it supports tabs, colors, and customization.",
      getIt: "If you don't have it installed, you can get it free from the Microsoft Store.",
    },
    troubleshooting: {
      title: "Troubleshooting",
      permissionDenied: {
        title: "\"Permission denied\" error",
        content: "Make sure your SSH key file exists at %USERPROFILE%\\.ssh\\acfs_ed25519. If you used a different key name, update the command line accordingly.",
      },
      connectionRefused: {
        title: "\"Connection refused\" error",
        content: "Double-check that your VPS IP ({ip}) is correct and the server is running.",
      },
      hostKeyFailed: {
        title: "\"Host key verification failed\"",
        content: "This can happen if you rebuilt your VPS. You may need to remove the old key from %USERPROFILE%\\.ssh\\known_hosts.",
      },
    },
    tip: "You can create multiple profiles for different servers! Just repeat these steps with different names and IP addresses.",
  },

  buttons: {
    back: "Back to previous page",
    copy: "Copy",
    copied: "Copied!",
    save: "Save",
  },
};

// install-terminal page
export const installTerminalMessages = {
  title: "Install a terminal you'll love",
  timeEstimate: "~2 min",
  description: "A good terminal makes everything easier.",

  mac: {
    intro: "Install **Ghostty** or **WezTerm**. Either is a great choice. Open it once after installing to make sure it works.",
    terminals: {
      ghostty: {
        name: "Ghostty",
        description: "Fast, native terminal",
      },
      wezterm: {
        name: "WezTerm",
        description: "GPU-accelerated terminal",
      },
    },
    sshReady: {
      title: "SSH is already installed",
      content: "macOS includes SSH by default, so you're ready to connect to your VPS.",
    },
    guide: {
      terminal: {
        term: "a Terminal",
        content: "A terminal is a program that lets you type commands to control your computer. Instead of clicking buttons and icons, you type text commands. It's like having a conversation with your computer!",
        analogy: "Think of it like texting your computer instead of tapping on apps. You type a command, press Enter, and the computer does what you asked.",
        purpose: "We'll be using the terminal to connect to your remote server (VPS) and run programs on it.",
      },
      quickDownload: {
        title: "Quick Download (Click to Start)",
        intro: "Click one of these buttons to immediately download the installer. We recommend **Ghostty**; it's fast and simple.",
        ghostty: {
          label: "Download Ghostty",
          sublabel: "Recommended • Fast & Simple",
        },
        wezterm: {
          label: "Download WezTerm",
          sublabel: "Alternative • More Features",
        },
      },
      stepByStep: {
        title: "Step-by-Step Installation",
        step1: {
          title: "Find the downloaded file",
          content: "Look at the bottom of your web browser. You should see \"Ghostty.dmg\" or \"WezTerm.dmg\". Click on it to open it.",
          fallback: "If you don't see it, open Finder, then click \"Downloads\" in the left sidebar. Double-click the .dmg file.",
        },
        step2: {
          title: "Install the app",
          content: "A new window will open showing the app icon and an \"Applications\" folder. **Drag the app icon onto the Applications folder.**",
          wait: "This copies the app to your computer. Wait for the copy to finish (you'll see a progress bar).",
        },
        step3: {
          title: "Open the app",
          spotlight: "Press ⌘ + Space to open Spotlight (the search)",
          type: "Type \"Ghostty\" or \"WezTerm\"",
          enter: "Press Enter to open it",
        },
        step4: {
          title: "Allow the app to run (if asked)",
          intro: "Mac might say the app is from an \"unidentified developer\". This is normal for apps downloaded outside the App Store.",
          ifHappens: "If this happens:",
          steps: [
            "Click \"Cancel\" on the popup",
            "Open **System Settings** (click the Apple menu → System Settings)",
            "Click \"Privacy & Security\"",
            "Scroll down and click \"Open Anyway\" next to the app name",
          ],
        },
      },
      tip: "You'll know it worked when you see a window with a blinking cursor and some text (usually your username and a $ symbol). That's your terminal! You can close it for now; we'll use it in the next steps.",
      caution: "If you see an error or the app won't open, try the other terminal option (if you downloaded Ghostty, try WezTerm instead). Both work great!",
    },
  },

  windows: {
    intro: "Install **Windows Terminal** from the Microsoft Store. Open it once after installing.",
    terminal: {
      name: "Windows Terminal",
      description: "Microsoft Store (free)",
    },
    verifySsh: {
      title: "Verify SSH is available",
      content: "Open Windows Terminal and run this command. You should see a version number.",
      commandDesc: "Check SSH version",
    },
    guide: {
      terminal: {
        term: "a Terminal",
        content: "A terminal is a program that lets you type commands to control your computer. Instead of clicking buttons and icons, you type text commands. It's like having a conversation with your computer!",
        analogy: "Think of it like texting your computer instead of tapping on apps. You type a command, press Enter, and the computer does what you asked.",
        windowsNote: "Windows Terminal is Microsoft's modern terminal app. It's free and works great for what we need.",
      },
      stepByStep: {
        title: "Step-by-Step Installation",
        step1: {
          title: "Open the Microsoft Store",
          steps: [
            "Click the **Start button** (Windows icon in the bottom-left corner, or press the Windows key on your keyboard)",
            "Type **\"Microsoft Store\"**",
            "Click on the Microsoft Store app to open it",
          ],
        },
        step2: {
          title: "Search for Windows Terminal",
          steps: [
            "In the Microsoft Store, click the **Search box** at the top",
            "Type **\"Windows Terminal\"**",
            "Press Enter",
            "Click on **\"Windows Terminal\"** by Microsoft Corporation",
          ],
        },
        step3: {
          title: "Install the app",
          steps: [
            "Click the **blue \"Get\" or \"Install\" button**",
            "Wait for it to download and install (this takes 1-2 minutes)",
            "When done, the button will change to \"Open\"",
          ],
        },
        step4: {
          title: "Open Windows Terminal",
          steps: [
            "Click the **\"Open\" button** in the Microsoft Store, OR",
            "Click Start, type \"Terminal\", and click on Windows Terminal",
          ],
        },
      },
      checkSsh: {
        title: "Check that SSH works",
        intro: "Windows 10 and 11 come with SSH already installed. Let's verify it works:",
        step1: {
          title: "Type the command",
          content: "In the Windows Terminal window, type exactly:",
          note: "That's \"ssh\" (lowercase), a space, a dash, and a capital \"V\"",
        },
        step2: {
          title: "Press Enter",
          content: "Press the Enter key on your keyboard.",
        },
        step3: {
          title: "Check the result",
          intro: "You should see something like:",
          example: "OpenSSH_for_Windows_8.6p1, LibreSSL 3.4.3",
          note: "The exact numbers don't matter; as long as you see \"OpenSSH\", you're good!",
        },
      },
      tip: "If SSH isn't installed, you may need to enable it. Go to Settings → Apps → Optional Features → Add a feature → search for \"OpenSSH Client\" and install it. Then try the ssh -V command again.",
      caution: "Make sure you're typing commands in the Windows Terminal window, not in the search bar or a web browser. The terminal has a black background with white or colored text.",
    },
  },

  terminalBasics: {
    title: "Try Your First Commands",
    intro: "Before we continue, let's make sure you can use the terminal. This takes 2 minutes and will make everything easier!",
    prompt: {
      title: "1. Understanding the Prompt",
      content: "When you open your terminal, you'll see a blinking cursor after some text. That text is called the **prompt**. It tells you the terminal is ready for your command.",
      examples: "Common prompts look like:",
      meaning: "The **$**, **%**, or **>** symbol means \"type here\". You type after it, then press Enter.",
    },
    copyPaste: {
      title: "2. Copy & Paste in Terminal",
      intro: "Copying and pasting in terminals works a bit differently than in regular apps.",
      mac: {
        title: "Mac Terminal Copy/Paste",
        copy: "**Copy from wizard:** Click the copy button on any command (or use ⌘+C)",
        paste: "**Paste into terminal:** Press ⌘ + V",
        alt: "**Alternative:** Right-click → Paste",
      },
      windows: {
        title: "Windows Terminal Copy/Paste",
        copy: "**Copy from wizard:** Click the copy button on any command (or Ctrl+C)",
        paste: "**Paste into terminal:** **Right-click** anywhere in the terminal, OR press Ctrl + Shift + V",
        note: "**Note:** Ctrl+C in terminal means \"cancel\", not copy!",
      },
      linux: {
        title: "Linux Terminal Copy/Paste",
        copy: "**Copy from wizard:** Click the copy button on any command (or Ctrl+C)",
        paste: "**Paste into terminal:** Press Ctrl + Shift + V (common), or try right-click",
        tip: "**Tip:** If Ctrl+Shift+V doesn't work in your terminal app, look for a \"Paste\" option in the right-click menu",
      },
    },
    firstCommand: {
      title: "3. Type Your First Command",
      intro: "Let's verify everything works. Type this command in your terminal and press Enter:",
      commandDesc: "Print 'hello' to the screen",
      expected: "You should see:",
      success: "If you see \"hello\" printed below your command, your terminal is working!",
    },
    ready: {
      title: "You're ready!",
      content: "If you can type commands and see output, you've got the basics! In the next steps, we'll use these same skills to connect to your VPS.",
    },
  },

  buttons: {
    loading: "Loading...",
    continue: "I installed it, continue",
  },
};

// os-selection page
export const osSelectionMessages = {
  title: "What computer are you using?",
  timeEstimate: "~30 sec",
  description: "This helps us show you the right commands and instructions.",

  badges: {
    selected: "Selected",
    detected: "Detected",
  },

  osCards: {
    mac: {
      title: "Mac",
      description: "macOS, MacBook, iMac, Mac Mini, Mac Studio",
    },
    windows: {
      title: "Windows",
      description: "Windows 10, Windows 11",
    },
    linux: {
      title: "Linux",
      description: "Ubuntu, Debian, Fedora, Arch, etc.",
    },
  },

  tip: {
    label: "Tip",
    detected: "We guessed your OS from your browser. If that's wrong, pick the other option. Otherwise just hit Continue.",
    notDetected: "If you're on a phone/tablet, pick the computer you'll use for the next steps (Mac, Windows, or Linux).",
  },

  guide: {
    whatIsAsking: {
      title: "What is this asking?",
      content: "We need to know what type of computer you're using so we can show you the right instructions. Different computers need slightly different steps.",
    },
    operatingSystem: {
      term: "an Operating System",
      intro: "An operating system (or \"OS\") is the main software that runs your computer. It's like the foundation that everything else runs on top of.",
      mac: "Mac = Apple computers (MacBook, iMac, Mac Mini, Mac Studio). If you see an Apple logo when your computer starts, you have a Mac.",
      windows: "Windows = Most non-Apple computers (Dell, HP, Lenovo, etc.). If you see a Windows logo (four colored squares) when your computer starts, you have Windows.",
      linux: "Linux = If you're already using Ubuntu, Debian, Fedora, Arch, or another Linux distribution. You probably already know if you're running Linux! Selecting Linux will skip the terminal installation step since you already have one.",
    },
    howToKnow: {
      title: "How do I know which one I have?",
      mac: "Mac: Look at the top-left corner of your screen. Do you see the Apple menu (top-left Apple logo)? Click it and select \"About This Mac\" and it will say something like \"macOS Sonoma\" or \"macOS Ventura\".",
      windows: "Windows: Look at the bottom-left corner of your screen. Do you see a Windows icon (four blue squares)? That means you have Windows. You can also press the Windows key on your keyboard (between Ctrl and Alt).",
      linux: "Linux: If you installed Linux yourself (Ubuntu, Fedora, Arch, etc.), you already know! Open a terminal and type `uname -a` to confirm. You'll see \"Linux\" in the output.",
    },
    guideTip: {
      detected: "We tried to detect your computer type automatically. If it looks right, you can just click \"Continue\". If it looks wrong, click the other option first.",
      notDetected: "If you're reading this on your phone, choose the computer you'll use next, then click \"Continue\".",
    },
  },

  buttons: {
    continue: "Continue",
    loading: "Loading...",
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
