import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  required = false, 
  error,
  className = '',
  ...props 
}) => {
  return (
    <div>
      <label 
        htmlFor={props.id} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
