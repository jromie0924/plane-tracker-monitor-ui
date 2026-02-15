import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../theme/themes';

interface FlightBoardHeaderProps {
  theme: Theme;
  viewMode: 'arrivals' | 'departures';
  onToggleView: () => void;
}

export const FlightBoardHeader: React.FC<FlightBoardHeaderProps> = ({
  theme,
  viewMode,
  onToggleView,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.headerBackground }]}>
      <View style={styles.titleContainer}>
        <TouchableOpacity 
          onPress={onToggleView}
          style={styles.titleButton}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            {viewMode === 'arrivals' ? '✈ ARRIVALS' : '✈ DEPARTURES'}
          </Text>
          <Text style={[styles.toggleHint, { color: theme.textSecondary }]}>
            (tap to switch)
          </Text>
        </TouchableOpacity>
        <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
          {new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </Text>
      </View>
      
      <View style={[styles.headerRow, { borderBottomColor: theme.border }]}>
        <View style={styles.columnTime}>
          <Text style={[styles.headerText, { color: theme.text }]}>Time</Text>
        </View>
        <View style={styles.columnAirline}>
          <Text style={[styles.headerText, { color: theme.text }]}>Airline</Text>
        </View>
        <View style={styles.columnFlight}>
          <Text style={[styles.headerText, { color: theme.text }]}>Flight</Text>
        </View>
        <View style={styles.columnLocation}>
          <Text style={[styles.headerText, { color: theme.text }]}>
            {viewMode === 'arrivals' ? 'From' : 'To'}
          </Text>
        </View>
        <View style={styles.columnStatus}>
          <Text style={[styles.headerText, { color: theme.text }]}>Status</Text>
        </View>
        <View style={styles.columnEstimated}>
          <Text style={[styles.headerText, { color: theme.text }]}>Est.</Text>
        </View>
        <View style={styles.columnExtra}>
          <Text style={[styles.headerText, { color: theme.text }]}>Info</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleButton: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  toggleHint: {
    fontSize: 12,
    marginTop: 4,
  },
  timestamp: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
});
