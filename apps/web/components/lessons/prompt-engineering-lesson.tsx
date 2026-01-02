"use client";

import { motion } from "@/components/motion";
import {
  Sparkles,
  Brain,
  Target,
  Maximize2,
  Layers,
  Anchor,
  Clock,
  CheckSquare,
  Lightbulb,
  Zap,
  Eye,
  FileText,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  FeatureCard,
  FeatureGrid,
} from "./lesson-components";
import { useLocale, getPromptEngineeringLessonMessages } from "@/lib/i18n";

export function PromptEngineeringLesson() {
  const { locale } = useLocale();
  const messages = getPromptEngineeringLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Introduction */}
      <Section
        title={messages.introduction.title}
        icon={<Sparkles className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.introduction.intro} <Highlight>{messages.introduction.howYouDirect}</Highlight>.
          {messages.introduction.dissects}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Target className="h-5 w-5" />}
              title={messages.introduction.featureCards.intensityCalibration.title}
              description={messages.introduction.featureCards.intensityCalibration.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Maximize2 className="h-5 w-5" />}
              title={messages.introduction.featureCards.scopeControl.title}
              description={messages.introduction.featureCards.scopeControl.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Brain className="h-5 w-5" />}
              title={messages.introduction.featureCards.metacognition.title}
              description={messages.introduction.featureCards.metacognition.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Anchor className="h-5 w-5" />}
              title={messages.introduction.featureCards.contextAnchoring.title}
              description={messages.introduction.featureCards.contextAnchoring.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Pattern 1: Intensity Calibration */}
      <Section
        title={messages.pattern1.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.pattern1.intro} <Highlight>{messages.pattern1.stackedModifiers}</Highlight> {messages.pattern1.maxAttention}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.pattern1.intensityExamples.map((example, i) => (
            <IntensityExample
              key={i}
              phrase={example.phrase}
              effect={example.effect}
            />
          ))}
        </div>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.lowIntensity} />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.pattern1.notFillerWords}{" "}
            <strong>{messages.pattern1.calibrationSignals}</strong> {messages.pattern1.allocateReasoning}
          </TipBox>
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            <strong>{messages.pattern1.claudeCodeFeature.intro}</strong> {messages.pattern1.claudeCodeFeature.ultrathinkDesc}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Pattern 2: Scope Control */}
      <Section
        title={messages.pattern2.title}
        icon={<Maximize2 className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.pattern2.intro}
        </Paragraph>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ScopeCard
            direction="expand"
            title={messages.pattern2.scopeCards.expand.title}
            phrases={messages.pattern2.scopeCards.expand.phrases}
          />
          <ScopeCard
            direction="deepen"
            title={messages.pattern2.scopeCards.deepen.title}
            phrases={messages.pattern2.scopeCards.deepen.phrases}
          />
        </div>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.avoidingNarrow} />
        </div>
      </Section>

      <Divider />

      {/* Pattern 3: Self-Verification */}
      <Section
        title={messages.pattern3.title}
        icon={<CheckSquare className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.pattern3.intro} <Highlight>{messages.pattern3.metacognition}</Highlight>{messages.pattern3.forcingModel}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.pattern3.verificationQuestions.map((vq, i) => (
            <VerificationQuestion
              key={i}
              question={vq.question}
              purpose={vq.purpose}
            />
          ))}
        </div>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.planReview} />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            <strong>{messages.pattern3.planSpacePrinciple.title}</strong> {messages.pattern3.planSpacePrinciple.description}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Pattern 4: Fresh Eyes Technique */}
      <Section
        title={messages.pattern4.title}
        icon={<Eye className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          <Highlight>{messages.pattern4.intro}</Highlight> {messages.pattern4.helpAgents}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.pattern4.freshEyesTechniques.map((tech, i) => (
            <FreshEyesCard
              key={i}
              technique={tech.technique}
              example={tech.example}
              mechanism={tech.mechanism}
            />
          ))}
        </div>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.freshEyesReview} />
        </div>
      </Section>

      <Divider />

      {/* Pattern 5: Temporal Awareness */}
      <Section
        title={messages.pattern5.title}
        icon={<Clock className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.pattern5.intro} <Highlight>{messages.pattern5.futureContexts}</Highlight>{messages.pattern5.agentWillContinue}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.selfDocumenting} />
        </div>

        <div className="mt-6 space-y-3">
          {messages.pattern5.temporalConcepts.map((tc, i) => (
            <TemporalConcept
              key={i}
              concept={tc.concept}
              description={tc.description}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Pattern 6: Context Anchoring */}
      <Section
        title={messages.pattern6.title}
        icon={<Anchor className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>
          <Highlight>{messages.pattern6.intro}</Highlight> {messages.pattern6.agentsMd}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.postCompaction} />
        </div>

        <div className="mt-6">
          <TipBox variant="warning">
            <strong>{messages.pattern6.whyMatters.title}</strong>
            <br /><br />
            {messages.pattern6.whyMatters.reasons.map((reason, i) => (
              <span key={i}>
                {i + 1}. <strong>{reason.title}</strong> {reason.description}
                <br />
              </span>
            ))}
          </TipBox>
        </div>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.grounding} />
        </div>
      </Section>

      <Divider />

      {/* Pattern 7: First Principles */}
      <Section
        title={messages.pattern7.title}
        icon={<Layers className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>
          {messages.pattern7.intro} <Highlight>{messages.pattern7.deepUnderstanding}</Highlight> {messages.pattern7.overSurface}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock code={messages.codeBlocks.rootCause} />
        </div>

        <div className="mt-6 space-y-3">
          {messages.pattern7.principleCards.map((pc, i) => (
            <PrincipleCard
              key={i}
              principle={pc.principle}
              description={pc.description}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Putting It Together */}
      <Section
        title={messages.puttingTogether.title}
        icon={<Lightbulb className="h-5 w-5" />}
        delay={0.5}
      >
        <Paragraph>
          {messages.puttingTogether.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.codeBlocks.combinedExample}
            language="markdown"
          />
        </div>

        <div className="mt-6">
          <PatternBreakdown patterns={messages.puttingTogether.patternAnalysis.patterns} title={messages.puttingTogether.patternAnalysis.title} />
        </div>
      </Section>

      <Divider />

      {/* Quick Reference */}
      <Section
        title={messages.quickReference.title}
        icon={<FileText className="h-5 w-5" />}
        delay={0.55}
      >
        <div className="space-y-4">
          {messages.quickReference.items.map((item, i) => (
            <QuickRefItem
              key={i}
              pattern={item.pattern}
              when={item.when}
              key_phrases={item.keyPhrases}
              tableHeaders={messages.quickReference.tableHeaders}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// INTENSITY EXAMPLE
// =============================================================================
function IntensityExample({
  phrase,
  effect,
}: {
  phrase: string;
  effect: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 transition-all duration-300 hover:border-primary/40"
    >
      <code className="text-primary font-mono font-medium">&quot;{phrase}&quot;</code>
      <span className="text-white/60">→</span>
      <span className="text-white/70">{effect}</span>
    </motion.div>
  );
}

// =============================================================================
// SCOPE CARD
// =============================================================================
function ScopeCard({
  direction,
  title,
  phrases,
}: {
  direction: "expand" | "deepen";
  title: string;
  phrases: string[];
}) {
  const isExpand = direction === "expand";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 ${
        isExpand
          ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40"
          : "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40"
      }`}
    >
      <h4 className={`font-bold mb-3 ${isExpand ? "text-emerald-400" : "text-blue-400"}`}>
        {title}
      </h4>
      <ul className="space-y-2">
        {phrases.map((phrase) => (
          <li key={phrase} className="text-sm text-white/60 font-mono">
            &quot;{phrase}&quot;
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// =============================================================================
// VERIFICATION QUESTION
// =============================================================================
function VerificationQuestion({
  question,
  purpose,
}: {
  question: string;
  purpose: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group flex items-start gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 transition-all duration-300 hover:border-amber-500/40"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
        ?
      </div>
      <div>
        <p className="font-medium text-amber-300 italic">&quot;{question}&quot;</p>
        <p className="text-sm text-white/50 mt-1">→ {purpose}</p>
      </div>
    </motion.div>
  );
}

// =============================================================================
// FRESH EYES CARD
// =============================================================================
function FreshEyesCard({
  technique,
  example,
  mechanism,
}: {
  technique: string;
  example: string;
  mechanism: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40"
    >
      <div className="flex items-center gap-3 mb-3">
        <Eye className="h-5 w-5 text-violet-400" />
        <h4 className="font-bold text-violet-300">{technique}</h4>
      </div>
      <code className="text-sm text-white/70 font-mono">{example}</code>
      <p className="text-sm text-white/50 mt-2">↳ {mechanism}</p>
    </motion.div>
  );
}

// =============================================================================
// TEMPORAL CONCEPT
// =============================================================================
function TemporalConcept({
  concept,
  description,
}: {
  concept: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.15]"
    >
      <Clock className="h-4 w-4 text-primary shrink-0" />
      <span className="font-medium text-white">{concept}</span>
      <span className="text-white/40">—</span>
      <span className="text-sm text-white/50">{description}</span>
    </motion.div>
  );
}

// =============================================================================
// PRINCIPLE CARD
// =============================================================================
function PrincipleCard({
  principle,
  description,
}: {
  principle: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5 transition-all duration-300 hover:border-blue-500/40"
    >
      <Layers className="h-4 w-4 text-blue-400 shrink-0" />
      <span className="font-medium text-blue-300">{principle}</span>
      <span className="text-white/40">—</span>
      <span className="text-sm text-white/50">{description}</span>
    </motion.div>
  );
}

// =============================================================================
// PATTERN BREAKDOWN
// =============================================================================
function PatternBreakdown({
  patterns,
  title,
}: {
  patterns: { name: string; line: string }[];
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl">
      <h4 className="font-bold text-white mb-4">{title}</h4>
      <div className="space-y-2">
        {patterns.map((p, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="w-32 shrink-0 text-primary font-medium">{p.name}</span>
            <span className="text-white/40">←</span>
            <code className="text-white/60 font-mono text-xs">&quot;{p.line}&quot;</code>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// QUICK REF ITEM
// =============================================================================
function QuickRefItem({
  pattern,
  when,
  key_phrases,
  tableHeaders,
}: {
  pattern: string;
  when: string;
  key_phrases: string;
  tableHeaders: { pattern: string; when: string; keyPhrases: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group grid grid-cols-3 gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-primary/30"
    >
      <div>
        <span className="text-xs text-white/40 uppercase">{tableHeaders.pattern}</span>
        <p className="font-bold text-primary">{pattern}</p>
      </div>
      <div>
        <span className="text-xs text-white/40 uppercase">{tableHeaders.when}</span>
        <p className="text-sm text-white/70">{when}</p>
      </div>
      <div>
        <span className="text-xs text-white/40 uppercase">{tableHeaders.keyPhrases}</span>
        <p className="text-xs text-white/50 font-mono">{key_phrases}</p>
      </div>
    </motion.div>
  );
}
