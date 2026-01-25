# AI Agent Workflow - Setup Guide

## Prerequisites

1.  **Node.js**: v18 or higher.
2.  **AI Coding Tools** (at least one):
    -   **Cursor IDE**: [cursor.sh](https://cursor.sh)
    -   **OpenCode CLI**: `curl -fsSL https://opencode.ai/install | bash`
    -   **Gemini CLI**: `npm install -g @google/generative-ai`

## Installation

### Step 1: Go to your Project
```bash
cd ~/Projects/my-awesome-app
```

### Step 2: Run the Setup Tool
```bash
npx ai-agent-workflow
```

### Step 3: Follow the Interactive Setup

The setup will guide you through several prompts:

#### 3.1 Select Your Role
```
? What do you build?
  🎨 Frontend Developer (React, Vue, Angular, Next.js)
  ⚙️  Backend Developer (Node.js, Flask, Django)
  📱 Mobile Developer (Flutter, React Native)
  🚀 DevOps Engineer (Terraform, Kubernetes)
  🎨 UI/CSS Specialist (Tailwind, shadcn/ui)
  🔧 Full-Stack (Install everything)
```

#### 3.2 Choose Your Stack
```
? Which stack/framework?
  React
  Next.js
  Vue.js
  Angular
  Other (Custom)
```

#### 3.3 Select AI Tools
```
? Which AI coding tools do you use? (Select all that apply)
  ◉ Cursor
  ◯ OpenCode
  ◯ Gemini CLI
```

#### 3.4 Choose Workflow Type
```
? Choose your workflow type:
  Standard (Planning → Dev → Review)
  Full Pipeline (Planning → Dev → Test → Review → Docs → Git)
  Minimal (Dev → Review only)
```

#### 3.5 Add Additional Agents (Optional)
```
? Would you like to add any additional agents? (y/N)
```

If yes, you'll see a list of all available agents:
```
? Select additional agents to install:
  ◯ 🎨 UI/CSS specialist - Tailwind, shadcn/ui
  ◯ 🧪 Testing specialist - unit, integration tests
  ◯ 📚 Documentation specialist
  ◯ 📝 Git commit specialist - conventional commits
  ... (and more)
```

This allows you to mix agents from different roles. For example:
- A backend developer can add the UI/CSS Expert to help with frontend styling
- A frontend developer can add the Database MongoDB Agent for data modeling

#### 3.6 Install Skills (Frontend Only)
```
? Install Vercel React Best Practices skill? (Recommended) (Y/n)
```

### Step 4: What Gets Installed

The tool injects configuration files based on your selections:

#### For Cursor
-   `.cursor/rules/*.md`: Agent definitions (orchestrator, planner, developer, etc.)
-   `.cursorrules`: Instructions for the IDE to use the rules.

#### For OpenCode
-   `.opencode/agents/*.md`: Agent definitions
-   `.opencode/opencode.json`: OpenCode CLI configuration

#### For Gemini CLI
-   `.gemini/system.md`: System prompt (Orchestrator agent)
-   `.env`: Sets `GEMINI_SYSTEM_MD=true`

#### Common Files
-   `GEMINI_GUIDE.md`: Project-specific coding standards.
-   `cleanup.sh`: A script to easily remove all configuration.

### Step 5: Configure .gitignore (Recommended)

To avoid committing the generated configuration files to your repository, add the following entries to your `.gitignore` file:

```gitignore
# AI Agent Workflow - Generated files
cleanup.sh
.cursorrules
.gemini/
.cursor/
.opencode/
```

**Note**: Since these files are generated automatically by the setup tool, they should typically not be committed. Each developer should run the setup tool in their local environment.

## Workflow Types Explained

### Standard Workflow
Best for: Regular feature development

```
Orchestrator → Feature Planner → Developer → Review → Done
```

**Agents installed:**
- System Orchestrator
- Feature Planner
- Domain-specific Developer Agent
- Review Agent

### Full Pipeline Workflow
Best for: Production-grade development with full checks

```
Orchestrator → Planner → Developer → QA → Review → Docs → Git → Done
```

**Agents installed:**
- System Orchestrator
- Feature Planner
- Domain-specific Developer Agent
- QA Agent
- Review Agent
- Documentation Agent
- Git Agent

### Minimal Workflow
Best for: Quick fixes and hotfixes

```
Developer → Review → Done
```

**Agents installed:**
- Domain-specific Developer Agent
- Review Agent

## Verifying Installation

### Cursor Verification
1. Open a file in Cursor
2. Look for agent rules in the context window
3. Try invoking `@Feature Planner` in chat

### OpenCode Verification
```bash
ls -la .opencode/agents/
opencode "Hello"
```

### Gemini CLI Verification
```bash
gemini "Hello"
```
It should reply as the **System Orchestrator**.

## Removal

To uninstall all AI Agent Workflow files:
```bash
./cleanup.sh
```

This removes:
- `.cursor/rules/` (Cursor agents)
- `.opencode/` (OpenCode configuration)
- `.gemini/` (Gemini CLI configuration)
- `GEMINI_GUIDE.md` (Project guide)

## Troubleshooting

### "Agent file not found" Warning
Ensure all agent files exist in the package's `agents/` directory.

### Vercel Skills Timeout
If auto-install fails, run manually:
```bash
npx add-skill vercel-labs/agent-skills
```

### OpenCode Not Detecting Agents
Ensure `.opencode/opencode.json` exists with correct agent directory path.
