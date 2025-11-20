import { Ollama } from 'ollama';
import { config } from '../config';
import { CustomCommand, FooCommand, BarkCommand } from '../command';
const ollama = new Ollama();

interface Command<T extends any[] = any[]> {
  command: string;
  args: T;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const generateCommandsSystemPrompt = () => `
You are a command generator. Based on the user's request, generate a list of appropriate commands with their descriptions in JSON format.
Each command should have a "command" field for the command name and a "description" field explaining its purpose.

Can Use Command List:
${JSON.stringify(CustomCommand.getAllCommands(), null, 2)}

Respond with a JSON array of commands that best fit the user's request.
Example:
[
  {
    "command": "bark",
    "args": ["foo"]
  },
    "command": "bark",
    "args": ["noob"]
  },
  {
    "command": "foo",
    "args": []
  }
]
`;

async function generateCommands(system: string, userRequest: string): Promise<Array<Command<any>>> {
  const chat = async () => {
    const response = await ollama.chat({
      model: config.OLLAMA_MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userRequest },
      ],
    });
    return response;
  };
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await chat();
      let content = response.message.content;
      content = content.trim();
      if (content.startsWith('```json') && content.endsWith('```')) {
        content = content.slice(7, -3).trim();
      }
      const commands: Array<Command<any>> = JSON.parse(content);
      return commands;
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        console.log(error);
      } else {
        throw new Error('Max retries reached. Failed to generate commands.');
      }
    }
  }
  return [];
}

export async function test() {
  // 注册命令
  const fooCommand = new FooCommand();
  const barkCommand = new BarkCommand();

  const userRequest = 'Make Mike And Lily bark loudly';
  const systemPrompt = generateCommandsSystemPrompt();

  const commands = await generateCommands(systemPrompt, userRequest);

  for (const cmd of commands) {
    if (cmd.command === 'bark') {
      barkCommand.execute(...(cmd.args as [string]));
    } else if (cmd.command === 'foo') {
      fooCommand.execute();
    }
  }
}
