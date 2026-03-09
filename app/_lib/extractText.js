/**
 * Reliable PDF text extraction
 * Works in Next.js App Router
 */

export async function extractText(buffer, mimeType) {
  if (mimeType !== "application/pdf") {
    throw new Error("Unsupported file type");
  }

  // Use require to avoid ESM issues
  const pdfParse = require("pdf-parse");

  // pdf-parse expects Uint8Array
  const uint8Array = new Uint8Array(buffer);

  const data = await pdfParse(uint8Array);
    console.log("📜 Extracted length:", data.text.length);
console.log("📜 Sample:", data.text.slice(0, 200));

  if (!data.text || data.text.trim().length === 0) {
    throw new Error("No extractable text found (likely scanned PDF)");
  }

  return data.text;


}
