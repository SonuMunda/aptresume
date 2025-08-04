import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import validateToken from "@/app/utils/validateToken";

export const POST = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const token = queryParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 400 });
    }

    const { validated, message } = await validateToken(token);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message || "Something went wrong",
      });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
