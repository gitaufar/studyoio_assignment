import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "../stores/themeContext";

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
  value,
  onChange,
  error = false,
  helperText,
  minDate,
  maxDate,
  disabled = false,
}) => {
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === "dark";

  // Create MUI theme based on current theme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#4CAF50",
          },
          secondary: {
            main: "#2196F3",
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
      onChange(newValue.format("YYYY-MM-DD"));
    } else {
      onChange("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
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
              variant: "outlined",
              size: "small",
              InputProps: {
                sx: {
                  backgroundColor: isDarkMode ? "#121212" : "#ffffff",
                  borderRadius: "0.5rem",
                  "& fieldset": {
                    borderColor: isDarkMode
                      ? "#2D2D2D"
                      : "rgb(209, 213, 219)",
                  },
                  "&:hover fieldset": {
                    borderColor: isDarkMode
                      ? "rgb(75, 85, 99)"
                      : "rgb(156, 163, 175)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(76, 175, 80)",
                    borderWidth: "2px",
                  },
                  "& .MuiInputBase-input": {
                    color: isDarkMode
                      ? "rgb(229, 231, 235)"
                      : "rgb(17, 24, 39)",
                  },
                  "& .MuiSvgIcon-root": {
                    color: isDarkMode
                      ? "rgb(156, 163, 175)"
                      : "rgb(107, 114, 128)",
                  },
                },
              },
              InputLabelProps: {
                sx: {
                  color: isDarkMode
                    ? "rgb(156, 163, 175)"
                    : "rgb(107, 114, 128)",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
