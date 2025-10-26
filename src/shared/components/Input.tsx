import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { useTheme } from '../stores/themeContext';

interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  type?: string;
  id?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  focusColor?: 'primary' | 'secondary';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  required = false,
  className = '',
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  min,
  max,
  step,
  startIcon,
  endIcon,
  focusColor = 'primary',
}) => {
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  // Tentukan warna border saat fokus
  const focusBorderColor =
    focusColor === 'secondary' ? 'rgb(33, 150, 243)' : 'rgb(76, 175, 80)';

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <TextField
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={!!error}
        helperText={error || helperText}
        fullWidth
        size="small"
        className={className}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">
              <span className="flex items-center text-gray-400 dark:text-gray-500">
                {startIcon}
              </span>
            </InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">
              <span className="flex items-center h-full text-gray-400 dark:text-gray-500">
                {endIcon}
              </span>
            </InputAdornment>
          ) : undefined,
        }}
        inputProps={{
          min,
          max,
          step,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: isDarkMode
              ? 'rgb(18, 18, 18)'
              : 'rgb(255, 255, 255)',
            borderRadius: '0.5rem',
            '& fieldset': {
              borderColor: isDarkMode
                ? 'rgb(45, 45, 45)'
                : 'rgb(209, 213, 219)',
            },
            '&:hover fieldset': {
              borderColor: isDarkMode
                ? 'rgb(75, 85, 99)'
                : 'rgb(156, 163, 175)',
            },
            '&.Mui-focused fieldset': {
              borderColor: focusBorderColor,
              borderWidth: '2px',
            },
            '& input': {
              color: isDarkMode
                ? 'rgb(255, 255, 255)'
                : 'rgb(17, 24, 39)',
              padding: '1rem',
            },
            '& input::placeholder': {
              color: isDarkMode
                ? 'rgb(107, 114, 128)'
                : 'rgb(156, 163, 175)',
              opacity: 1,
            },
          },
          '& .MuiInputAdornment-root': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            color: error
              ? isDarkMode
                ? 'rgb(248, 113, 113)'
                : 'rgb(220, 38, 38)'
              : isDarkMode
              ? 'rgb(156, 163, 175)'
              : 'rgb(107, 114, 128)',
          },
        }}
      />
    </div>
  );
};
