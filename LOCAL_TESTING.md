# Local Testing Guide

This guide explains how to test the AI Agent Workflow package locally during development.

---

## Quick Start

### 1. Link the Package Locally

From the `ai-agent-workflow` directory:

```bash
cd /path/to/ai-agent-workflow
npm link
```

This creates a global symlink to your local package.

### 2. Create a Test Project

```bash
mkdir ~/test-project
cd ~/test-project
npm init -y
```

### 3. Run Local Version

```bash
npx ai-agent-workflow
```

Or use the linked version directly:

```bash
ai-agent-workflow
```

---

## Test Scenarios

### Scenario 1: Frontend Developer with Full Pipeline

**Inputs:**
- Role: Frontend Developer
- Stack: React
- Tools: Cursor, Gemini CLI
- Workflow: Full Pipeline
- Vercel Skills: Yes

**Expected Output:**

```
.cursor/
└── rules/
    ├── system-orchestrator.md
    ├── feature-planner.md
    ├── frontend-react-agent.md
    ├── ui-css-expert-agent.md
    ├── qa-agent.md
    ├── review-agent.md
    ├── documentation-agent.md
    └── git-agent.md

.gemini/
└── system.md

GEMINI_GUIDE.md
cleanup.sh
```

**Verification:**
```bash
ls -la .cursor/rules/
cat .gemini/system.md | head -20
cat GEMINI_GUIDE.md
```

---

### Scenario 2: Backend Developer with Standard Workflow

**Inputs:**
- Role: Backend Developer
- Stack: Node.js
- Tools: OpenCode only
- Workflow: Standard

**Expected Output:**

```
.opencode/
├── agents/
│   ├── system-orchestrator.md
│   ├── feature-planner.md
│   ├── backend-node-agent.md
│   ├── database-mongodb-agent.md
│   └── review-agent.md
└── opencode.json

GEMINI_GUIDE.md
cleanup.sh
```

**Verification:**
```bash
ls -la .opencode/agents/
cat .opencode/opencode.json
```

**Note:** No `.cursor/` or `.gemini/` directories should exist.

---

### Scenario 3: Minimal Workflow (Quick Fixes)

**Inputs:**
- Role: Frontend Developer
- Stack: Vue.js
- Tools: Cursor
- Workflow: Minimal

**Expected Output:**

```
.cursor/
└── rules/
    ├── frontend-vue-agent.md
    ├── ui-css-expert-agent.md
    └── review-agent.md
```

**Note:** No orchestrator or planner files (minimal workflow skips planning).

---

### Scenario 4: Backend Developer with Additional UI Agent

**Inputs:**
- Role: Backend Developer
- Stack: Node.js
- Tools: Cursor
- Workflow: Standard
- Additional Agents: Yes → Select "UI/CSS Expert Agent"

**Expected Output:**

```
.cursor/
└── rules/
    ├── system-orchestrator.md
    ├── feature-planner.md
    ├── backend-node-agent.md
    ├── database-mongodb-agent.md
    ├── review-agent.md
    └── ui-css-expert-agent.md  ← Additional agent
```

**Use Case:** Backend developer can now ask:
- "Use the UI/CSS Expert to help me style this admin dashboard"
- "INVOKE UI CSS Expert Agent to review my Tailwind classes"

---

### Scenario 5: Full-Stack Developer

**Inputs:**
- Role: Full-Stack
- Tools: Cursor, OpenCode, Gemini CLI
- Workflow: Full Pipeline

**Expected Output:**
- All agent files in `.cursor/rules/`
- All agent files in `.opencode/agents/`
- Orchestrator in `.gemini/system.md`

---

## Verification Commands

### Check Installed Agents (Cursor)
```bash
ls -la .cursor/rules/
```

### Check OpenCode Configuration
```bash
ls -la .opencode/agents/
cat .opencode/opencode.json
```

### Check Gemini Configuration
```bash
cat .gemini/system.md
```

### Check Project Guide
```bash
cat GEMINI_GUIDE.md
```

### Run Cleanup
```bash
./cleanup.sh
```

### Verify Cleanup
```bash
ls -la .cursor 2>/dev/null || echo "✓ .cursor removed"
ls -la .opencode 2>/dev/null || echo "✓ .opencode removed"
ls -la .gemini 2>/dev/null || echo "✓ .gemini removed"
```

