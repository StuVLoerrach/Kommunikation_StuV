import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  Container,
} from "@mui/material";

import GeneralInfo  from "./subPages/GeneralInfo";
import BookingOrder from "./SubPages/BookingOrder";
import PaymentOrder  from "./subPages/PaymentOrder";
import {LanguageToggle} from "../../utils/LanguageService";

const validationSchema = Yup.object().shape({
  kommentar: Yup.string(),
  kommentarDatum: Yup.date(),
  absenderName: Yup.string(),
});

const initialValues = {
  kommentar: "",
  kommentarDatum: "",
  absenderName: "",
};

const InvoiceForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  return (
    <Container maxWidth="sm">
        <LanguageToggle/>
        <Typography variant="h4" gutterBottom>
          Rechnungserklärung
        </Typography>
        <Typography variant="h5" gutterBottom>
          A. Allgemeine Angaben
        </Typography>
        <GeneralInfo onSubmit={formik.handleSubmit} />
        <Typography variant="h5" gutterBottom>
          B. Buchungsanordnung
        </Typography>
        <BookingOrder onSubmit={formik.handleSubmit} />
        <Typography variant="h5" gutterBottom>
          C. Zahlungsanordnung nach § 70 LHO
        </Typography>
        <PaymentOrder onSubmit={formik.handleSubmit} />
        <Typography variant="h5" gutterBottom>
          D. Kommentar (bei Rechnungen über 1.000,00 € 2 unterschriebene Vergleichsangebote beifügen)
        </Typography>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
    </Container>
  );
};

export default InvoiceForm;
