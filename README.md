# MyFlow

What I know about ai agents and workflows.

## Setup

Install dependencies:

```bash
npm install
```

## Available Commands

- `npm run dev` - Run the TypeScript file directly using ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Compile in watch mode (auto-recompile on changes)
- `npm start` - Run the compiled JavaScript from dist folder
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier

## Workflow

1. Write your TypeScript code in the `src` folder
2. Use `npm run dev` for quick testing during development
3. Use `npm run watch` to auto-compile as you code
4. Use `npm run build` to compile for production
5. Use `npm start` to run the compiled code

## Project Structure

```
myflow/
├── src/           # TypeScript source files
├── dist/          # Compiled JavaScript files
├── node_modules/  # Dependencies
├── package.json   # Project configuration
├── tsconfig.json  # TypeScript configuration
├── .eslintrc.json # ESLint configuration
└── .prettierrc.json # Prettier configuration
```
