# Contributing to CVGen

Thank you for your interest in contributing to CVGen! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/OS information

### Suggesting Features
1. Check existing feature requests
2. Create a new issue with:
   - Clear use case
   - Expected behavior
   - Why this would be valuable
   - Any implementation ideas

### Pull Requests

#### Before Starting
- Check open issues and PRs to avoid duplicates
- Discuss major changes in an issue first
- Fork the repository and create a branch

#### Development Process
1. **Clone and Setup**
   ```bash
   git clone https://github.com/yourusername/cvgen.git
   cd cvgen
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Changes**
   - Follow the code style guidelines
   - Write clean, documented code
   - Test your changes thoroughly

4. **Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with PDF export"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use descriptive variable and function names

### React/Next.js
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use `"use client"` directive when needed

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Keep custom CSS minimal
- Maintain consistent spacing

### File Organization
```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable React components
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── constants/    # App constants
```

### Naming Conventions
- **Files**: PascalCase for components (`Resume.tsx`)
- **Variables**: camelCase (`resumeData`)
- **Types/Interfaces**: PascalCase (`ResumeData`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_RESUME`)

## ✅ Code Quality Checklist

Before submitting a PR, ensure:
- [ ] Code follows style guidelines
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code is properly formatted (`npm run format`)
- [ ] Changes are tested locally
- [ ] Documentation is updated (if needed)
- [ ] Commit messages are clear

## 🏗️ Architecture Principles

### DRY (Don't Repeat Yourself)
- Extract common logic into utilities
- Create reusable components
- Avoid code duplication

### KISS (Keep It Simple, Stupid)
- Prefer simple solutions
- Avoid over-engineering
- Write readable code

### Clean Code
- Self-documenting code
- Clear function names
- Small, focused functions
- Proper error handling

### Production-Grade
- Type safety with TypeScript
- Error boundaries
- Performance optimization
- Accessibility considerations

## 🎯 Priority Areas

We especially welcome contributions in:
- **Features**: New resume sections, templates
- **UX**: Improved editing experience
- **Export**: Additional export formats
- **Accessibility**: A11y improvements
- **Documentation**: Tutorials, examples
- **Tests**: Unit and integration tests

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤔 Questions?

Feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Contact maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making CVGen better! 🎉**

