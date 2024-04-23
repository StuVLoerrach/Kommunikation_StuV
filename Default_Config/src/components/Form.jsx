import React from 'react';
import { Container, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography } from '@mui/material';

export function RequestForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    google.script.run
      .withSuccessHandler(updateUrl)
      .withFailureHandler(onFailure)
      .uploadFiles(data);
  };

  const updateUrl = (url) => {
    const div = document.getElementById('output');
    if (isValidURL(url)) {
      div.innerHTML = `<div class="alert alert-success" role="alert"><a href="${url}">File uploaded successfully!</a></div>`;
      document.getElementById('requestForm').reset();
    } else {
      div.innerHTML = `<div class="alert alert-danger" role="alert">${url}!</div>`;
    }
  };

  const onFailure = (error) => {
    const div = document.getElementById('output');
    div.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}!</div>`;
  };

  const isValidURL = (string) => {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res !== null;
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <form id="requestForm" onSubmit={handleSubmit}>
            <Typography variant="h4" align="center" gutterBottom>Contact Details</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  variant="outlined"
                  placeholder="Your full name..."
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  variant="outlined"
                  placeholder="Last Name"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row aria-label="gender" name="gender">
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              placeholder="Email"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              variant="outlined"
              placeholder="Phone Number"
              margin="normal"
            />

            <TextField
              fullWidth
              type="file"
              label="Photo"
              name="myFile"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
          <div id="output"></div>
        </Grid>
      </Grid>
    </Container>
  );
}
