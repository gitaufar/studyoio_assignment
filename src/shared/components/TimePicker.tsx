import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '../stores/themeContext';

interface TimePickerProps {
  label?: string;
  value: string; // HH:mm format (24-hour)
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  minTime?: string;
  maxTime?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label = 'Select Time',
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
  required = false,
  minTime,
  maxTime,
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

  // Convert string to dayjs (using today's date with the time)
  const dayjsValue = value ? dayjs(`2000-01-01 ${value}`) : null;
  const dayjsMinTime = minTime ? dayjs(`2000-01-01 ${minTime}`) : undefined;
  const dayjsMaxTime = maxTime ? dayjs(`2000-01-01 ${maxTime}`) : undefined;

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('HH:mm'));
    } else {
      onChange('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiTimePicker
          label={required ? `${label} *` : label}
          value={dayjsValue}
          onChange={handleChange}
          minTime={dayjsMinTime}
          maxTime={dayjsMaxTime}
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
