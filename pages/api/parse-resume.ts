import type { NextApiRequest, NextApiResponse } from "next";
import pdfParse from "pdf-parse";

type RequestBody = {
  fileBase64: string;
  fileType: string;
};

type ResponseData = {
  text?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { fileBase64, fileType } = req.body as RequestBody;

    if (!fileBase64 || !fileType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const buffer = Buffer.from(fileBase64, "base64");

    let parsedText = "";

    if (fileType === "application/pdf") {
      const data = await pdfParse(buffer);
      parsedText = data.text;
    } else {
      parsedText = "DOCX parsing coming soon...";
    }

    console.log("Parsed text:", parsedText);
    return res.status(200).json({ text: parsedText });
  } catch (err) {
    console.error("Error parsing resume:", err);
    return res.status(500).json({ error: "Failed to parse resume" });
  }
}
