"use client";

import { motion } from "@/components/motion";
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  AlertTriangle,
  Layers,
  KeyRound,
  Zap,
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
  BulletList,
} from "./lesson-components";
import { useLocale } from "@/lib/i18n";
import { getDcgLessonMessages } from "@/lib/i18n/translations";

export function DcgLesson() {
  const { locale } = useLocale();
  const messages = getDcgLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      <Section
        title={messages.whatIsDcg.title}
        icon={<ShieldAlert className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight>DCG (Destructive Command Guard)</Highlight> {messages.whatIsDcg.description}
        </Paragraph>
        <Paragraph>
          {messages.whatIsDcg.thinkOfIt}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title={messages.whatIsDcg.features.preExecutionBlocking.title}
              description={messages.whatIsDcg.features.preExecutionBlocking.description}
              gradient="from-red-500/20 to-rose-500/20"
            />
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title={messages.whatIsDcg.features.protectionPacks.title}
              description={messages.whatIsDcg.features.protectionPacks.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<KeyRound className="h-5 w-5" />}
              title={messages.whatIsDcg.features.allowOnceCodes.title}
              description={messages.whatIsDcg.features.allowOnceCodes.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title={messages.whatIsDcg.features.failOpenDesign.title}
              description={messages.whatIsDcg.features.failOpenDesign.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      <Section
        title={messages.howItWorks.title}
        icon={<ShieldCheck className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.howItWorks.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.howItWorks.example.code}
            language={messages.howItWorks.example.language}
          />
        </div>

        <TipBox variant="warning">
          If DCG blocks a command, slow down and read the explanation. It is
          showing you the dangerous part and a safer path.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title={messages.essentialCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.2}
      >
        <CommandList commands={messages.essentialCommands.commands} />
      </Section>

      <Divider />

      <Section
        title={messages.uninstalling.title}
        icon={<ShieldAlert className="h-5 w-5" />}
        delay={0.23}
      >
        <Paragraph>
          {messages.uninstalling.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.uninstalling.example.code}
            language={messages.uninstalling.example.language}
          />
        </div>

        <TipBox variant="info">
          If you still want command safety but fewer blocks, prefer adjusting
          packs instead of uninstalling.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title={messages.protectionPacks.title}
        icon={<Layers className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.protectionPacks.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.protectionPacks.example.code}
            language={messages.protectionPacks.example.language}
            filename={messages.protectionPacks.example.filename}
          />
        </div>

        <TipBox variant="info">
          Start with <Highlight>git</Highlight> and{" "}
          <Highlight>filesystem</Highlight> packs. Add database or cloud packs
          only when you use those tools.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title={messages.whenBlocked.title}
        icon={<AlertTriangle className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          {messages.whenBlocked.description}
        </Paragraph>
        <BulletList items={messages.whenBlocked.steps} />
      </Section>

      <Divider />

      <Section
        title={messages.dcgPlusSLB.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.35}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <Paragraph>
            {messages.dcgPlusSLB.description}
          </Paragraph>
        </motion.div>
      </Section>
    </div>
  );
}
