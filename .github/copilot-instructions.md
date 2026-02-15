# Copilot Instructions for Plane Tracker Monitor UI

## Project Overview
This is a React Native + Expo application that provides an airport-style flight monitor display. The app shows tracked flights in a visually appealing format similar to airport arrivals and departures boards. It features a mobile-first design optimized for phones and tablets with responsive layouts, smooth animations, and multiple customizable themes.

## Development Environment

### Node.js Environment
- **Node.js**: v14 or higher (recommended: v18 or v20)
- **Package Manager**: npm
- **Expo CLI**: Optional but recommended for easier development
- **Dependencies Installation**: `npm install`

### Key Dependencies
- **expo**: ~54.0.33 - Application platform
- **react**: 19.1.0 - UI library
- **react-native**: 0.81.5 - Mobile framework
- **typescript**: ~5.9.2 - Type safety
- **js-cookie**: ^3.0.5 - Cookie management for preferences persistence
- **jest**: Testing framework
- **@testing-library/react-native**: Component testing utilities

### Setup Tools
- **npm**: For package management
- **Expo Go**: Mobile app for testing on physical devices
- **Metro Bundler**: JavaScript bundler (included with Expo)

## Project Structure

### Core Directories
- `src/`: Main application code
  - `components/`: React Native components
    - `FlightMonitorBoard.tsx`: Main board component with flight list and view mode switching
    - `FlightBoardHeader.tsx`: Header with title and column labels
    - `FlightRow.tsx`: Individual flight row with all flight details
    - `ThemeSelector.tsx`: Theme switching dropdown component
    - `ColumnSelector.tsx`: Modal for toggling column visibility
  - `types/`: TypeScript interfaces and enums
    - `Flight.ts`: Flight data interface, FlightStatus enum, ViewMode type
    - `Column.ts`: Column configuration interface
  - `services/`: Business logic and data services
    - `FlightDataService.ts`: Mock flight data generator and update logic
    - `ThemePreferencesService.ts`: Theme selection and cookie persistence
    - `ColumnPreferencesService.ts`: Column visibility preferences and cookie persistence
  - `theme/`: Theme definitions
    - `themes.ts`: Eight theme definitions (Blue, Purple, Green, Red, Black, White, Light, Dark)
  - `config/`: Application configuration
    - `appConfig.ts`: Update intervals, view modes, animation settings
- `assets/`: Images, icons, and static resources
- `App.tsx`: Main application entry point
- `index.ts`: App registration point

### Important Files
- `package.json`: Dependencies and npm scripts
- `tsconfig.json`: TypeScript configuration (extends Expo base config)
- `app.json`: Expo configuration
- `jest.config.js`: Jest test configuration
- `jest.setup.js`: Global test setup and mocks
- `README.md`: Project documentation
- `QUICKSTART.md`: Quick setup guide
- `CONTRIBUTING.md`: Contribution guidelines
- `TESTING.md`: Comprehensive testing documentation

## Configuration

### User Configuration (`src/config/appConfig.ts`)
Key configuration values that can be customized:
- `updateInterval`: Flight data update frequency in milliseconds (default: 30000 = 30 seconds)
- `defaultViewMode`: Initial display mode - 'arrivals' or 'departures'
- `animationsEnabled`: Enable/disable fade-in animations for flight rows
- `soundAlertsEnabled`: Sound alerts for flight changes (not yet implemented)
- `maxFlightsDisplayed`: Maximum number of flights to show (default: 20)
- `autoRefresh`: Automatically refresh flight data

### Data Source Configuration
The `dataSourceConfig` in `appConfig.ts` allows switching between data sources:
- `type`: 'mock' (current), 'websocket', 'pubsub', or 'polling'
- `endpoint`: WebSocket or API endpoint URL
- `apiKey`: API authentication key
- `region`: AWS region for pub/sub services

