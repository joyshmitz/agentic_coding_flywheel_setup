# Conflict Matrix: File Ownership & Coordination

## 🔒 CRITICAL FILE OWNERSHIP TABLE

| File Path | Primary Agent | Secondary Agent | Conflict Type | Resolution |
|-----------|---------------|-----------------|---------------|------------|
| **apps/web/components/jargon.tsx** | Agent 2 | Agent 3 | Sequential | 2→3 handoff |
| **apps/web/app/page.tsx** | Agent 4,5 | None | Line-based | Section split |
| **apps/web/components/flywheel-visualization.tsx** | Agent 1 | Agent 7 | Temporal | 1→7 sequence |
| **apps/web/lib/i18n/translations.ts** | Multiple | None | Additive | Append-only |

---

## 🚨 HIGH-RISK FILE CONFLICTS

### 1. jargon.tsx - Sequential Handoff Required
**File:** `apps/web/components/jargon.tsx`
```
Agent 2 (0-30min): Hydration logic ──handoff──> Agent 3 (30-75min): i18n messages
```

**Conflict Prevention:**
- **Agent 2 scope:** Hydration guard, mounted state check ONLY
- **Agent 3 scope:** i18n imports, message variables, string replacement
- **Handoff protocol:** Agent 2 signals "🔥 HYDRATION STABLE" before Agent 3 starts

**Risk Level:** 🔴 HIGH (same file, different aspects)

### 2. flywheel-visualization.tsx - Temporal Sequence Critical
**File:** `apps/web/components/flywheel-visualization.tsx`
```
Agent 1 (45-75min): CSS classes ──sequential──> Agent 7 (75-120min): JS strings
```

**Conflict Prevention:**
- **Agent 1 scope:** CSS classes, Tailwind utilities, line 636 spacing
- **Agent 7 scope:** JS strings, popup content, message imports
- **Critical coordination:** Agent 7 MUST preserve Agent 1's CSS changes

**Example Safe Progression:**
```typescript
// Agent 1 changes (line 636):
<div className="mb-4 flex items-center"> → <div className="mb-6 md:mb-8 flex items-center">

// Agent 7 adds (same file, different lines):
import { getFlywheelMessages } from '@/lib/i18n/translations';
const messages = getFlywheelMessages(locale);
```

**Risk Level:** 🟡 MEDIUM (same file, different aspects, clear sequence)

---

## ✅ MEDIUM-RISK FILE COORDINATION

### 3. page.tsx - Line-Based Section Split
**File:** `apps/web/app/page.tsx`
```
Agent 4 (lines ~150-200): Hero section ∥ Agent 5 (lines 443+): Data arrays
```

**Section Ownership:**
- **Agent 4:** Hero subtitle, renderHeroSubtitle(), import Jargon
- **Agent 5:** WORKFLOW_STEPS, FOR_YOU_ITEMS, NOT_FOR_YOU_ITEMS, PRICING_ITEMS

**Conflict Prevention:**
- **Non-overlapping line ranges** - safe parallel work
- **Different imports:** Agent 4 (Jargon), Agent 5 (getHome* functions)
- **Different variables:** No shared state

**Risk Level:** 🟢 LOW (same file, different sections, parallel safe)

### 4. translations.ts - Additive Append Pattern
**File:** `apps/web/lib/i18n/translations.ts`
```
Multiple Agents: Additive exports only
```

**Append-Only Strategy:**
- **Agent 3:** getJargonMessages()
- **Agent 5:** getHomeWorkflowSteps(), getHomeEligibility(), getHomePricing()
- **Agent 6:** getComponentLabels()
- **Agent 7:** (uses existing getFlywheelMessages())

**Conflict Prevention:**
- **Append at end of file** only
- **Unique function names** - no overwrites
- **Standard import pattern** - consistent structure

**Risk Level:** 🟢 LOW (additive only, no overwrites)

---

## 🔐 EXCLUSIVE FILE OWNERSHIP

