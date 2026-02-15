import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import { FlightMonitorBoard } from './src/components/FlightMonitorBoard';
import { ThemeSelector } from './src/components/ThemeSelector';
import { defaultTheme, lightTheme, darkTheme, Theme } from './src/theme/themes';

export default function App() {
  const availableThemes = [
    { name: 'Purple', theme: defaultTheme },
    { name: 'Light', theme: lightTheme },
    { name: 'Dark', theme: darkTheme },
  ];

  const [currentThemeName, setCurrentThemeName] = useState('Purple');
  const currentTheme = availableThemes.find(t => t.name === currentThemeName)?.theme || defaultTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar style="light" />
      
      <ThemeSelector
        themes={availableThemes}
        currentTheme={currentThemeName}
        onSelectTheme={setCurrentThemeName}
        theme={currentTheme}
      />
      
      <FlightMonitorBoard
        theme={currentTheme}
        initialViewMode="arrivals"
        updateInterval={30000}
        animationsEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
