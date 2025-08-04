import type { Metadata } from "next";
import "./globals.css";
import {Roboto } from "next/font/google";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import ThemeRegistry from "./components/ThemeRegistry";
import HeaderWrapper from "./components/layout/HeaderWrapper";
import { Suspense } from "react";
import FooterWrapper from "./components/layout/FooterWrapper";
import Loading from "./loading";
import ReduxWrapper from "./components/redux/ReduxWrapper";

export const metadata: Metadata = {
  title: "AptResume - AI-Powered Resume Scanner and Jobs",
  description:
    "AptResume is an AI-powered platform that helps job seekers build optimized resumes and match them with suitable job opportunities effortlessly.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "resume builder",
    "jobs",
    "AI resume Scanning",
    "job seeker tools",
    "resume optimization",
    "career development",
  ],
};

const roboto =  Roboto({
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${roboto.variable} bg-gray-50 overflow-x-hidden`}>
        <SessionProviderWrapper>
          <ReduxWrapper>
            <ThemeRegistry>
              <HeaderWrapper />
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <FooterWrapper />
            </ThemeRegistry>
          </ReduxWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
