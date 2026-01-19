# 🛠️ ACFS Shell Configuration Guide for AI Agents

**Локація:** `~/ACFS_SHELL_CONFIG_GUIDE.md`
**Створено:** 2026-01-19
**Для:** Майбутніх AI агентів, що працюють з ACFS конфігурацією
**Система:** ACFS v0.5.0+, Ubuntu 25.10, zsh + Oh My Zsh

---

## 🏗️ **АРХІТЕКТУРА SHELL КОНФІГУРАЦІЇ ACFS**

### 📁 **Структура файлів:**
```
~/.zshrc                    # 171 байт - мінімальний лоадер
├─ ~/.acfs/zsh/acfs.zshrc   # ГОЛОВНА КЕРОВАНА КОНФІГУРАЦІЯ
├─ ~/.zshrc.local           # КОРИСТУВАЦЬКІ OVERRIDE-И (створюй тут!)
└─ atuin init               # Історія команд (автоматично)
```

### 🔄 **Порядок завантаження:**
1. **`~/.zshrc`** → завантажує ACFS loader
2. **`~/.acfs/zsh/acfs.zshrc`** → системні налаштування ACFS
3. **`~/.zshrc.local`** → користувацькі налаштування ← **ТВОЄ МІСЦЕ!**
4. **Atuin init** → історія команд

---

## ⚖️ **ПРАВИЛА РОБОТИ З КОНФІГУРАЦІЄЮ**

### ✅ **ДО (DO):**

#### 🎯 **Додавати нові змінні/alias-и/функції:**
**Локація:** `~/.zshrc.local`

```bash
# ✅ Правильно - додавай в ~/.zshrc.local
echo 'export MY_NEW_VAR="value"' >> ~/.zshrc.local
echo 'alias myalias="command"' >> ~/.zshrc.local
echo 'function myfunc() { echo "hello"; }' >> ~/.zshrc.local
```

#### 🔧 **Структура ~/.zshrc.local:**
```bash
# Environment Variables
export TOOL_MAX_SIZE=5000
export API_KEY="your-key-here"

# Aliases
alias ll='ls -la'
alias gst='git status'

# Functions
function quick_scan() {
    find . -name "*.js" -type f | head -10
}

# Tool-specific configurations
export UBS_MAX_DIR_SIZE_MB=2000
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

### ❌ **НЕ ДО (DON'T):**

#### 🚫 **НЕ змінюй керовані файли:**
```bash
# ❌ НЕ РОБИ ЦЕ:
echo 'export MYVAR=123' >> ~/.acfs/zsh/acfs.zshrc  # БУДЕ ПЕРЕЗАПИСАНО!
```

#### 🚫 **НЕ дублюй системні налаштування:**
```bash
# ❌ Вже є в acfs.zshrc:
export PATH="$HOME/.cargo/bin:$PATH"  # НЕ треба дублювати
export BUN_INSTALL="$HOME/.bun"       # Вже налаштовано
```

---

## 🎯 **ПРАКТИЧНІ СЦЕНАРІЇ**

### **1. Додавання нової утиліти з environment variables:**

```bash
# Створи або додай в ~/.zshrc.local:
cat >> ~/.zshrc.local << 'EOF'

# NewTool Configuration
export NEWTOOL_CONFIG_DIR="$HOME/.config/newtool"
export NEWTOOL_MAX_MEMORY=4096
export NEWTOOL_LOG_LEVEL=debug

# NewTool aliases
alias nt='newtool'
alias nts='newtool status'
alias ntc='newtool config'

# NewTool helper function
function newtool_setup() {
    mkdir -p "$NEWTOOL_CONFIG_DIR"
    newtool init --config "$NEWTOOL_CONFIG_DIR"
}
EOF

# Активація (одним з способів):
source ~/.zshrc           # Перезавантажити конфігурацію
# АБО
exec zsh                  # Перезапустити shell
# АБО попросити користувача: "перезайди в shell"
```

### **2. Виправлення проблем з розміром/лімітами утиліт:**

```bash
# Приклад: UBS (Ultimate Bug Scanner) має ліміт 1000MB
# Рішення - підвищити ліміт в ~/.zshrc.local:

echo '# UBS - Ultimate Bug Scanner configuration' >> ~/.zshrc.local
echo 'export UBS_MAX_DIR_SIZE_MB=2000' >> ~/.zshrc.local
```

### **3. Додавання PATH для нової утиліти:**

```bash
# ✅ Правильно - через ~/.zshrc.local:
echo 'export PATH="$HOME/.local/bin/mytool:$PATH"' >> ~/.zshrc.local

# ❌ НЕ змінюй ~/.acfs/zsh/acfs.zshrc!
```

### **4. Налаштування для розробки з конкретними технологіями:**

```bash
cat >> ~/.zshrc.local << 'EOF'

# Python Development
export PYTHONDONTWRITEBYTECODE=1
export PYTHONUNBUFFERED=1
export POETRY_VENV_IN_PROJECT=1

# Node.js Development
export NODE_OPTIONS="--max-old-space-size=8192"
export NPM_CONFIG_FUND=false
export NPM_CONFIG_AUDIT=false

# Docker Development
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Development aliases
alias py='python3'
alias pip='python3 -m pip'
alias dk='docker'
alias dc='docker compose'
EOF
```

---

## 🔍 **ДІАГНОСТИКА ТА ВІДЛАДКА**

### **Перевірка поточної конфігурації:**

```bash
# Перевірити структуру файлів
ls -la ~/ | grep -E "(zsh|bash)"
ls -la ~/.acfs/zsh/

