"use client";

import { useEffect } from "react";
import { PartyPopper, BookOpen, ExternalLink, Sparkles, ArrowRight, GraduationCap, Terminal, RefreshCw, FolderPlus, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CommandCard } from "@/components/command-card";
import { AlertCard } from "@/components/alert-card";
import { markStepComplete, setCompletedSteps, TOTAL_STEPS } from "@/lib/wizardSteps";
import { trackConversion } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
} from "@/components/simpler-guide";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { Jargon } from "@/components/jargon";
import { useVPSIP } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import { useLocale, getLaunchOnboardingMessages } from "@/lib/i18n";

// Confetti colors
const CONFETTI_COLORS = [
  "oklch(0.75 0.18 195)", // cyan
  "oklch(0.78 0.16 75)",  // amber
  "oklch(0.7 0.2 330)",   // magenta
  "oklch(0.72 0.19 145)", // green
];

interface ConfettiParticleData {
  id: number;
  delay: number;
  left: number;
  color: string;
  size: number;
  rotation: number;
  duration: number;
  isRound: boolean;
}

const CONFETTI_PARTICLES: ConfettiParticleData[] = Array.from({ length: 50 }, (_, i) => {
  const seed = i + 1;

  return {
    id: i,
    delay: (seed * 97) % 1000,
    left: (seed * 37) % 100,
    color: CONFETTI_COLORS[seed % CONFETTI_COLORS.length],
    size: 6 + ((seed * 13) % 7),
    rotation: (seed * 137) % 360,
    duration: 2500 + ((seed * 101) % 1500),
    isRound: seed % 3 === 0,
  };
});

// Confetti particle component - all random values passed as props for deterministic rendering
function ConfettiParticle({ delay, left, color, size, rotation, duration, isRound }: Omit<ConfettiParticleData, 'id'>) {
  return (
    <div
      className="pointer-events-none fixed animate-confetti-fall"
      style={{
        left: `${left}%`,
        top: "-20px",
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          transform: `rotate(${rotation}deg)`,
          borderRadius: isRound ? "50%" : "2px",
        }}
      />
    </div>
  );
}

