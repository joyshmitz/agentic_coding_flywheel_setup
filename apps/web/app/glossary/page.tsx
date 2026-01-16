"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { BookOpen, ChevronDown, ChevronRight, Home, Search, Terminal, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, getGlossaryUiMessages, getJargonDictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

// TanStack imports for the new implementation
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  createColumnHelper,
  flexRender,
  Row,
  ExpandedState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

type GlossaryCategory = "all" | "shell" | "networking" | "tools" | "concepts";

const CATEGORY_ORDER: GlossaryCategory[] = [
  "all",
  "networking", 
  "shell",
  "tools",
  "concepts",
];

type LearnMoreLink = {
  href: string;
  labelKey: keyof ReturnType<typeof getGlossaryUiMessages>["learnMore"];
};

const LEARN_MORE_MAP: Partial<Record<string, LearnMoreLink>> = {
  ssh: { href: "/learn/ssh-basics", labelKey: "sshBasics" },
  "ssh-key": { href: "/wizard/generate-ssh-key", labelKey: "generateSshKey" },
  vps: { href: "/wizard/rent-vps", labelKey: "rentVps" },
  tmux: { href: "/learn/tmux-basics", labelKey: "tmuxBasics" },
  ntm: { href: "/learn/ntm-core", labelKey: "ntmCore" },
  "agent-mail": { href: "/learn/flywheel-loop", labelKey: "flywheelLoop" },
  beads: { href: "/learn/flywheel-loop", labelKey: "flywheelLoop" },
  codex: { href: "/learn/agent-commands", labelKey: "agentCommands" },
  "claude-code": { href: "/learn/agent-commands", labelKey: "agentCommands" },
  "gemini-cli": { href: "/learn/agent-commands", labelKey: "agentCommands" },
};

type GlossaryEntry = {
  key: string;
  category: Exclude<GlossaryCategory, "all">;
  term: string;
  short: string;
  long: string;
  analogy?: string;
  why?: string;
  related?: string[];
  learnMoreKey?: string;
  searchable: string;
};

const columnHelper = createColumnHelper<GlossaryEntry>();

