// 命令args的泛型
interface Augment {
  name: string;
  type: string;
  description: string;
}

export class CustomCommand<T> {
  private name: string;
  private description: string;
  private args: Array<Augment>;
  static commanndList: Map<string, string> = new Map();

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
    CustomCommand.commanndList.set(name, desc);
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
    CustomCommand.commanndList.forEach((command, description) => {
      commands.push({ command, description });
    });
    return commands;
  }

  // Need overwrite
  execute(...args: Array<any>): void {
    console.log(`Executing command: ${this.name} with args: ${args}`);
  }
}

export class FooCommand extends CustomCommand<string> {
  constructor() {
    super('foo', [], 'This is a foo command example.');
  }

  execute(): void {
    console.log(`${this.getArgs()[0]} command executed with args: ${this.getArgs()}`);
  }
}

export class BarkCommand extends CustomCommand<string> {
  constructor() {
    super(
      'bark',
      [{ name: 'name', type: 'string', description: 'The name of the barker' }],
      'This command makes a character bark.',
    );
  }

  execute(name: string): void {
    console.log(`${name} has barked!`);
  }
}
