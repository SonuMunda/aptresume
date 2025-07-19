"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const hiddenPaths: string[] = ["/resume-builder"];

const FooterWrapper = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const shouldHideFooter = hiddenPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHideFooter) return null;

  return <Footer />;
};

export default FooterWrapper;
