"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  ExternalLink,
  Check,
  Shield,
  Bot,
  Cloud,
  DollarSign,
  Sparkles,
  Terminal,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCard } from "@/components/alert-card";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { withCurrentSearch } from "@/lib/utils";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
} from "@/components/simpler-guide";
import {
  SERVICES,
  getGoogleSsoServices,
  getServicesByTier,
  type Service,
  type ServiceTier,
} from "@/lib/services";
import { TrackedLink } from "@/components/tracked-link";
import { useLocale, getAccountsMessages, getCommonMessages } from "@/lib/i18n";

// Type for messages
type Messages = ReturnType<typeof getAccountsMessages>;

const TIER_META: Record<
  ServiceTier,
  {
    title: string;
    description: string;
    icon: React.ReactNode;
    accentClass: string;
    defaultOpen: boolean;
  }
> = {
  essential: {
    title: "Essential (Do these now)",
    description: "Two accounts you need to start your first project.",
    icon: <Shield className="h-5 w-5" />,
    accentClass: "bg-[oklch(0.72_0.19_145/0.2)] text-[oklch(0.72_0.19_145)]",
    defaultOpen: true,
  },
  recommended: {
    title: "Recommended (After your first project)",
    description: "Add more AI agents when you want extra coverage.",
    icon: <Bot className="h-5 w-5" />,
    accentClass: "bg-[oklch(0.75_0.18_195/0.18)] text-[oklch(0.75_0.18_195)]",
    defaultOpen: false,
  },
  optional: {
    title: "Optional (When you need them)",
    description: "Deployment, databases, and infrastructure extras.",
    icon: <Cloud className="h-5 w-5" />,
    accentClass: "bg-muted text-muted-foreground",
    defaultOpen: false,
  },
};

function sortByOrder(a: Service, b: Service) {
  return a.sortOrder - b.sortOrder;
}

interface ServiceCardProps {
  service: Service;
  isChecked: boolean;
  onToggle: () => void;
  messages: Messages;
}

