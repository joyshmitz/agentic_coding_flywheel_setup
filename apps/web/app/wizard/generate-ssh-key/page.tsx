"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Key, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard, DetailsSection, OutputPreview } from "@/components/alert-card";
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
} from "@/components/simpler-guide";
import { Jargon } from "@/components/jargon";
import { useLocale, getGenerateSshKeyMessages } from "@/lib/i18n";

export default function GenerateSSHKeyPage() {
  const router = useRouter();
  const [os, , osLoaded] = useUserOS();
  const [isNavigating, setIsNavigating] = useState(false);
  const ready = osLoaded;
  const { locale } = useLocale();
  const messages = getGenerateSshKeyMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "generate_ssh_key",
    stepNumber: 3,
    stepTitle: "Generate SSH Key",
  });

  // Redirect if no OS selected (after hydration)
  useEffect(() => {
    if (!ready) return;
    if (os === null) {
      router.push(withCurrentSearch("/wizard/os-selection"));
    }
  }, [ready, os, router]);

  const handleContinue = useCallback(() => {
    markComplete();
    markStepComplete(3);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/rent-vps"));
  }, [router, markComplete]);

  if (!ready || !os) {
    return (
      <div className="flex items-center justify-center py-12">
        <Key className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Key className="h-5 w-5 text-primary" />
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

      {/* Explanation */}
      <AlertCard variant="info" title={messages.howItWorks.title}>
        <span dangerouslySetInnerHTML={{
          __html: messages.howItWorks.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        }} />
      </AlertCard>

      {/* ~/.ssh folder explanation */}
      <AlertCard variant="tip" title={messages.sshLocation.title}>
        <p className="mb-2">
          {messages.sshLocation.intro}
        </p>
        <ul className="space-y-1 text-sm">
          <li>
            <strong className="text-foreground">On {os === "mac" ? "Mac" : os === "linux" ? "Linux" : "Windows"}:</strong>{" "}
            {os === "mac" ? (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{messages.sshLocation.locations.mac}</code>
            ) : os === "linux" ? (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{messages.sshLocation.locations.linux}</code>
            ) : (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{messages.sshLocation.locations.windows}</code>
            )}
          </li>
          <li className="text-muted-foreground">
            {messages.sshLocation.tildeNote}
          </li>
          <li className="text-muted-foreground">
            {messages.sshLocation.dotNote}
          </li>
        </ul>
      </AlertCard>

      {/* Privacy assurance */}
      <div className="flex gap-3 rounded-xl border border-[oklch(0.72_0.19_145/0.25)] bg-[oklch(0.72_0.19_145/0.05)] p-3 sm:p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.72_0.19_145/0.15)] sm:h-9 sm:w-9">
          <ShieldCheck className="h-4 w-4 text-[oklch(0.72_0.19_145)] sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-[13px] font-medium leading-tight text-[oklch(0.82_0.12_145)] sm:text-sm">
            {messages.privacy.title}
          </p>
          <p className="text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
            {messages.privacy.content.split("**")[0]}<strong className="text-foreground/80">{messages.privacy.content.split("**")[1]}</strong>{messages.privacy.content.split("**")[2]}{" "}
            <a
              href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-[oklch(0.75_0.18_195)] hover:underline"
            >
              {messages.privacy.openSource}
              <ExternalLink className="h-3 w-3" />
            </a>.
          </p>
        </div>
      </div>

      {/* Step 1: Generate */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.step1.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.step1.intro.split("terminal")[0]}<Jargon term="terminal">{locale === "uk" ? "терміналі" : "terminal"}</Jargon>{messages.step1.intro.split("terminal")[1]}
        </p>
        <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-sm">
          <div className="space-y-2">
            <p><strong className="text-foreground">{messages.step1.prompts.fileLocation.label}</strong> <span className="text-muted-foreground">{messages.step1.prompts.fileLocation.action}</span></p>
            <p><strong className="text-foreground">{messages.step1.prompts.passphrase.label}</strong> <span className="text-muted-foreground">{messages.step1.prompts.passphrase.action}</span></p>
            <p><strong className="text-foreground">{messages.step1.prompts.confirmPassphrase.label}</strong> <span className="text-muted-foreground">{messages.step1.prompts.confirmPassphrase.action}</span></p>
          </div>
        </div>
        <CommandCard
          command='ssh-keygen -t ed25519 -C "acfs" -f ~/.ssh/acfs_ed25519'
          windowsCommand='ssh-keygen -t ed25519 -C "acfs" -f $HOME\\.ssh\\acfs_ed25519'
          showCheckbox
          persistKey="generate-ssh-key"
        />
      </div>

      {/* Step 2: Copy public key */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.step2.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.step2.intro}
        </p>
        <CommandCard
          command="cat ~/.ssh/acfs_ed25519.pub"
          windowsCommand="type $HOME\\.ssh\\acfs_ed25519.pub"
          showCheckbox
          persistKey="copy-ssh-pubkey"
        />
      </div>

      {/* Important note */}
      <AlertCard variant="warning" title={messages.saveWarning.title}>
        {messages.saveWarning.content.split("**")[0]}<strong>{messages.saveWarning.content.split("**")[1]}</strong>{messages.saveWarning.content.split("**")[2]}
      </AlertCard>

      {/* Troubleshooting */}
      <DetailsSection summary={messages.troubleshooting.title}>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-foreground">
              {messages.troubleshooting.noSuchFile.title}
            </p>
            <p className="text-muted-foreground">
              {messages.troubleshooting.noSuchFile.fix}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">{messages.troubleshooting.permissionDenied.title}</p>
            <p className="text-muted-foreground">
              {messages.troubleshooting.permissionDenied.fix}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">
              {messages.troubleshooting.fileExists.title}
            </p>
            <p className="text-muted-foreground">
              {messages.troubleshooting.fileExists.fix}
            </p>
          </div>
        </div>
      </DetailsSection>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.sshKey.term}>
            {messages.guide.sshKey.intro}
            <br /><br />
            <span dangerouslySetInnerHTML={{
              __html: messages.guide.sshKey.twoFiles.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
            <br /><br />
            <span dangerouslySetInnerHTML={{
              __html: messages.guide.sshKey.privateKey.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
            <br /><br />
            <span dangerouslySetInnerHTML={{
              __html: messages.guide.sshKey.publicKey.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          </GuideExplain>

          <GuideSection title={messages.guide.detailedSteps.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.detailedSteps.step1.title}>
                {os === "mac" ? messages.guide.detailedSteps.step1.mac : os === "linux" ? messages.guide.detailedSteps.step1.linux : messages.guide.detailedSteps.step1.windows}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.detailedSteps.step2.title}>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.detailedSteps.step2.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </GuideStep>

              <GuideStep number={3} title={messages.guide.detailedSteps.step3.title}>
                {messages.guide.detailedSteps.step3.intro}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><strong>Mac:</strong> {messages.guide.detailedSteps.step3.mac}</li>
                  <li><strong>Linux:</strong> {messages.guide.detailedSteps.step3.linux}</li>
                  <li><strong>Windows:</strong> {messages.guide.detailedSteps.step3.windows}</li>
                </ul>
                <p className="mt-2">{messages.guide.detailedSteps.step3.run}</p>
              </GuideStep>

              <GuideStep number={4} title={messages.guide.detailedSteps.step4.title}>
                {messages.guide.detailedSteps.step4.intro}

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="mb-2 font-medium text-foreground">{messages.guide.detailedSteps.step4.fileLocation.label}</p>
                    <OutputPreview title={locale === "uk" ? "Ви побачите:" : "You will see:"}>
                      <p className="text-[oklch(0.72_0.19_145)]">{messages.guide.detailedSteps.step4.fileLocation.prompt}</p>
                    </OutputPreview>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <strong className="text-foreground">{messages.guide.detailedSteps.step4.fileLocation.action}</strong>
                    </p>
                    <div className="mt-2 rounded border border-border/30 bg-muted/20 p-2 text-xs text-muted-foreground">
                      {messages.guide.detailedSteps.step4.fileLocation.explanation}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-foreground">{messages.guide.detailedSteps.step4.passphrase.label}</p>
                    <OutputPreview title={locale === "uk" ? "Ви побачите:" : "You will see:"}>
                      <p className="text-[oklch(0.72_0.19_145)]">{messages.guide.detailedSteps.step4.passphrase.prompt}</p>
                    </OutputPreview>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <strong className="text-foreground">{messages.guide.detailedSteps.step4.passphrase.action}</strong>
                    </p>
                    <div className="mt-2 rounded border border-border/30 bg-muted/20 p-2 text-xs text-muted-foreground">
                      {messages.guide.detailedSteps.step4.passphrase.explanation}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-foreground">{messages.guide.detailedSteps.step4.confirmPassphrase.label}</p>
                    <OutputPreview title={locale === "uk" ? "Ви побачите:" : "You will see:"}>
                      <p className="text-[oklch(0.72_0.19_145)]">{messages.guide.detailedSteps.step4.confirmPassphrase.prompt}</p>
                    </OutputPreview>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <strong className="text-foreground">{messages.guide.detailedSteps.step4.confirmPassphrase.action}</strong>
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted-foreground" dangerouslySetInnerHTML={{
                  __html: messages.guide.detailedSteps.step4.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </GuideStep>

              <GuideStep number={5} title={messages.guide.detailedSteps.step5.title}>
                {messages.guide.detailedSteps.step5.intro}
                <div className="mt-3">
                  <OutputPreview title={locale === "uk" ? "Ви побачите щось на кшталт:" : "You will see something like:"}>
                    <p className="text-[oklch(0.72_0.19_145)]">{messages.guide.detailedSteps.step5.saved}</p>
                    <p className="text-[oklch(0.72_0.19_145)]">{messages.guide.detailedSteps.step5.publicSaved}</p>
                    <p className="mt-2 text-muted-foreground">{messages.guide.detailedSteps.step5.fingerprint}</p>
                    <p className="text-muted-foreground">SHA256:xYz123abc... acfs</p>
                    <p className="mt-2 text-muted-foreground">{messages.guide.detailedSteps.step5.randomart}</p>
                    <pre className="text-xs text-muted-foreground">{`+--[ED25519 256]--+
|     .o+*o.      |
|    . o.=o+ .    |
|     . =.= o     |
|      o + = .    |
|     . S o = .   |
|      o + o +    |
|     . = = * o   |
|    . o.=.X.*.   |
|     ..+.o+E=.   |
+----[SHA256]-----+`}</pre>
                  </OutputPreview>
                </div>
                <p className="mt-3 text-sm" dangerouslySetInnerHTML={{
                  __html: messages.guide.detailedSteps.step5.success.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[oklch(0.72_0.19_145)]">$1</strong>')
                }} />
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.verify.title}>
            <p className="mb-4">{messages.guide.verify.intro}</p>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.verify.checkFiles.title}>
                <CommandCard
                  command="ls -la ~/.ssh/acfs_*"
                  windowsCommand="dir $HOME\\.ssh\\acfs_*"
                  description={messages.guide.verify.checkFiles.description}
                />
                <p className="mt-3 text-sm text-muted-foreground">{messages.guide.verify.checkFiles.result}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">acfs_ed25519</code>
                    <span className="text-muted-foreground" dangerouslySetInnerHTML={{
                      __html: " — " + messages.guide.verify.checkFiles.privateKey.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                    }} />
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">acfs_ed25519.pub</code>
                    <span className="text-muted-foreground" dangerouslySetInnerHTML={{
                      __html: " — " + messages.guide.verify.checkFiles.publicKey.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                    }} />
                  </li>
                </ul>
              </GuideStep>
            </div>

            <GuideTip>
              <span dangerouslySetInnerHTML={{
                __html: messages.guide.verify.analogy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </GuideTip>
          </GuideSection>

          <GuideSection title={messages.guide.copyPublicKey.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.copyPublicKey.step1.title}>
                {messages.guide.copyPublicKey.step1.content}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.copyPublicKey.step2.title}>
                {messages.guide.copyPublicKey.step2.intro}
                <br /><br />
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.copyPublicKey.step2.howToCopy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><strong>Mac:</strong> {messages.guide.copyPublicKey.step2.mac}</li>
                  <li><strong>Linux:</strong> {messages.guide.copyPublicKey.step2.linux}</li>
                  <li><strong>Windows:</strong> {messages.guide.copyPublicKey.step2.windows}</li>
                </ul>
              </GuideStep>

              <GuideStep number={3} title={messages.guide.copyPublicKey.step3.title}>
                {messages.guide.copyPublicKey.step3.content}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>
            {messages.guide.publicKeyExample.intro}
            <code className="mt-2 block overflow-x-auto rounded bg-muted p-2 font-mono text-xs">
              {messages.guide.publicKeyExample.example}
            </code>
            {messages.guide.publicKeyExample.reminder}
          </GuideTip>

          <GuideCaution>
            <span dangerouslySetInnerHTML={{
              __html: messages.guide.privateKeyCaution.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          </GuideCaution>

          <GuideSection title={messages.guide.troubleshootingGuide.title}>
            <p>
              <span dangerouslySetInnerHTML={{
                __html: messages.guide.troubleshootingGuide.commandNotFound.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
              <br /><br />
              <span dangerouslySetInnerHTML={{
                __html: messages.guide.troubleshootingGuide.permissionDenied.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
              <code className="my-2 block overflow-x-auto rounded bg-muted px-3 py-2 font-mono text-xs">
                {messages.guide.troubleshootingGuide.permissionFix}
              </code>
              <span dangerouslySetInnerHTML={{
                __html: messages.guide.troubleshootingGuide.fileExists.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </p>
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
