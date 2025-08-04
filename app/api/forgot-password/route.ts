import prisma from "@/lib/prisma";
import sendPasswordResetEmail from "@/lib/utils/sendPasswordResetEmail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await sendPasswordResetEmail(user.id, user.email);

    return NextResponse.json(
      {
        message: "We have sent a password reset link to your email address.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message || "Something went wrong",
      });
    }
  }
};