### Theme Configuration (`src/theme/themes.ts`)
Eight built-in themes available:
- **blueTheme (Default)**: Blue ocean theme with dark background
- **defaultTheme (Purple)**: Classic airport monitor with purple/magenta colors
- **greenTheme**: Forest green theme with dark background
- **redTheme**: Deep red theme with dark background
- **blackTheme**: Monochrome black theme with grayscale accents
- **whiteTheme**: Clean white theme with blue accents for light environments
- **lightTheme**: Light mode with purple accents
- **darkTheme**: Alternative dark mode with purple accents

Each theme includes:
- Primary and secondary colors
- Background and text colors
- Header and row background colors
- Status-specific colors (scheduled, boarding, departed, in-flight, landed, arrived, delayed, cancelled)
- Theme preferences persist across page reloads using cookies (1-year expiry)

## Running the Application

### Development Server
Start the Expo development server:
```bash
npm start
```
This opens the Expo DevTools in your browser with options to run on different platforms.

### Platform-Specific Commands
```bash
# Run on web browser
npm run web

# Run on Android device/emulator
npm run android

# Run on iOS device/simulator (macOS only)
npm run ios
```

### Testing on Physical Devices
1. Install Expo Go app on your iOS or Android device
2. Run `npm start`
3. Scan the QR code displayed in the terminal or browser

## Code Style Guidelines

### TypeScript Conventions
- **Type Safety**: Use strict TypeScript types; avoid `any` when possible
- **Interfaces**: Define interfaces for all data structures (see `Flight.ts`)
- **Enums**: Use enums for fixed sets of values (e.g., `FlightStatus`)
- **Import Organization**: React imports first, then React Native, then local imports
- **File Naming**: Use PascalCase for component files (e.g., `FlightRow.tsx`)

### React Native Patterns
- **Functional Components**: Use functional components with hooks
- **Props Typing**: Always define TypeScript interfaces for component props
- **Styles**: Use `StyleSheet.create()` for performance optimization
- **Platform-Specific Code**: Use `Platform.OS` for platform-specific logic

### Component Structure
Components should follow this pattern:
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ComponentProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles
});
```

### State Management
- **useState**: For local component state
- **useEffect**: For side effects and subscriptions
- **Props**: Pass data down through component props
- **Callbacks**: Use callbacks to communicate from child to parent

## Component Architecture

### FlightMonitorBoard (Main Component)
- Manages flight data state and updates
- Controls column visibility preferences via `ColumnPreferencesService`
- Handles theme application via `ThemePreferencesService`
- Uses FlatList for efficient rendering of large lists
- Implements auto-refresh with configurable intervals
- Passes column configuration to child components

### FlightBoardHeader
- Displays static "FLIGHT MONITOR" title
- Shows column headers based on visible columns from preferences
- Conditionally renders headers (Time, Airline, Flight, From, To, Altitude, Aircraft Type)
- Responsive to theme changes

### FlightRow
- Displays individual flight information
- Conditionally renders columns based on visibility preferences
- Formats time display (HH:MM format)
- Shows status with color coding
- Optional fade-in animation
- Alternating row colors for readability

### ColumnSelector
- Modal component for toggling column visibility
- Checkbox interface for each available column
- Persists selections via `ColumnPreferencesService`
- Real-time updates to header and row displays
- Available columns: Time, Airline, Flight, From, To, Altitude, Aircraft Type

### ThemeSelector
- Dropdown-style theme picker
- Displays all 8 available themes
- Shows checkmark for current selection
- Handles theme switching via `ThemePreferencesService`
- Persists theme choice across sessions
- Responsive design

## Theme System

### Available Themes
The application includes 8 pre-built themes:

1. **Blue Theme** (Default) - Ocean-inspired dark theme
2. **Purple Theme** - Classic airport monitor aesthetic
3. **Green Theme** - Forest-inspired dark theme
4. **Red Theme** - Bold red dark theme
5. **Black Theme** - Monochrome grayscale theme
6. **White Theme** - Clean light theme with blue accents
7. **Light Theme** - Light mode with purple accents
8. **Dark Theme** - Alternative dark mode with purple

### Theme Persistence
Theme preferences are automatically saved using cookies with 1-year expiry via `ThemePreferencesService`. User selections persist across browser sessions and page reloads.

### Using Themes
Themes are passed as props through the component tree:
```tsx
<ComponentName theme={currentTheme} />
```

### Creating Custom Themes
Add a new theme in `src/theme/themes.ts`:
```typescript
export const customTheme: Theme = {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  background: '#YOUR_COLOR',
  text: '#YOUR_COLOR',
  textSecondary: '#YOUR_COLOR',
  headerBackground: '#YOUR_COLOR',
  rowEven: '#YOUR_COLOR',
  rowOdd: '#YOUR_COLOR',
  border: '#YOUR_COLOR',
  statusColors: {
    scheduled: '#YOUR_COLOR',
    boarding: '#YOUR_COLOR',
    departed: '#YOUR_COLOR',
    inFlight: '#YOUR_COLOR',
    landed: '#YOUR_COLOR',
    arrived: '#YOUR_COLOR',
    delayed: '#YOUR_COLOR',
    cancelled: '#YOUR_COLOR',
  },
};
```

Then register it in `src/services/ThemePreferencesService.ts` by adding it to the themes map:
```typescript
private themes: { [key: string]: Theme } = {
  // ... existing themes
  'Custom': customTheme,
};
```

### Applying Theme Colors
Use theme colors in styles dynamically:
```tsx
<View style={[styles.container, { backgroundColor: theme.background }]}>
  <Text style={{ color: theme.text }}>Hello</Text>
