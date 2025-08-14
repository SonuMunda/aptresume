import { FileDownload, HomeFilled, Menu } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  setIsLeftSidebarOpen: (isLeftSidebarOpen: boolean) => void;
  setIsRightSidebarOpen: (isRightSidebarOpen: boolean) => void;
  title: string;
  setTitle: (resumeName: string) => void;
  loading: boolean;
  download: () => void;
}

const ResumeBuilderHeader = ({
  setIsLeftSidebarOpen,
  setIsRightSidebarOpen,
  title,
  setTitle,
  loading,
  download,
}: HeaderProps) => {
  return (
    <Box
      component={"header"}
      className="header flex w-full items-center justify-center  border-b border-gray-300"
    >
      <Box
        component={"div"}
        className="w-full flex justify-between xl:justify-center mx-auto p-2"
      >
        {/* Left Sidebar Toggler */}
        <Box component={"div"} className="flex items-center block xl:hidden">
          <IconButton
            color="inherit"
            onClick={() => {
              setIsLeftSidebarOpen(true);
            }}
          >
            <Menu fontSize={"small"} />
          </IconButton>
        </Box>

        <div className="flex items-center justify-between w-full">
          {/* Go to Home Button */}
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <IconButton color="inherit">
                <Tooltip title={"Go to Home"}>
                  <HomeFilled />
                </Tooltip>
              </IconButton>
            </Link>

            <TextField
              size="small"
              name="resume-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <IconButton color="inherit" onClick={download}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "inherit" }} />
            ) : (
              <Tooltip title="Download Resume">
                <FileDownload />
              </Tooltip>
            )}
          </IconButton>
        </div>

        {/* Right Sidebar Toggler */}
        <Box component={"div"} className="flex items-center block xl:hidden">
          <IconButton
            color="inherit"
            onClick={() => {
              setIsRightSidebarOpen(true);
            }}
          >
            <Menu fontSize={"small"} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ResumeBuilderHeader;
