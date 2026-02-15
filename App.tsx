import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import { FlightMonitorBoard } from './src/components/FlightMonitorBoard';
import { ThemeSelector } from './src/components/ThemeSelector';
import { defaultTheme, lightTheme, darkTheme, blueTheme, greenTheme, redTheme, blackTheme, whiteTheme, Theme } from './src/theme/themes';
import { themePreferencesService } from './src/services/ThemePreferencesService';

export default function App() {
  const availableThemes = [
    { name: 'Blue', theme: blueTheme },
    { name: 'Purple', theme: defaultTheme },
    { name: 'Green', theme: greenTheme },
    { name: 'Red', theme: redTheme },
    { name: 'Black', theme: blackTheme },
    { name: 'White', theme: whiteTheme },
    { name: 'Light', theme: lightTheme },
    { name: 'Dark', theme: darkTheme },
  ];

  const [currentThemeName, setCurrentThemeName] = useState(() => 
    themePreferencesService.loadTheme()
  );
  
  const currentTheme = availableThemes.find(t => t.name === currentThemeName)?.theme || blueTheme;

  // Save theme preference to cookie whenever it changes
  useEffect(() => {
    themePreferencesService.saveTheme(currentThemeName);
  }, [currentThemeName]);

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
