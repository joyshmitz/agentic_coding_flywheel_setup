"use client";

import { motion } from "@/components/motion";
import {
  RefreshCw,
  Cpu,
  Mail,
  Shield,
  Search,
  Brain,
  LayoutDashboard,
  Users,
  Zap,
  Play,
  Terminal,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useLocale, getFlywheelLoopMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getFlywheelLoopMessages>;

import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";

export function FlywheelLoopLesson() {
  const { locale } = useLocale();
  const messages = getFlywheelLoopMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* The ACFS Flywheel */}
      <Section
        {...{
          title: messages.flywheelSection.title,
          icon: <RefreshCw className="h-5 w-5" />,
          delay: 0.1,
        }}
      >
        <Paragraph>
          {messages.flywheelSection.intro}{" "}
          <Highlight><Jargon term="flywheel">{messages.flywheelSection.highlight}</Jargon></Highlight>:
        </Paragraph>

        <div className="mt-8">
          <FlywheelDiagram messages={messages} />
        </div>

        <Paragraph>{messages.flywheelSection.cycleEffect}</Paragraph>
      </Section>

      <Divider />

{/* The Twenty Tools */}
      <Section
        {...{
          title: messages.toolsSection.title,
          icon: <Zap className="h-5 w-5" />,
          delay: 0.15,
        }}
      >
        <div className="space-y-6">
          <ToolCard
            {...{
              number: 1,
              name: messages.toolsSection.tools.ntm.name,
              subtitle: messages.toolsSection.tools.ntm.subtitle,
              command: messages.toolsSection.tools.ntm.command,
              icon: <Cpu className="h-5 w-5" />,
              gradient: "from-violet-500/20 to-purple-500/20",
              useCases: messages.toolsSection.tools.ntm.useCases,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 2,
              name: messages.toolsSection.tools.agentMail.name,
              subtitle: messages.toolsSection.tools.agentMail.subtitle,
              command: messages.toolsSection.tools.agentMail.command,
              icon: <Mail className="h-5 w-5" />,
              gradient: "from-sky-500/20 to-blue-500/20",
              useCases: messages.toolsSection.tools.agentMail.useCases,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 3,
              name: messages.toolsSection.tools.ubs.name,
              subtitle: messages.toolsSection.tools.ubs.subtitle,
              command: messages.toolsSection.tools.ubs.command,
              icon: <Shield className="h-5 w-5" />,
              gradient: "from-emerald-500/20 to-teal-500/20",
              useCases: messages.toolsSection.tools.ubs.useCases,
              example: messages.toolsSection.tools.ubs.example,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 4,
              name: messages.toolsSection.tools.cass.name,
              subtitle: messages.toolsSection.tools.cass.subtitle,
              command: messages.toolsSection.tools.cass.command,
              icon: <Search className="h-5 w-5" />,
              gradient: "from-amber-500/20 to-orange-500/20",
              useCases: messages.toolsSection.tools.cass.useCases,
              example: messages.toolsSection.tools.cass.example,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 5,
              name: messages.toolsSection.tools.cassMemory.name,
              subtitle: messages.toolsSection.tools.cassMemory.subtitle,
              command: messages.toolsSection.tools.cassMemory.command,
              icon: <Brain className="h-5 w-5" />,
              gradient: "from-rose-500/20 to-pink-500/20",
              useCases: messages.toolsSection.tools.cassMemory.useCases,
              example: messages.toolsSection.tools.cassMemory.example,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 6,
              name: messages.toolsSection.tools.beadsViewer.name,
              subtitle: messages.toolsSection.tools.beadsViewer.subtitle,
              command: messages.toolsSection.tools.beadsViewer.command,
              icon: <LayoutDashboard className="h-5 w-5" />,
              gradient: "from-indigo-500/20 to-violet-500/20",
              useCases: messages.toolsSection.tools.beadsViewer.useCases,
              example: messages.toolsSection.tools.beadsViewer.example,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 7,
              name: messages.toolsSection.tools.caam.name,
              subtitle: messages.toolsSection.tools.caam.subtitle,
              command: messages.toolsSection.tools.caam.command,
              icon: <Users className="h-5 w-5" />,
              gradient: "from-teal-500/20 to-cyan-500/20",
              useCases: messages.toolsSection.tools.caam.useCases,
              example: messages.toolsSection.tools.caam.example,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />

          <ToolCard
            {...{
              number: 8,
              name: messages.toolsSection.tools.slb.name,
              subtitle: messages.toolsSection.tools.slb.subtitle,
              command: messages.toolsSection.tools.slb.command,
              icon: <Shield className="h-5 w-5" />,
              gradient: "from-red-500/20 to-rose-500/20",
              useCases: messages.toolsSection.tools.slb.useCases,
              useCasesLabel: messages.toolsSection.useCasesLabel,
            }}
          />
        </div>
      </Section>

      <Divider />

      {/* A Complete Workflow */}
      <Section
        {...{
          title: messages.workflowSection.title,
          icon: <Terminal className="h-5 w-5" />,
          delay: 0.2,
        }}
      >
        <Paragraph>
          {messages.workflowSection.intro.split('parallel agents').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="parallel-agents">parallel agents</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            {...{
              code: `${messages.workflowSection.codeComments.planWork}
bv --robot-triage                ${messages.workflowSection.codeComments.checkTasks}
bd ready                        ${messages.workflowSection.codeComments.seeReady}

${messages.workflowSection.codeComments.startAgents}
ntm spawn myproject --cc=2 --cod=1

${messages.workflowSection.codeComments.setContext}
cm context "Implementing user authentication" --json

${messages.workflowSection.codeComments.sendPrompt}
ntm send myproject "${messages.workflowSection.codeComments.contextPrompt}"

${messages.workflowSection.codeComments.monitorGuide}
ntm attach myproject            ${messages.workflowSection.codeComments.watchProgress}

${messages.workflowSection.codeComments.scanCommit}
ubs .                           ${messages.workflowSection.codeComments.checkBugs}

${messages.workflowSection.codeComments.updateMemoryStep}
cm reflect                      ${messages.workflowSection.codeComments.distillLearnings}

${messages.workflowSection.codeComments.closeTask}
bd close <task-id>`,
              showLineNumbers: true,
            }}
          />
        </div>
      </Section>

      <Divider />

      {/* The Flywheel Effect */}
      <Section
        {...{
          title: messages.flywheelEffectSection.title,
          icon: <Sparkles className="h-5 w-5" />,
          delay: 0.25,
        }}
      >
        <Paragraph>{messages.flywheelEffectSection.intro}</Paragraph>

        <div className="mt-6">
          <FlywheelEffectList effects={messages.flywheelEffectSection.effects} />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.flywheelEffectSection.tipBox.content.split(messages.flywheelEffectSection.tipBox.strongText).map((part, index) => (
              index === 1 ? <strong key={index}>{messages.flywheelEffectSection.tipBox.strongText}</strong> : part
            ))}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Your First Real Task */}
      <Section
        {...{
          title: messages.firstTaskSection.title,
          icon: <Play className="h-5 w-5" />,
          delay: 0.3,
        }}
      >
        <Paragraph>
          {messages.firstTaskSection.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            {...{
              code: `${messages.firstTaskSection.codeComments.createProject}
mkcd /data/projects/my-first-project

${messages.firstTaskSection.codeComments.initGit}
git init

${messages.firstTaskSection.codeComments.initBeads}
bd init

${messages.firstTaskSection.codeComments.recommended}
${messages.firstTaskSection.codeComments.beadsExplanation}
${messages.firstTaskSection.codeComments.conflictWarning}
git branch beads-sync main
git push -u origin beads-sync
bd config set sync.branch=beads-sync

${messages.firstTaskSection.codeComments.spawnAgents}
ntm spawn my-first-project --cc=2 --cod=1 --gmi=1

${messages.firstTaskSection.codeComments.startBuilding}
ntm send my-first-project "${messages.firstTaskSection.codeComments.buildPrompt}"`,
              showLineNumbers: true,
            }}
          />
        </div>
      </Section>

      <Divider />

      {/* Getting Help */}
      <Section
        {...{
          title: messages.helpSection.title,
          icon: <Zap className="h-5 w-5" />,
          delay: 0.35,
        }}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <HelpCard
            {...{
              command: messages.helpSection.commands.doctor.command,
              description: messages.helpSection.commands.doctor.description,
              gradient: "from-emerald-500/20 to-teal-500/20",
            }}
          />
          <HelpCard
            {...{
              command: messages.helpSection.commands.ntmHelp.command,
              description: messages.helpSection.commands.ntmHelp.description,
              gradient: "from-violet-500/20 to-purple-500/20",
            }}
          />
          <HelpCard
            {...{
              command: messages.helpSection.commands.onboard.command,
              description: messages.helpSection.commands.onboard.description,
              gradient: "from-amber-500/20 to-orange-500/20",
            }}
          />
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// FLYWHEEL DIAGRAM - Visual representation of the flywheel
// =============================================================================
function FlywheelDiagram({ messages }: { messages: Messages }) {
  return (
    <div className="relative p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative">
        {/* Main flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 flex-wrap">
          <FlywheelNode
            {...{
              label: messages.diagram.nodes.plan.label,
              sublabel: messages.diagram.nodes.plan.sublabel,
              icon: <LayoutDashboard className="h-5 w-5" />,
              color: "from-violet-500 to-purple-500",
              delay: 0.1,
            }}
          />
          <ArrowRight className="h-5 w-5 text-white/30 hidden md:block" />
          <FlywheelNode
            {...{
              label: messages.diagram.nodes.coordinate.label,
              sublabel: messages.diagram.nodes.coordinate.sublabel,
              icon: <Mail className="h-5 w-5" />,
              color: "from-sky-500 to-blue-500",
              delay: 0.2,
            }}
          />
          <ArrowRight className="h-5 w-5 text-white/30 hidden md:block" />
          <FlywheelNode
            {...{
              label: messages.diagram.nodes.execute.label,
              sublabel: messages.diagram.nodes.execute.sublabel,
              icon: <Cpu className="h-5 w-5" />,
              color: "from-emerald-500 to-teal-500",
              delay: 0.3,
            }}
          />
        </div>

        {/* Return flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-6 flex-wrap">
          <FlywheelNode
            {...{
              label: messages.diagram.nodes.remember.label,
              sublabel: messages.diagram.nodes.remember.sublabel,
              icon: <Brain className="h-5 w-5" />,
              color: "from-rose-500 to-pink-500",
              delay: 0.4,
            }}
          />
          <ArrowRight className="h-5 w-5 text-white/30 rotate-180 hidden md:block" />
          <FlywheelNode
            {...{
              label: messages.diagram.nodes.scan.label,
              sublabel: messages.diagram.nodes.scan.sublabel,
              icon: <Shield className="h-5 w-5" />,
              color: "from-amber-500 to-orange-500",
              delay: 0.5,
            }}
          />
        </div>

        {/* Circular arrow indicator */}
        <motion.div
          {...{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.6 },
            className:
              "absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block",
          }}
        >
          <RefreshCw className="h-12 w-12 text-primary/30" />
        </motion.div>
      </div>
    </div>
  );
}

function FlywheelNode({
  label,
  sublabel,
  icon,
  color,
  delay,
}: {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      {...{
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay },
        whileHover: { y: -4, scale: 1.05 },
        className: `group flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br ${color} bg-opacity-20 border border-white/[0.1] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2]`,
      }}
    >
      <div className="text-white group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <span className="font-bold text-white text-sm">{label}</span>
        <span className="block text-xs text-white/50 group-hover:text-white/70 transition-colors">{sublabel}</span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// TOOL CARD - Display a tool with its use cases
// =============================================================================
function ToolCard({
  number,
  name,
  subtitle,
  command,
  icon,
  gradient,
  useCases,
  useCasesLabel,
  example,
}: {
  number: number;
  name: string;
  subtitle: string;
  command: string;
  icon: React.ReactNode;
  gradient: string;
  useCases: string[];
  useCasesLabel: string;
  example?: string;
}) {
  return (
    <motion.div
      {...{
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: number * 0.05 },
        whileHover: { x: 4, scale: 1.01 },
        className: `group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15]`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white shadow-lg group-hover:bg-white/20 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-bold text-white">
              {number}. {name}
            </h4>
            <span className="text-xs text-white/40">- {subtitle}</span>
          </div>
          <code className="inline-block px-2 py-1 rounded bg-black/30 border border-white/[0.08] text-xs font-mono text-primary mb-3">
            {command}
          </code>

          <p className="text-sm text-white/60 mb-3">{useCasesLabel}</p>
          <ul className="space-y-1">
            {useCases.map((useCase, i) => (
              <li key={i} className="text-sm text-white/50 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-white/40 shrink-0" />
                {useCase}
              </li>
            ))}
          </ul>

          {example && (
            <div className="mt-4 rounded-xl bg-black/20 border border-white/[0.06] overflow-hidden">
              <pre className="p-3 text-xs font-mono text-white/70 overflow-x-auto">
                {example}
              </pre>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// FLYWHEEL EFFECT LIST
// =============================================================================
function FlywheelEffectList({ effects }: { effects: Array<{ tool: string; effect: string }> }) {

  return (
    <div className="space-y-3">
      {effects.map((item, i) => (
        <motion.div key={i}
          {...{
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.1 },
            whileHover: { x: 6, scale: 1.01 },
            className:
              "group flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]",
          }}
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-white/70 group-hover:text-white/90 transition-colors">
            <strong className="text-primary">{item.tool}</strong> {item.effect}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// HELP CARD
// =============================================================================
function HelpCard({
  command,
  description,
  gradient,
}: {
  command: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      {...{
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        whileHover: { y: -4, scale: 1.02 },
        className: `group relative rounded-xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-4 backdrop-blur-xl text-center transition-all duration-300 hover:border-white/[0.15]`,
      }}
    >
      <code className="block px-3 py-2 rounded-lg bg-black/30 border border-white/[0.08] text-sm font-mono text-primary mb-2 group-hover:bg-black/40 transition-colors">
        {command}
      </code>
      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{description}</span>
    </motion.div>
  );
}
