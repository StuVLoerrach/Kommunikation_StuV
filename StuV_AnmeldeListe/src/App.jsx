import React, { useRef, useState } from "react";
import {
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  Grid,
  Typography,
  Container,
  Paper,
  CssBaseline,
  InputLabel,
  Button,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SuccessMessage from "./SuccessMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^(.+)@(stuv-loerrach\.de|dhbw-loerrach\.de)$/,
      "Email must be from @stuv-loerrach.de or @dhbw-loerrach.de"
    ),
  vorname: Yup.string().required("Vorname is required"),
  nachname: Yup.string().required("Nachname is required"),
  anwesenheit: Yup.string().required("Anwesenheit is required"),
  kurs: Yup.string().required("Kurs is required"),
  jahrgang: Yup.string().required("Jahrgang is required"),
});

const initialValues = {
  email: "",
  vorname: "",
  nachname: "",
  anwesenheit: "",
  kurs: "",
  jahrgang: "",
};

const MaterialUIForm = () => {
  const formikRef = useRef(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  const handleFormSubmitSuccess = (firstName) => {
    setFirstName(firstName);
    setSuccessModalOpen(true);
    formikRef.current.resetForm();
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const submitToGoogleForms = async (values) => {
    try {
      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe0qvKfOoIsuCQgDQU-aLsYYQaOSn9Z-dHieaRk9Lfbk0Cxhg/formResponse?" +
          new URLSearchParams({
            "entry.738836882": values.email,
            "entry.496811090": values.vorname,
            "entry.712302055": values.nachname,
            "entry.1090975446": values.anwesenheit,
            "entry.808790800": values.kurs,
            "entry.1335555136": values.jahrgang,
          }),
        {
          method: "POST",
          mode: "no-cors",
        }
      );
      handleFormSubmitSuccess(values.vorname);
      console.log("Form submitted to Google Forms successfully");
    } catch (error) {
      console.error("Error submitting form to Google Forms:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Submit the form to Google Forms here
            submitToGoogleForms(values);
            console.log("Formic here");
          }}
          innerRef={(formik) => (formikRef.current = formik)}
        >
          {({ handleChange }) => (
            <Form style={{ width: "100%", marginTop: 20 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput label="Email" {...field}></OutlinedInput>
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="vorname">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel>Vorname</InputLabel>
                        <OutlinedInput
                          label="Vorname"
                          {...field}
                        ></OutlinedInput>
                        <ErrorMessage
                          name="vorname"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="nachname">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel>Nachname</InputLabel>
                        <OutlinedInput
                          label="Nachname"
                          {...field}
                        ></OutlinedInput>
                        <ErrorMessage
                          name="nachname"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="anwesenheit">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel id="anwesenheit-helper-label">
                          Anwesenheit
                        </InputLabel>
                        <Select
                          labelId="anwesenheit-helper-label"
                          label="Anwesenheit"
                          defaultValue={""}
                          {...field}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Prä&shy;senz">Präsenz</MenuItem>
                          <MenuItem value="Online">Online</MenuItem>
                        </Select>
                        <ErrorMessage
                          name="anwesenheit"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="kurs">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel id="kurs-helper-label">Kurs</InputLabel>
                        <Select
                          labelId="kurs-helper-label"
                          label="Kurs"
                          defaultValue={""}
                          {...field}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="GIV">GIV</MenuItem>
                          <MenuItem value="GPT">GPT</MenuItem>
                          <MenuItem value="TEL">TEL</MenuItem>
                          <MenuItem value="TIF">TIF</MenuItem>
                          <MenuItem value="TMB">TMB</MenuItem>
                          <MenuItem value="TTR">TTR</MenuItem>
                          <MenuItem value="TWW">TWW</MenuItem>
                          <MenuItem value="WDB">WDB</MenuItem>
                          <MenuItem value="WDS">WDS</MenuItem>
                          <MenuItem value="WFD">WFD</MenuItem>
                          <MenuItem value="WHC">WHC</MenuItem>
                          <MenuItem value="WHD">WHD</MenuItem>
                          <MenuItem value="WIB">WIB</MenuItem>
                          <MenuItem value="WIN">WIN</MenuItem>
                          <MenuItem value="WPM">WPM</MenuItem>
                          <MenuItem value="WSP">WSP</MenuItem>
                          <MenuItem value="WTD">WTD</MenuItem>
                          <MenuItem value="WTR">WTR</MenuItem>
                          <MenuItem value="WWI">WWI</MenuItem>
                        </Select>
                        <ErrorMessage
                          name="kurs"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="jahrgang">
                    {({ field, form }) => (
                      <FormControl required fullWidth variant="outlined">
                        <InputLabel id="jahrgang-helper-label">
                          Jahrgang
                        </InputLabel>
                        <Select
                          labelId="jahrgang-helper-label"
                          label="Jahrgang"
                          defaultValue={""}
                          {...field}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="2021">2021</MenuItem>
                          <MenuItem value="2022">2022</MenuItem>
                          <MenuItem value="2023">2023</MenuItem>
                        </Select>
                        <ErrorMessage
                          name="jahrgang"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <SuccessMessage
          open={successModalOpen}
          onClose={handleCloseSuccessModal}
          firstName={firstName}
        />
      </Paper>
    </Container>
  );
};

export default MaterialUIForm;
