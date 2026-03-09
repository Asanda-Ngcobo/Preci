// app/_lib/pdfExtractor.js

export async function extractText(buffer, mimeType) {
  if (mimeType !== "application/pdf") {
    throw new Error("Unsupported file type");
  }

  // Use the direct path to avoid test file issues
  const pdfParse = require("pdf-parse/lib/pdf-parse.js");
  
  const data = await pdfParse(buffer); // Pass buffer directly, not Uint8Array
  
  console.log("📜 Extracted length:", data.text.length);
  console.log("📜 Sample:", data.text.slice(0, 200));

  if (!data.text || data.text.trim().length === 0) {
    throw new Error("No extractable text found (likely scanned PDF)");
  }

  return data.text;
}