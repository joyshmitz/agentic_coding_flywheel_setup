"use client";

import { motion } from "@/components/motion";
import {
  Lightbulb,
  FileText,
  Bot,
  GitBranch,
  Shield,
  MessageSquare,
  LayoutDashboard,
  Clock,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Play,
  Zap,
  Key,
  RefreshCw,
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
import { useLocale, getSlbCaseStudyLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getSlbCaseStudyLessonMessages>;

export function SlbCaseStudyLesson() {
  const { locale } = useLocale();
  const messages = getSlbCaseStudyLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* The Spark */}
      <Section
        title={messages.theSpark.title}
        icon={<Lightbulb className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.theSpark.tweetContext}{" "}
          <Highlight><Jargon term="ai-agents">{messages.theSpark.peerReview}</Jargon></Highlight>?
        </Paragraph>

        <div className="mt-8">
          <IdeaCard messages={messages} />
        </div>

        <Paragraph>
          {messages.theSpark.twoPersonRule} <InlineCode>rm -rf</InlineCode>,{" "}
          <InlineCode>kubectl delete</InlineCode>, або{" "}
          <InlineCode>DROP TABLE</InlineCode>.
        </Paragraph>
      </Section>

      <Divider />

      {/* Immediate Action */}
      <Section
        title={messages.immediateAction.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.immediateAction.intro}{" "}
          <Highlight>{messages.immediateAction.startImmediately}</Highlight> {messages.immediateAction.freshIdea}
        </Paragraph>

        <div className="mt-6">
          <TimelineCard messages={messages} />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.immediateAction.keyInsight}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Multi-Model Feedback */}
      <Section
        title={messages.feedbackLoop.title}
        icon={<MessageSquare className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.feedbackLoop.intro}
        </Paragraph>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FeedbackCard
            model={messages.feedbackLoop.models.claude.name}
            focus={messages.feedbackLoop.models.claude.focus}
            color="from-amber-500/20 to-orange-500/20"
          />
          <FeedbackCard
            model={messages.feedbackLoop.models.gemini.name}
            focus={messages.feedbackLoop.models.gemini.focus}
            color="from-blue-500/20 to-indigo-500/20"
          />
          <FeedbackCard
            model={messages.feedbackLoop.models.gpt.name}
            focus={messages.feedbackLoop.models.gpt.focus}
            color="from-emerald-500/20 to-teal-500/20"
          />
          <FeedbackCard
            model={messages.feedbackLoop.models.synthesis.name}
            focus={messages.feedbackLoop.models.synthesis.focus}
            color="from-violet-500/20 to-purple-500/20"
          />
        </div>

        <div className="mt-6">
          <Paragraph>
            {messages.feedbackLoop.integration}{" "}
            <strong>{messages.feedbackLoop.multipleVerification}</strong> {messages.feedbackLoop.ensureNothing}
          </Paragraph>
        </div>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.firstPass}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.feedbackLoop.foundSomething}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Converting to Beads */}
      <Section
        title={messages.planToBeads.title}
        icon={<LayoutDashboard className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.planToBeads.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.beadsCreation}
            showLineNumbers
          />
        </div>

        <div className="mt-8">
          <BeadsResultCard messages={messages} />
        </div>

        <div className="mt-6">
          <Paragraph>
            {messages.planToBeads.verificationIntro}
          </Paragraph>
        </div>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.beadsVerification}
            showLineNumbers
          />
        </div>
      </Section>

      <Divider />

      {/* What SLB Does */}
      <Section
        title={messages.whatSlbDoes.title}
        icon={<Shield className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          {messages.whatSlbDoes.intro}{" "}
          <Highlight>{messages.whatSlbDoes.twoPersonRuleHighlight}</Highlight> {messages.whatSlbDoes.forAgents}
        </Paragraph>

        <div className="mt-6">
          <RiskTierCard messages={messages} />
        </div>

        <div className="mt-8">
          <BulletList
            items={[
              <span key="1">{messages.whatSlbDoes.features.clientSide}</span>,
              <span key="2">{messages.whatSlbDoes.features.hashBinding}</span>,
              <span key="3">{messages.whatSlbDoes.features.preflightValidation}</span>,
              <span key="4">{messages.whatSlbDoes.features.rollbackCapture}</span>,
              <span key="5">{messages.whatSlbDoes.features.agentMailIntegration}</span>,
            ]}
          />
        </div>
      </Section>

      <Divider />

      {/* The Implementation Sprint */}
      <Section
        title={messages.implementationSprint.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.implementationSprint.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.implementation}
            showLineNumbers
          />
        </div>

        <div className="mt-8">
          <ResultsCard messages={messages} />
        </div>

        <Paragraph>
          {messages.implementationSprint.resultIntro}
        </Paragraph>
      </Section>

      <Divider />

      {/* Key Differences from Large Projects */}
      <Section
        title={messages.smallVsLarge.title}
        icon={<RefreshCw className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>
          {messages.smallVsLarge.intro}
        </Paragraph>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ComparisonCard
            title={messages.smallVsLarge.smallProject.title}
            items={messages.smallVsLarge.smallProject.items}
            gradient="from-emerald-500/20 to-teal-500/20"
          />
          <ComparisonCard
            title={messages.smallVsLarge.largeProject.title}
            items={messages.smallVsLarge.largeProject.items}
            gradient="from-violet-500/20 to-purple-500/20"
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.smallVsLarge.tip}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Lessons Learned */}
      <Section
        title={messages.lessonsLearned.title}
        icon={<CheckCircle2 className="h-5 w-5" />}
        delay={0.45}
      >
        <StepList
          steps={messages.lessonsLearned.steps}
        />
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
            code={messages.codeBlocks.tryItYourself}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.tryItYourself.tip}
          </TipBox>
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// IDEA CARD - The tweet inspiration
// =============================================================================
function IdeaCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-amber-500/50"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
          <Lightbulb className="h-6 w-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">{messages.ideaCard.title}</h4>
          <p className="text-white/70 text-sm italic">
            &quot;{messages.ideaCard.quote}&quot;
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
            <Key className="h-3 w-3" />
            <span>{messages.ideaCard.subtitle}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// TIMELINE CARD
