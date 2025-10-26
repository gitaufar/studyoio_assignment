import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "../stores/themeContext";

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
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
  minTime,
  maxTime,
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

  // Convert string to dayjs (using today's date with the time)
  const dayjsValue = value ? dayjs(`2000-01-01 ${value}`) : null;
  const dayjsMinTime = minTime ? dayjs(`2000-01-01 ${minTime}`) : undefined;
  const dayjsMaxTime = maxTime ? dayjs(`2000-01-01 ${maxTime}`) : undefined;

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format("HH:mm"));
    } else {
      onChange("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiTimePicker
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
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  backgroundColor: isDarkMode ? "#1e293b" : "#f9fafb",
                  color: isDarkMode ? "white" : "black",
                },
                "& .MuiClock-pin, & .MuiClockPointer-root": {
                  backgroundColor: "#4CAF50", // warna primary kamu
                },
                "& .MuiClockPointer-thumb": {
                  borderColor: "#4CAF50",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
