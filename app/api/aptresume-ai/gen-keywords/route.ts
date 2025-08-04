import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = body.query;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Analyze the following text and return only the most relevant and suitable keywords. Do not provide any explanation or additional text. Only return a comma-separated list of keywords. Text: ${query}`,
    });

    if (!response.text) {
      return NextResponse.json(
        { message: "Failed to generate keywords" },
        { status: 500 }
      );
    }

    const data = response.text;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }
}
