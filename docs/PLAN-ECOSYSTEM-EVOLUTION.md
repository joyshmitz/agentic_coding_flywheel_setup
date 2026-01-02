# ACFS Ecosystem Evolution - Execution Plan

> **Status:** Ready for Review
> **Created:** 2026-01-02
> **Reference:** [ROADMAP-ECOSYSTEM-EVOLUTION.md](./ROADMAP-ECOSYSTEM-EVOLUTION.md)

---

## Quick Summary

**Мета:** Перетворити ACFS з статичного installer на living ecosystem platform

**Ключові зміни:**
1. Auto-generation pipeline (manifest → web)
2. External tools registry (Gastown, Fabric, PAI)
3. Maturity levels + Two Loops methodology
4. Observatory для ecosystem visibility
5. Automated upstream sync

**Timeline:** ~12 тижнів (3 місяці)

---

## Pre-Flight Checklist

Перед початком роботи:

- [ ] Review ROADMAP document
- [ ] Decide on open questions (see ROADMAP)
- [ ] Create feature branch: `feat/ecosystem-evolution`
- [ ] Set up project board for tracking

---

## Phase 1: Foundation (Week 1-2)

### Goal: Enable auto-generation pipeline

#### 1.1 Schema Extensions
```
packages/manifest/src/types.ts
```
- [ ] Add `ModuleLifecycle` interface
- [ ] Add `ModuleAlternative` interface
- [ ] Add `ModuleUpstream` interface
- [ ] Add `ModuleCapabilities` interface
- [ ] Extend `Module` interface with new fields
- [ ] Add CLI-specific fields: `cli_command`, `cli_aliases`, `cli_example`

#### 1.2 External Tools Registry
```
packages/manifest/external-tools.yaml (NEW)
```
- [ ] Create file structure
- [ ] Add Gastown entry (candidate)
- [ ] Add Fabric entry (candidate)
- [ ] Add PAI entry (watching)

#### 1.3 Web Generation Script
```
packages/manifest/src/generate-web.ts (NEW)
```
- [ ] Create script scaffold
- [ ] Implement `generateCommands()` function
- [ ] Implement `generateEcosystem()` function
- [ ] Add to package.json scripts: `generate:web`
- [ ] Test output validity

#### 1.4 Manifest CLI Fields
```
acfs.manifest.yaml
```
- [ ] Add `cli_command` to agents (cc, cod, gmi)
- [ ] Add `cli_command` to stack tools (ntm, cass, cm, etc.)
- [ ] Add `cli_command` to CLI tools (rg, fd, fzf, etc.)
- [ ] Add `cli_example` where helpful
- [ ] Add `cli_aliases` where applicable

#### 1.5 Replace Manual Commands
```
apps/web/lib/generated/ (NEW directory)
```
- [ ] Create directory
- [ ] Generate `commands.ts`
- [ ] Update imports in web app
- [ ] Delete old `apps/web/lib/commands.ts`
- [ ] Verify website builds

#### 1.6 CI Integration
```
.github/workflows/
```
- [ ] Add generation step to build workflow
- [ ] Fail build if generated files outdated
- [ ] Add `--check` mode to generation script

### Phase 1 Validation
- [ ] `bun run generate:web` produces valid TypeScript
- [ ] Website builds without errors
- [ ] Commands page displays correctly
- [ ] No regression in functionality

---

## Phase 2: Registry & Tracking (Week 3-4)

### Goal: Track external ecosystem

#### 2.1 Capabilities Registry
```
packages/manifest/capabilities.yaml (NEW)
```
- [ ] Create file
- [ ] Define `session_management` capability
- [ ] Define `agent_orchestration` capability
- [ ] Define `context_tracking` capability
- [ ] Define `prompt_patterns` capability
- [ ] Define `code_analysis` capability

#### 2.2 Profiles Registry
```
packages/manifest/profiles.yaml (NEW)
```
- [ ] Create file
- [ ] Define `solo-developer` profile
- [ ] Define `power-user` profile
- [ ] Define `team-orchestration` profile
- [ ] Define `minimal` profile

#### 2.3 Upstream Check Script
```
scripts/ci/check-upstream.ts (NEW)
```
- [ ] Create script scaffold
- [ ] Implement GitHub release checking
- [ ] Implement checksum verification
- [ ] Implement change detection
- [ ] Output format for CI