export default function GlossaryPage() {
  const { locale } = useLocale();
  const messages = getGlossaryUiMessages(locale);
  const localizedJargon = getJargonDictionary(locale);
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [category, setCategory] = useState<GlossaryCategory>("all");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  
  const parentRef = useRef<HTMLDivElement>(null);

  // Build entries with searchable strings for filtering
  const entries = useMemo(() => {
    const all: GlossaryEntry[] = [];

    Object.entries(localizedJargon).forEach(([key, term]) => {
      const categoryMap = {
        vcpu: "networking", ram: "networking", nvme: "networking", vps: "networking",
        ssh: "networking", "ssh-key": "networking", sftp: "networking",
        "port-forwarding": "networking", vpn: "networking", firewall: "networking",
        domain: "networking", subdomain: "networking", dns: "networking",
        "cloud-server": "networking", tailscale: "networking", wireguard: "networking",
        shell: "shell", bash: "shell", zsh: "shell", terminal: "shell",
        cli: "shell", gui: "shell", tui: "shell", repl: "shell",
        stdin: "shell", stdout: "shell", stderr: "shell", pipe: "shell",
        redirect: "shell", glob: "shell", regex: "shell", grep: "shell",
        "exit-code": "shell", sudo: "shell", chmod: "shell", chown: "shell",
        symlink: "shell", hardlink: "shell", inode: "shell", filesystem: "shell",
        mount: "shell", umount: "shell", fstab: "shell",
        git: "tools", github: "tools", "version-control": "tools",
        commit: "tools", branch: "tools", merge: "tools", rebase: "tools",
        "pull-request": "tools", fork: "tools", clone: "tools", pull: "tools",
        push: "tools", remote: "tools", origin: "tools", upstream: "tools",
        dockerfile: "tools", "docker-image": "tools", container: "tools",
        kubernetes: "tools", k8s: "tools", helm: "tools", kubectl: "tools",
        api: "concepts", rest: "concepts", http: "concepts", https: "concepts",
        json: "concepts", yaml: "concepts", xml: "concepts", csv: "concepts",
        database: "concepts", sql: "concepts", nosql: "concepts",
        "ai-agents": "concepts", "claude-code": "concepts", codex: "concepts",
        "gemini-cli": "concepts", cursor: "concepts", "prompt-engineering": "concepts",
        "context-window": "concepts", "token-limit": "concepts", temperature: "concepts",
        "system-prompt": "concepts", "few-shot": "concepts", "chain-of-thought": "concepts",
        "open-source": "concepts", mit: "concepts", gpl: "concepts", apache: "concepts",
        "self-hosted": "concepts", saas: "concepts", paas: "concepts", iaas: "concepts",
      };

      const category = (categoryMap[key as keyof typeof categoryMap] || "concepts") as Exclude<GlossaryCategory, "all">;
      
      const searchable = `${term.term} ${term.short} ${term.long} ${term.analogy || ""} ${term.why || ""} ${(term.related || []).join(" ")}`.toLowerCase();

      all.push({
        key,
        category,
        term: term.term,
        short: term.short,
        long: term.long,
        analogy: term.analogy,
        why: term.why,
        related: term.related,
        learnMoreKey: LEARN_MORE_MAP[key]?.labelKey,
        searchable,
      });
    });

    all.sort((a, b) =>
      a.term.localeCompare(b.term, undefined, { sensitivity: "base" })
    );

    return all;
  }, [localizedJargon]);

  // React Table columns definition
  const columns = [
    columnHelper.accessor("term", {
      header: "Term",
      cell: ({ getValue, row }) => {
        const entry = row.original;
        const isExpanded = row.getIsExpanded();
        
        return (
          <div className="w-full">
            {/* Term header row */}
            <div 
              className="flex cursor-pointer items-start justify-between gap-4 p-4 transition-colors hover:bg-muted/20"
              onClick={() => row.toggleExpanded()}
              id={entry.key}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {getValue()}
                  </h3>
                  <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground">
                    #{entry.key}
                  </span>
                  <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground">
                    {messages.categories[entry.category]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.short}
                </p>
              </div>
              {isExpanded ? (
                <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </div>
            
            {/* Expanded content */}
            {isExpanded && (
              <div className="space-y-4 border-t border-border/40 p-5">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-foreground">
                    {messages.sections.whatItMeans}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.long}
                  </p>
                </div>

                {entry.analogy && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">
                      {messages.sections.thinkOfItLike}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {entry.analogy}
                    </p>
                  </div>
                )}

                {entry.why && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">
                      {messages.sections.whyWeUseIt}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {entry.why}
                    </p>
                  </div>
                )}

                {entry.related && entry.related.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">
                      {messages.sections.relatedTerms}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {entry.related.map((relatedKey) => (
                        <a
                          key={relatedKey}
                          href={`#${relatedKey}`}
                          className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary transition-colors hover:bg-primary/10"
                        >
                          {localizedJargon[relatedKey]?.term || relatedKey}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {entry.learnMoreKey && LEARN_MORE_MAP[entry.key] && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">
                      Learn More
                    </h4>
                    <Link
                      href={LEARN_MORE_MAP[entry.key]?.href || "#"}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <BookOpen className="h-4 w-4" />
                      {messages.learnMore[entry.learnMoreKey as keyof typeof messages.learnMore] || "Learn more"}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      },
    }),
  ];

  // Category filtering logic
  const filteredData = useMemo(() => {
    return entries.filter((entry) => {
      if (category !== "all" && entry.category !== category) {
        return false;
      }
      return true;
    });
  }, [entries, category]);

  // React Table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      globalFilter,
      expanded,
    },
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    globalFilterFn: (row, columnId, filterValue) => {
      const entry = row.original;
      if (!filterValue) return true;
      return entry.searchable.includes(filterValue.toLowerCase());
    },
    getRowCanExpand: () => true,
  });

  // Virtualization
  const rowVirtualizer = useVirtualizer({
    count: table.getFilteredRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Base height estimate
    overscan: 5,
    getItemKey: (index) => table.getFilteredRowModel().rows[index]?.original.key || index,
  });

  const clearQuery = useCallback(() => {
    setGlobalFilter("");
    setCategory("all");
  }, []);

  // Hash-based deep linking (preserved functionality)
  useEffect(() => {
    const openFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;

      let key: string;
      try {
        key = decodeURIComponent(raw);
      } catch {
        return;
      }

      // Find the row and expand it
      const rowIndex = table.getFilteredRowModel().rows.findIndex(row => row.original.key === key);
      if (rowIndex >= 0) {
        setExpanded(prev => ({ ...(prev as Record<string, boolean>), [rowIndex]: true }));
        
        // Scroll to the element
        setTimeout(() => {
          const target = document.getElementById(key);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [table]);

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-6">
      <div className="mb-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{messages.hero.title}</span>
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Title and description */}
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Terminal className="h-8 w-8 text-primary" />
            {messages.hero.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {messages.hero.description}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <Card className="mb-6 border-border/50 bg-card/60 p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={messages.search.placeholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full rounded-lg border border-border/60 bg-background pl-10 pr-10 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {globalFilter && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-muted"
                onClick={() => setGlobalFilter("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
                className={cn(
                  "h-8 transition-colors",
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {messages.categories[cat]}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="text-xs text-muted-foreground">
            {messages.stats.showing} <span className="font-medium text-foreground">{table.getFilteredRowModel().rows.length}</span>{" "}
            {messages.stats.of}{" "}
            <span className="font-medium text-foreground">{entries.length}</span>{" "}
            {messages.stats.terms}
          </div>
        </div>
      </Card>

      {/* Results with virtual scrolling */}
      <div 
        ref={parentRef}
        className="h-[600px] overflow-auto space-y-3"
        style={{ contain: "strict" }}
      >
        {table.getFilteredRowModel().rows.length === 0 ? (
          <Card className="border-border/50 bg-card/60 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {messages.noResults.title}.{" "}
              <button
                type="button"
                onClick={clearQuery}
                className="text-primary hover:underline"
              >
                {messages.noResults.clearFilters}
              </button>
            </p>
          </Card>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getFilteredRowModel().rows[virtualRow.index] as Row<GlossaryEntry>;
              return (
                <div
                  key={row.original.key}
                  className="absolute w-full"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/60">
                    {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
