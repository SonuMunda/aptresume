import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import ProgressRing from "./ProgressRing";
import Link from "next/link";
import sectionsList from "../data/resumeResultSibarList";

const AtsResultSidebar = ({ score }: { score: number }) => {
  return (
    <Box className="sidebar hidden md:block bg-white h-fit sticky top-10 min-w-sm border border-gray-300 shadow-md rounded-md p-8">
      <Box className="sidebar-header border-b border-gray-300 pb-4">
        <Box className="overall-score flex flex-col items-center gap-3 p-3">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Overall Score
          </Typography>
          <ProgressRing value={score} />
        </Box>
      </Box>

      <Box className="sidebar-body mt-6">
        <Box className="sidebar-navigations w-full">
          <List dense className="sidebar-list">
            {sectionsList.map((section) => {
              const Icon = section.icon;
              return (
                <ListItem
                  className="list-item"
                  key={section.key}
                  sx={{
                    display: "block",
                  }}
                >
                  <Link
                    href={`#${section.key}`}
                    className="flex items-center gap-2 uppercase p-3 bg-gray-50  rounded cursor-pointer hover:bg-gray-200"
                  >
                    <Icon className="text-gray-600" />
                    {section.title}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box className="sidebar-btn p-2 mt-6">
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