</View>
```

### ThemePreferencesService
Located in `src/services/ThemePreferencesService.ts`:
- Manages theme selection and persistence
- Validates theme names against available themes
- Handles cookie serialization with error recovery
- Provides fallback to default (Blue) theme on errors

## Data Flow

### Current Implementation (Mock Data)
The `FlightDataService` class generates mock flight data for development:
- **generateMockFlights(count)**: Creates random flight data
- **updateFlight(flight)**: Simulates status progression and real-time updates
- Mock data includes realistic airlines, airports, times, and status changes

### FlightDataService Details
Located in `src/services/FlightDataService.ts`:
- Contains arrays of airlines (10 major carriers) and airports (20 major airports)
- Generates flights with realistic data (times, gates, aircraft types)
- Simulates status progression: Scheduled → Boarding → Departed → In Flight → Landed → Arrived
- Updates altitude and speed for in-flight aircraft

### Future Integration Plans

#### WebSocket Integration
Real-time updates with minimal latency:
```typescript
const ws = new WebSocket('wss://your-flight-data-endpoint');
ws.onmessage = (event) => {
  const flightData = JSON.parse(event.data);
  updateFlights(flightData);
};
```

#### AWS Pub/Sub (SNS + SQS)
Scalable, cost-effective solution (~$0.36/month for 2M messages):
- Set up SNS topic for flight updates
- Subscribe SQS queues for each monitor
- Poll SQS from the app

#### AWS IoT Core (MQTT)
True real-time push notifications with MQTT protocol

#### REST API Polling
Simple polling approach for basic integrations

#### Integration with plane-tracker-rgb-pi
This UI is designed to integrate with the [plane-tracker-rgb-pi](https://github.com/jromie0924/plane-tracker-rgb-pi) project for real flight data.

## Testing

### Test Suite Overview
The project includes comprehensive unit tests with 123 tests covering services, components, and configuration.

**Test Coverage Summary**:
- **Total Tests**: 123 passing
- **Services**: 100% coverage (58 tests)
  - `FlightDataService`: Mock data generation, status progression (21 tests)
  - `ColumnPreferencesService`: Cookie persistence, validation, toggle logic (24 tests)
  - `ThemePreferencesService`: Theme persistence, error handling (13 tests)
- **Components**: 82-92% coverage (64 tests)
  - `FlightRow`: Rendering, column visibility, data formatting (24 tests)
  - `ColumnSelector`: Modal interaction, column toggle logic (23 tests)
  - `ThemeSelector`: Theme selection, dropdown behavior (17 tests)
- **Configuration**: 100% coverage (21 tests)
  - `appConfig`: Default values, type validation, data source config

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- path/to/test.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should toggle column"
```