### Zero-Conflict Files (Single Agent)
| Agent | Exclusive Files | Description |
|-------|----------------|-------------|
| **Agent 1** | Build system, CSS files | `.next/`, cache, CSS utilities |
| **Agent 3** | `lib/jargon-messages.*` | New message files |
| **Agent 5** | `lib/home-*.*` | New home page message files |
| **Agent 6** | `lib/component-labels.*` | New UI component messages |
| **Agent 6** | `components/stepper.tsx` | UI component localization |
| **Agent 6** | `components/command-card.tsx` | UI component localization |
| **Agent 8** | Test results, validation | Integration testing outputs |

---

## ⚡ CONFLICT RESOLUTION PROTOCOLS

### Protocol 1: Sequential File Handoff
**Used for:** jargon.tsx (Agent 2→3), flywheel-visualization.tsx (Agent 1→7)

```bash
# Step 1: Primary agent completes work
Agent_Primary: "Work complete, file ready for handoff"

# Step 2: Signal broadcast
Agent_Primary: Broadcast specific signal (e.g., "🔥 HYDRATION STABLE")

# Step 3: Secondary agent acknowledges
Agent_Secondary: "Signal received, starting work"

# Step 4: Secondary agent preserves primary changes
Agent_Secondary: Verify primary agent changes intact before adding own
```

### Protocol 2: Parallel Section Work
**Used for:** page.tsx (Agent 4∥5)

```bash
# No coordination needed - different line ranges
Agent_4: Work on lines ~150-200 (hero)
Agent_5: Work on lines 443+ (arrays)
# Natural separation, no conflicts possible
```

### Protocol 3: Additive Append
**Used for:** translations.ts (Multiple agents)

```bash
# Standard append pattern
1. Add imports at top (group together)
2. Add functions at end (before existing closing)
3. Use unique function names
4. Consistent formatting
```

---

## 🚨 CONFLICT ESCALATION MATRIX

### Conflict Severity Levels:

#### 🔴 CRITICAL (Production Breaking)
- **File corruption or loss**
- **TypeScript compilation failures**
- **Complete feature breakage**

**Escalation:** Immediate stop, manual resolution required

#### 🟡 HIGH (Feature Impairment)
- **Partial functionality loss**
- **Performance degradation >20%**
- **UI consistency breaking**

**Escalation:** Agent coordination required, fallback plan

#### 🟢 MEDIUM (Cosmetic/Minor)
- **Styling inconsistencies**
- **Translation quality issues**
- **Minor UX improvements needed**

**Escalation:** Note for future improvement, proceed

### Conflict Resolution Hierarchy:
1. **Automated prevention** (file ownership, signaling)
2. **Agent coordination** (manual communication)
3. **Manual intervention** (human oversight)
4. **Rollback protocol** (revert to last stable state)

---

## 📊 FILE MODIFICATION TIMELINE

### Phase 1 (15-45min):
```
Agent 1: Build system files, CSS utilities
Agent 2: jargon.tsx (hydration logic only)
```

### Phase 2 (45-120min):
```
Agent 1: CSS classes in multiple .tsx files
Agent 3: jargon.tsx (i18n), new jargon-messages.*
Agent 4: page.tsx (hero section)
Agent 5: page.tsx (data arrays), new home-*.*
Agent 6: stepper.tsx, command-card.tsx, new component-labels.*
Agent 7: flywheel-visualization.tsx (after Agent 1)
```

### Phase 3 (120-150min):
```
Agent 8: No file modifications, testing only
```

---

## ✅ CONFLICT PREVENTION CHECKLIST

### Before Agent Starts:
- [ ] Verify dependencies satisfied (wait for signals)
- [ ] Confirm file ownership rights
- [ ] Understand scope limitations
- [ ] Know conflict resolution protocol

### During Agent Work:
- [ ] Stay within assigned file sections
- [ ] Preserve other agents' changes
- [ ] Use assigned variable/function names
- [ ] Follow append-only patterns where applicable

### After Agent Completes:
- [ ] Verify no overwrites occurred
- [ ] Test integration points
- [ ] Signal completion to dependent agents
- [ ] Document any deviations from plan

### Emergency Protocol:
- [ ] Stop immediately if conflicts detected
- [ ] Notify affected agents
- [ ] Implement rollback if necessary
- [ ] Manual coordination session

**РЕЗУЛЬТАТ:** Zero file conflicts через systematic ownership management та clear coordination protocols