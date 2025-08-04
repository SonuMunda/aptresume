import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const sendPasswordResetEmail = async (id: string, email: string) => {
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

  const verificationUrl = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"AptResume" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Password Request",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e7ff; border-radius: 8px; background-color: #ffffff;">
  <h2 style="color: #1e1b4b;">Reset Your <span style="color: #4f46e5;">AptResume</span> Password, ${email}!</h2>
  <p style="font-size: 16px; color: #312e81;">
    We received a request to reset your password. Click the button below to set a new password:
  </p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${verificationUrl}" style="padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
      Reset Password
    </a>
  </div>
  <p style="font-size: 14px; color: #6b7280;">
    If the button above does not work, please copy and paste the following link into your browser:
  </p>
  <p style="font-size: 14px; color: #4f46e5; word-break: break-all;">
    ${verificationUrl}
  </p>
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e7ff;" />
  <p style="font-size: 12px; color: #9ca3af;">
    This is an automated message. Please do not reply. If you did not request a password reset, you can safely ignore this email.
  </p>
</div>
    `,
  });
};

export default sendPasswordResetEmail;
