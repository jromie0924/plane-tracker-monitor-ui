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
  - `types/`: TypeScript interfaces and enums
    - `Flight.ts`: Flight data interface, FlightStatus enum, ViewMode type
  - `services/`: Business logic and data services
    - `FlightDataService.ts`: Mock flight data generator and update logic
  - `theme/`: Theme definitions
    - `themes.ts`: Purple (default), Light, and Dark theme definitions
  - `config/`: Application configuration
    - `appConfig.ts`: Update intervals, view modes, animation settings
- `assets/`: Images, icons, and static resources
- `App.tsx`: Main application entry point
- `index.ts`: App registration point

### Important Files
- `package.json`: Dependencies and npm scripts
- `tsconfig.json`: TypeScript configuration (extends Expo base config)
- `app.json`: Expo configuration
- `README.md`: Project documentation
- `QUICKSTART.md`: Quick setup guide
- `CONTRIBUTING.md`: Contribution guidelines

## Configuration

### User Configuration (`src/config/appConfig.ts`)
Key configuration values that can be customized:
- `updateInterval`: Flight data update frequency in milliseconds (default: 30000 = 30 seconds)
- `defaultViewMode`: Initial display mode - 'arrivals' or 'deparths'
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
Three built-in themes:
- **defaultTheme (Purple)**: Classic airport monitor with purple/magenta colors
- **lightTheme**: Light mode with purple accents
- **darkTheme**: Dark mode with purple accents

Each theme includes:
- Primary and secondary colors
- Background and text colors
- Header and row background colors
- Status-specific colors (scheduled, boarding, departed, in-flight, landed, arrived, delayed, cancelled)

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
- Controls view mode (arrivals/departures)
- Handles theme application
- Uses FlatList for efficient rendering of large lists
- Implements auto-refresh with configurable intervals

### FlightBoardHeader
- Displays board title based on view mode
- Shows column headers (Time, Airline, Flight, Origin/Dest, Status, Gate)
- Responsive to theme changes

### FlightRow
- Displays individual flight information
- Formats time display (HH:MM format)
- Shows status with color coding
- Optional fade-in animation
- Alternating row colors for readability

### ThemeSelector
- Dropdown-style theme picker
- Displays available themes
- Handles theme switching
- Responsive design

## Theme System

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

Then add it to the `availableThemes` array in `App.tsx`:
```tsx
const availableThemes = [
  { name: 'Custom', theme: customTheme },
  // ... other themes
];
```

### Applying Theme Colors
Use theme colors in styles dynamically:
```tsx
<View style={[styles.container, { backgroundColor: theme.background }]}>
  <Text style={{ color: theme.text }}>Hello</Text>
</View>
```

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

### Current Testing Approach
- **Mock Data**: All testing currently uses mock data from `FlightDataService`
- **Manual Testing**: Run the app and verify UI behavior manually
- **Platform Testing**: Test on web, iOS, and Android platforms

### Future Testing Plans
- Unit tests for services and utilities
- Component tests for React Native components
- Integration tests for data flow
- E2E tests for critical user flows

### Testing Framework Recommendations
- **Jest**: Unit and component testing
- **React Native Testing Library**: Component testing
- **Detox**: E2E testing on mobile devices

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
2. Locate the theme you want to modify (defaultTheme, lightTheme, or darkTheme)
3. Update color values (use hex color codes)
4. Save and reload the app (changes are hot-reloaded)

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
