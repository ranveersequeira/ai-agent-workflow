import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import gradient from 'gradient-string';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import { generateCleanupScript } from './cleanup-template.js';

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

// Custom gradients
const infoGradient = gradient(['#4facfe', '#00f2fe']);
const successGradient = gradient(['#56ab2f', '#a8e063']);

export async function runSetup(targetDir, options = {}) {
    // 1. Ensure Target Exists
    await fs.ensureDir(targetDir);

    // 2. Detect existing stack (for smart defaults)
    const detectedStack = await detectStack(targetDir);
    let role, stack, workflow, tools, agentsToInstall;

    // 3. Prompt User (Role-based approach)
    if (options.yes || process.env.CI) {
        console.log(chalk.yellow('   Skipping prompts (--yes or CI detected). Using defaults.'));
        role = 'fullstack';
        stack = detectedStack.framework || 'react';
        workflow = 'standard';
        tools = ['cursor', 'gemini'];
        agentsToInstall = ['all'];
    } else {
        // Ask: What do you build?
        const roleAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: chalk.cyan('What do you build?'),
                choices: [
                    { name: '🎨 Frontend Developer (React, Vue, Angular, Next.js)', value: 'frontend' },
                    { name: '⚙️  Backend Developer (Node.js, Flask, Django)', value: 'backend' },
                    { name: '📱 Mobile Developer (Flutter, React Native)', value: 'mobile' },
                    { name: '🚀 DevOps Engineer (Terraform, Kubernetes)', value: 'devops' },
                    { name: '🎨 UI/CSS Specialist (Tailwind, shadcn/ui)', value: 'ui' },
                    { name: '🔧 Full-Stack (Install everything)', value: 'fullstack' },
                ],
            }
        ]);
        role = roleAnswer.role;

        // Ask for specific stack based on role
        const stackChoices = getStackChoicesForRole(role);
        if (stackChoices.length > 0) {
            const stackAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'stack',
                    message: chalk.cyan('Which stack/framework?'),
                    choices: stackChoices,
                    default: detectedStack.framework || stackChoices[0].value,
                }
            ]);
            stack = stackAnswer.stack;
        } else {
            stack = 'generic';
        }

        // Ask: Which AI coding tools do you use?
        const toolsAnswer = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'tools',
                message: chalk.cyan('Which AI coding tools do you use?'),
                choices: [
                    { name: 'Cursor', value: 'cursor', checked: true },
                    { name: 'OpenCode', value: 'opencode' },
                    { name: 'Gemini CLI', value: 'gemini' },
                ],
                validate: (input) => {
                    if (input.length === 0) {
                        return 'Please select at least one tool.';
                    }
                    return true;
                }
            }
        ]);
        tools = toolsAnswer.tools;

        // Ask: Choose your workflow type
        const workflowAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'workflow',
                message: chalk.cyan('Choose your workflow type:'),
                choices: [
                    { name: 'Standard (Planning → Dev → Review)', value: 'standard' },
                    { name: 'Full Pipeline (Planning → Dev → Test → Review → Docs → Git)', value: 'full' },
                    { name: 'Minimal (Dev → Review only)', value: 'minimal' },
                ],
                default: 'standard'
            }
        ]);
        workflow = workflowAnswer.workflow;

        agentsToInstall = getAgentsForRole(role, stack, workflow);

        // Ask: Would you like to add any additional agents?
        const additionalAgentsAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'wantAdditional',
                message: chalk.cyan('Would you like to add any additional agents?'),
                default: false
            }
        ]);

        if (additionalAgentsAnswer.wantAdditional) {
            const availableAgents = await getAvailableAgents();
            const agentChoices = availableAgents
                .filter(agent => !agentsToInstall.includes(agent))
                .map(agent => ({
                    name: formatAgentName(agent),
                    value: agent,
                    checked: false
                }));

            if (agentChoices.length > 0) {
                const selectedAgents = await inquirer.prompt([
                    {
                        type: 'checkbox',
                        name: 'agents',
                        message: chalk.cyan('Select additional agents to install:'),
                        choices: agentChoices,
                        pageSize: 15
                    }
                ]);

                // Merge additional agents with role-based agents
                agentsToInstall = [...new Set([...agentsToInstall, ...selectedAgents.agents])];
            }
        }

        // Ask: Install Vercel Skills? (Frontend only)
        if (role === 'frontend') {
            const skillsAnswer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'installVercelSkills',
                    message: chalk.cyan('Install Vercel React Best Practices skill? (Recommended)'),
                    default: true
                }
            ]);

            if (skillsAnswer.installVercelSkills) {
                await installVercelSkills(targetDir, tools);
            }
        }
    }

    // 4. Analyze Dependencies
    const spinner = ora({
        text: 'Analyzing dependencies...',
        color: 'cyan'
    }).start();

    const dependencies = await getDependencies(targetDir);
    spinner.succeed(chalk.green(`Found ${chalk.bold(dependencies.length)} dependencies`));

    // 5. Generate Profile
    const profileSpinner = ora({
        text: 'Generating project profile...',
        color: 'cyan'
    }).start();
    await generateProfile(targetDir, role, stack, workflow, dependencies);
    profileSpinner.succeed(chalk.green('Project profile created'));

    // 6. Install Agents based on selected tools
    const agentSpinner = ora({
        text: 'Installing AI agents...',
        color: 'cyan'
    }).start();

    if (tools.includes('cursor')) {
        await configureCursor(targetDir, agentsToInstall);
    }
    if (tools.includes('opencode')) {
        await configureOpenCode(targetDir, agentsToInstall);
    }
    if (tools.includes('gemini')) {
        await configureGemini(targetDir);
    }

    agentSpinner.succeed(chalk.green('Agents installed successfully'));

    // 7. Install Cleanup Script
    const cleanupSpinner = ora({
        text: 'Setting up cleanup script...',
        color: 'cyan'
    }).start();
    await installCleanup(targetDir, tools);
    cleanupSpinner.succeed(chalk.green('Cleanup script ready'));

    // Return setup info for CLI to use
    return { role, stack, workflow, tools };
}

