"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Terminal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard } from "@/components/alert-card";
import { OutputPreview } from "@/components/alert-card";
import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { useUserOS } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
  GuideCaution,
  DirectDownloadButton,
} from "@/components/simpler-guide";
import { useLocale, getInstallTerminalMessages } from "@/lib/i18n";

// Type for messages
type Messages = ReturnType<typeof getInstallTerminalMessages>;

interface TerminalCardProps {
  name: string;
  description: string;
  href: string;
}

function TerminalCard({ name, description, href }: TerminalCardProps) {
  // Convert name to tracking ID (e.g., "Ghostty" -> "terminal-ghostty")
  const trackingId = `terminal-${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <TrackedLink
      href={href}
      trackingId={trackingId}
      className={cn(
        "group relative flex items-center justify-between rounded-xl border p-4 transition-all duration-200",
        "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-md"
      )}
    >
      <div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </TrackedLink>
  );
}

// Direct download URLs for Mac terminals
const GHOSTTY_MAC_DMG = "https://release.files.ghostty.org/1.1.3/Ghostty.dmg";
const WEZTERM_MAC_DMG = "https://github.com/wez/wezterm/releases/download/20240203-110809-5046fc22/WezTerm-macos-20240203-110809-5046fc22.dmg";

function MacContent({ messages }: { messages: Messages }) {
  const m = messages.mac;
  const g = m.guide;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{
          __html: m.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        }} />

        <div className="grid gap-3 sm:grid-cols-2">
          <TerminalCard
            name={m.terminals.ghostty.name}
            description={m.terminals.ghostty.description}
            href="https://ghostty.org/download"
          />
          <TerminalCard
            name={m.terminals.wezterm.name}
            description={m.terminals.wezterm.description}
            href="https://wezfurlong.org/wezterm/installation.html"
          />
        </div>
      </div>

      <AlertCard variant="success" icon={Check} title={m.sshReady.title}>
        {m.sshReady.content}
      </AlertCard>

      {/* Beginner Guide for Mac */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={g.terminal.term}>
            {g.terminal.content}
            <br /><br />
            {g.terminal.analogy}
            <br /><br />
            {g.terminal.purpose}
          </GuideExplain>

          <GuideSection title={g.quickDownload.title}>
            <p className="mb-4" dangerouslySetInnerHTML={{
              __html: g.quickDownload.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <DirectDownloadButton
                href={GHOSTTY_MAC_DMG}
                filename="Ghostty.dmg"
                label={g.quickDownload.ghostty.label}
                sublabel={g.quickDownload.ghostty.sublabel}
              />
              <DirectDownloadButton
                href={WEZTERM_MAC_DMG}
                filename="WezTerm.dmg"
                label={g.quickDownload.wezterm.label}
                sublabel={g.quickDownload.wezterm.sublabel}
              />
            </div>
          </GuideSection>

          <GuideSection title={g.stepByStep.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={g.stepByStep.step1.title}>
                {g.stepByStep.step1.content}
                <br /><br />
                <em className="text-xs">{g.stepByStep.step1.fallback}</em>
              </GuideStep>

              <GuideStep number={2} title={g.stepByStep.step2.title}>
                <span dangerouslySetInnerHTML={{
                  __html: g.stepByStep.step2.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
                <br /><br />
                {g.stepByStep.step2.wait}
              </GuideStep>

              <GuideStep number={3} title={g.stepByStep.step3.title}>
                <ul className="list-disc space-y-2 pl-5">
                  <li>{g.stepByStep.step3.spotlight}</li>
                  <li>{g.stepByStep.step3.type}</li>
                  <li>{g.stepByStep.step3.enter}</li>
                </ul>
              </GuideStep>

              <GuideStep number={4} title={g.stepByStep.step4.title}>
                {g.stepByStep.step4.intro}
                <br /><br />
                {g.stepByStep.step4.ifHappens}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {g.stepByStep.step4.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{
                      __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>{g.tip}</GuideTip>

          <GuideCaution>{g.caution}</GuideCaution>
        </div>
      </SimplerGuide>
    </div>
  );
}

/**
 * Terminal Basics section - teaches users how to interact with the terminal
 * This is the foundational "Terminal Onboarding" content that helps beginners
 * understand prompts, copy/paste, and verify their terminal works.
 */
function TerminalBasicsSection({ os, messages }: { os: "mac" | "windows" | "linux"; messages: Messages }) {
  const tb = messages.terminalBasics;

  return (
    <div className="space-y-6 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          {tb.title}
        </h2>
        <p className="text-muted-foreground">
          {tb.intro}
        </p>
      </div>

      {/* Understanding the Prompt */}
      <div className="space-y-3">
        <h3 className="font-semibold">{tb.prompt.title}</h3>
        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{
          __html: tb.prompt.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        }} />
        <OutputPreview title={tb.prompt.examples}>
          <div className="space-y-1">
            <p><span className="text-[oklch(0.72_0.19_145)]">yourname@computer:~$</span> <span className="animate-pulse">_</span></p>
            <p><span className="text-[oklch(0.72_0.19_145)]">%</span> <span className="animate-pulse">_</span></p>
            {os === "windows" && <p><span className="text-[oklch(0.72_0.19_145)]">PS C:\Users\You&gt;</span> <span className="animate-pulse">_</span></p>}
          </div>
          <p className="mt-3 text-xs text-muted-foreground" dangerouslySetInnerHTML={{
            __html: tb.prompt.meaning.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }} />
        </OutputPreview>
      </div>

      {/* Copy/Paste in Terminal */}
      <div className="space-y-3">
        <h3 className="font-semibold">{tb.copyPaste.title}</h3>
        <p className="text-sm text-muted-foreground">
          {tb.copyPaste.intro}
        </p>
        {os === "mac" ? (
          <AlertCard variant="info" title={tb.copyPaste.mac.title}>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.mac.copy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.mac.paste.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.mac.alt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </ul>
          </AlertCard>
        ) : os === "windows" ? (
          <AlertCard variant="info" title={tb.copyPaste.windows.title}>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.windows.copy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.windows.paste.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.windows.note.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </ul>
          </AlertCard>
        ) : (
          <AlertCard variant="info" title={tb.copyPaste.linux.title}>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.linux.copy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.linux.paste.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <li dangerouslySetInnerHTML={{ __html: tb.copyPaste.linux.tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </ul>
          </AlertCard>
        )}
      </div>

      {/* Try Your First Command */}
      <div className="space-y-3">
        <h3 className="font-semibold">{tb.firstCommand.title}</h3>
        <p className="text-sm text-muted-foreground">
          {tb.firstCommand.intro}
        </p>
        <CommandCard
          command="echo hello"
          description={tb.firstCommand.commandDesc}
          showCheckbox
          persistKey="first-command-echo"
        />
        <OutputPreview title={tb.firstCommand.expected}>
          <p className="text-[oklch(0.72_0.19_145)]">hello</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {tb.firstCommand.success}
          </p>
        </OutputPreview>
      </div>

      {/* Success State */}
      <AlertCard variant="success" title={tb.ready.title}>
        {tb.ready.content}
      </AlertCard>
    </div>
  );
}

function WindowsContent({ messages }: { messages: Messages }) {
  const m = messages.windows;
  const g = m.guide;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{
          __html: m.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        }} />

        <TerminalCard
          name={m.terminal.name}
          description={m.terminal.description}
          href="ms-windows-store://pdp/?ProductId=9N0DX20HK701"
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">{m.verifySsh.title}</h3>
        <p className="text-sm text-muted-foreground">
          {m.verifySsh.content}
        </p>
        <CommandCard
          command="ssh -V"
          description={m.verifySsh.commandDesc}
          showCheckbox
          persistKey="verify-ssh-windows"
        />
      </div>

      {/* Beginner Guide for Windows */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={g.terminal.term}>
            {g.terminal.content}
            <br /><br />
            {g.terminal.analogy}
            <br /><br />
            {g.terminal.windowsNote}
          </GuideExplain>

          <GuideSection title={g.stepByStep.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={g.stepByStep.step1.title}>
                <ul className="list-disc space-y-2 pl-5">
                  {g.stepByStep.step1.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{
                      __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </GuideStep>

              <GuideStep number={2} title={g.stepByStep.step2.title}>
                <ul className="list-disc space-y-2 pl-5">
                  {g.stepByStep.step2.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{
                      __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </GuideStep>

              <GuideStep number={3} title={g.stepByStep.step3.title}>
                <ul className="list-disc space-y-2 pl-5">
                  {g.stepByStep.step3.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{
                      __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </GuideStep>

              <GuideStep number={4} title={g.stepByStep.step4.title}>
                <ul className="list-disc space-y-2 pl-5">
                  {g.stepByStep.step4.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{
                      __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={g.checkSsh.title}>
            <p className="mb-3">{g.checkSsh.intro}</p>
            <div className="space-y-4">
              <GuideStep number={1} title={g.checkSsh.step1.title}>
                {g.checkSsh.step1.content}
                <code className="mt-2 block overflow-x-auto rounded bg-muted px-3 py-2 font-mono text-sm">
                  ssh -V
                </code>
                <em className="mt-1 block text-xs">{g.checkSsh.step1.note}</em>
              </GuideStep>

              <GuideStep number={2} title={g.checkSsh.step2.title}>
                {g.checkSsh.step2.content}
              </GuideStep>

              <GuideStep number={3} title={g.checkSsh.step3.title}>
                {g.checkSsh.step3.intro}
                <code className="mt-2 block overflow-x-auto rounded bg-muted px-3 py-2 font-mono text-sm">
                  {g.checkSsh.step3.example}
                </code>
                {g.checkSsh.step3.note}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>{g.tip}</GuideTip>

          <GuideCaution>{g.caution}</GuideCaution>
        </div>
      </SimplerGuide>
    </div>
  );
}

export default function InstallTerminalPage() {
  const router = useRouter();
  const [os, , osLoaded] = useUserOS();
  const [isNavigating, setIsNavigating] = useState(false);
  const ready = osLoaded;
  const { locale } = useLocale();
  const messages = getInstallTerminalMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "install_terminal",
    stepNumber: 2,
    stepTitle: "Install Terminal",
  });

  // Redirect if no OS selected or if Linux (Linux users skip this step)
  useEffect(() => {
    if (!ready) return;
    if (os === null) {
      router.push(withCurrentSearch("/wizard/os-selection"));
    } else if (os === "linux") {
      // Linux users already have a terminal - skip to SSH key generation
      markStepComplete(2);
      router.push(withCurrentSearch("/wizard/generate-ssh-key"));
    }
  }, [ready, os, router]);

  const handleContinue = useCallback(() => {
    markComplete({ selected_os: os });
    markStepComplete(2);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/generate-ssh-key"));
  }, [router, os, markComplete]);

  // Show loading state while detecting OS or during SSR
  if (!ready || !os) {
    return (
      <div className="flex items-center justify-center py-12">
        <Terminal className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    );
  }

  // Linux users skip this step; render a neutral loading state to avoid briefly
  // showing Windows-specific content before the redirect effect runs.
  if (os === "linux") {
    return (
      <div className="flex items-center justify-center py-12">
        <Terminal className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Terminal className="h-5 w-5 text-primary" />
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

      {/* OS-specific content */}
      {os === "mac" ? <MacContent messages={messages} /> : <WindowsContent messages={messages} />}

      {/* Terminal Basics - Try Your First Commands */}
      <TerminalBasicsSection os={os} messages={messages} />

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={isNavigating} size="lg" disableMotion>
          {isNavigating ? messages.buttons.loading : messages.buttons.continue}
        </Button>
      </div>
    </div>
  );
}
