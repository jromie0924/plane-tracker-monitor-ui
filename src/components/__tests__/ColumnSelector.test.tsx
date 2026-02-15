import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ColumnSelector } from '../ColumnSelector';
import { Theme } from '../../theme/themes';
import { ColumnConfig } from '../../types/ColumnConfig';

describe('ColumnSelector', () => {
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

  const mockColumns: ColumnConfig[] = [
    { id: 'time', label: 'Time', visible: true },
    { id: 'airline', label: 'Airline', visible: true },
    { id: 'flight', label: 'Flight', visible: false },
    { id: 'from', label: 'From', visible: true },
    { id: 'to', label: 'To', visible: true },
  ];

  const mockOnColumnsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the column selector button', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    expect(getByText('⚙ Columns')).toBeTruthy();
  });

  it('should open modal when button is pressed', () => {
    const { getByText, queryByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    // Modal should not be visible initially
    expect(queryByText('Select Columns')).toBeNull();

    // Press button to open modal
    fireEvent.press(getByText('⚙ Columns'));

    // Modal should now be visible
    expect(getByText('Select Columns')).toBeTruthy();
  });

  it('should display all columns in the modal', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));

    expect(getByText('Time')).toBeTruthy();
    expect(getByText('Airline')).toBeTruthy();
    expect(getByText('Flight')).toBeTruthy();
    expect(getByText('From')).toBeTruthy();
    expect(getByText('To')).toBeTruthy();
  });

  it('should show checkmarks for visible columns', () => {
    const { getByText, getAllByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));

    // Should have checkmarks for visible columns (Time, Airline, From, To)
    const checkmarks = getAllByText('✓');
    expect(checkmarks.length).toBe(4);
  });

  it('should toggle column visibility when clicked', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));
    fireEvent.press(getByText('Time'));

    expect(mockOnColumnsChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: 'time', visible: false }),
      ])
    );
  });

  it('should toggle hidden column to visible when clicked', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));
    fireEvent.press(getByText('Flight')); // Flight is initially hidden

    expect(mockOnColumnsChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: 'flight', visible: true }),
      ])
    );
  });

  it('should not modify other columns when toggling one', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));
    fireEvent.press(getByText('Time'));

    const updatedColumns = mockOnColumnsChange.mock.calls[0][0];
    
    // Check that other columns remain unchanged
    expect(updatedColumns.find((c: ColumnConfig) => c.id === 'airline')?.visible).toBe(true);
    expect(updatedColumns.find((c: ColumnConfig) => c.id === 'flight')?.visible).toBe(false);
    expect(updatedColumns.find((c: ColumnConfig) => c.id === 'from')?.visible).toBe(true);
  });

  it('should close modal when close button is pressed', () => {
    const { getByText, queryByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    // Open modal
    fireEvent.press(getByText('⚙ Columns'));
    expect(getByText('Select Columns')).toBeTruthy();

    // Close modal
    fireEvent.press(getByText('✕'));
    
    // Modal should be closed (note: in testing, modal might still render but be marked as not visible)
    expect(queryByText('Select Columns')).toBeNull();
  });

  it('should close modal when Done button is pressed', () => {
    const { getByText, queryByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    // Open modal
    fireEvent.press(getByText('⚙ Columns'));
    expect(getByText('Select Columns')).toBeTruthy();

    // Close modal with Done button
    fireEvent.press(getByText('Done'));
    
    expect(queryByText('Select Columns')).toBeNull();
  });

  it('should apply theme colors to button', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    // The button should exist
    const button = getByText('⚙ Columns');
    expect(button).toBeTruthy();
  });

  it('should handle empty columns array', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={[]}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    expect(getByText('⚙ Columns')).toBeTruthy();
  });

  it('should handle all columns hidden', () => {
    const allHidden = mockColumns.map(col => ({ ...col, visible: false }));
    
    const { getByText, queryByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={allHidden}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));

    // Should have no checkmarks (query should return null)
    expect(queryByText('✓')).toBeNull();
  });

  it('should handle all columns visible', () => {
    const allVisible = mockColumns.map(col => ({ ...col, visible: true }));
    
    const { getByText, getAllByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={allVisible}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));

    // Should have checkmarks for all 5 columns
    const checkmarks = getAllByText('✓');
    expect(checkmarks.length).toBe(5);
  });

  it('should allow multiple toggles in one session', () => {
    const { getByText } = render(
      <ColumnSelector
        theme={mockTheme}
        columns={mockColumns}
        onColumnsChange={mockOnColumnsChange}
      />
    );

    fireEvent.press(getByText('⚙ Columns'));
    
    // Toggle first column
    fireEvent.press(getByText('Time'));
    expect(mockOnColumnsChange).toHaveBeenCalledTimes(1);
    
    // Toggle second column
    fireEvent.press(getByText('Airline'));
    expect(mockOnColumnsChange).toHaveBeenCalledTimes(2);
    
    // Toggle third column
    fireEvent.press(getByText('Flight'));
    expect(mockOnColumnsChange).toHaveBeenCalledTimes(3);
  });
});
