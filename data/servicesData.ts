import {
  WorkOutline,
  DocumentScanner,
  Description,
  Checklist,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

type Service = {
  title: string;
  description: string;
  Icon: React.ElementType<SvgIconProps>;
  iconBgColor?: string;
};

const services: Service[] = [
  {
    title: "Resume Scan",
    description:
      "Scan your resume and receive instant feedback on keywords, formatting, and job relevance.",
    Icon: DocumentScanner,
  },
  {
    title: "Keyword Matcher",
    description:
      "Match your resume with job descriptions to improve your chances of getting noticed.",
    Icon: Checklist,
  },
  {
    title: "Resume Maker",
    description:
      "Build a professional resume in minutes with customizable templates and guided content suggestions.",
    Icon: Description,
  },
  {
    title: "Job Finder",
    description:
      "Discover relevant job opportunities tailored to your skills, experience, and goals.",
    Icon: WorkOutline,
  },
];

export default services;
