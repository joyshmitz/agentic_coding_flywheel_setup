# ACFS - Agentic Coding Flywheel Setup

## Project Overview

**ACFS** transforms a fresh Ubuntu VPS into a fully-configured AI-powered development environment in 30 minutes.

- **Website:** [agent-flywheel.com](https://agent-flywheel.com)
- **Target:** Complete beginners → professional agentic coding setup
- **Platform:** Ubuntu 25.10
- **License:** MIT

---

## Project Structure

```
agentic_coding_flywheel_setup/
├── apps/
│   └── web/                 # Next.js wizard website (@acfs/web)
├── packages/
│   ├── installer/           # Installation logic
│   ├── manifest/            # Single source of truth for tools/config
│   └── onboard/             # Onboarding flow
├── scripts/
│   ├── lib/                 # Shared bash functions
│   ├── generated/           # Auto-generated scripts
│   ├── hooks/               # Git hooks
│   ├── providers/           # VPS provider configs
│   ├── templates/           # Config templates
│   ├── tests/               # Test scripts
│   ├── preflight.sh         # Pre-installation checks
│   ├── services-setup.sh    # Main service installation
│   └── validate_upgrade.sh  # Upgrade validation
├── install.sh               # Main entry point (curl | bash)
└── package.json             # Bun monorepo config
```

---

## Commands

```bash
# Development
bun install              # Install dependencies
bun run dev              # Run web app locally
bun run build            # Build web app
bun run lint             # Lint all packages
bun run type-check       # TypeScript check
bun run clean            # Clean node_modules

# Testing install scripts
bash scripts/preflight.sh
bash install.sh --help
```

---

## Translation Guidelines (Ukrainian)

### Branch: `translate-ukrainian-acfs`

**Scope:**
1. README.md - main documentation
2. apps/web/ - wizard UI (user-facing text)
3. Error messages in scripts (user-facing only)

**Rules:**
- Keep technical terms in English: VPS, SSH, CLI, API, Ubuntu, curl, bash
- Keep command examples unchanged
- Keep file paths unchanged
- Keep code blocks unchanged
- Translate comments in code only if they are user-facing

**Naming:**
- Ukrainian files: `README.uk.md`, `messages.uk.ts`
- Keep original files intact (English as default)

**Do NOT translate:**
- package.json, tsconfig.json, config files
- Variable names, function names
- Git commit messages (keep English)
- Internal developer comments

---

## Language Policy

| Context | Language |
|---------|----------|
| Communication | Ukrainian |
| Code (variables, functions) | English |
| User-facing UI | Ukrainian (in translation branch) |
| Technical docs | English (primary), Ukrainian (translation) |
| Git commits | English |

---

## Key Files

- `install.sh` - Main installer entry point
- `packages/manifest/` - Tool definitions (source of truth)
- `apps/web/src/` - Next.js wizard components
- `scripts/services-setup.sh` - Core service installation

---

## Development Notes

- **Monorepo:** Bun workspaces
- **Web framework:** Next.js 16
- **Installer:** Bash (idempotent, resumable)
- **State:** URL params + localStorage (web), file-based (scripts)

---

## Red Flags

- Never modify manifest without understanding downstream effects
- Scripts must remain idempotent
- Test on fresh Ubuntu VM before merging installer changes
- Keep install.sh as minimal bootstrapper (delegates to scripts/)
