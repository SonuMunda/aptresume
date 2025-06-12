import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAi = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = body.query;

  try {
    const response = await genAi.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Analyze the following text and return only the most relevant and suitable keywords. Do not provide any explanation or additional text. Only return a suitable job role for the given text: ${query}`,
    });

    if (!response) {
      return NextResponse.json({ message: "Something went wrong" });
    }

    const data = response.text;
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({
        message: error.message,
      });
  }
}
