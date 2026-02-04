"use client";

import { motion } from "@/components/motion";
import {
  Shield,
  Activity,
  Gauge,
  Terminal,
  Settings,
  Zap,
  Monitor,
  Cpu,
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

export function SrpsLessonUk() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Підтримуйте чуйність робочої станції під час інтенсивного навантаження від AI-агентів.
      </GoalBanner>

      <Section
        title="Що таке SRPS?"
        icon={<Shield className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight>SRPS (System Resource Protection Script)</Highlight> встановлює
          ananicy-cpp з 1700+ правилами для автоматичного зниження пріоритету фонових
          процесів, плюс sysmoni TUI для моніторингу в реальному часі. Коли AI-агенти
          запускають важкі збірки, SRPS підтримує чуйність вашого терміналу.
        </Paragraph>
        <Paragraph>
          Уявіть це як автоматичне управління ресурсами: компілятори, бандлери та
          тестові раннери отримують знижений пріоритет, щоб ваші інтерактивні сесії
          залишалися швидкими.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Cpu className="h-5 w-5" />}
              title="1700+ правил"
              description="Попередньо налаштовано для компіляторів, бандлерів, браузерів, IDE"
              gradient="from-yellow-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Activity className="h-5 w-5" />}
              title="sysmoni TUI"
              description="Моніторинг CPU/пам'яті в реальному часі зі статусом ananicy"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Gauge className="h-5 w-5" />}
              title="Sysctl налаштування"
              description="Оптимізація ядра для чуйності під тиском пам'яті"
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Settings className="h-5 w-5" />}
              title="Без конфігурації"
              description="Встановіть раз — користь назавжди, налаштування не потрібне"
              gradient="from-sky-500/20 to-blue-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      <Section
        title="Встановлення"
        icon={<Terminal className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          SRPS встановлює демон ananicy-cpp та інструмент моніторингу sysmoni
          однією командою.
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# Install SRPS with all components
$ curl -fsSL https://raw.githubusercontent.com/Dicklesworthstone/system_resource_protection_script/main/install.sh | bash -s -- --install

# Verify daemon is running
$ systemctl status ananicy-cpp
> Active: active (running)`}
            language="bash"
          />
        </div>

        <TipBox variant="info">
          Встановлення потребує sudo для налаштування systemd сервісу та змін sysctl.
          Скрипт запитає підтвердження перед внесенням змін у систему.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title="Моніторинг у реальному часі з sysmoni"
        icon={<Monitor className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          TUI <Highlight>sysmoni</Highlight> показує використання CPU та пам&#39;яті
          в реальному часі для кожного процесу, разом з правилом ananicy, що
          застосовується до кожного.
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# Launch the monitoring TUI
$ sysmoni

# See per-process CPU/memory with ananicy rule status
# q to quit, arrows to navigate, s to sort, f to filter`}
            language="bash"
          />
        </div>

        <BulletList
          items={[
            "Використання CPU та пам'яті для кожного процесу",
            "Статус правила ananicy для кожного процесу",
            "Рівень nice та клас планування",
            "Оновлення в реальному часі (налаштовуваний інтервал)",
          ]}
        />
      </Section>

      <Divider />

      <Section
        title="Основні команди"
        icon={<Terminal className="h-5 w-5" />}
        delay={0.25}
      >
        <CommandList
          commands={[
            {
              command: "sysmoni",
              description: "Запустити TUI моніторингу процесів у реальному часі",
            },
            {
              command: "systemctl status ananicy-cpp",
              description: "Перевірити статус демона",
            },
            {
              command: "ls /etc/ananicy.d/",
              description: "Переглянути директорії активних правил",
            },
            {
              command: "journalctl -u ananicy-cpp",
              description: "Переглянути логи демона",
            },
            {
              command: "sudo systemctl restart ananicy-cpp",
              description: "Перезапустити після додавання власних правил",
            },
          ]}
        />
      </Section>

      <Divider />

      <Section
        title="Що керується автоматично"
        icon={<Gauge className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          SRPS автоматично знижує пріоритет ресурсоємних процесів, зберігаючи
          чуйність інтерактивних сесій:
        </Paragraph>

        <BulletList
          items={[
            <>
              <Highlight>Компілятори:</Highlight> rustc, gcc, clang, tsc, swc
            </>,
            <>
              <Highlight>Бандлери:</Highlight> webpack, esbuild, vite, rollup
            </>,
            <>
              <Highlight>Тестові раннери:</Highlight> cargo test, jest, pytest
            </>,
            <>
              <Highlight>Браузери:</Highlight> Chrome, Firefox, Electron застосунки
            </>,
            <>
              <Highlight>IDE:</Highlight> VS Code, JetBrains, мовні сервери
            </>,
          ]}
        />

        <TipBox variant="tip">
          Ваш емулятор терміналу, tmux сесії та обробка вводу залишаються на
          нормальному пріоритеті. Важкі збірки виконуються у фоні, не заморожуючи
          вашу інтерактивну роботу.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title="Додавання власних правил"
        icon={<Settings className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          Ви можете додати правила для будь-якого процесу, який SRPS не знає.
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# Example: add rule for a custom heavy process
$ echo '{"name": "my-heavy-process", "nice": 19, "sched": "idle", "ioclass": "idle"}' | \\
    sudo tee /etc/ananicy.d/00-default/99-custom.rules

# Restart to apply
$ sudo systemctl restart ananicy-cpp`}
            language="bash"
          />
        </div>

        <TipBox variant="warning">
          Будьте обережні зі значеннями nice нижче 0 (вищий пріоритет). Тільки root може
          встановлювати від&#39;ємні значення nice, і надмірне їх використання може зробити
          вашу систему менш чуйною, а не більш.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title="Синергія з іншими інструментами"
        icon={<Zap className="h-5 w-5" />}
        delay={0.4}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <BulletList
            items={[
              <>
                <Highlight>ntm:</Highlight> Підтримує чуйність tmux сесій, коли
                агенти запускають важкі збірки
              </>,
              <>
                <Highlight>slb:</Highlight> Запобігає голодуванню кількох агентів
                за CPU/пам&#39;ять
              </>,
              <>
                <Highlight>dcg:</Highlight> Комбінована безпека — DCG запобігає
                деструктивним командам, SRPS запобігає вичерпанню ресурсів
              </>,
            ]}
          />
        </motion.div>

        <TipBox variant="info">
          При запуску мульти-агентних сесій з SLB, SRPS особливо цінний.
          Кожен агент може запускати компілятори, тестові раннери та інші важкі процеси.
          SRPS гарантує, що вони не перевантажать вашу систему.
        </TipBox>
      </Section>

      <Divider />

      <Section
        title="Усунення несправностей"
        icon={<Terminal className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>
          Якщо SRPS працює не так, як очікувалось, перевірте ці типові проблеми:
        </Paragraph>

        <div className="mt-6 space-y-4">
          <CodeBlock
            code={`# Check if daemon is running
$ systemctl status ananicy-cpp

# View recent logs
$ journalctl -u ananicy-cpp -n 50

# Validate all rule files
$ ananicy-cpp --config-test

# Uninstall if needed
$ curl -fsSL https://raw.githubusercontent.com/Dicklesworthstone/system_resource_protection_script/main/install.sh | bash -s -- --uninstall`}
            language="bash"
          />
        </div>

        <TipBox variant="info">
          Якщо потрібно тимчасово вимкнути SRPS, використовуйте{" "}
          <Highlight>sudo systemctl stop ananicy-cpp</Highlight>. Увімкніть знову з{" "}
          <Highlight>sudo systemctl start ananicy-cpp</Highlight>.
        </TipBox>
      </Section>
    </div>
  );
}

export default SrpsLessonUk;
