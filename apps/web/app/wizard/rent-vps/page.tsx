"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ExternalLink, Check, Server, ChevronDown, Cloud, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertCard } from "@/components/alert-card";
import { TrackedLink } from "@/components/tracked-link";
import { VPSComparison } from "@/components/wizard/VPSComparison";
import { cn } from "@/lib/utils";
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
import { useLocale, getRentVpsMessages, getCommonMessages } from "@/lib/i18n";

interface ProviderInfo {
  id: string;
  name: string;
  tagline: string;
  url: string;
  pros: string[];
  recommended?: string;
}

const PROVIDERS: ProviderInfo[] = [
  {
    id: "contabo",
    name: "Contabo",
    tagline: "Best value for high specs",
    url: "https://contabo.com/en-us/vps/",
    pros: [
      "Best specs-to-price ratio on the market",
      "Cloud VPS 50 (64GB RAM, 16 vCPU): ~$56/month (US datacenter)",
      "Cloud VPS 40 (48GB RAM, 12 vCPU): ~$36/month (US datacenter)",
      "Prices are month-to-month, no commitment required",
    ],
    recommended: "Cloud VPS 50 (64GB RAM, 16 vCPU, ~$56/month US) - our top pick for serious multi-agent work",
  },
  {
    id: "ovh",
    name: "OVH",
    tagline: "Reliable, good support",
    url: "https://us.ovhcloud.com/vps/",
    pros: [
      "Great EU and US data centers with anti-DDoS included",
      "VPS-5 (64GB RAM, 16 vCore): ~$40/month (no commitment)",
      "VPS-4 (48GB RAM, 12 vCore): ~$26/month (no commitment)",
      "Prices are month-to-month; longer commitments offer 5-15% discounts",
    ],
    recommended: "VPS-5 (64GB RAM, 16 vCore, ~$40/month) for best multi-agent performance",
  },
];

type ScreenshotSpec = {
  file: string;
  alt: string;
  caption: string;
};

const SCREENSHOT_BASE =
  "https://raw.githubusercontent.com/Dicklesworthstone/agentic_coding_flywheel_setup/main/research_screenshots";

function screenshotUrl(file: string): string {
  return `${SCREENSHOT_BASE}/${file}`;
}

function ScreenshotFigure({ file, alt, caption }: ScreenshotSpec) {
  const src = screenshotUrl(file);
  return (
    <figure className="mt-3 space-y-1">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-xl border border-border/50 bg-muted/10 transition hover:border-primary/30"
      >
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={1000}
          unoptimized
          className="h-auto w-full"
        />
      </a>
      <figcaption className="text-xs text-muted-foreground">
        {caption}{" "}
        <span className="sr-only">(opens full size in a new tab)</span>
      </figcaption>
    </figure>
  );
}

interface ProviderCardProps {
  provider: ProviderInfo;
  isExpanded: boolean;
  onToggle: () => void;
}

