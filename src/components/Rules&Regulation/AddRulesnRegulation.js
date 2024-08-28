import React, { useState } from "react";
import axios from "axios";

const AddRulesnRegulation = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pdfFile) {
      const formData = new FormData();
      formData.append("pdf", pdfFile);

      try {
        const response = await axios.post(
          "https://yourapiurl.com/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("PDF uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading PDF:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload PDF</button>
      </form>
    </div>
  );
};

export default AddRulesnRegulation;
