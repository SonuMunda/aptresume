import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json(
        { message: "file_id is required", success: false },
        { status: 400 }
      );
    }

    const file = await prisma.upload.findFirst({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        {
          message: "Resume not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(file);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
          sucess: false,
        },
        { status: 500 }
      );
    }
  }
}
