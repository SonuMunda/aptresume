import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ message: "File is missing" }, { status: 400 });
    }

    const file = await prisma.upload.findFirst({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        {
          message: "Resume not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(file);
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}
