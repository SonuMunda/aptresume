"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";

const hiddenPaths: string[] = [
  "/auth/signin",
  "/auth/reset-password",
  "/auth/signup",
  "/auth/verified",
  "/forgot-password",
  "/resume-report",
  "/resume-builder",
];

const HeaderWrapper = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const shouldHideHeader = hiddenPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHideHeader) return null;

  return <Header />;
};

export default HeaderWrapper;
