# AI Agent Workflow

**Standardize your AI Development Workflow.**

AI Agent Workflow forces your AI tools (Cursor, Claude, Gemini CLI, etc.) to behave like a structured **Team of Specialists** rather than a generic chatbot.

## 📺 Demo
[![AI Agent Workflow Demo](https://img.youtube.com/vi/edfrS1skdcU/maxresdefault.jpg)](https://www.youtube.com/watch?v=edfrS1skdcU)
*Watch how to transform your repo into an AI Specialist Team.*

## 🎯 The Goal

We inject specific **Rules** and **System Prompts** into your repository to enforce:
1.  **Plan**: Understand requirements before coding.
2.  **Architect**: Define file structures explicitly.
3.  **Execute**: Strict adherence to project guidelines.
4.  **Review**: Mandatory verification steps.

## 🤖 The Team

When you run the setup, you install these personas into your repo:

-   **System Orchestrator**: The Boss. Enforces the loop.
-   **Feature Planner**: The Architect. Produces `implementation_plan.md`.
-   **Specialists**: Frontend, Backend, QA, Reviewer.

## 🚀 Getting Started

### 1. Installation
In your target repository (e.g., `~/Projects/my-app`), run:

```bash
npx ai-agent-workflow
```

The setup will ask: **"What do you build?"**  
Choose your role:
- 🎨 **Frontend Developer** (React, Vue, Angular, etc.)
- ⚙️ **Backend Developer** (Node.js, Flask, Django, etc.)
- 📱 **Mobile Developer** (React Native, Flutter, etc.)
- 🚀 **DevOps Engineer** (Terraform, Kubernetes, etc.)
- 📊 **Data Engineer** (Airflow, dbt, Spark, etc.)
- 🛠️ **IT Administrator** (Bash, PowerShell, infrastructure, etc.)

This will:
-   Generate role-specific agent definitions.
-   Create `GEMINI_GUIDE.md` for your stack.
-   Install `.cursor/rules/*.md` (agent personas).
-   Configure `.gemini/system.md` (Orchestrator).
-   Install `cleanup.sh` (for removal).

### 2. Don't See Your Stack?

No problem! Create custom agents for **any** technology:

**Example**: Backend Flask developer without a Flask agent?

1. Check the guide: [`docs/CREATE_CUSTOM_AGENT.md`](docs/CREATE_CUSTOM_AGENT.md)
2. Create `agents/backend-flask-agent.md`
3. Define Flask-specific best practices
4. Run `npx ai-agent-workflow` again

**The workflow is stack-agnostic** — if you can code it, you can create an agent for it.

### 3. Usage

**With Gemini CLI**:
Just run `gemini "Your task"`. The configured system prompt will make it act as the Orchestrator.

**With Cursor**:
Just start chatting. The `.cursorrules` file keeps the agents in context.

## 🧹 Uninstallation
To remove all traces of Gemini Agents from your repo:

```bash
./cleanup.sh
```

## 📚 Documentation

- **[Available Agents](docs/AGENTS.md)** - Browse all pre-built agents
- **[Create Custom Agent](docs/CREATE_CUSTOM_AGENT.md)** - Make your own stack-specific agent
- **[Setup Guide](SETUP.md)** - Installation instructions
- **[Usage Guide](USAGE.md)** - How to use the workflow

---
*Built for the Agentic Future.*
