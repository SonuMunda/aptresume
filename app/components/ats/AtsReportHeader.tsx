import { Box, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const AtsReportHeader = () => {
  return (
    <Box component={"header"} className="ats-header shadow">
      <Box
        component={"div"}
        className="w-full mx-auto flex items-center justify-between p-2"
      >
        {/* Logo */}
        <Box component={"div"} className="logo gap-2">
          <Link
            href="/"
            className={`logo-link flex items-center jusify-center gap-2 text-lg sm:text-2xl font-bold `}
          >
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            AptResume
          </Link>
        </Box>

        {/* Upload Button */}
        <Box component={"div"} className="header-btn">
          <Button
            variant="contained"
            href="/resume-scan"
            sx={{
              textTransform: "none",
            }}
          >
            Upload New
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AtsReportHeader;
