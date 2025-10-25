import React from 'react';
import { Modal } from './Modal';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  error?: string;
  buttonText?: string;
}

// Helper function untuk convert Firebase/technical errors ke user-friendly messages
export const getUserFriendlyErrorMessage = (error: string): string => {
  const errorLower = error.toLowerCase();

  // Network errors
  if (errorLower.includes('network') || errorLower.includes('fetch')) {
    return 'Connection problem. Please check your internet connection and try again.';
  }

  // Firebase errors
  if (errorLower.includes('permission-denied')) {
    return 'You do not have permission to perform this action.';
  }

  if (errorLower.includes('not-found')) {
    return 'The requested data could not be found.';
  }

  if (errorLower.includes('already-exists')) {
    return 'This record already exists in the system.';
  }

  if (errorLower.includes('invalid-argument')) {
    return 'Invalid data provided. Please check your input and try again.';
  }

  // Server errors
  if (errorLower.includes('500') || errorLower.includes('internal server error')) {
    return 'Server error occurred. Please try again in a few moments.';
  }

  if (errorLower.includes('503') || errorLower.includes('service unavailable')) {
    return 'Service is temporarily unavailable. Please try again later.';
  }

  if (errorLower.includes('404')) {
    return 'The requested resource was not found.';
  }

  if (errorLower.includes('403') || errorLower.includes('forbidden')) {
    return 'Access denied. You do not have permission for this action.';
  }

  if (errorLower.includes('401') || errorLower.includes('unauthorized')) {
    return 'Authentication required. Please log in again.';
  }

  // Timeout errors
  if (errorLower.includes('timeout') || errorLower.includes('timed out')) {
    return 'Request timed out. Please check your connection and try again.';
  }

  // Generic fallback
  if (errorLower.includes('error') || errorLower.includes('failed')) {
    return 'Something went wrong. Please try again.';
  }

  // If no specific match, return cleaned message (remove technical details)
  return error.split(':')[0] || 'An unexpected error occurred. Please try again.';
};

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = 'Error',
  message,
  error,
  buttonText = 'Try Again',
}) => {
  const friendlyMessage = error ? getUserFriendlyErrorMessage(error) : message;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <svg
            className="h-10 w-10 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {friendlyMessage}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};
