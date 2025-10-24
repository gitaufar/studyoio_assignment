import React from 'react';

interface AuthInputProps {
  id: string;
  name: string;
  type: 'email' | 'text';
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  helperText?: string;
  focusColor?: 'primary' | 'secondary';
}

export const AuthInput: React.FC<AuthInputProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  helperText,
  focusColor = 'primary',
}) => {
  const ringColor = focusColor === 'primary' ? 'focus:ring-primary' : 'focus:ring-secondary';
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all bg-white dark:bg-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
        required={required}
      />
      {helperText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );
};
