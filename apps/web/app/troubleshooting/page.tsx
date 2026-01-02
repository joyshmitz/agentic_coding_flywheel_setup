"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  Lightbulb,
  Search,
  Terminal,
  Wifi,
  Key,
  HardDrive,
  RefreshCw,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { CommandCard } from "@/components/command-card";
import { useLocale, getTroubleshootingMessages } from "@/lib/i18n";

type TroubleshootingCategory = "all" | "ssh" | "installation" | "agents" | "network";

interface TroubleshootingIssue {
  id: string;
  title: string;
  category: Exclude<TroubleshootingCategory, "all">;
  symptoms: string[];
  causes: string[];
  solutions: Array<{
    title: string;
    steps: string[];
    command?: string;
  }>;
  prevention?: string;
  searchable: string;
}

type CategoryMeta = { label: string; icon: React.ReactNode; color: string };

function getCategoryMeta(categories: { ssh: string; installation: string; agents: string; network: string }): Record<Exclude<TroubleshootingCategory, "all">, CategoryMeta> {
  return {
    ssh: { label: categories.ssh, icon: <Key className="h-4 w-4" />, color: "oklch(0.75 0.18 195)" },
    installation: { label: categories.installation, icon: <HardDrive className="h-4 w-4" />, color: "oklch(0.78 0.16 75)" },
    agents: { label: categories.agents, icon: <Terminal className="h-4 w-4" />, color: "oklch(0.7 0.2 330)" },
    network: { label: categories.network, icon: <Wifi className="h-4 w-4" />, color: "oklch(0.72 0.19 145)" },
  };
}

// Build searchable index from issues
function buildSearchableIssues(issues: Omit<TroubleshootingIssue, "searchable">[]): TroubleshootingIssue[] {
  return issues.map((issue) => ({
    ...issue,
    searchable: [
      issue.title,
      ...issue.symptoms,
      ...issue.causes,
      ...issue.solutions.flatMap((s) => [s.title, ...s.steps]),
    ]
      .join(" ")
      .toLowerCase(),
  }));
}

interface IssueCardProps {
  issue: TroubleshootingIssue;
  isOpen: boolean;
  onToggle: () => void;
  categoryMeta: CategoryMeta;
  sectionLabels: { symptoms: string; causes: string; solutions: string; prevention: string };
}

function IssueCard({ issue, isOpen, onToggle, categoryMeta, sectionLabels }: IssueCardProps) {
  return (
    <Card
      id={issue.id}
      className="border-border/50 bg-card/60 overflow-hidden scroll-mt-24"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/10"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              style={{
                borderColor: `${categoryMeta.color}40`,
                backgroundColor: `${categoryMeta.color}10`,
                color: categoryMeta.color,
              }}
            >
              {categoryMeta.icon}
              {categoryMeta.label}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">{issue.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {issue.symptoms[0]}
          </p>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-border/40 p-5 space-y-6">
          {/* Symptoms */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {sectionLabels.symptoms}
            </h3>
            <ul className="space-y-1.5">
              {issue.symptoms.map((symptom, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <code className="font-mono text-xs bg-muted/50 px-1.5 py-0.5 rounded">
                    {symptom}
                  </code>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              {sectionLabels.causes}
            </h3>
            <ul className="space-y-1.5">
              {issue.causes.map((cause, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {sectionLabels.solutions}
            </h3>
            <div className="space-y-4">
              {issue.solutions.map((solution, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
                >
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white font-bold">
                      {i + 1}
                    </span>
                    {solution.title}
                  </h4>
                  <ul className="space-y-1 mb-3">
                    {solution.steps.map((step, j) => (
                      <li key={j} className="text-sm text-muted-foreground pl-7">
                        {step}
                      </li>
                    ))}
                  </ul>
                  {solution.command && (
                    <div className="pl-7">
                      <CommandCard command={solution.command} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prevention */}
          {issue.prevention && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {sectionLabels.prevention}
              </h3>
              <p className="text-sm text-foreground">{issue.prevention}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function TroubleshootingPage() {
  const { locale } = useLocale();
  const messages = getTroubleshootingMessages(locale);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<TroubleshootingCategory>("all");
  const [openIssueId, setOpenIssueId] = useState<string | null>(null);

  // Build category meta with localized labels
  const categoryMeta = useMemo(
    () => getCategoryMeta(messages.categories),
    [messages.categories]
  );

  // Build searchable issues from localized messages
  const issuesWithSearch = useMemo(
    () => buildSearchableIssues(messages.issues as Omit<TroubleshootingIssue, "searchable">[]),
    [messages.issues]
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredIssues = useMemo(() => {
    return issuesWithSearch.filter((issue) => {
      if (category !== "all" && issue.category !== category) {
        return false;
      }
      if (!normalizedQuery) return true;
      return issue.searchable.includes(normalizedQuery);
    });
  }, [category, normalizedQuery, issuesWithSearch]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-cosmic opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-4xl px-6 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">{messages.navigation.home}</span>
          </Link>
          <Link
            href="/wizard/os-selection"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Terminal className="h-4 w-4" />
            <span className="text-sm">{messages.navigation.setupWizard}</span>
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 shadow-lg shadow-amber-500/20">
              <RefreshCw className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {messages.title}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            {messages.description}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={messages.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-card/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Category filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              category === "all"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            {messages.categories.all}
          </button>
          {(Object.keys(categoryMeta) as Array<Exclude<TroubleshootingCategory, "all">>).map((cat) => {
            const meta = categoryMeta[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors inline-flex items-center gap-1.5 ${
                  category === cat
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {meta.icon}
                {meta.label}
              </button>
            );
          })}
        </div>

        <p className="mb-8 text-sm text-muted-foreground">
          {messages.resultsText.showing}{" "}
          <span className="font-mono text-foreground">{filteredIssues.length}</span>{" "}
          {messages.resultsText.of}{" "}
          <span className="font-mono text-foreground">{issuesWithSearch.length}</span>{" "}
          {messages.resultsText.issues}.
        </p>

        {/* Issues */}
        <div className="space-y-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                isOpen={openIssueId === issue.id}
                onToggle={() => setOpenIssueId(openIssueId === issue.id ? null : issue.id)}
                categoryMeta={categoryMeta[issue.category]}
                sectionLabels={messages.sections}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-4">
                {messages.noResults.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {messages.noResults.suggestion}{" "}
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setCategory("all"); }}
                  className="text-primary hover:underline"
                >
                  {messages.noResults.clearFilters}
                </button>
                .
              </p>
            </div>
          )}
        </div>

        {/* Help section */}
        <Card className="mt-12 border-primary/20 bg-primary/5 p-6">
          <h2 className="text-lg font-semibold mb-3">{messages.helpSection.title}</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              {messages.helpSection.intro}
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  {messages.helpSection.glossary.text}{" "}
                  <Link href="/glossary" className="text-primary hover:underline">
                    {messages.helpSection.glossary.link}
                  </Link>{" "}
                  {messages.helpSection.glossary.suffix}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  {messages.helpSection.github.text}{" "}
                  <a
                    href="https://github.com/Dicklesworthstone/agentic_coding_flywheel_setup/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {messages.helpSection.github.link}
                  </a>{" "}
                  {messages.helpSection.github.suffix}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  {messages.helpSection.learn.text}{" "}
                  <Link href="/learn" className="text-primary hover:underline">
                    {messages.helpSection.learn.link}
                  </Link>{" "}
                  {messages.helpSection.learn.suffix}
                </span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
