import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Sends an image buffer to GPT-4o Vision and extracts all visible text.
 * @param {Buffer} buffer     - Raw image bytes
 * @param {string} mimeType   - e.g. "image/png", "image/jpeg"
 * @returns {Promise<string>} - Extracted plain text
 */
export async function extractImageWithVision(buffer, mimeType) {
  const base64 = Buffer.from(buffer).toString("base64");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
Extract all visible text from this document image.

Preserve:
- Headings
- Numbering and bullet points
- Tables (use plain-text alignment)
- Clauses and sub-clauses

Return plain text only. No commentary, no markdown formatting.
        `.trim(),
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64}`,
            },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });

  const text = response.choices[0]?.message?.content;

  if (!text) {
    throw new Error("GPT-4o Vision returned no text for this image");
  }

  return text;
}