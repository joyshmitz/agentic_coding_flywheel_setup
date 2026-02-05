# Детальний опис: Infrastructure

## Зміст

- [Language Runtimes](#language-runtimes)
  - [Bun](#bun)
  - [uv](#uv)
  - [Rust](#rust)
  - [Go](#go)
  - [Node.js](#nodejs)
- [Modern CLI Tools](#modern-cli-tools)
- [Cloud & Deployment](#cloud--deployment)
- [Specialized Utilities](#specialized-utilities)

---

## Language Runtimes

### Bun

**Тип:** JavaScript Runtime
**CLI:** `bun`
**Документація:** [bun.sh](https://bun.sh)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Engine | JavaScriptCore |
| Speed | 4x faster than Node.js |
| Compatibility | Node.js APIs |

#### Функціонал та можливості

- Package manager (faster than npm/yarn)
- Test runner
- Bundler
- TypeScript support native

#### Приклади застосування

```bash
# Install dependencies
bun install

# Run script
bun run dev

# Test
bun test

# Build
bun build src/index.ts --outdir dist
```

---

### uv

**Тип:** Python Tooling
**CLI:** `uv`
**Документація:** [github.com/astral-sh/uv](https://github.com/astral-sh/uv)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Speed | 10-100x faster than pip |
| Compatibility | pip, virtualenv |
| Language | Rust |

#### Функціонал та можливості

- Virtual environment creation
- Package installation
- Dependency resolution
- Lock files

#### Приклади застосування

```bash
# Create venv
uv venv

# Install package
uv pip install requests

# Sync from requirements
uv pip sync requirements.txt
```

---

### Rust

**Тип:** Systems Language
**CLI:** `cargo`, `rustc`
**Документація:** [rust-lang.org](https://www.rust-lang.org)

#### Технічні характеристики

| Параметр | Значення |
|----------|----------|
| Channel | Nightly |
| Target | Multi-platform |

#### Приклади застосування

```bash
# New project
cargo new project-name

# Build
cargo build --release

# Test
cargo test

# Run
cargo run
```

---

### Go

**Тип:** Systems Language
**CLI:** `go`
**Документація:** [go.dev](https://go.dev)

#### Приклади застосування

```bash
# Run
go run main.go

# Build
go build -o app

# Test
go test ./...

# Get dependency
go get github.com/pkg/errors
```

---

### Node.js

**Тип:** JavaScript Runtime
**CLI:** `node`, `npm`
**Документація:** [nodejs.org](https://nodejs.org)

Встановлюється через nvm для version management.

```bash
# Install version
nvm install 20

# Use version
nvm use 20

# List versions
nvm list
```

---

## Modern CLI Tools

### Quick Reference

| Tool | CLI | Замінює | Опис |
|------|-----|---------|------|
| ripgrep | `rg` | grep | Fast content search |
| fd | `fd` | find | Fast file finder |
| bat | `bat` | cat | Syntax highlighting |
| eza | `eza` | ls | Modern ls |
| zoxide | `z` | cd | Smart cd |
| fzf | `fzf` | — | Fuzzy finder |
| btop | `btop` | top | System monitor |
| dust | `dust` | du | Disk usage |
| Lazygit | `lazygit` | git | Git TUI |
| Lazydocker | `lazydocker` | docker | Docker TUI |
| jq | `jq` | — | JSON processor |
| Atuin | `atuin` | history | Shell history |
| tmux | `tmux` | screen | Terminal multiplexer |
| Neovim | `nvim` | vim | Text editor |

---

## Cloud & Deployment

### Quick Reference

| Tool | CLI | Service | Опис |
|------|-----|---------|------|
| Vercel CLI | `vercel` | Vercel | Next.js deployment |
| Wrangler | `wrangler` | Cloudflare | Edge workers |
| Supabase | `supabase` | Supabase | Backend-as-a-service |
| Vault | `vault` | HashiCorp | Secrets management |

---

## Specialized Utilities

### Quick Reference

| Tool | CLI | Опис |
|------|-----|------|
| giil | `giil` | Download images from cloud links |
| csctf | `csctf` | Convert chat shares to files |
| xf | `xf` | Search X/Twitter archives |
| tru | `tru` | Token-optimized notation |
| rano | `rano` | Network observer for AI CLIs |
| mdwb | `mdwb` | Web to Markdown converter |
| s2p | `s2p` | Source code to prompt TUI |
| rust_proxy | `rust_proxy` | Transparent network proxy |
| aadc | `aadc` | ASCII diagram corrector |
| caut | `caut` | LLM usage tracker |

---

## Наступні кроки

- **AI Agents:** [02a: AI Agents та координація](./02a-tools-ai-agents.md)
- **ACFS Stack:** [02b: Safety, Tasks, Analysis](./02b-tools-acfs-stack.md)
- **Інтеграції:** [Блок 3: Взаємозв'язки](./03-tool-integrations.md)
- **Робочі процеси:** [Блок 4: Workflows](./04-workflows.md)

---

*Див. також: [Огляд](./01-tools-overview.md) | [README](./README.md)*