#### 2.4 GitHub Action: Version Check
```
.github/workflows/upstream-sync.yml (NEW)
```
- [ ] Create workflow file
- [ ] Schedule daily at 6:00 UTC
- [ ] Add manual trigger option
- [ ] Implement safe update detection
- [ ] Create PR for updates

#### 2.5 Notification System
- [ ] Slack/Discord webhook for new releases (optional)
- [ ] GitHub issue creation for breaking changes
- [ ] Dashboard notification (for Phase 4)

### Phase 2 Validation
- [ ] Action runs on schedule
- [ ] Correctly detects upstream changes
- [ ] PRs created with useful information
- [ ] No false positives

---

## Phase 3: Observatory (Week 5-6)

### Goal: Ecosystem visibility on website

#### 3.1 Page Structure
```
apps/web/app/observatory/
```
- [ ] Create `page.tsx` (overview)
- [ ] Create `tools/page.tsx` (by layer)
- [ ] Create `capabilities/page.tsx`
- [ ] Create `compare/page.tsx`
- [ ] Create `updates/page.tsx`

#### 3.2 Components
```
apps/web/components/
```
- [ ] Create `ToolCard.tsx`
- [ ] Create `LayerSection.tsx`
- [ ] Create `CapabilityView.tsx`
- [ ] Create `ComparisonTable.tsx`
- [ ] Create `EcosystemStatus.tsx`
- [ ] Create `UpdatesFeed.tsx`

#### 3.3 Data Integration
```
apps/web/lib/generated/
```
- [ ] Generate `ecosystem.ts`
- [ ] Generate `capabilities.ts`
- [ ] Create hooks for data access
- [ ] Add real-time status indicators

#### 3.4 Navigation
- [ ] Add Observatory to main nav
- [ ] Add to mobile menu
- [ ] Link from homepage
- [ ] Link from relevant lessons

#### 3.5 Comparison Features
- [ ] ntm vs Gastown comparison
- [ ] cass vs PAI Kai comparison
- [ ] Feature matrix tables
- [ ] Use case recommendations

### Phase 3 Validation
- [ ] All tools visible with correct data
- [ ] Layer organization clear
- [ ] Comparisons accurate and helpful
- [ ] Mobile responsive

---

## Phase 4: Assessment & Dashboard (Week 7-8)

### Goal: Personalized experience

#### 4.1 Assessment Pages
```
apps/web/app/assess/
```
- [ ] Create `page.tsx` (landing)
- [ ] Create `current/page.tsx` (questionnaire)
- [ ] Create `desired/page.tsx` (goal setting)
- [ ] Create `gap/page.tsx` (analysis + recommendations)

#### 4.2 Maturity System
```
apps/web/lib/maturity/
```
- [ ] Create `levels.ts` (level definitions)
- [ ] Create `progress.ts` (tracking logic)
- [ ] Create `requirements.ts` (unlock rules)
- [ ] Create `storage.ts` (localStorage/persistence)

#### 4.3 Two Loops System
```
apps/web/lib/two-loops/
```
- [ ] Create `phases.ts` (7 phases)
- [ ] Create `assessment.ts` (state logic)
- [ ] Create `recommendations.ts` (gap analysis)

#### 4.4 Dashboard
```
apps/web/app/dashboard/
```
- [ ] Create `page.tsx`
- [ ] Level progress widget
- [ ] Ecosystem health widget
- [ ] Next actions widget
- [ ] Two Loops progress widget
- [ ] Recent activity widget

#### 4.5 Components
```
apps/web/components/
```
- [ ] Create `LevelBadge.tsx`
- [ ] Create `TwoLoopsProgress.tsx`
- [ ] Create `GapAnalysis.tsx`
- [ ] Create `RecommendationCard.tsx`
- [ ] Create `ProgressRing.tsx`

#### 4.6 Learn Hub Integration
- [ ] Level-based content unlocking
- [ ] Optional tracks for Level 3+
- [ ] Progress indicators per level
- [ ] "Your level" badge in header

### Phase 4 Validation
- [ ] Assessment produces useful recommendations
- [ ] Dashboard reflects actual state
- [ ] Level progression works correctly
- [ ] localStorage persists correctly

---

## Phase 5: Automation & Polish (Week 9-10)

### Goal: Self-maintaining system

#### 5.1 Checksum Automation
```
scripts/ci/
```
- [ ] Create `verify-checksums.sh`
- [ ] Create `update-checksums.ts`
- [ ] Integrate with upstream-sync workflow
- [ ] Auto-PR for checksum updates

