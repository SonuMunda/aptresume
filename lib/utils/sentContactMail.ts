import { transporter } from "../mailer";

interface Data {
  email: string;
  name: string;
  subject: string;
  message: string;
}

export const sendContactMail = async (body: Data) => {
  const { name, email, subject, message } = body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.SMTP_USER,
    subject: subject,
    text: message,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    if (result.accepted) {
      return { success: true };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
  }
};
