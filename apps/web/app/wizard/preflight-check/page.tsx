"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CommandCard } from "@/components/command-card";
import { AlertCard, OutputPreview, DetailsSection } from "@/components/alert-card";
import { ConnectionCheck } from "@/components/connection-check";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { useVPSIP } from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideCaution,
} from "@/components/simpler-guide";
import { Jargon } from "@/components/jargon";
import { useLocale, getPreflightCheckMessages, getCommonMessages } from "@/lib/i18n";

const PREFLIGHT_COMMAND =
  "curl -fsSL \"https://raw.githubusercontent.com/Dicklesworthstone/agentic_coding_flywheel_setup/main/scripts/preflight.sh?$(date +%s)\" | bash";

// Troubleshooting items are now driven by messages

export default function PreflightCheckPage() {
  const router = useRouter();
  const [vpsIP] = useVPSIP();
  const [ackPassed, setAckPassed] = useState(false);
  const [ackFailed, setAckFailed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { locale } = useLocale();
  const messages = getPreflightCheckMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "preflight_check",
    stepNumber: 8,
    stepTitle: "Pre-Flight Check",
  });

  const displayIP = vpsIP || "YOUR_VPS_IP";

  const canContinue = ackPassed || ackFailed;

  const goNext = useCallback(() => {
    markComplete();
    markStepComplete(8);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/run-installer"));
  }, [router, markComplete]);

  const handleContinue = useCallback(() => {
    if (!canContinue) return;
    goNext();
  }, [canContinue, goNext]);

  const handleSkip = useCallback(() => {
    goNext();
  }, [goNext]);

  // Build troubleshooting items from messages
  const troubleshootingItems = [
    { title: messages.troubleshooting.bashNotRecognized.title, fixes: messages.troubleshooting.bashNotRecognized.fixes },
    { title: messages.troubleshooting.aptLocked.title, fixes: messages.troubleshooting.aptLocked.fixes },
    { title: messages.troubleshooting.networkIssue.title, fixes: messages.troubleshooting.networkIssue.fixes },
    { title: messages.troubleshooting.diskSpace.title, fixes: messages.troubleshooting.diskSpace.fixes },
    { title: messages.troubleshooting.unsupportedArch.title, fixes: messages.troubleshooting.unsupportedArch.fixes },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <ShieldCheck className="h-5 w-5 text-primary" />
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
          {messages.description.split("VPS")[0]}<Jargon term="vps">VPS</Jargon>{messages.description.split("VPS")[1]}
        </p>
      </div>

      {/* CRITICAL: Connection check */}
      <ConnectionCheck vpsIP={displayIP} showExplainer showWhereAmI />

      {/* Why this matters */}
      <AlertCard variant="info" icon={ShieldCheck} title={messages.fastSafetyCheck.title}>
        {messages.fastSafetyCheck.content}
      </AlertCard>

      {/* Windows-specific warning - CRITICAL for confused users */}
      <AlertCard variant="error" icon={AlertTriangle} title={messages.windowsWarning.title}>
        <div className="space-y-2">
          <p>
            {messages.windowsWarning.intro}
          </p>
          <p className="font-semibold">
            {messages.windowsWarning.mistake}
          </p>
          <p>
            {messages.windowsWarning.fix.replace("YOUR_VPS_IP", displayIP)}
          </p>
        </div>
      </AlertCard>

      {/* Command */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.runCommand.title}</h2>
        <CommandCard
          command={PREFLIGHT_COMMAND}
          description={messages.runCommand.desc}
          runLocation="vps"
          showCheckbox
          persistKey="preflight-check"
        />
      </div>

      {/* Expected output */}
      <OutputPreview title={messages.expectedOutput.title}>
        <div className="space-y-1 font-mono text-xs">
          <p className="text-muted-foreground">{messages.expectedOutput.lines.header}</p>
          <p className="text-muted-foreground">{messages.expectedOutput.lines.separator}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.expectedOutput.lines.os}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.expectedOutput.lines.arch}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.expectedOutput.lines.disk}</p>
          <p className="text-[oklch(0.78_0.16_75)]">{messages.expectedOutput.lines.warning}</p>
          <p className="text-muted-foreground">{messages.expectedOutput.lines.result}</p>
        </div>
      </OutputPreview>

      {/* Proceed acknowledgement */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <h3 className="mb-3 font-semibold">{messages.acknowledgement.title}</h3>
        <div className="space-y-3 text-sm">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={ackPassed}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setAckPassed(isChecked);
                if (isChecked) setAckFailed(false);
              }}
            />
            <span className="text-foreground">
              {messages.acknowledgement.passed}
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={ackFailed}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setAckFailed(isChecked);
                if (isChecked) setAckPassed(false);
              }}
            />
            <span className="text-foreground">
              {messages.acknowledgement.failed}
            </span>
          </label>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{messages.troubleshooting.title}</h2>
        <div className="space-y-3">
          {troubleshootingItems.map((item) => (
            <DetailsSection key={item.title} summary={item.title}>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {item.fixes.map((fix, i) => (
                  <li key={i}>{fix}</li>
                ))}
              </ul>
            </DetailsSection>
          ))}
        </div>
      </div>

      {/* Help */}
      <AlertCard variant="warning" icon={AlertTriangle} title={messages.redErrors.title}>
        {messages.redErrors.content}
      </AlertCard>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          onClick={handleContinue}
          className="bg-primary text-primary-foreground"
          disabled={!canContinue || isNavigating}
        >
          {messages.buttons.continue}
        </Button>
        <Button variant="outline" onClick={handleSkip} disabled={isNavigating}>
          {messages.buttons.skip}
        </Button>
      </div>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whatIsPreflight.term}>
            {messages.guide.whatIsPreflight.content}
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

          <GuideCaution>
            {messages.guide.caution}
          </GuideCaution>
        </div>
      </SimplerGuide>

    </div>
  );
}