### Test Framework
- **Jest**: Testing framework with `jest-expo` preset for React Native
- **@testing-library/react-native**: Component testing utilities
- **Global Mocks**: `js-cookie` and Expo runtime (configured in `jest.setup.js`)

### Writing Tests

**Service Test Example**:
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

**Component Test Example**:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ComponentName />);
    expect(getByText('Expected Text')).toBeTruthy();
  });

  it('should handle user interaction', () => {
    const { getByText } = render(<ComponentName />);
    fireEvent.press(getByText('Button'));
    expect(mockCallback).toHaveBeenCalled();
  });
});
```

### Test Structure
```
src/
├── components/__tests__/
│   ├── ColumnSelector.test.tsx
│   ├── FlightRow.test.tsx
│   └── ThemeSelector.test.tsx
├── config/__tests__/
│   └── appConfig.test.ts
└── services/__tests__/
    ├── ColumnPreferencesService.test.ts
    ├── FlightDataService.test.ts
    └── ThemePreferencesService.test.ts
```

### Best Practices
1. **Arrange-Act-Assert**: Structure tests clearly
2. **One Assertion Per Test**: Keep tests focused
3. **Descriptive Names**: Use clear, descriptive test names
4. **Clean Up**: Clear mocks between tests with `beforeEach`
5. **Test Behavior**: Test what the code does, not how it does it

### Continuous Integration
Tests run automatically on pull requests and commits to main branch. All tests must pass before merging.

### Additional Testing Documentation
For detailed testing information, troubleshooting, and future improvements, see `TESTING.md` in the project root.

### Future Testing Improvements
- Add tests for FlightBoardHeader component
- Add integration tests for FlightMonitorBoard
- Add E2E tests with Detox for mobile platforms
- Add performance benchmarks
- Add visual regression tests

## Performance Optimization

### Current Optimizations
- **FlatList Virtualization**: Only renders visible flight rows
- **Native Animations**: Uses `useNativeDriver: true` for 60fps animations
- **StyleSheet.create()**: Optimized style object creation
- **Key Props**: Unique keys for list items to prevent unnecessary re-renders

### FlatList Configuration
```tsx
<FlatList
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
  initialNumToRender={10}
/>
```

### Additional Optimization Tips
- Use `React.memo` for expensive components that don't change often
- Avoid inline functions in render when possible
- Use `useMemo` and `useCallback` for expensive computations
- Keep component re-renders minimal

## Common Development Tasks

### Adding a New Component
1. Create a new file in `src/components/` with PascalCase naming
2. Define TypeScript interface for props
3. Implement functional component with proper typing
4. Create styles using `StyleSheet.create()`
5. Export the component
6. Import and use in parent component

Example:
```tsx
// src/components/NewComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../theme/themes';

interface NewComponentProps {
  theme: Theme;
  data: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ theme, data }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