export default function LaunchOnboardingPage() {
  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "launch_onboarding",
    stepNumber: 13,
    stepTitle: "Launch Onboarding",
  });

  // i18n
  const { locale } = useLocale();
  const messages = getLaunchOnboardingMessages(locale);

  // Get user's VPS IP for reconnection instructions
  const [vpsIP] = useVPSIP();
  const displayIP = vpsIP || "YOUR_VPS_IP";

  // Mark all steps complete on reaching this page
  useEffect(() => {
    markComplete({ wizard_completed: true });
    markStepComplete(13);
    // Mark all steps as completed
    const allSteps = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);
    setCompletedSteps(allSteps);
  }, [markComplete]);

  return (
    <div className="space-y-8">
      {/* Confetti */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
        {CONFETTI_PARTICLES.map((p) => (
          <ConfettiParticle
            key={p.id}
            delay={p.delay}
            left={p.left}
            color={p.color}
            size={p.size}
            rotation={p.rotation}
            duration={p.duration}
            isRound={p.isRound}
          />
        ))}
      </div>

      {/* Celebration header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="relative rounded-full bg-[oklch(0.72_0.19_145/0.2)] p-4 shadow-lg shadow-[oklch(0.72_0.19_145/0.3)]">
            <PartyPopper className="h-12 w-12 text-[oklch(0.72_0.19_145)]" />
            <Sparkles className="absolute -right-1 -top-1 h-6 w-6 text-[oklch(0.78_0.16_75)] animate-pulse" />
          </div>
        </div>
        <h1 className="bg-gradient-to-r from-[oklch(0.72_0.19_145)] via-primary to-[oklch(0.7_0.2_330)] bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          {messages.congratulations}
        </h1>
        <p className="text-lg text-muted-foreground">
          {messages.subtitle.split("VPS")[0]}<Jargon term="vps">VPS</Jargon>{messages.subtitle.split("VPS")[1].split("AI-assisted")[0]}<Jargon term="agentic">AI-assisted</Jargon>{messages.subtitle.split("AI-assisted")[1]}
        </p>
      </div>

      {/* Powerlevel10k Configuration Warning */}
      <AlertCard variant="warning" title={messages.p10kWarning.title}>
        <div className="space-y-2 text-sm">
          <p>
            {messages.p10kWarning.intro}
          </p>
          <p className="text-muted-foreground">
            {messages.p10kWarning.optional}
          </p>
        </div>
      </AlertCard>

      {/* Important: Authenticate Your AI Tools First */}
      <Card className="border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.08)] p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-[oklch(0.78_0.16_75)]" />
            <h2 className="text-xl font-semibold">{messages.authenticateTools.title}</h2>
          </div>
          <p className="text-muted-foreground">
            {messages.authenticateTools.intro}
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold text-sm">1</div>
              <div className="space-y-3">
                <p className="font-medium">{messages.authenticateTools.claudeCode.title}</p>
                <CommandCard
                  command="claude"
                  description={messages.authenticateTools.claudeCode.desc}
                  runLocation="vps"
                />
                {/* Detailed OAuth flow explanation */}
                <div className="rounded-lg border border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.05)] p-3 text-sm space-y-2">
                  <p className="font-medium text-[oklch(0.78_0.16_75)]">{messages.authenticateTools.claudeCode.howItWorks}</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    {messages.authenticateTools.claudeCode.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <p className="text-xs text-muted-foreground mt-2">
                    {messages.authenticateTools.claudeCode.note}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold text-sm">2</div>
              <div>
                <p className="font-medium">{messages.authenticateTools.codex.title}</p>
                <CommandCard
                  command="codex login"
                  description={messages.authenticateTools.codex.desc}
                  runLocation="vps"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold text-sm">3</div>
              <div>
                <p className="font-medium">{messages.authenticateTools.gemini.title}</p>
                <CommandCard command="gemini" description={messages.authenticateTools.gemini.desc} runLocation="vps" />
              </div>
            </div>
          </div>
          <GuideTip>
            {messages.authenticateTools.vibeShortcuts}
          </GuideTip>
        </div>
      </Card>

      {/* Learning Hub CTA - Primary */}
      <Card className="border-primary/20 bg-primary/5 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">{messages.learningHub.title}</h2>
          </div>
          <p className="text-muted-foreground">
            {messages.learningHub.content}
          </p>
          <Link href="/learn" onClick={() => trackConversion('learning_hub_started')}>
            <Button size="lg" className="w-full sm:w-auto">
              <BookOpen className="mr-2 h-4 w-4" />
              {messages.learningHub.startButton}
            </Button>
          </Link>
          <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span>
              {messages.learningHub.terminalNote}
            </span>
          </div>
        </div>
      </Card>

      {/* Your Daily Workflow - Key pattern for ongoing use */}
      <Card className="border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.05)] p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-[oklch(0.78_0.16_75)]" />
            <h2 className="text-xl font-semibold">{messages.dailyWorkflow.title}</h2>
          </div>
          <p className="text-muted-foreground">
            {messages.dailyWorkflow.intro}
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold">
              1
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.dailyWorkflow.step1.title}</h3>
              <CommandCard
                command={`ssh -i ~/.ssh/acfs_ed25519 ubuntu@${displayIP}`}
                windowsCommand={`ssh -i $HOME\\.ssh\\acfs_ed25519 ubuntu@${displayIP}`}
                runLocation="local"
              />
              <p className="text-sm text-muted-foreground">{messages.dailyWorkflow.step1.note}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold">
              2
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.dailyWorkflow.step2.title}</h3>
              <div className="space-y-2">
                <CommandCard command="ntm list" description={messages.dailyWorkflow.step2.listDesc} runLocation="vps" />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <CommandCard command="ntm attach myproject" description={messages.dailyWorkflow.step2.attachDesc} runLocation="vps" />
                </div>
                <div className="flex-1">
                  <CommandCard command="ntm new myproject" description={messages.dailyWorkflow.step2.newDesc} runLocation="vps" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold">
              3
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.dailyWorkflow.step3.title}</h3>
              <CommandCard command="cc" description={messages.dailyWorkflow.step3.desc} runLocation="vps" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.16_75)] text-[oklch(0.15_0.02_75)] font-bold">
              4
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.dailyWorkflow.step4.title}</h3>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1 rounded-lg border border-border/50 bg-card/50 p-3">
                  <p className="text-sm text-muted-foreground mb-2">{messages.dailyWorkflow.step4.detach}</p>
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-sm">Ctrl</kbd>
                    <span className="text-muted-foreground">+</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-sm">A</kbd>
                    <span className="text-muted-foreground mx-1">then</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-sm">D</kbd>
                  </div>
                </div>
                <div className="flex-1">
                  <CommandCard command="exit" description={messages.dailyWorkflow.step4.disconnect} runLocation="vps" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {messages.dailyWorkflow.step4.keepRunning}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.1)] p-4 text-center">
          <p className="text-sm font-medium">
            {messages.dailyWorkflow.remember}
          </p>
        </div>
      </Card>

      {/* Starting a New Project - How to begin real work */}
      <Card className="border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.05)] p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-[oklch(0.75_0.18_195)]" />
            <h2 className="text-xl font-semibold">{messages.startingProject.title}</h2>
          </div>
          <p className="text-muted-foreground">
            {messages.startingProject.intro}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">{messages.startingProject.step1.title}</h3>
            <CommandCard command="ntm new my-awesome-app" runLocation="vps" />
            <p className="text-sm text-muted-foreground">
              {messages.startingProject.step1.note}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">{messages.startingProject.step2.title}</h3>
            <CommandCard command="mkdir ~/projects/my-awesome-app && cd ~/projects/my-awesome-app" runLocation="vps" />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">{messages.startingProject.step3.title}</h3>
            <CommandCard command="cc" runLocation="vps" />
            <p className="text-sm text-muted-foreground">
              {messages.startingProject.step3.note}
            </p>
            <div className="rounded-lg bg-muted px-4 py-3 font-mono text-sm">
              {messages.startingProject.step3.example}
            </div>
          </div>

          <GuideTip>
            {messages.startingProject.tip}
          </GuideTip>
        </div>
      </Card>

      {/* Finding Your Way Around - Filesystem orientation */}
      <Card className="border-[oklch(0.7_0.2_330/0.3)] bg-[oklch(0.7_0.2_330/0.05)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="h-5 w-5 text-[oklch(0.7_0.2_330)]" />
          <h2 className="text-xl font-semibold">{messages.findingAround.title}</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">{messages.findingAround.homeFolder.title}</p>
            <p className="text-sm text-muted-foreground">
              {messages.findingAround.homeFolder.content}
            </p>
            <CommandCard command="cd ~" description={messages.findingAround.homeFolder.desc} runLocation="vps" />
          </div>

          <div className="space-y-2">
            <p className="font-medium">{messages.findingAround.seeHere.title}</p>
            <CommandCard command="lsd" description={messages.findingAround.seeHere.desc} runLocation="vps" />
            <p className="text-sm text-muted-foreground">
              {messages.findingAround.seeHere.note}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">{messages.findingAround.navigate.title}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <div className="flex-1">
                <CommandCard command="cd projects" description={messages.findingAround.navigate.enterDesc} runLocation="vps" />
              </div>
              <div className="flex-1">
                <CommandCard command="cd .." description={messages.findingAround.navigate.backDesc} runLocation="vps" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">{messages.findingAround.findFast.title}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <div className="flex-1">
                <CommandCard command='rg "search term"' description={messages.findingAround.findFast.searchDesc} runLocation="vps" />
              </div>
              <div className="flex-1">
                <CommandCard command="fd filename" description={messages.findingAround.findFast.findDesc} runLocation="vps" />
              </div>
            </div>
          </div>

          <GuideTip>
            {messages.findingAround.tip}
          </GuideTip>
        </div>
      </Card>

      {/* Your First 5 Minutes */}
      <Card className="border-primary/30 bg-primary/5 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[oklch(0.78_0.16_75)]" />
            <h2 className="text-xl font-semibold">{messages.first5Minutes.title}</h2>
          </div>
          <p className="text-muted-foreground">
            {messages.first5Minutes.intro}
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              1
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.first5Minutes.step1.title}</h3>
              <CommandCard command="mkdir ~/my-first-project && cd ~/my-first-project" runLocation="vps" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              2
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.first5Minutes.step2.title}</h3>
              <CommandCard command="claude" runLocation="vps" />
              <p className="text-sm text-muted-foreground">
                {messages.first5Minutes.step2.note}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              3
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.first5Minutes.step3.title}</h3>
              <CommandCard command="cc" runLocation="vps" />
              <p className="text-sm text-muted-foreground">
                {messages.first5Minutes.step3.note}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              4
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.first5Minutes.step4.title}</h3>
              <p className="text-sm text-muted-foreground">
                {messages.first5Minutes.step4.note}
              </p>
              <div className="rounded-lg bg-muted px-4 py-3 font-mono text-sm">
                {messages.first5Minutes.step4.example}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              5
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{messages.first5Minutes.step5.title}</h3>
              <p className="text-sm text-muted-foreground">
                {messages.first5Minutes.step5.intro}
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {messages.first5Minutes.step5.results.map((result, i) => (
                  <li key={i}>✓ {result}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[oklch(0.72_0.19_145/0.3)] bg-[oklch(0.72_0.19_145/0.1)] p-4 text-center">
          <p className="text-lg font-medium">
            {messages.first5Minutes.success}
          </p>
        </div>
      </Card>

      {/* Getting Back In */}
      <Card className="border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.05)] p-6">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="h-6 w-6 text-[oklch(0.75_0.18_195)]" />
          <h2 className="text-xl font-semibold">{messages.gettingBackIn.title}</h2>
        </div>

        <p className="text-muted-foreground mb-4">
          {messages.gettingBackIn.intro}
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{messages.gettingBackIn.step1.title}</h3>
            <p className="text-sm text-muted-foreground">
              {messages.gettingBackIn.step1.note}
            </p>
          </div>

          <div>
            <h3 className="font-medium">{messages.gettingBackIn.step2.title}</h3>
            <CommandCard
              command={`ssh -i ~/.ssh/acfs_ed25519 ubuntu@${displayIP}`}
              windowsCommand={`ssh -i $HOME\\.ssh\\acfs_ed25519 ubuntu@${displayIP}`}
              runLocation="local"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">{messages.gettingBackIn.step3.title}</h3>
            <CommandCard command="ntm list" description={messages.gettingBackIn.step3.listDesc} runLocation="vps" />
            <CommandCard command="ntm attach myproject" description={messages.gettingBackIn.step3.attachDesc} runLocation="vps" />
            <p className="text-sm text-muted-foreground mt-2">
              {messages.gettingBackIn.step3.note}
            </p>
          </div>
        </div>

        {/* SSH Config tip */}
        <details className="mt-6 group">
          <summary className="cursor-pointer font-medium text-[oklch(0.75_0.18_195)] hover:text-[oklch(0.65_0.18_195)] transition-colors">
            {messages.gettingBackIn.sshConfigTip.title}
          </summary>
          <div className="mt-4 space-y-4 pl-6 border-l-2 border-[oklch(0.75_0.18_195/0.3)]">
            <p className="text-sm text-muted-foreground">
              {messages.gettingBackIn.sshConfigTip.intro}
            </p>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto">
{`Host myserver
    HostName ${displayIP}
    User ubuntu
    IdentityFile ~/.ssh/acfs_ed25519`}
            </pre>
            <p className="text-sm text-muted-foreground">
              {messages.gettingBackIn.sshConfigTip.after}
            </p>
          </div>
        </details>

        {/* Windows Terminal tip */}
        <div className="mt-6 rounded-lg border border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.1)] p-4">
          <Link
            href={withCurrentSearch("/wizard/windows-terminal-setup")}
            className="flex items-start gap-3"
          >
            <Terminal className="mt-0.5 h-5 w-5 text-[oklch(0.75_0.18_195)]" />
            <div>
              <p className="font-medium text-foreground">
                {messages.gettingBackIn.windowsTip.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {messages.gettingBackIn.windowsTip.content}
              </p>
            </div>
          </Link>
        </div>
      </Card>

      {/* What you can do now */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.whatYouCanDo.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-4">
            <h3 className="mb-2 font-medium">{messages.whatYouCanDo.claudeCode.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {messages.whatYouCanDo.claudeCode.desc}
            </p>
            <code className="rounded bg-muted px-2 py-1 text-sm">cc</code>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 font-medium">{messages.whatYouCanDo.ntm.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {messages.whatYouCanDo.ntm.desc}
            </p>
            <code className="rounded bg-muted px-2 py-1 text-sm">ntm new myproject</code>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 font-medium">{messages.whatYouCanDo.ripgrep.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {messages.whatYouCanDo.ripgrep.desc}
            </p>
            <code className="rounded bg-muted px-2 py-1 text-sm">rg &quot;pattern&quot;</code>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 font-medium">{messages.whatYouCanDo.lazygit.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {messages.whatYouCanDo.lazygit.desc}
            </p>
            <code className="rounded bg-muted px-2 py-1 text-sm">lazygit</code>
          </Card>
        </div>
      </div>

      {/* Manual editing escape hatch */}
      <Card className="border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <details className="group">
          <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">
            {messages.manualEditing.title}
          </summary>
          <div className="mt-4 space-y-6 pl-4 border-l-2 border-primary/20">
            <div>
              <h3 className="font-medium">{messages.manualEditing.nano.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {messages.manualEditing.nano.intro}
              </p>
              <CommandCard command="nano hello.py" description={messages.manualEditing.nano.desc} runLocation="vps" />
              <p className="mt-3 text-sm text-muted-foreground">{messages.manualEditing.nano.shortcuts}</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Ctrl</kbd> +{" "}
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">O</kbd>, then{" "}
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Enter</kbd> — {messages.manualEditing.nano.save}
                </li>
                <li>
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Ctrl</kbd> +{" "}
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">X</kbd> — {messages.manualEditing.nano.exit}
                </li>
                <li>
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Ctrl</kbd> +{" "}
                  <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">W</kbd> — {messages.manualEditing.nano.search}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">{messages.manualEditing.cursor.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {messages.manualEditing.cursor.intro}
              </p>
              <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  {messages.manualEditing.cursor.steps[0]}{" "}
                  <a
                    href="https://cursor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    cursor.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  {messages.manualEditing.cursor.steps[1]}
                </li>
                <li>{messages.manualEditing.cursor.steps[2]}</li>
                <li>
                  {messages.manualEditing.cursor.steps[3].replace("{IP}", displayIP)}
                </li>
              </ol>
              <GuideTip className="mt-4">
                {messages.manualEditing.cursor.tip}
              </GuideTip>
            </div>
          </div>
        </details>
      </Card>

      {/* Resources */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-medium">{messages.resources.title}</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {messages.resources.links.github}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.anthropic.com/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {messages.resources.links.claudeDocs}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whatJustHappened.term}>
            {messages.guide.whatJustHappened.intro}
            <ul className="mt-3 space-y-2">
              <li>
                <strong>{messages.guide.whatJustHappened.shell.split(":")[0]}:</strong>{messages.guide.whatJustHappened.shell.split(":")[1]}
              </li>
              <li>
                <strong>{messages.guide.whatJustHappened.aiAssistants.split(":")[0]}:</strong>{messages.guide.whatJustHappened.aiAssistants.split(":")[1]}
              </li>
              <li>
                <strong>{messages.guide.whatJustHappened.devTools.split(":")[0]}:</strong>{messages.guide.whatJustHappened.devTools.split(":")[1]}
              </li>
              <li>
                <strong>{messages.guide.whatJustHappened.languages.split(":")[0]}:</strong>{messages.guide.whatJustHappened.languages.split(":")[1]}
              </li>
            </ul>
          </GuideExplain>

          <GuideExplain term={messages.guide.tmuxNtm.term}>
            <p>
              <strong>{messages.guide.tmuxNtm.problem.split(":")[0]}:</strong>{messages.guide.tmuxNtm.problem.split(":")[1]}
            </p>
            <p className="mt-3">
              <strong>{messages.guide.tmuxNtm.solution.split(":")[0]}:</strong> <Jargon term="tmux">tmux</Jargon>{messages.guide.tmuxNtm.solution.split("tmux")[1]}
            </p>
            <p className="mt-3">
              {messages.guide.tmuxNtm.ntmExplain}
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {Object.values(messages.guide.tmuxNtm.commands).map((cmd, i) => (
                <li key={i}>{cmd}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              {messages.guide.tmuxNtm.example}
            </p>
          </GuideExplain>

          <GuideSection title={messages.guide.understandingTools.title}>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground">{messages.guide.understandingTools.cc.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.understandingTools.cc.content}
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">{messages.guide.understandingTools.ntm.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.understandingTools.ntm.content}
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">{messages.guide.understandingTools.rg.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.understandingTools.rg.content}
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">{messages.guide.understandingTools.lazygit.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.understandingTools.lazygit.content}
                </p>
              </div>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.firstSteps.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.firstSteps.step1.title}>
                {messages.guide.firstSteps.step1.content}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.firstSteps.step2.title}>
                {messages.guide.firstSteps.step2.content}
              </GuideStep>

              <GuideStep number={3} title={messages.guide.firstSteps.step3.title}>
                {messages.guide.firstSteps.step3.content}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>
            {messages.guide.tip}
          </GuideTip>
        </div>
      </SimplerGuide>

      {/* Continue to Part Two */}
      <Card className="border-2 border-[oklch(0.7_0.2_330/0.3)] bg-gradient-to-r from-[oklch(0.7_0.2_330/0.05)] to-[oklch(0.75_0.18_195/0.05)] p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-[oklch(0.7_0.2_330)]" />
            <h2 className="text-xl font-semibold">{messages.advancedWorkflow.title}</h2>
          </div>
          <p className="text-muted-foreground">
            {messages.advancedWorkflow.content}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/learn" onClick={() => trackConversion('learning_hub_started')}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <BookOpen className="mr-2 h-4 w-4" />
                {messages.advancedWorkflow.startWithBasics}
              </Button>
            </Link>
            <Link href="/workflow">
              <Button size="lg" className="w-full sm:w-auto">
                {messages.advancedWorkflow.skipToAdvanced}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Final message */}
      <div className="rounded-lg border-2 border-dashed border-primary/30 p-6 text-center">
        <p className="text-lg font-medium">
          {messages.finalMessage.title}
        </p>
        <p className="mt-1 text-muted-foreground">
          {messages.finalMessage.subtitle}
        </p>
      </div>
    </div>
  );
}
