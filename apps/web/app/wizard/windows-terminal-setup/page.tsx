"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Settings,
  Plus,
  Save,
  RefreshCw,
  Check,
  Copy,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertCard, OutputPreview } from "@/components/alert-card";
import { useVPSIP } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideExplain,
  GuideTip,
} from "@/components/simpler-guide";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { useLocale, getWindowsTerminalSetupMessages } from "@/lib/i18n";

export default function WindowsTerminalSetupPage() {
  const router = useRouter();
  const [vpsIP, , vpsIPLoaded] = useVPSIP();
  const [copied, setCopied] = useState(false);
  const ready = vpsIPLoaded;
  const { locale } = useLocale();
  const messages = getWindowsTerminalSetupMessages(locale);

  // Analytics tracking for this wizard step
  useWizardAnalytics({
    step: "windows_terminal_setup",
    stepNumber: 0, // Bonus/optional step
    stepTitle: "Windows Terminal Setup",
  });

  // Redirect if no VPS IP (after hydration)
  useEffect(() => {
    if (!ready) return;
    if (vpsIP === null) {
      router.push(withCurrentSearch("/wizard/create-vps"));
    }
  }, [ready, vpsIP, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const displayIP = vpsIP || "YOUR_VPS_IP";
  const sshCommandLine = `ssh -i %USERPROFILE%\\.ssh\\acfs_ed25519 ubuntu@${displayIP}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sshCommandLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = sshCommandLine;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [sshCommandLine]);

  if (!ready || !vpsIP) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.75_0.18_195/0.2)]">
            <Terminal className="h-5 w-5 text-[oklch(0.75_0.18_195)]" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              {messages.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {messages.timeEstimate}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          {messages.description}
        </p>
      </div>

      {/* Why this is helpful */}
      <AlertCard variant="success" icon={Terminal} title={messages.whySetup.title}>
        <div className="space-y-2">
          <p>
            {messages.whySetup.intro}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {messages.whySetup.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>
      </AlertCard>

      {/* Step by Step */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          {messages.steps.title}
        </h2>

        {/* Step 1 */}
        <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              1
            </div>
            <h3 className="font-semibold">{messages.steps.step1.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            {messages.steps.step1.content}
          </p>
          <p className="text-sm text-muted-foreground pl-11">
            {messages.steps.step1.alt}
          </p>
        </div>

        {/* Step 2 */}
        <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              2
            </div>
            <h3 className="font-semibold">{messages.steps.step2.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            {messages.steps.step2.content}{" "}
            <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 font-medium">
              <Plus className="h-3 w-3" /> {messages.steps.step2.addProfile}
            </span>
          </p>
          <p className="text-sm text-muted-foreground pl-11">
            {messages.steps.step2.then}
          </p>
        </div>

        {/* Step 3 */}
        <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              3
            </div>
            <h3 className="font-semibold">{messages.steps.step3.title}</h3>
          </div>
          <div className="pl-11 space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">{messages.steps.step3.name.label}</p>
              <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
                {messages.steps.step3.name.value}
              </code>
              <p className="text-xs text-muted-foreground mt-1">
                {messages.steps.step3.name.hint}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">{messages.steps.step3.commandLine.label}</p>
              <div className="relative">
                <code className="block rounded bg-muted px-3 py-2 pr-12 font-mono text-sm overflow-x-auto">
                  {sshCommandLine}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[oklch(0.72_0.19_145)]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {messages.steps.step3.commandLine.hint.replace("{ip}", displayIP)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">{messages.steps.step3.startingDir.label}</p>
              <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
                %USERPROFILE%
              </code>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">{messages.steps.step3.icon.label}</p>
              <p className="text-sm text-muted-foreground">
                {messages.steps.step3.icon.hint}
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              4
            </div>
            <h3 className="font-semibold">{messages.steps.step4.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            {messages.steps.step4.save.split("Save")[0]}
            <span className="inline-flex items-center gap-1 rounded bg-primary/20 px-1.5 py-0.5 font-medium text-primary">
              <Save className="h-3 w-3" /> {messages.buttons.save}
            </span>
            {messages.steps.step4.save.split("Save")[1]}
          </p>
          <p className="text-sm text-muted-foreground pl-11">
            {messages.steps.step4.test}
          </p>
        </div>
      </div>

      {/* What you'll see */}
      <OutputPreview title={messages.preview.title}>
        <div className="space-y-1 font-mono text-xs">
          <p className="text-muted-foreground">{messages.preview.connecting.replace("{ip}", displayIP)}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.preview.welcome}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.preview.prompt}</p>
        </div>
      </OutputPreview>

      {/* Optional: Make it default */}
      <AlertCard variant="info" icon={Settings} title={messages.makeDefault.title}>
        <div className="space-y-2 text-sm">
          <p>
            {messages.makeDefault.intro}
          </p>
          <ol className="list-decimal list-inside space-y-1">
            {messages.makeDefault.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="text-muted-foreground">
            {messages.makeDefault.result}
          </p>
        </div>
      </AlertCard>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whatIs.term}>
            {messages.guide.whatIs.content}
            <br /><br />
            {messages.guide.whatIs.getIt.split("Microsoft Store")[0]}
            <a
              href="https://apps.microsoft.com/detail/9n0dx20hk701"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Microsoft Store
              <ExternalLink className="h-3 w-3" />
            </a>
            {messages.guide.whatIs.getIt.split("Microsoft Store")[1]}
          </GuideExplain>

          <GuideSection title={messages.guide.troubleshooting.title}>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{messages.guide.troubleshooting.permissionDenied.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.troubleshooting.permissionDenied.content}
                </p>
              </div>
              <div>
                <p className="font-medium">{messages.guide.troubleshooting.connectionRefused.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.troubleshooting.connectionRefused.content.replace("{ip}", displayIP)}
                </p>
              </div>
              <div>
                <p className="font-medium">{messages.guide.troubleshooting.hostKeyFailed.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.troubleshooting.hostKeyFailed.content}
                </p>
              </div>
            </div>
          </GuideSection>

          <GuideTip>
            {messages.guide.tip}
          </GuideTip>
        </div>
      </SimplerGuide>

      {/* Back button */}
      <div className="flex justify-start pt-4">
        <Button onClick={handleBack} variant="outline" size="lg" disableMotion>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {messages.buttons.back}
        </Button>
      </div>
    </div>
  );
}
