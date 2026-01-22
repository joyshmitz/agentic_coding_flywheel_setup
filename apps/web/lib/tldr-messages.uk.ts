/**
 * TLDR Messages - Ukrainian
 * Contains only Ukrainian translations
 * Part of i18n architecture standardization
 */

export const getTldrMessagesUk = () => {
  return {
    hero: {
      badge: {
        text: "Open Source Екосистема",
      },
      scrollIndicator: {
        text: "Прокрутіть, щоб дослідити",
      },
    },
    footerCta: {
      title: "Почати",
      description: "Найшвидший спосіб налаштувати всю екосистему flywheel - це ACFS. Одна команда, 30 хвилин, і ви готові до роботи.",
      copied: "Скопійовано!",
      copyButtonLabel: {
        default: "Копіювати до clipboard",
        copied: "Скопійовано!",
      },
      wizardLinkText: "покроковий майстер",
      wizardDescription: "для керованого налаштування.",
    },
    flywheelExplanation: {
      title: "Чому Flywheel?",
    },
    toolGrid: {
      search: {
        placeholder: "Шукати інструменти...",
        ariaLabel: "Шукати flywheel інструменти",
        clearAriaLabel: "Очистити пошук",
        clearButtonText: "Очистити пошук",
        noResultsMessage: "Жодні інструменти не відповідають вашому пошуку",
        showingText: "Показано",
        ofText: "з",
        toolsText: "інструментів",
      },
      emptyState: {
        noMatchHeading: (query: string) => `Жодні інструменти не відповідають "${query}"`,
        suggestions: 'Спробуйте шукати "session", "memory" або "search"',
      },
      sections: {
        coreTools: {
          title: "Основні Інструменти Flywheel",
          description: "Хребет багатоагентної розробки: управління сесіями, комунікація, відстеження завдань, статичний аналіз, пам'ять, пошук, безпечні охоронці, багаторепозиторна синхронізація та автоматизоване налаштування. Ці інструменти формують саморефорсуючий цикл, де кожен робить інші потужнішими.",
        },
        supportingTools: {
          title: "Допоміжні Інструменти",
          description: "Розширюють екосистему синхронізацією GitHub issues, пошуком архівів та утилітами створення промптів. Ці інструменти покращують основний flywheel для спеціалізованих workflow.",
        },
      },
      coreToolsHeading: "Основні Інструменти",
      supportingToolsHeading: "Допоміжні Інструменти",
      starsSuffix: "зірок",
      whatItDoes: "Що це робить",
      whyUseful: "Чому корисно",
      keyFeatures: "Ключові Функції",
      techStack: "Технологічний Стек",
      useCases: "Випадки Використання",
      synergies: "Синергії",
      implementationHighlights: "Особливості Реалізації",
      viewOnGithub: "Переглянути на GitHub",
    },
    categories: {
      core: "основні",
      supporting: "допоміжні",
    },
    synergyDiagram: {
      title: "Синергії Інструментів",
      description: "Кожен інструмент підсилює інші, створюючи ефект flywheel",
    },
  };
};

export type TldrMessagesUk = ReturnType<typeof getTldrMessagesUk>;