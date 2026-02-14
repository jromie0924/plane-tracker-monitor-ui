import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Flight, FlightStatus } from '../types/Flight';
import { Theme } from '../theme/themes';

interface FlightRowProps {
  flight: Flight;
  theme: Theme;
  viewMode: 'arrivals' | 'departures';
  isEven: boolean;
  fadeAnim?: Animated.Value;
}

export const FlightRow: React.FC<FlightRowProps> = ({ 
  flight, 
  theme, 
  viewMode, 
  isEven,
  fadeAnim 
}) => {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusColor = (status: FlightStatus): string => {
    const statusKey = status.toLowerCase().replace(' ', '') as keyof typeof theme.statusColors;
    return theme.statusColors[statusKey] || theme.statusColors.scheduled;
  };

  const location = viewMode === 'arrivals' ? flight.origin : flight.destination;
  
  const rowStyle = [
    styles.row,
    { 
      backgroundColor: isEven ? theme.rowEven : theme.rowOdd,
      borderBottomColor: theme.border,
    }
  ];

  const content = (
    <View style={rowStyle}>
      {/* Time Column */}
      <View style={styles.columnTime}>
        <Text style={[styles.text, styles.textBold, { color: theme.text }]}>
          {formatTime(flight.scheduledTime)}
        </Text>
      </View>

      {/* Airline Logo/Code Column */}
      <View style={styles.columnAirline}>
        <View style={[styles.airlineBadge, { borderColor: theme.primary }]}>
          <Text style={[styles.airlineText, { color: theme.text }]}>
            {flight.airlineCode}
          </Text>
        </View>
      </View>

      {/* Flight Number Column */}
      <View style={styles.columnFlight}>
        <Text style={[styles.text, styles.textBold, { color: theme.text }]}>
          {flight.flightNumber}
        </Text>
      </View>

      {/* Location Column */}
      <View style={styles.columnLocation}>
        <Text style={[styles.text, { color: theme.text }]}>
          {location}
        </Text>
      </View>

      {/* Status Column */}
      <View style={styles.columnStatus}>
        <Text style={[styles.text, { color: getStatusColor(flight.status) }]}>
          {flight.status}
        </Text>
      </View>

      {/* Estimated Time Column */}
      <View style={styles.columnEstimated}>
        <Text style={[styles.text, { color: theme.textSecondary }]}>
          {formatTime(flight.estimatedTime)}
        </Text>
      </View>

      {/* Additional Info (Altitude/Speed) - Always render to maintain alignment */}
      <View style={styles.columnExtra}>
        {flight.altitude && (
          <Text style={[styles.textSmall, { color: theme.textSecondary }]}>
            {Math.round(flight.altitude).toLocaleString()}ft
          </Text>
        )}
        {flight.speed && (
          <Text style={[styles.textSmall, { color: theme.textSecondary }]}>
            {Math.round(flight.speed)}kts
          </Text>
        )}
      </View>
    </View>
  );

  // Apply fade animation if provided
  if (fadeAnim) {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        {content}
      </Animated.View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    alignItems: 'center',
    minHeight: 50,
  },
  columnTime: {
    flex: 1.2,
    paddingHorizontal: 4,
  },
  columnAirline: {
    flex: 1,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  columnFlight: {
    flex: 1.5,
    paddingHorizontal: 4,
  },
  columnLocation: {
    flex: 2,
    paddingHorizontal: 4,
  },
  columnStatus: {
    flex: 1.8,
    paddingHorizontal: 4,
  },
  columnEstimated: {
    flex: 1.2,
    paddingHorizontal: 4,
  },
  columnExtra: {
    flex: 1.2,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textSmall: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  airlineBadge: {
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  airlineText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
