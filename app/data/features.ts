import {
  WorkOutline,
  DocumentScanner,
  GTranslate,
  Description,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType<SvgIconProps>;
  color: string;
};

const features: Feature[] = [
  {
    title: "Job Finder",
    description:
      "Discover relevant job opportunities tailored to your skills, experience, and goals.",
    icon: WorkOutline,
    color: "text-blue-600",
  },
  {
    title: "Resume Scan",
    description:
      "Scan your resume and receive instant feedback on keywords, formatting, and job relevance.",
    icon: DocumentScanner,
    color: "text-green-600",
  },
  {
    title: "Keyword Matcher",
    description:
      "Match your resume with job descriptions to improve your chances of getting noticed.",
    icon: GTranslate,
    color: "text-purple-600",
  },
  {
    title: "Resume Maker",
    description:
      "Build a professional resume in minutes with customizable templates and guided content suggestions.",
    icon: Description,
    color: "text-pink-600",
  },
];

export default features;