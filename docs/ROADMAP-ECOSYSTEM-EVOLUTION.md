# ACFS Ecosystem Evolution Roadmap

> **Status:** Draft for Review
> **Created:** 2026-01-02
> **Author:** Claude + Human collaboration
> **Branch:** `translate-ukrainian-acfs` (for now, will move to feature branch)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Ecosystem Landscape](#ecosystem-landscape)
4. [Design Philosophy & Principles](#design-philosophy--principles)
5. [Architecture Options](#architecture-options)
6. [Recommended Architecture: Hybrid](#recommended-architecture-hybrid)
7. [Technical Implementation](#technical-implementation)
8. [Automation Strategy](#automation-strategy)
9. [Phased Rollout Plan](#phased-rollout-plan)
10. [Open Questions](#open-questions)

---

## Executive Summary

ACFS потребує еволюції від статичного installer-focused проєкту до **living ecosystem platform** що:

- Автоматично синхронізується з upstream інструментами
- Підтримує альтернативні/конкуруючі інструменти (Gastown, Fabric, PAI)
- Надає personalized experience через maturity levels
- Інтегрує перевірені принципи з PAI (Personal AI Infrastructure)

**Ключове рішення:** Hybrid архітектура що поєднує:
- Journey-based progression (maturity levels)
- Two Loops methodology (PAI)
- Capability-centric tool organization
- Living documentation через auto-sync

---

## Current State Analysis

### What We Have

```
ACFS Website Structure (Current)
├── / (Homepage) - Marketing, CTAs
├── /wizard/* (13 steps) - Linear beginner flow
├── /learn/* (20 lessons) - Locked progression
├── /flywheel - Interactive visualization
├── /learn/commands - Command reference (MANUAL)
└── /learn/tools/[tool] - Tool pages (MANUAL)
```

### Pain Points

| Problem | Impact | Root Cause |
|---------|--------|------------|
| `commands.ts` manually maintained | Drift from manifest | No generation pipeline |
| New tools require manual integration | Slow adoption | No external-tools registry |
| No tool comparison | User confusion | Tool-centric, not capability-centric |
| Static version info | Outdated docs | No upstream sync |
| One-size-fits-all | Overwhelming for some | No maturity levels |

### Data Sources (Current)

```
acfs.manifest.yaml (SOURCE OF TRUTH)
       │
       ▼ (manual copy)
apps/web/lib/commands.ts (MANUAL, DRIFTS)
```

---

## Ecosystem Landscape

### Layer Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ LAYER 4: ORCHESTRATION                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Gastown (Steve Yegge) - Multi-agent coordination, 20-30 agents          │ │
│ │ Status: CANDIDATE | Deps: Go, Beads | Supersedes: ntm, agent_mail       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: PERSONAL AI                                                        │
│ ┌───────────────────────────────┐ ┌───────────────────────────────────────┐ │
│ │ Fabric (Daniel Miessler)      │ │ PAI (Daniel Miessler)                 │ │
│ │ Pattern library for prompts   │ │ Personal AI Operating System          │ │
│ │ Status: CANDIDATE             │ │ Status: WATCHING                      │ │
│ │ Deps: Go                      │ │ Deps: Bun, Fabric                     │ │
│ │ Relationship: COMPLEMENTARY   │ │ Relationship: COMPLEMENTARY           │ │
│ └───────────────────────────────┘ └───────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: AGENT TOOLS (Dicklesworthstone Stack)                              │
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐     │
│ │  ntm  │ │ cass  │ │  cm   │ │ mail  │ │  ubs  │ │  bv   │ │ caam  │     │
│ │ tmux  │ │search │ │memory │ │coord  │ │ bugs  │ │beads  │ │ auth  │     │
│ │STABLE │ │STABLE │ │STABLE │ │STABLE │ │STABLE │ │STABLE │ │STABLE │     │
│ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘     │
│ ┌───────┐                                                                   │
│ │  slb  │ Agent CLIs: cc (Claude), cod (Codex), gmi (Gemini)               │
│ │2-person│                                                                  │
│ │STABLE │                                                                   │
│ └───────┘                                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 1: FOUNDATION                                                         │
│ Shell: zsh, oh-my-zsh, p10k, tmux                                          │
│ Languages: bun, uv, rust, go, nvm                                          │
│ CLI: ripgrep, fd, fzf, bat, lsd, zoxide, atuin                             │
│ Cloud: wrangler, supabase, vercel, vault                                   │
│ Network: tailscale                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tool Relationships

```
POTENTIAL CONFLICTS & SUPERSESSIONS
───────────────────────────────────

Session Management:
  ntm (Layer 2) ◄──superseded by──► Gastown (Layer 4)
  Resolution: Namespace separation OR exclusive profiles

Agent Coordination:
  agent_mail (Layer 2) ◄──superseded by──► Gastown (Layer 4)
  Resolution: Gastown includes coordination features

Context/History:
  cass + cm (Layer 2) ◄──complements──► PAI Kai (Layer 3)
  Resolution: Can coexist, different purposes

Prompt Patterns:
  CLAUDE.md (local) ◄──complements──► Fabric (Layer 3)
  Resolution: Fabric = global patterns, CLAUDE.md = project-specific
```

---

## Design Philosophy & Principles

### Inspired by PAI (Personal AI Infrastructure)

```yaml
# ACFS Philosophy (adapted from PAI)

principles:
  1_two_loops:
    name: "Two Loops"
    source: "PAI Founding Principle #1"
    description: |
      Outer Loop: Current State → Desired State
      Inner Loop: OBSERVE → THINK → PLAN → BUILD → EXECUTE → VERIFY → LEARN
    application: |
      - /assess page helps users define current & desired state
      - Dashboard shows gap analysis
      - Progress tracked through inner loop phases

  2_scaffolding_over_model:
    name: "Scaffolding > Model"
    source: "PAI Founding Principle #3"
    description: |
      The system architecture matters more than which AI model you use.
      Well-designed infrastructure with basic models outperforms
      brilliant models with poor scaffolding.
    application: |
      - Foundation tools installed before agents
      - Can swap Claude/Codex/Gemini without rebuilding
      - Infrastructure is the product, not specific agents

  3_verifiability:
    name: "Verifiability is Everything"
    source: "PAI Founding Principle #1"
    description: |
      If you can't measure whether you succeeded, you can't improve.
    application: |
      - Health checks for every installed tool
      - Progress metrics on dashboard
      - VERIFY phase in every workflow

  4_progressive_disclosure:
    name: "Progressive Disclosure"
    source: "UX best practice + PAI Maturity Model"
    description: |
      Complexity appears when user is ready for it.
      Beginners see simplified view, experts see full power.
    application: |
      - Maturity levels gate advanced content
      - Optional tools clearly marked
      - Advanced tracks unlocked at Level 3+

  5_unix_philosophy:
    name: "UNIX Philosophy"
    source: "PAI Founding Principle #7"
    description: |
      Small, single-purpose tools that compose together.
      Do one thing well. Use text interfaces.
    application: |
      - Each tool solves one problem
      - Clear interfaces between layers
      - CLI-first design

  6_living_documentation:
    name: "Living Documentation"
    source: "DevOps best practice"
    description: |
      Documentation automatically updates with ecosystem changes.
      Single source of truth propagates everywhere.
    application: |
      - Commands generated from manifest
      - Versions synced from upstream
      - Health status reflects reality

  7_deterministic_over_probabilistic:
    name: "As Deterministic as Possible"
    source: "PAI Founding Principle #4"
    description: |
      While AI is probabilistic, infrastructure should minimize randomness
      through code, templates, and consistent processes.
    application: |
      - Checksums verify installers
      - Reproducible builds
      - Idempotent installation
```

### Maturity Model (ACFS AMM)

```
Level 0: FRESH START
├── State: No VPS, no tools
├── Goal: Get running
├── Tools: None
└── Unlock: Start wizard

Level 1: FOUNDATION
├── State: VPS configured, shell ready
├── Goal: Comfortable in terminal
├── Tools: zsh, tmux, modern CLI
├── Unlock: Complete wizard + lessons 1-6
└── Duration: ~1-2 days

Level 2: SOLO DEVELOPER
├── State: Using one AI agent productively
├── Goal: Ship code with AI assistance
├── Tools: cc/cod/gmi, ntm, basic workflow
├── Unlock: Complete lessons 7-12
└── Duration: ~1 week

Level 3: POWER USER
├── State: Multiple tools working together
├── Goal: Optimized personal workflow
├── Tools: cass, cm, ubs, agent_mail
├── Optional: Fabric patterns, PAI Kai
├── Unlock: Complete lessons 13-18
└── Duration: ~2-4 weeks

Level 4: ORCHESTRATOR
├── State: Multiple agents coordinated
├── Goal: Scale AI assistance
├── Tools: Gastown, advanced Beads
├── Unlock: Complete all lessons + evaluation
└── Duration: Ongoing

Level 5: ARCHITECT
├── State: Building custom infrastructure
├── Goal: Personalized AI operating system
├── Tools: Custom packs, self-hosted, automation
├── Unlock: Contributing to ecosystem
└── Duration: Ongoing mastery
```

---

## Architecture Options

### Option A: Capability-Centric

```
Organize by capabilities, not tools.
User asks "what do I want to do?" → System shows "here's how"

Pros:
  + User thinks in problems, not tools
  + Easy to add alternatives
  + Natural comparison structure

Cons:
  - Harder for beginners (need to know what they want)
  - Major site restructure needed
```

### Option B: Journey-Based (Maturity)

```
Progress through maturity levels like a game.
Each level unlocks new capabilities and tools.

Pros:
  + Clear progression, motivating
  + Naturally limits complexity for beginners
  + Gamification without excess

Cons:
  - Can feel "gatekeepy"
  - Some users want to skip levels
  - Careful balancing needed
```

### Option C: Two Loops Integration

```
Directly apply PAI methodology to UX.
Assessment → Gap Analysis → Iteration

Pros:
  + Deep philosophical foundation (PAI proven)
  + Verifiability built-in
  + Self-assessment helps personalization

Cons:
  - May be too "methodological" for beginners
  - Needs careful UX to not overwhelm
  - More complex implementation
```

### Option D: Ecosystem Observatory

```
Living dashboard showing real-time ecosystem status.
Versions, health, updates all visible.

Pros:
  + Real-time visibility
  + Auto-updates reflected immediately
  + Clear system health picture

Cons:
  - Needs backend for sync
  - May overwhelm beginners
  - More infrastructure
```

### Option E: HYBRID (RECOMMENDED)

```
Combine best of all approaches:
- Journey-based for progression (B)
- Two Loops for methodology (C)
- Capability view for exploration (A)
- Observatory for visibility (D)

Multiple entry points based on user type:
- "I'm new" → Wizard (existing)
- "I'm using ACFS" → Assessment + Dashboard
- "I want to explore" → Observatory + Capabilities
```

---

## Recommended Architecture: Hybrid

### Site Structure (New)

```
/                           Homepage (unchanged)
│
├── /start                  NEW: Entry point router
│   ├── ?new=true          → Redirect to Wizard
│   ├── ?assess=true       → Redirect to Assessment
│   └── ?explore=true      → Redirect to Observatory
│
├── /wizard/*               EXISTING: 13-step wizard (Level 0→1)
│
├── /assess                 NEW: Two Loops Assessment
│   ├── /current           Current state questionnaire
│   ├── /desired           Goal setting interface
│   └── /gap               Gap analysis + recommendations
│
├── /dashboard              NEW: Unified personal dashboard
│   ├── /level             Maturity level + progress
│   ├── /health            Installation health check
│   └── /actions           Recommended next actions
│
├── /observatory            NEW: Ecosystem explorer
│   ├── /tools             All tools organized by layer
│   ├── /capabilities      Capability-centric view
│   ├── /updates           Recent ecosystem changes
│   └── /compare           Tool comparison matrices
│
├── /learn/*                ENHANCED: Learning hub
│   ├── Unlocks based on level
│   ├── Optional tracks for Level 3+
│   └── External tool lessons (Fabric, Gastown)
│
├── /flywheel               ENHANCED: Visualization
│   └── Connected to observatory data
│
└── /docs/*                 EXISTING: Documentation
```

### Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACFS DASHBOARD                                    [Settings] [Help]        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  YOUR LEVEL     │  │  ECOSYSTEM      │  │  NEXT ACTIONS   │             │
│  │  ████████░░ 2/5 │  │  🟢 12 tools    │  │  • Update ntm   │             │
│  │  Solo Developer │  │  ⚠️ 2 updates   │  │  • Try cass     │             │
│  │  [View Path]    │  │  [View All]     │  │  • Lesson 13    │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  TWO LOOPS PROGRESS                                                 │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  Current State              →              Desired State            │   │
│  │  ┌─────────────────────┐         ┌─────────────────────┐           │   │
│  │  │ Solo dev with       │         │ Multi-agent         │           │   │
│  │  │ Claude Code         │         │ coordination        │           │   │
│  │  └─────────────────────┘         └─────────────────────┘           │   │
│  │                                                                     │   │
│  │  Gap: Need cass, cm, consider Gastown                              │   │
│  │                                                                     │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│   │
│  │  │OBSERVE │→│ THINK  │→│ PLAN   │→│ BUILD  │→│ VERIFY │→│ LEARN  ││   │
│  │  │   ✓    │ │   ✓    │ │   ●    │ │        │ │        │ │        ││   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘│   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  RECENT ACTIVITY                                                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  • Completed lesson "NTM Core" (2 hours ago)                       │   │
│  │  • Updated bun to v1.1.38 (yesterday)                              │   │
│  │  • ntm v1.2.0 available - new palette commands (new!)              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Observatory Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ECOSYSTEM OBSERVATORY                              Last sync: 2 min ago   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [All Tools] [By Layer] [By Capability] [Updates] [Compare]                │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│  LAYER 4: ORCHESTRATION                                                     │
│  ═══════════════════════════════════════════════════════════════════════   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ⚪ gastown                                                         │   │
│  │     Multi-agent orchestration (20-30 agents)                       │   │
│  │     Status: CANDIDATE | v0.3.2 | Go                                │   │
│  │     [Learn More] [Install] [Compare with ntm]                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│  LAYER 3: PERSONAL AI                                                       │
│  ═══════════════════════════════════════════════════════════════════════   │
│  ┌──────────────────────────────┐  ┌──────────────────────────────────┐   │
│  │  ⚪ fabric                   │  │  ⚪ PAI                          │   │
│  │     AI prompt patterns       │  │     Personal AI OS              │   │
│  │     CANDIDATE | v1.4.57      │  │     WATCHING | v2.1             │   │
│  │     [Learn] [Install]        │  │     [Learn] [Evaluate]          │   │
│  └──────────────────────────────┘  └──────────────────────────────────┘   │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│  LAYER 2: AGENT TOOLS                                                       │
│  ═══════════════════════════════════════════════════════════════════════   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │🟢 ntm  │ │🟢 cass │ │🟢 cm   │ │🟢 mail │ │🟢 ubs  │ │🟢 bv   │        │
│  │ v1.2.0 │ │ v0.9.1 │ │ v0.5.0 │ │ v1.0.0 │ │ v2.1.0 │ │ v0.8.0 │        │
│  │STABLE  │ │STABLE  │ │STABLE  │ │STABLE  │ │STABLE  │ │STABLE  │        │
│  │[Yours] │ │[Yours] │ │        │ │[Yours] │ │[Yours] │ │[Yours] │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│  LAYER 1: FOUNDATION (12 tools installed, all healthy)                     │
│  ═══════════════════════════════════════════════════════════════════════   │
│  [Expand to see all foundation tools...]                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### New Files Structure

```
packages/manifest/
├── src/
│   ├── generate.ts          # EXISTING: bash script generation
│   ├── generate-web.ts      # NEW: web assets generation
│   └── types.ts             # ENHANCED: add lifecycle, capabilities
│
├── external-tools.yaml      # NEW: external ecosystem registry
├── capabilities.yaml        # NEW: capability definitions
└── profiles.yaml            # NEW: installation profiles

apps/web/
├── lib/
│   ├── generated/           # NEW: auto-generated from manifest
│   │   ├── commands.ts      # Generated commands list
│   │   ├── ecosystem.ts     # Generated ecosystem data
│   │   └── capabilities.ts  # Generated capability mappings
│   │
│   ├── maturity/            # NEW: maturity system
│   │   ├── levels.ts        # Level definitions
│   │   ├── progress.ts      # Progress tracking
│   │   └── requirements.ts  # Level requirements
│   │
│   └── two-loops/           # NEW: Two Loops system
│       ├── phases.ts        # Phase definitions
│       ├── assessment.ts    # State assessment logic
│       └── recommendations.ts # Gap analysis

├── app/
│   ├── assess/              # NEW: Assessment pages
│   │   ├── page.tsx         # Assessment landing
│   │   ├── current/         # Current state
│   │   ├── desired/         # Desired state
│   │   └── gap/             # Gap analysis
│   │
│   ├── dashboard/           # NEW: Dashboard
│   │   └── page.tsx
│   │
│   └── observatory/         # NEW: Observatory
│       ├── page.tsx         # Overview
│       ├── tools/           # Tools by layer
│       ├── capabilities/    # Capability view
│       └── compare/         # Comparisons

├── components/
│   ├── level-badge.tsx      # NEW: Maturity level display
│   ├── two-loops-progress.tsx # NEW: Two Loops visualization
│   ├── tool-card.tsx        # NEW: Tool display card
│   └── ecosystem-status.tsx # NEW: Real-time status
```

### Schema Extensions

```typescript
// packages/manifest/src/types.ts (additions)

interface ModuleLifecycle {
  status: 'alpha' | 'beta' | 'stable' | 'deprecated' | 'sunset';
  introduced: string;        // ISO date
  deprecated_at?: string;    // ISO date
  sunset_at?: string;        // ISO date
  migration_to?: string;     // module ID to migrate to
}

interface ModuleAlternative {
  id: string;
  relationship: 'superset' | 'subset' | 'equivalent' | 'complementary';
  migration_effort: 'low' | 'medium' | 'high';
  notes?: string;
}

interface ModuleUpstream {
  repo: string;
  branch: string;
  sync_files?: Array<{
    source: string;
    dest: string | null;  // null = version check only
  }>;
  check_interval: 'daily' | 'weekly' | 'on-release';
  auto_update_checksums: boolean;
}

interface ModuleCapabilities {
  provides: string[];      // capability IDs this module provides
  supersedes?: string[];   // module IDs this replaces
}

// Extended Module interface
interface Module {
  // ... existing fields ...

  // NEW fields
  lifecycle?: ModuleLifecycle;
  alternatives?: ModuleAlternative[];
  upstream?: ModuleUpstream;
  capabilities?: ModuleCapabilities;

  // For web display
  cli_command?: string;     // e.g., "ntm"
  cli_aliases?: string[];   // e.g., ["cc", "claude"]
  cli_example?: string;     // e.g., 'ntm new myproject'
  cli_description?: string; // Short description for command ref
}
```

### External Tools Registry

```yaml
# packages/manifest/external-tools.yaml

external:
  gastown:
    source:
      repo: steveyegge/gastown
      type: github

    metadata:
      author: Steve Yegge
      license: MIT
      language: go
      homepage: https://github.com/steveyegge/gastown

    integration:
      layer: 4
      category: orchestration
      phase: 10

    dependencies:
      acfs: [lang.go, stack.beads_viewer]

    capabilities:
      provides: [session_management, agent_orchestration, work_persistence]
      supersedes: [stack.ntm, stack.mcp_agent_mail]

    install:
      method: go_install
      package: github.com/steveyegge/gastown/cmd/gt@latest
      post_install: "gt install ~/gt"

    verify:
      command: "gt --version"

    sync:
      track: [releases]
      auto_update: false

    lifecycle:
      status: candidate
      evaluation:
        criteria:
          - Stability with Claude Code
          - Performance with 10+ agents
          - Integration with existing Beads workflows

  fabric:
    source:
      repo: danielmiessler/fabric
      type: github

    metadata:
      author: Daniel Miessler
      license: MIT
      language: go
      homepage: https://github.com/danielmiessler/fabric

    integration:
      layer: 3
      category: patterns
      phase: 10

    dependencies:
      acfs: [lang.go]

    capabilities:
      provides: [prompt_patterns, multi_provider]
      relationship: complementary

    install:
      methods:
        - type: curl_bash
          url: https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.sh
          checksum: null  # TODO: add
        - type: go_install
          package: github.com/danielmiessler/fabric/cmd/fabric@latest
        - type: homebrew
          formula: fabric-ai

    verify:
      command: "fabric --version"

    config:
      setup_command: "fabric --setup"
      config_dir: "~/.config/fabric"
      env_vars:
        - ANTHROPIC_API_KEY
        - OPENAI_API_KEY

    sync:
      track: [releases, patterns]
      auto_update_patterns: true

    lifecycle:
      status: candidate

  pai:
    source:
      repo: danielmiessler/Personal_AI_Infrastructure
      type: github

    metadata:
      author: Daniel Miessler
      license: MIT
      language: typescript
      homepage: https://danielmiessler.com/blog/personal-ai-infrastructure

    integration:
      layer: 3
      category: personal_ai
      phase: 10

    dependencies:
      acfs: [lang.bun]
      external: [fabric]

    capabilities:
      provides: [context_tracking, personal_workflows, history_system]
      relationship: complementary

    install:
      method: bun_script
      commands:
        - git clone https://github.com/danielmiessler/PAI.git ~/PAI
        - cd ~/PAI/Bundles/Kai && bun run install.ts

    components:
      - name: kai
        description: History and context tracking (Kai History System)
        path: Features/Kai

    lifecycle:
      status: watching
      notes: "Monitoring for maturity before candidate status"
```

### Capabilities Registry

```yaml
# packages/manifest/capabilities.yaml

capabilities:
  session_management:
    name: "Session Management"
    description: "Manage terminal sessions for agent workflows"
    icon: "terminal"
    providers:
      - module: stack.ntm
        layer: 2
        features: [named-sessions, palettes, agent-focus]
        maturity: stable

      - module: external.gastown
        layer: 4
        features: [named-sessions, multi-agent, crash-recovery, molecules]
        maturity: candidate
        supersedes: [stack.ntm]

    default: stack.ntm

  agent_orchestration:
    name: "Agent Orchestration"
    description: "Coordinate multiple AI agents working together"
    icon: "users"
    providers:
      - module: stack.mcp_agent_mail
        layer: 2
        features: [messaging, mailboxes, mcp-protocol]
        maturity: stable

      - module: external.gastown
        layer: 4
        features: [20-30-agents, work-persistence, molecules]
        maturity: candidate
        supersedes: [stack.mcp_agent_mail]

    default: stack.mcp_agent_mail

  context_tracking:
    name: "Context & History"
    description: "Track work history, decisions, and learnings"
    icon: "history"
    providers:
      - module: stack.cass
        layer: 2
        features: [session-search, full-text]
        maturity: stable

      - module: stack.cm
        layer: 2
        features: [procedural-memory, agent-context]
        maturity: stable

      - module: external.pai.kai
        layer: 3
        features: [auto-capture, decisions, learnings, git-backed]
        maturity: watching
        relationship: complementary

    default: [stack.cass, stack.cm]

  prompt_patterns:
    name: "Prompt Patterns"
    description: "Reusable AI prompt templates"
    icon: "file-text"
    providers:
      - module: local.claude_md
        layer: 2
        features: [project-specific, agent-instructions]
        maturity: stable

      - module: external.fabric
        layer: 3
        features: [pattern-library, multi-provider, rest-api]
        maturity: candidate
        relationship: complementary

    default: local.claude_md

  code_analysis:
    name: "Code Analysis"
    description: "Static analysis and bug scanning"
    icon: "search"
    providers:
      - module: stack.ultimate_bug_scanner
        layer: 2
        features: [multi-language, guardrails, easy-mode]
        maturity: stable

    default: stack.ultimate_bug_scanner
```

### Generation Pipeline

```typescript
// packages/manifest/src/generate-web.ts

import { parseManifestFile } from './parser';
import { readExternalTools } from './external';
import { readCapabilities } from './capabilities';
import type { Module, ExternalTool, Capability } from './types';

interface GeneratedCommands {
  commands: WebCommand[];
  categories: CommandCategory[];
  generatedAt: string;
}

interface GeneratedEcosystem {
  layers: Layer[];
  tools: EcosystemTool[];
  updates: RecentUpdate[];
  generatedAt: string;
}

export async function generateWebAssets(outputDir: string): Promise<void> {
  const manifest = await parseManifestFile('acfs.manifest.yaml');
  const external = await readExternalTools('external-tools.yaml');
  const capabilities = await readCapabilities('capabilities.yaml');

  // 1. Generate commands.ts
  const commands = generateCommands(manifest, external);
  await writeTypeScript(`${outputDir}/commands.ts`, commands);

  // 2. Generate ecosystem.ts
  const ecosystem = generateEcosystem(manifest, external);
  await writeTypeScript(`${outputDir}/ecosystem.ts`, ecosystem);

  // 3. Generate capabilities.ts
  const caps = generateCapabilities(capabilities, manifest, external);
  await writeTypeScript(`${outputDir}/capabilities.ts`, caps);

  console.log(`Generated web assets to ${outputDir}`);
}

function generateCommands(
  manifest: Manifest,
  external: ExternalTool[]
): GeneratedCommands {
  const commands: WebCommand[] = [];

  // From manifest modules
  for (const module of manifest.modules) {
    if (module.cli_command) {
      commands.push({
        name: module.cli_command,
        fullName: module.description,
        description: module.cli_description || module.description,
        category: mapCategory(module.category),
        example: module.cli_example || `${module.cli_command} --help`,
        aliases: module.cli_aliases,
        docsUrl: module.docs_url,
        moduleId: module.id,
        lifecycle: module.lifecycle?.status || 'stable',
      });
    }
  }

  // From external tools
  for (const tool of external) {
    if (tool.cli_command) {
      commands.push({
        name: tool.cli_command,
        fullName: tool.metadata.name,
        description: tool.description,
        category: 'external',
        example: tool.cli_example,
        docsUrl: tool.metadata.homepage,
        externalId: tool.id,
        lifecycle: tool.lifecycle.status,
        layer: tool.integration.layer,
      });
    }
  }

  return {
    commands,
    categories: COMMAND_CATEGORIES,
    generatedAt: new Date().toISOString(),
  };
}
```

---

## Automation Strategy

### Upstream Sync Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      UPSTREAM SYNC ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────────┘

                         GitHub Actions (scheduled)
                                   │
         ┌─────────────────────────┼─────────────────────────────┐
         ▼                         ▼                             ▼
┌─────────────────┐     ┌─────────────────┐          ┌─────────────────┐
│ CHECK VERSIONS  │     │ VERIFY CHECKSUMS│          │ FETCH PATTERNS  │
│                 │     │                 │          │                 │
│ • ntm releases  │     │ • Download      │          │ • Fabric        │
│ • cass releases │     │   installers    │          │   patterns      │
│ • fabric        │     │ • Calculate     │          │ • NTM palette   │
│ • gastown       │     │   SHA256        │          │                 │
│ • PAI           │     │ • Compare       │          │                 │
└────────┬────────┘     └────────┬────────┘          └────────┬────────┘
         │                       │                             │
         └───────────────────────┼─────────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   ANALYZE CHANGES       │
                    │                         │
                    │   • Breaking changes?   │
                    │   • New capabilities?   │
                    │   • Deprecations?       │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
           ┌─────────────────┐     ┌─────────────────┐
           │   SAFE UPDATES  │     │ REVIEW NEEDED   │
           │                 │     │                 │
           │ Auto-merge PR   │     │ Draft PR with   │
           │ • checksums     │     │ • breaking info │
           │ • patterns      │     │ • migration     │
           │ • minor vers    │     │ • eval needed   │
           └─────────────────┘     └─────────────────┘
```

### GitHub Action

```yaml
# .github/workflows/upstream-sync.yml

name: Upstream Sync

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6:00 UTC
  workflow_dispatch:
    inputs:
      tools:
        description: 'Comma-separated tool names (empty = all)'
        required: false

jobs:
  check-upstream:
    runs-on: ubuntu-latest
    outputs:
      has_updates: ${{ steps.check.outputs.has_updates }}
      updates_json: ${{ steps.check.outputs.updates_json }}

    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Check upstream versions
        id: check
        run: |
          bun run scripts/ci/check-upstream.ts \
            --tools "${{ github.event.inputs.tools }}" \
            --output github

  update-safe:
    needs: check-upstream
    if: needs.check-upstream.outputs.has_updates == 'true'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v1

      - name: Apply safe updates
        run: |
          bun run scripts/ci/apply-updates.ts \
            --updates '${{ needs.check-upstream.outputs.updates_json }}' \
            --safe-only

      - name: Regenerate web assets
        run: bun run packages/manifest/generate:web

      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          title: "chore(deps): upstream sync"
          branch: auto/upstream-sync
          labels: automated, dependencies
          body: |
            ## Automated Upstream Sync

            Updates detected and applied:
            ${{ needs.check-upstream.outputs.updates_json }}

            This PR was automatically generated.
```

### Checksum Verification

```bash
# scripts/ci/verify-checksums.sh

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

source "$PROJECT_ROOT/scripts/lib/security.sh"

# Parse checksums.yaml
while IFS= read -r line; do
    if [[ $line =~ ^[[:space:]]+url:[[:space:]]+\"(.+)\"$ ]]; then
        current_url="${BASH_REMATCH[1]}"
    elif [[ $line =~ ^[[:space:]]+sha256:[[:space:]]+\"(.+)\"$ ]]; then
        expected_sha="${BASH_REMATCH[1]}"

        # Verify
        actual_sha=$(acfs_curl "$current_url" | calculate_sha256)

        if [[ "$actual_sha" != "$expected_sha" ]]; then
            echo "MISMATCH: $current_url"
            echo "  Expected: $expected_sha"
            echo "  Actual:   $actual_sha"
            exit 1
        else
            echo "OK: $current_url"
        fi
    fi
done < "$PROJECT_ROOT/checksums.yaml"

echo "All checksums verified."
```

---

## Phased Rollout Plan

### Phase 1: Foundation (Week 1-2)

```
GOAL: Enable auto-generation pipeline

Tasks:
□ Create external-tools.yaml with Gastown, Fabric, PAI
□ Extend types.ts with lifecycle, capabilities fields
□ Create generate-web.ts script
□ Generate commands.ts from manifest (replace manual)
□ Add CLI fields to relevant modules in manifest
□ CI: Add generation step to build

Deliverables:
- commands.ts auto-generated
- No manual command maintenance needed
- Foundation for future automation

Validation:
- bun run generate:web produces valid output
- Website builds successfully with generated files
- No regression in command display
```

### Phase 2: Registry & Tracking (Week 3-4)

```
GOAL: Track external ecosystem

Tasks:
□ Create capabilities.yaml
□ Create profiles.yaml
□ Add Gastown, Fabric, PAI to external-tools.yaml
□ Create check-upstream.ts script
□ GitHub Action for daily version checks
□ Notification on new releases

Deliverables:
- External tools tracked
- Daily version monitoring
- PR created when updates available

Validation:
- Action runs successfully
- Detects new releases correctly
- PR contains useful information
```

### Phase 3: Observatory (Week 5-6)

```
GOAL: Ecosystem visibility on website

Tasks:
□ Create /observatory page structure
□ Tools by layer view
□ Capability-centric view
□ Tool comparison matrices
□ Integration with generated ecosystem.ts

Deliverables:
- /observatory/tools - all tools visible
- /observatory/capabilities - capability view
- /observatory/compare - comparison tables

Validation:
- All tools displayed correctly
- Layer organization clear
- Comparisons accurate
```

### Phase 4: Assessment & Dashboard (Week 7-8)

```
GOAL: Personalized experience

Tasks:
□ Create /assess pages (current, desired, gap)
□ Create /dashboard with Two Loops progress
□ Implement maturity level system
□ Level-based content unlocking in /learn
□ Recommendation engine for next actions

Deliverables:
- Working assessment flow
- Personal dashboard
- Level progression tracking

Validation:
- Assessment produces useful recommendations
- Dashboard reflects actual state
- Level unlocks work correctly
```

### Phase 5: Automation & Polish (Week 9-10)

```
GOAL: Self-maintaining system

Tasks:
□ Checksum auto-update workflow
□ Pattern sync for Fabric
□ Breaking change detection
□ Auto-PR for safe updates
□ Manual review queue for breaking changes
□ Documentation updates

Deliverables:
- Fully automated upstream sync
- Breaking changes flagged for review
- Living documentation

Validation:
- System maintains itself for 2+ weeks
- No manual intervention needed for routine updates
- Breaking changes caught and reviewed
```

### Phase 6: External Integration (Week 11-12)

```
GOAL: First-class external tool support

Tasks:
□ Gastown lesson content
□ Fabric lesson content
□ Installation guides for external tools
□ Profile selection in wizard
□ Migration guides (ntm → Gastown)

Deliverables:
- Users can install Gastown/Fabric
- Clear guidance on when to use what
- Migration path documented

Validation:
- Users successfully install external tools
- Confusion about tool choice reduced
- Feedback positive
```

---

## Open Questions

### Architecture Decisions Needed

1. **Profile Selection UX**
   - Where in wizard to show profile choice?
   - Default profile for new users?
   - Can users change profile later?

2. **Level Progression**
   - Hard gates or soft recommendations?
   - Can advanced users skip levels?
   - How to handle returning users?

3. **External Tool Evaluation**
   - Who evaluates candidates?
   - Criteria for promotion to stable?
   - How long in candidate status?

4. **Data Storage**
   - User progress: localStorage vs account?
   - Sync across devices?
   - Privacy considerations?

### Technical Decisions Needed

5. **Generation Timing**
   - Build-time only or runtime updates?
   - How often to regenerate?
   - Cache invalidation strategy?

6. **Health Checks**
   - Client-side or server-side?
   - How to check remote VPS state?
   - Real-time vs periodic?

7. **i18n for Generated Content**
   - Generate per-locale files?
   - Translation workflow for new content?
   - Fallback strategy?

### Product Decisions Needed

8. **Gastown Relationship**
   - Promote actively or just document?
   - When to recommend over ntm?
   - Who maintains integration?

9. **PAI Integration Depth**
   - Adopt Two Loops fully or partially?
   - Brand alignment considerations?
   - Attribution requirements?

10. **Monetization/Sustainability**
    - How does this scale?
    - Who maintains long-term?
    - Community contribution model?

---

## Appendix: Reference Links

### External Projects

- [Gastown](https://github.com/steveyegge/gastown) - Multi-agent orchestration
- [Fabric](https://github.com/danielmiessler/fabric) - AI prompt patterns
- [PAI](https://github.com/danielmiessler/Personal_AI_Infrastructure) - Personal AI Infrastructure
- [PAI Philosophy](https://danielmiessler.com/blog/personal-ai-infrastructure) - Design principles

### ACFS Resources

- [ACFS Manifest](./acfs.manifest.yaml) - Tool definitions
- [Checksums](./checksums.yaml) - Installer verification
- [Current Commands](./apps/web/lib/commands.ts) - Manual command list

### Inspiration

- [PAI Founding Principles](https://danielmiessler.com/blog/personal-ai-infrastructure) - 15 principles
- [Two Loops Methodology](https://danielmiessler.com/blog/personal-ai-infrastructure) - Iteration model
- [AI Maturity Model](https://danielmiessler.com/blog/personal-ai-infrastructure) - 5 levels

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2026-01-02 | Claude + Human | Initial draft |

---

*This document is a living roadmap. Update as decisions are made and implementation progresses.*
