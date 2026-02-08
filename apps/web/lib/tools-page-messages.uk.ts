/**
 * Tools Page Messages - Ukrainian
 *
 * Українські переклади для сторінки /tools.
 */

export const toolsPageMessagesUk = {
  search: {
    placeholder: "Пошук інструментів...",
    ariaLabel: "Пошук інструментів",
    clear: "Очистити пошук",
  },

  hero: {
    title: "Статус інструментів ACFS",
    description: (count: number) =>
      `Усі ${count} інструментів, встановлених Agentic Coding Flywheel Setup. Шукайте, фільтруйте та досліджуйте повний набір.`,
  },

  stats: {
    showing: "Показано",
    of: "з",
    tools: "інструментів",
  },

  categories: {
    all: "Усі",
    flywheelStack: "Flywheel Stack",
    utilities: "Утиліти",
    other: "Інше",
  },

  card: {
    viewOnGithub: (name: string) => `Переглянути ${name} на GitHub`,
    moreFeatures: (count: number) => `+${count} ще`,
    builtWith: "Створено з:",
  },

  empty: {
    title: "Інструментів не знайдено",
    description: "Спробуйте змінити параметри пошуку або фільтрації.",
    clearFilters: "Очистити фільтри",
  },
};
