import { Box } from "@mui/material";
import React from "react";
import sectionsList from "../data/resumeResultSibarList";
import Link from "next/link";

const AtsResultResponsiveMenu = () => {
  return (
    <Box className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-md px-4 py-2">
      <nav className="flex justify-between items-center">
        {sectionsList.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.key}
              href={`#${section.key}`}
              className="flex flex-col items-center text-[10px] text-gray-700 hover:text-blue-600 transition-all w-1/5"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 mb-1 hover:border-blue-500 transition-colors">
                <Icon className="text-[20px]" />
              </div>
              <span className="truncate">{section.title}</span>
            </Link>
          );
        })}
      </nav>
    </Box>
  );
};

export default AtsResultResponsiveMenu;
