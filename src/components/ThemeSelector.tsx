import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '../theme/themes';

interface ThemeSelectorProps {
  themes: { name: string; theme: Theme }[];
  currentTheme: string;
  onSelectTheme: (themeName: string) => void;
  theme: Theme;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  currentTheme,
  onSelectTheme,
  theme,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.headerBackground }]}>
      <Text style={[styles.label, { color: theme.text }]}>Theme:</Text>
      {themes.map(({ name }) => (
        <TouchableOpacity
          key={name}
          onPress={() => onSelectTheme(name)}
          style={[
            styles.button,
            {
              backgroundColor: currentTheme === name ? theme.primary : 'transparent',
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: currentTheme === name ? theme.text : theme.textSecondary },
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