```

### Modifying Themes
1. Open `src/theme/themes.ts`
2. Locate the theme you want to modify (blueTheme, defaultTheme, greenTheme, redTheme, blackTheme, whiteTheme, lightTheme, or darkTheme)
3. Update color values (use hex color codes)
4. Save and reload the app (changes are hot-reloaded)
5. If modifying the default theme, update `ThemePreferencesService.ts` to change the fallback theme name

### Adding Flight Data Columns
1. Update `Flight` interface in `src/types/Flight.ts` with new field
2. Modify `FlightRow.tsx` to display the new field:
   ```tsx
   <View style={styles.columnNewField}>
     <Text style={[styles.text, { color: theme.text }]}>
       {flight.newField}
     </Text>
   </View>
   ```
3. Update `FlightBoardHeader.tsx` to add column header
4. Modify `FlightDataService.ts` to generate the new field in mock data

### Modifying Update Intervals
1. Open `src/config/appConfig.ts`
2. Change `updateInterval` value (in milliseconds)
3. Or pass `updateInterval` prop to `FlightMonitorBoard` in `App.tsx`

### Changing Mock Data
1. Open `src/services/FlightDataService.ts`
2. Modify the `airlines` or `airports` arrays
3. Adjust the `generateMockFlights()` logic
4. Customize the `updateFlight()` method for different status progressions

### Integrating Real Data
1. Update `dataSourceConfig` in `src/config/appConfig.ts`:
   ```typescript
   export const dataSourceConfig: DataSourceConfig = {
     type: 'websocket', // or 'polling' or 'pubsub'
     endpoint: 'wss://your-websocket-endpoint',
     apiKey: 'your-api-key',
   };
   ```
2. Create a new service in `src/services/` for your data source
3. Implement data fetching and parsing logic
4. Update `FlightMonitorBoard.tsx` to use the new service

## Dependencies and Security

### External Data Sources
- **Mock Data**: Currently uses local mock data generator
- **Future Integration**: Designed to integrate with flight tracking APIs or plane-tracker-rgb-pi backend

### Security Considerations
- Store API keys in environment variables, never commit them
- Use HTTPS/WSS for all external communications
- Validate and sanitize all external data
- Keep dependencies up to date

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update to latest compatible versions
npm update

# Update to latest versions (be careful)
npm install <package>@latest
```

## Troubleshooting

### Common Issues

1. **Metro Bundler Errors**
   - Clear cache: `npm start -- --reset-cache`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

2. **TypeScript Errors**
   - Check `tsconfig.json` configuration
   - Ensure all types are properly defined
   - Run TypeScript compiler: `npx tsc --noEmit`

3. **Expo Go Connection Issues**
   - Ensure device and computer are on the same network
   - Try using tunnel mode: `npm start -- --tunnel`
   - Check firewall settings

4. **Styling Issues**
   - Verify theme is passed correctly through props
   - Check StyleSheet syntax
   - Use React Native Debugger for style inspection

5. **Performance Issues**
   - Enable FlatList optimizations
   - Reduce `maxFlightsDisplayed` in config
   - Disable animations in `appConfig.ts`
   - Profile with React DevTools

### Development Tips
- Use React Native Debugger for debugging
- Enable Fast Refresh for rapid development
- Use TypeScript strict mode for better type checking
- Test on both iOS and Android regularly
- Keep the Expo SDK updated

## Platform-Specific Considerations

### iOS
- Requires macOS for iOS simulator
- TestFlight for beta testing
- App Store submission requires Apple Developer account

### Android
- Android Studio for emulator
- APK builds for testing
- Google Play Store for distribution

### Web
- Most features work on web
- Mobile-optimized but works on desktop browsers
- Touch events translated to mouse events

## Future Enhancements

Planned features and improvements:
- [ ] Sound alerts for flight status changes
- [ ] Push notifications for specific flights
- [ ] Flight search and filtering capabilities
- [ ] Historical flight data view
- [ ] Airline logo images in flight rows
- [ ] Airport information overlay/details
- [ ] Multi-airport support
- [ ] Export/share flight information
- [ ] Settings page for runtime configuration
- [ ] Landscape mode optimization
- [ ] Real-time data integration with plane-tracker-rgb-pi
- [ ] User preferences persistence (AsyncStorage)
- [ ] Accessibility improvements (screen reader support)

## Related Projects

- [plane-tracker-rgb-pi](https://github.com/jromie0924/plane-tracker-rgb-pi) - Raspberry Pi RGB LED matrix flight tracker that can serve as a data source for this UI

## Additional Resources

### Documentation
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

### Community
- GitHub Issues for bug reports and feature requests
- Discussions for questions and ideas

---

**Repository**: github.com/jromie0924/plane-tracker-monitor-ui  
**Owner**: @jromie0924  
**Status**: Active Development  
**Version**: 1.0.0
