import { convertPdfToImages } from "./convertPdfToImages";
import { extractImageWithVision } from "./extractImageWithVision";

/**
 * OCR fallback for scanned / image-only PDFs.
 * Converts each page to a PNG then runs GPT-4o Vision on it.
 * @param {Buffer} buffer - Raw PDF bytes
 * @returns {Promise<string>} - Combined extracted text for all pages
 */
export async function extractPdfWithVision(buffer) {
  const pages = await convertPdfToImages(buffer);

  const pageTexts = await Promise.allSettled(
    pages.map(async (page) => {
      console.log(`🔍 OCR page ${page.pageNumber} of ${pages.length}`);
      const text = await extractImageWithVision(page.buffer, "image/png");
      return text;
    })
  );

  const fullText = pageTexts
    .map((result, i) => {
      if (result.status === "fulfilled") {
        return result.value;
      }
      console.error(`⚠️ OCR failed for page ${i + 1}:`, result.reason);
      return ""; // Skip failed pages gracefully
    })
    .join("\n");

  if (!fullText.trim()) {
    throw new Error("OCR produced no text across all pages");
  }

  return fullText;
}