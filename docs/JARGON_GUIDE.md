# JargonText Usage Guide

> **Goal**: Make technical terminology accessible to beginners through interactive tooltips.

## 📚 Quick Reference

### ✅ DO: Use JargonText for prose explaining features

```tsx
// Good: Prose with technical terms
<p><JargonText>SSH is a protocol for secure server access. Your VPS includes built-in SSH support.</JargonText></p>

// Good: Multi-term explanation
<p><JargonText>Use tmux with CLI tools to manage your development environment efficiently.</JargonText></p>
```

### ❌ DON'T: Use JargonText in these contexts

```tsx
// Bad: Code/command examples
<code><JargonText>ssh user@host</JargonText></code>  // ❌ Don't wrap commands

// Bad: Terminal output
<pre><JargonText>$ echo "output"</JargonText></pre>  // ❌ Don't wrap output

// Bad: Already inside dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: "SSH <b>security</b>" }}>
  <JargonText>SSH security</JargonText>  // ❌ Dangerous
</div>

// Bad: HTML formatting inside JargonText
<JargonText>SSH is <strong>very</strong> important</JargonText>  // ❌ Won't work as expected
```

---

## 🎯 When to Use JargonText

### Use Case 1: Introduction/Benefit Descriptions

```tsx
// launch-onboarding/page.tsx
<p><JargonText>{messages.benefits}</JargonText></p>
// Example: "Your AI-powered development environment includes SSH access, tmux for terminal management..."
```

### Use Case 2: Educational Content

```tsx
// ssh-connect/page.tsx
<p className="text-muted-foreground">
  <JargonText>{messages.explanation}</JargonText>
</p>
// Example: "SSH (Secure Shell) provides encrypted access to your VPS..."
```

### Use Case 3: Warning/Alert Messages

```tsx
// status-check/page.tsx
<AlertCard variant="warning" title={messages.p10kWarning.title}>
  <p><JargonText>{messages.p10kWarning.intro}</JargonText></p>
</AlertCard>
```

---

## 🔧 Implementation Details

### Basic Usage (No Feature Flag)

```tsx
import { JargonText } from "@/components/jargon";

export function MyComponent() {
  return (
    <p>
      <JargonText>SSH and VPS terminology explained here.</JargonText>
    </p>
  );
}
```

**Behavior**: Always renders with tooltips (all users see tooltips)

### With Feature Flag (Phase 1/2/3 Rollout)

```tsx
import { JargonText } from "@/components/jargon";

export function LaunchOnboarding() {
  return (
    <p>
      <JargonText page="launch-onboarding">
        SSH and VPS terminology explained here.
      </JargonText>
    </p>
  );
}
```

**Behavior**:
- ✅ Phase 1 active (Day 1): Shows tooltips
- ✅ Phase 2 active (Day 3): Shows plain text (no tooltips)
- ✅ Phase 3 active (Day 5): Shows plain text (no tooltips)

Valid `page` values:
```tsx
type PageName =
  | 'launch-onboarding'      // Phase 1
  | 'ssh-connect'             // Phase 1
  | 'status-check'            // Phase 1
  | 'reconnect-ubuntu'        // Phase 2
  | 'verify-key-connection'   // Phase 2
  | 'preflight-check'         // Phase 2
  | 'install-terminal'        // Phase 3
  | 'create-vps'              // Phase 3
```

### Mixed JSX Content (Text + Elements)

```tsx
// Problem: JargonText doesn't handle JSX children
const bad = (
  <p>
    <JargonText>SSH connects to <code>server.com</code> securely</JargonText>
  </p>
);

// Solution 1: Wrap text segments separately
const good1 = (
  <p>
    <JargonText>SSH connects to </JargonText>
    <code>server.com</code>
    <JargonText> securely</JargonText>
  </p>
);

// Solution 2: Use Jargon component for individual terms
import { Jargon } from "@/components/jargon";

const good2 = (
  <p>
    <Jargon term="ssh">SSH</Jargon> connects to
    <code>server.com</code> securely
  </p>
);
```

