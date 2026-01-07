import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { generateCleanupScript } from './cleanup-template.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

export async function runSetup(targetDir, options = {}) {
    // 1. Ensure Target Exists
    await fs.ensureDir(targetDir);

    // 2. Detect Stack
    const stackInfo = await detectStack(targetDir);
    let { techStack, framework } = stackInfo;

    // 3. Prompt User (Confirm/Override) (Skip if CI or --yes flag implicit)
    if (options.yes || process.env.CI) {
        console.log(chalk.yellow('   Skipping prompts (--yes or CI detected). Using defaults.'));
        // defaults already set in stackInfo
    } else {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'techStack',
                message: 'Tech Stack:',
                choices: ['js', 'python'],
                default: techStack || 'js',
            },
            {
                type: 'input',
                name: 'framework',
                message: 'Framework (e.g. react, django, nextjs):',
                default: framework || (techStack === 'js' ? 'react' : 'django'),
            }
        ]);
        techStack = answers.techStack;
        framework = answers.framework;
    }

    // 4. Analyze Dependencies (Reload based on user choice if needed, but we essentially have them)
    const dependencies = await getDependencies(targetDir, techStack);
    console.log(chalk.gray(`   Found ${dependencies.length} dependencies.`));

    // 5. Generate Profile
    await generateProfile(targetDir, techStack, framework, dependencies);

    // 6. Install Agents
    await installAgents(targetDir);

    // 7. Configure Native CLI
    await configureNativeCli(targetDir);

    // 8. Install Cleanup Script
    await installCleanup(targetDir);
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

async function getDependencies(targetDir, techStack) {
    try {
        if (techStack === 'js') {
            const pkgPath = path.join(targetDir, 'package.json');
            if (await fs.pathExists(pkgPath)) {
                const pkg = await fs.readJson(pkgPath);
                return [
                    ...Object.keys(pkg.dependencies || {}),
                    ...Object.keys(pkg.devDependencies || {})
                ];
            }
        } else if (techStack === 'python') {
            const reqPath = path.join(targetDir, 'requirements.txt');
            if (await fs.pathExists(reqPath)) {
                const content = await fs.readFile(reqPath, 'utf-8');
                return content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
            }
        }
    } catch (e) {
        console.warn(chalk.yellow('   Failed to read dependencies:'), e.message);
    }
    return [];
}

async function generateProfile(targetDir, techStack, framework, dependencies) {
    const guidePath = path.join(targetDir, 'GEMINI_GUIDE.md');
    const content = `# ${framework.toUpperCase()} PROJECT GUIDELINES

## Tech Stack
- **Language**: ${techStack}
- **Framework**: ${framework}

## Core Dependencies
${dependencies.slice(0, 20).map(d => `- ${d}`).join('\n')}
${dependencies.length > 20 ? `- ...and ${dependencies.length - 20} more.` : ''}

## Coding Standards
- Prioritize readability.
- Use best practices for ${framework}.

## Agent Workflows
- Always verify changes locally.
`;

    await fs.writeFile(guidePath, content);
    console.log(chalk.green(`   Created ${guidePath}`));
}

async function installAgents(targetDir) {
    const rulesDir = path.join(targetDir, '.cursor', 'rules');
    await fs.ensureDir(rulesDir);

    const rulesSrc = path.join(ROOT_DIR, 'agents');
    // Copy all .md files
    const files = await fs.readdir(rulesSrc);
    for (const file of files) {
        if (file.endsWith('.md')) {
            await fs.copy(path.join(rulesSrc, file), path.join(rulesDir, file));
        }
    }
    console.log(chalk.green(`   Installed agents to ${rulesDir}`));

    // Update .cursorrules
    const cursorRulesPath = path.join(targetDir, '.cursorrules');
    const referenceText = `
# AI Agent Rules
# This project uses specialized agent roles defined in .cursor/rules/
# ALWAYS check these files for context before starting a task:
# - Backend -> .cursor/rules/backend-node-agent.md
# - Frontend -> .cursor/rules/frontend-react-agent.md
# - Orchestrator -> .cursor/rules/system-orchestrator.md
`;

    const exists = await fs.pathExists(cursorRulesPath);
    let currentContent = exists ? await fs.readFile(cursorRulesPath, 'utf-8') : '';

    if (!currentContent.includes('AI Agent Rules')) {
        await fs.appendFile(cursorRulesPath, referenceText);
        console.log(chalk.green(`   Updated .cursorrules`));
    }
}

async function configureNativeCli(targetDir) {
    const geminiDir = path.join(targetDir, '.gemini');
    await fs.ensureDir(geminiDir);

    // Copy Orchestrator
    const src = path.join(ROOT_DIR, 'agents', 'system-orchestrator.md');
    const dst = path.join(geminiDir, 'system.md');
    await fs.copy(src, dst);
    console.log(chalk.green(`   Configured Native CLI (.gemini/system.md)`));

    // .env
    const envPath = path.join(targetDir, '.env');
    const envVar = 'GEMINI_SYSTEM_MD=true';
    const exists = await fs.pathExists(envPath);
    let content = exists ? await fs.readFile(envPath, 'utf-8') : '';

    if (!content.includes('GEMINI_SYSTEM_MD')) {
        await fs.appendFile(envPath, `\n${envVar}\n`);
        console.log(chalk.green(`   Added GEMINI_SYSTEM_MD to .env`));
    }
}

async function installCleanup(targetDir) {
    const cleanupPath = path.join(targetDir, 'cleanup.sh');
    const content = generateCleanupScript();

    await fs.writeFile(cleanupPath, content);
    await fs.chmod(cleanupPath, 0o755);
    console.log(chalk.green(`   Installed cleanup script to ./cleanup.sh`));
}
