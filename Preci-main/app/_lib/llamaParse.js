import { LlamaParse } from "llama-parse";
import fs from "fs/promises";
import path from "path";
import os from "os";

const parser = new LlamaParse({
  apiKey: process.env.LLAMAPARSE_API_KEY,
  resultType: "text",
  useOcr: true,
  parsingInstruction:
    "Extract all text from this legal contract accurately, preserving structure where possible.",
});

export async function parsePDF(buffer) {
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, `contract-${Date.now()}.pdf`);

  await fs.writeFile(filePath, buffer);

  try {
    console.log("🦙 Uploading to LlamaParse...");
    

    const result = await parser.parseFile(filePath);

    console.log("🦙 Pages parsed:", result.pages?.length);

    return result.pages.map(p => p.text).join("\n");
  } catch (err) {
    console.error("🦙 LlamaParse error:", err?.message || err);
    throw err;
  } finally {
    await fs.unlink(filePath);
  }
}
