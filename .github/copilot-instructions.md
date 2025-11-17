# MyFlow - Copilot Instructions

## Project Overview

This is a TypeScript scripting project for writing and running simple Node.js scripts with strict type checking, linting, and formatting.

## Architecture & Structure

- **`src/`** - All TypeScript source files (entry point: `src/index.ts`)
- **`dist/`** - Compiled JavaScript output (git-ignored)
- **Compilation**: TypeScript → CommonJS with ES2020 target
- **Type safety**: Strict mode enabled with full type checking

## Development Workflow

### Quick Development
```bash
npm run dev        # Run TypeScript directly via ts-node (fastest for testing)
npm run watch      # Auto-recompile on file changes
```

### Production Build
```bash
npm run build      # Compile to dist/
npm start          # Run compiled JavaScript
```

### Code Quality
```bash
npm run lint       # Check for issues
npm run lint:fix   # Auto-fix linting errors
npm run format     # Format with Prettier
```

## Code Style & Conventions

### TypeScript Configuration
- **Target**: ES2020 with CommonJS modules
- **Strict mode**: Enabled - all code must be fully typed
- **Source maps**: Always generated for debugging
- **Declaration files**: Generated automatically (`.d.ts`)

### Style Rules (Enforced)
- **Single quotes** for strings (Prettier)
- **Semicolons** required (Prettier)
- **Trailing commas** in multi-line structures (Prettier)
- **100 character** line width limit
- **2 spaces** for indentation
- **LF line endings** (Unix-style)

### Linting Approach
- ESLint + TypeScript + Prettier integration
- `any` types trigger warnings (avoid when possible)
- Unused variables are warnings, not errors
- Fix linting issues before committing: `npm run lint:fix`

## Adding New Scripts

1. Create new `.ts` files in `src/`
2. Export functions for reusability
3. Use `npm run dev` for quick testing
4. Ensure strict typing - no implicit `any`
5. Run `npm run lint:fix && npm run format` before committing

Example pattern from `src/index.ts`:
```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function main(): void {
  // Script logic here
}

main();
```

## Dependencies

All dependencies are dev-only (no production runtime dependencies):
- TypeScript toolchain
- ESLint + TypeScript plugin + Prettier integration
- ts-node for rapid development
