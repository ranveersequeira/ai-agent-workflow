#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';
import boxen from 'boxen';
import path from 'path';
import { runSetup } from '../src/setup.js';

// Get package version
const VERSION = "2.0.0";

// Custom gradient colors
const coolGradient = gradient(['#667eea', '#764ba2']);
const successGradient = gradient(['#56ab2f', '#a8e063']);

// Display banner
function showBanner() {
    console.clear();
    console.log(
        coolGradient(
            figlet.textSync('AI Agents', {
                font: 'ANSI Shadow',
                horizontalLayout: 'fitted'
            })
        )
    );
    console.log();
    console.log(
        boxen(
            chalk.white('Transform your repository into an') + '\n' +
            chalk.bold.cyan('AI Specialist Team') + '\n\n' +
            chalk.gray('Version ' + VERSION),
            {
                padding: 1,
                margin: { top: 0, bottom: 1, left: 2, right: 2 },
                borderStyle: 'round',
                borderColor: 'cyan',
                align: 'center'
            }
        )
    );
}

program
    .name('ai-agent-workflow')
    .description('One-command setup for AI Agent Workflows')
    .version(VERSION)
    .argument('[directory]', 'Target directory to install agents into', '.')
    .option('-y, --yes', 'Skip prompts and accept defaults')
    .action(async (directory, options) => {
        try {
            // Show banner
            if (!options.yes && !process.env.CI) {
                showBanner();
            }

            const targetDir = path.resolve(process.cwd(), directory);

            if (!options.yes) {
                console.log(chalk.blue.bold('\n🚀 Starting AI Agent Workflow Setup\n'));
                console.log(chalk.gray('   Target: ') + chalk.cyan(targetDir));
                console.log();
            }

            await runSetup(targetDir, options);

            // Success message
            console.log();
            console.log(
                boxen(
                    successGradient.multiline(
                        '✨ Setup Complete! ✨\n\n' +
                        'Your agents are ready to use'
                    ),
                    {
                        padding: 1,
                        margin: 1,
                        borderStyle: 'double',
                        borderColor: 'green',
                        align: 'center'
                    }
                )
            );

            console.log(chalk.white.bold('\n📖 Next Steps:\n'));
            console.log(chalk.gray('   1. ') + chalk.cyan('gemini "Your task"') + chalk.gray(' - Use Gemini CLI'));
            console.log(chalk.gray('   2. Open ') + chalk.cyan('Cursor') + chalk.gray(' and start chatting'));
            console.log(chalk.gray('   3. Check ') + chalk.cyan('USAGE.md') + chalk.gray(' for workflow details'));
            console.log();
            console.log(chalk.gray('   For cleanup: ') + chalk.yellow('./cleanup.sh'));
            console.log();

        } catch (error) {
            console.log();
            console.log(
                boxen(
                    chalk.red.bold('❌ Error\n\n') +
                    chalk.white(error.message),
                    {
                        padding: 1,
                        margin: 1,
                        borderStyle: 'round',
                        borderColor: 'red',
                        align: 'left'
                    }
                )
            );
            process.exit(1);
        }
    });

program.parse();
