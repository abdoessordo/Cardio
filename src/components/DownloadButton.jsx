import React from "react";
import { generatePDF } from "./PdfFile/pdf";

const DownloadButton = () => {
  const handleDownload = () => {
    const text = document.querySelector("#resultText").innerText;
    generatePDF(text);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default DownloadButton;
