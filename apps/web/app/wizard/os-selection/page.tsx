"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Apple, Monitor, Sparkles, Laptop, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { markStepComplete } from "@/lib/wizardSteps";
import { useWizardAnalytics } from "@/lib/hooks/useWizardAnalytics";
import {
  SimplerGuide,
  GuideSection,
  GuideExplain,
  GuideTip,
} from "@/components/simpler-guide";
import {
  useUserOS,
  useDetectedOS,
  type OperatingSystem,
} from "@/lib/userPreferences";
import { withCurrentSearch } from "@/lib/utils";
import { useLocale, getOsSelectionMessages } from "@/lib/i18n";

interface OSCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  detected?: boolean;
  onClick: () => void;
  detectedBadgeSelected?: string;
  detectedBadgeDetected?: string;
}

function OSCard({ icon, title, description, selected, detected, onClick, detectedBadgeSelected = "Selected", detectedBadgeDetected = "Detected" }: OSCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative flex w-full flex-col items-center gap-4 rounded-2xl border p-8 text-center transition-all duration-300",
        selected
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
          : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-md"
      )}
      onClick={onClick}
      role="radio"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-checked={selected}
    >
      {/* Detected badge */}
      {detected && (
        <div className={cn(
          "absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium transition-all",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-primary/20 text-primary"
        )}>
          {selected ? detectedBadgeSelected : detectedBadgeDetected}
        </div>
      )}

      {/* Selected glow */}
      {selected && (
        <>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/50 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
        </>
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300",
          selected
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground"
        )}
      >
        {icon}
        {selected && (
          <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-[oklch(0.78_0.16_75)] animate-pulse" />
        )}
      </div>

      {/* Text */}
      <div className="relative">
        <h3 className="text-xl font-bold tracking-tight transition-colors text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground animate-scale-in">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

export default function OSSelectionPage() {
  const router = useRouter();
  const [storedOS, setStoredOS] = useUserOS();
  const detectedOS = useDetectedOS();
  const [isNavigating, setIsNavigating] = useState(false);
  const { locale } = useLocale();
  const messages = getOsSelectionMessages(locale);

  // Analytics tracking for this wizard step
  const { markComplete } = useWizardAnalytics({
    step: "os_selection",
    stepNumber: 1,
    stepTitle: "OS Selection",
  });

  // Use stored OS if available, otherwise use detected OS
  const selectedOS = storedOS ?? detectedOS;
  const hasDetection = detectedOS !== null;

  // Select OS without navigating
  const handleSelectOS = useCallback(
    (os: OperatingSystem) => {
      setStoredOS(os);
    },
    [setStoredOS]
  );

  // Navigate only when Continue is clicked
  const handleContinue = useCallback(() => {
    if (selectedOS) {
      // Confirm the selection explicitly so subsequent steps can rely on it.
      setStoredOS(selectedOS);
      markComplete({ selected_os: selectedOS });
      markStepComplete(1);
      setIsNavigating(true);

      // Linux users already have a terminal and SSH - skip to SSH key generation
      if (selectedOS === "linux") {
        // Also mark install-terminal step as complete since Linux users skip it
        markStepComplete(2);
        router.push(withCurrentSearch("/wizard/generate-ssh-key"));
      } else {
        router.push(withCurrentSearch("/wizard/install-terminal"));
      }
    }
  }, [selectedOS, router, markComplete, setStoredOS]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Laptop className="h-5 w-5 text-primary" />
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

      {/* OS Options */}
      <div data-os-selection className="grid gap-6 sm:grid-cols-3" role="radiogroup" aria-label="Select your operating system">
        <OSCard
          icon={<Apple className="h-10 w-10" />}
          title={messages.osCards.mac.title}
          description={messages.osCards.mac.description}
          selected={selectedOS === "mac"}
          detected={detectedOS === "mac"}
          onClick={() => handleSelectOS("mac")}
          detectedBadgeSelected={messages.badges.selected}
          detectedBadgeDetected={messages.badges.detected}
        />
        <OSCard
          icon={<Monitor className="h-10 w-10" />}
          title={messages.osCards.windows.title}
          description={messages.osCards.windows.description}
          selected={selectedOS === "windows"}
          detected={detectedOS === "windows"}
          onClick={() => handleSelectOS("windows")}
          detectedBadgeSelected={messages.badges.selected}
          detectedBadgeDetected={messages.badges.detected}
        />
        <OSCard
          icon={<Terminal className="h-10 w-10" />}
          title={messages.osCards.linux.title}
          description={messages.osCards.linux.description}
          selected={selectedOS === "linux"}
          detected={detectedOS === "linux"}
          onClick={() => handleSelectOS("linux")}
          detectedBadgeSelected={messages.badges.selected}
          detectedBadgeDetected={messages.badges.detected}
        />
      </div>

      {/* Tip */}
      <div className="rounded-xl border border-border/30 bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{messages.tip.label}:</span>{" "}
          {hasDetection ? (
            <>{messages.tip.detected}</>
          ) : (
            <>{messages.tip.notDetected}</>
          )}
        </p>
      </div>

      {/* Simpler Guide for beginners */}
      <SimplerGuide>
        <div className="space-y-6">
          <GuideSection title={messages.guide.whatIsAsking.title}>
            <p>
              {messages.guide.whatIsAsking.content}
            </p>
          </GuideSection>

          <GuideExplain term={messages.guide.operatingSystem.term}>
            {messages.guide.operatingSystem.intro}
            <br /><br />
            <strong>Mac</strong> = {messages.guide.operatingSystem.mac}
            <br /><br />
            <strong>Windows</strong> = {messages.guide.operatingSystem.windows}
            <br /><br />
            <strong>Linux</strong> = {messages.guide.operatingSystem.linux}
          </GuideExplain>

          <GuideSection title={messages.guide.howToKnow.title}>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Mac:</strong> {messages.guide.howToKnow.mac}
              </li>
              <li>
                <strong>Windows:</strong> {messages.guide.howToKnow.windows}
              </li>
              <li>
                <strong>Linux:</strong> {messages.guide.howToKnow.linux}
              </li>
            </ul>
          </GuideSection>

          <GuideTip>
            {hasDetection ? (
              <>{messages.guide.guideTip.detected}</>
            ) : (
              <>{messages.guide.guideTip.notDetected}</>
            )}
          </GuideTip>
        </div>
      </SimplerGuide>

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleContinue}
          disabled={!selectedOS || isNavigating}
          size="lg"
          className="group"
          disableMotion
        >
          {isNavigating ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              {messages.buttons.loading}
            </>
          ) : (
            <>
              {messages.buttons.continue}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
