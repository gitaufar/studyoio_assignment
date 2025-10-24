export const getAuthErrorMessage = (error: any): string => {
  const errorCode = error?.code || '';
  
  const errorMessages: Record<string, string> = {
    // Login errors
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/user-not-found': 'Account not found. Please register first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email format.',
    'auth/user-disabled': 'This account has been disabled. Please contact the administrator.',
    
    // Register errors
    'auth/email-already-in-use': 'This email is already in use. Please log in or use another email.',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
    
    // Network errors
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    
    // Other errors
    'auth/operation-not-allowed': 'Operation not allowed. Please contact the administrator.',
    'auth/requires-recent-login': 'Please log in again to continue.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};