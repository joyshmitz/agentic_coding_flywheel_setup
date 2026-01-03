/**
 * Flywheel Data - Ukrainian Translations
 *
 * Ukrainian translations for flywheel page data arrays.
 * Technical terms (CLI, API, JSON, MCP) and tool names stay in English.
 */

import type { WorkflowScenario, AgentPrompt, FlywheelTool } from "./flywheel";

// ============================================================
// WORKFLOW SCENARIOS - Ukrainian
// ============================================================

export const workflowScenariosUk: WorkflowScenario[] = [
  {
    id: "daily-parallel",
    title: "Щоденний паралельний прогрес",
    description:
      "Рухайте кілька проєктів одночасно, навіть коли не маєте ментальної пропускної здатності для всіх.",
    steps: [
      {
        tool: "ntm",
        action: "Запустіть агентів на 3 проєктах: `ntm spawn proj1 --cc=2 proj2 --cod=1 proj3 --gmi=1`",
        result: "6 агентів працюють паралельно на ваших машинах",
      },
      {
        tool: "bv",
        action: "Кожен агент запускає `bv --robot-triage` щоб знайти над чим працювати",
        result: "Агенти автономно обирають високопріоритетні незаблоковані задачі",
      },
      {
        tool: "mail",
        action: "Агенти координуються через mail-потоки коли їхня робота перетинається",
        result: "Жодних конфліктів файлів, чіткі сліди комунікації",
      },
      {
        tool: "cm",
        action: "Система пам'яті надає контекст з попередніх сесій",
        result: "Агенти не повторюють минулі помилки та не перевідкривають рішення",
      },
    ],
    outcome: "Поверніться через 3+ години і знайдіть неймовірний автономний прогрес по всіх проєктах",
    timeframe: "3+ години автономної роботи",
  },
  {
    id: "agent-review",
    title: "Агенти перевіряють агентів",
    description: "Нехай ваші агенти перевіряють роботу одне одного, щоб знаходити баги та помилки до того, як вони стануть проблемами.",
    steps: [
      {
        tool: "cass",
        action: "Агент шукає попередні сесії: `cass search 'authentication flow' --robot`",
        result: "Знаходить всю попередню роботу над темою від усіх агентів",
      },
      {
        tool: "ubs",
        action: "Bug scanner запускається: `ubs . --format=json`",
        result: "Статичний аналіз знаходить проблеми в 7 мовах",
      },
      {
        tool: "bv",
        action: "Створює beads для кожної проблеми: `bd create --title='Fix auth bug'`",
        result: "Проблеми відстежуються з залежностями та пріоритетами",
      },
      {
        tool: "slb",
        action: "Небезпечні виправлення вимагають затвердження: `slb run 'git reset --hard'`",
        result: "Правило двох осіб запобігає катастрофічним помилкам",
      },
    ],
    outcome: "Кілька агентів ловлять помилки одне одного до релізу",
    timeframe: "Безперервний цикл покращення",
  },
  {
    id: "massive-planning",
    title: "5,500 рядків → 347 Beads",
    description:
      "Перетворіть масивні документи планування на виконувані, залежнісно-відстежувані графи задач, через які агенти можуть систематично проходити.",
    steps: [
      {
        tool: "bv",
        action: "Створіть гранулярні beads зі структурою залежностей",
        result: "347 задач з чіткими блокуючими відносинами",
      },
      {
        tool: "mail",
        action: "Агенти беруть задачі та комунікують прогрес",
        result: "Координація без конфліктів",
      },
      {
        tool: "cass",
        action: "Пошук попереднього досвіду та існуючих рішень",
        result: "Повторне використання патернів, уникнення винаходження велосипеда",
      },
      {
        tool: "cm",
        action: "Зберігання успішних підходів як процедурної пам'яті",
        result: "Майбутні агенти вчаться на успіхах",
      },
    ],
    outcome: "Проєкт майже завершений того ж дня, агенти пушать коміти поки ви спите",
    timeframe: "~1 день для складної фічі",
  },
  {
    id: "fresh-eyes",
    title: "Code Review свіжим поглядом",
    description: "Нехай агенти глибоко досліджують код зі свіжим поглядом, знаходячи баги які люди пропускають.",
    steps: [
      {
        tool: "cass",
        action: "Агент досліджує кодову базу, трасуючи потоки виконання",
        result: "Глибоке розуміння як код насправді працює",
      },
      {
        tool: "ubs",
        action: "Статичний аналіз з 18 категоріями виявлення",
        result: "Знайдено null safety, async баги, проблеми безпеки",
      },
      {
        tool: "cm",
        action: "Крос-референс з пам'яттю минулих багів",
        result: "Розпізнавання патернів між проєктами",
      },
      {
        tool: "bv",
        action: "Критичні проблеми стають блокуючими beads",
        result: "Нічого не релізиться поки проблеми не вирішені",
      },
    ],
    outcome: "Систематичне, методичне виявлення та виправлення багів",
    timeframe: "Безперервно",
  },
];

