/**
 * LocalStorage utility for UI preferences only
 * DO NOT store Firebase data here - use Firestore persistence instead
 */

const STORAGE_KEYS = {
  THEME: 'studyoio_theme',
  SIDEBAR_STATE: 'studyoio_sidebar_collapsed',
  LAST_ACTIVE_TAB: 'studyoio_last_tab',
  USER_PREFERENCES: 'studyoio_user_prefs',
} as const;

export const localStorageService = {
  // Theme preference
  getTheme: (): 'light' | 'dark' => {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      return (theme as 'light' | 'dark') || 'light';
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return 'light';
    }
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  },

  // Sidebar state
  getSidebarState: (): boolean => {
    try {
      const state = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE);
      return state === 'true';
    } catch (error) {
      console.warn('Failed to read sidebar state:', error);
      return false;
    }
  },

  setSidebarState: (collapsed: boolean): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, String(collapsed));
    } catch (error) {
      console.warn('Failed to save sidebar state:', error);
    }
  },

  // Last active tab
  getLastActiveTab: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_TAB);
    } catch (error) {
      console.warn('Failed to read last active tab:', error);
      return null;
    }
  },

  setLastActiveTab: (tab: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_TAB, tab);
    } catch (error) {
      console.warn('Failed to save last active tab:', error);
    }
  },

  // User preferences (generic)
  getUserPreferences: <T = unknown>(): T | null => {
    try {
      const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return prefs ? JSON.parse(prefs) : null;
    } catch (error) {
      console.warn('Failed to read user preferences:', error);
      return null;
    }
  },

  setUserPreferences: <T = unknown>(preferences: T): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.warn('Failed to save user preferences:', error);
    }
  },

  // Clear all preferences
  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  },
};
