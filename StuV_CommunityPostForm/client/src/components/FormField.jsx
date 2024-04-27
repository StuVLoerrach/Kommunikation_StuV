import React from "react";
import { Field, ErrorMessage } from "formik";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const FormField = ({ name, label, multiline, rows }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          required={name !== "entrySubText"}
          fullWidth
          variant="outlined"
          style={{ marginTop: name === "entryOrganization" ? "16px" : "0" }}
        >
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            multiline={multiline}
            rows={rows}
            label={label}
            {...field}
          />
          <ErrorMessage name={name} component="div" style={{ color: "red" }} />
        </FormControl>
      )}
    </Field>
  );
};

export default FormField;
