"use client";

import { Box, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import ResumeBuilderHeader from "../components/ResumeBuilder/BuilderHeader";
import ResumeBuilderForm from "../components/ResumeBuilder/sidebars/left/BuilderForm";
import BuilderSidebar from "../components/ResumeBuilder/sidebars/right/BuilderSidebar";
import BuilderPreview from "../components/ResumeBuilder/BuilderPreview";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Clear } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ResumeBuilder = () => {
  const { pageSize } = useSelector((state: RootState) => state?.format.data);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false);
  const [resumeTitle, setResumeTitle] = useState<string>("myresume");
  const [loading, setLoading] = useState<boolean>(false);

  const downloadPdf = async () => {
    const htmlContent = contentRef.current?.outerHTML;
    if (!htmlContent) {
      toast("Unable to download PDF");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/download-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: htmlContent, pageSize }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Error in generating PDF")
        console.error(errorData.message || "Error generating PDF");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeTitle || "myresume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      toast("Oops, something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      className="h-screen w-full overflow-hidden bg-neutral-100"
    >
      <Toaster />
      <Box component="div" className="flex justify-between">
        <Box
          component={"div"}
          className={`fixed xl:relative top-0 ${
            !isLeftSidebarOpen ? "left-[-110%]" : "left-[0]"
          } xl:left-[0] z-4 bg-neutral-100 transition-all duration-300 ease-in-out`}
        >
          <ResumeBuilderForm />
          <Box
            component={"div"}
            className="absolute top-0 right-0 border border-gray-300 backdrop-blur-3xl rounded block xl:hidden"
            onClick={() => setIsLeftSidebarOpen(false)}
          >
            <IconButton
              sx={{
                color: "black",
              }}
            >
              <Clear />
            </IconButton>
          </Box>
        </Box>
        <Box component="div" className="w-[100%] overflow-hidden">
          <ResumeBuilderHeader
            setIsLeftSidebarOpen={setIsLeftSidebarOpen}
            setIsRightSidebarOpen={setIsRightSidebarOpen}
            title={resumeTitle}
            setTitle={setResumeTitle}
            loading={loading}
            download={downloadPdf}
          />
          <Box component={"div"} className="canvas">
            <TransformWrapper
              initialPositionX={0}
              initialPositionY={0}
              initialScale={0.8}
              minScale={0.1}
              centerZoomedOut
              centerOnInit
              smooth
            >
              <TransformComponent>
                <Box
                  component="div"
                  className="preview"
                  id="resume-preview"
                >
                  <BuilderPreview contentRef={contentRef} />
                </Box>
              </TransformComponent>
            </TransformWrapper>
          </Box>
        </Box>
        <Box
          component={"div"}
          className={`fixed xl:relative top-0 ${
            !isRightSidebarOpen ? "right-[-110%]" : "right-[0]"
          } xl:right-[0] z-4 bg- transition-all duration-300 ease-in-out`}
        >
          <BuilderSidebar
            handleResumeDownload={downloadPdf}
            loading={loading}
          />
          <Box
            component={"div"}
            className="absolute top-0 right-0 border border-gray-300 backdrop-blur-3xl rounded block xl:hidden"
            onClick={() => setIsRightSidebarOpen(false)}
          >
            <IconButton
              sx={{
                color: "black",
              }}
            >
              <Clear />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResumeBuilder;
