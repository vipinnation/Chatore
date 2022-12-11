import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type AlertProps = { type: string; message: string };

const AlertComponent: React.FunctionComponent<AlertProps> = ({
  type,
  message,
}) => {
  const [open, setOpen] = React.useState(true);
 

  return (
    <>
      {type == "ERROR" && (
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton aria-label="close" color="inherit" size="small">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      {type == "WARNING" && (
        <Alert
          variant="filled"
          severity="warning"
          action={
            <IconButton aria-label="close" color="inherit" size="small">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}
      {type === "SUCCESS" && (
        <Alert
          variant="filled"
          severity="success"
          action={
            <IconButton aria-label="close" color="inherit" size="small">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;