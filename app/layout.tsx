import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "AptResume - AI-Powered Resume Builder and Job Matcher",
  description:
    "AptResume is an AI-powered platform that helps job seekers build optimized resumes and match them with suitable job opportunities effortlessly.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "resume builder",
    "job matching",
    "AI resume",
    "job seeker tools",
    "resume optimization",
    "career development",
  ],
};

import { Poppins } from "next/font/google";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
