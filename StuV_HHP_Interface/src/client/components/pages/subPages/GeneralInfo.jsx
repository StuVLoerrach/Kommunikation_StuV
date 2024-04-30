import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Grid } from "@mui/material";

const validationSchema = Yup.object().shape({
  dienststelle: Yup.string().required("Dienststelle is required"),
  zahlungsPerson: Yup.string().required(
    "Zahlungs- und Buchungsanordnende Person is required"
  ),
  amt: Yup.string().required("Amt is required"),
});

const initialValues = {
  dienststelle: "DHBW Lörrach",
  zahlungsPerson: "Björn Metzger",
  amt: "Finanzen"
}

const GeneralInfo = ({ onSubmit }) => {
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
          id="dienststelle"
          name="dienststelle"
          label="Dienststelle nach § 65 I LHG / § 33 Grundordnung der DHBW"
          value={formik.values.dienststelle}
          onChange={formik.handleChange}
          error={
            formik.touched.dienststelle && Boolean(formik.errors.dienststelle)
          }
          helperText={
            formik.touched.dienststelle && formik.errors.dienststelle
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="zahlungsPerson"
          name="zahlungsPerson"
          label="Zahlungs- und Buchungsanordnende Person nach § 70 LHO"
          value={formik.values.zahlungsPerson}
          onChange={formik.handleChange}
          error={
            formik.touched.zahlungsPerson &&
            Boolean(formik.errors.zahlungsPerson)
          }
          helperText={
            formik.touched.zahlungsPerson && formik.errors.zahlungsPerson
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="amt"
          name="amt"
          label="Amt nach § 3 Organisationssatzung der VS an der DHBW"
          value={formik.values.amt}
          onChange={formik.handleChange}
          error={formik.touched.amt && Boolean(formik.errors.amt)}
          helperText={formik.touched.amt && formik.errors.amt}
        />
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;
