import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    const { email } = decoded as { email: string };

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    });

    return NextResponse.redirect(`${process.env.BASE_URL}/auth/verified`);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
