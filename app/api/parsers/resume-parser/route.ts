import { NextRequest, NextResponse } from "next/server";
import documentParser from "@/lib/parsers/documentParser";

export async function POST(req: NextRequest) {
  try {
    const { file } = await req.json();

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    let buffer: Buffer;

    if (typeof file === "string" && file.startsWith("http")) {
      const fileRes = await fetch(file);
      if (!fileRes.ok) {
        return NextResponse.json(
          { error: "Failed to fetch file from URL" },
          { status: 400 }
        );
      }
      const arrayBuffer = await fileRes.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      buffer = Buffer.from(file, "base64");
    }

    const parsedText = await documentParser(buffer);

    if (!parsedText) {
      return NextResponse.json(
        { error: "Failed to parse document" },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: parsedText }, { status: 200 });
  } catch (error) {
    console.error("Error parsing document:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
