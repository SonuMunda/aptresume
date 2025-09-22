import { signUpSchema } from "@/lib/validations/signupSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sendEmailVerification from "@/lib/utils/sendVerificationMail";
import aj from "@/arcjet/arcjet";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const token = body.token;

    if (!token) {
      return NextResponse.json(
        { message: "Captcha token is missing" },
        { status: 400 }
      );
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY!;
    if (!recaptchaSecret) {
      return NextResponse.json(
        { message: "reCAPTCHA secret key is not configured" },
        { status: 500 }
      );
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const recaptchaData = await response.json();


    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed", data: recaptchaData },
        { status: 400 }
      );
    }

    // Use Arcjet to assess the risk of the signup attempt
    const decision = await aj.protect(req, {
      email: email,
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        { message: "Email not allowed" },
        { status: 403 }
      );
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 16);

    // Check if user already exists
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
        message:
          error instanceof Error ? "Unexpected error" : "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