// ============================================================
// AGENT PROMPTS - Ukrainian
// ============================================================

export const agentPromptsUk: AgentPrompt[] = [
  {
    id: "exploration",
    title: "Глибоке дослідження коду",
    category: "exploration",
    // Prompts stay in English - they are copy-pasted to agents
    prompt: `I want you to sort of randomly explore the code files in this project, choosing code files to deeply investigate and understand and trace their functionality and execution flows through the related code files which they import or which they are imported by. Once you understand the purpose of the code in the larger context of the workflows, I want you to do a super careful, methodical, and critical check with "fresh eyes" to find any obvious bugs, problems, errors, issues, silly mistakes, etc. and then systematically and meticulously and intelligently correct them.`,
    whenToUse: "Коли хочете щоб агенти знаходили приховані баги та глибоко розуміли кодову базу",
    bestWith: ["cass", "ubs", "bv"],
  },
  {
    id: "peer-review",
    title: "Peer Review агентів",
    category: "review",
    prompt: `Ok can you now turn your attention to reviewing the code written by your fellow agents and checking for any issues, bugs, errors, problems, inefficiencies, security problems, reliability issues, etc. and carefully diagnose their underlying root causes using first-principle analysis and then fix or revise them if necessary? Don't restrict yourself to the latest commits, cast a wider net and go super deep!`,
    whenToUse: "Після того як агенти працювали незалежно, нехай вони перевірять одне одного",
    bestWith: ["mail", "cass", "ubs"],
  },
  {
    id: "ux-polish",
    title: "Глибокий аналіз UX/UI",
    category: "improvement",
    prompt: `I want you to super carefully scrutinize every aspect of the application workflow and implementation and look for things that just seem sub-optimal or even wrong/mistaken to you, things that could very obviously be improved from a user-friendliness and intuitiveness standpoint, places where our UI/UX could be improved and polished to be slicker, more visually appealing, and more premium feeling and just ultra high-quality, like Stripe-level apps.`,
    whenToUse: "Коли незадоволені UX але не маєте енергії розбиратись з цим безпосередньо",
    bestWith: ["bv", "cm"],
  },
  {
    id: "beads-creation",
    title: "Комплексне планування Beads",
    category: "planning",
    prompt: `OK so please take ALL of that and elaborate on it more and then create a comprehensive and granular set of beads for all this with tasks, subtasks, and dependency structure overlaid, with detailed comments so that the whole thing is totally self-contained and self-documenting (including relevant background, reasoning/justification, considerations, etc.-- anything we'd want our "future self" to know about the goals and intentions and thought process and how it serves the over-arching goals of the project.)`,
    whenToUse: "Після генерації пропозицій покращень, перетворіть їх на дійсні задачі",
    bestWith: ["bv", "mail"],
  },
  {
    id: "beads-validation",
    title: "Валідація простору плану",
    category: "planning",
    prompt: `Check over each bead super carefully-- are you sure it makes sense? Is it optimal? Could we change anything to make the system work better for users? If so, revise the beads. It's a lot easier and faster to operate in "plan space" before we start implementing these things!`,
    whenToUse: "Перед виконанням великої партії beads, провалідуйте план",
    bestWith: ["bv"],
  },
  {
    id: "systematic-execution",
    title: "Систематичне виконання Beads",
    category: "execution",
    prompt: `OK, so start systematically and methodically and meticulously and diligently executing those remaining beads tasks that you created in the optimal logical order! Don't forget to mark beads as you work on them.`,
    whenToUse: "Після планування та валідації, виконуйте роботу",
    bestWith: ["bv", "mail", "slb"],
  },
  {
    id: "fresh-eyes-review",
    title: "Огляд після імплементації",
    category: "review",
    prompt: `Great, now I want you to carefully read over all of the new code you just wrote and other existing code you just modified with "fresh eyes" looking super carefully for any obvious bugs, errors, problems, issues, confusion, etc. Carefully fix anything you uncover.`,
    whenToUse: "Після партії імплементаційної роботи, перегляньте все",
    bestWith: ["ubs", "cass"],
  },
  {
    id: "smart-commit",
    title: "Інтелектуальне групування комітів",
    category: "execution",
    prompt: `Now, based on your knowledge of the project, commit all changed files now in a series of logically connected groupings with super detailed commit messages for each and then push. Take your time to do it right. Don't edit the code at all. Don't commit obviously ephemeral files.`,
    whenToUse: "Фінальний крок після завершення всієї роботи",
    bestWith: ["slb"],
  },
];