---

## ⚠️ Edge Cases

### Case 1: Compound Terms (Windows Terminal, GNOME Terminal)

**Problem**: Generic pattern "terminal" will match inside "Windows Terminal"

**Solution**: Compound terms have priority in defaultJargonMappings

```tsx
// lib/jargon.ts
export const defaultJargonMappings = [
  // Compound terms (priority: high) - matched first
  { pattern: "Windows Terminal", term: "windows-terminal" },
  { pattern: "GNOME Terminal", term: "gnome-terminal" },

  // Generic terms (priority: normal) - matched after
  { pattern: "terminal", term: "terminal" },
  // ...
];

// Result: "Windows Terminal" is NOT split, "use a terminal" is
<JargonText>Use Windows Terminal or any terminal application</JargonText>
// ✅ Renders: Use [Windows Terminal] or any [terminal] application
```

### Case 2: Term Duplication in Same Text

```tsx
// This is fine - each SSH mention gets a tooltip
<JargonText>
  Use SSH. SSH is secure. Your VPS runs SSH.
</JargonText>
// ✅ All three "SSH" instances get tooltips (performance-optimized with caching)
```

### Case 3: Non-English Text (Ukrainian)

```tsx
// When using UK translations, some English terms may not appear
<JargonText>
  {messages.uk_description}  // "Використовуйте SSH для VPS..."
</JargonText>
// ✅ Still works - detects "SSH" and "VPS" even in Ukrainian text
```

---

## 🎨 Styling & Customization

### Apply Custom Styles

```tsx
// Pass className to JargonText
<JargonText className="text-sm text-muted-foreground">
  SSH and VPS are important.
</JargonText>

// Wrapper span will have the className
// Terms inside still get interactive styling
```

### Use Custom Term Mappings

```tsx
import { JargonText } from "@/components/jargon";
import { defaultJargonMappings } from "@/components/jargon";

const customMappings = [
  ...defaultJargonMappings,
  { pattern: "MyCustomTerm", term: "my-custom-term" },
];

export function MyComponent() {
  return (
    <JargonText mappings={customMappings}>
      MyCustomTerm is documented here.
    </JargonText>
  );
}
```

---

## 📊 Available Terms

### Core Infrastructure

| Pattern | Term | Definition |
|---------|------|------------|
| SSH | ssh | Secure Shell protocol |
| VPS | vps | Virtual Private Server |
| Ubuntu | ubuntu | Linux distribution |
| terminal | terminal | Command line interface |
| tmux | tmux | Terminal multiplexer |
| CLI | cli | Command-line interface |
| root | root | Superuser account |

### Development Tools

| Pattern | Term | Definition |
|---------|------|------------|
| GitHub | github | Git repository hosting |
| Claude | claude-code | AI-powered IDE |
| API | api | Application Programming Interface |
| bash | bash | Unix shell |
| curl | curl | HTTP client |

### AI/ML Tools

| Pattern | Term | Definition |
|---------|------|------------|
| Codex | codex | OpenAI code generation |
| Gemini | gemini | Google's AI model |
| tmux | tmux | Terminal multiplexer |

See full list: `defaultJargonMappings` in `apps/web/components/jargon.tsx`

---

## 🚀 Best Practices

### 1. Keep Text Concise

```tsx
// Good: Brief explanation with one core concept
<JargonText>SSH provides secure access to your VPS.</JargonText>

// Avoid: Long paragraph with many complex terms
<JargonText>SSH, SFTP, SCP, and other SSH-based protocols provide secure encrypted access to your VPS, which is a Virtual Private Server, over networks like the internet...</JargonText>
```

### 2. Use Consistent Terminology

```tsx
// Good: Always say "VPS" not "vps" or "V.P.S."
<JargonText>Your VPS includes SSH access.</JargonText>

// Avoid: Mixing term variations
<JargonText>Your V.P.S. needs SSH or vps connectivity.</JargonText>
```

### 3. Test on Mobile

