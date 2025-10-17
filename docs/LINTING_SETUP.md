# Linting and Code Quality Setup

## Overview

This project uses a comprehensive linting setup with ESLint, TypeScript, and Prettier to maintain high code quality and consistency.

## Configuration Files

### `.eslintrc.json`

- **TypeScript ESLint**: Strict TypeScript rules with type checking
- **React Rules**: React and React Hooks best practices
- **Code Quality**: General JavaScript/TypeScript quality rules
- **Import Organization**: Automatic import sorting and deduplication
- **Accessibility**: JSX accessibility rules
- **Next.js**: Next.js specific rules

### `.prettierrc`

- **Code Formatting**: Consistent code formatting across the project
- **Single Quotes**: Uses single quotes for strings
- **Semicolons**: Enforces semicolons
- **Trailing Commas**: ES5 compatible trailing commas
- **Print Width**: 80 character line limit

### `.eslintignore` & `.prettierignore`

- **Exclusions**: Properly excludes build files, dependencies, and generated files

## Key Rules

### TypeScript Rules

- `@typescript-eslint/no-explicit-any`: Prevents use of `any` type
- `@typescript-eslint/no-unused-vars`: Catches unused variables
- `@typescript-eslint/prefer-optional-chain`: Enforces optional chaining
- `@typescript-eslint/prefer-nullish-coalescing`: Enforces nullish coalescing

### React Rules

- `react-hooks/rules-of-hooks`: Enforces React Hooks rules
- `react-hooks/exhaustive-deps`: Warns about missing dependencies
- `react/no-unescaped-entities`: Prevents unescaped entities

### Code Quality Rules

- `no-console`: Warns about console statements (allows warn/error)
- `prefer-const`: Enforces const for variables that aren't reassigned
- `eqeqeq`: Enforces strict equality (`===`)
- `curly`: Enforces curly braces for all control structures

### Import Rules

- `import/order`: Automatically sorts imports
- `import/no-duplicates`: Prevents duplicate imports

## Available Scripts

```bash
# Linting
npm run lint              # Run ESLint with Next.js config
npm run lint:fix          # Run ESLint with auto-fix
npm run lint:check        # Run ESLint with zero warnings allowed

# Formatting
npm run format            # Format code with Prettier
npm run format:check      # Check if code is formatted

# Type Checking
npm run type-check        # Run TypeScript compiler check

# Combined Commands
npm run check-all         # Run all checks (type, lint, format)
npm run fix-all           # Fix all auto-fixable issues
```

## IDE Integration

### VS Code

Install these extensions for the best experience:

- ESLint
- Prettier - Code formatter
- TypeScript Importer

### Settings

Add to your VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Pre-commit Hooks (Recommended)

Install husky and lint-staged for automatic linting on commit:

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Add to package.json:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

## Common Issues and Solutions

### TypeScript Errors

- **Unused variables**: Use underscore prefix (`_unusedVar`) or remove
- **Any types**: Replace with proper types or `unknown`
- **Optional chaining**: Use `?.` instead of `&&` checks

### React Errors

- **Missing dependencies**: Add missing dependencies to useEffect
- **Conditional hooks**: Move hooks to top level of component

### Import Errors

- **Duplicate imports**: Combine imports from same module
- **Unused imports**: Remove unused imports

## Best Practices

1. **Run checks before committing**: `npm run check-all`
2. **Fix issues immediately**: `npm run fix-all`
3. **Use proper TypeScript types**: Avoid `any`
4. **Follow React Hooks rules**: Don't call hooks conditionally
5. **Keep imports organized**: Let ESLint sort them automatically
6. **Use meaningful variable names**: Avoid single letter variables
7. **Handle errors properly**: Use proper error boundaries and try-catch

## Troubleshooting

### Build Failures

1. Run `npm run type-check` to check TypeScript errors
2. Run `npm run lint:check` to check ESLint errors
3. Fix issues and try building again

### Performance Issues

- The linting setup is optimized for performance
- Type checking is only run when needed
- ESLint cache is enabled by default

### Configuration Issues

- Check `.eslintrc.json` for rule conflicts
- Verify TypeScript configuration in `tsconfig.json`
- Ensure all required dependencies are installed
