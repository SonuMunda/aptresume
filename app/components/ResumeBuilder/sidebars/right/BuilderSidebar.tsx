"use client";

import {
  FileDownloadOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import TemplatesSection from "./sections/TemplatesSection";
import TypographySection from "./sections/TypographySection";
import ThemeSection from "./sections/ThemeSection";
import PageFormattingSection from "./sections/PageFormattingSection";
import SectionHeading from "@/ui/resume_builder/SectionHeading";
import { indigo } from "@mui/material/colors";

interface BuilderSidebarProps {
  handleResumeDownload: () => void;
  loading: boolean;
}

const BuilderSidebar = ({
  handleResumeDownload,
  loading,
}: BuilderSidebarProps) => {
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
          className="download flex flex-col gap-6 relative mb-10"
        >
          {/* Heading */}

          <SectionHeading heading="Export" Icon={FileDownloadOutlined} />

          {/* Download Options */}
          <Box
            component="div"
            className="flex flex-col gap-6 max-w-md"
            onClick={handleResumeDownload}
          >
            <Box
              className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md 
                   bg-white transition-all cursor-pointer hover:bg-neutral-100 hover:border-indigo-400"
            >
              <Button
                fullWidth
                variant="text"
                startIcon={
                  loading ? (
                    <CircularProgress size={24} sx={{ color: indigo[500] }} />
                  ) : (
                    <PictureAsPdfOutlined fontSize="inherit" color="error" />
                  )
                }
                sx={{
                  justifyContent: "flex-start",
                  gap: 2,
                  textAlign: "left",
                  padding: "1rem",
                }}
              >
                <Box className="flex flex-col">
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "black",
                    }}
                  >
                    Download PDF Resume
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "text.secondary",
                      textTransform: "none",
                    }}
                  >
                    Perfect for printing, sharing with recruiters, or uploading
                    to job portals.
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuilderSidebar;
