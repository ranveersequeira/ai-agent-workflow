import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import gradient from 'gradient-string';
import { fileURLToPath } from 'url';
import { generateCleanupScript } from './cleanup-template.js';

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
    let role, stack, agentsToInstall;

    // 3. Prompt User (Role-based approach)
    if (options.yes || process.env.CI) {
        console.log(chalk.yellow('   Skipping prompts (--yes or CI detected). Using defaults.'));
        role = 'fullstack';
        stack = detectedStack.framework || 'react';
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

        agentsToInstall = getAgentsForRole(role, stack);
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
    await generateProfile(targetDir, role, stack, dependencies);
    profileSpinner.succeed(chalk.green('Project profile created'));

    // 6. Install Agents
    const agentSpinner = ora({
        text: 'Installing AI agents...',
        color: 'cyan'
    }).start();
    await installAgents(targetDir, agentsToInstall);
    agentSpinner.succeed(chalk.green('Agents installed successfully'));

    // 7. Configure Native CLI
    const cliSpinner = ora({
        text: 'Configuring Gemini CLI...',
        color: 'cyan'
    }).start();
    await configureNativeCli(targetDir);
    cliSpinner.succeed(chalk.green('Gemini CLI configured'));

    // 8. Install Cleanup Script
    const cleanupSpinner = ora({
        text: 'Setting up cleanup script...',
        color: 'cyan'
    }).start();
    await installCleanup(targetDir);
    cleanupSpinner.succeed(chalk.green('Cleanup script ready'));
}

// ... (Functions detectStack, getDependencies, generateProfile, installAgents, configureNativeCli remain unchanged, so I don't need to include them in the ReplacementContent if I target correctly)
// Wait, replace_file_content replaces a BLOCK. I need to be careful.
// I'll target the top part first to swap imports and the main function flow.


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

function getAgentsForRole(role, stack) {
    const baseAgents = [
        'system-orchestrator.md',
        'feature-planner.md',
        'qa-agent.md',
        'review-agent.md',
        'documentation-agent.md',
    ];

    const roleAgentMap = {
        frontend: {
            react: ['frontend-react-agent.md'],
            nextjs: ['frontend-nextjs-agent.md'],
            vue: ['frontend-vue-agent.md'],
            angular: ['frontend-angular-agent.md'],
            custom: ['frontend-react-agent.md'], // default fallback
        },
        backend: {
            node: ['backend-node-agent.md', 'database-mongodb-agent.md'],
            fastapi: ['backend-fastapi-agent.md'],
            flask: ['backend-flask-agent.md'],
            django: ['backend-django-agent.md'],
            custom: ['backend-node-agent.md'], // default fallback
        },
        mobile: {
            flutter: ['mobile-flutter-agent.md'],
            custom: ['mobile-flutter-agent.md'], // default fallback
        },
        devops: {
            terraform: ['devops-terraform-agent.md'],
            custom: ['devops-terraform-agent.md'], // default fallback
        },
        ui: {
            all: ['ui-css-expert-agent.md'],
        },
        fullstack: {
            all: ['all'], // Special marker to install all agents
        },
    };

    let roleSpecificAgents = [];
    if (role === 'fullstack') {
        return ['all']; // Will be handled specially in installAgents
    }

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

async function generateProfile(targetDir, role, stack, dependencies) {
    const guidePath = path.join(targetDir, 'GEMINI_GUIDE.md');
    const roleNames = {
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        mobile: 'Mobile Development',
        devops: 'DevOps Engineering',
        ui: 'UI/CSS Design',
        fullstack: 'Full-Stack Development',
    };

    const content = `# ${stack.toUpperCase()} PROJECT GUIDELINES

## Role
- **Type**: ${roleNames[role] || role}
- **Stack**: ${stack}

## Core Dependencies
${dependencies.slice(0, 20).map(d => `- ${d}`).join('\n')}
${dependencies.length > 20 ? `- ...and ${dependencies.length - 20} more.` : ''}

## Coding Standards
- Prioritize readability and maintainability
- Follow best practices for ${stack}
- Write tests for all new features
- Document complex logic

## Agent Workflows
- Always start with Feature Planner
- Follow the orchestrated workflow
- Verify changes locally before committing
`;

    await fs.writeFile(guidePath, content);
}

async function installAgents(targetDir, agentsToInstall) {
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

    // Spinner handles success message

    // Update .cursorrules
    const cursorRulesPath = path.join(targetDir, '.cursorrules');
    const agentList = filesToCopy.map(f => `# - ${f.replace('.md', '')}`).join('\n');
    const referenceText = `
# AI Agent Rules
# This project uses specialized agent roles defined in .cursor/rules/
# ALWAYS check these files for context before starting a task:
${agentList}
`;

    const exists = await fs.pathExists(cursorRulesPath);
    let currentContent = exists ? await fs.readFile(cursorRulesPath, 'utf-8') : '';

    if (!currentContent.includes('AI Agent Rules')) {
        await fs.appendFile(cursorRulesPath, referenceText);
    }
}

async function configureNativeCli(targetDir) {
    const geminiDir = path.join(targetDir, '.gemini');
    await fs.ensureDir(geminiDir);

    // Copy Orchestrator
    const src = path.join(ROOT_DIR, 'agents', 'system-orchestrator.md');
    const dst = path.join(geminiDir, 'system.md');
    await fs.copy(src, dst);

    // .env
    const envPath = path.join(targetDir, '.env');
    const envVar = 'GEMINI_SYSTEM_MD=true';
    const exists = await fs.pathExists(envPath);
    let content = exists ? await fs.readFile(envPath, 'utf-8') : '';

    if (!content.includes('GEMINI_SYSTEM_MD')) {
        await fs.appendFile(envPath, `\n${envVar}\n`);
    }
}

async function installCleanup(targetDir) {
    const cleanupPath = path.join(targetDir, 'cleanup.sh');
    const content = generateCleanupScript();

    await fs.writeFile(cleanupPath, content);
    await fs.chmod(cleanupPath, 0o755);
}
