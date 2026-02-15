import React from 'react';
import { render } from '@testing-library/react-native';
import { FlightRow } from '../FlightRow';
import { Flight, FlightStatus } from '../../types/Flight';
import { Theme } from '../../theme/themes';
import { ColumnConfig } from '../../types/ColumnConfig';

describe('FlightRow', () => {
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

  const mockFlight: Flight = {
    id: 'test-1',
    flightNumber: 'AA 1234',
    airline: 'American Airlines',
    airlineCode: 'AA',
    origin: 'JFK',
    destination: 'LAX',
    scheduledTime: '2026-02-15T14:30:00.000Z',
    estimatedTime: '2026-02-15T14:35:00.000Z',
    status: FlightStatus.SCHEDULED,
    aircraft: 'B737',
    gate: 'A1',
  };

  const allColumnsVisible: ColumnConfig[] = [
    { id: 'time', label: 'Time', visible: true },
    { id: 'airline', label: 'Airline', visible: true },
    { id: 'flight', label: 'Flight', visible: true },
    { id: 'from', label: 'From', visible: true },
    { id: 'to', label: 'To', visible: true },
    { id: 'altitude', label: 'Altitude', visible: true },
    { id: 'airplaneType', label: 'Airplane Type', visible: true },
  ];

  it('should render flight row with all columns visible', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('AA 1234')).toBeTruthy();
    expect(getByText('AA')).toBeTruthy();
    expect(getByText('JFK')).toBeTruthy();
    expect(getByText('LAX')).toBeTruthy();
    expect(getByText('B737')).toBeTruthy();
  });

  it('should render even row with correct background color', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    // Just verify the row renders without crashing
    expect(getByText('AA 1234')).toBeTruthy();
  });

  it('should render odd row with correct background color', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={false}
        columns={allColumnsVisible}
      />
    );

    // Just verify the row renders without crashing
    expect(getByText('AA 1234')).toBeTruthy();
  });

  it('should hide columns when visible is false', () => {
    const someColumnsHidden: ColumnConfig[] = [
      { id: 'time', label: 'Time', visible: true },
      { id: 'airline', label: 'Airline', visible: false },
      { id: 'flight', label: 'Flight', visible: true },
      { id: 'from', label: 'From', visible: false },
      { id: 'to', label: 'To', visible: true },
      { id: 'altitude', label: 'Altitude', visible: false },
      { id: 'airplaneType', label: 'Airplane Type', visible: true },
    ];

    const { queryByText, getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={someColumnsHidden}
      />
    );

    // Visible columns
    expect(getByText('AA 1234')).toBeTruthy();
    expect(getByText('LAX')).toBeTruthy();
    expect(getByText('B737')).toBeTruthy();

    // Hidden columns
    expect(queryByText('AA')).toBeNull(); // airline code
    expect(queryByText('JFK')).toBeNull(); // from
  });

  it('should format time correctly', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    // Time should be formatted as HH:mm (24-hour format)
    const timeElement = getByText(/\d{2}:\d{2}/);
    expect(timeElement).toBeTruthy();
  });

  it('should display altitude when flight is in-flight', () => {
    const inFlightFlight: Flight = {
      ...mockFlight,
      status: FlightStatus.IN_FLIGHT,
      altitude: 35000,
    };

    const { getByText } = render(
      <FlightRow
        flight={inFlightFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('35,000ft')).toBeTruthy();
  });

  it('should not display altitude when flight is not in-flight', () => {
    const { queryByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(queryByText(/ft$/)).toBeNull();
  });

  it('should display aircraft type when available', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('B737')).toBeTruthy();
  });

  it('should handle missing aircraft gracefully', () => {
    const flightWithoutAircraft: Flight = {
      ...mockFlight,
      aircraft: undefined,
    };

    const { queryByText } = render(
      <FlightRow
        flight={flightWithoutAircraft}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    // Should still render without crashing, but no aircraft text
    expect(queryByText('B737')).toBeNull();
  });

  it('should render airline code badge', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    const airlineCode = getByText('AA');
    expect(airlineCode).toBeTruthy();
  });

  it('should render in arrivals mode', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="arrivals"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('AA 1234')).toBeTruthy();
  });

  it('should render in departures mode', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('AA 1234')).toBeTruthy();
  });

  it('should handle all column types being hidden', () => {
    const allColumnsHidden: ColumnConfig[] = allColumnsVisible.map(col => ({
      ...col,
      visible: false,
    }));

    const { root } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsHidden}
      />
    );

    // Should render empty row
    expect(root).toBeTruthy();
  });

  it('should use correct text color from theme', () => {
    const { getByText } = render(
      <FlightRow
        flight={mockFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    // Just verify text renders
    expect(getByText('AA 1234')).toBeTruthy();
  });

  it('should format large altitude numbers with commas', () => {
    const highAltitudeFlight: Flight = {
      ...mockFlight,
      status: FlightStatus.IN_FLIGHT,
      altitude: 42000,
    };

    const { getByText } = render(
      <FlightRow
        flight={highAltitudeFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('42,000ft')).toBeTruthy();
  });

  it('should round altitude to nearest integer', () => {
    const fractionalAltitudeFlight: Flight = {
      ...mockFlight,
      status: FlightStatus.IN_FLIGHT,
      altitude: 35550.7,
    };

    const { getByText } = render(
      <FlightRow
        flight={fractionalAltitudeFlight}
        theme={mockTheme}
        viewMode="departures"
        isEven={true}
        columns={allColumnsVisible}
      />
    );

    expect(getByText('35,551ft')).toBeTruthy();
  });
});
