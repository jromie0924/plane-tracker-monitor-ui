import Cookies from 'js-cookie';
import { columnPreferencesService } from '../ColumnPreferencesService';
import { ColumnConfig, DEFAULT_COLUMNS, ColumnType } from '../../types/ColumnConfig';

// Mock js-cookie
jest.mock('js-cookie');

describe('ColumnPreferencesService', () => {
  const mockCookies = Cookies as jest.Mocked<typeof Cookies>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadColumns', () => {
    it('should return default columns when no cookie exists', () => {
      mockCookies.get.mockReturnValue(undefined);
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(DEFAULT_COLUMNS);
      expect(mockCookies.get).toHaveBeenCalledWith('flight_monitor_columns');
    });

    it('should load and parse valid column data from cookie', () => {
      const savedColumns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
        { id: 'airline', label: 'Airline', visible: false },
        { id: 'flight', label: 'Flight', visible: true },
        { id: 'from', label: 'From', visible: true },
        { id: 'to', label: 'To', visible: false },
        { id: 'altitude', label: 'Altitude', visible: true },
        { id: 'airplaneType', label: 'Airplane Type', visible: true },
      ];
      
      mockCookies.get.mockReturnValue(JSON.stringify(savedColumns));
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(savedColumns);
    });

    it('should return default columns when cookie contains invalid JSON', () => {
      mockCookies.get.mockReturnValue('invalid json {');
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(DEFAULT_COLUMNS);
    });

    it('should return default columns when cookie data is not an array', () => {
      mockCookies.get.mockReturnValue(JSON.stringify({ invalid: 'data' }));
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(DEFAULT_COLUMNS);
    });

    it('should return default columns when array items are missing required properties', () => {
      const invalidColumns = [
        { id: 'time', visible: true }, // missing label
        { label: 'Airline', visible: false }, // missing id
      ];
      
      mockCookies.get.mockReturnValue(JSON.stringify(invalidColumns));
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(DEFAULT_COLUMNS);
    });

    it('should return default columns when array items have wrong property types', () => {
      const invalidColumns = [
        { id: 123, label: 'Time', visible: true }, // id should be string
        { id: 'airline', label: true, visible: false }, // label should be string
        { id: 'flight', label: 'Flight', visible: 'yes' }, // visible should be boolean
      ];
      
      mockCookies.get.mockReturnValue(JSON.stringify(invalidColumns));
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(DEFAULT_COLUMNS);
    });

    it('should merge saved columns with defaults for new columns', () => {
      // Simulate saved data missing a column
      const partialColumns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: false },
        { id: 'airline', label: 'Airline', visible: true },
        { id: 'flight', label: 'Flight', visible: true },
      ];
      
      mockCookies.get.mockReturnValue(JSON.stringify(partialColumns));
      
      const columns = columnPreferencesService.loadColumns();
      
      // Should have all default columns
      expect(columns).toHaveLength(DEFAULT_COLUMNS.length);
      
      // Saved preferences should be applied
      expect(columns.find(c => c.id === 'time')?.visible).toBe(false);
      expect(columns.find(c => c.id === 'airline')?.visible).toBe(true);
      
      // Missing columns should use defaults
      expect(columns.find(c => c.id === 'from')).toBeDefined();
      expect(columns.find(c => c.id === 'to')).toBeDefined();
    });

    it('should handle Cookies.get throwing an error', () => {
      mockCookies.get.mockImplementation(() => {
        throw new Error('Cookie read error');
      });
      
      const columns = columnPreferencesService.loadColumns();
      
      expect(columns).toEqual(DEFAULT_COLUMNS);
    });
  });

  describe('saveColumns', () => {
    it('should save column preferences to cookie with correct expiry', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
        { id: 'airline', label: 'Airline', visible: false },
        { id: 'flight', label: 'Flight', visible: true },
        { id: 'from', label: 'From', visible: true },
        { id: 'to', label: 'To', visible: false },
        { id: 'altitude', label: 'Altitude', visible: true },
        { id: 'airplaneType', label: 'Airplane Type', visible: true },
      ];
      
      columnPreferencesService.saveColumns(columns);
      
      expect(mockCookies.set).toHaveBeenCalledWith(
        'flight_monitor_columns',
        JSON.stringify(columns),
        { expires: 365 }
      );
    });

    it('should handle Cookies.set throwing an error', () => {
      mockCookies.set.mockImplementation(() => {
        throw new Error('Cookie write error');
      });
      
      const columns: ColumnConfig[] = DEFAULT_COLUMNS;
      
      // Should not throw
      expect(() => columnPreferencesService.saveColumns(columns)).not.toThrow();
    });
  });

  describe('toggleColumn', () => {
    it('should toggle visibility of specified column', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
        { id: 'airline', label: 'Airline', visible: true },
        { id: 'flight', label: 'Flight', visible: true },
      ];
      
      const updated = columnPreferencesService.toggleColumn(columns, 'airline');
      
      expect(updated.find(c => c.id === 'airline')?.visible).toBe(false);
      expect(updated.find(c => c.id === 'time')?.visible).toBe(true);
      expect(updated.find(c => c.id === 'flight')?.visible).toBe(true);
    });

    it('should toggle from false to true', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: false },
        { id: 'airline', label: 'Airline', visible: true },
      ];
      
      const updated = columnPreferencesService.toggleColumn(columns, 'time');
      
      expect(updated.find(c => c.id === 'time')?.visible).toBe(true);
    });

    it('should not modify other column properties', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
        { id: 'airline', label: 'Airline', visible: true },
      ];
      
      const updated = columnPreferencesService.toggleColumn(columns, 'airline');
      
      const toggledColumn = updated.find(c => c.id === 'airline');
      expect(toggledColumn?.id).toBe('airline');
      expect(toggledColumn?.label).toBe('Airline');
    });

    it('should return new array without mutating original', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
        { id: 'airline', label: 'Airline', visible: true },
      ];
      
      const updated = columnPreferencesService.toggleColumn(columns, 'time');
      
      expect(updated).not.toBe(columns);
      expect(columns.find(c => c.id === 'time')?.visible).toBe(true);
      expect(updated.find(c => c.id === 'time')?.visible).toBe(false);
    });

    it('should handle toggling non-existent column gracefully', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
      ];
      
      const updated = columnPreferencesService.toggleColumn(columns, 'nonexistent' as ColumnType);
      
      expect(updated).toEqual(columns);
    });
  });

  describe('hasVisibleColumns', () => {
    it('should return true when at least one column is visible', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: false },
        { id: 'airline', label: 'Airline', visible: true },
        { id: 'flight', label: 'Flight', visible: false },
      ];
      
      expect(columnPreferencesService.hasVisibleColumns(columns)).toBe(true);
    });

    it('should return false when no columns are visible', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: false },
        { id: 'airline', label: 'Airline', visible: false },
        { id: 'flight', label: 'Flight', visible: false },
      ];
      
      expect(columnPreferencesService.hasVisibleColumns(columns)).toBe(false);
    });

    it('should return true when all columns are visible', () => {
      const columns: ColumnConfig[] = [
        { id: 'time', label: 'Time', visible: true },
        { id: 'airline', label: 'Airline', visible: true },
        { id: 'flight', label: 'Flight', visible: true },
      ];
      
      expect(columnPreferencesService.hasVisibleColumns(columns)).toBe(true);
    });

    it('should return false for empty array', () => {
      expect(columnPreferencesService.hasVisibleColumns([])).toBe(false);
    });
  });
});
