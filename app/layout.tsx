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
  title: "AptResume - AI-Powered Resume Scanner, Builder & Job Matching | By YourName",
  description:
    "AptResume is an advanced AI-powered platform designed to help job seekers build optimized resumes, scan for ATS compatibility, extract key job keywords, and match with relevant job opportunities effortlessly. Created by YourName.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "resume builder",
    "AI resume scanning",
    "ATS resume scanner",
    "job seeker tools",
    "resume optimization",
    "career development",
    "job matching platform",
    "professional resume templates",
    "AI job search",
    "YourName",
  ],
  authors: [{ name: "Sonu Munda", url: "https://sonumunda.me" }],
  openGraph: {
    title: "AptResume - AI-Powered Resume Scanner & Job Matching Platform",
    description:
      "Build optimized resumes, scan ATS, extract job keywords, and find your dream job easily with AptResume AI platform by YourName.",
    url: "https://aptresume.com",
    siteName: "AptResume",
    images: [
      {
        url: "https://aptresume.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AptResume AI Resume Scanner and Job Matching",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
