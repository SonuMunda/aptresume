import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import ProgressRing from "./ProgressRing";
import Link from "next/link";
import sectionsList from "../../../data/resumeResultSibarList";

const AtsResultSidebar = ({ score }: { score: number }) => {
  const handleScroll = (key: string) => {
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Box
      component={"div"}
      className="sidebar hidden lg:block bg-white h-fit sticky top-10 min-w-xs border border-gray-300 shadow-md rounded-md p-8"
    >
      <Box
        component={"div"}
        className="sidebar-header border-b border-gray-300 pb-4"
      >
        <Box
          component={"div"}
          className="overall-score flex flex-col items-center gap-3 p-3"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Overall Score
          </Typography>
          <ProgressRing value={score * 10} />
        </Box>
      </Box>

      <Box component={"div"} className="sidebar-body mt-6">
        <Box component={"nav"} className="sidebar-navigations  w-full">
          <List dense className="sidebar-list">
            {sectionsList.map((section) => {
              return (
                <ListItem
                key={section.key}
                onClick={() => handleScroll(section.key)}
                sx={{
                  py: 1.2,
                  px: 1.5,
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#F3F4F6", 
                  },
                  "&:active": {
                    backgroundColor: "#E5E7EB", 
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {section.title}
                </Typography>
              </ListItem>
              );
            })}
          </List>
        </Box>
        <Box component={"div"} className="sidebar-btn p-2 mt-6">
          <Button
            variant="contained"
            sx={{
              width: "100%",
              p: 1,
            }}
          >
            <Link href="/resume-scan"> Upload Another Resume</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AtsResultSidebar;