// ============================================================
// SYNERGY EXPLANATIONS - Ukrainian
// ============================================================

export const synergyExplanationsUk = [
  {
    tools: ["ntm", "mail", "bv"],
    title: "Основний цикл",
    description:
      "NTM запускає агентів, які реєструються в Mail для координації. Вони використовують BV для пошуку задач. Результат: автономні агенти, які самі визначають що робити далі без людського втручання.",
    multiplier: "10x",
    example:
      "Запустіть 6 агентів на 3 проєктах. Кожен знаходить роботу через BV, координується через Mail. Ви повертаєтесь через 3 години до змерджених PR.",
  },
  {
    tools: ["cass", "cm"],
    title: "Колективна пам'ять",
    description:
      "CASS індексує всі сесії агентів для миттєвого пошуку. CM зберігає навчання як процедурну пам'ять. Разом: агенти, які ніколи не повторюють помилок і завжди пам'ятають що працювало.",
    multiplier: "5x",
    example:
      "Новий агент питає 'як ми обробляли auth?' CASS знаходить відповідь за 60мс. CM показує плейбук, який спрацював.",
  },
  {
    tools: ["ubs", "slb"],
    title: "Захисна сітка",
    description:
      "UBS ловить баги до коміту. SLB запобігає запуску небезпечних команд без затвердження. Разом: агресивна автоматизація з захисними бар'єрами.",
    multiplier: "∞",
    example:
      "Агент знаходить баг, хоче `git reset --hard`. SLB вимагає затвердження від другого агента. UBS валідує виправлення перед мерджем.",
  },
  {
    tools: ["mail", "slb"],
    title: "Workflow затверджень",
    description:
      "SLB надсилає запити на затвердження безпосередньо в inbox агентів через Mail. Отримувачі можуть переглянути контекст і затвердити або відхилити. Повністю аудитований слід рішень.",
    multiplier: "Довіра",
    example:
      "Агент пропонує міграцію бази даних. SLB сповіщає ревʼюерів через Mail. Другий агент переглядає diff, затверджує. Аудит-лог збережено.",
  },
  {
    tools: ["bv", "cm"],
    title: "Вивчені патерни",
    description:
      "BV відстежує патерни задач та історію завершення. CM зберігає що спрацювало. Разом: кожна нова задача отримує користь від усіх минулих рішень.",
    multiplier: "Накопичення",
    example:
      "Схожий баг з'являється в новому проєкті. CM показує патерн. BV створює bead з посиланням на успішне попереднє виправлення.",
  },
  {
    tools: ["caam", "ntm"],
    title: "Оркестрація акаунтів",
    description:
      "CAAM керує API ключами для всіх ваших акаунтів агентів. NTM запускає агентів з правильними credentials автоматично. Безшовні multi-account workflows.",
    multiplier: "∞ агентів",
    example:
      "Rate limited на одному Claude акаунті? NTM запускає агентів зі свіжими credentials від CAAM. Без ручного перемикання.",
  },
];

// ============================================================
// FLYWHEEL TOOLS - Ukrainian (taglines, descriptions, features)
// ============================================================

