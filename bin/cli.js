#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { runSetup } from '../src/setup.js';

// Get package version (simple workaround for ESM JSON import)
const VERSION = "1.0.0";

program
    .name('ai-agent-workflow')
    .description('One-command setup for AI Agent Workflows')
    .version(VERSION)
    .argument('[directory]', 'Target directory to install agents into', '.')
    .option('-y, --yes', 'Skip prompts and accept defaults')
    .action(async (directory, options) => {
        try {
            // Pass options to your setup logic, or just let process.argv handle it (but safer to pass)
            // Since src/setup.js checked process.argv, that works, BUT commander strips args it consumed.
            // Better to check 'options.yes'.

            const targetDir = path.resolve(process.cwd(), directory);
            console.log(chalk.blue(`🤖 Starting AI Agent Workflow Setup`));
            console.log(chalk.gray(`Target: ${targetDir}`));

            await runSetup(targetDir, options);

            console.log(chalk.green('\n✨ Setup complete!'));
            console.log(chalk.white('You can now use "gemini" or Cursor to start your task.'));
            console.log(chalk.gray('See USAGE.md for the workflow details.'));
        } catch (error) {
            console.error(chalk.red('\n❌ Error:'), error.message);
            process.exit(1);
        }
    });

program.parse();
