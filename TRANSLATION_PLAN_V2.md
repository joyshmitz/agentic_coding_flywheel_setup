# План перекладу ACFS v2.38 (execution-ready)

---

## Open Risks

| Risk | Owner | Due |
|------|-------|-----|
| `tool-ids.ts` не існує | Claude | Phase 0 start |
| scripts/ не існують | Claude | Phase 0 start |
| package.json без i18n scripts | Claude | Phase 0 start |
| `glob` dependency не встановлена | Claude | Phase 0 start |
| Baseline не записаний | Claude | Phase 0 day 1 |
| lessons.uk.ts missing giil, s2p | Claude | Phase 0 |

**Verification:** Єдина команда `./scripts/verify-phase0.sh` перевіряє все:
- Preconditions (tool-ids.ts, glob)
- 5 blockers (check-lessons, check-tool-ids, type-check, lint, i18n:check)
- Proof (i18n-proof.md committed + scope hash match)

**Status:** ⏳ pending (resolve **at** Phase 0 start)

---

## Ціль

**0 user-facing EN strings при locale=uk**, за винятком:
- Технічних термінів (VPS, SSH, Git, etc.)
- Brand names (Claude, Codex, Gemini)
- Code blocks content

**Доказ:** Playwright test на всіх scope routes з exit 1 на violations.

---

## Findings (traceability)

### v2.37 → v2.38

