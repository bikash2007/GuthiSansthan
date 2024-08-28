import React, { useEffect, useState } from "react";
import axios from "axios";

const RulesnRrgulation = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get("https://yourapiurl.com/pdf-endpoint");
        setPdfUrl(response.data.pdfUrl); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  return (
    <div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="Rules and Regulation PDF"
          width="100%"
          height="600px"
          frameBorder="0"
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default RulesnRrgulation;
