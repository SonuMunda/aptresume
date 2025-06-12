import {
  CloudUploadOutlined,
  AnalyticsOutlined,
  EmojiObjectsOutlined,
} from "@mui/icons-material";

import { ElementType } from "react";

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  icon: ElementType;
}

export const atsProcess = [
  {
    id: 1,
    title: "Upload Your Resume",
    description:
      "Securely upload your resume file (PDF, DOC, DOCX). Our system prepares it for analysis.",
    icon: CloudUploadOutlined,
  },
  {
    id: 2,
    title: "ATS Analysis",
    description:
      "Our AI-powered scanner parses your resume, extracts key information, and compares it against typical ATS filtering criteria.",
    icon: AnalyticsOutlined,
  },
  {
    id: 3,
    title: "Get Instant Feedback",
    description:
      "Receive a compatibility score, identify missing keywords, and get actionable tips to optimize your resume for ATS success.",
    icon: EmojiObjectsOutlined,
  },
];