| ID | Issue | Fix | Status |
|----|-------|-----|--------|
| F90 | freshness не включає detector version | Acknowledged як tech debt (див. Обмеження #11) | ⚠️ Acknowledged |
| F91 | "86 findings" неточний count | Виправлено на "89 findings v2.14-v2.37" | ✅ Fixed |

### v2.36 → v2.37

| ID | Issue | Fix | Status |
|----|-------|-----|--------|
| F87 | git audit check не перевіряє uncommitted changes | Додано `git diff --quiet -- i18n-proof.md` | ✅ Fixed |
| F88 | Open Risks каже "route count match" замість scope hash | Виправлено текст | ✅ Fixed |
| F89 | Старі F6/F7 блоки залишились після archive | Видалено | ✅ Fixed |

### v2.35 → v2.36

| ID | Issue | Fix | Status |
|----|-------|-----|--------|
| F84 | proof не перевіряється в git | ~~git log check~~ → F87 (uncommitted bypass) | ❌ Reopened |
| F85 | freshness через count можна обійти | Змінено на scope hash замість count | ✅ Fixed |
| F86 | traceability історичний шум | ~~Прибрано~~ → F89 (partial cleanup) | ❌ Reopened |

### v2.34 → v2.35

| ID | Issue | Fix | Status |
|----|-------|-----|--------|
| F81 | Open Risks "10 files" vs verify-phase0.sh без циклу | Оновлено таблицю: verification = `verify-phase0.sh` (не окремий цикл) | ✅ Fixed |
| F82 | RED→GREEN proof без freshness check | ~~Route count~~ → F85 (scope hash) | ✅ Fixed via F85 |
| F83 | Baseline verification = `test -f` (слабкий) | Оновлено: verification = `verify-phase0.sh` | ✅ Fixed |

### Archived (F1-F77)

<details>
<summary>89 findings (F1-F89) across v2.14-v2.37 — all resolved or acknowledged</summary>

- **F1-F7:** Phase 0 loopholes, scope coverage, tool-ids precondition
- **F8-F14:** Route count alignment, drift mitigation, glob dependency
- **F15-F20:** Exit code masking, locale verification, baseline reproduction
- **F21-F26:** Import tests, architecture inversion, path fixes
- **F27-F35:** SKIP audit trail, tool-ids consistency, routes advisory
- **F36-F43:** Git commit for SKIP, owners, tech debt acknowledgment
- **F44-F51:** Clean .ts rule, heavy deps extraction, grep robustness
- **F52-F59:** Execution readiness, prereq checks, git log fixes
- **F60-F68:** RED validation, SKIP enforcement, routeToFile mitigation
- **F69-F77:** Technical gates, markdown vs artifacts, DoD integration

**Acknowledged trade-offs (not bugs):**
- F2, F4: glob/STATIC_ROUTES drift — mitigated by validateScope()
- F6: TRANSLITERATIONS — process governance, not CI
- F39: check-tool-ids TSX — bun handles it
- F42: routeToFile rigid — mitigation documented

</details>

---

## Whitelist Policy (з governance)

**Категорії whitelist:**
| Категорія | Критерій | Приклади | Хто додає |
|-----------|----------|----------|-----------|
| TECHNICAL_TERMS | Протоколи, мови, CLI tools | SSH, API, Git, Rust | автор PR |
| BRAND_NAMES | Власні назви продуктів/компаній | Claude, Ubuntu, Anthropic | автор PR |
| CSS_HTML_KEYWORDS | CSS/HTML технічні терміни | flex, grid, auto, none | автор PR |
| TRANSLITERATIONS | Українські слова латиницею | tmux-сесія → "sesiia" | **reviewer approval** |

**Заборонено додавати в whitelist:**
- Звичайні EN слова (user, tool, page, card)
- Слова які мають український переклад
- Слова без технічного контексту

**Процес для TRANSLITERATIONS (потребує approval):**
```bash
# 1. Показати контекст де слово з'являється
# 2. Підтвердити що це українське слово латиницею (не EN)
# 3. Reviewer approve → додати з коментарем
```

---

## Scope

**Routing scope:** `scripts/scope.ts` (агрегує routes для перевірки)

Лічильники генеруються динамічно:
```bash
# Перевірити актуальні числа:
bun -e "import {SCOPE_ROUTES, SCOPE_FILES} from './scripts/scope'; console.log('Routes:', SCOPE_ROUTES.length, 'Files:', SCOPE_FILES.length)"
```

| Категорія | Джерело |
|-----------|---------|
| Lessons | `LESSONS.length` з `lib/lessons.ts` |
| Tool pages | `TOOL_IDS.length` з `lib/tool-ids.ts` |
| Static routes | hardcoded в `STATIC_ROUTES` |
| Files | hardcoded в `SCOPE_FILES` |

---

## scripts/scope.ts (routing aggregator)

**Canonical sources (data):**
- `lessons.ts` — lesson definitions
- `tool-ids.ts` — tool ID list
- `static-routes.ts` — hardcoded routes

**Aggregator (routing):**
- `scope.ts` — combines sources into SCOPE_ROUTES/SCOPE_FILES

**Примітка:** check-tool-ids.ts — виняток, імпортує TSX через bun runtime (див. Обмеження #9).

```typescript
import { existsSync } from "fs";
import { glob } from "glob";
import { LESSONS } from "../apps/web/lib/lessons";
import { TOOL_IDS } from "../apps/web/lib/tool-ids";
import { STATIC_ROUTES } from "./static-routes";
// All imports are plain .ts (no JSX)

// Re-export for convenience
export { STATIC_ROUTES };
```

---

## scripts/static-routes.ts (minimal, no dependencies)

```typescript
// Окремий файл щоб check-routes.ts не тягнув lessons/tool-ids/glob
// ТІЛЬКИ статичні роути, без залежностей
export const STATIC_ROUTES = [
  // Root pages (7)
  "/", "/flywheel", "/glossary", "/tools", "/troubleshooting", "/workflow", "/tldr",
  // Learn hub (3)
  "/learn", "/learn/glossary", "/learn/commands",
  // Wizard (14)
  "/wizard/os-selection", "/wizard/install-terminal", "/wizard/windows-terminal-setup",
  "/wizard/generate-ssh-key", "/wizard/rent-vps", "/wizard/create-vps",
  "/wizard/ssh-connect", "/wizard/verify-key-connection", "/wizard/reconnect-ubuntu",
  "/wizard/accounts", "/wizard/preflight-check", "/wizard/run-installer",
  "/wizard/status-check", "/wizard/launch-onboarding",
  // Docs (1)
  "/docs/security",
];
```

---

## scripts/scope.ts (continued)

```typescript
// ... imports from above ...

export const SCOPE_ROUTES = [
  ...STATIC_ROUTES,
  ...LESSONS.map(l => `/learn/${l.slug}`),
  ...TOOL_IDS.map(id => `/learn/tools/${id}`),
];
// Total: STATIC_ROUTES.length + LESSONS.length + TOOL_IDS.length

// === FILES (для source checks) ===
export const SCOPE_FILES = [
  // Root pages (7)
  "apps/web/app/page.tsx",
  "apps/web/app/glossary/page.tsx",
  "apps/web/app/flywheel/page.tsx",
  "apps/web/app/tools/page.tsx",
  "apps/web/app/troubleshooting/page.tsx",
  "apps/web/app/workflow/page.tsx",
  "apps/web/app/tldr/page.tsx",
  // Learn (5)
  "apps/web/app/learn/page.tsx",
  "apps/web/app/learn/[slug]/page.tsx",
  "apps/web/app/learn/glossary/page.tsx",
  "apps/web/app/learn/commands/page.tsx",
  "apps/web/app/learn/tools/[tool]/page.tsx",
  // Wizard (15)
  "apps/web/app/wizard/layout.tsx",
  "apps/web/app/wizard/generate-ssh-key/page.tsx",
  "apps/web/app/wizard/install-terminal/page.tsx",
  "apps/web/app/wizard/accounts/page.tsx",
  "apps/web/app/wizard/create-vps/page.tsx",
  "apps/web/app/wizard/run-installer/page.tsx",
  "apps/web/app/wizard/rent-vps/page.tsx",
  "apps/web/app/wizard/preflight-check/page.tsx",
  "apps/web/app/wizard/os-selection/page.tsx",
  "apps/web/app/wizard/reconnect-ubuntu/page.tsx",
  "apps/web/app/wizard/launch-onboarding/page.tsx",
  "apps/web/app/wizard/ssh-connect/page.tsx",
  "apps/web/app/wizard/verify-key-connection/page.tsx",
  "apps/web/app/wizard/windows-terminal-setup/page.tsx",
  "apps/web/app/wizard/status-check/page.tsx",
  // Docs (1)
  "apps/web/app/docs/security/page.tsx",
  // Shared components (9)
  "apps/web/components/stepper.tsx",
  "apps/web/components/language-switcher.tsx",
  "apps/web/components/alert-card.tsx",
  "apps/web/components/command-card.tsx",
  "apps/web/components/command-ref-card.tsx",
  "apps/web/components/connection-check.tsx",
  "apps/web/components/jargon.tsx",
  "apps/web/components/simpler-guide.tsx",
  "apps/web/components/flywheel-visualization.tsx",
  // Lesson components (найбільший gap — 27 без UK версій)
  ...glob.sync("apps/web/components/lessons/*-lesson.tsx"),
];

// === SCOPE VALIDATION ===
// Перевіряє що файли існують (catch drift)
export function validateScope(): string[] {
  const missing: string[] = [];
  for (const f of SCOPE_FILES) {
    if (!f.includes("*") && !existsSync(f)) missing.push(f);
  }
  return missing;
}
```

---

## EN Whitelist (контекстний)

**Файл:** `scripts/en-whitelist.ts`

```typescript
// STRICT whitelist - only truly untranslatable terms
export const TECHNICAL_TERMS = new Set([
  // Protocols/formats (завжди EN)
  "SSH", "API", "CLI", "DNS", "TCP", "HTTP", "HTTPS", "TLS", "JWT", "OAuth",
  "JSON", "YAML", "URL", "UUID", "MD5", "SHA",

  // Languages/runtimes (назви мов)
  "Rust", "Go", "Python", "JavaScript", "TypeScript", "Bash", "Zsh",

  // Tools (власні назви)
  "Git", "GitHub", "tmux", "npm", "bun", "Cargo",
  "Docker", "Kubernetes", "Postgres", "Redis",
  "Vercel", "Supabase", "Cloudflare",

  // Frameworks (власні назви)
  "Next", "React", "Tailwind", "Drizzle", "TanStack", "Framer",

  // Our tools (акроніми)
  "NTM", "UBS", "CASS", "CM", "CAAM", "SLB", "DCG", "RU", "GIIL",
  "APR", "PT", "XF", "RCH", "WA", "JFP", "SRPS", "BV", "BR",
]);

export const BRAND_NAMES = new Set([
  "Claude", "Codex", "Gemini", "Anthropic", "OpenAI", "Google",
  "Ubuntu", "Linux", "Dicklesworthstone", "Jeffrey", "Emanuel",
]);

// EN words that indicate untranslated UI (should FAIL)
export const EN_UI_VIOLATIONS = new Set([
  // Navigation
  "home", "back", "next", "previous", "continue", "cancel", "close",
  "skip", "finish", "done", "submit", "confirm",

  // Actions
  "copy", "copied", "paste", "save", "delete", "edit", "update",
  "create", "add", "remove", "search", "filter", "sort", "refresh",

  // States
  "loading", "error", "success", "warning", "failed", "pending",

  // Common UI
  "settings", "options", "preferences", "help", "about", "menu",
  "welcome", "getting", "started", "learn", "more", "view", "show", "hide",

  // Articles/prepositions in UI context
  "step", "steps", "of",
]);

export function isAllowedEN(word: string): boolean {
  const upper = word.toUpperCase();

  // Technical terms and brands are allowed
  if (TECHNICAL_TERMS.has(word) || TECHNICAL_TERMS.has(upper)) return true;
  if (BRAND_NAMES.has(word)) return true;

  return false;
}

// Common EN words (розширений список для catch-all)
// ВКЛЮЧАЄ 2-3 char слова для повного покриття
export const COMMON_EN_WORDS = new Set([
  // 2-3 char (критичні — інакше blind spot)
  "go", "to", "do", "up", "on", "in", "at", "by", "or", "an", "as", "if",
  "no", "ok", "id", "us", "it", "is", "be", "we", "my", "so", "of",
  "all", "and", "the", "for", "not", "but", "you", "are", "was", "has",
  "can", "did", "get", "got", "set", "run", "see", "try", "use", "put",
  "out", "off", "top", "end", "key", "log", "app", "tab", "tip", "bug",
  "new", "old", "big", "low", "max", "min", "now", "ago", "via", "per",
  // 4 char
  "user", "tool", "page", "card", "file", "list", "item", "icon",
  "name", "text", "info", "data", "link", "view", "edit", "save",
  "load", "send", "wait", "done", "here", "more", "less", "show",
  "hide", "open", "copy", "undo", "redo", "find", "sort", "help",
  "back", "next", "prev", "home", "menu", "from", "into", "with",
  "size", "time", "date", "year", "week", "days", "hour", "mins",
  "code", "task", "note", "work", "test", "fail", "pass", "stop",
  // Navigation
  "previous", "continue", "cancel", "close", "skip", "finish", "submit", "confirm", "start", "stop",
  // Actions
  "copied", "paste", "delete", "update", "create", "add", "remove", "search", "filter", "refresh",
  "download", "upload", "install", "uninstall", "run", "execute",
  // States
  "loading", "error", "success", "warning", "failed", "pending",
  "active", "inactive", "enabled", "disabled", "ready", "waiting",
  // UI elements
  "settings", "options", "preferences", "about", "button", "input", "form", "panel", "modal",
  // Content
  "welcome", "getting", "started", "learn", "step", "steps",
  // Time
  "today", "yesterday", "tomorrow", "minute", "minutes", "hours",
  // Common verbs
  "click", "press", "tap", "select", "choose", "enter", "type", "expand", "collapse", "toggle",
  // Adjectives
  "new", "old", "first", "last", "required", "optional",
]);

// CSS/HTML keywords (не потребують перекладу)
export const CSS_HTML_KEYWORDS = new Set([
  "flex", "grid", "auto", "none", "bold", "sans", "mono",
  "inline", "block", "hidden", "fixed", "absolute", "relative",
]);

// Українські слова латиницею (потребують reviewer approval)
export const TRANSLITERATIONS = new Set([
  // Додавати з коментарем контексту
  // Приклад: "sesiia" - від "сесія" в контексті tmux
]);

export function isViolation(word: string): boolean {
  const lower = word.toLowerCase();

  // Whitelist categories (not violations)
  if (CSS_HTML_KEYWORDS.has(lower)) return false;
  if (TRANSLITERATIONS.has(lower)) return false;

  // Known EN UI/common word = violation
  if (EN_UI_VIOLATIONS.has(lower)) return true;
  if (COMMON_EN_WORDS.has(lower)) return true;

  // Capitalized word not in whitelist = likely EN
  if (/^[A-Z][a-z]+/.test(word) && !isAllowedEN(word)) return true;

  // Pure Latin word 3+ chars not in whitelist = suspicious
  if (/^[a-z]{3,}$/.test(lower) && !isAllowedEN(word)) {
    return true;
  }

  return false;
}
```

**Примітка:** Heuristic ловить 3+ chars lowercase. 2-char слова в COMMON_EN_WORDS. False positives:
- CSS/HTML keywords → CSS_HTML_KEYWORDS (автор PR)
- Українські transliterations → TRANSLITERATIONS (reviewer approval)

---

## Головний Gate: check-i18n.ts

```typescript
import { chromium, Page } from "playwright";
import { isAllowedEN, isViolation } from "./en-whitelist";
import { SCOPE_ROUTES, validateScope } from "./scope";

// === SCOPE VALIDATION (catch drift before running tests) ===
const missing = validateScope();
if (missing.length > 0) {
  console.error("❌ Scope drift detected - files missing:");
  missing.forEach(f => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`✓ Scope validated: ${SCOPE_ROUTES.length} routes`);

async function waitForServer(url: string, timeout = 30000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

async function extractText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const clone = document.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("code, pre, [data-code], [data-terminal]")
      .forEach(el => el.remove());
    return clone.innerText;
  });
}

function findViolations(text: string): string[] {
  const words = text.match(/\b[A-Za-z]{2,}\b/g) || [];
  const violations: string[] = [];
  for (const word of words) {
    if (isAllowedEN(word)) continue;
    if (isViolation(word)) violations.push(word);
  }
  return [...new Set(violations)];
}

async function main() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  console.log(`Waiting for server...`);
  if (!await waitForServer(baseUrl)) {
    console.error("Server timeout");
    process.exit(1);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();

  // КРИТИЧНО: встановити locale через localStorage ДО навігації
  await context.addInitScript(() => {
    localStorage.setItem("acfs-locale", "uk");
  });

  const page = await context.newPage();

  // Verify locale is set (deterministic forcing)
  await page.goto(baseUrl);
  await page.reload(); // ensure localStorage is applied
  const localeCheck = await page.evaluate(() => localStorage.getItem("acfs-locale"));
  if (localeCheck !== "uk") {
    console.error("❌ Failed to set locale to uk");
    process.exit(1);
  }
  console.log("✓ localStorage locale: uk");

  // Verify UI actually shows Ukrainian (not just localStorage)
  const bodyText = await page.evaluate(() => document.body.innerText);
  const hasCyrillic = /[\u0400-\u04FF]/.test(bodyText);
  if (!hasCyrillic) {
    console.error("❌ UI does not contain Cyrillic text - locale not applied");
    process.exit(1);
  }
  console.log("✓ UI locale verified (contains Cyrillic)");

  let failed = 0;
  let errors = 0;

  for (const route of SCOPE_ROUTES) {
    try {
      const res = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 15000,
      });

      // Route validation вбудована (один прохід)
      if (!res || !res.ok()) {
        console.error(`[ERROR] ${route}: ${res?.status() || "no response"}`);
        errors++;
        continue;
      }

      const text = await extractText(page);
      const violations = findViolations(text);

      if (violations.length > 0) {
        console.error(`[FAIL] ${route}: ${violations.slice(0, 5).join(", ")}${violations.length > 5 ? "..." : ""}`);
        failed++;
      } else {
        console.log(`[PASS] ${route}`);
      }
    } catch (err) {
      console.error(`[ERROR] ${route}: ${err}`);
      errors++;
    }
  }

  await browser.close();

  if (errors > 0) {
    console.error(`\n❌ ${errors} route errors (check scope.ts sources)`);
    process.exit(1);
  }

  if (failed > 0) {
    console.error(`\n❌ ${failed}/${SCOPE_ROUTES.length} routes have EN violations`);
    process.exit(1);
  }

  console.log(`\n✅ All ${SCOPE_ROUTES.length} routes passed`);
}

main().catch(e => { console.error(e); process.exit(1); });
```

---

## Допоміжні checks

### check-fallbacks.ts (ADVISORY ONLY)

**Призначення:** Підказка для code review. НЕ blocker.

**Обмеження (чому не blocker):**
- Ловить тільки `|| "text"`, `?? "text"`, `? "text" :`
- Пропускає: `t("...")`, `messages.foo`, template strings, multiline
- Занадто багато false negatives для production gate

```typescript
import { readFileSync, existsSync } from "fs";
import { SCOPE_FILES } from "./scope";

const FALLBACK_PATTERNS = [
  /\|\|\s*["'][A-Za-z][^"']*["']/g,   // || "text"
  /\?\s*["'][A-Za-z][^"']*["']\s*:/g, // ? "text" :
  /\?\?\s*["'][A-Za-z][^"']*["']/g,   // ?? "text"
];

let total = 0;

for (const file of SCOPE_FILES) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf-8");

  for (const pattern of FALLBACK_PATTERNS) {
    const matches = content.match(pattern) || [];
    if (matches.length > 0) {
      console.warn(`[WARN] ${file}:`);
      matches.forEach(m => console.warn(`  ${m}`));
      total += matches.length;
    }
  }
}

if (total > 0) {
  console.warn(`\n⚠️  ${total} potential fallbacks (review manually)`);
} else {
  console.log(`\n✓ No obvious fallbacks detected`);
}

console.log(`[INFO] Checked ${SCOPE_FILES.length} files (advisory only)`);
// НЕ exit 1 — це лише підказка для review
```

**Роль в pipeline:**
- `check-i18n.ts` = **primary i18n blocker** (render check з localStorage locale)
- `check-fallbacks.ts` = **advisory** (інформація для reviewer)

**Повний gate:** check-lessons + check-tool-ids + type-check + lint + i18n:check (всі 5 blockers)

### check-lessons.ts (blocking)

```typescript
import { LESSONS } from "../apps/web/lib/lessons";
import { LESSONS_UK } from "../apps/web/lib/lessons.uk";

let errors = 0;

const enMap = new Map(LESSONS.map(l => [l.slug, l]));
const ukMap = new Map(LESSONS_UK.map(l => [l.slug, l]));

// Missing slugs
for (const slug of enMap.keys()) {
  if (!ukMap.has(slug)) {
    console.error(`[FAIL] Missing UK: ${slug}`);
    errors++;
  }
}

// Consistency check
for (const [slug, uk] of ukMap) {
  const en = enMap.get(slug);
  if (!en) continue;

  if (en.id !== uk.id) {
    console.error(`[FAIL] ${slug}: id mismatch (EN=${en.id}, UK=${uk.id})`);
    errors++;
  }
  if (en.file !== uk.file) {
    console.error(`[FAIL] ${slug}: file mismatch`);
    errors++;
  }
}

if (errors > 0) process.exit(1);
console.log(`[PASS] ${enMap.size} lessons consistent`);
```

### check-tool-ids.ts (blocking)

**Призначення:** Гарантує що TOOL_IDS і TOOLS синхронізовані (немає drift).

**Чому runtime import, а не regex:**
- TOOLS = `Record<ToolId, ToolCard>` (об'єкт, не масив)
- regex-парсинг крихкий до форматування
- bun може імпортувати TSX напряму

```typescript
// NOTE: Запускати через `bun run` — підтримує TSX import
import { TOOL_IDS } from "../apps/web/lib/tool-ids";
import { TOOLS } from "../apps/web/app/learn/tools/[tool]/tool-data";

let errors = 0;

// Check: no duplicates in TOOL_IDS (canonical source must be clean)
const seen = new Set<string>();
for (const id of TOOL_IDS) {
  if (seen.has(id)) {
    console.error(`[FAIL] Duplicate in TOOL_IDS: "${id}"`);
    errors++;
  }
  seen.add(id);
}

const toolIdsSet = new Set(TOOL_IDS);
const toolsKeys = new Set(Object.keys(TOOLS));

// Check: every TOOL_ID has entry in TOOLS
for (const id of TOOL_IDS) {
  if (!toolsKeys.has(id)) {
    console.error(`[FAIL] TOOL_IDS has "${id}" but TOOLS doesn't`);
    errors++;
  }
}

// Check: every TOOLS key is in TOOL_IDS
for (const key of toolsKeys) {
  if (!toolIdsSet.has(key as typeof TOOL_IDS[number])) {
    console.error(`[FAIL] TOOLS has "${key}" but TOOL_IDS doesn't`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n❌ TOOL_IDS ↔ TOOLS consistency check failed`);
  process.exit(1);
}

console.log(`[PASS] ${TOOL_IDS.length} tool IDs (no duplicates) ↔ ${toolsKeys.size} TOOLS entries`);
```

**Примітка:** Цей скрипт MUST run через bun (не node) бо імпортує TSX.

### check-routes.ts (advisory)

**Призначення:** Перевіряє що STATIC_ROUTES відповідають файловій системі.

**Чому тільки STATIC_ROUTES:**
- Динамічні routes (/learn/[slug], /learn/tools/[tool]) → page.tsx в [slug]/ або [tool]/
- Ці перевіряються через validateScope() в check-i18n.ts
- check-routes.ts ловить drift тільки в STATIC_ROUTES

```typescript
import { existsSync } from "fs";
import { STATIC_ROUTES } from "./static-routes";  // minimal, no heavy deps

function routeToFile(route: string): string {
  if (route === "/") return "apps/web/app/page.tsx";
  return `apps/web/app${route}/page.tsx`;
}

let warnings = 0;

for (const route of STATIC_ROUTES) {
  const file = routeToFile(route);
  if (!existsSync(file)) {
    console.warn(`[WARN] Route "${route}" → file not found: ${file}`);
    warnings++;
  }
}

if (warnings > 0) {
  console.warn(`\n⚠️  ${warnings} static routes may have drifted`);
  console.warn("Action: Update STATIC_ROUTES in scripts/static-routes.ts");
} else {
  console.log(`✓ All ${STATIC_ROUTES.length} static routes have corresponding files`);
}

// Advisory only — не блокує
```

### skip-signoff.sh (SKIP review gate)

```bash
#!/bin/bash
# Technical enforcement for SKIP manual review

if [ -z "$1" ]; then
  echo "Usage: ./scripts/skip-signoff.sh 'Reviewer Name'"
  exit 1
fi

REVIEWER="$1"
DATE=$(date -Iseconds)

# Verify i18n-proof.md contains SKIP
if ! grep -q "^SKIP:" i18n-proof.md 2>/dev/null; then
  echo "❌ No SKIP record in i18n-proof.md — run red/green protocol first"
  exit 1
fi

# Add sign-off
echo "" >> i18n-proof.md
echo "SIGNOFF: $REVIEWER" >> i18n-proof.md
echo "DATE: $DATE" >> i18n-proof.md
echo "STATUS: Manual review completed" >> i18n-proof.md

git add i18n-proof.md
git commit -m "signoff: SKIP review by $REVIEWER"
echo "✓ Sign-off recorded"
```

### verify-phase0.sh (Phase 0 completion gate)

**Єдина точка входу. Запускає blockers + перевіряє proof з git audit + scope hash.**

```bash
#!/bin/bash
set -e  # exit on first failure

echo "=== Phase 0 Verification ==="

# === PRECONDITIONS ===
echo "--- Preconditions ---"

if [ ! -f apps/web/lib/tool-ids.ts ]; then
  echo "❌ tool-ids.ts not found"
  exit 1
fi
echo "✓ tool-ids.ts exists"

bun -e "import('glob').catch(() => process.exit(1))" 2>/dev/null || {
  echo "❌ glob not installed — run: bun add glob"
  exit 1
}
echo "✓ glob installed"

# === RUN ALL BLOCKERS ===
echo ""
echo "--- Running blockers ---"

bun run check-lessons || { echo "❌ check-lessons failed"; exit 1; }
echo "✓ check-lessons"

bun run check-tool-ids || { echo "❌ check-tool-ids failed"; exit 1; }
echo "✓ check-tool-ids"

bun run type-check || { echo "❌ type-check failed"; exit 1; }
echo "✓ type-check"

bun run lint || { echo "❌ lint failed"; exit 1; }
echo "✓ lint"

bun run i18n:check || { echo "❌ i18n:check failed"; exit 1; }
echo "✓ i18n:check"

# === VERIFY PROOF ===
echo ""
echo "--- Verifying proof ---"

if [ ! -f i18n-proof.md ]; then
  echo "❌ i18n-proof.md not found"
  exit 1
fi

# CRITICAL: proof must be committed AND match disk (no uncommitted changes)
if ! git diff --quiet -- i18n-proof.md 2>/dev/null; then
  echo "❌ i18n-proof.md has uncommitted changes"
  echo "   Run: git add i18n-proof.md && git commit -m 'update proof'"
  exit 1
fi
if ! git diff --cached --quiet -- i18n-proof.md 2>/dev/null; then
  echo "❌ i18n-proof.md has staged but uncommitted changes"
  echo "   Run: git commit -m 'update proof'"
  exit 1
fi
GIT_LOG=$(git log --oneline -1 -- i18n-proof.md 2>/dev/null) || true
if [ -z "$GIT_LOG" ]; then
  echo "❌ i18n-proof.md never committed"
  exit 1
fi
echo "✓ proof committed: $GIT_LOG"

# Get current scope hash (routes joined + md5)
SCOPE_HASH=$(bun -e "import {SCOPE_ROUTES} from './scripts/scope'; const crypto = require('crypto'); console.log(crypto.createHash('md5').update(SCOPE_ROUTES.join(',')).digest('hex').slice(0,8))")

# Check: either (SKIP + SIGNOFF + hash) or (RED + GREEN + hash)
if grep -q "^SKIP:" i18n-proof.md; then
  # SKIP path
  if ! grep -q "^SIGNOFF:" i18n-proof.md; then
    echo "❌ SKIP requires sign-off — run: ./scripts/skip-signoff.sh 'Name'"
    exit 1
  fi
  if ! grep -q "Scope: $SCOPE_HASH" i18n-proof.md; then
    echo "❌ SKIP proof scope mismatch (expected $SCOPE_HASH)"
    echo "   Re-run red/green protocol with current scope"
    exit 1
  fi
  echo "✓ SKIP with sign-off (scope: $SCOPE_HASH)"
else
  # RED→GREEN path
  if ! grep -q "^RED baseline:" i18n-proof.md; then
    echo "❌ Missing 'RED baseline:' in i18n-proof.md"
    exit 1
  fi
  if ! grep -q "^GREEN:" i18n-proof.md; then
    echo "❌ Missing 'GREEN:' in i18n-proof.md"
    exit 1
  fi
  if ! grep -q "Scope: $SCOPE_HASH" i18n-proof.md; then
    echo "❌ GREEN proof scope mismatch (expected $SCOPE_HASH)"
    echo "   Re-run red/green protocol with current scope"
    exit 1
  fi
  echo "✓ RED→GREEN proof (scope: $SCOPE_HASH)"
fi

echo ""
echo "✅ Phase 0 complete — ready for Phase 1"
```

---

## Package.json (TO BE ADDED)

**Ці скрипти потрібно додати до root package.json:**

```json
{
  "scripts": {
    "start": "bun run --filter @acfs/web start",
    "i18n:check": "bun run build && (bun run start & PID=$!; bun run scripts/check-i18n.ts; EXIT=$?; kill $PID 2>/dev/null; exit $EXIT)",
    "check-lessons": "bun run scripts/check-lessons.ts",
    "check-tool-ids": "bun run scripts/check-tool-ids.ts",
    "check-fallbacks": "bun run scripts/check-fallbacks.ts",
    "check-routes": "bun run scripts/check-routes.ts"
  }
}
```

**Примітки:**
- `EXIT=$?; kill $PID; exit $EXIT` — exit code від Playwright не маскується kill
- Наразі в repo ці скрипти **не існують** — Phase 0 task

---

## Phase 0

### Baseline (верифіковано)

| Category | EN | UK | Gap |
|----------|----|----|-----|
| **Message files** | 37 | 37 | **0** ✓ |
| **Lessons** | 33 | 31 | giil, s2p |
| **Lesson components** | 33 | 6 | 27 |
| **Pages (app/)** | 28 | n/a | render check |
| **Shared components** | 9 | n/a | render check |

**Reproduction commands (для верифікації чисел):**
```bash
# Message files
find apps/web/lib -name "*-messages.ts" ! -name "*.uk.ts" | wc -l  # EN: 37
find apps/web/lib -name "*-messages.uk.ts" | wc -l                 # UK: 37

# Lessons
grep -c "slug:" apps/web/lib/lessons.ts     # EN: 33
grep -c "slug:" apps/web/lib/lessons.uk.ts  # UK: 31

# Lesson components
ls apps/web/components/lessons/*-lesson.tsx 2>/dev/null | wc -l      # EN: 33
ls apps/web/components/lessons/*-lesson.uk.tsx 2>/dev/null | wc -l   # UK: 6
```

**Red/Green Proof Protocol:**
```bash
# 0. PREREQ CHECK (інакше RED може бути від infra, не EN strings)
echo "--- Checking prerequisites ---"
bun run check-lessons || { echo "❌ check-lessons failed"; exit 1; }
bun run check-tool-ids || { echo "❌ check-tool-ids failed"; exit 1; }
bun run type-check || { echo "❌ type-check failed"; exit 1; }
bun run lint || { echo "❌ lint failed"; exit 1; }
bun run build || { echo "❌ build failed"; exit 1; }
echo "✓ Prerequisites passed (infra ready)"

# 1. GET SCOPE HASH (freshness check)
SCOPE_HASH=$(bun -e "import {SCOPE_ROUTES} from './scripts/scope'; const crypto = require('crypto'); console.log(crypto.createHash('md5').update(SCOPE_ROUTES.join(',')).digest('hex').slice(0,8))")
ROUTE_COUNT=$(bun -e "import {SCOPE_ROUTES} from './scripts/scope'; console.log(SCOPE_ROUTES.length)")

# 2. RED BASELINE (MUST fail from EN violations only, no infra errors)
bun run i18n:check > /tmp/i18n-red.log 2>&1
RED_EXIT=$?
# NOTE: grep -c returns exit 1 when count=0, so use || VAR=0 syntax (not || echo)
FAIL_COUNT=$(grep -c "\[FAIL\]" /tmp/i18n-red.log) || FAIL_COUNT=0
ERROR_COUNT=$(grep -c "\[ERROR\]" /tmp/i18n-red.log) || ERROR_COUNT=0

# Block if any [ERROR] (infra/route issues) — RED must be clean
if [ "$ERROR_COUNT" -gt 0 ]; then
  echo "❌ Found $ERROR_COUNT [ERROR] entries — fix infra before proof"
  grep "\[ERROR\]" /tmp/i18n-red.log
  exit 1
fi

# Block if non-zero but no [FAIL] — runtime crash, not EN violations
if [ "$RED_EXIT" -ne 0 ] && [ "$FAIL_COUNT" -eq 0 ]; then
  echo "❌ i18n:check failed but no [FAIL] entries — likely runtime error"
  cat /tmp/i18n-red.log
  exit 1
fi

if [ "$RED_EXIT" -eq 0 ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════════╗"
  echo "║  ALREADY GREEN — no EN violations found                  ║"
  echo "║                                                          ║"
  echo "║  This is NOT a red→green proof. It means:                ║"
  echo "║  • Translations are already complete, OR                 ║"
  echo "║  • Whitelist covers all remaining EN strings             ║"
  echo "║                                                          ║"
  echo "║  Review manually before accepting as Phase 0 pass.       ║"
  echo "╚══════════════════════════════════════════════════════════╝"
  echo ""
  echo "SKIP: Already passing at $(date -Iseconds)" > i18n-proof.md
  echo "Scope: $SCOPE_HASH" >> i18n-proof.md
  echo "Routes: $ROUTE_COUNT" >> i18n-proof.md
  echo "NOTE: Manual review required — this is audit record, not proof" >> i18n-proof.md
  git add i18n-proof.md
  if ! git diff --cached --quiet; then
    git commit -m "audit: SKIP (already green, manual review required)"
    echo "✓ SKIP committed (requires manual review)"
  else
    HISTORY=$(git log --oneline -1 -- i18n-proof.md 2>/dev/null)
    if [ -n "$HISTORY" ]; then
      echo "✓ SKIP already in git: $HISTORY"
    else
      git commit --allow-empty -m "audit: SKIP (already green)"
    fi
  fi
  exit 0
fi

echo "RED baseline: $FAIL_COUNT/$ROUTE_COUNT routes failed (exit $RED_EXIT)" > i18n-proof.md
echo "Scope: $SCOPE_HASH" >> i18n-proof.md
echo "Date: $(date -Iseconds)" >> i18n-proof.md
echo "--- RED recorded, proceed with fixes ---"

# 3. ВИПРАВЛЕННЯ
# ... робота над перекладами ...

# 4. GREEN (має пройти)
bun run i18n:check > /tmp/i18n-green.log 2>&1
GREEN_EXIT=$?

if [ "$GREEN_EXIT" -ne 0 ]; then
  echo "❌ GREEN check failed (exit $GREEN_EXIT)"
  cat /tmp/i18n-green.log
  exit 1
fi

echo "GREEN: All $ROUTE_COUNT routes passed" >> i18n-proof.md
echo "Scope: $SCOPE_HASH" >> i18n-proof.md
echo "Date: $(date -Iseconds)" >> i18n-proof.md

# 5. COMMIT (тільки якщо був RED і став GREEN)
git add i18n-proof.md
git commit -m "proof: red→green i18n ($FAIL_COUNT→0)"
echo "✓ Proof committed: $FAIL_COUNT violations fixed"
```

**Гарантії:**
- Якщо RED_EXIT=0 → комітимо SKIP (audit trail, що вже було green)
- Якщо RED_EXIT≠0 і GREEN_EXIT=0 → комітимо red→green proof
- Якщо GREEN_EXIT≠0 → exit 1, не комітимо (ще не green)
- Кожен шлях залишає audit trail в git

### Tasks (в порядку виконання)

1. **Install glob dependency:** `bun add glob`
2. **Create `apps/web/lib/tool-ids.ts`** — CANONICAL SOURCE (plain .ts, no JSX!)
   ```typescript
   // CANONICAL SOURCE — tool-data.tsx imports FROM here (not vice versa)
   // Це дозволяє scripts/*.ts імпортувати без JSX dependencies
   export const TOOL_IDS = [
     "claude-code", "codex-cli", "gemini-cli", "ntm", "beads",
     "agent-mail", "ubs", "cass", "cm", "caam", "slb", "dcg",
     "ru", "ms", "apr", "jfp", "pt", "srps", "xf"
   ] as const;

   export type ToolId = typeof TOOL_IDS[number];
   ```

   **Потім оновити `tool-data.tsx`:**
   ```typescript
   // apps/web/app/learn/tools/[tool]/tool-data.tsx
   import { TOOL_IDS, type ToolId } from "@/lib/tool-ids";
   // ... решта коду використовує TOOL_IDS
   ```

   **Архітектура (інверсія залежності):**
   ```
   tool-ids.ts (plain .ts, canonical source)
        ↑
   tool-data.tsx (TSX, imports from tool-ids.ts)
        ↑
   scripts/*.ts (import tool-ids.ts directly, no JSX)
   ```
3. **Create scripts/** (10 files):
   - `static-routes.ts` — hardcoded routes (no deps)
   - `scope.ts` — routing aggregator
   - `en-whitelist.ts` — whitelist definitions
   - `check-i18n.ts` — Playwright render check
   - `check-lessons.ts` — EN/UK parity (blocker)
   - `check-tool-ids.ts` — TOOL_IDS↔TOOLS sync (blocker)
   - `check-fallbacks.ts` — fallback detection (advisory)
   - `check-routes.ts` — route drift detection (advisory)
   - `skip-signoff.sh` — SKIP review sign-off
   - `verify-phase0.sh` — **final gate** (checks real artifacts)
4. **Add scripts to package.json** — start, i18n:check, check-lessons, check-tool-ids, check-fallbacks, check-routes
5. Add giil, s2p to lessons.uk.ts
6. Remove glossary fallbacks in `apps/web/app/glossary/page.tsx` (lines ~243, ~481, ~487)

### DoD (operational)

**Єдина команда для Phase 0 verification:**

```bash
./scripts/verify-phase0.sh
```

**Що робить verify-phase0.sh:**
1. Preconditions: tool-ids.ts, glob dependency
2. Запускає всі 5 blockers: check-lessons, check-tool-ids, type-check, lint, i18n:check
3. Перевіряє i18n-proof.md:
   - Committed in git (audit trail)
   - SKIP path → requires SIGNOFF + scope hash
   - RED→GREEN path → requires markers + scope hash

**Advisory checks (опціонально, не блокують):**
```bash
bun run check-fallbacks  # fallback detection
bun run check-routes     # route drift detection
```

**Критерій Phase 0:**

```bash
./scripts/verify-phase0.sh  # exit 0 = Phase 0 done
```

**Що перевіряє verify-phase0.sh (все в одному скрипті):**
- Preconditions: tool-ids.ts, glob
- 5 blockers: check-lessons, check-tool-ids, type-check, lint, i18n:check
- Proof validation:
  - **Git audit:** `git log -1 -- i18n-proof.md` must exist
  - **Scope hash:** md5(SCOPE_ROUTES.join(','))[0:8] must match
  - RED→GREEN: `RED baseline:` + `GREEN:` + `Scope: <hash>`
  - SKIP: `SKIP:` + `SIGNOFF:` + `Scope: <hash>`

**If SKIP path taken:**
1. Переглянути ~10 random routes в browser з locale=uk
2. Підтвердити: UI дійсно українською
3. Run: `./scripts/skip-signoff.sh "Reviewer Name"`
4. Re-run: `./scripts/verify-phase0.sh`

**Phase 0 НЕ завершено** поки `verify-phase0.sh` exit 0

---

## Phase 1+

### Gate

```bash
# ALL BLOCKERS (кожен must exit 0)
bun run check-lessons     # lessons parity
bun run check-tool-ids    # TOOL_IDS ↔ TOOLS consistency
bun run type-check        # TypeScript
bun run lint              # ESLint
bun run i18n:check        # render check

# ADVISORY (інформація для review)
bun run check-fallbacks   # не блокує, лише підказка
bun run check-routes      # STATIC_ROUTES drift detection
```

**Gate hierarchy (всі 5 blockers обов'язкові):**
1. `check-lessons` — структурна відповідність EN/UK (швидкий, перший)
2. `check-tool-ids` — TOOL_IDS ↔ TOOLS консистентність
3. `type-check` — TypeScript компілюється
4. `lint` — code quality
5. `i18n:check` — **primary i18n gate** (Playwright render check, найповільніший)

**Чому 5 blockers:**
- `check-lessons` ловить структурні помилки до build
- `check-tool-ids` ловить drift між canonical source і runtime data
- `type-check` ловить import/export помилки
- `lint` ловить code quality
- `i18n:check` = фінальний i18n proof (render check)

Всі повинні пройти. Порядок оптимізовано для fail-fast.

---

## Обмеження

1. **COMMON_EN_WORDS ітеративний** — додавати слова при false negatives
2. **CSS_HTML_KEYWORDS** — додає автор PR
3. **TRANSLITERATIONS governance** — процесний (reviewer approval), не технічний (немає CI enforcement)
4. **Heuristic 3+ chars** — може ловити transliterations
5. **Code blocks excluded** — prompts не перевіряються (policy)
6. **Dynamic content** — тільки initial render (interactions не тестуються)
7. **check-fallbacks слабкий** — advisory only, багато false negatives
8. **Lesson components** — покриті через glob, може бути drift якщо naming змінюється
9. **check-tool-ids залежить від bun+TSX** — імпортує tool-data.tsx напряму (trade-off: robust vs pure data)
10. **check-routes routeToFile rigid** — не враховує Next.js route groups, parallel routes
    - **Trigger**: перший route group `(folder)` або parallel route `@folder` в app/
    - **Owner**: той хто додає advanced routing
    - **Mitigation**: оновити routeToFile() або перейти на Next.js route manifest API
11. **Freshness = scope hash only** — не включає версію detector logic (check-i18n.ts, en-whitelist.ts)
    - **Risk**: зміна whitelist/detector при тому ж scope → старий proof валідний
    - **Trigger**: значна зміна detection logic
    - **Mitigation**: manual re-run red/green protocol після таких змін

---

## Microcycle Status (оновлювати кожні 25-40 хв)

**Timestamp:** _[заповнити]_

**Done:**
- _[що завершено в цьому циклі]_

**Next:**
- _[що робимо в наступному циклі]_

**Blockers:**
- _[що блокує прогрес]_
