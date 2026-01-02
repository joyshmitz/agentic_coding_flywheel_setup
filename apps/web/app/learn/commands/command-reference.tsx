"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Terminal } from "lucide-react";
import { CommandRefCard } from "@/components/command-ref-card";
import { useLocale, getCommandReferenceMessages, getCommands, getCommandCategories } from "@/lib/i18n";
import type { CommandCategory } from "@/lib/commands";

type CategoryFilter = "all" | CommandCategory;

export function CommandReference() {
  const { locale } = useLocale();
  const messages = getCommandReferenceMessages(locale);
  const commands = getCommands(locale);
  const commandCategories = getCommandCategories(locale);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const categoryFilters: Array<{ id: CategoryFilter; label: string }> = useMemo(
    () => [
      { id: "all", label: messages.filters.all },
      ...commandCategories.map((cat) => ({
        id: cat.id,
        label: cat.label,
      })),
    ],
    [commandCategories, messages.filters.all]
  );

  const getCategoryLabel = (cat: CommandCategory): string => {
    return commandCategories.find((item) => item.id === cat)?.label ?? cat;
  };

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return commands.filter((command) => {
      if (category !== "all" && command.category !== category) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        command.name,
        command.fullName,
        command.description,
        command.example,
        ...(command.aliases ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [category, query, commands]);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-gradient-cosmic opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:px-12 md:py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/learn"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">{messages.nav.learningHub}</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            <span className="text-sm">{messages.nav.home}</span>
          </Link>
        </div>

        <div className="mb-10 space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/20">
            <Terminal className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {messages.header.title}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            {messages.header.description}
          </p>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={messages.search.placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-border/60 bg-card/50 py-3 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCategory(filter.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  category === filter.id
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {messages.results.showing} {filteredCommands.length} {messages.results.of} {commands.length} {messages.results.commands}
          </span>
          {category !== "all" ? (
            <span>{messages.results.category} {getCategoryLabel(category)}</span>
          ) : null}
        </div>

        <div className="grid gap-5">
          {filteredCommands.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-10 text-center text-sm text-muted-foreground">
              {messages.empty.message}
            </div>
          ) : (
            filteredCommands.map((command) => (
              <CommandRefCard
                key={command.name}
                command={command}
                categoryLabel={getCategoryLabel(command.category)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
