"use client";

/**
 * VPSComparison — Side-by-side provider comparison table for the wizard.
 *
 * Shows key specs (RAM, vCPU, storage, price) for recommended and budget
 * plans across providers. Responsive: table on desktop, stacked cards on
 * mobile.
 *
 * @see bd-w8fx
 */

import { useState } from "react";
import { ExternalLink, Star, Clock } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";
import type { VPSProvider } from "@/lib/vpsProviders";
import { useLocale, getVpsProviders, getVpsComparisonMessages, getPricingLastUpdated } from "@/lib/i18n";

type PlanTier = "recommended" | "budget";

function formatPrice(usd: number): string {
  return `$${usd}/mo`;
}

type VpsComparisonMessages = ReturnType<typeof getVpsComparisonMessages>;

function ProviderMobileCard({
  provider,
  tier,
  messages,
}: {
  provider: VPSProvider;
  tier: PlanTier;
  messages: VpsComparisonMessages;
}) {
  const plan = provider[tier];
  return (
    <div
      className={cn(
        "rounded-xl border p-4 space-y-3",
        provider.isTopPick
          ? "border-primary/30 bg-primary/5"
          : "border-border/50 bg-card/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{provider.name}</span>
          {provider.isTopPick && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              <Star className="h-3 w-3" />
              {messages.topPick}
            </span>
          )}
        </div>
        <span className="text-lg font-bold text-foreground">
          {formatPrice(plan.priceUSD)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">{messages.headers.plan}:</span>{" "}
          <span className="font-medium text-foreground">{plan.name}</span>
        </div>
        <div>
          <span className="text-muted-foreground">{messages.headers.ram}:</span>{" "}
          <span className="font-medium text-foreground">{plan.ramGB}GB</span>
        </div>
        <div>
          <span className="text-muted-foreground">{messages.headers.vCpu}:</span>{" "}
          <span className="font-medium text-foreground">{plan.vCPU}</span>
        </div>
        <div>
          <span className="text-muted-foreground">{messages.headers.storage}:</span>{" "}
          <span className="font-medium text-foreground">{plan.storageGB}GB</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/30 pt-2 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {provider.activationTime}
        </div>
        <TrackedLink
          href={provider.url}
          trackingId={`vps-compare-${provider.id}`}
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {messages.visitSite}
          <ExternalLink className="h-3.5 w-3.5" />
        </TrackedLink>
      </div>

      {provider.note && (
        <p className="text-xs text-muted-foreground">{provider.note}</p>
      )}
    </div>
  );
}

export function VPSComparison() {
  const [tier, setTier] = useState<PlanTier>("recommended");
  const { locale } = useLocale();
  const providers = getVpsProviders(locale);
  const messages = getVpsComparisonMessages(locale);
  const pricingDate = getPricingLastUpdated(locale);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">
          {messages.title}
        </h2>
        {/* Tier toggle */}
        <div className="flex rounded-lg border border-border/50 bg-muted/30 p-0.5 text-sm">
          <button
            type="button"
            onClick={() => setTier("recommended")}
            className={cn(
              "rounded-md px-3 py-1 font-medium transition-colors",
              tier === "recommended"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            64 GB
          </button>
          <button
            type="button"
            onClick={() => setTier("budget")}
            className={cn(
              "rounded-md px-3 py-1 font-medium transition-colors",
              tier === "budget"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            48 GB
          </button>
        </div>
      </div>

      {/* Desktop table — hidden on mobile */}
      <div className="hidden overflow-hidden rounded-xl border border-border/50 sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                {messages.headers.provider}
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                {messages.headers.plan}
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                {messages.headers.ram}
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                {messages.headers.vCpu}
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                {messages.headers.storage}
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                {messages.headers.price}
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                {messages.headers.activation}
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                {messages.headers.link}
              </th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider, i) => {
              const plan = provider[tier];
              return (
                <tr
                  key={provider.id}
                  className={cn(
                    "border-b border-border/30 last:border-0 transition-colors",
                    provider.isTopPick
                      ? "bg-primary/5"
                      : i % 2 === 1
                        ? "bg-muted/10"
                        : ""
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {provider.name}
                      </span>
                      {provider.isTopPick && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">
                          <Star className="h-2.5 w-2.5" />
                          {messages.topPick}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {provider.bestFor}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-foreground">{plan.name}</td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    {plan.ramGB}GB
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    {plan.vCPU}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    {plan.storageGB}GB
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                    {formatPrice(plan.priceUSD)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {provider.activationTime}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <TrackedLink
                      href={provider.url}
                      trackingId={`vps-table-${provider.id}`}
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {messages.visit}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </TrackedLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards — hidden on desktop */}
      <div className="space-y-3 sm:hidden">
        {providers.map((provider) => (
          <ProviderMobileCard
            key={provider.id}
            provider={provider}
            tier={tier}
            messages={messages}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground">
        {messages.footer.noCommitment}{" "}
        {messages.footer.lastUpdated} {pricingDate}. {messages.footer.discounts}
      </p>
    </div>
  );
}
