"use client";

import { motion } from "@/components/motion";
import {
  Bug,
  Shield,
  Terminal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Search,
  FileCode,
  GitCommit,
  Lightbulb,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  CommandList,
  FeatureCard,
  FeatureGrid,
} from "./lesson-components";
import { useLocale, getUbsLessonMessages } from "@/lib/i18n";

export function UbsLesson() {
  const { locale } = useLocale();
  const messages = getUbsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is UBS */}
      <Section
        title={messages.whatIsUbs.title}
        icon={<Bug className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight>{messages.whatIsUbs.highlightText}</Highlight> {messages.whatIsUbs.description}
        </Paragraph>
        <Paragraph>
          {messages.whatIsUbs.analogy}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title={messages.whatIsUbs.features.securityScanning.title}
              description={messages.whatIsUbs.features.securityScanning.description}
              gradient="from-red-500/20 to-rose-500/20"
            />
            <FeatureCard
              icon={<Bug className="h-5 w-5" />}
              title={messages.whatIsUbs.features.bugDetection.title}
              description={messages.whatIsUbs.features.bugDetection.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title={messages.whatIsUbs.features.fastFeedback.title}
              description={messages.whatIsUbs.features.fastFeedback.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<FileCode className="h-5 w-5" />}
              title={messages.whatIsUbs.features.multiLanguage.title}
              description={messages.whatIsUbs.features.multiLanguage.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* The Golden Rule */}
      <Section
        title={messages.goldenRule.title}
        icon={<GitCommit className="h-5 w-5" />}
        delay={0.15}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                Run <code className="text-amber-400">ubs</code> {messages.goldenRule.mainRule}
              </p>
              <p className="text-white/60 mt-1">
                {messages.goldenRule.explanation}
              </p>
            </div>
          </div>
        </motion.div>
      </Section>

      <Divider />

      {/* Essential Commands */}
      <Section
        title={messages.essentialCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.2}
      >
        <CommandList
          commands={messages.essentialCommands.commands}
        />

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.essentialCommands.tip.content}
            <code>ubs file.ts</code>{messages.essentialCommands.tip.example1}
            <code>ubs .</code>{messages.essentialCommands.tip.example2}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Understanding Output */}
      <Section
        title="Understanding Output"
        icon={<Search className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>UBS output follows a consistent format:</Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`⚠️  Null Safety (3 errors)
    src/api/users.ts:42:5 – Possible null dereference
    💡 Use optional chaining: user?.profile

    src/api/users.ts:87:12 – Unchecked array access
    💡 Add bounds check before accessing array[i]

⚠️  Security (1 error)
    src/api/auth.ts:23:8 – SQL injection risk
    💡 Use parameterized queries instead of string concat

Exit code: 1`}
            language="text"
            filename="ubs output"
          />
        </div>

        <div className="mt-6 space-y-4">
          <OutputExplainer
            pattern="file:line:col"
            meaning="Exact location of the issue"
            color="text-emerald-400"
          />
          <OutputExplainer
            pattern="💡"
            meaning="Suggested fix"
            color="text-amber-400"
          />
          <OutputExplainer
            pattern="Exit code 0/1"
            meaning="Pass (safe) / Fail (needs fixes)"
            color="text-primary"
          />
        </div>
      </Section>

      <Divider />

      {/* Bug Severity */}
      <Section
        title="Bug Severity Guide"
        icon={<AlertTriangle className="h-5 w-5" />}
        delay={0.3}
      >
        <div className="space-y-4">
          <SeverityCard
            level="Critical"
            icon={<XCircle className="h-5 w-5" />}
            color="from-red-500/20 to-rose-500/20"
            border="border-red-500/30"
            examples={[
              "Null safety violations",
              "XSS/Injection vulnerabilities",
              "Async/await issues",
              "Memory leaks",
            ]}
            action="Always fix immediately"
          />
          <SeverityCard
            level="Important"
            icon={<AlertTriangle className="h-5 w-5" />}
            color="from-amber-500/20 to-orange-500/20"
            border="border-amber-500/30"
            examples={[
              "Type narrowing issues",
              "Division by zero risks",
              "Resource leaks",
              "Missing error handling",
            ]}
            action="Fix before production"
          />
          <SeverityCard
            level="Contextual"
            icon={<CheckCircle className="h-5 w-5" />}
            color="from-primary/20 to-violet-500/20"
            border="border-primary/30"
            examples={[
              "TODO/FIXME comments",
              "Console.log statements",
              "Unused variables",
              "Magic numbers",
            ]}
            action="Use judgment"
          />
        </div>
      </Section>

      <Divider />

      {/* The Fix Workflow */}
      <Section
        title="The Fix Workflow"
        icon={<Zap className="h-5 w-5" />}
        delay={0.35}
      >
        <FixWorkflow />
      </Section>

      <Divider />

      {/* Pre-Commit Hook */}
      <Section
        title="Pre-Commit Integration"
        icon={<GitCommit className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>
          For maximum safety, add UBS to your pre-commit workflow:
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# In your workflow:
$ git add .
$ ubs $(git diff --name-only --cached)
# If exit 0: proceed with commit
# If exit 1: fix issues first

$ git commit -m "feat: add user auth"`}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            ACFS agents are trained to run <code>ubs</code> automatically
            before committing. You get this protection by default!
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title="Try It Now"
        icon={<Terminal className="h-5 w-5" />}
        delay={0.45}
      >
        <CodeBlock
          code={`# View session logs
$ ubs sessions --entries 1

# Scan your project
$ ubs .

# Get help
$ ubs --help`}
          showLineNumbers
        />
      </Section>
    </div>
  );
}

// =============================================================================
// OUTPUT EXPLAINER
// =============================================================================
function OutputExplainer({
  pattern,
  meaning,
  color,
}: {
  pattern: string;
  meaning: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      <code className={`font-mono text-sm font-medium ${color}`}>{pattern}</code>
      <span className="text-white/40 group-hover:text-white/60 transition-colors">→</span>
      <span className="text-white/60 group-hover:text-white/80 transition-colors">{meaning}</span>
    </motion.div>
  );
}

// =============================================================================
// SEVERITY CARD
// =============================================================================
function SeverityCard({
  level,
  icon,
  color,
  border,
  examples,
  action,
}: {
  level: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  examples: string[];
  action: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative rounded-2xl border ${border} bg-gradient-to-br ${color} p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.2]`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg mb-3">{level}</h4>
          <ul className="space-y-2 mb-4">
            {examples.map((ex, i) => (
              <li key={i} className="text-sm text-white/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                {ex}
              </li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-white/90 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {action}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// FIX WORKFLOW
// =============================================================================
function FixWorkflow() {
  const steps = [
    { title: "Read finding", desc: "Understand the category and fix suggestion" },
    { title: "Navigate to location", desc: "Go to file:line:col" },
    { title: "Verify it's real", desc: "Not all findings are bugs—some are false positives" },
    { title: "Fix root cause", desc: "Don't just mask the symptom" },
    { title: "Re-run UBS", desc: "Confirm the fix worked (exit 0)" },
    { title: "Commit", desc: "Now you're safe to commit!" },
  ];

  return (
    <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative space-y-5">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-red-500/50 via-amber-500/50 to-emerald-500/50" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="relative flex items-start gap-4 pl-2 group"
          >
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-white text-sm font-bold shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-shadow duration-300">
              {i + 1}
            </div>
            <div className="pt-1">
              <h4 className="font-semibold text-white group-hover:text-primary transition-colors duration-300">{step.title}</h4>
              <p className="text-sm text-white/50">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