async function getAvailableAgents() {
    const rulesSrc = path.join(ROOT_DIR, 'agents');
    try {
        const files = await fs.readdir(rulesSrc);
        return files.filter(file => file.endsWith('.md'));
    } catch (e) {
        return [];
    }
}

function formatAgentName(filename) {
    // Convert filename to readable name
    // e.g., "frontend-react-agent.md" -> "Frontend React Agent"
    const name = filename
        .replace('.md', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
    
    // Add descriptions for common agents
    const descriptions = {
        'System Orchestrator': '🎯 Workflow manager - enforces the development loop',
        'Feature Planner': '📋 Creates implementation plans before coding',
        'Frontend React Agent': '⚛️ React specialist - hooks, components, state',
        'Frontend Nextjs Agent': '▲ Next.js specialist - SSR, App Router, RSC',
        'Frontend Vue Agent': '💚 Vue.js specialist - Composition API, Pinia',
        'Frontend Angular Agent': '🅰️ Angular specialist - TypeScript, RxJS',
        'Backend Node Agent': '🟢 Node.js/Express specialist',
        'Backend Flask Agent': '🐍 Python Flask specialist',
        'Backend Fastapi Agent': '⚡ Python FastAPI specialist',
        'Backend Django Agent': '🎸 Python Django specialist',
        'Mobile Flutter Agent': '📱 Flutter/Dart specialist',
        'Devops Terraform Agent': '🏗️ Terraform/IaC specialist',
        'Database Mongodb Agent': '🍃 MongoDB specialist',
        'Ui Css Expert Agent': '🎨 UI/CSS specialist - Tailwind, shadcn/ui',
        'Qa Agent': '🧪 Testing specialist - unit, integration tests',
        'Review Agent': '👀 Code review specialist',
        'Documentation Agent': '📚 Documentation specialist',
        'Git Agent': '📝 Git commit specialist - conventional commits',
    };

    return descriptions[name] || `📦 ${name}`;
}

async function detectStack(targetDir) {
    if (await fs.pathExists(path.join(targetDir, 'package.json'))) {
        return { techStack: 'js', framework: 'react' }; // Guess
    }
    if (await fs.pathExists(path.join(targetDir, 'requirements.txt'))) {
        return { techStack: 'python', framework: 'django' }; // Guess
    }
    return { techStack: null, framework: null };
}

function getStackChoicesForRole(role) {
    const stackMap = {
        frontend: [
            { name: 'React', value: 'react' },
            { name: 'Next.js', value: 'nextjs' },
            { name: 'Vue.js', value: 'vue' },
            { name: 'Angular', value: 'angular' },
            { name: 'Other (Custom)', value: 'custom' },
        ],
        backend: [
            { name: 'Node.js (Express)', value: 'node' },
            { name: 'FastAPI (Python)', value: 'fastapi' },
            { name: 'Flask (Python)', value: 'flask' },
            { name: 'Django (Python)', value: 'django' },
            { name: 'Other (Custom)', value: 'custom' },
        ],
        mobile: [
            { name: 'Flutter', value: 'flutter' },
            { name: 'React Native (Custom)', value: 'custom' },
        ],
        devops: [
            { name: 'Terraform', value: 'terraform' },
            { name: 'Kubernetes (Custom)', value: 'custom' },
        ],
        ui: [
            { name: 'All (Vanilla CSS + Tailwind + shadcn/ui)', value: 'all' },
        ],
        fullstack: [],
    };

    return stackMap[role] || [];
}

function getWorkflowAgents(workflow) {
    const workflowMap = {
        standard: [
            'system-orchestrator.md',
            'feature-planner.md',
            'review-agent.md',
        ],
        full: [
            'system-orchestrator.md',
            'feature-planner.md',
            'qa-agent.md',
            'review-agent.md',
            'documentation-agent.md',
            'git-agent.md',
        ],
        minimal: [
            'review-agent.md',
        ],
    };

    return workflowMap[workflow] || workflowMap.standard;
}

function getAgentsForRole(role, stack, workflow = 'standard') {
    const baseAgents = getWorkflowAgents(workflow);

    const roleAgentMap = {
        frontend: {
            react: ['frontend-react-agent.md', 'ui-css-expert-agent.md'],
            nextjs: ['frontend-nextjs-agent.md', 'ui-css-expert-agent.md'],
            vue: ['frontend-vue-agent.md', 'ui-css-expert-agent.md'],
            angular: ['frontend-angular-agent.md', 'ui-css-expert-agent.md'],
            custom: ['frontend-react-agent.md', 'ui-css-expert-agent.md'],
        },
        backend: {
            node: ['backend-node-agent.md', 'database-mongodb-agent.md'],
            fastapi: ['backend-fastapi-agent.md'],
            flask: ['backend-flask-agent.md'],
            django: ['backend-django-agent.md'],
            custom: ['backend-node-agent.md'],
        },
        mobile: {
            flutter: ['mobile-flutter-agent.md'],
            custom: ['mobile-flutter-agent.md'],
        },
        devops: {
            terraform: ['devops-terraform-agent.md'],
            custom: ['devops-terraform-agent.md'],
        },
        ui: {
            all: ['ui-css-expert-agent.md'],
        },
        fullstack: {
            all: ['all'],
        },
    };

    if (role === 'fullstack') {
        return ['all'];
    }

    let roleSpecificAgents = [];
    if (roleAgentMap[role] && roleAgentMap[role][stack]) {
        roleSpecificAgents = roleAgentMap[role][stack];
    }

    return [...baseAgents, ...roleSpecificAgents];
}

async function getDependencies(targetDir) {
    try {
        // Try JS first
        const pkgPath = path.join(targetDir, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            return [
                ...Object.keys(pkg.dependencies || {}),
                ...Object.keys(pkg.devDependencies || {})
            ];
        }

        // Try Python
        const reqPath = path.join(targetDir, 'requirements.txt');
        if (await fs.pathExists(reqPath)) {
            const content = await fs.readFile(reqPath, 'utf-8');
            return content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
        }
    } catch (e) {
        console.warn(chalk.yellow('   Failed to read dependencies:'), e.message);
    }
    return [];
}

async function generateProfile(targetDir, role, stack, workflow, dependencies) {
    const guidePath = path.join(targetDir, 'GEMINI_GUIDE.md');
    const roleNames = {
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        mobile: 'Mobile Development',
        devops: 'DevOps Engineering',
        ui: 'UI/CSS Design',
        fullstack: 'Full-Stack Development',
    };

    const workflowDescriptions = {
        standard: 'Planning → Development → Review',
        full: 'Planning → Development → Testing → Review → Documentation → Git Commit',
        minimal: 'Development → Review',
    };

    const content = `# ${stack.toUpperCase()} PROJECT GUIDELINES

## Role
- **Type**: ${roleNames[role] || role}
- **Stack**: ${stack}
- **Workflow**: ${workflowDescriptions[workflow] || workflow}

## Core Dependencies
${dependencies.slice(0, 20).map(d => `- ${d}`).join('\n')}
${dependencies.length > 20 ? `- ...and ${dependencies.length - 20} more.` : ''}

## Coding Standards
- Prioritize readability and maintainability
- Follow best practices for ${stack}
- Write tests for all new features
- Document complex logic

## Agent Workflows
- Always start with Feature Planner (unless using Minimal workflow)
- Follow the orchestrated workflow
- Verify changes locally before committing
${workflow === 'full' ? '- Use Git Agent for commit proposals after review approval' : ''}
`;

    await fs.writeFile(guidePath, content);
}

async function configureCursor(targetDir, agentsToInstall) {
    const rulesDir = path.join(targetDir, '.cursor', 'rules');
    await fs.ensureDir(rulesDir);

    const rulesSrc = path.join(ROOT_DIR, 'agents');

    // Determine which files to copy
    let filesToCopy = [];
    if (agentsToInstall.includes('all')) {
        // Install all agents
        const allFiles = await fs.readdir(rulesSrc);
        filesToCopy = allFiles.filter(file => file.endsWith('.md'));
    } else {
        // Install only specified agents
        filesToCopy = agentsToInstall;
    }

    // Copy agent files
    for (const file of filesToCopy) {
        if (file.endsWith('.md')) {
            const srcPath = path.join(rulesSrc, file);
            const destPath = path.join(rulesDir, file);

            if (await fs.pathExists(srcPath)) {
                await fs.copy(srcPath, destPath);
            } else {
                console.warn(chalk.yellow(`   Warning: Agent file not found: ${file}`));
            }
        }
    }

    // Update .cursorrules with workflow enforcement
    const cursorRulesPath = path.join(targetDir, '.cursorrules');
    const agentList = filesToCopy.map(f => `# - ${f.replace('.md', '')}`).join('\n');
    const referenceText = `
# AI Agent Workflow Rules
# This project uses specialized agent roles defined in .cursor/rules/
# ALWAYS check these files for context before starting a task:
${agentList}

# ============================================
# WORKFLOW ENFORCEMENT - MANDATORY
# ============================================

## CRITICAL: One Agent at a Time
You MUST follow the agent workflow strictly:
1. Only ONE agent acts at a time
2. After completing a task, STOP and show a checkpoint
3. Wait for user to say "continue", "next", or provide feedback
4. NEVER skip to the next agent without user confirmation

## Checkpoint Format (REQUIRED after every agent action)
After completing any agent's work, you MUST output:

---
**✅ [Agent Name] - Complete**

**What was done:**
- [Brief summary of actions taken]

**Next step:** [Next Agent Name]
- [What the next agent will do]

**Options:**
- Say **"continue"** or **"next"** to proceed to [Next Agent]
- Say **"redo"** or provide feedback to revise current work
- Say **"stop"** to pause the workflow
---

## Workflow Order
1. Feature Planner → creates implementation_plan.md
2. [Developer Agent] → implements the plan
3. QA Agent → writes tests (if Full Pipeline)
4. Review Agent → reviews code quality
5. Documentation Agent → updates docs (if Full Pipeline)
6. Git Agent → proposes commit (if Full Pipeline)

## Hard Rules
- NEVER proceed to the next agent without explicit user confirmation
- NEVER combine multiple agent actions in one response
- ALWAYS show the checkpoint format after completing work
- If user says "continue" → proceed to next agent only
- If user gives feedback → redo current agent's work
`;

    const exists = await fs.pathExists(cursorRulesPath);
    let currentContent = exists ? await fs.readFile(cursorRulesPath, 'utf-8') : '';

    if (!currentContent.includes('AI Agent Workflow Rules')) {
        await fs.appendFile(cursorRulesPath, referenceText);
    }
}

async function configureOpenCode(targetDir, agentsToInstall) {
    const openCodeDir = path.join(targetDir, '.opencode');
    const agentsDir = path.join(openCodeDir, 'agents');
    await fs.ensureDir(agentsDir);

    const rulesSrc = path.join(ROOT_DIR, 'agents');

    // Determine which files to copy
    let filesToCopy = [];
    if (agentsToInstall.includes('all')) {
        const allFiles = await fs.readdir(rulesSrc);
        filesToCopy = allFiles.filter(file => file.endsWith('.md'));
    } else {
        filesToCopy = agentsToInstall;
    }

    // Copy agent files
    for (const file of filesToCopy) {
        if (file.endsWith('.md')) {
            const srcPath = path.join(rulesSrc, file);
            const destPath = path.join(agentsDir, file);

            if (await fs.pathExists(srcPath)) {
                await fs.copy(srcPath, destPath);
            }
        }
    }

    // Create opencode.json config with checkpoint enforcement
    const configPath = path.join(openCodeDir, 'opencode.json');
    const config = {
        "$schema": "https://opencode.ai/schema/config.json",
        "agents": {
            "directory": "./agents"
        },
        "instructions": [
            "Follow the agent workflow defined in ./agents/system-orchestrator.md",
            "Always check GEMINI_GUIDE.md for project-specific guidelines",
            "CRITICAL: One agent at a time - complete task, show checkpoint, WAIT for user",
            "After EVERY agent action, show checkpoint: ✅ [Agent] - Complete, What was done, Next step, Options",
            "NEVER proceed to next agent without user saying 'continue' or 'next'",
            "If user gives feedback, redo current work. If user says 'stop', pause workflow."
        ]
    };

    await fs.writeJson(configPath, config, { spaces: 2 });

    // Create WORKFLOW_RULES.md in .opencode for explicit enforcement
    const workflowRulesPath = path.join(openCodeDir, 'WORKFLOW_RULES.md');
    const workflowRules = `# Workflow Enforcement Rules

## CRITICAL: Checkpoint-Based Workflow

You MUST follow these rules for EVERY task:

### Rule 1: One Agent at a Time
- Only ONE agent acts per response
- Complete the task fully before checkpoint
- NEVER combine multiple agent actions

### Rule 2: Mandatory Checkpoint Format
After EVERY agent completes their work, output EXACTLY:

\`\`\`
---
✅ [Agent Name] - Complete

**What was done:**
- [Summary point 1]
- [Summary point 2]

**Next step:** [Next Agent Name]
- [What the next agent will do]

**Options:**
- Say "continue" or "next" → proceed to [Next Agent]
- Say "redo" or give feedback → revise current work
- Say "stop" → pause workflow
---
\`\`\`

### Rule 3: Wait for User
- STOP after showing checkpoint
- Do NOT proceed until user responds
- "continue" / "next" / "yes" = proceed
- "redo" / feedback = revise
- "stop" = pause

### Rule 4: Workflow Order
1. Feature Planner → creates plan
2. Developer Agent → implements
3. QA Agent → tests (Full Pipeline)
4. Review Agent → reviews
5. Documentation Agent → updates docs (Full Pipeline)
6. Git Agent → proposes commit (Full Pipeline)

## Hard Rules
- NEVER skip checkpoints
- NEVER proceed without user confirmation
- ALWAYS show what was changed
`;

    await fs.writeFile(workflowRulesPath, workflowRules);
}

async function configureGemini(targetDir) {
    const geminiDir = path.join(targetDir, '.gemini');
    await fs.ensureDir(geminiDir);

    // Read Orchestrator content
    const orchestratorSrc = path.join(ROOT_DIR, 'agents', 'system-orchestrator.md');
    const orchestratorContent = await fs.readFile(orchestratorSrc, 'utf-8');

    // Add checkpoint enforcement header
    const checkpointEnforcement = `# WORKFLOW ENFORCEMENT FOR GEMINI CLI

## CRITICAL RULES - READ FIRST

### One Agent at a Time
- Only ONE agent acts per response
- Complete task, show checkpoint, WAIT for user
- NEVER combine multiple agent actions in one response

### Mandatory Checkpoint Format
After EVERY agent action, output EXACTLY:

\`\`\`
---
✅ [Agent Name] - Complete

**What was done:**
- [Summary point 1]
- [Summary point 2]

**Next step:** [Next Agent Name]
- [What the next agent will do]

**Options:**
- Say "continue" or "next" → proceed to [Next Agent]
- Say "redo" or give feedback → revise current work
- Say "stop" → pause workflow
---
\`\`\`

### User Commands
| User Says | Action |
|-----------|--------|
| "continue" / "next" | Proceed to next agent |
| "redo" / feedback | Redo current agent's work |
| "stop" | Pause workflow |
| "skip" | Skip optional agent |

### Hard Rules
- NEVER skip the checkpoint format
- NEVER proceed without user confirmation
- ALWAYS show what was changed
- ALWAYS wait after checkpoint

---

`;

    // Combine enforcement rules with orchestrator
    const systemContent = checkpointEnforcement + orchestratorContent;
    const dst = path.join(geminiDir, 'system.md');
    await fs.writeFile(dst, systemContent);

    // .env
    const envPath = path.join(targetDir, '.env');
    const envVar = 'GEMINI_SYSTEM_MD=true';
    const exists = await fs.pathExists(envPath);
    let content = exists ? await fs.readFile(envPath, 'utf-8') : '';

    if (!content.includes('GEMINI_SYSTEM_MD')) {
        await fs.appendFile(envPath, `\n${envVar}\n`);
    }
}

async function installVercelSkills(targetDir, tools) {
    const spinner = ora({
        text: 'Installing Vercel React Best Practices skill...',
        color: 'cyan'
    }).start();

    try {
        // Try to run the add-skill command
        await execAsync('npx add-skill vercel-labs/agent-skills --skill react-best-practices -y', {
            cwd: targetDir,
            timeout: 60000 // 60 second timeout
        });
        spinner.succeed(chalk.green('Vercel React skills installed'));
    } catch (err) {
        spinner.warn(chalk.yellow('Could not auto-install Vercel skills.'));
        console.log(chalk.gray('   Run manually:'));
        console.log(chalk.cyan('   npx add-skill vercel-labs/agent-skills'));
    }
}

async function installCleanup(targetDir, tools = ['cursor', 'gemini']) {
    const cleanupPath = path.join(targetDir, 'cleanup.sh');
    const content = generateCleanupScript(tools);

    await fs.writeFile(cleanupPath, content);
    await fs.chmod(cleanupPath, 0o755);
}
