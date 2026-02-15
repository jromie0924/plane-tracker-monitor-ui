import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../theme/themes';
import { ColumnConfig } from '../types/ColumnConfig';
import { ColumnSelector } from './ColumnSelector';

interface FlightBoardHeaderProps {
  theme: Theme;
  viewMode: 'arrivals' | 'departures';
  onToggleView: () => void;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

export const FlightBoardHeader: React.FC<FlightBoardHeaderProps> = ({
  theme,
  viewMode,
  onToggleView,
  columns,
  onColumnsChange,
}) => {
  const isColumnVisible = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    return column?.visible ?? false;
  };

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
        <View style={styles.rightControls}>
          <ColumnSelector
            theme={theme}
            columns={columns}
            onColumnsChange={onColumnsChange}
          />
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
      </View>
      
      <View style={[styles.headerRow, { borderBottomColor: theme.border }]}>
        {isColumnVisible('time') && (
          <View style={styles.columnTime}>
            <Text style={[styles.headerText, { color: theme.text }]}>Time</Text>
          </View>
        )}
        {isColumnVisible('airline') && (
          <View style={styles.columnAirline}>
            <Text style={[styles.headerText, { color: theme.text }]}>Airline</Text>
          </View>
        )}
        {isColumnVisible('flight') && (
          <View style={styles.columnFlight}>
            <Text style={[styles.headerText, { color: theme.text }]}>Flight</Text>
          </View>
        )}
        {(isColumnVisible('from') || isColumnVisible('to')) && (
          <View style={styles.columnLocation}>
            <Text style={[styles.headerText, { color: theme.text }]}>
              {viewMode === 'arrivals' ? 'From' : 'To'}
            </Text>
          </View>
        )}
        {isColumnVisible('altitude') && (
          <View style={styles.columnAltitude}>
            <Text style={[styles.headerText, { color: theme.text }]}>Altitude</Text>
          </View>
        )}
        {isColumnVisible('airplaneType') && (
          <View style={styles.columnAircraft}>
            <Text style={[styles.headerText, { color: theme.text }]}>Aircraft</Text>
          </View>
        )}
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
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  columnAltitude: {
    flex: 1.2,
    paddingHorizontal: 4,
  },
  columnAircraft: {
    flex: 1.5,
    paddingHorizontal: 4,
  },
});