#### 5.2 Pattern Sync
- [ ] Fabric patterns sync script
- [ ] NTM palette sync (enhance existing)
- [ ] Auto-update safe patterns
- [ ] Manual review for breaking

#### 5.3 Breaking Change Detection
```
scripts/ci/detect-breaking.ts (NEW)
```
- [ ] Parse CHANGELOG.md
- [ ] Detect major version bumps
- [ ] Flag API changes
- [ ] Generate migration notes

#### 5.4 PR Templates
```
.github/
```
- [ ] Template for safe updates
- [ ] Template for breaking changes
- [ ] Template for new tool candidates
- [ ] Labels configuration

#### 5.5 Documentation
- [ ] Update CONTRIBUTING.md
- [ ] Add ECOSYSTEM.md guide
- [ ] Document automation workflows
- [ ] Update README with ecosystem info

### Phase 5 Validation
- [ ] System self-maintains for 2+ weeks
- [ ] Breaking changes caught and flagged
- [ ] PRs informative and actionable
- [ ] Documentation complete

---

## Phase 6: External Integration (Week 11-12)

### Goal: First-class external tool support

#### 6.1 Gastown Integration
- [ ] Create lesson: "Introduction to Gastown"
- [ ] Create lesson: "Gastown vs NTM"
- [ ] Installation guide
- [ ] Migration guide (ntm → Gastown)
- [ ] Troubleshooting section

#### 6.2 Fabric Integration
- [ ] Create lesson: "Introduction to Fabric"
- [ ] Create lesson: "Using Patterns"
- [ ] Installation guide
- [ ] Pattern customization guide
- [ ] Integration with ACFS workflows

#### 6.3 Profile Selection
- [ ] Add profile choice to wizard
- [ ] Profile-based tool recommendations
- [ ] Profile switching UI
- [ ] Profile comparison page

#### 6.4 Migration Guides
- [ ] ntm → Gastown migration
- [ ] Adding Fabric to existing setup
- [ ] Upgrading maturity level
- [ ] Rollback procedures

#### 6.5 Community
- [ ] Contribution guide for new tools
- [ ] Evaluation criteria documentation
- [ ] Candidate promotion process
- [ ] Feedback collection mechanism

### Phase 6 Validation
- [ ] Users can install Gastown/Fabric successfully
- [ ] Clear guidance reduces confusion
- [ ] Migration paths work smoothly
- [ ] Positive user feedback

---

## Post-Launch

### Ongoing Maintenance
- [ ] Weekly upstream checks review
- [ ] Monthly tool evaluation review
- [ ] Quarterly roadmap review
- [ ] Community feedback triage

### Metrics to Track
- [ ] Tool adoption rates
- [ ] Level progression rates
- [ ] Assessment completion rates
- [ ] External tool installation success
- [ ] Support request topics

### Future Considerations
- [ ] More external tools (as discovered)
- [ ] API for health checks
- [ ] User accounts for progress sync
- [ ] Community contributions system

---

## Quick Reference: New Files

```
packages/manifest/
├── external-tools.yaml      # Phase 1
├── capabilities.yaml        # Phase 2
├── profiles.yaml            # Phase 2
└── src/
    └── generate-web.ts      # Phase 1

apps/web/
├── lib/
│   ├── generated/           # Phase 1
│   │   ├── commands.ts
│   │   ├── ecosystem.ts     # Phase 3
│   │   └── capabilities.ts  # Phase 3
│   ├── maturity/            # Phase 4
│   └── two-loops/           # Phase 4
└── app/
    ├── assess/              # Phase 4
    ├── dashboard/           # Phase 4
    └── observatory/         # Phase 3

scripts/ci/
├── check-upstream.ts        # Phase 2
├── verify-checksums.sh      # Phase 5
├── update-checksums.ts      # Phase 5
└── detect-breaking.ts       # Phase 5

.github/workflows/
└── upstream-sync.yml        # Phase 2
```

---

## Decision Log

Track decisions as they're made:

| Date | Decision | Rationale | Owner |
|------|----------|-----------|-------|
| TBD | Profile default | TBD | TBD |
| TBD | Level gating | TBD | TBD |
| TBD | Storage approach | TBD | TBD |

---

## Notes

_Use this space for ongoing notes during implementation:_

---

*Last updated: 2026-01-02*
