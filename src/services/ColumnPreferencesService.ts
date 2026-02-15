import Cookies from 'js-cookie';
import { ColumnConfig, DEFAULT_COLUMNS, ColumnType } from '../types/ColumnConfig';

const COOKIE_NAME = 'flight_monitor_columns';
const COOKIE_EXPIRY_DAYS = 365; // 1 year

export const columnPreferencesService = {
  /**
   * Load column preferences from cookie
   * Returns default columns if no cookie exists
   */
  loadColumns(): ColumnConfig[] {
    try {
      const cookieValue = Cookies.get(COOKIE_NAME);
      if (!cookieValue) {
        return DEFAULT_COLUMNS;
      }

      const savedColumns = JSON.parse(cookieValue);
      
      // Validate the parsed data
      if (!Array.isArray(savedColumns)) {
        console.warn('Invalid column data in cookie: not an array');
        return DEFAULT_COLUMNS;
      }

      // Validate each column has required properties
      const isValid = savedColumns.every(col => 
        col && 
        typeof col === 'object' && 
        typeof col.id === 'string' && 
        typeof col.label === 'string' && 
        typeof col.visible === 'boolean'
      );

      if (!isValid) {
        console.warn('Invalid column data in cookie: missing required properties');
        return DEFAULT_COLUMNS;
      }
      
      // Merge with defaults to handle new columns
      return DEFAULT_COLUMNS.map(defaultCol => {
        const savedCol = savedColumns.find((col: ColumnConfig) => col.id === defaultCol.id);
        return savedCol || defaultCol;
      });
    } catch (error) {
      console.error('Error loading column preferences:', error);
      return DEFAULT_COLUMNS;
    }
  },

  /**
   * Save column preferences to cookie
   */
  saveColumns(columns: ColumnConfig[]): void {
    try {
      const cookieValue = JSON.stringify(columns);
      Cookies.set(COOKIE_NAME, cookieValue, { expires: COOKIE_EXPIRY_DAYS });
    } catch (error) {
      console.error('Error saving column preferences:', error);
    }
  },

  /**
   * Toggle visibility of a specific column
   */
  toggleColumn(columns: ColumnConfig[], columnId: ColumnType): ColumnConfig[] {
    return columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
  },

  /**
   * Check if at least one column is visible
   */
  hasVisibleColumns(columns: ColumnConfig[]): boolean {
    return columns.some(col => col.visible);
  },
};
