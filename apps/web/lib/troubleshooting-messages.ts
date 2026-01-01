/**
 * Troubleshooting Messages - English (Default)
 *
 * All user-facing text for the troubleshooting page.
 * Organized for easy maintenance and translation.
 */

export const troubleshootingMessages = {
  title: "Troubleshooting",
  description: "Common issues and their solutions. Search for error messages or browse by category.",

  searchPlaceholder: "Search issues (e.g., 'connection refused', 'permission denied')...",

  resultsText: {
    showing: "Showing",
    of: "of",
    issues: "issues",
  },

  noResults: {
    title: "No issues match your search.",
    suggestion: "Try different keywords or",
    clearFilters: "clear all filters",
  },

  categories: {
    all: "All",
    ssh: "SSH & Connection",
    installation: "Installation",
    agents: "AI Agents",
    network: "Network",
  },

  sections: {
    symptoms: "Symptoms",
    causes: "Possible Causes",
    solutions: "Solutions",
    prevention: "Prevention",
  },

  navigation: {
    home: "Home",
    setupWizard: "Setup Wizard",
  },

  helpSection: {
    title: "Still stuck?",
    intro: "If you can't find your issue here, try these resources:",
    glossary: {
      text: "Check the",
      link: "Glossary",
      suffix: "for unfamiliar terms",
    },
    github: {
      text: "Visit the",
      link: "GitHub Issues",
      suffix: "page for community help",
    },
    learn: {
      text: "Review the",
      link: "Learning Hub",
      suffix: "for guided tutorials",
    },
  },

  issues: [
    {
      id: "ssh-connection-refused",
      title: "SSH Connection Refused",
      category: "ssh",
      symptoms: [
        "Error: Connection refused",
        "ssh: connect to host ... port 22: Connection refused",
      ],
      causes: [
        "VPS is still starting up (not fully booted)",
        "SSH service not running on the VPS",
        "Firewall blocking port 22",
        "Wrong IP address",
      ],
      solutions: [
        {
          title: "Wait for VPS to fully start",
          steps: [
            "New VPS instances can take 2-5 minutes to fully boot",
            "Check your VPS provider's dashboard to confirm status is 'Running'",
            "Wait another minute after the dashboard shows 'Running'",
          ],
        },
        {
          title: "Verify the IP address",
          steps: [
            "Double-check the IP in your VPS provider's dashboard",
            "Make sure you're not mixing up IPs from multiple VPS instances",
          ],
        },
        {
          title: "Check if port 22 is open",
          steps: [
            "Some providers require you to enable SSH in security settings",
            "Look for 'Security Groups' or 'Firewall Rules' in your provider's dashboard",
          ],
        },
      ],
      prevention: "Always wait for the VPS status to show 'Running' before attempting to connect.",
    },
    {
      id: "ssh-timeout",
      title: "SSH Connection Times Out",
      category: "ssh",
      symptoms: [
        "Connection timed out",
        "SSH hangs without any response",
        "Operation timed out",
      ],
      causes: [
        "Wrong IP address",
        "Firewall blocking your IP",
        "Network issues between you and the VPS",
        "VPS is in a region with poor connectivity to you",
      ],
      solutions: [
        {
          title: "Verify connectivity",
          steps: [
            "Try pinging the IP address to check basic connectivity",
            "If ping works but SSH doesn't, it's likely a firewall issue",
          ],
          command: "ping YOUR_VPS_IP",
        },
        {
          title: "Check your local network",
          steps: [
            "Try from a different network (e.g., mobile hotspot)",
            "Disable VPN if you're using one",
            "Check if your ISP or corporate firewall blocks port 22",
          ],
        },
      ],
      prevention: "Choose a VPS region geographically close to you for better connectivity.",
    },
    {
      id: "ssh-permission-denied",
      title: "Permission Denied (publickey)",
      category: "ssh",
      symptoms: [
        "Permission denied (publickey)",
        "No more authentication methods to try",
        "Permission denied (publickey,keyboard-interactive)",
      ],
      causes: [
        "SSH key not added to VPS",
        "Wrong username (should be 'ubuntu' not 'root')",
        "SSH key file has wrong permissions",
        "Using wrong SSH key file",
      ],
      solutions: [
        {
          title: "Verify you're using the right username",
          steps: [
            "For Ubuntu VPS, the username is 'ubuntu', not 'root'",
            "Update your SSH command accordingly",
          ],
          command: "ssh -i ~/.ssh/acfs_ed25519 ubuntu@YOUR_VPS_IP",
        },
        {
          title: "Check SSH key permissions",
          steps: [
            "SSH keys must have restricted permissions (600 or 400)",
            "Run the chmod command to fix permissions",
          ],
          command: "chmod 600 ~/.ssh/acfs_ed25519",
        },
        {
          title: "Use password authentication first",
          steps: [
            "If your provider gave you a root password, connect with password first",
            "Then add your SSH key to the authorized_keys file",
          ],
        },
      ],
      prevention: "Always verify your SSH key was added correctly during VPS creation.",
    },
    {
      id: "session-disconnected",
      title: "SSH Session Disconnected",
      category: "ssh",
      symptoms: [
        "Connection reset by peer",
        "Broken pipe",
        "Session terminates unexpectedly",
      ],
      causes: [
        "Network instability",
        "Idle timeout (no activity)",
        "VPS ran out of memory",
      ],
      solutions: [
        {
          title: "Use tmux/ntm to persist sessions",
          steps: [
            "Always work inside a tmux session using ntm",
            "Even if disconnected, your work continues",
            "Just reconnect and reattach to your session",
          ],
          command: "ntm new myproject",
        },
        {
          title: "Configure SSH keep-alive",
          steps: [
            "Add ServerAliveInterval to your SSH config",
            "This sends periodic keep-alive packets",
          ],
        },
      ],
      prevention: "Always work inside tmux sessions. Use 'ntm new projectname' before starting work.",
    },
    {
      id: "install-curl-fails",
      title: "Installer Download Fails",
      category: "installation",
      symptoms: [
        "curl: (6) Could not resolve host",
        "curl: (7) Failed to connect",
        "404 Not Found when downloading installer",
      ],
      causes: [
        "DNS resolution issues on VPS",
        "GitHub is temporarily unreachable",
        "Network configuration problem",
      ],
      solutions: [
        {
          title: "Check DNS resolution",
          steps: [
            "Test if DNS is working",
            "If it fails, you may need to configure DNS manually",
          ],
          command: "ping -c 3 github.com",
        },
        {
          title: "Wait and retry",
          steps: [
            "GitHub occasionally has brief outages",
            "Wait a few minutes and try again",
          ],
        },
      ],
    },
    {
      id: "install-permission-denied",
      title: "Installation Permission Denied",
      category: "installation",
      symptoms: [
        "Permission denied during installation",
        "Cannot write to /home/ubuntu",
        "sudo: command not found",
      ],
      causes: [
        "Running as wrong user",
        "Incorrect sudo configuration",
        "Filesystem permissions issue",
      ],
      solutions: [
        {
          title: "Verify you're the ubuntu user",
          steps: [
            "Check your current user",
            "If you're root, switch to ubuntu",
          ],
          command: "whoami",
        },
        {
          title: "Re-run installer with correct user",
          steps: [
            "The installer should be run as the ubuntu user, not root",
            "It will use sudo internally when needed",
          ],
        },
      ],
    },
    {
      id: "install-disk-full",
      title: "Disk Space Exhausted",
      category: "installation",
      symptoms: [
        "No space left on device",
        "Cannot allocate memory",
        "Installation stops partway through",
      ],
      causes: [
        "VPS disk is too small",
        "Previous installation left junk files",
        "Log files consuming space",
      ],
      solutions: [
        {
          title: "Check available disk space",
          steps: [
            "View disk usage",
            "You need at least 10GB free for ACFS",
          ],
          command: "df -h",
        },
        {
          title: "Clean up if needed",
          steps: [
            "Clear apt cache",
            "Remove old log files",
          ],
          command: "sudo apt clean && sudo journalctl --vacuum-time=1d",
        },
      ],
      prevention: "Use a VPS with at least 40GB disk for comfortable development.",
    },
    {
      id: "claude-auth-fail",
      title: "Claude Code Authentication Fails",
      category: "agents",
      symptoms: [
        "Authentication failed",
        "Invalid API key",
        "Unable to verify subscription",
      ],
      causes: [
        "No active Claude subscription",
        "Authentication URL expired",
        "Browser blocking the auth redirect",
      ],
      solutions: [
        {
          title: "Complete authentication flow",
          steps: [
            "Run 'claude' in terminal",
            "Copy the URL displayed",
            "Open in your laptop's browser (not on VPS)",
            "Log in with your Anthropic account",
            "Return to terminal after success message",
          ],
          command: "claude",
        },
        {
          title: "Check your subscription",
          steps: [
            "Verify you have an active Claude subscription",
            "Visit console.anthropic.com to check status",
          ],
        },
      ],
    },
    {
      id: "agent-rate-limited",
      title: "AI Agent Rate Limited",
      category: "agents",
      symptoms: [
        "Rate limit exceeded",
        "Too many requests",
        "429 error",
      ],
      causes: [
        "Too many concurrent requests",
        "Hitting daily/monthly limits",
        "Multiple agents running simultaneously",
      ],
      solutions: [
        {
          title: "Wait and retry",
          steps: [
            "Rate limits usually reset within minutes",
            "Check your subscription tier's limits",
          ],
        },
        {
          title: "Reduce concurrent usage",
          steps: [
            "Don't run multiple AI sessions simultaneously",
            "Close unused agent sessions",
          ],
        },
      ],
      prevention: "Monitor your API usage in each provider's dashboard.",
    },
    {
      id: "p10k-wizard-stuck",
      title: "Powerlevel10k Wizard Appears",
      category: "installation",
      symptoms: [
        "Colorful terminal wizard appears on first login",
        "Prompts about font configuration",
        "Terminal looks different after installation",
      ],
      causes: [
        "Normal behavior - P10k configuration wizard runs once",
      ],
      solutions: [
        {
          title: "Skip or configure",
          steps: [
            "Press 'q' to quit and use ACFS defaults",
            "Or follow the prompts to customize your terminal appearance",
            "Either option is fine - ACFS already set sensible defaults",
          ],
        },
      ],
      prevention: "This is expected on first login. Just press 'q' to skip if unsure.",
    },
    {
      id: "ssh-host-key-changed",
      title: "Host Key Verification Failed",
      category: "ssh",
      symptoms: [
        "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!",
        "Host key verification failed",
        "Offending key in known_hosts",
      ],
      causes: [
        "You recreated your VPS but kept the same IP address",
        "The VPS was reinstalled with a new OS",
        "You're connecting to a different server with the same IP",
      ],
      solutions: [
        {
          title: "Remove the old host key (Mac/Linux)",
          steps: [
            "If you just recreated your VPS, this is expected",
            "Remove the old key and connect again",
            "You'll be prompted to accept the new key",
          ],
          command: "ssh-keygen -R YOUR_VPS_IP",
        },
        {
          title: "Remove the old host key (Windows)",
          steps: [
            "Open the known_hosts file in Notepad",
            "Delete the line containing your VPS IP",
            "Save and try connecting again",
          ],
          command: "notepad %USERPROFILE%\\.ssh\\known_hosts",
        },
      ],
      prevention: "This warning is a security feature. Only remove old keys if you know why the key changed (e.g., VPS reinstall).",
    },
    {
      id: "ssh-too-many-auth",
      title: "Too Many Authentication Failures",
      category: "ssh",
      symptoms: [
        "Too many authentication failures",
        "Received disconnect from host: Too many authentication failures",
        "Connection closed by remote host",
      ],
      causes: [
        "You have multiple SSH keys and the client tries them all",
        "Too many failed login attempts",
        "SSH agent has too many keys loaded",
      ],
      solutions: [
        {
          title: "Specify the exact key to use",
          steps: [
            "Tell SSH to only use your specific key file",
            "The IdentitiesOnly option prevents trying other keys",
          ],
          command: "ssh -i ~/.ssh/acfs_ed25519 -o IdentitiesOnly=yes ubuntu@YOUR_VPS_IP",
        },
        {
          title: "Clear SSH agent keys",
          steps: [
            "If you have many keys loaded in your SSH agent",
            "Clear them all and add only the one you need",
          ],
          command: "ssh-add -D && ssh-add ~/.ssh/acfs_ed25519",
        },
      ],
      prevention: "Use an SSH config file to specify which key to use for each server.",
    },
    {
      id: "ssh-slow-connection",
      title: "SSH Connection is Slow",
      category: "ssh",
      symptoms: [
        "Connection takes 30+ seconds",
        "Hangs after 'Connecting to...'",
        "Delays after password/key accepted",
      ],
      causes: [
        "DNS reverse lookup on the server",
        "GSSAPI authentication trying to connect to Kerberos",
        "Slow network route between you and VPS",
      ],
      solutions: [
        {
          title: "Disable GSSAPI authentication (quick fix)",
          steps: [
            "Add this option to skip Kerberos authentication",
            "This often fixes slow connections immediately",
          ],
          command: "ssh -o GSSAPIAuthentication=no ubuntu@YOUR_VPS_IP",
        },
        {
          title: "Make it permanent in SSH config",
          steps: [
            "Add to your ~/.ssh/config file:",
            "Host *",
            "  GSSAPIAuthentication no",
            "  ServerAliveInterval 60",
          ],
        },
      ],
      prevention: "Configure SSH options in ~/.ssh/config for persistent settings.",
    },
    {
      id: "vps-provider-verification",
      title: "VPS Provider Account Verification Pending",
      category: "network",
      symptoms: [
        "Cannot log into VPS provider dashboard",
        "Account pending verification",
        "Payment not processed",
      ],
      causes: [
        "New accounts often require identity verification",
        "Credit card verification still processing",
        "Email not verified",
      ],
      solutions: [
        {
          title: "Complete email verification",
          steps: [
            "Check your email inbox and spam folder",
            "Click the verification link from the provider",
            "Some providers require you to reply to a verification email",
          ],
        },
        {
          title: "Wait for payment processing",
          steps: [
            "New credit cards can take up to 24 hours to verify",
            "Prepaid cards may not be accepted",
            "Contact provider support if payment is stuck",
          ],
        },
        {
          title: "Check for identity verification request",
          steps: [
            "Some providers (especially Contabo) require ID verification",
            "Check your email for requests for additional documents",
            "This is more common for new accounts with large orders",
          ],
        },
      ],
      prevention: "Use a verified payment method and respond promptly to verification emails.",
    },
  ],
};
