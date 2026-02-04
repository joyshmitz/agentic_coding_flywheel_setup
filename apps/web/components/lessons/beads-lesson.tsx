"use client";

import { motion } from "@/components/motion";
import {
  ListTodo,
  GitBranch,
  Terminal,
  BarChart,
  Target,
  Workflow,
  CheckCircle,
  Zap,
  Network,
  Play,
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
import { Jargon } from "@/components/jargon";
import { useLocale } from "@/lib/i18n";
import { getBeadsLessonMessages } from "@/lib/i18n/translations";

type Messages = ReturnType<typeof getBeadsLessonMessages>;

export function BeadsLesson() {
  const { locale } = useLocale();
  const messages = getBeadsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is Beads */}
      <Section
        title={messages.whatIsBeads.title}
        icon={<ListTodo className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="beads">Beads</Jargon></Highlight>{" "}
          {messages.whatIsBeads.beadsDescription}
        </Paragraph>
        <Paragraph>
          <Highlight>BV (Beads Viewer)</Highlight>{" "}
          {messages.whatIsBeads.bvDescription}
        </Paragraph>
        <TipBox variant="info">
          <code>br</code> is the CLI for the beads_rust issue tracker.
          Use <code>br --help</code> for all available commands.
        </TipBox>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<GitBranch className="h-5 w-5" />}
              title={messages.whatIsBeads.features.dependencyTracking.title}
              description={messages.whatIsBeads.features.dependencyTracking.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<BarChart className="h-5 w-5" />}
              title={messages.whatIsBeads.features.graphMetrics.title}
              description={messages.whatIsBeads.features.graphMetrics.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Target className="h-5 w-5" />}
              title={messages.whatIsBeads.features.smartTriage.title}
              description={messages.whatIsBeads.features.smartTriage.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Network className="h-5 w-5" />}
              title={messages.whatIsBeads.features.gitIntegration.title}
              description={messages.whatIsBeads.features.gitIntegration.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Core Commands */}
      <Section
        title={messages.coreCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          <code>bd</code> {messages.coreCommands.intro.split('CLI').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="cli">CLI</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CommandList commands={messages.coreCommands.commands} />
        </div>

        <div className="mt-6">
          <TipBox variant="warning">
            <strong>{messages.coreCommands.warning.important}</strong>{" "}
            {messages.coreCommands.warning.neverRunBare} <code>bv</code>—
            {messages.coreCommands.warning.explanation} <code>bv --robot-*</code>{" "}
            {messages.coreCommands.warning.flagsNote}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* BV Robot Commands */}
      <Section
        title={messages.robotCommands.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.robotCommands.intro.split('JSON').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="json">JSON</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6 space-y-6">
          {messages.robotCommands.commands.map((cmd, index) => (
            <RobotCommand
              key={index}
              command={cmd.command}
              description={cmd.description}
              output={cmd.output}
              primary={cmd.primary}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Issue Types & Priorities */}
      <Section
        title={messages.issueTypes.title}
        icon={<ListTodo className="h-5 w-5" />}
        delay={0.25}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Types */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h4 className="font-bold text-white mb-4">{messages.issueTypes.types.title}</h4>
            <div className="space-y-2">
              {messages.issueTypes.types.list.map((item, index) => {
                const colors = ["text-red-400", "text-emerald-400", "text-primary", "text-violet-400", "text-white/60"];
                return (
                  <TypeRow
                    key={index}
                    type={item.type}
                    description={item.description}
                    color={colors[index] || "text-white/60"}
                  />
                );
              })}
            </div>
          </div>

          {/* Priorities */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h4 className="font-bold text-white mb-4">{messages.issueTypes.priorities.title}</h4>
            <div className="space-y-2">
              {messages.issueTypes.priorities.list.map((item, index) => {
                const colors = ["text-red-400", "text-amber-400", "text-primary", "text-white/60", "text-white/60"];
                return (
                  <PriorityRow
                    key={index}
                    priority={item.priority}
                    label={item.label}
                    description={item.description}
                    color={colors[index] || "text-white/60"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* The Agent Workflow */}
      <Section
        title={messages.agentWorkflow.title}
        icon={<Workflow className="h-5 w-5" />}
        delay={0.3}
      >
        <AgentWorkflow messages={messages.agentWorkflow} />
      </Section>

      <Divider />

      {/* Understanding Graph Metrics */}
      <Section
        title={messages.graphMetrics.title}
        icon={<BarChart className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.graphMetrics.intro.split('dependencies').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="dependency">dependencies</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.graphMetrics.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              name={metric.name}
              description={metric.description}
              usage={metric.usage}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Best Practices */}
      <Section
        title={messages.bestPractices.title}
        icon={<CheckCircle className="h-5 w-5" />}
        delay={0.4}
      >
        <div className="space-y-4">
          {messages.bestPractices.practices.map((practice, index) => (
            <BestPractice
              key={index}
              title={practice.title}
              description={practice.description}
            />
          ))}
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.bestPractices.tipBox.content}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title={messages.tryItNow.title}
        icon={<Play className="h-5 w-5" />}
        delay={0.45}
      >
        <CodeBlock
          code={messages.tryItNow.codeExample}
          showLineNumbers
        />
      </Section>
    </div>
  );
}

// =============================================================================
// TYPE ROW
// =============================================================================
function TypeRow({
  type,
  description,
  color,
}: {
  type: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04]"
    >
      <code className={`text-sm font-mono font-medium px-2 py-1 rounded bg-white/5 ${color}`}>{type}</code>
      <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{description}</span>
    </motion.div>
  );
}

// =============================================================================
// PRIORITY ROW
// =============================================================================
function PriorityRow({
  priority,
  label,
  description,
  color,
}: {
  priority: string;
  label: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04]"
    >
      <span className={`text-sm font-mono font-bold w-6 text-center ${color}`}>{priority}</span>
      <span className={`text-sm font-medium ${color}`}>{label}</span>
      <span className="text-xs text-white/50">—</span>
      <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{description}</span>
    </motion.div>
  );
}

// =============================================================================
// ROBOT COMMAND
// =============================================================================
function RobotCommand({
  command,
  description,
  output,
  primary,
}: {
  command: string;
  description: string;
  output: string[];
  primary?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative rounded-2xl border ${primary ? "border-primary/30 bg-primary/5" : "border-white/[0.08] bg-white/[0.02]"} p-5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15]`}
    >
      {/* Subtle glow on hover */}
      <div className={`absolute inset-0 ${primary ? "bg-primary/5" : "bg-white/[0.02]"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <code className={`relative text-sm font-medium ${primary ? "text-primary" : "text-emerald-400"}`}>
        {command}
      </code>
      <p className="relative text-sm text-white/60 mt-2">{description}</p>
      <div className="relative flex flex-wrap gap-2 mt-3">
        {output.map((field) => (
          <span
            key={field}
            className="px-2 py-1 rounded bg-white/[0.05] text-xs text-white/50 font-mono group-hover:bg-white/[0.08] group-hover:text-white/70 transition-all"
          >
            {field}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// =============================================================================
// AGENT WORKFLOW
// =============================================================================
function AgentWorkflow({ messages }: { messages: Messages["agentWorkflow"] }) {
  const icons = [
    <Target key="target" className="h-5 w-5" />,
    <ListTodo key="list" className="h-5 w-5" />,
    <Play key="play" className="h-5 w-5" />,
    <Zap key="zap" className="h-5 w-5" />,
    <CheckCircle key="check" className="h-5 w-5" />,
    <GitBranch key="git" className="h-5 w-5" />,
  ];

  return (
    <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative space-y-5">
        <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/50 via-violet-500/50 to-emerald-500/50" />

        {messages.steps.map((step: { title: string; description: string }, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ x: 4 }}
            className="relative flex items-start gap-4 pl-2 group"
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-shadow duration-300">
              {icons[i]}
            </div>
            <div className="pt-1.5">
              <code className="text-sm text-primary font-medium group-hover:text-white transition-colors">{step.title}</code>
              <p className="text-sm text-white/50">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// METRIC CARD
// =============================================================================
function MetricCard({
  name,
  description,
  usage,
}: {
  name: string;
  description: string;
  usage: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-primary/30"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h4 className="relative font-bold text-white flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-shadow">
          <BarChart className="h-4 w-4" />
        </div>
        <span className="group-hover:text-primary transition-colors">{name}</span>
      </h4>
      <p className="relative text-sm text-white/60 mt-3">{description}</p>
      <p className="relative text-sm text-primary/80 mt-3 font-medium">→ {usage}</p>
    </motion.div>
  );
}

// =============================================================================
// BEST PRACTICE
// =============================================================================
function BestPractice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/20 transition-shadow">
        <CheckCircle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{title}</p>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
