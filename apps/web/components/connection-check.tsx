"use client";

import { AlertCircle, Monitor, Server, ArrowRight, Terminal, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, getConnectionCheckMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getConnectionCheckMessages>;

interface ConnectionCheckProps {
  /** The VPS IP address to show in examples */
  vpsIP?: string;
  /** Additional class names */
  className?: string;
  /** Whether to show the "Two Computers" explainer */
  showExplainer?: boolean;
  /** Whether to show the "Where Am I?" section */
  showWhereAmI?: boolean;
}

/**
 * A prominent visual component that helps users understand if they're
 * connected to their VPS before running commands.
 */
export function ConnectionCheck({
  vpsIP = "YOUR_VPS_IP",
  className,
  showExplainer = false,
  showWhereAmI = true,
}: ConnectionCheckProps) {
  const { locale } = useLocale();
  const messages = getConnectionCheckMessages(locale);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Warning */}
      <div className="rounded-xl border-2 border-[oklch(0.65_0.22_25/0.4)] bg-[oklch(0.65_0.22_25/0.08)] p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.65_0.22_25)]" />
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-[oklch(0.85_0.15_25)]">
                {messages.mainWarning.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {messages.mainWarning.description}
              </p>
            </div>

            {/* Visual comparison */}
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Wrong - Local */}
              <div className="rounded-lg border border-[oklch(0.65_0.22_25/0.3)] bg-[oklch(0.65_0.22_25/0.05)] p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-[oklch(0.65_0.22_25)]">
                  <Monitor className="h-4 w-4" />
                  <span>{messages.comparison.wrongTitle}</span>
                </div>
                <div className="mt-2 rounded bg-[oklch(0.12_0.01_260)] px-3 py-2 font-mono text-xs">
                  <span className="text-muted-foreground">C:\Users\YourName&gt;</span>
                  <span className="animate-pulse"> _</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {messages.comparison.or} <code className="text-foreground/70">YourMac:~ yourname$</code>
                </p>
              </div>

              {/* Right - VPS */}
              <div className="rounded-lg border border-[oklch(0.72_0.19_145/0.3)] bg-[oklch(0.72_0.19_145/0.05)] p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-[oklch(0.72_0.19_145)]">
                  <Server className="h-4 w-4" />
                  <span>{messages.comparison.correctTitle}</span>
                </div>
                <div className="mt-2 rounded bg-[oklch(0.12_0.01_260)] px-3 py-2 font-mono text-xs">
                  <span className="text-[oklch(0.72_0.19_145)]">ubuntu@vps:~$</span>
                  <span className="animate-pulse"> _</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {messages.comparison.or} <code className="text-foreground/70">root@vps:~#</code>
                </p>
              </div>
            </div>

            {/* How to connect */}
            <div className="rounded-lg border border-border/50 bg-card/50 p-3">
              <p className="text-sm font-medium">{messages.howToConnect.title}</p>
              <code className="mt-2 block overflow-x-auto rounded bg-muted px-3 py-2 font-mono text-xs">
                ssh -i ~/.ssh/acfs_ed25519 ubuntu@{vpsIP}
              </code>
              <p className="mt-2 text-xs text-muted-foreground">
                {messages.howToConnect.onWindows} <code className="text-foreground/70">ssh -i $HOME\.ssh\acfs_ed25519 ubuntu@{vpsIP}</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Computers Explainer */}
      {showExplainer && <TwoComputersExplainer messages={messages} />}

      {/* Where Am I section */}
      {showWhereAmI && <WhereAmICheck messages={messages} />}
    </div>
  );
}

/**
 * Explains the "two computers" mental model for beginners
 */
