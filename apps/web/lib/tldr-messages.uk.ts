export const getTldrMessages = (locale: string) => {
  const isUkrainian = locale === "uk";

  return {
    hero: {
      badge: {
        text: isUkrainian ? "Open Source Екосистема" : "Open Source Ecosystem",
      },
      scrollIndicator: {
        text: isUkrainian ? "Прокрутіть, щоб дослідити" : "Scroll to explore",
      },
    },
    footerCta: {
      title: isUkrainian ? "Почати" : "Get Started",
      description: isUkrainian
        ? "Найшвидший спосіб налаштувати всю екосистему flywheel - це ACFS. Одна команда, 30 хвилин, і ви готові до роботи."
        : "The fastest way to set up the entire flywheel ecosystem is with ACFS. One command, 30 minutes, and you're ready to go.",
      copied: isUkrainian ? "Скопійовано!" : "Copied!",
      copyButtonLabel: {
        default: isUkrainian ? "Копіювати до clipboard" : "Copy to clipboard",
        copied: isUkrainian ? "Скопійовано!" : "Copied!",
      },
      wizardLinkText: isUkrainian ? "покроковий майстер" : "step-by-step wizard",
      wizardDescription: isUkrainian ? "для керованого налаштування." : "for guided setup.",
    },
    flywheelExplanation: {
      title: isUkrainian ? "Чому Flywheel?" : "Why a Flywheel?",
    },
    toolGrid: {
      search: {
        placeholder: isUkrainian ? "Шукати інструменти..." : "Search tools...",
        ariaLabel: isUkrainian ? "Шукати flywheel інструменти" : "Search flywheel tools",
        clearAriaLabel: isUkrainian ? "Очистити пошук" : "Clear search",
        clearButtonText: isUkrainian ? "Очистити пошук" : "Clear search",
        noResultsMessage: isUkrainian ? "Жодні інструменти не відповідають вашому пошуку" : "No tools match your search",
        showingText: isUkrainian ? "Показано" : "Showing",
        ofText: isUkrainian ? "з" : "of",
        toolsText: isUkrainian ? "інструментів" : "tools",
      },
      emptyState: {
        noMatchHeading: (query: string) => 
          isUkrainian 
            ? `Жодні інструменти не відповідають "${query}"` 
            : `No tools match "${query}"`,
        suggestions: isUkrainian 
          ? 'Спробуйте шукати "session", "memory" або "search"'
          : 'Try searching for "session", "memory", or "search"',
      },
      sections: {
        coreTools: {
          title: isUkrainian ? "Основні Інструменти Flywheel" : "Core Flywheel Tools",
          description: isUkrainian 
            ? "Хребет багатоагентної розробки: управління сесіями, комунікація, відстеження завдань, статичний аналіз, пам'ять, пошук, безпечні охоронці, багаторепозиторна синхронізація та автоматизоване налаштування. Ці інструменти формують саморефорсуючий цикл, де кожен робить інші потужнішими."
            : "The backbone of multi-agent development: session management, communication, task tracking, static analysis, memory, search, safety guards, multi-repo sync, and automated setup. These tools form a self-reinforcing loop where each makes the others more powerful.",
        },
        supportingTools: {
          title: isUkrainian ? "Допоміжні Інструменти" : "Supporting Tools",
          description: isUkrainian 
            ? "Розширюють екосистему синхронізацією GitHub issues, пошуком архівів та утилітами створення промптів. Ці інструменти покращують основний flywheel для спеціалізованих workflow."
            : "Extend the ecosystem with GitHub issue sync, archive search, and prompt crafting utilities. These tools enhance the core flywheel for specialized workflows.",
        },
      },
      coreToolsHeading: isUkrainian ? "Основні Інструменти" : "Core Tools",
      supportingToolsHeading: isUkrainian ? "Допоміжні Інструменти" : "Supporting Tools",
      starsSuffix: isUkrainian ? "зірок" : "stars",
      whatItDoes: isUkrainian ? "Що це робить" : "What it does",
      whyUseful: isUkrainian ? "Чому корисно" : "Why it's useful",
      keyFeatures: isUkrainian ? "Ключові Функції" : "Key Features",
      techStack: isUkrainian ? "Технологічний Стек" : "Tech Stack",
      useCases: isUkrainian ? "Випадки Використання" : "Use Cases",
      synergies: isUkrainian ? "Синергії" : "Synergies",
      implementationHighlights: isUkrainian ? "Особливості Реалізації" : "Implementation Highlights",
      viewOnGithub: isUkrainian ? "Переглянути на GitHub" : "View on GitHub",
    },
    categories: {
      core: isUkrainian ? "основні" : "core",
      supporting: isUkrainian ? "допоміжні" : "supporting",
    },
    synergyDiagram: {
      title: isUkrainian ? "Синергії Інструментів" : "Tool Synergies",
      description: isUkrainian
        ? "Кожен інструмент підсилює інші, створюючи ефект flywheel"
        : "Each tool amplifies the others, creating a flywheel effect",
    },
  };
};

export type TldrMessages = ReturnType<typeof getTldrMessages>;