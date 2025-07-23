import {
  CloudUploadOutlined,
  AnalyticsOutlined,
  EmojiObjectsOutlined,
} from "@mui/icons-material";

import { ElementType } from "react";

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: ElementType;
  iconBgColor: string;
}

export const atsProcess = [
  {
    title: "Upload Your Resume",
    description:
      "Securely upload your resume file (PDF, DOC, DOCX). Our system prepares it for analysis.",
    icon: CloudUploadOutlined,
    iconBgColor: "bg-emerald-600",
  },
  {
    title: "ATS Analysis",
    description:
      "Our AI-powered scanner parses your resume, extracts key information, and compares it against typical ATS filtering criteria.",
    icon: AnalyticsOutlined,
    iconBgColor: "bg-sky-600",
  },
  {
    title: "Get Instant Feedback",
    description:
      "Receive a compatibility score, identify missing keywords, and get actionable tips to optimize your resume for ATS success.",
    icon: EmojiObjectsOutlined,
    iconBgColor: "bg-amber-600",
  },
];
