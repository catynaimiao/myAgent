import { Ollama } from 'ollama';
import { config } from '../config';
import { Command } from '../command';
const ollama = new Ollama();

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const generateCommandsSystemPrompt = () => `
You are a agent that helps users by answering questions and generating commands to fulfill their requests.

## Message Generation Instructions
Based on the user's request, generate a concise message summarizing the actions taken.

## Command Generation Instructions
Based on the user's request, generate a list of appropriate commands with their descriptions in JSON format.
Each command should have a "command" field for the command name and a "description" field explaining its purpose.

Can Use Command List:
${JSON.stringify(Command.getAllCommands(), null, 2)}

## Response Format
Respond with a JSON array of commands that best fit the user's request with commands and message.
Example:
{
  message: "Make Mike And Lily bark loudly",
  commands:  [
      {
        "command": "bark",
        "args": ["foo"]
      },
      {
        "command": "foo",
        "args": []
      }
    ]
}
`;

export async function generateCommands(
  userRequest: string,
): Promise<[Array<Command<any>>, string]> {
  const chat = async () => {
    const response = await ollama.chat({
      model: config.OLLAMA_MODEL,
      messages: [
        { role: 'system', content: generateCommandsSystemPrompt() },
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
      const parsedContent = JSON.parse(content);
      const commands: Array<Command<any>> = parsedContent.commands;
      const message: string = parsedContent.message;
      return [commands, message];
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        console.log(error);
      } else {
        throw new Error('Max retries reached. Failed to generate commands.');
      }
    }
  }
  return [[], ''];
}
