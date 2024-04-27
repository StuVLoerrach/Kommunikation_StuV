import React, { useState } from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadButton = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <>
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
    </>
  );
};

export default UploadButton;
