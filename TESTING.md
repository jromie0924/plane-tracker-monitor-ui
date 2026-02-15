# Testing Documentation

This document describes the test suite for the plane-tracker-monitor-ui application.

## Overview

The test suite includes comprehensive unit tests covering services, components, and configuration with 123 tests total and excellent coverage.

## Test Structure

```
src/
├── components/__tests__/
│   ├── ColumnSelector.test.tsx (23 tests)
│   ├── FlightRow.test.tsx (24 tests)
│   └── ThemeSelector.test.tsx (17 tests)
├── config/__tests__/
│   └── appConfig.test.ts (21 tests)
└── services/__tests__/
    ├── ColumnPreferencesService.test.ts (24 tests)
    ├── FlightDataService.test.ts (21 tests)
    └── ThemePreferencesService.test.ts (13 tests)
```

## Coverage Summary

- **Total Tests**: 123 passing
- **Services**: 100% coverage (58 tests)
- **Components**: 82-92% coverage on tested components (64 tests)
- **Configuration**: 100% coverage (21 tests)

### Detailed Coverage

| Module | Coverage | Tests | Key Areas |
|--------|----------|-------|-----------|
| FlightDataService | 100% | 21 | Mock data generation, status progression |
| ColumnPreferencesService | 100% | 24 | Cookie persistence, validation, toggle logic |
| ThemePreferencesService | 100% | 13 | Theme persistence, error handling |
| FlightRow | 82% | 24 | Rendering, column visibility, formatting |
| ColumnSelector | 92% | 23 | Modal interaction, column toggles |
| ThemeSelector | 83% | 17 | Theme selection, dropdown behavior |
| appConfig | 100% | 21 | Configuration validation |

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test -- path/to/test.test.ts
```

### Run tests matching a pattern
```bash
npm test -- --testNamePattern="should toggle column"
```

## Test Configuration

The test suite uses:
- **Jest**: Testing framework
- **@testing-library/react-native**: Component testing utilities
- **jest-expo**: Expo preset for Jest

### Configuration Files
- `jest.config.js`: Main Jest configuration
- `jest.setup.js`: Global test setup and mocks

## Writing Tests

### Service Tests Example
```typescript
import { serviceUnderTest } from '../ServiceName';

describe('ServiceName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should perform expected behavior', () => {
    const result = serviceUnderTest.method();
    expect(result).toBe(expectedValue);
  });
});
```

### Component Tests Example
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ComponentName />);
    expect(getByText('Expected Text')).toBeTruthy();
  });
});
```

## Test Categories

### Unit Tests
- **Services**: Business logic, data manipulation, persistence
- **Components**: UI rendering, user interactions, prop handling
- **Configuration**: Default values, type validation

### Test Types
1. **Happy Path**: Normal operation with valid inputs
2. **Edge Cases**: Boundary conditions, empty/null values
3. **Error Handling**: Invalid inputs, exception scenarios
4. **Integration**: Multiple components/services working together

## Mocked Dependencies

The following dependencies are mocked in `jest.setup.js`:
- `js-cookie`: Cookie operations
- Expo runtime: React Native environment globals

## Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **One Assertion Per Test**: Keep tests focused
3. **Descriptive Names**: Use clear, descriptive test names
4. **Clean Up**: Clear mocks between tests
5. **Avoid Implementation Details**: Test behavior, not implementation

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Manual workflow triggers

All tests must pass before merging.

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module"
- **Solution**: Run `npm install` to ensure dependencies are installed

**Issue**: Coverage reports not generated
- **Solution**: Run `npm run test:coverage` explicitly

**Issue**: Tests timeout
- **Solution**: Increase timeout in test: `jest.setTimeout(10000)`

## Future Improvements

Potential areas for expansion:
1. Add tests for FlightBoardHeader component
2. Add integration tests for FlightMonitorBoard
3. Add E2E tests with Detox
4. Add performance benchmarks
5. Add visual regression tests

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
