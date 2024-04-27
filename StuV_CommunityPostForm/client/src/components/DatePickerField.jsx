import React from "react";
import { Field, ErrorMessage } from "formik";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DatePickerField = ({ name, label }) => (
    <Field name={name}>
        {({ field, form }) => (
            <FormControl required fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Datum"
                        onChange={(newValue) => {
                            form.setFieldValue(
                                "entryDate",
                                newValue.format("YYYY-MM-DD")
                            );
                        }}
                    />
                </LocalizationProvider>
                <ErrorMessage
                    name="entryDate"
                    component="div"
                    style={{ color: "red" }}
                />
            </FormControl>
        )}
    </Field>
);

export default DatePickerField;
