import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FormField from "./FormField";
import UploadButton from "./UploadButton";
import OrganizationDropdown from "./OrganizationDropdown";
import DatePickerField from "./DatePickerField";

const validationSchema = Yup.object().shape({
  entryTitel: Yup.string().required("Titel ist erforderlich"),
  entryMainText: Yup.string().required("Haupttext ist erforderlich"),
  entryDate: Yup.string()
    .required("Datum ist erforderlich")
    .test(
      "is-future-date",
      "Datum kann nicht heute oder in der Vergangenheit liegen",
      function (value) {
        const entryDate = new Date(value);
        const today = new Date();
        return entryDate > today;
      }
    ),
  entryOrganization: Yup.string().required("Organisation ist erforderlich"),
});

const initialValues = {
  entryTitel: "",
  entrySubtext: "",
  entryMainText: "",
  entryDate: "",
  entryFile: "",
};

const RequestForm = () => {
  const formikRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState("");

  const handleOrganizationChange = (event) => {
    setSelectedOrganization(event.target.value);
    formikRef.current.setFieldValue("entryOrganization", event.target.value);
  };

  const handleFormSubmitSuccess = () => {
    formikRef.current.resetForm();
    setIsUploading(false);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      if (file.type.includes("image") || file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please select an image or a PDF file.");
      }
    }

    reader.onload = function (event) {
      const base64EncodedString = event.target.result.split(",")[1];
      formikRef.current.setFieldValue("entryFile", base64EncodedString);
    };

    reader.readAsDataURL(file);
  };

  const submitToGoogleAppsScript = async (values) => {
    setIsUploading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz13kVnjPpBsB1UcgcNyWySVa2m5w9OKIbPKSzKqvAKw2tfIeVggJThF0h1jRjRf5u3FQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      handleFormSubmitSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <Typography component="h1" variant="h5">
          Submit Request
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            submitToGoogleAppsScript(values);
          }}
          innerRef={(formik) => (formikRef.current = formik)}
        >
          {({ handleChange }) => (
            <Form style={{ width: "100%", marginTop: 20 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormField
                    name="entryTitel"
                    label="Titel"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    name="entrySubText"
                    label="Slogan"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    name="entryMainText"
                    label="Beschreibungs"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <OrganizationDropdown onChange={handleOrganizationChange} />
                </Grid>
                <Grid item xs={12}>
                  <DatePickerField name="entryDate" label="Datum" />
                </Grid>
                <Grid item xs={12}>
                  <UploadButton onClick={handleFileSelect} />
                  {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                  {isUploading && <CircularProgress />}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default RequestForm;
