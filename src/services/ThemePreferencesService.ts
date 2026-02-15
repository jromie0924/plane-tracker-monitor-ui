import Cookies from 'js-cookie';

const COOKIE_NAME = 'flight_monitor_theme';
const COOKIE_EXPIRY_DAYS = 365; // 1 year
const DEFAULT_THEME = 'Blue';

export const themePreferencesService = {
  /**
   * Load theme preference from cookie
   * Returns default theme (Blue) if no cookie exists
   */
  loadTheme(): string {
    try {
      const cookieValue = Cookies.get(COOKIE_NAME);
      if (!cookieValue) {
        return DEFAULT_THEME;
      }

      // Validate the theme name is a string
      if (typeof cookieValue !== 'string' || cookieValue.trim() === '') {
        console.warn('Invalid theme preference in cookie');
        return DEFAULT_THEME;
      }

      return cookieValue;
    } catch (error) {
      console.error('Error loading theme preference:', error);
      return DEFAULT_THEME;
    }
  },

  /**
   * Save theme preference to cookie
   */
  saveTheme(themeName: string): void {
    try {
      if (typeof themeName !== 'string' || themeName.trim() === '') {
        console.error('Invalid theme name:', themeName);
        return;
      }
      Cookies.set(COOKIE_NAME, themeName, { expires: COOKIE_EXPIRY_DAYS });
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  },
};
