import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import ThemeRegistry from "./components/ThemeRegistry";
import HeaderWrapper from "./components/layout/HeaderWrapper";
import { Suspense } from "react";
import FooterWrapper from "./components/layout/FooterWrapper";
import Loading from "./loading";
import ReduxWrapper from "./redux/ReduxWrapper";

export const metadata: Metadata = {
  title: "AptResume - AI-Powered Optimizer and Job Matcher",
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} overflow-x-hidden`}>
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
