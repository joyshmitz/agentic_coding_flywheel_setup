/**
 * Connection Check Component Messages - English (Default)
 *
 * User-facing text for VPS connection verification components.
 */

export const connectionCheckMessages = {
  mainWarning: {
    title: "STOP! Are you connected to your VPS?",
    description: "The command below runs on your VPS, not on your laptop. If you're not connected, the command will fail.",
  },

  comparison: {
    wrongTitle: "Wrong - You're on your laptop",
    correctTitle: "Correct - You're on the VPS",
    or: "or:",
  },

  howToConnect: {
    title: "Not connected? Run this first:",
    onWindows: "On Windows:",
  },

  twoComputers: {
    title: "Understanding: You have TWO computers",
    yourComputer: "Your Computer",
    laptopDesktop: "(laptop/desktop)",
    windowsOrMac: "Windows or Mac",
    ssh: "SSH",
    yourVps: "Your VPS",
    remoteServer: "(remote server)",
    linuxInCloud: "Linux in the cloud",
    sshExplanation: "is like a phone call to your VPS. When you're \"connected via SSH\", everything you type happens on the VPS, not your laptop.",
    sshHighlight: "SSH",
    terminalExplanation: "on your laptop is where you start the SSH connection. But once connected, you're controlling the VPS.",
    terminalHighlight: "PowerShell, Command Prompt, or Terminal",
  },

  whereAmI: {
    title: "How do I know if I'm connected to my VPS?",
    promptExplanation: "Look at your terminal prompt (the text before where you type):",
    connectedTitle: "You ARE connected to your VPS if you see:",
    connectedHint1: "or",
    connectedHint2Prefix: "The prompt ends with",
    connectedHint2Or: "or",
    connectedHint3: "A colorful prompt (if you ran the installer already)",
    notConnectedTitle: "You are NOT connected (still on your laptop) if you see:",
    notConnectedHint1: "(Windows Command Prompt)",
    notConnectedHint2: "(PowerShell)",
    notConnectedHint3: "(Mac Terminal)",
    notConnectedHint4: "Any mention of your laptop's name or your Windows/Mac username",
    stillConfused: "Still confused?",
    hostnameHint: "Type",
    hostnameAnd: "and press Enter. If it shows your laptop's name (like \"DESKTOP-ABC123\" or \"MacBook-Pro\"), you're not connected. If it shows something like \"vps-12345\", you're on the VPS.",
  },
};