export const flywheelToolsUk: Partial<FlywheelTool>[] = [
  {
    id: "ntm",
    tagline: "Командний центр агентів",
    description:
      "Перетворіть tmux на мультиагентний командний центр. Запускайте Claude, Codex та Gemini агентів у іменованих панелях. Транслюйте промпти на конкретні типи агентів. Постійні сесії переживають SSH-відключення.",
    deepDescription:
      "NTM — рівень оркестрації, який дозволяє запускати кілька AI-агентів паралельно. Запускайте агентів з класифікацією типу (cc/cod/gmi), транслюйте промпти з фільтрацією, використовуйте command palette TUI для швидких дій. Включає конфігуровані hooks, robot mode для автоматизації та глибоку інтеграцію з Agent Mail.",
    features: [
      "Запуск кількох агентів: ntm spawn project --cc=3 --cod=2 --gmi=1",
      "Трансляція на типи агентів: ntm send project --cc 'prompt'",
      "Command palette TUI з fuzzy search та категоріями",
      "Real-time dashboard з Catppuccin кольоровими темами",
      "Robot mode для скриптування: --robot-status, --robot-plan",
      "Hooks: pre/post-spawn, pre/post-send, pre/post-shutdown",
    ],
  },
  {
    id: "mail",
    tagline: "Gmail для ваших агентів",
    description:
      "Повна система координації для мультиагентних workflows. Агенти реєструють ідентичності, надсилають/отримують повідомлення, шукають розмови та декларують резервування файлів для запобігання конфліктам редагування.",
    deepDescription:
      "Agent Mail — нервова система flywheel. Надає: ідентичності агентів (прикметник+іменник імена як 'BlueLake'), threaded markdown повідомлення, повнотекстовий пошук та advisory file locks. Git-backed сховище означає повні audit trails. 20+ MCP tools для програмного доступу.",
    features: [
      "Ідентичності агентів з автогенерованими іменами",
      "GitHub-flavored Markdown повідомлення з threading",
      "Advisory file reservations (exclusive/shared, TTL)",
      "Повнотекстовий пошук по всіх розмовах",
      "Contact policies: open, auto, contacts_only, block_all",
      "Macro helpers для типових workflows",
    ],
  },
  {
    id: "ubs",
    tagline: "Поліглотний статичний аналіз",
    description:
      "Обгортає найкращі статичні аналізатори (ESLint, Ruff, Clippy, golangci-lint) з консистентним JSON виводом. Зворотній зв'язок за <5 секунд. Ідеально як pre-commit hook або агентський post-processor.",
    deepDescription:
      "UBS v5.0 підтримує 7 мов з 18 категоріями виявлення включаючи null safety, async баги, вразливості безпеки та memory leaks. Нульова конфігурація. Уніфікований JSON/JSONL/SARIF вивід для автоматизації. Supply chain захищений SHA-256 checksums.",
    features: [
      "7 мов: JS/TS, Python, Go, Rust, C/C++, Java, Ruby",
      "18 категорій виявлення: security, async bugs, null safety",
      "Зворотній зв'язок за <5 секунд",
      "Уніфікований вивід: --format=json|jsonl|sarif",
      "Baseline порівняння для виявлення drift",
      "On-file-write hooks для Claude Code, Cursor",
    ],
  },
  {
    id: "bv",
    tagline: "Графи залежностей задач",
    description:
      "Трансформує трекінг задач з DAG-based аналізом. Дев'ять графових метрик, robot protocol для AI, time-travel diffing. Агенти використовують BV щоб визначити над чим працювати далі.",
    deepDescription:
      "BV трактує ваш проєкт як Directed Acyclic Graph. Обчислює PageRank, Betweenness Centrality, HITS, Critical Path та інше. Robot protocol (--robot-*) виводить структурований JSON для агентів. Time-travel дозволяє diff через git історію.",
    features: [
      "9 графових метрик: PageRank, Betweenness, HITS, Critical Path",
      "6 TUI видів: list, kanban, graph, insights, history, flow",
      "Robot protocol: --robot-triage, --robot-plan, --robot-insights",
      "Time-travel: --as-of HEAD~30, --diff-since '30 days ago'",
      "Експорт у Markdown, HTML (Cytoscape.js), SQLite",
      "Live reload при змінах beads.jsonl",
    ],
  },
  {
    id: "cass",
    tagline: "Миттєвий пошук по всіх агентах",
    description:
      "Уніфікований пошук для всіх AI coding сесій. Індексує Claude, Codex, Cursor, Gemini, ChatGPT, Cline та інші. Tantivy-powered <60ms prefix queries.",
    deepDescription:
      "CASS уніфікує історію сесій з 10 форматів агентів в єдину пошукову timeline. Edge n-gram індексація для миттєвого prefix matching. Шість режимів ранжування балансують relevance, recency та match quality. Robot mode з cursor pagination та token budgeting.",
    features: [
      "10 форматів агентів: Claude Code, Codex, Cursor, Gemini, ChatGPT",
      "Tantivy search з <60ms prefix queries",
      "6 режимів ранжування: RecentHeavy, Balanced, RelevanceHeavy",
      "Three-pane TUI з 50+ keyboard shortcuts",
      "Robot mode з cursor pagination",
      "Remote sources через SSH/rsync",
    ],
  },
  {
    id: "cm",
    tagline: "Постійна пам'ять агентів",
    description:
      "Людиноподібна пам'ять для AI агентів. Процедурні playbooks, episodic session logs, semantic facts. Агенти вчаться з досвіду і ніколи не повторюють помилок.",
    deepDescription:
      "CM імплементує ACE (Agentic Context Engineering) framework. Чотирьохетапний pipeline: Generator → Reflector → Validator → Curator. Playbook bullets з 90-денним decay half-life. Evidence validation проти CASS history. Curator НЕ МАЄ LLM для запобігання context collapse.",
    features: [
      "ACE pipeline: Generator → Reflector → Validator → Curator",
      "Playbook bullets з decay (90-денний half-life)",
      "5 MCP tools: cm_context, cm_feedback, memory_search",
      "Multi-iteration reflection з deduplication",
      "Evidence validation проти session history",
      "4× harmful weight для уникнення помилок",
    ],
  },
  {
    id: "caam",
    tagline: "Миттєве перемикання auth",
    description:
      "Керуйте кількома API ключами для Claude, Codex та Gemini. Перемикання акаунтів за <100ms. Розумна ротація з відстеженням cooldown. Зашифровані credential bundles.",
    deepDescription:
      "CAAM забезпечує безшовні multi-account workflows. Розумна ротація профілів враховує cooldown state, health, recency та plan type. Прозорий failover з auto-retry. AES-256-GCM шифрування з Argon2id key derivation для безпечного експорту.",
    features: [
      "Перемикання акаунтів за <100ms",
      "Розумна ротація: cooldown, health, recency, plan type",
      "Прозорий failover з auto-retry",
      "3 провайдери: Claude Code, Codex CLI, Gemini CLI",
      "AES-256-GCM шифрування для export bundles",
      "Background daemon для proactive token refresh",
    ],
  },
  {
    id: "slb",
    tagline: "Правило двох осіб для агентів",
    description:
      "Захисне тертя для автономних агентів. Триступенева класифікація ризику. Криптографічне зв'язування команд з SHA-256+HMAC. Динамічний quorum. Повні audit trails.",
    deepDescription:
      "SLB імплементує nuclear-launch-style безпеку для AI агентів. CRITICAL команди потребують 2+ затвердження від різних моделей. Команди зв'язані SHA-256 hash. Reviews підписані HMAC. Self-review protection запобігає агентам затверджувати власні запити.",
    features: [
      "3 рівні: CRITICAL (2+), DANGEROUS (1), CAUTION (auto-30s)",
      "SHA-256 command binding (raw + cwd + argv)",
      "HMAC-SHA256 review signatures",
      "Different-model enforcement для CRITICAL",
      "Self-review protection",
      "SQLite audit trails",
    ],
  },
];

