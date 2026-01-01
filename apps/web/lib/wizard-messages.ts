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

// generate-ssh-key page
export const generateSshKeyMessages = {
  title: "Create your SSH key",
  timeEstimate: "~2 min",
  description: "This is your secure \"login key\" for connecting to your VPS.",

  howItWorks: {
    title: "How SSH keys work",
    content: "You're creating a **key pair**: a private key (stays on your computer) and a public key (you'll paste during installation). Think of it like a lock and key: you share the lock, but only you have the key.",
  },

  sshLocation: {
    title: "Where are SSH keys stored?",
    intro: "SSH keys are stored in a special folder called ~/.ssh on your computer.",
    locations: {
      mac: "/Users/yourname/.ssh/",
      linux: "/home/yourname/.ssh/",
      windows: "C:\\Users\\yourname\\.ssh\\",
    },
    tildeNote: "The ~ symbol is shorthand for your home folder.",
    dotNote: "The . prefix makes it a hidden folder (that's normal for config files).",
  },

  privacy: {
    title: "Your keys never leave your computer",
    content: "These commands run **entirely on your machine**. This website cannot see, access, or store your SSH keys. We're just showing you what to type.",
    openSource: "entire codebase is open source",
  },

  step1: {
    title: "Step 1: Generate the key",
    intro: "Run this command in your terminal. You'll be asked 3 questions—here's how to answer:",
    prompts: {
      fileLocation: { label: "1. File location:", action: "Press Enter to accept the default" },
      passphrase: { label: "2. Passphrase:", action: "Press Enter (leave empty)" },
      confirmPassphrase: { label: "3. Confirm passphrase:", action: "Press Enter again" },
    },
  },

  step2: {
    title: "Step 2: Copy your public key",
    intro: "Run this command and copy the entire output. It starts with ssh-ed25519.",
  },

  saveWarning: {
    title: "Save your public key for later",
    content: "You'll paste this **during installation**, not when creating the VPS. Save it somewhere safe like a notes app—you'll need it later!",
  },

  troubleshooting: {
    title: "Having trouble? Click for common fixes",
    noSuchFile: {
      title: "\"No such file or directory\" error",
      fix: "Create the .ssh folder first: mkdir -p ~/.ssh",
    },
    permissionDenied: {
      title: "\"Permission denied\" error",
      fix: "Fix folder permissions: chmod 700 ~/.ssh",
    },
    fileExists: {
      title: "Key file already exists",
      fix: "If you already have a key, you can use that one. Just copy the .pub file content.",
    },
  },

  guide: {
    sshKey: {
      term: "an SSH Key",
      intro: "An SSH key is like a special password that lets you securely connect to another computer over the internet.",
      twoFiles: "Unlike regular passwords that you type, SSH keys are files stored on your computer. There are always **two files**:",
      privateKey: "**1. Private key:** This is your secret key. It stays on YOUR computer and you never share it with anyone. It's like the key to your house.",
      publicKey: "**2. Public key:** This is the one you share. You'll give this to your VPS provider. It's like giving someone a copy of your lock so they know it's really you when you connect.",
    },
    detailedSteps: {
      title: "Detailed Step-by-Step Instructions",
      step1: {
        title: "Open your terminal",
        mac: "Open the terminal app you installed (Ghostty or WezTerm). You can press ⌘ + Space, type the name, and press Enter.",
        linux: "Open your terminal emulator. On most Linux distributions, press Ctrl + Alt + T, or find Terminal in your applications menu.",
        windows: "Open Windows Terminal. Click Start, type \"Terminal\", and click on Windows Terminal.",
      },
      step2: {
        title: "Copy the command",
        content: "Look at the gray box above that shows the ssh-keygen command. Click the **copy button** (it looks like two overlapping squares) on the right side of the box. This copies the command to your clipboard.",
      },
      step3: {
        title: "Paste and run the command",
        intro: "Click inside the terminal window to make sure it's active. Then paste the command:",
        mac: "Press ⌘ + V",
        linux: "Press Ctrl + Shift + V",
        windows: "Right-click inside the terminal OR press Ctrl + V",
        run: "Then press Enter to run it.",
      },
      step4: {
        title: "Answer the prompts",
        intro: "The terminal will ask you a few questions. Here's exactly what you'll see:",
        fileLocation: {
          label: "First: File location",
          prompt: "Enter file in which to save the key (/Users/you/.ssh/acfs_ed25519):",
          action: "→ Just press Enter! The path is already set by our command.",
          explanation: "The path shown is where your key files will be saved. The .ssh folder is a standard location for SSH keys on all computers. Our command already specifies this path, so just press Enter to confirm it.",
        },
        passphrase: {
          label: "Second: Passphrase",
          prompt: "Enter passphrase (empty for no passphrase):",
          action: "→ Press Enter without typing anything. Leave it empty.",
          explanation: "A passphrase would add an extra password you'd have to type every time you connect. For a development VPS that you control, this extra security isn't necessary and would slow you down. Your private key file itself is already secure because it never leaves your computer.",
        },
        confirmPassphrase: {
          label: "Third: Confirm passphrase",
          prompt: "Enter same passphrase again:",
          action: "→ Press Enter again. That's it!",
        },
        summary: "**Summary:** Press Enter three times total. The command we provided handles all the important settings.",
      },
      step5: {
        title: "Success!",
        intro: "When the key is created, you'll see a confirmation:",
        saved: "Your identification has been saved in /Users/you/.ssh/acfs_ed25519",
        publicSaved: "Your public key has been saved in /Users/you/.ssh/acfs_ed25519.pub",
        fingerprint: "The key fingerprint is:",
        randomart: "The key's randomart image is:",
        success: "**The randomart pattern means it worked!** You now have SSH keys.",
      },
    },
    verify: {
      title: "Verify Your Key Was Created",
      intro: "Let's make sure your keys were created correctly:",
      checkFiles: {
        title: "Check the files exist",
        description: "List your new key files",
        result: "You should see two files:",
        privateKey: "acfs_ed25519 — Your **private key** (keep this secret!)",
        publicKey: "acfs_ed25519.pub — Your **public key** (this gets shared)",
      },
      analogy: "Think of it like a mailbox: the **public key** is your address (you share it so people can send you mail), and the **private key** is your mailbox key (only you have it to open your mail).",
    },
    copyPublicKey: {
      title: "Now Copy Your Public Key",
      step1: {
        title: "Run the second command",
        content: "Now look at the second gray command box (the \"cat\" or \"type\" command). Click its copy button and paste it into the terminal, then press Enter.",
      },
      step2: {
        title: "Select and copy the output",
        intro: "You'll see a long string of text that starts with ssh-ed25519. This is your public key!",
        howToCopy: "**To copy it:**",
        mac: "Triple-click to select the whole line, then ⌘ + C",
        linux: "Triple-click to select the whole line, then Ctrl + Shift + C",
        windows: "Triple-click to select, then right-click to copy",
      },
      step3: {
        title: "Save it somewhere safe",
        content: "Open a notes app and paste your public key there. You'll need it later when running the installer (not when creating the VPS—we'll use a password for that).",
      },
    },
    publicKeyExample: {
      intro: "Your public key looks something like this:",
      example: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGx... acfs",
      reminder: "Make sure you copy the WHOLE thing, from \"ssh-ed25519\" to \"acfs\"!",
    },
    privateKeyCaution: "**Never share your private key!** The private key is the file WITHOUT \".pub\" at the end. Only share the public key (the one that ends in \".pub\"). If anyone asks for your private key, that's a scam.",
    troubleshootingGuide: {
      title: "What if something went wrong?",
      commandNotFound: "**\"Command not found\":** Make sure you're in the terminal, not in a web browser or text editor.",
      permissionDenied: "**\"Permission denied\":** Try this command first, then run the ssh-keygen command again:",
      permissionFix: "mkdir -p ~/.ssh && chmod 700 ~/.ssh",
      fileExists: "**\"File already exists\":** You already have a key! You can use your existing key, or type \"y\" and press Enter to overwrite it.",
    },
  },

  buttons: {
    continue: "I saved my public key",
    loading: "Loading...",
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

// verify-key-connection page
export const verifyKeyConnectionMessages = {
  title: "Verify key-based connection",
  timeEstimate: "~1 min",
  description: "Make sure your SSH key works so you never need the password again.",

  whyMatters: {
    title: "Why this matters",
    content: "This confirms the installer set up your key correctly and that future logins are fast and secure.",
  },

  step1: {
    title: "Step 1: Disconnect",
    description: "Exit your current SSH session to return to your local terminal.",
    commandDesc: "Close the current session",
  },

  step2: {
    title: "Step 2: Reconnect using your SSH key",
    description: "Connect without a password prompt using the key you generated earlier.",
    commandDesc: "Key-based login (no password)",
  },

  success: {
    title: "Success looks like:",
    noPassword: "You were not asked for a password",
    prompt: "Your prompt shows: ubuntu@vps:~$",
  },

  windowsTip: {
    title: "Windows User? Set up one-click VPS access",
    content: "Create a Windows Terminal profile to connect to your VPS with a single click →",
  },

  troubleshooting: {
    title: "Troubleshooting",
    password: {
      title: "Still asks for a password?",
      content: "The key might not have been pasted correctly during the installer prompt. Re-run the installer and paste your public key again when asked.",
    },
    permissionDenied: {
      title: "Permission denied (publickey)",
      content: "Your key file permissions may be too open. Fix with:",
    },
    connectionRefused: {
      title: "Connection refused",
      content: "Your VPS might still be rebooting. Wait 1-2 minutes and try again.",
    },
  },

  guide: {
    keyBasedAuth: {
      term: "Key-based authentication",
      content: "Instead of typing a password, your computer proves it has a secret key that matches the public key stored on your VPS. It's faster and more secure than passwords.",
    },
    stepByStep: {
      title: "Step-by-step verification",
      step1: {
        title: "Exit the current session",
        content: "Type exit and press Enter to return to your local terminal.",
      },
      step2: {
        title: "Reconnect with your key",
        content: "Paste the SSH command above (with -i) and press Enter. You should NOT be asked for a password.",
      },
      step3: {
        title: "Confirm the prompt",
        content: "Look for ubuntu@ and a $ at the end.",
      },
    },
    tip: "If you see a password prompt, stop and fix it now—this step prevents future login headaches.",
    caution: "Using a different key? Make sure you're pointing to the same key you created earlier: ~/.ssh/acfs_ed25519.",
  },

  buttons: {
    continue: "My key works, continue",
    loading: "Loading...",
  },
};

// reconnect-ubuntu page
export const reconnectUbuntuMessages = {
  title: "Reconnect as ubuntu",
  timeEstimate: "~1 min",
  description: "If you ran the installer as root, reconnect as the ubuntu user to get the full shell experience.",

  alreadyUbuntu: {
    title: "Already connected as ubuntu?",
    content: "If your prompt shows ubuntu@, you can skip this step.",
    skipButton: "Skip, I'm already ubuntu",
  },

  ifRoot: {
    title: "If you connected as root:",
    step1: "1. Type exit to close the current session",
    step1CommandDesc: "Close root session",
    step2: "2. Reconnect as ubuntu:",
    noticeDifferent: "Notice something different?",
    keyExplanation: "This SSH command uses your SSH key (the -i ~/.ssh/acfs_ed25519 part — or on Windows -i $HOME\\.ssh\\acfs_ed25519) instead of a password. The installer set this up for you.",
    noPassword: {
      title: "No password needed!",
      content: "When you run this command, you should connect immediately without typing a password. SSH keys are more secure and more convenient.",
    },
    commandDesc: "Reconnect as ubuntu user",
  },

  permissionDenied: {
    title: "Getting 'Permission denied' or asked for password?",
    intro: "This means one of two things:",
    reason1: "SSH key wasn't set up correctly — the installer needs to complete successfully for this to work",
    reason2: "You're using the wrong credentials — the ubuntu user uses your SSH key, NOT the root password",
    tryRoot: "If you're being asked for a password, try connecting as root instead:",
    usePassword: "Use the VPS root password (the one from your provider), then re-run the installer.",
  },

  verification: {
    title: "You'll know it worked when:",
    items: [
      "Your prompt shows ubuntu@ (not root@)",
      "You see the colorful powerlevel10k prompt",
      "The shell feels more responsive",
    ],
  },

  p10kWizard: {
    title: "Prompt customization wizard?",
    intro: "The first time you connect, you might see a \"Powerlevel10k configuration wizard\" asking about fonts and prompt style.",
    quitOption: "Press q to quit and use defaults (recommended for now)",
    goThrough: "Or go through it if you want to customize how your prompt looks",
    runLater: "You can always run p10k configure later to customize.",
  },

  guide: {
    whyReconnect: {
      term: "Why reconnect as ubuntu?",
      intro: "During installation, you may have connected as \"root\", the super-admin account. Now we want you to use the \"ubuntu\" account instead because:",
      safety: "Safety: The root account can accidentally break things. The ubuntu account is safer for everyday use.",
      betterExperience: "Better experience: The installer set up special features (like the colorful prompt) for the ubuntu user.",
    },
    howToKnow: {
      title: "How do I know which user I am?",
      intro: "Look at your terminal prompt:",
      root: "root@vps:~# means you're logged in as root (note the # symbol)",
      ubuntu: "ubuntu@vps:~$ means you're logged in as ubuntu (note the $ symbol)",
    },
    stepByStep: {
      title: "Step-by-Step: Switching to Ubuntu",
      step1: {
        title: "Disconnect from the current session",
        content: "Type exit and press Enter. This closes your connection to the VPS.",
      },
      step2: {
        title: "Connect as ubuntu",
        content: "Copy and paste the SSH command shown above (the one with ubuntu@) and press Enter.",
      },
      step3: {
        title: "Verify you're ubuntu",
        content: "Your prompt should now show \"ubuntu@\" at the beginning. You might also see a fancy colorful prompt!",
      },
    },
    tip: "If you were already connected as ubuntu (skip button above applies to you), just click \"Skip\" or \"Continue\"; you don't need to do anything!",
    linuxBasics: {
      title: "New to Linux?",
      content: "Learn the basics of navigating the filesystem →",
    },
  },

  buttons: {
    continue: "I'm connected as ubuntu",
    loading: "Loading...",
  },
};

// preflight-check page
export const preflightCheckMessages = {
  title: "Pre-flight check your VPS",
  timeEstimate: "~1 min",
  description: "Before installing, let's confirm your VPS is ready.",

  fastSafetyCheck: {
    title: "Fast safety check",
    content: "This quick scan validates OS, disk space, network access, and APT locks. Warnings are okay — you can still continue.",
  },

  windowsWarning: {
    title: "Windows users: Common mistake!",
    intro: "If you paste this command and see errors like 'bash' is not recognized or Get-Date : Cannot bind parameter:",
    mistake: "You're running this on your Windows computer, NOT on the VPS!",
    fix: "Go back to your terminal, type ssh root@YOUR_VPS_IP, enter your VPS password, and THEN paste the preflight command.",
  },

  runCommand: {
    title: "Run this command",
    desc: "ACFS pre-flight validation",
  },

  expectedOutput: {
    title: "Expected output (example)",
    lines: {
      header: "ACFS Pre-Flight Check",
      separator: "=====================",
      os: "[✓] Operating System: Ubuntu 25.10 (or 24.04 before upgrade)",
      arch: "[✓] Architecture: x86_64",
      disk: "[✓] Disk Space: 45GB free",
      warning: "[!] Warning: Cannot reach https://claude.ai",
      result: "Result: 0 errors, 1 warning",
    },
  },

  acknowledgement: {
    title: "Before you continue",
    passed: "Pre-flight passed (all green, or only warnings)",
    failed: "I understand some checks failed and I'm choosing to continue",
  },

  troubleshooting: {
    title: "Troubleshooting common failures",
    bashNotRecognized: {
      title: "'bash' is not recognized / Get-Date error (Windows)",
      fixes: [
        "You're running this on your Windows computer, not on the VPS!",
        "First, connect to your VPS with: ssh root@YOUR_VPS_IP",
        "Wait until you see 'root@vps:~#' or similar",
        "THEN paste the preflight command",
        "The preflight command only works on the Linux VPS, not on Windows",
      ],
    },
    aptLocked: {
      title: "APT is locked by another process",
      fixes: [
        "Wait 1-2 minutes (auto updates often finish quickly)",
        "If it keeps failing: sudo killall apt apt-get",
        "Optional: sudo systemctl stop unattended-upgrades",
      ],
    },
    networkIssue: {
      title: "Cannot reach github.com (network/firewall)",
      fixes: [
        "Check that your VPS has outbound internet access",
        "Retry in a minute (provider networking sometimes lags)",
        "If on a corporate network, check firewall rules",
      ],
    },
    diskSpace: {
      title: "Insufficient disk space",
      fixes: [
        "Upgrade your VPS storage plan (recommended 20GB+ free)",
        "If you just created the VPS, choose a larger disk size",
      ],
    },
    unsupportedArch: {
      title: "Unsupported architecture",
      fixes: [
        "Use x86_64 or aarch64 VPS images",
        "Most providers default to x86_64 if not specified",
      ],
    },
  },

  redErrors: {
    title: "Seeing red errors?",
    content: "Fix the red errors before installing. The installer will likely fail otherwise.",
  },

  guide: {
    whatIsPreflight: {
      term: "What is a pre-flight check?",
      content: "A quick diagnostic that confirms your VPS meets the requirements before the full install.",
    },
    stepByStep: {
      title: "Step-by-Step",
      step1: {
        title: "Copy the command",
        content: "Click the copy button in the command box above.",
      },
      step2: {
        title: "Paste and run",
        content: "Paste into your terminal (make sure you're connected to your VPS).",
      },
      step3: {
        title: "Read the results",
        content: "Green lines are good. Yellow warnings are okay. Red errors should be fixed.",
      },
    },
    caution: "Warnings are okay: Warnings mean something might be imperfect but not critical. If you see errors, fix those first or use a larger VPS plan.",
  },

  buttons: {
    continue: "Continue to installer",
    skip: "Skip pre-flight (advanced)",
  },
};

// run-installer page
export const runInstallerMessages = {
  title: "Run the Agent Flywheel installer",
  timeEstimate: "~15 min",
  subtitle: "This is the magic moment. One command sets everything up.",

  dontClose: {
    title: "Don't close the terminal",
    content: "Stay connected during installation. If disconnected, SSH back in and check if it's still running.",
  },

  sshKeyPrompt: {
    title: "WATCH FOR: SSH Key Prompt",
    intro: "Early in the installation, you'll see a prompt asking for your SSH public key:",
    promptExample: "Paste your public key:",
    pasteNow: "This is when you paste the key you saved earlier!",
    keyFormat: "It's the one that starts with ssh-ed25519 AAAA...",
    missedPrompt: "If you miss this prompt or press Enter without pasting, you won't be able to connect as the ubuntu user with your SSH key later. (You can fix this manually if needed.)",
  },

  command: {
    title: "Paste this command in your SSH session",
    desc: "Agent Flywheel installer one-liner",
  },

  connectionDrop: {
    title: "What if my connection drops?",
    dontPanic: "Don't panic!",
    intro: "If your SSH connection drops during installation:",
    steps: [
      "The installer keeps running on the VPS",
      "Just SSH back in using the same command",
      "Run the installer command again — it will resume where it left off",
    ],
    note: "The installer is designed to be run multiple times safely. If anything fails, you can always re-run it.",
  },

  transparency: {
    title: "Fully transparent & open source",
    intro: "This script only runs on your VPS, not your local computer. You can inspect every line before running it:",
    viewSource: "View install.sh source",
    fullRepo: "Full repository",
  },

  timeEstimateNote: "Takes about 10-15 minutes depending on your VPS speed",

  commandBreakdown: {
    title: "What does this command actually do? (technical breakdown)",
    intro: "Here's what each part of the command means:",
    curl: "Downloads the script from GitHub. -f = fail on HTTP errors, -s = silent mode, -S = show errors, -L = follow redirects.",
    pipe: "Pipes the downloaded script to bash (the shell) to run it.",
    yes: "Passes --yes to the script, meaning \"don't ask for confirmation, just install.\"",
    mode: "Tells the installer to use \"vibe\" mode — installs all the recommended tools for the agentic coding workflow.",
    curlBashSafe: {
      title: "Is curl | bash safe?",
      content: "You're right to be cautious! Piping scripts directly to bash is only safe when you trust the source. This script is fully open source — you can read every line before running it. It only runs on your VPS, not your local computer.",
    },
  },

  whatItInstalls: {
    title: "What this command installs",
    categories: {
      shellTerminal: "Shell & Terminal UX",
      languages: "Languages & Package Managers",
      devTools: "Dev Tools",
      codingAgents: "Coding Agents",
      cloudDatabase: "Cloud & Database",
      dicklesworthstoneStack: "Dicklesworthstone Stack",
    },
  },

  viewSourceInline: "Want to see exactly what it does?",

  installationOutput: {
    title: "Understanding the installation output",
    intro: "You'll see lots of text scrolling by. Here's what to look for:",
    green: "Green checkmarks = Step completed successfully",
    yellow: "Yellow warnings = Non-critical issue, installer continues",
    red: "Red X = Something failed, but installer will retry or skip",
    note: "Just wait for the final \"Installation complete\" message. If you see errors, you can always re-run the installer—it will retry failed steps.",
  },

  successSigns: {
    title: "You'll know it's done when you see:",
    complete: "✔ Agent Flywheel installation complete!",
    reconnect: "Please reconnect as: ssh ubuntu@YOUR_IP",
  },

  guide: {
    whatIsCommand: {
      term: "What is this command doing?",
      content: "This command downloads and runs a setup script that automatically installs everything you need on your VPS. Think of it like running an installer on your computer, but this one installs dozens of tools at once!",
      idempotent: "The script is \"idempotent\" which means it's safe to run multiple times. If something fails, you can just run it again.",
    },
    stepByStep: {
      title: "Step-by-Step",
      step1: {
        title: "Make sure you're connected to your VPS",
        content: "Your terminal should show something like ubuntu@vps:~$ or root@vps:~#.",
        notConnected: "If it shows your regular computer name, you need to SSH in first!",
      },
      step2: {
        title: "Copy the install command",
        content: "Click the copy button on the purple command box above. The command is quite long, so make sure you copy the whole thing!",
      },
      step3: {
        title: "Paste and run",
        content: "In your SSH terminal (where you're connected to the VPS), paste the command and press Enter.",
        normal: "You'll see lots of text scrolling by. This is normal!",
      },
      step4: {
        title: "Wait patiently (10-15 minutes)",
        intro: "The installation takes time because it's downloading and installing many tools. You'll see progress messages scroll by:",
        dontClose: "Don't close the terminal! Let it run until you see the green \"Installation complete\" message.",
      },
    },
    whatGetsInstalled: {
      title: "What gets installed?",
      intro: "The installer sets up a complete development environment including:",
      shell: "Modern shell (zsh): A better terminal experience with colors and suggestions",
      languages: "Programming languages: JavaScript/TypeScript, Python, Rust, and Go",
      aiAssistants: "AI coding assistants: Claude Code, Codex, and Gemini CLI",
      devTools: "Developer tools: Git interface, file searchers, and more",
    },
    tip: "If your internet connection drops during installation, just SSH back in and run the command again. The installer will pick up where it left off!",
    caution: "Don't close the terminal window while the installation is running. If you accidentally close it, SSH back in and run the command again. It will resume from where it stopped.",
    ifStuck: {
      title: "If Installation Seems Stuck",
      intro: "Installation can look \"stuck\" at certain points. Here's what's actually happening:",
      rust: "Stuck on \"Installing Rust...\" — Rust is a large download (~300MB). This step can take 2-5 minutes depending on your VPS speed. Just wait.",
      ohmyzsh: "Stuck on \"Setting up oh-my-zsh...\" — This step downloads plugins from GitHub. If GitHub is slow, it can take a minute. Wait it out.",
      noOutput: "No output for 2+ minutes — Some steps don't show progress. If the terminal cursor is still blinking, it's still running. Wait.",
      actualError: "Actual error message appears — If you see red error text or \"Failed\", SSH back in and run the install command again. The installer will skip completed steps and retry the failed one.",
      timeLimit: "The entire installation rarely takes more than 20 minutes. If it's been 30+ minutes with no progress at all, SSH back in and check if the script is still running. If not, just run the install command again.",
    },
  },

  buttons: {
    continue: "Installation finished",
    loading: "Loading...",
  },
};

// status-check page
export const statusCheckMessages = {
  title: "Agent Flywheel status check",
  timeEstimate: "~1 min",
  description: "Let's verify everything installed correctly on your VPS.",

  reconnectionReminder: {
    title: "Before running these commands",
    intro: "Make sure you're connected to your VPS, not running commands on your laptop!",
    sshFirst: "If you're in PowerShell or Terminal on your laptop, first run your SSH command:",
    readyWhen: "Once you see ubuntu@ in your prompt, you're ready.",
  },

  commonMistake: {
    title: "Common Mistake: Claude Desktop vs Claude Code",
    notDesktop: "Claude Code is NOT the Claude Desktop app you download to your computer.",
    howToUse: "Claude Code is a command-line tool that's already installed on your VPS. To use it:",
    steps: [
      "SSH into your VPS first (using the command above)",
      "Then run claude or cc commands",
    ],
    wrongPlace: "If you're seeing \"command not found\" in PowerShell or Terminal on your laptop, you're in the wrong place!",
  },

  doctorCommand: {
    title: "Run the doctor command",
    description: "This checks all installed tools and reports any issues:",
    commandDesc: "Run Agent Flywheel health check",
  },

  expectedOutput: {
    title: "Expected output",
    header: "Agent Flywheel Doctor - System Health Check",
    separator: "================================",
    shell: "✔ Shell: zsh with oh-my-zsh",
    languages: "✔ Languages: bun, uv, rust, go",
    tools: "✔ Tools: tmux, ripgrep, lazygit",
    agents: "✔ Agents: claude-code, codex",
    allPassed: "All checks passed!",
  },

  quickChecks: {
    title: "Quick spot checks",
    intro: "Try a few commands to verify key tools:",
    checks: [
      { command: "cc --version", description: "Check Claude Code is installed" },
      { command: "bun --version", description: "Check bun is installed" },
      { command: "which tmux", description: "Check tmux is installed" },
    ],
  },

  authenticateServices: {
    title: "Authenticate your services",
    subtitle: "Log in to the tools you plan to use now (you can do the rest later)",
  },

  headlessAuth: {
    title: "Authentication on a Headless Server",
    intro: "Your VPS doesn't have a web browser, so authentication works differently:",
    steps: [
      "Run a login command below (like claude)",
      "The terminal will display a URL and possibly a code",
      "Copy that URL and open it in your laptop's browser",
      "Complete the login in your browser",
      "Return to your terminal — it should confirm success",
    ],
    note: "If you see \"Opening browser...\" but nothing happens, that's normal! Just copy the URL shown and open it manually on your laptop.",
  },

  dontNeedAll: {
    title: "You don't need to log into everything right now",
    intro: "Most people start with one coding agent and add the rest later.",
    recommendedNow: "Recommended now: Claude Code (so you can start coding immediately)",
    optionalNow: "Optional now: Codex, Gemini (only if you plan to use them)",
    optionalLater: "Optional later: Cloud tools (Wrangler / Supabase / Vercel) and anything else you don't need yet",
    note: "If you skip a login, the tool is still installed — it just won't work until you authenticate.",
  },

  troubleshooting: {
    title: "Something not working?",
    content: "Try running source ~/.zshrc to reload your shell config, then try the doctor again.",
  },

  guide: {
    whatIsDoctor: {
      term: "What is the 'doctor' command?",
      content: "The \"doctor\" command is like a health checkup for your VPS. Just like a doctor checks your heart, lungs, and reflexes, this command checks that all the software tools were installed correctly.",
      purpose: "It goes through a list of tools (programming languages, coding assistants, utilities) and reports which ones are working and which ones might have problems.",
    },
    stepByStep: {
      title: "Step-by-Step: Running the Doctor",
      step1: {
        title: "Make sure you're connected to your VPS",
        content: "Your terminal should show ubuntu@ at the beginning of your prompt. If it shows your laptop's name, you need to SSH in first!",
      },
      step2: {
        title: "Copy the doctor command",
        content: "Click the copy button on the acfs doctor command box above.",
      },
      step3: {
        title: "Paste and run",
        content: "Paste the command in your terminal and press Enter.",
      },
      step4: {
        title: "Read the results",
        intro: "You'll see a list with checkmarks (✔) or X marks (✘):",
        green: "Green checkmarks = Working correctly!",
        red: "Red X marks = Something needs attention",
      },
    },
    spotChecks: {
      title: "Understanding the Quick Spot Checks",
      intro: "We also show some simple commands you can run to double-check specific tools:",
      ccVersion: "This checks Claude Code, the AI coding assistant. You should see a version number like \"1.0.3\".",
      bunVersion: "This checks Bun, a fast JavaScript runtime. You should see something like \"1.1.38\".",
      whichTmux: "This checks if tmux is installed. You should see a path like \"/usr/bin/tmux\".",
    },
    whatIfFailed: {
      title: "What If Something Failed?",
      intro: "Don't panic! Here are some common fixes:",
      commandNotFound: {
        title: "\"Command not found\" error",
        content: "This usually means your shell config hasn't loaded yet. Run this command to reload it:",
        command: "source ~/.zshrc",
        after: "Then try the doctor command again.",
      },
      specificToolFailed: {
        title: "A specific tool shows ✘",
        content: "You can try re-running the installer. It's safe to run multiple times:",
      },
      nothingWorks: {
        title: "Nothing works at all",
        content: "Make sure you're connected as the \"ubuntu\" user (not root). The installer set up tools for the ubuntu user specifically.",
      },
    },
    authenticating: {
      title: "Authenticating Your Services",
      intro: "The services you signed up for need to be connected to your VPS. Each command displays a URL to open in your laptop's browser:",
      step1: {
        title: "Run the login command",
        content: "Copy and run a command like claude or vercel login.",
      },
      step2: {
        title: "Complete browser login",
        content: "A URL will appear in your terminal. Open it in your browser and sign in with the account you created earlier.",
      },
      step3: {
        title: "Return to terminal",
        content: "Once you've logged in, the terminal will confirm the connection. Check the box next to each command as you complete it.",
      },
    },
    tip: "If most things show green checkmarks (✔), you're good to go! Don't worry about one or two yellow warnings; those are usually optional tools. Click \"Everything looks good!\" to continue.",
    caution: "If you see many red X marks: Don't continue yet. Try the troubleshooting steps above, or re-run the installer. If problems persist, you can ask for help in the project's GitHub issues.",
    learnMore: {
      welcome: {
        title: "New to this environment?",
        content: "Start with the Welcome lesson to understand what you now have →",
      },
      flywheel: {
        title: "Ready for the full workflow?",
        content: "See the Flywheel Loop lesson to connect all the tools →",
      },
    },
  },

  buttons: {
    continue: "Everything looks good!",
    loading: "Loading...",
  },
};

// launch-onboarding page
export const launchOnboardingMessages = {
  congratulations: "Congratulations! You're all set up!",
  subtitle: "Your VPS is now a powerful coding environment ready for AI-assisted development.",

  p10kWarning: {
    title: "First login: You may see a configuration wizard",
    intro: "When you first connect to your VPS after installation, you might see the Powerlevel10k configuration wizard — a colorful terminal setup screen.",
    optional: "Don't worry, this is optional! You can press q to skip it, or follow the prompts to customize your terminal appearance. ACFS already configured sensible defaults, so skipping is perfectly fine.",
  },

  authenticateTools: {
    title: "First: Authenticate Your AI Tools",
    intro: "Before using AI coding assistants, you need to authenticate them. This is a one-time setup that links your subscriptions:",
    claudeCode: {
      title: "Claude Code",
      desc: "Follow the prompts. If it prints a URL, open it on your laptop to log in.",
      howItWorks: "How the authentication works:",
      steps: [
        "The terminal shows a URL like https://claude.ai/oauth/...",
        "Copy that URL and paste it into your web browser (on your laptop)",
        "Log in to Claude in your browser",
        "The browser shows a code (like \"ABCD-1234\")",
        "Copy that code and paste it back into your terminal window (the same one running Claude)",
      ],
      note: "When your browser says \"Paste this into Claude Code\" — that means paste the code into the terminal window where you typed claude.",
    },
    codex: {
      title: "Codex CLI (if using OpenAI)",
      desc: "Starts the login flow. If it prints a URL, open it on your laptop to authenticate.",
    },
    gemini: {
      title: "Gemini CLI (optional)",
      desc: "Follow the prompts to authenticate (Google account).",
    },
    vibeShortcuts: "After authenticating, you can use the shortcuts (vibe mode): cc (Claude), cod (Codex), gmi (Gemini).",
  },

  learningHub: {
    title: "Continue Your Learning Journey",
    content: "Master your new environment with 9 guided lessons covering Linux basics, tmux sessions, AI agents, and advanced workflows.",
    startButton: "Start Learning Hub",
    terminalNote: "Prefer the terminal? Run onboard for the CLI version.",
  },

  dailyWorkflow: {
    title: "Your Daily Workflow",
    intro: "Here's what working with your VPS looks like day-to-day:",
    step1: {
      title: "Connect to your VPS",
      note: "Open your terminal and SSH in.",
    },
    step2: {
      title: "Resume or create a session",
      listDesc: "See existing sessions",
      attachDesc: "Resume a session",
      newDesc: "Or create new",
    },
    step3: {
      title: "Start coding with AI",
      desc: "Launch Claude Code",
    },
    step4: {
      title: "When you're done for the day",
      detach: "Detach from session:",
      disconnect: "Disconnect from VPS",
      keepRunning: "Your session keeps running! Come back tomorrow and everything is exactly where you left it.",
    },
    remember: "Remember: Connect → Session → Code → Detach",
  },

  startingProject: {
    title: "Starting a New Project",
    intro: "Ready to build something? Here's the pattern:",
    step1: {
      title: "1. Create a session for your project",
      note: "This creates a persistent workspace named \"my-awesome-app\".",
    },
    step2: {
      title: "2. Create and navigate to a project folder",
    },
    step3: {
      title: "3. Start Claude and describe your project",
      note: "Tell Claude what you want to build. For example:",
      example: "\"Create a React app with TypeScript that shows a todo list\"",
    },
    tip: "Claude will set up the project structure, install dependencies, and start building. You can guide it step by step or give it the whole vision at once.",
  },

  findingAround: {
    title: "Finding Your Way Around",
    homeFolder: {
      title: "Your home folder",
      content: "Everything you create lives in /home/ubuntu (or just ~).",
      desc: "Go to your home folder",
    },
    seeHere: {
      title: "See what's here",
      desc: "List files (with icons!)",
      note: "We installed lsd — a prettier version of ls.",
    },
    navigate: {
      title: "Navigate into a folder",
      enterDesc: "Enter a folder",
      backDesc: "Go back up",
    },
    findFast: {
      title: "Find files fast",
      searchDesc: "Search file contents",
      findDesc: "Find files by name",
    },
    tip: "Pro tip: Use z (zoxide) to jump to folders you've visited before. Just type z proj to jump to your projects folder!",
  },

  first5Minutes: {
    title: "Your First 5 Minutes",
    intro: "Let's make sure everything works with a quick test run.",
    step1: {
      title: "Create a project folder",
    },
    step2: {
      title: "Authenticate Claude",
      note: "The terminal will display a URL. Copy it and open in your laptop's browser to log in, then return to your terminal.",
    },
    step3: {
      title: "Start Claude Code",
      note: "After authenticating, this launches Claude Code.",
    },
    step4: {
      title: "Your first prompt",
      note: "In the Claude prompt, type:",
      example: "Create a simple Python script that prints \"Hello from AI!\" and run it",
    },
    step5: {
      title: "Watch the magic!",
      intro: "Claude will:",
      results: [
        "Create a file called hello.py",
        "Write the Python code",
        "Run the script for you",
        "Show \"Hello from AI!\" in the output",
      ],
    },
    success: "Congratulations! You just used AI to write and run code!",
  },

  gettingBackIn: {
    title: "Getting Back In",
    intro: "Closed your terminal? Here's how to reconnect:",
    step1: {
      title: "1. Open your terminal app",
      note: "Ghostty, WezTerm, or Windows Terminal",
    },
    step2: {
      title: "2. Connect to your VPS",
    },
    step3: {
      title: "3. Resume your session (if using NTM)",
      listDesc: "See your sessions",
      attachDesc: "Resume a session",
      note: "This brings back exactly where you left off — including any running Claude sessions!",
    },
    sshConfigTip: {
      title: "Pro tip: Set up SSH config for easier access",
      intro: "Add this to your local ~/.ssh/config file:",
      after: "Then just type: ssh myserver",
    },
    windowsTip: {
      title: "Windows User? Set up one-click VPS access",
      content: "Create a Windows Terminal profile to connect to your VPS with a single click →",
    },
  },

  whatYouCanDo: {
    title: "What you can do now",
    claudeCode: {
      title: "Start Claude Code",
      desc: "Launch your AI coding assistant",
    },
    ntm: {
      title: "Use tmux with ntm",
      desc: "Manage terminal sessions",
    },
    ripgrep: {
      title: "Search with ripgrep",
      desc: "Fast code search",
    },
    lazygit: {
      title: "Git with lazygit",
      desc: "Visual git interface",
    },
  },

  manualEditing: {
    title: "How to edit files manually (when AI gets something wrong)",
    nano: {
      title: "Quick edits with nano",
      intro: "For simple fixes, nano is already installed on your VPS:",
      desc: "Open a file in nano",
      shortcuts: "Nano shortcuts:",
      save: "Ctrl + O, then Enter — Save",
      exit: "Ctrl + X — Exit",
      search: "Ctrl + W — Search",
    },
    cursor: {
      title: "Full IDE with Cursor (recommended)",
      intro: "Cursor is an AI-native code editor with great remote editing support (like VS Code Remote SSH).",
      steps: [
        "Download Cursor from cursor.com",
        "Open the command palette: Cmd/Ctrl + Shift + P",
        "Search: Remote-SSH: Connect to Host",
        "Connect to ubuntu@{IP} (it will use your SSH key)",
      ],
      tip: "Cursor is built on VS Code, so extensions work the same way — including Remote SSH. You get a full IDE experience (syntax highlighting, file explorer, extensions) while editing files directly on your VPS.",
    },
  },

  resources: {
    title: "Learn more",
    links: {
      github: "Agent Flywheel GitHub Repository",
      claudeDocs: "Claude Code Documentation",
    },
  },

  guide: {
    whatJustHappened: {
      term: "What just happened?",
      intro: "You've just finished setting up a professional-grade cloud development environment! Your VPS now has:",
      shell: "A powerful shell (zsh): A modern command-line interface with auto-suggestions and beautiful colors",
      aiAssistants: "AI coding assistants: Claude Code, Codex, and Gemini CLI are ready to help you write code",
      devTools: "Development tools: Fast search (ripgrep), git interface (lazygit), and more",
      languages: "Programming languages: JavaScript/TypeScript (bun), Python (uv), Rust, and Go",
    },
    tmuxNtm: {
      term: "What is tmux and ntm?",
      problem: "The problem: When you SSH into your VPS and then close your laptop or lose internet, your terminal session dies. Any running commands stop.",
      solution: "The solution: tmux creates \"sessions\" that keep running on the VPS even when you disconnect. Your processes continue regardless of your connection state.",
      ntmExplain: "NTM (Named Tmux Manager) makes tmux easier. Instead of cryptic commands, you get simple ones:",
      commands: {
        new: "ntm new myproject — Start a new session",
        attach: "ntm attach myproject — Resume a session",
        list: "ntm list — See all your sessions",
      },
      example: "This is why you can start a Claude task, close your laptop, go to bed, and come back to find it completed. The session keeps running on the VPS.",
    },
    understandingTools: {
      title: "Understanding the Tools",
      cc: {
        title: "cc (Claude Code)",
        content: "This is your primary AI coding assistant. Type cc in any project folder and Claude will help you write, debug, and improve your code. It can read your files, make changes, run tests, and more.",
      },
      ntm: {
        title: "ntm (Named Tmux Manager)",
        content: "This manages your terminal \"sessions\". When you run ntm new myproject, it creates a persistent workspace that stays running even if you disconnect. Perfect for long-running tasks!",
      },
      rg: {
        title: "rg (ripgrep)",
        content: "Ultra-fast code search. Type rg \"searchterm\" to find any text across all your files in milliseconds. Essential for navigating large codebases.",
      },
      lazygit: {
        title: "lazygit",
        content: "A visual interface for Git. Much easier than remembering git commands! Type lazygit in any git repository to stage, commit, push, and manage branches visually.",
      },
    },
    firstSteps: {
      title: "Your First Steps",
      step1: {
        title: "Run the onboarding tutorial",
        content: "Type onboard and press Enter. This interactive tutorial teaches you the basics of your new environment.",
      },
      step2: {
        title: "Create your first project session",
        content: "Type ntm new hello-world to create a dedicated workspace for a test project.",
      },
      step3: {
        title: "Try Claude Code",
        content: "In your project folder, type cc and ask it to \"create a simple hello world script in Python\". Watch the magic happen!",
      },
    },
    tip: "Bookmark this page! You can always come back here to review the basic commands. Once you're comfortable with these basics, continue to Part Two to learn the advanced multi-agent workflow that makes this setup truly powerful.",
  },

  advancedWorkflow: {
    title: "Ready for the Advanced Workflow?",
    content: "After completing the Learning Hub basics, dive into the powerful multi-agent workflow that lets you build production-ready software at incredible speed. You'll learn how to orchestrate multiple AI agents working in parallel, use the \"best of all worlds\" planning technique, and run agent swarms that build features while you sleep.",
    startWithBasics: "Start with Basics",
    skipToAdvanced: "Skip to Advanced",
  },

  finalMessage: {
    title: "Happy coding!",
    subtitle: "Your agentic coding flywheel is ready to spin.",
  },
};

// Type definitions for wizard messages
export type WizardMessages = {
  common: typeof commonMessages;
  rentVps: typeof rentVpsMessages;
  sshConnect: typeof sshConnectMessages;
  accounts: typeof accountsMessages;
  verifyKeyConnection: typeof verifyKeyConnectionMessages;
  reconnectUbuntu: typeof reconnectUbuntuMessages;
  preflightCheck: typeof preflightCheckMessages;
  runInstaller: typeof runInstallerMessages;
  statusCheck: typeof statusCheckMessages;
  launchOnboarding: typeof launchOnboardingMessages;
};
