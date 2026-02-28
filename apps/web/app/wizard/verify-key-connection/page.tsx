"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard, OutputPreview } from "@/components/alert-card";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { useVPSIP } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
  GuideCaution,
} from "@/components/simpler-guide";
import { Jargon, JargonText } from "@/components/jargon";
import { useLocale, getVerifyKeyConnectionMessages } from "@/lib/i18n";

export default function VerifyKeyConnectionPage() {
  const router = useRouter();
  const [vpsIP, , vpsIPLoaded] = useVPSIP();
  const [isNavigating, setIsNavigating] = useState(false);
  const ready = vpsIPLoaded;
  const { locale } = useLocale();
  const messages = getVerifyKeyConnectionMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "verify_key_connection",
    stepNumber: 11,
    stepTitle: "Verify Key Connection",
  });

  // Redirect if no VPS IP (after hydration)
  useEffect(() => {
    if (!ready) return;
    if (vpsIP === null) {
      router.push(withCurrentSearch("/wizard/create-vps"));
    }
  }, [ready, vpsIP, router]);

  const handleContinue = useCallback(() => {
    markComplete();
    markStepComplete(11);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/status-check"));
  }, [router, markComplete]);

  if (!ready || !vpsIP) {
    return (
      <div className="flex items-center justify-center py-12">
        <KeyRound className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    );
  }

  const sshKeyCommand = `ssh -i ~/.ssh/acfs_ed25519 ubuntu@${vpsIP}`;
  const sshKeyCommandWindows = `ssh -i $HOME\\.ssh\\acfs_ed25519 ubuntu@${vpsIP}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <KeyRound className="h-5 w-5 text-primary" />
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
          {messages.description.split("SSH")[0]}<Jargon term="ssh">SSH</Jargon>{messages.description.split("SSH")[1]}
        </p>
      </div>

      <AlertCard variant="info" icon={ShieldCheck} title={messages.whyMatters.title}>
        {messages.whyMatters.content}
      </AlertCard>

      {/* Step 1: Disconnect */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{messages.step1.title}</h2>
        <p className="text-sm text-muted-foreground">
          <JargonText>{messages.step1.description}</JargonText>
        </p>
        <CommandCard command="exit" description={messages.step1.commandDesc} runLocation="vps" />
      </div>

      {/* Step 2: Reconnect with key */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{messages.step2.title}</h2>
        <p className="text-sm text-muted-foreground">
          <JargonText>{messages.step2.description}</JargonText>
        </p>
        <CommandCard
          command={sshKeyCommand}
          windowsCommand={sshKeyCommandWindows}
          description={messages.step2.commandDesc}
          runLocation="local"
          showCheckbox
          persistKey="verify-key-connection"
        />
      </div>

      {/* Success indicator */}
      <OutputPreview title={messages.success.title}>
        <div className="space-y-2 text-sm">
          <p className="text-[oklch(0.72_0.19_145)]">• {messages.success.noPassword}</p>
          <p className="text-[oklch(0.72_0.19_145)]">• {messages.success.prompt}</p>
        </div>
      </OutputPreview>

      {/* Windows Terminal tip */}
      <div className="rounded-xl border border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.08)] p-4">
        <Link
          href={withCurrentSearch("/wizard/windows-terminal-setup")}
          className="flex items-start gap-3"
        >
          <Terminal className="mt-0.5 h-5 w-5 text-[oklch(0.75_0.18_195)]" />
          <div>
            <p className="font-medium text-foreground">
              {messages.windowsTip.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {messages.windowsTip.content}
            </p>
          </div>
        </Link>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{messages.troubleshooting.title}</h2>
        <div className="space-y-3">
          <AlertCard variant="warning" title={messages.troubleshooting.password.title}>
            {messages.troubleshooting.password.content}
          </AlertCard>
          <AlertCard variant="warning" title={messages.troubleshooting.permissionDenied.title}>
            {messages.troubleshooting.permissionDenied.content}
            <div className="mt-2">
              <CommandCard command="chmod 600 ~/.ssh/acfs_ed25519" runLocation="local" />
            </div>
          </AlertCard>
          <AlertCard variant="warning" title={messages.troubleshooting.connectionRefused.title}>
            {messages.troubleshooting.connectionRefused.content}
          </AlertCard>
        </div>
      </div>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.keyBasedAuth.term}>
            {messages.guide.keyBasedAuth.content}
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
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>
            {messages.guide.tip}
          </GuideTip>

          <GuideCaution>
            {messages.guide.caution}
          </GuideCaution>
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
