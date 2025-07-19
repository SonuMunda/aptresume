import { HomeFilled, Menu } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React from "react";

interface HeaderProps {
  setIsLeftSidebarOpen: (isLeftSidebarOpen: boolean) => void;
  setIsRightSidebarOpen: (isRightSidebarOpen: boolean) => void;
}

const ResumeBuilderHeader = ({
  setIsLeftSidebarOpen,
  setIsRightSidebarOpen,
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

        {/* Go to Home Button */}
        <Button variant="text" color="inherit">
          <Tooltip title={"Go to Home"}>
            <HomeFilled />
          </Tooltip>
        </Button>

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
