import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import ThemeRegistry from "./components/ThemeRegistry";
import HeaderWrapper from "./components/layout/HeaderWrapper";
import { Suspense } from "react";
import FooterWrapper from "./components/layout/FooterWrapper";
import Loading from "./loading";
import ReduxWrapper from "./components/redux/ReduxWrapper";

export const metadata: Metadata = {
  title:
    "AptResume - AI-Powered Resume Scanner, Keywords extractor, , Resume Builder, and Jobs",
  description:
    "AptResume is an advanced AI-powered platform designed to help job seekers build optimized resumes, scan for ATS compatibility, extract key job keywords, and match with relevant job opportunities effortlessly. Created by Sonu Munda.",
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
    "jobs",
    "resume",
    "cv",

    "Sonu Munda",
  ],
  authors: [{ name: "Sonu Munda", url: "https://sonumunda.vecel.app" }],
  openGraph: {
    title: "AptResume - AI-Powered Resume Scanner & Jobs",
    description:
      "Build optimized resumes, scan ATS, extract job keywords, and find your dream job easily with AptResume AI platform by Sonu Munda.",
    url: "https://aptresume.vercel.app",
    siteName: "AptResume",
    images: [
      {
        url: "https://aptresume.vercel.app/_next/image?url=%2Flogo.png&w=64&q=75",
        width: 1200,
        height: 630,
        alt: "AptResume AI Resume Scanner and Job Matching",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  other: {
    google: "taV1NL9LHxS5GZO6CvJg9Ro7i0nPQWYbEG5SEiWbi6U",
  },
};

const roboto = Roboto({
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
