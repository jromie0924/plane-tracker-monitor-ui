import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Flight, ViewMode } from '../types/Flight';
import { Theme } from '../theme/themes';
import { FlightRow } from './FlightRow';
import { FlightBoardHeader } from './FlightBoardHeader';
import { flightDataService } from '../services/FlightDataService';
import { defaultConfig } from '../config/appConfig';

interface FlightMonitorBoardProps {
  theme: Theme;
  initialViewMode?: ViewMode;
  updateInterval?: number;
  animationsEnabled?: boolean;
}

export const FlightMonitorBoard: React.FC<FlightMonitorBoardProps> = ({
  theme,
  initialViewMode = 'arrivals',
  updateInterval = defaultConfig.updateInterval,
  animationsEnabled = defaultConfig.animationsEnabled,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const fadeAnims = useRef<Map<string, Animated.Value>>(new Map());

  // Initialize flight data
  useEffect(() => {
    const initialFlights = flightDataService.generateMockFlights(20);
    setFlights(initialFlights);
    
    // Initialize fade animations for each flight
    initialFlights.forEach(flight => {
      if (!fadeAnims.current.has(flight.id)) {
        fadeAnims.current.set(flight.id, new Animated.Value(0));
      }
    });

    // Fade in all flights
    if (animationsEnabled) {
      initialFlights.forEach((flight, index) => {
        const fadeAnim = fadeAnims.current.get(flight.id);
        if (fadeAnim) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            delay: index * 50,
            useNativeDriver: true,
          }).start();
        }
      });
    } else {
      initialFlights.forEach(flight => {
        fadeAnims.current.get(flight.id)?.setValue(1);
      });
    }
  }, [animationsEnabled]);

  // Simulate real-time updates
  useEffect(() => {
    if (!defaultConfig.autoRefresh) return;

    const interval = setInterval(() => {
      setFlights(prevFlights => 
        prevFlights.map(flight => flightDataService.updateFlight(flight))
      );
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'arrivals' ? 'departures' : 'arrivals');
  };

  const renderFlightRow = ({ item, index }: { item: Flight; index: number }) => {
    const fadeAnim = animationsEnabled ? fadeAnims.current.get(item.id) : undefined;
    
    return (
      <FlightRow
        flight={item}
        theme={theme}
        viewMode={viewMode}
        isEven={index % 2 === 0}
        fadeAnim={fadeAnim}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlightBoardHeader
        theme={theme}
        viewMode={viewMode}
        onToggleView={toggleViewMode}
      />
      
      <FlatList
        data={flights}
        renderItem={renderFlightRow}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
