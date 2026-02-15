import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Flight, FlightStatus } from '../types/Flight';
import { Theme } from '../theme/themes';
import { ColumnConfig } from '../types/ColumnConfig';

interface FlightRowProps {
  flight: Flight;
  theme: Theme;
  viewMode: 'arrivals' | 'departures';
  isEven: boolean;
  fadeAnim?: Animated.Value;
  columns: ColumnConfig[];
}

export const FlightRow: React.FC<FlightRowProps> = ({ 
  flight, 
  theme, 
  viewMode, 
  isEven,
  fadeAnim,
  columns,
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

  const isColumnVisible = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    return column?.visible ?? false;
  };
  
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
      {isColumnVisible('time') && (
        <View style={styles.columnTime}>
          <Text style={[styles.text, styles.textBold, { color: theme.text }]}>
            {formatTime(flight.scheduledTime)}
          </Text>
        </View>
      )}

      {/* Airline Logo/Code Column */}
      {isColumnVisible('airline') && (
        <View style={styles.columnAirline}>
          <View style={[styles.airlineBadge, { borderColor: theme.primary }]}>
            <Text style={[styles.airlineText, { color: theme.text }]}>
              {flight.airlineCode}
            </Text>
          </View>
        </View>
      )}

      {/* Flight Number Column */}
      {isColumnVisible('flight') && (
        <View style={styles.columnFlight}>
          <Text style={[styles.text, styles.textBold, { color: theme.text }]}>
            {flight.flightNumber}
          </Text>
        </View>
      )}

      {/* From Column */}
      {isColumnVisible('from') && (
        <View style={styles.columnLocation}>
          <Text style={[styles.text, { color: theme.text }]}>
            {flight.origin}
          </Text>
        </View>
      )}

      {/* To Column */}
      {isColumnVisible('to') && (
        <View style={styles.columnLocation}>
          <Text style={[styles.text, { color: theme.text }]}>
            {flight.destination}
          </Text>
        </View>
      )}

      {/* Altitude Column */}
      {isColumnVisible('altitude') && (
        <View style={styles.columnAltitude}>
          {flight.altitude && (
            <Text style={[styles.text, { color: theme.textSecondary }]}>
              {Math.round(flight.altitude).toLocaleString()}ft
            </Text>
          )}
        </View>
      )}

      {/* Airplane Type Column */}
      {isColumnVisible('airplaneType') && (
        <View style={styles.columnAircraft}>
          {flight.aircraft && (
            <Text style={[styles.text, { color: theme.text }]}>
              {flight.aircraft}
            </Text>
          )}
        </View>
      )}
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
  columnAltitude: {
    flex: 1.2,
    paddingHorizontal: 4,
  },
  columnAircraft: {
    flex: 1.5,
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
