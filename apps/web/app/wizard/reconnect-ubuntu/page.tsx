"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Check, UserCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard, OutputPreview } from "@/components/alert-card";
import { markStepComplete } from "@/lib/wizardSteps";
import { useVPSIP } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
} from "@/components/simpler-guide";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { Jargon } from "@/components/jargon";
import { useLocale, getReconnectUbuntuMessages, getCommonMessages } from "@/lib/i18n";

export default function ReconnectUbuntuPage() {
  const router = useRouter();
  const [vpsIP, , vpsIPLoaded] = useVPSIP();
  const [isNavigating, setIsNavigating] = useState(false);
  const ready = vpsIPLoaded;
  const { locale } = useLocale();
  const messages = getReconnectUbuntuMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "reconnect_ubuntu",
    stepNumber: 10,
    stepTitle: "Reconnect as Ubuntu",
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
    markStepComplete(10);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/verify-key-connection"));
  }, [router, markComplete]);

  const handleSkip = useCallback(() => {
    markComplete({ skipped: true });
    markStepComplete(10);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/verify-key-connection"));
  }, [router, markComplete]);

  if (!ready || !vpsIP) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sshCommand = `ssh -i ~/.ssh/acfs_ed25519 ubuntu@${vpsIP}`;
  const sshCommandWindows = `ssh -i $HOME\\.ssh\\acfs_ed25519 ubuntu@${vpsIP}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <UserCheck className="h-5 w-5 text-primary" />
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
          {messages.description.split("root")[0]}<Jargon term="root-user">root</Jargon>{messages.description.split("root")[1].split("ubuntu user")[0]}<Jargon term="ubuntu-user">ubuntu user</Jargon>{messages.description.split("ubuntu user")[1]}
        </p>
      </div>

      {/* Already ubuntu? */}
      <div className="rounded-xl border border-[oklch(0.72_0.19_145/0.3)] bg-[oklch(0.72_0.19_145/0.08)] p-4">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 text-[oklch(0.72_0.19_145)]" />
          <div>
            <p className="font-medium text-foreground">{messages.alreadyUbuntu.title}</p>
            <p className="text-sm text-muted-foreground">
              {messages.alreadyUbuntu.content}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleSkip}
            >
              {messages.alreadyUbuntu.skipButton}
            </Button>
          </div>
        </div>
      </div>

      {/* Reconnect steps */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.ifRoot.title}</h2>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {messages.ifRoot.step1}
          </p>
          <CommandCard command="exit" description={messages.ifRoot.step1CommandDesc} runLocation="vps" />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {messages.ifRoot.step2}
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold">{messages.ifRoot.noticeDifferent}</h3>
            <p className="text-sm text-muted-foreground">
              {messages.ifRoot.keyExplanation}
            </p>
            <AlertCard variant="success" title={messages.ifRoot.noPassword.title}>
              {messages.ifRoot.noPassword.content}
            </AlertCard>
          </div>

          <CommandCard
            command={sshCommand}
            windowsCommand={sshCommandWindows}
            description={messages.ifRoot.commandDesc}
            runLocation="local"
            showCheckbox
            persistKey="reconnect-ubuntu"
          />

          {/* Common mistake: using wrong credentials */}
          <AlertCard variant="error" title={messages.permissionDenied.title}>
            <div className="space-y-2 text-sm">
              <p>{messages.permissionDenied.intro}</p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>
                  <strong className="text-foreground">{messages.permissionDenied.reason1}</strong>
                </li>
                <li>
                  <strong className="text-foreground">{messages.permissionDenied.reason2}</strong>
                </li>
              </ol>
              <p className="mt-3 font-medium text-foreground">
                {messages.permissionDenied.tryRoot}
              </p>
              <CommandCard command={`ssh root@${vpsIP}`} runLocation="local" className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {messages.permissionDenied.usePassword}
              </p>
            </div>
          </AlertCard>
        </div>
      </div>

      {/* Verification */}
      <OutputPreview title={messages.verification.title}>
        <ul className="space-y-1 text-sm">
          {messages.verification.items.map((item, i) => (
            <li key={i} className="text-[oklch(0.72_0.19_145)]">
              • {item}
            </li>
          ))}
        </ul>
      </OutputPreview>

      <AlertCard variant="tip" title={messages.p10kWizard.title}>
        <p>
          {messages.p10kWizard.intro}
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            {messages.p10kWizard.quitOption}
          </li>
          <li>{messages.p10kWizard.goThrough}</li>
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          {messages.p10kWizard.runLater}
        </p>
      </AlertCard>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whyReconnect.term}>
            {messages.guide.whyReconnect.intro}
            <br /><br />
            <strong>1. {messages.guide.whyReconnect.safety.split(":")[0]}:</strong>{messages.guide.whyReconnect.safety.split(":")[1]}
            <br /><br />
            <strong>2. {messages.guide.whyReconnect.betterExperience.split(":")[0]}:</strong>{messages.guide.whyReconnect.betterExperience.split(":")[1]}
          </GuideExplain>

          <GuideSection title={messages.guide.howToKnow.title}>
            <p>{messages.guide.howToKnow.intro}</p>
            <ul className="mt-2 space-y-2">
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">root@vps:~#</code>
                {messages.guide.howToKnow.root}
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">ubuntu@vps:~$</code>
                {messages.guide.howToKnow.ubuntu}
              </li>
            </ul>
          </GuideSection>

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

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Link href="/learn/linux-basics" className="flex items-center gap-3 text-sm">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <span className="font-medium text-foreground">{messages.guide.linuxBasics.title}</span>
                <p className="text-muted-foreground">
                  {messages.guide.linuxBasics.content}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </SimplerGuide>

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={isNavigating} size="lg" disableMotion>
          {isNavigating ? common.buttons.loading : messages.buttons.continue}
        </Button>
      </div>
    </div>
  );
}