# Перевірити, чи існує ~/.zshrc.local
[ -f ~/.zshrc.local ] && echo "✅ ~/.zshrc.local існує" || echo "❌ ~/.zshrc.local відсутній"

# Показати вміст користувацької конфігурації
cat ~/.zshrc.local 2>/dev/null || echo "Файл порожній або не існує"

# Перевірити змінні середовища
echo "UBS_MAX_DIR_SIZE_MB=$UBS_MAX_DIR_SIZE_MB"
echo "PATH=$PATH" | tr ':' '\n' | head -10
```

### **Тестування нових налаштувань:**

```bash
# Спосіб 1: Перезавантажити конфігурацію
source ~/.zshrc

# Спосіб 2: Тестувати в новій shell сесії
zsh -c 'echo "TEST: $MY_NEW_VAR"'

# Спосіб 3: Перевірити aliases/functions
type my_new_function
which my_new_command
```

### **Відновлення після помилок:**

```bash
# Якщо ~/.zshrc.local зламаний:
mv ~/.zshrc.local ~/.zshrc.local.backup
# Створити новий чистий файл
touch ~/.zshrc.local

# Перевірити синтаксис bash
bash -n ~/.zshrc.local && echo "✅ Синтаксис OK" || echo "❌ Синтаксична помилка"
```

---

## 📋 **ЧЕКЛИСТ ДЛЯ АГЕНТІВ**

### **Перед внесенням змін:**

- [ ] Перевірити, чи існує `~/.zshrc.local`
- [ ] Зробити backup: `cp ~/.zshrc.local ~/.zshrc.local.backup`
- [ ] Переконатися, що не дублюю існуючі налаштування з `~/.acfs/zsh/acfs.zshrc`

### **При додаванні налаштувань:**

- [ ] Додавати коментарі для ясності
- [ ] Групувати пов'язані налаштування разом
- [ ] Використовувати `cat >> ~/.zshrc.local << 'EOF'` для багато-рядкових додавань
- [ ] Тестувати зміни: `source ~/.zshrc` або `exec zsh`

### **Після змін:**

- [ ] Перевірити синтаксис: `bash -n ~/.zshrc.local`
- [ ] Протестувати нові змінні/aliases/функції
- [ ] Запустити `acfs doctor` для загальної діагностики
- [ ] Документувати зміни в коментарях

---

## 🚨 **ВАЖЛИВІ ПОПЕРЕДЖЕННЯ**

### **❗ НЕ ЗМІНЮЙ КЕРОВАНІ ФАЙЛИ:**
- `~/.acfs/zsh/acfs.zshrc` - оновлюється ACFS
- `~/.zshrc` - мінімальний loader
- `~/.p10k.zsh` - Powerlevel10k конфігурація

### **❗ ОБЕРЕЖНО З PATH:**
- Завжди додавай до існуючого: `export PATH="new/path:$PATH"`
- НЕ перезаписуй повністю: `export PATH="new/path"`

### **❗ ENVIRONMENT VARIABLES:**
- Використовуй лапки для значень з пробілами
- Перевіряй існування директорій перед додаванням в PATH
- Документуй призначення незрозумілих змінних

---

## 🔧 **КОРИСНІ КОМАНДИ**

```bash
# Показати всі aliases
alias

# Показати всі функції
typeset -f

# Показати змінні середовища
env | grep -E "(ACFS|UBS|BUN|CARGO)"

# Дізнатися, звідки береться команда
which command_name
type command_name

# Перевірити завантажені модулі zsh
zmodload

# Показати історію завантаження shell
zsh -x 2>&1 | head -20
```

---

## 🎯 **ПРИКЛАДИ УСПІШНИХ ІНТЕГРАЦІЙ**

### **1. UBS (Ultimate Bug Scanner):**
```bash
# Проблема: ліміт розміру директорій 1000MB
# Рішення: підвищити ліміт
export UBS_MAX_DIR_SIZE_MB=2000
```

### **2. Docker налаштування:**
```bash
# Прискорення збірки та налаштування платформи
export DOCKER_BUILDKIT=1
export DOCKER_DEFAULT_PLATFORM=linux/amd64
alias dps='docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
```

### **3. Розробка з Python:**
```bash
# Poetry в проекті + чистий Python
export POETRY_VENV_IN_PROJECT=1
export PYTHONDONTWRITEBYTECODE=1
alias ve='source .venv/bin/activate'
```

---

## 📚 **ДОДАТКОВІ РЕСУРСИ**

- **ACFS основна документація:** `/data/projects/agentic_coding_flywheel_setup/README.md`
- **ACFS діагностика:** `acfs doctor` або `acfs doctor --deep`
- **Shell debugging:** `zsh -x` для відладки завантаження
- **ACFS версія:** `acfs version`

---

**📝 Створено:** 19 січня 2026
**👤 Автор:** Claude Sonnet 4 (AI Agent)
**🎯 Мета:** Допомогти майбутнім агентам правильно налаштовувати shell конфігурацію в ACFS

---

> **💡 Порада:** Завжди тестуй зміни в новій shell сесії перед тим, як вважати задачу виконаною. Якщо щось зламається, файл `~/.zshrc.local` можна легко відновити або очистити.