// ============================================================
// FLYWHEEL DESCRIPTION - Ukrainian
// ============================================================

export const flywheelDescriptionUk = {
  title: "The Agentic Coding Flywheel",
  subtitle: "Вісім інструментів, що створюють нечувану швидкість",
  description:
    "Самопідсилювальна система, яка дозволяє кільком AI агентам працювати паралельно на 8+ проєктах, перевіряти роботу одне одного, створювати та виконувати задачі, і досягати неймовірного автономного прогресу поки вас немає.",
  philosophy: [
    {
      title: "Філософія Unix",
      description:
        "Кожен інструмент робить одну справу надзвичайно добре. Вони компонуються через JSON, MCP та Git.",
    },
    {
      title: "Агент на першому місці",
      description:
        "Кожен інструмент має --robot режим. Створено для програмного виклику AI агентами.",
    },
    {
      title: "Самопідсилення",
      description:
        "Використання трьох інструментів у 10 разів краще ніж одного. Ефект flywheel накопичується з часом.",
    },
    {
      title: "Перевірено в бою",
      description:
        "Народжено з щоденного використання на 8+ проєктах з кількома AI агентами одночасно.",
    },
  ],
  metrics: {
    totalStars: "2K+",
    toolCount: 8,
    languages: ["Go", "Rust", "TypeScript", "Python"],
    avgInstallTime: "< 30с кожен",
    projectsSimultaneous: "8+",
    agentsParallel: "6+",
  },
  keyInsight:
    "Сила в тому, як ці інструменти працюють разом. Агенти визначають над чим працювати через BV, координуються через Mail, шукають минулі сесії через CASS, вчаться з CM і залишаються захищеними SLB. NTM оркеструє все.",
};
