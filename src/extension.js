#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { runSetup } from './setup.js';
import path from 'path';

const server = new McpServer({
    name: 'ai-agent-workflow',
    version: '2.0.1',
});

server.registerTool(
    'setup_agent_workflow',
    {
        description: 'Set up role-based AI agents in a target directory.',
        inputSchema: z.object({
            targetDirectory: z.string().optional().describe('The directory to install agents into (default: current directory).'),
            role: z.enum(['frontend', 'backend', 'mobile', 'devops', 'ui', 'fullstack']).describe('The development role (e.g., frontend, backend).'),
            stack: z.string().describe('The tech stack or framework (e.g., react, nextjs, node, flask, django, flutter).'),
        }).shape,
    },
    async ({ targetDirectory, role, stack }) => {
        const targetDir = targetDirectory ? path.resolve(process.cwd(), targetDirectory) : process.cwd();

        const logs = [];
        const originalLog = console.log;

        // Redirect logs
        console.log = (...args) => {
            logs.push(args.join(' '));
            process.stderr.write(args.join(' ') + '\n');
        };

        try {
            await runSetup(targetDir, {
                role,
                stack,
                yes: true,
                quiet: true,
            });

            return {
                content: [
                    {
                        type: 'text',
                        text: `Setup complete for ${role}/${stack} in ${targetDir}.\n\nLogs:\n${logs.join('\n')}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error during setup: ${error.message}\n\nLogs:\n${logs.join('\n')}`,
                    },
                ],
                isError: true,
            };
        } finally {
            console.log = originalLog;
        }
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
