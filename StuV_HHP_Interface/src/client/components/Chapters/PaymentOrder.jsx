import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  verwendungszweck: Yup.string().required("Verwendungszweck is required"),
  betrag: Yup.number().required("Betrag is required"),
  vorhandeneMittel: Yup.boolean().oneOf(
    [true],
    "Haushaltsmittel noch vorhanden? is required"
  ),
  zahlungsempfaenger: Yup.string().required(
    "Name (Zahlungsempfänger i. S. § 1 II Nr. 6 ZAG) is required"
  ),
  iban: Yup.string().required("IBAN is required"),
  bic: Yup.string().required("BIC is required"),
});

const initialValues = {
  
}

const PaymentOrder = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="verwendungszweck"
          name="verwendungszweck"
          label="Verwendungszweck"
          value={formik.values.verwendungszweck}
          onChange={formik.handleChange}
          error={
            formik.touched.verwendungszweck &&
            Boolean(formik.errors.verwendungszweck)
          }
          helperText={
            formik.touched.verwendungszweck && formik.errors.verwendungszweck
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="betrag"
          name="betrag"
          label="Betrag (Art. 2 Verordnung (EU) Nr. 260/2012)"
          type="number"
          value={formik.values.betrag}
          onChange={formik.handleChange}
          error={formik.touched.betrag && Boolean(formik.errors.betrag)}
          helperText={formik.touched.betrag && formik.errors.betrag}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl
          fullWidth
          error={
            formik.touched.vorhandeneMittel &&
            Boolean(formik.errors.vorhandeneMittel)
          }
        >
          <FormControlLabel
            control={
              <Checkbox
                id="vorhandeneMittel"
                name="vorhandeneMittel"
                checked={formik.values.vorhandeneMittel}
                onChange={formik.handleChange}
              />
            }
            label="Haushaltsmittel noch vorhanden?"
          />
          {formik.touched.vorhandeneMittel &&
            formik.errors.vorhandeneMittel && (
              <FormHelperText>
                {formik.errors.vorhandeneMittel}
              </FormHelperText>
            )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="zahlungsempfaenger"
          name="zahlungsempfaenger"
          label="Name (Zahlungsempfänger i. S. § 1 II Nr. 6 ZAG)"
          value={formik.values.zahlungsempfaenger}
          onChange={formik.handleChange}
          error={
            formik.touched.zahlungsempfaenger &&
            Boolean(formik.errors.zahlungsempfaenger)
          }
          helperText={
            formik.touched.zahlungsempfaenger &&
            formik.errors.zahlungsempfaenger
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="iban"
          name="iban"
          label="IBAN"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={formik.touched.iban && Boolean(formik.errors.iban)}
          helperText={formik.touched.iban && formik.errors.iban}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="bic"
          name="bic"
          label="BIC"
          value={formik.values.bic}
          onChange={formik.handleChange}
          error={formik.touched.bic && Boolean(formik.errors.bic)}
          helperText={formik.touched.bic && formik.errors.bic}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentOrder;
