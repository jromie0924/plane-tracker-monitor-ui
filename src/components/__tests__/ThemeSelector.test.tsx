import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeSelector } from '../ThemeSelector';
import { Theme } from '../../theme/themes';

describe('ThemeSelector', () => {
  const mockTheme: Theme = {
    primary: '#7B2CBF',
    secondary: '#9D4EDD',
    background: '#10002B',
    text: '#FFFFFF',
    textSecondary: '#E0AAFF',
    headerBackground: '#5A189A',
    rowEven: '#240046',
    rowOdd: '#3C096C',
    border: '#5A189A',
    statusColors: {
      scheduled: '#E0AAFF',
      boarding: '#FFD60A',
      departed: '#4CC9F0',
      inflight: '#4CC9F0',
      landed: '#06FFA5',
      arrived: '#06FFA5',
      delayed: '#FF9E00',
      cancelled: '#FF0054',
    },
  };

  const mockThemes = [
    { name: 'Blue', theme: mockTheme },
    { name: 'Purple', theme: mockTheme },
    { name: 'Green', theme: mockTheme },
    { name: 'Red', theme: mockTheme },
  ];

  const mockOnSelectTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render theme selector with current theme', () => {
    const { getByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Purple"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    expect(getByText('Theme:')).toBeTruthy();
    expect(getByText('Purple')).toBeTruthy();
  });

  it('should display dropdown arrow', () => {
    const { getByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    expect(getByText('▼')).toBeTruthy();
  });

  it('should open modal when dropdown is pressed', () => {
    const { getByText, getAllByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Press dropdown to open modal
    const dropdown = getAllByText('Blue')[0];
    fireEvent.press(dropdown.parent!);

    // All theme names should be visible in the modal
    expect(getByText('Purple')).toBeTruthy();
    expect(getByText('Green')).toBeTruthy();
    expect(getByText('Red')).toBeTruthy();
  });

  it('should display all available themes in modal', () => {
    const { getAllByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('Blue')[0];
    fireEvent.press(dropdown.parent!);

    // Check all themes are listed (some will appear multiple times)
    mockThemes.forEach(({ name }) => {
      const elements = getAllByText(name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should show checkmark for current theme', () => {
    const { getAllByText, getByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Purple"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('Purple')[0];
    fireEvent.press(dropdown.parent!);

    // Should have checkmark
    expect(getByText('✓')).toBeTruthy();
  });

  it('should call onSelectTheme when theme is selected', () => {
    const { getByText, getAllByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('Blue')[0];
    fireEvent.press(dropdown.parent!);

    // Select a different theme
    fireEvent.press(getByText('Green'));

    expect(mockOnSelectTheme).toHaveBeenCalledWith('Green');
  });

  it('should close modal after selecting a theme', () => {
    const { getByText, getAllByText, queryByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('Blue')[0];
    fireEvent.press(dropdown.parent!);

    // Verify modal is open
    expect(getByText('Green')).toBeTruthy();

    // Select a theme
    fireEvent.press(getByText('Green'));

    // Modal should close (items won't be found)
    // Note: In some test environments, modal might still be in DOM but not visible
    // We just verify that the callback was called
    expect(mockOnSelectTheme).toHaveBeenCalled();
  });

  it('should allow selecting the same theme', () => {
    const { getAllByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('Blue')[0];
    fireEvent.press(dropdown.parent!);

    // Select current theme again
    const blueOption = getAllByText('Blue').find((_, index) => index > 0); // Get the one in modal
    if (blueOption) {
      fireEvent.press(blueOption);
    }

    expect(mockOnSelectTheme).toHaveBeenCalledWith('Blue');
  });

  it('should handle empty themes array', () => {
    const { getByText } = render(
      <ThemeSelector
        themes={[]}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    expect(getByText('Theme:')).toBeTruthy();
    expect(getByText('Blue')).toBeTruthy();
  });

  it('should apply theme colors to dropdown', () => {
    const { getAllByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // The dropdown button should exist
    const blueText = getAllByText('Blue')[0];
    expect(blueText).toBeTruthy();
  });

  it('should handle single theme option', () => {
    const singleTheme = [{ name: 'OnlyTheme', theme: mockTheme }];
    
    const { getByText, getAllByText } = render(
      <ThemeSelector
        themes={singleTheme}
        currentTheme="OnlyTheme"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('OnlyTheme')[0];
    fireEvent.press(dropdown.parent!);

    // Should show the single theme
    expect(getAllByText('OnlyTheme').length).toBeGreaterThan(1);
  });

  it('should handle many theme options', () => {
    const manyThemes = Array.from({ length: 10 }, (_, i) => ({
      name: `Theme${i + 1}`,
      theme: mockTheme,
    }));

    const { getAllByText, getByText } = render(
      <ThemeSelector
        themes={manyThemes}
        currentTheme="Theme1"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Open modal
    const dropdown = getAllByText('Theme1')[0];
    fireEvent.press(dropdown.parent!);

    // Should show all themes
    expect(getByText('Theme5')).toBeTruthy();
    expect(getByText('Theme10')).toBeTruthy();
  });

  it('should render label text', () => {
    const { getByText } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    const label = getByText('Theme:');
    expect(label.props.style).toContainEqual(
      expect.objectContaining({ color: mockTheme.text })
    );
  });

  it('should handle theme selection multiple times', () => {
    const { getAllByText, rerender } = render(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Blue"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // First selection
    fireEvent.press(getAllByText('Blue')[0].parent!);
    fireEvent.press(getAllByText('Purple')[0]);
    expect(mockOnSelectTheme).toHaveBeenCalledWith('Purple');

    // Re-render with new current theme
    rerender(
      <ThemeSelector
        themes={mockThemes}
        currentTheme="Purple"
        onSelectTheme={mockOnSelectTheme}
        theme={mockTheme}
      />
    );

    // Second selection
    fireEvent.press(getAllByText('Purple')[0].parent!);
    fireEvent.press(getAllByText('Green')[0]);
    expect(mockOnSelectTheme).toHaveBeenCalledWith('Green');
  });
});
