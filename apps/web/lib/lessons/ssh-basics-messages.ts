/**
 * SSH Basics Lesson Messages - English (Default)
 *
 * All user-facing text for the SSH basics lesson component.
 * Organized by component structure for easy maintenance.
 */

export const sshBasicsLessonMessages = {
  goalBanner: {
    content: "Understand how to stay connected to your VPS.",
  },

  whatIsSSH: {
    title: "What Is SSH?",
    description: "is how you're connected to this VPS right now.",
    highlight: "SSH (Secure Shell)",
    tunnelDescription: "It's an encrypted tunnel between your laptop and this server.",
  },

  connectionDiagram: {
    yourLaptop: "Your Laptop",
    encryptedSSH: "Encrypted SSH",
    yourVPS: "Your VPS",
  },

  howYouGotHere: {
    title: "How You Got Here",
    description: "Your VPS connection happened in two stages:",

    breakdownTitle: "Breaking down the command:",

    stages: {
      passwordLogin: {
        number: 1,
        title: "Password Login",
        subtitle: "During Setup",
        description: "When you first created your VPS, you connected as root with a password",
      },
      keyBasedLogin: {
        number: 2,
        title: "Key-Based Login",
        subtitle: "Now",
        description: "The installer copied your SSH key, so now you connect securely",
      },
    },

    commandParts: {
      ssh: {
        label: "ssh",
        description: "The command",
      },
      privateKey: {
        label: "-i ~/.ssh/acfs_ed25519",
        description: "Your private key",
      },
      user: {
        label: "ubuntu",
        description: "Your regular user (safer than root)",
      },
      serverAddress: {
        label: "@YOUR_SERVER_IP",
        description: "The server address",
      },
    },
  },

  connectionDrops: {
    title: "If Your Connection Drops",

    tipBox: {
      content: "No worries! SSH connections drop sometimes. Just reconnect—your work is safe in tmux (next lesson).",
    },
  },

  sshKeysVsPasswords: {
    title: "SSH Keys vs Passwords",
    description: "You're now using key-based authentication:",

    keyTypes: {
      privateKey: {
        title: "Private Key",
        description: "Stays on your laptop at ~/.ssh/acfs_ed25519",
      },
      publicKey: {
        title: "Public Key",
        description: "Lives on the VPS at ~/.ssh/authorized_keys",
      },
    },

    securityNote: "This is more secure than passwords and lets you connect without typing anything.",
  },

  keepingConnectionsAlive: {
    title: "Keeping Connections Alive",
    description: "Add this to your laptop's ~/.ssh/config:",
    keepaliveNote: "This sends keepalive packets every 60 seconds.",
  },

  quickConnectAlias: {
    title: "Quick Connect Alias",
    description: "On your laptop, add to ~/.zshrc or ~/.bashrc:",
    usage: "Then just type vps to connect!",
  },

  verifyUnderstanding: {
    title: "Verify Your Understanding",

    questions: [
      {
        question: "Where does your private key live?",
        answer: "~/.ssh/acfs_ed25519 on your laptop",
      },
      {
        question: "What happens if SSH drops?",
        answer: "Reconnect; tmux saves your work",
      },
      {
        question: "What's the quick way to reconnect?",
        answer: "Use an alias",
      },
    ],
  },

  practiceNow: {
    title: "Practice This Now",
    description: "Try these commands to confirm your SSH setup is working:",

    tipBox: {
      content: "When you see your public key (starts with ssh-ed25519), you know the setup worked!",
    },
  },
};