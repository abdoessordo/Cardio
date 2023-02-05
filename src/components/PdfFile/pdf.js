import { jsPDF } from "jspdf";
import logo1 from "./images/Picture1.png";
import logo2 from "./images/Picture2.png";

// Default export is a4 paper, portrait, using millimeters for units
export function generatePDF(longText) {
  const doc = new jsPDF();

  // define font family and size
  doc.setFont("sans-serif", "normal");

  // get width and height of the page
  const pageWidth = Math.floor(doc.internal.pageSize.getWidth());
  const pageHeight = Math.floor(doc.internal.pageSize.getHeight());

  const aspectRatio = 1.43;
  const image_height = 30;
  const image_width = image_height * aspectRatio;

  // Add two logos equally spaced on the top
  doc.addImage(logo1, "PNG", 15, 15, image_width, image_height);
  doc.addImage(
    logo2,
    "PNG",
    pageWidth - image_width - 15,
    15,
    image_width,
    image_height
  );

  // Add a main title in the middle center
  doc.setFontSize(22);
  doc.text(`Cardiology opinion`, pageWidth / 2, image_height * 2.3, {
    align: "center",
  });

  // Add a text paragraph with some words in bold

  const lineHeight = 8;

  // doc.setFont("helvetica", "normal");
  doc.setFontSize(16);

  let lines = doc.splitTextToSize(longText, doc.internal.pageSize.width - 30);
  let i = 0;
  for (i = 0; i < lines.length; i++) {
    doc.text(15, 90 + i * lineHeight, lines[i]);
  }

  // Add a signature after the text to the right bottom
  doc.setFontSize(14);
  doc.setFont("sans-serif", "bold");
  doc.text("Signature:", pageWidth - 25, 120 + (i + 1) * lineHeight, {
    align: "right",
  });
  // doc.text("Signature:", 15, 120 + (i + 1) * lineHeight);

  doc.save("Cardiology opinion.pdf");
}