export function TwoComputersExplainer({ className, messages: propMessages }: { className?: string; messages?: Messages }) {
  const { locale } = useLocale();
  const messages = propMessages ?? getConnectionCheckMessages(locale);

  return (
    <div className={cn("rounded-xl border border-[oklch(0.75_0.18_195/0.3)] bg-[oklch(0.75_0.18_195/0.05)] p-4", className)}>
      <div className="flex items-start gap-3">
        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.75_0.18_195)]" />
        <div className="space-y-3">
          <p className="font-semibold text-foreground">
            {messages.twoComputers.title}
          </p>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            {/* Your Computer */}
            <div className="flex-1 rounded-lg border border-border/50 bg-card/50 p-3 text-center">
              <Monitor className="mx-auto h-8 w-8 text-[oklch(0.78_0.16_75)]" />
              <p className="mt-2 font-medium">{messages.twoComputers.yourComputer}</p>
              <p className="text-xs text-muted-foreground">
                {messages.twoComputers.laptopDesktop}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {messages.twoComputers.windowsOrMac}
              </p>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <ArrowRight className="h-6 w-6 rotate-90 text-primary sm:rotate-0" />
              <p className="text-xs font-medium text-primary">{messages.twoComputers.ssh}</p>
            </div>

            {/* VPS */}
            <div className="flex-1 rounded-lg border border-[oklch(0.72_0.19_145/0.3)] bg-[oklch(0.72_0.19_145/0.05)] p-3 text-center">
              <Server className="mx-auto h-8 w-8 text-[oklch(0.72_0.19_145)]" />
              <p className="mt-2 font-medium">{messages.twoComputers.yourVps}</p>
              <p className="text-xs text-muted-foreground">
                {messages.twoComputers.remoteServer}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {messages.twoComputers.linuxInCloud}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">{messages.twoComputers.sshHighlight}</strong>{" "}
              {messages.twoComputers.sshExplanation}
            </p>
            <p>
              <strong className="text-foreground">{messages.twoComputers.terminalHighlight}</strong>{" "}
              {messages.twoComputers.terminalExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Quick check to help users verify where they are
 */
export function WhereAmICheck({ className, messages: propMessages }: { className?: string; messages?: Messages }) {
  const { locale } = useLocale();
  const messages = propMessages ?? getConnectionCheckMessages(locale);

  return (
    <details className={cn("group rounded-xl border border-border/50 bg-card/30", className)}>
      <summary className="flex cursor-pointer items-center gap-2 p-4 font-medium hover:bg-muted/50">
        <Terminal className="h-4 w-4 text-primary" />
        <span>{messages.whereAmI.title}</span>
      </summary>
      <div className="border-t border-border/50 p-4 pt-3">
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            {messages.whereAmI.promptExplanation}
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-[oklch(0.72_0.19_145/0.3)] bg-[oklch(0.72_0.19_145/0.05)] p-3">
              <p className="font-medium text-[oklch(0.72_0.19_145)]">{messages.whereAmI.connectedTitle}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                <li><code className="text-foreground">ubuntu@...</code> {messages.whereAmI.connectedHint1} <code className="text-foreground">root@...</code></li>
                <li>{messages.whereAmI.connectedHint2Prefix} <code className="text-foreground">$</code> {messages.whereAmI.connectedHint2Or} <code className="text-foreground">#</code></li>
                <li>{messages.whereAmI.connectedHint3}</li>
              </ul>
            </div>

            <div className="rounded-lg border border-[oklch(0.65_0.22_25/0.3)] bg-[oklch(0.65_0.22_25/0.05)] p-3">
              <p className="font-medium text-[oklch(0.65_0.22_25)]">{messages.whereAmI.notConnectedTitle}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                <li><code className="text-foreground">C:\Users\YourName&gt;</code> {messages.whereAmI.notConnectedHint1}</li>
                <li><code className="text-foreground">PS C:\Users\YourName&gt;</code> {messages.whereAmI.notConnectedHint2}</li>
                <li><code className="text-foreground">YourMac:~ yourname$</code> {messages.whereAmI.notConnectedHint3}</li>
                <li>{messages.whereAmI.notConnectedHint4}</li>
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground">
            <strong className="text-foreground">{messages.whereAmI.stillConfused}</strong> {messages.whereAmI.hostnameHint}{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">hostname</code>{" "}
            {messages.whereAmI.hostnameAnd}
          </p>
        </div>
      </div>
    </details>
  );
}
