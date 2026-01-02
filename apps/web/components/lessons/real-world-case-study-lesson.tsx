"use client";

import { type ReactNode } from "react";
import { motion } from "@/components/motion";
import {
  Rocket,
  FileText,
  Bot,
  GitBranch,
  Users,
  Mail,
  LayoutDashboard,
  Brain,
  Layers,
  Play,
  TrendingUp,
  BookOpen,
  ExternalLink,
  CheckCircle,
  Code,
  Database,
  Terminal,
  Lightbulb,
  Shield,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  InlineCode,
  BulletList,
  StepList,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getRealWorldCaseStudyLessonMessages } from "@/lib/i18n";

export function RealWorldCaseStudyLesson() {
  const { locale } = useLocale();
  const messages = getRealWorldCaseStudyLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Introduction */}
      <Section
        title={messages.introduction.title}
        icon={<Brain className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.introduction.intro}{" "}
          <Highlight><Jargon term="cass">{messages.introduction.cassMemory}</Jargon></Highlight> {messages.introduction.description}
        </Paragraph>

        <div className="mt-8">
          <ResultsCard />
        </div>

        <Paragraph>
          {messages.introduction.walkThrough}
        </Paragraph>
      </Section>

      <Divider />

      {/* Phase 1: Multi-Model Planning */}
      <Section
        title={messages.phase1.title}
        icon={<FileText className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.phase1.intro}{" "}
          <Highlight>{messages.phase1.gatherPerspectives}</Highlight> {messages.phase1.onProblem}
        </Paragraph>

        <div className="mt-8">
          <PhaseCard
            phase={1}
            title={messages.phase1.collectProposals.title}
            description={messages.phase1.collectProposals.description}
          >
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ModelCard
                name={messages.phase1.models.gpt.name}
                color="from-emerald-500/20 to-teal-500/20"
                focus={messages.phase1.models.gpt.focus}
              />
              <ModelCard
                name={messages.phase1.models.gemini.name}
                color="from-blue-500/20 to-indigo-500/20"
                focus={messages.phase1.models.gemini.focus}
              />
              <ModelCard
                name={messages.phase1.models.grok.name}
                color="from-violet-500/20 to-purple-500/20"
                focus={messages.phase1.models.grok.focus}
              />
              <ModelCard
                name={messages.phase1.models.claude.name}
                color="from-amber-500/20 to-orange-500/20"
                focus={messages.phase1.models.claude.focus}
              />
            </div>
          </PhaseCard>
        </div>

        <div className="mt-6">
          <Paragraph>
            {messages.phase1.instruction}
          </Paragraph>
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.phase1.tipSaveConversations.intro}{" "}
            <InlineCode>chat_shared_conversation_to_file</InlineCode> {messages.phase1.tipSaveConversations.toolMention}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Phase 2: Synthesis */}
      <Section
        title={messages.phase2.title}
        icon={<Layers className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.phase2.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.competingProposals}
            showLineNumbers
          />
        </div>

        <div className="mt-8">
          <SynthesisResultCard messages={messages} />
        </div>

        <Paragraph>
          {messages.phase2.resultLines}
        </Paragraph>
      </Section>

      <Divider />

      {/* Anatomy of a Great Plan */}
      <Section
        title={messages.planAnatomy.title}
        icon={<BookOpen className="h-5 w-5" />}
        delay={0.22}
      >
        <Paragraph>
          {messages.planAnatomy.intro}{" "}
          <a
            href="https://github.com/Dicklesworthstone/cass_memory_system/blob/main/PLAN_FOR_CASS_MEMORY_SYSTEM.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline inline-flex items-center gap-1"
          >
            {messages.planAnatomy.actualPlan}
            <ExternalLink className="h-3 w-3" />
          </a>{" "}
          {messages.planAnatomy.soEffective}
        </Paragraph>

        {/* Document Structure */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-violet-400" />
            {messages.planAnatomy.documentStructure.title}
          </h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {messages.planAnatomy.documentStructure.sections.map((section, i) => (
              <PlanSectionCard
                key={i}
                number={section.number}
                title={section.title}
                description={section.description}
                icon={getSectionIcon(section.number)}
              />
            ))}
          </div>
        </div>

        {/* Key Patterns */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-400" />
            {messages.planAnatomy.effectivePatterns.title}
          </h4>
          <div className="space-y-4">
            {messages.planAnatomy.effectivePatterns.patterns.map((pattern, i) => (
              <PlanPatternCard
                key={i}
                title={pattern.title}
                description={pattern.description}
                gradient={pattern.gradient}
              />
            ))}
          </div>
        </div>

        {/* Distinctive Innovations */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            {messages.planAnatomy.distinctiveInnovations.title}
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {messages.planAnatomy.distinctiveInnovations.innovations.map((innovation, i) => (
              <InnovationCard
                key={i}
                title={innovation.title}
                description={innovation.description}
              />
            ))}
          </div>
        </div>

        {/* What to Include Checklist */}
        <div className="mt-8">
          <TipBox variant="tip">
            <strong>{messages.planAnatomy.planChecklist.title}</strong>
            <ul className="mt-2 space-y-1 text-sm">
              {messages.planAnatomy.planChecklist.items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </TipBox>
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.planAnatomy.studyTemplate.intro}{" "}
            <a
              href="https://github.com/Dicklesworthstone/cass_memory_system/blob/main/PLAN_FOR_CASS_MEMORY_SYSTEM.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {messages.planAnatomy.studyTemplate.github}
            </a>
            . {messages.planAnatomy.studyTemplate.study}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Phase 3: Beads Transformation */}
      <Section
        title={messages.phase3.title}
        icon={<LayoutDashboard className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.phase3.intro}{" "}
          <Highlight><Jargon term="beads">{messages.phase3.structuredTasks}</Jargon></Highlight>. {messages.phase3.whereBead}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.beadsInit}
            showLineNumbers
          />
        </div>

        <div className="mt-8">
          <BeadsTransformationCard messages={messages} />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.phase3.multiplePassesToRefine}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Phase 4: Swarm Execution */}
      <Section
        title={messages.phase4.title}
        icon={<Users className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          {messages.phase4.intro}{" "}
          <Highlight>{messages.phase4.unleashSwarm}</Highlight>. {messages.phase4.multipleAgents}
        </Paragraph>

        <div className="mt-6">
          <SwarmSetupCard messages={messages} />
        </div>

        <div className="mt-8">
          <CodeBlock
            code={messages.codeBlocks.swarmWorkflow}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <Paragraph>
            {messages.phase4.coordination}
          </Paragraph>
        </div>
      </Section>

      <Divider />

      {/* Agent Coordination */}
      <Section
        title={messages.agentCoordination.title}
        icon={<Mail className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.agentCoordination.intro}{" "}
          <Highlight>{messages.agentCoordination.agentMail}</Highlight> {messages.agentCoordination.providesCommunication}
        </Paragraph>

        <div className="mt-6">
          <BulletList
            items={messages.agentCoordination.features.map((feature, i) => (
              <span key={i}>
                <strong>{feature.title}</strong> {feature.description}
              </span>
            ))}
          />
        </div>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.agentMailExample}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.agentCoordination.fullArchivePublished.split("published as a static site")[0]}
            <a
              href="https://dicklesworthstone.github.io/cass-memory-system-agent-mailbox-viewer/viewer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              published as a static site
            </a>
            {messages.agentCoordination.fullArchivePublished.split("published as a static site")[1]}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* The Commit Cadence */}
      <Section
        title={messages.commitCadence.title}
        icon={<GitBranch className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>
          {messages.commitCadence.intro}{" "}
          <Highlight>{messages.commitCadence.commitAgent}</Highlight> {messages.commitCadence.runsContinuously}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.commitAgent}
            showLineNumbers
          />
        </div>

        <div className="mt-8">
          <CommitStatsCard messages={messages} />
        </div>

        <Paragraph>
          {messages.commitCadence.atomicCommits}
        </Paragraph>
      </Section>

      <Divider />

      {/* Results & Lessons */}
      <Section
        title={messages.resultsLessons.title}
        icon={<TrendingUp className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>
          {messages.resultsLessons.intro}
        </Paragraph>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value={messages.resultsLessons.stats.linesOfCode.value}
            label={messages.resultsLessons.stats.linesOfCode.label}
            gradient="from-emerald-500/20 to-teal-500/20"
          />
          <StatCard
            value={messages.resultsLessons.stats.day1Commits.value}
            label={messages.resultsLessons.stats.day1Commits.label}
            gradient="from-sky-500/20 to-blue-500/20"
          />
          <StatCard
            value={messages.resultsLessons.stats.testsPassing.value}
            label={messages.resultsLessons.stats.testsPassing.label}
            gradient="from-violet-500/20 to-purple-500/20"
          />
          <StatCard
            value={messages.resultsLessons.stats.complete.value}
            label={messages.resultsLessons.stats.complete.label}
            gradient="from-amber-500/20 to-orange-500/20"
          />
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">{messages.resultsLessons.keyLessons.title}</h4>
          <StepList
            steps={messages.resultsLessons.keyLessons.lessons}
          />
        </div>
      </Section>

      <Divider />

      {/* Try It Yourself */}
      <Section
        title={messages.tryItYourself.title}
        icon={<Play className="h-5 w-5" />}
        delay={0.5}
      >
        <Paragraph>
          {messages.tryItYourself.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.quickstart}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.tryItYourself.tip.intro}
          </TipBox>
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// HELPER FUNCTION - Get icon for plan section
// =============================================================================
function getSectionIcon(number: number) {
  const icons: Record<number, React.ReactNode> = {
    1: <Rocket className="h-4 w-4" />,
    2: <Brain className="h-4 w-4" />,
    3: <Database className="h-4 w-4" />,
    4: <Terminal className="h-4 w-4" />,
    5: <Layers className="h-4 w-4" />,
    6: <Code className="h-4 w-4" />,
    7: <Bot className="h-4 w-4" />,
    8: <Database className="h-4 w-4" />,
    9: <Users className="h-4 w-4" />,
    10: <TrendingUp className="h-4 w-4" />,
    11: <CheckCircle className="h-4 w-4" />,
  };
  return icons[number] || <Layers className="h-4 w-4" />;
}

