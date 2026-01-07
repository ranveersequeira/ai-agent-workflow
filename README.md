# AI Agent Workflow

**Standardize your AI Development Workflow.**

AI Agent Workflow forces your AI tools (Cursor, Claude, Gemini CLI, etc.) to behave like a structured **Team of Specialists** rather than a generic chatbot.

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

This will:
-   Detect your Tech Stack.
-   Generate `GEMINI_GUIDE.md`.
-   Install `.cursor/rules/*.md`.
-   Configure `.gemini/system.md`.
-   Install `cleanup.sh` (for removal).

### 2. Usage

**With Gemini CLI**:
Just run `gemini "Your task"`. The configured system prompt will make it act as the Orchestrator.

**With Cursor**:
Just start chatting. The `.cursorrules` file keeps the agents in context.

## 🧹 Uninstallation
To remove all traces of Gemini Agents from your repo:

```bash
./cleanup.sh
```

---
*Built for the Agentic Future.*
