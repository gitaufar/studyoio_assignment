import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '../stores/themeContext';

interface DatePickerProps {
  label?: string;
  value: string; // YYYY-MM-DD format
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label = 'Select Date',
  value,
  onChange,
  error = false,
  helperText,
  minDate,
  maxDate,
  disabled = false,
  required = false,
}) => {
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  // Create MUI theme based on current theme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#4CAF50',
          },
          secondary: {
            main: '#2196F3',
          },
        },
      }),
    [isDarkMode]
  );

  // Convert string to dayjs
  const dayjsValue = value ? dayjs(value) : null;
  const dayjsMinDate = minDate ? dayjs(minDate) : undefined;
  const dayjsMaxDate = maxDate ? dayjs(maxDate) : undefined;

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('YYYY-MM-DD'));
    } else {
      onChange('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          label={required ? `${label} *` : label}
          value={dayjsValue}
          onChange={handleChange}
          minDate={dayjsMinDate}
          maxDate={dayjsMaxDate}
          disabled={disabled}
          slotProps={{
            textField: {
              fullWidth: true,
              error: error,
              helperText: helperText,
              variant: 'outlined',
              size: 'medium',
              sx: {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff',
                  '& fieldset': {
                    borderColor: isDarkMode ? '#2D2D2D' : '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? '#4CAF50' : '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                },
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#ffffff' : '#111827',
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