// =============================================================================
function TimelineCard({ messages }: { messages: Messages }) {
  const icons = [Lightbulb, FileText, GitBranch, MessageSquare, LayoutDashboard];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -2 }}
      className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15]"
    >
      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        {messages.timeline.title}
      </h4>

      <div className="space-y-4">
        {messages.timeline.events.map((step, i) => {
          const Icon = icons[i] || Lightbulb;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 6 }}
              className="group flex items-center gap-4 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.02]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 group-hover:bg-primary/30 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 flex items-center gap-3">
                <span className="text-xs font-mono text-white/50 w-20">
                  {step.time}
                </span>
                <ArrowRight className="h-3 w-3 text-white/50 group-hover:text-primary/60 transition-colors" />
                <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{step.event}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// =============================================================================
// FEEDBACK CARD
// =============================================================================
function FeedbackCard({
  model,
  focus,
  color,
}: {
  model: string;
  focus: string;
  color: string;
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
        <span className="font-semibold text-white text-sm">{model}</span>
      </div>
      <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{focus}</p>
    </motion.div>
  );
}

// =============================================================================
// BEADS RESULT CARD
// =============================================================================
function BeadsResultCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-blue-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-sky-500/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <LayoutDashboard className="h-5 w-5 text-sky-400" />
        <h4 className="font-bold text-white">{messages.beadsResult.title}</h4>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-sky-400">14</div>
          <div className="text-xs text-white/60">{messages.beadsResult.epics}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-sky-400">62</div>
          <div className="text-xs text-white/60">{messages.beadsResult.tasks}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-sky-400">76</div>
          <div className="text-xs text-white/60">{messages.beadsResult.total}</div>
        </div>
      </div>

      <p className="mt-4 text-sm text-white/60">
        {messages.beadsResult.description}
      </p>
    </motion.div>
  );
}

// =============================================================================
// RISK TIER CARD
// =============================================================================
function RiskTierCard({ messages }: { messages: Messages }) {
  const tiers = [
    {
      name: messages.whatSlbDoes.riskTiers.critical.name,
      approvals: messages.whatSlbDoes.riskTiers.critical.approvals,
      examples: messages.whatSlbDoes.riskTiers.critical.examples,
      color: "from-red-500/20 to-rose-500/20",
      border: "border-red-500/30",
    },
    {
      name: messages.whatSlbDoes.riskTiers.dangerous.name,
      approvals: messages.whatSlbDoes.riskTiers.dangerous.approvals,
      examples: messages.whatSlbDoes.riskTiers.dangerous.examples,
      color: "from-orange-500/20 to-amber-500/20",
      border: "border-orange-500/30",
    },
    {
      name: messages.whatSlbDoes.riskTiers.caution.name,
      approvals: messages.whatSlbDoes.riskTiers.caution.approvals,
      examples: messages.whatSlbDoes.riskTiers.caution.examples,
      color: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/30",
    },
    {
      name: messages.whatSlbDoes.riskTiers.safe.name,
      approvals: messages.whatSlbDoes.riskTiers.safe.approvals,
      examples: messages.whatSlbDoes.riskTiers.safe.examples,
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -2, scale: 1.02 }}
          className={`group rounded-xl border ${tier.border} bg-gradient-to-br ${tier.color} p-4 backdrop-blur-xl transition-all duration-300 hover:border-opacity-80`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white text-sm">{tier.name}</span>
            <span className="text-xs px-2 py-1 rounded bg-black/30 text-white/70 group-hover:bg-black/40 transition-colors">
              {tier.approvals}
            </span>
          </div>
          <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{tier.examples}</p>
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// RESULTS CARD
// =============================================================================
function ResultsCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-emerald-500/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        <h4 className="font-bold text-white">{messages.implementationResults.title}</h4>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-emerald-400">268</div>
          <div className="text-xs text-white/60">{messages.implementationResults.totalCommits}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-emerald-400">Go 1.21+</div>
          <div className="text-xs text-white/60">{messages.implementationResults.builtIn}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-black/20">
          <div className="text-2xl font-bold text-emerald-400">~70%</div>
          <div className="text-xs text-white/60">{messages.implementationResults.dayOneComplete}</div>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// COMPARISON CARD
// =============================================================================
function ComparisonCard({
  title,
  items,
  gradient,
}: {
  title: string;
  items: string[];
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group rounded-xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15]`}
    >
      <h4 className="font-bold text-white mb-3 group-hover:text-primary transition-colors">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-white/70 flex items-center gap-2 group-hover:text-white/80 transition-colors">
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 shrink-0 group-hover:bg-primary/60 transition-colors" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
