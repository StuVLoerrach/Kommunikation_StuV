import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

const OrganizationDropdown = ({ onChange }) => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch the list of partners from the Google Apps Script endpoint
    fetch(
      "https://script.google.com/macros/s/AKfycbz13kVnjPpBsB1UcgcNyWySVa2m5w9OKIbPKSzKqvAKw2tfIeVggJThF0h1jRjRf5u3FQ/exec?group=partners"
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the list of partners in state
        setOrganizations(data.partners);
      })
      .catch((error) => {
        console.error("Error fetching organizations:", error);
      });
  }, []);

  return (
    <FormControl required fullWidth variant="outlined" style={{ marginTop: "16px" }}>
      <InputLabel id="entryOrganization-helper-label">Organisator</InputLabel>
      <Select
        labelId="entryOrganization-helper-label"
        label="Organisator"
        defaultValue=""
        onChange={onChange}
      >
        {organizations.map((org, index) => (
          <MenuItem key={index} value={org}>
            {org}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OrganizationDropdown;
