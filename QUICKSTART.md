# Quick Start Guide

## Running the App

### Web (Fastest for development)
```bash
npm run web
```
Opens at http://localhost:8081

### Android
```bash
npm run android
```
Requires Android Studio or physical device with Expo Go app.

### iOS  
```bash
npm run ios
```
Requires macOS with Xcode.

## Key Features

### 1. Theme Switching
Tap any theme button at the top:
- **Purple**: Classic airport monitor style
- **Light**: Light background with purple accents
- **Dark**: Dark background with vibrant colors

### 2. Arrivals/Departures Toggle
Tap the "✈ ARRIVALS" or "✈ DEPARTURES" title to switch views.
- **Arrivals**: Shows "From" column with origin airports
- **Departures**: Shows "To" column with destination airports

### 3. Real-Time Updates
Flights automatically update every 30 seconds with:
- Status changes (Scheduled → Boarding → Departed → In Flight → Landed → Arrived)
- Altitude and speed for in-flight aircraft
- Estimated time adjustments

## Customization

### Change Update Interval
Edit `src/config/appConfig.ts`:
```typescript
export const defaultConfig = {
  updateInterval: 30000, // Change to desired milliseconds
  // ...
};
```

### Add a Custom Theme
Edit `src/theme/themes.ts`:
```typescript
export const myCustomTheme: Theme = {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  background: '#YOUR_COLOR',
  text: '#YOUR_COLOR',
  // ... see existing themes for full structure
};
```

Then add to App.tsx:
```typescript
const availableThemes = [
  { name: 'Purple', theme: defaultTheme },
  { name: 'Light', theme: lightTheme },
  { name: 'Dark', theme: darkTheme },
  { name: 'Custom', theme: myCustomTheme }, // Add here
];
```

### Disable Animations
Edit `src/config/appConfig.ts`:
```typescript
export const defaultConfig = {
  animationsEnabled: false, // Change to false
  // ...
};
```

## Integrating Real Flight Data

### Option 1: WebSocket
Edit `src/services/FlightDataService.ts` or create a new service:
```typescript
const ws = new WebSocket('wss://your-flight-api.com/ws');

ws.onmessage = (event) => {
  const flights = JSON.parse(event.data);
  setFlights(flights);
};
```

### Option 2: REST API Polling
Replace the mock data generation in `FlightMonitorBoard.tsx`:
```typescript
useEffect(() => {
  const fetchFlights = async () => {
    const response = await fetch('https://your-api.com/flights');
    const data = await response.json();
    setFlights(data);
  };
  
  fetchFlights();
  const interval = setInterval(fetchFlights, updateInterval);
  return () => clearInterval(interval);
}, [updateInterval]);
```

### Option 3: AWS IoT Core (MQTT)
Install AWS IoT SDK and configure:
```bash
npm install aws-iot-device-sdk-v2
```

Then set up MQTT subscription in your service.

## Data Format

Your API should return an array of flights matching this schema:
```typescript
{
  id: "unique-id",
  flightNumber: "AA 1234",
  airline: "American Airlines",
  airlineCode: "AA",
  origin: "JFK",
  destination: "LAX",
  scheduledTime: "2026-02-14T10:30:00Z",
  estimatedTime: "2026-02-14T10:35:00Z",
  status: "Scheduled" | "Boarding" | "Departed" | "In Flight" | "Landed" | "Arrived" | "Delayed" | "Cancelled",
  altitude: 35000,  // optional, in feet
  speed: 450,       // optional, in knots
  aircraft: "B737", // optional
  gate: "A12"       // optional
}
```

## Troubleshooting

### Metro bundler won't start
```bash
# Clear cache and restart
npx expo start -c
```

### TypeScript errors
```bash
# Rebuild TypeScript
npx tsc --noEmit
```

### Dependencies issues
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Development Tips

1. **Hot Reloading**: Changes auto-reload in development
2. **Console Logs**: Check terminal for Metro bundler logs
3. **React DevTools**: Install browser extension for debugging
4. **Performance**: Use React DevTools Profiler to identify bottlenecks
5. **Testing**: Test on multiple screen sizes using browser DevTools

## Project Structure at a Glance

```
src/
├── components/     # React components
├── types/         # TypeScript interfaces
├── services/      # Data services
├── theme/         # Color themes
└── config/        # App configuration

App.tsx            # Main entry point
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [plane-tracker-rgb-pi](https://github.com/jromie0924/plane-tracker-rgb-pi) - Related project
