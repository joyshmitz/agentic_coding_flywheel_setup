"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Clock,
  ExternalLink,
  Check,
  Rocket,
  ShieldCheck,
  Code,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard, OutputPreview, DetailsSection } from "@/components/alert-card";
import { TrackedLink } from "@/components/tracked-link";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
  GuideCaution,
} from "@/components/simpler-guide";
import { Jargon } from "@/components/jargon";
import { useLocale, getRunInstallerMessages, getCommonMessages } from "@/lib/i18n";

const INSTALL_COMMAND = `curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/agentic_coding_flywheel_setup/main/install.sh?$(date +%s)" | bash -s -- --yes --mode vibe`;

// WHAT_IT_INSTALLS is static data (tool names are not translated)

export default function RunInstallerPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const { locale } = useLocale();
  const messages = getRunInstallerMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "run_installer",
    stepNumber: 9,
    stepTitle: "Run Installer",
  });

  const handleContinue = useCallback(() => {
    markComplete();
    markStepComplete(9);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/reconnect-ubuntu"));
  }, [router, markComplete]);

  // Static data for what gets installed (tool names are not translated)
  const whatItInstalls = [
    { category: messages.whatItInstalls.categories.shellTerminal, items: ["zsh + oh-my-zsh + powerlevel10k", "atuin (shell history)", "fzf", "zoxide", "lsd"] },
    { category: messages.whatItInstalls.categories.languages, items: ["bun (JavaScript/TypeScript)", "uv (Python)", "rust/cargo", "go"] },
    { category: messages.whatItInstalls.categories.devTools, items: ["tmux", "ripgrep", "ast-grep", "lazygit", "bat"] },
    { category: messages.whatItInstalls.categories.codingAgents, items: ["Claude Code", "Codex CLI", "Gemini CLI"] },
    { category: messages.whatItInstalls.categories.cloudDatabase, items: ["PostgreSQL 18", "Vault", "Wrangler", "Supabase CLI", "Vercel CLI"] },
    { category: messages.whatItInstalls.categories.dicklesworthstoneStack, items: ["ntm", "mcp_agent_mail", "beads_viewer", "and 5 more tools"] },
  ];

  return (
    <div className="space-y-8">
      {/* Header with sparkle */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-[oklch(0.7_0.2_330/0.3)] shadow-lg shadow-primary/20">
            <Rocket className="h-6 w-6 text-primary" />
            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-[oklch(0.78_0.16_75)] animate-pulse" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-primary via-foreground to-[oklch(0.7_0.2_330)] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              {messages.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {messages.timeEstimate}
            </p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          {messages.subtitle}
        </p>
      </div>

      {/* Warning */}
      <AlertCard variant="warning" title={messages.dontClose.title}>
        {messages.dontClose.content.split("SSH")[0]}<Jargon term="ssh">SSH</Jargon>{messages.dontClose.content.split("SSH")[1]}
      </AlertCard>

      {/* CRITICAL: SSH Key Prompt Warning */}
      <AlertCard variant="error" title={messages.sshKeyPrompt.title}>
        <div className="space-y-3">
          <p>
            <strong>{messages.sshKeyPrompt.intro}</strong>
          </p>
          <OutputPreview title="You'll see something like:" className="my-3">
            <pre className="text-muted-foreground whitespace-pre">{`════════════════════════════════════════
  SSH Key Setup
════════════════════════════════════════`}</pre>
            <p className="text-[oklch(0.78_0.16_75)] mt-2">{messages.sshKeyPrompt.promptExample} <span className="animate-pulse">_</span></p>
          </OutputPreview>
          <p>
            <strong className="text-foreground">{messages.sshKeyPrompt.pasteNow}</strong>{" "}
            {messages.sshKeyPrompt.keyFormat}
          </p>
          <p className="text-sm text-muted-foreground">
            {messages.sshKeyPrompt.missedPrompt}
          </p>
        </div>
      </AlertCard>

      {/* The command */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {messages.command.title}
        </h2>
        <CommandCard
          command={INSTALL_COMMAND}
          description={messages.command.desc}
          runLocation="vps"
          showCheckbox
          persistKey="run-flywheel-installer"
          className="border-2 border-primary/20"
        />
      </div>

      {/* Connection drop reassurance */}
      <AlertCard variant="info" icon={Wifi} title={messages.connectionDrop.title}>
        <div className="space-y-2">
          <p>
            <strong>{messages.connectionDrop.dontPanic}</strong> {messages.connectionDrop.intro}
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {messages.connectionDrop.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground">
            {messages.connectionDrop.note}
          </p>
        </div>
      </AlertCard>

      {/* Transparency & trust */}
      <div className="flex gap-3 rounded-xl border border-[oklch(0.72_0.19_145/0.25)] bg-[oklch(0.72_0.19_145/0.05)] p-3 sm:p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.72_0.19_145/0.15)] sm:h-9 sm:w-9">
          <ShieldCheck className="h-4 w-4 text-[oklch(0.72_0.19_145)] sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-[13px] font-medium leading-tight text-[oklch(0.82_0.12_145)] sm:text-sm">
            {messages.transparency.title}
          </p>
          <p className="text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
            {messages.transparency.intro}
          </p>
          <div className="flex flex-wrap gap-2">
            <TrackedLink
              href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup/blob/main/install.sh"
              trackingId="install-sh-source"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.1)] px-2.5 py-1.5 text-[11px] font-medium text-[oklch(0.75_0.18_195)] transition-colors hover:bg-[oklch(0.75_0.18_195/0.2)] sm:text-xs"
            >
              <Code className="h-3 w-3" />
              {messages.transparency.viewSource}
              <ExternalLink className="h-2.5 w-2.5" />
            </TrackedLink>
            <TrackedLink
              href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup"
              trackingId="github-repo"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground sm:text-xs"
            >
              {messages.transparency.fullRepo}
              <ExternalLink className="h-2.5 w-2.5" />
            </TrackedLink>
          </div>
        </div>
      </div>

      {/* Time estimate */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-5 w-5" />
        <span>{messages.timeEstimateNote}</span>
      </div>

      {/* Command breakdown for curious users */}
      <DetailsSection summary={messages.commandBreakdown.title}>
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            {messages.commandBreakdown.intro}
          </p>
          <div className="space-y-4 font-mono text-xs">
            <div>
              <code className="text-[oklch(0.75_0.18_195)]">curl -fsSL &quot;https://...&quot;</code>
              <p className="mt-1 font-sans text-muted-foreground">
                {messages.commandBreakdown.curl}
              </p>
            </div>
            <div>
              <code className="text-[oklch(0.75_0.18_195)]">| bash</code>
              <p className="mt-1 font-sans text-muted-foreground">
                {messages.commandBreakdown.pipe}
              </p>
            </div>
            <div>
              <code className="text-[oklch(0.75_0.18_195)]">-s -- --yes</code>
              <p className="mt-1 font-sans text-muted-foreground">
                {messages.commandBreakdown.yes}
              </p>
            </div>
            <div>
              <code className="text-[oklch(0.75_0.18_195)]">--mode vibe</code>
              <p className="mt-1 font-sans text-muted-foreground">
                {messages.commandBreakdown.mode}
              </p>
            </div>
          </div>
          <AlertCard variant="info" title={messages.commandBreakdown.curlBashSafe.title}>
            <p className="text-sm">
              {messages.commandBreakdown.curlBashSafe.content}
            </p>
          </AlertCard>
        </div>
      </DetailsSection>

      {/* What it installs - collapsible */}
      <DetailsSection summary={messages.whatItInstalls.title}>
        <div className="grid gap-4 sm:grid-cols-2">
          {whatItInstalls.map((group) => (
            <div key={group.category}>
              <h4 className="mb-2 font-medium text-foreground">{group.category}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-[oklch(0.72_0.19_145)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DetailsSection>

      {/* View source */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          {messages.viewSourceInline}
        </span>
        <TrackedLink
          href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup/blob/main/install.sh"
          trackingId="install-sh-source-inline"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {messages.transparency.viewSource}
          <ExternalLink className="h-3 w-3" />
        </TrackedLink>
      </div>

      {/* Installation output guide */}
      <AlertCard variant="info" title={messages.installationOutput.title}>
        <div className="space-y-2 text-sm">
          <p>{messages.installationOutput.intro}</p>
          <ul className="list-inside list-disc space-y-1">
            <li><span className="text-[oklch(0.72_0.19_145)] font-medium">{messages.installationOutput.green}</span></li>
            <li><span className="text-[oklch(0.78_0.16_75)] font-medium">{messages.installationOutput.yellow}</span></li>
            <li><span className="text-[oklch(0.65_0.22_25)] font-medium">{messages.installationOutput.red}</span></li>
          </ul>
          <p className="text-muted-foreground">
            {messages.installationOutput.note}
          </p>
        </div>
      </AlertCard>

      {/* Success signs */}
      <OutputPreview title={messages.successSigns.title}>
        <p className="text-[oklch(0.72_0.19_145)]">{messages.successSigns.complete}</p>
        <p className="text-muted-foreground">
          {messages.successSigns.reconnect}
        </p>
      </OutputPreview>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whatIsCommand.term}>
            {messages.guide.whatIsCommand.content}
            <br /><br />
            {messages.guide.whatIsCommand.idempotent.split("idempotent")[0]}<Jargon term="idempotent">&quot;idempotent&quot;</Jargon>{messages.guide.whatIsCommand.idempotent.split("idempotent")[1]}
          </GuideExplain>

          <GuideSection title={messages.guide.stepByStep.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.stepByStep.step1.title}>
                {messages.guide.stepByStep.step1.content}
                <br /><br />
                {messages.guide.stepByStep.step1.notConnected}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.stepByStep.step2.title}>
                {messages.guide.stepByStep.step2.content}
              </GuideStep>

              <GuideStep number={3} title={messages.guide.stepByStep.step3.title}>
                {messages.guide.stepByStep.step3.content}
                <br /><br />
                {messages.guide.stepByStep.step3.normal}
              </GuideStep>

              <GuideStep number={4} title={messages.guide.stepByStep.step4.title}>
                {messages.guide.stepByStep.step4.intro}
                <OutputPreview title="What you'll see" className="mt-3">
                  <p className="text-[oklch(0.72_0.19_145)]">[1/8] Installing zsh + oh-my-zsh...</p>
                  <p className="text-[oklch(0.72_0.19_145)]">[2/8] Installing bun...</p>
                  <p className="text-[oklch(0.72_0.19_145)]">[3/8] Installing development tools...</p>
                  <p className="text-muted-foreground">... lots of download output ...</p>
                  <p className="text-[oklch(0.72_0.19_145)]">[8/8] Installing AI coding agents...</p>
                  <p className="text-[oklch(0.72_0.19_145)] font-medium mt-1">{messages.successSigns.complete}</p>
                </OutputPreview>
                <p className="mt-3">
                  {messages.guide.stepByStep.step4.dontClose}
                </p>
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.whatGetsInstalled.title}>
            <p className="mb-3">
              {messages.guide.whatGetsInstalled.intro}
            </p>
            <ul className="space-y-2">
              <li>
                <strong>{messages.guide.whatGetsInstalled.shell}</strong>
              </li>
              <li>
                <strong>{messages.guide.whatGetsInstalled.languages}</strong>
              </li>
              <li>
                <strong>{messages.guide.whatGetsInstalled.aiAssistants}</strong>
              </li>
              <li>
                <strong>{messages.guide.whatGetsInstalled.devTools}</strong>
              </li>
            </ul>
          </GuideSection>

          <GuideTip>
            {messages.guide.tip}
          </GuideTip>

          <GuideCaution>
            {messages.guide.caution}
          </GuideCaution>

          <GuideSection title={messages.guide.ifStuck.title}>
            <p className="mb-3">
              {messages.guide.ifStuck.intro}
            </p>
            <ul className="space-y-3">
              <li>
                {messages.guide.ifStuck.rust}
              </li>
              <li>
                {messages.guide.ifStuck.ohmyzsh}
              </li>
              <li>
                {messages.guide.ifStuck.noOutput}
              </li>
              <li>
                {messages.guide.ifStuck.actualError}
              </li>
            </ul>
            <GuideTip className="mt-4">
              {messages.guide.ifStuck.timeLimit}
            </GuideTip>
          </GuideSection>
        </div>
      </SimplerGuide>

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={isNavigating} size="lg" disableMotion>
          {isNavigating ? messages.buttons.loading : messages.buttons.continue}
        </Button>
      </div>
    </div>
  );
}
