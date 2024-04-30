import { serverFunctions } from "../../../utils/serverFunctions";
import { useLanguage } from "../../../utils/LanguageService";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import FormInputLayout from "../../helpers/FormInputLayout";
import { DateInput, SelectInput, TextInput } from "../../helpers/FromInputs";

const BookingOrder = () => {
  const { t } = useLanguage();

  const [bookingData, setBookingData] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await serverFunctions.getBookingData();
        if (jsonData) {
          const parsedData = JSON.parse(jsonData);

          if (parsedData && parsedData.data) {
            setBookingData(parsedData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccountsChange = (event) => {
    const selectedAccount = event.target.value;

    formik.setFieldValue("account", selectedAccount);
    // Reset selected chapter
    formik.setFieldValue("subLedger", "");

    // Find the entry corresponding to the selected account
    const selectedEntry = bookingData.find(
      (entry) => entry.account === selectedAccount
    );

    // If an entry is found, set the chapters associated with the selected account
    if (selectedEntry) {
      setChapters(selectedEntry.chapters || []);
    } else {
      setChapters([]);
    }
  };

  const handleChaptersChange = (event) => {
    formik.setFieldValue("subLedger", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      invoiceNumber: "",
      invoiceDate: "",
      invoiceIssuer: "",
      account: "",
      subLedger: "",
    },
    validationSchema: Yup.object().shape({
      invoiceNumber: Yup.string().required(
        t("invoiceNumber") + " " + t("required")
      ),
      invoiceDate: Yup.date()
        .typeError(t("invalid_date"))
        .required(t("invoiceDate") + " " + t("required")),
      invoiceIssuer: Yup.string().required(
        `${t("invoiceIssuer") + " " + t("required")}`
      ),
      account: Yup.string().required(t("account") + " " + t("required")),
      subLedger: Yup.string().required(t("subLedger") + " " + t("required")),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify(values);
      console.log("Form data:", formData);
    },
  });

  useEffect(() => {
    if (formik.isValid) {
      formik.handleSubmit();
    }
  }, [formik.isValid]);

  return (
    <Grid container spacing={2}>
      <FormInputLayout tooltipText={t("invoiceNumber") + " " + t("required")}>
        <TextInput
          name="invoiceNumber"
          label={t("invoiceNumber")}
          value={formik.values.invoiceNumber}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.invoiceNumber)}
          helperText={formik.errors.invoiceNumber}
        />
      </FormInputLayout>

      <FormInputLayout tooltipText={t("invoiceDate") + " " + t("required")}>
        <DateInput
          label={t("invoiceDate")}
          name="invoiceDate"
          onChange={(newValue) => {
            formik.setFieldValue("invoiceDate", newValue.format("YYYY-MM-DD"));
            formik.handleChange;
          }}
          error={Boolean(formik.errors.invoiceDate)}
          helperText={formik.errors.invoiceDate}
        />
      </FormInputLayout>

      <FormInputLayout tooltipText={t("invoiceIssuer") + " " + t("required")}>
        <TextInput
          name="invoiceIssuer"
          label={t("invoiceIssuer")}
          value={formik.values.invoiceIssuer}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.invoiceIssuer)}
          helperText={formik.errors.invoiceIssuer}
        />
      </FormInputLayout>

      <FormInputLayout tooltipText={t("account") + " " + t("required")}>
        <SelectInput
          name="account"
          label={t("account")}
          value={formik.values.account}
          onChange={handleAccountsChange}
          options={bookingData.map((entry) => entry.account)}
          emptyOptionLabel={t("none")}
          error={Boolean(formik.errors.account)}
          helperText={formik.errors.account}
        />
      </FormInputLayout>

      <FormInputLayout tooltipText={t("subLedger") + " " + t("required")}>
        <SelectInput
          label={t("subLedger")}
          name="subLedger"
          value={formik.values.subLedger}
          onChange={handleChaptersChange}
          options={chapters}
          emptyOptionLabel={t("none")}
          error={Boolean(formik.errors.subLedger)}
          helperText={formik.errors.subLedger}
        />
      </FormInputLayout>
    </Grid>
  );
};

export default BookingOrder;
