"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Shield, Sparkles, ExternalLink, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import { Jargon } from "@/components/jargon";
import { safeGetJSON, safeSetJSON } from "@/lib/utils";
import { useLocale, getSecurityMessages } from "@/lib/i18n";

const CHECKLIST_STORAGE_KEY = "acfs-security-checklist-v1";

function linkHost(href: string): string {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
}

export default function SecurityDocsPage() {
  const { locale } = useLocale();
  const messages = getSecurityMessages(locale);
  const checklistItems = messages.checklist.items;
  // Create map from items - React Compiler handles memoization automatically
  const itemsById = new Map(checklistItems.map((i) => [i.id, i]));
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = safeGetJSON<string[]>(CHECKLIST_STORAGE_KEY);
    if (Array.isArray(saved)) {
      setChecked(new Set(saved.filter((id) => itemsById.has(id))));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- itemsById is recreated each render, but we only want to load from localStorage once per locale
  }, [locale]);

  const persist = useCallback((next: Set<string>) => {
    safeSetJSON(CHECKLIST_STORAGE_KEY, Array.from(next));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    const next = new Set<string>();
    setChecked(next);
    persist(next);
  }, [persist]);

  return (
    <div className="relative mx-auto max-w-3xl space-y-10 px-6 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-cosmic opacity-35" />

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              {messages.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {messages.description}
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">{messages.navigation.home}</Link>
          <span className="px-2">/</span>
          <span className="text-foreground/80">{messages.navigation.docs}</span>
          <span className="px-2">/</span>
          <span className="text-foreground/80">{messages.navigation.security}</span>
        </div>
      </div>

      <AlertCard variant="warning" icon={AlertTriangle} title={messages.scopeNote.title}>
        {messages.scopeNote.description.includes("VPS") ? (
          <>{messages.scopeNote.description.split("VPS")[0]}<Jargon term="vps">VPS</Jargon>{messages.scopeNote.description.split("VPS")[1]}</>
        ) : (
          messages.scopeNote.description
        )}
      </AlertCard>

      {/* Strategy */}
      <Card className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[oklch(0.78_0.16_75)]" />
          <h2 className="text-lg font-semibold tracking-tight">{messages.whyGoogleSso.title}</h2>
        </div>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {messages.whyGoogleSso.benefits.map((benefit, index) => (
            <li key={index}>
              <span className="text-foreground/80">{benefit.highlight}</span> {benefit.text}
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-sm text-muted-foreground">
          <div className="font-medium text-foreground/90">{messages.whyGoogleSso.modelTitle}</div>
          <div className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
            {messages.whyGoogleSso.tree.root}
            {messages.whyGoogleSso.tree.children.map((child, index) => {
              // Wrap VPS mention with Jargon for the Tailscale line
              const content = child.includes("VPS") ? (
                <>{child.split("VPS")[0]}<Jargon term="vps">VPS</Jargon>{child.split("VPS")[1]}</>
              ) : child.includes("Claude") ? (
                <>{child.split("Claude")[0]}<Jargon term="claude-code">Claude</Jargon>{child.split("Claude")[1]}</>
              ) : child.includes("Codex") ? (
                <>{child.split("Codex")[0]}<Jargon term="codex">Codex</Jargon>{child.split("Codex")[1]}</>
              ) : child.includes("Gemini") ? (
                <>{child.split("Gemini")[0]}<Jargon term="gemini-cli">Gemini</Jargon>{child.split("Gemini")[1]}</>
              ) : child;
              return (
                <span key={index}>
                  <br />
                  {index === messages.whyGoogleSso.tree.children.length - 1 ? "└── " : "├── "}
                  {content}
                </span>
              );
            })}
          </div>
        </div>
      </Card>

      <AlertCard variant="warning" title={messages.tradeoff.title}>
        {messages.tradeoff.description}
      </AlertCard>

      {/* How to secure Google */}
      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold tracking-tight">{messages.secureGoogle.title}</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            {messages.secureGoogle.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={messages.secureGoogle.links.enable2sv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              {messages.secureGoogle.buttons.enable2sv}
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={messages.secureGoogle.links.advancedProtection}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              {messages.secureGoogle.buttons.advancedProtection}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Card>

      {/* Services without SSO */}
      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold tracking-tight">{messages.servicesWithoutSso.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.servicesWithoutSso.description}
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {messages.servicesWithoutSso.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </Card>

      {/* Password manager */}
      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold tracking-tight">{messages.passwordManagers.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.passwordManagers.description}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {messages.passwordManagers.managers.map((manager) => {
            const className = manager.featured
              ? "rounded-xl border border-primary/30 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
              : "rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:border-primary/30";

            const content = (
              <>
                <div className="font-medium text-foreground">{manager.name}</div>
                <p className="mt-1 text-xs text-muted-foreground">{manager.description}</p>
              </>
            );

            return manager.href ? (
              <a
                key={manager.name}
                href={manager.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <div key={manager.name} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </Card>

      {/* What if compromised */}
      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold tracking-tight">{messages.compromised.title}</h2>
        <p className="text-sm text-muted-foreground">
          {messages.compromised.description}
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {messages.compromised.steps.map((step, index) => (
            <li key={index}>
              <span className="text-foreground/80">{step.highlight}</span> {step.text}
              {step.link && (
                <>
                  {" "}
                  <a
                    href={step.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {step.link.text}
                  </a>
                  .
                </>
              )}
            </li>
          ))}
        </ol>
      </Card>

      {/* Checklist */}
      <Card className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">{messages.checklist.title}</h2>
            <p className="text-sm text-muted-foreground">
              {messages.checklist.description}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {messages.checklist.resetButton}
          </Button>
        </div>

        <div className="space-y-3">
          {checklistItems.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <div key={item.id} className="flex items-start gap-3">
                <Checkbox checked={isChecked} onCheckedChange={() => toggle(item.id)} className="mt-0.5" />
                <div className="min-w-0">
                  <div className="text-sm text-foreground/90">{item.label}</div>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {linkHost(item.href)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-muted-foreground">
          {messages.checklist.tip}
        </div>
      </Card>
    </div>
  );
}