---

## Debug Mode

For verbose output during development:

```bash
DEBUG=true npx ai-agent-workflow
```

---

## Testing Vercel Skills Installation

### Manual Test

```bash
# In a test project with frontend setup
npx add-skill vercel-labs/agent-skills --list
```

### Expected Skills
- `react-best-practices` - 40+ React performance rules

---

## Cleanup Between Tests

Before running a new test scenario:

```bash
# Quick cleanup
rm -rf .cursor .opencode .gemini GEMINI_GUIDE.md cleanup.sh .cursorrules .env
```

Or use the generated cleanup script:

```bash
./cleanup.sh
```

---

## Common Issues

### Issue: "Agent file not found" Warning

**Cause:** The agent file doesn't exist in the `agents/` directory.

**Fix:** Check that all agent files are present:
```bash
ls -la agents/
```

### Issue: OpenCode Config Not Created

**Cause:** OpenCode wasn't selected during setup.

**Fix:** Run setup again and select OpenCode in the tools prompt.

### Issue: Vercel Skills Timeout

**Cause:** Network issues or npx timeout.

**Fix:** Install manually:
```bash
npx add-skill vercel-labs/agent-skills
```

---

## Test Matrix

| Scenario | Role | Stack | Tools | Workflow | Additional | Expected Agents |
|----------|------|-------|-------|----------|------------|-----------------|
| 1 | Frontend | React | Cursor, Gemini | Full | No | 8 agents |
| 2 | Backend | Node.js | OpenCode | Standard | No | 5 agents |
| 3 | Frontend | Vue | Cursor | Minimal | No | 3 agents |
| 4 | Backend | Node.js | Cursor | Standard | UI/CSS | 6 agents |
| 5 | Full-Stack | All | All | Full | No | All agents |
| 6 | DevOps | Terraform | Gemini | Standard | No | 4 agents |
| 7 | Mobile | Flutter | Cursor | Standard | No | 4 agents |

---

## Testing Checkpoint Workflow

After setup, test the checkpoint enforcement in Cursor:

### Test 1: Verify Checkpoint Format

1. Open Cursor in your test project
2. Ask: "Add a dark mode toggle"
3. Verify the response includes:
   - Agent identification (✅ Feature Planner - Complete)
   - Summary of what was done
   - Next step indication
   - Options (continue/redo/stop)

### Test 2: Verify Flow Control

1. After Feature Planner checkpoint, say "continue"
2. Verify Developer Agent starts and stops at checkpoint
3. Say "redo" with feedback like "use Tailwind instead"
4. Verify Developer Agent revises the work

### Test 3: Verify Stop Command

1. At any checkpoint, say "stop"
2. Verify the workflow pauses
3. Start again with "continue" to resume

### Expected Checkpoint Format

```
---
✅ [Agent Name] - Complete

**What was done:**
- [Summary points]

**Next step:** [Next Agent]
- [What's next]

**Options:**
- Say "continue" → proceed
- Say "redo" → revise
- Say "stop" → pause
---
```

### Test 4: Verify Gemini CLI Checkpoints

```bash
# Start a task
gemini "Add a login form"

# Verify checkpoint format appears
# Say "continue" to proceed
gemini "continue"

# Verify next agent starts and shows checkpoint
```

### Test 5: Verify OpenCode Checkpoints

```bash
# Start a task
opencode "Add a login form"

# Verify checkpoint format appears
# Say "continue" to proceed
opencode "continue"

# Check that WORKFLOW_RULES.md exists
cat .opencode/WORKFLOW_RULES.md
```

### Verify Tool-Specific Files

**Cursor:**
```bash
cat .cursorrules | grep "WORKFLOW ENFORCEMENT"
```

**Gemini CLI:**
```bash
cat .gemini/system.md | grep "CRITICAL RULES"
```

**OpenCode:**
```bash
cat .opencode/opencode.json
cat .opencode/WORKFLOW_RULES.md
```

---

## Automated Testing

For CI/CD, use the `--yes` flag to skip prompts:

```bash
npx ai-agent-workflow --yes
```

This uses defaults:
- Role: fullstack
- Stack: react
- Tools: cursor, gemini
- Workflow: standard
