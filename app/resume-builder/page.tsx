"use client";

import { Box, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ResumeBuilderHeader from "../components/ResumeBuilder/BuilderHeader";
import ResumeBuilderForm from "../components/ResumeBuilder/sidebars/left/BuilderForm";
import BuilderSidebar from "../components/ResumeBuilder/sidebars/right/BuilderSidebar";
import BuilderPreview from "../components/ResumeBuilder/BuilderPreview";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Clear } from "@mui/icons-material";

const ResumeBuilder = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false);

  const handleDownloadPDF = useReactToPrint({
    contentRef,
  });

  return (
    <Box
      component="section"
      className="h-screen w-full overflow-hidden bg-gray-200"
    >
      <Box component="div" className="flex justify-between">
        <Box
          component={"div"}
          className={`fixed xl:relative top-0 ${
            !isLeftSidebarOpen ? "left-[-100%]" : "left-[0]"
          } xl:left-[0] z-4 bg-gray-200 transition-all duration-300 ease-in-out`}
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
          />
          <Box component={"div"} className="canvas">
            <TransformWrapper
              initialPositionX={0}
              initialPositionY={0}
              initialScale={0.96}
              minScale={0.5}
              centerZoomedOut
              centerOnInit
              smooth
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  margin: "auto",
                  cursor: "move",
                }}
              >
                <Box
                  component="div"
                  className="preview"
                  id="resume-preview"
                  ref={contentRef}
                >
                  <BuilderPreview />
                </Box>
              </TransformComponent>
            </TransformWrapper>
          </Box>
        </Box>
        <Box
          component={"div"}
          className={`fixed xl:relative top-0 ${
            !isRightSidebarOpen ? "right-[-100%]" : "right-[0]"
          } xl:right-[0] z-4 bg-gray-200 transition-all duration-300 ease-in-out`}
        >
          <BuilderSidebar handleResumeDownload={handleDownloadPDF} />
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
