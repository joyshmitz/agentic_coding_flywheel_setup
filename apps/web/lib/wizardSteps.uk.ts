/**
 * Wizard Steps - Ukrainian
 *
 * Ukrainian translations for wizard step titles and descriptions.
 * Logic and hooks remain in wizardSteps.ts.
 */

import type { WizardStep } from "./wizardSteps";

export type WizardStepTranslation = Pick<WizardStep, "id" | "title" | "description">;

export const WIZARD_STEPS_UK: WizardStepTranslation[] = [
  {
    id: 1,
    title: "Оберіть ОС",
    description: "Виберіть чи ви використовуєте Mac, Windows чи Linux",
  },
  {
    id: 2,
    title: "Встановіть термінал",
    description: "Налаштуйте відповідний термінальний додаток",
  },
  {
    id: 3,
    title: "Створіть SSH ключ",
    description: "Створіть пару SSH ключів для безпечного доступу до VPS",
  },
  {
    id: 4,
    title: "Орендуйте VPS",
    description: "Оберіть та зареєструйтесь у провайдера VPS",
  },
  {
    id: 5,
    title: "Створіть VPS",
    description: "Запустіть VPS з паролем для автентифікації",
  },
  {
    id: 6,
    title: "Підключіться до VPS",
    description: "Підключіться до VPS вперше через SSH",
  },
  {
    id: 7,
    title: "Налаштуйте акаунти",
    description: "Створіть акаунти для сервісів які використовуватимете",
  },
  {
    id: 8,
    title: "Перевірка готовності",
    description: "Переконайтесь що VPS готовий перед встановленням",
  },
  {
    id: 9,
    title: "Запустіть інсталятор",
    description: "Вставте та виконайте one-liner для встановлення всього",
  },
  {
    id: 10,
    title: "Переключіться на Ubuntu",
    description: "Перейдіть з root на користувача ubuntu",
  },
  {
    id: 11,
    title: "Перевірте SSH ключ",
    description: "Переконайтесь що підключення через SSH ключ працює",
  },
  {
    id: 12,
    title: "Перевірка статусу",
    description: "Переконайтесь що все встановлено коректно",
  },
  {
    id: 13,
    title: "Запустіть онбординг",
    description: "Почніть інтерактивний туторіал",
  },
];

/**
 * Get translated wizard step by ID
 */
export function getWizardStepTranslation(
  id: number
): WizardStepTranslation | undefined {
  return WIZARD_STEPS_UK.find((step) => step.id === id);
}
