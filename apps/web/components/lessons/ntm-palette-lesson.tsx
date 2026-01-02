"use client";

import { motion } from "@/components/motion";
import {
  Palette,
  Sparkles,
  Code2,
  FileText,
  Bug,
  TestTube,
  Layers,
  Send,
  FolderOpen,
  Lightbulb,
  Play,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  Highlight,
  Divider,
  GoalBanner,
  InlineCode,
  BulletList,
} from "./lesson-components";
import { useLocale, getNtmPaletteLessonMessages } from "@/lib/i18n";

export function NtmPaletteLesson() {
  const { locale } = useLocale();
  const messages = getNtmPaletteLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is The Command Palette */}
      <Section
        title={messages.whatIsCommandPalette.title}
        icon={<Palette className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.whatIsCommandPalette.description1.split(messages.whatIsCommandPalette.highlight1)[0]}
          <Highlight>{messages.whatIsCommandPalette.highlight1}</Highlight>
          {messages.whatIsCommandPalette.description1.split(messages.whatIsCommandPalette.highlight1)[1]}
        </Paragraph>
        <Paragraph>
          {messages.whatIsCommandPalette.description2}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock code="ntm palette" />
        </div>
        <Paragraph>
          {messages.whatIsCommandPalette.browserDescription}
        </Paragraph>
      </Section>

      <Divider />

      {/* Palette Categories */}
      <Section
        title={messages.paletteCategories.title}
        icon={<Layers className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>{messages.paletteCategories.intro}</Paragraph>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            icon={<Layers className="h-5 w-5" />}
            title={messages.paletteCategories.categories.architectureDesign.title}
            items={messages.paletteCategories.categories.architectureDesign.items}
            gradient="from-violet-500/20 to-purple-500/20"
            delay={0.1}
          />
          <CategoryCard
            icon={<Code2 className="h-5 w-5" />}
            title={messages.paletteCategories.categories.codeQuality.title}
            items={messages.paletteCategories.categories.codeQuality.items}
            gradient="from-sky-500/20 to-blue-500/20"
            delay={0.2}
          />
          <CategoryCard
            icon={<TestTube className="h-5 w-5" />}
            title={messages.paletteCategories.categories.testing.title}
            items={messages.paletteCategories.categories.testing.items}
            gradient="from-emerald-500/20 to-teal-500/20"
            delay={0.3}
          />
          <CategoryCard
            icon={<FileText className="h-5 w-5" />}
            title={messages.paletteCategories.categories.documentation.title}
            items={messages.paletteCategories.categories.documentation.items}
            gradient="from-amber-500/20 to-orange-500/20"
            delay={0.4}
          />
          <CategoryCard
            icon={<Bug className="h-5 w-5" />}
            title={messages.paletteCategories.categories.debugging.title}
            items={messages.paletteCategories.categories.debugging.items}
            gradient="from-red-500/20 to-rose-500/20"
            delay={0.5}
          />
        </div>
      </Section>

      <Divider />

      {/* Using Palette Prompts */}
      <Section
        title={messages.usingPalettePrompts.title}
        icon={<Send className="h-5 w-5" />}
        delay={0.2}
      >
        <div className="space-y-8">
          <UsageOption
            number={1}
            title={messages.usingPalettePrompts.options.copyAndSend.title}
            steps={messages.usingPalettePrompts.options.copyAndSend.steps.map((step, i) =>
              i === 0 ? <>{step.split(':')[0]}: <InlineCode>ntm palette</InlineCode></> :
              i === 3 ? <>{step.split('ntm send')[0]}<InlineCode>ntm send</InlineCode>{step.split('ntm send')[1]}</> :
              step
            )}
          />

          <UsageOption
            number={2}
            title={messages.usingPalettePrompts.options.directSend.title}
            steps={[]}
          >
            <div className="mt-4">
              <CodeBlock code="ntm palette myproject --send" />
            </div>
            <p className="mt-3 text-white/60">
              {messages.usingPalettePrompts.options.directSend.description}
            </p>
          </UsageOption>
        </div>
      </Section>

      <Divider />

      {/* Example Prompts */}
      <Section
        title={messages.examplePrompts.title}
        icon={<Sparkles className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>{messages.examplePrompts.intro}</Paragraph>

        <div className="mt-8 space-y-6">
          <ExamplePrompt
            title={messages.examplePrompts.examples.codeReview.title}
            prompt={messages.examplePrompts.examples.codeReview.prompt}
            gradient="from-sky-500/20 to-blue-500/20"
          />

          <ExamplePrompt
            title={messages.examplePrompts.examples.architectureAnalysis.title}
            prompt={messages.examplePrompts.examples.architectureAnalysis.prompt}
            gradient="from-violet-500/20 to-purple-500/20"
          />
        </div>
      </Section>

      <Divider />

      {/* Customizing The Palette */}
      <Section
        title={messages.customizingPalette.title}
        icon={<FolderOpen className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>{messages.customizingPalette.intro}</Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# ${messages.customizingPalette.location}
~/.acfs/palette/custom/`}
          />
        </div>

        <Paragraph>
          {messages.customizingPalette.instructions}
        </Paragraph>
      </Section>

      <Divider />

      {/* Pro Tips */}
      <Section
        title={messages.proTips.title}
        icon={<Lightbulb className="h-5 w-5" />}
        delay={0.35}
      >
        <div className="mt-4">
          <BulletList
            items={messages.proTips.tips.map((tip, i) => (
              <span key={i}>
                <strong>{tip.title}</strong> - {tip.description}
              </span>
            ))}
          />
        </div>
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title={messages.tryItNow.title}
        icon={<Play className="h-5 w-5" />}
        delay={0.4}
      >
        <CodeBlock
          code={`# ${messages.tryItNow.comment1}
$ ntm palette

# ${messages.tryItNow.comment2}
# ${messages.tryItNow.comment3}
# ${messages.tryItNow.comment4}`}
          showLineNumbers
        />
      </Section>
    </div>
  );
}

// =============================================================================
// CATEGORY CARD - Display a palette category
// =============================================================================
function CategoryCard({
  icon,
  title,
  items,
  gradient,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-white">{icon}</div>
        <h4 className="font-bold text-white">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-white/60 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-white/40" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// =============================================================================
// USAGE OPTION - How to use the palette
// =============================================================================
function UsageOption({
  number,
  title,
  steps,
  children,
}: {
  number: number;
  title: string;
  steps: React.ReactNode[];
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white font-bold shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-300">
          {number}
        </div>
        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
      </div>

      {steps.length > 0 && (
        <ol className="space-y-2 ml-14">
          {steps.map((step, i) => (
            <li key={i} className="text-white/70 flex items-center gap-2 group-hover:text-white/80 transition-colors">
              <span className="text-primary font-medium">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      )}

      {children}
    </motion.div>
  );
}

// =============================================================================
// EXAMPLE PROMPT - Display an example prompt
// =============================================================================
function ExamplePrompt({
  title,
  prompt,
  gradient,
}: {
  title: string;
  prompt: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg hover:shadow-primary/10`}
    >
      <div className="p-4 border-b border-white/[0.08] bg-black/20 group-hover:bg-black/30 transition-colors">
        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
      </div>
      <div className="p-4">
        <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono group-hover:text-white/90 transition-colors">
          {prompt}
        </pre>
      </div>
    </motion.div>
  );
}
