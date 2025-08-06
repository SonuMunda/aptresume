import prisma from "@/lib/prisma";
import { sendContactMail } from "@/lib/utils/sentContactMail";
import { contactSchema } from "@/lib/validations/contactSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validate = contactSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { message: validate.error.errors[0] },
        { status: 400 }
      );
    }

    const { name, subject, email, message } = body;

    await prisma.contact.create({
      data: {
        name,
        subject,
        email,
        message,
      },
    });

    const result = await sendContactMail(body);

    if(!result?.success){
      return NextResponse.json({message: 'Error sending email'}, {status: 500})
    }

    return NextResponse.json(
      {
        message:
          "Thank You! We've received your message and will follow up shortly",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
  }
};
