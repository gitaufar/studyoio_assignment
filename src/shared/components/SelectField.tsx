import React from 'react';
import { Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTheme } from '../stores/themeContext';

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  name,
  id,
  className,
}) => {
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Select
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      displayEmpty
      required={required}
      disabled={disabled}
      size="small"
      className={className}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: isDarkMode ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)',
            '& .MuiMenuItem-root': {
              color: isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(17, 24, 39)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgb(30, 30, 30)' : 'rgb(243, 244, 246)',
              },
              '&.Mui-selected': {
                backgroundColor: isDarkMode ? 'rgb(30, 30, 30)' : 'rgb(243, 244, 246)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgb(45, 45, 45)' : 'rgb(229, 231, 235)',
                },
              },
            },
          },
        },
      }}
      sx={{
        width: '100%',
        backgroundColor: isDarkMode ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)',
        borderRadius: '0.5rem',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: isDarkMode ? 'rgb(45, 45, 45)' : 'rgb(209, 213, 219)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: isDarkMode ? 'white' : 'rgb(156, 163, 175)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgb(76, 175, 80)',
          borderWidth: '2px',
        },
        '& .MuiSelect-select': {
          padding: '1rem',
          color: isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(17, 24, 39)',
        },
        '& .MuiSvgIcon-root': {
          color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
        },
      }}
    >
      {placeholder && (
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
      )}
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};
