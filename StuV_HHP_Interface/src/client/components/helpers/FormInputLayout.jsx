import React from "react";
import { Grid } from "@mui/material";
import TextToolTip from "./TextToolTip";

const FormInputLayout = ({ children, tooltipText }) => {
  return (
    <>
      <Grid item xs={11}>
        {children}
      </Grid>
      <Grid item xs={1} container alignItems="center" justify="center">
        <TextToolTip>{tooltipText}</TextToolTip>
      </Grid>
    </>
  );
};

export default FormInputLayout;
