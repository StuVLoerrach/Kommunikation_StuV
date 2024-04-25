import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress for upload animation
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  entryTitel: Yup.string().required("Titel ist erforderlich"),
  entrySubText: "", // Remove this line as validation is removed for entrySubText
  entryMainText: Yup.string().required("Haupttext ist erforderlich"),
  entryDate: Yup.string()
    .required("Datum ist erforderlich")
    .test(
      "is-future-date",
      "Datum kann nicht heute oder in der Vergangenheit liegen",
      function (value) {
        // Parse the entryDate string to compare it with today's date
        const entryDate = new Date(value);
        const today = new Date();
        return entryDate > today;
      }
    ),
  entryOrganization: Yup.string().required("Organisation ist erforderlich"),
  entryFile: "", // Remove this line as validation is removed for entryFileLink
});

const initialValues = {
  entryTitel: "",
  entrySubText: "", // Remove this line as validation is removed for entrySubText
  entryMainText: "",
  entryDate: "",
  entryOrganization: "",
  entryFile: "",
};

export function RequestForm() {
  const formikRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch the list of partners from the Google Apps Script endpoint
    fetch(
      "https://script.google.com/macros/s/AKfycbxTVMXY0meG9O5xplRbgESoQOt4vXFZsffN9iKoxmOo2S_jnBlTrQDEq4C6KWmSv-qe/exec?group=partners"
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the list of partners in state
        setOrganizations(data.partners);
      })
      .catch((error) => {
        console.error("Error fetching organizations:", error);
      });
  }, []); // Empty dependency array to run only once when component mounts

  const handleFormSubmitSuccess = () => {
    formikRef.current.resetForm();
    setIsUploading(false); // Reset uploading status after successful form submission
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      // Check if the selected file type is either image or pdf
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
    setIsUploading(true); // Set uploading status to true when form is submitted
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxTVMXY0meG9O5xplRbgESoQOt4vXFZsffN9iKoxmOo2S_jnBlTrQDEq4C6KWmSv-qe/exec",
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
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Paper
        elevation={3}
        style={{
          width: "40vw",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10vh"
        }}
      >
        <Typography component="h1" variant="h5">
          Submit Request
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Submit the form to Google Forms here
            submitToGoogleAppsScript(values);
          }}
          innerRef={(formik) => (formikRef.current = formik)}
        >
          {({ handleChange }) => (
            <Form style={{ width: "100%", marginTop: 20 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="entryTitel">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel>Titel der Veranstaltung</InputLabel>
                        <OutlinedInput
                          label="Titel der Veranstaltung"
                          {...field}
                        ></OutlinedInput>
                        <ErrorMessage
                          name="entryTitel"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="entrySubText">
                    {({ field, form }) => (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>SubText</InputLabel>
                        <OutlinedInput
                          label="SubText"
                          {...field}
                        ></OutlinedInput>
                        <ErrorMessage
                          name="entrySubText"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="entryMainText">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel>
                          Beschreibungs Text der Veranstaltung
                        </InputLabel>
                        <OutlinedInput
                          multiline
                          rows={4}
                          label="Beschreibungs Text der Veranstaltung"
                          {...field}
                        ></OutlinedInput>
                        <ErrorMessage
                          name="entryMainText"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="entryOrganization">
                    {({ field, form }) => (
                      <FormControl
                        required
                        fullWidth
                        variant="outlined"
                        style={{ marginTop: "16px" }}
                      >
                        <InputLabel id="entryOrganization-helper-label">
                          Organisator
                        </InputLabel>
                        <Select
                          labelId="entryOrganization-helper-label"
                          label="Organisator"
                          defaultValue=""
                          {...field}
                        >
                          {organizations.map((org, index) => (
                            <MenuItem key={index} value={org}>
                              {org}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          name="entryOrganization"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="entryDate">
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
                </Grid>

                <Grid item xs={12}>
                  <label htmlFor="fileInput">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                    </Button>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                  {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                  {isUploading && <CircularProgress />} {/* Render upload animation when uploading */}
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
}
