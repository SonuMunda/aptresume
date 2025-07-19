"use client";

import {
  FileDownloadOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";

import TemplatesSection from "./sections/TemplatesSection";
import TypographySection from "./sections/TypographySection";
import ThemeSection from "./sections/ThemeSection";
import PageFormattingSection from "./sections/PageFormattingSection";
import SectionHeading from "@/ui/resume_builder/SectionHeading";

interface BuilderSidebarProps {
  handleResumeDownload: () => void;
}

const BuilderSidebar = ({ handleResumeDownload }: BuilderSidebarProps) => {
  return (
    <Box
      component={"aside"}
      className="sidebar-right h-screen w-full sm:w-sm max-w-sm p-4 border-l border-gray-300 overflow-y-auto"
    >
      <Box className="flex flex-col gap-10">
        {/* Templates */}
        <TemplatesSection />

        <Divider />

        {/* Typography */}
        <TypographySection />

        <Divider />

        {/* Theme */}
        <ThemeSection />
        <Divider />

        {/* Page Formattings */}
        <PageFormattingSection />

        <Divider />

        {/* Download */}
        <Box
          component={"div"}
          className="download flex flex-col gap-6 relative"
        >
          {/* Heading */}

          <SectionHeading heading="Export" Icon={FileDownloadOutlined} />

          {/* Download Options */}
          <Box
            component={"div"}
            className="flex flex-col gap-6"
            onClick={handleResumeDownload}
          >
            <Button
              variant="text"
              startIcon={
                <PictureAsPdfOutlined fontSize="large" color="error" />
              }
              sx={{
                backgroundColor: "white",
                border: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "14px",
                  textAlign: "left",
                  textTransform: "none",
                }}
              >
                <span className="font-bold text-black">Pdf</span>
                <span className="text-gray-600">
                  Download a PDF version of your resume is perfect for printing,
                  sharing with recruiters, or uploading to job portals.
                </span>
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuilderSidebar;
