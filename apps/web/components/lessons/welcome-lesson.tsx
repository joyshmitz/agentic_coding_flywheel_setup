"use client";

import { motion } from "@/components/motion";
import {
  Terminal,
  Code2,
  Bot,
  Cpu,
  Layers,
  Server,
  Wifi,
  Wrench,
  ChevronRight,
  Laptop,
  Cloud,
  Zap,
  BookOpen,
} from "lucide-react";
import {
  Section,
  Paragraph,
  FeatureCard,
  FeatureGrid,
  TipBox,
  StepList,
  DiagramBox,
  Highlight,
  Divider,
  GoalBanner,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getWelcomeLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getWelcomeLessonMessages>;

export function WelcomeLesson() {
  const { locale } = useLocale();
  const messages = getWelcomeLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What You Now Have Section */}
      <Section
        title={messages.whatYouNowHave.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph highlight>
          {messages.whatYouNowHave.congratulations.split(messages.whatYouNowHave.highlight)[0]}{" "}
          <Highlight>{messages.whatYouNowHave.highlight}</Highlight>
          {messages.whatYouNowHave.congratulations.split(messages.whatYouNowHave.highlight)[1]}.
        </Paragraph>

        <div className="mt-8">
          <Paragraph>{messages.whatYouNowHave.installedIntro}</Paragraph>
        </div>

        <div className="mt-6">
          <FeatureGrid>
            <FeatureCard
              icon={<Terminal className="h-5 w-5" />}
              title={messages.whatYouNowHave.features.beautifulTerminal.title}
              description={messages.whatYouNowHave.features.beautifulTerminal.description}
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Wrench className="h-5 w-5" />}
              title={messages.whatYouNowHave.features.modernCliTools.title}
              description={messages.whatYouNowHave.features.modernCliTools.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Code2 className="h-5 w-5" />}
              title={messages.whatYouNowHave.features.languageRuntimes.title}
              description={messages.whatYouNowHave.features.languageRuntimes.description}
              gradient="from-sky-500/20 to-blue-500/20"
            />
            <FeatureCard
              icon={<Bot className="h-5 w-5" />}
              title={messages.whatYouNowHave.features.threeCodingAgents.title}
              description={messages.whatYouNowHave.features.threeCodingAgents.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>

        {/* Agent Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <AgentCard
            name={messages.whatYouNowHave.agents.claudeCode.name}
            shortcut={messages.whatYouNowHave.agents.claudeCode.shortcut}
            color="from-orange-500 to-amber-500"
          />
          <AgentCard
            name={messages.whatYouNowHave.agents.codexCli.name}
            shortcut={messages.whatYouNowHave.agents.codexCli.shortcut}
            color="from-emerald-500 to-teal-500"
          />
          <AgentCard
            name={messages.whatYouNowHave.agents.geminiCli.name}
            shortcut={messages.whatYouNowHave.agents.geminiCli.shortcut}
            color="from-blue-500 to-indigo-500"
          />
        </div>
      </Section>

      <Divider />

      {/* The Mental Model Section */}
      <Section
        title={messages.mentalModel.title}
        icon={<Layers className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>{messages.mentalModel.intro}</Paragraph>

        {/* Architecture Diagram */}
        <div className="mt-8 relative">
          <ArchitectureDiagram messages={messages} />
        </div>

        <div className="mt-8 space-y-4">
          <Paragraph>
            {messages.mentalModel.laptopExplanation}
          </Paragraph>
          <Paragraph>
            {messages.mentalModel.connectionExplanation}
          </Paragraph>
        </div>
      </Section>

      <Divider />

      {/* What This Tutorial Will Teach You */}
      <Section
        title={messages.whatYoullLearn.title}
        icon={<BookOpen className="h-5 w-5" />}
        delay={0.3}
      >
        <StepList
          steps={messages.whatYoullLearn.steps}
        />
      </Section>

      <Divider />

      {/* Tip */}
      <TipBox variant="tip">
        {messages.tipBox.content}
      </TipBox>
    </div>
  );
}

// =============================================================================
// AGENT CARD - Individual agent display
// =============================================================================
function AgentCard({
  name,
  shortcut,
  color,
}: {
  name: string;
  shortcut: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.15]"
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div className="relative flex flex-col items-center text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-4`}
        >
          <Bot className="h-7 w-7 text-white" />
        </div>
        <span className="font-bold text-white">{name}</span>
        <code className="mt-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-sm font-mono text-white/60">
          {shortcut}
        </code>
      </div>
    </motion.div>
  );
}

// =============================================================================
// ARCHITECTURE DIAGRAM - Visual representation of the system
// =============================================================================
function ArchitectureDiagram({ messages }: { messages: Messages }) {
  return (
    <div className="relative p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* Left side - Your Laptop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DiagramBox
            label={messages.mentalModel.diagram.yourLaptop.label}
            sublabel={messages.mentalModel.diagram.yourLaptop.sublabel}
            icon={<Laptop className="h-8 w-8" />}
            gradient="from-sky-500/20 to-blue-500/20"
          />
        </motion.div>

        {/* Connection Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="hidden md:flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-sky-500/50 to-primary/50" />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/[0.1]">
              <Wifi className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-mono text-white/50">{messages.mentalModel.diagram.sshConnection}</span>
            </div>
            <div className="h-px w-8 bg-gradient-to-r from-primary/50 to-emerald-500/50" />
            <ChevronRight className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="md:hidden flex flex-col items-center gap-2 py-4">
            <div className="w-px h-8 bg-gradient-to-b from-sky-500/50 to-primary/50" />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/[0.1]">
              <Wifi className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-mono text-white/50">{messages.mentalModel.diagram.sshConnection}</span>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-emerald-500/50" />
            <ChevronRight className="h-5 w-5 text-emerald-400 rotate-90" />
          </div>
        </motion.div>

        {/* Right side - VPS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <DiagramBox
            label={<Jargon term="vps">{messages.mentalModel.diagram.yourVps.label}</Jargon>}
            sublabel={messages.mentalModel.diagram.yourVps.sublabel}
            icon={<Cloud className="h-8 w-8" />}
            gradient="from-emerald-500/20 to-teal-500/20"
          />

          {/* VPS Components */}
          <div className="grid grid-cols-3 gap-3">
            <VPSComponent
              icon={<Server className="h-4 w-4" />}
              label={<Jargon term="tmux">{messages.mentalModel.diagram.vpsComponents.tmux.label}</Jargon>}
              sublabel={messages.mentalModel.diagram.vpsComponents.tmux.sublabel}
            />
            <VPSComponent
              icon={<Bot className="h-4 w-4" />}
              label={<Jargon term="ai-agents">{messages.mentalModel.diagram.vpsComponents.agents.label}</Jargon>}
              sublabel={messages.mentalModel.diagram.vpsComponents.agents.sublabel}
            />
            <VPSComponent
              icon={<Cpu className="h-4 w-4" />}
              label={<Jargon term="ntm">{messages.mentalModel.diagram.vpsComponents.ntm.label}</Jargon>}
              sublabel={messages.mentalModel.diagram.vpsComponents.ntm.sublabel}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function VPSComponent({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  sublabel: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.05 }}
      className="group flex flex-col items-center p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="text-white/60 mb-1 group-hover:text-primary group-hover:scale-110 transition-all duration-300">{icon}</div>
      <span className="text-xs font-medium text-white group-hover:text-primary transition-colors">{label}</span>
      <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors">{sublabel}</span>
    </motion.div>
  );
}
