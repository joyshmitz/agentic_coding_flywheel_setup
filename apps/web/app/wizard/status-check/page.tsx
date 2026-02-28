"use client";

import React, { useCallback, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Stethoscope,
  KeyRound,
  Shield,
  Bot,
  Cloud,
  Wrench,
  BookOpen,
  Laptop,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommandCard, CodeBlock } from "@/components/command-card";
import { AlertCard, OutputPreview } from "@/components/alert-card";
import { WhereAmICheck } from "@/components/connection-check";
import { markStepComplete } from "@/lib/wizardSteps";
import {
  SERVICES,
  CATEGORY_NAMES,
  type Service,
  type ServiceCategory,
} from "@/lib/services";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
  GuideCaution,
} from "@/components/simpler-guide";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { Jargon, JargonText } from "@/components/jargon";
import { withCurrentSearch } from "@/lib/utils";
import { useLocale, getStatusCheckMessages, getCommonMessages } from "@/lib/i18n";

// Helper to render template with bold markers and injected node
// Handles multiple placeholders and multiple bold sections with composite keys
function renderTemplate(template: string, placeholder: string, node: ReactNode): ReactNode {
  // Escape special regex characters in placeholder
  const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Split by placeholder, keeping placeholder as separator for position tracking
  const parts = template.split(new RegExp(`(${escapedPlaceholder})`));

  return (
    <>
      {parts.map((part, partIdx) => {
        // If this part is the placeholder itself, render the node
        if (part === placeholder) {
          return <React.Fragment key={`ph-${partIdx}`}>{node}</React.Fragment>;
        }

        // Skip empty parts
        if (!part) return null;

        // Parse **bold** markers in this text segment
        const boldParts = part.split(/\*\*(.*?)\*\*/g);
        return (
          <React.Fragment key={`seg-${partIdx}`}>
            {boldParts.map((boldPart, boldIdx) =>
              boldIdx % 2 === 1 ? (
                <strong key={`b-${partIdx}-${boldIdx}`}>{boldPart}</strong>
              ) : (
                boldPart
              )
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

// Category icons for auth section
const AUTH_CATEGORY_ICONS: Record<ServiceCategory, React.ReactNode> = {
  access: <Shield className="h-5 w-5" />,
  agent: <Bot className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  devtools: <Wrench className="h-5 w-5" />,
};

// Get services that have auth commands, grouped by category
function getAuthServices(): Record<ServiceCategory, Service[]> {
  const groups: Record<ServiceCategory, Service[]> = {
    access: [],
    agent: [],
    cloud: [],
    devtools: [],
  };
  for (const service of SERVICES) {
    if (service.postInstallCommand && service.installedByAcfs) {
      groups[service.category].push(service);
    }
  }
  return groups;
}

export default function StatusCheckPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const { locale } = useLocale();
  const messages = getStatusCheckMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "status_check",
    stepNumber: 12,
    stepTitle: "Status Check",
  });

  const handleContinue = useCallback(() => {
    markComplete();
    markStepComplete(12);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/launch-onboarding"));
  }, [router, markComplete]);

  // Compute auth services once, not on every category iteration
  const authServices = getAuthServices();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Stethoscope className="h-5 w-5 text-primary" />
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

      {/* Reconnection Reminder */}
      <AlertCard variant="warning" icon={AlertCircle} title={messages.reconnectionReminder.title}>
        <div className="space-y-2">
          <p>
            {messages.reconnectionReminder.intro}
          </p>
          <p className="text-sm">
            {messages.reconnectionReminder.sshFirst}
          </p>
          <CommandCard command="ssh -i ~/.ssh/acfs_ed25519 ubuntu@YOUR_VPS_IP" runLocation="local" className="mt-1" />
          <p className="text-sm text-muted-foreground">
            <JargonText>{messages.reconnectionReminder.readyWhen}</JargonText>
          </p>
        </div>
      </AlertCard>

      {/* Common Mistake Warning */}
      <AlertCard variant="error" icon={AlertCircle} title={messages.commonMistake.title}>
        <div className="space-y-2">
          <p>
            <strong>{messages.commonMistake.notDesktop}</strong>
          </p>
          <p className="text-sm">
            {messages.commonMistake.howToUse}
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {messages.commonMistake.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground">
            {messages.commonMistake.wrongPlace}
          </p>
        </div>
      </AlertCard>

      {/* Where Am I? Check */}
      <WhereAmICheck />

      {/* Doctor command */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{messages.doctorCommand.title}</h2>
        <p className="text-sm text-muted-foreground">
          <JargonText>{messages.doctorCommand.description}</JargonText>
        </p>
        <CommandCard
          command="acfs doctor"
          description={messages.doctorCommand.commandDesc}
          runLocation="vps"
          showCheckbox
          persistKey="flywheel-doctor"
        />
      </div>

      {/* Expected output */}
      <OutputPreview title={messages.expectedOutput.title}>
        <div className="space-y-1 font-mono text-xs">
          <p className="text-muted-foreground">{messages.expectedOutput.header}</p>
          <p className="text-muted-foreground">{messages.expectedOutput.separator}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.expectedOutput.shell}</p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.expectedOutput.languages}</p>
          <p className="text-[oklch(0.72_0.19_145)]">✔ Tools: <Jargon term="tmux">tmux</Jargon>, <Jargon term="ripgrep">ripgrep</Jargon>, <Jargon term="lazygit">lazygit</Jargon></p>
          <p className="text-[oklch(0.72_0.19_145)]">{messages.expectedOutput.agents}</p>
          <p className="mt-2 text-foreground">{messages.expectedOutput.allPassed}</p>
        </div>
      </OutputPreview>

      {/* Quick spot checks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{messages.quickChecks.title}</h2>
        <p className="text-sm text-muted-foreground">
          <JargonText>{messages.quickChecks.intro}</JargonText>
        </p>
        <div className="space-y-3">
          {messages.quickChecks.checks.map((check, i) => (
            <CommandCard
              key={i}
              command={check.command}
              description={check.description}
              runLocation="vps"
            />
          ))}
        </div>
      </div>

      {/* Authenticate your services */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{messages.authenticateServices.title}</h2>
            <p className="text-sm text-muted-foreground">
              <JargonText>{messages.authenticateServices.subtitle}</JargonText>
            </p>
          </div>
        </div>

        {/* Headless auth flow explanation */}
        <AlertCard variant="info" icon={Laptop} title={messages.headlessAuth.title}>
          <div className="space-y-2">
            <p>
              {messages.headlessAuth.intro}
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {messages.headlessAuth.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-muted-foreground">
              {messages.headlessAuth.note}
            </p>
          </div>
        </AlertCard>

        {/* Codex-specific auth note */}
        <AlertCard variant="warning" icon={AlertCircle} title={messages.headlessAuth.codex.title}>
          <div className="space-y-2">
            <p>
              {renderTemplate(
                messages.headlessAuth.codex.introTemplate,
                "{callback}",
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">localhost:1455</code>
              )}
            </p>
            <p className="text-sm font-medium">{messages.headlessAuth.codex.option1Title}</p>
            <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
              <li>
                {messages.headlessAuth.codex.option1Steps[0]}{" "}
                <a href="https://chatgpt.com/settings/security" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  {messages.headlessAuth.codex.securityLinkLabel}
                </a>
              </li>
              <li>{messages.headlessAuth.codex.option1Steps[1]}</li>
              <li>
                {messages.headlessAuth.codex.option1Steps[2]}{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">codex login --device-auth</code>
              </li>
            </ol>
            <p className="text-sm font-medium mt-2">{messages.headlessAuth.codex.option2Title}</p>
            <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
              <li>
                {messages.headlessAuth.codex.option2Steps[0]}{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">ssh -L 1455:localhost:1455 ubuntu@YOUR_VPS_IP</code>
              </li>
              <li>
                {messages.headlessAuth.codex.option2Steps[1]}{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">codex login</code>
              </li>
              <li>{messages.headlessAuth.codex.option2Steps[2]}</li>
            </ol>
          </div>
        </AlertCard>

        {/* Wrangler (Cloudflare) headless auth note */}
        <AlertCard variant="warning" icon={AlertCircle} title={messages.headlessAuth.wrangler.title}>
          <div className="space-y-2">
            <p>
              {renderTemplate(
                messages.headlessAuth.wrangler.introTemplate,
                "{command}",
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">wrangler login</code>
              )}
            </p>
            <p className="text-sm font-medium">{messages.headlessAuth.wrangler.solutionTitle}</p>
            <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
              <li>
                {messages.headlessAuth.wrangler.steps[0]}{" "}
                <a href="https://dash.cloudflare.com/profile/api-tokens" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  {messages.headlessAuth.wrangler.linkLabel}
                </a>
              </li>
              <li>{messages.headlessAuth.wrangler.steps[1]}</li>
              <li>
                {messages.headlessAuth.wrangler.steps[2]}{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">~/.zshrc</code>:
              </li>
            </ol>
            <CodeBlock code={`export CLOUDFLARE_API_TOKEN="your-token-here"\nexport CLOUDFLARE_ACCOUNT_ID="your-account-id"`} language="bash" className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">
              {renderTemplate(
                messages.headlessAuth.wrangler.afterTemplate,
                "{command}",
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">source ~/.zshrc</code>
              )}
            </p>
          </div>
        </AlertCard>

        {/* Other cloud tools headless auth */}
        <AlertCard variant="warning" icon={AlertCircle} title={messages.headlessAuth.cloud.title}>
          <div className="space-y-2">
            <p>
              {messages.headlessAuth.cloud.intro}
            </p>
            <div className="text-sm space-y-2">
              <p className="font-medium">{messages.headlessAuth.cloud.supabaseTitle}</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-sm">
                <li>
                  {messages.headlessAuth.cloud.supabaseSteps[0]}{" "}
                  <a href="https://supabase.com/dashboard/account/tokens" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {messages.headlessAuth.cloud.supabaseLinkLabel}
                  </a>
                </li>
                <li>
                  {messages.headlessAuth.cloud.supabaseSteps[1]}{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">~/.zshrc</code>:
                </li>
              </ol>
              <CodeBlock code={`export SUPABASE_ACCESS_TOKEN="your-token-here"`} language="bash" />

              <p className="font-medium mt-2">{messages.headlessAuth.cloud.vercelTitle}</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-sm">
                <li>
                  {messages.headlessAuth.cloud.vercelSteps[0]}{" "}
                  <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {messages.headlessAuth.cloud.vercelLinkLabel}
                  </a>
                </li>
                <li>
                  {messages.headlessAuth.cloud.vercelSteps[1]}{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">vercel --token YOUR_TOKEN</code>
                </li>
              </ol>
            </div>
          </div>
        </AlertCard>

        <AlertCard variant="success" icon={Bot} title={messages.dontNeedAll.title}>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              {messages.dontNeedAll.intro}
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>{messages.dontNeedAll.recommendedNow.split(":")[0]}:</strong>{messages.dontNeedAll.recommendedNow.split(":")[1]}</li>
              <li><strong>{messages.dontNeedAll.optionalNow.split(":")[0]}:</strong>{messages.dontNeedAll.optionalNow.split(":")[1]}</li>
              <li><strong>{messages.dontNeedAll.optionalLater.split(":")[0]}:</strong>{messages.dontNeedAll.optionalLater.split(":")[1]}</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              {messages.dontNeedAll.note}
            </p>
          </div>
        </AlertCard>

        {/* Auth commands grouped by category */}
        {(["access", "agent", "cloud"] as const).map((category) => {
          const services = authServices[category];
          if (services.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  {AUTH_CATEGORY_ICONS[category]}
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {CATEGORY_NAMES[category]}
                </h3>
              </div>
              <div className="space-y-2 pl-8">
                {services.map((service) => (
                  <CommandCard
                    key={service.id}
                    command={service.postInstallCommand!}
                    description={messages.authenticateServices.loginDescription.replace("{name}", service.name)}
                    runLocation="vps"
                    showCheckbox
                    persistKey={`auth-${service.id}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Troubleshooting */}
      <AlertCard variant="warning" icon={AlertCircle} title={messages.troubleshooting.title}>
        {messages.troubleshooting.content}
      </AlertCard>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whatIsDoctor.term}>
            {messages.guide.whatIsDoctor.content}
            <br /><br />
            {messages.guide.whatIsDoctor.purpose}
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

              <GuideStep number={4} title={messages.guide.stepByStep.step4.title}>
                {messages.guide.stepByStep.step4.intro}
                <ul className="mt-2 space-y-1">
                  <li>
                    <span className="text-[oklch(0.72_0.19_145)]">✔ {messages.guide.stepByStep.step4.green}</span>
                  </li>
                  <li>
                    <span className="text-destructive">✘ {messages.guide.stepByStep.step4.red}</span>
                  </li>
                </ul>
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.spotChecks.title}>
            <p className="mb-3">
              {messages.guide.spotChecks.intro}
            </p>
            <ul className="space-y-3">
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">cc --version</code>
                <br />
                <span className="text-sm text-muted-foreground">
                  {messages.guide.spotChecks.ccVersion}
                </span>
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bun --version</code>
                <br />
                <span className="text-sm text-muted-foreground">
                  {messages.guide.spotChecks.bunVersion}
                </span>
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">which tmux</code>
                <br />
                <span className="text-sm text-muted-foreground">
                  {messages.guide.spotChecks.whichTmux}
                </span>
              </li>
            </ul>
          </GuideSection>

          <GuideSection title={messages.guide.whatIfFailed.title}>
            <p className="mb-3">
              {messages.guide.whatIfFailed.intro}
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{messages.guide.whatIfFailed.commandNotFound.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.whatIfFailed.commandNotFound.content}
                </p>
                <CommandCard command="source ~/.zshrc" runLocation="vps" className="mt-1" />
                <p className="mt-1 text-sm text-muted-foreground">
                  {messages.guide.whatIfFailed.commandNotFound.after}
                </p>
              </div>

              <div>
                <p className="font-medium">{messages.guide.whatIfFailed.specificToolFailed.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.whatIfFailed.specificToolFailed.content}
                </p>
                <CommandCard command='curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/agentic_coding_flywheel_setup/main/install.sh" | bash -s -- --yes --mode vibe' runLocation="vps" className="mt-1" />
              </div>

              <div>
                <p className="font-medium">{messages.guide.whatIfFailed.nothingWorks.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.whatIfFailed.nothingWorks.content}
                </p>
              </div>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.authenticating.title}>
            <p className="mb-3">
              {messages.guide.authenticating.intro}
            </p>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.authenticating.step1.title}>
                {messages.guide.authenticating.step1.content}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.authenticating.step2.title}>
                {messages.guide.authenticating.step2.content}
              </GuideStep>

              <GuideStep number={3} title={messages.guide.authenticating.step3.title}>
                {messages.guide.authenticating.step3.content}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>
            {messages.guide.tip}
          </GuideTip>

          <GuideCaution>
            {messages.guide.caution}
          </GuideCaution>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Link href="/learn/welcome" className="flex items-center gap-3 text-sm">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <span className="font-medium text-foreground">{messages.guide.learnMore.welcome.title}</span>
                <p className="text-muted-foreground">
                  {messages.guide.learnMore.welcome.content}
                </p>
              </div>
            </Link>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Link href="/learn/flywheel-loop" className="flex items-center gap-3 text-sm">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <span className="font-medium text-foreground">{messages.guide.learnMore.flywheel.title}</span>
                <p className="text-muted-foreground">
                  {messages.guide.learnMore.flywheel.content}
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
