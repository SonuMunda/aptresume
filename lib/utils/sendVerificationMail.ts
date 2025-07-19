import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const sendEmailVerification = async (
  id: string,
  name: string,
  email: string
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  //token
  const token = jwt.sign(
    {
      userId: id,
      email: email,
    },
    process.env.NEXTAUTH_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  const verificationUrl = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: `"AptResume" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Please verify your email address",
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a;">Welcome to <span style="color: #2563eb;">AptResume</span>, ${name}!</h2>
            <p style="font-size: 16px; color: #334155;">
              Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="font-size: 14px; color: #64748b;">
              If the button above does not work, please copy and paste the following link into your browser:
            </p>
            <p style="font-size: 14px; color: #2563eb; word-break: break-all;">
              ${verificationUrl}
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #94a3b8;">
              This is an automated message. Please do not reply. If you did not create an account, you can safely ignore this email.
            </p>
          </div>
        `,
  });
};

export default sendEmailVerification;
