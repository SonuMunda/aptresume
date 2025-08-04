import { signUpSchema } from "@/lib/validations/signupSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sendEmailVerification from "@/lib/utils/sendVerificationMail";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const hashedPassword = await bcrypt.hash(password, 16);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json(
          { message: "Email already exist" },
          { status: 409 }
        );
      }

      await prisma.user.delete({ where: { email } });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: false,
      },
    });

    // Send verification email
    await sendEmailVerification(newUser.id, newUser.name, newUser.email);

    return NextResponse.json(
      {
        message:
          "We've sent a verification email. Click the link inside to get started.",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 }
    );
  }
};