// =============================================================================
// MESSAGE TYPE
// =============================================================================
type Messages = ReturnType<typeof getRealWorldCaseStudyLessonMessages>;

// =============================================================================
// RESULTS CARD - Day 1 results summary
// =============================================================================
function ResultsCard() {
  const { locale } = useLocale();
  const messages = getRealWorldCaseStudyLessonMessages(locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="h-6 w-6 text-emerald-400" />
          <h4 className="text-lg font-bold text-white">{messages.dayOneResults.title}</h4>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">693</div>
            <div className="text-sm text-white/60">{messages.dayOneResults.stats.totalBeads}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">282</div>
            <div className="text-sm text-white/60">{messages.dayOneResults.stats.day1Commits}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">25+</div>
            <div className="text-sm text-white/60">{messages.dayOneResults.stats.agentsInvolved}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">~5hrs</div>
            <div className="text-sm text-white/60">{messages.dayOneResults.stats.toComplete}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// PHASE CARD - Workflow phase container
// =============================================================================
function PhaseCard({
  phase,
  title,
  description,
  children,
}: {
  phase: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15]"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white font-bold">
          {phase}
        </div>
        <div>
          <h4 className="font-bold text-white">{title}</h4>
          <p className="text-sm text-white/50">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

// =============================================================================
// MODEL CARD - Individual AI model proposal
// =============================================================================
function ModelCard({
  name,
  color,
  focus,
}: {
  name: string;
  color: string;
  focus: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group rounded-xl border border-white/[0.08] bg-gradient-to-br ${color} p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15]`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Bot className="h-4 w-4 text-white/80 group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-white text-sm">{name}</span>
      </div>
      <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{focus}</p>
    </motion.div>
  );
}

// =============================================================================
// SYNTHESIS RESULT CARD
// =============================================================================
function SynthesisResultCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-violet-500/50"
    >
      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
        <FileText className="h-5 w-5 text-violet-400" />
        {messages.phase2.synthesisResult.title}
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="text-sm text-white/70">
          <span className="text-violet-400 font-semibold">5,600+</span> {messages.phase2.synthesisResult.lines}
        </div>
        <div className="text-sm text-white/70">
          <span className="text-violet-400 font-semibold">11</span> {messages.phase2.synthesisResult.sections}
        </div>
        <div className="text-sm text-white/70">
          <span className="text-violet-400 font-semibold">{messages.phase2.synthesisResult.bestIdeas}</span> {messages.phase2.synthesisResult.fromModels}
        </div>
        <div className="text-sm text-white/70">
          <span className="text-violet-400 font-semibold">{messages.phase2.synthesisResult.complete}</span>{" "}
          {messages.phase2.synthesisResult.roadmap}
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// BEADS TRANSFORMATION CARD
// =============================================================================
function BeadsTransformationCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-blue-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-sky-500/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <LayoutDashboard className="h-5 w-5 text-sky-400" />
        <h4 className="font-bold text-white">{messages.phase3.transformation.title}</h4>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-sky-400">14</div>
          <div className="text-xs text-white/60">{messages.phase3.transformation.epics}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-sky-400">350+</div>
          <div className="text-xs text-white/60">{messages.phase3.transformation.tasks}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-sky-400">13h</div>
          <div className="text-xs text-white/60">{messages.phase3.transformation.leadTime}</div>
        </div>
      </div>

      <p className="mt-4 text-sm text-white/60">
        {messages.phase3.transformation.description}
      </p>
    </motion.div>
  );
}

// =============================================================================
// SWARM SETUP CARD
// =============================================================================
function SwarmSetupCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-amber-500/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-5 w-5 text-amber-400" />
        <h4 className="font-bold text-white">{messages.phase4.swarmSetup.title}</h4>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{messages.phase4.swarmSetup.claudeCode.name}</div>
            <div className="text-xs text-white/50">{messages.phase4.swarmSetup.claudeCode.agents}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{messages.phase4.swarmSetup.codexCli.name}</div>
            <div className="text-xs text-white/50">{messages.phase4.swarmSetup.codexCli.agents}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{messages.phase4.swarmSetup.geminiCli.name}</div>
            <div className="text-xs text-white/50">{messages.phase4.swarmSetup.geminiCli.agents}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// COMMIT STATS CARD
// =============================================================================
function CommitStatsCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-pink-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-rose-500/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <GitBranch className="h-5 w-5 text-rose-400" />
        <h4 className="font-bold text-white">{messages.commitCadence.commitStats.title}</h4>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-rose-400">282</div>
          <div className="text-xs text-white/60">{messages.commitCadence.commitStats.day1Commits}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-rose-400">~12</div>
          <div className="text-xs text-white/60">{messages.commitCadence.commitStats.perHour}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-rose-400">{messages.commitCadence.commitStats.detailed}</div>
          <div className="text-xs text-white/60">{messages.commitCadence.commitStats.messages}</div>
        </div>
      </div>

      <p className="mt-4 text-sm text-white/60">
        {messages.commitCadence.commitStats.description}
      </p>
    </motion.div>
  );
}

// =============================================================================
// STAT CARD
// =============================================================================
function StatCard({
  value,
  label,
  gradient,
}: {
  value: string;
  label: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-4 text-center backdrop-blur-xl`}
    >
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </motion.div>
  );
}

// =============================================================================
// PLAN SECTION CARD - Shows a section from the plan document
// =============================================================================
function PlanSectionCard({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.03 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="group relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 text-xs font-bold group-hover:bg-violet-500/30 transition-colors">
          {number}
        </div>
        <div className="text-violet-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <h5 className="font-semibold text-white text-sm mb-1 group-hover:text-violet-300 transition-colors">
        {title}
      </h5>
      <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}

// =============================================================================
// PLAN PATTERN CARD - Shows a pattern that makes plans effective
// =============================================================================
function PlanPatternCard({
  title,
  description,
  gradient,
}: {
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className={`group relative rounded-xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15]`}
    >
      <h5 className="font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
        {title}
      </h5>
      <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}

// =============================================================================
// INNOVATION CARD - Shows distinctive innovations from the plan
// =============================================================================
function InnovationCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="group relative rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10"
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        <h5 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
          {title}
        </h5>
      </div>
      <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}
