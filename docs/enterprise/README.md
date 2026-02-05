# ACFS Enterprise Documentation

Документація системи ACFS з точки зору підприємства: інструменти, ролі, процеси, інтеграції з ERP.

## Структура документації

| # | Файл | Питання | Опис |
|---|------|---------|------|
| 00 | [00-system-overview.md](./00-system-overview.md) | **Навіщо?** | Бізнес-цикл, ролі, система |
| 01 | [01-tools-overview.md](./01-tools-overview.md) | **Що?** | Категорії інструментів |
| 02a | [02a-tools-ai-agents.md](./02a-tools-ai-agents.md) | **Як саме?** | AI agents + координація |
| 02b | [02b-tools-acfs-stack.md](./02b-tools-acfs-stack.md) | **Як саме?** | Safety, tasks, analysis, build |
| 02c | [02c-tools-infrastructure.md](./02c-tools-infrastructure.md) | **Як саме?** | Runtimes, CLI, cloud, utilities |
| 03 | [03-tool-integrations.md](./03-tool-integrations.md) | **Як взаємодіють?** | Архітектура, MCP, інтеграції |
| 04 | [04-workflows.md](./04-workflows.md) | **Як працювати?** | Щоденні процеси |
| 05 | [05-candidate-requirements.md](./05-candidate-requirements.md) | **Хто?** | Ролі, навички, рівні |
| 06 | [06-hr-guide.md](./06-hr-guide.md) | **Як наймати?** | Профілі, інтерв'ю, онбординг |
| 07 | [07-pm-guide.md](./07-pm-guide.md) | **Як керувати?** | PM guide, капелюхи, координація |

**Підтримка:** [MAINTENANCE.md](./MAINTENANCE.md) — як оновлювати ці документи.

## Маршрути за ролями

| Роль | Рекомендований маршрут |
|------|------------------------|
| **Developer** | [01](./01-tools-overview.md) → [02a](./02a-tools-ai-agents.md) → [04](./04-workflows.md) → [03](./03-tool-integrations.md) |
| **PM** | [00](./00-system-overview.md) → [02b](./02b-tools-acfs-stack.md) (beads, Agent Mail) → [04](./04-workflows.md) → [07](./07-pm-guide.md) |
| **DevOps** | [02c](./02c-tools-infrastructure.md) → [02b](./02b-tools-acfs-stack.md) (safety) → [04](./04-workflows.md) |
| **HR** | [05](./05-candidate-requirements.md) → [06](./06-hr-guide.md) → [01](./01-tools-overview.md) |
| **Operations** | [00](./00-system-overview.md) → [02b](./02b-tools-acfs-stack.md) (caut, CAAM) |

## Про ACFS

ACFS (Agentic Coding Flywheel Setup) — це система, яка трансформує свіжий Ubuntu VPS у повністю налаштоване AI-powered середовище розробки за 30 хвилин.

**Веб-сайт:** [agent-flywheel.com](https://agent-flywheel.com)

---

*Версія документації: 2.0.0*
*Останнє оновлення: 2026-02-05*
