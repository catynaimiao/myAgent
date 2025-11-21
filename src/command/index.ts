// 命令args的泛型
interface Augment {
  name: string;
  type: string;
  description: string;
}

export class Command<T> {
  private name: string;
  private description: string;
  private args: Array<Augment>;
  static commanndList: Map<string, string> = new Map();
  static commandsInstanceList: Map<string, Command<any>> = new Map();

  constructor(name: string, args: Array<Augment> = [], description: string = '') {
    this.name = name;
    this.args = args;
    // construct description with args info like JS doc
    let desc = description;
    if (args.length > 0) {
      desc += '\nArguments:\n';
      args.forEach((arg) => {
        desc += `- ${arg.name} (${arg.type}): ${arg.description}\n`;
      });
    }
    this.description = desc;
    // register command
    Command.commanndList.set(name, desc);
    Command.commandsInstanceList.set(name, this);
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getArgs(): Array<Augment> {
    return this.args;
  }

  // get all registered commands' names and descriptions.
  public static getAllCommands(): Array<{ command: string; description: string }> {
    const commands: Array<{ command: string; description: string }> = [];
    Command.commanndList.forEach((command, description) => {
      commands.push({ command, description });
    });
    return commands;
  }

  public static getCommandInstance(commandName: string): Command<any> | undefined {
    return Command.commandsInstanceList.get(commandName);
  }

  // Need overwrite
  execute(...args: Array<any>): string | void {
    console.log(`Executing command: ${this.name} with args: ${args}`);
  }
}

// Example command
export class FooCommand extends Command<string> {
  constructor() {
    super('foo', [], 'This is a foo command example.');
  }

  execute(): string {
    const result = `${this.getArgs()[0]} command executed with args: ${this.getArgs()}`;
    console.log(result);
    return result;
  }
}
