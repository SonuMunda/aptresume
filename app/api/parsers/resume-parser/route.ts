import { NextRequest, NextResponse } from "next/server";
import documentParser from "@/lib/parsers/documentParser";

export async function POST(req: NextRequest) {
  try {
    const { file } = await req.json();

    if (!file) {
      return NextResponse.json(
        { message: "No File Provided" },
        { status: 204 }
      );
    }

    let buffer: Buffer;

    if (typeof file === "string" && file.startsWith("http")) {
      const fileRes = await fetch(file);
      if (!fileRes.ok) {
        return NextResponse.json(
          {
            message: "Failed to fetch file",
          },
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
        {
          message: "Error is Parsing Document",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: parsedText, success: true, status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error || "Failed to Process Document",
      },
      { status: 500 }
    );
  }
}
