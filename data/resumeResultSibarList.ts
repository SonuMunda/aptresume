import {
  TextSnippetOutlined,
  DescriptionOutlined,
  ViewListOutlined,
  StyleOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import React from "react";

interface sectionsList {
  title: string;
  key: string;
  icon: React.ElementType;
}

const sectionsList = [
  {
    title: "Tailoring",
    key: "tailoring",
    icon: TuneOutlined,
  },
  {
    title: "Content",
    key: "content",
    icon: TextSnippetOutlined,
  },
  {
    title: "Format",
    key: "format",
    icon: DescriptionOutlined,
  },
  {
    title: "Sections",
    key: "sections",
    icon: ViewListOutlined,
  },
  {
    title: "Style",
    key: "style",
    icon: StyleOutlined,
  },
];

export default sectionsList;
