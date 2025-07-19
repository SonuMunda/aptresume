import { Box, List, ListItem } from "@mui/material";
import React from "react";
import sectionsList from "../../../data/resumeResultSibarList";

const AtsResultBottomBar = () => {
  const handleScroll = (key: string) => {
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      component="nav"
      className="fixed  bottom-0 left-0 z-40 px-2 w-full bg-white shadow-md lg:hidden"
    >
      <List
        dense
        className="flex justify-between overflow-x-auto no-scrollbar px-2 py-1"
        sx={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {sectionsList.map((section) => {
          const Icon = section.icon;
          return (
            <ListItem
              key={section.key}
              onClick={() => handleScroll(section.key)}
              className="cursor-pointer flex flex-col items-center justify-center min-w-[64px]"
              sx={{
                textTransform: "uppercase",
                fontSize: "0.7rem",
                padding: "0.5rem 0",
                width: "fit-content",
              }}
            >
              <Box
                component="span"
                className="p-2 mb-1 border border-gray-300 rounded-full"
              >
                <Icon />
              </Box>
              <Box component="span">{section.title}</Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default AtsResultBottomBar;
