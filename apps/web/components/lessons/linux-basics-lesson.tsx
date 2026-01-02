"use client";

import { motion } from "@/components/motion";
import {
  FolderOpen,
  Eye,
  Move,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  CommandList,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  InlineCode,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getLinuxBasicsLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getLinuxBasicsLessonMessages>;

export function LinuxBasicsLesson() {
  const { locale } = useLocale();
  const messages = getLinuxBasicsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Where Am I */}
      <Section
        title={messages.whereAmI.title}
        icon={<MapPin className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.whereAmI.intro}
        </Paragraph>
        <div className="mt-6">
          <CodeBlock code="$ pwd" />
        </div>
        <Paragraph>
          {messages.whereAmI.explanation}{" "}
          <InlineCode>/home/ubuntu</InlineCode>.
        </Paragraph>
      </Section>

      <Divider />

      {/* What's Here */}
      <Section
        title={messages.whatsHere.title}
        icon={<FolderOpen className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.whatsHere.intro}
        </Paragraph>
        <div className="mt-6">
          <CodeBlock code="$ ls" />
        </div>
        <Paragraph>
          {messages.whatsHere.aliasInfo} <InlineCode>lsd</InlineCode> (<Jargon term="alias">{messages.whatsHere.aliasDescription}</Jargon>)
        </Paragraph>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">
            {messages.whatsHere.variations.title}
          </h4>
          <CommandList
            commands={[
              { command: "ll", description: messages.whatsHere.variations.commands.ll },
              { command: "la", description: messages.whatsHere.variations.commands.la },
              { command: "tree", description: messages.whatsHere.variations.commands.tree },
            ]}
          />
        </div>
      </Section>

      <Divider />

      {/* Moving Around */}
      <Section
        title={messages.movingAround.title}
        icon={<Move className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.movingAround.intro} <InlineCode>cd</InlineCode> {messages.movingAround.command}
        </Paragraph>

        <div className="mt-6">
          <CommandList
            commands={[
              {
                command: "cd /data/projects",
                description: messages.movingAround.commands.cdProjects,
              },
              { command: "cd ~", description: messages.movingAround.commands.cdHome },
              { command: "cd ..", description: messages.movingAround.commands.cdUp },
              { command: "cd -", description: messages.movingAround.commands.cdPrevious },
            ]}
          />
        </div>

        <div className="mt-8">
          <TipBox variant="tip">
            {messages.movingAround.tipBox.content} <Highlight>{messages.movingAround.tipBox.toolName}</Highlight> {messages.movingAround.tipBox.description}{" "}
            <InlineCode>{messages.movingAround.tipBox.jumpCommand}</InlineCode> {messages.movingAround.tipBox.afterVisiting}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Creating Things */}
      <Section
        title={messages.creatingThings.title}
        icon={<Plus className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>{messages.creatingThings.intro}</Paragraph>

        <div className="mt-6">
          <CommandList
            commands={[
              { command: "mkdir my-project", description: messages.creatingThings.commands.mkdir },
              {
                command: "mkcd my-project",
                description: messages.creatingThings.commands.mkcd,
              },
              { command: "touch file.txt", description: messages.creatingThings.commands.touch },
            ]}
          />
        </div>
      </Section>

      <Divider />

      {/* Viewing Files */}
      <Section
        title={messages.viewingFiles.title}
        icon={<Eye className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>{messages.viewingFiles.intro}</Paragraph>

        <div className="mt-6">
          <CommandList
            commands={[
              {
                command: "cat file.txt",
                description: messages.viewingFiles.commands.cat,
              },
              {
                command: "less file.txt",
                description: messages.viewingFiles.commands.less,
              },
              { command: "head -20 file.txt", description: messages.viewingFiles.commands.head },
              { command: "tail -20 file.txt", description: messages.viewingFiles.commands.tail },
            ]}
          />
        </div>
      </Section>

      <Divider />

      {/* Deleting Things */}
      <Section
        title={messages.deletingThings.title}
        icon={<Trash2 className="h-5 w-5" />}
        delay={0.35}
      >
        <div className="mb-6">
          <TipBox variant="warning">
            {messages.deletingThings.warningBox.content} <strong>{messages.deletingThings.warningBox.emphasis}</strong>
          </TipBox>
        </div>

        <CommandList
          commands={[
            { command: "rm file.txt", description: messages.deletingThings.commands.rmFile },
            {
              command: "rm -rf directory/",
              description: messages.deletingThings.commands.rmDirectory,
            },
          ]}
        />
      </Section>

      <Divider />

      {/* Searching */}
      <Section
        title={messages.searching.title}
        icon={<Search className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>{messages.searching.intro}</Paragraph>

        <div className="mt-6">
          <CommandList
            commands={[
              {
                command: 'rg "search term"',
                description: messages.searching.commands.ripgrep,
              },
              { command: 'fd "pattern"', description: messages.searching.commands.fd },
            ]}
          />
        </div>
      </Section>

      <Divider />

      {/* Verify Section */}
      <Section
        title={messages.verify.title}
        icon={<CheckCircle2 className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>{messages.verify.intro}</Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`$ cd /data/projects
$ mkcd acfs-test
$ pwd
$ touch hello.txt
$ ls
$ cat hello.txt
$ cd ..
$ ls`}
            showLineNumbers
          />
        </div>

        <div className="mt-8">
          <VerificationCard messages={messages} />
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// VERIFICATION CARD - Success state indicator
// =============================================================================
function VerificationCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ delay: 0.6 }}
      className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors duration-500" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-300">
          <CheckCircle2 className="h-7 w-7 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{messages.verify.verificationCard.title}</h4>
          <p className="text-emerald-300/80 group-hover:text-emerald-200 transition-colors">
            {messages.verify.verificationCard.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
