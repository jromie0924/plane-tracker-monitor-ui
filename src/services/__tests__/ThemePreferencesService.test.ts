import Cookies from 'js-cookie';
import { themePreferencesService } from '../ThemePreferencesService';

// Mock js-cookie
jest.mock('js-cookie');

describe('ThemePreferencesService', () => {
  const mockCookies = Cookies as jest.Mocked<typeof Cookies>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadTheme', () => {
    it('should return default theme (Blue) when no cookie exists', () => {
      mockCookies.get.mockReturnValue(undefined);
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('Blue');
      expect(mockCookies.get).toHaveBeenCalledWith('flight_monitor_theme');
    });

    it('should load theme name from cookie', () => {
      mockCookies.get.mockReturnValue('Purple');
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('Purple');
    });

    it('should load different theme names correctly', () => {
      const themeNames = ['Blue', 'Purple', 'Green', 'Red', 'Black', 'White', 'Light', 'Dark'];
      
      themeNames.forEach(themeName => {
        mockCookies.get.mockReturnValue(themeName);
        const theme = themePreferencesService.loadTheme();
        expect(theme).toBe(themeName);
      });
    });

    it('should return default theme when cookie contains empty string', () => {
      mockCookies.get.mockReturnValue('');
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('Blue');
    });

    it('should return default theme when cookie contains only whitespace', () => {
      mockCookies.get.mockReturnValue('   ');
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('Blue');
    });

    it('should return the cookie value even if it is not a standard theme', () => {
      // This allows for future theme additions or custom themes
      mockCookies.get.mockReturnValue('CustomTheme');
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('CustomTheme');
    });

    it('should handle Cookies.get throwing an error', () => {
      mockCookies.get.mockImplementation(() => {
        throw new Error('Cookie read error');
      });
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('Blue');
    });

    it('should return default theme when cookie contains non-string value', () => {
      // TypeScript would prevent this, but testing runtime behavior
      mockCookies.get.mockReturnValue(null as any);
      
      const theme = themePreferencesService.loadTheme();
      
      expect(theme).toBe('Blue');
    });
  });

  describe('saveTheme', () => {
    it('should save theme preference to cookie with correct expiry', () => {
      themePreferencesService.saveTheme('Purple');
      
      expect(mockCookies.set).toHaveBeenCalledWith(
        'flight_monitor_theme',
        'Purple',
        { expires: 365 }
      );
    });

    it('should save different theme names correctly', () => {
      const themeNames = ['Blue', 'Purple', 'Green', 'Red', 'Black', 'White', 'Light', 'Dark'];
      
      themeNames.forEach(themeName => {
        jest.clearAllMocks();
        themePreferencesService.saveTheme(themeName);
        expect(mockCookies.set).toHaveBeenCalledWith(
          'flight_monitor_theme',
          themeName,
          { expires: 365 }
        );
      });
    });

    it('should not save empty string theme name', () => {
      themePreferencesService.saveTheme('');
      
      expect(mockCookies.set).not.toHaveBeenCalled();
    });

    it('should not save whitespace-only theme name', () => {
      themePreferencesService.saveTheme('   ');
      
      expect(mockCookies.set).not.toHaveBeenCalled();
    });

    it('should handle Cookies.set throwing an error', () => {
      mockCookies.set.mockImplementation(() => {
        throw new Error('Cookie write error');
      });
      
      // Should not throw
      expect(() => themePreferencesService.saveTheme('Purple')).not.toThrow();
    });

    it('should not save non-string values', () => {
      // TypeScript would prevent this, but testing runtime behavior
      themePreferencesService.saveTheme(null as any);
      
      expect(mockCookies.set).not.toHaveBeenCalled();
    });

    it('should not save undefined values', () => {
      // TypeScript would prevent this, but testing runtime behavior
      themePreferencesService.saveTheme(undefined as any);
      
      expect(mockCookies.set).not.toHaveBeenCalled();
    });

    it('should save custom theme names', () => {
      themePreferencesService.saveTheme('CustomTheme');
      
      expect(mockCookies.set).toHaveBeenCalledWith(
        'flight_monitor_theme',
        'CustomTheme',
        { expires: 365 }
      );
    });
  });

  describe('Integration tests', () => {
    it('should successfully save and load theme', () => {
      const themeName = 'Green';
      
      themePreferencesService.saveTheme(themeName);
      
      // Simulate cookie being set
      mockCookies.get.mockReturnValue(themeName);
      
      const loaded = themePreferencesService.loadTheme();
      
      expect(loaded).toBe(themeName);
    });

    it('should handle save error and still load default', () => {
      mockCookies.set.mockImplementation(() => {
        throw new Error('Save failed');
      });
      
      themePreferencesService.saveTheme('Purple');
      
      mockCookies.get.mockReturnValue(undefined);
      const loaded = themePreferencesService.loadTheme();
      
      expect(loaded).toBe('Blue');
    });
  });
});
