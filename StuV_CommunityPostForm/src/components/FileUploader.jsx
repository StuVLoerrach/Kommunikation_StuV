import React, { useState } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export function FileUploader () {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    // Check if a file is selected
    if (file) {
      // Check if the selected file type is either image or pdf
      if (file.type.includes("image") || file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please select an image or a PDF file.");
      }
    }
  };

  return (
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
  );
};
