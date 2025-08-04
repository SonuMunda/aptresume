import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import validateToken from "@/lib/utils/validateToken";

import getUserFromToken from "@/lib/utils/getUserFromToken";
export const POST = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const token = queryParams.get("token");

    const body = await req.json();
    const { password } = body;

    console.log(password);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { validated, message } = validateToken(token);

    if (!validated) {
      return NextResponse.json({ message }, { status: 401 });
    }

    const userId = getUserFromToken(token);

    if (!userId) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: password,
      },
    });

    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message || "Something went wrong",
      });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