function ServiceCard({ service, isChecked, onToggle, messages }: ServiceCardProps) {
  const checkboxId = `service-${service.id}`;
  const sc = messages.serviceCard;

  return (
    <div
      className={`group rounded-xl border p-4 transition-all ${
        isChecked
          ? "border-[oklch(0.72_0.19_145/0.5)] bg-[oklch(0.72_0.19_145/0.05)]"
          : "border-border/50 bg-card/50 hover:border-primary/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 flex flex-col items-center gap-1">
          <Checkbox
            id={checkboxId}
            checked={isChecked}
            onCheckedChange={onToggle}
          />
          <label
            htmlFor={checkboxId}
            className="text-[10px] text-muted-foreground"
          >
            {sc.authenticated}
          </label>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">
              {service.name}
            </span>
            <span className="text-xs text-muted-foreground">
              by {service.provider}
            </span>
            {service.requiresSubscription && (
              <div
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-500"
                title={service.subscriptionNote ?? sc.paidPlanRequired}
              >
                <DollarSign className="h-3 w-3" />
                {service.subscriptionNote ?? sc.paidPlanRequired}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {service.shortDescription}
          </p>
          {service.requiresSubscription && (
            <p className="text-xs text-amber-600/80">
              {sc.paidPlanNote}
            </p>
          )}
          <p className="text-xs text-muted-foreground/80">
            {service.whyNeeded}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {service.supportsGoogleSso && (
              <TrackedLink
                href={service.googleSsoUrl || service.signupUrl}
                trackingId={`service-google-sso-${service.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.72_0.19_145/0.3)] bg-[oklch(0.72_0.19_145/0.1)] px-2.5 py-1.5 text-xs font-medium text-[oklch(0.72_0.19_145)] transition-colors hover:bg-[oklch(0.72_0.19_145/0.2)]"
              >
                <Sparkles className="h-3 w-3" />
                {sc.signUpWithGoogle}
                <ExternalLink className="h-2.5 w-2.5" />
              </TrackedLink>
            )}
            <TrackedLink
              href={service.signupUrl}
              trackingId={`service-signup-${service.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {service.supportsGoogleSso ? sc.otherSignupOptions : sc.signUp}
              <ExternalLink className="h-2.5 w-2.5" />
            </TrackedLink>
            <TrackedLink
              href={service.docsUrl}
              trackingId={`service-docs-${service.id}`}
              className="inline-flex items-center gap-1 px-1.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {sc.docs}
              <ExternalLink className="h-2.5 w-2.5" />
            </TrackedLink>
          </div>
          {/* Post-install command preview */}
          {service.postInstallCommand && (
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground/70">
              <Terminal className="h-3 w-3 shrink-0" />
              <span>
                {sc.afterInstall}{" "}
                <code className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {service.postInstallCommand}
                </code>
              </span>
            </div>
          )}
        </div>
        {isChecked && (
          <Check className="h-5 w-5 shrink-0 text-[oklch(0.72_0.19_145)]" />
        )}
      </div>
    </div>
  );
}

interface TierSectionProps {
  tier: ServiceTier;
  services: Service[];
  checkedServices: Set<string>;
  onToggleService: (serviceId: string) => void;
  messages: Messages;
}

function TierSection({
  tier,
  services,
  checkedServices,
  onToggleService,
  messages,
}: TierSectionProps) {
  const [isOpen, setIsOpen] = useState(TIER_META[tier].defaultOpen);
  const checkedCount = services.filter((service) =>
    checkedServices.has(service.id)
  ).length;
  const meta = TIER_META[tier];
  const tierMessages = messages.tierMeta[tier];

  if (services.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/30"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${meta.accentClass}`}
          >
            {meta.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{tierMessages.title}</h2>
              <span className="text-xs text-muted-foreground">
                {checkedCount}/{services.length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{tierMessages.description}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="space-y-3 border-t border-border/40 p-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isChecked={checkedServices.has(service.id)}
              onToggle={() => onToggleService(service.id)}
              messages={messages}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AccountsPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [checkedServices, setCheckedServices] = useState<Set<string>>(
    new Set()
  );
  const { locale } = useLocale();
  const messages = getAccountsMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "accounts",
    stepNumber: 7,
    stepTitle: "Set Up Accounts",
  });

  const handleToggle = useCallback((serviceId: string) => {
    setCheckedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  }, []);

  const handleContinue = useCallback(() => {
    markComplete({
      accounts_checked: Array.from(checkedServices),
      accounts_count: checkedServices.size,
    });
    markStepComplete(7);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/preflight-check"));
  }, [router, markComplete, checkedServices]);

  const handleSkip = useCallback(() => {
    markComplete({ skipped: true });
    markStepComplete(7);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/preflight-check"));
  }, [router, markComplete]);

  const tieredServices: Record<ServiceTier, Service[]> = {
    essential: getServicesByTier("essential").sort(sortByOrder),
    recommended: getServicesByTier("recommended").sort(sortByOrder),
    optional: getServicesByTier("optional").sort(sortByOrder),
  };

  const essentialServices = tieredServices.essential;
  const essentialChecked = essentialServices.filter((s) =>
    checkedServices.has(s.id)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              {messages.title}
            </h1>
            <p className="text-sm text-muted-foreground">{messages.timeEstimate}</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          {messages.description}
        </p>
      </div>

      {/* Cost warning - prominent placement for subscription services */}
      <AlertCard variant="warning" icon={DollarSign} title={messages.alerts.subscriptionCosts.title}>
        {messages.alerts.subscriptionCosts.intro}
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
          <li><span dangerouslySetInnerHTML={{ __html: messages.alerts.subscriptionCosts.claudeCode.replace(/^([^:]+):/, '<strong>$1</strong>:') }} /></li>
          <li><span dangerouslySetInnerHTML={{ __html: messages.alerts.subscriptionCosts.codexCli.replace(/^([^:]+):/, '<strong>$1</strong>:') }} /></li>
          <li><span dangerouslySetInnerHTML={{ __html: messages.alerts.subscriptionCosts.geminiCli.replace(/^([^:]+):/, '<strong>$1</strong>:') }} /></li>
        </ul>
        <p className="mt-2 text-sm">
          <span dangerouslySetInnerHTML={{ __html: messages.alerts.subscriptionCosts.dontNeedAll.replace(/^([^!]+!)/, '<strong>$1</strong>') }} />
        </p>
      </AlertCard>

      {/* Google SSO tip - uses getGoogleSsoServices() to show count */}
      <AlertCard variant="tip" icon={Sparkles} title={messages.alerts.googleSso.title}>
        {messages.alerts.googleSso.content
          .replace('{count}', String(getGoogleSsoServices().length))
          .replace('{total}', String(SERVICES.length))}
      </AlertCard>

      {/* Progress indicator */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {messages.progress.essentialAccounts}
          </span>
          <span className="font-medium">
            {essentialChecked.length} / {essentialServices.length}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-[oklch(0.72_0.19_145)] transition-all"
            style={{
              width: `${
                essentialServices.length > 0
                  ? (essentialChecked.length / essentialServices.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Service tiers */}
      <div className="space-y-4">
        {(["essential", "recommended", "optional"] as ServiceTier[]).map((tier) => (
          <TierSection
            key={tier}
            tier={tier}
            services={tieredServices[tier]}
            checkedServices={checkedServices}
            onToggleService={handleToggle}
            messages={messages}
          />
        ))}
      </div>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.whyAccounts.term}>
            {messages.guide.whyAccounts.content}
            <br />
            <br />
            <span dangerouslySetInnerHTML={{ __html: messages.guide.whyAccounts.essential.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
            <br />
            <br />
            <span dangerouslySetInnerHTML={{ __html: messages.guide.whyAccounts.recommended.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
            <br />
            <br />
            <span dangerouslySetInnerHTML={{ __html: messages.guide.whyAccounts.optional.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
          </GuideExplain>

          <GuideSection title={messages.guide.howToSignUp.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.howToSignUp.step1.title}>
                {messages.guide.howToSignUp.step1.content}
              </GuideStep>

              <GuideStep number={2} title={messages.guide.howToSignUp.step2.title}>
                {messages.guide.howToSignUp.step2.content}
              </GuideStep>

              <GuideStep number={3} title={messages.guide.howToSignUp.step3.title}>
                {messages.guide.howToSignUp.step3.content}
              </GuideStep>

              <GuideStep number={4} title={messages.guide.howToSignUp.step4.title}>
                {messages.guide.howToSignUp.step4.content}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideTip>
            <span dangerouslySetInnerHTML={{ __html: messages.guide.tip.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
          </GuideTip>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Link href="/learn/agent-commands" className="flex items-center gap-3 text-sm">
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

      {/* Skip reassurance note */}
      <div className="rounded-xl border border-muted bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{messages.skipNote.title}</strong>{" "}
          {messages.skipNote.content}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={handleSkip} disabled={isNavigating}>
          {common.buttons.back}
        </Button>
        <Button
          onClick={handleContinue}
          disabled={isNavigating}
          size="lg"
          disableMotion
        >
          {isNavigating ? common.buttons.loading : common.buttons.continue}
        </Button>
      </div>
    </div>
  );
}
