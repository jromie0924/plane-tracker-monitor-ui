# Contributing to Plane Tracker Monitor UI

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/plane-tracker-monitor-ui.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit with clear messages: `git commit -m "Add feature: description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run web

# Type check
npx tsc --noEmit

# Format code (if you have prettier)
npm run format
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible
- Use meaningful variable and function names

### React Native Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types with interfaces
- Add comments for complex logic

### File Organization
- Place components in `src/components/`
- Place types in `src/types/`
- Place services in `src/services/`
- Place themes in `src/theme/`
- Place config in `src/config/`

### Naming Conventions
- Components: PascalCase (e.g., `FlightRow.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Variables/Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: PascalCase with descriptive names

## Pull Request Guidelines

### Before Submitting
- [ ] Code compiles without TypeScript errors
- [ ] App runs without console errors
- [ ] Changes tested on at least one platform (web/iOS/Android)
- [ ] No hardcoded values (use config files)
- [ ] No console.log statements (use proper debugging)
- [ ] Code is properly formatted
- [ ] Commit messages are clear and descriptive

### PR Description Should Include
- Summary of changes
- Motivation for changes
- Screenshots (if UI changes)
- Testing performed
- Any breaking changes
- Related issues (if applicable)

## Types of Contributions

### Bug Fixes
- Check existing issues first
- Create an issue if one doesn't exist
- Reference the issue in your PR
- Include steps to reproduce
- Explain the fix

### New Features
- Discuss in an issue first for major features
- Keep features focused and atomic
- Update documentation
- Add configuration options when appropriate
- Ensure backward compatibility

### Documentation
- Fix typos and clarify unclear sections
- Add examples and use cases
- Update README.md for new features
- Keep QUICKSTART.md up to date

### Themes
- Follow existing theme structure
- Test with all view modes (arrivals/departures)
- Ensure good contrast for accessibility
- Provide descriptive name

### Performance Improvements
- Benchmark before and after
- Explain the optimization
- Ensure no functionality regression

## Testing

- Test on web browser at minimum
- Test theme switching
- Test arrivals/departures toggle
- Test with different data scenarios
- Verify animations work smoothly
- Check console for errors/warnings

## Code Review Process

1. Maintainer reviews code
2. Feedback provided if changes needed
3. You address feedback
4. Once approved, PR is merged
5. Your contribution is appreciated! 🎉

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- Review documentation first

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Keep discussions professional
- Focus on the code, not the person

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Plane Tracker Monitor UI! ✈️
