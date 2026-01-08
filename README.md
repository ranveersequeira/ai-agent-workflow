# AI Agent Workflow (Plugins Edition)

**Standardize your AI Development Workflow.**

This project has been transformed into a specific plugin for **Gemini CLI** and **Claude Code**. It forces your AI tools to behave like a structured **Team of Specialists** rather than generic chatbots.

## 🚀 Features

*   **One-Command Setup**: Instantly configure your repository with role-based AI agents.
*   **Cross-Platform**: Works natively with **Gemini CLI** (Extensions) and **Claude Code** (Plugins).
*   **Role-Based Personas**: Frontend, Backend, Mobile, DevOps, and more.
*   **Standardized Workflow**: Enforces Plan -> Architect -> Execute -> Review loops.

---

## � Local Usage Guide

Since this is a plugin, you install it into your local toolchain (Gemini or Claude) and then use it inside *other* projects.

### 1. Installation (Local Development)

#### For Gemini CLI Users
1.  **Clone this repository**:
    ```bash
    git clone https://github.com/ranveersequeira/ai-agent-workflow.git
    cd ai-agent-workflow
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Link to Gemini**:
    ```bash
    gemini extensions link .
    ```
    *This makes the `setup_agent_workflow` tool available globally in your Gemini CLI.*

#### For Claude Code Users
1.  **Clone this repository**:
    ```bash
    git clone https://github.com/ranveersequeira/ai-agent-workflow.git
    cd ai-agent-workflow
    ```
2.  **Install the Plugin**:
    ```bash
    # Point Claude to this directory
    claude plugin install .
    ```

---

### 2. How to Use the Plugin

Once installed, the plugin adds a new capability to your AI assistant: **Setting up specialized teams.**

**Step 1: Go to your Project**
Navigate to the repository you want to work on (not this plugin repo, but your actual app).
```bash
cd ~/my-projects/awesome-webapp
```

**Step 2: Ask your AI to Setup**

*   **Gemini**:
    > "Setup a React frontend workflow here."
    >
    > "I need a backend node setup. Initialize the agents."

*   **Claude**:
    > "Configure this repo with the agent workflow for fullstack."

**Step 3: What Happens?**
The plugin will:
1.  Detect your request.
2.  Run the internal `setup_agent_workflow` tool.
3.  Install strict **Rule Files** (`.cursor/rules/*.md`) and **System Prompts** (`.gemini/system.md`) into your project.

**Step 4: Start Coding**
Now that the agents are installed, you can talk to them:
> "Feature Planner, create a plan for the user login flow."

---

## 📦 What It Installs

Both plugins inject the same high-quality configuration into your project:

1.  **`.cursor/rules/*.md`**: Specialized agent personas (e.g., `frontend-react-agent.md`) for Cursor IDE.
2.  **`.gemini/system.md`**: A system orchestrator prompt for native CLI usage.
3.  **`GEMINI_GUIDE.md`**: Project-specific guidelines based on your tech stack.

---

## � Development

If you want to contribute to this plugin 

### Build & Test
```bash
npm install
node src/extension.js # Runs the MCP server (for testing connections)
```