```tsx
// Mobile users see bottom sheet instead of hover tooltip
// Make sure text reads well in small format
<JargonText>SSH is secure</JargonText>  // Good, short
<JargonText>SSH is a cryptographic network protocol</JargonText>  // OK, will wrap
<JargonText>SSH is a cryptographic network protocol that provides a secure channel for remote login and other network services...</JargonText>  // Avoid, too long for mobile
```

### 4. Don't Repeat Term Explanations

```tsx
// Bad: User already knows SSH from earlier page
<JargonText>Use SSH to connect to your VPS</JargonText>
<JargonText>SSH provides encrypted access</JargonText>

// Good: Don't re-explain on every page
<JargonText>Connect to your VPS</JargonText>  // Assumes they know SSH
```

---

## 🔍 Debugging

### Check if Feature Flag is Enabled

```tsx
import { isJargonTextEnabled, getRolloutPhase } from "@/lib/feature-flags";

export function DebugPanel() {
  return (
    <div>
      <p>Current phase: {getRolloutPhase()}</p>
      <p>launch-onboarding enabled: {isJargonTextEnabled('launch-onboarding')}</p>
      <p>ssh-connect enabled: {isJargonTextEnabled('ssh-connect')}</p>
    </div>
  );
}
```

### Check Rendered Tooltip

```tsx
// In browser DevTools, open the component in React DevTools
// Look for <Jargon term="ssh"> wrapper around "SSH" text
// Hover/tap to see tooltip definition

// If term is NOT wrapped, check:
// 1. Is the term in defaultJargonMappings?
// 2. Is the spelling exact (case-sensitive for patterns)?
// 3. Is the feature flag enabled for this page?
```

### Performance Check

```tsx
// Monitor in Chrome DevTools > Performance tab
// JargonText uses regex, so large text (1000+ chars) takes time

// Benchmark:
// - 100 chars: ~1ms
// - 1000 chars: ~5ms
// - 10000 chars: ~50ms

// If too slow, consider:
// - Split into smaller sections
// - Use <Jargon> component for individual terms instead
// - Profile with performance.measure()
```

---

## 📝 Checklist for Adding JargonText

When you add JargonText to a new wizard page:

- [ ] Text is prose explanation (not code, not output)
- [ ] All technical terms are in defaultJargonMappings
- [ ] If using feature flag, page name is valid
- [ ] Mixed JSX content is wrapped in segments (not all in one JargonText)
- [ ] Tested on mobile (bottom sheet displays correctly)
- [ ] Tested with feature flag disabled (plain text renders)
- [ ] No terms are repeated from previous pages unnecessarily
- [ ] Text is concise (<200 chars per JargonText)

---

## 🔗 Related Files

- `apps/web/lib/feature-flags.ts` - Rollout configuration & utilities
- `apps/web/lib/__tests__/feature-flags.test.ts` - Integration tests (46 tests)
- `apps/web/components/jargon.tsx` - JargonText implementation & defaultJargonMappings
- `apps/web/components/rollout-jargon.tsx` - Feature-flag-aware wrapper
- `apps/web/lib/jargon.ts` - Term definitions

---

## ❓ FAQ

**Q: Why are some wizard pages not getting JargonText?**
A: Phase 1 (6 pages: launch-onboarding, ssh-connect, status-check, install-terminal, create-vps, accounts) is active. Phase 2 (3 pages) activates on Day 3. See `lib/feature-flags.ts`.

**Q: Can I enable all pages at once?**
A: Not recommended - use feature flags for controlled rollout. See IMPROVEMENTS_#1_PHASED_ROLLOUT.md

**Q: My text isn't showing tooltips, why?**
A: Check feature-flags.ts - your page might not be enabled yet.

**Q: Can JargonText handle HTML?**
A: No, only plain text. For HTML, use dangerouslySetInnerHTML + plain <Jargon> components.

**Q: Does JargonText affect SEO?**
A: No, terms are still in the page text. Tooltips are client-side only.

---

**Last updated**: 2026-02-28
**Maintainer**: @joyshmitz
