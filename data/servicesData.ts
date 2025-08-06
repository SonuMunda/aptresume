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
  href: string;
};

const services: Service[] = [
  {
    title: "ATS Resume Scanner with Tips",
    description:
      " Analyze your resume to make sure it sails smoothly past Applicant Tracking Systems. Get personalized tips to improve your chances.",
    Icon: DocumentScanner,
    href: "/resume-scan",
  },
  {
    title: "Job Description Keyword Extractor",
    description:
      "Quickly identify important keywords and skills from any job listing, so you can tailor your resume to match perfectly.",
    Icon: Checklist,
    href: "extract-keywords",
  },
  {
    title: "Intuitive Resume Builder",
    description:
      "Craft professional resumes effortlessly using our AI-assisted builder that highlights your strengths and experience.",
    Icon: Description,
    href: "/resume-builder",
  },
  {
    title: "Aggregated Job Listings",
    description:
      "Browse relevant jobs from multiple portals, all conveniently aggregated into one easy-to-navigate page.",
    Icon: WorkOutline,
    href: "/jobs",
  },
];

export default services;
