import {
  WorkOutline,
  DocumentScanner,
  Description,
  Checklist,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType<SvgIconProps>;
};

const features: Feature[] = [
  {
    title: "Job Finder",
    description:
      "Discover relevant job opportunities tailored to your skills, experience, and goals.",
    icon: WorkOutline,
  },
  {
    title: "Resume Scan",
    description:
      "Scan your resume and receive instant feedback on keywords, formatting, and job relevance.",
    icon: DocumentScanner,
  },
  {
    title: "Keyword Matcher",
    description:
      "Match your resume with job descriptions to improve your chances of getting noticed.",
    icon: Checklist,
  },
  {
    title: "Resume Maker",
    description:
      "Build a professional resume in minutes with customizable templates and guided content suggestions.",
    icon: Description,
  },
];

export default features;
