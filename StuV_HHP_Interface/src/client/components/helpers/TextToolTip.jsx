import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const TextToolTip = ({ children }) => {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color="inherit">{children}</Typography>
        </React.Fragment>
      }
    >
      <IconButton>
        <InfoIcon />
      </IconButton>
    </HtmlTooltip>
  );
};

export default TextToolTip;
