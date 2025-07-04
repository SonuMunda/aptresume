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
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import ThemeRegistry from "./components/ThemeRegistry";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} overflow-x-hidden`}>
        <SessionProviderWrapper>
          <ThemeRegistry>{children}</ThemeRegistry>
        </SessionProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}
