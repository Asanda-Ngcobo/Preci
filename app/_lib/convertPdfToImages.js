import { fromBuffer } from "pdf2pic";

/**
 * Converts a PDF buffer into an array of PNG image buffers (one per page).
 * Uses pdf2pic + GraphicsMagick — no pdfjs worker issues.
 *
 * Prerequisites:
 *   npm install pdf2pic
 *   Windows : install GraphicsMagick from https://www.graphicsmagick.org
 *   Mac     : brew install graphicsmagick
 *   Linux   : apt-get install graphicsmagick
 */
export async function convertPdfToImages(buffer) {
  const converter = fromBuffer(buffer, {
    density: 200,       // DPI — higher = better OCR quality
    format: "png",
    width: 1700,
    height: 2200,
    saveFilename: "page",
    savePath: "/tmp",   // temporary; we discard the path and use the buffer
  });

  // -1 converts ALL pages; responseType "buffer" returns raw buffers
  const pages = await converter.bulk(-1, { responseType: "buffer" });

  if (!pages || pages.length === 0) {
    throw new Error("pdf2pic returned no pages — is GraphicsMagick installed?");
  }

  return pages.map((page, i) => ({
    pageNumber: i + 1,
    buffer: page.buffer,          // Buffer returned by pdf2pic
  }));
}