function ProviderCard({ provider, isExpanded, onToggle }: ProviderCardProps) {
  return (
    <div className={cn(
      "overflow-hidden rounded-xl border transition-all duration-200",
      isExpanded
        ? "border-primary/30 bg-card/80 shadow-md"
        : "border-border/50 bg-card/50 hover:border-primary/20"
    )}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors",
            isExpanded
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}>
            {provider.name[0]}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.tagline}</p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-border/50 px-4 pb-4 pt-3 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Why {provider.name}:</h4>
            <ul className="space-y-1">
              {provider.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.72_0.19_145)]" />
                  <span className="text-muted-foreground">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {provider.recommended && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-sm">
                <span className="font-medium text-foreground">Recommended plan:</span>{" "}
                <span className="text-muted-foreground">
                  {provider.recommended}
                </span>
              </p>
            </div>
          )}

          <TrackedLink
            href={provider.url}
            trackingId={`vps-provider-${provider.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Go to {provider.name}
            <ExternalLink className="h-4 w-4" />
          </TrackedLink>
        </div>
      )}
    </div>
  );
}

export default function RentVPSPage() {
  const router = useRouter();
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const { locale } = useLocale();
  const messages = getRentVpsMessages(locale);
  const common = getCommonMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "rent_vps",
    stepNumber: 4,
    stepTitle: "Rent a VPS",
  });

  const handleToggleProvider = useCallback((providerId: string) => {
    setExpandedProvider((prev) => (prev === providerId ? null : providerId));
  }, []);

  const handleContinue = useCallback(() => {
    markComplete({ expanded_provider: expandedProvider });
    markStepComplete(4);
    setIsNavigating(true);
    router.push(withCurrentSearch("/wizard/create-vps"));
  }, [router, markComplete, expandedProvider]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Cloud className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              {messages.title.split("VPS")[0]}<Jargon term="vps" gradientHeading>VPS</Jargon>
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

      {/* Spec checklist */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
          <Server className="h-5 w-5 text-primary" />
          {messages.specChecklist.title}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {messages.specChecklist.specs.map((spec) => (
            <div key={spec.label} className="flex gap-2 text-sm">
              <span className="font-medium text-muted-foreground min-w-20">
                {spec.label}:
              </span>
              <span className="text-foreground">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick comparison table */}
      <VPSComparison />

      {/* Credit card and verification warning */}
      <AlertCard variant="warning" title={messages.alerts.beforeSignup.title}>
        <div className="space-y-2 text-sm">
          <p>
            <strong className="text-foreground">{messages.alerts.beforeSignup.creditCard}</strong> {messages.alerts.beforeSignup.creditCardDesc}
          </p>
          <p>
            <strong className="text-foreground">{messages.alerts.beforeSignup.emailVerification}</strong> {messages.alerts.beforeSignup.emailVerificationDesc}
          </p>
          <p className="text-muted-foreground">
            {messages.alerts.beforeSignup.identityNote}
          </p>
        </div>
      </AlertCard>

      {/* Provider cards */}
      <div className="space-y-4">
        <h2 className="font-semibold">{messages.providers.title}</h2>
        <div className="space-y-3">
          {PROVIDERS.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              isExpanded={expandedProvider === provider.id}
              onToggle={() => handleToggleProvider(provider.id)}
            />
          ))}
        </div>
      </div>

      {/* Honest disclaimer */}
      <div className="relative overflow-hidden rounded-xl border border-[oklch(0.6_0.02_260/0.3)] bg-gradient-to-br from-[oklch(0.15_0.01_260)] to-[oklch(0.12_0.015_280)] p-3 sm:p-4">
        {/* Subtle decorative element */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[oklch(0.5_0.03_260/0.15)] blur-2xl" />

        <div className="relative flex gap-2.5 sm:gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.65_0.18_350/0.15)] sm:h-8 sm:w-8">
            <Heart className="h-3.5 w-3.5 text-[oklch(0.75_0.15_350)] sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0 space-y-1 sm:space-y-1.5">
            <p className="text-[13px] font-medium leading-tight text-[oklch(0.85_0.02_260)] sm:text-sm">
              {messages.disclaimer.title}
            </p>
            <p className="text-[13px] leading-relaxed text-[oklch(0.65_0.02_260)] sm:text-sm">
              {messages.disclaimer.content}
            </p>
          </div>
        </div>
      </div>

      {/* Other providers note */}
      <AlertCard variant="tip" title={messages.alerts.differentProvider.title}>
        {messages.alerts.differentProvider.content}
      </AlertCard>

      {/* Beginner Guide */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideExplain term={messages.guide.vpsExplanation.term}>
            {messages.guide.vpsExplanation.content}
            <br /><br />
            <strong>{messages.guide.vpsExplanation.whyNeeded}</strong>
            <br />
            {messages.guide.vpsExplanation.whyContent}
          </GuideExplain>

          <GuideSection title={messages.guide.whyRam.title}>
            <div className="rounded-lg border border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.08)] p-4 mb-4">
              <p className="font-medium text-foreground mb-2">{messages.guide.whyRam.highlight}</p>
              <p className="text-sm text-muted-foreground">
                {messages.guide.whyRam.description}
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.whyRam.options.ram32.replace(/^([^:]+:)/, '<strong>$1</strong>')
                }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.whyRam.options.ram48.replace(/^([^:]+:)/, '<strong>$1</strong>')
                }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.whyRam.options.ram64.replace(/^([^:]+:)/, '<strong>$1</strong>')
                }} />
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-sm text-muted-foreground">
                {messages.guide.whyRam.justGet64}
              </p>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.vpsPerformance.title}>
            <p className="mb-3 text-sm text-muted-foreground">
              {messages.guide.vpsPerformance.intro}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>{messages.guide.vpsPerformance.sharedResources.title}</strong> {messages.guide.vpsPerformance.sharedResources.content}
              </li>
              <li>
                <strong>{messages.guide.vpsPerformance.overselling.title}</strong> {messages.guide.vpsPerformance.overselling.content}
              </li>
              <li>
                <strong>{messages.guide.vpsPerformance.dedicated.title}</strong> {messages.guide.vpsPerformance.dedicated.content}
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-[oklch(0.65_0.15_220/0.3)] bg-[oklch(0.65_0.15_220/0.08)] p-3">
              <p className="text-sm text-muted-foreground">
                <strong>💡 {messages.guide.vpsPerformance.anotherReason.split(':')[0]}:</strong> {messages.guide.vpsPerformance.anotherReason.split(':').slice(1).join(':')}
              </p>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.fullInvestment.title}>
            <p className="mb-4 text-sm text-muted-foreground">
              {messages.guide.fullInvestment.intro}
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 bg-card/50 p-3">
                <p className="font-medium text-foreground">{messages.guide.fullInvestment.claudeMax.title}</p>
                <p className="text-sm text-muted-foreground">
                  {messages.guide.fullInvestment.claudeMax.content}
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-3">
                <p className="font-medium text-foreground">{messages.guide.fullInvestment.chatgptPro.title}</p>
                <p className="text-sm text-muted-foreground">
                  <span dangerouslySetInnerHTML={{
                    __html: messages.guide.fullInvestment.chatgptPro.content
                      .replace('Beads', '<span data-jargon="beads">Beads</span>')
                  }} />
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="font-medium text-foreground">{messages.guide.fullInvestment.total.title}</p>
                <p className="text-sm text-muted-foreground">
                  <span dangerouslySetInnerHTML={{
                    __html: messages.guide.fullInvestment.total.content.replace(/~\$656\/m/, '<strong>~$656/m')
                  }} />
                  <br /><br />
                  <em>{messages.guide.fullInvestment.total.perspective}</em>
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-[oklch(0.65_0.12_30/0.3)] bg-[oklch(0.65_0.12_30/0.08)] p-3">
              <p className="text-sm text-muted-foreground">
                <strong>{messages.guide.fullInvestment.realistic.title}</strong> {messages.guide.fullInvestment.realistic.content}
                <br /><br />
                <strong>{messages.guide.fullInvestment.realistic.perspective.split(':')[0]}:</strong> {messages.guide.fullInvestment.realistic.perspective.split(':').slice(1).join(':')}
              </p>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.whichProvider.title}>
            <p className="mb-4">
              {messages.guide.whichProvider.intro}
            </p>
            <ul className="space-y-3">
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.whichProvider.contabo.replace(/^([^:]+:)/, '<strong>$1</strong>')
                }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.whichProvider.ovh.replace(/^([^:]+:)/, '<strong>$1</strong>')
                }} />
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-[oklch(0.65_0.15_220/0.3)] bg-[oklch(0.65_0.15_220/0.08)] p-3">
              <p className="text-sm text-muted-foreground">
                <strong>💡 {messages.guide.whichProvider.pricingNote.split(':')[0]}:</strong> {messages.guide.whichProvider.pricingNote.split(':').slice(1).join(':')}
              </p>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.contaboSteps.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.contaboSteps.step1.title}>
                {messages.guide.contaboSteps.step1.content.split('contabo.com')[0]}
                <TrackedLink href="https://contabo.com/en-us/vps/" trackingId="contabo-guide-link" className="text-primary underline">
                  contabo.com/en-us/vps
                </TrackedLink>
                <ScreenshotFigure
                  file="contabo_us_01_main.png"
                  alt="Contabo VPS page showing plan tiles and pricing"
                  caption={messages.guide.contaboSteps.step1.caption}
                />
              </GuideStep>

              <GuideStep number={2} title={messages.guide.contaboSteps.step2.title}>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.contaboSteps.step2.content
                    .replace(/12\+ vCPU/g, '<strong>12+ vCPU</strong>')
                    .replace(/48GB\+ RAM/g, '<strong>48GB+ RAM</strong>')
                }} />
                <ScreenshotFigure
                  file="contabo_us_02_plans.png"
                  alt="Contabo plans list highlighting Cloud VPS options"
                  caption={messages.guide.contaboSteps.step2.caption}
                />
              </GuideStep>

              <GuideStep number={3} title={messages.guide.contaboSteps.step3.title}>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.contaboSteps.step3.region.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.contaboSteps.step3.storage.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.contaboSteps.step3.image.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">
                  {messages.guide.contaboSteps.step3.note}
                </p>
                <ScreenshotFigure
                  file="contabo_us_03_order_page.png"
                  alt="Contabo order/configure page with region and image selections"
                  caption={messages.guide.contaboSteps.step3.caption}
                />
              </GuideStep>

              <GuideStep number={4} title={messages.guide.contaboSteps.step4.title}>
                {messages.guide.contaboSteps.step4.content}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {messages.guide.contaboSteps.step4.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </GuideStep>

              <GuideStep number={5} title={messages.guide.contaboSteps.step5.title}>
                {messages.guide.contaboSteps.step5.content}
                <br /><br />
                <strong>{messages.guide.contaboSteps.step5.tip.split(':')[0]}:</strong> {messages.guide.contaboSteps.step5.tip.split(':').slice(1).join(':')}
              </GuideStep>

              <GuideStep number={6} title={messages.guide.contaboSteps.step6.title}>
                {messages.guide.contaboSteps.step6.content}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.ovhSteps.title}>
            <div className="space-y-4">
              <GuideStep number={1} title={messages.guide.ovhSteps.step1.title}>
                {messages.guide.ovhSteps.step1.content.split('us.ovhcloud.com')[0]}
                <TrackedLink href="https://us.ovhcloud.com/vps/" trackingId="ovh-guide-link" className="text-primary underline">
                  us.ovhcloud.com/vps
                </TrackedLink>
                <ScreenshotFigure
                  file="ovh_us_01_main.png"
                  alt="OVH VPS page showing plan tiers and call-to-action buttons"
                  caption={messages.guide.ovhSteps.step1.caption}
                />
              </GuideStep>

              <GuideStep number={2} title={messages.guide.ovhSteps.step2.title}>
                {messages.guide.ovhSteps.step2.intro}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.ovhSteps.step2.vps5.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.ovhSteps.step2.vps4.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                </ul>
                {messages.guide.ovhSteps.step2.action}
                <ScreenshotFigure
                  file="ovh_us_02_plans.png"
                  alt="OVH plans list showing VPS-4 and VPS-5 options"
                  caption={messages.guide.ovhSteps.step2.caption}
                />
              </GuideStep>

              <GuideStep number={3} title={messages.guide.ovhSteps.step3.title}>
                {messages.guide.ovhSteps.step3.intro}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.ovhSteps.step3.image.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.ovhSteps.step3.region.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                  <li><span dangerouslySetInnerHTML={{ __html: messages.guide.ovhSteps.step3.auth.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                </ul>
                <ScreenshotFigure
                  file="ovh_us_03_order.png"
                  alt="OVH order/configuration flow showing OS and region selections"
                  caption={messages.guide.ovhSteps.step3.caption}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {messages.guide.ovhSteps.step3.note}
                </p>
              </GuideStep>

              <GuideStep number={4} title={messages.guide.ovhSteps.step4.title}>
                {messages.guide.ovhSteps.step4.content}
              </GuideStep>
            </div>
          </GuideSection>

          <GuideSection title={messages.guide.understandingSpecs.title}>
            <p className="mb-3">
              {messages.guide.understandingSpecs.intro}
            </p>
            <ul className="space-y-2">
              <li>
                <span dangerouslySetInnerHTML={{ __html: messages.guide.understandingSpecs.vcpu.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{ __html: messages.guide.understandingSpecs.ram.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{ __html: messages.guide.understandingSpecs.storage.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{ __html: messages.guide.understandingSpecs.ubuntu.replace(/^([^:]+:)/, '<strong>$1</strong>') }} />
              </li>
            </ul>
          </GuideSection>

          <GuideSection title={messages.guide.backupStrategy.title}>
            <p className="mb-3 text-sm text-muted-foreground">
              <span dangerouslySetInnerHTML={{
                __html: messages.guide.backupStrategy.intro.replace(
                  /GitHub/g,
                  '<strong><span data-jargon="github">GitHub</span></strong>'
                )
              }} />
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.backupStrategy.pushRegularly
                    .replace(/^([^.]+\.)/, '<strong>$1</strong>')
                    .replace(/gh/, '<code class="rounded bg-muted px-1">gh</code>')
                }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.backupStrategy.openSource.replace(/^([^.]+\.)/, '<strong>$1</strong>')
                }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{
                  __html: messages.guide.backupStrategy.privateProjects.replace(/^([^:]+:)/, '<strong>$1</strong>')
                }} />
              </li>
            </ul>
          </GuideSection>

          <GuideTip>
            <span dangerouslySetInnerHTML={{
              __html: messages.guide.tldr
                .replace(/^TL;DR:/, '<strong>TL;DR:</strong>')
                .replace(/Cloud VPS 50/g, '<strong>Cloud VPS 50</strong>')
            }} />
          </GuideTip>

          <GuideCaution>
            <span dangerouslySetInnerHTML={{
              __html: messages.guide.caution.replace(/^([^!]+!)/, '<strong>$1</strong>')
            }} />
          </GuideCaution>
        </div>
      </SimplerGuide>

      {/* Transition to next step */}
      <AlertCard variant="info" icon={Info} title={messages.guide.accountCreated.title}>
        {messages.guide.accountCreated.content}
      </AlertCard>

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={isNavigating} size="lg" disableMotion>
          {isNavigating ? common.buttons.loading : common.buttons.continue}
        </Button>
      </div>
    </div>
  );
}
