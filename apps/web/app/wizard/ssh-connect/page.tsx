"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, ChevronDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard, OutputPreview } from "@/components/alert-card";
import { TwoComputersExplainer } from "@/components/connection-check";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { useVPSIP, useUserOS } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
  GuideCaution,
} from "@/components/simpler-guide";
import { useLocale, getSshConnectMessages, getCommonMessages } from "@/lib/i18n";

interface TroubleshootingItem {
  error: string;
  causes: string[];
  solutions: string[];
}

interface TroubleshootingLabels {
  possibleCauses: string;
  solutions: string;
}

function TroubleshootingSection({
  item,
  isExpanded,
  onToggle,
  labels,
}: {
  item: TroubleshootingItem;
  isExpanded: boolean;
  onToggle: () => void;
  labels: TroubleshootingLabels;
}) {
  return (
    <div className="rounded-lg border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50"
      >
        <span className="font-medium text-destructive">{item.error}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      {isExpanded && (
        <div className="space-y-3 border-t px-3 pb-3 pt-2 text-sm">
          <div>
            <p className="font-medium">{labels.possibleCauses}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
              {item.causes.map((cause, i) => (
                <li key={i}>{cause}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">{labels.solutions}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
              {item.solutions.map((solution, i) => (
                <li key={i}>{solution}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SSHConnectPage() {
  const router = useRouter();
  const [vpsIP, , vpsIPLoaded] = useVPSIP();
  const [os, , osLoaded] = useUserOS();
  const [expandedError, setExpandedError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const ready = vpsIPLoaded && osLoaded;
  const { locale } = useLocale();
  const messages = getSshConnectMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "ssh_connect",
    stepNumber: 6,
    stepTitle: "SSH Connect",
  });

  // Redirect if missing required data (after hydration)
  useEffect(() => {
    if (!ready) return;
    if (vpsIP === null) {
      router.push(withCurrentSearch("/wizard/create-vps"));
    } else if (os === null) {
      router.push(withCurrentSearch("/wizard/os-selection"));
    }
  }, [ready, vpsIP, os, router]);

  const handleContinue = useCallback(() => {
    markComplete();
    markStepComplete(6);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/accounts"));
  }, [router, markComplete]);

  if (!ready || !vpsIP || !os) {
    return (
      <div className="flex items-center justify-center py-12">
        <Terminal className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    );
  }

  // Password-first flow: connect as root with password
  const sshCommand = `ssh root@${vpsIP}`;
  const sshCommandWindows = `ssh root@${vpsIP}`;
  // Fallback if provider uses ubuntu user
  const sshCommandUbuntu = `ssh ubuntu@${vpsIP}`;
  const sshCommandUbuntuWindows = `ssh ubuntu@${vpsIP}`;

  // Build troubleshooting items from messages
  const troubleshootingItems: TroubleshootingItem[] = [
    {
      error: messages.troubleshooting.connectionRefused.name,
      causes: messages.troubleshooting.connectionRefused.causes,
      solutions: messages.troubleshooting.connectionRefused.solutions,
    },
    {
      error: messages.troubleshooting.timeout.name,
      causes: messages.troubleshooting.timeout.causes,
      solutions: messages.troubleshooting.timeout.solutions,
    },
    {
      error: messages.troubleshooting.permissionDenied.name,
      causes: messages.troubleshooting.permissionDenied.causes,
      solutions: messages.troubleshooting.permissionDenied.solutions,
    },
    {
      error: messages.troubleshooting.hostKeyFailed.name,
      causes: messages.troubleshooting.hostKeyFailed.causes,
      solutions: messages.troubleshooting.hostKeyFailed.solutions,
    },
  ];

  const troubleshootingLabels: TroubleshootingLabels = {
    possibleCauses: messages.troubleshooting.labels.possibleCauses,
    solutions: messages.troubleshooting.labels.solutions,
  };

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

      {/* Two Computers Mental Model - CRITICAL for beginners */}
      <TwoComputersExplainer />

      {/* IP confirmation */}
      <AlertCard variant="info" icon={Terminal}>
        {messages.alerts.connectingTo}{" "}
        <code className="ml-1 rounded bg-[oklch(0.75_0.18_195/0.15)] px-2 py-0.5 font-mono font-bold text-[oklch(0.85_0.12_195)]">{vpsIP}</code>
      </AlertCard>

      {/* CRITICAL: Password distinction warning */}
      <AlertCard variant="warning" title={messages.alerts.passwordWarning.title}>
        <div className="space-y-2">
          <p>{messages.alerts.passwordWarning.intro}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            <li>
              <span className="text-[oklch(0.72_0.19_145)]">{messages.alerts.passwordWarning.correct}</span>{" "}
              {messages.alerts.passwordWarning.correctDesc}
            </li>
            <li>
              <span className="text-destructive">{messages.alerts.passwordWarning.wrong}</span>{" "}
              {messages.alerts.passwordWarning.wrongDesc}
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            {messages.alerts.passwordWarning.cantFind}
          </p>
        </div>
      </AlertCard>

      {/* Primary command */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.commands.runThis}</h2>
        <CommandCard
          command={sshCommand}
          windowsCommand={sshCommandWindows}
          description={messages.commands.connectAsRoot}
          runLocation="local"
          showCheckbox
          persistKey="ssh-connect-root"
        />
      </div>

      {/* "Type yes" prompt explanation - show users what the scary message looks like */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.firstConnection.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.firstConnection.intro}
        </p>
        <OutputPreview title={messages.firstConnection.youllSee}>
          <div className="space-y-1">
            <p className="text-amber-400">The authenticity of host &apos;{vpsIP} ({vpsIP})&apos; can&apos;t be established.</p>
            <p className="text-muted-foreground">ED25519 key fingerprint is SHA256:xYz123abc456def...</p>
            <p className="text-amber-400">Are you sure you want to continue connecting (yes/no/[fingerprint])?</p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {messages.firstConnection.looksAlarming}
          </p>
        </OutputPreview>
        <AlertCard variant="success" title={messages.firstConnection.typeYes.title}>
          {messages.firstConnection.typeYes.content}
        </AlertCard>
      </div>

      {/* Password prompt */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.passwordPrompt.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.passwordPrompt.intro}
        </p>
        <OutputPreview title={messages.passwordPrompt.youllSee}>
          <p className="text-muted-foreground">root@{vpsIP}&apos;s password: <span className="animate-pulse">_</span></p>
        </OutputPreview>
        <AlertCard variant="info" title={messages.passwordPrompt.hiddenTitle}>
          <p>{messages.passwordPrompt.hiddenContent}</p>
        </AlertCard>
      </div>

      {/* Fallback to ubuntu */}
      <div className="space-y-3">
        <h3 className="font-semibold">
          {messages.fallback.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {messages.fallback.intro}
        </p>
        <CommandCard
          command={sshCommandUbuntu}
          windowsCommand={sshCommandUbuntuWindows}
          description={messages.commands.connectAsUbuntu}
          runLocation="local"
        />
      </div>

      {/* Success indicator */}
      <OutputPreview title={messages.successIndicator.title}>
        <p className="text-[oklch(0.72_0.19_145)]">
          root@vps:~# <span className="animate-pulse">_</span>
        </p>
        <p className="mt-2 text-muted-foreground">
          {messages.successIndicator.description}
        </p>
      </OutputPreview>

      {/* Post-connection verification */}
      <div className="space-y-3">
        <h3 className="font-semibold">{messages.verification.title}</h3>
        <p className="text-muted-foreground">
          {messages.verification.intro}
        </p>
        <CommandCard
          command="hostname"
          description={messages.verification.commandDesc}
          runLocation="vps"
        />
        <OutputPreview title={messages.verification.youShouldSee}>
          <p className="text-[oklch(0.72_0.19_145)]">vps-12345</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {messages.verification.notYourLaptop}
          </p>
        </OutputPreview>
        <AlertCard variant="info">
          {messages.verification.nowRemote}
        </AlertCard>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-3">
        <h2 className="font-semibold">{messages.troubleshooting.title}</h2>
        <div className="space-y-2">
          {troubleshootingItems.map((item) => (
            <TroubleshootingSection
              key={item.error}
              item={item}
              isExpanded={expandedError === item.error}
              onToggle={() =>
                setExpandedError((prev) =>
                  prev === item.error ? null : item.error
                )
              }
              labels={troubleshootingLabels}
            />
          ))}
        </div>
      </div>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.sshExplanation.term}>
            {messages.guide.sshExplanation.content}
            <br /><br />
            {messages.guide.sshExplanation.remote}
          </GuideExplain>

          <GuideSection title={messages.guide.stepByStep.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.stepByStep.step1.title}>
                {messages.guide.stepByStep.step1.content}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.stepByStep.step2.title}>
                {messages.guide.stepByStep.step2.content}
              </GuideStep>

              <GuideStep number={3} title={messages.guide.stepByStep.step3.title}>
                {messages.guide.stepByStep.step3.content}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>{messages.guide.stepByStep.step3.mac}</li>
                  <li>{messages.guide.stepByStep.step3.linux}</li>
                  <li>{messages.guide.stepByStep.step3.windows}</li>
                </ul>
              </GuideStep>

              <GuideStep number={4} title={messages.guide.stepByStep.step4.title}>
                {messages.guide.stepByStep.step4.content}
              </GuideStep>

              <GuideStep number={5} title={messages.guide.stepByStep.step5.title}>
                {messages.guide.stepByStep.step5.content}
                <br /><br />
                {messages.guide.stepByStep.step5.action}
              </GuideStep>

              <GuideStep number={6} title={messages.guide.stepByStep.step6.title}>
                {messages.guide.stepByStep.step6.content}
                <br /><br />
                {messages.guide.stepByStep.step6.important}
              </GuideStep>

              <GuideStep number={7} title={messages.guide.stepByStep.step7.title}>
                {messages.guide.stepByStep.step7.content}
                <code className="mt-2 block overflow-x-auto rounded bg-muted px-3 py-2 font-mono text-sm">
                  {messages.guide.stepByStep.step7.prompt}
                </code>
                {messages.guide.stepByStep.step7.explanation}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.understanding.title}>
            <p className="mb-3">
              {messages.guide.understanding.intro}
            </p>
            <ul className="space-y-2">
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">root@</code>
                {" "}{messages.guide.understanding.root}
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">vps</code>
                {" "}{messages.guide.understanding.vps}
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">~</code>
                {" "}{messages.guide.understanding.tilde}
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">#</code>
                {" "}{messages.guide.understanding.hash}
              </li>
            </ul>
          </GuideSection>

          <GuideTip>
            {messages.guide.tip.disconnect}
          </GuideTip>

          <GuideCaution>
            {messages.guide.caution.permissionDenied}
          </GuideCaution>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Link href="/learn/ssh-basics" className="flex items-center gap-3 text-sm">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <span className="font-medium text-foreground">{messages.guide.learnMore.title}</span>
                <p className="text-muted-foreground">
                  {messages.guide.learnMore.content}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </SimplerGuide>

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={isNavigating} size="lg" disableMotion>
          {isNavigating ? common.buttons.loading : common.buttons.continue}
        </Button>
      </div>
    </div>
  );
}
