/**
 * Security Messages - English (Default)
 *
 * All user-facing text for the security best practices page.
 * Organized for easy maintenance and translation.
 */

export type ChecklistItem = {
  id: string;
  label: string;
  href?: string;
};

export const securityMessages = {
  title: "Security best practices (Google SSO strategy)",
  description:
    "ACFS is built for velocity. This page covers account security so your 'one login everywhere' setup stays safe.",

  navigation: {
    home: "Home",
    docs: "Docs",
    security: "Security",
  },

  scopeNote: {
    title: "Scope note",
    description:
      "This is account security (SSO, passwords, recovery). It's not a full VPS-hardening guide.",
    accountSecurity: "account security",
  },

  whyGoogleSso: {
    title: "Why we recommend Google SSO",
    benefits: [
      {
        highlight: "Fewer passwords",
        text: "means fewer weak points.",
      },
      {
        highlight: "One identity across services",
        text: "makes setup smoother (especially for beginners).",
      },
      {
        highlight: "Faster recovery",
        text: "if you lose access to a service, you recover through Google.",
      },
    ],
    modelTitle: "The model:",
    tree: {
      root: "Your Google Account",
      children: [
        "Tailscale (VPS access)",
        "Claude (primary coding agent)",
        "ChatGPT / Codex (secondary agent)",
        "Gemini (optional agent)",
        "Vercel (deployments)",
        "Supabase / Cloudflare (optional)",
      ],
    },
  },

  tradeoff: {
    title: "The trade-off",
    description:
      "Centralizing access is powerful, but it creates a single point of failure. That's why securing your Google account is step zero.",
    singlePointOfFailure: "single point of failure",
  },

  secureGoogle: {
    title: "Secure your Google account",
    description:
      "If you do only one thing: enable 2‑Step Verification with an authenticator app (not SMS).",
    buttons: {
      enable2sv: "Enable 2‑Step Verification",
      advancedProtection: "Advanced Protection Program (security keys)",
    },
    links: {
      enable2sv: "https://myaccount.google.com/signinoptions/two-step-verification",
      advancedProtection: "https://landing.google.com/advancedprotection/",
    },
  },

  servicesWithoutSso: {
    title: "Services without Google SSO",
    description: "Some services don't support Google SSO (or you may choose not to use it). For those:",
    tips: [
      "Use a strong, unique password (password manager recommended).",
      "Enable the service's built-in 2FA.",
      "Prefer authenticator apps or security keys over SMS.",
    ],
  },

  passwordManagers: {
    title: "Password manager recommendations",
    description:
      "For services without Google SSO, use a password manager to generate and store strong, unique passwords.",
    managers: [
      {
        name: "1Password",
        description: "Best overall. Great UX, developer tools.",
        href: "https://1password.com/",
        featured: true,
      },
      {
        name: "Bitwarden",
        description: "Best free option. Open-source.",
        href: "https://bitwarden.com/",
        featured: false,
      },
      {
        name: "Apple Keychain",
        description: "Built into macOS/iOS. Good if already in Apple ecosystem.",
        href: undefined,
        featured: false,
      },
    ],
  },

  compromised: {
    title: "What if Google gets compromised?",
    description: "If you suspect unauthorized access, act immediately:",
    steps: [
      {
        highlight: "Change your Google password",
        text: "from a trusted device.",
        link: undefined,
      },
      {
        highlight: "Revoke all app permissions",
        text: "at",
        link: {
          text: "myaccount.google.com/permissions",
          href: "https://myaccount.google.com/permissions",
        },
      },
      {
        highlight: "Check recent activity",
        text: "at",
        link: {
          text: "myaccount.google.com/device-activity",
          href: "https://myaccount.google.com/device-activity",
        },
      },
      {
        highlight: "Re-authenticate all SSO services",
        text: "(log out and back in).",
        link: undefined,
      },
      {
        highlight: "Enable Advanced Protection",
        text: "to prevent future compromises.",
        link: undefined,
      },
    ],
  },

  checklist: {
    title: "Quick security checklist",
    description: "Track your progress here (saved to localStorage on this device).",
    resetButton: "Reset",
    tip: "Tip: if you're in the wizard, go back to Accounts after you've secured your Google account.",
    accountsPage: "Accounts",
    items: [
      {
        id: "google-2sv",
        label: "Enable Google 2‑Step Verification (use an authenticator app, not SMS).",
        href: "https://myaccount.google.com/signinoptions/two-step-verification",
      },
      {
        id: "google-recovery",
        label: "Set recovery email + recovery phone (so you can recover access).",
        href: "https://myaccount.google.com/security",
      },
      {
        id: "google-permissions",
        label: "Review and revoke unknown connected apps.",
        href: "https://myaccount.google.com/permissions",
      },
      {
        id: "password-manager",
        label: "Use a password manager for anything that isn't Google SSO.",
      },
      {
        id: "github-2fa",
        label: "Enable GitHub 2FA (email/password services need their own 2FA).",
        href: "https://github.com/settings/security",
      },
      {
        id: "cloudflare-2fa",
        label: "Enable Cloudflare 2FA (email/password service).",
        href: "https://dash.cloudflare.com/profile/authentication",
      },
    ] as ChecklistItem[],
  },
};
