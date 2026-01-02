/**
 * Glossary Page UI Messages - Ukrainian
 *
 * Переклад текстів для сторінки глосарія.
 * Дані термінів (визначення, аналогії тощо) беруться з jargon.ts/jargon.uk.ts
 */

export const glossaryUiMessagesUk = {
  hero: {
    title: "Глосарій",
    description:
      "Усі терміни, що використовуються в ACFS, пояснені простою мовою.",
    // Опис для головної сторінки глосарія
    topLevelDescription:
      "Шукайте та переглядайте визначення термінів простою мовою, які ви бачите в майстрі налаштування та навчальному центрі.",
    tip: "Порада: Багато",
    tipHighlight: "підкреслених пунктиром",
    tipSuffix: "термінів мають посилання сюди з підказки.",
  },

  search: {
    placeholder: "Пошук термінів...",
    searchTermsExample: "Пошук термінів (напр., SSH, tmux, API key)…",
  },

  categories: {
    all: "Усі",
    concepts: "Концепції",
    tools: "Інструменти",
    protocols: "Протоколи",
    acronyms: "Акроніми",
    // Категорії головної сторінки глосарія
    shell: "Оболонка",
    networking: "Мережі",
  },

  categoryDescriptions: {
    concepts: "Основні ідеї та ментальні моделі",
    tools: "Програми та CLI, які ви використовуватимете",
    protocols: "Як системи спілкуються між собою",
    acronyms: "Короткі слова, які ви бачитимете всюди",
  },

  termCard: {
    readMore: "Читати далі",
    showLess: "Згорнути",
    thinkOfItLike: "Уявіть це як...",
    whyItMatters: "Чому це важливо",
    relatedTerms: "Пов'язані терміни",
  },

  stats: {
    showing: "Показано",
    of: "з",
    terms: "термінів",
  },

  noResults: {
    title: "Терміни не знайдено",
    hint: "Спробуйте змінити пошуковий запит або фільтр категорії.",
    clearFilters: "Очистити фільтри",
  },

  navigation: {
    learningHub: "Навчальний центр",
    home: "Головна",
    setupWizard: "Майстер налаштування",
  },

  // Секції головної сторінки глосарія
  sections: {
    whatItMeans: "Що це означає",
    whyWeUseIt: "Чому ми це використовуємо",
    thinkOfItLike: "Уявіть це як…",
    relatedTerms: "Пов'язані терміни",
  },

  // Посилання «Дізнатися більше»
  learnMore: {
    sshBasics: "Дізнатися: Основи SSH",
    generateSshKey: "Майстер: Створення SSH ключа",
    rentVps: "Майстер: Оренда VPS",
    tmuxBasics: "Дізнатися: Основи tmux",
    ntmCore: "Дізнатися: Командний центр NTM",
    flywheelLoop: "Дізнатися: Цикл flywheel",
    agentCommands: "Дізнатися: Команди агентів",
  },
};
