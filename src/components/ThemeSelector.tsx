import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
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
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTheme = (themeName: string) => {
    onSelectTheme(themeName);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.headerBackground }]}>
      <Text style={[styles.label, { color: theme.text }]}>Theme:</Text>
      
      <TouchableOpacity
        style={[
          styles.dropdown,
          { 
            backgroundColor: theme.background,
            borderColor: theme.border,
          }
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.dropdownText, { color: theme.text }]}>
          {currentTheme}
        </Text>
        <Text style={[styles.arrow, { color: theme.textSecondary }]}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.dropdownMenu, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <ScrollView>
              {themes.map(({ name }) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.menuItem,
                    { 
                      backgroundColor: currentTheme === name ? theme.primary : 'transparent',
                      borderBottomColor: theme.border,
                    }
                  ]}
                  onPress={() => handleSelectTheme(name)}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      { color: currentTheme === name ? theme.text : theme.textSecondary }
                    ]}
                  >
                    {name}
                  </Text>
                  {currentTheme === name && (
                    <Text style={[styles.checkmark, { color: theme.text }]}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 120,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  arrow: {
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  dropdownMenu: {
    borderRadius: 6,
    borderWidth: 1,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
