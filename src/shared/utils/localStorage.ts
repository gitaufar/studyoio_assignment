/**
 * LocalStorage utility for UI preferences only
 * DO NOT store Firebase data here - use Firestore persistence instead
 */

const STORAGE_KEYS = {
  THEME: 'studyoio_theme',
} as const;

export const localStorageService = {
  // Theme preference
  getTheme: (): 'light' | 'dark' => {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      return (theme as 'light' | 'dark') || 'light';
    } catch (error) {
      return 'light';
    }
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      // Silent fail
    }
  },
};
