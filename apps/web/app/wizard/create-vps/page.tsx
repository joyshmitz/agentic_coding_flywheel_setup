"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { Check, AlertCircle, Server, ChevronDown, HardDrive, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import { useVPSIP, isValidIP } from "@/lib/userPreferences";
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
import { useLocale, getCreateVpsMessages } from "@/lib/i18n";

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
    <figure className="space-y-1">
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

type ChecklistItemId = "ubuntu" | "region" | "password" | "created" | "copied-ip";

function getChecklistItems(messages: ReturnType<typeof getCreateVpsMessages>) {
  return [
    { id: "ubuntu" as const, label: messages.checklist.items.ubuntu },
    { id: "region" as const, label: messages.checklist.items.region },
    { id: "password" as const, label: messages.checklist.items.password },
    { id: "created" as const, label: messages.checklist.items.created },
    { id: "copied-ip" as const, label: messages.checklist.items.copiedIp },
  ];
}

interface ProviderGuideProps {
  name: string;
  specificStepsTemplate: string;
  steps: string[];
  screenshots?: ScreenshotSpec[];
  isExpanded: boolean;
  onToggle: () => void;
}

function ProviderGuide({
  name,
  specificStepsTemplate,
  steps,
  screenshots,
  isExpanded,
  onToggle,
}: ProviderGuideProps) {
  return (
    <div className={cn(
      "rounded-xl border transition-all duration-200",
      isExpanded
        ? "border-primary/30 bg-card/80"
        : "border-border/50 bg-card/50"
    )}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between p-3 text-left"
      >
        <span className="font-medium text-foreground">
          {specificStepsTemplate.replace("{name}", name)}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      {isExpanded && (
        <div className="border-t border-border/50 px-3 pb-3 pt-2">
          <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {screenshots && screenshots.length > 0 && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {screenshots.map((shot) => (
                <ScreenshotFigure
                  key={shot.file}
                  file={shot.file}
                  alt={shot.alt}
                  caption={shot.caption}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getProviderGuides(messages: ReturnType<typeof getCreateVpsMessages>) {
  return [
    {
      name: "Contabo",
      steps: messages.providerHelp.contabo.steps,
      screenshots: [
        {
          file: "contabo_us_03_order_page.png",
          alt: messages.providerHelp.contabo.screenshotAlt,
          caption: messages.providerHelp.contabo.screenshotCaption,
        },
      ],
    },
    {
      name: "OVH",
      steps: messages.providerHelp.ovh.steps,
      screenshots: [
        {
          file: "ovh_us_03_order.png",
          alt: messages.providerHelp.ovh.screenshotAlt,
          caption: messages.providerHelp.ovh.screenshotCaption,
        },
      ],
    },
  ];
}

export default function CreateVPSPage() {
  const router = useRouter();
  const [storedIP, setStoredIP] = useVPSIP();
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const { locale } = useLocale();
  const messages = getCreateVpsMessages(locale);
  const checklistItems = getChecklistItems(messages);
  const providerGuides = getProviderGuides(messages);

  // Track checklist state locally for simpler form handling
  const [checkedItems, setCheckedItems] = useState<Set<ChecklistItemId>>(new Set());

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "create_vps",
    stepNumber: 5,
    stepTitle: "Create VPS Instance",
  });

  // Store markComplete in a ref for use in form's onSubmit
  const markCompleteRef = useRef(markComplete);
  useEffect(() => {
    markCompleteRef.current = markComplete;
  }, [markComplete]);

  const form = useForm({
    defaultValues: {
      ipAddress: storedIP ?? "",
    },
    onSubmit: async ({ value }) => {
      markCompleteRef.current({ ip_entered: true });
      setStoredIP(value.ipAddress);
      markStepComplete(5);
      setIsNavigating(true);
      router.push(withCurrentSearch("/wizard/ssh-connect"));
    },
  });

  // Track if we've synced the stored IP to avoid overwriting user edits
  const hasSyncedStoredIP = useRef(false);

  // Sync stored IP to form after hydration (storedIP is null during SSR)
  useEffect(() => {
    if (storedIP && !hasSyncedStoredIP.current && !form.state.values.ipAddress) {
      form.setFieldValue("ipAddress", storedIP);
      hasSyncedStoredIP.current = true;
    }
  }, [storedIP, form]);

  const handleCheckItem = (itemId: ChecklistItemId, checked: boolean) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(itemId);
      } else {
        next.delete(itemId);
      }
      return next;
    });
  };

  const allChecked = checklistItems.every((item) => checkedItems.has(item.id));
  const ipExampleSegments = messages.guide.detailedSteps.step8.exampleTemplate.split("{ip}");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <HardDrive className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              {messages.title.split("VPS")[0]}<Jargon term="vps" gradientHeading>VPS</Jargon>{messages.title.split("VPS")[1] || ""}
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Universal checklist */}
        <div className={cn(
          "rounded-xl border p-4 transition-colors",
          allChecked
            ? "border-[oklch(0.72_0.19_145/0.5)] bg-[oklch(0.72_0.19_145/0.05)]"
            : "border-border/50 bg-card/50"
        )}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 font-semibold text-foreground">
                <Server className="h-5 w-5 text-primary" />
                {messages.checklist.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {messages.checklist.subtitle}
              </p>
            </div>
            <div className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
              allChecked
                ? "bg-[oklch(0.72_0.19_145/0.15)] text-[oklch(0.72_0.19_145)]"
                : "bg-muted text-muted-foreground"
            )}>
              {messages.checklist.progress.replace("{done}", String(checkedItems.size)).replace("{total}", String(checklistItems.length))}
            </div>
          </div>
          <div className="space-y-3">
            {checklistItems.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={checkedItems.has(item.id)}
                  onCheckedChange={(checked) =>
                    handleCheckItem(item.id, checked === true)
                  }
                />
                <span
                  className={cn(
                    "text-sm transition-all",
                    checkedItems.has(item.id)
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>

          {/* Prompt to enter IP when checklist is complete */}
          {allChecked && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              <Check className="h-4 w-4" />
              <span>{messages.checklist.readyPrompt}</span>
            </div>
          )}
        </div>

        {/* IP Address input - placed prominently after checklist */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="font-semibold text-foreground">{messages.ipInput.title}</h2>
            <p className="text-sm text-muted-foreground">
              {messages.ipInput.subtitle}
            </p>
          </div>

          {/* Privacy assurance card */}
          <div className="flex gap-3 rounded-xl border border-[oklch(0.72_0.19_145/0.25)] bg-[oklch(0.72_0.19_145/0.05)] p-3 sm:p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.72_0.19_145/0.15)] sm:h-9 sm:w-9">
              <ShieldCheck className="h-4 w-4 text-[oklch(0.72_0.19_145)] sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-[13px] font-medium leading-tight text-[oklch(0.82_0.12_145)] sm:text-sm">
                {messages.ipInput.privacy.title}
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
                {messages.ipInput.privacy.content}{" "}
                <a
                  href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-medium text-[oklch(0.75_0.18_195)] hover:underline"
                >
                  {messages.ipInput.privacy.openSource}
                  <ExternalLink className="h-3 w-3" />
                </a>
                {messages.ipInput.privacy.verifySuffix}
              </p>
            </div>
          </div>

          <form.Field
            name="ipAddress"
            validators={{
              onChange: ({ value }) => {
                if (!value) return undefined;
                if (!isValidIP(value)) {
                  return messages.ipInput.validation.invalid;
                }
                return undefined;
              },
              onBlur: ({ value }) => {
                // Duplicate validation on blur for Firefox/Safari compatibility
                if (!value) return undefined;
                if (!isValidIP(value)) {
                  return messages.ipInput.validation.invalid;
                }
                return undefined;
              },
              onSubmit: ({ value }) => {
                if (!value) {
                  return messages.ipInput.validation.required;
                }
                if (!isValidIP(value)) {
                  return messages.ipInput.validation.invalid;
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              const hasErrors = field.state.meta.errors.length > 0;
              const isValid = field.state.value && !hasErrors && isValidIP(field.state.value);
              const canSubmit = allChecked && isValid && !isNavigating;

              return (
                <div className="space-y-2">
                  <input
                    data-vps-ip-input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={messages.ipInput.placeholder}
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-3 font-mono text-sm outline-none transition-all",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      hasErrors
                        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                        : "border-border/50"
                    )}
                  />
                  {hasErrors && (
                    <p className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                  {isValid && (
                    <p className="flex items-center gap-1 text-sm text-[oklch(0.72_0.19_145)]">
                      <Check className="h-4 w-4" />
                      {messages.ipInput.validation.valid}
                    </p>
                  )}

                  {/* Hint when IP is valid but checklist isn't complete */}
                  {isValid && !allChecked && (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      {messages.ipInput.checklistHint}
                    </p>
                  )}

                  {/* Hint when checklist is complete but IP is missing */}
                  {allChecked && !field.state.value && (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      {messages.ipInput.validation.required}
                    </p>
                  )}

                  {/* Hint when checklist is complete but IP is invalid */}
                  {allChecked && field.state.value && hasErrors && (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      {messages.ipInput.validation.invalid}
                    </p>
                  )}

                  {/* Continue button - rendered inside field for access to validation state */}
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      size="lg"
                    >
                      {isNavigating ? messages.buttons.loading : messages.buttons.continue}
                    </Button>
                  </div>
                </div>
              );
            }}
          </form.Field>
        </div>

        {/* Region selection tip - prominent placement */}
        <div className="rounded-xl border border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.05)] p-4">
          <h3 className="font-medium text-foreground mb-2">{messages.regionTip.title}</h3>
          <p className="text-sm text-muted-foreground">
            {messages.regionTip.content}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            <div className="rounded-lg bg-background/50 px-3 py-2">
              <span className="font-medium text-foreground">{messages.regionTip.regions.usa.label}</span>{" "}
              <span className="text-muted-foreground">{messages.regionTip.regions.usa.hint}</span>
            </div>
            <div className="rounded-lg bg-background/50 px-3 py-2">
              <span className="font-medium text-foreground">{messages.regionTip.regions.europe.label}</span>{" "}
              <span className="text-muted-foreground">{messages.regionTip.regions.europe.hint}</span>
            </div>
            <div className="rounded-lg bg-background/50 px-3 py-2">
              <span className="font-medium text-foreground">{messages.regionTip.regions.asiaPacific.label}</span>{" "}
              <span className="text-muted-foreground">{messages.regionTip.regions.asiaPacific.hint}</span>
            </div>
            <div className="rounded-lg bg-background/50 px-3 py-2">
              <span className="font-medium text-foreground">{messages.regionTip.regions.unsure.label}</span>{" "}
              <span className="text-muted-foreground">{messages.regionTip.regions.unsure.hint}</span>
            </div>
          </div>
        </div>

        {/* Provider-specific guides */}
        <div className="space-y-3">
          <h2 className="font-semibold">{messages.providerHelp.title}</h2>
          {providerGuides.map((provider) => (
            <ProviderGuide
              key={provider.name}
              name={provider.name}
              specificStepsTemplate={messages.providerHelp.specificSteps}
              steps={provider.steps}
              screenshots={provider.screenshots}
              isExpanded={expandedProvider === provider.name}
              onToggle={() =>
                setExpandedProvider((prev) =>
                  prev === provider.name ? null : provider.name
                )
              }
            />
          ))}
        </div>

        {/* Beginner Guide */}
        <SimplerGuide>
          <div className="space-y-6">
            <GuideExplain term={messages.guide.ipAddress.term}>
              {messages.guide.ipAddress.content}
              <br /><br />
              {messages.guide.ipAddress.purpose}
            </GuideExplain>

            <GuideTip>
              <strong>{messages.guide.whyPassword.title}</strong> {messages.guide.whyPassword.content}
            </GuideTip>

            <GuideSection title={messages.guide.detailedSteps.title}>
              <div className="space-y-4">
                <GuideStep number={1} title={messages.guide.detailedSteps.step1.title}>
                  {messages.guide.detailedSteps.step1.content}
                </GuideStep>

                <GuideStep number={2} title={messages.guide.detailedSteps.step2.title}>
                  {messages.guide.detailedSteps.step2.lookFor}
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li><span dangerouslySetInnerHTML={{ __html: messages.guide.detailedSteps.step2.ovh.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                    <li><span dangerouslySetInnerHTML={{ __html: messages.guide.detailedSteps.step2.contabo.replace(/^([^:]+:)/, '<strong>$1</strong>') }} /></li>
                  </ul>
                </GuideStep>

                <GuideStep number={3} title={messages.guide.detailedSteps.step3.title}>
                  {messages.guide.detailedSteps.step3.content}
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {messages.guide.detailedSteps.step3.regions.map((region, idx) => (
                      <li key={idx}>{region}</li>
                    ))}
                  </ul>
                </GuideStep>

                <GuideStep number={4} title={messages.guide.detailedSteps.step4.title}>
                  {messages.guide.detailedSteps.step4.content}
                  <br /><br />
                  <strong>{messages.guide.detailedSteps.step4.lookFor}</strong>
                  <br />
                  <em className="text-xs">
                    {messages.guide.detailedSteps.step4.fallback}
                  </em>
                </GuideStep>

                <GuideStep number={5} title={messages.guide.detailedSteps.step5.title}>
                  {messages.guide.detailedSteps.step5.lookFor}
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>{messages.guide.detailedSteps.step5.skipSsh}</li>
                    <li>{messages.guide.detailedSteps.step5.choosePassword}</li>
                    <li>{messages.guide.detailedSteps.step5.setPassword}</li>
                    <li><strong>{messages.guide.detailedSteps.step5.saveIt}</strong></li>
                  </ul>
                  <p className="mt-2 text-xs italic">
                    {messages.guide.detailedSteps.step5.emailNote}
                  </p>
                </GuideStep>

                <GuideStep number={6} title={messages.guide.detailedSteps.step6.title}>
                  {messages.guide.detailedSteps.step6.lookFor}
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {messages.guide.detailedSteps.step6.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {messages.guide.detailedSteps.step6.recommendation}
                  </p>
                </GuideStep>

                <GuideStep number={7} title={messages.guide.detailedSteps.step7.title}>
                  {messages.guide.detailedSteps.step7.content}
                  <br /><br />
                  {messages.guide.detailedSteps.step7.waitTime}
                </GuideStep>

                <GuideStep number={8} title={messages.guide.detailedSteps.step8.title}>
                  {messages.guide.detailedSteps.step8.content}
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {messages.guide.detailedSteps.step8.locations.map((location, idx) => (
                      <li key={idx}>{location}</li>
                    ))}
                    <li>
                      {ipExampleSegments[0]}
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">203.0.113.42</code>
                      {ipExampleSegments[1] ?? ""}
                    </li>
                  </ul>
                  <br />
                  <strong>{messages.guide.detailedSteps.step8.action}</strong>
                </GuideStep>
              </div>
            </GuideSection>

            <GuideTip>
              {messages.guide.ipTip}
            </GuideTip>

            <GuideCaution>
              <span dangerouslySetInnerHTML={{
                __html: messages.guide.passwordCaution.replace(/^([^!]+!)/, '<strong>$1</strong>')
              }} />
            </GuideCaution>
          </div>
        </SimplerGuide>
      </form>
    </div>
  );
}
