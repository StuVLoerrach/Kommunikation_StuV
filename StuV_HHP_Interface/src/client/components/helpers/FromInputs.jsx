import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options,
  emptyOptionLabel,
  error,
  helperText,
}) => {
  const labelId = `${name}-label`;

  return (
    <FormControl fullWidth error={error} >
      <InputLabel id={labelId}>
        {label}
      </InputLabel>
      <Select
        name={name}
        labelId={labelId}
        value={value}
        onChange={onChange}
        label={label}
      >
        <MenuItem value="">
          <em>{emptyOptionLabel}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText} </FormHelperText>
    </FormControl>
  );
};

export const DateInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name={name}
          label={label}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
          error={error}
          helperText={helperText}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export const TextInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <FormControl fullWidth>
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
      />
    </FormControl>
  );
};
