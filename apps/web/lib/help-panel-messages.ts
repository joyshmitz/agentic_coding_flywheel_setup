/**
 * Help Panel Messages - English (Default)
 *
 * User-facing text for the wizard help panel component.
 */

export const helpPanelMessages = {
  trigger: {
    label: "Need help?",
    ariaLabel: "Need help?",
  },
  dialog: {
    title: "Step {step} Help",
    closeAriaLabel: "Close",
  },
  sections: {
    commonIssues: "Common Issues",
    tips: "Tips",
  },
  debug: {
    title: "Share Debug Info",
    description:
      "Copy this information when asking for help — it helps us diagnose the issue faster.",
    copyButton: "Copy Debug Info",
    copied: "Copied",
  },
  defaultTips: [
    "Make sure you're following the steps in order.",
    "If a command fails, try running it again — transient errors are common.",
    "Check that you're running commands in the right place (local terminal vs. VPS).",
  ],
};
