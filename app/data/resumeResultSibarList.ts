import {
  SyncAlt,
  Article,
  Insights,
  FormatAlignCenter,
  FlashOn,
} from "@mui/icons-material";
import React from "react";

interface sectionsList {
  title: string;
  key: string;
  icon: React.ElementType;
  items: string[];
}

const sectionsList = [
  {
    title: "Compatibility",
    key: "ats",
    icon: SyncAlt,
    items: ["Keyword Match", "Missing Keywords", "Suggestions"],
  },
  {
    title: "Content",
    key: "content",
    icon: Article,
    items: ["Structure", "Clarity", "Impact"],
  },
  {
    title: "Insights",
    key: "insights",
    icon: Insights,
    items: ["Strengths", "Weaknesses", "Opportunities"],
  },
  {
    title: "Alignments",
    key: "jobfit",
    icon: FormatAlignCenter,
    items: ["Matched Qualifications", "Missing Qualifications", "Suggestions"],
  },
  {
    title: "Actions",
    key: "actions",
    icon: FlashOn,
    items: ["Priorities", "Formatting", "Content", "Keywords"],
  },
];

export default sectionsList;
