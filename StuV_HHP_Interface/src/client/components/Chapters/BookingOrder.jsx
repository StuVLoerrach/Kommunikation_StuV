import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Grid } from "@mui/material";

import {serverFunctions} from "../../utils/serverFunctions"

const validationSchema = Yup.object().shape({
  rechnungsnummer: Yup.string().required("Rechnungsnummer is required"),
  rechnungsdatum: Yup.date().required("Rechnungsdatum is required"),
  rechnungssteller: Yup.string().required("Rechnungssteller is required"),
  kapitel: Yup.string().required(
    "Einnahmen-/Ausgabekapitel laut Haushaltsplan is required"
  ),
  titel: Yup.string().required(
    "Einnahmen-/Ausgabetitel laut Haushaltsplan is required"
  ),
});

const BookingOrder = ({ onSubmit }) => {
  const [postenOptions, setPostenOptions] = useState([]);
  const [kapitelOptions, setKapitelOptions] = useState([]);

  const [result, setResult] = useState(null);

  const callServerFunction = () => {
    serverFunctions.testGetAccountGetChapters();
  };

  const fetchPostenOptions = async () => {
    // Make a fetch call to get posten options
    try {
      const response = await fetch("your_server_url/getAccounts");
      const data = await response.json();
      setPostenOptions(data);
    } catch (error) {
      console.error("Error fetching posten options:", error);
    }
  };

  const fetchKapitelOptions = async (selectedAccount) => {
    // Make a fetch call to get kapitel options based on selected account
    try {
      const response = await fetch(
        `your_server_url/getChapters?selectedAccount=${selectedAccount}`
      );
      const data = await response.json();
      setKapitelOptions(data);
    } catch (error) {
      console.error("Error fetching kapitel options:", error);
    }
  };

  useEffect(() => {
    fetchPostenOptions();
  }, []);

  const formik = useFormik({
    initialValues: {
      rechnungsnummer: "",
      rechnungsdatum: "",
      rechnungssteller: "",
      kapitel: "",
      titel: "",
    },
    validationSchema,
    onSubmit,
  });

  const handlePostenChange = (event) => {
    const selectedAccount = event.target.value;
    fetchKapitelOptions(selectedAccount);
    formik.handleChange(event);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="rechnungsnummer"
          name="rechnungsnummer"
          label="Rechnungsnummer"
          value={formik.values.rechnungsnummer}
          onChange={formik.handleChange}
          error={
            formik.touched.rechnungsnummer &&
            Boolean(formik.errors.rechnungsnummer)
          }
          helperText={
            formik.touched.rechnungsnummer && formik.errors.rechnungsnummer
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="rechnungsdatum"
          name="rechnungsdatum"
          label="Rechnungsdatum"
          type="date"
          value={formik.values.rechnungsdatum}
          onChange={formik.handleChange}
          error={
            formik.touched.rechnungsdatum &&
            Boolean(formik.errors.rechnungsdatum)
          }
          helperText={
            formik.touched.rechnungsdatum && formik.errors.rechnungsdatum
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="rechnungssteller"
          name="rechnungssteller"
          label="Rechnungssteller"
          value={formik.values.rechnungssteller}
          onChange={formik.handleChange}
          error={
            formik.touched.rechnungssteller &&
            Boolean(formik.errors.rechnungssteller)
          }
          helperText={
            formik.touched.rechnungssteller && formik.errors.rechnungssteller
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="posten"
          name="posten"
          label="Posten"
          select
          value={formik.values.posten}
          onChange={handlePostenChange}
        >
          {postenOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="kapitel"
          name="kapitel"
          label="Einnahmen-/Ausgabekapitel laut Haushaltsplan"
          select
          value={formik.values.kapitel}
          onChange={formik.handleChange}
          error={formik.touched.kapitel && Boolean(formik.errors.kapitel)}
          helperText={formik.touched.kapitel && formik.errors.kapitel}
        >
          {kapitelOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="titel"
          name="titel"
          label="Einnahmen-/Ausgabetitel laut Haushaltsplan"
          value={formik.values.titel}
          onChange={formik.handleChange}
          error={formik.touched.titel && Boolean(formik.errors.titel)}
          helperText={formik.touched.titel && formik.errors.titel}
        />
        <div>
          <button onClick={callServerFunction}>Call Server Function</button>
          <p>Result from server: {result}</p>
        </div>
      </Grid>
    </Grid>
  );
};

export default BookingOrder;
